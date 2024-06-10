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
// import { List, Grid, ScrollSync } from "react-virtualized";

export default observer((props) => {
  const { viewListInfo } = props;
  const [updtaeVal, onUpdateVal] = useState(0);
  const [crtHeight, onCrtHeight] = useState(0);
  const [crtWidth, onCrtWidth] = useState(0);
  const [myrootid] = useState(_.uniqueId("ra"));
  const resizeHeight = ($child) => {
    let $e = $child.parent();
    $e.children().hide();
    let okheight = $e.outerHeight(true);
    onCrtHeight(okheight);
    onCrtWidth($e.outerWidth(true));
    $e.children().show();
  };
  useEffect(() => {
    gutils.anyResizeTriggerArr[myrootid] = () => {
      resizeHeight($("#" + myrootid));
    };
    gutils.internalResizeTriggerArr[myrootid] = () => {
      resizeHeight($("#" + myrootid));
    };
    return () => {
      delete gutils.anyResizeTriggerArr[myrootid];
      delete gutils.internalResizeTriggerArr[myrootid];
    };
  }, [myrootid]);
  const [scrollInfo, scroll] = useState(0);
  const [crtData, onCrtDataChg] = useState([]);
  useEffect(() => {
    console.log(
      "trigger this func when change factor is changed",
      props.changeFactor
    );
    onUpdateVal(updtaeVal + 1);
    return () => {};
  }, [props.changeFactor]);
  return (
    <div
      className={props.clzname}
      id={myrootid}
      ref={(e) => {
        if (e) {
          resizeHeight($(e));
        }
      }}
    >
      <List
        noRowsRenderer={() => (
          <div className="center-view">{props.noDataView}</div>
        )}
        onScroll={(obj) => {
          let crtTopIdx = Math.floor(obj.scrollTop / props.rowHeight);
          console.log("scroll items", crtTopIdx);
        }}
        overscanRowCount={5}
        width={crtWidth}
        height={crtHeight}
        rowCount={props.rowCount}
        rowHeight={props.rowHeight}
        rowRenderer={props.rowRenderer}
      ></List>
    </div>
  );
});
