export const CARD_TYPE = 'compact-thermostat-card';
export const EDITOR_TYPE = 'compact-thermostat-card-editor';

export const DEBOUNCE_MS = 1500;
export const PENDING_TIMEOUT_MS = 10000;

export const ROW_HEIGHT = 92;
export const ROW_HEIGHT_COMPACT = 68;
export const TITLE_HEIGHT = 40;

const DISABLED = 'var(--state-inactive-color, var(--disabled-color, #bdbdbd))';

export const MODE_COLORS: Record<string, string> = {
  off: DISABLED,
  heat: 'var(--state-climate-heat-color, #ff8100)',
  cool: 'var(--state-climate-cool-color, #2b9af9)',
  heat_cool: 'var(--state-climate-heat_cool-color, #ffc107)',
  auto: 'var(--state-climate-auto-color, #4caf50)',
  dry: 'var(--state-climate-dry-color, #ff9800)',
  fan_only: 'var(--state-climate-fan_only-color, #00bcd4)',
};

export const ACTION_COLORS: Record<string, string> = {
  heating: MODE_COLORS.heat,
  preheating: MODE_COLORS.heat,
  defrosting: MODE_COLORS.heat,
  cooling: MODE_COLORS.cool,
  drying: MODE_COLORS.dry,
  fan: MODE_COLORS.fan_only,
  idle: DISABLED,
  off: DISABLED,
};

export const UNAVAILABLE_COLOR = DISABLED;

export const WORKING_ACTIONS = new Set(['heating', 'preheating', 'cooling', 'drying']);

export const MODE_ICONS: Record<string, string> = {
  off: 'mdi:power',
  heat: 'mdi:fire',
  cool: 'mdi:snowflake',
  heat_cool: 'mdi:sun-snowflake-variant',
  auto: 'mdi:thermostat-auto',
  dry: 'mdi:water-percent',
  fan_only: 'mdi:fan',
};

export const ACTION_ICONS: Record<string, string> = {
  heating: 'mdi:fire',
  preheating: 'mdi:heat-wave',
  defrosting: 'mdi:snowflake-melt',
  cooling: 'mdi:snowflake',
  drying: 'mdi:water-percent',
  fan: 'mdi:fan',
  idle: 'mdi:clock-outline',
  off: 'mdi:power',
};

export const PRESET_ICONS: Record<string, string> = {
  none: 'mdi:circle-medium',
  eco: 'mdi:leaf',
  away: 'mdi:account-arrow-right',
  boost: 'mdi:rocket-launch',
  comfort: 'mdi:sofa',
  home: 'mdi:home',
  sleep: 'mdi:bed',
  activity: 'mdi:motion-sensor',
};

export const FALLBACK_LABELS: Record<string, string> = {
  off: 'Spento',
  heat: 'Riscaldamento',
  cool: 'Raffrescamento',
  heat_cool: 'Caldo/Freddo',
  auto: 'Automatico',
  dry: 'Deumidifica',
  fan_only: 'Ventilazione',
  heating: 'Scalda',
  preheating: 'Preriscaldamento',
  defrosting: 'Sbrinamento',
  cooling: 'Raffresca',
  drying: 'Deumidifica',
  fan: 'Ventila',
  idle: 'Inattivo',
  unavailable: 'Non disponibile',
  unknown: 'Sconosciuto',
};

export const CLIMATE_FEATURE_TARGET_TEMPERATURE = 1;
export const CLIMATE_FEATURE_TARGET_TEMPERATURE_RANGE = 2;
export const CLIMATE_FEATURE_PRESET_MODE = 16;
