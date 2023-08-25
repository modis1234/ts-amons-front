export type LocalType = {
  created_date: Date | string | null;
  modified_date: Date | string | null;
  local_id: number;
  local_index: string;
  local_entrance: string | null;
  ts_index: string;
  local_name: string;
  local_number: number;
  monitor_number: number;
  local_type: number;
  local_area: number;
  local_plan_length: number;
  local_curr_length: number;
  local_process: number;
  local_description: string;
  record_date: Date | string | null;
  local_used: number;
  dig_seq: number;
  dig_length: number;
  dig_type: string;
  dig_description: string;
  pcs_seq: number;
  pcs_prev_state: null;
  pcs_curr_state: number;
  pcs_description: string;
};
