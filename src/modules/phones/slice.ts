import { createSlice } from '@reduxjs/toolkit';
import {
  asyncState,
  AsyncStateType,
  createActionHandler,
  deleteActionHandler,
  updateActionHandler,
} from 'lib/reducerUtils';
import {
  GET_PHONES_FULFILLED,
  GET_PHONES_PENDING,
  GET_PHONES_REJECTED,
  GET_PHONE_FULFILLED,
  GET_PHONE_PENDING,
  GET_PHONE_REJECTED,
  POST_PHONE_FULFILLED,
  POST_PHONE_PENDING,
  POST_PHONE_REJECTED,
  PUT_PHONE_FULFILLED,
  PUT_PHONE_PENDING,
  PUT_PHONE_REJECTED,
  DELETE_PHONE_FULFILLED,
  DELETE_PHONE_PENDING,
  DELETE_PHONE_REJECTED,
  PUT_IMAGE_PHONE_PENDING,
  PUT_IMAGE_PHONE_FULFILLED,
  PUT_IMAGE_PHONE_REJECTED,
} from './actions';
import { PhoneType } from './types';

const initialState: AsyncStateType<PhoneType[], Error> = asyncState.initial();

const postPhoneHandler = createActionHandler<PhoneType>();
const putPhoneHandler = updateActionHandler<PhoneType>('phone_id');
const deletePhoneHandler = deleteActionHandler<PhoneType>('phone_id');

export const phoneSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    /**@GET */
    [GET_PHONES_PENDING]: (state, action) => asyncState.load(),
    [GET_PHONES_FULFILLED]: (state, action) => asyncState.success(action.payload),
    [GET_PHONES_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@GET */
    [GET_PHONE_PENDING]: (state, action) => asyncState.load(),
    [GET_PHONE_FULFILLED]: (state, action) => asyncState.success(action.payload),
    [GET_PHONE_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@POST */
    [POST_PHONE_PENDING]: (state, action) => asyncState.load(state.data),
    [POST_PHONE_FULFILLED]: (state, action) => postPhoneHandler(state, action),
    [POST_PHONE_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@PUT */
    [PUT_PHONE_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_PHONE_FULFILLED]: (state, action) => putPhoneHandler(state, action),
    [PUT_PHONE_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@DELETE */
    [DELETE_PHONE_PENDING]: (state, action) => asyncState.load(state.data),
    [DELETE_PHONE_FULFILLED]: (state, action) => deletePhoneHandler(state, action),
    [DELETE_PHONE_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@PUT_IMAGE */
    [PUT_IMAGE_PHONE_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_IMAGE_PHONE_FULFILLED]: (state, action) => putPhoneHandler(state, action),
    [PUT_IMAGE_PHONE_REJECTED]: (state, action) => asyncState.error(action.payload),
  },
});

export default phoneSlice.reducer;
