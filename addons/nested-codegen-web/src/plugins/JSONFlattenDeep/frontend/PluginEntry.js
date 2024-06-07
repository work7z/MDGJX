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

let appName = "JSON Flattener";

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
                icon: "flow-branch",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.form.jsonHelperRender({
      no_left_panel_btm: true,
      apiName: "json_filter",
      metaObj,
      gref,
      btn_type: "flatten",
      PreRequisiteJson,
      exampleStr: `
      [
        [[1,3,[20,30,40]],1,2,3,4],
        [ [10,20,30],{test: 12345}],
        [
          {
            testing: '100',
                 },
          {
            test: '200',
          },
        ],
        [
          [1,3],
          [1,3,[20,30,40]],
          [1,3],
          [1,3],
        ]
      ]
      `,
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            onClick: fn_formatSelfTranslate("flatten"),
            label: t(`Flatten JSON`),
            intent: "primary",
          },
        ];
      },
      fn_configItem: ({ crtStoreName, PUtils }) => {
        return [
          {
            label: t("Flatten Type"),
            children: [
              {
                tag: Html_select,
                value:
                  gstore.common_app[crtStoreName].model
                    .config_json_flatten_type,
                list: [
                  {
                    label: t(`Flatten Shadowly`),
                    value: "flatten_shadowly",
                  },
                  {
                    label: t(`Flatten Deeply`),
                    value: "flatten_deeply",
                  },
                ],
                onChange: (x) => {
                  gstore.common_app[
                    crtStoreName
                  ].model.config_json_flatten_type = x.target.value;
                },
              },
            ],
          },
        ];
      },
      handle: async ({ leftValue, type }, { crtStoreName, PUtils }) => {
        console.log("rendering v1", type, leftValue);
        let m = await gutils.opt("/common/format_for_json", {
          VALUE: leftValue,
        });
        let str = m.content.result;
        let finalDataJSON = JSON.parse(str);
        let fn =
          PUtils.crtModel["config_json_flatten_type"] == "flatten_deeply"
            ? "flattenDeep"
            : "flatten";
        let m_finalDataJSON = _[fn](finalDataJSON);
        window.m_finalDataJSON = m_finalDataJSON;
        return {
          result: JSON.stringify(m_finalDataJSON, 0, 2),
        };
      },
      default_select_tab: "scripts",
      fn_getConfigList({ PUtils, model, crtStore, crtStoreName, commonSave }) {
        return [].filter((x) => !_.isNil(x));
      },
    }),
  };
};
