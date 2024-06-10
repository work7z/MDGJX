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
  GSyncSelectWithFilter,
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
let appTitle = "Curl to API Request";
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
        // output_api_formats: "java.okhttp",
        output_api_formats: "c#",
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
          label: t(`Curl to API`),
          call: "curl_to_api",
          str: curl_to_api_utils.example.curl2api,
        },
        {
          label: t(`JSON to API`),
          call: "json_to_api",
          str: curl_to_api_utils.example.json2api,
        },
      ],
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            cid: "curl_to_api",
            onClick: fn_formatSelfTranslate("curl_to_api"),
            label: t(`Curl to API`),
            intent: "primary",
          },
          {
            cid: "json_to_api",
            onClick: fn_formatSelfTranslate("json_to_api"),
            label: t(`JSON to API`),
            intent: "primary",
          },
        ];
      },
      mainBtnText: "Curl to JSON",
      left_lang: "plaintext",
      right_lang: "plaintext",
      handle: async (
        { leftValue, type = "curl_to_api" },
        { crtStoreName, PUtils }
      ) => {
        let result = `Unknown Operation for ${type}`;
        let output_api_formats = PUtils.crtModel.output_api_formats;
        let src_list_item = _.find(
          curl_to_api_utils.src_list,
          (x) => x.value == output_api_formats
        );
        if (_.isNil(src_list_item)) {
          result = t(`No available calculate item: ${type}`);
        } else {
          switch (type) {
            case "curl_to_api":
              let r10 = await gref.optAPI(`curl_to_api`, {
                curl: leftValue,
              });
              let o = (result = _.get(r10, "data.result"));
              let oJSON = JSON.parse(o);
              result = src_list_item.format(oJSON);
              break;
            case "json_to_api":
              await cutils.formatJSONWithErrAndMsg(leftValue);
              let r11 = await gref.optAPI(`json_to_api`, {
                json: leftValue,
              });
              let o2 = _.get(r11, "data.result");
              let o2JSON = JSON.parse(o2);
              result = src_list_item.format(o2JSON);
              break;
          }
        }
        return {
          result: result,
        };
      },
      fn_configItem: ({ crtStoreName, PUtils }) => {
        let model = PUtils.crtModel;
        let crtStore = PUtils.crtStore;
        let crtModel = PUtils.crtModel;
        let commonSave = PUtils.commonSave;
        return [
          {
            label: t("Output API Formats"),
            children: [
              {
                tag: GSyncSelectWithFilter,
                index: "output_api_formats",
                obj: crtModel,
                whenChg: (x) => {},
                list: curl_to_api_utils.src_list.filter((x) => x.hasSelfFormat),
              },
            ],
          },
        ];
      },
    }),
  };
};
