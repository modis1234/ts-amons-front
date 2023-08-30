export type WorkerType = {
  created_date: Date | string | null;
  modified_date: Date | string | null;
  wk_id: number | null;
  wk_index: string | null;
  wk_name: string | null;
  wk_phone: string | null;
  wk_tel: string | null;
  wk_position: string | null;
  wk_nation: string | null;
  wk_birth: Date | string | null;
  wk_blood_type: number;
  wk_blood_group: number;
  wk_sms_yn: number;
  wk_image: string | null;
  wk_io_state?: string | null;
  co_id: number | null;
  co_main: number | null;
  ts_index: string | null;
  te_index: string | null;
  te_sectors?: string | null;
  te_id: number | null;
  te_name: string | null;
  co_name: string | null;
  co_sectors: string | null;
  // co_description: null;
  bc_id: number | null;
  bc_index: string | null;
  bc_management: number | null;
  bc_address: string | null;
  bc_description?: string | null;
  bc_used_type?: number | null;
  bc_battery_remain?: string | null;
  bc_battery_time?: Date | string | null;
  bc_scn_group?: string | null;
  bc_receive_time?: Date | string | null;
  bc_io_state?: string | null;
  bc_input_time?: Date | string | null;
  bc_out_time?: Date | string | null;
  bc_pos_x?: string | number | null;
  bc_emergency?: number | null;
  image_file?: string | null;
  // te_id: number;
  // te_name: string;
};

// export type WorkerType = InfoWorkerType & CompanyType;

export type WorkerErrorType = {
  [keys: string]: string | null;
  wk_name: string | null;
  bc_address: string | null;
};

export type WorkerSearchDataType = {
  wk_search: boolean;
  co_id: number | null;
  wk_name: string | null;
  bc_address: string | null;
  bc_management: number | null;
};
