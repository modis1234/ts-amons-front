import { asyncActions } from 'lib/reducerUtils';

export const [GET_CCTVS, GET_CCTVS_PENDING, GET_CCTVS_FULFILLED, GET_CCTVS_REJECTED] =
  asyncActions('cctvs/GET_CCTVS');

export const [GET_CCTV, GET_CCTV_PENDING, GET_CCTV_FULFILLED, GET_CCTV_REJECTED] =
  asyncActions('cctvs/GET_CCTV');

export const [POST_CCTV, POST_CCTV_PENDING, POST_CCTV_FULFILLED, POST_CCTV_REJECTED] =
  asyncActions('cctvs/POST_CCTV');

export const [PUT_CCTV, PUT_CCTV_PENDING, PUT_CCTV_FULFILLED, PUT_CCTV_REJECTED] =
  asyncActions('cctvs/PUT_CCTV');

export const [
  DELETE_CCTV,
  DELETE_CCTV_PENDING,
  DELETE_CCTV_FULFILLED,
  DELETE_CCTV_REJECTED,
] = asyncActions('cctvs/DELETE_CCTV');

export const [
  PUT_IMAGE_CCTV,
  PUT_IMAGE_CCTV_PENDING,
  PUT_IMAGE_CCTV_FULFILLED,
  PUT_IMAGE_CCTV_REJECTED,
] = asyncActions('cctvs/PUT_IMAGE_CCTV');
