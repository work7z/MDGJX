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
import React, { useRef } from "react";
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
import GEditor from "../GEditor";

export default observer((props) => {
  let [myo, onMyo] = useState(0);
  let [myValue, onMyvalue] = useState(props.value);

  useEffect(() => {
    onMyvalue(props.value);
  }, [props.value]);

  let cRef = useRef({
    editor: null,
  });

  return (
    <div>
      {/* <TextArea
        value={myValue}
        onChange={(e) => {
          onMyvalue(e.target.value);
        }}
        onBlur={(e) => {
          console.log("chaging value", e.target.value);
          props.onChange(myValue);
          onMyo(myo + 1);
        }}
        style={{ width: "100%", height: "150px" }}
      /> */}
      <div
        style={{
          width: "100%",
          height: "230px",
          border: "1px solid var(--app-bg-border-e3e3e2)",
        }}
      >
        <GEditor
          lang="json"
          otherEditorProps={{
            value: myValue,
          }}
          defaultValue={myValue}
          onChange={(val) => {
            props.onChange(val);
            // onMyo(myo + 1);
          }}
          onRef={(ref) => {
            cRef.current.editor = ref;
            gutils.defer(() => {
              cRef.current.editor.getModel().setValue(myValue);
            });
          }}
        />
      </div>
      <div style={{ textAlign: "right", marginTop: "3px" }}>
        <a
          href="javascript:void(0);"
          onClick={() => {
            cRef.current.editor.getModel().setValue(props.example);
            // props.onChange(props.example);
            // onMyvalue(props.example);
            // onMyo(myo + 1);
          }}
        >
          {t(`Show Example`)}
        </a>
      </div>
    </div>
  );
});
