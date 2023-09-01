import { createSlice } from '@reduxjs/toolkit';
import {
  asyncState,
  AsyncStateType,
  createActionHandler,
  deleteActionHandler,
  updateActionHandler,
} from 'lib/reducerUtils';
import {
  GET_SENSORS_FULFILLED,
  GET_SENSORS_PENDING,
  GET_SENSORS_REJECTED,
  GET_SENSOR_FULFILLED,
  GET_SENSOR_PENDING,
  GET_SENSOR_REJECTED,
  POST_SENSOR_FULFILLED,
  POST_SENSOR_PENDING,
  POST_SENSOR_REJECTED,
  PUT_SENSOR_FULFILLED,
  PUT_SENSOR_PENDING,
  PUT_SENSOR_REJECTED,
  DELETE_SENSOR_FULFILLED,
  DELETE_SENSOR_PENDING,
  DELETE_SENSOR_REJECTED,
  POST_ALARM_SEARCH_PENDING,
  POST_ALARM_SEARCH_FULFILLED,
  POST_ALARM_SEARCH_REJECTED,
  GET_ALARM_LIMIT_PENDING,
  GET_ALARM_LIMIT_FULFILLED,
  GET_ALARM_LIMIT_REJECTED,
  POST_SENSOR_RECORD_PENDING,
  POST_SENSOR_RECORD_FULFILLED,
  POST_SENSOR_RECORD_REJECTED,
  PUT_IMAGE_SENSOR_PENDING,
  PUT_IMAGE_SENSOR_FULFILLED,
  PUT_IMAGE_SENSOR_REJECTED,
} from './actions';
import { SensorType } from './types';

const initialState: AsyncStateType<SensorType[], Error> = asyncState.initial();

const postSensorHandler = createActionHandler<SensorType>();
const putSensorHandler = updateActionHandler<SensorType>('sensor_id');
const deleteSensorHandler = deleteActionHandler<SensorType>('sensor_id');

export const sensorSlice = createSlice({
  name: 'sensors',
  initialState,
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    /**@GET */
    [GET_SENSORS_PENDING]: (state, action) => asyncState.load(),
    [GET_SENSORS_FULFILLED]: (state, action) => asyncState.success(action.payload),
    [GET_SENSORS_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@GET */
    [GET_SENSOR_PENDING]: (state, action) => asyncState.load(),
    [GET_SENSOR_FULFILLED]: (state, action) => asyncState.success(action.payload),
    [GET_SENSOR_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@POST */
    [POST_SENSOR_PENDING]: (state, action) => asyncState.load(state.data),
    [POST_SENSOR_FULFILLED]: (state, action) => postSensorHandler(state, action),
    [POST_SENSOR_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@PUT */
    [PUT_SENSOR_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_SENSOR_FULFILLED]: (state, action) => putSensorHandler(state, action),
    [PUT_SENSOR_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@DELETE */
    [DELETE_SENSOR_PENDING]: (state, action) => asyncState.load(state.data),
    [DELETE_SENSOR_FULFILLED]: (state, action) => deleteSensorHandler(state, action),
    [DELETE_SENSOR_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@POST_ALARM_SEARCH */
    [POST_ALARM_SEARCH_PENDING]: (state, action) => asyncState.load(state.data),
    [POST_ALARM_SEARCH_FULFILLED]: (state, action) => postSensorHandler(state, action),
    [POST_ALARM_SEARCH_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@GET_ALARM_LIMIT */
    [GET_ALARM_LIMIT_PENDING]: (state, action) => asyncState.load(),
    [GET_ALARM_LIMIT_FULFILLED]: (state, action) => asyncState.success(action.payload),
    [GET_ALARM_LIMIT_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@POST_SENSOR_RECORD */
    [POST_SENSOR_RECORD_PENDING]: (state, action) => asyncState.load(state.data),
    [POST_SENSOR_RECORD_FULFILLED]: (state, action) => postSensorHandler(state, action),
    [POST_SENSOR_RECORD_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@PUT_IMAGE_SENSOR */
    [PUT_IMAGE_SENSOR_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_IMAGE_SENSOR_FULFILLED]: (state, action) => putSensorHandler(state, action),
    [PUT_IMAGE_SENSOR_REJECTED]: (state, action) => asyncState.error(action.payload),
  },
});

export default sensorSlice.reducer;
