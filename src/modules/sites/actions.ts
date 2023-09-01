import { asyncActions } from 'lib/reducerUtils';

// export const GET_SITES = "sites/GET_SITES";
// export const GET_SITES_PENDING = `${GET_SITES}/pending`;
// export const GET_SITES_FULFILLED = `${GET_SITES}/fulfilled`;
// export const GET_SITES_REJECTED = `${GET_SITES}/rejected`;
// // console.log(handleAsyncActions("sites/GET_SITES"));

export const [GET_SITES, GET_SITES_PENDING, GET_SITES_FULFILLED, GET_SITES_REJECTED] =
  asyncActions('sites/GET_SITES');

export const [GET_SITE, GET_SITE_PENDING, GET_SITE_FULFILLED, GET_SITE_REJECTED] =
  asyncActions('sites/GET_SITE');

export const [POST_SITE, POST_SITE_PENDING, POST_SITE_FULFILLED, POST_SITE_REJECTED] =
  asyncActions('sites/POST_SITE');

export const [PUT_SITE, PUT_SITE_PENDING, PUT_SITE_FULFILLED, PUT_SITE_REJECTED] =
  asyncActions('sites/PUT_SITE');

export const [
  DELETE_SITE,
  DELETE_SITE_PENDING,
  DELETE_SITE_FULFILLED,
  DELETE_SITE_REJECTED,
] = asyncActions('sites/DELETE_SITE');
