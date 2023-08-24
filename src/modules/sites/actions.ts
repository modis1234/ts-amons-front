import { asyncActions } from "lib/reducerUtils";

// export const GET_SITES = "sites/GET_SITES";
// export const GET_SITES_PENDING = `${GET_SITES}/pending`;
// export const GET_SITES_FULFILLED = `${GET_SITES}/fulfilled`;
// export const GET_SITES_REJECTED = `${GET_SITES}/rejected`;
// // console.log(handleAsyncActions("sites/GET_SITES"));

export const [
  GET_SITES,
  GET_SITES_PENDING,
  GET_SITES_FULFILLED,
  GET_SITES_REJECTED,
] = asyncActions("sites/GET_SITES");

export const [
  POST_SITES,
  POST_SITES_PENDING,
  POST_SITES_FULFILLED,
  POST_SITES_REJECTED,
] = asyncActions("sites/POST_SITES");

export const [
  PUT_SITES,
  PUT_SITES_PENDING,
  PUT_SITES_FULFILLED,
  PUT_SITES_REJECTED,
] = asyncActions("sites/PUT_SITES");

export const [
  DELETE_SITE,
  DELETE_SITE_PENDING,
  DELETE_SITE_FULFILLED,
  DELETE_SITE_REJECTED,
] = asyncActions("sites/DELETE_SITE");
