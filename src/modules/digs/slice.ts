import { createSlice } from '@reduxjs/toolkit';
import {
  asyncState,
  AsyncStateType,
  createActionHandler,
  deleteActionHandler,
  updateActionHandler,
} from 'lib/reducerUtils';
import {
  GET_DIGS_FULFILLED,
  GET_DIGS_PENDING,
  GET_DIGS_REJECTED,
  GET_DIG_FULFILLED,
  GET_DIG_PENDING,
  GET_DIG_REJECTED,
  POST_DIG_FULFILLED,
  POST_DIG_PENDING,
  POST_DIG_REJECTED,
  PUT_DIG_FULFILLED,
  PUT_DIG_PENDING,
  PUT_DIG_REJECTED,
  DELETE_DIG_FULFILLED,
  DELETE_DIG_PENDING,
  DELETE_DIG_REJECTED,
  GET_LOGDIGMONTH_FULFILLED,
  GET_LOGDIGMONTH_PENDING,
  GET_LOGDIGMONTH_REJECTED,
  POST_LOGDIGSEARCH_FULFILLED,
  POST_LOGDIGSEARCH_PENDING,
  POST_LOGDIGSEARCH_REJECTED,
} from './actions';
import { DigType } from './types';

const initialState: AsyncStateType<DigType[], Error> = asyncState.initial();

const postDigHandler = createActionHandler<DigType>();
const putDigHandler = updateActionHandler<DigType>('dig_seq');
const deleteDigHandler = deleteActionHandler<DigType>('dig_seq');

export const digSlice = createSlice({
  name: 'digs',
  initialState,
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    /**@GET */
    [GET_DIGS_PENDING]: (state, action) => asyncState.load(),
    [GET_DIGS_FULFILLED]: (state, action) => asyncState.success(action.payload),
    [GET_DIGS_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@GET */
    [GET_DIG_PENDING]: (state, action) => asyncState.load(),
    [GET_DIG_FULFILLED]: (state, action) => asyncState.success(action.payload),
    [GET_DIG_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@POST */
    [POST_DIG_PENDING]: (state, action) => asyncState.load(state.data),
    [POST_DIG_FULFILLED]: (state, action) => postDigHandler(state, action),
    [POST_DIG_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@PUT */
    [PUT_DIG_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_DIG_FULFILLED]: (state, action) => putDigHandler(state, action),
    [PUT_DIG_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@DELETE */
    [DELETE_DIG_PENDING]: (state, action) => asyncState.load(state.data),
    [DELETE_DIG_FULFILLED]: (state, action) => deleteDigHandler(state, action),
    [DELETE_DIG_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@GETLOG */
    [GET_LOGDIGMONTH_FULFILLED]: (state, action) => asyncState.load(),
    [GET_LOGDIGMONTH_PENDING]: (state, action) =>
      asyncState.success(action.payload),
    [GET_LOGDIGMONTH_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
    /**@POSTLOG */
    [POST_LOGDIGSEARCH_FULFILLED]: (state, action) =>
      asyncState.load(state.data),
    [POST_LOGDIGSEARCH_PENDING]: (state, action) =>
      postDigHandler(state, action),
    [POST_LOGDIGSEARCH_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
  },
});

export default digSlice.reducer;
