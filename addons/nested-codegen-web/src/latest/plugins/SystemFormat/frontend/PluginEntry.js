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

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "File Path Convertor";
let subMenu = [
  {
    label: appTitle,
    icon: "application",
    id: "file_path_convertor",
    // pathname: "/exts/ROOT_EXTENSION_ADDONS?id=file_path_convertor",
    // pathname: "/exts/ROOT_EXTENSION_ADDONS",
    pid: "ROOT_EXTENSION_ADDONS",
  },
  // {
  //   label: `Swagger OpenAPI Previewer`,
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
      fn_otherPages.simpleLeftRightConvertor({
        handleRawInBackend: true,
        handleRawFileTooltip: `Uploaded. CodeGen will use the file {0}.`,
        noTriggerWhenCall: true,
        noSources: false,
        syncView: true,
        type: "plaintext",
        fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
          return [
            {
              onClick: fn_formatSelfTranslate("convert"),
              label: t(`Convert Path Formats`),
              intent: "primary",
            },
          ];
        },
        totalTitle: appTitle,
        language: "plaintext",
        exampleStr: `# ${t(
          `Input your path, then CodeGen will convert it smartly.`
        )}\nC:\\test\\workdir\nC:\\users\\test\n/usr/share/local/nginx`,
        handle: async (
          { leftValue, type = "encode" },
          { crtStoreName, PUtils }
        ) => {
          if (_.trim(leftValue) == "") {
            leftValue = "";
          }
          cutils.alertOk_noT(
            t(
              `Processed. Please be noted that each line refers to each file path.`
            )
          );
          let finalResult = _.chain(leftValue)
            .split("\n")
            .map((x) => _.trim(x))
            .filter((x) => !_.startsWith(x, "#"))
            .map((x) => {
              x = _.trim(x);
              let needQuote = false;
              let re = x;
              if (_.startsWith(x, `"`) && _.endsWith(x, `"`)) {
                needQuote = true;
              }
              let win_path = "\\";
              if (_.startsWith(x, `"/`) || _.startsWith(x, `/`)) {
                // do unix to windows
                re = x.replaceAll("/", win_path);
                if (re.startsWith("/")) {
                }
              } else {
                // do windows to unix
                re = x.replaceAll(":\\", "/").replaceAll(win_path, "/");
                if (!re.startsWith("/")) {
                  re = "/" + re;
                }
              }
              return re;
            })
            .join("\n")
            .value();
          window.bbbb100020202 = finalResult;
          return {
            result: finalResult,
          };
          // console.log("rendering v1", type, leftValue);
          // // let { data } = await gref.optAPI("transform", {
          // //   text: str,
          // //   type: type,
          // // });
          // return {
          //   result: data.value,
          // };
        },
        fn_configItem: ({ crtStoreName, PUtils }) => [],
      })
    ),
  };
};
