import axios from 'axios';
import { WorkerType } from 'modules/workers';

const API = `http://${process.env.REACT_APP_API_SERVER}`;
const TS_INDEX = process.env.REACT_APP_TS_INDEX ?? null;

// 포스트 목록을 가져오는 비동기 함수
export const getWorkers = async () => {
  const response = await axios.get(
    `${API}/api/worker/workers?siteIndex=${TS_INDEX}`,
  );
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getWorkerById = async (id: number) => {
  const response = await axios.get(`${API}/api/worker/workers/${id}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postWorker = async (data: WorkerType) => {
  const response = await axios.post(
    `${API}/api/worker/workers?siteIndex=${TS_INDEX}&type=worker`,
    data,
  );
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putWorker = async (id: number, data: WorkerType) => {
  console.log('put id =>', id);
  console.log('put data =>', data);
  const response = await axios.put(
    `${API}/api/worker/workers/${id}?siteIndex=${TS_INDEX}&type=worker`,
    data,
  );
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteWorker = async (id: number) => {
  const response = await axios.delete(`${API}/api/worker/workers/${id}`);
  return response.data;
};
