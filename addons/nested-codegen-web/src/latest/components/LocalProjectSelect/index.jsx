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
  Collapse,
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
import GFormCheckbox from "../GFormCheckbox";

export default observer((props) => {
  useEffect(() => {
    return () => {
      gutils.api.common_app.localProjects.refresh();
    };
  }, []);
  const commonApp = gstore.common_app;

  return (
    <div style={props.style} className="my-select-obj">
      {_.isEmpty(commonApp.localProjects.list) ? (
        <p>{t("Ops. the list is empty currently")}</p>
      ) : (
        _.map(commonApp.localProjects.list, (x, d, n) => {
          return (
            <div className="wrap-box-select">
              {props.noSelect != true ? (
                <input
                  type="checkbox"
                  checked={props.value[x.ID]}
                  onChange={(e) => {
                    if (props.value[x.ID]) {
                      delete props.value[x.ID];
                    } else {
                      props.value[x.ID] = _.cloneDeep(x);
                    }
                    if (props.onSelect) {
                      props.onSelect();
                    }
                  }}
                />
              ) : (
                ""
              )}
              <div className="each-project-item-select">
                <div
                  onClick={() => {
                    if (commonApp.localProjects.list_open[x.ID]) {
                      delete commonApp.localProjects.list_open[x.ID];
                    } else {
                      commonApp.localProjects.list_open[x.ID] = 1;
                    }
                  }}
                  className="each-project-item-wrapper-select"
                >
                  {x.NAME ? `${x.NAME}` : ""}
                  {` -> ${x.FILEPATH}`}
                </div>
                <Collapse
                  isOpen={!_.isNil(commonApp.localProjects.list_open[x.ID])}
                >
                  <div className="opt-path-name">
                    <div className="opt-path-text">
                      <div>ID: {x.ID}</div>
                      <div>
                        {t("Name")}: {x.NAME}
                      </div>
                      <div>
                        {t("Description")}: {x.BRIEF}
                      </div>
                      <div>
                        {t("Create Time")}: {x.CREATE_TIME_DESC}
                      </div>
                    </div>
                  </div>
                  <div className="opt-path-ctrl m-fr">
                    <ButtonGroup>
                      <Button
                        outlined={true}
                        intent="primary"
                        small={true}
                        onClick={() => {
                          gutils.api.common_app.localProjects.copyDir(x);
                        }}
                        loading={commonApp.localProjects.list_loading}
                      >
                        {t("Copy")}
                      </Button>
                      <Button
                        small={true}
                        outlined={true}
                        intent="primary"
                        onClick={() => {
                          gutils.api.common_app.localProjects.editProject(x);
                        }}
                        loading={commonApp.localProjects.list_loading}
                      >
                        {t("Edit")}
                      </Button>
                      <Button
                        small={true}
                        outlined={true}
                        intent="success"
                        onClick={() => {
                          gutils.api.common_app.localProjects.openDir(x);
                        }}
                        loading={commonApp.localProjects.list_loading}
                      >
                        {t("Open")}
                      </Button>
                      <Button
                        outlined={true}
                        small={true}
                        intent="danger"
                        onClick={() => {
                          gutils.api.common_app.localProjects.delete(x);
                        }}
                        loading={commonApp.localProjects.list_loading}
                      >
                        {t("Delete")}
                      </Button>
                    </ButtonGroup>
                  </div>
                </Collapse>
              </div>
            </div>
          );
        })
      )}
      <div className="ctlbox m-fr">
        <ButtonGroup>
          {props.noSelect ? (
            ""
          ) : (
            <Button
              onClick={() => {
                let myobj = {};
                _.forEach(commonApp.localProjects.list, (x, d, n) => {
                  myobj[x.ID] = x;
                });
                props.onChange(myobj);
              }}
              outlined={true}
              small={true}
              intent="none"
            >
              {t("Select All")}
            </Button>
          )}

          {props.noSelect ? (
            ""
          ) : (
            <Button
              onClick={() => {
                props.onChange({});
              }}
              outlined={true}
              small={true}
              intent="none"
            >
              {t("Deselect All")}
            </Button>
          )}

          <Button
            onClick={() => {
              if (props.onClickOpenFolder) {
                props.onClickOpenFolder();
              }
              gutils.api.common_app.localProjects.addProject();
            }}
            outlined={true}
            small={true}
            intent="primary"
          >
            {t("Add Folder")}
          </Button>
          <Button
            outlined={true}
            small={true}
            intent="success"
            onClick={() => {
              gutils.api.common_app.localProjects.refresh();
            }}
            loading={commonApp.localProjects.list_loading}
          >
            {t("Refresh")}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
});
