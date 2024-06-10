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
import GSyncSelectWithFilter from "../GSyncSelectWithFilter";
import GButton from "../GButton";
import _ from "lodash";

export default observer((props) => {
  const databaseAllData = gstore.databaseAllData;
  let connList = databaseAllData.data.connectionList.connList;
  let { obj, keyname } = props;
  useEffect(() => {
    gutils.once("just-one-init", () => {
      gutils.api.dblink.refreshAll();
    });
  }, []);
  let mylist = _.map(connList, (x, d, n) => {
    return {
      label: x.title,
      value: x.id,
    };
  });
  if (_.isNil(obj[keyname])) {
    gutils.defer(() => {
      obj[keyname] = _.get(mylist, "0.value");
    });
  }
  return (
    <ButtonGroup>
      <GSyncSelectWithFilter
        btn_style={{
          maxWidth: "410px",
          minWidth: "150px",
        }}
        loading={databaseAllData.data.loadingTree}
        list={mylist}
        autoFirst={true}
        obj={obj}
        index={keyname}
        whenChg={(x) => {
          obj[keyname] = x;
        }}
      />
      {/* <GButton
        icon="plus"
        loading={databaseAllData.data.loadingTree}
        onClick={() => {
          gutils.api.dblink.create_connection();
        }}
      ></GButton> */}
      <GButton
        icon="refresh"
        loading={databaseAllData.data.loadingTree}
        onClick={() => {
          gutils.api.dblink.refreshAll();
        }}
      ></GButton>

      <GButton
        icon="cog"
        loading={databaseAllData.data.loadingTree}
        onClick={async () => {
          if (
            await gutils.win_confirm(
              t(
                `CodeGen will redirect the page to database tools, then you can manage these connection on the left panel. Click confirm to continue`
              )
            )
          ) {
            gutils.hist.push("/database/connections");
          }
        }}
      ></GButton>
    </ButtonGroup>
  );
});
