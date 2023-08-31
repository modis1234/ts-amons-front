import { createSlice } from '@reduxjs/toolkit';
import {
  asyncState,
  AsyncStateType,
  createActionHandler,
  deleteActionHandler,
  updateActionHandler,
} from 'lib/reducerUtils';
import {
  DELETE_COMPANY_FULFILLED,
  DELETE_COMPANY_PENDING,
  DELETE_COMPANY_REJECTED,
  GET_COMPANIES_FULFILLED,
  GET_COMPANIES_PENDING,
  GET_COMPANIES_REJECTED,
  GET_COMPANY_FULFILLED,
  GET_COMPANY_PENDING,
  GET_COMPANY_REJECTED,
  POST_COMPANY_FULFILLED,
  POST_COMPANY_PENDING,
  POST_COMPANY_REJECTED,
  PUT_COMPANY_FULFILLED,
  PUT_COMPANY_PENDING,
  PUT_COMPANY_REJECTED,
} from './actions';
import { CompanyType } from './types';

const initialState: AsyncStateType<CompanyType[], Error> = asyncState.initial();

const postCompanyHandler = createActionHandler<CompanyType>();
const putCompanyHandler = updateActionHandler<CompanyType>('co_id');
const deleteCompanyHandler = deleteActionHandler<CompanyType>('co_id');

export const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    /**@GET */
    [GET_COMPANIES_PENDING]: (state, action) => asyncState.load(),
    [GET_COMPANIES_FULFILLED]: (state, action) =>
      asyncState.success(action.payload),
    [GET_COMPANIES_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
    /**@GET */
    [GET_COMPANY_PENDING]: (state, action) => asyncState.load(),
    [GET_COMPANY_FULFILLED]: (state, action) =>
      asyncState.success(action.payload),
    [GET_COMPANY_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@POST */
    [POST_COMPANY_PENDING]: (state, action) => asyncState.load(state.data),
    [POST_COMPANY_FULFILLED]: (state, action) =>
      postCompanyHandler(state, action),
    [POST_COMPANY_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
    /**@PUT */
    [PUT_COMPANY_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_COMPANY_FULFILLED]: (state, action) =>
      putCompanyHandler(state, action),
    [PUT_COMPANY_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@DELETE */
    [DELETE_COMPANY_PENDING]: (state, action) => asyncState.load(state.data),
    [DELETE_COMPANY_FULFILLED]: (state, action) =>
      deleteCompanyHandler(state, action),
    [DELETE_COMPANY_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
  },
});

export default companySlice.reducer;
