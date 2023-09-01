import * as siteAPI from '../../api/sites';
import { createThunk, deleteThunk, updateThunk } from 'lib/createAsyncThunk';
import { SiteType } from './types';
import { GET_SITE, GET_SITES, POST_SITE, PUT_SITE, DELETE_SITE } from './actions';

export const getSites = createThunk<SiteType[]>(GET_SITES, siteAPI.getSites);
export const getSite = createThunk<SiteType[]>(GET_SITE, siteAPI.getSite);

export const postSite = createThunk<SiteType[], SiteType>(POST_SITE, siteAPI.postSite);

export const putSite = updateThunk<SiteType, SiteType>(
  'ts_id',
  PUT_SITE,
  siteAPI.putSite,
);

export const deleteSite = deleteThunk<SiteType, SiteType>(
  'ts_id',
  DELETE_SITE,
  siteAPI.deleteSite,
);
