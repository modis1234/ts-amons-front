import {
  GET_VEHICLES,
  POST_VEHICLE,
  PUT_VEHICLE,
  DELETE_VEHICLE,
} from "./actions";
import * as vehicleAPI from "../../api/vehicles";
import { createThunk, deleteThunk, updateThunk } from "lib/createAsyncThunk";
import { VehicleType } from "./types";

export const getVehicles = createThunk<VehicleType[]>(
  GET_VEHICLES,
  vehicleAPI.getVehicles
);

export const postVehicle = createThunk<VehicleType[], FormData>(
  POST_VEHICLE,
  vehicleAPI.postVehicle
);

export const putVehicle = updateThunk<VehicleType, FormData>(
  "wk_id",
  PUT_VEHICLE,
  vehicleAPI.putVehicle
);

export const deleteVehicle = deleteThunk<VehicleType, VehicleType>(
  "wk_id",
  DELETE_VEHICLE,
  vehicleAPI.deleteVehicle
);
