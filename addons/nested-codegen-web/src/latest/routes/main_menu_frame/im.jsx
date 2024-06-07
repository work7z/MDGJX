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
  NumberRange,
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
import { Example, IExampleProps } from "@blueprintjs/docs-theme";
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
import * as EXT_MONACO_ALL_REACT from "@monaco-editor/react";
import jszip from "jszip";
window.jszip = jszip;
window.JSZIP = jszip;
// import * as EXT_MONACO_ALL_EDITOR from "@monaco-editor";

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
import {
  useStores,
  useAsObservableSource,
  useLocalStore,
  useObserver,
} from "mobx-react-lite";
import * as MobxReactLite from "mobx-react-lite";
import * as MobxReact from "mobx-react";
import { Provider, observer, inject } from "mobx-react";
var createHistory = require("history").createBrowserHistory;
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
var { autorun, observable } = require("mobx");
var Mobx = require("mobx");
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

// SPLIT
import * as EXT_calculate_text_width from "calculate-text-width";
import * as EXT_crypto_js from "crypto-js";
import * as EXT_lodash from "lodash";
import * as EXT_mathjs from "mathjs";
import * as EXT_mobx from "mobx";
import * as EXT_mobx_react from "mobx-react";
import * as EXT_mobx_react_lite from "mobx-react-lite";
import * as EXT_moment from "moment";
import * as EXT_monaco_themes from "monaco-themes";
import * as EXT_number_to_chinese_words from "number-to-chinese-words";
import * as EXT_number_to_words from "number-to-words";
import * as EXT_pinyin_engine from "pinyin-engine";
import * as EXT_prettier from "prettier";
import * as EXT_querystring from "querystring";
import * as EXT_rc_tabs from "rc-tabs";
import * as EXT_re_resizable from "re-resizable";
import * as EXT_react from "react";
import * as EXT_react_dnd from "react-dnd";
import * as EXT_react_dnd_html5_backend from "react-dnd-html5-backend";
import * as EXT_react_dom from "react-dom";
import * as EXT_react_draggable from "react-draggable";
import * as EXT_react_router from "react-router";
import * as EXT_react_router_config from "react-router-config";
import * as EXT_react_router_dom from "react-router-dom";
// import * as EXT_react_virtualized from "react-virtualized";
// import * as EXT_xterm from "xterm";

// ROUTES
import ROUTE_AboutTheSoftware from "../../routes/AboutTheSoftware";
import ROUTE_CommonLoadPage from "../../routes/CommonLoadPage";
import ROUTE_DeskTopView from "../../routes/DeskTopView";
import ROUTE_NotificationPanel from "../../routes/NotificationPanel";
import ROUTE_PanelWithTitleView from "../../routes/PanelWithTitleView";
import ROUTE_PlainVisualTable from "../../routes/PlainVisualTable";
import ROUTE_PluginLoadView from "../../routes/PluginLoadView";
import ROUTE_SoftwareUpdates from "../../routes/SoftwareUpdates";
import ROUTE_TokenPatch from "../../routes/TokenPatch";
import ROUTE_WrapError from "../../routes/WrapError";
import ROUTE_alert_for_proxy_delete from "../../routes/alert_for_proxy_delete";
import ROUTE_alert_for_static_delete from "../../routes/alert_for_static_delete";
import ROUTE_dblink_conn_list from "../../routes/dblink_conn_list";
import ROUTE_dblink_data_overview from "../../routes/dblink_data_overview";
import ROUTE_dblink_data_startpage from "../../routes/dblink_data_startpage";
import ROUTE_dblink_global_view from "../../routes/dblink_global_view";
import ROUTE_dblink_tab_overview from "../../routes/dblink_tab_overview";
import ROUTE_dialog_common from "../../routes/dialog_common";
import ROUTE_drawer_for_settings from "../../routes/drawer_for_settings";
import ROUTE_example from "../../routes/example";
import ROUTE_handling from "../../routes/handling";
import ROUTE_loadService from "../../routes/loadService";
import ROUTE_loading from "../../routes/loading";
import ROUTE_main from "../../routes/main";
import ROUTE_main_menu_frame from "../../routes/main_menu_frame";
import ROUTE_main_menu_frame_left from "../../routes/main_menu_frame_left";
import ROUTE_main_menu_frame_right from "../../routes/main_menu_frame_right";
import ROUTE_main_navbar from "../../routes/main_navbar";
import ROUTE_overlay_example from "../../routes/overlay_example";
import ROUTE_overlay_for_add_new_conn from "../../routes/overlay_for_add_new_conn";
import ROUTE_overlay_for_add_new_folder from "../../routes/overlay_for_add_new_folder";
import ROUTE_overlay_for_add_new_local_project from "../../routes/overlay_for_add_new_local_project";
import ROUTE_overlay_for_add_proxy_rule from "../../routes/overlay_for_add_proxy_rule";
import ROUTE_overlay_for_add_proxy_rule_path_rewrite from "../../routes/overlay_for_add_proxy_rule_path_rewrite";
import ROUTE_overlay_for_add_proxy_server from "../../routes/overlay_for_add_proxy_server";
import ROUTE_overlay_for_add_static_server from "../../routes/overlay_for_add_static_server";
import ROUTE_overlay_for_alertaction from "../../routes/overlay_for_alertaction";
import ROUTE_overlay_for_conn_recent_scripts from "../../routes/overlay_for_conn_recent_scripts";
import ROUTE_overlay_for_create_workspace from "../../routes/overlay_for_create_workspace";
import ROUTE_overlay_for_enter_private_key from "../../routes/overlay_for_enter_private_key";
import ROUTE_overlay_for_local_password from "../../routes/overlay_for_local_password";
import ROUTE_overlay_for_manage_workspace from "../../routes/overlay_for_manage_workspace";
import ROUTE_overlay_for_rollback_version from "../../routes/overlay_for_rollback_version";
import ROUTE_overlay_for_update_tab_name from "../../routes/overlay_for_update_tab_name";
import ROUTE_overlay_for_user_info_login from "../../routes/overlay_for_user_info_login";
import ROUTE_overlay_for_user_panel from "../../routes/overlay_for_user_panel";
import ROUTE_overlay_playground from "../../routes/overlay_playground";
import ROUTE_prelimnary from "../../routes/prelimnary";
import ROUTE_proxy_server_added from "../../routes/proxy_server_added";
import ROUTE_proxy_server_view from "../../routes/proxy_server_view";
// import ROUTE_selfCpt from "../../routes/selfCpt";
import ROUTE_settings_appearance from "../../routes/settings_appearance";
import ROUTE_settings_editor from "../../routes/settings_editor";
import ROUTE_settings_general from "../../routes/settings_general";
import ROUTE_settings_library from "../../routes/settings_library";
import ROUTE_settings_preferences from "../../routes/settings_preferences";
import ROUTE_settings_support from "../../routes/settings_support";
import ROUTE_simple_table from "../../routes/simple_table";
import ROUTE_static_server_added from "../../routes/static_server_added";
import ROUTE_static_server_view from "../../routes/static_server_view";
// CPT
import CPT_Beautify from "../../components/Beautify";
import CPT_BeautifyCodeCommon from "../../components/BeautifyCodeCommon";
import CPT_BeautifyGraphql from "../../components/BeautifyGraphql";
import CPT_BeautifyHtml from "../../components/BeautifyHtml";
import CPT_BeautifyOtherCommon from "../../components/BeautifyOtherCommon";
import CPT_BeautifyXml from "../../components/BeautifyXml";
import CPT_Blink from "../../components/Blink";
import CPT_CallOutAndView from "../../components/CallOutAndView";
import CPT_CallOutWithKeep from "../../components/CallOutWithKeep";
import CPT_CaseLogicPage from "../../components/CaseLogicPage";
import CPT_CodecOtherCommon from "../../components/CodecOtherCommon";
import CPT_CurrentServicePanel from "../../components/CurrentServicePanel";
import CPT_DbLinkConnectionSelect from "../../components/DbLinkConnectionSelect";
import CPT_DefinePanelWithBar from "../../components/DefinePanelWithBar";
import CPT_DownloadStatus from "../../components/DownloadStatus";
import CPT_GButton from "../../components/GButton";
import CPT_GDataTable from "../../components/GDataTable";
import CPT_GEditor from "../../components/GEditor";
import CPT_GFileSettingViewer from "../../components/GFileSettingViewer";
import CPT_GForm2Wrapper from "../../components/GForm2Wrapper";
import CPT_GFormBoundView from "../../components/GFormBoundView";
import CPT_GFormCheckbox from "../../components/GFormCheckbox";
import CPT_GFormFilePathSelect from "../../components/GFormFilePathSelect";
import CPT_GFormInput from "../../components/GFormInput";
import CPT_GFormSelect from "../../components/GFormSelect";
import CPT_GFormSlider from "../../components/GFormSlider";
import CPT_GFormSwitch from "../../components/GFormSwitch";
import CPT_GSyncSelectWithFilter from "../../components/GSyncSelectWithFilter";
import CPT_GTabCentreView from "../../components/GTabCentreView";
import CPT_GTabs from "../../components/GTabs";
import CPT_GTree from "../../components/GTree";
import CPT_GenLogicPage from "../../components/GenLogicPage";
import CPT_HalfResizeForThreeHorizontal from "../../components/HalfResizeForThreeHorizontal";
import CPT_HalfResizeForTwo from "../../components/HalfResizeForTwo";
import CPT_HalfResizeForTwoHorizontal from "../../components/HalfResizeForTwoHorizontal";
import CPT_Home from "../../components/Home";
import CPT_InternalLeftEditor from "../../components/InternalLeftEditor";
import CPT_JsonOtherCommon from "../../components/JsonOtherCommon";
import CPT_LoadingShortPanel from "../../components/LoadingShortPanel";
import CPT_LocalProject from "../../components/LocalProject";
import CPT_LocalProjectBtnWithPanel from "../../components/LocalProjectBtnWithPanel";
import CPT_LocalProjectSelect from "../../components/LocalProjectSelect";
import CPT_LoggingPanel from "../../components/LoggingPanel";
import CPT_MinusButton from "../../components/MinusButton";
import CPT_MultipleLinesEditWithButton from "../../components/MultipleLinesEditWithButton";
import CPT_NoMessageForNotification from "../../components/NoMessageForNotification";
import CPT_NoUseCrtTable from "../../components/NoUseCrtTable";
import CPT_NotesClipboard from "../../components/NotesClipboard";
import CPT_NotesSnippet from "../../components/NotesSnippet";
import CPT_OperationPanel from "../../components/OperationPanel";
import CPT_OutputFileExplorer from "../../components/OutputFileExplorer";
import CPT_RandomLogicPage from "../../components/RandomLogicPage";
import CPT_RightMainInternalPage from "../../components/RightMainInternalPage";
import CPT_SelfIconButton from "../../components/SelfIconButton";
import CPT_SoftwareDetailView from "../../components/SoftwareDetailView";
import CPT_TerminalView from "../../components/TerminalView";
import CPT_TextAreaWithExample from "../../components/TextAreaWithExample";
import CPT_TextCompare from "../../components/TextCompare";
import CPT_TextSearch from "../../components/TextSearch";
import CPT_TimeLogicPage from "../../components/TimeLogicPage";
import CPT_TransOtherCommon from "../../components/TransOtherCommon";
import CPT_ViewListWrapper from "../../components/ViewListWrapper";
import CPT_VirtualBigDataLineContainer from "../../components/VirtualBigDataLineContainer";
import CPT_VisualControlDataTable from "../../components/VisualControlDataTable";
import CPT_XMLOtherCommon from "../../components/XMLOtherCommon";
import CPT_control_Pagination from "../../components/control_Pagination";
import CPT_control_bar from "../../components/control_bar";
import CPT_control_table from "../../components/control_table";
import CPT_html_select from "../../components/html_select";
import CPT_tree from "../../components/tree";

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
  ROUTE_AboutTheSoftware,
  ROUTE_CommonLoadPage,
  ROUTE_DeskTopView,
  ROUTE_NotificationPanel,
  ROUTE_PanelWithTitleView,
  ROUTE_PlainVisualTable,
  ROUTE_PluginLoadView,
  ROUTE_SoftwareUpdates,
  ROUTE_TokenPatch,
  EditableText,
  ROUTE_WrapError,
  ROUTE_alert_for_proxy_delete,
  ROUTE_alert_for_static_delete,
  ROUTE_dblink_conn_list,
  ROUTE_dblink_data_overview,
  ROUTE_dblink_data_startpage,
  ROUTE_dblink_global_view,
  ROUTE_dblink_tab_overview,
  ROUTE_dialog_common,
  ROUTE_drawer_for_settings,
  ROUTE_example,
  Example: Example,
  ROUTE_handling,
  ROUTE_loadService,
  ROUTE_loading,
  ROUTE_main,
  ROUTE_main_menu_frame,
  ROUTE_main_menu_frame_left,
  ROUTE_main_menu_frame_right,
  ROUTE_main_navbar,
  ROUTE_overlay_example,
  ROUTE_overlay_for_add_new_conn,
  ROUTE_overlay_for_add_new_folder,
  ROUTE_overlay_for_add_new_local_project,
  ROUTE_overlay_for_add_proxy_rule,
  ROUTE_overlay_for_add_proxy_rule_path_rewrite,
  ROUTE_overlay_for_add_proxy_server,
  ROUTE_overlay_for_add_static_server,
  ROUTE_overlay_for_alertaction,
  ROUTE_overlay_for_conn_recent_scripts,
  ROUTE_overlay_for_create_workspace,
  ROUTE_overlay_for_enter_private_key,
  ROUTE_overlay_for_local_password,
  ROUTE_overlay_for_manage_workspace,
  ROUTE_overlay_for_rollback_version,
  ROUTE_overlay_for_update_tab_name,
  ROUTE_overlay_for_user_info_login,
  ROUTE_overlay_for_user_panel,
  ROUTE_overlay_playground,
  ROUTE_prelimnary,
  ROUTE_proxy_server_added,
  ROUTE_proxy_server_view,
  // ROUTE_selfCpt,
  ROUTE_settings_appearance,
  ROUTE_settings_editor,
  ROUTE_settings_general,
  ROUTE_settings_library,
  ROUTE_settings_preferences,
  ROUTE_settings_support,
  ROUTE_simple_table,
  ROUTE_static_server_added,
  ROUTE_static_server_view,
  EXT_calculate_text_width,
  EXT_crypto_js,
  EXT_lodash,
  EXT_mathjs,
  EXT_mobx,
  EXT_mobx_react,
  EXT_mobx_react_lite,
  EXT_moment,
  EXT_monaco_themes,
  EXT_number_to_chinese_words,
  EXT_number_to_words,
  EXT_pinyin_engine,
  EXT_prettier,
  EXT_querystring,
  EXT_rc_tabs,
  EXT_re_resizable,
  EXT_MONACO_ALL_REACT,
  EXT_react,
  EXT_react_dnd,
  EXT_react_dnd_html5_backend,
  EXT_react_dom,
  EXT_react_draggable,
  EXT_react_router,
  EXT_react_router_config,
  EXT_react_router_dom,
  EXT_react_virtualized,
  // EXT_xterm,
  CPT_Beautify,
  CPT_BeautifyCodeCommon,
  CPT_BeautifyGraphql,
  CPT_BeautifyHtml,
  CPT_BeautifyOtherCommon,
  CPT_BeautifyXml,
  CPT_Blink,
  CPT_CallOutAndView,
  CPT_CallOutWithKeep,
  CPT_CaseLogicPage,
  CPT_CodecOtherCommon,
  CPT_CurrentServicePanel,
  CPT_DbLinkConnectionSelect,
  CPT_DefinePanelWithBar,
  CPT_DownloadStatus,
  CPT_GButton,
  CPT_GDataTable,
  CPT_GEditor,
  CPT_GFileSettingViewer,
  CPT_GForm2Wrapper,
  CPT_GFormBoundView,
  CPT_GFormCheckbox,
  CPT_GFormFilePathSelect,
  CPT_GFormInput,
  CPT_GFormSelect,
  CPT_GFormSlider,
  CPT_GFormSwitch,
  CPT_GSyncSelectWithFilter,
  CPT_GTabCentreView,
  CPT_GTabs,
  CPT_GTree,
  // EXT_MONACO_ALL_EDITOR,
  CPT_GenLogicPage,
  CPT_HalfResizeForThreeHorizontal,
  CPT_HalfResizeForTwo,
  CPT_HalfResizeForTwoHorizontal,
  CPT_Home,
  CPT_InternalLeftEditor,
  CPT_JsonOtherCommon,
  CPT_LoadingShortPanel,
  CPT_LocalProject,
  CPT_LocalProjectBtnWithPanel,
  CPT_LocalProjectSelect,
  CPT_LoggingPanel,
  CPT_MinusButton,
  CPT_MultipleLinesEditWithButton,
  CPT_NoMessageForNotification,
  CPT_NoUseCrtTable,
  CPT_NotesClipboard,
  CPT_NotesSnippet,
  CPT_OperationPanel,
  CPT_OutputFileExplorer,
  CPT_RandomLogicPage,
  CPT_RightMainInternalPage,
  CPT_SelfIconButton,
  CPT_SoftwareDetailView,
  CPT_TerminalView,
  CPT_TextAreaWithExample,
  CPT_TextCompare,
  CPT_TextSearch,
  CPT_TimeLogicPage,
  CPT_TransOtherCommon,
  CPT_ViewListWrapper,
  CPT_VirtualBigDataLineContainer,
  CPT_VisualControlDataTable,
  CPT_XMLOtherCommon,
  CPT_control_Pagination,
  CPT_control_bar,
  CPT_control_table,
  CPT_html_select,
  CPT_tree,
  // RVReactVirtualized,
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
  BeautifyCodeCommon,
  HalfResizeForTwo,
  GFormSlider,
  prettier,
  Collapse,
  xmlutils,
  Html_select,
  GSyncSelectWithFilter,
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
  Mobx,
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
  gutils,
  observable,
  // gutils: gutils.getExposeGUtils(),
  ReactDOM,
  useStores,
  useEffect,
  useRef,
  useCallback,
  useContext,
  RangeSlider,
  useMemo,
  useState,
  useAsObservableSource,
  useLocalStore,
  useObserver,
  Text,
  Provider,
  Router,
  inject,
  createHistory,
  withRouter,
  Switch,
  Route,
  Link,
  useHistory,
  // gutils,
  fn_constants: () => {
    return window.constants;
  },
});

console.log("gutils", gutils, CodeGenDefinition, window.gutils);
setTimeout(() => {
  // window.CodeGenDefinition.gutils = gutils.getExposeGUtils();
  // window.gutils = gutils.getExposeGUtils();
});
window.m_ref_100 = setInterval(() => {
  if (_.isNil(window.CodeGenDefinition.gutils) && !_.isNil(window.gutils)) {
    window.CodeGenDefinition.gutils = window.gutils;
    window.clearInterval(window.m_ref_100);
  }
}, 10);

export { CodeGenDefinition };
