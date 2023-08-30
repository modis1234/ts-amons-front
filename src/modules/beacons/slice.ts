import { createSlice } from "@reduxjs/toolkit";
import {
  asyncState,
  AsyncStateType,
  createActionHandler,
  deleteActionHandler,
  updateActionHandler,
} from "lib/reducerUtils";
import {
  DELETE_BEACON_FULFILLED,
  DELETE_BEACON_PENDING,
  DELETE_BEACON_REJECTED,
  GET_BEACONS_FULFILLED,
  GET_BEACONS_PENDING,
  GET_BEACONS_REJECTED,
  GET_BEACON_FULFILLED,
  GET_BEACON_PENDING,
  GET_BEACON_REJECTED,
  GET_UNUSED_BEACONS_FULFILLED,
  GET_UNUSED_BEACONS_PENDING,
  GET_UNUSED_BEACONS_REJECTED,
  POST_BEACON_FULFILLED,
  POST_BEACON_PENDING,
  POST_BEACON_REJECTED,
  PUT_BEACON_FULFILLED,
  PUT_BEACON_PENDING,
  PUT_BEACON_REJECTED,
} from "./actions";
import { BeaconType } from "./types";

const initialState: AsyncStateType<BeaconType[], Error> = asyncState.initial();

const postBeaconrHandler = createActionHandler<BeaconType>();
const putBeaconrHandler = updateActionHandler<BeaconType>("bc_id");
const deleteBeaconrHandler = deleteActionHandler<BeaconType>("bc_id");

const postSearchBeaconsByWorkerNameReducer = createActionHandler<BeaconType>();
const postSearchBeaconsByVehicleNameReducer = createActionHandler<BeaconType>();

export const workerSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    /**@GET */
    [GET_BEACONS_PENDING]: (state, action) => asyncState.load(),
    [GET_BEACONS_FULFILLED]: (state, action) =>
      asyncState.success(action.payload),
    [GET_BEACONS_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@GET */
    [GET_BEACON_PENDING]: (state, action) => asyncState.load(),
    [GET_BEACON_FULFILLED]: (state, action) =>
      asyncState.success(action.payload),
    [GET_BEACON_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@POST */
    [POST_BEACON_PENDING]: (state, action) => asyncState.load(state.data),
    [POST_BEACON_FULFILLED]: (state, action) =>
      postBeaconrHandler(state, action),
    [POST_BEACON_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@PUT */
    [PUT_BEACON_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_BEACON_FULFILLED]: (state, action) => putBeaconrHandler(state, action),
    [PUT_BEACON_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@DELETE */
    [DELETE_BEACON_PENDING]: (state, action) => asyncState.load(state.data),
    [DELETE_BEACON_FULFILLED]: (state, action) =>
      deleteBeaconrHandler(state, action),
    [DELETE_BEACON_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
    /**@GET */
    [GET_UNUSED_BEACONS_PENDING]: (state, action) => asyncState.load(),
    [GET_UNUSED_BEACONS_FULFILLED]: (state, action) =>
      asyncState.success(action.payload),
    [GET_UNUSED_BEACONS_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
  },
});

export default workerSlice.reducer;
