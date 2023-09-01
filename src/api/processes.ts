/* eslint-disable guard-for-in */
import axios from 'axios';
import { ProcessType } from 'modules/processes';

const API = `http://${process.env.REACT_APP_API_SERVER}`;
const TS_INDEX = process.env.REACT_APP_TS_INDEX ?? null;

// 포스트 목록을 가져오는 비동기 함수
export const getProcesses = async () => {
  const response = await axios.get(`${API}/api/process/processes?siteIndex=${TS_INDEX}`);
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getProcessById = async (id: number) => {
  const response = await axios.get(`${API}/api/process/processes/${id}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postProcess = async (data: ProcessType) => {
  const response = await axios.post(`${API}/api/process/processes`, data);
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putProcess = async (id: number, data: ProcessType) => {
  const response = await axios.put(`${API}/api/process/processes/${id}`, data);
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteProcess = async (id: number) => {
  const response = await axios.delete(`${API}/api/process/processes/${id}`);
  return response.data;
};
