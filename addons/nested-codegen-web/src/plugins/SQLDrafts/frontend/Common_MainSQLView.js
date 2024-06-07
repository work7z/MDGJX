import FormNoDataVisualablePanel from "../../TranslateForJSON/frontend/cpt/FormNoDataVisualablePanel";
import SpinLoading from "../../TranslateForJSON/frontend/cpt/SpinLoading";
// import C_PlainVisualTable from "./kit/C_PlainVisualTable";
// import C_VisualControlDataTable from "./kit/C_VisualControlDataTable";
import DatabaseOverview from "./kit/DatabaseOverview";
import DBConstants from "./kit/DBConstants";
import RetrieveResultTablePanel from "./kit/RetrieveResultTablePanel";

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

const fn_utils_for_SQL = {
  get_common_args_for_API: ({ PUtils }) => {
    return {
      dbconfig: {
        ...PUtils.crtModel.dbconfig,
        jdbcRawConfig: PUtils.crtModel.jdbcRawConfig,
      },
    };
  },
  new_sql_editor: async ({ PUtils }) => {
    let {
      data: {
        value: { connId },
      },
    } = await PUtils.gref.optAPI(`open_connection`, {
      ...fn_utils_for_SQL.get_common_args_for_API({ PUtils }),
    });
    let num_val = PUtils.crtModel.increase_editor_num;
    PUtils.crtModel.allSQLEditors.push({
      connId: connId,
      numericIndex: num_val,
      resultData: [],
    });
    PUtils.crtModel.increase_editor_num++;
    PUtils.crtModel.activeSQLConnId = connId;
  },
};

let MainSQLView = observer((props) => {
  let { PUtils } = props;
  let { crtModel } = PUtils;

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
  let fn_get_crt_conn_info = async ({ PUtils }) => {
    if (!_.isNil(PUtils.crtModel.activeSQLConnId)) {
      let {
        data: { value },
      } = await PUtils.gref.optAPI(`get_tab_id_status`, {
        connId: PUtils.crtModel.activeSQLConnId,
      });
      value = value.result;
      if (!_.isEqual(PUtils.crtModel.crtConnectionStatus, value)) {
        _.merge(PUtils.crtModel.crtConnectionStatus, value);
      }
      if (
        !_.isEqual(
          value.retrieveDefinitions,
          PUtils.crtModel.retrieveDefinitions
        )
      ) {
        PUtils.crtModel.retrieveDefinitions = value.retrieveDefinitions;
      }
      // PUtils.crtModel.crtConnectionStatus.runningUserInstruction =
      //   !PUtils.crtModel.crtConnectionStatus.runningUserInstruction;
    }
  };
  let fn_refresh_conn_info = fn_get_crt_conn_info;
  let fn_esablish_connection = async () => {
    await PUtils.gref.optAPI(`connect_by_conn_id`, {
      ...fn_utils_for_SQL.get_common_args_for_API({ PUtils }),
      connId: PUtils.crtModel.activeSQLConnId,
    });
    await fn_get_crt_conn_info({ PUtils });
  };
  let fn_end_session = async ({ PUtils, connId }) => {
    await PUtils.gref.optAPI(`disconnect_by_conn_id`, {
      ...fn_utils_for_SQL.get_common_args_for_API({ PUtils }),
      connId: connId || PUtils.crtModel.activeSQLConnId,
    });
    await fn_get_crt_conn_info({ PUtils });
  };
  useEffect(() => {
    let updateEstablish = _.throttle((fn) => {
      fn();
    }, 5000);
    let a = PUtils.loop(async () => {
      await fn_get_crt_conn_info({ PUtils });
      if (gutils.dev()) {
        // if (crtConnectionStatus.closed) {
        //   updateEstablish(() => {
        //     fn_esablish_connection();
        //   });
        // }
      }
    }, 2000);
    return () => {
      a();
    };
  }, []);
  // useEffect(()=>{},[])
  useEffect(() => {
    let a_f = async () => {
      try {
        PUtils.crtModel.conn_status_loading = true;
        await fn_get_crt_conn_info({ PUtils });
        PUtils.crtModel.conn_status_loading = false;
      } catch (e) {
        PUtils.crtModel.conn_status_loading = false;
        throw e;
      }
    };
    let a = reaction(() => {
      return {
        id: PUtils.crtModel.activeSQLConnId,
      };
    }, a_f);
    a_f();
    return () => {
      a();
    };
  }, []);
  let fn_prepare_when_start_connection = async () => {
    if (PUtils.crtModel.crtConnectionStatus.closed) {
      await fn_esablish_connection();
    }
  };
  let fn_trigger_exec_now = async () => {
    await fn_prepare_when_start_connection();
    try {
      let selectionText = PUtils.editor.getSelectionText(
        crtModel.activeSQLConnId
      );
      selectionText = _.trim(selectionText);
      if (_.isEmpty(selectionText)) {
        gutils.alert({
          intent: "danger",
          message: t(
            `Please select target SQL text before triggering execution action.`
          ),
        });
        return;
      }
      crtModel.titleMsg = t(`Executing the execution operation...`);
      console.log("start executing", selectionText);
      await PUtils.gref.optAPI("async_post_a_execute_action", {
        connId: crtModel.activeSQLConnId,
        sqlStats: {
          SQL: selectionText,
          params: {},
        },
      });
      await fn_refresh_conn_info({ PUtils });
      crtModel.titleMsg = t(`Operation Completed.`);
      let retrieveId = _.get(
        PUtils.crtModel,
        "retrieveDefinitions[0].retrieveId"
      );
      if (!_.isEmpty(retrieveId)) {
        PUtils.crtModel.crtSQLResultId = retrieveId;
      }
    } catch (e) {
      console.log("err", e);
    }
    await gutils.sleep(1000);
    crtModel.titleMsg = null;
  };
  let fn_trigger_query_now = async () => {
    await fn_prepare_when_start_connection();
    try {
      let selectionText = PUtils.editor.getSelectionText(
        crtModel.activeSQLConnId
      );
      selectionText = _.trim(selectionText);
      if (_.isEmpty(selectionText)) {
        gutils.alert({
          intent: "danger",
          message: t(
            `Please select target SQL text before triggering query action.`
          ),
        });
        return;
      }
      crtModel.titleMsg = t(`Executing the query operation...`);
      console.log("start querying", selectionText);
      await PUtils.gref.optAPI("async_post_a_query_action", {
        connId: crtModel.activeSQLConnId,
        sqlStats: {
          SQL: selectionText,
          params: {},
        },
      });
      await fn_refresh_conn_info({ PUtils });
      crtModel.titleMsg = t(`Operation Completed.`);
      let retrieveId = _.get(
        PUtils.crtModel,
        "retrieveDefinitions[0].retrieveId"
      );
      if (!_.isEmpty(retrieveId)) {
        PUtils.crtModel.crtSQLResultId = retrieveId;
      }
    } catch (e) {
      console.log("err", e);
    }
    await gutils.sleep(1000);
    crtModel.titleMsg = null;
  };
  useEffect(() => {
    //
  }, []);
  const fn_remove_target_retrieve_result = async ({
    PUtils,
    connId,
    retrieveId,
  }) => {
    await PUtils.gref.optAPI(`destroy_retrieve_result_item`, {
      connId,
      retrieveId,
    });
    await fn_refresh_conn_info();
  };
  return PUtils.jsx.createPanelWithBtnControls({
    helpBtnProps: {
      minimal: true,
      outlined: true,
    },
    controls: () => [
      {
        text: PUtils.crtModel.created
          ? t(`Modify SQL Config`)
          : t(`Create SQL Config`),
        intent: "none",
        minimal: true,
        outlined: true,
        icon: "build",
        loading_id: "encode_sql_drafts__token_btn",
        onClick: async () => {
          PUtils.crtModel.tmp_dbconfig = _.cloneDeep(PUtils.crtModel.dbconfig);
          PUtils.crtModel.tmpJdbcRawConfig = PUtils.crtModel.jdbcRawConfig;
          PUtils.crtModel.view_type = PUtils.crtModel.created
            ? "modify"
            : "add";
        },
      },
      {
        text: t(`New SQL Script`),
        minimal: true,
        outlined: true,
        icon: "add-to-artifact",
        intent: "none",
        loading_id: "encode_sql_drafts__new_SQL_editor",
        onClick: async () => {
          // await gutils.sleep(3000);
          // gutils.alertOk(`Refreshed.`);
          crtModel.titleMsg = t(
            `CodeGen is creating a New SQL Script and testing the quality of its connection, please wait a moment.`
          );

          await fn_utils_for_SQL.new_sql_editor({ PUtils });

          crtModel.titleMsg = t(`Created.`);
          await gutils.sleep(1000);
          crtModel.titleMsg = null;
        },
      },
    ],
    rightControls: () => [
      // _.isEmpty(PUtils.crtModel.allSQLEditors)
      //   ? []
      //   :
      ...(PUtils.crtModel.crtConnectionStatus.closed == true
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
                console.log("p", PUtils);
                await fn_esablish_connection({ PUtils });
              },
            },
          ]
        : [
            PUtils.crtModel.crtConnectionStatus.runningUserInstruction
              ? {
                  text: t(`Cancel`),
                  intent: "danger",
                  minimal: true,
                  loading_id: "cancel_now",
                  outlined: true,
                  // icon: "search",
                  onClick: async () => {
                    await PUtils.gref.optAPI(`cancel_statement`, {
                      connId: PUtils.crtModel.activeSQLConnId,
                    });
                  },
                }
              : null,
            {
              text: t(`Query`),
              intent: "primary",
              loading:
                PUtils.crtModel.crtConnectionStatus.runningUserInstruction ||
                crtModel.conn_status_loading,
              minimal: true,
              loading_id: "query_now",
              outlined: true,
              icon: "search",
              onClick: async () => {
                console.log("start querying");
                fn_trigger_query_now();
              },
            },
            {
              text: t(`Execute`),
              intent: "primary",
              loading:
                PUtils.crtModel.crtConnectionStatus.runningUserInstruction ||
                crtModel.conn_status_loading,
              // loading: crtConnectionStatus.loading,
              minimal: true,
              outlined: true,
              loading_id: "executing",
              icon: "key-enter",
              onClick: async () => {
                fn_trigger_exec_now();
              },
            },
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
        return (
          <div className="w100 h100">
            {crtModel.needNewEdit || _.isEmpty(PUtils.crtModel.allSQLEditors)
              ? React.createElement(
                  observer((props) => (
                    <FormNoDataVisualablePanel
                      title={t(`No SQL Editors`)}
                      desc={t(`Please create a SQL editor to begin.`)}
                    />
                  ))
                )
              : PUtils.jsx.topBtmSpliter({
                  border: true,
                  percent: 0.46,
                  top: React.createElement(
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
                                _.findIndex(arr, (xx) => xx.id == x.connId) !=
                                -1
                              );
                            }
                          );
                        },
                        onRemove: async (info) => {
                          console.log("info", info);
                          await fn_end_session({ PUtils, connId: info.key });
                        },
                        list: _.map(
                          PUtils.crtModel.allSQLEditors,
                          (x, d, n) => {
                            return {
                              closable: true,
                              // key: title_val,
                              // id: "" + x.numericIndex,
                              id: x.connId,
                              label: t(`Scripts-{0}`, x.numericIndex),
                              mode_jsx_func: true,
                              jsx: observer((props) => {
                                let title_val = t(`SQL Script Editor`);

                                return PUtils.jsx.createGEditor({
                                  title: title_val,
                                  fontSize: 13,
                                  wordWrap: "on",
                                  key: x.connId,
                                  language: "mysql",
                                  initContent: ``,
                                  onRef({ editor, monaco }) {
                                    editor.addAction({
                                      id: "my-unique-id-" + x.connId,
                                      label: t(`Query Selected SQL`),
                                      keybindings: [
                                        monaco.KeyMod.CtrlCmd |
                                          monaco.KeyCode.Enter,
                                      ],
                                      precondition: null,
                                      keybindingContext: null,
                                      contextMenuGroupId: "navigation",
                                      contextMenuOrder: 1.5,
                                      run: function (ed) {
                                        fn_trigger_query_now();
                                      },
                                    });
                                    editor.addAction({
                                      id: "my-unique-id-exec-" + x.connId,
                                      label: t(`Execute Selected SQL`),
                                      keybindings: [
                                        monaco.KeyMod.CtrlCmd |
                                          monaco.KeyCode.Backslash,
                                      ],
                                      precondition: null,
                                      keybindingContext: null,
                                      contextMenuGroupId: "navigation",
                                      contextMenuOrder: 1.5,
                                      run: function (ed) {
                                        fn_trigger_exec_now();
                                      },
                                    });
                                  },
                                });
                              }),
                            };
                          }
                        ),
                      });
                    })
                  ),
                  btm: React.createElement(
                    // inject(() => {
                    //   return {
                    //   };
                    // })
                    observer((_props) => {
                      let props = {
                        conn_status_loading:
                          PUtils.crtModel.conn_status_loading,
                        // activeSQLConnId: PUtils.crtModel.activeSQLConnId,
                        // retrieveDefinitions:
                        //   PUtils.crtModel.retrieveDefinitions,
                      };
                      window.ok_now = props;
                      return (
                        <SpinLoading
                          loading={PUtils.crtModel.conn_status_loading}
                        >
                          {PUtils.crtModel.crtConnectionStatus.closed ? (
                            <FormNoDataVisualablePanel
                              title={t(`No Available Connection`)}
                              desc={t(
                                `Please establish a connection before using it`
                              )}
                            />
                          ) : (
                            PUtils.jsx.tabWithDefinition({
                              key: "crtSQLResultId",
                              using_model_type: true,
                              onList: (arr) => {},
                              onRemove: async (info) => {
                                // console.log("info", info);
                                // await fn_end_session({ PUtils, connId: info.key });
                                PUtils.crtModel.titleMsg = t(
                                  `Closing the result set panel...`
                                );
                                await fn_remove_target_retrieve_result({
                                  PUtils,
                                  connId: PUtils.crtModel.activeSQLConnId,
                                  retrieveId: info.key,
                                });
                                await fn_refresh_conn_info({ PUtils });
                                PUtils.crtModel.titleMsg = t(`Closed`);
                                await gutils.sleep(1000);
                                PUtils.crtModel.titleMsg = null;
                              },
                              list: [
                                {
                                  label: t(`Overview`),
                                  jsx: observer((_props) => {
                                    return (
                                      <DatabaseOverview
                                        key={
                                          PUtils.crtModel.crtConnectionStatus
                                            .closed + ""
                                        }
                                        PUtils={PUtils}
                                        connId={PUtils.crtModel.activeSQLConnId}
                                      />
                                    );
                                  }),
                                },
                                ...(
                                  PUtils.crtModel.retrieveDefinitions || []
                                ).map((x, d, n) => {
                                  return {
                                    label: t(`Result-{0}`, `${d + 1}`),
                                    closable: true,
                                    id: x.retrieveId,
                                    jsx: observer((_props) => {
                                      console.log("items", x);
                                      return (
                                        <RetrieveResultTablePanel
                                          PUtils={PUtils}
                                          obj={x}
                                        />
                                      );
                                    }),
                                  };
                                }),
                              ].map((x) => {
                                x.mode_jsx_func = true;
                                return x;
                              }),
                            })
                          )}
                        </SpinLoading>
                      );
                    })
                  ),
                })}
          </div>
        );
      })
    ),
  });
});

export default MainSQLView;

// _.get(
//   PUtils.crtModel,
//   "crtConnectionStatus.createHourTimeStr"
// ) == "N/A"
//   ? t(`SQL Script Editor`)
//   : t(
//       `Connected at {0}`,
//       _.get(
//         PUtils.crtModel,
//         "crtConnectionStatus.createHourTimeStr"
//       )
//     );

// {
//   text: t(`SQL History`),
//   minimal: true,
//   outlined: true,
//   icon: "history",
//   intent: "none",
//   loading_id: "encode_sql_drafts__token_btn",
//   onClick: async () => {
//     PUtils.crtModel.view_type = "history";
//     // await gutils.sleep(3000);
//     // gutils.alertOk(`Refreshed.`);
//   },
// },
