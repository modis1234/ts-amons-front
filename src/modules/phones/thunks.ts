import * as phoneAPI from '../../api/phones';
import { createThunk, deleteThunk, updateThunk } from 'lib/createAsyncThunk';
import { PhoneType } from './types';
import {
  GET_PHONES,
  GET_PHONE,
  POST_PHONE,
  PUT_PHONE,
  DELETE_PHONE,
  PUT_IMAGE_PHONE,
} from './actions';

export const getPhones = createThunk<PhoneType[]>(GET_PHONES, phoneAPI.getPhones);
export const getPhone = createThunk<PhoneType[]>(GET_PHONE, phoneAPI.getPhoneById);

export const postPhone = createThunk<PhoneType[], PhoneType>(
  POST_PHONE,
  phoneAPI.postPhone,
);

export const putPhone = updateThunk<PhoneType, PhoneType>(
  'phone_id',
  PUT_PHONE,
  phoneAPI.putPhone,
);

export const deletePhone = deleteThunk<PhoneType, PhoneType>(
  'phone_id',
  DELETE_PHONE,
  phoneAPI.deletePhone,
);

export const putImagePhone = updateThunk<PhoneType, PhoneType>(
  'phone_id',
  PUT_IMAGE_PHONE,
  phoneAPI.putImagePhone,
);
