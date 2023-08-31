export type AnnounceType = {
  ann_id: number | null;
  record_date: Date;
  update_date: Date;
  ann_title: string;
  ann_contents: string;
  ann_writer: string;
  ann_preview: number;
  ts_index: string;
};

export type AnnounceErrorType = {
  local_name: string | null;
  local_index: string | null;
  local_plan_length: string | null;
  local_area: string | null;
  local_type: string | null;
  local_number: string | null;
  monitor_number: string | null;
};
