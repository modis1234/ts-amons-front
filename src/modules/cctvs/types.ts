export type CctvType = {
  cctv_id: number;
  cctv_index: string;
  created_date: Date;
  modified_date: Date;
  cctv_name: string;
  cctv_pos_x: number;
  cctv_user_id: string;
  cctv_pw: string;
  cctv_ip: string;
  cctv_port: number;
  cctv_group: number;
  cctv_number: number;
  cctv_description: string;
  cctv_image: string;
  cctv_type: number;
  local_index: string;
  net_scan_action: number;
  net_scan_time: Date;
  net_start_time: Date;
  net_stop_time: Date;
  net_state: string;
  device_code: number;
  local_id: number;
  local_entrance: string;
  local_name: string;
  local_used: number;
  local_number: number;
  monitor_number: number;
  local_type: number;
  local_area: number;
  ts_index: string;
};

export type CctvErrorType = {
  cctv_port: number | null;
  cctv_group: number | null;
  cctv_number: number | null;
};

export type CctvSearchType = {
  local_index: string | null;
  local_area: number | null;
  cctv_name: string | null;
};
