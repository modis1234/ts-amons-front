import axios from 'axios';
import { ScannerType } from 'modules/scanners';

const API = `http://${process.env.REACT_APP_API_SERVER}`;
const TS_INDEX = process.env.REACT_APP_TS_INDEX ?? null;

// 포스트 목록을 가져오는 비동기 함수
export const getScanners = async () => {
  const response = await axios.get(`${API}/api/scanner/scanners?siteIndex=${TS_INDEX}`);
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getScannerById = async (id: number) => {
  const response = await axios.get(`${API}/api/scanner/scanners/${id}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postScanner = async (data: ScannerType) => {
  const response = await axios.post(
    `${API}/api/scanner/scanners?siteIndex=${TS_INDEX}&type=scanner`,
    data,
  );
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putScanner = async (id: number, data: ScannerType) => {
  const response = await axios.put(
    `${API}/api/scanner/scanners/${id}?siteIndex=${TS_INDEX}&type=scanner`,
    data,
  );
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteScanner = async (id: number) => {
  const response = await axios.delete(`${API}/api/scanner/scanners/${id}`);
  return response.data;
};

// 노선 별 스캐너 데이터 조회
export const getScannersDataSortByLocal = async () => {
  const response = await axios.get(`${API}/api/scanner/locals?siteIndex=${TS_INDEX}`);
  return response.data;
};
