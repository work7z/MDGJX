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
import PreRequisiteJson from "../pre-requisite.json";
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import FormLabelTextInput from "../../TranslateForJSON/frontend/cpt/FormLabelTextInput";
import "./myfile.less";
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import mappingLogic from "./key";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "JWT Token Encoder";

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: async () => {
      let { data } = await gref.optAPI("get_algorithm_listings");
      return {
        val_jwt_exp: fn_otherPages.utils.now_str(),
        val_jwt_jat: fn_otherPages.utils.now_str(),
        crt_alg_type: _.get(data, "value.0.value"),
        algorithm_listings: _.get(data, "value"),
        myvalue: 12345,
        decode_obj: {},
      };
    },
    menus: [
      {
        pid: "codec",
        children: [
          {
            ...fn_otherPages.menu.getWebTokenUtils(),
            children: [
              {
                label: "JWT Token Encoder",
                icon: "application",
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
      fn_otherPages.rightMainPageJsx({
        totalTitle: appTitle,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;
          let fn_updateCalc = () => {};
          let fn_updateCalc_real = async () => {
            let { data } = await gref.optAPI(`encode_jwt_token`, {
              ...crtModel,
            });
            window.up_001 = data;
            PUtils.editor.setValue({
              id: "jwt_encode_str",
              value: data.value,
            });
            PUtils.editor.setValue({
              id: "jwt_encode_json",
              value: JSON.stringify(data.info, 0, 4),
            });
          };
          return PUtils.jsx.createPanelWithBtnControls({
            fn_get_copy_result: async () => {
              return PUtils.editor.getValue({
                id: "jwt_encode_text_result",
              });
            },
            controls: [
              {
                text: t(`Create JWT Token`),
                intent: "primary",
                loading_id: "encode_jwt_token_btn",
                onClick: async () => {
                  await fn_updateCalc_real();
                  gutils.alertOk(`Created a JWT Token.`);
                },
              },
              {
                text: t(`Init Encrypt Key`),
                intent: "primary",
                loading_id: "init_encrypt_key_btn",
                onClick: async () => {
                  gutils.alert(
                    `The encrypted key is only used for testing purpose, please DO NOT use it in production environment!`
                  );
                  let crt_encrypt_type = mappingLogic[crtModel.crt_alg_type];
                  if (crt_encrypt_type.sec) {
                    PUtils.editor.setValue({
                      id: "jwt_encode_secret_key",
                      value: crt_encrypt_type.sec,
                    });
                  } else {
                    PUtils.editor.setValue({
                      id: "jwt_encode_public_key",
                      value: crt_encrypt_type["pub"],
                    });
                    PUtils.editor.setValue({
                      id: "jwt_encode_private_key",
                      value: crt_encrypt_type["pri"],
                    });
                  }
                },
              },
            ],
            rightControls: [
              {
                text: t(`Decode Mode`),
                intent: "none",
                //
                onClick: () => {
                  // identify
                  fn_otherPages.route.redirect_to_ext("JWTDecoder");
                },
              },
            ],
            body: (
              <div className="w100 h100">
                {PUtils.jsx.topBtmSpliter({
                  border: true,
                  percent: 0.5,
                  top: React.createElement(
                    observer((props) => {
                      return PUtils.jsx.tabWithDefinition({
                        default_select_tab: "str",
                        key: "jwt_decode_tab_btm",
                        list: [
                          {
                            label: t(`JWT Config`),
                            jsx: observer((props) => {
                              return PUtils.jsx.leftRightSpliter({
                                resizekey: "jwt_config_logic",
                                left: (
                                  <div className="g-fieldset-wrapper">
                                    <fieldset>
                                      <legend>
                                        {t("Encryption Type(alg)")}
                                      </legend>
                                      <GFormSelect
                                        value={crtModel.crt_alg_type}
                                        list={crtModel.algorithm_listings}
                                        onChange={(e) => {
                                          crtModel.crt_alg_type =
                                            e.target.value;
                                        }}
                                      ></GFormSelect>
                                    </fieldset>
                                    <fieldset>
                                      <legend>{t("Standard Payload")}</legend>
                                      <div className="sub-pt-10">
                                        <FormLabelTextInput
                                          obj={crtModel}
                                          onChg={() => {
                                            fn_updateCalc();
                                          }}
                                          index={`val_jwt_issuer`}
                                          label={t(`JWT Issuer(iss)`)}
                                        ></FormLabelTextInput>
                                        <FormLabelTextInput
                                          onChg={() => {
                                            fn_updateCalc();
                                          }}
                                          obj={crtModel}
                                          index={`val_jwt_jat`}
                                          label={t(`Issue At(jat)`)}
                                          mode={"datetime"}
                                        ></FormLabelTextInput>
                                        <FormLabelTextInput
                                          obj={crtModel}
                                          onChg={() => {
                                            fn_updateCalc();
                                          }}
                                          index={`val_jwt_exp`}
                                          label={t(`Expiration(exp)`)}
                                          mode={"datetime"}
                                        ></FormLabelTextInput>
                                        <FormLabelTextInput
                                          onChg={() => {
                                            fn_updateCalc();
                                          }}
                                          obj={crtModel}
                                          index={`val_jwt_aud`}
                                          label={t(`Audience(aud)`)}
                                        ></FormLabelTextInput>
                                        <FormLabelTextInput
                                          onChg={() => {
                                            fn_updateCalc();
                                          }}
                                          obj={crtModel}
                                          index={`val_jwt_sub`}
                                          label={t(`Subject(sub)`)}
                                        ></FormLabelTextInput>
                                      </div>
                                    </fieldset>
                                    <fieldset>
                                      <legend>
                                        {t("Self-Defined Payload")}
                                      </legend>
                                      <div>
                                        <FormCrudTable
                                          onChg={() => {
                                            fn_updateCalc();
                                          }}
                                          obj={crtModel}
                                          index={
                                            "val_jwt_self_defined_payload_array"
                                          }
                                          column={[
                                            {
                                              label: t(`Name`),
                                              prop: "key",
                                            },
                                            {
                                              label: t(`Value`),
                                              prop: "value",
                                            },
                                          ]}
                                        ></FormCrudTable>
                                      </div>
                                    </fieldset>
                                  </div>
                                ),
                                right: React.createElement(
                                  observer((props) => {
                                    let crt_alg_type = crtModel.crt_alg_type;
                                    let algorithm_listings =
                                      crtModel.algorithm_listings;
                                    let crtAlgItem = _.find(
                                      algorithm_listings,
                                      (x) => x.value == crt_alg_type
                                    );
                                    console.log("crtAlgItem,", crtAlgItem);
                                    window.ok100200 = crtModel;
                                    let isCrtPubKeyMode =
                                      _.get(crtAlgItem, "type", "secret_key") ==
                                      "pub_pri";
                                    return PUtils.jsx.tabWithDefinition({
                                      default_select_tab: "str",
                                      key: "jwt_encode_right",
                                      list: [
                                        {
                                          label: t(`Secret Key`),
                                          hide: isCrtPubKeyMode,
                                          jsx: observer((props) =>
                                            PUtils.jsx.createGEditor({
                                              title: t(`Secret Key Value`),
                                              fontSize: 11,
                                              wordWrap: "off",
                                              key: "jwt_encode_secret_key",
                                              language: "plaintext",
                                              initContent: ``,
                                            })
                                          ),
                                        },
                                        {
                                          label: t(`Public Key`),
                                          hide: !isCrtPubKeyMode,
                                          jsx: observer((props) =>
                                            PUtils.jsx.createGEditor({
                                              title: t(`Public Key Value`),
                                              fontSize: 11,
                                              wordWrap: "off",
                                              key: "jwt_encode_public_key",
                                              language: "plaintext",
                                              initContent: ``,
                                            })
                                          ),
                                        },
                                        {
                                          label: t(`Private Key`),
                                          hide: !isCrtPubKeyMode,
                                          jsx: observer((props) =>
                                            PUtils.jsx.createGEditor({
                                              title: t(`Private Key Value`),
                                              fontSize: 11,
                                              wordWrap: "off",
                                              key: "jwt_encode_private_key",
                                              language: "plaintext",
                                              initContent: ``,
                                            })
                                          ),
                                        },
                                      ].map((x) => {
                                        x.mode_jsx_func = true;
                                        return x;
                                      }),
                                    });
                                  })
                                ),
                                percent: 0.7,
                              });
                            }),
                          },
                        ].map((x) => {
                          x.mode_jsx_func = true;
                          return x;
                        }),
                      });
                    })
                  ),
                  btm: React.createElement(
                    observer((props) => {
                      return PUtils.jsx.tabWithDefinition({
                        default_select_tab: "str",
                        key: "jwt_decode_str_tab",
                        list: [
                          {
                            label: t(`JWT Token`),
                            jsx: observer((props) =>
                              PUtils.jsx.createGEditor({
                                use_target_text: true,
                                fontSize: 11,
                                wordWrap: "on",
                                key: "jwt_encode_str",
                                language: "plaintext",
                                initContent: ``,
                              })
                            ),
                          },
                          {
                            label: t(`JWT JSON`),
                            jsx: observer((props) =>
                              PUtils.jsx.createGEditor({
                                use_target_text: true,
                                fontSize: 11,
                                wordWrap: "on",
                                key: "jwt_encode_json",
                                language: "json",
                                initContent: ``,
                              })
                            ),
                          },
                        ].map((x) => {
                          x.mode_jsx_func = true;
                          return x;
                        }),
                      });
                    })
                  ),
                })}
              </div>
            ),
          });
        }),
      })
    ),
  };
};
