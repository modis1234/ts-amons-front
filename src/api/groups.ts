import axios from 'axios';
import { GroupType } from 'modules/groups';

const API = `http://${process.env.REACT_APP_API_SERVER}`;
const TS_INDEX = process.env.REACT_APP_TS_INDEX ?? null;

// 포스트 목록을 가져오는 비동기 함수
export const getGroups = async () => {
  const response = await axios.get(
    `${API}/api/group/groups?siteIndex=${TS_INDEX}`,
  );
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getGroupById = async (id: number) => {
  const response = await axios.get(`${API}/api/group/groups/${id}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postGroup = async (data: GroupType) => {
  const response = await axios.post(`${API}/api/group/groups`, data);
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putGroup = async (id: number, data: GroupType) => {
  const response = await axios.put(`${API}/api/group/groups/${id}`, data);
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteGroup = async (id: number) => {
  const response = await axios.delete(`${API}/api/group/groups/${id}`);
  return response.data;
};
