import axios from "axios";
import { BeaconType } from "modules/beacons";

const API = `http://${process.env.REACT_APP_API_SERVER}`;
const TS_INDEX = process.env.REACT_APP_TS_INDEX ?? null;

// 포스트 목록을 가져오는 비동기 함수
export const getBeacons = async () => {
  const response = await axios.get(
    `${API}/api/beacon/beacons?siteIndex=${TS_INDEX}`
  );
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getBeaconById = async (id: number) => {
  const response = await axios.get(`${API}/api/beacon/beacons/${id}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postBeacon = async (data: BeaconType) => {
  const response = await axios.post(`${API}/api/beacon/beacons`, data);
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putBeacon = async (id: number, data: BeaconType) => {
  const response = await axios.put(`${API}/api/beacon/beacons/${id}`, data);
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteBeacon = async (id: number) => {
  const response = await axios.delete(`${API}/api/beacon/beacons/${id}`);
  return response.data;
};

// 미사용 비콘 조회를 위한 get 비동기 함수
export const getUnUsedBeacons = async () => {
  const TS_INDEX = process.env.REACT_APP_TS_INDEX;
  const response = await axios.get(
    `${API}/api/beacon/unused?siteIndex=${TS_INDEX}`
  );
  return response.data;
};

// 비콘에 할당된 사용자 검색
export const postSearchBeaconsByWorkerName = async (data: BeaconType) => {
  const TS_INDEX = process.env.REACT_APP_TS_INDEX;
  const response = await axios.post(
    `${API}/api/beacon/beacons/search/worker?siteIndex=${TS_INDEX}`,
    data
  );
  return response.data;
};
// 비콘에 할당된 차량 검색
export const postSearchBeaconsByVehicleName = async (data: BeaconType) => {
  const TS_INDEX = process.env.REACT_APP_TS_INDEX;
  const response = await axios.post(
    `${API}/api/beacon/beacons/search/vehicle?siteIndex=${TS_INDEX}`,
    data
  );
  return response.data;
};
