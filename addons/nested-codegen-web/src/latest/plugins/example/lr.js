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

let appTitle = "Basic Regex Tester";
let appName = appTitle;
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appName,
  viewName: appName,
};

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
        pid: "text",
        children: [
          {
            ...fn_otherPages.menu.getRDBMSMenu(),
            children: [
              {
                label: appTitle,
                icon: "application",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
      {
        ...fn_otherPages.menu.obj_trans_playground,
        children: [
          {
            ...fn_otherPages.menu.obj_playground_exps,
            children: [
              {
                label: appTitle,
                icon: "application",
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
            `Due to the limitation of parsing kit, CodeGen supports static class name only so far.`
          ),
          call: "react_to_html",
          str: `

<div className={\`testing\`}>
    <h1 className="page-h1">this is page</h1>
    <div className={"sub-title-content"}>sub title</div>
    <span id="a" className='sub-content'></span>
</div>
          
`,
        },
        {
          label: t(`HTML to React`),
          call: "html_to_react",
          tips: t(
            `By using the function, you can convert all of these class name into the standard of {0} framework`,
            "React"
          ),
          str: `

      <div class='testing'>
          <h1 class='page-h1'>this is page</h1>
          <div class="sub-title-content">sub title</div>
          <span id="a" class="sub-content"></span>
      </div>
                 
          
`,
        },
      ],
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            cid: "html_to_react",
            onClick: fn_formatSelfTranslate("html_to_react"),
            label: t(`HTML to React`),
            intent: "primary",
          },
          {
            cid: "react_to_html",
            onClick: fn_formatSelfTranslate("react_to_html"),
            label: t(`React to HTML`),
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
            result = leftValue.replaceAll(
              /class=['"]+(.+?)['"]+/g,
              (a, b) => `className="${b}"`
            );
            break;
          case "react_to_html":
            result = leftValue.replaceAll(
              /className=['"`{]+(.+?)['"`}]+/g,
              (a, b) => `class="${b}"`
            );
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
