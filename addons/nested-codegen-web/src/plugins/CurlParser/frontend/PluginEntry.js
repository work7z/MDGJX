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
  Tag,
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
const { Tabs, Tab } = CodeGenDefinition.BluePrintCpt;
import PreRequisiteJson from "../pre-requisite.json";
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import FormLabelTextInput from "../../TranslateForJSON/frontend/cpt/FormLabelTextInput";
import "./myfile.less";
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
import curl_to_api_utils from "../../TranslateForJSON/frontend/kit/curl_to_api_utils";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "Curl Command Parser";
let { appName, appId } = metaObj;

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: async () => {
      // await fn_otherPages.fn.loadStatic({
      //   PreRequisiteJson,
      //   gref,
      // });
      return {
        // myvalue: 12345,
        // decode_obj: {},
      };
    },
    menus: [
      {
        ...fn_otherPages.menu.getNetwork(),
        children: [
          {
            ...fn_otherPages.menu.getAppLayer(),
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
      type: "json",
      fontSize: 12,
      totalTitle: appTitle,
      noSources: false,
      exampleArr: [
        {
          label: t(`Curl to JSON`),
          // tips: t(
          //   `Due to the limitation of parsing kit, CodeGen supports static class name only so far.`
          // ),
          call: "curl_to_json",
          str: curl_to_api_utils.example.curl2api,
        },
        {
          label: t(`JSON to Curl`),
          call: "json_to_curl",
          // tips: t(
          //   `By using the function, you can convert all of these class name into the standard of {0} framework`,
          //   "React"
          // ),
          str: curl_to_api_utils.example.json2api,
        },
      ],
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            cid: "curl_to_json",
            onClick: fn_formatSelfTranslate("curl_to_json"),
            label: t(`Curl to JSON`),
            intent: "primary",
          },
          {
            cid: "json_to_curl",
            onClick: fn_formatSelfTranslate("json_to_curl"),
            label: t(`JSON to Curl`),
            intent: "primary",
          },
        ];
      },
      mainBtnText: "Curl to JSON",
      left_lang: "markdown",
      right_lang: "json",
      handle: async (
        { leftValue, type = "curl_to_json" },
        { crtStoreName, PUtils }
      ) => {
        let str = leftValue;
        let result = `Unknown Operation for ${type}`;
        switch (type) {
          case "curl_to_json":
            // result = leftValue.replaceAll(
            //   /class=['"]+(.+?)['"]+/g,
            //   (a, b) => `className="${b}"`
            // );
            let r10 = await gref.optAPI(`curl_to_json`, {
              curl: leftValue,
            });
            result = _.get(r10, "data.json_str");
            break;
          case "json_to_curl":
            await cutils.formatJSONWithErrAndMsg(leftValue);
            let r11 = await gref.optAPI(`json_to_curl`, {
              json: leftValue,
            });
            result = _.get(r11, "data.curl_str");
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
