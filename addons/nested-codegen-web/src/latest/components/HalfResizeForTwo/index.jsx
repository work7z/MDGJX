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
  let resizekey = props.resizekey;
  let { heightValue, onHeightValue } = props;
  if (!_.isNil(resizekey)) {
    heightValue = gstore.localSettings[resizekey];
    onHeightValue = (val) => {
      console.log("chaging the field value", val, resizekey);
      gstore.localSettings[resizekey] = val;
    };
  }
  let theheight = heightValue;
  let rawheight = theheight;
  if (_.isNil(theheight)) {
    theheight = "20px";
  }
  const [crtContainerHeight, onCrtContainerHeight] = useState(0);
  const [myboxid] = useState(_.uniqueId("ok"));
  let resizeHeightIfHas = ($rootEle, isForce = false) => {
    $rootEle.children().hide();
    let totalHeight = $rootEle.outerHeight(true);
    if (totalHeight == 0) {
      totalHeight = $rootEle.parent().outerHeight(true);
    }
    onCrtContainerHeight(totalHeight);
    // debugger;
    if (_.isNil(rawheight) || isForce) {
      let shouldValue = props.defaultPercent * totalHeight;
      onHeightValue(shouldValue + "px");
    }
    $rootEle.children().show();
  };
  useEffect(() => {
    gutils.resizeTriggerArr[myboxid] = () => {
      resizeHeightIfHas($("#" + myboxid), true);
    };
    gutils.anyResizeTriggerArr[myboxid] = () => {
      resizeHeightIfHas($("#" + myboxid), true);
    };
    gutils.defer(() => {
      resizeHeightIfHas($("#" + myboxid), true);
    });
    return () => {
      delete gutils.anyResizeTriggerArr[myboxid];
    };
  }, [myboxid]);
  if (props.isTopHide) {
    theheight = 0;
  }
  if (props.isBtmHide) {
    theheight = "100%";
    if (props.isTopHide) {
      theheight = 0;
    }
  }
  return (
    <div
      id={myboxid}
      ref={(e) => {
        if (e) {
          resizeHeightIfHas($(e));
        }
      }}
      className={props.containerClz + " halfresize-container"}
    >
      <Resizable
        {...gutils.allResizeProps()}
        enable={
          props.disableResize || _.isNil(props.btmJsx)
            ? gutils.enableResize()
            : _.merge(gutils.enableResize(), {
                bottom: true,
              })
        }
        style={{
          height: theheight,
        }}
        className={props.topClz + " halfresize-top-box"}
        size={{
          width: "100%",
          height: theheight,
        }}
        onResizeStop={(event, direct, refToEle, delta) => {
          onHeightValue(refToEle.style.height);
          gutils.defer(() => {
            // gutils.callWhenResize();
            gutils.callWhenResizeInternal();
          });
        }}
      >
        {_.isFunction(props.topJsx)
          ? React.createElement(props.topJsx, {})
          : props.topJsx}
      </Resizable>
      <div
        className={
          props.btmClz +
          " halfresize-btm-box " +
          (props.needBorderBetween ? " havebordertop " : "")
        }
        style={{
          display: props.disableResize || _.isNil(props.btmJsx) ? "none" : null,
          height: `calc(${crtContainerHeight}px - ${theheight} - 1px)`,
          maxHeight: `calc(${crtContainerHeight}px - ${theheight} - 1px)`,
          overflow: "auto",
          // borderTop: props.disableResize
          //   ? ""
          //   : "border-btm 1px solid var(--app-bg-border-e3e3e2)",
        }}
      >
        {_.isFunction(props.btmJsx)
          ? React.createElement(props.btmJsx, {})
          : props.btmJsx}
      </div>
    </div>
  );
});
