import { asyncActions } from 'lib/reducerUtils';

export const [
  GET_LOCALS,
  GET_LOCALS_PENDING,
  GET_LOCALS_FULFILLED,
  GET_LOCALS_REJECTED,
] = asyncActions('locals/GET_LOCALS');

export const [
  GET_LOCAL,
  GET_LOCAL_PENDING,
  GET_LOCAL_FULFILLED,
  GET_LOCAL_REJECTED,
] = asyncActions('locals/GET_LOCAL');

export const [
  POST_LOCAL,
  POST_LOCAL_PENDING,
  POST_LOCAL_FULFILLED,
  POST_LOCAL_REJECTED,
] = asyncActions('locals/POST_LOCAL');

export const [
  PUT_LOCAL,
  PUT_LOCAL_PENDING,
  PUT_LOCAL_FULFILLED,
  PUT_LOCAL_REJECTED,
] = asyncActions('locals/PUT_LOCAL');

export const [
  DELETE_LOCAL,
  DELETE_LOCAL_PENDING,
  DELETE_LOCAL_FULFILLED,
  DELETE_LOCAL_REJECTED,
] = asyncActions('locals/DELETE_LOCAL');
