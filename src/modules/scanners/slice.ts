import { createSlice } from '@reduxjs/toolkit';
import {
  asyncState,
  AsyncStateType,
  createActionHandler,
  deleteActionHandler,
  updateActionHandler,
} from 'lib/reducerUtils';
import {
  GET_SCANNERS_FULFILLED,
  GET_SCANNERS_PENDING,
  GET_SCANNERS_REJECTED,
  GET_SCANNER_FULFILLED,
  GET_SCANNER_PENDING,
  GET_SCANNER_REJECTED,
  POST_SCANNER_FULFILLED,
  POST_SCANNER_PENDING,
  POST_SCANNER_REJECTED,
  PUT_SCANNER_FULFILLED,
  PUT_SCANNER_PENDING,
  PUT_SCANNER_REJECTED,
  DELETE_SCANNER_FULFILLED,
  DELETE_SCANNER_PENDING,
  DELETE_SCANNER_REJECTED,
} from './actions';
import { ScannerType } from './types';

const initialState: AsyncStateType<ScannerType[], Error> = asyncState.initial();

const postScannerHandler = createActionHandler<ScannerType>();
const putScannerHandler = updateActionHandler<ScannerType>('scn_id');
const deleteScannerHandler = deleteActionHandler<ScannerType>('scn_id');

export const scannerSlice = createSlice({
  name: 'scanners',
  initialState,
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    /**@GET */
    [GET_SCANNERS_PENDING]: (state, action) => asyncState.load(),
    [GET_SCANNERS_FULFILLED]: (state, action) => asyncState.success(action.payload),
    [GET_SCANNERS_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@GET */
    [GET_SCANNER_PENDING]: (state, action) => asyncState.load(),
    [GET_SCANNER_FULFILLED]: (state, action) => asyncState.success(action.payload),
    [GET_SCANNER_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@POST */
    [POST_SCANNER_PENDING]: (state, action) => asyncState.load(state.data),
    [POST_SCANNER_FULFILLED]: (state, action) => postScannerHandler(state, action),
    [POST_SCANNER_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@PUT */
    [PUT_SCANNER_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_SCANNER_FULFILLED]: (state, action) => putScannerHandler(state, action),
    [PUT_SCANNER_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@DELETE */
    [DELETE_SCANNER_PENDING]: (state, action) => asyncState.load(state.data),
    [DELETE_SCANNER_FULFILLED]: (state, action) => deleteScannerHandler(state, action),
    [DELETE_SCANNER_REJECTED]: (state, action) => asyncState.error(action.payload),
  },
});

export default scannerSlice.reducer;
