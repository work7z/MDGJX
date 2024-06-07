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
  GFormSwitch,
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
import FormQrCodeViewer from "../../TranslateForJSON/frontend/cpt/FormQrCodeViewer";
import GFormInput2 from "../../SQLDrafts/frontend/Kit_GFormInput2";
let GFormInput = GFormInput2;

let appTitle = "QRCode Encoder";
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appTitle,
  viewName: appTitle,
};
let qrCodeRender = ({
  fn_getConfigList = () => {
    return [];
  },
  fn_configItem = ({ crtStoreName, PUtils }) => [],
  fn_beforeActionBtn,
  exampleStr,
  default_select_tab,
  gref,
  PreRequisiteJson,
  metaObj,
  apiName,
  btn_type,
}) => {
  let appTitle = metaObj.appName;
  return fn_otherPages.withPluginPage(
    PreRequisiteJson,
    {
      appId: metaObj.appName,
      fn_appName: () => {
        return metaObj.appId;
      },
    },
    fn_otherPages.simpleLeftRightConvertor({
      wordWrap: "on",
      noTriggerWhenCall: true,
      noSources: false,
      syncView: true,
      type: "javascript",
      exampleStr: exampleStr,
      // fn_rightMainGlobalJsx: ({ PUtils }) => {
      // return observer((props) => {
      //   return <div>ok</div>;
      // });
      // },
      fn_beforeActionBtn: ({ fn_formatSelfTranslate, PUtils }) => {
        return [
          {
            onClick: async () => {
              window.update_tab_index(`image_html_codeconfig_r`, `preview`);
              await gutils.sleep(100);
              PUtils.crtModel.config_qr_movefactor++;
            },
            label: t(`Generate QRCode`),
            intent: "primary",
          },
          {
            text: t(`Decode QRCode`),
            intent: "warning",
            loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn33",
            onClick: async () => {
              //
              gutils.hist.push("/exts/QRCodeDecoder");
            },
          },
        ];
      },
      fn_leftPanelProps: ({ PUtils }) => {
        let model = PUtils.crtModel;
        let crtStore = PUtils.crtStore;
        let crtStoreName = PUtils.crtStoreName;
        let commonSave = PUtils.commonSave;
        return {
          percent: 0.5,
          jsx: PUtils.jsx.panelWithTitle({
            title: "Procedure",
            jsx: React.createElement(
              observer((props) =>
                PUtils.jsx.tabWithDefinition({
                  default_select_tab: default_select_tab,
                  list: [
                    ...fn_getConfigList({
                      PUtils,
                      model,
                      crtStore,
                      crtStoreName,
                      commonSave,
                    }),
                    {
                      label: t(`Config`),
                      id: "config",
                      mode_jsx_func: true,
                      jsx: observer((props) => {
                        return React.createElement(
                          PUtils.fn.fn_form_jsx(
                            (props) => [
                              <FormGroup
                                helperText={t(
                                  "Sometimes, the user cannot scan the QRCode due to distance or scan range. Based on that, you can adjust the error correction level, CodeGen provides L/M/Q/H multiple levels in ascending order. Low levels can be scanned easier at a distance, but once you hide part of that image you will be unable to scan. High levels mean you can hide part of the image and you still can scan that image, but you have to stand closer to scan it."
                                )}
                                label={t("Error Correct Level")}
                              >
                                <GFormSelect
                                  value={model.config_qr_error_correct}
                                  list={[
                                    {
                                      label: `L`,
                                      value: `1`,
                                    },
                                    {
                                      label: `M`,
                                      value: `0`,
                                    },
                                    {
                                      label: `Q`,
                                      value: `3`,
                                    },
                                    {
                                      label: `H`,
                                      value: `2`,
                                    },
                                  ]}
                                  onChange={(e) => {
                                    console.log(
                                      "chg",
                                      e.target,
                                      e.target.value
                                    );
                                    model.config_qr_error_correct =
                                      e.target.value;
                                  }}
                                ></GFormSelect>
                              </FormGroup>,
                              <FormGroup
                                helperText={t(
                                  "Please specify the width of QRCode, the larger the image width you set, the bigger file size the you will get."
                                )}
                                label={t("Image Width")}
                              >
                                <GFormInput
                                  type="number"
                                  disabled={p_mode()}
                                  onChange={(val) => {
                                    model["config_qr_width"] = val;
                                  }}
                                  value={model["config_qr_width"]}
                                />
                              </FormGroup>,
                              <FormGroup
                                helperText={t(
                                  "Please specify the height of QRCode, width and height can be different."
                                )}
                                label={t("Image Height")}
                              >
                                <GFormInput
                                  type="number"
                                  disabled={p_mode()}
                                  onChange={(val) => {
                                    model["config_qr_height"] = val;
                                  }}
                                  value={model["config_qr_height"]}
                                />
                              </FormGroup>,
                              <FormGroup
                                helperText={t(
                                  "By Default, CodeGen will use 3 as its margin value."
                                )}
                                label={t("Image Margin")}
                              >
                                <GFormInput
                                  type="number"
                                  onChange={(val) => {
                                    model["config_qr_margin"] = val;
                                  }}
                                  value={model["config_qr_margin"]}
                                />
                              </FormGroup>,
                              p_mode() ? null : (
                                <FormGroup
                                  helperText={t(
                                    "If this field value isn't empty and file path does exist, CodeGen will write image file into the directory you specified accordingly."
                                  )}
                                  label={t("Output Directory(Optional)")}
                                >
                                  <GFormInput
                                    rightElement={
                                      <Button
                                        disabled={p_mode()}
                                        text={t("View Dir")}
                                        onClick={async (e) => {
                                          gutils.alertOk(
                                            `CodeGen triggered open directory action, if there's no folder was opened in your desktop, please check if the file path exists.`
                                          );
                                          try {
                                            await window.ipc.openFile(
                                              model["config_qr_output_dir"]
                                            );
                                          } catch (e) {
                                            gutils.alert({
                                              intent: "danger",
                                              message: `Cannot open your output directory, please check if it exists in your computer.`,
                                            });
                                          }
                                        }}
                                      ></Button>
                                    }
                                    onChange={(val) => {
                                      model["config_qr_output_dir"] = val;
                                    }}
                                    value={model["config_qr_output_dir"]}
                                  />
                                </FormGroup>
                              ),
                              p_mode() ? null : (
                                <FormGroup
                                  helperText={t(
                                    "If you specified a output directory and file name is empty, then CodeGen will use random name instead of. Please be noted that your file name should end with jpg extension."
                                  )}
                                  label={t("Output File Name(Optional)")}
                                >
                                  <GFormInput
                                    onChange={(val) => {
                                      model["config_qr_output_name"] = val;
                                    }}
                                    value={model["config_qr_output_name"]}
                                  />
                                </FormGroup>
                              ),
                              p_mode() ? null : (
                                <FormGroup
                                  helperText={t(
                                    "If this value is provided, then CodeGen will use placed an image at the center position of the result. Please be noted this option will be unavailable when the user disable icon."
                                  )}
                                  label={t("Icon File Absolute Path")}
                                >
                                  <GFormInput
                                    onChange={(val) => {
                                      model["config_qr_output_img_path"] = val;
                                    }}
                                    placeholder={`e.g. /users/jerry/test.jpg`}
                                    value={model["config_qr_output_img_path"]}
                                  />
                                </FormGroup>
                              ),
                              <FormGroup
                                helperText={t(
                                  "If you don't need an Icon for the QRCode, you can turn it off."
                                )}
                                label={t("Using the Icon?")}
                              >
                                <GFormSwitch
                                  valtype={"tf"}
                                  onChange={(val) => {
                                    model["config_qr_using_codegen_img"] = val;
                                  }}
                                  value={model["config_qr_using_codegen_img"]}
                                />
                              </FormGroup>,
                              <FormGroup
                                helperText={t(
                                  "By Default, CodeGen will disable displaying the raw base64 data of QRCode since it's too large to be displayed, it does will slow down the performance. But if you need pure raw base64 string, you can turn it on."
                                )}
                                label={t("View Base64 Data for QRCode?")}
                              >
                                <GFormSwitch
                                  valtype={"tf"}
                                  onChange={(val) => {
                                    model["config_qr_show_base64_str"] = val;
                                  }}
                                  value={model["config_qr_show_base64_str"]}
                                />
                              </FormGroup>,
                            ],
                            {
                              style: {
                                padding: "12px",
                              },
                            }
                          )
                        );
                      }),
                    },
                  ],
                  key: metaObj.appId + "config",
                })
              )
            ),
          }),
        };
      },
      fn_rightPanelProps: ({ PUtils }) => {
        let model = PUtils.crtModel;
        let crtStore = PUtils.crtStore;
        let crtStoreName = PUtils.crtStoreName;
        let commonSave = PUtils.commonSave;
        return {
          percent: 0.5,
          jsx: PUtils.jsx.panelWithTitle({
            title: "Output Information",
            jsx: React.createElement(
              observer((props) =>
                PUtils.jsx.tabWithDefinition({
                  default_select_tab: default_select_tab,
                  list: [
                    ...fn_getConfigList({
                      PUtils,
                      model,
                      crtStore,
                      crtStoreName,
                      commonSave,
                    }),
                    {
                      label: t(`Preview`),
                      id: "config",
                      mode_jsx_func: false,
                      jsx: React.createElement(
                        observer((props) => {
                          return (
                            <div
                              style={{
                                width: "100%",
                                height: "98%",
                                overflow: "auto",
                                width: "100%",
                                height: "98%",
                                overflow: "auto",
                                position: "relative",
                                overflow: "hidden",
                              }}
                            >
                              <FormQrCodeViewer
                                key={model.leftValue}
                                gref={gref}
                                enable={!_.isEmpty(model.leftValue)}
                                style={{ width: `50%`, margin: "10px auto" }}
                                moveFactor={
                                  model.config_qr_movefactor +
                                  JSON.stringify({
                                    ...model,
                                    config_qr_output_dir: "",
                                    config_qr_output_name: "",
                                  })
                                }
                                url={model.leftValue || ""}
                                otherConfig={{
                                  ...model,
                                }}
                                onGetDataUrl={(dataurl) => {
                                  model.config_qr_dataurl = dataurl;
                                  PUtils.crtStore.setRightValue(
                                    model["config_qr_show_base64_str"] == "true"
                                      ? dataurl
                                      : `[${t(
                                          `Generated a QRCode at {0}`,
                                          `${Moment().format(
                                            "YYYY-MM-DD HH:mm:ss"
                                          )}`
                                        )}]`
                                  );
                                  PUtils.crtStore.editor_right.updateOptions({
                                    wordWrap: "on",
                                  });
                                  PUtils.editor.setValue({
                                    id: "image_html_code",
                                    value: `<!-- Generated by CodeGen ToolBox -->\n<img alt="QRCode Image" src="${dataurl}"  />`,
                                  });
                                }}
                              />
                            </div>
                          );
                        })
                      ),
                    },
                    {
                      label: t(`HTML`),
                      id: "html",
                      mode_jsx_func: true,
                      jsx: observer((props) =>
                        PUtils.jsx.createGEditor({
                          title: t(`Image HTML Code(Data Protocol)`),
                          fontSize: 11,
                          wordWrap: "on",
                          key: "image_html_code",
                          language: "html",
                          initContent: ``,
                        })
                      ),
                    },
                  ],
                  key: "image_html_codeconfig_r",
                })
              )
            ),
          }),
        };
      },
      totalTitle: appTitle,
      language: "markdown",
      handle: async (
        { leftValue, type = btn_type },
        { crtStoreName, PUtils }
      ) => {
        console.log("rendering v1", type, leftValue);
        let str = leftValue;
        let { data } = await gref.optAPI(apiName, {
          ...PUtils.crtModel,
          text: str,
          type: type,
        });
        return {
          result: data.value,
        };
      },
      fn_configItem: fn_configItem,
    })
  );
};

const qrcode_kit = {
  render_state() {
    return {
      config_qr_show_base64_str: "false",
      config_qr_error_correct: 2,
      config_qr_movefactor: 1,
      config_qr_dataurl: ``,
      config_qr_margin: 3,
      config_qr_width: 800,
      config_qr_height: 800,
      config_qr_output_name: `codegen-qrcode.jpg`,
      config_qr_using_codegen_img: "true",
      config_qr_output_dir: null,
    };
  },
  render: qrCodeRender,
};

export default qrcode_kit;
