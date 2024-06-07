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
import classNames from "classNames";
import {
  INTENT_PRIMARY,
  INTENT_SUCCESS,
} from "@blueprintjs/core/lib/esm/common/classes";
import DialogCommon from "../dialog_common";
import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

export default observer(() => {
  const alertActionArr = gstore.settings.alerts;
  return (
    // <DndProvider backend={HTML5Backend}>
    <div>
      {_.map(alertActionArr, (x, d, n) => {
        return (
          <DialogCommon
            noConfirm={x.noConfirm}
            clzname="tiny-view addfolder-box"
            obj={x}
            width={x.width || "auto"}
            height={x.height}
            resize={_.get(x, "resize", true)}
            noFoot={x.noFoot}
            noBackdrop={_.get(x, "noBackdrop", true)}
            jsx={x.jsx}
            no_padding={x.no_padding}
            style={x.style}
            confirm={async () => {
              try {
                if (x.confirm) {
                  let a = await x.confirm();
                  if (a == "KEEP_REMAIN") {
                    return;
                  }
                }
              } catch (e) {
                gutils.alert(gutils.getErrMsg(e));
              }
              x.open = false;
            }}
            {..._.get(x, "otherJsx", {})}
          />
        );
      })}
    </div>
    // </DndProvider>
  );
});
