import * as cctvAPI from '../../api/cctvs';
import { createThunk, deleteThunk, updateThunk } from 'lib/createAsyncThunk';
import { CctvType } from './types';
import {
  GET_CCTVS,
  GET_CCTV,
  POST_CCTV,
  PUT_CCTV,
  DELETE_CCTV,
  PUT_IMAGE_CCTV,
} from './actions';

export const getCctvs = createThunk<CctvType[]>(GET_CCTVS, cctvAPI.getCctvs);
export const getCctv = createThunk<CctvType[]>(GET_CCTV, cctvAPI.getCctvById);

export const postCctv = createThunk<CctvType[], CctvType>(POST_CCTV, cctvAPI.postCctv);

export const putCctv = updateThunk<CctvType, CctvType>(
  'cctv_id',
  PUT_CCTV,
  cctvAPI.putCctv,
);

export const deleteCctv = deleteThunk<CctvType, CctvType>(
  'cctv_id',
  DELETE_CCTV,
  cctvAPI.deleteCctv,
);

export const putImageCctv = updateThunk<CctvType, CctvType>(
  'cctv_id',
  PUT_IMAGE_CCTV,
  cctvAPI.putImageCctv,
);
