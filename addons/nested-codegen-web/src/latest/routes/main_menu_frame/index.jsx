import {
  Tag,
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Menu,
  MenuItem,
  MenuDivider,
  Drawer,
  RangeSlider,
  Popover,
  Overlay,
  Alert,
  RadioGroup,
  Radio,
  ButtonGroup,
  Text,
  TextArea,
  Intent,
  Position,
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
  Spinner,
} from "@blueprintjs/core";
import * as BluePrintCpt from "@blueprintjs/core";
import { Example,  } from "@blueprintjs/docs-theme";
import * as BluePrintDocs from "@blueprintjs/docs-theme";
window.BluePrintCpt = BluePrintCpt;
window.BluePrintDocs = BluePrintDocs;
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import * as BluePrintTable from "@blueprintjs/table";
import * as BluePrintDateTime from "@blueprintjs/datetime";
import * as BluePrintTimeZone from "@blueprintjs/timezone";
import React from "react";
import ReactDOM from "react-dom";
import gutils from "../../utils";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  useMemo,
} from "react";

import * as MobxReactLite from "mobx-react-lite";
import * as MobxReact from "mobx-react";
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
// import "moment/locale/zh-cn";
// import "moment/locale/zh-hk";
import { autorun, observable }  from 'mobx';
// var Mobx = require("mobx");
import gstore from "../../store.jsx";
import "./index.less";
import MainFrameLeft from "../main_menu_frame_left/index";
import MainFrameRight from "../main_menu_frame_right/index";
import * as BluePrintPopover from "@blueprintjs/popover2";
import { Tooltip2 } from "@blueprintjs/popover2";
import OperationPanel from "../../components/OperationPanel";
import GEditor from "../../components/GEditor";
import HalfResizeForTwoHorizontal from "../../components/HalfResizeForTwoHorizontal";
import Blink from "../../components/Blink";
import HalfResizeForTwo from "../../components/HalfResizeForTwo";
import GFormSelect from "../../components/GFormSelect";
import _ from "lodash";
// import * as Xterm from "xterm";
// import "xterm/css/xterm.css";
import GTabs from "../../components/GTabs";
import BeautifyCodeCommon from "../../components/BeautifyCodeCommon";
import prettier from "prettier/esm/standalone.mjs";
import parserGraphql from "prettier/esm/parser-graphql.mjs";
import parserAngular from "prettier/esm/parser-angular.mjs";
import parserFlow from "prettier/esm/parser-flow.mjs";
import parserEspree from "prettier/esm/parser-espree.mjs";
import parserGlimmer from "prettier/esm/parser-glimmer.mjs";
import parserMarkdown from "prettier/esm/parser-markdown.mjs";
import parserPostcss from "prettier/esm/parser-postcss.mjs";
import parserTypescript from "prettier/esm/parser-typescript.mjs";
import parserYaml from "prettier/esm/parser-yaml.mjs";
import parserMeriyah from "prettier/esm/parser-meriyah.mjs";
import parserHtml from "prettier/esm/parser-html.mjs";
import xmlutils from "../../components/XMLOtherCommon/xml.jsx";
import GSyncSelectWithFilter from "../../components/GSyncSelectWithFilter";
import Html_select from "../../components/html_select";
import MultipleLinesEditWithButton from "../../components/MultipleLinesEditWithButton";
import GFormSwitch from "../../components/GFormSwitch";
import * as MathJS from "mathjs";
// import { AttachAddon } from "xterm-addon-attach";
// import { FitAddon } from "xterm-addon-fit";
import CallOutWithKeep from "../../components/CallOutWithKeep";
import CallOutAndView from "../../components/CallOutAndView";
import DbLinkConnectionSelect from "../../components/DbLinkConnectionSelect";
import TextAreaWithExample from "../../components/TextAreaWithExample";
import LocalProjectBtnWithPanel from "../../components/LocalProjectBtnWithPanel";
import Settings_library from "../../routes/settings_library";
import NoMessageForNotification from "../../components/NoMessageForNotification";
import GFormInput from "../../components/GFormInput";
import {
  atan2,
  chain,
  derivative,
  e,
  evaluate,
  log,
  pi,
  pow,
  round,
  sqrt,
} from "mathjs";
import GFormSlider from "../../components/GFormSlider";
import MinusButton from "../../components/MinusButton";
import { LocaleUtils } from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";

import { HotkeysTarget2 } from "@blueprintjs/core";

import { CodeGenDefinition } from "./im";
import ScrollMemWrapper from "./ScrollMemWrapper";

const NoteForNewUser = observer(() => {
  return ''
  let padVal = "55px";
  return (
    <div
      style={{
        opacity: 0.5,
        textAlign: "right",
        userSelect: "none",
        position: "fixed",
        right: "65px",
        bottom: padVal,
        zIndex: 99999,
        display: gstore.licenseConfig.drawer.open
          ? "none"
          : not_reg()
          ? null
          : "none",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>{t("Activate CodeGen ToolBox")}</h2>
      <h4 style={{ marginTop: "0px" }}>
        {t("Full Features Are Waiting For You, Let's Go Together!")}
      </h4>
    </div>
  );
});
export default observer(() => {
  let finalClz =
    "main-frame-box " +
    (gstore.localSettings.isLeftMenuOpen &&
    !gstore.localSettings.app_multiple_tab_mode
      ? "sys-menu-open"
      : "sys-menu-close") +
    " " +
    (gstore.localSettings.hasTopNav ? "" : " no-top-nav-view ") +
    (gstore.localSettings.hasTopSubNav ? "" : " no-top-sub-nav-view ") +
    (gstore.localSettings.noPanelPadValue ? "" : " no-pad-panel-view ") +
    " " +
    "g-fix-" +
    _.chain(gstore.settings.appViewTypeArr.get())
      .find((x) => x.value == gstore.localSettings.appTypeView)
      .get("id")
      .value() +
    " " +
    (gstore.sysinfo.keepFullScrollPageArr.indexOf(
      gstore.sysinfo.latestRoutePath
    ) != -1
      ? " my-sys-scroll-page "
      : " my-sys-fix-page ");
  let resJsx = (
    <div
      className={
        finalClz +
        ` ${
          gstore.localSettings.app_multiple_tab_mode
            ? " app_multiple_tab_mode_wrapper "
            : ""
        }`
      }
      style={{
        margin: gstore.localSettings.app_multiple_tab_mode ? "0px" : null,
      }}
      // onKeyDown={handleKeyDown}
      // onKeyUp={handleKeyUp}
    >
      {gstore.localSettings.app_multiple_tab_mode ? (
        ""
      ) : (
        <MainFrameLeft></MainFrameLeft>
      )}
      <MainFrameRight></MainFrameRight>
      <NoteForNewUser></NoteForNewUser>
    </div>
  );
  return resJsx;
});
