import axios from 'axios';
import { LocalType } from 'modules/locals';

const API = `http://${process.env.REACT_APP_API_SERVER}`;
const TS_INDEX = process.env.REACT_APP_TS_INDEX ?? null;

// 포스트 목록을 가져오는 비동기 함수
export const getLocals = async () => {
  const response = await axios.get(
    `${API}/api/local/locals?siteIndex=${TS_INDEX}`,
  );
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getLocalById = async (id: number) => {
  const response = await axios.get(`${API}/api/local/locals/${id}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postLocal = async (data: LocalType) => {
  const response = await axios.post(`${API}/api/local/locals`, data);
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putLocal = async (id: number, data: LocalType) => {
  const response = await axios.put(`${API}/api/local/locals/${id}`, data);
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteLocal = async (id: number) => {
  const response = await axios.delete(`${API}/api/local/locals/${id}`);
  return response.data;
};
