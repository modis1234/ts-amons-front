import { asyncActions } from "lib/reducerUtils";

export const [
  GET_BEACONS,
  GET_BEACONS_PENDING,
  GET_BEACONS_FULFILLED,
  GET_BEACONS_REJECTED,
] = asyncActions("beacons/GET_BEACONS");

export const [
  GET_BEACON,
  GET_BEACON_PENDING,
  GET_BEACON_FULFILLED,
  GET_BEACON_REJECTED,
] = asyncActions("beacons/GET_BEACON");

export const [
  POST_BEACON,
  POST_BEACON_PENDING,
  POST_BEACON_FULFILLED,
  POST_BEACON_REJECTED,
] = asyncActions("beacons/POST_BEACON");

export const [
  PUT_BEACON,
  PUT_BEACON_PENDING,
  PUT_BEACON_FULFILLED,
  PUT_BEACON_REJECTED,
] = asyncActions("beacons/PUT_BEACON");

export const [
  DELETE_BEACON,
  DELETE_BEACON_PENDING,
  DELETE_BEACON_FULFILLED,
  DELETE_BEACON_REJECTED,
] = asyncActions("beacons/DELETE_BEACON");

export const [
  GET_UNUSED_BEACONS,
  GET_UNUSED_BEACONS_PENDING,
  GET_UNUSED_BEACONS_FULFILLED,
  GET_UNUSED_BEACONS_REJECTED,
] = asyncActions("beacons/GET_UNUSED_BEACONS");

export const [
  POST_SEARCH_BEACONS_BY_WORKER_NAME,
  POST_SEARCH_BEACONS_BY_WORKER_NAME_PENDING,
  POST_SEARCH_BEACONS_BY_WORKER_NAME_FULFILLED,
  POST_SEARCH_BEACONS_BY_WORKER_NAME_REJECTED,
] = asyncActions("beacons/POST_SEARCH_BEACONS_BY_WORKER_NAME");

export const [
  POST_SEARCH_BEACONS_BY_VEHICLE_NAME,
  POST_SEARCH_BEACONS_BY_VEHICLE_NAME_PENDING,
  POST_SEARCH_BEACONS_BY_VEHICLE_NAME_FULFILLED,
  POST_SEARCH_BEACONS_BY_VEHICLE_NAME_REJECTED,
] = asyncActions("beacons/POST_SEARCH_BEACONS_BY_VEHICLE_NAME");
