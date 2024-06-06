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
import $ from "jquery";
import { useState } from "react";
import querystring from "querystring";
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
import gapi from "../../utils/gapi";
import cstore from "../../store/cstore";
import HtmlSelect from "../C_HtmlSelect";
window.Qs = querystring;
let read_obj = {};
let save_fn_for_setting = async () => {
  cstore.forms_data.running_text = t(`Saving the user settings into system...`);
  await gapi.opt(`/nav/save_settings`, {
    settings: cstore.settings,
  });
  cstore.forms_data.running_text = t(`Saved the user settings`);
};
let fn_init_all_data_and_boot = async () => {
  autorun(save_fn_for_setting);

  gapi.run_async_loop(async () => {
    let {
      data: {
        content: { status, output_str, output_len },
      },
    } = await gapi.opt(`/nav/get_service_status`);
    if (!_.isEmpty(status)) {
      cstore.forms_data.run_status = status;
    } else {
      cstore.forms_data.run_status = cstore.forms_data.fn_init_status();
      read_obj = {};
    }
    if (
      cstore.forms_data.run_status.access_link &&
      _.isNil(read_obj[cstore.forms_data.run_status.access_link])
    ) {
      read_obj[cstore.forms_data.run_status.access_link] = "read";
      // window.open(cstore.forms_data.run_status.access_link);
      if (d_mode()) {
        gapi.runOnceOnly("markAccessLink", () => {
          if (location.href.indexOf(`action=restart_server`) != -1) {
          } else {
            if (
              !cstore.forms_data.run_status.error &&
              cstore.forms_data.run_status.running &&
              location.href != cstore.forms_data.run_status.access_link
            ) {
              location.href = cstore.forms_data.run_status.access_link;
            }
          }
        });
      }
    }
    if (_.isNil(window.checking_fields_value)) {
      window.checking_fields_value = [];
      if (
        !cstore.forms_data.run_status.starting &&
        !cstore.forms_data.run_status.running
      ) {
        await gapi.opt(`/nav/auto_start_service`, {
          boot_version: cstore.settings.boot_version,
        });
      }
      if (location.href.indexOf(`action=restart_server`) != -1) {
        try {
          let myobj = Qs.parse(
            location.href.substring(location.href.indexOf(`?`) + 1)
          );
          if (_.isEmpty(myobj.version)) {
            gapi.win_alert(`Version cannot be empty!`);
          } else {
            cstore.settings.boot_version = myobj.version;
            await save_fn_for_setting();
            await gapi.opt(`/nav/auto_restart_service`, {
              boot_version: cstore.settings.boot_version,
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    if (output_len != cstore.forms_data.output_len) {
      cstore.forms_data.output_len = output_len;
      cstore.forms_data.output_str = _.chain(output_str)
        .split("\n")
        .map((x) => {
          let style_str = `style=""`;
          if (
            x.indexOf(`[ERROR]`) != -1 ||
            x.indexOf(`npm verb audit error`) != -1
          ) {
            style_str = `style="color:var(--app-text-red);"`;
          }
          if (x.indexOf(`[SUCC]`) != -1) {
            style_str = `style="color:var(--app-text-green);"`;
          }
          if (x.indexOf(`[EXEC]`) != -1) {
            style_str = `style="color:var(--app-text-purple);"`;
          }
          if (x.startsWith("http://127")) {
            x = `<a href="${x.replace(
              `http://127.0.0.1`,
              `${location.protocol}//${location.hostname}`
            )}" target="_blank">${x}</a>`;
          }
          x = `<div ${style_str}>${x}</div>`;
          return `<div>${x}</div>`;
        })
        .join(``)
        .value();
      gutils.defer(() => {
        let $a = $(`#logbody`);
        if ($a && $a[0]) {
          $a.scrollTop($a[0].scrollHeight);
        }
      });
    }
    if (!cstore.forms_data.init_all_status) {
      cstore.forms_data.init_all_status = true;
    }
  }, 800);
};

let VersionList = observer((props) => {
  const [loading, onLoading] = useState(true);
  useEffect(() => {
    let n_1 = async () => {
      let {
        data: {
          content: { filepath },
        },
      } = await gapi.opt(`/nav/list_all_versions`);
      cstore.forms_data.version_list = filepath;
      if (
        _.isNil(cstore.settings.boot_version) ||
        _.findIndex(
          cstore.forms_data.version_list,
          (x) => x.value == cstore.settings.boot_version
        ) == -1
      ) {
        cstore.settings.boot_version = _.get(
          cstore.forms_data.version_list,
          "0.value"
        );
      }
      if (loading) {
        onLoading(false);
      }
      if (!cstore.forms_data.is_check_init_before) {
        cstore.forms_data.is_check_init_before = true;
        fn_init_all_data_and_boot();
      }
    };
    gapi.run_async_loop(n_1, 3000);
    window.refresh_obj["n_1"] = n_1;
  }, []);
  if (loading) {
    return <div>{t(`Loading...`)}</div>;
  }
  return (
    <ul>
      {_.map(cstore.forms_data.version_list, (x, d, n) => {
        let is_crt_item = x.value == cstore.settings.boot_version;
        return (
          <li
            key={x.value}
            style={{
              color: is_crt_item ? `var(--app-text-info-cadet)` : ``,
            }}
          >
            <a
              style={{}}
              href="javascript:void(0);"
              onClick={() => {
                // selecting the prop x.value
                cstore.settings.boot_version = x.value;
              }}
            >
              {x.label + `${is_crt_item ? "*" : ""}`}
            </a>
          </li>
        );
      })}
    </ul>
  );
});

const HomeFormControls = observer((props) => {
  const [loading, onLoading] = useState(false);
  return (
    <div className="sub-mr-5" style={{ padding: "10px" }}>
      <HtmlSelect
        list={cstore.forms_data.version_list}
        value={cstore.settings.boot_version}
        onChange={(e) => {
          cstore.settings.boot_version = e.target.value;
        }}
      />
      {cstore.forms_data.run_status.running ? (
        <AnchorButton
          href={
            window.fn_myservice_link && _.isFunction(window.fn_myservice_link)
              ? window.fn_myservice_link()
              : null
          }
          text={t(`Enter Service`)}
          intent={"primary"}
        ></AnchorButton>
      ) : (
        ""
      )}
      <Button
        disabled={!cstore.forms_data.init_all_status}
        text={t(
          cstore.forms_data.run_status.error
            ? "Restart Service"
            : cstore.forms_data.run_status.running
            ? `Stop Service`
            : cstore.forms_data.run_status.starting
            ? `Stop Initializing Service`
            : `Start Service`
        )}
        intent={
          cstore.forms_data.run_status.error ||
          cstore.forms_data.run_status.starting
            ? "warning"
            : cstore.forms_data.run_status.running
            ? "danger"
            : `primary`
        }
        loading={loading}
        onClick={async () => {
          onLoading(true);
          if (cstore.forms_data.run_status.error) {
            await gapi.opt(`/nav/restart_service`);
          } else if (
            cstore.forms_data.run_status.starting ||
            cstore.forms_data.run_status.running
          ) {
            await gapi.opt(`/nav/stop_service`);
          } else {
            await gapi.opt(`/nav/start_service`);
          }
          onLoading(false);
        }}
      ></Button>
      <Button
        disabled={!cstore.forms_data.init_all_status}
        onClick={async () => {
          let all = [];
          _.forEach(window.refresh_obj, (x, d, n) => {
            all.push(x());
          });
          for (let a of all) {
            await a;
          }
          gapi.alert({
            intent: "success",
            message: t(`Refreshed.`),
          });
        }}
        text={t(`Refresh Status`)}
        intent={`none`}
      ></Button>
    </div>
  );
});

const HomeWrapper = observer((props) => {
  let [tab_idx, onTabIdx] = useState("view");
  let leftVersionListWidth = "250px";
  return (
    <div
      style={{
        // display: "flex",
        // justifyContent: "space-between",
        // alignItems: "center",
        border: `1px solid var(--app-border-white-s3)`,
        width: "100%",
        height: "100%",
      }}
    >
      <div
        className="home-left-main-body"
        style={{
          width: leftVersionListWidth,
          height: "100%",
          display: "inline-block",
          verticalAlign: "top",
          overflow: "auto",
          padding: "10px",
          paddingLeft: "22px",
        }}
      >
        <h4>{t(`All Version of CodeGen`)}</h4>
        <VersionList />
      </div>
      <div
        className="home-right-main-body"
        style={{
          borderLeft: `1px solid var(--app-border-white-s3)`,
          width: `calc(100% - ${leftVersionListWidth} - 1px)`,
          height: "100%",
          display: "inline-block",
          verticalAlign: "top",
          overflow: "auto",
        }}
      >
        <HomeFormControls />
        <div className="bp3-monospace-text bp3-text-small bp3-text-muted">
          <div
            id="logbody"
            style={{
              maxHeight: "40vh",
              overflow: "auto",
              margin: "10px",
            }}
            className="home-output-logging-body"
            dangerouslySetInnerHTML={{ __html: cstore.forms_data.output_str }}
          ></div>
        </div>
      </div>
    </div>
  );
});

export default HomeWrapper;
