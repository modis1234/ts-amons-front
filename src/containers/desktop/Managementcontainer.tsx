import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faHardHat,
  faIdCardAlt,
  faRoad,
  faTruck,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LocalContainer from 'containers/field/LocalContainer';
import CompanyContainer from 'containers/general/CompanyContainer';
import VehicleContainer from 'containers/general/VehicleContainer';
import WorkerContainer from 'containers/general/WorkerContainer';
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { styled } from 'styled-components';

const ManagementCmpt = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  .sidebar-empty-area {
    width: 260px;
    height: 100%;
  }
  .contents-container {
    width: calc(100% - 260px);
    height: 100%;
    padding: 18px 18px 18px 18px;
    .menu-box {
      width: 100%;
      height: 100%;
      max-width: 1932px;
      min-width: 1420px;
      .menu-header {
        width: 100%;
        height: 54px;
        padding-bottom: 10px;
        .menu-title {
          height: 100%;
          width: 100%;
          font-family: NotoSansCJKkr-Medium;
          color: #484848;
          border-bottom: 1px solid #333333;
          display: flex;
          align-items: center;
          .title-icon {
            margin-right: 14px;
            font-size: 20px;
          }
          .title-text {
            font-size: 24px;
          }
        }
      }
      .menu-body {
        width: 100%;
        height: calc(100% - 54px);
      }
    }
  }
`;

type ContentsType = {
  title: string;
  icon?: IconProp | undefined;
  component: React.ReactElement;
};
type ContentsListType = {
  [keys: string]: ContentsType;
};

type ActiveMenuType = {
  param: string;
  query: string | null;
};

const contentsList: ContentsListType = {
  local: {
    title: '노선관리',
    icon: faRoad,
    component: <LocalContainer />,
  },
  company: {
    title: '소속사 관리',
    icon: faIdCardAlt,
    component: <CompanyContainer />,
  },
  worker: {
    title: '작업자 관리',
    icon: faHardHat,
    component: <WorkerContainer />,
  },
  vehicle: {
    title: '차량 관리',
    icon: faTruck,
    component: <VehicleContainer />,
  },
};

function Managementcontainer() {
  const [targetMenu, setTargetMenu] = useState<ContentsType | null>(null);
  const { activeMenu } = useOutletContext<{ activeMenu: ActiveMenuType }>();

  useEffect(() => {
    const _targetMenu = contentsList?.[activeMenu.param];
    if (_targetMenu) setTargetMenu(_targetMenu);
  }, [activeMenu]);

  return (
    <ManagementCmpt className="magement-component">
      <div className="sidebar-empty-area"></div>
      <div className="contents-container">
        <div className="menu-box">
          <div className="menu-header">
            <div className="menu-title">
              <span className="title-icon">
                {targetMenu && targetMenu.icon && (
                  <FontAwesomeIcon icon={targetMenu.icon} />
                )}
              </span>
              <span className="title-text">
                {targetMenu && targetMenu?.title}
              </span>
            </div>
          </div>
          <div className="menu-body">{targetMenu && targetMenu?.component}</div>
        </div>
      </div>
    </ManagementCmpt>
  );
}

export default Managementcontainer;
