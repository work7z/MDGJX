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
  Switch,
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
  Route,
  Link,
  useHistory,
} from "react-router-dom";
var { autorun, observable, reaction } = require("mobx");
import "./index.less";
import { FocusStyleManager } from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";
import HtmlSelect from "../C_HtmlSelect";
import cstore from "../../store/cstore";
import { Slider } from "@blueprintjs/core/lib/cjs/components/slider/slider";
import gapi from "../../utils/gapi";
window.updateFn = () => {
  cstore.forms_data.updating_ref_lang++;
};
const SettingWrapper = observer((props) => {
  let [tab_idx, onTabIdx] = useState("view");
  return (
    <div style={{ padding: "10px" }}>
      <FormGroup
        label={`Language`}
        helperText={t(`This language option works in this launch page only.`)}
      >
        <HtmlSelect
          list={cstore.forms_data.lang}
          value={cstore.settings.lang}
          onChange={(e) => {
            cstore.settings.lang = e.target.value;
            window.changeLang(e.target.value);
            document.title = t(window.FIX_HEADER_VALUE);
          }}
        ></HtmlSelect>
      </FormGroup>
      <FormGroup
        label={t(`Initial Memory Allocation`)}
        helperText={t(
          `This option will determine the initial memory allocation of JVM, please be noted the option cannot greater than maximum memory allocation.`
        )}
      >
        <Slider
          min={100}
          max={cstore.settings.xmx}
          stepSize={50}
          labelStepSize={parseInt(cstore.settings.xmx / 5)}
          onChange={(val) => {
            cstore.settings.xms = val;
          }}
          labelRenderer={(val) => {
            return `${val}M`;
          }}
          value={cstore.settings.xms}
        ></Slider>
      </FormGroup>
      <FormGroup
        label={t(`Maximum Memory Allocation`)}
        helperText={t(
          `This option will determine the maximum memory allocation that CodeGen ToolBox will use, at the same time, please be noted larger maximum memory allocation can augment more rapid performance to you.`
        )}
      >
        <Slider
          min={100}
          max={cstore.settings.max_memory}
          stepSize={50}
          labelStepSize={parseInt("" + cstore.settings.max_memory / 5)}
          onChange={(val) => {
            cstore.settings.xmx = Math.min(val, cstore.settings.max_memory);
            cstore.settings.xms = Math.min(cstore.settings.xms, val);
          }}
          labelRenderer={(val) => {
            return `${val}M`;
          }}
          value={cstore.settings.xmx}
        ></Slider>
      </FormGroup>
      <FormGroup
        label={t(`App Tools`)}
        helperText={t(
          `If you encountered an unexpected error that you cannot handle, please capture logfile by clicking above buttons and contact us privately via e-mail.`
        )}
      >
        <ButtonGroup>
          <Button
            text={t(`Open Version Folder`)}
            onClick={() => {
              gapi.opt(`/nav/open_procedure_dir`);
            }}
          ></Button>
          <Button
            text={t(`Open Log Folder`)}
            onClick={() => {
              gapi.opt(`/nav/open_log_dir`);
            }}
          ></Button>
          {/* <Button
            disabled={!cstore.forms_data.init_all_status}
            onClick={async () => {
              //
            }}
            text={t(`Update Token Value`)}
            intent={`none`}
          ></Button> */}
        </ButtonGroup>
      </FormGroup>
      <FormGroup
        label={t(`Access Management`)}
        helperText={t(
          `If you need clean your traces or update the access token for the launch page you're visiting, please find the buttons above.`
        )}
      >
        <ButtonGroup>
          {/* <AnchorButton
            href={(
              cstore.forms_data.run_status.access_link ||
              "http://127.0.0.1:52012"
            )
              .replace(
                `http://127.0.0.1`,
                `${location.protocol}//${location.hostname}`
              )
              .replace("null", "")
              .replace("/sys/initializer", "")
              .replace("52011", "52012")}
            target="_blank"
            text={t(`My Service`)}
          ></AnchorButton> */}

          <Button
            disabled={!cstore.forms_data.init_all_status}
            onClick={async () => {
              //
              let a = await gapi.win_prompt(
                t(
                  `You are going to update the token for the launch page, if you need to change its token, please input a value and click the continue button, otherwise please click the cancel button.`
                )
              );
              if (a != null) {
                if (("" + a).trim().length == 0) {
                  gutils.alert(
                    t(
                      `Empty Token value is not a good idea, CodeGen had to reject the token value for the sake of your service security`
                    )
                  );
                  return;
                }
                if (
                  a.indexOf("&") != -1 ||
                  a.indexOf("=") != -1 ||
                  a.indexOf("/") != -1 ||
                  a.indexOf('"') != -1 ||
                  a.indexOf(`'`) != -1
                ) {
                  gutils.alert(
                    t(
                      `Token cannot contains special character, such as {0}, please check your input.`,
                      `&=/'"`
                    )
                  );
                  return;
                }
                let b = await gapi.win_prompt(
                  t(`Please input the token value again`)
                );
                if (a != b) {
                  gutils.win_alert(
                    t(`Token value are not matched, exit the process.`)
                  );
                  return;
                } else {
                  let isOk = await gapi.win_confirm(
                    t(
                      `CodeGen needs you to set a complex token value, the more complexity you made, the higher level of security you strengthen, but it depends heavily on you. Would you like to continue? After clicking the continue button, CodeGen will reload this page and ask you to input the latest token value.`
                    ) +
                      t(
                        `If you think the token you defined is too simple to protect your service, please click the cancel button, there's still time, CodeGen will not update the token value unless you click the continue button.`
                      ) +
                      " " +
                      t(`New Token Value: {0}`, b)
                  );
                  if (!isOk) {
                    gutils.alert(t(`Exited by user operation.`));
                    return;
                  }
                  await gapi.opt(`/n_auth/update_token_value`, {
                    newToken: b,
                  });
                  localStorage.removeItem(`LAST_OK_TOKEN`);
                  location.reload();
                }
              }
            }}
            text={t(`Update Token`)}
            intent={`none`}
          ></Button>
          <Button
            disabled={!cstore.forms_data.init_all_status}
            onClick={async () => {
              let b = await gapi.win_confirm(
                t(
                  `This operation will clean these local storage data of the CodeGen launch page, please be noted that CodeGen will clean it for the launch page only, not including the main application page. Do you want to continue?`
                )
              );
              if (b) {
                window.QUIT_NOW = true;
                localStorage.clear();
                setTimeout(() => {
                  localStorage.clear();
                  location.reload();
                }, 1000);
              }
            }}
            text={t(`Clean My Traces`)}
            intent={`none`}
          ></Button>

          <Button
            onClick={async () => {
              let b = await gapi.win_confirm(
                t(
                  `Launch Pad and related service will be shut down. Would you like to continue?`
                )
              );
              if (b) {
                try {
                  await gapi.opt(`/nav/quit_system`);
                } catch (e) {
                  console.log("e", e);
                }
                location.reload();
              }
            }}
            text={t(`Quit System`)}
          ></Button>
        </ButtonGroup>
      </FormGroup>
      <FormGroup label={t(`App Message`)}>
        <p className="bp3-text-small bp3-text-muted">
          {cstore.forms_data.running_text}
        </p>
      </FormGroup>
    </div>
  );
});

export default SettingWrapper;
