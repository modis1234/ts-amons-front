import { createSlice } from "@reduxjs/toolkit";
import {
  asyncState,
  AsyncStateType,
  createActionHandler,
  deleteActionHandler,
  updateActionHandler,
} from "lib/reducerUtils";
import {
  DELETE_LOCAL_FULFILLED,
  DELETE_LOCAL_PENDING,
  DELETE_LOCAL_REJECTED,
  GET_LOCALS_FULFILLED,
  GET_LOCALS_PENDING,
  GET_LOCALS_REJECTED,
  GET_LOCAL_FULFILLED,
  GET_LOCAL_PENDING,
  GET_LOCAL_REJECTED,
  POST_LOCAL_FULFILLED,
  POST_LOCAL_PENDING,
  POST_LOCAL_REJECTED,
  PUT_LOCAL_FULFILLED,
  PUT_LOCAL_PENDING,
  PUT_LOCAL_REJECTED,
} from "./actions";
import { LocalType } from "./types";

const initialState: AsyncStateType<LocalType[], Error> = asyncState.initial();

const postLocalHandler = createActionHandler<LocalType>();
const putLocalHandler = updateActionHandler<LocalType>("site_id");
const deleteLocalHandler = deleteActionHandler<LocalType>("site_id");

export const localSlice = createSlice({
  name: "locals",
  initialState,
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    /**@GET */
    [GET_LOCALS_PENDING]: (state, action) => asyncState.load(),
    [GET_LOCALS_FULFILLED]: (state, action) =>
      asyncState.success(action.payload),
    [GET_LOCALS_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@POST */
    [POST_LOCAL_PENDING]: (state, action) => asyncState.load(state.data),
    [POST_LOCAL_FULFILLED]: (state, action) => postLocalHandler(state, action),
    [POST_LOCAL_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@PUT */
    [PUT_LOCAL_PENDING]: (state, action) => asyncState.load(state.data),
    [PUT_LOCAL_FULFILLED]: (state, action) => putLocalHandler(state, action),
    [PUT_LOCAL_REJECTED]: (state, action) => asyncState.error(action.payload),
    /**@DELETE */
    [DELETE_LOCAL_PENDING]: (state, action) => asyncState.load(state.data),
    [DELETE_LOCAL_FULFILLED]: (state, action) =>
      deleteLocalHandler(state, action),
    [DELETE_LOCAL_REJECTED]: (state, action) =>
      asyncState.error(action.payload),
  },
});

export default localSlice.reducer;
