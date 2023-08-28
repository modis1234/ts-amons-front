import { GET_LOCALS, POST_LOCAL, PUT_LOCAL, DELETE_LOCAL } from "./actions";
import * as localAPI from "../../api/locals";
import { createThunk, deleteThunk, updateThunk } from "lib/createAsyncThunk";
import { LocalType } from "./types";

export const getLocals = createThunk<LocalType[]>(
  GET_LOCALS,
  localAPI.getLocals
);

export const postLocal = createThunk<LocalType[], LocalType>(
  POST_LOCAL,
  localAPI.postLocal
);

export const putLocal = updateThunk<LocalType, LocalType>(
  "local_id",
  PUT_LOCAL,
  localAPI.putLocal
);

export const deleteLocal = deleteThunk<LocalType, LocalType>(
  "local_id",
  DELETE_LOCAL,
  localAPI.deleteLocal
);
