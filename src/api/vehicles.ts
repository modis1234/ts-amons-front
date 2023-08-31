import axios from "axios";
import { VehicleType } from "modules/vehicles";

const API = `http://${process.env.REACT_APP_API_SERVER}`;
const TS_INDEX = process.env.REACT_APP_TS_INDEX ?? null;

// 포스트 목록을 가져오는 비동기 함수
export const getVehicles = async () => {
  const response = await axios.get(
    `${API}/api/vehicle/vehicles?siteIndex=${TS_INDEX}`
  );
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getVehicleById = async (id: number) => {
  const response = await axios.get(`${API}/api/vehicle/vehicles/${id}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postVehicle = async (data: VehicleType) => {
  const response = await axios.post(
    `${API}/api/vehicle/vehicles?siteIndex=${TS_INDEX}&type=vehicle`,
    data
  );
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putVehicle = async (id: number, data: VehicleType) => {
  const response = await axios.put(
    `${API}/api/vehicle/vehicles/${id}?siteIndex=${TS_INDEX}&type=vehicle`,
    data
  );
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteVehicle = async (id: number) => {
  const response = await axios.delete(`${API}/api/vehicle/vehicles/${id}`);
  return response.data;
};
