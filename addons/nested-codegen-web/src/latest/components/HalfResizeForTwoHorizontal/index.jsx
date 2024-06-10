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

export default observer((props) => {
  let thewidth = props.value;
  let rawwidth = thewidth;
  if (_.isNil(thewidth)) {
    if (props.defaultLeftWidthValue) {
      thewidth = props.defaultLeftWidthValue + "px";
    } else {
      thewidth = "20px";
    }
  }
  const [myboxid] = useState(_.uniqueId("okx"));
  let resizeHeightIfHas = ($rootEle, isForce = false) => {
    if (props.noAutoResize) {
      return;
    }
    if (_.isNil(rawwidth) || isForce) {
      $rootEle.children().hide();
      let totalWidth = $rootEle.outerWidth(true);
      let shouldValue = null;
      if (props.percentRightWidth) {
        shouldValue = totalWidth - parseInt(props.percentRightWidth);
      } else if (props.defaultLeftWidthValue) {
        shouldValue = props.defaultLeftWidthValue;
      } else {
        shouldValue = props.defaultPercent * totalWidth;
      }
      props.onChg(shouldValue + "px");
      $rootEle.children().show();
    }
  };
  useEffect(() => {
    gutils.anyResizeTriggerArr[myboxid] = () => {
      resizeHeightIfHas($("#" + myboxid), true);
    };
    return () => {
      delete gutils.anyResizeTriggerArr[myboxid];
    };
  }, [myboxid]);
  let isLeftAllHide = props.isLeftAllHide;
  if (isLeftAllHide) {
    thewidth = "0px";
  }
  return (
    <div
      id={myboxid}
      ref={(e) => {
        if (e) {
          resizeHeightIfHas($(e));
        }
      }}
      className={props.containerClz + " halfresize-hori-container"}
    >
      <Resizable
        {...gutils.allResizeProps()}
        enable={
          props.disableResize
            ? false
            : _.merge(gutils.enableResize(), {
                right: true,
              })
        }
        style={{
          // display: isLeftAllHide ? "none" : null,
          width: thewidth,
          height: "100%",
          overflowX: props.noLeftScroll == true ? "hidden!important" : null,
          ...(props.leftStyle || {}),
        }}
        className={props.leftClz + " halfresize-hori-left-box"}
        size={{
          height: "100%",
          width: thewidth,
        }}
        onResizeStop={(event, direct, refToEle, delta) => {
          props.onChg(refToEle.style.width);
          gutils.defer(() => {
            // gutils.callWhenResize();
            gutils.callWhenResizeInternal();
          });
        }}
      >
        {_.isNil(props.leftJsx)
          ? ""
          : _.isFunction(props.leftJsx)
          ? React.createElement(props.leftJsx)
          : props.leftJsx}
      </Resizable>
      <div
        className={props.rightClz + " halfresize-hori-right-box"}
        style={{
          width: `calc(100% - ${thewidth})`,
          maxWidth: `calc(100% - ${thewidth})`,
          height: "100%",
          overflow: "auto",
          ...(props.rightStyle || {}),
        }}
      >
        {_.isNil(props.rightJsx)
          ? ""
          : _.isFunction(props.rightJsx)
          ? React.createElement(props.rightJsx)
          : props.rightJsx}
      </div>
    </div>
  );
});
