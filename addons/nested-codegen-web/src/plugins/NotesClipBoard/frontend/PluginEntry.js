const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  GFormInput,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  GFormSwitch,
  BluePrintPopover,
  Mobx,
  useRef,
  Tag,
  Text,
  MobxReact,
  HalfResizeForTwo,
  MobxReactLite,
  ProgressBar,
  Dialog,
  GSyncSelectWithFilter,
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
import "./myfile.less";
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = `Clipboard`;

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState() {
      return {
        page_id: "base",
      };
    },
    menus: [
      {
        ...fn_otherPages.menu.getObjForNotes(),
        children: [
          {
            label: appTitle,
            icon: "clipboard",
            pid: "ROOT_EXTENSION_ADDONS",
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
        noTitleBar: true,
        noLeftMenu: true,
        onlyMainRightView: true,
        noTriggerWhenCall: true,
        syncView: true,
        type: "plaintext",
        fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
          return [
            {
              onClick: fn_formatSelfTranslate("generate"),
              label: t(`Generate Text`),
              intent: "primary",
            },
          ];
        },
        totalTitle: `Clipboard Management`,
        language: "markdown",
        handle: async (
          { leftValue, type = "generate" },
          { crtStoreName, PUtils }
        ) => {
          console.log("rendering v1", type, leftValue);
          let str = leftValue;
          let { data } = await gref.optAPI("proxy_transform", {
            ...PUtils.crtModel,
            config_charset: "UTF-8",
            text: str,
            type: type,
          });
          return {
            result: data.value,
          };
        },
        fn_configItem: ({ crtStoreName, PUtils }) => {
          let model = gstore.common_app[crtStoreName].model;
          return [
            {
              label: t("Random Type"),
              children: [
                {
                  tag: GSyncSelectWithFilter,
                  index: "config_gen_text_type",
                  obj: model,
                  whenChg: (x) => {
                    model.config_gen_text_type = x;
                  },
                  list: [
                    {
                      label: "String",
                      value: "string",
                    },
                    {
                      label: "String from Seeds",
                      value: "string_from_seeds",
                    },
                    {
                      label: "String(UpperCase Only)",
                      value: "string_upper",
                    },
                    {
                      label: "String(LowerCase Only)",
                      value: "string_lower",
                    },
                    {
                      label: "UUID",
                      value: "uuid",
                    },
                    {
                      label: "Integer",
                      value: "integer",
                    },
                    {
                      label: "Decimal",
                      value: "decimal",
                    },
                  ].map((x) => {
                    return {
                      ...x,
                      label: t(x.label),
                    };
                  }),
                },
              ],
            },
          ];
        },
        fn_rightMainGlobalJsx: ({ PUtils }) => {
          let model = PUtils.crtModel;
          let crtStore = PUtils.crtStore;
          let crtStoreName = PUtils.crtStoreName;
          let commonSave = PUtils.commonSave;
          let default_select_tab = "hist";
          return observer((props) => {
            let lc_store = fn_otherPages.ajax.getIntelStore({
              getDataFromAPI() {
                return gref.optAPI("get_config_by_page_id", {
                  page_id: model.page_id,
                });
              },
              saveData(data) {
                return gref.optAPI(`save_config_by_page_id`, {
                  updateVM: _.mapKeys(
                    {
                      page_id: model.page_id,
                      ...lc_store,
                    },
                    (x, d, n) => {
                      return _.toUpper(d);
                    }
                  ),
                });
              },
              initState() {
                return {
                  ID: null,
                  CP_RUN_STAT: "true",
                  CP_STAT_INTERVAL: 3,
                };
              },
            });

            let activeRef = useRef({
              crtUsingID: null,
              activeID: null,
              activeData: null,
            });
            let updateValueToJson = () => {
              try {
                let { activeID, activeData } = activeRef.current;
                let crtStore = PUtils.crtStore;
                if (crtStore.cp_view_ref) {
                  crtStore.cp_view_ref
                    .getModel()
                    .setValue(_.get(activeData, "DATA_CONTENT"));
                }
              } catch (e) {
                console.log(e);
              }
            };

            // let memoRef = useMemo(() => {
            //   return PUtils.jsx.createGEditor({
            //     readOnly: true,
            //     fontSize: 11,
            //     key: "cp_view",
            //     language: "javascript",
            //     initContent: ``,
            //     onRef: () => {
            //       updateValueToJson();
            //     },
            //   });
            // }, [activeRef.current.crtUsingID, activeRef.current.activeID]);
            let memoRef = PUtils.jsx.createGEditor({
              wordWrap: "on",
              readOnly: true,
              fontSize: 11,
              key: "cp_view",
              language: "javascript",
              initContent: ``,
              onRef: () => {
                updateValueToJson();
              },
            });

            // return PUtils.jsx.tabWithDefinition({
            //   default_select_tab: default_select_tab,
            //   list: [
            //     {
            //       label: t(`Clipboard`),
            //       id: "hist",
            //       mode_jsx_func: true,
            //       jsx: (props) => <div>clipboard</div>,
            //     },
            //     {
            //       label: t(`Config`),
            //       id: "config",
            //       mode_jsx_func: true,
            //       jsx: (props) => <div>config</div>,
            //     },
            //   ],
            //   key: metaObj.appId + "hist",
            // });

            return PUtils.jsx.tabWithDefinition({
              default_select_tab: default_select_tab,
              list: [
                {
                  label:
                    t(`Clipboard`) +
                    (lc_store["CP_RUN_STAT"] == "false" ? t(`(Disabled)`) : ``),
                  id: "hist",
                  mode_jsx_func: true,
                  jsx: fn_otherPages.jsx.getPageViewForm({
                    list_title: `Clipboard Listings`,
                    detail_title: "Item Viewer",
                    pageSize: 20,
                    id: "get_clipboard_data",
                    PUtils,
                    gref,
                    onReadActiveData({ activeData, activeID }) {
                      // do something
                      activeRef.current.activeData = activeData;
                      activeRef.current.activeID = activeID;
                      updateValueToJson();
                    },
                    fn_getDetailPanel({ PUtils, activeID, activeData = {} }) {
                      updateValueToJson();
                      return fn_otherPages.jsx.getCalcOptPanel({
                        topHeight: `35px`,
                        topJsx: (
                          <div className="beflex" style={{ padding: "0 8px" }}>
                            <div className="beflex">
                              <Tag
                                style={{ marginRight: "5px" }}
                                minimal={true}
                                small={true}
                                intent={"primary"}
                              >
                                {`ID:` + activeID}
                              </Tag>
                              <Tag
                                style={{ marginRight: "5px" }}
                                minimal={true}
                                small={true}
                                intent={"success"}
                              >
                                {t(`Text Type`)}
                              </Tag>
                              <Tag
                                minimal={true}
                                small={true}
                                intent={"success"}
                                title={activeData.CREATE_TIME_STR}
                              >
                                {activeData.CREATE_TIME_STR}
                              </Tag>
                            </div>
                          </div>
                        ),
                        btmJsx: memoRef,
                      });
                    },
                    fn_jsx_eachItem(x, d, n, optFunc) {
                      let myvalue = _.get(x, "DATA_CONTENT");
                      console.log("fn_jsx_eachItem", x);
                      let is_current = optFunc.pageStore.activeID == x.ID;
                      return (
                        <div
                          className="m-moving"
                          style={{
                            userSelect: "none",
                            padding: "8px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            optFunc.clickItem();
                          }}
                        >
                          <Text
                            ellipsize={true}
                            style={{ marginBottom: "6px" }}
                          >
                            {myvalue}
                          </Text>
                          <div className="beflex">
                            <div>
                              <Tag
                                interactive={true}
                                onClick={() => {
                                  optFunc.clickItem();
                                }}
                                minimal={is_current && false ? false : true}
                                small={true}
                                intent={is_current ? "primary" : "none"}
                                title={x.CREATE_TIME_STR}
                              >
                                {x.CREATE_TIME_DESC}
                              </Tag>
                              {/* <Tag
                                minimal={true}
                                small={true}
                                intent={"primary"}
                              >
                                {t(`Selected Item`)}
                              </Tag> */}
                            </div>
                            <ButtonGroup>
                              {/* <Button
                                onClick={(e) => {
                                  optFunc.clickItem();
                                }}
                                {...fn_otherPages.form.getOutlineBtn("primary")}
                                text={t("View ") + " "}
                              ></Button> */}
                              <Button
                                onClick={(e) => {
                                  gutils.stop_e(e);
                                  gutils.copyWithAlert(myvalue);
                                }}
                                {...fn_otherPages.form.getOutlineBtn("success")}
                                text={t("Copy")}
                              ></Button>
                              <Button
                                {...fn_otherPages.form.getOutlineBtn("danger")}
                                onClick={(e) => {
                                  gutils.stop_e(e);
                                  optFunc.delete();
                                }}
                                text={t("Delete")}
                              ></Button>
                            </ButtonGroup>
                          </div>
                        </div>
                      );
                    },
                  }),
                  jsx_no_use: (props) => <div>clipboard</div>,
                },
                {
                  label: t(`Config`),
                  id: "config",
                  mode_jsx_func: true,
                  jsx: PUtils.fn.fn_form_jsx(
                    (props) => {
                      let { config_gen_text_type } = PUtils.crtModel;
                      window.config_gen_text_type = config_gen_text_type;
                      return [
                        <FormGroup
                          helperText={t(
                            "By default, CodeGen will enable this option to record these historical changes at your clipboard. No worries, CodeGen will only save this data in your local file system, and CodeGen will NEVER analyze or upload them to the remote server."
                          )}
                          label={t("Enable Clipboard Monitor?")}
                        >
                          <GFormSwitch
                            type="number"
                            valtype={"tf"}
                            onChange={(val) => {
                              console.log("switch now");
                              lc_store["CP_RUN_STAT"] = val;
                            }}
                            value={lc_store["CP_RUN_STAT"]}
                          />
                        </FormGroup>,
                        // <FormGroup
                        //   helperText={
                        //     t(
                        //       "CodeGen will check the latest content of your clipboard in a interval of time. Once there's any updates, CodeGen will save them into local file system."
                        //     ) +
                        //     t(
                        //       `You can set the time interval to control its trigger timing, and please be noted the time unit is second.`
                        //     )
                        //   }
                        //   label={t("Time Interval")}
                        // >
                        //   <GFormInput
                        //     type="number"
                        //     valtype={"tf"}
                        //     onChange={(val) => {
                        //       lc_store["CP_STAT_INTERVAL"] = val;
                        //     }}
                        //     value={lc_store["CP_STAT_INTERVAL"]}
                        //   />
                        // </FormGroup>,
                        <FormGroup
                          helperText={t(
                            "User can manage the clipboard data by clicking the button"
                          )}
                          label={t("Actions")}
                        >
                          <Button
                            onClick={async () => {
                              if (await gutils.ask_danger_opt()) {
                                await gref.optAPI(`erase_clipboard_data`, {
                                  ...model,
                                });
                                gutils.alertOk(`Erased`);
                              }
                            }}
                            text={t("Erase All Data")}
                          ></Button>
                        </FormGroup>,
                      ].filter((x) => !_.isNil(x));
                    },
                    {
                      style: {
                        ...fn_otherPages.style.commonSettings(),
                      },
                    }
                  ),
                },
              ],
              key: metaObj.appId + "hist",
            });
          });
        },
      })
    ),
  };
};
