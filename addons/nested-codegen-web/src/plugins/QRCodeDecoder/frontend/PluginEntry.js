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
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
import FormQrCodeViewer from "../../TranslateForJSON/frontend/cpt/FormQrCodeViewer";

let appTitle = "QRCode Decoder";
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appTitle,
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    // unlimited_view_mode: true,
    // notReady: !gutils.dev(),
    // willReadyVersion: `v1.7.92`,
    initialState: async () => {
      return {
        crt_decode_result: "",
      };
    },
    menus: [
      {
        pid: "color",
        children: [
          {
            ...fn_otherPages.get_qrcode_list(),
            children: [
              {
                label: metaObj.appName,
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
        appId: metaObj.appId,
        fn_appName: () => {
          return metaObj.appName;
        },
      },
      fn_otherPages.rightMainPageJsx({
        totalTitle: appTitle,
        left_hist_use_all: true,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;

          return PUtils.jsx.createPanelWithBtnControls({
            // fn_get_copy_result: async () => {
            //   return PUtils.editor.getValue({
            //     id: "ROOT_EXTENSION_ADDONS_encode_text_result",
            //   });
            // },
            helpBtnProps: {
              minimal: true,
              outlined: true,
            },
            controls: [
              {
                text: t(`Select QRCode From File`),
                intent: "primary",
                loading: false,
                loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
                onClick: async () => {
                  gutils.defer(async () => {
                    let fileRef = await cutils.selectFile();
                    window.t___fileRef = fileRef;
                    let mres = await gref.optAPI("qrcode_decode", {
                      fileRef,
                    });
                    window.t___mres = mres;
                    if (_.isNil(mres.data.value)) {
                      mres.data.value = t(`Unable to decode its value.`);
                    }
                    PUtils.crtModel.crt_decode_result = mres.data.value;
                    PUtils.editor.setValue({
                      id: "qrcode_result",
                      value: PUtils.crtModel.crt_decode_result,
                    });
                    gutils.alertOk(
                      "Finished decoding this image you uploaded."
                    );
                  });
                },
              },
              // {
              //   text: t(`Select QRCode From Clipboard`),
              //   intent: "primary",
              //   loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
              //   onClick: async () => {
              //     await fn_updateCalc_real();
              //     gutils.alertOk(`Created a JWT Token.`);
              //   },
              // },
              {
                text: t(`Generate QRCode`),
                intent: "warning",
                loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn33",
                onClick: async () => {
                  //
                  gutils.hist.push("/exts/QRCodeCreator");
                },
              },
            ],
            fn_get_copy_result: async () => {
              return PUtils.editor.getValue({ id: "qrcode_result" });
            },
            rightControls: [],
            body: (
              <div className="w100 h100">
                {React.createElement(
                  observer((props) => {
                    return PUtils.jsx.tabWithDefinition({
                      default_select_tab: "decoded_result",
                      key: "ROOT_EXTENSION_ADDONS_decode_str_tab",
                      list: [
                        {
                          id: "decoded_result",
                          label: t(`Decoded Result`),
                          jsx: observer((props) => {
                            return (
                              <div className="w100 h100">
                                {PUtils.jsx.createGEditor({
                                  title: t(`QRCode Decode Result`),
                                  fontSize: 11,
                                  readOnly: true,
                                  wordWrap: "on",
                                  key: "qrcode_result",
                                  language: "plaintext",
                                  initContent: ``,
                                })}
                              </div>
                            );
                          }),
                        },
                        {
                          label: t(`Other`),
                          jsx: observer((props) => {
                            return (
                              <div
                                className="pd-10"
                                style={{
                                  width: "500px",
                                  margin: "0 auto",
                                  textAlign: "center",
                                }}
                              >
                                <h3>
                                  {t(`QRCode Preview from Your Decoded Result`)}
                                </h3>
                                <p
                                  style={{
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <FormQrCodeViewer
                                    myW={"200px"}
                                    myH={"200px"}
                                    gref={gref}
                                    enable={
                                      !_.isNil(PUtils.crtModel.qrcode_result)
                                    }
                                    moveFactor={
                                      PUtils.crtModel.qrcode_result + ""
                                    }
                                    url={PUtils.crtModel.qrcode_result}
                                  />
                                </p>
                                <h3>{t(`Other Tools`)}</h3>
                                <p style={{ textAlign: "center" }}>
                                  <Button
                                    text={t(`QRCode Encoder`)}
                                    large={true}
                                    onClick={() => {
                                      gutils.hist.push("/exts/QRCodeCreator");
                                    }}
                                  ></Button>
                                </p>
                              </div>
                            );
                            // <div
                            //   className="sys-card-wrapper white-app-view-no-pad "
                            //   style={{ width: "100%", height: "100%" }}
                            // >
                            //   <PluginLoadView pop={true} id="QRCodeCreator" />
                            // </div>
                          }),
                        },
                      ].map((x) => {
                        x.mode_jsx_func = true;
                        return x;
                      }),
                    });
                  })
                )}
              </div>
            ),
          });
        }),
      })
    ),
  };
};

// {
//   label: `Base64`,
//   jsx: observer((props) =>
//     PUtils.jsx.createGEditor({
//       title: t(`QRCode Decode Result`),
//       fontSize: 11,
//       wordWrap: "on",
//       key: "ROOT_EXTENSION_ADDONS_encode_str",
//       language: "plaintext",
//       initContent: ``,
//     })
//   ),
// },
