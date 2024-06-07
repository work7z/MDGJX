const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  BluePrintPopover,
  Mobx,
  MobxReact,
  HalfResizeForTwo,
  MobxReactLite,
  ProgressBar,
  Dialog,
  Tag,
  Popover,
  Radio,
  ButtonGroup,
  TextArea,
  Intent,
  observer,
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
  Callout,
  PanelStack,
  gstore,
  AnchorButton,
  Tooltip,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  Menu,
  MenuItem,
  MenuDivider,
  BluePrintTable,
  autorun,
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
  BluePrintDocs,
  BluePrintCpt,
  observable,
  gutils,
  ReactDOM,
  
  useEffect,
  useCallback,
  useContext,
  useMemo,
  useState,
  useAsObservableSource,
  useLocalStore,
  useObserver,
  Provider,
  Router,
  inject,
  Html_select,
  BeautifyCodeCommon,
  prettier,
  xmlutils,
  createHistory,
  withRouter,
  Switch,
  Route,
  Link,
  useHistory,
} = window.CodeGenDefinition;
import PreRequisiteJson from "../pre-requisite.json";
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import FormLabelTextInput from "../../TranslateForJSON/frontend/cpt/FormLabelTextInput";
import "./myfile.less";
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import menuUtils from "../../TranslateForJSON/frontend/menu_utils";
import TerminalWrapper from "../../TranslateForJSON/frontend/cpt/TerminalWrapper";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "Swift Terminal";

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    // notReady: !gutils.dev(),
    // willReadyVersion: `v1.7.7`,
    initialState: async () => {
      return {
        config: {
          fontSize: 13,
        },
        uid: gutils.uuid(),
      };
    },
    menus: [
      {
        ...menuUtils.menu_1st.util_server,
        children: [
          {
            ...menuUtils.menu_2rd.server_base_services,
            children: [
              {
                label: appTitle,
                icon: "application",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.withPluginPage(
      PreRequisiteJson,
      {
        PreRequisiteJson,
        gref: gref,
        appId: metaObj.appName,
        fn_appName: () => {
          return metaObj.appId;
        },
      },
      fn_otherPages.rightMainPageJsx({
        totalTitle: appTitle,
        PreRequisiteJson,
        appId: "ROOT_EXTENSION_ADDONS",
        left_hist_use_all: true,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;
          let termProps = {
            themeConfig: {
              foreground: "#bbbbbb",
              background: "#141314",
              cursor: "#b5bd68",
              cursorAccent: "#1d1f21",
              selectionBackground: "rgba(255, 255, 255, 0.3)",
              black: "#575757",
              red: "#FF2C6D",
              green: "#19f9d8",
              yellow: "#FFB86C",
              blue: "#45A9F9",
              magenta: "#FF75B5",
              cyan: "#B084EB",
              white: "#CDCDCD",
              brightBlack: "#757575",
              brightRed: "#FF2C6D",
              brightGreen: "#19f9d8",
              brightYellow: "#FFCC95",
              brightBlue: "#6FC1FF",
              brightMagenta: "#FF9AC1",
              brightCyan: "#BCAAFE",
              brightWhite: "#E6E6E6",
            },
          };
          let config = {
            hotkey: "Control+2",
            sshReadyTimeout: 50000,
            scrollback: 3000,
            onStartSessions: [],
            fontSize: PUtils.crtModel.config.fontSize,
            fontFamily: "mono, courier-new, courier, monospace",
            execWindows: "System32/WindowsPowerShell/v1.0/powershell.exe",
            execMac: "zsh",
            execLinux: "bash",
            execWindowsArgs: [],
            execMacArgs: [],
            execLinuxArgs: [],
            enableGlobalProxy: false,
            disableSshHistory: false,
            disableTransferHistory: false,
            terminalBackgroundImagePath: "",
            terminalBackgroundFilterOpacity: 1,
            terminalBackgroundFilterBlur: 1,
            terminalBackgroundFilterBrightness: 1,
            terminalBackgroundFilterGrayscale: 0,
            terminalBackgroundFilterContrast: 1,
            rendererType: "canvas",
            // terminalType: "xterm-256color",
            terminalType: "xterm-color",
            keepaliveCountMax: 10,
            saveTerminalLogToFile: false,
            checkUpdateOnStart: true,
            cursorBlink: false,
            cursorStyle: "block",
            useSystemTitleBar: false,
            opacity: 1,
            defaultEditor: "",
            confirmBeforeExit: false,
            initDefaultTabOnStart: true,
          };
          return (
            <div className="w100 h100">
              {/* <div>{PUtils.crtModel.uid}</div> */}
              <TerminalWrapper
                key={[PUtils.crtModel.uid, config.fontSize].join(",")}
                PUtils={PUtils}
                uid={PUtils.crtModel.uid}
                config={config}
                {...termProps}
              />
            </div>
          );
        }),
      })
    ),
  };
};

// return PUtils.jsx.createPanelWithBtnControls({
//   helpBtnProps: {
//     minimal: true,
//     outlined: true,
//   },
//   controls: [
//     {
//       text: t(`Connect`),
//       intent: "primary",
//       loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
//       onClick: async () => {
//         await fn_updateCalc_real();
//         gutils.alertOk(`Created a JWT Token.`);
//       },
//     },
//   ],
//   rightControls: [],
//   body: (
//   ),
// });
