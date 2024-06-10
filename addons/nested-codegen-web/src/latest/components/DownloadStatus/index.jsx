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
  ContextMenu,
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
  Tree,
  Icon,
  Card,
  Elevation,
  Button,
  PanelStack2,
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
import { useState, useEffect } from "react";

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
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import Blink from "../Blink";

export default observer((props) => {
  const { uid } = props;
  if (_.isNil(uid)) {
    return "";
  }
  window.latestDownloadStatus = uid;
  // const [crtState, onState] = useState({
  //   status: "prepare",
  //   currentSize: 0,
  //   totalSize: 0,
  // });
  const crtState = props.obj;
  if (_.isNil(crtState)) {
    return "";
  }
  const label = {
    prepare: ["Preparing for downloading the " + props.label, "none"],
    init: ["Initializing related configs", "none"],
    started: ["Start downloading the " + props.label, "primary"],
    verify: ["Downloaded. Verifying the file", "success"],
    done: ["Downloaded and verified file successfully", "success"],
    error: ["Error: " + _.get(crtState, "errMsg"), "danger"],
  };
  // useEffect(() => {
  //   const flagObj = {
  //     continue: true,
  //   };
  //   gutils.defer(() => {
  //     (async function () {
  //       while (true) {
  //         if (
  //           !flagObj.continue ||
  //           uid != window.latestDownloadStatus ||
  //           (crtState != null &&
  //             (crtState.status == "done" || crtState.status == "error"))
  //         ) {
  //           break;
  //         }
  //         let crtStatusRes = await gutils.opt("/infra/get-download-status", {
  //           UID: uid,
  //         });
  //         let ctn = crtStatusRes.content;
  //         if (_.isNil(ctn)) {
  //           onState(null);
  //           break;
  //         }
  //         // // console.log("get downloading status", crtStatusRes);
  //         onState(ctn);
  //         await gutils.sleep(500);
  //       }
  //     })();
  //   });
  //   return () => {
  //     flagObj.continue = false;
  //   };
  // }, []);
  // // console.log("got new state", crtState);
  let intentType = label[crtState.status][1];
  let rateval = crtState.currentSize / crtState.totalSize;
  return (
    <Callout
      intent={intentType}
      icon="cloud-download"
      style={{
        margin: "12px 0px",
      }}
    >
      <h4 class="bp3-heading">
        {label[crtState.status][0]}
        {crtState.status != "error" && crtState.status != "done" ? (
          <Blink />
        ) : (
          ""
        )}
      </h4>
      <p>
        {props.desc}.{" "}
        {crtState.status == "error" ? (
          <a
            onClick={() => {
              if (props.retry) {
                props.retry();
              }
            }}
          >
            Retry
          </a>
        ) : (
          ""
        )}
      </p>
      <p>
        Status: [{parseInt(crtState.currentSize / 1024)}KB/
        {parseInt(crtState.totalSize / 1024)}KB][{crtState.desc}]
      </p>
      <ProgressBar
        stripes={
          crtState.status == "done" || crtState.status == "error" ? false : true
        }
        intent={intentType}
        value={rateval}
      />
    </Callout>
  );
});
