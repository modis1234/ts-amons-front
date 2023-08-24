/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import { isBrowser } from "react-device-detect";
import DeskHomeContainer from "containers/desktop/HomeContainer";
// import MobileHomeContainer from 'containers/mobile/HomeContainer';

const HomePage = () => {
  return <DeskHomeContainer />;
  //   return <>{isBrowser ? <DeskHomeContainer /> : <MobileHomeContainer />}</>;
};

export default HomePage;
