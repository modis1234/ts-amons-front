import * as sensorAPI from '../../api/sensors';
import { createThunk, deleteThunk, updateThunk } from 'lib/createAsyncThunk';
import { SensorType } from './types';
import {
  GET_SENSORS,
  GET_SENSOR,
  POST_SENSOR,
  PUT_SENSOR,
  DELETE_SENSOR,
  POST_ALARM_SEARCH,
  GET_ALARM_LIMIT,
  POST_SENSOR_RECORD,
  PUT_IMAGE_SENSOR,
} from './actions';

export const getSensors = createThunk<SensorType[]>(GET_SENSORS, sensorAPI.getSensors);
export const getSensor = createThunk<SensorType[]>(GET_SENSOR, sensorAPI.getSensor);

export const postSensor = createThunk<SensorType[], SensorType>(
  POST_SENSOR,
  sensorAPI.postSensor,
);

export const putSensor = updateThunk<SensorType, SensorType>(
  'sensor_id',
  PUT_SENSOR,
  sensorAPI.putSensor,
);

export const deleteSensor = deleteThunk<SensorType, SensorType>(
  'sensor_id',
  DELETE_SENSOR,
  sensorAPI.deleteSensor,
);

export const postSensorAlarmSearch = createThunk<SensorType[], SensorType>(
  POST_ALARM_SEARCH,
  sensorAPI.postSensorAlarmSearch,
);

export const getSensorAlarmLimit = createThunk<SensorType[]>(
  GET_ALARM_LIMIT,
  sensorAPI.getSensorAlarmLimit,
);

export const postSensorRecord = createThunk<SensorType[], SensorType>(
  POST_SENSOR_RECORD,
  sensorAPI.postSensorRecord,
);

export const putImageSensor = updateThunk<SensorType, SensorType>(
  'sensor_id',
  PUT_IMAGE_SENSOR,
  sensorAPI.putImageSensor,
);
