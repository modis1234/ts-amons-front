import axios from "axios";
import { AccountType } from "types/accounts";

const API = `http://${process.env.REACT_APP_API_SERVER}`;

const TS_INDEX = process.env.REACT_APP_TS_INDEX ?? null;

// 포스트 목록을 가져오는 비동기 함수
export const getAccounts = async () => {
  const response = await axios.get<AccountType[]>(
    `${API}/api/account/accounts?siteIndex=${TS_INDEX}`
  );
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getAccountById = async (index: string) => {
  const response = await axios.get<AccountType[]>(
    `${API}/api/account/accounts/${index}`
  );
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postAccount = async (data: AccountType) => {
  const response = await axios.post<AccountType>(
    `${API}/api/account/accounts`,
    data
  );
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putAccount = async (index: number, data: AccountType) => {
  const response = await axios.put<AccountType>(
    `${API}/api/account/accounts/${index}`,
    data
  );
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteAccount = async (id: number) => {
  const response = await axios.delete(`${API}/api/account/accounts/${id}`);
  return response.data;
};

// 계정 아이디 중복 체크
export const postAccoutDoubleCheck = async (data: AccountType) => {
  const response = await axios.post(
    `${API}/api/account/doubleCheck?siteIndex=${TS_INDEX}`,
    data
  );
  return response.data;
};
