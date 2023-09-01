import { createSlice } from '@reduxjs/toolkit';
import {
  asyncState,
  AsyncStateType,
  createActionHandler,
  deleteActionHandler,
  updateActionHandler,
} from 'lib/reducerUtils';
import {
  GET_PROCESSES_FULFILLED,
  GET_PROCESSES_PENDING,
  GET_PROCESSES_REJECTED,
  GET_PROCESS_FULFILLED,
  GET_PROCESS_PENDING,
  GET_PROCESS_REJECTED,
  POST_PROCESS_FULFILLED,
  POST_PROCESS_PENDING,
  POST_PROCESS_REJECTED,
  PUT_PROCESS_FULFILLED,
  PUT_PROCESS_PENDING,
  PUT_PROCESS_REJECTED,
  DELETE_PROCESS_FULFILLED,
  DELETE_PROCESS_PENDING,
  DELETE_PROCESS_REJECTED,
} from './actions';
import { ProcessType } from './types';

const initialState: AsyncStateType<ProcessType[], Error> = asyncState.initial();

const postProcessHandler = createActionHandler<ProcessType>();
const putProcessHandler = updateActionHandler<ProcessType>('pcs_seq');
const deleteProcessHandler = deleteActionHandler<ProcessType>('pcs_seq');

export const processSlice = createSlice({
  name: 'processes',
  initialState,
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    /**@GET */
    [GET_PROCESSES_PENDING]: (state, action) => asyncState.load(),
    [GET_PROCESSES_FULFILLED]: (state, action) => asyncState.success(action.payload),
    [GET_PROCESSES_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@GET */
    [GET_PROCESS_PENDING]: (state, action) => asyncState.load(),
    [GET_PROCESS_FULFILLED]: (state, action) => asyncState.success(action.payload),
    [GET_PROCESS_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@POST */
    [POST_PROCESS_PENDING]: (state, action) => asyncState.load(state.data),
    [POST_PROCESS_FULFILLED]: (state, action) => postProcessHandler(state, action),
    [POST_PROCESS_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@PUT */
    [PUT_PROCESS_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_PROCESS_FULFILLED]: (state, action) => putProcessHandler(state, action),
    [PUT_PROCESS_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@DELETE */
    [DELETE_PROCESS_PENDING]: (state, action) => asyncState.load(state.data),
    [DELETE_PROCESS_FULFILLED]: (state, action) => deleteProcessHandler(state, action),
    [DELETE_PROCESS_REJECTED]: (state, action) => asyncState.error(action.payload),
  },
});

export default processSlice.reducer;
