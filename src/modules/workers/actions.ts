import { asyncActions } from 'lib/reducerUtils';

export const [
  GET_WORKERS,
  GET_WORKERS_PENDING,
  GET_WORKERS_FULFILLED,
  GET_WORKERS_REJECTED,
] = asyncActions('workers/GET_WORKERS');

export const [
  GET_WORKER,
  GET_WORKER_PENDING,
  GET_WORKER_FULFILLED,
  GET_WORKER_REJECTED,
] = asyncActions('workers/GET_WORKER');

export const [
  POST_WORKER,
  POST_WORKER_PENDING,
  POST_WORKER_FULFILLED,
  POST_WORKER_REJECTED,
] = asyncActions('workers/POST_WORKER');

export const [
  PUT_WORKER,
  PUT_WORKER_PENDING,
  PUT_WORKER_FULFILLED,
  PUT_WORKER_REJECTED,
] = asyncActions('workers/PUT_WORKER');

export const [
  DELETE_WORKER,
  DELETE_WORKER_PENDING,
  DELETE_WORKER_FULFILLED,
  DELETE_WORKER_REJECTED,
] = asyncActions('workers/DELETE_WORKER');
