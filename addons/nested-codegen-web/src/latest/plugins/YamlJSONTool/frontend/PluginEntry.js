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

let appTitle = "YAML <-> JSON";
let appName = appTitle;
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appName,
  viewName: appName,
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: async () => {
      await fn_otherPages.fn.loadStatic({
        PreRequisiteJson,
        gref,
      });
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
            ...fn_otherPages.menu.getYamlFormatHelper(),
            children: [
              {
                label: appTitle,
                icon: "flow-review-branch",
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
        noTriggerWhenCall: true,
        // syncView: true,
        type: "plaintext",
        fontSize: 12,
        totalTitle: appName,
        noSources: false,
        exampleArr: [
          {
            label: t(`YAML to JSON`),
            // tips: t(
            //   `Due to the limitation of parsing kit, CodeGen supports static class name only so far.`
            // ),
            call: "yaml_to_json",
            str:
              "---\n" +
              "phrase1:\n" +
              "  - hello\n" +
              "  - &world world\n" +
              "phrase2:\n" +
              "  - goodbye\n" +
              "  - *world\n" +
              "phrase3: >\n" +
              "  What is up\n" +
              "  in this place.",
          },
          {
            label: t(`JSON to YAML`),
            call: "html_to_react",
            // tips: t(
            //   `By using the function, you can convert all of these class name into the standard of {0} framework`,
            //   "React"
            // ),
            str: JSON.stringify(
              {
                phrase1: ["hello", "world"],
                phrase2: ["goodbye", "world"],
                phrase3: "What is up in this place.",
              },
              0,
              4
            ),
          },
        ],
        fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
          return [
            {
              cid: "yaml_to_json",
              onClick: fn_formatSelfTranslate("yaml_to_json"),
              label: t(`YAML to JSON`),
              intent: "primary",
            },
            {
              cid: "json_to_yaml",
              onClick: fn_formatSelfTranslate("json_to_yaml"),
              label: t(`JSON to YAML`),
              intent: "primary",
            },
          ];
        },
        mainBtnText: "HTML to React",
        language: "markdown",
        handle: async (
          { leftValue, type = "yaml_to_json" },
          { crtStoreName, PUtils }
        ) => {
          let str = leftValue;
          let result = `Unknown Operation for ${type}`;
          switch (type) {
            case "yaml_to_json":
              let c = {
                parser: "yaml",
                plugins: [parserYaml],
              };
              leftValue = prettier.format(leftValue, c);
              result = JSON.stringify(yaml.load(leftValue), 0, 4);
              break;
            case "json_to_yaml":
              leftValue = await cutils.formatJSON(leftValue);
              result = window.yaml.dump(JSON.parse(leftValue));
              break;
          }
          return {
            result: result,
          };
        },
        fn_configItem: ({ crtStoreName, PUtils }) => [],
      })
    ),
  };
};
