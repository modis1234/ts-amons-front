import { createSlice } from '@reduxjs/toolkit';
import {
  asyncState,
  AsyncStateType,
  createActionHandler,
  deleteActionHandler,
  updateActionHandler,
} from 'lib/reducerUtils';
import {
  GET_CCTVS_FULFILLED,
  GET_CCTVS_PENDING,
  GET_CCTVS_REJECTED,
  GET_CCTV_FULFILLED,
  GET_CCTV_PENDING,
  GET_CCTV_REJECTED,
  POST_CCTV_FULFILLED,
  POST_CCTV_PENDING,
  POST_CCTV_REJECTED,
  PUT_CCTV_FULFILLED,
  PUT_CCTV_PENDING,
  PUT_CCTV_REJECTED,
  DELETE_CCTV_FULFILLED,
  DELETE_CCTV_PENDING,
  DELETE_CCTV_REJECTED,
  PUT_IMAGE_CCTV_PENDING,
  PUT_IMAGE_CCTV_FULFILLED,
  PUT_IMAGE_CCTV_REJECTED,
} from './actions';
import { CctvType } from './types';

const initialState: AsyncStateType<CctvType[], Error> = asyncState.initial();

const postCctvHandler = createActionHandler<CctvType>();
const putCctvHandler = updateActionHandler<CctvType>('cctv_id');
const deleteCctvHandler = deleteActionHandler<CctvType>('cctv_id');

export const cctvSlice = createSlice({
  name: 'cctvs',
  initialState,
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    /**@GET */
    [GET_CCTVS_PENDING]: (state, action) => asyncState.load(),
    [GET_CCTVS_FULFILLED]: (state, action) => asyncState.success(action.payload),
    [GET_CCTVS_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@GET */
    [GET_CCTV_PENDING]: (state, action) => asyncState.load(),
    [GET_CCTV_FULFILLED]: (state, action) => asyncState.success(action.payload),
    [GET_CCTV_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@POST */
    [POST_CCTV_PENDING]: (state, action) => asyncState.load(state.data),
    [POST_CCTV_FULFILLED]: (state, action) => postCctvHandler(state, action),
    [POST_CCTV_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@PUT */
    [PUT_CCTV_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_CCTV_FULFILLED]: (state, action) => putCctvHandler(state, action),
    [PUT_CCTV_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@DELETE */
    [DELETE_CCTV_PENDING]: (state, action) => asyncState.load(state.data),
    [DELETE_CCTV_FULFILLED]: (state, action) => deleteCctvHandler(state, action),
    [DELETE_CCTV_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@PUT_IMAGE */
    [PUT_IMAGE_CCTV_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_IMAGE_CCTV_FULFILLED]: (state, action) => putCctvHandler(state, action),
    [PUT_IMAGE_CCTV_REJECTED]: (state, action) => asyncState.error(action.payload),
  },
});

export default cctvSlice.reducer;
