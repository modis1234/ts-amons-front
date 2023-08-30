import axios from "axios";
import { CompanyType } from "modules/companies";

const API = `http://${process.env.REACT_APP_API_SERVER}`;
const TS_INDEX = process.env.REACT_APP_TS_INDEX;

// 포스트 목록을 가져오는 비동기 함수
export const getCompanies = async () => {
  const response = await axios.get(
    `${API}/api/company/companies?siteIndex=${TS_INDEX}`
  );
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getCompanyById = async (id: number) => {
  const response = await axios.get(`${API}/api/company/companies/${id}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postCompany = async (data: CompanyType) => {
  const response = await axios.post(`${API}/api/company/companies`, data);
  return response.data;
};

// 데이터 수정를 위한 put 비동기 함수
export const putCompany = async (id: number, data: CompanyType) => {
  const response = await axios.put(`${API}/api/company/companies/${id}`, data);
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteCompany = async (id: number) => {
  const response = await axios.delete(`${API}/api/company/companies/${id}`);
  return response.data;
};
