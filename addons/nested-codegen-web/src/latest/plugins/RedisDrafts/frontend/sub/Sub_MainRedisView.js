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
import PreRequisiteJson from "../../pre-requisite.json";
import FormEasyTable from "../../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../../TranslateForJSON/frontend/pages/otherPages";
import FormLabelTextInput from "../../../TranslateForJSON/frontend/cpt/FormLabelTextInput";
import GFormInput2 from "../../../SQLDrafts/frontend/Kit_GFormInput2";
const GFormInput = GFormInput2;
import SpinLoading from "../../../TranslateForJSON/frontend/cpt/SpinLoading";
import FormNoDataVisualablePanel from "../../../TranslateForJSON/frontend/cpt/FormNoDataVisualablePanel";
import Cpt_RedisViewer from "../cpt/Cpt_RedisViewer";
import fn_defaultEachConnState from "../fn/fn_defaultEachConnState";
import cutils from "../../../TranslateForJSON/frontend/kit/common_utils";

const fn_utils_for_SQL = {
  get_common_args_for_API: (allValue) => {
    let { dbValue, PUtils, dbIndex, dbKey, keyword } = allValue;
    return {
      dbconfig: {
        ...PUtils.crtModel.dbconfig,
        dbValue,
        dbIndex,
        keyword,
        dbKey,
      },
    };
  },
  new_sql_editor: async ({ PUtils }) => {
    await PUtils.gref.optAPI(`create_connection`, {
      ...fn_utils_for_SQL.get_common_args_for_API({ PUtils }),
    });
    let connId = gutils.uuid();
    let num_val = PUtils.crtModel.increase_editor_num;
    PUtils.crtModel.eachConnStatusObj[connId] = fn_defaultEachConnState();
    PUtils.crtModel.allSQLEditors.push({
      connId: connId,
      numericIndex: num_val,
      resultData: [],
    });
    PUtils.crtModel.increase_editor_num++;
    PUtils.crtModel.activeSQLConnId = connId;
  },
};
export { fn_utils_for_SQL };
const Sub_MainRedisView = observer((props) => {
  let { PUtils } = props;
  let { crtModel } = PUtils;
  const [viewKey, onViewKey] = useState(_.uniqueId("ok"));
  let fn_esablish_connection = cutils.tryCatch(async () => {
    await PUtils.gref.optAPI(`create_connection`, {
      ...fn_utils_for_SQL.get_common_args_for_API({ PUtils }),
    });
  });
  let fn_end_session = cutils.tryCatch(async () => {
    await PUtils.gref.optAPI(`close_connection`, {
      ...fn_utils_for_SQL.get_common_args_for_API({ PUtils }),
    });
  });
  let fn_get_crt_conn_info = cutils.tryCatch(async () => {
    let {
      data: { value },
    } = await PUtils.gref.optAPI(`get_crt_conn_info`, {
      ...fn_utils_for_SQL.get_common_args_for_API({ PUtils }),
    });
    value = value;
    if (!_.isEqual(PUtils.crtModel.crtConnectionStatus, value)) {
      _.merge(PUtils.crtModel.crtConnectionStatus, value);
    }
  });
  let fn_refresh_conn_info = cutils.tryCatch(async () => {
    onViewKey(_.uniqueId("ok"));
    await fn_get_crt_conn_info();
  });
  useEffect(() => {
    if (crtModel.created && crtModel.needNewEdit) {
      crtModel.needNewEdit = false;
      if (_.isEmpty(PUtils.crtModel.allSQLEditors)) {
        gutils.defer(async () => {
          let ctn = await fn_utils_for_SQL.new_sql_editor({
            PUtils,
          });
          window.ctn100 = ctn;
        }, 0);
      }
    }
  }, []);
  // useEffect(()=>{},)
  PUtils.useLoop(async () => {
    await fn_get_crt_conn_info();
  }, 3000);
  let isThatClosed = PUtils.crtModel.crtConnectionStatus.closed == true;
  return PUtils.jsx.createPanelWithBtnControls({
    helpBtnProps: {
      minimal: true,
      outlined: true,
    },
    controls: () => [
      {
        text: t(`New Viewer`),
        minimal: true,
        outlined: true,
        icon: "add-to-artifact",
        intent: "primary",
        loading_id: "encode_redis_drafts__new_SQL_editor",
        onClick: async () => {
          crtModel.titleMsg = t(
            `CodeGen is creating a New Redis Script and testing the quality of its connection, please wait a moment.`
          );

          await fn_utils_for_SQL.new_sql_editor({ PUtils });

          crtModel.titleMsg = t(`Created.`);
          await gutils.sleep(1000);
          crtModel.titleMsg = null;
        },
      },
      {
        text: PUtils.crtModel.created
          ? t(`Modify Config`)
          : t(`Create Redis Config`),
        intent: "none",
        minimal: true,
        outlined: true,
        icon: "cog",
        loading_id: "encode_redis_drafts__token_btn",
        onClick: async () => {
          PUtils.crtModel.tmp_dbconfig = _.cloneDeep(PUtils.crtModel.dbconfig);
          PUtils.crtModel.tmpJdbcRawConfig = PUtils.crtModel.jdbcRawConfig;
          PUtils.crtModel.view_type = PUtils.crtModel.created
            ? "modify"
            : "add";
        },
      },
    ],
    rightControls: () => [
      {
        text: t(`Refresh`),
        intent: "none",
        loading: crtModel.conn_status_loading,
        minimal: true,
        loading_id: "refresh_conn",
        outlined: true,
        icon: "refresh",
        onClick: async () => {
          cutils.alertOk_noT(t(`Refreshed.`));
          await fn_refresh_conn_info({ PUtils });
        },
      },
      ...(isThatClosed
        ? [
            {
              text: t(`Establish Connection`),
              intent: "success",
              loading: crtModel.conn_status_loading,
              minimal: true,
              loading_id: "establish_conn",
              outlined: true,
              icon: "data-connection",
              onClick: async () => {
                await fn_esablish_connection({ PUtils });
                await fn_refresh_conn_info({ PUtils });
              },
            },
          ]
        : [
            {
              text: t(`End Session`),
              intent: "none",
              // loading: crtConnectionStatus.loading,
              loading: crtModel.conn_status_loading,
              minimal: true,
              outlined: true,
              loading_id: "end_session",
              icon: "offline",
              onClick: async () => {
                await fn_end_session({ PUtils });
                await fn_get_crt_conn_info({ PUtils });
              },
            },
          ].filter((x) => !_.isNil(x))),
    ],
    body: React.createElement(
      observer((props) => {
        if (isThatClosed) {
          return (
            <div key={viewKey} className="w100 h100">
              <FormNoDataVisualablePanel
                title={t(`Not yet connected to the database`)}
                desc={t(`Please establish the connection firstly.`)}
              ></FormNoDataVisualablePanel>
            </div>
          );
        }
        return (
          <div key={viewKey} className="w100 h100">
            {crtModel.needNewEdit || _.isEmpty(PUtils.crtModel.allSQLEditors)
              ? React.createElement(
                  observer((props) => (
                    <FormNoDataVisualablePanel
                      title={t(`Ready to Go`)}
                      desc={t(
                        `Please create a script by clicking the button to begin.`
                      )}
                    />
                  ))
                )
              : React.createElement(
                  observer((props) => {
                    return PUtils.jsx.tabWithDefinition({
                      key: "activeSQLConnId",
                      noOptBtn: false,
                      closable: true,
                      using_model_type: true,
                      onList: (arr) => {
                        PUtils.crtModel.allSQLEditors = _.filter(
                          PUtils.crtModel.allSQLEditors,
                          (x, d, n) => {
                            return (
                              _.findIndex(arr, (xx) => xx.id == x.connId) != -1
                            );
                          }
                        );
                      },
                      onRemove: async (info) => {
                        console.log("info", info);
                        delete PUtils.crtModel.eachConnStatusObj[info.key];
                      },
                      list: _.map(PUtils.crtModel.allSQLEditors, (x, d, n) => {
                        return {
                          closable: true,
                          // key: title_val,
                          // id: "" + x.numericIndex,
                          id: x.connId,
                          label: t(`Viewer-{0}`, x.numericIndex),
                          mode_jsx_func: true,
                          jsx: observer((props) => {
                            return (
                              <Cpt_RedisViewer
                                PUtils={PUtils}
                                connId={x.connId}
                              />
                            );
                          }),
                        };
                      }),
                    });
                  })
                )}
          </div>
        );
      })
    ),
  });
});

export default Sub_MainRedisView;
