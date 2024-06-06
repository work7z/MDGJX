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
  MenuItem,
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
  Tabs,
  Tab,
  Icon,
  Card,
  Elevation,
  Button,
} from "@blueprintjs/core";
import { Example, IExampleProps } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { useState } from "react";
import {
  useStores,
  useAsObservableSource,
  useLocalStore,
  useObserver,
} from "mobx-react-lite";
import { Provider, observer, inject } from "mobx-react";
var createHistory = require("history").createBrowserHistory;
import {
  withRouter,
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
var { autorun, observable, reaction } = require("mobx");
import "./index.less";
import { FocusStyleManager } from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";
import SettingWrapper from "../SettingWrapper";
import LoggingWrapper from "../LoggingWrapper";
import HomeWrapper from "../HomeWrapper";
import cstore from "../../store/cstore";
import SystemAlertOrPrompt from "../../../latest/SystemAlertOrPrompt";

let fn_myservice_link = () => {
  return (cstore.forms_data.run_status.access_link + ``).replace(
    `http://127.0.0.1`,
    `${location.protocol}//${location.hostname}`
  );
};
window.fn_myservice_link = fn_myservice_link;

const MainBootFrame = observer((props) => {
  let [tab_idx, onTabIdx] = useState("view");
  let [tab_idx_2, onTabIdx_2] = useState("setting");
  let left_val = 70;
  let common_style = {
    height: "100%",
    overflow: "auto",
    display: "inline-block",
    verticalAlign: "top",
  };
  let m_height = `82px`;
  let run_status = cstore.forms_data.run_status;
  return (
    <div
      className="mainbootframe-wrapper"
      key={cstore.forms_data.updating_ref_lang + " " + cstore.settings.lang}
    >
      <SystemAlertOrPrompt />
      <Card
        style={{
          ...common_style,
          marginRight: "10px",
          width: `calc(${left_val + "%"} - 10px)`,
        }}
      >
        {cstore.desktop.hasDesktop ? (
          <Callout
            style={{ marginBottom: "15px" }}
            icon="desktop"
            intent={"primary"}
            title={t(`CodeGen ToolBox of Desktop Edition`)}
          >
            <p>
              {t(
                `Hi, Dear user, you are currently using the desktop edition. No worries, this page will be redirected to the main service page once that service is carried through by completely initializing the core process.`
              )}
            </p>
            <p>
              {t(
                `On this page, you can capitalize on the system version management mechanism designed from CodeGen ToolBox with joyous and carefree using any version, which means you can upgrade or rollback to any version selected, and all data will be kept without any impact`
              )}
            </p>
          </Callout>
        ) : (
          <Callout
            style={{ marginBottom: "15px" }}
            icon="desktop"
            intent={"primary"}
            title={t(`CodeGen ToolBox of Browser Edition`)}
          >
            <p>
              {t(
                `Hi, Dear user, you are currently using the browser edition. No worries, this page will be redirected to the main service page once that service is carried through by completely initializing the core process.`
              )}
            </p>
            <p>
              {t(
                `On this page, you can capitalize on the system version management mechanism designed from CodeGen ToolBox with joyous and carefree using any version, which means you can upgrade or rollback to any version selected, and all data will be kept without any impact`
              )}
            </p>
          </Callout>
        )}
        <Callout
          intent={
            run_status.starting
              ? "none"
              : run_status.running
              ? "success"
              : run_status.error
              ? "danger"
              : "primary"
          }
          style={{ marginBottom: "15px" }}
          title={
            run_status.starting
              ? t(`Moments please, We're getting everything done...`)
              : run_status.running
              ? t(`CodeGen Local Service is launched successfully!`)
              : run_status.error
              ? t(`An Error Occurred while opearting CodeGen Service`)
              : t(`Welcome to use {0}`, "CodeGen")
          }
          icon={"doughnut-chart"}
        >
          {run_status.starting ? (
            t(
              `CodeGen Local Service is launching, the preliminary will not spend too much time, please wait a moments.`
            )
          ) : run_status.running ? (
            <div
              dangerouslySetInnerHTML={{
                __html: d_mode()
                  ? `${
                      "" +
                      t(
                        `CodeGen Local Service is ready now, the application should be redirected to the main service immediately, if it didn't, please click the direct link {0} to redirect to your the service page.`,
                        `<a href="${fn_myservice_link()}" > ${t(
                          `My Service`
                        )} </a>`
                      ) +
                      ` ${
                        t(
                          `If the service works properly and has no error while using related functions, you can ignore this page. If you find any bug in this version, you can switch to another version and retry it again.`
                        ) +
                        t(
                          `Lastly, if you can report any issue you encountered to us, we would greatly appreciate it.`
                        )
                      }`
                    }`
                  : `${
                      "" +
                      t(
                        `CodeGen Local Service is ready now, your browser should pop a link immediately, if it didn't, please click the direct link {0} to access your local service.`,
                        `<a href="${(
                          cstore.forms_data.run_status.access_link + ``
                        ).replace(
                          `http://127.0.0.1`,
                          `${location.protocol}//${location.hostname}`
                        )}" target="_blank"> ${t(`My Service`)} </a>`
                      ) +
                      ` ${
                        t(
                          `If the service works properly and has no error while using related functions, you can close this page if you like. If you find any bug in this version, you can switch to another version and retry it again.`
                        ) +
                        t(
                          `Lastly, if you can report any issue you encountered to us, we would greatly appreciate it.`
                        )
                      }`
                    }`,
              }}
            ></div>
          ) : run_status.error ? (
            t(
              `If the error was merely caused by new version, you can switch to another version and retry again. Error detail: {0}`,
              run_status.errorContent
            )
          ) : (
            t(
              `This page is used to launch CodeGen local service, you can close this page once codegen service is ready. In addition, you can modify related boot config to tune the performance of CodeGen service in current page as well.`
            ) +
            " " +
            t(
              `Lastly, if you encountered an unexpected error after upgrading to the new version, you can rollback to previous version in this page with ease at any time.`
            )
          )}
        </Callout>
        <Tabs
          id="TabsExample"
          onChange={(e) => {
            onTabIdx(e);
          }}
          selectedTabId={tab_idx}
        >
          <Tab id={"view"} title={t(`Home`)} panel={<HomeWrapper />} />
        </Tabs>
      </Card>
      <Card
        style={{
          ...common_style,
          width: 100 - left_val + "%",
        }}
      >
        <Tabs
          id="TabsExample"
          onChange={(e) => {
            onTabIdx_2(e);
          }}
          selectedTabId={tab_idx_2}
        >
          <Tab
            id={"setting"}
            title={t(`Settings`)}
            panel={<SettingWrapper />}
            panelClassName="ember-panel"
          />
          <Tab
            id={"logging"}
            title={t(`Loggings`)}
            panel={<LoggingWrapper />}
            panelClassName="ember-panel"
          />
        </Tabs>
      </Card>
    </div>
  );
});

export default MainBootFrame;
