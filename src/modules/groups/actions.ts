import { asyncActions } from 'lib/reducerUtils';

export const [
  GET_GROUPS,
  GET_GROUPS_PENDING,
  GET_GROUPS_FULFILLED,
  GET_GROUPS_REJECTED,
] = asyncActions('groups/GET_GROUPS');

export const [
  GET_GROUP,
  GET_GROUP_PENDING,
  GET_GROUP_FULFILLED,
  GET_GROUP_REJECTED,
] = asyncActions('groups/GET_GROUP');

export const [
  POST_GROUP,
  POST_GROUP_PENDING,
  POST_GROUP_FULFILLED,
  POST_GROUP_REJECTED,
] = asyncActions('groups/POST_GROUP');

export const [
  PUT_GROUP,
  PUT_GROUP_PENDING,
  PUT_GROUP_FULFILLED,
  PUT_GROUP_REJECTED,
] = asyncActions('groups/PUT_GROUP');

export const [
  DELETE_GROUP,
  DELETE_GROUP_PENDING,
  DELETE_GROUP_FULFILLED,
  DELETE_GROUP_REJECTED,
] = asyncActions('groups/DELETE_GROUP');
