import axios from 'axios';

const API = `http://${process.env.REACT_APP_API_SERVER}`;
const TS_INDEX = process.env.REACT_APP_TS_INDEX ?? null;

// location 모니터링 정보
export const getMonitor = async () => {
  const response = await axios.get(
    `${API}/api/monitor/monitors?siteIndex=${TS_INDEX}`,
  );
  return response.data;
};

// 스캐너 정보
export const getScanner = async () => {
  const response = await axios.get(
    `${API}/api/monitor/scanners?siteIndex=${TS_INDEX}`,
  );
  return response.data;
};

// 날씨 정보 비동기 함수
export const getWeather = async () => {
  const response = await axios.get(`${API}/api/weather/weathers/${TS_INDEX}`);
  return response.data;
};

// ble beacon input 정보
export const getBleBeacon = async () => {
  const response = await axios.get(
    `${API}/api/monitor/beacons?siteIndex=${TS_INDEX}`,
  );
  return response.data;
};

// 대시보드 환경설정
export const getEnvironment = async () => {
  const response = await axios.get(
    `${API}/api/environment/environments/${TS_INDEX}`,
  );
  return response.data;
};

// 2-6) GET, 현장 장비 조회
// key : index, value : ts_index
export const getSiteDevice = async () => {
  const response = await axios.get(`${API}/api/site/sites/${TS_INDEX}/device`);
  return response.data;
};

// SOS 알람 액션 중지
export const setBeaconActionOff = async () => {
  const response = await axios.get(`${API}/api/beacon/sosoff/${TS_INDEX}`);
  return response.data;
};

// GAS DANGER 알람 액션 중지
export const setGasDangerActionOff = async () => {
  const response = await axios.get(`${API}/api/sensor/dangeroff`);
  return response.data;
};
