import * as processAPI from '../../api/processes';
import { createThunk, deleteThunk, updateThunk } from 'lib/createAsyncThunk';
import { ProcessType } from './types';
import {
  GET_PROCESSES,
  GET_PROCESS,
  POST_PROCESS,
  PUT_PROCESS,
  DELETE_PROCESS,
} from './actions';

export const getProcesses = createThunk<ProcessType[]>(
  GET_PROCESSES,
  processAPI.getProcesses,
);
export const getProcess = createThunk<ProcessType[]>(
  GET_PROCESS,
  processAPI.getProcessById,
);

export const postProcess = createThunk<ProcessType[], ProcessType>(
  POST_PROCESS,
  processAPI.postProcess,
);

export const putProcess = updateThunk<ProcessType, ProcessType>(
  'pcs_seq',
  PUT_PROCESS,
  processAPI.putProcess,
);

export const deleteProcess = deleteThunk<ProcessType, ProcessType>(
  'pcs_seq',
  DELETE_PROCESS,
  processAPI.deleteProcess,
);
