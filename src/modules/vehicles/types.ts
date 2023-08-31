export type VehicleType = {
  created_date: Date | string | null;
  modified_date: Date | string | null;
  vh_id: number | null;
  vh_index: string | null;
  vh_name: string | null;
  vh_number: string | null;
  vh_image: string | null;
  vh_io_state: string | null;
  vh_description: string | null;
  co_id: number | null;
  co_main: number | null;
  ts_index: string | null;
  te_index: string | null;
  te_sectors?: string | null;
  te_id: number | null;
  te_name: string | null;
  co_name: string | null;
  co_sectors: string | null;
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
};

// export type VehicleType = InfoVehicleType & CompanyType;

export type VehicleErrorType = {
  [keys: string]: string | null;
  vh_name: string | null;
  bc_address: string | null;
};

export type VehicleSearchDataType = {
  vh_search: boolean;
  co_id: number | null;
  vh_name: string | null;
  bc_address: string | null;
  bc_management: number | null;
};
