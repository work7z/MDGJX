import cutils from "./common_utils";

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

let all_data_type_list = [
  {
    label: t("Plain Text"),
    value: "plain_text",
  },
  {
    label: "Base64",
    value: "base64",
  },
  {
    label: t(`Hex String`),
    value: "hex",
  },
];
const cypto_logic = {
  getPBEFn({
    metaObj,
    basic_key_type,
    appTitle,
    PreRequisiteJson,
    fn_otherPages,
    cutils,
    GFormInput2,
    encode_config,
  }) {
    return (gref) => {
      return {
        initialState() {
          return {
            ...encode_config.state,
            init_pubpri_before: false,
            // own keys
            aes_key_length: "256",
            private_key_mode: "ECB",
            padding_type: "PKCS5Padding",
            basic_key_type: basic_key_type,
            private_key_size: 1024,
            config_prikey_value: "",
            iv_salt: "",
            seeds: "",
            config_charset: "UTF-8",
            // mode
            encode_mode_securekey: "plain_text",
            encode_mode_input: "plain_text",
            ...cypto_logic.all_state_value(),
            iterate_count: 100,
            wordWrap: "on",
          };
        },
        menus: [
          {
            pid: "codec",
            children: [
              {
                ...fn_otherPages.menu.getSymTools(),
                children: [
                  {
                    label: appTitle,
                    pid: metaObj.appId,
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
            // upload_file_logic: async ({ fn_formatSelfTranslate, val }) => {
            //   console.log(`value`, val);
            //   let upload_file_encrypt = await fn_formatSelfTranslate(
            //     "upload_file_encrypt"
            //   );
            // },
            // handleRawInBackend: true,
            // handleRawFileTooltip: `Uploaded. CodeGen will use encrypt mode to calculate the file {0}`,
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
                PUtils.crtModel.config_prikey_value = pri;
                PUtils.syncEditorValueFromModel(["config_prikey_value"]);
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
                    let { private_key_size } = PUtils.crtModel;
                    private_key_size = parseInt(private_key_size);
                    if (
                      isNaN(private_key_size) ||
                      _.isNil(private_key_size) ||
                      !(private_key_size >= 512 && private_key_size <= 1024)
                    ) {
                      gutils.alert(
                        `Generate Key Size must range inclusively from 512 to 1024! Please check your config.`
                      );
                      return;
                    }
                    if (private_key_size % 64 != 0) {
                      gutils.alert(
                        t(
                          `Generate Key Size must be a multiple of 64! Please check your value {0}`,
                          private_key_size
                        )
                      );
                      return;
                    }
                    PUtils.crtModel.encode_mode_securekey = "base64";
                    gutils.alert(t(`Generating the new key... moments please`));
                    await handle_regen_key();
                    gutils.alertOk(
                      t(
                        `Generated a new {0} successfully! By Default, CodeGen will use base64 mode when generating the new key, if you need a plain text type, please specify your own secure key manually.`,
                        "key"
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
                            label: "128",
                            value: `128`,
                          },
                          {
                            label: `192`,
                            value: `192`,
                          },
                          {
                            label: `256`,
                            value: `256`,
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
                      label: t(`Secret Key Value`),
                      id: "prikey",
                      jsx: PUtils.jsx.createGEditor({
                        fontSize: 11,
                        key: "config_prikey_value",
                        title: t(`Mandatory Field`),
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
                                  label: t(`Mode`),
                                  helperText: t(
                                    `Learn More please refer to {0}`,
                                    `https://docs.oracle.com/javase/7/docs/technotes/guides/security/StandardNames.html#Cipher`
                                  ),
                                  tag: GFormSelect,
                                  tagProps: {
                                    list: [
                                      // {
                                      //   label: "NONE",
                                      //   value: "NONE",
                                      // },
                                      {
                                        label: "Cipher Block Chaining(CBC)",
                                        value: "CBC",
                                      },
                                      {
                                        label: "Cipher Feedback(CFB)",
                                        value: "CFB",
                                      },
                                      {
                                        label: "A Simplification of OFB(CTR)",
                                        value: "CTR",
                                      },
                                      {
                                        label: "Electronic Codebook(ECB)",
                                        value: "ECB",
                                      },
                                      {
                                        label: "Output Feedback(OFB)",
                                        value: "OFB",
                                      },
                                      // {
                                      //   label: "Propagating Cipher Block(PCBC)",
                                      //   value: "PCBC",
                                      // },
                                    ],
                                    onChange(x) {
                                      PUtils.crtModel.private_key_mode =
                                        x.target.value;
                                    },
                                    value: PUtils.crtModel.private_key_mode,
                                  },
                                },
                                {
                                  label: t(`Padding for Cipher`),
                                  helperText: t(
                                    `Learn More please refer to {0}`,
                                    `https://docs.oracle.com/javase/7/docs/technotes/guides/security/StandardNames.html#Cipher`
                                  ),
                                  tag: GFormSelect,
                                  tagProps: {
                                    list: [
                                      {
                                        label: "NoPadding",
                                        value: "NoPadding",
                                      },
                                      {
                                        label: "ISO10126Padding",
                                        value: "ISO10126Padding",
                                      },
                                      // {
                                      //   label: "OAEPPadding",
                                      //   value: "OAEPPadding",
                                      // },
                                      // {
                                      //   label: "PKCS1Padding",
                                      //   value: "PKCS1Padding",
                                      // },
                                      {
                                        label: "PKCS5Padding",
                                        value: "PKCS5Padding",
                                      },
                                      // {
                                      //   label: "SSL3Padding",
                                      //   value: "SSL3Padding",
                                      // },
                                    ],
                                    onChange(x) {
                                      PUtils.crtModel.padding_type =
                                        x.target.value;
                                    },
                                    value: PUtils.crtModel.padding_type,
                                  },
                                },
                                {
                                  label: t(`IV(Salt)`),
                                  helperText: t(
                                    `Namely the initialization vector, you should set it in the encryption and decryption.`
                                  ),
                                  tag: GFormInput2,
                                  tagProps: {
                                    small: true,
                                    noTranslate: true,
                                    placeholder: `e.g. 0102030405060708`,
                                    onChange(x) {
                                      PUtils.crtModel.iv_salt = x;
                                    },
                                    value: PUtils.crtModel.iv_salt || "",
                                  },
                                },
                                {
                                  label: t(`Iteration Count`),
                                  helperText: t(
                                    `By Default, CodeGen will set it as 100.`
                                  ),
                                  tag: GFormInput2,
                                  tagProps: {
                                    small: true,
                                    noTranslate: true,
                                    placeholder: `e.g. 100`,
                                    onChange(x) {
                                      PUtils.crtModel.iterate_count = x;
                                    },
                                    type: "number",
                                    value: PUtils.crtModel.iterate_count,
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
                      jsx: cypto_logic.value_formation_jsx({ PUtils }),
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
              if (type == "encrypt" || type == "decrypt") {
                if (
                  _.isNil(PUtils.crtModel.iv_salt) ||
                  "" == PUtils.crtModel.iv_salt
                ) {
                  gutils.alert(
                    `Please provide salt firstly, you can find it in the tab pane.`
                  );
                  return {
                    result: ``,
                  };
                  return;
                }
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
  },
  getRCFn({
    crtRCType,
    metaObj,
    appTitle,
    PreRequisiteJson,
    fn_otherPages,
    cutils,
    GFormInput2,
    encode_config,
  }) {
    return (gref) => {
      return {
        // notReady: true,
        // notReady: !gutils.dev(),
        // willReadyVersion: `v1.6.2`,
        initialState() {
          return {
            ...encode_config.state,
            init_pubpri_before: false,
            // own keys
            aes_key_length: "64",
            private_key_mode: "ECB",
            padding_type: "PKCS5Padding",
            basic_key_type: crtRCType,
            private_key_size: 1024,
            // mode
            ...cypto_logic.all_state_value(),
          };
        },
        menus: [
          {
            pid: "codec",
            children: [
              {
                ...fn_otherPages.menu.getSymTools(),
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
            // upload_file_logic: async ({ fn_formatSelfTranslate, val }) => {
            //   console.log(`value`, val);
            //   let upload_file_encrypt = await fn_formatSelfTranslate(
            //     "upload_file_encrypt"
            //   );
            // },
            // handleRawInBackend: true,
            // handleRawFileTooltip: `Uploaded. CodeGen will use encrypt mode to calculate the file {0}`,
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
                PUtils.crtModel.config_prikey_value = pri;
                PUtils.syncEditorValueFromModel(["config_prikey_value"]);
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
                    let { private_key_size } = PUtils.crtModel;
                    private_key_size = parseInt(private_key_size);
                    if (
                      isNaN(private_key_size) ||
                      _.isNil(private_key_size) ||
                      !(private_key_size >= 512 && private_key_size <= 1024)
                    ) {
                      gutils.alert(
                        `Generate Key Size must range inclusively from 512 to 1024! Please check your config.`
                      );
                      return;
                    }
                    if (private_key_size % 64 != 0) {
                      gutils.alert(
                        t(
                          `Generate Key Size must be a multiple of 64! Please check your value {0}`,
                          private_key_size
                        )
                      );
                      return;
                    }
                    PUtils.crtModel.encode_mode_securekey = "base64";
                    await handle_regen_key();
                    gutils.alertOk(
                      t(
                        `Generated a new {0} successfully! By Default, CodeGen will use base64 mode when generating the new key, if you need a plain text type, please specify your own secure key manually.`,
                        "key"
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
                            label: "64",
                            value: `64`,
                          },
                          // {
                          //   label: "Twice(128)",
                          //   value: `128`,
                          // },
                          // {
                          //   label: `Triple(192)`,
                          //   value: `192`,
                          // },
                          // {
                          //   label: `256`,
                          //   value: `256`,
                          // },
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
                      label: t(`Secret Key Value`),
                      id: "prikey",
                      jsx: PUtils.jsx.createGEditor({
                        fontSize: 11,
                        key: "config_prikey_value",
                        title: t(`Mandatory Field`),
                        language: "plaintext",
                        wordWrap: "on",
                        initContent: ``,
                      }),
                    },
                    // {
                    //   label: t(`Secure Key Config`),
                    //   id: "prikey_config",
                    //   mode_jsx_func: true,
                    //   jsx: observer((props) =>
                    //     React.createElement(
                    //       observer(
                    //         PUtils.fn.fn_form_jsx_by_config(() => {
                    //           return [
                    //             {
                    //               label: t(`Mode`),
                    //               helperText: t(
                    //                 `Learn More please refer to {0}`,
                    //                 `https://docs.oracle.com/javase/7/docs/technotes/guides/security/StandardNames.html#Cipher`
                    //               ),
                    //               tag: GFormSelect,
                    //               tagProps: {
                    //                 list: [
                    //                   // {
                    //                   //   label: "NONE",
                    //                   //   value: "NONE",
                    //                   // },
                    //                   {
                    //                     label: "Cipher Block Chaining(CBC)",
                    //                     value: "CBC",
                    //                   },
                    //                   {
                    //                     label: "Cipher Feedback(CFB)",
                    //                     value: "CFB",
                    //                   },
                    //                   {
                    //                     label: "A Simplification of OFB(CTR)",
                    //                     value: "CTR",
                    //                   },
                    //                   {
                    //                     label: "Electronic Codebook(ECB)",
                    //                     value: "ECB",
                    //                   },
                    //                   {
                    //                     label: "Output Feedback(OFB)",
                    //                     value: "OFB",
                    //                   },
                    //                   // {
                    //                   //   label: "Propagating Cipher Block(PCBC)",
                    //                   //   value: "PCBC",
                    //                   // },
                    //                 ],
                    //                 onChange(x) {
                    //                   PUtils.crtModel.private_key_mode =
                    //                     x.target.value;
                    //                 },
                    //                 value: PUtils.crtModel.private_key_mode,
                    //               },
                    //             },
                    //             {
                    //               label: t(`Padding for Cipher`),
                    //               helperText: t(
                    //                 `Learn More please refer to {0}`,
                    //                 `https://docs.oracle.com/javase/7/docs/technotes/guides/security/StandardNames.html#Cipher`
                    //               ),
                    //               tag: GFormSelect,
                    //               tagProps: {
                    //                 list: [
                    //                   {
                    //                     label: "NoPadding",
                    //                     value: "NoPadding",
                    //                   },
                    //                   {
                    //                     label: "ISO10126Padding",
                    //                     value: "ISO10126Padding",
                    //                   },
                    //                   // {
                    //                   //   label: "OAEPPadding",
                    //                   //   value: "OAEPPadding",
                    //                   // },
                    //                   // {
                    //                   //   label: "PKCS1Padding",
                    //                   //   value: "PKCS1Padding",
                    //                   // },
                    //                   {
                    //                     label: "PKCS5Padding",
                    //                     value: "PKCS5Padding",
                    //                   },
                    //                   // {
                    //                   //   label: "SSL3Padding",
                    //                   //   value: "SSL3Padding",
                    //                   // },
                    //                 ],
                    //                 onChange(x) {
                    //                   PUtils.crtModel.padding_type =
                    //                     x.target.value;
                    //                 },
                    //                 value: PUtils.crtModel.padding_type,
                    //               },
                    //             },
                    //             // {
                    //             //   label: t(`IV(Salt)`),
                    //             //   helperText: t(
                    //             //     `Namely the initialization vector, you can ignore it if you don't need it.`
                    //             //   ),
                    //             //   tag: GFormInput2,
                    //             //   tagProps: {
                    //             //     small: true,
                    //             //     noTranslate: true,
                    //             //     placeholder: `e.g. 0102030405060708`,
                    //             //     onChange(x) {
                    //             //       PUtils.crtModel.iv_salt = x;
                    //             //     },
                    //             //     value: PUtils.crtModel.iv_salt || "",
                    //             //   },
                    //             // },
                    //             // cypto_logic.value_remain_note({ PUtils }),
                    //           ];
                    //         })
                    //       )
                    //     )
                    //   ),
                    // },
                    {
                      label: t(`Tips`),
                      id: "value_formation",
                      mode_jsx_func: true,
                      jsx: cypto_logic.value_formation_jsx({ PUtils }),
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
  },
  all_state_value() {
    return {
      config_prikey_value: "",
      iv_salt: "",
      config_charset: "UTF-8",
      encode_mode_securekey: "plain_text",
      encode_mode_input_e: "plain_text",
      encode_mode_input_d: "base64",
      mode_output: "base64",
      wordWrap: "on",
    };
  },
  getConfigItemFn({ PUtils, otherArr = [] }) {
    let model = PUtils.crtModel;
    let crtStore = PUtils.crtStore;
    let crtModel = PUtils.crtModel;
    let commonSave = PUtils.commonSave;
    return [
      {
        label: t("Key Format"),
        children: [
          {
            tag: GSyncSelectWithFilter,
            index: "encode_mode_securekey",
            obj: PUtils.crtModel,
            list: all_data_type_list,
          },
        ],
      },
      {
        label: t("Encrypt From"),
        children: [
          {
            tag: GSyncSelectWithFilter,
            index: "encode_mode_input_e",
            obj: PUtils.crtModel,
            whenChg: (x) => {
              //
            },
            list: all_data_type_list,
          },
        ],
      },
      {
        label: t("Decrypt From"),
        children: [
          {
            tag: GSyncSelectWithFilter,
            index: "encode_mode_input_d",
            obj: PUtils.crtModel,
            whenChg: (x) => {
              //
            },
            list: all_data_type_list,
          },
        ],
      },
      ...otherArr,
      cutils.crud.form_charset({
        model: PUtils.crtModel,
        GSyncSelectWithFilter,
      }),
      {
        label: t("Encrypt As"),
        children: [
          {
            tag: GSyncSelectWithFilter,
            index: "mode_output",
            obj: PUtils.crtModel,
            whenChg: (x) => {
              //
            },
            list: _.map(all_data_type_list, (x, d, n) => {
              if (x.value == "plain_text") {
                return {
                  label: t(`Downloadable File`),
                  value: "file",
                };
              } else {
                return x;
              }
            }),
          },
        ],
      },
    ];
  },
  value_remain_note({ PUtils }) {
    return {
      directJsxMode: true,
      tag: () => (
        <Callout title={t(`Matters Need Attention`)} intent={"none"}>
          {t(
            `Please be noted that the value of the generated key is comprised of multiple factors from this form, which means you must re-generate a new secure key once you modify any option value in this form, otherwise you may encounter some unexpected exceptions, such as mismatch key size or formatting, unless you can provide your own secure key instead of generating a new key via CodeGen.`
          )}
        </Callout>
      ),
    };
  },
  value_formation_jsx({ PUtils, noNeedGrOrSt = false }) {
    return observer((props) =>
      React.createElement(
        observer(
          PUtils.fn.fn_form_jsx_by_config(() => {
            return [
              noNeedGrOrSt
                ? null
                : {
                    directJsxMode: true,
                    tag: () => (
                      <Callout
                        title={t(`When the key length isn't long enough...`)}
                        intent={"none"}
                      >
                        {t(
                          `No worries, if the key you specified isn't long enough to be used as encrypting/decrypting content. CodeGen will append 0x00 to fill the remain  content. For instance, if you specified 256-bits as the key length, then you should provide the qualified secure key, otherwise, CodeGen will help to pad the 0x00 value.`
                        )}
                      </Callout>
                    ),
                  },
              noNeedGrOrSt
                ? null
                : {
                    directJsxMode: true,
                    tag: () => (
                      <Callout
                        title={t(
                          `When the key length exceeds the maximum key size...`
                        )}
                        intent={"none"}
                      >
                        {t(
                          `For instance, if you specified 256-bit key length type, and the length of your secure key is greater than 256-bit, then we will truncate its extra content, namely reading the top 256-bit content merely.`
                        )}
                      </Callout>
                    ),
                  },
              {
                directJsxMode: true,
                tag: () => (
                  <Callout
                    title={t(`The Reliability of Result`)}
                    intent={"none"}
                  >
                    {t(
                      `We had tried our best to ensure the result accuracy by verifying lots of results that were calculated from these popular encryption/decryption websites, all of these test cases’ results are the same and positive,  please be assured to use the tool. If you found any calculation result issues while using this function, we hope you could kindly inform us to make CodeGen better.`
                    )}
                  </Callout>
                ),
              },
            ].filter((x) => !_.isNil(x));
          })
        )
      )
    );
  },
};

export default cypto_logic;
