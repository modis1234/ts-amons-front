import axios from 'axios';

const API = `http://${process.env.REACT_APP_API_SERVER}`;
const TS_INDEX = process.env.REACT_APP_TS_INDEX ?? null;

// 포스트 목록을 가져오는 비동기 함수
export const getDigs = async () => {
  const response = await axios.get(`${API}/api/dig/digs?siteIndex=${TS_INDEX}`);
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getDigById = async (id: number) => {
  const response = await axios.get(`${API}/api/dig/digs/${index}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postDig = async (data: DigType) => {
  const postData = { ...data, ts_index: TS_INDEX };
  const response = await axios.post(`${API}/api/dig/digs`, postData);
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putDig = async (id: number, data: DigType) => {
  const putData = { ...data, ts_index: TS_INDEX };
  const response = await axios.put(`${API}/api/dig/digs/${id}`, putData);
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteDig = async (id: number) => {
  const response = await axios.delete(`${API}/api/dig/digs/${id}`);
  return response.data;
};

// 굴진 이력 조회 (log) 현재 일시로 부터 한 달 전까지
export const getLogDigMonth = async () => {
  const response = await axios.get(
    `${API}/api/dig/digs/local?siteIndex=${TS_INDEX}`
  );
  return response.data;
};

// 굴진 이력 조회 (log) 노선 기간 검색
export const postLogDigSearch = async (data: DigType) => {
  const searchData = { ...data, ts_index: TS_INDEX };
  const response = await axios.post(`${API}/api/dig/digs/search`, searchData);
  return response.data;
};
