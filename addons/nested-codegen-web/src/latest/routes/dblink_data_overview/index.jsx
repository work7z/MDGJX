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
import HalfResizeForThreeHorizontal from "../../components/HalfResizeForThreeHorizontal";
import Blink from "../../components/Blink";
import _ from "lodash";
import PlainVisualTable from "../../routes/PlainVisualTable";

export default observer((props) => {
  let {
    crtDb,
    crtTb,
    dbarr,
    tbarr,
    colarr,
    loadingTable,
    loadingDatabase,
    loadingColumn,
  } = props.overviewDefinition;
  let onCrtDb = (val) => {
    props.overviewDefinition.crtDb = val;
  };
  let onCrtTb = (val) => {
    props.overviewDefinition.crtTb = val;
  };

  return (
    <div className="dblink-overview-root-wrapper">
      <div className="dblink-top-box">
        <HalfResizeForThreeHorizontal
          midRightPercent={0.25}
          leftMidPercent={0.15}
          resizekey={"dblinkoverviewsize"}
          containerClz="dblink-overview-wrapper"
          leftJsx={
            <div className="db-list-view">
              {_.isEmpty(dbarr) && !loadingDatabase ? (
                <div className="empty-view-item">{t("0 database(s)")}</div>
              ) : (
                ""
              )}
              {loadingDatabase ? (
                <div className="empty-view-item">
                  {t("Loading")}
                  <Blink />
                </div>
              ) : (
                ""
              )}
              {_.map(dbarr, (x, d, n) => {
                return (
                  <div
                    key={x.value}
                    className={
                      "db-list-item" +
                      " " +
                      (crtDb == x.value ? "active-item" : "")
                    }
                    onClick={() => {
                      onCrtDb(x.value);
                    }}
                  >
                    <Icon size={12} icon="database" />
                    <span>{x.label}</span>
                  </div>
                );
              })}
            </div>
          }
          midJsx={
            <div className="tb-list-view">
              {_.isEmpty(tbarr) && !loadingTable ? (
                <div className="empty-view-item">{t("0 table(s)")}</div>
              ) : (
                ""
              )}
              {loadingTable ? (
                <div className="empty-view-item">
                  {t("Loading")}
                  <Blink />
                </div>
              ) : (
                ""
              )}
              {_.map(tbarr, (x, d, n) => {
                return (
                  <div
                    key={x.value}
                    className={
                      "tb-list-item" +
                      " " +
                      (crtTb == x.value ? "active-item" : "")
                    }
                    onClick={() => {
                      onCrtTb(x.value);
                    }}
                  >
                    <Icon size={12} icon="th" />
                    <span>{x.label}</span>
                  </div>
                );
              })}
            </div>
          }
          rightJsx={
            <div className="selected-detail-view">
              {props.overviewDefinition.crtTb == null ? (
                ""
              ) : (
                <PlainVisualTable
                  notActive={() => {
                    return (
                      gutils.getFocusPanelId() != "btm" ||
                      gstore.databaseAllData.data.dataViewTab.value !=
                        "overview"
                    );
                  }}
                  obj={
                    gstore.databaseAllData.data.overviewDefinition
                      .columnTableData
                  }
                />
              )}
            </div>
          }
        ></HalfResizeForThreeHorizontal>
      </div>
      <div className="dblink-st-btm-box">
        <div className="dblink-st-left">
          {t(
            `Selected: {0} - {1}`,
            crtDb == null ? "[N/A]" : crtDb,
            crtTb == null ? "[N/A]" : crtTb
          )}
        </div>
        <div className="dblink-st-right">
          <span>
            {t(`{0} database(s) - {1} table(s)`, _.size(dbarr), _.size(tbarr))}
          </span>
          <span style={{ marginLeft: "8px" }}>
            <a
              href={"javascript:void(0);"}
              onClick={() => {
                gutils.api.dblink.fn_refreshDatabaseList();
              }}
            >
              {t("Refresh")}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
});
