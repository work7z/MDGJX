const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  GFormSwitch,
  OperationPanel,
  BluePrintPopover,
  Mobx,
  MobxReact,
  HalfResizeForTwo,
  MobxReactLite,
  ProgressBar,
  Dialog,
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
  GFormInput,
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
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import PreRequisiteJson from "../pre-requisite.json";

let appName = "JSON ZipTool";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appName,
  viewName: appName,
};
let appTitle = metaObj.viewName;

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState() {
      return {
        config_json_flatten_type: "flatten_deeply",
        config_text_sort_order: "asc",
        ...fn_otherPages.form.textHelperState(),
        myvalue: 12345,
      };
    },
    menus: [
      {
        pid: "text",
        children: [
          {
            pid: "jsonhelper",
            children: [
              {
                label: metaObj.viewName,
                icon: "unresolve",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.form.jsonHelperRender({
      helperText: `If you would like to collect each element in each array into the corresponding array together according to their array index, you can use zip function. In turn, you can also deconstruct these collected array back to previous data status. Not only support using script, but the JSON raw value is supported as well.`,
      no_left_panel_btm: true,
      apiName: "json_filter",
      metaObj,
      gref,
      noSelectFile: true,
      btn_type: "zip",
      PreRequisiteJson,
      exampleStr: `// ${t(
        `Please replace the JSON value below with what you need to transform.`
      )}
let sourceData = [
  ['fred', 'barney'], 
  [30, 40], 
  [true, false]
]
// ${t(
        `Lastly, please assign the result to the constant variable FINAL_OUTPUT_VALUE`
      )}
const FINAL_OUTPUT_VALUE = sourceData;
`,
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            onClick: fn_formatSelfTranslate("zip"),
            label: t(`Zip JSON`),
            intent: "primary",
          },
          {
            onClick: fn_formatSelfTranslate("unzip"),
            label: t(`UnZip JSON`),
            intent: "primary",
          },
        ];
      },
      handle: async ({ leftValue, type }, { crtStoreName, PUtils }) => {
        console.log("rendering v1", type, leftValue);
        let m_obj = await cutils.isJSONMode(leftValue);
        let isJSONMode = m_obj.result;
        if (isJSONMode) {
          leftValue = m_obj.str;
          window.tmp_sourceData = JSON.parse(leftValue);
        } else {
          leftValue = `
            (function(){
              ${leftValue};
              window.tmp_sourceData=FINAL_OUTPUT_VALUE
            })()
      `;
          window.eval(leftValue);
        }
        let m_finalDataJSON =
          type == "zip"
            ? _[type].apply(null, window.tmp_sourceData)
            : _.unzip(window.tmp_sourceData);
        window.m_finalDataJSON = m_finalDataJSON;
        return {
          result: JSON.stringify(m_finalDataJSON, 0, 4),
        };
      },
      default_select_tab: "scripts",
      fn_getConfigList({ PUtils, model, crtStore, crtStoreName, commonSave }) {
        return [].filter((x) => !_.isNil(x));
      },
    }),
  };
};
