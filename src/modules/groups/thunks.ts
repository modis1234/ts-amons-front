import { GET_GROUPS, POST_GROUP, PUT_GROUP, DELETE_GROUP } from './actions';
import * as groupAPI from '../../api/groups';
import { createThunk, deleteThunk, updateThunk } from 'lib/createAsyncThunk';
import { GroupType } from './types';

export const getGroups = createThunk<GroupType[]>(
  GET_GROUPS,
  groupAPI.getGroups,
);

export const postGroup = createThunk<GroupType[], GroupType>(
  POST_GROUP,
  groupAPI.postGroup,
);

export const putGroup = updateThunk<GroupType, GroupType>(
  'group_id',
  PUT_GROUP,
  groupAPI.putGroup,
);

export const deleteGroup = deleteThunk<GroupType, GroupType>(
  'group_id',
  DELETE_GROUP,
  groupAPI.deleteGroup,
);
