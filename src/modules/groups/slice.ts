import { createSlice } from '@reduxjs/toolkit';
import {
  asyncState,
  AsyncStateType,
  createActionHandler,
  deleteActionHandler,
  updateActionHandler,
} from 'lib/reducerUtils';
import {
  DELETE_GROUP_FULFILLED,
  DELETE_GROUP_PENDING,
  DELETE_GROUP_REJECTED,
  GET_GROUPS_FULFILLED,
  GET_GROUPS_PENDING,
  GET_GROUPS_REJECTED,
  GET_GROUP_FULFILLED,
  GET_GROUP_PENDING,
  GET_GROUP_REJECTED,
  POST_GROUP_FULFILLED,
  POST_GROUP_PENDING,
  POST_GROUP_REJECTED,
  PUT_GROUP_FULFILLED,
  PUT_GROUP_PENDING,
  PUT_GROUP_REJECTED,
} from './actions';
import { GroupType } from './types';

const initialState: AsyncStateType<GroupType[], Error> = asyncState.initial();

const postGroupHandler = createActionHandler<GroupType>();
const putGroupHandler = updateActionHandler<GroupType>('group_id');
const deleteGroupHandler = deleteActionHandler<GroupType>('group_id');

export const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    /**@GET */
    [GET_GROUPS_PENDING]: (state, action) => asyncState.load(),
    [GET_GROUPS_FULFILLED]: (state, action) =>
      asyncState.success(action.payload),
    [GET_GROUPS_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@GET */
    [GET_GROUP_PENDING]: (state, action) => asyncState.load(),
    [GET_GROUP_FULFILLED]: (state, action) =>
      asyncState.success(action.payload),
    [GET_GROUP_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@POST */
    [POST_GROUP_PENDING]: (state, action) => asyncState.load(state.data),
    [POST_GROUP_FULFILLED]: (state, action) => postGroupHandler(state, action),
    [POST_GROUP_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@PUT */
    [PUT_GROUP_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_GROUP_FULFILLED]: (state, action) => putGroupHandler(state, action),
    [PUT_GROUP_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@DELETE */
    [DELETE_GROUP_PENDING]: (state, action) => asyncState.load(state.data),
    [DELETE_GROUP_FULFILLED]: (state, action) =>
      deleteGroupHandler(state, action),
    [DELETE_GROUP_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
  },
});

export default groupSlice.reducer;
