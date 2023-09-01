import * as scannerAPI from '../../api/scanners';
import { createThunk, deleteThunk, updateThunk } from 'lib/createAsyncThunk';
import { ScannerType } from './types';
import {
  GET_SCANNERS,
  GET_SCANNER,
  POST_SCANNER,
  PUT_SCANNER,
  DELETE_SCANNER,
} from './actions';

export const getScanners = createThunk<ScannerType[]>(
  GET_SCANNERS,
  scannerAPI.getScanners,
);
export const getScanner = createThunk<ScannerType[]>(
  GET_SCANNER,
  scannerAPI.getScannerById,
);

export const postScanner = createThunk<ScannerType[], ScannerType>(
  POST_SCANNER,
  scannerAPI.postScanner,
);

export const putScanner = updateThunk<ScannerType, ScannerType>(
  'scn_id',
  PUT_SCANNER,
  scannerAPI.putScanner,
);

export const deleteScanner = deleteThunk<ScannerType, ScannerType>(
  'scn_id',
  DELETE_SCANNER,
  scannerAPI.deleteScanner,
);
