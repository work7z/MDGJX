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
import EncodeConfig from "./encode_config";
let encode_config = EncodeConfig;

let appTitle = "Asymmetric Encryption(SM2)";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appTitle,
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState() {
      return {
        sm2_encrypt_order: "C1C2C3",
        ...EncodeConfig.state,
        init_pubpri_before: false,
      };
    },
    menus: [
      {
        pid: "codec",
        children: [
          {
            ...fn_otherPages.menu.getSMTools(),
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
        handleRawFileTooltip: `Uploaded. CodeGen will use encrypt mode to calculate the file {0}`,
        noTriggerWhenCall: true,
        noSources: false,
        syncView: true,
        type: "plaintext",
        fn_beforeActionBtn: ({ PUtils, fn_formatSelfTranslate }) => {
          let { crtModel } = PUtils;
          let model = crtModel;
          let handle_regen_key = async () => {
            let { data } = await gref.optAPI("init_key", {
              ...model,
            });
            console.log("got data", data);
            let pub = _.get(data, "value.pub");
            let pri = _.get(data, "value.pri", data.value);
            PUtils.crtModel.config_pubkey_value = pub;
            PUtils.crtModel.config_prikey_value = pri;
            PUtils.syncEditorValueFromModel([
              "config_pubkey_value",
              "config_prikey_value",
            ]);
          };
          return [
            {
              onClick: fn_formatSelfTranslate("encrypt"),
              label: t(`Encrypt`),
              intent: "primary",
            },
            {
              onClick: fn_formatSelfTranslate("decrypt"),
              label: t(`Decrypt`),
              intent: "primary",
            },
            {
              label: t(`Re-Generate Key`),
              intent: "warning",
              initFn: async () => {
                if (!PUtils.crtModel.init_pubpri_before) {
                  await handle_regen_key();
                  PUtils.crtModel.init_pubpri_before = true;
                }
              },
              onClick: handle_regen_key,
            },
          ];
        },
        fn_configItem: ({ crtStoreName, PUtils }) => {
          let { crtModel } = PUtils;
          let model = crtModel;
          return [
            // {
            //   label: t("KeyPair Tools"),
            //   children: [

            //   ],
            // },
            encode_config.getAfterConfigItem_1({ crtModel }),
            encode_config.getSM2Options({ crtModel }),
          ];
        },
        fn_leftPanelProps: fn_otherPages.jsx.createProcedurePanel(
          ({ PUtils }) => {
            let model = PUtils.crtModel;
            let crtStore = PUtils.crtStore;
            let crtStoreName = PUtils.crtStoreName;
            let commonSave = PUtils.commonSave;

            return {
              index: "pubkey",
              arr: [
                {
                  label: t(`Public Key`),
                  id: "pubkey",
                  jsx: PUtils.jsx.createGEditor({
                    title: `Public Key Value`,
                    fontSize: 11,
                    key: "config_pubkey_value",
                    language: "plaintext",
                    initContent: ``,
                    wordWrap: "on",
                  }),
                },
                {
                  label: t(`Private Key`),
                  id: "prikey",
                  jsx: PUtils.jsx.createGEditor({
                    title: `Private Key Value`,
                    fontSize: 11,
                    key: "config_prikey_value",
                    language: "plaintext",
                    wordWrap: "on",
                    initContent: ``,
                  }),
                },
              ],
            };
          }
        ),
        totalTitle: appTitle,
        language: "plaintext",
        exampleStr:
          gutils.example_json +
          "" +
          gutils.example_json +
          "" +
          gutils.example_json,
        handle: async (
          { leftValue, type = "encrypt" },
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
