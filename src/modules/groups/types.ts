export type GroupType = {
  group_id: number | null;
  created_date: Date | string | null;
  modified_date: Date | string | null;
  group_name: string;
  group_pos_x: number;
  group_kind: number;
  group_description: null;
  group_count: number;
  local_index: string;
  local_id: number;
  local_name: string;
  local_entrance: null;
  local_plan_length: number;
  local_curr_length: number;
  local_number: number;
  monitor_number: number;
  local_type: number;
  local_area: number;
  ts_index: string;
};

export type GroupOptionsType = {
  key: number;
  text: string;
  value: string;
  type: number;
  area: number;
  index: string;
  kind: number;
};
