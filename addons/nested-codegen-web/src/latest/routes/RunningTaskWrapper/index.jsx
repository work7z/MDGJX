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
  Popover,
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
import React, { useEffect } from "react";
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
import { autorun, observable }  from 'mobx';
import gstore from "../../store.jsx";
import "./index.less";
import Simple_table from "../simple_table";
import view_logs_task_utils from "./view_logs_task";

const RunningTaskWrapper = observer(() => {
  let lc_store = useLocalStore(() => {
    return {
      list: [],
    };
  });
  useEffect(() => {
    let a = gutils.run_async_loop(async () => {
      let { content } = await gutils.opt("/ran_task/list");
      lc_store.list = content.tasks;
    }, 1000);
    return () => {
      a();
    };
  }, []);
  return (
    <div>
      <Simple_table
        data={lc_store.list}
        column={[
          {
            label: t("Name"),
            value: (x) => x["name"],
          },
          {
            label: t("Description"),
            value: (x) => t(x["description"]),
          },
          {
            label: t("Status"),
            value: (x) => _.get(x, "configFileAsMap.status"),
          },
          {
            label: t("Port"),
            value: (x) =>
              _.get(x, "configFileAsMap.port") == "null"
                ? ""
                : _.get(x, "configFileAsMap.port"),
          },
          {
            label: t("Message"),
            value: (x) => {
              return (
                <div className="sub-mr-5">
                  <span>
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        gutils.openCodePanel({
                          title: t(`The Further Information`),
                          language: "javascript",
                          subTitle: t(
                            `Updated at {0}`,
                            moment().format("YYYY-MM-DD HH:mm:ss")
                          ),
                          data: gutils.safestr(_.get(x, "configFileAsMap")),
                        });
                      }}
                    >
                      {_.get(x, "configFileAsMap.message")}
                    </a>
                  </span>
                </div>
              );
            },
          },
          {
            label: t("Operation"),
            value: (x) => (
              <div className="sub-mr-5">
                <Button
                  intent="primary"
                  text={t(`Logs`)}
                  onClick={() => {
                    view_logs_task_utils.fn_logDynamic({
                      prop: x.prop,
                    });
                  }}
                ></Button>
                <Button
                  intent="success"
                  text={t(`Start`)}
                  onClick={gutils.wrapErrAlert(async () => {
                    gutils.alert(`Executing the Start operation...`);
                    await gutils.opt("/ran_task/start", {
                      prop: x.prop,
                    });
                    gutils.alertOk(`Done.`);
                  })}
                ></Button>
                <Button
                  intent="danger"
                  text={t(`Stop`)}
                  onClick={gutils.wrapErrAlert(async () => {
                    gutils.alert(`Executing the Stop operation...`);
                    await gutils.opt("/ran_task/stop", {
                      prop: x.prop,
                    });
                    gutils.alertOk(`Done.`);
                  })}
                ></Button>
              </div>
            ),
          },
        ]}
      ></Simple_table>
      <p style={{ marginTop: "12px" }}>
        <Callout title={t(`With regard to the port of internal services`)}>
          {t(
            `If you found some services were unable to be connected, please check your firewall. But if the problem still cannot be solved, please check if you are running our toolbox in the Docker container, if yes, please check whether you set related port mapping configuration.`
          )}
        </Callout>
      </p>
    </div>
  );
});

export default RunningTaskWrapper;
