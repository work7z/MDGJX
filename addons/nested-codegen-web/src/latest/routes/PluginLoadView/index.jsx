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
  ButtonGroup,
  TextArea,
  Intent,
  Position,
  Toaster,
  Checkbox,
  NumericInput,
  FormGroup,
  HTMLSelect,
  ControlGroup,
  InputGroup,
  Navbar,
  NavbarHeading,
  NonIdealState,
  NavbarDivider,
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
} from "react-router-dom";
import { autorun, observable }  from 'mobx';
import gstore from "../../store.jsx";
import "./index.less";
import { useEffect } from "react";
import LoadingShortPanel from "../../components/LoadingShortPanel";
import Blink from "../../components/Blink";
import _ from "lodash";
import moment from "moment";
import constants from "../../constants";
import Qs from "querystring";
import ReloadPageLogic from "../../components/ReloadPageLogic";
window.React = React;
window.ReactDOM = ReactDOM;

function collectErrors(e, arr) {
  if (window.errorGot) {
    window.errorGot = false;
  }
  if (e == null || e == undefined) {
    e = {
      message: "Unknown Error",
    };
  }
  let crt_store = {
    message: arr,
  };
  crt_store.message.push(gutils.getErrMsg(e));
  // crt_store.message.push(`-----------------------------------`);
  // crt_store.message.push(`Error Occurred: ` + gutils.getErrMsg(e));
  // crt_store.message.push(`-----------------------------------`);
  // crt_store.message.push(`****** ${t("ERROR TOOLTIP")} ******`);
  // crt_store.message.push(
  //   `Report Time: ` + moment().format("YYYY-MM-DD HH:mm:ss")
  // );
  // crt_store.message.push(
  //   t(
  //     `The error occurred was caused by unknown reason, please try to fix it by the following approaches: `
  //   )
  // );
  // crt_store.message.push(
  //   `1. ` +
  //     t(
  //       `Reinstate the extension to the previous version, or just uninstall it if could be.`
  //     )
  // );
  // crt_store.message.push(
  //   `2. ` +
  //     t(
  //       `If you are using the older version of CodeGen, please upgrade it to the latest one and try it again.`
  //     )
  // );
  // crt_store.message.push(
  //   `3. ` +
  //     t(
  //       `Some extensions require the Internet to download related dependencies, please make sure if your network is working normally at present.`
  //     )
  // );
  // crt_store.message.push(
  //   `4. ` +
  //     t(
  //       `If you still receive this message, please feel free to contact us via Github Issue or E-Mail work7z@outlook.com`
  //     )
  // );
  // crt_store.message.push(`****** ${t("ERROR TOOLTIP")} ******`);
  // crt_store.message.push(`-----------------------------------`);
  window.reload_page = () => {
    location.reload();
  };
  // crt_store.message.push(
  //   `` +
  //     t(
  //       `Or you can click {0} to re-trigger the initializing operation`,
  //       `<a onclick="javascript:location.reload()">here</a>`
  //     )
  // );
  // crt_store.message.push(`-----------------------------------`);
  console.log(e);
}
window.collectErrors = collectErrors;

window.getCrtStoreInfoByPluginId = (id) => {
  let crtStoreName_underline = "ext_" + id.replace(/\W/g, "");
  let crtStoreName = "ext" + _.upperFirst(id.replace(/\W/g, ""));
  return {
    crtStoreName_underline,
    crtStoreName,
  };
};
let MyContext = React.createContext({
  pop: false,
  n: 100,
});
window.MyContext = MyContext;

const EachPluginConsistView = observer((props) => {
  let pop = props.pop;
  let { crtStoreName_underline, crtStoreName } =
    window.getCrtStoreInfoByPluginId(props.id);
  const ext_init_crt_store = gstore.ext.init[props.id];
  window.refresh_now_plugin = () => {
    gutils.api.ext.initSinglePlugins(props.id);
  };
  let [val, onVal] = useState(1);
  // p_mode() &&
  if (_.isNil(window["info_" + props.id])) {
    gutils.once(`run-init-${props.id}`, async () => {
      await gutils.api.ext.initSinglePlugins(props.id);
      window.updateAndCall();
      onVal(val + 1);
    });
  }
  window.abcd = val;
  if (_.isNil(ext_init_crt_store) || _.isNil(props.id)) {
    return (
      <div style={{ padding: "10px" }}>
        plugins {props.id || "N/A"} is loading
        <Blink />
      </div>
    );
  }
  if (ext_init_crt_store.err_obj) {
    throw ext_init_crt_store.err_obj;
  }
  let sysStore = gstore.common_app["ext" + props.id];
  let sysModel = _.get(sysStore, "model");

  if (_.isEmpty(sysModel) && _.isNil(ext_init_crt_store.fn_sync_common_store)) {
    try {
      let extObject2 = gutils.readDefinition(
        window.ExtensionDefinition[props.id],
        props.id
      );
      if (extObject2.hideThisPage == true) {
        <div className="wp-fixed-plugin-load-view" style={{ padding: "10px" }}>
          <div>
            <h3>Sorry... {t(`This extension is still evolving...`)}</h3>
          </div>
        </div>;
      }
    } catch (e) {
      console.log("err", e);
    }
    return (
      <div className="wp-fixed-plugin-load-view" style={{ padding: "10px" }}>
        Initializing the model for plugins {props.id || "N/A"}
        <Blink />
      </div>
    );
  }

  // else {
  //   if (_.isNil(window["init-model-" + props.id])) {
  //     window["init-model-" + props.id] = _.cloneDeep(sysModel);
  //   }
  // }
  if (
    // true ||
    // ext_init_crt_store.loading ||
    ext_init_crt_store.got_err == true
  ) {
    window.t10000 = ext_init_crt_store;
    return (
      <ReloadPageLogic errMsg={_.join(ext_init_crt_store.message, "\n")} />
    );
    // return (
    //   <div className="sys-card-wrapper wp-fixed-plugin-load-view">
    //     <Card style={{ overflow: "auto", padding: "10px" }}>
    //       <div
    //         className="consoletext"
    //         style={{
    //           fontSize: "12",
    //           fontFamily: "monospace",
    //           // display: "flex",
    //           // justifyContent: "flex-start",
    //           // alignItems: "flex-end",
    //         }}
    //       >
    //         {ext_init_crt_store.got_err ? (
    //           <div>{t(`An Error Occurred Just Now.`)}</div>
    //         ) : (
    //           ""
    //         )}
    //         {_.map(ext_init_crt_store.message, (x, d, n) => {
    //           return (
    //             <div dangerouslySetInnerHTML={{ __html: x }} key={d}></div>
    //           );
    //         })}
    //       </div>
    //     </Card>
    //   </div>
    // );
  }
  let extObject = gutils.readDefinition(
    window.ExtensionDefinition[props.id],
    props.id
  );
  console.log("extObject rendering", props.id, extObject);
  let CrtRender = extObject.render;
  if (extObject.notReady) {
    return (
      <div style={{ padding: "15px" }} className="wp-fixed-plugin-load-view">
        <h1>{t(`This extension is being delivered, it's almost done.`)}</h1>
        <p>
          {t(`Extension ID: `)}
          {crtStoreName}
        </p>
        <p>
          {t(`This extension is still evolving...`)}
          {t(
            `We are convinced that it will be released at version {0}, please kindly stay tuned.`,
            extObject.willReadyVersion
          )}
        </p>
      </div>
    );
  }
  let unlimited_view_mode = _.get(extObject, "unlimited_view_mode");
  if (_.isNil(gstore.sysinfo.unlimited_app_obj[crtStoreName])) {
    gstore.sysinfo.unlimited_app_obj[crtStoreName] = unlimited_view_mode;
  }
  return (
    <CrtRender
      pop={props.pop}
      params={props.params || {}}
      myconfig={{
        pop: props.pop,
        storeName: crtStoreName,
      }}
      crtStoreName={crtStoreName}
      crtStoreName_underline={crtStoreName_underline}
      {...gutils.getPluginRender({
        id: props.id,
      })}
    />
  );
});
window.tried_times = 0;
class HandlerClz extends React.Component {
  state = {
    isErr: false,
    message: [],
  };
  render() {
    if (this.state.isErr) {
      setTimeout(() => {
        window.tried_times++;
        if (window.tried_times < 5) {
          this.setState({
            isErr: false,
          });
        }
      }, 800);
      return <ReloadPageLogic errMsg={_.join(this.state.message, "\n")} />;
      return (
        <div className="sys-card-wrapper">
          <Card style={{ overflow: "auto", padding: "10px" }}>
            <div
              className="consoletext"
              dangerouslySetInnerHTML={{
                __html: _.join(
                  _.map(this.state.message, (x) => "<div>" + x + "</div>"),
                  " "
                ),
              }}
            ></div>
          </Card>
        </div>
      );
    }
    return this.props.children;
  }

  static getDerivedStateFromError(error) {
    console.log("got error", error);
    let tmparr = [];
    collectErrors(error, tmparr);
    return { isErr: true, message: tmparr };
  }

  componentDidCatch() {
    this.setState({
      isErr: true,
    });
  }
}

export { HandlerClz };

export default observer((xx_props) => {
  const [m, onM] = useState(1);
  if (_.isNil(window.gutils)) {
    setTimeout(() => {
      onM(m + 1);
    }, 300);
    return <div>handling...</div>;
  }
  window.plugin_xx_props = xx_props;
  let viewId = gstore.localSettings.extIndex || "";
  let hist = useHistory();
  let otherObject = { ...xx_props };
  if (_.get(hist, "location.search")) {
    _.merge(
      otherObject,
      Qs.parse(_.trim((hist.location.search || "").replace("?", ""))) || {}
    );
  }
  window.test_hist = hist;
  if ("/dashboard/extension" != hist.location.pathname) {
    let chkObj = Qs.parse(_.trim(hist.location.search.replace("?", ""))) || {};
    let viewPathId = hist.location.pathname.replace("/exts/", "");
    if (viewPathId) {
      chkObj.id = viewPathId;
    }
    let crtId = chkObj.id;
    _.merge(otherObject, otherObject);
    viewId = crtId;
  }
  if (xx_props && xx_props.id) {
    viewId = xx_props.id;
  }

  return (
    <MyContext.Provider value={{ pop: xx_props.pop }}>
      <HandlerClz>
        <EachPluginConsistView
          params={otherObject || {}}
          {...otherObject}
          id={viewId}
          pop={xx_props.pop}
        />
      </HandlerClz>
    </MyContext.Provider>
  );
  // <div className="sys-card-wrapper">
  //   <Card style={{ overflow: "auto",padding: '10px' }}>
  //   </Card>
  // </div>
});
// hist.location.search
