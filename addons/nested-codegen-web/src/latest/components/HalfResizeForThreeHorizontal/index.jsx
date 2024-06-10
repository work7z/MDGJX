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
  // for left mid
  let value = gstore.localSettings[props.resizekey];
  let onChg = (val) => {
    gstore.localSettings[props.resizekey] = val;
  };
  let thewidth = value;
  let rawwidth = thewidth;
  if (_.isNil(thewidth)) {
    thewidth = "20px";
  }
  const [myboxid] = useState(_.uniqueId("okx"));
  let resizeHeightIfHas = ($rootEle, isForce = false) => {
    if (props.noAutoResize) {
      return;
    }
    if (_.isNil(rawwidth) || isForce) {
      $rootEle.children().hide();
      let totalWidth = $rootEle.outerWidth(true);
      let shouldValue = _.isFunction(props.leftMidPercent)
        ? props.leftMidPercent(totalWidth, {
            boxEle: $("#" + myboxid),
          })
        : props.leftMidPercent * totalWidth;
      onChg(shouldValue + "px");
      $rootEle.children().show();
    }
  };
  useEffect(() => {
    gutils.anyResizeTriggerArr[myboxid] = () => {
      resizeHeightIfHas($("#" + myboxid), true);
    };
    resizeHeightIfHas($("#" + myboxid), true);
    return () => {
      delete gutils.anyResizeTriggerArr[myboxid];
    };
  }, [myboxid]);

  // for mid right
  let resizekey_for_midright = props.resizekey + "midright";
  let valueForMidRight = gstore.localSettings[resizekey_for_midright];
  let onChgForMidRight = (val) => {
    gstore.localSettings[resizekey_for_midright] = val;
  };
  let thewidth_for_midright = valueForMidRight;
  let rawwidth_for_midright = valueForMidRight;
  if (_.isNil(thewidth_for_midright)) {
    thewidth_for_midright = "20px";
  }
  const [myboxid_for_midright] = useState(_.uniqueId("okx"));
  let resizeHeightIfHas_for_midright = ($rootEle, isForce = false) => {
    if (props.noAutoResize) {
      return;
    }
    if (_.isNil(rawwidth_for_midright) || isForce) {
      $rootEle.children().hide();
      let totalWidth = $rootEle.outerWidth(true);
      let shouldValue = _.isFunction(props.midRightPercent)
        ? props.midRightPercent(totalWidth, {
            boxEle: $("#" + myboxid_for_midright),
          })
        : props.midRightPercent * totalWidth;
      onChgForMidRight(shouldValue + "px");
      $rootEle.children().show();
    }
  };
  useEffect(() => {
    gutils.anyResizeTriggerArr[myboxid_for_midright] = () => {
      resizeHeightIfHas_for_midright($("#" + myboxid_for_midright), true);
    };
    resizeHeightIfHas_for_midright($("#" + myboxid_for_midright), true);
    return () => {
      delete gutils.anyResizeTriggerArr[myboxid_for_midright];
    };
  }, [myboxid_for_midright]);

  return (
    <div
      id={myboxid}
      ref={(e) => {
        if (e) {
          resizeHeightIfHas($(e));
        }
      }}
      style={props.parent_style}
      className={props.containerClz + " halfresize-hori-container"}
    >
      <Resizable
        {...gutils.allResizeProps()}
        enable={_.merge(gutils.enableResize(), {
          right: true,
        })}
        style={{
          width: thewidth,
          height: "100%",
        }}
        className={props.leftClz + " halfresize-hori-left-box"}
        size={{
          height: "100%",
          width: thewidth,
          overflow: "auto",
        }}
        onResizeStop={(event, direct, refToEle, delta) => {
          onChg(refToEle.style.width);
          gutils.defer(() => {
            // gutils.callWhenResize();
            gutils.callWhenResizeInternal();
          });
        }}
      >
        {props.leftJsx || ""}
      </Resizable>
      <div
        className={"mymidright-wrapper halfresize-hori-right-box"}
        style={{
          width: `calc(100% - ${thewidth})`,
          maxWidth: `calc(100% - ${thewidth})`,
          height: "100%",
          overflow: "auto",
        }}
        id={myboxid_for_midright}
      >
        <Resizable
          {...gutils.allResizeProps()}
          enable={_.merge(gutils.enableResize(), {
            right: true,
          })}
          style={{
            width: thewidth_for_midright,
            height: "100%",
          }}
          className={" halfresize-hori-left-box"}
          size={{
            height: "100%",
            width: thewidth_for_midright,
            overflow: "auto",
          }}
          onResizeStop={(event, direct, refToEle, delta) => {
            onChgForMidRight(refToEle.style.width);
            gutils.defer(() => {
              // gutils.callWhenResize();
              gutils.callWhenResizeInternal();
            });
          }}
        >
          {props.midJsx}
        </Resizable>
        <div
          className={" halfresize-hori-right-box"}
          style={{
            width: `calc(100% - ${thewidth_for_midright})`,
            maxWidth: `calc(100% - ${thewidth_for_midright})`,
            height: "100%",
            overflow: "auto",
          }}
        >
          {props.rightJsx}
        </div>
      </div>
    </div>
  );
});
