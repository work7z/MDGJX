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
  GSyncSelectWithFilter,
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
import encode_config from "../../EncryptSM2/frontend/encode_config";
import GFormInput2 from "../../SQLDrafts/frontend/Kit_GFormInput2";
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
import cypto_logic from "../../TranslateForJSON/frontend/kit/cypto_utils";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import PreRequisiteJson from "../pre-requisite.json";

let appTitle = "RSA Algorithm";
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appTitle,
};
console.log(t(`CodeGen is decrypting content by using your private key.`));

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    // notReady: true,
    // notReady: !gutils.dev(),
    // willReadyVersion: `v1.6.2`,
    initialState() {
      return {
        ...encode_config.state,
        init_pubpri_before: false,
        // own keys
        aes_key_length: "2048",
        private_key_mode: "ECB",
        padding_type: "PKCS5Padding",
        basic_key_type: "RSA",
        config_prikey_value: "",
        iv_salt: "",
        config_charset: "UTF-8",
        // mode
        encode_mode_securekey: "plain_text",
        encode_mode_input: "plain_text",
        ...cypto_logic.all_state_value(),
        algorithm_type: "RSA",
      };
    },
    menus: [
      {
        pid: "codec",
        children: [
          {
            ...fn_otherPages.menu.getASymTools(),
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
        noTriggerWhenCall: true,
        noSources: false,
        syncView: true,
        type: "plaintext",
        fn_beforeActionBtn: ({ fn_formatSelfTranslate, PUtils }) => {
          let model = PUtils.crtModel;
          let crtStore = PUtils.crtStore;
          let crtModel = PUtils.crtModel;
          let crtStoreName = PUtils.crtStoreName;
          let commonSave = PUtils.commonSave;
          let handle_regen_key = async () => {
            let { data } = await gref.optAPI("init_key", {
              ...PUtils.crtModel,
            });
            console.log("got data", data);
            let pri = _.get(data, "value.pri", data.value);
            let pub = _.get(data, "value.pub", data.value);
            PUtils.crtModel.config_prikey_value = pri;
            PUtils.crtModel.config_pubkey_value = pub;
            PUtils.syncEditorValueFromModel(["config_prikey_value"]);
            PUtils.syncEditorValueFromModel(["config_pubkey_value"]);
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
              label: t(`Generate Key`),
              intent: "warning",
              onClick: async () => {
                PUtils.crtModel.encode_mode_securekey = "base64";
                await handle_regen_key();
                gutils.alertOk(
                  t(
                    `Generated a new {0} successfully! By Default, CodeGen will use base64 mode when generating the new key, if you need a plain text type, please specify your own secure key manually.`,
                    "key"
                  ) +
                    t(
                      `At the same time, please be noted the public key will be used in encryption whereas the private key will be used in decryption. If you need to use these keys conversely, CodeGen guessed that you need the RSA signature feature, no worries, you can find this feature in CodeGen soon.`
                    )
                );
              },
            },
          ];
        },
        fn_configItem: ({ crtStoreName, PUtils }) => {
          let model = PUtils.crtModel;
          let crtStore = PUtils.crtStore;
          let crtModel = PUtils.crtModel;
          let commonSave = PUtils.commonSave;
          return cypto_logic.getConfigItemFn({
            PUtils,
            otherArr: [
              {
                label: t("Key Length"),
                children: [
                  {
                    tag: GSyncSelectWithFilter,
                    index: "aes_key_length",
                    obj: crtModel,
                    whenChg: (x) => {},
                    list: [
                      {
                        label: "512",
                        value: `512`,
                      },
                      {
                        label: `1024`,
                        value: `1024`,
                      },
                      {
                        label: `2048`,
                        value: `2048`,
                      },
                      {
                        label: `4096`,
                        value: `4096`,
                      },
                    ],
                  },
                ],
              },
            ],
          });
        },
        fn_leftPanelProps: fn_otherPages.jsx.createProcedurePanel(
          ({ PUtils }) => {
            let { crtModel } = PUtils;
            return {
              index: "pubkey",
              arr: [
                {
                  label: t(`Public Key`),
                  id: "pubkey",
                  jsx: PUtils.jsx.createGEditor({
                    fontSize: 11,
                    key: "config_pubkey_value",
                    title: t(`Public Key Value`),
                    language: "plaintext",
                    wordWrap: "on",
                    initContent: ``,
                  }),
                },
                {
                  label: t(`Private Key`),
                  id: "prikey",
                  jsx: PUtils.jsx.createGEditor({
                    fontSize: 11,
                    key: "config_prikey_value",
                    title: t(`Private Key Value`),
                    language: "plaintext",
                    wordWrap: "on",
                    initContent: ``,
                  }),
                },
                {
                  label: t(`Secure Key Config`),
                  id: "prikey_config",
                  mode_jsx_func: true,
                  jsx: observer((props) =>
                    React.createElement(
                      observer(
                        PUtils.fn.fn_form_jsx_by_config(() => {
                          return [
                            {
                              label: t(`RSA Algorithm Type`),
                              helperText: t(
                                `Learn More please refer to {0}`,
                                `https://docs.oracle.com/javase/7/docs/technotes/guides/security/StandardNames.html#KeyPairGenerator`
                              ),
                              tag: GFormSelect,
                              tagProps: {
                                list: [
                                  {
                                    label: t("Default RSA Algoithm"),
                                    value: "RSA",
                                  },
                                  {
                                    label: "RSA/ECB/PKCS1Padding",
                                    value: "RSA/ECB/PKCS1Padding",
                                  },
                                  {
                                    label: "RSA/None/NoPadding",
                                    value: "RSA/None/NoPadding",
                                  },
                                ],
                                onChange(x) {
                                  PUtils.crtModel.algorithm_type =
                                    x.target.value;
                                },
                                value: PUtils.crtModel.algorithm_type,
                              },
                            },

                            {
                              label: t(`Seeds`),
                              helperText:
                                t(`It's used for generating new key pair.`) +
                                t(`You can ignore it if you don't need it.`),
                              tag: GFormInput2,
                              tagProps: {
                                small: true,
                                noTranslate: true,
                                placeholder: `e.g. 0102030405060708`,
                                onChange(x) {
                                  PUtils.crtModel.seeds = x;
                                },
                                value: PUtils.crtModel.seeds || "",
                              },
                            },
                            // cypto_logic.value_remain_note({ PUtils }),
                          ];
                        })
                      )
                    )
                  ),
                },
                {
                  label: t(`Tips`),
                  id: "value_formation",
                  mode_jsx_func: true,
                  jsx: cypto_logic.value_formation_jsx({
                    noNeedGrOrSt: true,
                    PUtils,
                  }),
                },
              ],
            };
          }
        ),
        totalTitle: appTitle,
        language: "plaintext",
        exampleStr: gutils.example_json,
        handle: async (
          { leftValue, type = "encrypt" },
          { crtStoreName, PUtils }
        ) => {
          if (type == "encrypt") {
            gutils.alert(
              t(`CodeGen is encrypting content by using your public key.`)
            );
          } else if (type == "decrypt") {
            gutils.alert(
              t(`CodeGen is decrypting content by using your private key.`)
            );
          }
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
