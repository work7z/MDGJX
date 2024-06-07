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
import PreRequisiteJson from "../pre-requisite.json";

let appName = "JSON Filter";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appName,
  viewName: appName,
};
let appTitle = metaObj.viewName;

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    hideThisPage: true,
    hide: true,
    initialState() {
      return {
        config_text_sort_order: "asc",
        ...fn_otherPages.form.textHelperState(),
        myvalue: 12345,
      };
    },
    menus: [],
    menus_2: [
      {
        pid: "text",
        children: [
          {
            pid: "jsonhelper",
            children: [
              {
                label: metaObj.viewName,
                icon: "filter-list",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.form.jsonHelperRender({
      apiName: "json_filter",
      metaObj,
      gref,
      PreRequisiteJson,
      exampleStr: fn_otherPages.form.textHelperExampleStr,
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            onClick: fn_formatSelfTranslate("filter"),
            label: t(`Apply Filter`),
            intent: "primary",
          },
        ];
      },
      fn_configItem: ({ crtStoreName, PUtils }) => {
        return [];
      },
      default_select_tab: "scripts",
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
                    "By default, CodeGen will use \\n as its line separator, namely the new line character."
                  )}
                  label={t("line Separator")}
                >
                  <GFormInput
                    valtype={"tf"}
                    onChange={(val) => {
                      model["config_line_sep_char"] = val;
                    }}
                    value={model["config_line_sep_char"]}
                  />
                </FormGroup>,
                <FormGroup
                  helperText={t(
                    "If you want to filter the lines which are whitespaces only, please turn it on"
                  )}
                  label={t("Ignore Whitespaces Lines")}
                >
                  <GFormSwitch
                    valtype={"tf"}
                    onChange={(val) => {
                      model["config_clean_whitespaces"] = val;
                    }}
                    value={model["config_clean_whitespaces"]}
                  />
                </FormGroup>,
                <FormGroup
                  helperText={t(
                    "If you want to trim the content of each line before handling, please turn it on"
                  )}
                  label={t("Trim it before handling")}
                >
                  <GFormSwitch
                    valtype={"tf"}
                    onChange={(val) => {
                      model["config_clean_trim"] = val;
                    }}
                    value={model["config_clean_trim"]}
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
        ].filter((x) => !_.isNil(x));
      },
    }),
  };
};
