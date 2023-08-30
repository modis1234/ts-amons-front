import {
  GET_BEACONS,
  POST_BEACON,
  PUT_BEACON,
  DELETE_BEACON,
  GET_UNUSED_BEACONS,
  POST_SEARCH_BEACONS_BY_WORKER_NAME,
  POST_SEARCH_BEACONS_BY_VEHICLE_NAME,
} from "./actions";
import * as beaconsAPI from "../../api/beacons";
import { createThunk, deleteThunk, updateThunk } from "lib/createAsyncThunk";
import { BeaconType } from "./types";

export const getBeacons = createThunk<BeaconType[]>(
  GET_BEACONS,
  beaconsAPI.getBeacons
);

export const postBeacon = createThunk<BeaconType[], BeaconType>(
  POST_BEACON,
  beaconsAPI.postBeacon
);

export const putBeacon = updateThunk<BeaconType, BeaconType>(
  "bc_id",
  PUT_BEACON,
  beaconsAPI.putBeacon
);

export const deleteBeacon = deleteThunk<BeaconType, BeaconType>(
  "bc_id",
  DELETE_BEACON,
  beaconsAPI.deleteBeacon
);

export const getUnUsedBeacons = createThunk<BeaconType[]>(
  GET_UNUSED_BEACONS,
  beaconsAPI.getUnUsedBeacons
);

export const postSearchBeaconsByWorkerName = createThunk<
  BeaconType[],
  BeaconType
>(POST_SEARCH_BEACONS_BY_WORKER_NAME, beaconsAPI.postSearchBeaconsByWorkerName);

export const postSearchBeaconsByVehicleName = createThunk<
  BeaconType[],
  BeaconType
>(
  POST_SEARCH_BEACONS_BY_VEHICLE_NAME,
  beaconsAPI.postSearchBeaconsByVehicleName
);
