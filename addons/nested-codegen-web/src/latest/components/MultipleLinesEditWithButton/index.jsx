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
  Popover,
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
import { useState, useEffect, useRef } from "react";

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
  let myform = props.obj;
  let mykey = props.index;
  let tmpref = useRef({
    value: myform[mykey],
  });
  let value = myform[mykey];
  let [myo, onMyo] = useState(0);
  let [isOpen, onOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      minimal={true}
      style={{ minWidth: "400px", padding: "10px", height: "100%" }}
      popoverClassName={Classes.POPOVER_CONTENT_SIZING + " short-pop"}
      portalClassName="textareawrap short-pop allowmaxpop"
      enforceFocus={true}
      onInteraction={(e) => {
        onOpen(e);
      }}
      placement="bottom"
    >
      <Button
        small={true}
        // minimal={true}
        onClick={() => {
          onOpen(true);
        }}
        title={t("Click this button to view more detail")}
        text={t(
          `{0} items`,
          _.chain(value)
            .split("\n")
            .filter((x) => !_.isEmpty(x) && !_.trim(x).startsWith("#"))
            .size()
            .value()
        )}
      ></Button>
      <div>
        <TextArea
          value={myform[mykey] || ""}
          onChange={(e) => {
            // console.log()
            // debugger;
            // tmpref.current.value = e.target.value;
            myform[mykey] = e.target.value;
          }}
          style={{ width: "400px", height: "450px" }}
        />
        <div class="m-fr mt-10">
          <ButtonGroup>
            {props.example ? (
              <Button
                minimal={true}
                small={true}
                intent={"success"}
                onClick={() => {
                  tmpref.current.value = props.example;
                  myform[mykey] = props.example;
                  onMyo(myo + 1);
                }}
              >
                {t("Show Example")}
              </Button>
            ) : (
              ""
            )}
            <Button
              minimal={true}
              small={true}
              intent={"primary"}
              onClick={() => {
                onOpen(false);
                // myform[mykey] = tmpref.current.value;
                // onMyo(myo + 1);
              }}
            >
              {t("Confirm")}
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </Popover>
  );
});
