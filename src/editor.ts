import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EDITOR_TYPE } from './const';
import type { CardConfig, EntityConfig, HomeAssistant } from './types';

const LABELS: Record<string, string> = {
  title: 'Titolo (opzionale)',
  show_mode_button: 'Pulsante modo',
  show_setpoint_buttons: 'Pulsanti − / +',
  compact: 'Modalità compatta',
  entity: 'Termostato',
  name: 'Nome',
  icon: 'Icona',
  current_sensor: 'Sensore temperatura attuale (opzionale)',
  bar_min: 'Barra: minimo °',
  bar_max: 'Barra: massimo °',
  add: 'Aggiungi termostato',
};

const GLOBAL_SCHEMA = [
  { name: 'title', selector: { text: {} } },
  {
    type: 'grid',
    name: '',
    schema: [
      { name: 'show_mode_button', selector: { boolean: {} } },
      { name: 'show_setpoint_buttons', selector: { boolean: {} } },
      { name: 'compact', selector: { boolean: {} } },
    ],
  },
];

const ENTITY_SCHEMA = [
  { name: 'entity', required: true, selector: { entity: { domain: 'climate' } } },
  {
    type: 'grid',
    name: '',
    schema: [
      { name: 'name', selector: { text: {} } },
      { name: 'icon', selector: { icon: {} } },
    ],
  },
  { name: 'current_sensor', selector: { entity: { domain: 'sensor', device_class: 'temperature' } } },
  {
    type: 'grid',
    name: '',
    schema: [
      { name: 'bar_min', selector: { number: { mode: 'box', step: 0.5 } } },
      { name: 'bar_max', selector: { number: { mode: 'box', step: 0.5 } } },
    ],
  },
];

const ADD_SCHEMA = [{ name: 'add', selector: { entity: { domain: 'climate' } } }];

const clean = <T extends object>(obj: T): T =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== '')) as T;

@customElement(EDITOR_TYPE)
export class CompactThermostatCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: CardConfig;
  @state() private _open = -1;

  setConfig(config: CardConfig) {
    const entities = (config.entities ?? []).map((e) => (typeof e === 'string' ? { entity: e } : e));
    this._config = { ...config, entities };
  }

  override connectedCallback() {
    super.connectedCallback();
    if (!customElements.get('ha-form')) {
      (customElements.get('hui-tile-card') as any)?.getConfigElement?.();
    }
  }

  private _emit(config: CardConfig) {
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
  }

  private _label = (s: { name: string }) => LABELS[s.name] ?? s.name;

  private _globalChanged(ev: CustomEvent) {
    const v = ev.detail.value as Partial<CardConfig>;
    const next: CardConfig = { ...this._config!, ...v };
    if (!next.title) delete next.title;
    if (next.show_mode_button !== false) delete next.show_mode_button;
    if (next.show_setpoint_buttons !== false) delete next.show_setpoint_buttons;
    if (!next.compact) delete next.compact;
    this._emit(next);
  }

  private _entityChanged(index: number, ev: CustomEvent) {
    const entities = [...this._config!.entities];
    entities[index] = clean(ev.detail.value as EntityConfig);
    this._emit({ ...this._config!, entities });
  }

  private _add(ev: CustomEvent) {
    const entity = ev.detail.value?.add as string | undefined;
    if (!entity) return;
    const entities = [...this._config!.entities, { entity }];
    this._emit({ ...this._config!, entities });
    this.requestUpdate();
  }

  private _move(index: number, dir: -1 | 1) {
    const entities = [...this._config!.entities];
    const to = index + dir;
    if (to < 0 || to >= entities.length) return;
    [entities[index], entities[to]] = [entities[to], entities[index]];
    if (this._open === index) this._open = to;
    this._emit({ ...this._config!, entities });
  }

  private _remove(index: number) {
    const entities = this._config!.entities.filter((_, i) => i !== index);
    this._open = -1;
    this._emit({ ...this._config!, entities });
  }

  protected override render() {
    if (!this._config || !this.hass) return nothing;
    const c = this._config;
    const globalData = {
      title: c.title ?? '',
      show_mode_button: c.show_mode_button !== false,
      show_setpoint_buttons: c.show_setpoint_buttons !== false,
      compact: !!c.compact,
    };
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${globalData}
        .schema=${GLOBAL_SCHEMA}
        .computeLabel=${this._label}
        @value-changed=${this._globalChanged}
      ></ha-form>

      <div class="heading">Termostati</div>
      <div class="list">
        ${c.entities.map((e, i) => {
          const st = this.hass!.states[e.entity];
          const title = e.name ?? st?.attributes.friendly_name ?? e.entity;
          const open = this._open === i;
          return html`
            <div class="item">
              <div class="head">
                <button class="expand" @click=${() => (this._open = open ? -1 : i)}>
                  <ha-icon .icon=${open ? 'mdi:chevron-down' : 'mdi:chevron-right'}></ha-icon>
                  <span class="t">${title}</span>
                  <span class="id">${e.entity}</span>
                </button>
                <button class="ib" title="Su" ?disabled=${i === 0} @click=${() => this._move(i, -1)}>
                  <ha-icon .icon=${'mdi:arrow-up'}></ha-icon>
                </button>
                <button class="ib" title="Giù" ?disabled=${i === c.entities.length - 1} @click=${() => this._move(i, 1)}>
                  <ha-icon .icon=${'mdi:arrow-down'}></ha-icon>
                </button>
                <button class="ib" title="Rimuovi" @click=${() => this._remove(i)}>
                  <ha-icon .icon=${'mdi:delete-outline'}></ha-icon>
                </button>
              </div>
              ${open
                ? html`<div class="body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${e}
                      .schema=${ENTITY_SCHEMA}
                      .computeLabel=${this._label}
                      @value-changed=${(ev: CustomEvent) => this._entityChanged(i, ev)}
                    ></ha-form>
                  </div>`
                : nothing}
            </div>
          `;
        })}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${{ add: '' }}
        .schema=${ADD_SCHEMA}
        .computeLabel=${this._label}
        @value-changed=${this._add}
      ></ha-form>
    `;
  }

  static override styles = css`
    :host {
      display: block;
    }
    .heading {
      margin: 20px 0 8px;
      font-weight: 500;
    }
    .list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 12px;
    }
    .item {
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      overflow: hidden;
    }
    .head {
      display: flex;
      align-items: center;
      gap: 2px;
      padding-right: 4px;
    }
    button {
      border: 0;
      background: none;
      color: var(--primary-text-color);
      font: inherit;
      cursor: pointer;
    }
    .expand {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 8px;
      text-align: left;
    }
    .t {
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .id {
      color: var(--secondary-text-color);
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ib {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      --mdc-icon-size: 20px;
    }
    .ib:hover {
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    }
    .ib:disabled {
      opacity: 0.3;
      cursor: default;
    }
    .body {
      padding: 4px 12px 12px;
      border-top: 1px solid var(--divider-color);
    }
  `;
}
