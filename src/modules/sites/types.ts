export type SiteType = {
  // [key: string]: string | number | boolean | Date | null;
  ts_id?: number;
  ts_index?: string;
  created_date?: Date | string;
  modified_date?: Date | string;
  ts_main_title: string;
  ts_sub_title?: string | null;
  nms_action: number;
  cctv_action: number;
  gas_action: number;
  phone_action: number;
  wifi_action: number;
  tts_action: number;
  sos_action: number;
  lamp_action: number;
  wireless_action: number;
  ts_plan_length: number;
  ts_description: string | null;
  ble_type: number;
  dig_type: number;
  dig_length_type: number;
  ts_url: null;
  te_index: string;
  sta_start_point: string;
  sta_end_point: string;
  qr_action: number;
  did_action: number;
  area_action: number;
  cctv_tab: number;
  te_id: number;
  te_name: string;
  te_logo: null;
  te_logo_2: null;
  te_description: null;
  te_color: string;
};
