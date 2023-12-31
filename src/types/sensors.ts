export type SensorType = {
  sensor_id: number;
  sensor_index: string;
  created_date: Date;
  modified_date: null;
  sensor_pos_x: number;
  alarm_path: null;
  sensor_name: string;
  sensor_start_time: Date;
  sensor_stop_time: null;
  record_time: Date;
  o2_value: number;
  o2_state_code: number;
  h2s_value: number;
  h2s_state_code: number;
  co_value: number;
  co_state_code: number;
  voc_value: number;
  voc_state_code: number;
  comb_value: number;
  comb_state_code: number;
  sensor_state_code: number;
  sensor_image: null;
  sensor_number: number;
  sensor_ip: string;
  sensor_port: number;
  local_index: string;
  sensor_danger_action: number;
  sensor_danger_time: null;
  sensor_action: number;
  action: number;
  net_scan_action: number;
  net_scan_time: Date;
  net_start_time: Date;
  net_stop_time: null;
  net_state: string;
  device_code: number;
  gas_id: number;
  gas_code: string;
  gas_name: string;
  gas_unit: string;
  range_min: number;
  range_max: number;
  normal_low: number;
  normal_high: number;
  warning1_low: null;
  warning1_high: null;
  warning2_low: number;
  warning2_high: number;
  danger1_low: number;
  danger1_high: number;
  danger2_low: number;
  danger2_high: number;
  local_id: number;
  local_entrance: string;
  local_name: string;
  local_used: number;
  local_type: number;
  local_area: number;
  local_number: number;
  monitor_number: number;
  ts_index: string;
};
