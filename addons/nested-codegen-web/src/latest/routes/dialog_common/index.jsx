import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
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
  Dialog,
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
import $ from "jquery";
import { Resizable } from "re-resizable";

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
// var { autorun, observable, observe } = require("mobx");
import {autorun, observable, observe, reaction} from "mobx";

import gstore from "../../store.jsx";
import "./index.less";
import classNames from "classNames";
import {
  INTENT_PRIMARY,
  INTENT_SUCCESS,
} from "@blueprintjs/core/lib/esm/common/classes";
// import { Rnd } from "react-rnd";
// import Draggable from "react-draggable"; // The default
// import { DraggableCore } from "react-draggable"; // <DraggableCore>
// import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time

// window.Rnd = Rnd;
window.Resizable = Resizable;
window._ = _;
// window.Draggable = Draggable;

const DialogFooter = observer((props) => {
  // confirmDisable={props.confirmDisable}
  // let confirmDisable = props.obj["confirmDisable"];
  let myval = (props.pageData || {})["isAddModelPass"];
  let confirmDisable = _.isNil(myval) ? false : !myval;

  let { obj } = props;
  let LeftContent = props.leftContent;
  let Left2Content = props.left2Content;
  return (
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        {LeftContent ? <LeftContent confirmDisable={confirmDisable} /> : ""}
        {Left2Content ? <Left2Content confirmDisable={confirmDisable} /> : ""}
        {obj.noCancel ? (
          ""
        ) : (
          <Button
            onClick={() => {
              obj.open = false;
              if (obj.onCancel) {
                obj.onCancel();
              }
            }}
            intent={obj.cancelIntent}
          >
            {t(obj.cancelText || "Cancel")}
          </Button>
        )}
        {obj.noConfirm ? (
          ""
        ) : (
          <Button
            onClick={async () => {
              if (obj.onConfirm) {
                let ok = await obj.onConfirm();
                if (ok === false) {
                  return;
                }
              }
              if (props.confirm) {
                props.confirm();
              }
            }}
            loading={obj.loading}
            intent={obj.confirmIntent}
            disabled={confirmDisable}
          >
            {t(obj.confirmText)}
          </Button>
        )}
      </div>
    </div>
  );
});

const DialogBody = observer((props) => {
  const MyJSX = props.jsx;
  if (props.obj.no_padding) {
    return <MyJSX />;
  }
  return (
    <div
      style={{
        padding: props.obj.no_padding ? "0px" : null,
      }}
      className={Classes.DIALOG_BODY}
    >
      <MyJSX />
    </div>
  );
});

const FlatternDialogComponent = observer((props) => {
  const obj = props.obj;
  const classes = classNames(Classes.CARD, Classes.ELEVATION_4);

  // // console.log("dialog common", props);

  const [style, onStyle] = useState({
    left: "50%",
    transform: "translateX(-50%)",
  });
  const [state, onState] = useState({});
  const extraProps =
    props.noBackdrop == true
      ? {
          backdropProps: {
            style: {
              display: "none",
            },
          },
        }
      : {};
  return (
    <Example>
      <Dialog
        {...extraProps}
        // canEscapeKeyClose={props.noBackdrop != true}
        canEscapeKeyClose={true}
        portalClassName={props.portalClz}
        className={"mytesting  " + props.clzname + " " + props.obj.s_clzname}
        style={{
          height: props.height,
          minHeight: props.height,
          width: props.width || "580px",
          zIndex: props.zIndex,
          style,
          ...(props.style || {}),
        }}
        title={props.theTitle || t(props.obj.title)}
        isOpen={props.obj.open}
        icon={props.obj.icon}
        onClose={() => {
          props.obj.open = false;
        }}
        mSize={{ width: state.width, height: state.height }}
        mOnResizeStop={(e, direction, ref, delta, position) => {
          onState(
            _.merge({}, state, {
              width: ref.style.width,
              height: ref.style.height,
              ...position,
            })
          );
          gutils.defer(() => {
            gutils.callWhenResize();
          });
        }}
        ref={(e) => {
          // // console.log("got ref for dialog", e);
          window.dialog_ref = e;
          if (e == null) {
            return;
          }
          gutils.defer(() => {
            if (props.resize == false) {
              return;
            }
            let { titleId } = e;
            const dialogDIV = $(`[aria-labelledby="${titleId}"]`);
            const $header = dialogDIV.find(".bp3-dialog-header");
            gutils.drag(dialogDIV, $header);
          });
        }}
      >
        <DialogBody obj={props} jsx={props.jsx} />
        {props.noFoot ? (
          ""
        ) : (
          <DialogFooter
            pageData={props.pageData || props.obj}
            obj={props.obj}
            leftContent={props.leftContent}
            left2Content={props.left2Content}
            confirm={props.confirm}
            onConfirm={props.onConfirm}
          ></DialogFooter>
        )}
      </Dialog>
    </Example>
  );
});

export default observer((props) => {
  return <FlatternDialogComponent {...props} />;
});

/**
 ref={(e) => {
  // e &&
  //   gutils.defer(() => {
  //     // // console.log("got dialog common", e);
  //     let crtTitleID = e.titleId;
  //     if (crtTitleID) {
  //       let tempTitle = $("#" + crtTitleID);
  //       if (tempTitle) {
  //         let parentObj = $("#" + crtTitleID).parent(".bp3-portal");
  //         //debugger;
  //         if (parentObj) {
  //           parentObj.css({
  //             zIndex: props.zIndex,
  //           });
  //         }
  //       }
  //     }
  //   });
}}
 */
