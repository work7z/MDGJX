
// Date: Fri, 29 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import localforage from "localforage";
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
  HotkeysProvider,
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
  Section,
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
  SectionCard,
} from "@blueprintjs/core";
import { Dot } from "../../utils/cTranslationUtils";
import Blink from "../../components/Blink";
import gutils from "../../utils/GlobalUtils";
import eUtils from "../../utils/ExportUtils";
import AboutSoftware from "../../components/AboutSoftware";
import systemSlice, {
  ACTION_callInitAllDataAtOnceFromInitSystemEnv,
  ACTION_initAllDataAtOnce,
} from "../../reducers/systemSlice";
import { useEffect } from "react";
import { CLZ_SECOND_TEXT } from "../../types/constants";
import ConfirmICON from "../../components/ConfirmICON";
import UserAskMultipleDialogs from "../../containers/UserAskMultipleDialogs";
import ConcurrencyUtils from "../../utils/ConcurrencyUtils";
import { KEY_CONCURRENCY_SYSTEM_INIT } from "../../types/constants";

const InitSystemEnv = () => {
  let sysObj = eUtils.useSelector((val) => ({
    LoadSystemData: val.system.LoadSystemData,
    ProgressText: val.system.SysInitStatus.ProgressText,
    ProgressError: val.system.SysInitStatus.ProgressError,
    HasError: val.system.SysInitStatus.HasError,
    SysInitStatus: val.system.SysInitStatus,
  }));
  const dis = eUtils.dispatch();

  return (
    <div className="pure-g">
      <div className="pure-u-3-5 marginauto">
        <h1>
          {Dot("init_env", "Loading System Resources")}
          <Blink min={2} max={6} interval={500} />
        </h1>
        <div className="bp5-running-text bp5-text-large">
          <p>
            {Dot(
              "run_text",
              "Before entering your workbench, we would like to preload required system resources at first. Please wait for a while, it will be completed soon, whose detail are viewable as below.",
              "LafTools"
            )}
          </p>
          <ul>
            <li>
              {Dot(`i_lang_`, "Language Packs")}
              <ConfirmICON isOK={sysObj.SysInitStatus.IsLangPacksOK} />
            </li>
            <li>
              {Dot(`usr_defined`, `System Preferences`)}
              <ConfirmICON isOK={sysObj.SysInitStatus.IsSystemPrefOK} />
            </li>
            <li>
              {Dot(`sys_updates`, `Latest System Updates`)}
              <ConfirmICON isOK={sysObj.SysInitStatus.IsSystemUpdatesOK} />
            </li>
          </ul>
          <p>
            <b>{Dot(`Z3rhY`, "Message")}: </b>
            <span className={CLZ_SECOND_TEXT}>
              {sysObj.HasError ? sysObj.ProgressError : sysObj.ProgressText}
            </span>
          </p>
          {!sysObj.HasError ? (
            <ProgressBar intent={sysObj.HasError ? "danger" : "none"} />
          ) : (
            <p>{Dot("QzlA3", "An Error Occurred")}</p>
          )}
        </div>
        {sysObj.HasError ? (
          <p className="center align-right">
            <Button
              className="full"
              fill
              intent="danger"
              text={Dot("VSZ", "Click to re-trigger")}
              onClick={() => {
                dis(ACTION_callInitAllDataAtOnceFromInitSystemEnv());
              }}
            ></Button>
          </p>
        ) : (
          ""
        )}
        <div className="mt-20">
          <AboutSoftware />
        </div>
      </div>
    </div>
  );
};

export default InitSystemEnv;
