import axios from "axios";
import { SiteType } from "types/sites";


const API = `http://${process.env.REACT_APP_API_SERVER}`;
const TS_INDEX = process.env.REACT_APP_TS_INDEX ?? null;

export async function getSites() {
  const response = await axios.get<SiteType[]>(`${API}/api/site/sites`);
  return response.data;
}

export const getSite = async (id: number) => {
  const response = await axios.get(`${API}/api/site/sites/${id}`);
  return response.data;
};

export async function postSite(data: SiteType) {
  console.log("postSites->", data);
  const response = await axios.post<SiteType>(`${API}/api/site/sites`,data);
  return response.data;
}

export async function putSite(index: string, data: SiteType) {
  const response = await axios.put<SiteType>(`${API}/api/site/sites/${index}`, data);
  return response.data;
}

export const deleteSite = async (id: number) => {
  const response = await axios.delete(`${API}/api/site/sites/${id}`);
  return response.data;
};
