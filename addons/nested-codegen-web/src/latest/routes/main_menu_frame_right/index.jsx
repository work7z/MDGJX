import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  Radio,
  PanelStack2,
  ButtonGroup,
  TextArea,
  Intent,
  Position,
  Toaster,
  Checkbox,
  NumericInput,
  FormGroup,
  Breadcrumbs,
  HTMLSelect,
  ControlGroup,
  InputGroup,
  Navbar,
  NavbarHeading,
  NonIdealState,
  NavbarDivider,
  Boundary,
  NavbarGroup,
  Alignment,
  Classes,
  Icon,
  Card,
  Elevation,
  Button,
} from "@blueprintjs/core";
import { Example,  } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React from "react";
import ReactDOM from "react-dom";
import gutils from "../../utils";
import { useState } from "react";

import { Provider, observer, inject ,useLocalStore} from "mobx-react";
// var createHistory = require("history").createBrowserHistory;
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams,
  Redirect,
} from "react-router-dom";
import { autorun, observable }  from 'mobx';
import gstore from "../../store.jsx";
import "./index.less";
import _ from "lodash";
import StaticServerAdded from "../static_server_added/index.jsx";
import StaticServerView from "../static_server_view/index.jsx";
import ProxyServerAdded from "../proxy_server_added/index.jsx";
import ProxyServerView from "../proxy_server_view/index.jsx";
import Database_connections from "../dblink_global_view";
import TextCompare from "../../components/TextCompare";
import TextSearch from "../../components/TextSearch";
import Home from "../../components/Home";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import BeautifyHtml from "../../components/BeautifyHtml";
import BeautifyXml from "../../components/BeautifyXml";
import BeautifyGraphql from "../../components/BeautifyGraphql";
import BeautifyOtherCommon from "../../components/BeautifyOtherCommon";
import XMLOtherCommon from "../../components/XMLOtherCommon";
import JSONOtherCommon from "../../components/JsonOtherCommon";
import TransOtherCommon from "../../components/TransOtherCommon";
import CodecOtherCommon from "../../components/CodecOtherCommon";
import NotesSnippet from "../../components/NotesSnippet";
import NotesClipboard from "../../components/NotesClipboard";
import TimeLogicPage from "../../components/TimeLogicPage";
import RandomLogicPage from "../../components/RandomLogicPage";
import CaseLogicPage from "../../components/CaseLogicPage";
import GenLogicPage from "../../components/GenLogicPage";
import DeskTopView from "../DeskTopView";
import PluginLoadView from "../PluginLoadView";
import HandlerClz from "../WrapError";
import TokenPatch from "../TokenPatch";
import GTabs from "../../components/GTabs";
import MultiTabWrapper from "./SysMultiTabWrapper";
import NoDataPage from "../../NoDataPage";
import HomeNavigator from "../../components/HomeNavigator";

window.PluginLoadView = PluginLoadView;

const MyRootContent = () => {
  let hist = useHistory();

  let allRoutesArr = [
    {
      path: "/exts/:id",
      cpt: PluginLoadView,
    },
    {
      path: "/dashboard/extension",
      cpt: PluginLoadView,
    },
    {
      path: "/text/text_search",
      cpt: TextSearch,
    },
    {
      path: "/text/text_compare",
      cpt: TextCompare,
    },
    {
      path: "/text/beautify_html",
      cpt: BeautifyHtml,
    },
    {
      path: "/text/beautify_xml",
      cpt: BeautifyXml,
    },
    {
      path: "/text/beautify_graphql",
      cpt: BeautifyGraphql,
    },
    {
      path: "/server/static/added",
      cpt: StaticServerAdded,
    },
    {
      path: "/server/static/view",
      cpt: StaticServerView,
    },
    {
      path: "/server/proxy/added",
      cpt: ProxyServerAdded,
    },
    {
      path: "/dashboard/home",
      cpt: HomeNavigator,
    },
    {
      path: "/",
      cpt: HomeNavigator,
    },
    {
      path: "/server/proxy/view",
      cpt: ProxyServerView,
    },
    {
      path: "/database/connections",
      cpt: Database_connections,
    },
    ..._.map(
      _.filter(gstore.otherParserConfigList, (x) => x.group == "beautify"),
      (x, d, n) => {
        return {
          cpt: (props) => <BeautifyOtherCommon {...props} myconfig={x} />,
          path: "/text/" + x.path,
        };
      }
    ),
    ..._.map(
      _.filter(gstore.otherParserConfigList, (x) => x.group == "beautify"),
      (x, d, n) => {
        return {
          cpt: (props) => <BeautifyOtherCommon {...props} myconfig={x} />,
          path: "/text/" + x.path,
        };
      }
    ),
    ..._.map(
      _.filter(gstore.otherParserConfigList, (x) => x.group == "xml"),
      (x, d, n) => {
        return {
          path: "/text/" + x.path,
          cpt: (props) => {
            return <XMLOtherCommon {...props} myconfig={x} />;
            // return <BeautifyOtherCommon myconfig={x} />
          },
        };
      }
    ),
    ..._.map(
      _.filter(gstore.otherParserConfigList, (x) => x.group == "json"),
      (x, d, n) => {
        return {
          path: "/text/" + x.path,
          cpt: (props) => {
            return <JSONOtherCommon {...props} myconfig={x} />;
            // return <BeautifyOtherCommon myconfig={x} />
          },
        };
      }
    ),
    ..._.map(
      _.filter(gstore.otherParserConfigList, (x) => x.group == "trans"),
      (x, d, n) => {
        return {
          path: "/trans/" + x.path,
          cpt: (props) => {
            return <TransOtherCommon {...props} myconfig={x} />;
            // return <BeautifyOtherCommon myconfig={x} />
          },
        };
      }
    ),
    ..._.map(
      _.filter(
        gstore.otherParserConfigList,
        (x) =>
          x.group == "encode" || x.group == "encrypt" || x.group == "escape"
      ),
      (x, d, n) => {
        return {
          path: "/codec/" + x.path,
          cpt: (props) => {
            return <CodecOtherCommon {...props} myconfig={x} />;
            // return <BeautifyOtherCommon myconfig={x} />
          },
        };
      }
    ),
    ..._.map(
      _.filter(gstore.otherParserConfigList, (x) => x.group == "notes"),
      (x, d, n) => {
        let thepath = "/notes/" + x.path;
        console.log("other-parse", x, d, x.tableId, x.path, thepath);
        return {
          path: thepath,
          cpt: (props) => {
            return <NotesSnippet {...props} myconfig={x} />;
            // if (x.path == "notes_snippet") {
            // } else {
            // return <NotesClipboard {...props} myconfig={x} />;
            // }
          },
        };
      }
    ),
    ..._.map(
      _.filter(gstore.otherParserConfigList, (x) => x.group == "time"),
      (x, d, n) => {
        let thepath = "/time/" + x.path;
        return {
          path: thepath,
          cpt: (props) => {
            return (
              <TimeLogicPage
                crtStoreName={x.storeName}
                {...props}
                myconfig={x}
              />
            );
          },
        };
      }
    ),
    ..._.map(
      _.filter(gstore.otherParserConfigList, (x) => x.group == "random"),
      (x, d, n) => {
        let thepath = "/random/" + x.path;
        return {
          path: thepath,
          cpt: (props) => {
            return (
              <RandomLogicPage
                crtStoreName={x.storeName}
                {...props}
                myconfig={x}
              />
            );
          },
        };
      }
    ),
    ..._.map(
      _.filter(gstore.otherParserConfigList, (x) => x.group == "gen"),
      (x, d, n) => {
        let thepath = "/gen/" + x.path;
        return {
          path: thepath,
          cpt: (props) => {
            return (
              <GenLogicPage
                crtStoreName={x.storeName}
                {...props}
                myconfig={x}
              />
            );
          },
        };
      }
    ),
    ..._.map(
      _.filter(gstore.otherParserConfigList, (x) => x.group == "case"),
      (x, d, n) => {
        let thepath = "/case/" + x.path;
        return {
          path: thepath,
          cpt: (props) => {
            return (
              <CaseLogicPage
                crtStoreName={x.storeName}
                {...props}
                myconfig={x}
              />
            );
          },
        };
      }
    ),
  ];

  let switch_definition = (
    <Switch>
      {_.chain(allRoutesArr)
        .map((x) => {
          return (
            <Route key={x.path} exact path={x.path} component={x.cpt}></Route>
          );
        })
        .value()}
      {/* <Route path="*" component={NoDataPage}></Route> */}
      <Redirect path="*" to="/"></Redirect>
    </Switch>
  );

  window.allRoutesArr = allRoutesArr;
  if (gstore.localSettings.using_desktop_mode) {
    switch_definition = (
      <DeskTopView allRoutesArr={allRoutesArr} routes={switch_definition} />
    );
  }
  //   <div
  //   className="main-frame-right-bread-wrapper"
  //   style={{
  //     // display: gstore.localSettings.hasTopSubNav ? null : "none",
  //     display: "none",
  //   }}
  // >
  //   <Breadcrumbs items={gstore.sysinfo.breadmenu || []} />
  // </div>
  const innterJSX = (
    <div
      className={"main-frame-right-card-wrapper "}
      data-path={hist.location.pathname || "none"}
    >
      {switch_definition}
      {/* <HandlerClz nochk={true}></HandlerClz> */}
    </div>
  );
  const ParentRoot = (props) => {
    return (
      <div
        className={
          "main-frame-right-box" + " "
          // "g-mix-" +
          // myheightval
        }
        style={{
          // width: `calc(100vw - ${gutils.frame_defaultWidth})`,
          width:'100vw',
          height:'100vh'
        }}
      >
        {props.children}
      </div>
    );
  };
    return <ParentRoot>{innterJSX}</ParentRoot>;

  if (gstore.localSettings.using_desktop_mode) {
    return <ParentRoot>{innterJSX}</ParentRoot>;
  }
  let heightVal =
    gstore.localSettings.appTypeView == "no-nav"
      ? "calc(100vh - 35px)"
      : gstore.localSettings.app_multiple_tab_mode
      ? "auto!important"
      : `calc(100% - 35px)`;
  let t_style = {};
  let m_hist = useHistory();
  if (gstore.localSettings.app_multiple_tab_mode) {
    //
    // let thatHeight = "730" + "px"; // for fixed application
    let thatHeight = "100%"; // for linux page
    _.merge(t_style, {
      // zIndex: 2,
      backgroundColor: "var(--app-bg-white)",
      width: "1160px",
      height: thatHeight,
      // maxHeight: thatHeight == "auto" ? "none" : thatHeight,
      margin: "50px auto",
    });
    let isHome =
      gstore.sysinfo.latestRoutePath == "/" ||
      gstore.sysinfo.latestRoutePath == "/home" ||
      (m_hist &&
        m_hist.location &&
        m_hist.location.pathname &&
        (m_hist.location.pathname.indexOf("/home") != -1 ||
          m_hist.location.pathname == "" ||
          m_hist.location.pathname == "/"));
    if (!isHome) {
      isHome =
        gstore.sysinfo.latestRoutePath == "" ||
        gstore.sysinfo.latestRoutePath == "/" ||
        gstore.sysinfo.latestRoutePath == "/home";
    }
    console.log(`IsHome`, isHome);
    if (
      isHome
      // (gstore.sysinfo.latestRoutePath || "").indexOf("/home") != -1
    ) {
      // delete t_style["maxHeight"];
      t_style["maxHeight"] = "auto";
      // t_style["clear"] = "both";
      // t_style["overflow"] = "auto";
      // do nothing here
    } else {
      _.merge(t_style, {
        minHeight: thatHeight,
      });
    }
  } else {
    _.merge(t_style, {
      width: "100%",
      height: heightVal,
      maxHeight: heightVal,
    });
  }
  let innerTabContent = (
    <div
      className={
        gstore.localSettings.app_multiple_tab_mode
          ? "main_menu_frame_multi_tab_wrapper"
          : ""
      }
      style={t_style}
    >
      {innterJSX}
    </div>
  );
  if (gstore.localSettings.appTypeView == "no-nav") {
    return innerTabContent;
  }
  if (gstore.localSettings.app_multiple_tab_mode) {
    return <MultiTabWrapper>{innerTabContent}</MultiTabWrapper>;
  }
  return (
    <ParentRoot>
      <GTabs
        tabClz="menu-frame-tabs"
        borderBottom={true}
        borderTop={false}
        noOptBtn={false}
        init_config={gstore.localSettings.gloabl_menu_tabs_init_config}
        // needTranslateEachLabelName={true}
        obj={gstore.localSettings.global_menu_tabs_obj}
        renderTabPane={(x, d, n) => {
          return innerTabContent;
        }}
        onChangeTab={(e) => {
          gutils.hist.push(e);
        }}
      />
    </ParentRoot>
  );
};

export default inject((all_store) => {
  console.log("all_store", all_store);
  return {
    desktop_mode: gstore.localSettings.using_desktop_mode,
    b_mode: gstore.localSettings.app_multiple_tab_mode,
    c: gstore.localSettings.app_sys_app_view_height,
    d: gstore.sysinfo.latestRoutePath,
  };
})(MyRootContent);
