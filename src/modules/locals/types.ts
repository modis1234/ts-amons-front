export type LocalType = {
  created_date: Date | string | null;
  modified_date: Date | string | null;
  local_id: number | null;
  local_index: string | null;
  local_entrance: string | null;
  ts_index: string | null;
  local_name: string | null;
  local_number: number;
  monitor_number: number;
  local_type: number;
  local_area: number;
  local_plan_length: number;
  local_curr_length: number;
  local_process: number;
  local_description: string | null;
  local_used: number;
  dig_seq?: number;
  dig_length?: number;
  record_date?: Date | string | null;
  dig_type?: string;
  dig_description?: string;
  pcs_seq?: number;
  pcs_prev_state?: null;
  pcs_curr_state?: number;
  pcs_description?: string;
};

export type LocalErrorType = {
  local_name: string | null;
  local_index: string | null;
  local_plan_length: string | null;
  local_area: string | null;
  local_type: string | null;
  local_number: string | null;
  monitor_number: string | null;
};

export type LocalsOptionType = {
  key: number;
  area: number;
  text: string;
  value: string | null;
  type?: number;
  entrance?: string | null;
  disabled?: boolean;
  created_date?: Date;
};
