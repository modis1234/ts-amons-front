import axios from 'axios';
import { PhoneType } from 'modules/phones';

const API = `http://${process.env.REACT_APP_API_SERVER}`;
const TS_INDEX = process.env.REACT_APP_TS_INDEX ?? null;

// 포스트 목록을 가져오는 비동기 함수
export const getPhones = async () => {
  const response = await axios.get(
    `${API}/api/phone/phones?siteIndex=${TS_INDEX}`,
  );
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getPhoneById = async (id: number) => {
  const response = await axios.get(`${API}/api/phone/phones/${id}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postPhone = async (data: PhoneType) => {
  const response = await axios.post(
    `${API}/api/phone/phones?siteIndex=${TS_INDEX}&type=phone`,
    data,
  );
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putPhone = async (id: number, data: PhoneType) => {
  const response = await axios.put(
    `${API}/api/phone/phones/${id}?siteIndex=${TS_INDEX}&type=phone`,
    data,
  );
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deletePhone = async (id: number) => {
  const response = await axios.delete(`${API}/api/phone/phones/${id}`);
  return response.data;
};

// 이미지 업로드 를 위한 PUT 비동기 함수
export const putImagePhone = async (id: number, data: PhoneType) => {
  const response = await axios.put(
    `${API}/api/upload/uploads/${id}?siteIndex=${TS_INDEX}&type=phone`,
    data,
  );
  return response.data;
};
