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
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import common_log from "../kit/common_log";
import PreRequisiteJson from "../pre-requisite.json";

let appName = "JSON Prober";

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
        calc_find_arr: [],
        config_json_ignore_simple_array: "true",
        config_json_format_when_found: "true",
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
                icon: "geosearch",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.form.textHelperRender({
      no_left_panel_btm: true,
      noTriggerWhenCall: false,
      apiName: "json_probe",
      metaObj,
      right_result_lang: "javascript",
      gref,
      // right_wordWrap: "on",
      fontSize: 11,
      btn_type: "search_in_text",
      PreRequisiteJson,
      exampleStr: common_log.str,
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            onClick: fn_formatSelfTranslate("search_in_text"),
            label: t(`Search in Text`),
            intent: "primary",
          },
        ];
      },
      fn_configItem: ({ crtStoreName, PUtils }) => {
        return [];
      },
      no_need_config: true,
      default_select_tab: "config",
      fn_getConfigList({ PUtils, model, crtStore, crtStoreName, commonSave }) {
        return [
          {
            label: t(`Config`),
            id: "config",
            mode_jsx_func: true,
            jsx: PUtils.fn.fn_form_jsx(
              (props) => [
                <FormGroup
                  helperText={t(
                    "By Default, CodeGen will beautify these found JSON values. If you don't want to format these values, you can turn it off."
                  )}
                  label={t("Format JSON Result")}
                >
                  <GFormSwitch
                    valtype={"tf"}
                    onChange={(val) => {
                      model["config_json_format_when_found"] = val;
                    }}
                    value={model["config_json_format_when_found"]}
                  />
                </FormGroup>,
                <FormGroup
                  helperText={t(
                    "Too often, logs always contains some text which will be mistaken as JSON value, such as {0}. Based on that, By Default, CodeGen will ignore them and only search for complex JSON. If you cannot find what you want in the result, please turn it off and retry it again.",
                    ` [401] ["http-nio-8080"] [INFO] [18080] [] {}`
                  )}
                  label={t("Ignore Simple Matched Result")}
                >
                  <GFormSwitch
                    valtype={"tf"}
                    onChange={(val) => {
                      model["config_json_ignore_simple_array"] = val;
                    }}
                    value={model["config_json_ignore_simple_array"]}
                  />
                </FormGroup>,
              ],
              {
                style: {
                  padding: "12px",
                },
              }
            ),
          },
        ];
      },
    }),
  };
};
