import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { createGlobalStyle, css } from "styled-components";
import MainPage from "pages/MainPage";
import HomePage from "pages/HomePage";

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

function App() {
  return (
    <>
      <GlobalStyle companyIdentityColor={process.env.REACT_APP_TE_COLOR} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/amons/signin/*" element={<LoginPage />} /> */}
        <Route path="/amons/:type" element={<HomePage />}>
          {/* <Route path=":field/:menu/*" element={<ManagementContainer />} /> */}
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
