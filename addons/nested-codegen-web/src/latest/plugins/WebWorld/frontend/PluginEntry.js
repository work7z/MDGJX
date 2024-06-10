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
const { Tabs, Tab } = CodeGenDefinition.BluePrintCpt;
import PreRequisiteJson from "../pre-requisite.json";
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import FormLabelTextInput from "../../TranslateForJSON/frontend/cpt/FormLabelTextInput";
import "./myfile.less";
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import menu_playground_webworld from "../../TranslateForJSON/frontend/pages/background/menu_playground_webworld";
import myhtml from "./myhtml";
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
import mycss from "./mycss";
import myjavascript from "./myjavascript";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "Web World";
let subMenu = [
  {
    label: `HTML Previewer`,
    icon: "application",
    id: "html",
    pathname: "/exts/ROOT_EXTENSION_ADDONS?type=detail&id=html",
    pid: "ROOT_EXTENSION_ADDONS_html",
  },
  {
    label: `LESS to CSS`,
    icon: "application",
    id: "less_to_css",
    pathname: "/exts/ROOT_EXTENSION_ADDONS?type=detail&id=less_to_css",
    pid: "ROOT_EXTENSION_ADDONS_less_to_css",
  },
];

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: async () => {
      await fn_otherPages.fn.loadStatic({
        PreRequisiteJson,
        gref,
      });
      return {
        less_input: `@red-color: red;
@remain-width: 30px;
// test style
.system{
  .box1{
    background: @red-color;
    width: calc(~"100% - @{remain-width}")
  }
  .box2{
    color: @red-color;
  }
}`,
        css_output: "",
        javascript_code_editor: myjavascript,
        css_code_editor: mycss,
        html_code_editor: myhtml,
        disable_preview: false,
      };
    },
    menus: [
      {
        ...fn_otherPages.getForPlayGroundFirstLayerMenu(),
        children: [
          {
            ...menu_playground_webworld,
            children: subMenu,
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
        // totalTitle: appTitle,
        noTranslateForTitle: true,
        totalTitle: ({ PUtils }) => {
          let findItem =
            _.find(subMenu, (x) => x.id == PUtils.getURLParams().id) || {};
          return t([findItem.label || PUtils.getURLParams().id].join(" - "));
        },
        left_hist_use_all: true,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;
          let urlParams = PUtils.getURLParams();
          PUtils.makeLeftHide();
          if (urlParams.id == "less_to_css") {
            let lc_ref = React.useRef({
              iframeRef: null,
              lastUpdateHTML: "",
              handleRef: null,
            });
            if (gutils.dev()) {
              window.lc_ref = lc_ref;
            }
            // get complete code
            let fn_get_current_less = () => {
              let my_value = PUtils.editor.getValue({
                id: "less_input",
              });
              return my_value;
            };
            let update_it_to_css = (value) => {
              PUtils.editor.setValue({
                id: "css_output",
                value,
              });
            };
            let sendFn = async (current_code) => {
              if (cutils.cond_emptyStr(current_code)) {
                update_it_to_css(
                  t(`/** ${t(`Cannot handle as the value is empty.`)} */`)
                );
                return;
              }
              less.render(current_code, {}, (err, result) => {
                lc_ref.current.lastUpdateHTML = current_code;
                if (err) {
                  // handle err
                  update_it_to_css(t(`Error: {0}`, err));
                } else {
                  // handle css
                  update_it_to_css(result.css);
                }
              });
            };
            // loop fn
            let loopFn = async () => {
              try {
                console.log("WEBWORLD handling #1");
                console.log("WEBWORLD handling #2");
                let current_code = fn_get_current_less();
                if (lc_ref.current.lastUpdateHTML != current_code) {
                  console.log("WEBWORLD handling #3");
                  await sendFn(current_code);
                }
              } catch (e) {
                console.log("err", e);
                lc_ref.current.lastUpdateHTML = null;
              }
            };
            PUtils.useLoop(async () => {
              loopFn();
            }, 800);
            useEffect(() => {
              gutils.defer(() => {
                sendFn(fn_get_current_less());
              }, 2000);
            }, []);
            return PUtils.jsx.createPanelWithBtnControls({
              get_copy_result_text: t(`Copy Code`),
              fn_get_copy_result: async () => {
                return fn_get_current_less();
              },
              helpBtnProps: {
                minimal: true,
                outlined: true,
              },
              controls: [
                {
                  text: t(`Apply Effect`),
                  intent: "primary",
                  // minimal: true,
                  // outlined: true,
                  // icon: "build",
                  loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
                  onClick: async () => {
                    cutils.alertOk_noT(t(`Applied.`));
                    let current_code = fn_get_current_less();
                    sendFn(current_code);
                  },
                },
              ],
              rightControls: [],
              body: (
                <div className="w100 h100">
                  {PUtils.jsx.leftRightSpliter({
                    resizekey: "ROOT_EXTENSION_ADDONS_main",
                    left: React.createElement(
                      observer((props) => {
                        return PUtils.jsx.tabWithDefinition({
                          default_select_tab: "str",
                          key: "top_json_console",
                          list: [
                            {
                              label: `LESS(${t(`INPUT`)})`,
                              jsx: observer((props) => {
                                return PUtils.jsx.createGEditor({
                                  fontSize: 11,
                                  key: "less_input",
                                  title: t(`{0} Code Editor`, `LESS`),
                                  language: "less",
                                  wordWrap: "off",
                                  // initContent: mycss,
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
                    right: React.createElement(
                      observer((props) => {
                        return PUtils.jsx.tabWithDefinition({
                          default_select_tab: "str",
                          key: "top_json_console",
                          list: [
                            {
                              label: `CSS(${t(`OUTPUT`)})`,
                              jsx: observer((props) => {
                                return PUtils.jsx.createGEditor({
                                  fontSize: 11,
                                  key: "css_output",
                                  title: t(`Destination for {0}`, `CSS`),
                                  language: "css",
                                  wordWrap: "off",
                                  // initContent: mycss,
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
                    percent: 0.5,
                  })}
                </div>
              ),
            });
          }
          if (urlParams.id == "html") {
            let lc_ref = React.useRef({
              iframeRef: null,
              lastUpdateHTML: "",
              handleRef: null,
            });
            if (gutils.dev()) {
              window.lc_ref = lc_ref;
            }
            // get complete code
            let fn_get_currrent_code = () => {
              let value_html_code_editor = PUtils.editor.getValue({
                id: "html_code_editor",
              });
              let value_css_code_editor = PUtils.editor.getValue({
                id: "css_code_editor",
              });
              let value_javascript_code_editor = PUtils.editor.getValue({
                id: "javascript_code_editor",
              });
              if (cutils.cond_emptyStr(value_html_code_editor)) {
                value_html_code_editor = ``;
              }
              if (!cutils.cond_emptyStr(value_css_code_editor)) {
                // adding css block
                value_html_code_editor = `${value_html_code_editor}\n<style>\n${value_css_code_editor}\n</style>`;
              }
              if (!cutils.cond_emptyStr(value_javascript_code_editor)) {
                value_html_code_editor = `${value_html_code_editor}\n<script>\n${value_javascript_code_editor}\n</script>`;
              }
              return value_html_code_editor;
            };
            let sendFn = async (current_code) => {
              lc_ref.current.iframeRef.contentWindow.postMessage(
                JSON.stringify({
                  timestamp: Date.now(),
                  current_code: current_code,
                }),
                "*"
              );
              lc_ref.current.lastUpdateHTML = current_code;
            };
            // loop fn
            let loopFn = async () => {
              try {
                console.log("WEBWORLD handling #1");
                if (!_.isNil(lc_ref.current.iframeRef)) {
                  console.log("WEBWORLD handling #2");
                  let current_code = fn_get_currrent_code();
                  if (lc_ref.current.lastUpdateHTML != current_code) {
                    console.log("WEBWORLD handling #3");
                    await sendFn(current_code);
                  }
                }
              } catch (e) {
                console.log("err", e);
                lc_ref.current.lastUpdateHTML = null;
              }
            };
            PUtils.useLoop(async () => {
              await loopFn();
            }, 800);
            return PUtils.jsx.createPanelWithBtnControls({
              get_copy_result_text: t(`Copy Code`),
              fn_get_copy_result: async () => {
                return fn_get_currrent_code();
              },
              helpBtnProps: {
                minimal: true,
                outlined: true,
              },
              controls: [
                {
                  text: t(`Apply Effect`),
                  intent: "primary",
                  // minimal: true,
                  // outlined: true,
                  // icon: "build",
                  loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
                  onClick: async () => {
                    cutils.alertOk_noT(t(`Applied.`));
                    let current_code = fn_get_currrent_code();
                    sendFn(current_code);
                  },
                },
                PUtils.crtModel.disable_preview
                  ? {
                      text: t(`Enable Preview`),
                      intent: "none",
                      // minimal: true,
                      // outlined: true,
                      // icon: "build",
                      loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
                      onClick: async () => {
                        PUtils.crtModel.disable_preview =
                          !PUtils.crtModel.disable_preview;
                      },
                    }
                  : {
                      text: t(`Stop Preview`),
                      intent: "warning",
                      // minimal: true,
                      // outlined: true,
                      // icon: "build",
                      loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
                      onClick: async () => {
                        PUtils.crtModel.disable_preview =
                          !PUtils.crtModel.disable_preview;
                      },
                    },
              ],
              rightControls: [],
              body: (
                <div className="w100 h100">
                  {PUtils.jsx.leftRightSpliter({
                    resizekey: "ROOT_EXTENSION_ADDONS_main",
                    left: React.createElement(
                      observer((props) => {
                        return PUtils.jsx.tabWithDefinition({
                          default_select_tab: "str",
                          key: "top_json_console",
                          list: [
                            {
                              label: `HTML`,
                              jsx: observer((props) => {
                                return PUtils.jsx.createGEditor({
                                  fontSize: 11,
                                  key: "html_code_editor",
                                  title: t(`{0} Code Editor`, "HTML"),
                                  language: "html",
                                  wordWrap: "off",
                                  // initContent: myhtml,
                                });
                              }),
                            },
                            {
                              label: `CSS`,
                              jsx: observer((props) => {
                                return PUtils.jsx.createGEditor({
                                  fontSize: 11,
                                  key: "css_code_editor",
                                  title: t(`{0} Code Editor`, `CSS`),
                                  language: "css",
                                  wordWrap: "off",
                                  // initContent: mycss,
                                });
                              }),
                            },
                            {
                              label: `JavaScript`,
                              jsx: observer((props) => {
                                return PUtils.jsx.createGEditor({
                                  fontSize: 11,
                                  key: "javascript_code_editor",
                                  title: t(`{0} Code Editor`, `JavaScript`),
                                  language: "javascript",
                                  wordWrap: "off",
                                  // initContent: myjavascript,
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
                    right: PUtils.crtModel.disable_preview ? (
                      <p className="pt-10">
                        {t(
                          `Preview page has been disabled by the user. To view it, please turn the option on.`
                        )}
                      </p>
                    ) : (
                      React.createElement(
                        observer((props) => {
                          return (
                            <iframe
                              ref={(e) => {
                                lc_ref.current.iframeRef = e;
                                gutils.defer(async () => {
                                  let current_code = fn_get_currrent_code();
                                  sendFn(current_code);
                                }, 2000);
                              }}
                              src={
                                cutils.getStaticURLPrefix() +
                                `/html/ostensibility/index.html?r=${Date.now()}`
                              }
                              key={("" + lc_ref.current.lastUpdateHTML).length}
                              frameBorder={0}
                              style={{
                                outline: "none",
                                border: "none",
                              }}
                              width={"100%"}
                              height={"98%"}
                            />
                          );
                        })
                      )
                    ),
                    percent: 0.5,
                  })}
                </div>
              ),
            });
          }
          return (
            <div>{t(`It's an unknown operation for {0}`, urlParams.id)}</div>
          );
        }),
      })
    ),
  };
};
