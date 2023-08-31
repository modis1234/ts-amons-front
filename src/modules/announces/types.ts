export type AnnounceType = {
  ann_id: number | null;
  record_date: Date | string | null;
  update_date: Date | string | null;
  ann_title: string | null;
  ann_contents: string | null;
  ann_writer: string | null;
  ann_preview: number | null;
  ts_index: string | null;
};

export type AnnounceErrorType = {};
