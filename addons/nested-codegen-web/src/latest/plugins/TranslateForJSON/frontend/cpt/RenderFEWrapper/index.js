const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  GSyncSelectWithFilter,
  BluePrintPopover,
  Mobx,
  MobxReact,
  HalfResizeForTwo,
  MobxReactLite,
  ProgressBar,
  Dialog,
  Popover,
  Radio,
  GFormInput,
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
import "./index.less";

let fn_fe_wrapper = (m_arg) => {
  return (gref) => {
    let {
      PreRequisiteJson,
      ipt_template_example,
      appTitle,
      fn_otherPages,
      ipt_script_example,
      cutils,
      metaObj,
    } = m_arg;
    return {
      initialState: async () => {
        await fn_otherPages.fn.loadStatic({
          PreRequisiteJson,
          gref,
        });
        return {
          ipt_template: "",
          myvalue: 12345,
          decode_obj: {},
        };
      },
      menus: m_arg.menus,
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
          left_hist_use_all: true,
          noOptions: true,
          fn_afterConfigItem({ PUtils }) {
            return [];
          },
          jsx: observer((props) => {
            let { PUtils } = props;
            let { crtModel } = PUtils;
            return PUtils.jsx.createPanelWithBtnControls({
              fn_show_example: async () => {
                if (
                  await gutils.win_confirm(
                    t(
                      `Before showing an example, CodeGen will overwrite the template and related values, would you like to continue?`
                    )
                  )
                ) {
                  gutils.defer(() => {
                    try {
                      PUtils.editor.setValue({
                        id: "ipt_template",
                        value: ipt_template_example,
                      });
                      PUtils.editor.setValue({
                        id: "ipt_script",
                        value: ipt_script_example,
                      });
                    } catch (e) {
                      console.log("err", e);
                      debugger;
                    }
                  });
                }
              },
              fn_get_copy_result() {
                return PUtils.editor.getValue({
                  id: "output_result",
                });
              },
              helpBtnProps: {
                minimal: true,
                outlined: true,
              },
              controls: [
                {
                  text: t(`Generate Result`),
                  intent: "primary",
                  loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
                  onClick: async () => {
                    // await fn_otherPages.fn.loadStatic({
                    //   PreRequisiteJson,
                    //   gref,
                    // });
                    try {
                      let ipt_template = PUtils.editor.getValue({
                        id: "ipt_template",
                      });
                      let ipt_script = PUtils.editor.getValue({
                        id: "ipt_script",
                      });
                      console.log(`init_script`, {
                        ipt_script,
                        ipt_template,
                      });
                      window.USER_OBJECT_OBJ_TEMP = {};
                      window.eval(`
                window.addModel = (obj)=>{
                  _.merge(USER_OBJECT_OBJ_TEMP,obj)
                };        
                ${ipt_script}
                delete window.addModel;
                `);
                      let userModelObj = _.cloneDeep(
                        window.USER_OBJECT_OBJ_TEMP
                      );
                      if (_.isNil(userModelObj)) {
                        userModelObj = {};
                      }
                      var tempFn = m_arg.fn_call_template(ipt_template);
                      // let resultText2 = window.doT.template(ipt_template, {
                      //   whitespace: true,
                      // })(userModelObj);
                      var resultText2 = m_arg.fn_call_fin_template({
                        tempFn,
                        userModelObj,
                      });
                      PUtils.editor.setValue({
                        id: "output_result",
                        value: resultText2,
                      });
                      // resultText2
                    } catch (e) {
                      console.log("err", e);
                      let msg = t(
                        `An Error Occurred, Please check loggings, message: {0}`,
                        cutils.getErrInfo(e)
                      );
                      gutils.alert({
                        intent: "danger",
                        message: msg,
                      });
                      PUtils.editor.setValue({
                        id: "output_result",
                        value: msg,
                      });
                    }
                  },
                },
              ],
              rightControls: [],
              body: (
                <div className="w100 h100">
                  {PUtils.jsx.topBtmSpliter({
                    border: true,
                    percent: 0.4,
                    top: React.createElement(
                      observer((props) => {
                        return PUtils.jsx.leftRightSpliter({
                          resizekey: "top_json_left",
                          noLeftScroll: true,
                          left: PUtils.jsx.tabWithDefinition({
                            default_select_tab: "str",
                            key: "ROOT_EXTENSION_ADDONS_console",
                            list: [
                              {
                                label: t(`Template`),
                                jsx: observer((props) => {
                                  return PUtils.jsx.createGEditor({
                                    fontSize: 11,
                                    use_original_text: true,
                                    wordWrap: "off",
                                    key: "ipt_template",
                                    language: _.get(m_arg, "leftlang", "text"),
                                    initContent: ``,
                                  });
                                }),
                              },
                            ].map((x) => {
                              x.mode_jsx_func = true;
                              return x;
                            }),
                          }),
                          percent: 0.6,
                          right: PUtils.jsx.tabWithDefinition({
                            default_select_tab: "str",
                            key: "ROOT_EXTENSION_ADDONS_right",
                            list: [
                              {
                                label: t(`Script`),
                                jsx: observer((props) => {
                                  return PUtils.jsx.createGEditor({
                                    fontSize: 11,
                                    title: t(`Script for Binding Model`),
                                    wordWrap: "off",
                                    key: "ipt_script",
                                    language: "javascript",
                                    initContent: ``,
                                  });
                                }),
                              },
                            ].map((x) => {
                              x.mode_jsx_func = true;
                              return x;
                            }),
                          }),
                        });
                      })
                    ),
                    btm: React.createElement(
                      observer((props) => {
                        return PUtils.jsx.tabWithDefinition({
                          default_select_tab: "str",
                          key: "ROOT_EXTENSION_ADDONS_decode_str_tab",
                          list: [
                            {
                              label: t(`Output Result`),
                              jsx: observer((props) =>
                                PUtils.jsx.createGEditor({
                                  use_target_text: true,
                                  fontSize: 11,
                                  wordWrap: "on",
                                  key: "output_result",
                                  language: "html",
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
};
export default fn_fe_wrapper;
