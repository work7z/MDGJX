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

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "Web World";
let subMenu = [
  {
    label: `HTML Previewer`,
    icon: "application",
    id: "html",
    pathname: "/exts/ROOT_EXTENSION_ADDONS?type=detail&id=html",
    pid: "ROOT_EXTENSION_ADDONS_html",
  },
  {
    label: `LESS to CSS`,
    icon: "application",
    id: "less_to_css",
    pathname: "/exts/ROOT_EXTENSION_ADDONS?type=detail&id=less_to_css",
    pid: "ROOT_EXTENSION_ADDONS_less_to_css",
  },
];

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: async () => {
      return {
        // myvalue: 12345,
        // decode_obj: {},
      };
    },
    menus: [
      {
        ...fn_otherPages.getForPlayGroundFirstLayerMenu(),
        children: [
          {
            ...menu_playground_webworld,
            children: subMenu,
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
        // totalTitle: appTitle,
        totalTitle: ({ PUtils }) => {
          let findItem =
            _.find(subMenu, (x) => x.id == PUtils.getURLParams().id) || {};
          return t([findItem.label || PUtils.getURLParams().id].join(" - "));
        },
        left_hist_use_all: true,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;

          return PUtils.jsx.createPanelWithBtnControls({
            fn_get_copy_result: async () => {
              return PUtils.editor.getValue({
                id: "ROOT_EXTENSION_ADDONS_encode_text_result",
              });
            },
            helpBtnProps: {
              minimal: true,
              outlined: true,
            },
            controls: [
              {
                text: t(`Preview Result`),
                intent: "primary",
                // minimal: true,
                // outlined: true,
                // icon: "build",
                loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
                onClick: async () => {
                  // await fn_updateCalc_real();
                  // gutils.alertOk(`Created a JWT Token.`);
                },
              },
            ],
            rightControls: [
              //
            ],
            body: (
              <div className="w100 h100">
                <div>this is center panel</div>
              </div>
            ),
          });
        }),
      })
    ),
  };
};
