import fn_SQLFromDefinition from "./Common_Data_SQLFormDefinition";
import Kit_clickToInput from "./Kit_clickToInput";
import Kit_InstallableInput from "./Kit_InstallableInput";
import GFormInput2 from "./Kit_GFormInput2";
const GFormInput = GFormInput2;
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
  GFormSwitch,
  MobxReactLite,
  ProgressBar,
  GSyncSelectWithFilter,
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

let ModifyConfigView = observer((props) => {
  let { PUtils } = props;
  let { crtModel } = PUtils;
  let list_config_displayMode = [
    {
      label: t(`Visual Mode`),
      value: "visual",
      desc_label: t(`Configuring your config by vivid form controls`),
    },
    {
      label: t(`Manual Mode`),
      value: "manual",
      desc_label: t(`Customizing your config by high-flexible properties set.`),
    },
  ];
  let lc_store = useLocalStore(() => {
    return {
      all_database_types: [],
      loading_for_types: false,
      // sql forms
      crt_sql_form_2rd_controls: () => [],
      crt_sql_form_1st_level: [],
      all_connection_type_arr: [],
    };
  });
  // SQL View

  let { tmp_dbconfig } = crtModel;
  let crt_tmp_dbconfig = tmp_dbconfig;

  window.lc_store_obj = {
    lc_store,
    tmp_dbconfig: tmp_dbconfig,
  };
  window.lc_store = lc_store;
  window.tmp_dbconfig = tmp_dbconfig;
  console.log("SQL_4 Rendering", _.size(lc_store.crt_sql_form_2rd_controls));

  let fn_update_connection_form = () => {
    let SQLFromDefinition = fn_SQLFromDefinition(crt_tmp_dbconfig);

    let all_connection_type_arr = [
      ...(SQLFromDefinition.ext[tmp_dbconfig.dbType] || []),
      ...(SQLFromDefinition.common || []),
    ];

    lc_store.crt_sql_form_1st_level =
      _.find(all_connection_type_arr, (x, d, n) => {
        return x.id == tmp_dbconfig.connectionType;
      }) || {};
    console.log(`SQL_3`, lc_store.crt_sql_form_1st_level);

    if (
      !_.isNil(SQLFromDefinition) &&
      !_.isNil(tmp_dbconfig.dbType) &&
      !_.isNil(tmp_dbconfig.connectionType)
    ) {
      lc_store.crt_sql_form_2rd_controls = _.get(
        lc_store.crt_sql_form_1st_level,
        "forms",
        () => []
      );
    }
  };

  let fn_update_crt_sql_item = () => {
    let SQLFromDefinition = fn_SQLFromDefinition(crt_tmp_dbconfig);
    window.SQLFromDefinition = SQLFromDefinition;
    console.log(`SQL_1`, SQLFromDefinition);

    let all_connection_type_arr = [
      ...(SQLFromDefinition.ext[tmp_dbconfig.dbType] || []),
      ...(SQLFromDefinition.common || []),
    ];
    console.log(`SQL_2`, all_connection_type_arr);
    lc_store.all_connection_type_arr =
      _.map(all_connection_type_arr, (x, d, n) => {
        return {
          label: x.label,
          value: x.id,
        };
      }) || [];

    if (
      _.findIndex(
        all_connection_type_arr,
        (x) => x.id == tmp_dbconfig.connectionType
      ) == -1
    ) {
      tmp_dbconfig.connectionType = _.get(all_connection_type_arr, "0.id");
    }

    fn_update_connection_form();
  };

  let crtDriverInfo = _.chain(lc_store.all_database_types)
    .filter((x) => x.pkgName == tmp_dbconfig.dbType)
    .first()
    .value();
  let fn_update_related_drivers = () => {
    console.log("changing dbtype", tmp_dbconfig.dbType);
    let i_crtDriverInfo = _.chain(lc_store.all_database_types)
      .filter((x) => x.pkgName == tmp_dbconfig.dbType)
      .first()
      .value();
    crtDriverInfo = i_crtDriverInfo;
    window.i_crtDriverInfo = i_crtDriverInfo;
    let prefix_value = "CODE_USER: ";
    let val_100 = _.get(i_crtDriverInfo, "driverClazzName");
    let val_200 = _.get(i_crtDriverInfo, "driverFilePath");
    if (
      !_.isEmpty(val_100) &&
      !(tmp_dbconfig.driverClazzName || "").startsWith(prefix_value)
    ) {
      tmp_dbconfig.driverClazzName = val_100;
    }
    // if (
    //   !_.isEmpty(val_200) &&
    //   !(tmp_dbconfig.driverFilePath || "").startsWith(prefix_value)
    // ) {
    tmp_dbconfig.driverFilePath = val_200;
    // }

    fn_update_crt_sql_item();
  };
  let fn_update_dbtypelist = async () => {
    lc_store.loading_for_types = true;
    let mm_res = await PUtils.gref.optAPI(`get_all_database_type`);
    let {
      data: { value },
    } = mm_res;
    console.log("all_database_types", mm_res);
    lc_store.all_database_types = value;
    lc_store.loading_for_types = false;
    fn_update_related_drivers();
    return false;
  };
  useEffect(() => {
    let aaa = gutils.run_async_loop(fn_update_dbtypelist, 10000);
    let a = reaction(
      () => {
        return {
          ...tmp_dbconfig,
        };
      },
      () => {
        PUtils.commonSave();
      }
    );
    let b = reaction(
      () => {
        return {
          dbType: tmp_dbconfig.dbType,
        };
      },
      () => {
        fn_update_related_drivers();
      }
    );
    let c = reaction(
      () => {
        return {
          connectionType: tmp_dbconfig.connectionType,
        };
      },
      () => {
        fn_update_connection_form();
      }
    );
    return () => {
      aaa();
      a();
      b();
      c();
    };
  }, []);

  let bodyCtn = PUtils.jsx.leftRightSpliter({
    n_style: {
      overflowX: "hidden",
    },
    resizekey: "sql_drafts__lr",
    left: PUtils.jsx.panelWithTitle({
      title:
        "SQL Config - " +
        _.chain(list_config_displayMode)
          .filter((x) => x.value == tmp_dbconfig.displayMode)
          .first()
          .get("label")
          .value(),
      n_style: {
        borderTop: "none",
        overflowX: "hidden",
      },
      jsx: PUtils.jsx.topBtmSpliter({
        border: true,
        percent: 0.45,
        top: (
          <div style={{ overflowX: "hidden", padding: "12px 12px" }}>
            <FormGroup
              label={t(`Database Type`)}
              helperText={
                _.isEmpty(tmp_dbconfig.dbType) || lc_store.loading_for_types
                  ? t(
                      `Please specify a database type for this connection at first.`
                    )
                  : t(
                      `Welcome to use {1} database! Let's get started with these simple configs as below.`,
                      _.get(crtDriverInfo, "officialWebsite"),
                      _.get(crtDriverInfo, "label")
                    )
              }
            >
              <GSyncSelectWithFilter
                loading={lc_store.loading_for_types}
                small={true}
                obj={PUtils.crtModel.tmp_dbconfig || {}}
                list={_.map(lc_store.all_database_types, (x, d, n) => {
                  return {
                    label: x.label,
                    value: x.pkgName,
                    obj: x,
                  };
                })}
                index={"dbType"}
                whenChg={(x) => {
                  // model.config_page_manpage_select_id = x;
                }}
              />
            </FormGroup>
            {tmp_dbconfig.displayMode == "visual" ? (
              <FormGroup
                label={t(`Connection Type`) + ``}
                helperText={t(
                  `In general, the user can choose another authentication type as long as the database supported multiple connection types.`
                )}
              >
                <GSyncSelectWithFilter
                  loading={lc_store.loading_for_types}
                  small={true}
                  obj={PUtils.crtModel.tmp_dbconfig || {}}
                  list={lc_store.all_connection_type_arr}
                  index={"connectionType"}
                  whenChg={(x) => {
                    // model.config_page_manpage_select_id = x;
                  }}
                />
              </FormGroup>
            ) : (
              ""
            )}
            <FormGroup
              label={t(`JDBC Driver File`)}
              helperText={t(
                `Please specify the path of JDBC driver file, if you want CodeGen to install it automatically, please click the install button above.`
              )}
            >
              <Kit_InstallableInput
                gref={PUtils.gref}
                obj={tmp_dbconfig}
                loading={lc_store.loading_for_types}
                index={`driverFilePath`}
                placeholder={t(
                  // `The filepath of driver file, please specify an absolute file path.`
                  `JDBC Driver hasn't been installed yet so far, please install driver file at first.`
                )}
                fn_confirm={async () => {
                  gutils.alert(
                    t(
                      `Installing driver files, it might be taken several minutes, please be patient, thanks for your understanding.`
                    )
                  );
                  await PUtils.gref.optAPI(`install_driver_by_name`, {
                    crtDriverInfo: crtDriverInfo,
                    dbType: tmp_dbconfig.dbType,
                  });
                  await fn_update_dbtypelist();
                  gutils.alertOk(t(`Installed`));
                }}
                fn_upload={() => {
                  gutils.selectFile(async function (val) {
                    console.log("value", val);
                    await PUtils.gref.optAPI(`save_driver_by_name`, {
                      filePath: val,
                      dbType: tmp_dbconfig.dbType,
                    });
                    await fn_update_dbtypelist();
                  });
                }}
                crtDriverInfo={crtDriverInfo}
                install_text={t(`Install`)}
              />
            </FormGroup>
            <FormGroup
              label={t(`JDBC Driver Name`)}
              helperText={t(
                `By Default, CodeGen will assign its value according to the database type. If you would like to adjust its value, you can edit it directly.`
              )}
            >
              <Kit_clickToInput
                obj={tmp_dbconfig}
                index={`driverClazzName`}
                placeholder={t(
                  `If everything work fine, it's unnecessary to modify its value.`
                )}
              />
            </FormGroup>
          </div>
        ),
        btm: React.createElement(
          observer((props) =>
            PUtils.jsx.tabWithDefinition({
              key: "modify_config_value_m1",
              default_select_tab: "config",
              list: [
                {
                  id: "config",
                  label: t(`Basic Config`),
                  mode_jsx_func: true,
                  jsx:
                    tmp_dbconfig.displayMode == "visual"
                      ? observer((props) => {
                          return React.createElement(
                            observer(
                              PUtils.fn.fn_form_jsx_by_config(
                                lc_store.crt_sql_form_2rd_controls || []
                              )
                            )
                          );
                        })
                      : observer(() => {
                          return PUtils.jsx.createGEditor({
                            title: t(`JDBC Configuration(Properties Type)`),
                            fontSize: 11,
                            wordWrap: "off",
                            key: "tmpJdbcRawConfig",
                            language: "properties",
                          });
                        }),
                },
                {
                  id: "connection",
                  label: t(`Connection Config`),
                  mode_jsx_func: true,
                  jsx: observer(
                    PUtils.fn.fn_form_jsx_by_config(() => [
                      {
                        label: t(`Test Query SQL`),
                        helperText: t(
                          `If this field value is empty, then CodeGen will use default test query SQL while connecting to the database.`
                        ),
                        tag: GFormInput,
                        tagProps: {
                          small: true,
                          placeholder: `e.g. SELECT 1`,
                          onChange(x) {
                            tmp_dbconfig.customTestQuerySQL = x;
                          },
                          value: tmp_dbconfig.customTestQuerySQL,
                        },
                      },
                      {
                        label: t(`Timeout for Testing Connection`),
                        helperText: t(
                          `During testing connection, if the database is still unable to be connected when the time limit is exceeded, CodeGen will destroy this connection. The time unit is milliseconds, 0 means CodeGen will never interrupt its process though it's timeout already.`
                        ),
                        tag: GFormInput,
                        tagProps: {
                          type: "number",
                          small: true,
                          placeholder: t(`i.e. Connection Timeout Value`),
                          onChange(x) {
                            tmp_dbconfig.connectTimeout = x;
                          },
                          value: tmp_dbconfig.connectTimeout,
                        },
                      },
                      {
                        label: t(`Timeout for Query Operation`),
                        helperText: t(
                          `By Default, CodeGen will keep waiting for the query action response unless the user interrupts the process, or the user had defined the timeout value and it's exceeded. The time unit is mileseconds, and 0 means it will never timeout.`
                        ),
                        tag: GFormInput,
                        tagProps: {
                          small: true,
                          type: "number",
                          placeholder: t(`i.e. 30000`),
                          onChange(x) {
                            tmp_dbconfig.queryTimeout = x;
                          },
                          value: tmp_dbconfig.queryTimeout,
                        },
                      },
                      {
                        label: t(`Timeout for Execute Operation`),
                        helperText: t(
                          `By Default, CodeGen will keep waiting for the execute action response unless the user interrupts the process, or the user had defined the timeout value and it's exceeded. The time unit is mileseconds, and 0 means it will never timeout.`
                        ),
                        tag: GFormInput,
                        tagProps: {
                          small: true,
                          type: "number",
                          placeholder: t(`i.e. 30000`),
                          onChange(x) {
                            tmp_dbconfig.executeTimeout = x;
                          },
                          value: tmp_dbconfig.executeTimeout,
                        },
                      },
                    ])
                  ),
                },
              ],
            })
          )
        ),
      }),
    }),
    right: PUtils.jsx.panelWithTitle({
      title: "FAQ for SQL Config",
      n_style: {
        borderTop: "none",
      },
      jsx: (
        <div style={{ padding: "12px" }}>
          {[
            {
              title: t(
                `May I experience this function without creating a real database configuration?`
              ),
              ctn: t(
                `Certainly. If you have no available database can be used or just want to have a try for this function, you can click the button above whose name is "{0}", accordingly CodeGen will initialize a H2 example database for you to test. No worries, it will not be harmful though you delete any databases or tables in that example databases.`,
                t(`Using Example Database`)
              ),
            },
            {
              title: t(
                `Why CodeGen need a driver file to establish the connection?`
              ),
              ctn: t(
                `You probably already know that CodeGen is based on the JVM platform, which means a particular driver jar file is needed to be used as connecting to the target database. No worries, if you don't know how to download the driver jar file, just click the download button and sign the related agreement, CodeGen will get everything done perfectly.`
              ),
            },
            {
              title: t(`What's the meaning of manual mode?`),
              ctn: t(
                `Though we had tried our best to provide plentiful form controls to support your needs of Database Config, the visual mode still cannot provide more flexible and deeper needs if you have a further configuration such as a parameter over the JDBC link. Thus, we provide manual mode and our users can edit JDBC connect configuration directly to achieve what they need and what the role will be, and that’s the reason why we provide manual mode.`
              ),
            },
          ].map((x, d, n) => {
            return (
              <div key={x.title}>
                <h4>{x.title}</h4>
                <p className="bp3-text-small bp3-text-muted">{x.ctn}</p>
              </div>
            );
          })}
        </div>
      ),
    }),
    // percent: 0.7,
    percentRightWidth: 320,
  });
  let fn_test_conn = async () => {
    gutils.alert(`CodeGen is testing the connection, moments please.`);
    try {
      await PUtils.gref.optAPI(`test_connection`, {
        dbconfig: {
          ...tmp_dbconfig,
          jdbcRawConfig: PUtils.crtModel.tmpJdbcRawConfig,
        },
      });
      gutils.alertOk(`Connected to the database successfully.`);
    } catch (e) {
      gutils.alert({
        intent: "danger",
        message: gutils.getErrMsg(e),
      });
      throw e;
    }
  };
  return PUtils.jsx.createPanelWithBtnControls({
    helpBtnProps: {
      minimal: true,
      outlined: true,
    },
    controls: [
      PUtils.crtModel.created
        ? {
            text: t(`Cancel`),
            intent: "none",
            minimal: true,
            outlined: true,
            loading_id: "encode_sql_drafts__cancel",
            onClick: async () => {
              //
              PUtils.crtModel.view_type = "main";
            },
          }
        : null,
      {
        text: t(`${!PUtils.crtModel.created ? `Create` : `Save`} Config`),
        minimal: true,
        outlined: true,
        intent: PUtils.crtModel.created ? "success" : "primary",
        loading_id: "encode_sql_drafts__token_btn_save",
        onClick: async () => {
          await fn_test_conn();
          await PUtils.gref.optAPI(
            !PUtils.crtModel.created ? `create_dbconfig` : `save_dbconfig`,
            {
              ...tmp_dbconfig,
            }
          );
          PUtils.crtModel.dbconfig = _.cloneDeep(PUtils.crtModel.tmp_dbconfig);
          PUtils.crtModel.jdbcRawConfig = PUtils.crtModel.tmpJdbcRawConfig;
          gutils.alertOk(
            t(
              PUtils.crtModel.created
                ? `Modified the config successfully! Please disconnect the connection if had connected so as to apply these changes.`
                : `Created the config successfully. If you would like to connect to the database right now, please find and click the corresponding button to establish connection.`
            )
          );
          PUtils.crtModel.created = true;
          PUtils.crtModel.view_type = "main";
        },
      },
      {
        jsx: React.createElement(
          observer((props) => {
            return (
              <GSyncSelectWithFilter
                small={true}
                obj={PUtils.crtModel.tmp_dbconfig}
                list={list_config_displayMode}
                index={"displayMode"}
                whenChg={(x) => {}}
              />
            );
          })
        ),
      },
    ].filter((x) => !_.isNil(x)),
    rightControls: [
      PUtils.crtModel.view_type == "add"
        ? {
            text: t(`Using Example Database`),
            intent: "none",
            minimal: true,
            outlined: true,
            icon: "database",
            onClick: async () => {
              let {
                data: { path },
              } = await PUtils.gref.optAPI(`new_example_database`);
              tmp_dbconfig.customJDBCUrl = `jdbc:h2:${path}`;
              tmp_dbconfig.username = `root`;
              tmp_dbconfig.password = `test123456`;
              tmp_dbconfig.displayMode = "visual";
              tmp_dbconfig.dbType = "h2";
              tmp_dbconfig.connectionType = "custom";
              gutils.alertOk(`Created a testing database.`);
            },
          }
        : null,
      {
        text: t(`Test Connection`),
        intent: "none",
        minimal: true,
        outlined: true,
        icon: "data-connection",
        //
        onClick: fn_test_conn,
      },
    ].filter((x) => !_.isNil(x)),
    body: bodyCtn,
  });
});

export default ModifyConfigView;
