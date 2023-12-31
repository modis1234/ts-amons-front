import moment from "moment";
import { format, getYear, getMonth, getDate } from "date-fns";
import storage from "../lib/storage";

const TS_INDEX = process.env.REACT_APP_TS_INDEX ?? null;
const today = moment();
export default {
  sosAlarm: {
    formData: {
      emg_writer: storage.get("user")?.acc_name ?? undefined,
      emg_result: undefined,
    },
    error: {
      emg_writer: undefined,
      emg_result: undefined,
    },
    searchData: {
      local_index: undefined,
      from_date: moment().format("YYYY-MM-DD 00:00:00"),
      to_date: moment().format("YYYY-MM-DD 23:59:59"),
    },
  },
  gasAlarm: {
    formData: {},
    error: {
      datepicker: false,
    },
    searchData: {
      local_index: undefined,
      // from_date: moment().format('YYYY-MM-DD 00:00:00'),
      from_date: moment(moment().subtract(1, "months")).format(
        "YYYY-MM-DD 00:00:00"
      ),
      to_date: moment().format("YYYY-MM-DD 23:59:59"),
      ts_index: TS_INDEX,
    },
  },
  logDig: {
    formData: {},
    error: {
      datepicker: false,
    },
    searchData: {
      local_index: undefined,
      from_date: moment(moment().subtract(1, "months")).format(
        "YYYY-MM-DD 00:00:00"
      ),
      to_date: moment().format("YYYY-MM-DD 23:59:59"),
    },
  },
  logWorker: {
    formData: {},
    error: {
      datepicker: false,
    },
    searchData: {
      local_index: undefined,
      co_id: undefined,
      from_date: moment().format("YYYY-MM-DD 00:00:00"),
      to_date: moment().format("YYYY-MM-DD 23:59:59"),
      name: undefined,
    },
  },
  logVehicle: {
    formData: {},
    error: {
      datepicker: false,
    },
    searchData: {
      local_index: undefined,
      co_id: undefined,
      from_date: moment().format("YYYY-MM-DD 00:00:00"),
      to_date: moment().format("YYYY-MM-DD 23:59:59"),
      name: undefined,
    },
  },
  logGas: {
    formData: {},
    error: {
      datepicker: false,
    },
    searchData: {
      local_index: undefined,
      from_date: moment().format("YYYY-MM-DD 00:00:00"),
      to_date: moment().format("YYYY-MM-DD 23:59:59"),
      ts_index: TS_INDEX,
    },
  },
  networkLog: {
    formData: {},
    error: {
      datepicker: false,
    },
    searchData: {
      local_index: undefined,
      device_code: undefined,
      from_date: moment(moment().subtract(1, "months")).format(
        "YYYY-MM-DD 00:00:00"
      ),
      to_date: moment().format("YYYY-MM-DD 23:59:59"),
      name: undefined,
    },
  },
  announce: {
    formData: {
      ann_title: undefined,
      ann_contents: undefined,
      ann_writer: storage.get("user")?.acc_name ?? undefined,
      ann_preview: 1,
      ts_index: TS_INDEX,
    },
    error: {},
    searchData: {},
  },
  local: {
    formData: {
      created_date: null,
      modified_date: null,
      local_id: null,
      local_index: null,
      local_entrance: null,
      ts_index: TS_INDEX,
      local_name: null,
      local_number: 0,
      monitor_number: 0,
      local_type: 0,
      local_area: 0,
      local_plan_length: 0,
      local_curr_length: 0,
      local_process: 0,
      local_description: null,
      local_used: 0,
    },
    error: {
      local_name: null,
      local_index: null,
      local_plan_length: null,
      local_area: null,
      local_type: null,
      local_number: null,
      monitor_number: null,
    },
  },
  notice: {
    formData: {
      ann_id: null,
      record_date: null,
      update_date: null,
      ann_title: undefined,
      ann_contents: undefined,
      ann_writer: null,
      ann_preview: 1,
      ts_index: TS_INDEX,
    },
    error: {},
    searchData: {},
  },
  dig: {
    formData: {
      dig_seq: null,
      created_date: null,
      modified_date: null,
      record_date: null,
      // record_date: moment().format('YYYY-MM-DD'),
      dig_length: undefined,
      dig_description: undefined,
      local_index: undefined,
      local_area: undefined,
      local_curr_length: 0,
      local_description: undefined,
      local_id: undefined,
      local_name: undefined,
      local_number: undefined,
      local_plan_length: undefined,
      local_process: undefined,
      local_type: undefined,
      local_used: undefined,
      dig_type: "acc",
      dig_sub_length: undefined,
      ts_index: TS_INDEX,
    },
    error: {
      dig_length: null,
      local_index: null,
    },
    searchData: {
      local_index: null,
    },
  },
  process: {
    formData: {
      pcs_seq: undefined,
      created_date: undefined,
      modified_date: undefined,
      pcs_prev_state: undefined,
      pcs_curr_state: undefined,
      pcs_next_state: undefined,
      local_index: undefined,
      local_name: undefined,
      pcs_description: undefined,
      ts_index: TS_INDEX,
    },
    error: {},
    searchData: {
      local_index: undefined,
    },
  },
  worker: {
    formData: {
      created_date: null,
      modified_date: null,
      wk_id: null,
      wk_index: null,
      wk_name: null,
      wk_phone: null,
      wk_tel: null,
      wk_position: null,
      wk_nation: null,
      wk_birth: "1990-01-01",
      wk_blood_type: 0,
      wk_blood_group: 0,
      wk_sms_yn: 0,
      wk_image: null,
      co_id: null,
      co_name: null,
      co_main: null,
      co_sectors: null,
      ts_index: TS_INDEX,
      te_index: null,
      te_sectors: null,
      te_id: null,
      te_name: null,
      te_logo: null,
      bc_id: null,
      bc_index: null,
      bc_address: null,
      bc_management: null,
      image_file: null,
    },
    error: {
      wk_name: null,
      bc_address: null,
    },
    searchData: {
      wk_search: true,
      co_id: null,
      wk_name: null,
      bc_address: null,
      bc_management: null,
    },
  },
  vehicle: {
    formData: {
      vh_id: undefined,
      vh_index: undefined,
      created_date: undefined,
      modified_date: undefined,
      vh_name: undefined,
      vh_number: undefined,
      vh_description: undefined,
      vh_image: undefined,
      vh_io_state: undefined,
      co_id: undefined,
      co_name: undefined,
      te_index: undefined,
      ic_main: undefined,
      te_id: undefined,
      te_name: undefined,
      te_logo: undefined,
      bc_index: undefined,
      bc_address: undefined,
      bc_management: undefined,
      image_file: undefined,
      ts_index: TS_INDEX,
    },
    error: {
      vh_name: undefined,
      bc_address: undefined,
    },
    searchData: {
      vh_search: true,
      co_id: undefined,
      vh_name: undefined,
      bc_address: undefined,
      bc_management: undefined,
    },
  },
  beacon: {
    formData: {
      bc_address: undefined,
      bc_management: undefined,
      bc_description: undefined,
      // 비콘 관리번호 등록 여부 true: bc_management = 관리번호 자동부여 OR 입력 false:bc_management=null
      management_disabled: false,
      ts_index: TS_INDEX,
    },
    error: {
      bc_address: undefined,
      bc_management: undefined,
    },
    searchData: {
      bc_used_type: undefined,
      name: undefined,
    },
  },
  scanner: {
    formData: {
      scn_id: undefined,
      scn_index: undefined,
      created_date: undefined,
      modified_date: undefined,
      scn_pos_x: undefined,
      scn_kind: undefined,
      scn_group: undefined,
      scn_address: undefined,
      scn_name: undefined,
      scn_ip: undefined,
      scn_port: undefined,
      scn_image: undefined,
      scn_description: undefined,
      local_index: undefined,
      local_name: undefined,
      local_type: undefined,
      local_area: undefined,
      ts_index: TS_INDEX,
    },
    error: {
      local_index: undefined,
      scn_name: undefined,
      scn_pos_x: undefined,
      scn_kind: undefined,
      scn_address: undefined,
      scn_group: undefined,
      scn_ip: undefined,
      scn_port: undefined,
      scn_image: undefined,
    },
    searchData: {
      local_index: undefined,
      scn_address: undefined,
    },
  },
  cctv: {
    formData: {
      cctv_id: null,
      cctv_index: null,
      created_date: null,
      modified_date: null,
      cctv_name: undefined,
      cctv_pos_x: undefined,
      cctv_user_id: undefined,
      cctv_pw: undefined,
      cctv_ip: undefined,
      cctv_port: undefined,
      cctv_group: 0,
      cctv_number: 0,
      cctv_description: undefined,
      cctv_image: undefined,
      cctv_type: 0,
      net_scan_action: 1,
      local_index: null,
      local_name: undefined,
      local_area: undefined,
      local_type: undefined,
      ts_index: TS_INDEX,
    },
    error: {
      cctv_port: null, // 숫자만 입력 가능
      cctv_group: null,
      cctv_number: null,
    },
    searchData: {
      local_index: null,
      local_area: null,
      cctv_name: null,
    },
  },
  sensor: {
    formData: {
      sensor_id: undefined,
      sensor_index: undefined,
      sensor_name: undefined,
      local_index: undefined,
      local_area: undefined,
      local_type: undefined,
      sensor_pos_x: undefined,
      sensor_ip: undefined,
      sensor_port: undefined,
      net_scan_action: 1,
      action: 1,
      // 가스 아이디
      voc_id: undefined,
      comb_id: undefined,
      o2_id: undefined,
      h2s_id: undefined,
      co_id: undefined,
      // 가스코드
      voc_code: undefined,
      comb_code: undefined,
      o2_code: undefined,
      h2s_code: undefined,
      co_code: undefined,
      // 가스이름
      voc_name: undefined,
      comb_name: undefined,
      o2_name: undefined,
      h2s_name: undefined,
      co_name: undefined,
      // 안전범위 입력값
      voc_safety_value: undefined,
      comb_safety_value: undefined,
      o2_safety_min_value: undefined,
      o2_safety_max_value: undefined,
      h2s_safety_value: undefined,
      co_safety_value: undefined,
      // 각 가스 검지 범위
      voc_range_min: 0,
      voc_range_max: 1000,
      comb_range_min: 0,
      comb_range_max: 100,
      o2_range_min: 0,
      o2_range_max: 30,
      h2s_range_min: 0,
      h2s_range_max: 50,
      co_range_min: 0,
      co_range_max: 500,
      sensor_image: undefined,
      ts_index: TS_INDEX,
    },
    error: {
      sensor_ip: undefined,
      sensor_port: undefined,
      voc_error: undefined,
      comb_error: undefined,
      o2_error: undefined,
      h2s_error: undefined,
      co_error: undefined,
      sensor_image: undefined,
    },
    searchData: {
      local_index: null,
    },
  },
  phone: {
    formData: {
      phone_id: undefined,
      phone_index: undefined,
      phone_ip: undefined,
      phone_port: undefined,
      phone_number: undefined,
      phone_pos_x: undefined,
      phone_show: 1,
      phone_description: undefined,
      phone_image: undefined,
      local_index: undefined,
      local_id: undefined,
      local_name: undefined,
      local_used: undefined,
      local_number: undefined,
      net_scan_action: 1,
      ts_index: TS_INDEX,
    },
    error: {
      phone_pos_x: undefined, // 숫자만 입력 가능
      phone_port: undefined, // 숫자만 입력 가능
      phone_number: undefined, // 11자리 숫자 입력
    },
    searchData: {
      local_area: undefined,
      local_index: undefined,
      // phone_name: undefined,
    },
  },
  wifi: {
    formData: {
      wifi_id: undefined,
      wifi_index: undefined,
      wifi_ip: undefined,
      wifi_port: undefined,
      wifi_number: undefined,
      wifi_pos_x: undefined,
      wifi_show: 1,
      wifi_description: undefined,
      wifi_image: undefined,
      local_index: undefined,
      local_id: undefined,
      local_name: undefined,
      local_used: undefined,
      local_number: undefined,
      net_scan_action: 1,
      ts_index: TS_INDEX,
    },
    error: {
      wifi_pos_x: undefined, // 숫자만 입력 가능
      wifi_port: undefined, // 숫자만 입력 가능
    },
    searchData: {
      local_area: undefined,
      local_index: undefined,
    },
  },
  tts: {
    formData: {
      tts_id: undefined,
      tts_index: undefined,
      tts_ip: undefined,
      tts_port: undefined,
      tts_number: undefined,
      tts_pos_x: undefined,
      tts_show: 1,
      tts_description: undefined,
      tts_image: undefined,
      local_index: undefined,
      local_id: undefined,
      local_name: undefined,
      local_used: undefined,
      local_number: undefined,
      net_scan_action: 0,
      ts_index: TS_INDEX,
    },
    error: {
      tts_pos_x: undefined, // 숫자만 입력 가능
      tts_port: undefined, // 숫자만 입력 가능
    },
    searchData: {
      local_area: undefined,
      local_index: undefined,
    },
  },
  wireless: {
    formData: {
      wireless_id: undefined,
      wireless_index: undefined,
      wireless_ip: undefined,
      wireless_port: undefined,
      wireless_number: undefined,
      wireless_pos_x: undefined,
      wireless_show: 1,
      wireless_description: undefined,
      wireless_image: undefined,
      local_index: undefined,
      local_id: undefined,
      local_name: undefined,
      local_used: undefined,
      local_number: undefined,
      net_scan_action: 1,
      ts_index: TS_INDEX,
    },
    error: {
      wireless_pos_x: undefined, // 숫자만 입력 가능
      wireless_port: undefined, // 숫자만 입력 가능
      wireless_image: undefined,
    },
    searchData: {
      local_area: undefined,
      local_index: undefined,
    },
  },
  company: {
    formData: {
      co_id: null,
      created_date: null,
      modified_date: null,
      co_main: 2,
      co_name: null,
      co_sectors: null,
      co_description: null,
      ts_index: TS_INDEX,
    },
    error: {
      co_name: null, // 필수 입력
      co_sectors: null, // 필수 입력
    },
    searchData: {},
  },
  account: {
    formData: {
      acc_id: undefined,
      created_date: undefined,
      modified_date: undefined,
      acc_name: undefined,
      acc_user_id: undefined,
      acc_password: undefined,
      acc_password_check: undefined,
      acc_salt: null,
      acc_phone: undefined,
      acc_tel: undefined,
      acc_mail: undefined,
      acc_role: 2,
      acc_description: undefined,
      ts_index: TS_INDEX,
    },
    error: {
      acc_password: undefined,
    },
    searchData: {
      acc_role: undefined,
      acc_user_id: undefined,
    },
  },

  setting: {
    formData: {
      announce_rolling: undefined,
      cctv_rolling: undefined,
      process_disabled: undefined,
      kma_sido: undefined,
      kma_gun: undefined,
      kma_dong: undefined,
    },
    error: {
      announce_rolling: undefined,
      cctv_rolling: undefined,
      kma_sido: undefined,
    },
    searchData: {},
  },

  kickWorker: {
    formData: {},
    error: {
      datepicker: false,
    },
    searchData: {
      local_index: undefined,
      co_id: undefined,
      from_date: moment().format("YYYY-MM-DD 00:00:00"),
      to_date: moment().format("YYYY-MM-DD 23:59:59"),
      name: undefined,
      ts_index: TS_INDEX,
    },
  },

  kickVehicle: {
    formData: {},
    error: {
      datepicker: false,
    },
    searchData: {
      local_index: undefined,
      co_id: undefined,
      from_date: moment().format("YYYY-MM-DD 00:00:00"),
      to_date: moment().format("YYYY-MM-DD 23:59:59"),
      name: undefined,
      ts_index: TS_INDEX,
    },
  },

  loginlog: {
    formData: {},
    error: {
      datepicker: false,
    },
    searchData: {
      from_date: moment().format("YYYY-MM-DD 00:00:00"),
      to_date: moment().format("YYYY-MM-DD 23:59:59"),
      ip: undefined,
      ts_index: TS_INDEX,
    },
  },
  site: {
    formData: {
      modified_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
      ts_id: null,
      ts_main_title: null,
      ts_sub_title: null,
      te_index: "ENP0001",
      nms_action: 0,
      cctv_action: 0,
      gas_action: 0,
      phone_action: 0,
      wifi_action: 0,
      tts_action: 0,
      sos_action: 0,
      lamp_action: 0,
      wireless_action: 0,
      ts_plan_length: 0,
      ts_description: null,
      ble_type: 0, // 0:사용안함 / 1:출입관리 / 2:위치추적
      dig_type: 1, // 1:누적굴진 / 2:일일굴진
      dig_length_type: 1, // 1: 하단 발파 / 2:상단+하단 발파
      ts_url: null,
      sta_start_point: null, // 시점 sta
      sta_end_point: null, // 종점 sta
    },
  },
  group: {
    formData: {
      group_id: undefined,
      group_name: undefined,
      group_pos_x: undefined,
      group_description: undefined,
      group_count: 0,
      local_id: undefined,
      local_index: undefined,
      local_area: undefined,
      local_name: undefined,
      local_type: undefined,
      local_curr_length: 0,
      local_plan_length: undefined,
      group_kind: 0,
    },
    error: {
      local_index: undefined,
      group_pos_x: undefined,
    },
    searchData: {
      local_index: undefined,
    },
  },
};
