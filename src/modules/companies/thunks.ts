import * as companyAPI from '../../api/companies';
import { createThunk, deleteThunk, updateThunk } from 'lib/createAsyncThunk';
import { CompanyType } from './types';
import {
  DELETE_COMPANY,
  GET_COMPANIES,
  GET_COMPANY,
  POST_COMPANY,
  PUT_COMPANY,
} from './actions';

export const getCompanies = createThunk<CompanyType[]>(
  GET_COMPANIES,
  companyAPI.getCompanies,
);
export const getCompany = createThunk<CompanyType[]>(
  GET_COMPANY,
  companyAPI.getCompanyById,
);

export const postCompany = createThunk<CompanyType[], CompanyType>(
  POST_COMPANY,
  companyAPI.postCompany,
);

export const putCompany = updateThunk<CompanyType, CompanyType>(
  'co_id',
  PUT_COMPANY,
  companyAPI.putCompany,
);

export const deleteCompany = deleteThunk<CompanyType, CompanyType>(
  'co_id',
  DELETE_COMPANY,
  companyAPI.deleteCompany,
);
