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
import LoggingPanel from "../../components/LoggingPanel";

export default observer((props) => {
  gutils.once("run_init_static_view", () => {
    reaction(
      () => {
        const viewDetailConsole = gstore.static_view_detail_console;
        return [viewDetailConsole.id];
      },
      async () => {
        const viewDetailConsole = gstore.static_view_detail_console;
        await gutils.api.static.initConsoleViewData();
        return [viewDetailConsole.id];
      }
    );
  });
  const [crtTime, onCrtTimeChg] = useState(new Date().getTime());
  const hist = useHistory();
  const [frameRef, setFrameRef] = useState(null);
  const viewDetailConsole = gstore.static_view_detail_console;
  const qsobj = props; // qs.parse(hist.location.search.substring(1));
  // if (qsobj.id != null && qsobj.id != viewDetailConsole.id) {
  //   gutils.defer(() => {
  //     viewDetailConsole.id = qsobj.id;
  //   });
  // }
  if (
    props.id == null
    // _.isEmpty(hist.location.search) ||
    // hist.location.search.indexOf("id") == -1
  ) {
    return (
      <Card>
        <NoMessageForNotification
          icon="archive"
          title={"No Selected Static Server"}
          desc={
            "Please access the added list and click one's console link here."
          }
        />
      </Card>
    );
  }
  const view_model = viewDetailConsole.view_model || {};
  const runStatusDefineObj = gutils.runStatusDefineObj();
  const runStatusViewColor = gutils.runStatusViewColor();

  const mapForRenderingCrtStatusView = gutils.renderingStaticRunStatus();
  let initsrc =
    (view_model.IS_LOCAL_SSL ? "https://" : "http://") +
    (view_model.LOCAL_LISTEN_IPADDR || "127.0.0.1") +
    ":" +
    view_model.LOCAL_LISTEN_PORT +
    (view_model.CONTEXT_PATH ? view_model.CONTEXT_PATH : "");

  // if (gstore.static_view_detail_console.loading) {
  //   return (
  //     <NoMessageForNotification
  //       icon="widget-button"
  //       title="loading..."
  //       desc="retrieving data from the specify config, please wait a moments."
  //     />
  //   );
  // }
  let isLoading = gstore.static_view_detail_console.loading;
  // sys-card-wrapper
  return (
    <div className="static-view-panel ">
      <Card className="no-max-set-for-card">
        <div style={{ overflow: "hidden" }}>
          <h2 className="bar-label" style={{ float: "left" }}>
            {t("Static Server Console")}
            {isLoading ? t("(Loading...)") : ""}
          </h2>
          {/* <div style={{ float: "right" }}>
            <Link to="/server/static/added">
              {t("Back to Added List")}
            </Link>
          </div> */}
        </div>
        <div>
          <table width="100%">
            <tbody>
              <tr>
                <td>
                  <b>ID</b>: {view_model.ID}
                </td>
                <td title={view_model.BRIEF}>
                  <b>{t("Name")}</b>: {view_model.NAME}
                </td>
                <td>
                  <b>Status</b>:{" "}
                  <span
                    style={{
                      color: _.get(
                        mapForRenderingCrtStatusView[view_model.RUN_STATUS],
                        "color"
                      ),
                    }}
                  >
                    {t(
                      _.get(
                        mapForRenderingCrtStatusView[view_model.RUN_STATUS],
                        "label"
                      )
                    )}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <b>{t("Context Path")}</b>: {view_model.CONTEXT_PATH}
                </td>
                <td>
                  <b>{t("Listen Port")}</b>: {view_model.LOCAL_LISTEN_PORT}
                </td>
                <td>
                  <b>{t("Directory")}</b>: {view_model.FILE_PATH}
                </td>
              </tr>
              <tr>
                <td>
                  <b>{t("List Directory?")}</b>{" "}
                  {view_model.LIST_DIRECTORY ? "Yes" : "No"}
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
                  {view_model.IS_LOCAL_SSL ? "Yes" : "No"}
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
                    {t(
                      view_model.RUN_STATUS == 2
                        ? view_model.VIEW_ERROR_INFO
                        : "None"
                    )}
                  </span>
                </td>
                <td colSpan={2}>
                  <b>{t("Access Link")}</b>:{" "}
                  <a href={initsrc} target="_blank">
                    {t(initsrc)}
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
              loading={gstore.staticServerPageData.toggle_status_loading}
              className={Classes.POPOVER_DISMISS}
              onClick={() => {
                gutils.api.static.optMachine({
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
                loading={gstore.staticServerPageData.toggle_status_loading}
                outlined={true}
                intent={Intent.WARNING}
                className={Classes.POPOVER_DISMISS}
                onClick={() => {
                  gutils.api.static.optMachine({
                    ID: view_model.ID,
                    RUN_STATUS: 2,
                  });
                }}
              >
                {t("Restart Server")}
              </Button>
            ) : view_model.RUN_STATUS == 2 ? (
              <Button
                loading={gstore.staticServerPageData.toggle_status_loading}
                outlined={true}
                intent={Intent.DANGER}
                className={Classes.POPOVER_DISMISS}
                onClick={() => {
                  gutils.api.static.optMachine({
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
                gutils.api.static.openAddingModal("update", view_model);
              }}
            >
              {t("Edit Config")}
            </Button>
            <Button
              outlined={true}
              intent={Intent.SUCCESS}
              className={Classes.POPOVER_DISMISS}
              onClick={async () => {
                await gutils.api.static.initConsoleViewData();
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
            {t("Real-time Browser Tools")}
          </h3>
          <div style={{ float: "right" }} className="between-anchor-bigger">
            <a href={initsrc} target="_blank">
              {t("Open Link")}
            </a>
            <a
              href={"javascript:void(0);"}
              onClick={() => {
                gutils.copy(initsrc);
                gutils.alertOk({
                  message: "Copied",
                });
              }}
            >
              {t("Copy Link")}
            </a>
            <a
              href={"javascript:void(0);"}
              onClick={() => {
                onCrtTimeChg(new Date().getTime());
                if (frameRef) {
                  frameRef.src = frameRef.src;
                }
                gutils.alertOk({
                  message: "Refreshed",
                });
              }}
            >
              {t("Refresh")}
            </a>
          </div>
        </div>
        <div>
          {view_model.RUN_STATUS == 1 ? (
            view_model.IS_LOCAL_SSL ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: t(
                    `{0} hasn't supported SSL preview yet, please open the <a href="{1}" target="_blank"> link </a> in browser instead of`,
                    gutils.app_name,
                    initsrc
                  ),
                }}
              ></div>
            ) : (
              <iframe
                ref={(e) => {
                  setFrameRef(e);
                }}
                style={{
                  width: "-webkit-fill-available",
                  height: "600px",
                }}
                src={initsrc}
              ></iframe>
            )
          ) : (
            <div>
              <NoMessageForNotification
                title={t("No Availble Instance")}
                desc={t("Please start the server up and refresh current view.")}
              />
            </div>
          )}
        </div>
      </Card>
      <LoggingPanel
        data={viewDetailConsole.logging}
        loading={gstore.static_view_detail_console.logging.loading}
        refresh={() => {
          gutils.api.static.initLoggingData({
            viewDetailConsole,
          });
        }}
      />
    </div>
  );
});
