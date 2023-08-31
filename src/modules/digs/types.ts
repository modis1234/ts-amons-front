export type DigType = {
  dig_seq: number | null;
  created_date: Date | string | null;
  modified_date: Date | string | null;
  record_date: Date | string | null;
  dig_length: number | null;
  dig_description: string | null;
  dig_type: string | null;
  local_id: number | null;
  local_index: string | null;
  local_name: string | null;
  local_plan_length: number | null;
  local_curr_length: number | null;
  local_process: number | null;
  local_description: string | null;
  local_used: number | null;
  local_number: number | null;
  local_type: number | null;
  local_area: number | null;
  ts_index: string | null;
};

export type DigErrorType = {
  dig_length: number | null;
  local_index: string | null;
};
