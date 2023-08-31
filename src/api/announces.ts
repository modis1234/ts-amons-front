import axios from "axios";
import { AnnounceType } from "modules/announces";

const API = `http://${process.env.REACT_APP_API_SERVER}`;
const TS_INDEX = process.env.REACT_APP_TS_INDEX ?? null;

// 포스트 목록을 가져오는 비동기 함수
export const getAnnounces = async () => {
  const response = await axios.get(
    `${API}/api/announce/announces?siteIndex=${TS_INDEX}`
  );
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getAnnounceById = async (id: number) => {
  const response = await axios.get(`${API}/api/announce/announces/${id}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postAnnounce = async (data: AnnounceType) => {
  const response = await axios.post(`${API}/api/announce/announces`, data);
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putAnnounce = async (id: number, data: AnnounceType) => {
  const response = await axios.put(`${API}/api/announce/announces/${id}`, data);
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteAnnounce = async (id: number) => {
  const response = await axios.delete(`${API}/api/announce/announces/${id}`);
  return response.data;
};
