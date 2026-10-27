export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed?: string;
  last_updated?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  locale?: { language: string };
  language?: string;
  config?: { unit_system?: { temperature?: string } };
  callService(domain: string, service: string, data?: Record<string, unknown>): Promise<unknown>;
  formatEntityState?(stateObj: HassEntity, state?: string): string;
  formatEntityAttributeValue?(stateObj: HassEntity, attribute: string, value?: unknown): string;
}

export interface EntityConfig {
  entity: string;
  name?: string;
  icon?: string;
  current_sensor?: string;
  bar_min?: number;
  bar_max?: number;
}

export interface CardConfig {
  type: string;
  title?: string;
  entities: EntityConfig[];
  show_mode_button?: boolean;
  show_setpoint_buttons?: boolean;
  compact?: boolean;
}

export type SetpointKey = 'temperature' | 'target_temp_low' | 'target_temp_high';

export interface PendingSetpoint {
  values: Partial<Record<SetpointKey, number>>;
  timer?: number;
  sentAt?: number;
}

export interface PendingMode {
  kind: 'hvac_mode' | 'preset_mode';
  value: string;
  at: number;
}
