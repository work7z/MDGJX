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

let appTitle = "QueryString Codec";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appTitle,
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState() {
      return {
        init_pubpri_before: false,
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
                label: appTitle,
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
        handleRawFileTooltip: `Uploaded. CodeGen will use analyse mode to calculate the file {0}`,
        noTriggerWhenCall: true,
        noSources: false,
        syncView: true,
        type: "markdown",
        fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
          return [
            {
              onClick: fn_formatSelfTranslate("analyse"),
              label: t(`Analyse Result`),
              intent: "primary",
            },
          ];
        },
        fn_configItem_1: ({ crtStoreName, PUtils }) => {
          let handle_regen_key = async () => {
            let { data } = await gref.optAPI("init_key");
            console.log("got data", data);
            let pri = _.get(data, "value.pri", data.value);
            PUtils.crtModel.config_prikey_value = pri;
            PUtils.syncEditorValueFromModel(["config_prikey_value"]);
          };
          return [
            {
              label: t("KeyPair Tools"),
              children: [
                {
                  label: t(`Re-Generate Key`),
                  intent: "primary",
                  initFn: async () => {
                    if (!PUtils.crtModel.init_pubpri_before) {
                      await handle_regen_key();
                      PUtils.crtModel.init_pubpri_before = true;
                    }
                  },
                  onClick: handle_regen_key,
                },
              ],
            },
          ];
        },
        fn_leftPanelProps_2: fn_otherPages.jsx.createProcedurePanel(
          ({ PUtils }) => {
            let model = PUtils.crtModel;
            let crtStore = PUtils.crtStore;
            let crtStoreName = PUtils.crtStoreName;
            let commonSave = PUtils.commonSave;
            return {
              index: "pubkey",
              arr: [
                {
                  label: t(`Secret Key`),
                  id: "prikey",
                  jsx: PUtils.jsx.createGEditor({
                    fontSize: 11,
                    key: "config_prikey_value",
                    language: "markdown",
                    wordWrap: "on",
                    initContent: ``,
                  }),
                },
              ],
            };
          }
        ),
        totalTitle: appTitle,
        language: "markdown",
        exampleStr: `https://www.test.com/form/search?q&cp=0&client=gws-wiz&xssi=t&hl=en&authuser=0&psi=bkqfYpGZDq2ekPIPnaSfkAw.1654606447301&nolsbt=1&dpr=2.20000004x7683716\n?format=json&hasfast=true&authuser=0\nformat=json&hasfast=true`,
        handle: async (
          { leftValue, type = "analyse" },
          { crtStoreName, PUtils }
        ) => {
          console.log("rendering v1", type, leftValue);
          let str = leftValue;
          let { data } = await gref.optAPI("transform", {
            ...PUtils.crtModel,
            text: str,
            type: type,
          });
          return {
            result: data.value,
          };
        },
      })
    ),
  };
};
