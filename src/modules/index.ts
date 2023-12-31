import { combineReducers } from "@reduxjs/toolkit";
// import postReducer from "./posts";
// import countReducer from "./counter/counterSlice";
import localReducer from "./locals";
import companyReducer from "./companies";
import siteReducer from "./sites";
import monitorReducer from "./monitors";

import beaconReducer from "./beacons";
import workerReducer from "./workers";

const rootReducer = combineReducers({
  // 3번에서 만들 slice를 여기에 넣을 예정
  // name으로 설정했던 것을 key로 사용한다.
  // counter: countReducer,
  // posts: postReducer,
  companies: companyReducer,
  locals: localReducer,
  sites: siteReducer,
  monitors: monitorReducer,
  beacons: beaconReducer,
  workers: workerReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>; // 리덕스 스토어에서 관리하고 있는 상태에 대한 타입을 내보낼 수 있다.
