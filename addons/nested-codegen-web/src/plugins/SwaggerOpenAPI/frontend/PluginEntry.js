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
const { Tabs, Tab } = CodeGenDefinition.BluePrintCpt;
import PreRequisiteJson from "../pre-requisite.json";
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import FormLabelTextInput from "../../TranslateForJSON/frontend/cpt/FormLabelTextInput";
import "./myfile.less";
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import menu_playground_webworld from "../../TranslateForJSON/frontend/pages/background/menu_playground_webworld";
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
import swagger_openapi_utils from "./utils/swagger_openapi_utils";
import SwaggerViewer from "./utils/SwaggerViewer";

let appTitle = `Swagger API Viewer(JSON)`;
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appTitle,
};
let subMenu = [
  {
    label: appTitle,
    icon: "application",
    id: "swagger_openapi_previewer",
    // pathname: "/exts/ROOT_EXTENSION_ADDONS?id=file_path_convertor",
    // pathname: "/exts/ROOT_EXTENSION_ADDONS",
    pid: "ROOT_EXTENSION_ADDONS",
  },
  // {
  //   label:
  //   icon: "application",
  //   id: "swagger_openapi_previewer",
  //   pathname: "/exts/ROOT_EXTENSION_ADDONS?id=swagger_openapi_previewer",
  //   pid: "ROOT_EXTENSION_ADDONS_swagger_openapi_previewer",
  // },
  // {
  //   label: `LESS to CSS`,
  //   icon: "application",
  //   id: "less_to_css",
  //   pathname: "/exts/ROOT_EXTENSION_ADDONS?type=detail&id=less_to_css",
  //   pid: "ROOT_EXTENSION_ADDONS_less_to_css",
  // },
];

let exampleStr = JSON.stringify(swagger_openapi_utils.exampleJSON, 0, 4);
window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    hideThisPage: true,
    initialState: async () => {
      return {
        swagger_text: exampleStr,
      };
    },
    menus: true
      ? []
      : [
          {
            pid: "text",
            children: [
              {
                ...fn_otherPages.getForSystemFormatMenus(),
                children: [
                  //
                  ...subMenu,
                ],
              },
            ],
          },
        ],
    render: fn_otherPages.withPluginPage(
      PreRequisiteJson,
      {
        appId: metaObj.appName,
        fn_appName: () => {
          return metaObj.appId;
        },
      },
      fn_otherPages.rightMainPageJsx({
        totalTitle: appTitle,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;
          PUtils.makeLeftHide();
          let bottomPanel = PUtils.jsx.leftRightSpliter({
            percent: 0.5,
            left: PUtils.jsx.panelWithTitle({
              noTranslate: true,
              noBorderTop: true,
              title: t(`{0} API Definition({1})`, `Swagger`, "JSON"),
              jsx: React.createElement(
                observer((props) => {
                  return PUtils.jsx.createGEditor({
                    title: t(`{0} JSON Viewer`, "Swagger"),
                    fontSize: 11,
                    wordWrap: "off",
                    key: "swagger_text",
                    language: "json",
                    initContent: ``,
                  });
                })
              ),
            }),
            right: PUtils.jsx.panelWithTitle({
              noTranslate: true,
              noBorderTop: true,
              title: t(`Config Preview Panel`),
              jsx: (
                <SwaggerViewer
                  crtModel={crtModel}
                  PUtils={PUtils}
                  obj={PUtils.crtModel.finalJSONText}
                />
              ),
            }),
          });
          let fn_view_my_config = async () => {
            try {
              let usertext = PUtils.crtModel.swagger_text;
              let jsonformat = await cutils.formatJSONWithErr(usertext);
              PUtils.crtModel.finalJSONText = JSON.parse(jsonformat);
              cutils.alertOk_noT(
                t(
                  `Synchronized! Your config will be visualized on the right panel.`
                )
              );
            } catch (e) {
              cutils.alertErr_noT(cutils.getErrMsg(e));
            }
          };
          return PUtils.jsx.createPanelWithBtnControls({
            controls: [
              {
                text: t(`View My Config`),
                intent: "primary",
                type: Button,
                jsx: Button,
                onClick: fn_view_my_config,
              },
              {
                text: t(`Copy My Config`),
                intent: "success",
                jsx: Button,
                onClick(e) {
                  let usertext = PUtils.crtModel.swagger_text;
                  cutils.copy(usertext, e);
                },
              },
              {
                text: t(`Show Example`),
                intent: "none",
                jsx: Button,
                onClick(e) {
                  PUtils.crtModel.swagger_text = exampleStr;
                  fn_view_my_config();
                },
              },
            ],
            // showAppLang: true,
            rightControls: [],
            body: bottomPanel,
          });
        }),
      })
    ),
  };
};
