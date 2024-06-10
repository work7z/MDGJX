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
import _ from "lodash";

export default observer((props) => {
  // for left mid
  let value = gstore.localSettings[props.resizekey];
  let onChg = (val) => {
    gstore.localSettings[props.resizekey] = val;
  };
  let theheight = value;
  let rawwidth = theheight;
  if (_.isNil(theheight)) {
    theheight = "20px";
  }
  const [myboxid] = useState(_.uniqueId("okx"));
  let resizeHeightIfHas = ($rootEle, isForce = false) => {
    if (props.noAutoResize) {
      return;
    }
    if (_.isNil(rawwidth) || isForce) {
      $rootEle.children().hide();
      let totalWidth = $rootEle.outerHeight(true);
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
      let totalWidth = $rootEle.outerHeight(true);
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
      className={props.containerClz + " halfresize-container"}
    >
      <Resizable
        {...gutils.allResizeProps()}
        enable={_.merge(gutils.enableResize(), {
          bottom: true,
        })}
        style={{
          height: theheight,
          width: "100%",
        }}
        className={props.leftClz + " halfresize-top-box"}
        size={{
          width: "100%",
          height: theheight,
          overflow: "hidden",
        }}
        onResizeStop={(event, direct, refToEle, delta) => {
          onChg(refToEle.style.height);
          gutils.defer(() => {
            // gutils.callWhenResize();
            // gutils.callWhenResizeInternal();
            // gutils.delayUpdateResize();
            gutils.callWhenResizeInternal();
            gutils.callWhenResizeForResizeBox();
          });
        }}
        {...gutils.allResizeProps()}
      >
        {props.topJsx}
      </Resizable>
      <div
        className={
          "mymidright-wrapper  halfresize-btm-box spass-1 " +
          (props.needBorderTop ? " havebordertop " : "")
        }
        style={{
          height: `calc(100% - ${theheight})`,
          maxHeight: `calc(100% - ${theheight})`,
          width: "100%",
          overflow: "hidden",
        }}
        id={myboxid_for_midright}
      >
        <Resizable
          // handleStyles={{
          //   bottom: {
          //     background: "red",
          //   },
          // }}
          {...gutils.allResizeProps()}
          enable={_.merge(gutils.enableResize(), {
            bottom: true,
          })}
          style={{
            height: thewidth_for_midright,
            width: "100%",
            overflow: "hidden",
          }}
          className={" halfresize-top-box spass-2"}
          size={{
            width: "100%",
            height: thewidth_for_midright,
          }}
          onResizeStop={(event, direct, refToEle, delta) => {
            onChgForMidRight(refToEle.style.height);
            gutils.defer(() => {
              // gutils.callWhenResize();
              // gutils.callWhenResizeInternal();
              // gutils.delayUpdateResize();
              gutils.callWhenResizeInternal();
              gutils.callWhenResizeForResizeBox();
            });
          }}
        >
          {props.midJsx}
        </Resizable>
        <div
          className={
            "" +
            (props.needBorderTop ? " havebordertop " : "") +
            " halfresize-btm-box spass-3"
          }
          style={{
            height: `calc(100% - ${thewidth_for_midright})`,
            maxHeight: `calc(100% - ${thewidth_for_midright})`,
            width: "100%",
            overflow: "hidden",
          }}
        >
          {props.btmJsx}
        </div>
      </div>
    </div>
  );
});
