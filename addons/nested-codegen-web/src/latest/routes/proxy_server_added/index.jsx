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
import {autorun, observable, reaction}  from 'mobx'
import gstore from "../../store.jsx";
import "./index.less";
import { INTENT_PRIMARY } from "@blueprintjs/core/lib/esm/common/classes";
import "./index.less";
import ControlBar from "../../components/control_bar/index.jsx";
import ControlTable from "../../components/control_table/index.jsx";
import Control_Pagination from "../../components/control_Pagination/index.jsx";
import { intentClass } from "@blueprintjs/core/lib/esm/common/classes";
import Proxy_server_view from "../proxy_server_view";
import HalfResizeForTwoHorizontal from "../../components/HalfResizeForTwoHorizontal";
import PanelWithTitleView from "../PanelWithTitleView";

export default observer(() => {
  let localStore = {
    ...gstore.proxyServerPageData,
    func: {
      search: gutils.api.proxy.loadAddedList,
      create: () => {
        gutils.api.proxy.openAddingModal("create");
      },
    },
  };
  gutils.once("proxy-added", () => {
    gutils.api.proxy.loadAddedList();
  });
  useEffect(() => {
    let a = reaction(
      () => {
        return [gstore.localSettings.currentWorkspaceId];
      },
      () => {
        gutils.api.proxy.loadAddedList();
      }
    );
    return () => {
      a();
    };
  });
  const labelCols = [
    { label: "Server Name", value: "NAME" },
    {
      label: "Status",
      value: (x) => {
        const status = "" + x.RUN_STATUS;
        const map = gutils.renderingStaticRunStatus();
        let finval = map[status];
        // if (status == 0) {
        //   return finval.label;
        // }
        return (
          <Link
            to={"/server/proxy/view?id=" + x["ID"]}
            style={{ color: finval.color }}
          >
            {finval.label}
          </Link>
        );
      },
    },
    { label: "Group Name", value: "FOLDER_NAME" },
    {
      label: "Bind Address",
      value: "LOCAL_LISTEN_IPADDR",
    },
    {
      label: "Listen Port",
      value: (x) => {
        return x["LOCAL_LISTEN_PORT"];
        // let listenPort = x["LOCAL_LISTEN_PORT"];
        // let listenSSLPort = x["LOCAL_LISTEN_SSL_PORT"];
        // let totalReturn = [];
        // if (listenPort) {
        //   totalReturn.push("HTTP:" + listenPort);
        // }
        // if (listenSSLPort) {
        //   totalReturn.push("HTTPS:" + listenSSLPort);
        // }
        // return totalReturn.join(",");
      },
    },
    // { label: "Description", value: "BRIEF" },
    // { label: "Context Path", value: "CONTEXT_PATH" },
    // { label: "Directory", value: "FILE_PATH" },
    // {
    //   label: "List Directory?",
    //   value: (x) => (x.LIST_DIRECTORY ? "Yes" : "No"),
    // },
    {
      label: "Rules",
      value: (x) => (
        <a
          href={gutils.void_ref}
          onClick={() => {
            gutils.api.proxy.openAddingModal("update", x);
          }}
        >
          {_.size(_.get(x, "EXTRA_DATA_PROXY_RULES")) || 0} proxy rules
        </a>
      ),
    },
    {
      label: "Using SSL?",
      value: (x) => (x.IS_LOCAL_SSL == 1 ? "Yes" : "No"),
    },
    {
      label: "AutoRun?",
      value: (x) => (x.BOOT_FLAG == 1 ? "Yes" : "No"),
    },
    {
      label: "Create Time",
      // value: (x) => gutils.formatDate(new Date(x["CREATE_TIME"])),
      value: "CREATE_TIME_DESC",
    },
    {
      label: "Operation",
      value: (x) => {
        const runStatusDefineObj = gutils.runStatusDefineObj();
        const runStatusViewColor = gutils.runStatusViewColor();
        return (
          <div className="between-anchor">
            <a
              href={gutils.void_ref}
              style={{
                color: runStatusViewColor[x.RUN_STATUS],
              }}
              onClick={() => {
                gutils.api.proxy.optMachine(x);
              }}
            >
              {runStatusDefineObj[x.RUN_STATUS]}
            </a>
            {x.RUN_STATUS == 2 ? (
              <a
                href={gutils.void_ref}
                style={{
                  color: runStatusViewColor[1],
                }}
                onClick={() => {
                  gutils.api.proxy.optMachine({
                    ID: x.ID,
                    RUN_STATUS: 1,
                    forceStop: true,
                  });
                }}
              >
                {runStatusDefineObj[1]}
              </a>
            ) : null}
            <Link
              onClick={() => {
                gutils.api.proxy.openAddingModal("update", x);
              }}
            >
              {t("Edit")}
            </Link>
            <Link to={"/server/proxy/view?id=" + x["ID"]}>Console</Link>
          </div>
        );
      },
    },
  ];

  // ----------------------
  let resizekey = "proxy_server_list";

  return (
    <div className="sys-card-wrapper">
      <Card style={{ padding: "0px" }}>
        <div style={{ width: "100%", height: "100%" }}>
          <HalfResizeForTwoHorizontal
            defaultLeftWidthValue={280}
            value={gstore.localSettings[resizekey]}
            onChg={(val) => {
              gstore.localSettings[resizekey] = val;
            }}
            leftJsx={
              <PanelWithTitleView
                title={t(`Proxy Server List`)}
                jsx={
                  <div className="card-list-wrapper">
                    <div className="control-panel-list">
                      <ButtonGroup>
                        <Button
                          text={t("Create")}
                          intent={"primary"}
                          outlined={true}
                          loading={localStore.loading}
                          onClick={() => {
                            gutils.api.proxy.openAddingModal("create");
                          }}
                          icon="folder-new"
                        ></Button>
                        <Button
                          text={t("Refresh")}
                          intent={"success"}
                          loading={localStore.loading}
                          outlined={true}
                          icon="refresh"
                          onClick={() => {
                            gutils.api.proxy.loadAddedList();
                          }}
                        ></Button>
                      </ButtonGroup>
                    </div>
                    {_.map(localStore.pageData, (x, d, n) => {
                      const runStatusDefineObj = gutils.runStatusDefineObj();
                      const runStatusViewColor = gutils.runStatusViewColor();
                      const status = "" + x.RUN_STATUS;
                      const map = gutils.renderingStaticRunStatus();
                      let finval = map[status];
                      return (
                        <div>
                          <Card
                            // interactive={true}
                            onClick={() => {
                              const viewDetailConsole =
                                gstore.proxy_view_detail_console;
                              viewDetailConsole.id = x.ID;
                            }}
                            // style={{
                            //   borderColor:
                            //     x.ID == gstore.static_view_detail_console.id
                            //       ? "var(--app-bg-border-e3e3e2)"
                            //       : null,
                            // }}
                            className={
                              x.ID == gstore.proxy_view_detail_console.id
                                ? Classes.ELEVATION_2
                                : null
                            }
                          >
                            <h3 style={{ margin: "0px", marginBottom: "8px" }}>
                              <a href="javascript:void(0);">{x.NAME}</a>
                            </h3>
                            <p>
                              <div>
                                <b>{t(`Status: `)}</b>
                                <span
                                  style={{
                                    color: finval.color,
                                  }}
                                >
                                  {finval.label}
                                </span>
                              </div>
                              <div>
                                <b>{t(`Address: `)}</b>
                                <span>
                                  {x.LOCAL_LISTEN_IPADDR}:{x.LOCAL_LISTEN_PORT}
                                </span>
                              </div>
                              <div>
                                <b>{t(`AutoRun?`)}</b>
                                <span>{x.BOOT_FLAG ? "Yes" : "No"}</span>
                              </div>
                              <div>
                                <b>{t(`Create Time: `)}</b>
                                <span>{x.CREATE_TIME_DESC}</span>
                              </div>
                            </p>
                            <div style={{ textAlign: "right" }}>
                              <ButtonGroup>
                                <Button
                                  onClick={() => {
                                    gutils.api.proxy.openAddingModal(
                                      "update",
                                      x
                                    );
                                  }}
                                  small={true}
                                  text={t("Edit")}
                                  intent={"primary"}
                                  outlined={true}
                                  className={Classes.BUTTON}
                                />
                                <Button
                                  small={true}
                                  intent={runStatusViewColor[x.RUN_STATUS]}
                                  text={t(runStatusDefineObj[x.RUN_STATUS])}
                                  className={Classes.BUTTON}
                                  outlined={true}
                                  onClick={() => {
                                    gutils.api.proxy.optMachine(x);
                                  }}
                                />
                                {x.RUN_STATUS == 2 ? (
                                  <Button
                                    small={true}
                                    text={t(runStatusDefineObj[1])}
                                    intent={runStatusViewColor[1]}
                                    className={Classes.BUTTON}
                                    outlined={true}
                                    onClick={() => {
                                      gutils.api.proxy.optMachine({
                                        ID: x.ID,
                                        RUN_STATUS: 1,
                                        forceStop: true,
                                      });
                                    }}
                                  />
                                ) : null}
                              </ButtonGroup>
                            </div>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                }
              />
            }
            rightClz="needleftborder"
            rightJsx={
              <PanelWithTitleView
                title={t(`Console`)}
                jsx={
                  <Proxy_server_view id={gstore.proxy_view_detail_console.id} />
                }
              />
            }
          ></HalfResizeForTwoHorizontal>
        </div>
      </Card>
    </div>
  );

  // return (
  //   <div className="sys-card-wrapper">
  //     <Card>
  //       <div>
  //         <ControlBar
  //           folderkey="proxyServerPageData"
  //           tableInfo={localStore}
  //           text={t("Proxy Server List")}
  //         />
  //         <ControlTable
  //           cols={gutils.genCol(labelCols, localStore.pageData)}
  //           tableInfo={localStore}
  //         ></ControlTable>
  //         <Control_Pagination tableInfo={localStore}></Control_Pagination>
  //       </div>
  //     </Card>
  //   </div>
  // );
});
