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
  GSyncSelectWithFilter,
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

let appTitle = "Hex Digits";
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appTitle,
  viewName: appTitle,
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState() {
      return {
        config_charset: "UTF-8",
        config_text_sort_order: "asc",
        ...fn_otherPages.form.textHelperState(),
        config_text_helper_filter: null,
        myvalue: 12345,
      };
    },
    menus: [
      {
        pid: "codec",
        children: [
          {
            pid: "encode",
            children: [
              {
                label: metaObj.viewName,
                icon: "application",
                pid: "TextHexConverter",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.simpleLeftRightConvertor({
      totalTitle: appTitle,
      handleRawInBackend: true,
      handleRawFileTooltip: `Uploaded. CodeGen will use encode mode to calculate the file {0}`,
      noTriggerWhenCall: true,
      noSources: false,
      syncView: true,
      type: "plaintext",
      apiName: "hex_digits",
      metaObj,
      gref,
      PreRequisiteJson,
      exampleStr: fn_otherPages.form.plainTextExampleStr,
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            onClick: fn_formatSelfTranslate("hex_encode"),
            label: t(`Hex Encode`),
            intent: "primary",
          },
          {
            onClick: fn_formatSelfTranslate("hex_decode"),
            label: t(`Hex Decode`),
            intent: "primary",
          },
        ];
      },
      fn_configItem: ({ crtStoreName, PUtils }) => {
        let model = gstore.common_app[crtStoreName].model;
        return [
          {
            label: t("Charset"),
            children: [
              {
                tag: GSyncSelectWithFilter,
                index: "config_charset",
                obj: model,
                whenChg: (x) => {
                  model.config_charset = x;
                },
                list: gstore.common_app.model_charset_listings,
              },
            ],
          },
        ];
      },
      default_select_tab: "scripts",
      handle: async (
        { leftValue, type = "hex_encode" },
        { crtStoreName, PUtils }
      ) => {
        console.log("rendering v1", type, leftValue);
        let str = leftValue;
        let { data } = await gref.optAPI("transform", {
          ...gstore.common_app[crtStoreName].model,
          text: str,
          type: type,
        });
        return {
          result: data.value,
        };
      },
      fn_getConfigList({ PUtils, model, crtStore, crtStoreName, commonSave }) {
        return [].filter((x) => !_.isNil(x));
      },
    }),
  };
};
