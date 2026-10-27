import { LitElement, html, css, nothing, unsafeCSS, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { keyed } from 'lit/directives/keyed.js';
import { styleMap } from 'lit/directives/style-map.js';
import pkg from '../package.json';
import {
  ACTION_COLORS,
  ACTION_ICONS,
  CARD_TYPE,
  CLIMATE_FEATURE_PRESET_MODE,
  DEBOUNCE_MS,
  EDITOR_TYPE,
  FALLBACK_LABELS,
  MODE_COLORS,
  MODE_ICONS,
  PENDING_TIMEOUT_MS,
  PRESET_ICONS,
  ROW_HEIGHT,
  ROW_HEIGHT_COMPACT,
  TITLE_HEIGHT,
  UNAVAILABLE_COLOR,
  WORKING_ACTIONS,
} from './const';
import type {
  CardConfig,
  EntityConfig,
  HassEntity,
  HomeAssistant,
  PendingMode,
  PendingSetpoint,
  SetpointKey,
} from './types';
import './editor';

interface RowModel {
  id: string;
  conf: EntityConfig;
  stateObj?: HassEntity;
  name: string;
  icon: string;
  unavailable: boolean;
  locked: boolean;
  mode: string;
  action?: string;
  color: string;
  current?: number;
  dual: boolean;
  hasSetpoint: boolean;
  target?: number;
  low?: number;
  high?: number;
  step: number;
  min: number;
  max: number;
  barMin: number;
  barMax: number;
  pending?: PendingSetpoint;
  modePending?: PendingMode;
}

const near = (a: number | undefined, b: number | undefined) =>
  a !== undefined && b !== undefined && Math.abs(a - b) < 0.01;

const num = (v: unknown): number | undefined => {
  if (v === null || v === undefined || v === '') return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};

@customElement(CARD_TYPE)
export class CompactThermostatCard extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: CardConfig;
  @state() private _menu?: string;
  @state() private _drag?: { entity: string; key: SetpointKey };
  @state() private _sel: Record<string, SetpointKey> = {};

  private _pending = new Map<string, PendingSetpoint>();
  private _modePending = new Map<string, PendingMode>();
  private _formatters = new Map<string, Intl.NumberFormat>();

  static getConfigElement() {
    return document.createElement(EDITOR_TYPE);
  }

  static getStubConfig(hass: HomeAssistant) {
    const entities = Object.keys(hass.states)
      .filter((id) => id.startsWith('climate.'))
      .slice(0, 3)
      .map((entity) => ({ entity }));
    return { entities };
  }

  setConfig(config: CardConfig) {
    if (!config || !Array.isArray(config.entities) || config.entities.length === 0) {
      throw new Error('Specifica almeno un\'entità in "entities"');
    }
    const entities = config.entities.map((e) => (typeof e === 'string' ? { entity: e } : { ...e }));
    for (const e of entities) {
      if (!e.entity || !e.entity.startsWith('climate.')) {
        throw new Error(`Entità non valida: ${e.entity ?? '(vuota)'} — serve un'entità climate.*`);
      }
    }
    this._config = { ...config, entities };
  }

  private get _height() {
    const c = this._config;
    if (!c) return ROW_HEIGHT;
    return (c.title ? TITLE_HEIGHT : 0) + c.entities.length * (c.compact ? ROW_HEIGHT_COMPACT : ROW_HEIGHT);
  }

  getCardSize() {
    return Math.ceil(this._height / 50);
  }

  getGridOptions() {
    const rows = Math.ceil((this._height + 8) / 64);
    return { columns: 12, rows, min_columns: 6, min_rows: rows };
  }

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocumentClick, true);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocumentClick, true);
    for (const p of this._pending.values()) clearTimeout(p.timer);
  }

  private _onDocumentClick = (ev: Event) => {
    if (!this._menu) return;
    const inside = ev
      .composedPath()
      .some((n) => n instanceof HTMLElement && (n.classList.contains('menu') || n.classList.contains('mode')));
    if (!inside) this._menu = undefined;
  };

  protected override willUpdate(changed: PropertyValues) {
    if (changed.has('hass') && this.hass) this._reconcile();
  }

  private _reconcile() {
    const now = Date.now();
    for (const [id, p] of this._pending) {
      if (p.timer || p.sentAt === undefined || this._drag?.entity === id) continue;
      const attrs = this.hass!.states[id]?.attributes ?? {};
      const done = Object.entries(p.values).every(([k, v]) => near(num(attrs[k]), v));
      if (done || now - p.sentAt > PENDING_TIMEOUT_MS) this._pending.delete(id);
    }
    for (const [id, m] of this._modePending) {
      const st = this.hass!.states[id];
      const reached = m.kind === 'hvac_mode' ? st?.state === m.value : st?.attributes.preset_mode === m.value;
      if (reached || now - m.at > PENDING_TIMEOUT_MS) this._modePending.delete(id);
    }
  }

  private get _lang() {
    return this.hass?.locale?.language ?? this.hass?.language ?? 'it';
  }

  private get _unit() {
    return this.hass?.config?.unit_system?.temperature ?? '°C';
  }

  private _fmt(v: number, digits: number) {
    const key = `${this._lang}|${digits}`;
    let f = this._formatters.get(key);
    if (!f) {
      f = new Intl.NumberFormat(this._lang, { minimumFractionDigits: digits, maximumFractionDigits: digits });
      this._formatters.set(key, f);
    }
    return f.format(v);
  }

  private _label(key: string, translate: () => string | undefined) {
    if (this._lang.startsWith('it') && FALLBACK_LABELS[key]) return FALLBACK_LABELS[key];
    try {
      const t = translate();
      if (t && t !== key) return t;
    } catch {
      /* formatter non disponibile */
    }
    return FALLBACK_LABELS[key] ?? key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
  }

  private _modeLabel(st: HassEntity, mode: string) {
    return this._label(mode, () => this.hass!.formatEntityState?.(st, mode));
  }

  private _presetLabel(st: HassEntity, preset: string) {
    try {
      const t = this.hass!.formatEntityAttributeValue?.(st, 'preset_mode', preset);
      if (t && t !== preset) return t;
    } catch {
      /* formatter non disponibile */
    }
    return preset.charAt(0).toUpperCase() + preset.slice(1).replace(/_/g, ' ');
  }

  private _statusLabel(m: RowModel) {
    if (m.unavailable) return FALLBACK_LABELS.unavailable;
    const st = m.stateObj!;
    let label = m.action
      ? this._label(m.action, () => this.hass!.formatEntityAttributeValue?.(st, 'hvac_action', m.action))
      : this._modeLabel(st, m.mode);
    const preset = st.attributes.preset_mode;
    if (preset && preset !== 'none') label += ` · ${this._presetLabel(st, preset)}`;
    return label;
  }

  private _model(conf: EntityConfig): RowModel {
    const id = conf.entity;
    const st = this.hass!.states[id];
    const a = st?.attributes ?? {};
    const unavailable = !st || st.state === 'unavailable' || st.state === 'unknown';
    const pending = this._pending.get(id);
    const modePending = this._modePending.get(id);
    const mode = st?.state ?? 'unavailable';
    const action: string | undefined = unavailable ? undefined : a.hvac_action ?? undefined;

    let current = num(a.current_temperature);
    if (conf.current_sensor) {
      const sensor = num(this.hass!.states[conf.current_sensor]?.state);
      if (sensor !== undefined) current = sensor;
    }

    const pick = (k: SetpointKey) => pending?.values[k] ?? num(a[k]);
    const low = pick('target_temp_low');
    const high = pick('target_temp_high');
    const target = pick('temperature');
    const dual = low !== undefined && high !== undefined && (mode === 'heat_cool' || target === undefined);

    const min = num(a.min_temp) ?? 7;
    const max = num(a.max_temp) ?? 35;
    let barMin = conf.bar_min ?? min;
    let barMax = conf.bar_max ?? max;
    if (barMax <= barMin) [barMin, barMax] = [min, max];

    let color = UNAVAILABLE_COLOR;
    if (!unavailable) color = (action && ACTION_COLORS[action]) || MODE_COLORS[mode] || UNAVAILABLE_COLOR;

    return {
      id,
      conf,
      stateObj: st,
      name: conf.name ?? a.friendly_name ?? id,
      icon: conf.icon ?? a.icon ?? 'mdi:thermostat',
      unavailable,
      locked: unavailable || mode === 'off',
      mode,
      action,
      color,
      current,
      dual,
      hasSetpoint: !unavailable && (dual || target !== undefined),
      target,
      low,
      high,
      step: num(a.target_temp_step) ?? (this._unit === '°F' ? 1 : 0.5),
      min,
      max,
      barMin,
      barMax,
      pending,
      modePending,
    };
  }

  private _keyFor(m: RowModel): SetpointKey {
    return m.dual ? this._sel[m.id] ?? 'target_temp_low' : 'temperature';
  }

  private _setValue(m: RowModel, key: SetpointKey, raw: number) {
    let v = Math.round(raw / m.step) * m.step;
    v = Math.min(m.max, Math.max(m.min, Math.round(v * 100) / 100));
    if (key === 'target_temp_low' && m.high !== undefined) v = Math.min(v, m.high - m.step);
    if (key === 'target_temp_high' && m.low !== undefined) v = Math.max(v, m.low + m.step);
    let p = this._pending.get(m.id);
    if (!p) {
      p = { values: {} };
      this._pending.set(m.id, p);
    }
    p.values[key] = v;
    if (m.dual) {
      p.values.target_temp_low ??= m.low;
      p.values.target_temp_high ??= m.high;
    }
  }

  private _schedule(id: string) {
    const p = this._pending.get(id);
    if (!p) return;
    clearTimeout(p.timer);
    p.sentAt = undefined;
    p.timer = window.setTimeout(() => this._send(id), DEBOUNCE_MS);
    this.requestUpdate();
  }

  private _send(id: string) {
    const p = this._pending.get(id);
    if (!p || !this.hass) return;
    p.timer = undefined;
    p.sentAt = Date.now();
    const data: Record<string, unknown> = { entity_id: id };
    if (p.values.temperature !== undefined) data.temperature = p.values.temperature;
    if (p.values.target_temp_low !== undefined) data.target_temp_low = p.values.target_temp_low;
    if (p.values.target_temp_high !== undefined) data.target_temp_high = p.values.target_temp_high;
    this.hass.callService('climate', 'set_temperature', data).catch((err) => {
      console.error(`${CARD_TYPE}: set_temperature fallito`, err);
      this._pending.delete(id);
      this.requestUpdate();
    });
    window.setTimeout(() => {
      if (this._pending.get(id) === p && p.sentAt !== undefined) {
        this._pending.delete(id);
        this.requestUpdate();
      }
    }, PENDING_TIMEOUT_MS);
    this.requestUpdate();
  }

  private _step(row: RowModel, dir: 1 | -1) {
    const m = this._model(row.conf);
    if (m.locked || !m.hasSetpoint) return;
    const key = this._keyFor(m);
    const base = key === 'temperature' ? m.target : key === 'target_temp_low' ? m.low : m.high;
    if (base === undefined) return;
    this._setValue(m, key, base + dir * m.step);
    this._schedule(m.id);
  }

  private _valueAt(bar: HTMLElement, x: number, m: RowModel) {
    const r = bar.getBoundingClientRect();
    const frac = r.width > 0 ? Math.min(1, Math.max(0, (x - r.left) / r.width)) : 0;
    return m.barMin + frac * (m.barMax - m.barMin);
  }

  private _onBarDown(ev: PointerEvent, m: RowModel) {
    if (m.locked || !m.hasSetpoint || ev.button > 0) return;
    ev.preventDefault();
    const bar = ev.currentTarget as HTMLElement;
    const v = this._valueAt(bar, ev.clientX, m);
    let key: SetpointKey = 'temperature';
    if (m.dual) {
      key = Math.abs(v - m.low!) <= Math.abs(v - m.high!) ? 'target_temp_low' : 'target_temp_high';
      this._sel = { ...this._sel, [m.id]: key };
    }
    const p = this._pending.get(m.id);
    if (p) clearTimeout(p.timer);
    if (p) p.timer = undefined;
    bar.setPointerCapture(ev.pointerId);
    this._drag = { entity: m.id, key };
    this._setValue(m, key, v);
    this.requestUpdate();
  }

  private _onBarMove(ev: PointerEvent, m: RowModel) {
    if (this._drag?.entity !== m.id) return;
    this._setValue(this._model(m.conf), this._drag.key, this._valueAt(ev.currentTarget as HTMLElement, ev.clientX, m));
    this.requestUpdate();
  }

  private _onBarUp(m: RowModel) {
    if (this._drag?.entity !== m.id) return;
    this._drag = undefined;
    this._schedule(m.id);
  }

  private _onBarKey(ev: KeyboardEvent, m: RowModel) {
    const dir = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : ev.key === 'ArrowLeft' || ev.key === 'ArrowDown' ? -1 : 0;
    if (!dir) return;
    ev.preventDefault();
    this._step(m, dir);
  }

  private _moreInfo(id: string) {
    this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: id }, bubbles: true, composed: true }));
  }

  private _toggleMenu(m: RowModel) {
    if (m.unavailable || m.modePending) return;
    this._menu = this._menu === m.id ? undefined : m.id;
  }

  private _choose(m: RowModel, kind: PendingMode['kind'], value: string) {
    this._menu = undefined;
    const st = m.stateObj!;
    if ((kind === 'hvac_mode' && st.state === value) || (kind === 'preset_mode' && st.attributes.preset_mode === value)) return;
    const pending: PendingMode = { kind, value, at: Date.now() };
    this._modePending.set(m.id, pending);
    const service = kind === 'hvac_mode' ? 'set_hvac_mode' : 'set_preset_mode';
    this.hass!.callService('climate', service, { entity_id: m.id, [kind]: value }).catch((err) => {
      console.error(`${CARD_TYPE}: ${service} fallito`, err);
      this._modePending.delete(m.id);
      this.requestUpdate();
    });
    window.setTimeout(() => {
      if (this._modePending.get(m.id) === pending) {
        this._modePending.delete(m.id);
        this.requestUpdate();
      }
    }, PENDING_TIMEOUT_MS);
    this.requestUpdate();
  }

  protected override render() {
    if (!this._config || !this.hass) return nothing;
    const c = this._config;
    const rows = c.entities.map((e) => this._model(e));
    return html`
      <ha-card class=${classMap({ compact: !!c.compact })}>
        ${c.title ? html`<div class="title">${c.title}</div>` : nothing}
        <div class="rows">${rows.map((m, i) => this._renderRow(m, i === rows.length - 1 && rows.length > 1))}</div>
      </ha-card>
    `;
  }

  private _renderRow(m: RowModel, last: boolean): TemplateResult {
    const c = this._config!;
    const showMode = c.show_mode_button !== false;
    const shownMode = m.modePending?.kind === 'hvac_mode' ? m.modePending.value : m.mode;
    const modeColor = m.unavailable ? UNAVAILABLE_COLOR : MODE_COLORS[shownMode] ?? UNAVAILABLE_COLOR;
    const current = m.current === undefined || m.unavailable ? '—' : this._fmt(m.current, 1);
    return html`
      <div
        class=${classMap({ row: true, unavailable: m.unavailable, 'no-mode': !showMode })}
        style=${styleMap({ '--row-color': m.color, '--mode-color': modeColor })}
      >
        <button class="badge" @click=${() => this._moreInfo(m.id)} aria-label=${m.name}>
          <ha-icon .icon=${m.icon}></ha-icon>
        </button>
        <div class="info" @click=${() => this._moreInfo(m.id)}>
          <div class="name">${m.name}</div>
          <div class="status">
            <ha-icon .icon=${m.unavailable ? 'mdi:alert-circle-outline' : (m.action && ACTION_ICONS[m.action]) || MODE_ICONS[m.mode] || 'mdi:thermostat'}></ha-icon>
            <span>${this._statusLabel(m)}</span>
          </div>
        </div>
        <div class="cur">${current}<sup>${this._unit}</sup></div>
        ${this._renderSetpoint(m)} ${showMode ? this._renderModeButton(m, shownMode, last) : nothing}
        ${this._renderBar(m)}
      </div>
    `;
  }

  private _renderSetpoint(m: RowModel) {
    if (!m.hasSetpoint && !m.unavailable) return html`<div class="sp"></div>`;
    const c = this._config!;
    const showButtons = c.show_setpoint_buttons !== false;
    const digits = m.step < 1 ? 1 : 0;
    const dragging = this._drag?.entity === m.id;
    const debouncing = !!m.pending?.timer;
    const cls = { tv: true, dim: m.locked, pending: debouncing || dragging };
    const bar = debouncing ? keyed(m.pending!.timer, html`<span class="deb"></span>`) : nothing;
    let value: TemplateResult;
    if (m.unavailable) {
      value = html`<div class="tv dim">—</div>`;
    } else if (m.dual) {
      const sel = this._keyFor(m);
      const pick = (key: SetpointKey) => {
        this._sel = { ...this._sel, [m.id]: key };
      };
      value = html`<div class=${classMap({ ...cls, dual: true })}>
        <span class=${classMap({ hi: true, on: sel === 'target_temp_high' })} @click=${() => pick('target_temp_high')}
          >${this._fmt(m.high!, digits)}°</span
        >
        <span class=${classMap({ lo: true, on: sel === 'target_temp_low' })} @click=${() => pick('target_temp_low')}
          >${this._fmt(m.low!, digits)}°</span
        >
        ${bar}
      </div>`;
    } else {
      value = html`<div class=${classMap(cls)}>${this._fmt(m.target!, digits)}°${bar}</div>`;
    }
    if (!showButtons) return html`<div class="sp">${value}</div>`;
    return html`<div class="sp">
      <button class="pm" ?disabled=${m.locked} @click=${() => this._step(m, -1)} aria-label="−">−</button>
      ${value}
      <button class="pm" ?disabled=${m.locked} @click=${() => this._step(m, 1)} aria-label="+">+</button>
    </div>`;
  }

  private _renderModeButton(m: RowModel, shownMode: string, last: boolean) {
    const open = this._menu === m.id;
    return html`
      <button
        class=${classMap({ mode: true, pending: !!m.modePending })}
        ?disabled=${m.unavailable}
        aria-haspopup="menu"
        aria-expanded=${open ? 'true' : 'false'}
        @click=${() => this._toggleMenu(m)}
      >
        <ha-icon .icon=${MODE_ICONS[shownMode] ?? 'mdi:thermostat'}></ha-icon>
      </button>
      ${open ? this._renderMenu(m, last) : nothing}
    `;
  }

  private _renderMenu(m: RowModel, up: boolean) {
    const st = m.stateObj!;
    const modes: string[] = st.attributes.hvac_modes ?? [];
    const presets: string[] =
      (st.attributes.supported_features ?? 0) & CLIMATE_FEATURE_PRESET_MODE ? st.attributes.preset_modes ?? [] : [];
    const item = (kind: PendingMode['kind'], value: string, label: string, icon: string, color: string, on: boolean) => html`
      <button
        role="menuitemradio"
        aria-checked=${on ? 'true' : 'false'}
        class=${classMap({ on })}
        style=${styleMap({ '--c': color })}
        @click=${() => this._choose(m, kind, value)}
      >
        <ha-icon .icon=${icon}></ha-icon><span>${label}</span>
        ${on ? html`<ha-icon class="chk" .icon=${'mdi:check'}></ha-icon>` : nothing}
      </button>
    `;
    return html`<div class=${classMap({ menu: true, up })} role="menu">
      ${modes.map((mode) =>
        item('hvac_mode', mode, this._modeLabel(st, mode), MODE_ICONS[mode] ?? 'mdi:thermostat', MODE_COLORS[mode] ?? UNAVAILABLE_COLOR, st.state === mode),
      )}
      ${presets.length
        ? html`<div class="sep"></div>
            ${presets.map((p) =>
              item('preset_mode', p, this._presetLabel(st, p), PRESET_ICONS[p] ?? 'mdi:tune-variant', 'var(--primary-color)', st.attributes.preset_mode === p),
            )}`
        : nothing}
    </div>`;
  }

  private _renderBar(m: RowModel) {
    const pct = (v: number) => `${(Math.min(1, Math.max(0, (v - m.barMin) / (m.barMax - m.barMin))) * 100).toFixed(2)}%`;
    const span = (a: number, b: number, cls: string) => {
      const l = Math.min(a, b);
      const r = Math.max(a, b);
      return html`<div class=${cls} style=${styleMap({ left: pct(l), width: `calc(${pct(r)} - ${pct(l)})` })}></div>`;
    };
    const dragKey = this._drag?.entity === m.id ? this._drag.key : undefined;
    const digits = m.step < 1 ? 1 : 0;
    const dot = (key: SetpointKey, v: number, color?: string) =>
      html`<div
        class=${classMap({ dot: true, t: true, active: dragKey === key })}
        style=${styleMap({ left: pct(v), '--dot': color ?? null })}
      ></div>`;
    const working = !!m.action && WORKING_ACTIONS.has(m.action);
    const parts: unknown[] = [];
    if (!m.unavailable) {
      if (m.dual) {
        parts.push(span(m.low!, m.high!, 'range'));
        if (working && m.current !== undefined) parts.push(span(m.action === 'cooling' ? m.high! : m.low!, m.current, 'fill'));
      } else if (working && m.current !== undefined && m.target !== undefined) {
        parts.push(span(m.target, m.current, 'fill'));
      }
      if (m.current !== undefined) parts.push(html`<div class="dot c" style=${styleMap({ left: pct(m.current) })}></div>`);
      if (m.dual) {
        parts.push(dot('target_temp_low', m.low!, MODE_COLORS.heat), dot('target_temp_high', m.high!, MODE_COLORS.cool));
      } else if (m.target !== undefined) {
        parts.push(dot('temperature', m.target));
      }
      if (dragKey) {
        const v = dragKey === 'target_temp_low' ? m.low! : dragKey === 'target_temp_high' ? m.high! : m.target!;
        parts.push(html`<div class="bubble" style=${styleMap({ left: pct(v) })}>${this._fmt(v, digits)}°</div>`);
      }
    }
    const interactive = !m.locked && m.hasSetpoint;
    const now = this._keyFor(m) === 'temperature' ? m.target : this._keyFor(m) === 'target_temp_low' ? m.low : m.high;
    return html`<div class="scale">
      <span>${this._fmt(m.barMin, 0)}°</span>
      <div
        class=${classMap({ bar: true, locked: !interactive })}
        role="slider"
        tabindex=${interactive ? 0 : -1}
        aria-label=${m.name}
        aria-valuemin=${m.min}
        aria-valuemax=${m.max}
        aria-valuenow=${now ?? nothing}
        aria-disabled=${interactive ? 'false' : 'true'}
        @pointerdown=${(ev: PointerEvent) => this._onBarDown(ev, m)}
        @pointermove=${(ev: PointerEvent) => this._onBarMove(ev, m)}
        @pointerup=${() => this._onBarUp(m)}
        @pointercancel=${() => this._onBarUp(m)}
        @keydown=${(ev: KeyboardEvent) => this._onBarKey(ev, m)}
      >
        <div class="track"></div>
        ${parts}
      </div>
      <span>${this._fmt(m.barMax, 0)}°</span>
    </div>`;
  }

  static override styles = css`
    :host {
      --ctc-disabled: var(--state-inactive-color, var(--disabled-color, #bdbdbd));
    }
    ha-card {
      height: 100%;
      overflow: visible;
      display: flex;
      flex-direction: column;
      container-type: inline-size;
    }
    .title {
      height: ${TITLE_HEIGHT}px;
      box-sizing: border-box;
      display: flex;
      align-items: flex-end;
      padding: 0 16px 4px;
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .rows {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .row {
      position: relative;
      flex: 1 0 auto;
      box-sizing: border-box;
      min-height: ${ROW_HEIGHT}px;
      display: grid;
      padding: 12px 12px 8px;
      grid-template-columns: 40px minmax(0, 1fr) auto auto 36px;
      grid-template-areas: 'icon info cur sp mode' 'scale scale scale scale scale';
      column-gap: 10px;
      row-gap: 4px;
      align-content: center;
      align-items: center;
      color: var(--primary-text-color);
    }
    .row.no-mode {
      grid-template-columns: 40px minmax(0, 1fr) auto auto;
      grid-template-areas: 'icon info cur sp' 'scale scale scale scale';
    }
    .row + .row {
      border-top: 1px solid var(--divider-color);
    }
    .compact .row {
      min-height: ${ROW_HEIGHT_COMPACT}px;
      padding: 6px 12px 2px;
      row-gap: 0;
    }
    .compact .status {
      display: none;
    }
    button {
      font: inherit;
      -webkit-tap-highlight-color: transparent;
    }
    .badge {
      grid-area: icon;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 0;
      padding: 0;
      cursor: pointer;
      display: grid;
      place-items: center;
      color: var(--row-color);
      background: color-mix(in srgb, var(--row-color) 18%, transparent);
      --mdc-icon-size: 22px;
    }
    .compact .badge {
      width: 34px;
      height: 34px;
      --mdc-icon-size: 19px;
    }
    .info {
      grid-area: info;
      min-width: 0;
      cursor: pointer;
    }
    .name {
      font-size: 15px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .status {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 2px;
      font-size: 12.5px;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      --mdc-icon-size: 14px;
    }
    .status ha-icon {
      color: var(--row-color);
      display: flex;
      flex: none;
    }
    .status span {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cur {
      grid-area: cur;
      font-size: 26px;
      line-height: 1;
      letter-spacing: -0.5px;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .cur sup {
      font-size: 13px;
      color: var(--secondary-text-color);
      margin-left: 1px;
    }
    .compact .cur {
      font-size: 21px;
    }
    .sp {
      grid-area: sp;
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .pm {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 0;
      cursor: pointer;
      padding: 0;
      background: color-mix(in srgb, var(--primary-text-color) 9%, transparent);
      color: var(--primary-text-color);
      font-size: 18px;
      line-height: 1;
    }
    .pm:disabled {
      opacity: 0.35;
      cursor: default;
    }
    .tv {
      position: relative;
      min-width: 48px;
      text-align: center;
      font-size: 17px;
      font-weight: 500;
      color: var(--row-color);
      font-variant-numeric: tabular-nums;
    }
    .tv.dim {
      color: var(--ctc-disabled);
    }
    .tv.pending {
      color: var(--primary-color);
    }
    .deb {
      position: absolute;
      left: 6px;
      bottom: -5px;
      height: 2px;
      border-radius: 2px;
      background: var(--primary-color);
      animation: deb ${DEBOUNCE_MS}ms linear forwards;
    }
    @keyframes deb {
      from {
        width: 0;
      }
      to {
        width: calc(100% - 12px);
      }
    }
    .tv.dual {
      display: flex;
      flex-direction: column;
      gap: 1px;
      font-size: 14px;
      line-height: 1.15;
    }
    .tv.dual span {
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      opacity: 0.55;
    }
    .tv.dual span.on {
      opacity: 1;
      background: color-mix(in srgb, var(--primary-text-color) 9%, transparent);
    }
    .tv.dual .lo {
      color: ${unsafeCSS(MODE_COLORS.heat)};
    }
    .tv.dual .hi {
      color: ${unsafeCSS(MODE_COLORS.cool)};
    }
    .tv.dual.pending span {
      color: var(--primary-color);
    }
    .tv.dual .deb {
      opacity: 1;
      padding: 0;
    }
    .mode {
      grid-area: mode;
      position: relative;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 0;
      padding: 0;
      cursor: pointer;
      display: grid;
      place-items: center;
      background: color-mix(in srgb, var(--mode-color) 18%, transparent);
      color: var(--mode-color);
      --mdc-icon-size: 19px;
    }
    .mode ha-icon {
      display: flex;
    }
    .mode.pending {
      background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    }
    .mode.pending::after {
      content: '';
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      border: 2px solid transparent;
      border-top-color: var(--primary-color);
      border-right-color: var(--primary-color);
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    .menu {
      position: absolute;
      z-index: 5;
      right: 8px;
      top: calc(12px + 40px);
      min-width: 200px;
      padding: 6px;
      border-radius: 12px;
      background: var(--card-background-color, var(--ha-card-background, #fff));
      border: 1px solid var(--divider-color);
      box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
    }
    .menu.up {
      top: auto;
      bottom: calc(100% - 8px);
    }
    .menu button {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 9px 10px;
      border: 0;
      border-radius: 8px;
      background: none;
      color: var(--primary-text-color);
      font-size: 14px;
      text-align: left;
      cursor: pointer;
      --mdc-icon-size: 20px;
    }
    .menu button:hover {
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    }
    .menu button.on {
      background: color-mix(in srgb, var(--c) 16%, transparent);
    }
    .menu button ha-icon {
      color: var(--c);
      display: flex;
    }
    .menu button .chk {
      margin-left: auto;
      color: var(--primary-text-color);
      --mdc-icon-size: 16px;
    }
    .menu .sep {
      height: 1px;
      margin: 4px 6px;
      background: var(--divider-color);
    }
    .scale {
      grid-area: scale;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
    }
    .scale > span {
      flex: none;
      min-width: 22px;
    }
    .scale > span:last-child {
      text-align: right;
    }
    .bar {
      position: relative;
      flex: 1;
      height: 28px;
      cursor: pointer;
      touch-action: none;
      user-select: none;
      outline: none;
    }
    .compact .bar {
      height: 24px;
    }
    .bar.locked {
      cursor: default;
    }
    .bar:focus-visible .dot.t {
      box-shadow:
        0 0 0 3px var(--card-background-color, var(--ha-card-background, #fff)),
        0 0 0 5px var(--primary-color);
    }
    .track,
    .fill,
    .range {
      position: absolute;
      top: 50%;
      height: 6px;
      margin-top: -3px;
      border-radius: 3px;
    }
    .track {
      left: 0;
      right: 0;
      background: var(--row-color);
      opacity: 0.22;
    }
    .range {
      background: var(--secondary-text-color);
      opacity: 0.35;
    }
    .fill {
      background: var(--row-color);
    }
    .dot {
      position: absolute;
      top: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition:
        width 0.12s,
        height 0.12s;
    }
    .dot.t {
      width: 18px;
      height: 18px;
      background: var(--dot, var(--row-color));
      box-shadow: 0 0 0 3px var(--card-background-color, var(--ha-card-background, #fff));
    }
    .dot.t.active {
      width: 24px;
      height: 24px;
      box-shadow:
        0 0 0 3px var(--card-background-color, var(--ha-card-background, #fff)),
        0 0 0 9px color-mix(in srgb, var(--dot, var(--row-color)) 25%, transparent);
    }
    .bar.locked .dot.t {
      background: var(--ctc-disabled);
    }
    .dot.c {
      width: 8px;
      height: 8px;
      background: var(--primary-text-color);
      box-shadow: 0 0 0 2px var(--card-background-color, var(--ha-card-background, #fff));
    }
    .bubble {
      position: absolute;
      bottom: calc(100% + 4px);
      transform: translateX(-50%);
      padding: 2px 7px;
      border-radius: 6px;
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      pointer-events: none;
      z-index: 2;
    }
    .unavailable {
      opacity: 0.5;
    }
    .unavailable .info,
    .unavailable .badge {
      cursor: default;
    }
    .unavailable button {
      cursor: not-allowed;
    }
    @container (max-width: 420px) {
      .row {
        column-gap: 6px;
        padding-left: 10px;
        padding-right: 8px;
        grid-template-columns: 34px minmax(0, 1fr) auto auto 32px;
      }
      .row.no-mode {
        grid-template-columns: 34px minmax(0, 1fr) auto auto;
      }
      .badge,
      .compact .badge {
        width: 34px;
        height: 34px;
        --mdc-icon-size: 19px;
      }
      .cur,
      .compact .cur {
        font-size: 20px;
      }
      .pm {
        width: 28px;
        height: 28px;
      }
      .tv {
        min-width: 42px;
        font-size: 15px;
      }
      .mode {
        width: 32px;
        height: 32px;
      }
    }
  `;
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
  interface HTMLElementTagNameMap {
    'compact-thermostat-card': CompactThermostatCard;
  }
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some((c) => c.type === CARD_TYPE)) {
  window.customCards.push({
    type: CARD_TYPE,
    name: 'Compact Thermostat Card',
    description: 'Più termostati in righe compatte con barra del setpoint trascinabile.',
    preview: true,
    documentationURL: 'https://github.com/arozoire/compact-thermostat-card',
  });
}

console.info(`%c COMPACT-THERMOSTAT-CARD %c ${pkg.version} `, 'color:#fff;background:#fe640b;font-weight:600', 'color:#fe640b;background:transparent');
