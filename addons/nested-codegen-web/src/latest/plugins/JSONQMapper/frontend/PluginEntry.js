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

let appName = "JSON Mapper";

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
                icon: "exchange",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.form.jsonHelperRender({
      helperText: `If you would like to transform some value or key into the corresponding formatting, you can use this function to apply what you need with ease. Meanwhile, please be noted that the function support using script only.`,
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
let users = {
  a: [
    { 'user': 'barney_1', 'age': 36, 'active': true },
    { 'user': 'barney_2', 'age': 36, 'active': true },
    { 'user': 'fred_1',   'age': 40, 'active': false },
    { 'user': 'fred_2',   'age': 50, 'active': false },
    { 'user': 'fred_3',   'age': 60, 'active': false },
    { 'user': 'fred_4',   'age': 70, 'active': false }
  ],
  b: [
    { 'user': 'barney_1', 'age': 36, 'active': true },
    { 'user': 'barney_2', 'age': 36, 'active': true },
    { 'user': 'fred_1',   'age': 40, 'active': false },
    { 'user': 'fred_2',   'age': 50, 'active': false },
    { 'user': 'fred_3',   'age': 60, 'active': false },
    { 'user': 'fred_4',   'age': 70, 'active': false }
  ],
  c: [
    {id: 'will be filtered'}
  ]
};

// ${t(`The return value will determine if each item will be returned`)}
users = fn_data_mapper(users, (value, index)=>{
  // ${`Transform value according to the value of iterating key`}
  if(index == 'c'){
    return {
      timestamp: new Date().getTime(),
      raw_value: value
    }
  }else{
    return value;
  }
})

// ${t(`filtering the property "a" of the variable users`)}
users.a = fn_data_mapper(users.a, (value, index, collection)=>{
  return {
    ...value,
    calc_age: value.age + 10
  }; // ${t(`spreaing all values, and add new fields`)}
})

// ${t(`filtering the property "b" of the variable users`)}
users.b = fn_data_mapper(users.b, (value, index, collection)=>{
  return value
})

// ${t(
        `Lastly, please assign the result to the constant variable FINAL_OUTPUT_VALUE`
      )}
const FINAL_OUTPUT_VALUE = users;
`,
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            onClick: fn_formatSelfTranslate("unzip"),
            label: t(`Apply Mapper`),
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
          await gutils.win_alert(
            t(
              `Please be noted plain JSON value doesn't support so far, please use the script instead of. (Tips: you can click the show example button to see how it works.)`
            )
          );
        } else {
          leftValue = `
            (function(){
              ${cutils.str.json_fn_list}
              ${leftValue};
              window.tmp_sourceData=FINAL_OUTPUT_VALUE
            })()
      `;
          window.eval(leftValue);
        }
        let m_finalDataJSON = window.tmp_sourceData;
        window.m_finalDataJSON = m_finalDataJSON;
        return {
          result: JSON.stringify(m_finalDataJSON, 0, 4),
        };
      },
      default_select_tab: "scripts",
      fn_getConfigList({ PUtils, model, crtStore, crtStoreName, commonSave }) {
        return [];
      },
    }),
  };
};
