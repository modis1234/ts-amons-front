import axios from 'axios';
import { SensorType } from 'modules/sensors';

const API = `http://${process.env.REACT_APP_API_SERVER}`;
const TS_INDEX = process.env.REACT_APP_TS_INDEX ?? null;

// 포스트 목록을 가져오는 비동기 함수
export const getSensors = async () => {
  const response = await axios.get(
    `${API}/api/sensor/sensors?siteIndex=${TS_INDEX}`,
  );
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getSensor = async (id: number) => {
  const response = await axios.get(`${API}/api/sensor/sensors/${id}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postSensor = async (data: SensorType) => {
  const response = await axios.post(
    `${API}/api/sensor/sensors?siteIndex=${TS_INDEX}&type=sensor`,
    data,
  );
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putSensor = async (id: number, data: SensorType) => {
  const response = await axios.put(
    `${API}/api/sensor/sensors/${id}?siteIndex=${TS_INDEX}&type=sensor`,
    data,
  );
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteSensor = async (id: number) => {
  const response = await axios.delete(`${API}/api/sensor/sensors/${id}`);
  return response.data;
};

// ============== 가스센서 알람

// 관리자 페이지 가스 알람 조회
export const postSensorAlarmSearch = async (data: SensorType) => {
  const response = await axios.post(`${API}/api/sensor/alarms/search`, data);
  return response.data;
};

// 모바일 가스 알람 20개 조회
export const getSensorAlarmLimit = async (data: SensorType) => {
  const response = await axios.get(
    `${API}/api/sensor/alarms/limit/20?siteIndex=${TS_INDEX}`,
  );
  return response.data;
};

// 가스센서 30분 단위 수신 이력 조회
export const postSensorRecord = async (data: SensorType) => {
  const response = await axios.post(`${API}/api/sensor/sensors/record`, data);
  return response.data;
};

// 이미지 업로드 를 위한 PUT 비동기 함수
export const putImageSensor = async (id: number, data: SensorType) => {
  const response = await axios.put(
    `${API}/api/upload/uploads/${id}?siteIndex=${TS_INDEX}&type=sensor`,
    data,
  );
  return response.data;
};
