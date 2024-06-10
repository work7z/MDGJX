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
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import PreRequisiteJson from "../pre-requisite.json";
let example_str = `// ${t(`Learn More please refer to the docs`)}
// http://mockjs.com/examples.html 

// 1. min-max
Mock.mock({
  "string|1-10": "★"
})

// 2. Number
Mock.mock({
  "number|+1": 202
})

// 3. Boolean 
Mock.mock({
  "boolean|1-2": true
})

// 4. Name
Mock.mock({
  "object|2": {
    "310000": "ShangHai",
    "320000": "JiangSu",
    "330000": "ZheJiang",
    "340000": "AnHui"
  }
})

// 5. Array
Mock.mock({
  "array|1": [
    "AMD",
    "CMD",
    "UMD"
  ]
})

// 6. Function Bind
Mock.mock({
  'foo': 'Syntax Demo',
  'name': function() {
    return this.foo
  }
})

// 7. ${t(`Regular Expression`)}
Mock.mock({
  'regexp': /[a-z][A-Z][0-9]/
})

// 8. ${t(`Absolute Path in Mock JSON`)}
Mock.mock({
  "foo": "Hello",
  "nested": {
    "a": {
      "b": {
        "c": "Mock.js"
      }
    }
  },
  "absolutePath": "@/foo @/nested/a/b/c"
})

// 9. ${t(`Relative Path in Mock JSON`)}
Mock.mock({
  "foo": "Hello",
  "nested": {
    "a": {
      "b": {
        "c": "Mock.js"
      }
    }
  },
  "relativePath": {
    "a": {
      "b": {
        "c": "@../../../foo @../../../nested/a/b/c"
      }
    }
  }
})

// 10. ${t(`Other Example`)}
Mock.mock('@boolean()')
Mock.mock('@natural()')
Mock.mock('@float(60, 100)')
Mock.mock('@character("lower")')
Mock.mock('@date("yyyy-MM-dd")')
Mock.mock('@date("yy-MM-dd")')
Mock.mock('@date("y-MM-dd")')
Mock.mock('@date("y-M-d")')
Mock.mock('@color()')
Mock.mock('@title()')
Mock.mock('@cparagraph')
Mock.mock('@id()')
Mock.mock('@name')
Mock.mock('@name(true)')
Mock.mock('@cname')
Mock.mock('@protocol')
Mock.mock('@email')
Mock.mock('@ip')
Mock.mock('@province()')
Mock.mock('@county(true)')
Mock.mock('@zip()')
Mock.mock('@shuffle(["a", "e", "i", "o", "u"])')
Mock.mock('@guid')
Mock.mock('@sentence(3, 5)')
Mock.mock('@paragraph(1, 3)')
`;
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};

let appTitle = "Mock";

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  async function init_kit() {
    let {
      data: { file_arr },
    } = await gref.optAPI(`load_static`, PreRequisiteJson);
    _.forEach(file_arr, (x, d, n) => {
      try {
        let tmp = null;
        if ("function" == typeof window.define && window.define.amd) {
          tmp = window.define.amd;
          delete window.define.amd;
        }
        // window.eval(x.value);
        $.globalEval(x.value);
        if (!_.isNil(tmp)) {
          window.define.amd = tmp;
        }
      } catch (e) {
        console.error("err", e);
      }
    });
  }
  return {
    initialState: async () => {
      await init_kit();
      return {
        calc_json_arr: [],
        // myvalue: 12345,
      };
    },
    //   with({
    //     mock(arr){
    //         return arr
    //     }
    // }){
    //     mock({a:12})
    // }
    menus: [
      {
        pid: "text",
        children: [
          {
            pid: "random",
            children: [
              {
                label: appTitle,
                icon: "social-media",
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
        appId: metaObj.appName,
        fn_appName: () => {
          return metaObj.appId;
        },
      },
      fn_otherPages.simpleLeftRightConvertor({
        handleRawInBackend: true,
        noTriggerWhenCall: false,
        noSources: false,
        syncView: true,
        type: "plaintext",
        fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
          return [
            {
              onClick: fn_formatSelfTranslate("encode"),
              label: t(`Mock`),
              intent: "primary",
            },
          ];
        },
        totalTitle: appTitle,
        language: "javascript",
        exampleStr: example_str,
        handle: async (
          { leftValue, type = "encode" },
          { crtStoreName, PUtils }
        ) => {
          try {
            if (_.isNil(window.Mock)) {
              await init_kit();
            }
            let collectArr = [];
            window.CALL_MOCK_REF = (obj) => {
              let result = window.Mock.mock(obj);
              collectArr.push({
                raw: obj,
                value: JSON.stringify(result, 0, 4),
              });
              return result;
            };
            leftValue = leftValue.replaceAll(
              /Mock\s*\.\s*mock/g,
              `window.CALL_MOCK_REF`
            );
            window.eval(leftValue);
            PUtils.crtModel.calc_json_arr = collectArr;
            let m_value = _.chain(collectArr)
              .map((x, d, n) => {
                d = d + 1;
                return `// ${JSON.stringify(x.raw)} \nlet mock_${d} = ${
                  x.value
                }`;
              })
              .join(`\n\n`)
              .value();
            return {
              result: m_value,
            };
          } catch (e) {
            return {
              result: gutils.getErrMsg(e),
            };
          }
          // console.log("rendering v1", type, leftValue);
          // let str = leftValue;
          // let { data } = await gref.optAPI("transform", {
          //   text: str,
          //   type: type,
          // });
        },
        fn_configItem: ({ crtStoreName, PUtils }) => [],
      })
    ),
  };
};
