import { createSlice } from "@reduxjs/toolkit";
import { asyncState, AsyncStateType } from "lib/reducerUtils";
import { BleType } from "modules/beacons";
import { LocalType } from "modules/locals/types";
import { DeviceType } from "types/devices";
import { EnvironmentType, WeatherType } from "types/monitors";
import { SensorType } from "types/sensors";
import {
  GET_MONITOR,
  GET_MONITOR_FULFILLED,
  GET_MONITOR_REJECTED,
  GET_RECEIVE_SOCKET,
  SET_SOS_SITUACTION,
} from "./actions";

type InitialType = {
  monitor?: AsyncStateType<any[], Error>;
  scanner?: AsyncStateType<any[], Error>;
  beacon: AsyncStateType<BleType[], Error>;
  sensor: AsyncStateType<SensorType[], Error>;
  locals: AsyncStateType<LocalType[], Error>;
  weather: AsyncStateType<WeatherType[], Error>;
  environment: AsyncStateType<EnvironmentType[], Error>;
  ratePanel: boolean;
  alarmPanel: boolean;
  sosSituation: boolean;
  sosList: [];
  sound: boolean;
  gasAlarmPanel: boolean;
  gasSituation: boolean;
  gasList: []; // sensor_danger_action === 1 && [gas]_state_code === 1
  dangerGasList: []; // sensor_danger_action === 0 && [gas]_state_code === 1
  repositionAction: boolean;
  devices: AsyncStateType<DeviceType[], Error>;
  portscan: string[];
  socketError: boolean;
};

const initialState: InitialType = {
  monitor: asyncState.initial(),
  scanner: asyncState.initial(),
  beacon: asyncState.initial(),
  sensor: asyncState.initial(),
  locals: asyncState.initial(),
  weather: asyncState.initial(),
  environment: asyncState.initial(),
  ratePanel: false,
  alarmPanel: false,
  sosSituation: false,
  sosList: [],
  sound: false,
  gasAlarmPanel: false,
  gasSituation: false,
  gasList: [], // sensor_danger_action === 1 && [gas]_state_code === 1
  dangerGasList: [], // sensor_danger_action === 0 && [gas]_state_code === 1
  repositionAction: false,
  devices: asyncState.initial(),
  portscan: [],
  socketError: false,
};

export const monitorSlice = createSlice({
  name: "monitor",
  initialState,
  reducers: {
    // [SET_SOS_SITUACTION]: (state) => {
    //   console.log("SET_SOS_SITUACTION--->", state);
    // },
  },
  extraReducers: {
    /**@GET */
    [GET_MONITOR]: (state, action) => asyncState.load(),
    [GET_MONITOR_FULFILLED]: (state, action) =>
      asyncState.success(action.payload),
    [GET_MONITOR_REJECTED]: (state, action) => asyncState.error(action.payload),
    [SET_SOS_SITUACTION]: (state, action) => {
      const filterSOS = action.payload.filter(
        (item: BleType) =>
          item.bc_emergency === 2 &&
          item.bc_sos_action === 1 &&
          (item.bc_used_type === 1 || item.bc_used_type === 0) &&
          item
      );
      state.alarmPanel = filterSOS.length > 0 ? true : false;
      state.sosList = filterSOS.length > 0 ? filterSOS : [];
      state.sosSituation = filterSOS.length > 0 ? true : false;
      // return {
      //   ...state,
      //   alarmPanel: filterSOS.length > 0 ? true : false,
      //   sosList: filterSOS.length > 0 ? filterSOS : [],
      //   sosSituation: filterSOS.length > 0 ? true : false,
      // };
    },
    [GET_RECEIVE_SOCKET]: (state, action) => {
      const { scanner, beacon, sensor, locals, devices, portscan } =
        action.payload;
      return {
        ...state,
        // scanner: {
        //   ...state.scanner,
        //   data: scanner ?? null,
        // },
        locals: {
          ...state.locals,
          data: locals,
        },
        beacon: {
          ...state.beacon,
          data: beacon,
        },
        sensor: {
          ...state.sensor,
          data: sensor.filter((item: SensorType) => item.action !== 0 && item),
        },
        devices: {
          ...state.devices,
          data: devices,
        },
        portscan,
      };
    },
  },
});

export default monitorSlice.reducer;
