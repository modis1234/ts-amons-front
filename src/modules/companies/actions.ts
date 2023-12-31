import { asyncActions } from "lib/reducerUtils";

export const [
  GET_COMPANIES,
  GET_COMPANIES_PENDING,
  GET_COMPANIES_FULFILLED,
  GET_COMPANIES_REJECTED,
] = asyncActions("companies/GET_COMPANIES");

export const [
  GET_COMPANY,
  GET_COMPANY_PENDING,
  GET_COMPANY_FULFILLED,
  GET_COMPANY_REJECTED,
] = asyncActions("companies/GET_COMPANY");

export const [
  POST_COMPANY,
  POST_COMPANY_PENDING,
  POST_COMPANY_FULFILLED,
  POST_COMPANY_REJECTED,
] = asyncActions("companies/POST_COMPANY");

export const [
  PUT_COMPANY,
  PUT_COMPANY_PENDING,
  PUT_COMPANY_FULFILLED,
  PUT_COMPANY_REJECTED,
] = asyncActions("companies/PUT_COMPANY");

export const [
  DELETE_COMPANY,
  DELETE_COMPANY_PENDING,
  DELETE_COMPANY_FULFILLED,
  DELETE_COMPANY_REJECTED,
] = asyncActions("companies/DELETE_COMPANY");
