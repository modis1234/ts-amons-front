export type ProcessType = {
  pcs_seq: number | null;
  created_date: Date | string | null;
  modified_date: Date | string | null;
  pcs_curr_state: number | null;
  pcs_prev_state: number | null;
  pcs_description: string | null;
  local_index: string | null;
  ts_index: string | null;
  local_name: string | null;
  local_used: number | null;
  local_type: number | null;
  local_area: number | null;
  local_process: number;
  pcs_next_state?: number | null;
};

export type ProcessSearchDataType = {
  local_index: string | null;
};

export type ProcessErrorType = {};
