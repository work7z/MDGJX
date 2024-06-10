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
  return (
    <div className="sys-card-wrapper" style={{}}>
      <Card
        style={{
          overflow: "auto",
          padding: "10px",
          // backgroundColor: "aliceblue",
          // fontWeight: "bold",
          // color: "white",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          {t(`Sorry, please click the button below to reload this page again.`)}
        </h1>
        <p style={{ textAlign: "center" }}>
          {t(
            `This page was cleaned by your browser, hence it's unable to be loaded. To solve this issue quickly, please click the button below to reload this page again.`
          )}
          {t(
            `Except for the reason of the garbage collection from your browser side, we think it might relate to the quality of the Internet as well. Anyway, just reload this page, and everything will be coming up roses.`
          )}
        </p>
        <p style={{ textAlign: "center" }}>
          <Button
            onClick={() => {
              location.reload();
            }}
            text={t(`Reload this Page`)}
            intent={"primary"}
            large={true}
          ></Button>
        </p>
        <p style={{ fontSize: 13, textAlign: "right" }}>
          <h2>{t(`Error Detail`)}</h2>
          <p>{props.errMsg || props.errmsg || "Unknown Reason"}</p>
          <div>
            {t(
              `If you still receive this message, please feel free to contact us via Github Issue or E-Mail work7z@outlook.com`
            )}
          </div>
        </p>
      </Card>
    </div>
  );
});
