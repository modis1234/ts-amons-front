import axios from 'axios';
import { CctvType } from 'modules/cctvs';

const API = `http://${process.env.REACT_APP_API_SERVER}`;
const TS_INDEX = process.env.REACT_APP_TS_INDEX ?? null;

// 포스트 목록을 가져오는 비동기 함수
export const getCctvs = async () => {
  const response = await axios.get(`${API}/api/cctv/cctvs?siteIndex=${TS_INDEX}`);
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getCctvById = async (id: number) => {
  const response = await axios.get(`${API}/api/cctv/cctvs/${id}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postCctv = async (data: CctvType) => {
  const response = await axios.post(
    `${API}/api/cctv/cctvs?siteIndex=${TS_INDEX}&type=cctv`,
    data,
  );
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putCctv = async (id: number, data: CctvType) => {
  const response = await axios.put(
    `${API}/api/cctv/cctvs/${id}?siteIndex=${TS_INDEX}&type=cctv`,
    data,
  );
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteCctv = async (id: number) => {
  const response = await axios.delete(`${API}/api/cctv/cctvs/${id}`);
  return response.data;
};

// 이미지 업로드 를 위한 PUT 비동기 함수
export const putImageCctv = async (id: number, data: CctvType) => {
  const response = await axios.put(
    `${API}/api/upload/uploads/${id}?siteIndex=${TS_INDEX}&type=cctv`,
    data,
  );
  return response.data;
};
