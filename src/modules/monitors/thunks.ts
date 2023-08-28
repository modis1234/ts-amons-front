import { createThunk } from "lib/createAsyncThunk";
import { GET_MONITOR, GET_RECEIVE_SOCKET, SET_SOS_SITUACTION } from "./actions";
import * as monitorAPI from "../../api/monitor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { io } from "socket.io-client"; // 모듈 가져오기
import { format } from "date-fns";
import { MonitorType } from "types/monitors";

export const getMonitor = createThunk<MonitorType[]>(
  GET_MONITOR,
  monitorAPI.getMonitor
);

let socket: any;
// export const receiveMonitor = createThunk<SiteType[]>(GET_RECEIVE_SOCKET, monitorAPI.);
export const receiveMonitor = createAsyncThunk(
  GET_RECEIVE_SOCKET,
  async (userId: number, thunkAPI) => {
    console.log("userId-->", userId);
    const dispatch = thunkAPI.dispatch;
    if (!socket) {
      // socket = io.connect(`http://${process.env.REACT_APP_API_SERVER}`); // 3000번 포트 사용(서버)
      socket = io(`http://${process.env.REACT_APP_API_SERVER}`);
    }

    socket.on("connect", () => {
      // ...
      const _date = new Date();
      console.log(
        `%c connect Success:: ${format(_date, "yyyy-MM-dd HH:mm:ss")}`,
        "color:green"
      );

      const _socketError = thunkAPI.getState();
      console.log("_socketError->", _socketError);
      // if (_socketError) {
      //   dispatch({ type: SOCKET_ERROR, payload: false });
      // }
    });
    socket.emit("getData", process.env.REACT_APP_TS_INDEX ?? null);
    socket.on("getData", (data: MonitorType) => {
      const { beacon, sensor, scanner, locals, devices, portscan } = data;
      // console.log("data->", data);
      dispatch({ type: SET_SOS_SITUACTION, payload: beacon });

      // dispatch({ type: SET_GAS_ALARM_SITUACTION, payload: sensor });

      dispatch({ type: GET_RECEIVE_SOCKET, payload: data });
    });
  }
);
