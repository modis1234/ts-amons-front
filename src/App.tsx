import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { createGlobalStyle, css } from 'styled-components';
import MainPage from 'pages/MainPage';
import HomePage from 'pages/HomePage';
import { faRoad } from '@fortawesome/pro-solid-svg-icons';
import Managementcontainer from 'containers/desktop/Managementcontainer';

const GlobalStyle = createGlobalStyle<{
  companyIdentityColor: string | undefined;
}>`
:root {
  ${({ companyIdentityColor }) =>
    companyIdentityColor
      ? css`
          --company-identity-color: #ec6707;
        `
      : css`
          --company-identity-color: #a32958;
        `}
}
.modal-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-family: NotoSansCJKkr-Regular;
    font-weight: 100;

    .modal-head {

      font-family: NotoSansCJKkr-Medium;
      font-size: 18px;
      text-align: center;
    } 
    .modal-info-confirm {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      .icon-success {
        width: 100%;
        padding: 10px 0 24px;
        margin: auto;
        font-size: 40px;
        color: var(--company-identity-color, #0000ff);
        
      }
      .modal-info-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 8px;
        font-size: 15px;
        line-height: 1.6;
        padding: 0 3%;

        .modal-info-label {
          width: 35%;
          text-align: justify;
        }
        .modal-info-value {
          width: 70%;
          font-family: NotoSansCJKkr-Medium;
        }
      }
    }
    /* .modal-info-item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      line-height: 1.6;
      padding: 0 10px;

      .modal-info-label {
        width: 80px;
        text-align: justify;
      }
      .modal-info-value {
          font-family: NotoSansCJKkr-Medium;
        }
    } */
    .modal-confirm-msg {
      font-family: NotoSansCJKkr-Medium;
      text-align: center;
      .action-msg {
        color:var(--company-identity-color, #0000ff);
      }
    }
    .modal-btn {
      display: flex;
      justify-content: center;
      gap: 10px;
      padding: 14px 0;
      background-color: #f9fafb;
      border-radius: 0 0 5px 5px;

      button {
        padding: 8px 20px;
        border: none;
        border-radius: 5px;
        font-family: 'NotoSansCJKkr-Regular';
        font-size: 14px;
        font-weight: 100;
        color: #ffffff;
      }

      .action {
        background-color: var(--company-identity-color, #0000ff);
      }

      .confirm {
        background-color: var(--company-identity-color, #0000ff);
      }

      .hidden {
        display: none;
      }
    }
 }


  .ui.modal.transition.visible.active.confirm-modal{
      width : 500px;
      height: auto;
      text-align: center;
      align-items: center; 
      
      .header {
        font-family: NotoSansCJKkr-Regular;
      }
      .delete-icon,.kickout-icon,.complete-icon{
        font-size : 100px;
        color : #d01919;
        margin : 20px;
      }

      .update-icon,.warning-icon{
        font-size : 100px;
        color : #5e7827;
        margin : 20px;
      }
      
      .text{
        font-family: NotoSansCJKkr-Medium;
        font-size : 20px;
        &.beacon{
          font-family: RobotoMono-Medium;
        }
      }
      .text-info{
        font-family: NotoSansCJKkr-Medium;
        font-size : 15px;
        color : #e3190d !important;
      }
}
  .ui.modal.transition.visible.active.address-modal{
      width : 500px;      
      text-align: center;
      align-items: center; 
      .header {
        font-family: NotoSansCJKkr-Regular;
      }
      .text{
        font-family: "NotoSansCJKkr-Medium";
        font-size : 20px;
      }
      .cancel {
        width: 100px;
        background-color: #000000 !important;
      }
}

.ui.menu{
      box-shadow : none !important;
    }

  html {
      width: 100vw;
      /* height: 100vh;  */

      body{
          width: 100%;
          height: 100%;

          display: flex;
          justify-content: center;
          /* overflow: hidden; */
          &::-webkit-scrollbar {
            margin: 0px;
            display: none;
          }
          div#root{
            width: 100%;
            height: 100%;
          }
          @media screen and (min-height: 1000px) {
            overflow-y: hidden !important;
          }
          
      } 
  }

  .ui.selection.active.dropdown,
  .ui.selection.active.dropdown:hover,
  .ui.selection.active.dropdown:focus {
    border-color: var(--company-identity-color, #0000ff) !important;
  }

 .modal-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
      font-family: NotoSansCJKkr-Regular;
    font-weight: 100;

    .modal-head {

      font-family: NotoSansCJKkr-Medium;
      font-size: 18px;
      text-align: center;
    } 
    .modal-info-confirm {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      .icon-success {
        width: 100%;
        padding: 10px 0 24px;
        margin: auto;
        font-size: 40px;
        color: var(--company-identity-color, #0000ff);
        
      }
      .modal-info-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 8px;
        font-size: 15px;
        line-height: 1.6;
        padding: 0 3%;

        .modal-info-label {
          width: 35%;
          text-align: justify;
        }
        .modal-info-value {
          width: 70%;
          font-family: NotoSansCJKkr-Medium;
        }
      }
    }
    /* .modal-info-item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      line-height: 1.6;
      padding: 0 10px;

      .modal-info-label {
        width: 80px;
        text-align: justify;
      }
      .modal-info-value {
          font-family: NotoSansCJKkr-Medium;
        }
    } */
    .modal-confirm-msg {
      font-family: NotoSansCJKkr-Medium;
      text-align: center;
      .action-msg {
        color:var(--company-identity-color, #0000ff);
      }
    }
    .modal-btn {
      display: flex;
      justify-content: center;
      gap: 10px;
      padding: 14px 0;
      background-color: #f9fafb;
      border-radius: 0 0 5px 5px;

      button {
        padding: 8px 20px;
        border: none;
        border-radius: 5px;
        font-family: 'NotoSansCJKkr-Regular';
        font-size: 14px;
        font-weight: 100;
        color: #ffffff;
      }

      .action {
        background-color: var(--company-identity-color, #0000ff);
      }

      .confirm {
        background-color: var(--company-identity-color, #0000ff);
      }

      .hidden {
        display: none;
      }
    }
 }


  .ui.modal.transition.visible.active.confirm-modal{
      width : 500px;
      height: auto;
      text-align: center;
      align-items: center; 
      
      .header {
        font-family: NotoSansCJKkr-Regular;
      }
      .delete-icon,.kickout-icon,.complete-icon{
        font-size : 100px;
        color : #d01919;
        margin : 20px;
      }

      .update-icon,.warning-icon{
        font-size : 100px;
        color : #5e7827;
        margin : 20px;
      }
      
      .text{
        font-family: NotoSansCJKkr-Medium;
        font-size : 20px;
        &.beacon{
          font-family: RobotoMono-Medium;
        }
      }
      .text-info{
        font-family: NotoSansCJKkr-Medium;
        font-size : 15px;
        color : #e3190d !important;
      }
}
.ui.modal.transition.visible.active.address-modal{
      width : 500px;      
      text-align: center;
      align-items: center; 
      .header {
        font-family: NotoSansCJKkr-Regular;
      }
      .text{
        font-family: "NotoSansCJKkr-Medium";
        font-size : 20px;
      }
      .cancel {
        width: 100px;
        background-color: #000000 !important;
      }
}
`;

const contentsList = {
  monitor: null,
  // sosalarm: {
  //   title: '알람이력 : 작업자',
  //   icon: faHardHat,
  //   component: <SosAlarmContainer />,
  // },
  // gasalarm: {
  //   title: '알람이력 : 가스센서',
  //   icon: faSensorOn,
  //   component: <GasAlarmContainer />,
  // },
  // workerlog: {
  //   title: '출입이력 : 작업자',
  //   icon: faHardHat,
  //   component: <LogWorkerContainer />,
  // },
  // vehiclelog: {
  //   title: '출입이력 : 차량',
  //   icon: faTruck,
  //   component: <LogVehicleContainer />,
  // },
  // diglog: {
  //   title: '굴진이력',
  //   icon: faPersonDigging,
  //   component: <LogDigContainer />,
  // },
  // sensorlog: {
  //   title: '수신이력 : 가스센서',
  //   icon: faSensorOn,
  //   component: <LogGasContainer />,
  // },
  // networklog: {
  //   title: '네트워크 장애이력',
  //   icon: faGlobe,
  //   component: <NetworkLogContainer />,
  // },
  // announce: {
  //   title: '공지사항',
  //   icon: faBullhorn,
  //   component: <AnnounceContainer />,
  // },
  // local: {
  //   title: '노선관리',
  //   icon: faRoad,
  //   component: <LocalContainer />,
  // },
  // accdig: {
  //   title: '누적 굴진량 입력',
  //   icon: faPersonDigging,
  //   component: <DigContainer />,
  // },
  // daysdig: {
  //   title: '일일 굴진량 입력',
  //   icon: faPersonDigging,
  //   component: <DaysDigContainer />,
  // },
  // process: {
  //   title: '공정상태 변경',
  //   icon: faTasks,
  //   component: <ProcessContainer />,
  // },
  // company: {
  //   title: '소속사 관리',
  //   icon: faIdCardAlt,
  //   component: <CompanyContainer />,
  // },
  // worker: {
  //   title: '작업자 관리',
  //   icon: faHardHat,
  //   component: <WorkerContainer />,
  // },
  // vehicle: {
  //   title: '차량 관리',
  //   icon: faTruck,
  //   component: <VehicleContainer />,
  // },
  // beacon: {
  //   title: '비콘 관리',
  //   icon: faBluetooth,
  //   component: <BeaconContainer />,
  // },
  // scanner: {
  //   title: '스캐너 관리',
  //   icon: faRouter,
  //   component: <ScannerContainer />,
  // },
  // cctv: {
  //   title: '디바이스 관리 : CCTV',
  //   icon: faCamera,
  //   component: <CctvContainer />,
  // },
  // sensor: {
  //   title: '디바이스 관리 : 가스센서',
  //   icon: faSensorOn,
  //   component: <SensorContainer />,
  // },
  // phone: {
  //   title: '디바이스 관리 : 비상전화',
  //   icon: faPhoneVolume,
  //   component: <PhoneContainer />,
  // },
  // wifi: {
  //   title: '디바이스 관리 : WIFI',
  //   icon: faWifi,
  //   component: <WifiContainer />,
  // },
  // tts: {
  //   title: '디바이스 관리 : TTS비상방송',
  //   icon: faVolume,
  //   component: <TtsContainer />,
  // },
  // wireless: {
  //   title: '디바이스 관리 : 무선장비',
  //   icon: faMobileSignal,
  //   component: <WirelessContainer />,
  // },
  // account: {
  //   title: '계정관리',
  //   icon: faIdCard,
  //   component: <AccountContainer />,
  // },
  // settings: {
  //   title: '환경설정',
  //   icon: faCog,
  //   component: <SettingsContainer />,
  // },
  // kickworker: {
  //   title: '퇴출관리 : 작업자',
  //   icon: faDoorOpen,
  //   component: <KickOutWorkerContainer />,
  // },
  // kickvehicle: {
  //   title: '퇴출관리 : 차량',
  //   icon: faDoorOpen,
  //   component: <KickOutVehicleContainer />,
  // },
  // loginlog: {
  //   title: '로그인 기록',
  //   icon: faRectangleHistory,
  //   component: <LoginLogContainer />,
  // },
  // site: {
  //   title: '현장관리',
  //   icon: faLocationDot,
  //   component: <SiteContainer />,
  // },
  // group: {
  //   title: '스캐너 그룹 관리',
  //   icon: faLocationDot,
  //   component: <GroupContainer />,
  // },
};

function App() {
  return (
    <>
      <GlobalStyle companyIdentityColor={process.env.REACT_APP_TE_COLOR} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/amons/signin/*" element={<LoginPage />} /> */}
        <Route path="/amons/:type" element={<HomePage />}>
          <Route path=":field/:menu/*" element={<Managementcontainer />} />
        </Route>

        {/*  <Route path="/qrcode">
          <Route path="signin/:index" element={<QrLoginContainer />} />
          <Route path="home/:index" element={<QrHomeContainer />} />
        </Route>
        <Route path="/did/:type/*" element={<DidPage />} /> */}

        {/* <Route path="/did/:type/*" element={<DidPage />} /> */}
        {/* 라우팅이 되지 않은 주소로 이동하고자 할때 로그인페이지로 이동. * 는 가장 낮은 우선순위를 가짐. */}
      </Routes>
    </>
  );
}

export default App;
