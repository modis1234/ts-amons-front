import { BleType } from 'modules/beacons';
import { LocalType } from 'modules/locals/types';
import { DeviceType } from './devices';
import { SensorType } from './sensors';
// import { SensorType } from "./sensors";

export type WeatherType = {
  kl_id: number;
  kl_seq: number;
  update_date: Date;
  fcst_date: string;
  fcst_time: string;
  code: null;
  LGT: string;
  PTY: string;
  RN1: string;
  SKY: string;
  T1H: string;
  REH: string;
  UUU: string;
  VVV: string;
  VEC: string;
  WSD: string;
  count: number;
  ts_index: string;
};

export type EnvironmentType = {
  env_seq: number;
  env_index: null;
  announce_rolling: number;
  cctv_rolling: number;
  process_disabled: number;
  sms_limit: number;
  kma_sido: string;
  kma_gun: string;
  kma_dong: string;
  kma_warn_code: string;
  kma_warn_date: string;
  kma_warn_msg: string;
  ts_index: string;
  code: string;
  local_x: number;
  local_y: number;
  stn_id: number;
};

export type MonitorType = {
  scanner?: any[];
  beacon: BleType[];
  sensor: SensorType[];
  locals: LocalType[];
  devices: DeviceType[];
  portscan: string[];
};
