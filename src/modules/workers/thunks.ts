import { GET_WORKERS, POST_WORKER, PUT_WORKER, DELETE_WORKER } from "./actions";
import * as workerAPI from "../../api/workers";
import { createThunk, deleteThunk, updateThunk } from "lib/createAsyncThunk";
import { WorkerType } from "./types";

export const getWorkers = createThunk<WorkerType[]>(
  GET_WORKERS,
  workerAPI.getWorkers
);

export const postWorker = createThunk<WorkerType[], WorkerType>(
  POST_WORKER,
  workerAPI.postWorker
);

export const putWorker = updateThunk<WorkerType, WorkerType>(
  "local_id",
  PUT_WORKER,
  workerAPI.putWorker
);

export const deleteWorker = deleteThunk<WorkerType, WorkerType>(
  "local_id",
  DELETE_WORKER,
  workerAPI.deleteWorker
);
