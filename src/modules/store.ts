import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "modules";
// 스토어 생성
export const store = configureStore({
  reducer: rootReducer,
});

// useSelector 사용시 타입으로 사용하기 위함
export type RootState = ReturnType<typeof store.getState>;

// useDispatch를 좀 더 명확하게 사용하기 위함
export type AppDispatch = typeof store.dispatch;

/**
 * @description
 * RootState, AppDispatch의 경우 후에 Typed hook을 만들기 위해서 사용된다.
 * 이 친구들은 reducer 안에 들어갈 slice들의 타입을 더 명확하게 해주기 위한 용도로 사용한다는 것 같다.
 */
