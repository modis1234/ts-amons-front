import React, { useState } from 'react';
import styled from 'styled-components';
import {
  faBars,
  faDigging,
  faHouse,
  faMicrophoneLines,
  faQuestion,
  faSignOutAlt,
  faToggleOff,
  faVolumeSlash,
} from '@fortawesome/pro-solid-svg-icons';
import { faRectangleList } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HeaderCmpt = styled.div`
  width: 100%;
  min-width: 1920px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2e2e2e;
  font-family: NotoSansCJKkr-Medium;
  color: #ffffff;

  .left-area {
    display: flex;
    align-items: center;
    gap: 15px;
    padding-left: 13px;

    .side-bar {
      width: 44px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #000000;
      font-size: 20px;
      color: #ffffff;
      transition: all 0.3s;
      opacity: 0.5;
      &.monitor,
      &.dashboard,
      &.network {
        opacity: 1;
        cursor: pointer;
        &:hover {
          color: var(--company-identity-color, #0000ff);
        }
      }
    }

    .title-box {
      display: flex;
      align-items: center;
      gap: 19px;
      font-size: 30px;
      /* .logo {
        img {
          height: 43px;
        }
      } */
      .title {
        display: flex;
        gap: 8px;
        align-items: center;
        .local-name {
          color: var(--company-identity-color, #0000ff);
        }
      }
    }
  }

  .right-area {
    display: flex;
    align-items: center;
    gap: 30px;
    padding-right: 13px;

    .button-box {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      font-size: 12px;
      font-family: NotoSansCJKkr-Regular;
      color: #ffffff;
      cursor: pointer;

      &:hover {
        .alarm,
        .home,
        .tts,
        .dig-rate,
        .access,
        .question {
          /* opacity: 0.6; */
          color: var(--company-identity-color, #0000ff);
        }
      }

      a {
        color: #ffffff !important;
      }

      .button {
        width: 39px;
        height: 39px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        transition: all 0.2s;
        font-size: 20px;

        &.alarm {
          background-color: #c23235;
        }
        &.home {
          background-color: #a73b1f;
          font-size: 18px;
        }
        &.tts {
          background-color: #971717;
          font-size: 22px;
        }
        &.dig-rate {
          background-color: #686868;
        }
        &.access {
          background-color: #2b4e38;
        }
        &.question {
          background-color: #305a70;
        }
        &.screen {
          display: flex;
          flex-direction: column;
          border-radius: 4px;
          background-color: #30704d;
          font-size: 14px;

          &:hover {
            .screen-message {
              display: flex;
            }
          }
          .screen-message {
            display: none;
            position: absolute;
            bottom: -35px;
            right: -77px;
            width: max-content;
            padding: 5px;
            border: 1px solid #a4a4a4;
            border-radius: 2px;
            background-color: #000000;
            box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
            font-size: 12px;
            line-height: 1.2;
            z-index: 100;
          }
        }
      }

      .active {
        /* opacity: 0.6; */
        color: var(--company-identity-color, #0000ff);
      }
    }

    .logout {
      width: 44px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #000000;
      font-size: 22px;
      color: #b3b3b3;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        /* opacity: 0.6; */
        color: var(--company-identity-color, #0000ff);
      }
    }
  }
`;

type HeaderProps = {
  query?: string | null;
  type: string | undefined;
  gasAlarmPanel?: boolean;
  alarmPanel?: boolean;
  alarmSound: boolean;
  alarmSoundOff: () => void;
  digInfoAction: boolean;
  onOpenDigTable: () => void;
  accessListAction: boolean;
  onOpenAccessTable: () => void;
  screenState: string;
  onLogout: () => void;
  activeMenu: {
    param: string | undefined;
    query: string | null;
  };
  callSideMenuHandler: () => void;
  ttsAction: number | undefined;
};

function Header({
  query,
  type,
  gasAlarmPanel,
  alarmPanel,
  alarmSound,
  alarmSoundOff,
  digInfoAction,
  onOpenDigTable,
  accessListAction,
  onOpenAccessTable,
  screenState,
  onLogout,
  activeMenu,
  callSideMenuHandler,
  ttsAction,
}: HeaderProps) {
  const [tunnelTitle, setTunnelTitle] = useState<{ [key: string]: string }>({
    monitor: '통합 모니터링',
    type001: '제1구간',
    type002: '제2구간',
    type003: '제3구간',
    network: 'NMS 모니터링',
  });

  return (
    <HeaderCmpt className={`header-component`}>
      <div className="left-area">
        <div
          className={`side-bar  ${activeMenu?.param}`}
          onClick={
            activeMenu?.param === 'dashboard' ||
            activeMenu?.param === 'monitor' ||
            activeMenu?.param === 'network'
              ? callSideMenuHandler
              : undefined
          }
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="title-box">
          <div className="logo">
            <img src="/logo/header.png" alt="호반건설" />
          </div>

          <div className="title">
            <span>{process.env.REACT_APP_SYSTEM_TITLE}</span>
            <div className="local-name">
              {/* {activeMenu?.param === 'monitor'
          ? '통합모니터링'
          : activeMenu?.param === 'dashboard'
          ? `대시보드`
            : `1공구 건설공사`} */}
              {activeMenu.query
                ? tunnelTitle[activeMenu.query]
                : activeMenu.param
                ? tunnelTitle[activeMenu.param]
                : null}
            </div>
          </div>
        </div>
      </div>

      <div className="right-area">
        {(alarmPanel || gasAlarmPanel) && alarmSound && (
          <div className="button-box" onClick={alarmSoundOff}>
            <div className="button alarm">
              <FontAwesomeIcon icon={faVolumeSlash} />
            </div>
            <div>알람음</div>
          </div>
        )}
        {/* <div className="button-box">
    <div className="button home">
      <FontAwesomeIcon icon={faHouse} />
    </div>
    <div>HOME</div>
  </div> */}
        {ttsAction === 1 && (
          <div className="button-box">
            {/* 레지스트리 key 값 명 url protocol 호출 */}
            <a href={`amons-sys-tts-sys://`}>
              <div className="button tts">
                <FontAwesomeIcon icon={faMicrophoneLines} />
              </div>
            </a>
            <div className="button-name">비상방송</div>
          </div>
        )}
        {type === 'dashboard' && (
          <div className="button-box" onClick={onOpenDigTable}>
            <div className={`button dig-rate ${digInfoAction ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faDigging} />
            </div>
            <div>굴진율</div>
          </div>
        )}
        {type === 'dashboard' && (
          <div className="button-box" onClick={onOpenAccessTable}>
            <div
              className={`button access ${accessListAction ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={faRectangleList} />
            </div>
            <div>출입목록</div>
          </div>
        )}
        <div className="button-box">
          <a href={'/menual/도봉산-옥정1공구_통합매뉴얼.pdf'} download>
            <div className="button question">
              <FontAwesomeIcon icon={faQuestion} />
            </div>
          </a>
          <div>도움말</div>
        </div>
        <div className="button-box">
          <div className="button screen">
            <span>F11</span>
            <FontAwesomeIcon icon={faToggleOff} />
            <div className="screen-message">
              {`키보드 상단의 F11 키를 누르면 ${
                screenState === 'full' ? '일반화면' : '전체화면'
              }으로 전환됩니다.`}
            </div>
          </div>
          <div>{screenState === 'full' ? '일반화면' : '전체화면'}</div>
        </div>
        <div className="logout" onClick={onLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </div>
      </div>

      {(alarmPanel || gasAlarmPanel) && (
        <audio className="audio-element">
          <source src="/sound/siren_repeat_2.mp3" />
          <track
            src="captions_en.vtt"
            kind="captions"
            label="english_captions"
          />
        </audio>
      )}
    </HeaderCmpt>
  );
}

export default Header;
