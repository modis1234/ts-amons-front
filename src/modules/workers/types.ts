import { CompanyType } from "modules/companies";

export type InfoWorkerType = {
  created_date: Date | string | null;
  modified_date: Date | string | null;
  wk_id: number | null;
  wk_index: string | null;
  wk_name: string;
  wk_phone: string | null;
  wk_tel: string | null;
  wk_position: string | null;
  wk_nation: string | null;
  wk_birth: Date | string | null;
  wk_blood_type: number;
  wk_blood_group: number;
  wk_sms_yn: number;
  wk_image: string | null;
  wk_io_state: string | null;
  // co_id: number | null;
  // ts_index: string | null;
  // te_index: string;
  // co_main: number;
  // co_name: string | null;
  // co_sectors: string | null;
  // co_description: null;
  bc_id: number | null;
  bc_index: string | null;
  bc_management: number | null;
  bc_address: string | null;
  bc_description: string | null;
  bc_used_type: number | null;
  bc_battery_remain: string | null;
  bc_battery_time: Date | string | null;
  bc_scn_group: string | null;
  bc_receive_time: Date | string | null;
  bc_io_state: string | null;
  bc_input_time: Date | string | null;
  bc_out_time: Date | string | null;
  bc_pos_x: string | number | null;
  bc_emergency: number | null;
  // te_id: number;
  // te_name: string;
};

export type WorkerType = InfoWorkerType & CompanyType;

export type WorkerErrorType = {
  local_name: string | null;
  local_index: string | null;
  local_plan_length: string | null;
  local_area: string | null;
  local_type: string | null;
  local_number: string | null;
  monitor_number: string | null;
};
