export type ScannerType = {
  scn_id: number | null;
  scn_index: string | null;
  created_date: Date | string | null;
  modified_date: Date | string | null;
  scn_pos_x: number | null;
  scn_kind: number | null;
  scn_group: string | null;
  scn_address: string | null;
  scn_name: string | null;
  scn_ip: string | null;
  scn_port: number | null;
  scn_description: string | null;
  scn_image: string | null;
  net_scan_action: number | null;
  net_scan_time?: Date | null;
  net_start_time?: Date | null;
  net_stop_time?: Date | null;
  net_state?: string | null;
  device_code?: number | null;
  group_id?: number | null;
  local_index: string | null;
  group_name?: string | null;
  group_pos_x?: number | null;
  group_kind?: number | null;
  group_count?: number | null;
  group_description?: string | null;
  local_id?: number | null;
  local_name: string | null;
  local_used?: number | null;
  local_number?: number | null;
  local_entrance?: string | null;
  local_area: number | null;
  local_type: number | null;
  local_plan_length?: number | null;
  local_curr_length?: number | null;
  local_description?: string | null;
  monitor_number?: number | null;
  ts_index: string | null;
};

export type ScannerErrorType = {
  [keys: string]: string | null;
  local_index: string | null;
  scn_name: string | null;
  scn_pos_x: string | null;
  scn_kind: string | null;
  scn_address: string | null;
  scn_group: string | null;
  scn_ip: string | null;
  scn_port: string | null;
  scn_image: string | null;
};

export type ScannerSearchDataType = {
  local_index: string | null;
  scn_address: string | null;
};
