let {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  HalfResizeForTwo,
  GEditor,
  Settings_library,
  OperationPanel,
  BluePrintPopover,
  useRef,
  Mobx,
  MobxReact,
  MobxReactLite,
  ProgressBar,
  GFormInput,
  GFormSwitch,
  Dialog,
  Popover,
  Radio,
  ButtonGroup,
  NoMessageForNotification,
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
  prettier,
  xmlutils,
  createHistory,
  withRouter,
  Switch,
  Route,
  Link,
  // BeautifyCodeCommon,
  useHistory,
} = window.CodeGenDefinition;
import fn_beautifyCodeCommon from "../../../../web/pages/latest/components/BeautifyCodeCommon/fn_getBeautifyCodeCommon";
import FormEasyTable from "../cpt/FormEasyTable";
import fn_PUtils from "../kit/pluginUtils";
import mLess from "./m.less";
import cutils from "../kit/common_utils";
import ScrollMemWrapper from "../../../../web/pages/latest/routes/main_menu_frame/ScrollMemWrapper";
import "../less/common_var.less";
if (true) {
}
let BeautifyCodeCommon = fn_beautifyCodeCommon({});
const obj_trans_playground = {
  pid: "train_ground",
  label: "Training Ground",
  icon: "cycle",
};

const obj_system_formats = {
  pid: "system_formats",
  label: "System Formats",
  icon: "area-of-interest",
};

let panelWithTitle = (obj = {}) => {
  if (
    obj.noBorderTop ||
    (obj && (obj.title == "Procedure" || obj.title == t("Procedure"))) ||
    obj.title == "Output for Each Expression" ||
    obj.title == t("Output for Each Expression")
  ) {
    _.merge(obj, {
      n_style: !gstore.localSettings.app_left_to_right_mode
        ? {
            borderTop: "none",
          }
        : null,
    });
  }
  // if (obj.raw) {
  // return obj.jsx;
  // }
  return (
    <div
      className="my-top-box"
      {..._.get(obj, "argObj", {})}
      style={{ width: "100%", height: "100%" }}
    >
      <div
        className={"my-top-title opt-top-title " + ""}
        style={{
          ..._.get(obj, "n_style", {}),
        }}
      >
        <span>{obj.left_ctl || ""}</span>
        <span
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {obj.noTranslate ? obj.title : t(obj.title)}
        </span>
        <span className="top-right-title myrightbtnview btnview">
          {obj.right_ctl || ""}
        </span>
      </div>
      <div
        className="my-top-ctn"
        style={{
          ..._.get(obj, "bodyStyle", {}),
          overflow: obj.no_scroll ? "hidden" : null,
        }}
      >
        {obj.jsx}
      </div>
    </div>
  );
};
const fn_otherPages = {
  createAboutPage(obj) {
    return (
      <ScrollMemWrapper mid={"about"}>
        <div className="pt-10" style={{ padding: "12px", paddingTop: "0px" }}>
          {_.map(obj.list, (x, d, n) => {
            return (
              <div>
                <h3>{x.title}</h3>
                {_.map(x.sub, (xx, dd, nn) => {
                  return <p>{xx}</p>;
                })}
              </div>
            );
          })}
          <div style={{ height: "30px" }}></div>
        </div>
      </ScrollMemWrapper>
    );
  },
  fn: {
    loadStatic: async function ({ PreRequisiteJson, gref }) {
      let myuniqueForFlag = null;
      try {
        myuniqueForFlag = "LST" + JSON.stringify(PreRequisiteJson);
        if (window[myuniqueForFlag]) {
          if (!p_mode()) {
            return;
          }
        }
      } catch (e) {
        console.log(e);
      }
      // try{
      //   if(window[JSON.stringify(preRequisiteJson)] == '1'){
      //     return;
      //   }
      // }catch(e){
      //   return e;
      // }
      let {
        data: { file_arr },
      } = await gref.optAPI(`load_static`, PreRequisiteJson);
      _.forEach(file_arr, (x, d, n) => {
        try {
          let tmp = null;
          if ("function" == typeof window.define && window.define.amd) {
            tmp = window.define.amd;
            delete window.define.amd;
          }
          // window.eval(x.value);
          $.globalEval(x.value);
          if (!_.isNil(tmp)) {
            window.define.amd = tmp;
          }
        } catch (e) {
          console.error("err", e);
        }
      });
      if (!_.isNil(myuniqueForFlag) && !_.isEmpty(file_arr)) {
        window[myuniqueForFlag] = "1";
      }
    },
    cutils,
    // commonLangCreate() {
    //   return {
    //   };
    // },
    handleFurtherForText: (leftValue, { PUtils, type }) => {
      console.log("handleFurther", leftValue);
      let { config_text_sort_order, config_text_helper_filter } =
        PUtils.crtModel;
      if (config_text_sort_order == "reverse") {
        return leftValue;
      }
      window.eval(`
        ${config_text_helper_filter}
        ;

        window.CG_isAcceptedThatLine=isAcceptedThatLine
        window.CG_formatLine=formatLine
        window.CG_comparator=comparator
        `);
      let config_line_sep_char = PUtils.crtModel["config_line_sep_char"];
      config_line_sep_char = config_line_sep_char
        .replaceAll("\\n", "\n")
        .replaceAll("\\t", "\t")
        .replaceAll("\\r", "\r");
      let result = _.chain(leftValue)
        .split(config_line_sep_char)
        .filter((x, d, n) => {
          return CG_isAcceptedThatLine(x, d, n);
        })
        .map((x, d) => {
          return CG_formatLine(x, d);
        })
        .sort((a, b) => {
          return CG_comparator(a, b);
        })
        .tap((x) => {
          console.log("ok_arr.2", x);
        })
        .join(config_line_sep_char)
        .value();
      if (_.isEmpty(result)) {
        result = `   `;
      }
      return result;
    },
  },
  utils: {
    now_str() {
      return Moment().format("YYYY-MM-DD HH:mm:ss");
    },
  },
  form: {
    getOutlineBtn(inte) {
      return {
        intent: inte,
        outline: true,
        outlined: true,
        small: true,
      };
    },
    plainTextExampleStr: `this is a test string`,
    websiteExampleStr: `https://codegen.cc/documentation/view?id=welcome`,
    textHelperExampleStr: `1.21\n   \n 1.312\n 33\n12\n12\n 12 \n\na\nbc\n120\ntest string\ntest string\ntest str\ntest 123\n1000\n 200\n&abcdefg\n2016.01.01\nGuangZhou\n987654321\n3.1415\nNanChang\nhhy`,
    textHelperInitContent: `// JavaScript
/**
    ${t("Filtering value by checking each line content.")}
    @${t(`example`)}
        1. return line.startsWith('100')
        2. return line.indexOf('1') != -1
        3. return line.trim().length() != 0
        4. return idx % 2 == 0
    @${t(`parameter`)} 
        line -> ${t(`a line in an iterating process`)}
        idx -> ${t(`line index`)}
    @${t(`return value`)}
        true=${t(`retain this line`)}
        false=${t(`discard this line`)}
  */
function isAcceptedThatLine(line, idx) { 
    return true; 
}

/**
    ${t(`Formatting or replacing each line if needed.`)}
    @${t(`return value`)}
        ${t(`a new formatted line content for each line`)}
  */
function formatLine(line, idx) {
    return line
}

/**
    ${t(
      `Returning the compare value to determine the sort order between two adjacent lines`
    )}
    @${t(`return value`)}
        0: it means two item are equal
        1: ${t(`it mean a larger than b`)}
        -1: ${t(`it means a smaller than b`)}
        null: ${t(`it's as same as the definition for ZERO(0)`)}
  */
function comparator(a, b){
  if(a == null || b == null){
    return 0; // keep its original pos if any one is empty
  }
  return 0; // ${t(
    `By default, CodeGen will keep its original sorting order without any modification.`
  )}
}
`,
    textHelperState() {
      return {
        config_clean_trim: "false",
        config_line_sep_char: "\\n",
        config_clean_whitespaces: "false",
        config_text_helper_filter: fn_otherPages.form.textHelperInitContent,
      };
    },
    jsonHelperRender: (m_args) => {
      let {
        fn_getConfigList = () => {
          return [];
        },
        trigger_when_any_editor_is_changed,
        fn_configItem = ({ crtStoreName, PUtils }) => [],
        fn_beforeActionBtn,
        exampleStr,
        default_select_tab,
        gref,
        PreRequisiteJson,
        noSelectFile,
        metaObj,
        helperText,
        apiName,
      } = m_args;
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
          helperText,
          fontSize: 11,
          trigger_when_any_editor_is_changed:
            trigger_when_any_editor_is_changed,
          noTriggerWhenCall: _.get(m_args, "noTriggerWhenCall", true),
          noSelectFile: noSelectFile,
          noSources: false,
          syncView: true,
          type: m_args.left_lang || "javascript",
          exampleStr: exampleStr,
          fn_beforeActionBtn: fn_beforeActionBtn,
          fn_leftPanelProps: m_args.no_left_panel_btm
            ? null
            : ({ PUtils }) => {
                let model = PUtils.crtModel;
                let crtStore = PUtils.crtStore;
                let crtStoreName = PUtils.crtStoreName;
                let commonSave = PUtils.commonSave;
                return {
                  percent: 0.5,
                  jsx: PUtils.jsx.panelWithTitle({
                    title: "Procedure",
                    jsx: React.createElement(
                      observer((props) => {
                        // if (m_args.test_mode == "json") {
                        //   return fn_getConfigList({
                        //     PUtils,
                        //     model: PUtils.crtModel,
                        //     crtStore,
                        //     crtStoreName,
                        //     commonSave: PUtils.commonSave,
                        //   })[0].jsx;
                        // }
                        return PUtils.jsx.tabWithDefinition({
                          default_select_tab: default_select_tab,
                          list: [
                            ...fn_getConfigList({
                              PUtils,
                              model: PUtils.crtModel,
                              crtStore,
                              crtStoreName,
                              commonSave: PUtils.commonSave,
                            }),
                          ],
                          key: metaObj.appId + "config",
                        });
                      })
                    ),
                  }),
                };
              },
          totalTitle: appTitle,
          language: m_args.right_lang || "javascript",
          right_lang: "json",
          handle: m_args.handle
            ? m_args.handle
            : async ({ leftValue, type }, { crtStoreName, PUtils }) => {
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
    },
    xmlHelperRender: (m_args) => {
      let {
        fn_rightPanelProps,
        fn_getConfigList = () => {
          return [];
        },
        trigger_when_any_editor_is_changed,
        fn_configItem = ({ crtStoreName, PUtils }) => [],
        fn_beforeActionBtn,
        exampleStr,
        default_select_tab,
        gref,
        PreRequisiteJson,
        noSelectFile,
        metaObj,
        helperText,
        apiName,
      } = m_args;
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
          helperText,
          fn_rightPanelProps,
          fontSize: 11,
          trigger_when_any_editor_is_changed:
            trigger_when_any_editor_is_changed,
          noTriggerWhenCall: _.get(m_args, "noTriggerWhenCall", true),
          noSelectFile: noSelectFile,
          noSources: false,
          syncView: true,
          type: `xml`,
          exampleStr: exampleStr,
          fn_beforeActionBtn: fn_beforeActionBtn,
          fn_leftPanelProps: m_args.no_left_panel_btm
            ? null
            : ({ PUtils }) => {
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
                          ],
                          key: metaObj.appId + "config",
                        })
                      )
                    ),
                  }),
                };
              },
          totalTitle: appTitle,
          language: m_args.right_lang || "javascript",
          right_lang: "xml",
          handle: m_args.handle
            ? m_args.handle
            : async ({ leftValue, type }, { crtStoreName, PUtils }) => {
                console.log("rendering v1", type, leftValue);
                let str = leftValue;
                let { data } = await gref.optAPI(apiName, {
                  ...PUtils.crtModel,
                  text: str,
                  type: type,
                });
                PUtils.crtModel.value_arr = data.value_arr;
                setTimeout(() => {
                  // `${x.value}`
                  _.forEach(data.value_arr, (x, d, n) => {
                    PUtils.editor.setValue({
                      id: `xml-result-${d}`,
                      value: x.value,
                    });
                  });
                  window.update_tab_index(
                    `xml_html_codeconfig_r`,
                    `xml-result-0`
                  );
                }, 100);
                return {
                  result: data.value,
                };
              },
          fn_configItem: fn_configItem,
        })
      );
    },
    textHelperRender: ({
      fn_getConfigList = () => {
        return [];
      },
      right_wordWrap,
      fn_configItem = ({ crtStoreName, PUtils }) => [],
      fn_beforeActionBtn,
      exampleStr,
      default_select_tab,
      handleFurther,
      gref,
      fontSize,
      right_result_lang,
      PreRequisiteJson,
      noTriggerWhenCall = true,
      metaObj,
      apiName,
      no_need_config = false,
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
          noTriggerWhenCall: noTriggerWhenCall,
          noSources: false,
          syncView: true,
          fontSize: fontSize,
          type: "plaintext",
          exampleStr: exampleStr,
          fn_beforeActionBtn: fn_beforeActionBtn,
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
                        no_need_config
                          ? null
                          : {
                              label: t(`Config`),
                              id: "config",
                              mode_jsx_func: true,
                              jsx: PUtils.fn.fn_form_jsx(
                                (props) => [
                                  <FormGroup
                                    helperText={t(
                                      "By default, CodeGen will use \\n as its line separator, namely the new line character."
                                    )}
                                    label={t("line Separator")}
                                  >
                                    <GFormInput
                                      valtype={"tf"}
                                      onChange={(val) => {
                                        model["config_line_sep_char"] = val;
                                      }}
                                      value={model["config_line_sep_char"]}
                                    />
                                  </FormGroup>,
                                  <FormGroup
                                    helperText={t(
                                      "If you want to filter the lines which are whitespaces only, please turn it on"
                                    )}
                                    label={t("Ignore Whitespaces Lines")}
                                  >
                                    <GFormSwitch
                                      valtype={"tf"}
                                      onChange={(val) => {
                                        model["config_clean_whitespaces"] = val;
                                      }}
                                      value={model["config_clean_whitespaces"]}
                                    />
                                  </FormGroup>,
                                  <FormGroup
                                    helperText={t(
                                      "If you want to trim the content of each line before handling, please turn it on"
                                    )}
                                    label={t("Trim it before handling")}
                                  >
                                    <GFormSwitch
                                      valtype={"tf"}
                                      onChange={(val) => {
                                        model["config_clean_trim"] = val;
                                      }}
                                      value={model["config_clean_trim"]}
                                    />
                                  </FormGroup>,
                                ],
                                {
                                  style: {
                                    padding: "12px",
                                  },
                                }
                              ),
                            },
                      ].filter((x) => !_.isNil(x)),
                      key: metaObj.appId + "config",
                    })
                  )
                ),
              }),
            };
          },
          totalTitle: appTitle,
          language: "markdown",
          right_wordWrap: right_wordWrap,
          right_lang: right_result_lang,
          handle: async (
            { leftValue, type = btn_type },
            { crtStoreName, PUtils }
          ) => {
            try {
              console.log("rendering v1", type, leftValue);
              let { data } = await gref.optAPI(apiName, {
                ...PUtils.crtModel,
                text: leftValue,
                type: type,
              });
              let result = data.value;
              let str = result;
              if (!_.isNil(handleFurther)) {
                return {
                  result: handleFurther(str, { PUtils, type }),
                };
              }
              return {
                result: str,
              };
            } catch (e) {
              return {
                result: gutils.getErrMsg(e),
              };
            }
          },
          fn_configItem: fn_configItem,
        })
      );
    },
  },
  get_math_list() {
    return {
      label: "Math Tools",
      icon: "numerical",
      pid: "mathTools",
    };
  },
  get_texthelper_list() {
    return {
      icon: "paragraph",
      label: "PlainText Helper",
      pid: "plaintext",
    };
  },
  get_qrcode_list() {
    return {
      icon: "barcode",
      label: "QRCode",
      pid: "plaintext",
    };
  },
  get_color_list() {
    return {
      icon: "draw",
      label: "Drawing",
      pid: "colordraw",
    };
  },
  get_color_formatting() {
    return {
      icon: "inherited-group",
      label: "Graphic Formats",
      pid: "graphic_formats",
    };
  },
  sorryNoTimePage() {
    return fn_otherPages.pleaseStayTuned({
      msg: (
        <div>
          <p>
            {t(
              `Due to a lack of time, we hasn't released this functionality so far, we will release it ASAP. Much appreciate for your kindly understanding!`
            )}
          </p>
        </div>
      ),
    });
  },
  route: {
    redirect_to_ext(ext_name) {
      window.hist.push(`/exts/${ext_name}`);
    },
  },
  ajax: {
    getIntelStore(config) {
      let { loop } = config;
      let lc_store = useLocalStore(() => {
        return {
          ...config.initState(),
        };
      });
      let mref = useRef({
        times: 0,
      });
      let a = async function (forceUpdate = false) {
        let times = mref.current.times;
        if (times == 0 || forceUpdate) {
          lc_store.loading = true;
        }
        let res = await config.getDataFromAPI();
        let finalValue = _.get(res, "data.value");
        if (finalValue.LIST) {
          window.formattingDataArr(finalValue.LIST);
        }
        let noUpdate = false;
        if (config.checkIfNewRes) {
          if (!config.checkIfNewRes(finalValue)) {
            noUpdate = true;
          }
        }
        if (!noUpdate) {
          _.merge(lc_store, finalValue);
        }
        if (times == 0 || forceUpdate) {
          lc_store.loading = false;
        }
        mref.current.times++;
      };
      let reloadData = a;
      useEffect(() => {
        let cancelFn = null;
        if (!_.isNil(loop)) {
          cancelFn = gutils.run_async_loop(a, loop);
        } else {
          a();
        }
        let b = reaction(
          () => {
            return {
              ...lc_store,
            };
          },
          _.debounce(async () => {
            await config.saveData(lc_store);
            await a();
          })
        );
        return () => {
          if (cancelFn) {
            cancelFn();
          }
          b();
        };
      }, []);
      lc_store.fn_reloadData = reloadData;
      return lc_store;
    },
  },
  style: {
    commonSettings() {
      return {
        width: "60%",
        padding: "12px",
        margin: "0 auto",
        paddingTop: "20px",
      };
    },
    commonSettings_left() {
      return {
        width: "60%",
        padding: "20px",
        paddingTop: "20px",
      };
    },
  },
  menu: {
    getDAOLayerMenu() {
      return {
        label: `Data Access Layer`,
        pid: "dao",
        icon: "series-derived",
      };
    },
    getDSLLayerMenu() {
      return {
        label: `DSL Tools`,
        pid: "dsl_tools",
        icon: "flow-review-branch",
      };
    },
    getSQLMenu() {
      return {
        label: `SQL Helper`,
        pid: "dsl_tools",
        icon: "flow-review-branch",
      };
    },
    getCreateMenu() {
      return {
        label: "Code Generator",
        icon: "oil-field",
        pid: "gen",
      };
    },
    getDTOLayerMenu() {
      return {
        label: `Data Transfer Layer`,
        pid: "dto",
        icon: "series-configuration",
      };
    },
    getRDBMSMenu() {
      return {
        label: `Basic Service`,
        pid: "rdbms_menu",
      };
    },
    getExtendedServiceMenu() {
      return {
        label: `Extended Service`,
        pid: "extended_service",
      };
    },
    get_1st_systemTools() {
      return {
        label: `System Tools`,
        pid: "system_tools",
        icon: "diagram-tree",
      };
    },
    get_2rd_fileTools() {
      return {
        label: `File System Helper`,
        pid: "fs_tool",
        icon: "history",
      };
    },
    get_2rd_cmdTools() {
      return {
        label: `Integrated System Helper`,
        pid: "integrated_system_helper",
        icon: "git-push",
      };
    },
    get_2rd_backupTools() {
      return {
        label: `Backup Helper`,
        pid: "backup_helper",
        icon: "unarchive",
      };
    },
    getFunTools() {
      return {
        label: `Fun Tools`,
        icon: "cargo-ship",
      };
    },
    getTextDiffMenu() {
      return {
        label: "Quick Differentiate",
        icon: "inbox-search",
        pid: "quick_difference",
      };
    },
    getYamlFormatHelper() {
      return {
        icon: "git-merge",
        label: `YAML Helper`,
        pid: "yaml_helper",
      };
    },
    getTextMatchMenu() {
      return {
        label: `Text Matcher`,
        pid: "text_matcher",
        icon: "print",
      };
    },
    getXmlHelper() {
      return {
        // label: `XML Helper`,
        // pid: "xml_helper",
        // icon: "shield",
        pid: "xmlhelper",
      };
    },
    getDocRootMenu() {
      return {
        label: `Docs Center`,
        pid: "doc_centre",
        icon: "hat",
      };
    },
    getGeneralDocsMenu() {
      return {
        label: `General Docs`,
        pid: "unix_like_os",
        icon: "inbox-search",
      };
    },
    getJavaDocsMenu() {
      return {
        label: `Java Tools`,
        pid: "java_docs",
        icon: "series-configuration",
      };
    },
    getSDKDownloadMenu() {
      return {
        label: `SDK Resources`,
        pid: "sdk_downloader",
        icon: "inbox-geo",
      };
    },
    getFrontEndSDKMenu() {
      return {
        label: `Front-End Tools`,
        pid: "frontend_tools",
        icon: "buggy",
      };
    },
    getNetworkConfigGenerator() {
      return {
        label: `Network Configuration`,
        pid: "gen_network_configuration",
        icon: "globe",
      };
    },
    getConfigGenerator() {
      return {
        label: `Config Generator`,
        icon: "signal-search",
        pid: "config_generator",
      };
    },
    getWebTokenUtils() {
      return {
        label: `Web Auth`,
        pid: "web_token",
        icon: "shield",
      };
    },
    getZipMenu() {
      return {
        label: `Compress and Decompress`,
        pid: "compress_and_decompress",
        icon: "archive",
      };
    },
    getSMTools() {
      return {
        label: `National Commercial Algorithm`,
        pid: "national_commercial_algorithm",
        icon: "lock",
      };
    },
    getSymTools() {
      return {
        label: `Symmetric Crypto`,
        pid: "Symmetric_Crypto",
        icon: "exchange",
      };
    },
    getASymTools() {
      return {
        label: `Asymmetric Crypto`,
        pid: "Asymmetric_Crypto",
        icon: "exchange",
      };
    },
    getObjForNotes() {
      return {
        label: "Notes",
        icon: "paperclip",
        pid: "sysnotes",
      };
    },
    getNetwork() {
      return {
        label: "Network Analysis",
        icon: "cell-tower",
        pid: "sys_network",
      };
    },
    getInternetLayer() {
      return {
        label: "Internet Layer Helper",
        icon: "antenna",
        pid: "internet_layer_helper",
      };
    },
    getAppLayer() {
      return {
        label: "App Layer Helper",
        icon: "series-search",
        pid: "app_layer_helper",
      };
    },
    getObjForNetworkIP(obj) {
      // application layer
      // transport layer
      // internet layer
      // network access layer
      return [
        {
          label: "Network Analysis",
          icon: "cell-tower",
          pid: "sys_network",
          children: [
            // {
            //   label: `Internet Layer`,
            //   icon: "pulse",
            //   pid: "sys_internet_layer",
            //   children: [
            {
              icon: "ip-address",
              label: "IP Tools",
              pid: "sys_ip_tools",
              children: [obj],
            },
            //   ],
            // },
          ],
        },
      ];
    },
    obj_trans_playground,
    obj_playground_exps: {
      label: `Expression Tools`,
      icon: "derive-column",
      children: [],
    },
    getForPlayGround(obj) {
      return [
        {
          ...obj_trans_playground,
          children: [
            {
              label: `Programming`,
              icon: "lab-test",
              pid: "train_lang",
              children: [obj],
            },
          ],
        },
      ];
    },
  },
  getForSystemFormatMenus() {
    return {
      ...obj_system_formats,
    };
  },
  getForPlayGroundFirstLayerMenu() {
    return {
      ...obj_trans_playground,
    };
  },
  getTemplateRendererMenu() {
    return {
      pid: "tempalte_renderer",
      label: "Template Renderer",
      icon: "geofence",
    };
  },
  getMockGeneratorMenu() {
    return {
      pid: "mock_data_tools",
      label: "Mock Data Tools",
      icon: "diagram-tree",
    };
  },
  jsx: {
    createProcedurePanel: (fn_m_args) => {
      return ({ PUtils }) => {
        let model = PUtils.crtModel;
        let crtStore = PUtils.crtStore;
        let crtStoreName = PUtils.crtStoreName;
        let commonSave = PUtils.commonSave;
        let m_args = fn_m_args({ PUtils });
        let finJsx = React.createElement(
          observer((props) =>
            PUtils.jsx.tabWithDefinition({
              default_select_tab: m_args.default_select_tab,
              list: [...m_args.arr],
            })
          )
        );
        return {
          percent: 0.5,
          jsx: !gstore.localSettings.app_left_to_right_mode
            ? finJsx
            : PUtils.jsx.panelWithTitle({
                title: "Procedure",
                n_style: !gstore.localSettings.app_left_to_right_mode
                  ? {
                      borderTop: "none",
                    }
                  : null,
                jsx: finJsx,
              }),
        };
      };
    },
    getCalcOptPanel: (conf) => {
      let TopJsx = conf.topJsx;
      let BtmJsx = conf.btmJsx;
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <div
            style={{
              borderBottom: "1px solid var(--app-bg-border-e3e3e2)",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: conf.topHeight,
            }}
          >
            {TopJsx}
          </div>
          <div
            style={{
              width: "100%",
              height: `calc(100% - ${conf.topHeight} - 1px)`,
              maxHeight: `calc(100% - ${conf.topHeight} - 1px)`,
            }}
          >
            {BtmJsx}
          </div>
        </div>
      );
    },
    getPageViewForm: (m_args) => {
      let { PUtils, gref } = m_args;
      return observer((props) => {
        let crtModel = PUtils.crtModel;
        let model = crtModel;
        let getDataFromAPI = (otherConf = {}) => {
          // + `?p=${otherConf.biz_type || "data"}`
          return gref.optAPI(m_args.id, {
            page_id: model.cp_page_id,
            ...(dt_store || {}),
            ...otherConf,
            TOTAL_COUNT: null,
            LIST: null,
            COUNT: null,
          });
        };
        let dt_store = fn_otherPages.ajax.getIntelStore({
          loop: 1000,
          checkIfNewRes(mres) {
            if (dt_store.FG != mres.FG) {
              return true;
            } else {
              return false;
            }
          },
          getDataFromAPI: getDataFromAPI,
          saveData(data) {
            return 1;
          },
          initState() {
            return {
              PAGE_INDEX: 1,
              PAGE_SIZE: _.get(m_args, "pageSize", 10),
              COUNT: 0,
              LIST: [],
              loading: false,
            };
          },
        });
        let pageStore = useLocalStore(() => {
          return {
            activeID: null,
            activeData: null,
          };
        });
        let pageInfo = {
          loading: dt_store.loading,
          pageIndex: dt_store.PAGE_INDEX,
          pageCount: dt_store.COUNT,
          pageSize: dt_store.PAGE_SIZE,
        };
        let pageCount = dt_store.COUNT;
        const totalPageNum = gutils.noNaN(
          Math.ceil(pageCount / pageInfo.pageSize)
        );
        let resizekey = "resizekey_" + m_args.id;
        let style_jsx_nomessage = {
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        };
        return (
          <div className="form-page-root-box">
            <HalfResizeForTwoHorizontal
              needBorderBetween={true}
              containerClz="form-page-main"
              rightClz="needleftborder"
              defaultLeftWidthValue={350}
              value={gstore.localSettings[resizekey]}
              onChg={(val) => {
                gstore.localSettings[resizekey] = val;
              }}
              leftJsx={fn_otherPages.jsx.panelWithTitle({
                raw: true,
                title: _.get(m_args, "list_title", "Listings"),
                jsx: dt_store.loading ? (
                  <div>
                    Loading
                    <Blink />
                  </div>
                ) : (
                  <div className="form-page-main-leftMenu">
                    {_.map(dt_store.LIST, (x, d, n) => {
                      let clickItem = async () => {
                        window.t100200 = pageStore;
                        pageStore.activeID = x.ID;
                        let { data } = await getDataFromAPI({
                          biz_type: "get_one",
                          activeID: x.ID,
                        });
                        let { value } = data;
                        window.formattingDataArr([value]);
                        pageStore.activeData = value;
                        m_args.onReadActiveData({
                          PUtils,
                          ...pageStore,
                        });
                      };
                      let optFunc = {
                        pageStore,
                        dt_store: dt_store,
                        clickItem,
                        delete: async () => {
                          if (!(await gutils.ask_danger_opt())) {
                            return;
                          }
                          await getDataFromAPI({
                            biz_type: "delete",
                            activeID: x.ID,
                          });
                          await dt_store.fn_reloadData();
                        },
                      };
                      return (
                        <div
                          onClick={
                            m_args.totalClickFn
                              ? (e) => {
                                  gutils.stop_e(e);
                                  optFunc.clickItem();
                                }
                              : null
                          }
                          className="form-page-each-item"
                          key={d}
                        >
                          {m_args.fn_jsx_eachItem(x, d, n, optFunc)}
                        </div>
                      );
                    })}
                  </div>
                ),
              })}
              rightJsx={
                <div className="form-page-main-rightMenu">
                  {fn_otherPages.jsx.panelWithTitle({
                    // bodyStyle: style_jsx_nomessage,
                    raw: true,
                    title: _.get(m_args, "detail_title", "Detail"),
                    jsx: dt_store.loading ? (
                      <div>
                        Loading
                        <Blink />
                      </div>
                    ) : _.isNil(pageStore.activeID) ? (
                      <div style={style_jsx_nomessage}>
                        <NoMessageForNotification
                          icon="archive"
                          title={t("No Selected Clipboard Item")}
                          desc={t(
                            "Please click a clipboard item on the panel left to view its data."
                          )}
                        />
                      </div>
                    ) : (
                      m_args.fn_getDetailPanel({
                        PUtils,
                        activeID: pageStore.activeID,
                        activeData: pageStore.activeData || {},
                      })
                    ),
                  })}
                </div>
              }
            ></HalfResizeForTwoHorizontal>
            <div className="form-page-controls pd-lr-10">
              <div className="left-desc">
                {pageInfo.loading
                  ? t("Loading...")
                  : t(
                      "{0} Records, {1} of {2} pages",
                      pageCount,
                      pageInfo.pageCount === 0 ? 0 : pageInfo.pageIndex,
                      totalPageNum,
                      pageInfo.pageSize
                    )}
              </div>
              <div className="right-desc beflex">
                <Html_select
                  style={{ marginRight: "8px" }}
                  value={dt_store.PAGE_SIZE}
                  onChange={(e) => {
                    window.model_logic = model;
                    dt_store.PAGE_SIZE = parseInt(gutils.getValueFromE(e) + "");
                    if (isNaN(dt_store.PAGE_SIZE)) {
                      dt_store.PAGE_SIZE = 20;
                    }
                    dt_store.PAGE_INDEX = 1;
                    dt_store.fn_reloadData(true);
                  }}
                  list={[
                    {
                      label: "10",
                      value: 10,
                    },
                    {
                      label: "20",
                      value: 20,
                    },
                    {
                      label: "50",
                      value: 50,
                    },
                    {
                      label: "100",
                      value: 100,
                    },
                    {
                      label: "200",
                      value: 200,
                    },
                  ]}
                ></Html_select>
                <ButtonGroup>
                  <Button
                    disabled={pageInfo.pageIndex == 1}
                    icon="caret-left"
                    loading={pageInfo.loading}
                    onClick={() => {
                      dt_store.PAGE_INDEX--;
                      dt_store.fn_reloadData(true);
                    }}
                  ></Button>
                  <Button
                    disabled={pageInfo.pageIndex >= totalPageNum}
                    loading={pageInfo.loading}
                    icon="caret-right"
                    onClick={() => {
                      dt_store.PAGE_INDEX++;
                      dt_store.fn_reloadData(true);
                    }}
                  ></Button>
                  <Button
                    disabled={pageInfo.pageIndex >= totalPageNum}
                    loading={pageInfo.loading}
                    icon="refresh"
                    onClick={() => {
                      dt_store.fn_reloadData(true);
                    }}
                  ></Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        );
      });
    },
    panelWithTitle: panelWithTitle,
  },
  get_frontend_tools: () => {
    return {
      label: "FrontEnd Tools",
      icon: "globe",
      pid: "frontend_tools",
    };
  },
  get_w3c_list: () => {
    return {
      label: "W3C Standard",
      icon: "third-party",
      pid: "w3ctools",
    };
  },
  get_react_list: () => {
    return {
      label: "React Framework",
      icon: "prescription",
      pid: "react_frame_work",
    };
  },
  directPage(myargs) {
    return observer((props) => {
      const { myconfig } = props;
      let crtStoreName = myconfig.storeName;
      let commonConfigs = {
        crtStoreName,
      };
      const PUtils = fn_PUtils(commonConfigs);
      return (
        <div className="sys-card-wrapper">
          <Card
            style={{
              overflow: "auto",
              padding: "0px",
            }}
          >
            {React.createElement(myargs.jsx, {
              ...props,
              PUtils,
            })}
          </Card>
        </div>
      );
    });
  },
  pleaseStayTuned(myargs) {
    return (props) => (
      <div className="sys-card-wrapper">
        <Card
          style={{
            overflow: "auto",
            padding: "0px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "80%",
              margin: "0 auto",
              height: "90%",
              textAlign: "center",
            }}
          >
            {myargs.msg || ""}
          </div>
        </Card>
      </div>
    );
  },
  translate(myargs) {
    return observer((props) => {
      window.testprops = props;
      const { myconfig } = props;
      let crtStoreName = myconfig.storeName;
      let commonConfigs = {
        crtStoreName,
      };
      const PUtils = fn_PUtils(commonConfigs);
      let formatTranslate = async () => {
        gstore.common_app[crtStoreName].loading_beautify = true;
        window.test_crtStoreName = crtStoreName;
        try {
          let leftValue = gstore.common_app[crtStoreName].model.leftValue;
          let running_scripts =
            gstore.common_app[crtStoreName].model.running_scripts;

          if (gutils.empty(leftValue)) {
            gutils.alert(t(`There's no available text can be translated`));
          } else {
            // preparing for the scripts
            let crtActionTimestamp =
              "_" +
              new Date().getTime() +
              "_" +
              parseInt("" + Math.random() * 1000);
            // running_scripts.replaceAll()
            running_scripts = running_scripts
              .replaceAll(
                `translateEntireLogic`,
                `translateEntireLogic_${crtActionTimestamp}`
              )
              .replaceAll(
                `afterTranslate`,
                `afterTranslate_${crtActionTimestamp}`
              )
              .replaceAll(
                `beforeTranslate`,
                `beforeTranslate_${crtActionTimestamp}`
              );
            let callFn = `translateEntireLogic_${crtActionTimestamp}`;
            running_scripts =
              running_scripts +
              "\n" +
              `
                    window.${callFn} = ${callFn}
                    `;
            window.runningscript = running_scripts;
            let translateType = myargs.type;
            eval(running_scripts);
            let allFinishedRef = [];
            if (_.isNil(translateType)) {
              translateType = "json";
            }
            let savingFn = () => {};
            let fn_translate = function (value) {
              let callAwait = (async function () {
                if (!_.isString(value)) {
                  return value;
                }
                let myres = await PUtils.translate({
                  text: value,
                });
                return myres;
              })();
              allFinishedRef.push(callAwait);
              return callAwait;
            };
            let leftValueJSON = null;
            let myarr = [];
            switch (translateType) {
              case "json":
                leftValueJSON = JSON.parse(leftValue);
                window[callFn](leftValueJSON, fn_translate);
                savingFn = () => {
                  gstore.common_app[crtStoreName].setRightValue(
                    JSON.stringify(leftValueJSON, null, 1)
                  );
                };
                break;
              case "properties":
                leftValueJSON = _.chain(leftValue)
                  .split("\n")
                  .filter(
                    (x) => _.trim(x) != "" && (x || "").indexOf("=") != -1
                  )
                  .map((x) => {
                    let myarr = _.split(x, "=");
                    return {
                      key: _.get(myarr, 0),
                      value: _.get(myarr, 1),
                    };
                  })
                  .value();
                myarr = [];
                window[callFn](
                  leftValueJSON,
                  fn_translate,
                  (index, key, value) => {
                    myarr[index] = key + "=" + value;
                  }
                );
                savingFn = () => {
                  gstore.common_app[crtStoreName].setRightValue(
                    _.chain(myarr)
                      .filter((x) => !_.isNil(x))
                      .join("\n")
                      .value()
                  );
                };
                break;
              case "plaintext":
                leftValueJSON = leftValue;
                myarr = [];
                window[callFn](leftValueJSON, fn_translate, (index, value) => {
                  myarr[index] = value;
                });
                savingFn = () => {
                  gstore.common_app[crtStoreName].setRightValue(
                    _.chain(myarr)
                      .filter((x) => !_.isNil(x))
                      .join("\n")
                      .value()
                  );
                };

                break;
            }
            for (let item of allFinishedRef) {
              await item;
              savingFn();
            }
          }
          gstore.common_app[crtStoreName].loading_beautify = false;
        } catch (error) {
          // gutils.alert(error.message || error);
          gstore.common_app[crtStoreName].loading_beautify = false;
          console.log("got error", error);
          gstore.common_app[crtStoreName].setRightValue(
            gutils.getErrMsg(error)
          );
          return;
        } finally {
          gstore.common_app[crtStoreName].loading_beautify = false;
        }
        gstore.common_app[crtStoreName].loading_beautify = false;
      };
      let language = myargs.language;
      return (
        <BeautifyCodeCommon
          noTriggerWhenCall={true}
          mytotalTitle={t(myargs.totalTitle)}
          mainText={myargs.totalTitle}
          needUrlBtn={false}
          noSources={true}
          noOptions={false}
          fontSize={15}
          wordWrap={"on"}
          syncView={true}
          noBeautifyBtn={true}
          needBase64Btn={false}
          leftPanelProps={{
            percent: 0.5,
            jsx: PUtils.jsx.panelWithTitle({
              title: "Procedure",
              jsx: PUtils.jsx.tabWithDefinition({
                list: [
                  {
                    label: t(`Scripts`),
                    jsx: PUtils.jsx.createGEditor({
                      fontSize: 11,
                      key: "running_scripts",
                      language: "javascript",
                      initContent: myargs.initContent,
                    }),
                  },
                ],
                key: "left_top_btm",
              }),
            }),
          }}
          beforeActionBtn={[
            {
              onClick: formatTranslate,
              label: t(myargs.totalTitle),
              intent: "primary",
            },
          ]}
          afterConfigItem={[...PUtils.getTranslateConfigs()]}
          exampleStr={myargs.exampleStr}
          crtStoreName={myconfig.storeName}
          language={language}
          needNetwork={true}
          rightLang={language}
        />
      );
    });
  },
  simpleLeftRightConvertor(myargs = {}) {
    return observer((props) => {
      const { myconfig } = props;
      let crtStoreName = myconfig.storeName;
      window.testprops = props;
      let commonConfigs = {
        crtStoreName,
      };
      const PUtils = fn_PUtils(commonConfigs);
      let formatTranslate = async () => {
        console.log("win-updating", crtStoreName);
        gstore.common_app[crtStoreName].loading_beautify = true;
        gstore.common_app[crtStoreName].setRightValue(``);
        try {
          // handling
          let leftValue = gstore.common_app[crtStoreName].model.leftValue;
          if (myargs.handle) {
            let myrightval = await myargs.handle(
              {
                leftValue: leftValue,
              },
              {
                crtStoreName,
                PUtils,
              }
            );
            gstore.common_app[crtStoreName].setRightValue(myrightval.result);
          } else {
            gstore.common_app[crtStoreName].setRightValue(
              `There's no implementation for this action.`
            );
          }
          gstore.common_app[crtStoreName].loading_beautify = false;
        } catch (error) {
          console.log(error);
          // gutils.alert(error.message || error);
          gstore.common_app[crtStoreName].loading_beautify = false;
          console.log("got error", error);
          gstore.common_app[crtStoreName].setRightValue(
            gutils.getErrMsg(error)
          );
          return;
        }
      };

      let fn_formatSelfTranslate = (
        type = myargs.default_handle_type || "N/A"
      ) => {
        return async () => {
          gstore.common_app[crtStoreName].loading_beautify = true;
          try {
            // handling
            let leftValue = gstore.common_app[crtStoreName].model.leftValue;
            if (myargs.handle) {
              if (_.isNil(type) || type == "N/A") {
                if (!_.isNil(myargs.default_handle_type)) {
                  type = myargs.default_handle_type;
                }
              }
              let myrightval = await myargs.handle(
                {
                  leftValue: leftValue,
                  type,
                },
                {
                  crtStoreName,
                  PUtils,
                }
              );
              gstore.common_app[crtStoreName].setRightValue(myrightval.result);
            } else {
              gstore.common_app[crtStoreName].setRightValue(
                `There's no implementation for this action.`
              );
            }
            gstore.common_app[crtStoreName].loading_beautify = false;
          } catch (error) {
            console.log(error);
            // gutils.alert(error.message || error);
            console.log("got error", error);
            gstore.common_app[crtStoreName].setRightValue(
              gutils.getErrMsg(error)
            );
            gstore.common_app[crtStoreName].loading_beautify = false;
            return;
          }
          gstore.common_app[crtStoreName].loading_beautify = false;
        };
      };

      PUtils.crtStore.fn_trigger_it = formatTranslate;

      let language = myargs.language;

      let r_leftPanelProps = useMemo(() => {
        return myargs.fn_leftPanelProps
          ? myargs.fn_leftPanelProps({
              PUtils,
            })
          : null;
      }, [
        _.size(
          myargs.fn_leftPanelProps
            ? myargs.fn_leftPanelProps({
                PUtils,
              })
            : []
        ) +
          "" +
          !_.isNil(myargs.fn_leftPanelProps),
      ]);

      let r_fn_rightPanelProps = useMemo(() => {
        return myargs.fn_rightPanelProps
          ? myargs.fn_rightPanelProps({
              PUtils,
            })
          : null;
      }, [
        _.size(
          myargs.fn_rightPanelProps
            ? myargs.fn_rightPanelProps({
                PUtils,
              })
            : []
        ) +
          "" +
          !_.isNil(myargs.fn_rightPanelProps),
      ]);

      let r_fn_rightMainGlobalJsx = useMemo(() => {
        return myargs.fn_rightMainGlobalJsx
          ? myargs.fn_rightMainGlobalJsx({
              PUtils,
            })
          : null;
      }, [
        _.size(
          myargs.fn_rightMainGlobalJsx
            ? myargs.fn_rightMainGlobalJsx({
                PUtils,
              })
            : []
        ) +
          "" +
          !_.isNil(myargs.fn_rightPanelProps),
      ]);

      return (
        <BeautifyCodeCommon
          wordWrap={
            (crtStoreName || "").indexOf(`Sym`) != -1
              ? "on"
              : myargs.wordWrap || PUtils.crtModel.wordWrap
          }
          noSelectFile={myargs.noSelectFile}
          noTitleBar={myargs.noTitleBar}
          noRightEditor={myargs.noRightEditor}
          handleRawFileTooltip={
            myargs.handleRawFileTooltip ||
            (myargs.handleRawInBackend
              ? `Uploaded. CodeGen will use encode mode to calculate the file {0}`
              : ``)
          }
          right_wordWrap={
            (crtStoreName || "").indexOf(`Sym`) != -1
              ? "on"
              : myargs.right_wordWrap || PUtils.crtModel.wordWrap
          }
          handleRawInBackend={myargs.handleRawInBackend}
          syncView={myargs.syncView}
          fontSize={myargs.fontSize}
          fn_format_func={(obj) => {
            return myargs.handle(obj, {
              crtStoreName,
              PUtils,
            });
          }}
          noTriggerWhenCall={myargs.noTriggerWhenCall == true ? true : false}
          mytotalTitle={t(myargs.totalTitle)}
          mainText={myargs.totalTitle}
          needUrlBtn={false}
          noSources={_.get(myargs, "noSources", true)}
          noOptions={_.get(myargs, "noOptions", false)}
          noBeautifyBtn={true}
          needBase64Btn={false}
          beforeActionBtn={[
            ...(myargs.fn_beforeActionBtn
              ? myargs.fn_beforeActionBtn({
                  fn_formatSelfTranslate,
                  PUtils,
                })
              : [
                  {
                    onClick: formatTranslate,
                    label: t(myargs.mainBtnText) || t(myargs.totalTitle),
                    intent: "primary",
                  },
                ]),
            ,
          ].filter((x) => !_.isNil(x))}
          helperText={myargs.helperText}
          upload_file_logic={myargs.upload_file_logic}
          afterConfigItem={[
            ...(myargs.fn_configItem
              ? myargs.fn_configItem({
                  crtStoreName,
                  PUtils,
                })
              : []),
          ]}
          exampleArr={myargs.exampleArr}
          exampleStr={myargs.exampleStr}
          crtStoreName={myconfig.storeName}
          language={language}
          needNetwork={myargs.needNetwork}
          haveLinkFor
          rightLang={myargs.right_lang || language}
          rightMainGlobalJsx={r_fn_rightMainGlobalJsx}
          leftPanelProps={r_leftPanelProps}
          rightPanelProps={r_fn_rightPanelProps}
          onlyMainRightView={myargs.onlyMainRightView}
        />
      );
    });
  },
  inst_resize_hori_define(myargs = {}) {
    return observer((props) => {
      window.inst_props = props;
      const { PUtils } = props;
      let crtStoreName = PUtils.crtStoreName;
      let resizekey = crtStoreName + myargs.key;
      return (
        <HalfResizeForTwoHorizontal
          defaultLeftWidthValue={myargs.width}
          defaultPercent={myargs.percent}
          value={gstore.localSettings[resizekey]}
          onChg={(val) => {
            gstore.localSettings[resizekey] = val;
          }}
          leftJsx={myargs.leftJsx}
          rightClz="needleftborder"
          rightJsx={myargs.rightJsx}
        />
      );
    });
  },
  withPluginPage(preRequisiteJson, optObj, MyJsx) {
    console.log("preRequisiteJson", preRequisiteJson);
    let DLIB_ID = _.get(optObj, "DLIB_ID");
    if (!_.isNil(DLIB_ID)) {
      window["DLIB_" + DLIB_ID] = preRequisiteJson;
    }
    return observer((props) => {
      let appName = null;
      if (optObj.fn_appName) {
        appName = optObj.fn_appName();
      }
      let centerTextStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        flexDirection: "column",
        margin: "0 auto",
        height: "90%",
        textAlign: "center",
      };
      let appId = optObj.appId;
      let [fakeId] = useState(_.uniqueId("fake"));
      let status_appId = "status" + appId;
      if (_.isNil(appId)) {
        status_appId = "status" + fakeId;
      }
      if (_.isNil(window[status_appId])) {
        window[status_appId] = "1";
        if (_.isNil(gstore.ext[status_appId])) {
          gstore.ext[status_appId] = {};
        }
        _.merge(gstore.ext[status_appId], {
          latestLoggingContent: "",
          waitUpdatingFiles: [],
          ref_id: null,
          is_dlib_inited: false,
          is_dlib_sent: false,
          nodeCheckDone: false,
          startNodeCheck: false,
          checkNodeBefore: false,
          nodeCheckResult: [],
          startCheck: false,
          missedDeps: [],
        });
      }
      let crtLocalStore = gstore.ext[status_appId];
      window.tmp_logic_store = crtLocalStore;
      let [mmid] = useState(_.uniqueId(`mmid`));
      let sysref = useRef({
        is_quit: false,
      });
      useEffect(() => {
        sysref.current.is_quit = false;
        return () => {
          sysref.current.is_quit = true;
        };
      }, []);
      window.tmp_100200300 = sysref;
      async function refreshDataForCheckingNode() {
        try {
          let { gref } = optObj;
          if (_.isNil(gref)) {
            if (gutils.dev()) {
              gutils.alert(`Please be noted gref is empty`);
            }
          }
          crtLocalStore.nodeCheckDone = false;
          crtLocalStore.checkNodeBefore = false;
          let common_m_args = {
            node_deps: preRequisiteJson.node_deps,
            preRequisiteJson,
            lang: getCrtLang(),
          };
          let { data } = await gref.optAPI(`checking_nodejs_services`, {
            ...common_m_args,
          });
          console.log("ref_data", data);
          let { ref_id, waitUpdatingFiles } = data;
          crtLocalStore.ref_id = ref_id;
          window["reinit_" + optObj.appId] = async () => {
            await gref.optAPI(`remove_all_nodejs_services`, {
              ...common_m_args,
            });
            crtLocalStore.startNodeCheck = true;
            crtLocalStore.nodeCheckDone = false;
            crtLocalStore.checkNodeBefore = false;
            refreshDataForCheckingNode();
          };
          if (_.isEmpty(waitUpdatingFiles)) {
            crtLocalStore.nodeCheckDone = true;
          } else {
            crtLocalStore.waitUpdatingFiles = waitUpdatingFiles;
            crtLocalStore.checkNodeBefore = true;
            crtLocalStore.nodeCheckDone = false;
            while (true) {
              let { data } = await gref.optAPI(`get_latest_nodejs_loggings`, {
                ...common_m_args,
              });

              crtLocalStore.waitUpdatingFiles = data.waitUpdatingFiles;
              let new_ctn = _.chain(data.latestLoggingContent || "")
                .split("\n")
                .map((x) => {
                  let style_str = `style=""`;
                  if (
                    x.indexOf(`[ERROR]`) != -1 ||
                    x.indexOf(`npm verb audit error`) != -1
                  ) {
                    style_str = `style="color:var(--app-text-red);"`;
                  }
                  if (x.indexOf(`[INFO]`) != -1) {
                    style_str = `style="color:var(--app-text-green);"`;
                  }
                  if (x.indexOf(`[EXEC]`) != -1) {
                    style_str = `style="color:var(--app-text-purple);"`;
                  }
                  x = `<div ${style_str}>${x}</div>`;
                  return x;
                })
                .join(``)
                .value();
              // let preLenEq = true // crtLocalStore.latestLoggingContent == new_ctn;
              let haveChange = crtLocalStore.latestLoggingContent != new_ctn;
              if (haveChange) {
                crtLocalStore.latestLoggingContent = new_ctn;
              }
              let isAllOk =
                _.size(
                  _.chain(data.waitUpdatingFiles)
                    .filter((x) => x.status == "done")
                    .value()
                ) == _.size(data.waitUpdatingFiles);
              if (isAllOk) {
                crtLocalStore.nodeCheckDone = true;
                break;
              } else {
                // !preLenEq
                if (haveChange) {
                  gutils.defer(() => {
                    let $a = $(`#${mmid}`);
                    if ($a && $a[0]) {
                      $a.scrollTop($a[0].scrollHeight);
                    }
                  });
                }
              }
              await gutils.sleep(1000);
              if (sysref.current.is_quit) {
                // break;
              }
            }
          }
        } catch (e) {
          console.log("init-node-2", e);
        }
      }
      function markAllInvokeCheckNodeIsDone() {
        crtLocalStore.startNodeCheck = true;
        crtLocalStore.checkNodeBefore = true;
        crtLocalStore.nodeCheckDone = true;
        crtLocalStore.nodeCheckResult = [];
      }
      async function refreshDataForCheckingDeps(slient = false) {
        try {
          if (!slient) {
            crtLocalStore.checkBefore = false;
          }
          let { content } = await gutils.opt(
            "/env_init/checkPreRequisiteJson",
            preRequisiteJson
          );
          console.log("refresh data for content", content);
          crtLocalStore.missedDeps = content.notInstalledListings;
          if (!slient) {
            crtLocalStore.checkBefore = true;
          }
          if (_.isEmpty(crtLocalStore.missedDeps)) {
            if (!_.isEmpty(preRequisiteJson.node_deps)) {
              if (!crtLocalStore.startNodeCheck) {
                crtLocalStore.startNodeCheck = true;
                refreshDataForCheckingNode();
              }
            } else {
              markAllInvokeCheckNodeIsDone();
            }
          }
        } catch (e) {
          console.log("init-node", e);
        }
      }
      useEffect(() => {
        if (!crtLocalStore.startCheck) {
          crtLocalStore.startCheck = true;
          refreshDataForCheckingDeps();
        }
      }, []);

      if (!crtLocalStore.checkBefore || !_.isEmpty(crtLocalStore.missedDeps)) {
        return (
          <div className="sys-card-wrapper system-checking-mode">
            <Card
              style={{
                overflow: "auto",
                padding: "0px",
              }}
            >
              {panelWithTitle({
                noTranslate: true,
                title: t(`Dependency Check`, optObj.appId),
                jsx: !crtLocalStore.checkBefore ? (
                  <div style={centerTextStyle}>
                    <div style={{ marginBottom: 5, fontSize: "15px" }}>
                      Loading dependencies for {optObj.appId}
                      <Blink />
                    </div>
                    <div>
                      {t(
                        `CodeGen is checking related dependencies to ensure all of these required dependencies are ready at present, please wait a moment.`
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: "10px" }}>
                    <h2>
                      {t(`Downloading dependencies for {0}`, appName)}
                      <Blink />
                    </h2>
                    <p style={{ marginBottom: "10px" }}>
                      {t(
                        `Before using this function {0}, CodeGen needs to download related dependencies. No worries, we're working on it and it won't take too long, please wait a moment.`,
                        appName
                      )}
                    </p>
                    <Settings_library
                      filterContent={(arr) => {
                        return _.filter(arr, (x, d, n) => {
                          return (
                            _.findIndex(
                              crtLocalStore.missedDeps,
                              (n) => n.prop == x.prop
                            ) != -1
                          );
                        });
                      }}
                      fn_initWhenMount={({ downloadAll }) => {
                        downloadAll({
                          noMsgView: true,
                        });
                      }}
                      fn_checkListVal={async (listVal) => {
                        let stillNotDownloaded =
                          _.chain(listVal)
                            .find((x) => x["val_status"] != true)
                            .size()
                            .value() != 0;
                        if (stillNotDownloaded) {
                          // not ok
                        } else {
                          await refreshDataForCheckingDeps();
                        }
                      }}
                    />
                  </div>
                ),
              })}
            </Card>
          </div>
        );
      }
      if (crtLocalStore.startNodeCheck && !crtLocalStore.nodeCheckDone) {
        return (
          <div className="sys-card-wrapper">
            <Card
              style={{
                overflow: "auto",
                padding: "0px",
              }}
            >
              {panelWithTitle({
                noTranslate: true,
                title: t(`Installing dependencies for Node.js Service`),
                jsx: !crtLocalStore.checkNodeBefore ? (
                  <div style={centerTextStyle}>
                    <div style={{ marginBottom: 5, fontSize: "15px" }}>
                      Loading dependencies for {optObj.appId}(
                      {`Node.js Services`})
                      <Blink />
                    </div>
                    <div>
                      {t(
                        `CodeGen is checking related dependencies for Node.js services to ensure all of these required dependencies are ready at present, please wait a moment.`
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={{ height: "100%", padding: "10px" }}>
                    <div
                      style={{
                        height: "35%",
                        maxHeight: "35%",
                        overflow: "auto",
                      }}
                    >
                      <h2>
                        {t(
                          `Downloading node dependencies for {0} by using NPM`,
                          appName
                        )}
                        <Blink />
                      </h2>
                      <p style={{ marginBottom: "10px" }}>
                        {t(
                          `Since there're some node.js modules hasn't been initialized yet, before using this function {0}, CodeGen needs to download related dependencies by using NPM. No worries, we're working on it and it won't take too long, please wait a moment.`,
                          appName
                        )}
                      </p>
                      <div>
                        <FormEasyTable
                          column={[
                            // {
                            //   label: `ID`,
                            //   value: (x, d) => `${d + 1}`,
                            // },
                            {
                              label: t(`Module Name`),
                              value: (x) => x.name,
                            },
                            {
                              label: t(`Run Status`),
                              value: (x) => x.status,
                            },
                            {
                              label: t(`Update Time`),
                              value: (x) => x.time_str,
                            },
                          ]}
                          data={crtLocalStore.waitUpdatingFiles}
                        ></FormEasyTable>
                      </div>
                    </div>
                    <div
                      style={{
                        height: "65%",
                        maxHeight: "65%",
                        overflow: "auto",
                        border: "1px solid var(--app-bg-border-e3e3e2)",
                        padding: "8px",
                        color: `--app-text-info-cadet`,
                        // fontFamily: `monospace`,
                      }}
                      id={mmid}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: crtLocalStore.latestLoggingContent,
                        }}
                      ></div>
                    </div>
                  </div>
                ),
              })}
            </Card>
          </div>
        );
      }

      if (!_.isNil(DLIB_ID)) {
        if (!crtLocalStore.is_dlib_inited) {
          if (!crtLocalStore.is_dlib_sent) {
            crtLocalStore.is_dlib_sent = true;
            gutils.defer(async () => {
              await gstore.ext.init[DLIB_ID].fn_sync_common_store();
              if (sysref.current.is_quit) {
                crtLocalStore.is_dlib_inited = true;
              }
            });
          }
          return (
            <div>
              {t(`Loading for initializing the library`)}
              <Blink />
            </div>
          );
        }
      }

      return <MyJsx {...props} />;
    });
  },
  rightMainPageJsx(myargs) {
    return observer((props) => {
      const { myconfig } = props;
      let crtStoreName = myconfig.storeName;
      let commonConfigs = {
        crtStoreName,
      };
      const PUtils = fn_PUtils(commonConfigs);
      // if (_.isEmpty(_.get(PUtils, "crtModel"))) {
      //   return (
      //     <div>
      //       Loading for related model
      //       <Blink />
      //     </div>
      //   );
      // }
      let MyJsx = myargs.jsx;
      let fn_getBasicTitle = () => {
        return _.isFunction(myargs.totalTitle)
          ? myargs.totalTitle({ PUtils })
          : myargs.totalTitle;
      };
      let totalTitle = fn_getBasicTitle();
      let [appendixForTitleIdx, onAppendixForTielIdx] = useState(0);
      let [randomTitleVal, onRandomTitleVal] = useState(null);
      let randomTitleArr = null;
      if (myargs.fn_randomTitleArr) {
        randomTitleArr = myargs.fn_randomTitleArr();
      }
      if (!_.isNil(randomTitleArr) && !_.isNil(appendixForTitleIdx)) {
        totalTitle = `${t(totalTitle)} (${`Tips:`} ${
          !_.isNil(randomTitleVal)
            ? randomTitleVal
            : _.get(randomTitleArr, [appendixForTitleIdx])
        })`;
      }
      useEffect(() => {
        let a = PUtils.loop(async () => {
          if (_.isNil(myargs.fn_randomTitleArr)) {
            await gutils.sleep(8000);
            return;
          }
          let randomTitleArr = myargs.fn_randomTitleArr();
          await gutils.sleep(8000);
          if (!_.isNil(randomTitleArr)) {
            while (true) {
              let nextValItem = _.get(
                randomTitleArr,
                parseInt(Math.random() * (_.size(randomTitleArr) + 1))
              );
              if (randomTitleVal != nextValItem) {
                randomTitleVal = nextValItem;
                break;
              } else {
                continue;
              }
            }
            onRandomTitleVal(randomTitleVal);
          }
        }, 50);
        return () => {
          a();
        };
      }, []);
      // useEffect(() => {
      //   let fn_1 = ;
      //   return () => {
      //     fn_1();
      //   };
      // }, []);
      gutils.once("run_for_" + crtStoreName, () => {
        reaction(
          () => {
            return {
              ...gstore.common_app[crtStoreName].model,
              ...PUtils.crtModel,
            };
          },
          _.debounce(() => {
            console.log("save data now");
            PUtils.commonSave();
          }, 300)
        );
      });
      let node_deps = _.get(myargs, "PreRequisiteJson.node_deps");
      return (
        <BeautifyCodeCommon
          right_menu_arr={
            !_.isEmpty(node_deps)
              ? [
                  <MenuDivider title={t("Dependencies")} />,
                  <MenuItem
                    onClick={async () => {
                      console.log("myargs", myargs.appId);
                      await window["reinit_" + myargs.appId]();
                    }}
                    intent={"none"}
                    icon={"remove-row-bottom"}
                    text={t(`Re-Download Dependencies`)}
                  />,
                  ...(_.get(myargs, "PreRequisiteJson.show_service_controls")
                    ? [
                        <MenuDivider title={t("Services")} />,
                        <MenuItem
                          onClick={async () => {
                            await myargs.gref.optAPI(`stop_all_service`);
                          }}
                          intent={"none"}
                          icon={"remove-row-bottom"}
                          text={t(`Shutdown All Services`)}
                        />,
                      ]
                    : []),
                ]
              : []
          }
          left_hist_use_all={myargs.left_hist_use_all}
          noLineWrap={myargs.noLineWrap}
          noPadView={myargs.noPadView}
          onlyMainRightView={myargs.onlyMainRightView}
          noTriggerWhenCall={true}
          noCopyBtn={true}
          mytotalTitle={
            myargs.noTranslateForTitle || !_.isNil(myargs.randomTitleArr)
              ? totalTitle
              : t(totalTitle)
          }
          mainText={totalTitle}
          needBase64Btn={false}
          needUrlBtn={false}
          noSources={true}
          noOptions={_.get(myargs, "noOptions", false)}
          noBeautifyBtn={true}
          rightMainGlobalJsx={observer((props) => {
            return <MyJsx myconfig={myconfig} PUtils={PUtils} />;
          })}
          afterConfigItem={
            myargs.fn_afterConfigItem
              ? myargs.fn_afterConfigItem({
                  crtStoreName,
                  setLoading: async function (value) {
                    gstore.common_app[crtStoreName].loading_beautify = value;
                  },
                  runAsLoading: async function (fn) {
                    gstore.common_app[crtStoreName].loading_beautify = true;
                    try {
                      let myval = await fn();
                      gstore.common_app[crtStoreName].loading_beautify = false;
                      return myval;
                    } catch (e) {
                      gstore.common_app[crtStoreName].loading_beautify = false;
                      console.log(e);
                    }
                    gstore.common_app[crtStoreName].loading_beautify = false;
                  },
                  loading: gstore.common_app[crtStoreName].loading_beautify,
                  PUtils: PUtils,
                })
              : []
          }
          exampleStr={``}
          crtStoreName={myconfig.storeName}
          language={``}
          needNetwork={false}
          rightLang={``}
          {..._.get(myargs, "codeCommonArgs", {})}
        />
      );
    });
  },
};
window.xxx_fn_otherPages = fn_otherPages;
export default fn_otherPages;
