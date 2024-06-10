import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Popover,
  Overlay,
  Alert,
  RadioGroup,
  PopoverInteractionKind,
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
import { autorun, reaction,observable } from "mobx";
import gstore from "../../store.jsx";
import "./index.less";
import qs from "querystring";
import NoMessageForNotification from "../../components/NoMessageForNotification";
import { INTENT_DANGER } from "@blueprintjs/core/lib/esm/common/classes";
import proxy_jsx from "../../jsxs/proxy/proxy_jsx";
import LoggingPanel from "../../components/LoggingPanel/index";

export default observer((props) => {
  gutils.once("run_init_proxy_view", (props) => {
    // autorun(async () => {
    //   const viewDetailConsole = gstore.proxy_view_detail_console;
    //   await gutils.api.proxy.initConsoleViewData();
    //   return [viewDetailConsole.id];
    // });
    reaction(
      () => {
        const viewDetailConsole = gstore.proxy_view_detail_console;
        return [viewDetailConsole.id];
      },
      async () => {
        const viewDetailConsole = gstore.proxy_view_detail_console;
        await gutils.api.proxy.initConsoleViewData();
        return [viewDetailConsole.id];
      }
    );
  });
  const [crtTime, onCrtTimeChg] = useState(new Date().getTime());
  const hist = useHistory();
  const [frameRef, setFrameRef] = useState(null);
  const viewDetailConsole = gstore.proxy_view_detail_console;
  if (
    props.id == null
    // _.isEmpty(hist.location.search) ||
    // hist.location.search.indexOf("id") == -1
  ) {
    return (
      <Card>
        <NoMessageForNotification
          icon="archive"
          title={t("No Selected Proxy Server")}
          desc={t(
            "Please access the added list and click one's console link here."
          )}
        />
      </Card>
    );
  }
  // const qsobj = qs.parse(hist.location.search.substring(1));
  // if (qsobj.id != viewDetailConsole.id) {
  //   gutils.defer(() => {
  //     viewDetailConsole.id = qsobj.id;
  //   });
  // }
  const view_model = viewDetailConsole.view_model || {};

  const runStatusDefineObj = gutils.runStatusDefineObj();
  const runStatusViewColor = gutils.runStatusViewColor();

  const mapForRenderingCrtStatusView = gutils.renderingProxyRunStatus();
  let initsrc =
    (view_model.IS_LOCAL_SSL ? "https://" : "http://") +
    (view_model.LOCAL_LISTEN_IPADDR || "127.0.0.1") +
    ":" +
    view_model.LOCAL_LISTEN_PORT +
    (view_model.CONTEXT_PATH ? view_model.CONTEXT_PATH : "");

  let isLoading = gstore.proxy_view_detail_console.loading;
  // if () {
  //   return (
  //     <NoMessageForNotification
  //       icon="widget-button"
  //       title="loading..."
  //       desc="retrieving data from the specify config, please wait a moments."
  //     />
  //   );
  // }
  // sys-card-wrapper
  return (
    <div className="proxy-view-panel  ">
      <Card className="no-max-set-for-card">
        <div style={{ overflow: "hidden", padding: "10px" }}>
          <h2 className="bar-label" style={{ float: "left" }}>
            {t("Proxy Server Console")}
            {isLoading ? t("(Loading...)") : ""}
          </h2>
          {/* <div style={{ float: "right" }}>
            <Link to="/server/proxy/added">
              {t(`Back to Added List`)}
            </Link>
          </div> */}
        </div>
        <div>
          <table width="100%">
            <tbody>
              <tr>
                <td>
                  <b>{t("ID")}</b>: {view_model.ID}
                </td>
                <td title={view_model.BRIEF}>
                  <b>{t("Name")}</b>: {view_model.NAME}
                </td>
                <td>
                  <b>{t("Status")}</b>:{" "}
                  <span
                    style={{
                      color: _.get(
                        mapForRenderingCrtStatusView[view_model.RUN_STATUS],
                        "color"
                      ),
                    }}
                  >
                    {_.get(
                      mapForRenderingCrtStatusView[view_model.RUN_STATUS],
                      "label"
                    )}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <b>{t("Listen Port")}</b>: {view_model.LOCAL_LISTEN_PORT}
                </td>
                <td>
                  <b>{t("Auto Run?")}</b> {view_model.BOOT_FLAG ? "Yes" : "No"}
                </td>
                <td>
                  <b>{t("Create Time")}</b>:
                  {gutils.formatDate(new Date(view_model.CREATE_TIME))}
                </td>
              </tr>
              <tr>
                <td>
                  <b>{t("Using SSL Mode?")}</b>{" "}
                  {view_model.IS_LOCAL_SSL == 1 ? "Yes" : "No"}
                </td>
                <td>
                  <b>{t("Error Info")}</b>:{" "}
                  <span
                    style={{
                      color:
                        view_model.RUN_STATUS == 2
                          ? gutils.intent.danger
                          : null,
                    }}
                  >
                    {view_model.RUN_STATUS == 2
                      ? view_model.VIEW_ERROR_INFO
                      : "None"}
                  </span>
                </td>
                <td colSpan={2}>
                  <b>{t("Rules")}</b>:{" "}
                  <a
                    href={gutils.void_ref}
                    onClick={() => {
                      gutils.api.proxy.openAddingModal("update", view_model);
                    }}
                  >
                    {t(
                      `{0} proxy rules`,
                      _.size(_.get(view_model, "EXTRA_DATA_PROXY_RULES")) || 0
                    )}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      <Card className="no-max-set-for-card">
        <div style={{ overflow: "hidden" }}>
          <h3 className="bar-label" style={{ float: "left" }}>
            {t("Control Actions")}
          </h3>
        </div>
        <div>
          <ButtonGroup>
            <Button
              outlined={true}
              intent={
                gutils.runStatusViewColorWithIntent()[view_model.RUN_STATUS]
              }
              loading={gstore.proxyServerPageData.toggle_status_loading}
              className={Classes.POPOVER_DISMISS}
              onClick={() => {
                gutils.api.proxy.optMachine({
                  ID: view_model.ID,
                  RUN_STATUS: view_model.RUN_STATUS,
                });
              }}
            >
              {t(
                `${gutils.runStatusDefineObj()[view_model.RUN_STATUS]} Server`
              )}
            </Button>
            {view_model.RUN_STATUS != 0 && view_model.RUN_STATUS != 2 ? (
              <Button
                loading={gstore.proxyServerPageData.toggle_status_loading}
                outlined={true}
                intent={Intent.WARNING}
                className={Classes.POPOVER_DISMISS}
                onClick={() => {
                  gutils.api.proxy.optMachine({
                    ID: view_model.ID,
                    RUN_STATUS: 2,
                  });
                }}
              >
                {t("Restart Server")}
              </Button>
            ) : view_model.RUN_STATUS == 2 ? (
              <Button
                loading={gstore.proxyServerPageData.toggle_status_loading}
                outlined={true}
                intent={Intent.DANGER}
                className={Classes.POPOVER_DISMISS}
                onClick={() => {
                  gutils.api.proxy.optMachine({
                    ID: view_model.ID,
                    RUN_STATUS: 1,
                    forceStop: true,
                  });
                }}
              >
                {t("Stop Server")}
              </Button>
            ) : (
              ""
            )}
            <Button
              outlined={true}
              intent={Intent.SUCCESS}
              className={Classes.POPOVER_DISMISS}
              onClick={() => {
                gutils.api.proxy.openAddingModal("update", view_model);
              }}
            >
              {t("Edit Config")}
            </Button>
            <Button
              outlined={true}
              intent={Intent.SUCCESS}
              className={Classes.POPOVER_DISMISS}
              onClick={async () => {
                await gutils.api.proxy.initConsoleViewData();
                await gutils.alertOk({
                  message: "Refreshed",
                });
              }}
            >
              {t("Refresh")}
            </Button>
          </ButtonGroup>
        </div>
      </Card>
      <Card className="no-max-set-for-card">
        <div style={{ overflow: "hidden" }}>
          <h3 className="bar-label" style={{ float: "left" }}>
            {t("Configuration")}
          </h3>
        </div>
        <div>
          {proxy_jsx.createForm([proxy_jsx.table_rules({ readonly: true })])}
        </div>
      </Card>
      <LoggingPanel
        data={viewDetailConsole.logging}
        loading={gstore.proxy_view_detail_console.logging.loading}
        refresh={() => {
          gutils.api.proxy.initLoggingData({
            viewDetailConsole,
          });
        }}
      />
    </div>
  );
});
