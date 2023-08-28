import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";
import qs, { ParsedQs } from "qs";
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Sidebar } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "modules/hooks";
import Header from "components/desktop/common/Header";
import storage from "lib/storage";
import SideMenu from "components/desktop/common/SideMenu";
import { getSites } from "modules/sites";
import { receiveMonitor } from "modules/monitors";

const HomeCmpt = styled.div`
  .header-container {
    width: 100%;
    height: 70px;
  }
  .body-container {
    position: relative;
    width: 100%;
    min-width: 1920px;
    height: calc(100vh - 70px);
    color: #7c7c7c;
    overflow: hidden;

    .pushable {
      overflow-y: hidden;
      &.dashboard,
      &.monitor {
        background-color: #5e5e5e;
        overflow-y: auto;
        .sidebar-component {
          min-height: 1010px;
        }
      }
      .sidebar-component {
        height: 100%;
        z-index: 300;
        background-color: #1b1c1d;
        overflow: auto;
      }
      .sidebar-component.menu::-webkit-scrollbar {
        -webkit-appearance: none;
        margin: 0px;
        display: none;
      }
    }
    .pushable::-webkit-scrollbar {
      margin: 0px;
      display: none;
    }
  }
`;

function HomeContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { type, field, menu } = useParams();

  const { sitesData } = useAppSelector((state) => {
    return { sitesData: state.sites.data };
  });

  const [query, setQuery] = useState<string | ParsedQs | null>(null);
  const [callSideMenu, setCallSideMenu] = useState<boolean>(true);

  const [activeMenu, setActiveMenu] = useState<{
    param: string;
    query: any;
  }>({
    param: "dashboard",
    query: null,
  });

  const [alarmSound, setAlarmSound] = useState<boolean>(false);
  const [digInfoAction, setDigInfoAction] = useState<boolean>(false);
  const [accessListAction, setAccessListAction] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState(null);
  const [screenState, setScreenState] = useState<string>("normal");

  const socketHandleID = useRef<number | null>(null);

  useLayoutEffect(() => {
    dispatch(getSites());
    dispatch(receiveMonitor(123));
  }, []);

  useLayoutEffect(() => {
    // if (!storage?.get("user")) navigate("/amons/signin");
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    console.log("qyue-->", query);
    setQuery(query);

    let _currUrl: string;
    if (
      type === "monitor" ||
      type === "account" ||
      type === "dashboard" ||
      type === "network"
    ) {
      _currUrl = type;
    } else if (menu) {
      _currUrl = menu;
    } else if (field) {
      _currUrl = field;
    } else {
      _currUrl = "";
    }
    if (type === "monitor" || type === "dashboard" || type === "network") {
      setCallSideMenu(false);
    } else {
      setCallSideMenu(true);
    }
    setActiveMenu({
      param: _currUrl,
      query: type === "dashboard" ? query?.area : null,
    });
  }, [type, field, menu, location.search]);

  const setContainerRender = (type: string | undefined) => {
    switch (type) {
      // case 'monitor':
      //   return MonitorContainer;
      // case 'dashboard':
      //   return DashboardContainer;
      // case 'network':
      //   return NetworkContainer;
      default:
        return Outlet;
    }
  };

  const alarmSoundOff = () => {
    setAlarmSound(false);
  };

  const onOpenDigTable = () => {
    setDigInfoAction(!digInfoAction);
  };

  const onOpenAccessTable = () => {
    setAccessListAction(!accessListAction);
  };

  const onLogout = () => {
    storage.remove("user");
    // dispatch(logOutAsync());
    navigate(`/amons/signin`);
  };

  const callSideMenuHandler = useCallback(() => {
    console.log("callSideMenuHandler");
    setCallSideMenu(!callSideMenu);
  }, [callSideMenu]);

  const handleTableClose = (e: any) => {
    const targetElement = e.target;
    const tableButton = e.target.closest(".button-box");
    const digTablePanel = e.target.closest(".dig-table-component");
    const accessTablePanel = e.target.closest(".access-list-container");
    if (
      digInfoAction &&
      targetElement &&
      !tableButton &&
      !digTablePanel &&
      !accessTablePanel
    ) {
      setDigInfoAction(false);
    }
    if (
      accessListAction &&
      targetElement &&
      !tableButton &&
      !accessTablePanel &&
      !digTablePanel
    ) {
      setAccessListAction(false);
    }
  };

  return (
    <HomeCmpt className="home-container">
      <div className="header-container">
        <Header
          // query={query}
          type={type}
          //   gasAlarmPanel={gasAlarmPanel}
          //   alarmPanel={alarmPanel}
          alarmSound={alarmSound}
          alarmSoundOff={alarmSoundOff}
          digInfoAction={digInfoAction}
          onOpenDigTable={onOpenDigTable}
          accessListAction={accessListAction}
          onOpenAccessTable={onOpenAccessTable}
          screenState={screenState}
          onLogout={onLogout}
          activeMenu={activeMenu}
          callSideMenuHandler={callSideMenuHandler}
          ttsAction={sitesData?.[0]?.tts_action}
        />
      </div>
      <div className={`body-container`}>
        <Sidebar.Pushable
          id={`${activeMenu?.param}`}
          className={`${activeMenu?.param}`}
        >
          {sitesData && sitesData?.length > 0 && (
            <SideMenu
              callSideMenu={callSideMenu}
              activeMenu={activeMenu}
              userInfo={{
                login_date: "2023-08-24 11:39:31.497",
                created_date: "2023-08-18 15:01:22.000",
                acc_id: 1,
                acc_name: "오픈웍스",
                acc_user_id: "admin",
                acc_phone: "02-495-1801",
                acc_tel: null,
                acc_mail: "024951801@naver.com",
                acc_role: 0,
              }}
              siteItem={sitesData[0]}
            />
          )}
          <Sidebar.Pusher
            as={setContainerRender(type)}
            digInfoAction={digInfoAction}
            userInfo={userInfo}
            accessListAction={accessListAction}
            context={{ activeMenu }}
            handleTableClose={handleTableClose}
            // alarmPanel={alarmPanel}
            // gasAlarmPanel={gasAlarmPanel}
          />
        </Sidebar.Pushable>
      </div>
    </HomeCmpt>
  );
}

export default HomeContainer;
