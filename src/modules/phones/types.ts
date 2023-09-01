export type PhoneType = {
  phone_id: number | null;
  created_date: Date | string | null;
  modified_date: Date | string | null;
  phone_index: string | null;
  phone_name: string | null;
  phone_ip: string | null;
  phone_port: number | null;
  phone_number: string | null;
  phone_pos_x: number | null;
  phone_show: number | null;
  phone_description: string | null;
  phone_image: string | null;
  local_index: string | null;
  net_scan_action: number | null;
  net_scan_time: Date | string | null;
  net_start_time: Date | string | null;
  net_stop_time: Date | string | null;
  net_state: string | null;
  device_code: number | null;
  local_entrance: string | null;
  local_id: number | null;
  local_name: string | null;
  local_used: number | null;
  local_number: number | null;
  monitor_number: number | null;
  local_type: number | null;
  local_area: number | null;
  ts_index: string | null;
};

export type PhoneErrorType = {
  phone_pos_x: number | null; // 숫자만 입력 가능
  phone_port: number | null; // 숫자만 입력 가능
  phone_number: string | null; // 11자리 숫자 입력
};

export type PhoneSearchType = {
  local_area: number | null;
  local_index: string | null;
  // phone_name: undefined,
};
