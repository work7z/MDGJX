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
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import PreRequisiteJson from "../pre-requisite.json";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "JWT Token Decoder";
//
window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: async () => {
      return {
        myvalue: 12345,
        decode_obj: {},
        jwt_signature_value: "",
        jwt_payload_value: "",
        jwt_decode_text_result: "",
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
                label: appTitle,
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
          return PUtils.jsx.createPanelWithBtnControls({
            fn_get_copy_result: async () => {
              return PUtils.editor.getValue({
                id: "jwt_decode_text_result",
              });
            },
            fn_show_example: () => {
              PUtils.editor.setValue({
                id: "jwt_decode_str",
                value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aGlzIGlzIHRlc3QgcGF5bG9hZCB2YWx1ZSI6W3sid2Vic2l0ZSI6Imh0dHBzOi8vY29kZWdlbi5jYyJ9XSwiaWF0IjoxNjU1MTI5MDkzLCJleHAiOjE2NTY1MTgzOTksImF1ZCI6InRlc3RfYXVkaWVuY2UiLCJpc3MiOiJjb2RlZ2VuIiwic3ViIjoidGVzdF9zdWJqZWN0In0.Klwk2o8y5owUuTwmzJ9WUsUswy3PDajDi48gjPcjzXM`,
              });
            },
            controls: [
              {
                text: t(`Decode JWT Token`),
                intent: "primary",
                loading_id: "decode_jwt_token_btn",
                onClick: async () => {
                  try {
                    PUtils.editor.clearValue({
                      id: "jwt_decode_text_result",
                    });
                    PUtils.editor.clearValue({
                      id: "jwt_header_value",
                    });
                    PUtils.editor.clearValue({
                      id: "jwt_payload_value",
                    });
                    PUtils.editor.clearValue({
                      id: "jwt_signature_value",
                    });
                    let finText = PUtils.editor.getValue({
                      id: "jwt_decode_str",
                    });
                    let { data } = await gref.optAPI(`decode_jwt_token`, {
                      text: finText,
                    });
                    let value = _.get(data, "value", {});
                    PUtils.crtModel.decode_obj = value;
                    window.PUtils_001 = PUtils;
                    window.PUtils_t_data = value;
                    gutils.defer(() => {
                      PUtils.editor.setValue({
                        id: "jwt_decode_text_result",
                        value: JSON.stringify(value, 0, 4),
                      });
                      PUtils.editor.setValue({
                        id: "jwt_header_value",
                        value: JSON.stringify(value.header, 0, 4),
                      });
                      PUtils.editor.setValue({
                        id: "jwt_payload_value",
                        value: JSON.stringify(value.payload, 0, 4),
                      });
                      PUtils.editor.setValue({
                        id: "jwt_signature_value",
                        value: JSON.stringify(value.signature, 0, 4),
                      });
                    }, 0);
                  } catch (e) {
                    gutils.alert({
                      message: gutils.getErrMsg(e),
                      intent: "danger",
                    });
                  }
                },
              },
            ],
            rightControls: [
              {
                text: t(`Encode Mode`),
                intent: "none",
                onClick: () => {
                  // identify
                  fn_otherPages.route.redirect_to_ext("JWTEncoder");
                },
              },
            ],
            body: (
              <div className="w100 h100">
                {PUtils.jsx.topBtmSpliter({
                  border: true,
                  top: React.createElement(
                    observer((props) => {
                      return PUtils.jsx.tabWithDefinition({
                        default_select_tab: "str",
                        key: "jwt_decode_str_tab",
                        list: [
                          {
                            label: `JWT Token`,
                            jsx: observer((props) =>
                              PUtils.jsx.createGEditor({
                                use_original_text: true,
                                fontSize: 11,
                                wordWrap: "off",
                                key: "jwt_decode_str",
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
                  percent: 0.4,
                  btm: React.createElement(
                    observer((props) => {
                      return PUtils.jsx.tabWithDefinition({
                        default_select_tab: "str",
                        key: "jwt_decode_tab_btm",
                        list: [
                          {
                            label: t(`Overview`),
                            jsx: observer((props) => {
                              let decode_obj = _.get(
                                PUtils.crtModel,
                                "decode_obj"
                              );
                              let formatTime = (str) => {
                                if (_.isNil(str)) {
                                  return "";
                                }
                                str *= 1000;
                                try {
                                  return Moment(parseInt("" + str)).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                  );
                                } catch (e) {
                                  return "Invalid Formatting.";
                                }
                              };
                              let formatTimeWithMark = (str) => {
                                if (_.isNil(str)) {
                                  return "";
                                }
                                str *= 1000;
                                try {
                                  return `${str}(${Moment(
                                    parseInt("" + str)
                                  ).fromNow()})`;
                                } catch (e) {
                                  return "Invalid Formatting.";
                                }
                              };
                              return (
                                <div className="w100 h100 pd-10">
                                  <FormEasyTable
                                    column={[
                                      {
                                        label: t(`JWT Name`),
                                        value: (x) => x.label,
                                      },
                                      {
                                        label: t(`JWT Value`),
                                        value: (x) => x.value,
                                      },
                                      {
                                        label: t(`Remarks`),
                                        value: (x) => x.remark || "",
                                      },
                                    ]}
                                    data={[
                                      {
                                        label: `JWT Issuer(iss)`,
                                        value: _.get(decode_obj, "issuer", ""),
                                      },
                                      {
                                        label: `Encryption Type(alg)`,
                                        value: _.get(
                                          decode_obj,
                                          "header.alg",
                                          ""
                                        ),
                                      },
                                      {
                                        label: `Subject(sub)`,
                                        value: _.get(decode_obj, "subject", ""),
                                      },
                                      {
                                        label: `Audience(aud)`,
                                        value: _.get(
                                          decode_obj,
                                          "payload.aud",
                                          ""
                                        ),
                                      },
                                      // {
                                      //   label: `Not Before(nbf)`,
                                      //   value: _.get(decode_obj,'payload.aud',''),
                                      // },
                                      {
                                        label: `Expiration(exp)`,
                                        value: formatTime(
                                          _.get(decode_obj, "payload.exp", "")
                                        ),
                                        remark: formatTimeWithMark(
                                          _.get(decode_obj, "payload.exp", "")
                                        ),
                                      },
                                      {
                                        label: `Issue At(jat)`,
                                        value: formatTime(
                                          _.get(decode_obj, "payload.iat", "")
                                        ),
                                        remark: formatTimeWithMark(
                                          _.get(decode_obj, "payload.iat", "")
                                        ),
                                      },
                                      // {
                                      //   label: `JWT ID(jti)`,
                                      //   value: _.get(decode_obj, "id", ""),
                                      // },
                                      // {
                                      //   label: `Valid Signature?`,
                                      //   value: `N/A`,
                                      // },
                                    ].map((x) => {
                                      x.label = t(x.label);
                                      return x;
                                    })}
                                  ></FormEasyTable>
                                </div>
                              );
                            }),
                          },
                          {
                            label: t(`Visual Results`),
                            jsx: observer((props) => {
                              return PUtils.jsx.tabWithDefinition({
                                default_select_tab: "str",
                                key: "jwt_decode_tab_visual_btm",
                                list: [
                                  {
                                    label: t(`JWT Header Value`),
                                    jsx: (
                                      <FormEditorWithAction
                                        PUtils={PUtils}
                                        title={`JWT Header Value`}
                                        args={{
                                          key: `jwt_header_value`,
                                          language: "json",
                                        }}
                                      ></FormEditorWithAction>
                                    ),
                                  },
                                  {
                                    label: t(`JWT Payload Value`),
                                    jsx: (
                                      <FormEditorWithAction
                                        title={`JWT Payload Value`}
                                        PUtils={PUtils}
                                        args={{
                                          key: `jwt_payload_value`,
                                          language: "json",
                                        }}
                                      ></FormEditorWithAction>
                                    ),
                                  },
                                  {
                                    label: t(`JWT Signature Value`),
                                    jsx: (
                                      <FormEditorWithAction
                                        PUtils={PUtils}
                                        title={`JWT Signature Value`}
                                        args={{
                                          key: `jwt_signature_value`,
                                          language: "json",
                                        }}
                                      ></FormEditorWithAction>
                                    ),
                                  },
                                ],
                              });
                            }),
                          },
                          {
                            label: t(`Text Results`),
                            jsx: observer((props) =>
                              PUtils.jsx.createGEditor({
                                use_target_text: true,
                                fontSize: 11,
                                wordWrap: "off",
                                key: "jwt_decode_text_result",
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
