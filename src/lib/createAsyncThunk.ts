import { createAsyncThunk } from "@reduxjs/toolkit";

export interface MyKnownError {
  errorMessage: string;
}

type AnyPromiseCreator = (...params: any[]) => Promise<any>;

export function createThunk<T, F = undefined>(
  action: string,
  promiseCreator: AnyPromiseCreator
) {
  return createAsyncThunk<
    T, // 성공 시 리턴 타입
    F, // input type. 아래 콜백함수에서 userId 인자가 input에 해당
    { rejectValue: MyKnownError } // ThunkApi 정의({dispatch?, state?, extra?, rejectValue?})
  >(action, async (data, thunkAPI) => {
    console.log("param=>", data);
    console.log("action=>", action);
    console.log("thunkAPI=>", thunkAPI);
    console.log("getState=>", thunkAPI.getState());
    try {
      const payload = await promiseCreator(data);
      return payload;
    } catch (e) {
      // rejectWithValue를 사용하여 에러 핸들링이 가능하다
      return thunkAPI.rejectWithValue({
        errorMessage: "알 수 없는 에러가 발생했습니다.",
      });
    }
  });
}

export function updateThunk<T, F = undefined>(
  key: any,
  action: string,
  promiseCreator: AnyPromiseCreator
) {
  return createAsyncThunk<
    T, // 성공 시 리턴 타입
    F, // input type. 아래 콜백함수에서 userId 인자가 input에 해당
    { rejectValue: MyKnownError } // ThunkApi 정의({dispatch?, state?, extra?, rejectValue?})
  >(action, async (data: any, thunkAPI) => {
    try {
      let _key: any;
      if (data?.[key]) {
        _key = data[key];
      } else {
        /**
          @description data 타입이 FormData 일 경우/ 작업자,인원,장비 등  이미지 등록은 FormDatam로 전달  
        */
        const _item = JSON.parse(data.get("reqBody"));
        _key = _item[key];
      }

      const payload = await promiseCreator(_key, data);
      return payload;
    } catch (e) {
      // rejectWithValue를 사용하여 에러 핸들링이 가능하다
      return thunkAPI.rejectWithValue({
        errorMessage: "알 수 없는 에러가 발생했습니다.",
      });
    }
  });
}

export function deleteThunk<T, F = undefined>(
  key: any,
  action: string,
  promiseCreator: AnyPromiseCreator
) {
  return createAsyncThunk<
    T, // 성공 시 리턴 타입
    F, // input type. 아래 콜백함수에서 userId 인자가 input에 해당
    { rejectValue: MyKnownError } // ThunkApi 정의({dispatch?, state?, extra?, rejectValue?})
  >(action, async (data: any, thunkAPI) => {
    try {
      let _key: any = data[key];
      const payload = await promiseCreator(_key);
      return payload;
    } catch (e) {
      // rejectWithValue를 사용하여 에러 핸들링이 가능하다
      return thunkAPI.rejectWithValue({
        errorMessage: "알 수 없는 에러가 발생했습니다.",
      });
    }
  });
}
