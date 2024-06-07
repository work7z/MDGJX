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
  Collapse,
  PopoverInteractionKind,
  RangeSlider,
  Popover,
  Overlay,
  H1,
  H2,
  H3,
  H4,
  H5,
  Alert,
  RadioGroup,
  Radio,
  EditableText,
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
import { Provider, observer, inject, useLocalStore } from "mobx-react";

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
import jszip from "jszip";
window.jszip = jszip;
window.JSZIP = jszip;


// Editor, {
//   DiffEditor,
//   useMonaco,
//   loader,
//   monaco,
// }
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
import { MultiSelect } from "@blueprintjs/select";
import "xterm/css/xterm.css";
import GTabs from "../../components/GTabs";
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
import CallOutWithKeep from "../../components/CallOutWithKeep";
import CallOutAndView from "../../components/CallOutAndView";
import DbLinkConnectionSelect from "../../components/DbLinkConnectionSelect";
import TextAreaWithExample from "../../components/TextAreaWithExample";
import LocalProjectBtnWithPanel from "../../components/LocalProjectBtnWithPanel";
import Settings_library from "../../routes/settings_library";
import NoMessageForNotification from "../../components/NoMessageForNotification";
import GFormInput from "../../components/GFormInput";
// xterm begins
import * as Xterm from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";
import { WebLinksAddon } from "xterm-addon-web-links";
import { SerializeAddon } from "xterm-addon-serialize";
import { CanvasAddon } from "xterm-addon-canvas";
import { AttachAddon } from "xterm-addon-attach";
import zmodem from "zmodem.js/src/zmodem_browser";
import { Unicode11Addon } from "xterm-addon-unicode11";
_.merge(window, {
  Xterm,
  FitAddon,
  SearchAddon,
  WebLinksAddon,
  SerializeAddon,
  CanvasAddon,
  zmodem,
  AttachAddon,
  Unicode11Addon,
});
// xterm ends
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
// import * as RVReactVirtualized from "react-virtualized";

import * as EXT_MONACO_ALL_REACT from "@monaco-editor/react";

window.worknow = {
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
};

window.MathJS = MathJS;

let CodeGenDefinition = (window.CodeGenDefinition = {
  H1,
  H2,
  H3,
  H4,
  H5,
  EditableText,
  Example: Example,
  FitAddon,
  AttachAddon,
  WebLinksAddon,
  SearchAddon,
  BluePrintDateTime,
  BluePrintTimeZone,
  NoMessageForNotification,
  Settings_library,
  MathJS,
  CallOutAndView,
  CallOutWithKeep,
  LocalProjectBtnWithPanel,
  HalfResizeForTwo,
  EXT_MONACO_ALL_REACT,
  GFormSlider,
  prettier,
  Collapse,
  xmlutils,
  Html_select,
  GSyncSelectWithFilter,
  useLocalStore,
  DbLinkConnectionSelect,
  TextAreaWithExample,
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GFormInput,
  GEditor,
  OperationPanel,
  BluePrintPopover,
  // Mobx: EXT_mobx,
  MobxReact,
  MobxReactLite,
  Callout,
  PanelStack,
  GTabs,
  ProgressBar,
  AnchorButton,
  Tooltip,
  MultipleLinesEditWithButton,
  Dialog,
  Drawer,
  Popover,
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
  PopoverInteractionKind,
  ContextMenu,
  NumericInput,
  FormGroup,
  HTMLSelect,
  ControlGroup,
  observer,
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
  Tag,
  PanelStack2,
  Spinner,
  MomentLocaleUtils,
  MinusButton,
  Callout,
  PanelStack,
  gstore,
  MultiSelect,
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
  LocaleUtils,
  Toaster,
  Popover,
  Menu,
  MenuItem,
  MenuDivider,
  Checkbox,
  NumericInput,
  FormGroup,
  HTMLSelect,
  ControlGroup,
  GFormSwitch,
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
  BluePrintTable,
  autorun,
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
  BluePrintDocs,
  BluePrintCpt,
  BluePrintTable,
  gstore,
  observable,
  ReactDOM,
  useEffect,
  useRef,
  useCallback,
  useContext,
  RangeSlider,
  useMemo,
  useState,
  Text,
  Provider,
  Router,
  inject,
  Switch,
  Route,
  Link,
  useHistory,
  fn_constants: () => {
    return window.constants;
  },
});

// console.log("gutils", gutils, CodeGenDefinition, window.gutils);


export { CodeGenDefinition };
