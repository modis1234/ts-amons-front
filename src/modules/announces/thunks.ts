import * as announceAPI from '../../api/announces';
import { createThunk, deleteThunk, updateThunk } from 'lib/createAsyncThunk';
import { AnnounceType } from './types';
import {
  GET_ANNOUNCE,
  GET_ANNOUNCES,
  POST_ANNOUNCE,
  PUT_ANNOUNCE,
  DELETE_ANNOUNCE,
} from './actions';

export const getAnnounces = createThunk<AnnounceType[]>(
  GET_ANNOUNCES,
  announceAPI.getAnnounces
);
export const getAnnounce = createThunk<AnnounceType[]>(
  GET_ANNOUNCE,
  announceAPI.getAnnounceById
);

export const postAnnounce = createThunk<AnnounceType[], AnnounceType>(
  POST_ANNOUNCE,
  announceAPI.postAnnounce
);

export const putAnnounce = updateThunk<AnnounceType, AnnounceType>(
  'ann_id',
  PUT_ANNOUNCE,
  announceAPI.putAnnounce
);

export const deleteAnnounce = deleteThunk<AnnounceType, AnnounceType>(
  'ann_id',
  DELETE_ANNOUNCE,
  announceAPI.deleteAnnounce
);
