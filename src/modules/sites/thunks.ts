import { DELETE_SITE, GET_SITES, POST_SITES, PUT_SITES } from "./actions";
import * as sitesAPI from "../../api/sites";
import { createThunk, deleteThunk, updateThunk } from "lib/createAsyncThunk";
import { SiteType } from "types/sites";

export const getSites = createThunk<SiteType[]>(GET_SITES, sitesAPI.getSites);

export const postSites = createThunk<SiteType[], SiteType>(
  POST_SITES,
  sitesAPI.postSite
);

export const putSites = updateThunk<SiteType, SiteType>(
  "ts_id",
  PUT_SITES,
  sitesAPI.putSite
);

export const deleteSite = deleteThunk<SiteType, SiteType>(
  "ts_id",
  DELETE_SITE,
  sitesAPI.deleteSite
);
