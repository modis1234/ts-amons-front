import { createSlice } from "@reduxjs/toolkit";
import {
  asyncState,
  AsyncStateType,
  createActionHandler,
  deleteActionHandler,
  updateActionHandler,
} from "lib/reducerUtils";
import { SiteType } from "types/sites";
import {
  DELETE_SITE_FULFILLED,
  DELETE_SITE_PENDING,
  DELETE_SITE_REJECTED,
  GET_SITES_FULFILLED,
  GET_SITES_PENDING,
  GET_SITES_REJECTED,
  POST_SITES_FULFILLED,
  POST_SITES_PENDING,
  POST_SITES_REJECTED,
  PUT_SITES_FULFILLED,
  PUT_SITES_PENDING,
  PUT_SITES_REJECTED,
} from "./actions";
// import { SiteType } from "./types";

const initialState: AsyncStateType<SiteType[], Error> = asyncState.initial();

const postSiteHandler = createActionHandler<SiteType>();
const putSiteHandler = updateActionHandler<SiteType>("site_id");
const deleteSIteHandler = deleteActionHandler<SiteType>("site_id");
// const deleteSiteHandler = updateActionHandler<SiteType>("site_id");

export const siteSlice = createSlice({
  name: "sites",
  initialState,
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    /**@GET */
    [GET_SITES_PENDING]: (state, action) => asyncState.load(),
    [GET_SITES_FULFILLED]: (state, action) =>
      asyncState.success(action.payload),
    [GET_SITES_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@POST */
    [POST_SITES_PENDING]: (state, action) => asyncState.load(state.data),
    [POST_SITES_FULFILLED]: (state, action) => postSiteHandler(state, action),
    [POST_SITES_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@PUT */
    [PUT_SITES_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_SITES_FULFILLED]: (state, action) => putSiteHandler(state, action),
    [PUT_SITES_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@DELETE */
    [DELETE_SITE_PENDING]: (state, action) => asyncState.load(state.data),
    [DELETE_SITE_FULFILLED]: (state, action) =>
      deleteSIteHandler(state, action),
    [DELETE_SITE_REJECTED]: (state, action) => asyncState.error(action.payload),
  },
});

export default siteSlice.reducer;
