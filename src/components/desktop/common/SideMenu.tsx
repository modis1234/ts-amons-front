import { SiteType } from "modules/sites";
import React, { useEffect, useState } from "react";
import { Menu, Sidebar } from "semantic-ui-react";
import styled from "styled-components";
import {
  faDisplay,
  faDownload,
  faIdCard,
} from "@fortawesome/pro-solid-svg-icons";
import MenuItem from "./MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuCmpt = styled.div`
  width: 260px;
  /* height: 100%; */
  background-color: #1b1c1d;
  a.a-download {
    color: #7c7c7c;
    &:hover {
      color: #ffffff;
    }
    .sidemenu-sub-title {
      height: 48px;
      padding-left: 20px;
      padding-right: 15px;
      border-top: 1px solid #7c7c7c;
      border-bottom: 1px solid #7c7c7c;
      font-family: NotoSansCJKkr-Regular;
      font-size: 14px !important;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin-right: 5px;
      }
    }
  }
`;

type SideProps = {
  callSideMenu: boolean;
  activeMenu: {
    param: string | null;
    query: string | null;
  };
  userInfo: {
    login_date: Date | string;
    created_date: Date | string;
    acc_id: number;
    acc_name: string;
    acc_user_id: string;
    acc_phone: string;
    acc_tel: null;
    acc_mail: string;
    acc_role: number;
  };
  siteItem: SiteType;
};

function SideMenu({
  callSideMenu,
  activeMenu = {
    param: null,
    query: null,
  },
  userInfo,
  siteItem,
}: SideProps) {
  const [role, setRole] = useState<number>(2);

  useEffect(() => {
    const _role = userInfo ? userInfo.acc_role : 2;
    setRole(_role);
  }, []);

  const menuList = {
    empty: {
      header: undefined,
      type: "single",
      show: false,
      menu: [
        {
          key: 1,
          id: "empty",
        },
      ],
    },
    monitor: {
      header: undefined,
      type: "single",
      show: true,
      menu: [
        {
          key: 1,
          id: "monitor",
          class: "monitor",
          name: "모니터링",
          to: "/amons/monitor",
          // active: activeMenu?.param === 'monitor',
          icon: faDisplay,
          // disabled: true,
        },
      ],
    },
    dashboard: {
      header: "현장선택",
      type: "group",
      show: true,
      menu: [
        {
          key: 1,
          id: "integrated",
          class: "montior-integrated",
          name: "통합모니터링",
          to: "/amons/monitor",
          active: activeMenu?.param === "monitor",
          disabled: false,
        },
        {
          key: 2,
          id: "dashboard",
          class: "dashboard",
          name: "105/106 대시보드",
          to: "/amons/dashboard?area=type001",
          active:
            activeMenu?.param === "dashboard" &&
            activeMenu?.query === "type001",
          disabled: false,
        },
        {
          key: 3,
          id: "dashboard",
          class: "dashboard",
          name: "107/환승통로 대시보드",
          to: "/amons/dashboard?area=type002",
          active:
            activeMenu?.param === "dashboard" &&
            activeMenu?.query === "type002",
          disabled: false,
        },
        {
          key: 4,
          id: "dashboard",
          class: "dashboard",
          name: "108 대시보드",
          to: "/amons/dashboard?area=type003",
          active:
            activeMenu?.param === "dashboard" &&
            activeMenu?.query === "type003",
          disabled: false,
        },
        {
          key: 5,
          id: "network",
          class: "network",
          name: "NMS 모니터링",
          to: "/amons/network",
          active: activeMenu?.param === "network",
          disabled: !siteItem?.nms_action,
        },
      ],
    },
    log: {
      header: "이력조회",
      type: "group",
      show: role < 3 ? true : false,
      menu: [
        {
          key: 1,
          id: "sosalarm",
          class: "sosalarm",
          name: "알람이력 : 작업자",
          to: "/amons/home/log/sosalarm",
          active: activeMenu?.param === "sosalarm",
          disabled: !siteItem?.ble_type && !siteItem?.sos_action,
        },
        {
          key: 2,
          id: "sensoralarm",
          class: "sensoralarm",
          name: "알람이력 : 가스센서",
          to: "/amons/home/log/gasalarm",
          active: activeMenu?.param === "gasalarm",
          disabled: !siteItem?.gas_action,
        },
        {
          key: 4,
          id: "workerlog",
          class: "workerlog",
          name: "출입이력 : 작업자",
          to: "/amons/home/log/workerlog",
          active: activeMenu?.param === "workerlog",
          disabled: !siteItem?.ble_type,
        },
        {
          key: 5,
          id: "vehiclelog",
          class: "vehiclelog",
          name: "출입이력 : 차량",
          to: "/amons/home/log/vehiclelog",
          active: activeMenu?.param === "vehiclelog",
          disabled: !siteItem?.ble_type,
        },
        {
          key: 6,
          id: "diglog",
          class: "diglog",
          name: "굴진이력",
          to: "/amons/home/log/diglog",
          active: activeMenu?.param === "diglog",
        },
        {
          key: 7,
          id: "sensorlog",
          class: "sensorlog",
          name: "수신이력 : 가스센서",
          to: "/amons/home/log/sensorlog",
          active: activeMenu?.param === "sensorlog",
          disabled: !siteItem?.gas_action,
        },
        {
          key: 8,
          id: "networklog",
          class: "networklog",
          name: "네트워크 장애이력",
          to: "/amons/home/log/networklog",
          active: activeMenu?.param === "networklog",
          disabled: !siteItem?.nms_action,
        },
      ],
    },
    field: {
      header: "현장관리",
      type: "group",
      show: role < 3 ? true : false,
      menu: [
        {
          key: 6,
          id: "site",
          class: "site",
          name: "현장관리",
          to: "/amons/home/field/site",
          active: activeMenu?.param === "site",
          disabled: role !== 0 && true,
        },
        {
          key: 1,
          id: "announce",
          class: "announce",
          name: "공지사항",
          to: "/amons/home/field/announce",
          active: activeMenu?.param === "announce",
        },
        {
          key: 2,
          id: "local",
          class: "local",
          name: "노선관리",
          to: "/amons/home/field/local",
          active: activeMenu?.param === "local",
          disabled: role !== 0 && true,
        },
        {
          key: 3,
          id: "accdig",
          class: "accdig",
          name: "누적 굴진량 입력",
          to: "/amons/home/field/accdig",
          active: activeMenu?.param === "accdig",
          disabled: siteItem?.dig_type !== 1,
        },
        {
          key: 4,
          id: "daysdig",
          class: "daysdig",
          name: "일일 굴진량 입력",
          to: "/amons/home/field/daysdig",
          active: activeMenu?.param === "daysdig",
          disabled: siteItem?.dig_type !== 2,
        },
        {
          key: 5,
          id: "process",
          class: "process",
          name: "공정상태 변경",
          to: "/amons/home/field/process",
          active: activeMenu?.param === "process",
        },
      ],
    },
    general: {
      header: "일반관리",
      type: "group",
      show: role < 2 ? true : false,
      menu: [
        {
          key: 1,
          id: "company",
          class: "company",
          name: "소속사 관리",
          to: "/amons/home/general/company",
          active: activeMenu?.param === "company",
        },
        {
          key: 2,
          id: "worker",
          class: "worker",
          name: "작업자 관리",
          to: "/amons/home/general/worker",
          active: activeMenu?.param === "worker",
        },
        {
          key: 3,
          id: "vehicle",
          class: "vehicle",
          name: "차량 관리",
          to: "/amons/home/general/vehicle",
          active: activeMenu?.param === "vehicle",
        },
        {
          key: 4,
          id: "beacon",
          class: "beacon",
          name: "디바이스 관리 : 비콘",
          to: "/amons/home/general/beacon",
          active: activeMenu?.param === "beacon",
          // disabled: role !== 0 && true,
          disabled: !siteItem?.ble_type,
        },
        {
          key: 5,
          id: "scanner",
          class: "scanner",
          name: "디바이스 관리 : 스캐너",
          to: "/amons/home/general/scanner",
          active: activeMenu?.param === "scanner",
          disabled: role !== 0 && true,
          // disabled: role !== 0 && true && !siteItem?.ble_type,
        },
        {
          key: 6,
          id: "cctv",
          class: "cctv",
          name: "디바이스 관리 : CCTV",
          to: "/amons/home/general/cctv",
          active: activeMenu?.param === "cctv",
          // disabled: role !== 0 && true,
          disabled: !siteItem?.cctv_action,
        },
        {
          key: 7,
          id: "sensor",
          class: "sensor",
          name: "디바이스 관리 : 가스센서",
          to: "/amons/home/general/sensor",
          active: activeMenu?.param === "sensor",
          // disabled: role !== 0 && true,
          disabled: !siteItem?.gas_action,
        },
        {
          key: 8,
          id: "phone",
          class: "phone",
          name: "디바이스 관리 : 비상전화",
          to: "/amons/home/general/phone",
          active: activeMenu?.param === "phone",
          disabled: !siteItem?.phone_action,
        },
        {
          key: 9,
          id: "wifi",
          class: "wifi",
          name: "디바이스 관리 : WIFI",
          to: "/amons/home/general/wifi",
          active: activeMenu?.param === "wifi",
          disabled: !siteItem?.wifi_action,
        },
        {
          key: 10,
          id: "tts",
          class: "tts",
          name: "디바이스 관리 : TTS 비상방송",
          to: "/amons/home/general/tts",
          active: activeMenu?.param === "tts",
          disabled: !siteItem?.tts_action,
        },
        {
          key: 11,
          id: "wireless",
          class: "wireless",
          name: "디바이스 관리 : 무선장비",
          to: "/amons/home/general/wireless",
          active: activeMenu?.param === "wireless",
          disabled: !siteItem?.wireless_action,
        },
      ],
    },
    qrcode: {
      header: "QR코드 관리",
      type: "group",
      show: role < 2 ? true : false,
      // show: true,
      menu: [
        {
          key: 1,
          id: "qr-create",
          class: "qr-create",
          name: "QR코드 생성",
          to: "/amons/home/qrcode/create",
          active: activeMenu?.param === "create",
        },
        {
          key: 2,
          id: "qr-list",
          class: "qr-list",
          name: "QR코드 목록",
          to: "/amons/home/qrcode/list",
          active: activeMenu?.param === "list",
        },
        {
          key: 3,
          id: "qr-form",
          class: "qr-form",
          name: "양식폼 관리",
          to: "/amons/home/qrcode/form",
          active: activeMenu?.param === "form",
        },
        {
          key: 4,
          id: "qr-form",
          class: "qr-form",
          name: "관리이력 : 작업자",
          to: "/amons/home/qrcode/qr-worker",
          active: activeMenu?.param === "qr-worker",
        },
        {
          key: 5,
          id: "qr-form",
          class: "qr-form",
          name: "관리이력 : 차량",
          to: "/amons/home/qrcode/qr-vehicle",
          active: activeMenu?.param === "qr-vehicle",
        },
        {
          key: 6,
          id: "qr-form",
          class: "qr-form",
          name: "관리이력 : CCTV",
          to: "/amons/home/qrcode/qr-cctv",
          active: activeMenu?.param === "qr-cctv",
        },
        {
          key: 7,
          id: "qr-form",
          class: "qr-form",
          name: "관리이력 : 가스센서",
          to: "/amons/home/qrcode/qr-sensor",
          active: activeMenu?.param === "qr-sensor",
        },
        {
          key: 8,
          id: "qr-form",
          class: "qr-form",
          name: "관리이력 : 기타",
          to: "/amons/home/qrcode/qr-etc",
          active: activeMenu?.param === "qr-etc",
        },
      ],
    },
    account: {
      header: undefined,
      type: "single",
      show: role < 2 ? true : false,

      menu: [
        {
          key: 1,
          id: "account",
          class: "account",
          name: "계정관리",
          to: "/amons/home/etc/account",
          active: activeMenu?.param === "account",
          icon: faIdCard,
        },
      ],
    },
    ect: {
      header: "기타관리",
      show: role < 2 ? true : false,
      menu: [
        {
          key: 1,
          id: "settings",
          class: "settings",
          name: "환경설정",
          to: "/amons/home/etc/settings",
          active: activeMenu?.param === "settings",
          disabled: role < 2 && false,
        },
        {
          key: 2,
          id: "kickworker",
          class: "kickworker",
          name: "퇴출관리 : 작업자",
          to: "/amons/home/etc/kickworker",
          active: activeMenu?.param === "kickworker",
          disabled: role !== 0 && true,
        },
        {
          key: 3,
          id: "kickvehicle",
          class: "kickvehicle",
          name: "퇴출관리 : 차량",
          to: "/amons/home/etc/kickvehicle",
          active: activeMenu?.param === "kickvehicle",
          disabled: role !== 0 && true,
        },
        {
          key: 4,
          id: "loginlog",
          class: "loginlog",
          name: "로그인 기록",
          to: "/amons/home/etc/loginlog",
          active: activeMenu?.param === "loginlog",
          disabled: role !== 0 && true,
        },
        {
          key: 5,
          id: "group",
          class: "group",
          name: "스캐너 그룹 관리",
          to: "/amons/home/etc/group",
          active: activeMenu?.param === "group",
          disabled: role !== 0 && true,
        },
      ],
    },
    download: {
      header: undefined,
      type: "single",
      show: true,
      menu: [
        {
          key: 1,
          id: "download",
          class: "download",
          as: "a",
          href: `/common/cctv_플러그인.zip`,
          download: true,
          name: "CCTV 플러그인 다운로드",
          icon: faDownload,
        },
      ],
    },
  };

  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      direction="left"
      icon="labeled"
      className="sidebar-component"
      // inverted
      // onHide={() => setVisible(false)}
      vertical
      visible={callSideMenu}
      style={{
        border: 0,
        scrollbarWidth: "none",
        // minHeight: 'none',
        maxHeight: "none",
      }}
    >
      <MenuCmpt className="menu-component">
        {/* <Menu.Item /> */}
        <MenuItem items={menuList.empty} />
        {menuList.empty.show && <MenuItem items={menuList.monitor} />}
        {menuList.dashboard.show && <MenuItem items={menuList.dashboard} />}
        {menuList.log.show && <MenuItem items={menuList.log} />}
        {menuList.field.show && <MenuItem items={menuList.field} />}
        {menuList.general.show && <MenuItem items={menuList.general} />}
        {menuList.account.show && <MenuItem items={menuList.account} />}
        {siteItem?.qr_action && menuList.qrcode.show ? (
          <MenuItem items={menuList.qrcode} />
        ) : null}
        {/* {menuList.ect.show && <MenuItem items={menuList.ect} />} */}
        {menuList.download.show && (
          <a className="a-download" href={`/common/cctv_플러그인.zip`} download>
            <div className="sidemenu-sub-title download">
              <span>CCTV 플러그인 다운로드</span>
              <span>
                <FontAwesomeIcon icon={faDownload} className="download-icon" />
              </span>
            </div>
          </a>
        )}
      </MenuCmpt>
    </Sidebar>
  );
}

export default SideMenu;
