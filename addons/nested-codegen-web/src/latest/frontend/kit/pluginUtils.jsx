import GFormInput2 from "../../../SQLDrafts/frontend/Kit_GFormInput2";
import FormGEditor from "../cpt/FormGEditor";
import otherPages from "../pages/otherPages";

const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  observer,
  BluePrintPopover,
  Mobx,
  MobxReact,
  MobxReactLite,
  ProgressBar,
  Dialog,
  Popover,
  Radio,
  ButtonGroup,
  TextArea,
  Intent,
  Position,
  HalfResizeForTwo,
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
  useStores,
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
  GTabs,
  Switch,
  Route,
  Link,
  useHistory,
} = window.CodeGenDefinition;
import "./common.less";
import SpinLoading from "../cpt/SpinLoading/index";
import js_export_trigger from "../../../../web/pages/latest/components/BeautifyCodeCommon/js_export_trigger";
import cutils from "./common_utils";

// let InnerEditorRef =;
// const EditorRef = InnerEditorRef;
// React.memo(InnerEditorRef, (preProps, nextProps) => {
//   let isOK = _.isEqual(preProps, nextProps);
//   console.log(`rendering editor ref-1`, isOK, preProps, nextProps);
//   return preProps.key == nextProps.key;
// });
let fn_pluginUtils = ({ crtStoreName }) => {
  let crtStore = gstore.common_app[crtStoreName];
  let crtModel = gstore.common_app[crtStoreName].model;
  if (gutils.dev()) {
    window["captured_" + crtStoreName] = _.cloneDeep(crtModel);
  }
  if (_.isEmpty(crtStore) || _.isNil(crtStore) || _.isEmpty(crtModel)) {
    if (gutils.dev()) {
      gutils.alertOk(`DEV_FLAG: Found Error: ${crtStoreName}`);
    }
  }
  let commonSave = _.throttle(async () => {
    let rootLogic = crtStore;
    let hist = rootLogic.hist;
    if (
      rootLogic.hist.isLoadingForRefreshHist ||
      rootLogic.hist.isLoadingForSaveHist ||
      rootLogic.hist.isLoadingWhenChangeId
    ) {
      // avoid duplicate save datas
      console.log(`avoid duplicate save datas`);
      return;
    }
    if (_.isNil(hist.crtHistId)) {
      return;
    }
    try {
      if (PUtils.crtStore.fn_whenCommonSave) {
        await PUtils.crtStore.fn_whenCommonSave();
      }
    } catch (e) {
      console.log(e);
    }
    await gutils.api.common_app.common.saveModelById(crtStoreName, false);
  }, 800);
  if (crtStore) {
    crtStore.commonSave = commonSave;
    crtStore.commonSaveWithDelay = () => {
      gutils.once(`init-${crtStoreName}`, () => {
        reaction(
          () => {
            return {
              ..._.cloneDeep(PUtils.crtStore),
            };
          },
          () => {
            PUtils.commonSave();
          }
        );
      });
    };
  }
  // gutils.once("init_for" + crtStoreName, () => {
  //   // autorun(() => {
  //   //   commonSave();
  //   // });
  // });
  let fn_form_jsx = (arr, divProps = {}) => {
    let dftVal = {
      crtTop: 0,
    };
    let cREF = React.useRef(dftVal);
    let [mid] = React.useState(_.uniqueId("mid"));
    window.tmp__divProps_2 = divProps;
    let scroll_mem_id = _.get(divProps, "scroll_mem_id");
    if (scroll_mem_id) {
      mid = scroll_mem_id;
      cREF = window["scroll_mem_" + scroll_mem_id];
      if (_.isNil(cREF)) {
        window["scroll_mem_" + scroll_mem_id] = {
          current: dftVal,
        };
        cREF = window["scroll_mem_" + scroll_mem_id];
      }
    }
    let ThatEle = (props) => {
      let onscroll = (e) => {
        // console.log(e);
        // window.tmp1 = e;
        // debugger;
        // window.tmp2 = divProps;
        // window.tmp3 = _.cloneDeep(e);
        let scrollTop = e.target.scrollTop;
        cREF.current.crtTop = scrollTop;
      };
      window.that_ele_001 = 1;
      return (
        <div
          id={mid}
          onScroll={onscroll}
          // onScrollCapture={(e) => {
          //   window.onscroll_capture = e;
          // }}
          // onWheel={onscroll}
          ref={(e) => {
            window.lllll_e = e;
            if (e != null) {
              $(e).scrollTop(cREF.current.crtTop);
            }
          }}
          {..._.merge({}, divProps, {
            style: {
              // overflow: "auto",
              // minHeight: "100px",
            },
          })}
          // style={{
          //   backgroundColor: "red",
          // }}
        >
          {_.chain(arr(props))
            .filter((x) => !_.isNil(x) && x != "")
            .value()}
        </div>
      );
    };
    return (props) => {
      return React.createElement(observer(ThatEle), {
        ...props,
      });
    };
  };
  let fn_getCrtID = (key) => {
    return crtStoreName + "_" + crtStore.hist.crtHistId + "_" + key;
  };

  const PUtils = {
    crtModel,
    enableAutoSaveMode() {
      useEffect(() => {
        let a = reaction(
          () => {
            return _.cloneDeep(PUtils.crtModel);
          },
          () => {
            PUtils.commonSave();
          }
        );
        return () => {
          a();
        };
      }, []);
    },
    bindTitle(str) {
      let path1 = gstore.sysinfo.latestRoutePath;
      gstore.sysinfo.routeTitleMap[path1] = str;
      return () => {
        gstore.sysinfo.routeTitleMap[path1] = null;
      };
    },
    getURLParams() {
      return Qs.parse(gutils.hist.location.search.replace("?", ""));
    },
    useLoop(fn, timeval) {
      useEffect(() => {
        let a = PUtils.loop(async () => {
          return await fn();
        }, timeval);
        return () => {
          a();
        };
      }, []);
    },
    loop(fn, timeval) {
      let myref = {
        times: 0,
        still_run: true,
      };
      let mycancelFn = () => {
        myref.still_run = false;
      };
      let okfunc = () => {
        setTimeout(async () => {
          if (!myref.still_run) {
            return;
          }
          let ok = await fn(myref.times++);
          if (ok === false) {
            return;
          }
          if (!myref.still_run) {
            return;
          }
          if (_.isNil(timeval) || timeval <= 0) {
            return;
          }
          await gutils.sleep(timeval);
          if (!myref.still_run) {
            return;
          }
          okfunc();
          if (!myref.still_run) {
            return;
          }
        }, 0);
      };
      okfunc();
      return mycancelFn;
    },
    fn_trigger_it(...args) {
      crtStore.fn_trigger_it(...args);
    },
    commonRefresh: () => {
      if (window.fn_refresh_tabs) {
        window.fn_refresh_tabs();
      }
    },
    fn_getCrtID,
    syncEditorValueFromModel(syncArr) {
      _.forEach(syncArr, (x, d, n) => {
        let updateFn = crtStore[x + "_setValue"];
        if (updateFn) {
          updateFn(PUtils.crtModel[x]);
        }
      });
    },
    crtStore,
    fn_crtHistText() {
      let x = PUtils.fn_crtHist();
      if (_.isNil(x)) {
        return "N/A";
      }
      return !_.isNil(x.TAB_NAME) && x.TAB_NAME != ""
        ? x.TAB_NAME
        : t(`tab-{0}`, x.ID);
    },
    fn_crtHist() {
      return _.chain(PUtils.crtStore.hist.totalHistArr)
        .find((x) => {
          return x.ID == PUtils.crtStore.hist.crtHistId;
        })
        .value();
    },
    fn_crtHistId() {
      return PUtils.crtStore.hist.crtHistId;
    },
    fn_getHistInfo() {
      return {
        crtStoreName: PUtils.crtStoreName,
        crtHist: PUtils.fn_crtHist(),
        crtHistText: PUtils.fn_crtHistText(),
        history_table_id: PUtils.crtStore.hist.history_table_id,
      };
    },
    getServiceRunInfo({ PreRequisiteJson }) {
      let refreshFn = [];
      let lc = useLocalStore(() => {
        let m_obj = {
          runInfo: {
            _refresh: async () => {
              for (let e of refreshFn) {
                await e();
              }
            },
            _startAll: async () => {
              let arr = [];
              let extra_services = PreRequisiteJson.extra_services;
              _.forEach(extra_services, (x, d, n) => {
                let crtProp = x.prop;
                arr.push(cutils.startTaskInfo({ prop: crtProp }));
              });
              for (let item of arr) {
                await item;
              }
              await m_obj.runInfo._refresh();
              gutils.alertOk("Started.");
            },
            _stopAll: async () => {
              let arr = [];
              let extra_services = PreRequisiteJson.extra_services;
              _.forEach(extra_services, (x, d, n) => {
                let crtProp = x.prop;
                arr.push(cutils.stopTaskInfo({ prop: crtProp }));
              });
              for (let item of arr) {
                await item;
              }
              await m_obj.runInfo._refresh();
              gutils.alertOk("Stopped it.");
            },
          },
        };
        return m_obj;
      });
      useEffect(() => {
        let arr = [];
        let extra_services = PreRequisiteJson.extra_services;
        _.forEach(extra_services, (x, d, n) => {
          let crtProp = x.prop;
          let crtFn = async () => {
            console.log("crtProp", crtProp);
            let content = await cutils.getTaskInfo({
              prop: crtProp,
            });
            let configFileAsMap = _.get(content, "task.configFileAsMap");
            if (_.isEmpty(configFileAsMap)) {
              configFileAsMap = {
                status: "NOT_YET_RAN",
              };
            }
            if (!_.isEqual(lc.runInfo[crtProp], configFileAsMap)) {
              lc.runInfo[crtProp] = configFileAsMap;
            }
          };
          refreshFn.push(crtFn);
          arr.push(PUtils.loop(crtFn, 1500));
        });
        return () => {
          _.forEach(arr, (x) => x());
        };
      }, []);
      return lc.runInfo;
    },
    crtStoreName,
    commonSaveWithDelay(...args) {
      PUtils.crtStore.commonSaveWithDelay(...args);
    },
    commonSave: (...args) => {
      PUtils.crtStore.commonSave(...args);
    },
    fn: {
      fn_form_jsx_by_config(
        crt_sql_form_arr = () => [],
        args_type_definitons = {}
      ) {
        _.defaultsDeep(args_type_definitons, {
          orderPrefix: true,
        });

        if (!_.isFunction(crt_sql_form_arr)) {
          let tmp_val = crt_sql_form_arr;
          crt_sql_form_arr = () => tmp_val;
        }
        let r_crt_sql_form_arr = _.filter(
          crt_sql_form_arr(),
          (x) => !_.isNil(x)
        );
        if (_.isEmpty(r_crt_sql_form_arr)) {
          return (props) => {
            return (
              <div style={{ padding: "12px" }}>
                {t(`No Available Form Controls at Present.`)}
              </div>
            );
          };
        }
        return PUtils.fn.fn_form_jsx(
          (props) =>
            _.map(r_crt_sql_form_arr, (x, d, n) => {
              return React.createElement(
                observer((props) => {
                  x = _.isFunction(x) ? x() : x;
                  if (_.isNil(x)) {
                    return "";
                  }
                  let finalTag = x.tag;
                  if (finalTag == window.CodeGenDefinition.GFormInput) {
                    finalTag = GFormInput2;
                  }
                  console.log("r-form", x.label, x);
                  let resJSX = React.createElement(finalTag, {
                    ...(x.tagProps || {}),
                    asyncControl: true,
                    // key: "ok" + d,
                    // + x.tagProps.value
                  });
                  let bval = "17px";
                  let nextStyle =
                    d == _.size(n) - 1
                      ? {
                          marginBottom: bval,
                        }
                      : {};
                  if (x.directJsxMode) {
                    return (
                      <div
                        style={{
                          marginBottom: bval,
                        }}
                      >
                        {resJSX}
                      </div>
                    );
                  }
                  let extraValObj = {};
                  if (x.required) {
                    // {"*" || `${t(`(required)`)}`}
                    extraValObj.labelInfo = (
                      <span
                        style={{
                          color: `var(--app-text-red)`,
                        }}
                      >
                        *
                      </span>
                    );
                  }
                  return (
                    <FormGroup
                      {...extraValObj}
                      {...x}
                      label={
                        _.isNil(x.label)
                          ? ""
                          : args_type_definitons &&
                            args_type_definitons.orderPrefix
                          ? `${d + 1}. ${x.label}`
                          : x.label
                      }
                      style={nextStyle}
                    >
                      {resJSX}
                    </FormGroup>
                  );
                })
              );
            }),
          _.merge(
            {
              style: {
                padding: "12px",
                overflowX: "hidden",
                overflowY: "auto",
                whiteSpace: "normal",
              },
            },
            args_type_definitons
          )
        );
      },
      fn_form_jsx,
      fn_init_ui(fn) {
        useEffect(() => {
          let crtModel = PUtils.crtModel;
          if (crtModel.init_ctn_num == 0 || _.isNil(crtModel.init_ctn_num)) {
            crtModel.init_ctn_num = crtModel.init_ctn_num || 0;
            fn();
          }
        }, []);
      },
    },
    editor: {
      getSelectionText(id) {
        try {
          let crt_editor = PUtils.editor.getRef(id);
          return crt_editor
            .getModel()
            .getValueInRange(crt_editor.getSelection());
        } catch (e) {
          console.log("err", e);
          return "";
        }
      },
      getRef(id) {
        return crtStore[id + "_ref"];
      },
      setValueIfNotSame(obj) {
        let val = PUtils.editor.getValue(obj);
        if (val != obj.value) {
          PUtils.editor.setValue(obj);
        }
      },
      setValue(obj) {
        // crtStore.model[obj.id] = obj.value;
        gutils.defer(() => {
          let key = obj.id;
          // localStorage.setItem(
          //   fn_getCrtID(crtStoreName + "pre_read_" + key),
          //   obj.value
          // );
          window.t9999 = PUtils;
          let thatValue = `${obj.id}_setValue`;
          try {
            let pValue = PUtils.crtStore[`${obj.id}_getValue`]();
            if (pValue == obj.value) {
              if (PUtils.crtStore.model[obj.id] != obj.value) {
                PUtils.crtStore.model[obj.id] = obj.value;
              }
              return;
            }
          } catch (e) {
            console.log("e", e);
          }
          PUtils.crtStore.model[obj.id] = obj.value;
          try {
            console.log("thatValue", thatValue);
            return PUtils.crtStore[thatValue](obj.value);
          } catch (e) {
            console.log("found-err", e);
            console.log("found-err-finish");
            // PUtils.syncEditorValueFromModel(obj.id);
            gutils.defer(() => {
              PUtils.crtStore[thatValue](obj.value);
            });
            return obj.value;
          }
        }, 10);
      },
      clearValue(obj) {
        PUtils.editor.setValue({
          id: obj.id,
          value: "",
        });
      },
      getValue(obj) {
        return PUtils.crtStore.model[obj.id];
        // try {
        //   return crtStore[`${obj.id}_getValue`]();
        // } catch (e) {
        //   return crtStore.model[obj.id];
        // }
      },
    },
    initFn(arr, deps = []) {
      for (let eachItem of arr) {
        useEffect(() => {
          let a = eachItem();
          return () => {
            if (a && _.isFunction(a)) {
              a();
            }
          };
        }, deps);
      }
    },
    makeLeftHide() {
      let tkey = `${crtStoreName}LeftMenuWidthtabstabs`;
      if (_.isNil(gstore.localSettings[tkey])) {
        gstore.localSettings[tkey] = "hidden";
      }
    },
    makeOnlyOneOptions() {
      let tkey = `${crtStoreName}_make_no_options`;
      if (_.isNil(gstore.localSettings[tkey])) {
        gstore.localSettings[tkey] = "yes";
      }
    },
    jsx: {
      getSimpleInlineIpt(m_obj) {
        return (
          <GFormInput2
            inline={true}
            type={m_obj.type}
            width={m_obj.width || "60px"}
            small={true}
            value={PUtils.crtModel[m_obj.index]}
            onChange={(e) => {
              let finval = gutils.getValueFromE(e);
              if (
                m_obj.type == "number" &&
                (!_.isNil(m_obj.min) || !_.isNil(m_obj.max))
              ) {
                if (finval != "") {
                  finval = parseInt(finval);
                  if (finval < m_obj.min) {
                    finval = m_obj.min;
                  } else if (finval > m_obj.max) {
                    finval = m_obj.max;
                  }
                }
              }
              PUtils.crtModel[m_obj.index] = finval;
            }}
            // onBlur={(e) => {
            //   let finval = gutils.getValueFromE(e);
            //   PUtils.crtModel[m_obj.index] = finval;
            // }}
            {...m_obj}
          ></GFormInput2>
        );
      },
      createXTerm(myobj) {
        return observer((props) => {
          let [m_id, onMId] = useState(_.uniqueId("m_id"));
          return (
            <div
              className="w100 h100"
              style={{ overflow: "auto" }}
              id={m_id}
              ref={(e) => {
                if (e != null) {
                  let { Terminal } = Xterm;
                  var term = new Terminal();
                  term.open(document.getElementById(m_id));
                  term.write(`this is test string`);
                }
              }}
            ></div>
          );
        });
      },
      createPanelWithBtnControls(myobj) {
        return (
          <div className="w100 h100 panel_with_btn">
            {React.createElement(
              observer(() => {
                let controls = _.filter(
                  _.isFunction(myobj.controls)
                    ? myobj.controls()
                    : myobj.controls,
                  (x) => !_.isNil(x)
                );
                let rightControls = _.filter(
                  _.isFunction(myobj.rightControls)
                    ? myobj.rightControls()
                    : myobj.rightControls,
                  (x) => !_.isNil(x)
                );
                let load_obj = useLocalStore(() => {
                  let a = {};
                  _.forEach(
                    [...(controls || []), ...(rightControls || [])],
                    (x, d, n) => {
                      if (x.loading_id) {
                        a[x.loading_id] = false;
                      }
                    }
                  );
                  return a;
                });
                let fn_createForX = (x) => {
                  return x.loading_id
                    ? async (e) => {
                        console.log("invoke-btn-1", x.text);
                        try {
                          load_obj[x.loading_id] = true;
                          if (x.saveBeforeRun) {
                            await PUtils.commonSave();
                          }
                          await x.onClick(e);
                          load_obj[x.loading_id] = false;
                        } catch (throwable) {
                          load_obj[x.loading_id] = false;
                        } finally {
                          load_obj[x.loading_id] = false;
                        }
                      }
                    : async (e) => {
                        console.log("invoke-btn-2", x.text);
                        if (x.saveBeforeRun) {
                          await PUtils.commonSave();
                        }
                        await x.onClick(e);
                      };
                };
                let fn_for_btn = ({ type = "left" }) => {
                  return (x, d, n) => {
                    let is_loading =
                      load_obj[x.loading_id] || x.loading == true;
                    if (x.jsx == AnchorButton) {
                      return <AnchorButton small={true} {...x} />;
                    }
                    if (x.jsx == Button) {
                      return <Button small={true} {...x} />;
                    }
                    if (!_.isNil(x.jsx)) {
                      return (
                        <div
                          style={{
                            display: "inline-block",
                            ...(type == "left"
                              ? { marginRight: "5px" }
                              : { marginLeft: "5px" }),
                          }}
                        >
                          <span
                            style={{ marginRight: "5px" }}
                            className="bp3-text-small bp3-text-muted"
                          >
                            {x.label}
                            {!_.isNil(x.label) ? ":" : ""}
                          </span>
                          {x.jsx}
                        </div>
                      );
                    }
                    return (
                      <Button
                        small={true}
                        {...x}
                        onClick={fn_createForX(x)}
                        loading={is_loading}
                      ></Button>
                    );
                  };
                };
                let finRightBtnArr = _.filter(
                  [
                    ...(rightControls || []),
                    myobj.showAppLang
                      ? {
                          text:
                            t(`Switch Language`) +
                            `(${PUtils.crtModel.config_page_lang})`,
                          intent: "none",
                          loading_id: "switch_lang",
                          onClick: async (e) => {
                            try {
                              ContextMenu.show(
                                React.createElement(
                                  observer(() => {
                                    return (
                                      <Menu>
                                        <MenuDivider
                                          title={t(`Language Type of Docs`)}
                                        />
                                        {_.map(
                                          [
                                            ...gstore.preliAllData.formList
                                              .lang,
                                          ],
                                          (x, d, n) => {
                                            let is_crt =
                                              x.value ==
                                              PUtils.crtModel.config_page_lang;
                                            return (
                                              <MenuItem
                                                key={x.value}
                                                onClick={(e) => {
                                                  gutils.stop_e(e);
                                                  PUtils.crtModel.config_page_lang =
                                                    x.value;
                                                }}
                                                icon={`document`}
                                                active={is_crt}
                                                text={`${x.label}`}
                                              ></MenuItem>
                                            );
                                          }
                                        )}
                                      </Menu>
                                    );
                                  })
                                ),
                                {
                                  left: e.clientX,
                                  top: e.clientY,
                                },
                                () => {}
                              );
                            } catch (e) {
                              console.log("pick_address_err", e);
                              await gutils.win_alert(`error now`);
                            }

                            console.log(`pick_address_after`, e);
                          },
                        }
                      : null,
                    myobj.noShowHelpBtn
                      ? null
                      : {
                          icon: "help",
                          intent: "none",
                          target: "_blank",
                          jsx: AnchorButton,
                          small: true,
                          href: `https://codegen.cc/documentation/view?id=${crtStoreName}`,
                          icon: `help`,
                        },
                  ],
                  (x) => !_.isNil(x)
                );
                window.fn_finRightBtnArr = finRightBtnArr;
                return (
                  <div className="btn_logic_panel">
                    <div className="left_btn_controls">
                      {_.map(
                        [
                          ...(controls || []),
                          myobj.fn_get_copy_result
                            ? {
                                text: myobj.get_copy_result_text
                                  ? myobj.get_copy_result_text
                                  : t(`Copy Result`),
                                intent: "success",
                                onClick: async (e) => {
                                  let cloneE = {
                                    detail: e.detail,
                                  };
                                  let val = await myobj.fn_get_copy_result({
                                    PUtils,
                                  });
                                  // gutils.copyWithAlert(val);
                                  js_export_trigger({
                                    saveValue: val,
                                    e: cloneE,
                                    fn_files_for_zip: myobj.fn_files_for_zip,
                                    filename: myobj.filename,
                                  });
                                },
                              }
                            : null,
                          myobj.fn_show_example
                            ? {
                                text: t(`Show Example`),
                                n_type: "show_example",
                                intent: "none",
                                onClick: () => {
                                  myobj.fn_show_example();
                                },
                              }
                            : null,
                          myobj.helpBtnId
                            ? {
                                // onClick: () => {
                                //   window.open(
                                //   );
                                // },
                                icon: "help",
                                intent: "none",
                                tag: AnchorButton,
                                target: "_blank",
                                href: `https://codegen.cc/documentation/view?id=${myobj.helpBtnId}`,
                              }
                            : null,
                        ].filter((x) => !_.isNil(x) && x != ""),
                        fn_for_btn({ type: "left" })
                      )}
                    </div>
                    <div className="right_btn_controls">
                      {_.map(
                        finRightBtnArr.filter((x) => !_.isNil(x) && x != ""),
                        fn_for_btn({ type: "right" })
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div className="body_logic_panel">
              {React.createElement(
                observer((props) => {
                  return myobj.body;
                })
              )}
            </div>
          </div>
        );
      },
      topBtmSpliter(myobj) {
        let resizekey = myobj.resizekey + "resize";
        return (
          <HalfResizeForTwo
            disableResize={false}
            resizekey={resizekey + "lefttopbtm"}
            defaultPercent={myobj.percent || 0.5}
            topJsx={myobj.top}
            needBorderBetween={myobj.border}
            btmJsx={myobj.btm}
          ></HalfResizeForTwo>
        );
      },
      leftRightSpliter(myobj) {
        let resizekey = myobj.resizekey + "resize";
        return (
          <HalfResizeForTwoHorizontal
            noLeftScroll={myobj.noLeftScroll}
            percentRightWidth={myobj.percentRightWidth}
            defaultPercent={myobj.percent}
            defaultLeftWidthValue={myobj.defaultLeftWidthValue}
            value={gstore.localSettings[resizekey]}
            onChg={(val) => {
              gstore.localSettings[resizekey] = val;
            }}
            leftClz={
              !_.isNil(myobj.percentRightWidth)
                ? ""
                : "makescrollself " + myobj.leftClz
            }
            rightClz=" makescrollself needleftborder"
            leftJsx={myobj.left}
            rightJsx={myobj.right}
          />
        );
      },
      createGEditorWithNoStorageAndSimple(args) {
        // window.tmp____createGEditorWithNoStorageAndSimple_args = args;
        let { directValue } = args;
        console.log("rendering_editor wrap", directValue);
        gutils.once(`run_one_only_${PUtils.crtStoreName}_${args.key}`, () => {
          if (_.isNil(PUtils.crtStore[args.key])) {
            if (args.initContent) {
              PUtils.crtStore[args.key] = args.initContent;
            }
          }
        });
        return (
          <SpinLoading loading={args.loading == true}>
            <FormGEditor
              key={
                (directValue + "").length +
                "" +
                gstore.localSettings.editor_mode
              }
              title={args.title}
              noAutoFocus={true}
              otherConfig={{
                callFuncName: "create",
                enableSplitViewResizing: true,
                originalEditable: true,
                readOnly: _.get(args, "readOnly", false),
                wordWrap: _.get(args, "wordWrap", "off"),
                followsCaret: true,
                ignoreCharChanges: true,
                keepNoInvolve: args.keepNoInvolve,
                selectAllWhenClick: args.selectAllWhenClick,
              }}
              needBorder={args.needBorder}
              wordWrap={_.get(args, "wordWrap", "off")}
              readOnly={args.readOnly}
              fontSize={args.fontSize}
              id={crtStoreName + args.key}
              language={args.language}
              onRef={(editor, monaco) => {
                console.log("rendering_editor", directValue);
                if (_.isNil(editor)) {
                  return;
                }
                if (args.onRef) {
                  gutils.defer(() => {
                    args.onRef({
                      editor,
                      monaco,
                      fn_setValue: (value) => {
                        try {
                          window.ok100 = editor;
                          editor.getModel().setValue(value);
                        } catch (e) {
                          console.log("e", e);
                        }
                      },
                    });
                  });
                }
                let modifiedModel = () => editor.getModel();
                modifiedModel().setValue(directValue + "");
              }}
              style={{
                width: "100%",
                height: "100%",
                // border: args.needBorder
                //   ? "var(--app-border-gray-e1e8ed)"
                //   : null,
              }}
            ></FormGEditor>
          </SpinLoading>
        );
      },
      createGEditorWithModel(...arr_args) {
        // you need to provide crt_editor_model as its args here
        return PUtils.jsx.createGEditor(...arr_args);
      },
      createGEditor(args = {}) {
        console.log("rendering editor ref-3", args);
        let { key } = args;
        let crt_editor_model = crtModel;
        if (!_.isNil(args.crt_editor_model)) {
          crt_editor_model = args.crt_editor_model;
        }
        return (
          <FormGEditor
            title={
              args.use_original_text
                ? t(`Source(Pre-Procedure)`)
                : args.use_target_text
                ? t(`Destination(Post-Procedure)`)
                : args.title
            }
            noAutoFocus={true}
            otherConfig={{
              callFuncName: "create",
              enableSplitViewResizing: true,
              originalEditable: true,
              readOnly: _.get(args, "readOnly", false),
              wordWrap: _.get(args, "wordWrap", "off"),
              followsCaret: true,
              ignoreCharChanges: true,
              keepNoInvolve: args.keepNoInvolve,
              selectAllWhenClick: args.selectAllWhenClick,
            }}
            needBorder={args.needBorder}
            wordWrap={_.get(args, "wordWrap", "off")}
            readOnly={args.readOnly}
            fontSize={args.fontSize}
            id={crtStoreName + args.key}
            language={args.language}
            key={
              crtStoreName +
              args.key +
              args.extraKey +
              gstore.localSettings.editor_mode +
              args.language
            }
            onRef={(editor, monaco) => {
              try {
                console.log("found-err-3: init", editor, monaco);
                function getInitValue() {
                  let initValue = crt_editor_model[key];
                  if (_.isEmpty(initValue)) {
                    initValue = "";
                  }
                  return initValue;
                }
                if (crtStore.editorKeys && crtStore.editorKeys[key] != "") {
                  crtStore.editorKeys[key] = "";
                }
                if (_.isNil(editor)) {
                  throw new Error("no editor");
                }
                if (args.onRef) {
                  gutils.defer(() => {
                    args.onRef({
                      editor,
                      monaco,
                    });
                  });
                }
                let modifiedModel = () => editor.getModel();
                let updateSetFunc = key + "_setValue";

                crtStore[key + "_ref"] = editor;
                crtStore[updateSetFunc] = (val) => {
                  console.log("update value - source", val);
                  gutils.defer(() => {
                    editor.getModel().setValue(val);
                  });
                };

                crtStore["editor_obj_listings"][key] =
                  crtStore[key + "_setValue"];

                crtStore[key + "_getValue"] = () => {
                  try {
                    return modifiedModel().getValue();
                  } catch (e) {
                    return "";
                  }
                };
                try {
                  let delay_common_save = _.debounce(PUtils.commonSave, 150);
                  modifiedModel().onDidChangeContent(
                    _.throttle((event) => {
                      crt_editor_model[key] = modifiedModel().getValue();
                      delay_common_save();
                      if (args.onChange) {
                        args.onChange(modifiedModel().getValue());
                      }
                    }, 1000)
                  );
                } catch (e) {
                  console.log(e);
                  console.log("found-err-3.2", e);
                }

                try {
                  if (args.onRef) {
                    args.onRef(editor);
                  }
                } catch (e) {
                  console.log(e);
                  console.log("found-err-3.1", e);
                }
                let initValue = getInitValue();
                crtStore[key + "_setValue"](initValue);

                if (
                  !_.isEmpty(args.initContent) &&
                  _.isEmpty(crtStore.model[key])
                ) {
                  crtStore[key + "_setValue"](args.initContent);
                }
              } catch (e) {
                console.log("found-err-3", e);
              }
            }}
            style={{ width: "100%", height: "100%" }}
          ></FormGEditor>
        );
        // return (
        //   <EditorRef fn_getCrtID={fn_getCrtID} PUtils={PUtils} {...args} />
        // );
      },
      tabWithDefinition(_args = {}) {
        let args = { ..._args };
        if (_.isEmpty(args.list)) {
          args.list = [
            {
              label: t(`Default Page`),
              id: `default`,
              mode_jsx_func: true,
              jsx: observer((props) => (
                <div style={{ padding: "10px" }}>
                  {t(`There's no content here at present.`)}
                </div>
              )),
            },
          ];
        }
        // return React.createElement(
        // observer((props) => {
        let thatkey =
          (args.using_model_type ? "" : "tab" + crtStoreName) + args.key;
        let saveKeyForTab =
          (args.using_model_type ? "" : "savetab_") + args.key;
        let savingModel = gstore.localSettings;
        if (args.using_model_type) {
          savingModel = crtModel;
        }
        window.update_tab_index = (keyname, value) => {
          savingModel["savetab_" + keyname] = value;
        };
        window.get_tab_index = (keyname) => {
          return savingModel["savetab_" + keyname];
        };
        const value = savingModel[saveKeyForTab];
        let onValue = (val) => {
          savingModel[saveKeyForTab] = val;
        };
        if (_.isNil(value)) {
          gutils.defer(() => {
            onValue(
              args.default_select_tab ||
                _.get(args, "list.0.id", _.get(args, "list.0.label"))
            );
          });
        }
        console.log("update value", value, savingModel);
        let all_list_value = _.map(
          _.filter(args.list, (x) => x.hide != true),
          (x, d, n) => {
            return {
              ...x,
              closable: _.get(x, "closable", false),
              id: x.id || x.label,
            };
          }
        );
        let callFn = (x, d, n) => {
          console.log("my render jsx", x.jsx);
          return x.mode_jsx_func
            ? React.createElement(x.jsx, {
                crtModel,
                onValue,
              })
            : x.jsx;
        };
        // _.forEach(all_list_value, (x, d, n) => {
        //   callFn(x, d, n);
        // });
        return (
          <GTabs
            borderTop={args.borderTop}
            keym={savingModel[thatkey]}
            noOptBtn={_.get(args, "noOptBtn", true)}
            mapid={thatkey || "non"}
            obj={{
              value: value,
              list: all_list_value,
            }}
            renderTabPane={callFn}
            onChangeTab={(e) => {
              console.log("chagin tab", e, thatkey);
              onValue(e);
            }}
            onEditFunc={async function (type, info) {
              let props = args;
              console.log("on edit func", type, info);
              await gutils.onEditForTab(type, info, {
                list: all_list_value,
                crtvalue: value,
                onRemove: async (info) => {
                  await args.onRemove(info);
                  // copying
                  let list = all_list_value;
                  let crtvalue = value;
                  let nextKeyStrValue = null;
                  const findObjIdx = _.findIndex(list, (x) => x.id == info.key);
                  let nextKey =
                    findObjIdx + 1 >= _.size(list)
                      ? findObjIdx - 1
                      : findObjIdx + 1;
                  if (nextKey == -1) {
                    // //debugger;
                  }
                  if (nextKey < 0) {
                    nextKey = 0;
                  }
                  if (nextKey >= _.size(list)) {
                    nextKey = _.size(list) - 1;
                  }
                  if (_.get(list, [findObjIdx, "id"]) == crtvalue) {
                    const nextKeyStr = _.get(list, [nextKey, "id"]);
                    nextKeyStrValue = nextKeyStr;
                  }
                  let newList = _.filter(
                    _.concat(
                      _.slice(list, 0, findObjIdx),
                      _.slice(list, findObjIdx + 1)
                    ),
                    (x) => !_.isNil(x)
                  );
                  if (props.onList) {
                    props.onList(newList);
                  }
                },
                setValue(val) {
                  // if(args.onValueChange){
                  //   args.onValueChange(val)
                  // }
                  savingModel[saveKeyForTab] = val;
                },
                setList(val) {
                  if (props.onList) {
                    props.onList(val);
                  }
                },
              });
            }}
          ></GTabs>
        );
        // })
        // );
      },
      panelWithTitle: otherPages.jsx.panelWithTitle,
    },
    getTranslateConfigs() {
      let all_other_lang = gutils.getAllLangList();
      let modelVal = gstore.common_app[crtStoreName].model;
      // if (_.isNil(modelVal.sourceLang)) {
      //   modelVal.sourceLang = "auto";
      // }
      // if (_.isNil(modelVal.targetLang)) {
      //   modelVal.targetLang = "zh";
      // }
      return [
        {
          label: t("Source Language"),
          children: [
            {
              tag: Html_select,
              value: gstore.common_app[crtStoreName].model.sourceLang,
              list: [
                {
                  label: t(`Auto`),
                  value: "auto",
                },
                ...all_other_lang,
              ],
              onChange: (x) => {
                gstore.common_app[crtStoreName].model.sourceLang =
                  x.target.value;
              },
            },
          ],
        },
        {
          label: t("Target Language"),
          children: [
            {
              tag: Html_select,
              value: gstore.common_app[crtStoreName].model.targetLang,
              list: [...all_other_lang],
              onChange: (x) => {
                console.log("got value", x, x.target.value);
                gstore.common_app[crtStoreName].model.targetLang =
                  x.target.value;
              },
            },
          ],
        },
      ];
    },
    translate: async function ({ text }) {
      const isLogin = window.is_sign_in(); // !_.isNil(localStorage.getItem("USER_TOKEN"));

      if (!isLogin) {
        gstore.user.overlayForLogin.open = true;
        return "Please sign in at first\n";
      }

      if (text.length > 1900) {
        text = text.substring(0, 1900);
      }
      let myres = await gutils.optCentreWithDeviceInfo(
        "/trans/text-translate",
        {
          token: window.user_token(), // localStorage.getItem("USER_TOKEN"),
          sourceLang: gstore.common_app[crtStoreName].model["sourceLang"],
          targetLang: gstore.common_app[crtStoreName].model["targetLang"],
          sourceText: text,
        }
      );
      // await gutils.sleep(150);
      return myres.content.value;
    },
  };
  window.temp1_PUtils = PUtils;
  window["g_putils_" + crtStoreName] = PUtils;
  return PUtils;
};
window.fn_pluginUtils = fn_pluginUtils;
export default fn_pluginUtils;
