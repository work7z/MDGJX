const {
  _,
  GSyncSelectWithFilter,
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
  GFormInput,
  H2,
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
  EditableText,
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
import cutils from "../../../TranslateForJSON/frontend/kit/common_utils";
import myless from "./Cpt_RedisViewer.less";
import { fn_utils_for_SQL } from "../sub/Sub_MainRedisView";
import FormListWithSearchBar from "../../../TranslateForJSON/frontend/cpt/FormListWithSearchBar";
import FormSyncEditor from "../../../TranslateForJSON/frontend/cpt/FormSyncEditor";
let fillIndex = [];
for (let i = 0; i <= 15; i++) {
  fillIndex.push({
    label: `db${i}`,
    value: "" + i,
  });
}

let RedisRightDataPanel = observer((props) => {
  let selectKey = props.selectKey;
  let onRemoveSelectKey = props.onRemoveSelectKey;
  let { PUtils, dbIndex } = props;
  let lc_store = useLocalStore(() => {
    return {
      crtValue: "",
      refreshTime: null,
      wordWrap: "on",
    };
  });
  let isThatEmpty = cutils.cond_emptyStr(props.selectKey);
  let fn_crtFnRefresh = async () => {
    if (cutils.cond_emptyStr(selectKey)) {
      return;
    }
    let { data } = await PUtils.gref.optAPI(`get_keyvalue_for_redis_by_key`, {
      ...fn_utils_for_SQL.get_common_args_for_API({
        PUtils,
        dbIndex,
        dbKey: selectKey,
      }),
      dbIndex: props.dbIndex,
      dbKey: selectKey,
    });
    lc_store.crtValue = _.get(data, "value");
    lc_store.refreshTime = Moment().format("HH:mm:ss");
  };
  useEffect(() => {
    gutils.defer(fn_crtFnRefresh);
  }, [isThatEmpty, selectKey]);
  if (isThatEmpty) {
    return (
      <p className="pt-10">
        {t(`Please select a key on the left panel to start.`)}
      </p>
    );
  }
  return (
    <div
      style={{
        padding: "0px",
      }}
      className={myless["redis-right-global-wrapper"]}
    >
      <div className={myless["redis-right-key"]}>
        <h3 className="bp3-text-muted" style={{}}>
          {selectKey}
        </h3>
      </div>
      <div
        className={myless["redis-right-control"] + ` sub-mr-5 `}
        style={{
          padding: "0 5px",
        }}
      >
        {cutils.jsx_btnList(
          [
            {
              text: t(`Update Key`),
              intent: "primary",
              outline: true,
              onClick: async () => {
                let title = `Update Redis Key Content`;
                let g_finalFormArr = [
                  {
                    label: t(`Key Name`),
                    f_desc: t(
                      `Creating or updating a value by identifying its key.`
                    ),
                    tabProps: {
                      disabled: true,
                    },
                    ph: `${t(
                      `Please place the key name here, it's a mandatory field.`
                    )}`,
                    tag: GFormInput,
                    prop: "dbKey",
                  },
                  {
                    label: t(`Key Value`),
                    f_desc: t(`This is the value definition.`),
                    ph: `${t(
                      `Please place the key value here, it's a mandatory field.`
                    )}`,
                    using_pure_obj: true,
                    tag: FormSyncEditor,
                    tagProps: {
                      wordWrap: "on",
                      title: `Definition`,
                      PUtils,
                      // notForceTextArea: true,
                      type: "textarea",
                    },
                    prop: "dbValue",
                  },
                ];
                let pureObj = {
                  dbValue: lc_store.crtValue,
                };
                class FormNewModel {
                  @observable model = {
                    dbKey: selectKey,
                    dbValue: lc_store.crtValue,
                  };
                }
                let presetFormModel = new FormNewModel();
                cutils.alertFormPanel({
                  pureObj,
                  confirmText: "Update Value",
                  title: title,
                  finalFormArr: g_finalFormArr,
                  presetFormModel: presetFormModel.model,
                  PUtils,
                  onSave: cutils.tryCatch(async (obj) => {
                    let finalModel = _.merge(
                      {},
                      presetFormModel.model,
                      pureObj
                    );
                    cutils.alertOk_noT(
                      t(`Updating it from your definition...`)
                    );
                    await PUtils.gref.optAPI(`update_that_key`, {
                      ...fn_utils_for_SQL.get_common_args_for_API({
                        PUtils,
                        dbIndex,
                        dbKey: selectKey,
                        dbValue: finalModel.dbValue,
                      }),
                    });
                    await fn_crtFnRefresh();
                    cutils.alertOk_noT(t(`Updated`));
                  }),
                });
              },
            },
            {
              text: t(`Delete Key`),
              outline: true,
              intent: "danger",
              onClick: async () => {
                if (
                  !(await gutils.confirm(
                    `Do you want to delete this key? This operation cannot be reversed after deleting it!`
                  ))
                ) {
                  return;
                }
                //
                await cutils.tryCatch(async () => {
                  await PUtils.gref.optAPI(`delete_that_key`, {
                    ...fn_utils_for_SQL.get_common_args_for_API({
                      PUtils,
                      dbIndex,
                      dbKey: selectKey,
                    }),
                  });
                  onRemoveSelectKey();
                  cutils.alertOk_noT(t(`Deleted.`));
                })();
              },
            },
            {
              text: t(`Copy Value`),
              intent: "success",
              onClick: (e) => {
                cutils.copy(lc_store.crtValue, e);
              },
            },
            {
              text: t(`Switch Wrap`),
              intent: "none",
              onClick: async () => {
                //
                lc_store.wordWrap = lc_store.wordWrap == "on" ? "off" : "on";
              },
            },
            {
              text: t(`Refresh`),
              intent: "none",
              onClick: async () => {
                cutils.alert_noT(t(`Refreshing...`));
                await fn_crtFnRefresh();
                cutils.alertOk_noT(t(`Refreshed.`));
              },
            },
          ].map((x) => {
            return {
              ...x,
              small: true,
            };
          })
        )}
      </div>
      <div className={myless["redis-right-content"]} style={{}}>
        {React.createElement(
          observer((props) => {
            return PUtils.jsx.createGEditorWithNoStorageAndSimple({
              readOnly: true,
              tmp_carry_version: lc_store.crtValue,
              keepNoInvolve: true,
              // selectAllWhenClick: true,
              // needBorder: true,
              fontSize: 13,
              // - Click to Copy it
              title: t(`Refreshed at {0}`, lc_store.refreshTime),
              wordWrap: lc_store.wordWrap,
              loading: false,
              key: lc_store.keyword,
              language: "js",
              directValue: lc_store.crtValue,
              onRef(ref) {
                console.log("ref", ref);
              },
            });
          })
        )}
        {/* <div>{lc_store.crtValue}</div> */}
      </div>
    </div>
  );
});

let InnerRedisViewer = observer((props) => {
  let { connId } = props;
  let { dbIndex, PUtils, gref, active } = props;
  let { crtModel } = PUtils;
  let { eachConnStatusObj } = PUtils.crtModel;
  let key011 = connId + "-" + dbIndex;
  let crtConnAndCrtTabObj = eachConnStatusObj[key011];
  if (_.isEmpty(crtConnAndCrtTabObj)) {
    eachConnStatusObj[key011] = {};
    crtConnAndCrtTabObj = eachConnStatusObj[key011];
  }
  _.defaultsDeep(crtConnAndCrtTabObj, {
    keyword: "",
    selectKey: null,
  });
  window.tmp01_crtConnAndCrtTabObj = crtConnAndCrtTabObj;
  let lc_store = useLocalStore(() => {
    return {
      handling_redis_keyword_request: false,
      msg: t(`No Available Messages.`),
      allKeys: [],
      loading_redis_key: false,
    };
  });
  let fn_read_redis_keys = cutils.tryCatch(async (args = {}) => {
    _.defaultsDeep(args, {
      mute: false,
    });
    if (!args.mute) {
      lc_store.loading_redis_key = true;
    }
    try {
      let {
        data: { value },
      } = await PUtils.gref.optAPI(`read_redis_all_keys`, {
        ...fn_utils_for_SQL.get_common_args_for_API({
          PUtils,
          dbIndex,
          keyword: eachConnStatusObj[key011].keyword,
        }),
      });
      if (!cutils.sameArr(lc_store.allKeys, value)) {
        lc_store.allKeys = value;
      }
    } catch (e) {
      throw e;
    } finally {
      lc_store.loading_redis_key = false;
    }
  });
  let fn_refresh_all = cutils.tryCatch(async () => {
    cutils.alert_noT(t(`Refreshing`));
    await fn_read_redis_keys();
    cutils.alertOk_noT("Refreshed.");
  });
  let fn_reload_keys = cutils.tryCatch(async () => {
    await PUtils.gref.optAPI(`reload_redis_all_keys`, {
      ...fn_utils_for_SQL.get_common_args_for_API({
        PUtils,
        dbIndex,
        keyword: eachConnStatusObj[key011].keyword,
      }),
    });
  });
  let refreshAllWithMsg = async (args = {}) => {
    _.defaultsDeep(args, {
      skipRead: false,
    });
    PUtils.crtModel.titleMsg = t(`Initializing...`);
    if (args.skipRead !== true) {
      await fn_read_redis_keys();
    }
    PUtils.crtModel.titleMsg = t(`Loading Redis Keys List...`);
    await fn_reload_keys();
    PUtils.crtModel.titleMsg = t(
      `Loaded! CodeGen then starts reading its value.`
    );
    await fn_read_redis_keys({
      mute: true,
    });
    if (args.autoFirst) {
      crtConnAndCrtTabObj.selectKey = _.first(lc_store.allKeys);
    }
    PUtils.crtModel.titleMsg = null;
  };
  PUtils.useLoop(refreshAllWithMsg, -1);
  let fn_searchForKeywordInternally = async () => {
    lc_store.handling_redis_keyword_request = true;
    try {
      await refreshAllWithMsg({
        skipRead: true,
        autoFirst: true,
      });
      lc_store.handling_redis_keyword_request = false;
    } catch (e) {
      lc_store.handling_redis_keyword_request = false;
      throw e;
    }
  };
  return (
    <div className={myless["inner-redis-wrapper"]}>
      <div
        className={myless["inner-redis-viewer"] + ` needallborder `}
        style={{
          borderTop: "none",
        }}
      >
        {React.createElement(
          observer((props) => {
            return PUtils.jsx.leftRightSpliter({
              resizekey: "lr_redis_ROOT_EXTENSION_ADDONS_" + dbIndex,
              left: PUtils.jsx.panelWithTitle({
                title: t("Scanned Keys List") + `(${t(`Top {0}`, "500")})`,
                jsx: React.createElement(
                  observer((props) => {
                    let keywordNotEmpty = !cutils.cond_emptyStr(
                      crtConnAndCrtTabObj.keyword
                    );
                    if (!keywordNotEmpty) {
                      if (!lc_store.handling_redis_keyword_request) {
                        if (lc_store.loading_redis_key) {
                          return (
                            <p className="pt-10">{t(`Loading Data...`)}</p>
                          );
                        }
                        if (_.isEmpty(lc_store.allKeys)) {
                          return (
                            <p className="pt-10">
                              {t(`This database is empty.`)}
                            </p>
                          );
                        }
                      }
                    }

                    return (
                      <FormListWithSearchBar
                        loadingList={lc_store.handling_redis_keyword_request}
                        whenEmptyListJsx={
                          keywordNotEmpty
                            ? t(
                                `Cannot find related records, please try to adjust your keyword, such as {0}`,
                                "REF_*"
                              )
                            : t(`No available records`)
                        }
                        id={key011}
                        PUtils={PUtils}
                        selectKeyValue={crtConnAndCrtTabObj.selectKey}
                        onSelectKeyChange={(e) => {
                          crtConnAndCrtTabObj.selectKey = e;
                        }}
                        keywordValue={crtConnAndCrtTabObj.keyword}
                        onKeywordChange={(e) => {
                          crtConnAndCrtTabObj.keyword = e;
                          fn_searchForKeywordInternally(
                            crtConnAndCrtTabObj.keyword
                          );
                        }}
                        list={_.map(lc_store.allKeys, (x, d, n) => {
                          return {
                            content: x,
                            key: x,
                          };
                        })}
                        onSearchByKeyword={async () => {
                          //
                          fn_searchForKeywordInternally(
                            crtConnAndCrtTabObj.keyword
                          );
                        }}
                      />
                    );
                  })
                ),
              }),
              right: PUtils.jsx.panelWithTitle({
                title: cutils.cond_emptyStr(crtConnAndCrtTabObj.selectKey)
                  ? t(`Detail Viewer`)
                  : t("Detail for {0}", crtConnAndCrtTabObj.selectKey),
                jsx: (
                  <RedisRightDataPanel
                    onRemoveSelectKey={async () => {
                      crtConnAndCrtTabObj.selectKey = null;
                      refreshAllWithMsg();
                    }}
                    onRefreshMsg={() => {
                      refreshAllWithMsg();
                    }}
                    dbIndex={dbIndex}
                    PUtils={PUtils}
                    selectKey={crtConnAndCrtTabObj.selectKey}
                  />
                ),
              }),
              defaultLeftWidthValue: 290,
            });
          })
        )}
      </div>
      <div className={myless["msgbox"] + ` needallborder `}>
        <div className="sub-mr-5">
          {[
            {
              text: t(`Create Key`),
              intent: "primary",
              onClick: async () => {
                let title = `Update Redis Key Content`;
                let g_finalFormArr = [
                  {
                    label: t(`Key Name`),
                    f_desc: t(
                      `Creating or updating a value by identifying its key.`
                    ),
                    tabProps: {},
                    ph: `${t(
                      `Please place the key name here, it's a mandatory field.`
                    )}`,
                    tag: GFormInput,
                    prop: "dbKey",
                  },
                  {
                    label: t(`Key Value`),
                    f_desc: t(`This is the value definition.`),
                    ph: `${t(
                      `Please place the key value here, it's a mandatory field.`
                    )}`,
                    using_pure_obj: true,
                    tag: FormSyncEditor,
                    tagProps: {
                      wordWrap: "on",
                      title: `Definition`,
                      PUtils,
                      // notForceTextArea: true,
                      type: "textarea",
                    },
                    prop: "dbValue",
                  },
                ];
                // only using fields in pureObj for those that's pure purpose only
                let pureObj = {
                  dbValue: "",
                };
                class FormNewModel2 {
                  @observable model = {
                    dbKey: "",
                    dbValue: "",
                  };
                }
                let presetFormModel = new FormNewModel2();
                window.create_form_model_obj_tmp = {
                  presetFormModel,
                  pureObj,
                };
                cutils.alertFormPanel({
                  pureObj,
                  confirmText: "Create",
                  title: title,
                  finalFormArr: g_finalFormArr,
                  presetFormModel: presetFormModel.model,
                  PUtils,
                  onSave: cutils.tryCatch(async (obj) => {
                    let finalModel = _.merge(
                      {},
                      presetFormModel.model,
                      pureObj
                    );
                    // alert(JSON.stringify(finalModel));
                    if (cutils.cond_emptyStr(finalModel.dbKey)) {
                      throw new Error(t(`The Redis key cannot be empty`));
                    } else if (cutils.cond_emptyStr(finalModel.dbValue)) {
                      throw new Error(t(`The value cannot be empty`));
                    }
                    cutils.alertOk_noT(
                      t(`Updating it from your definition...`)
                    );
                    await PUtils.gref.optAPI(`update_that_key`, {
                      ...fn_utils_for_SQL.get_common_args_for_API({
                        PUtils,
                        dbIndex,
                        dbKey: finalModel.dbKey,
                        dbValue: finalModel.dbValue,
                      }),
                    });
                    // await fn_crtFnRefresh();
                    await refreshAllWithMsg();
                    cutils.alertOk_noT(t(`Updated`));
                  }),
                });
              },
            },
          ].map((x, d, n) => {
            return (
              <Button
                small={true}
                key={d}
                onClick={() => {
                  x.onClick();
                }}
                text={x.text}
              ></Button>
            );
          })}
        </div>
        <div>{lc_store.msg}</div>
      </div>
    </div>
  );
});

const Cpt_RedisViewer = observer((props) => {
  let { PUtils, connId } = props;
  let { eachConnStatusObj } = PUtils.crtModel;
  let crtConnStatusObj = eachConnStatusObj[connId];
  if (_.isEmpty(crtConnStatusObj)) {
    return <div>{t(`Removed.`)}</div>;
  }
  return (
    <div className={myless["cpt-redis-wrapper"]}>
      <Tabs
        style={{
          height: "100%",
          width: "100%",
        }}
        className="ext-full-tab ext-pad10-tab"
        selectedTabId={crtConnStatusObj.tabId}
        onChange={(e) => {
          crtConnStatusObj.tabId = e;
        }}
        vertical={true}
        large={false}
      >
        {fillIndex.map((eachFillIndex) => {
          let isActive =
            crtConnStatusObj.tabId + "" == eachFillIndex.value + "";
          return (
            <Tab
              key={eachFillIndex.value}
              id={eachFillIndex.value}
              title={eachFillIndex.label}
              panel={
                isActive ? (
                  <InnerRedisViewer
                    connId={connId}
                    active={isActive}
                    PUtils={PUtils}
                    dbIndex={eachFillIndex.value}
                  />
                ) : (
                  ""
                )
              }
            ></Tab>
          );
        })}
      </Tabs>
    </div>
  );
});

export default Cpt_RedisViewer;
