import * as digAPI from '../../api/digs';
import { createThunk, deleteThunk, updateThunk } from 'lib/createAsyncThunk';
import { DigType } from './types';
import {GET_DIG, GET_DIGS, POST_DIG, PUT_DIG, DELETE_DIG,  } from './actions';

export const getDigs = createThunk<DigType[]>(GET_DIGS, digAPI.getDigs);
export const getDig = createThunk<DigType[]>(GET_DIG, digAPI.getDigById);

export const postDig = createThunk<DigType[], DigType>(
  POST_DIG,
  digAPI.postDig
);

export const putDig = updateThunk<DigType, DigType>(
  'dig_seq',
  PUT_DIG,
  digAPI.putDig
);

export const deleteDig = deleteThunk<DigType, DigType>(
  'dig_seq',
  DELETE_DIG,
  digAPI.deleteDig
);
