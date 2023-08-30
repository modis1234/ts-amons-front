export type CompanyType = {
  created_date: Date | string | null;
  modified_date: Date | string | null;
  co_id: number | null;
  ts_index: string | null;
  co_main: number;
  co_name: string | null;
  co_sectors: string | null;
  co_description: string | null;
  te_id?: number;
  te_index?: string;
  te_name?: string;
  te_logo?: string | null;
  te_sectors?: string | null;
  te_description?: string | null;
  te_color?: string;
};

export type CompanyErrorType = {
  [keys: string]: string | null;
  co_name: string | null;
  co_sectors: string | null;
};
