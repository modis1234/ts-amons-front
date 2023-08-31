import { createSlice } from '@reduxjs/toolkit';
import {
  asyncState,
  AsyncStateType,
  createActionHandler,
  deleteActionHandler,
  updateActionHandler,
} from 'lib/reducerUtils';
import {
  DELETE_WORKER_FULFILLED,
  DELETE_WORKER_PENDING,
  DELETE_WORKER_REJECTED,
  GET_WORKERS_FULFILLED,
  GET_WORKERS_PENDING,
  GET_WORKERS_REJECTED,
  GET_WORKER_FULFILLED,
  GET_WORKER_PENDING,
  GET_WORKER_REJECTED,
  POST_WORKER_FULFILLED,
  POST_WORKER_PENDING,
  POST_WORKER_REJECTED,
  PUT_WORKER_FULFILLED,
  PUT_WORKER_PENDING,
  PUT_WORKER_REJECTED,
} from './actions';
import { WorkerType } from './types';

const initialState: AsyncStateType<WorkerType[], Error> = asyncState.initial();

const postWorkerHandler = createActionHandler<WorkerType>();
const putWorkerHandler = updateActionHandler<WorkerType>('wk_id');
const deleteWorkerHandler = deleteActionHandler<WorkerType>('wk_id');

export const workerSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    /**@GET */
    [GET_WORKERS_PENDING]: (state, action) => asyncState.load(),
    [GET_WORKERS_FULFILLED]: (state, action) =>
      asyncState.success(action.payload),
    [GET_WORKERS_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@GET */
    [GET_WORKER_PENDING]: (state, action) => asyncState.load(),
    [GET_WORKER_FULFILLED]: (state, action) =>
      asyncState.success(action.payload),
    [GET_WORKER_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@POST */
    [POST_WORKER_PENDING]: (state, action) => asyncState.load(state.data),
    [POST_WORKER_FULFILLED]: (state, action) =>
      postWorkerHandler(state, action),
    [POST_WORKER_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@PUT */
    [PUT_WORKER_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_WORKER_FULFILLED]: (state, action) => putWorkerHandler(state, action),
    [PUT_WORKER_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@DELETE */
    [DELETE_WORKER_PENDING]: (state, action) => asyncState.load(state.data),
    [DELETE_WORKER_FULFILLED]: (state, action) =>
      deleteWorkerHandler(state, action),
    [DELETE_WORKER_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
  },
});

export default workerSlice.reducer;
