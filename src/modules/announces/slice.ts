import { createSlice } from '@reduxjs/toolkit';
import {
  asyncState,
  AsyncStateType,
  createActionHandler,
  deleteActionHandler,
  updateActionHandler,
} from 'lib/reducerUtils';
import {
  GET_ANNOUNCES_FULFILLED,
  GET_ANNOUNCES_PENDING,
  GET_ANNOUNCES_REJECTED,
  GET_ANNOUNCE_FULFILLED,
  GET_ANNOUNCE_PENDING,
  GET_ANNOUNCE_REJECTED,
  POST_ANNOUNCE_FULFILLED,
  POST_ANNOUNCE_PENDING,
  POST_ANNOUNCE_REJECTED,
  PUT_ANNOUNCE_FULFILLED,
  PUT_ANNOUNCE_PENDING,
  PUT_ANNOUNCE_REJECTED,
  DELETE_ANNOUNCE_FULFILLED,
  DELETE_ANNOUNCE_PENDING,
  DELETE_ANNOUNCE_REJECTED,
} from './actions';
import { AnnounceType } from './types';

const initialState: AsyncStateType<AnnounceType[], Error> =
  asyncState.initial();

const postAnnounceHandler = createActionHandler<AnnounceType>();
const putAnnounceHandler = updateActionHandler<AnnounceType>('ann_id');
const deleteAnnounceHandler = deleteActionHandler<AnnounceType>('ann_id');

export const announceSlice = createSlice({
  name: 'announces',
  initialState,
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    /**@GET */
    [GET_ANNOUNCES_PENDING]: (state, action) => asyncState.load(),
    [GET_ANNOUNCES_FULFILLED]: (state, action) =>
      asyncState.success(action.payload),
    [GET_ANNOUNCES_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
    /**@GET */
    [GET_ANNOUNCE_PENDING]: (state, action) => asyncState.load(),
    [GET_ANNOUNCE_FULFILLED]: (state, action) =>
      asyncState.success(action.payload),
    [GET_ANNOUNCE_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
    /**@POST */
    [POST_ANNOUNCE_PENDING]: (state, action) => asyncState.load(state.data),
    [POST_ANNOUNCE_FULFILLED]: (state, action) =>
      postAnnounceHandler(state, action),
    [POST_ANNOUNCE_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
    /**@PUT */
    [PUT_ANNOUNCE_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_ANNOUNCE_FULFILLED]: (state, action) =>
      putAnnounceHandler(state, action),
    [PUT_ANNOUNCE_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
    /**@DELETE */
    [DELETE_ANNOUNCE_PENDING]: (state, action) => asyncState.load(state.data),
    [DELETE_ANNOUNCE_FULFILLED]: (state, action) =>
      deleteAnnounceHandler(state, action),
    [DELETE_ANNOUNCE_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
  },
});

export default announceSlice.reducer;
