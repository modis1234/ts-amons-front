import { AnyAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

export type AsyncStateType<T, E = any, P = any> = {
  loading: boolean;
  data: T | null;
  error: E | null;
  payload?: P | null;
};

export const asyncState = {
  // 다음 코드는 화살표 함수에 Generic 을 설정 한 것입니다.
  initial: <T, E = any>(initialData?: T): AsyncStateType<T, E> => ({
    loading: false,
    data: initialData || null,
    error: null,
  }),
  load: <T, E = any>(data?: T | null): AsyncStateType<T, E> => ({
    loading: true,
    data: data || null,
    error: null,
  }),
  success: <T, E = any>(data: T): AsyncStateType<T, E> => ({
    loading: false,
    data,
    error: null,
  }),
  error: <T, E>(error: E): AsyncStateType<T, E> => ({
    loading: false,
    data: null,
    error: error,
  }),
};

export function asyncActions(type: string) {
  const [PENDING, FULFILLED, REJECTED] = [
    `${type}/pending`,
    `${type}/fulfilled`,
    `${type}/rejected`,
  ];
  return [type, PENDING, FULFILLED, REJECTED];
}

export function createActionHandler<T = any>() {
  return (
    state: WritableDraft<AsyncStateType<T[], Error, any>>,
    action: AnyAction
  ) => {
    console.log("123213.state->", state.data);
    console.log("data->", state.data);
    console.log("action->", action);
    console.log("action.payload->", action.payload);
    state.loading = false;
    state.data = state?.data
      ? state?.data?.concat(action.payload)
      : [...[action.payload]];
    state.error = null;

    // return {
    //   ...state,
    //   loading: false,
    //   error: null,
    //   data: state?.data
    //     ? state?.data?.concat(action.payload)
    //     : [...[action.payload]],
    // };
  };
}

export function updateActionHandler<T>(key: string) {
  return (
    state: WritableDraft<AsyncStateType<T[], Error, any>>,
    action: AnyAction
  ) => {
    console.log("state->", state);
    console.log("action->", action);
    state.loading = false;
    state.data = state?.data?.map((item: any) => {
      return item?.[key] === action.payload?.[key]
        ? {
            ...item,
            ...action.payload,
          }
        : item;
    }) ?? [...[action.payload]];
    state.error = null;
    // return {
    //   loading: false,
    //   error: null,
    //   data: state?.data?.map((item: any) => {
    //     return item?.[key] === action.payload?.[key]
    //       ? {
    //           ...item,
    //           ...action.payload,
    //         }
    //       : item;
    //   }) ?? [...[action.payload]],
    // };
  };
}

export function deleteActionHandler<T>(key: string) {
  return (
    state: WritableDraft<AsyncStateType<T[], Error, any>>,
    action: AnyAction
  ) => {
    console.log("state->", state);
    console.log("action->", action);
    state.loading = false;
    state.data = state?.data?.filter(
      (item: any) => item?.[key] !== Number(action.payload?.param) && item
    ) ?? [...[action.payload]];
    state.error = null;
  };
}
