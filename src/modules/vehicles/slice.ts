import { createSlice } from '@reduxjs/toolkit';
import {
  asyncState,
  AsyncStateType,
  createActionHandler,
  deleteActionHandler,
  updateActionHandler,
} from 'lib/reducerUtils';
import {
  DELETE_VEHICLE_FULFILLED,
  DELETE_VEHICLE_PENDING,
  DELETE_VEHICLE_REJECTED,
  GET_VEHICLES_FULFILLED,
  GET_VEHICLES_PENDING,
  GET_VEHICLES_REJECTED,
  GET_VEHICLE_FULFILLED,
  GET_VEHICLE_PENDING,
  GET_VEHICLE_REJECTED,
  POST_VEHICLE_FULFILLED,
  POST_VEHICLE_PENDING,
  POST_VEHICLE_REJECTED,
  PUT_VEHICLE_FULFILLED,
  PUT_VEHICLE_PENDING,
  PUT_VEHICLE_REJECTED,
} from './actions';
import { VehicleType } from './types';

const initialState: AsyncStateType<VehicleType[], Error> = asyncState.initial();

const postVehicleHandler = createActionHandler<VehicleType>();
const putVehicleHandler = updateActionHandler<VehicleType>('vh_id');
const deleteVehicleHandler = deleteActionHandler<VehicleType>('vh_id');

export const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    /**@GET */
    [GET_VEHICLES_PENDING]: (state, action) => asyncState.load(),
    [GET_VEHICLES_FULFILLED]: (state, action) =>
      asyncState.success(action.payload),
    [GET_VEHICLES_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
    /**@GET */
    [GET_VEHICLE_PENDING]: (state, action) => asyncState.load(),
    [GET_VEHICLE_FULFILLED]: (state, action) =>
      asyncState.success(action.payload),
    [GET_VEHICLE_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@POST */
    [POST_VEHICLE_PENDING]: (state, action) => asyncState.load(state.data),
    [POST_VEHICLE_FULFILLED]: (state, action) =>
      postVehicleHandler(state, action),
    [POST_VEHICLE_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
    /**@PUT */
    [PUT_VEHICLE_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_VEHICLE_FULFILLED]: (state, action) =>
      putVehicleHandler(state, action),
    [PUT_VEHICLE_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@DELETE */
    [DELETE_VEHICLE_PENDING]: (state, action) => asyncState.load(state.data),
    [DELETE_VEHICLE_FULFILLED]: (state, action) =>
      deleteVehicleHandler(state, action),
    [DELETE_VEHICLE_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
  },
});

export default vehicleSlice.reducer;
