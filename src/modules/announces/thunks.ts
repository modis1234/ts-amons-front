import {
  DELETE_ANNOUNCE,
  GET_ANNOUNCES,
  POST_ANNOUNCE,
  PUT_ANNOUNCE,
} from "./actions";
import * as announcesAPI from "../../api/announces";
import { createThunk, deleteThunk, updateThunk } from "lib/createAsyncThunk";
import { AnnounceType } from "./types";

export const getAnnounces = createThunk<AnnounceType[]>(
  GET_ANNOUNCES,
  announcesAPI.getAnnounces
);

export const postAnnounce = createThunk<AnnounceType[], AnnounceType>(
  POST_ANNOUNCE,
  announcesAPI.postAnnounce
);

export const putAnnounce = updateThunk<AnnounceType, AnnounceType>(
  "ann_id",
  PUT_ANNOUNCE,
  announcesAPI.putAnnounce
);

export const deleteAnnounce = deleteThunk<AnnounceType, AnnounceType>(
  "ann_id",
  DELETE_ANNOUNCE,
  announcesAPI.deleteAnnounce
);
