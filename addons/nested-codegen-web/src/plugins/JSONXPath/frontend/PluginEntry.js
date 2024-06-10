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

let appName = "JSON XPath";

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
        id_post_procedure_script: `// ${t(
          `Format the raw JSON value after selecting it by JSON Path`
        )}
function format_json_after_formatting(result_arr){
return JSON.stringify((
  [
    ...result_arr
  ]
), 0, 4)
}
            `,
        id_pre_procedure_script: `// ${t(
          `Format the raw JSON value before selecting it by JSON Path`
        )}
function format_json_before_starting(rawValue){
return rawValue
}
            `,
        config_json_path: [
          `// ${t(`Example as below`)}`,
          `// ${t(`Select the authors of all books data`)}`,
          `$.store.book[*].author`,
          `// ${t(`Select all authors data`)}`,
          `$.author`,
          `// ${t(`Select the third book data`)}`,
          `$..book[2]`,
          `// ${t(`Select the price of everything`)}`,
          `$.store..price`,
          `// ${t(
            `Select all books data from index 0 (inclusive) until index 2 (exclusive)`
          )}`,
          `$..book[:2]`,
          `// ${t(
            `Select all books data from index 1 (inclusive) until index 2 (exclusive)`
          )}`,
          `$..book[1:2]`,
          `// ${t(`Select last two books data`)}`,
          `$..book[-2:]`,
          "// " +
            t(
              `For more syntax rules, please refer to {0}`,
              window.getCrtLang() == "zh_CN"
                ? " https://alibaba.github.io/fastjson2/jsonpath_cn "
                : " https://github.com/json-path/JsonPath "
            ),
        ].join("\n"),
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
                icon: "oil-field",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.form.jsonHelperRender({
      noTriggerWhenCall: false,
      trigger_when_any_editor_is_changed: true,
      // noTriggerWhenCall: true,
      // trigger_when_any_editor_is_changed: false,
      test_mode: "json",
      right_lang: "json",
      left_lang: "json",
      apiName: "json_filter",
      metaObj,
      gref,
      btn_type: "selector",
      PreRequisiteJson,
      exampleStr: `{
  "store": {
      "book": [
          {
              "category": "reference",
              "author": "Nigel Rees",
              "title": "Sayings of the Century",
              "price": 8.95
          },
          {
              "category": "fiction",
              "author": "Evelyn Waugh",
              "title": "Sword of Honour",
              "price": 12.99
          },
          {
              "category": "fiction",
              "author": "Herman Melville",
              "title": "Moby Dick",
              "isbn": "0-553-21311-3",
              "price": 8.99
          },
          {
              "category": "fiction",
              "author": "J. R. R. Tolkien",
              "title": "The Lord of the Rings",
              "isbn": "0-395-19395-8",
              "price": 22.99
          }
      ],
      "bicycle": {
          "color": "red",
          "price": 19.95
      }
  },
  "expensive": 10
}`,
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            onClick: fn_formatSelfTranslate("selector"),
            label: t(`Apply Selector`),
            intent: "primary",
          },
        ];
      },
      fn_configItem: ({ crtStoreName, PUtils }) => {
        return [];
      },
      handle: async ({ leftValue, type }, { crtStoreName, PUtils }) => {
        try {
          console.log("rendering v1", type, leftValue);
          let m = await gutils.opt("/common/format_for_json", {
            VALUE: leftValue,
          });
          let str = m.content.result;
          let finalDataJSON = JSON.parse(str);
          window.tmp_format_result = finalDataJSON;
          let prefuncVal = PUtils.editor.getValue({
            id: `id_pre_procedure_script`,
          });
          window.prefuncVal = prefuncVal;
          eval(`(function(){
    ${prefuncVal}
    window.tmp_format_result = format_json_before_starting(window.tmp_format_result)
  })()`);
          let m_finalDataJSON = window.tmp_format_result;
          let config_json_path = PUtils.editor.getValue({
            id: `config_json_path`,
          });
          let handling_arr = _.chain(config_json_path)
            .split("\n")
            .map((x) => _.trim(x))
            .filter((x) => !x.startsWith("//") && x != "")
            .map((x) => {
              return x;
            })
            .value();
          let finished_arr = [];
          let str_m_finalDataJSON = JSON.stringify(m_finalDataJSON);
          for (let item of handling_arr) {
            try {
              let { data } = await gref.optAPI(`transform`, {
                type: `select`,
                path: item,
                json: str_m_finalDataJSON,
                errorResponse: true,
                forceNoModel: true,
              });
              finished_arr.push(
                !_.isNil(data.value) && data.value != "null"
                  ? JSON.parse(data.value)
                  : null
              );
            } catch (e) {
              console.log(e);
              finished_arr.push(null);
            }
          }
          window.tmp_PUtils = PUtils;
          window.tmp_finished_arr = finished_arr;
          eval(`(function(){
    ${PUtils.editor.getValue({
      id: `id_post_procedure_script`,
    })}
    window.tmp_finished_arr = format_json_after_formatting(window.tmp_finished_arr)
  })()`);
          return {
            result: window.tmp_finished_arr,
          };
        } catch (e) {
          return {
            result: `Error: ` + gutils.getErrMsg(e),
          };
        }
      },
      default_select_tab: "scripts",
      fn_getConfigList({ PUtils, model, crtStore, crtStoreName, commonSave }) {
        return [
          {
            label: t(`JSON Path`),
            id: "json_path_selector",
            jsx: PUtils.jsx.createGEditor({
              fontSize: 11,
              title: t(`JSON Path Selector`),
              key: "config_json_path",
              onChange: (val) => {
                console.log("now the value is changed", val);
                PUtils.fn_trigger_it();
              },
              language: "markdown",
              // initContent:,
            }),
          },
          {
            label: t(`Pre-Procedure`),
            id: "pre_procedure_script",
            jsx: PUtils.jsx.createGEditor({
              fontSize: 11,
              title: t(`Script for Pre-Procedure`),
              key: "id_pre_procedure_script",
              language: "javascript",
              onChange: (val) => {
                console.log("now the value is changed", val);
                PUtils.fn_trigger_it();
              },
              // initContent: ,
            }),
          },
          {
            label: t(`Post-Procedure`),
            id: "post_procedure_script",
            jsx: PUtils.jsx.createGEditor({
              fontSize: 11,
              title: t(`Script for Post-Procedure`),
              key: "id_post_procedure_script",
              language: "javascript",
              onChange: (val) => {
                console.log("now the value is changed", val);
                PUtils.fn_trigger_it();
              },
            }),
          },
        ].filter((x) => !_.isNil(x));
      },
    }),
  };
};
