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

let appName = "React Style Conversion";

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
        myvalue: 12345,
      };
    },
    menus: [
      {
        ...fn_otherPages.get_frontend_tools(),
        children: [
          {
            ...fn_otherPages.get_react_list(),
            children: [
              {
                label: appName,
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.simpleLeftRightConvertor({
      noTriggerWhenCall: true,
      // syncView: true,
      type: "plaintext",
      fontSize: 12,
      totalTitle: appName,
      noSources: false,
      exampleArr: [
        {
          label: t(`React to HTML`),
          tips: t(
            `Please do not include unknown variable in your react style object`
          ),
          call: "react_to_html",
          str: `

{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  flexDirection: "column",
  margin: "0 auto",
  height: "90%",
  textAlign: "center",
} 
          
`,
        },
        {
          label: t(`HTML to React`),
          call: "html_to_react",
          tips: t(
            `CodeGen supports using CSS standard only, it might not be able to support LESS/SCSS so far.`
          ),
          str: `

display: flex;
display: inline-block;
margin-right: 5px;
vertical-align: middle;
display: flex;
align-items: center;              
          
`,
        },
      ],
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            cid: "react_to_html",
            onClick: fn_formatSelfTranslate("react_to_html"),
            label: t(`React to HTML`),
            intent: "primary",
          },
          {
            cid: "html_to_react",
            onClick: fn_formatSelfTranslate("html_to_react"),
            label: t(`HTML to React`),
            intent: "primary",
          },
        ];
      },
      mainBtnText: "HTML to React",
      language: "markdown",
      handle: async (
        { leftValue, type = "html_to_react" },
        { crtStoreName, PUtils }
      ) => {
        let str = leftValue;
        let result = `Unknown Operation for ${type}`;
        switch (type) {
          case "html_to_react":
            // let unknownCommentArr = []
            let array_obj = {};
            _.chain(leftValue)
              .split(";")
              .map((x) => _.trim(x))
              .map((x) => {
                if (x.indexOf(":") == -1) {
                  return null;
                } else {
                  let m_arr = _.split(x, ":");
                  if (_.size(m_arr) == 2) {
                    let fin_value = _.trim(m_arr[1]);
                    // if (_.isNumber(second_va)) {
                    //   fin_value = parseFloat(fin_value);
                    // }
                    array_obj[_.trim(_.camelCase(m_arr[0]))] = fin_value;
                  }
                  return m_arr;
                }
              })
              .value();
            result = `${JSON.stringify(array_obj, 0, 4)}`;
            break;
          case "react_to_html":
            let myformattingres = await gutils.opt("/common/format_for_json", {
              VALUE: leftValue,
            });
            result = [];
            leftValue = myformattingres.content.result;
            let jsonVal = JSON.parse(leftValue);
            _.forEach(jsonVal, (x, d, n) => {
              d = d + "";
              d = _.kebabCase(d);
              if (_.isNumber(parseFloat(x)) && x == "" + parseFloat(x)) {
                x = `${x}px`;
              }
              result.push(`${d}: ${x};`);
            });
            result = result.join("\n");
            break;
        }
        return {
          result: result,
        };
      },
      fn_configItem: ({ crtStoreName, PUtils }) => [],
    }),
  };
};
