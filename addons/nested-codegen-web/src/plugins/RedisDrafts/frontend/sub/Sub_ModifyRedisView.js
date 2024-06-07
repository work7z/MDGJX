const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  GSyncSelectWithFilter,
  OperationPanel,
  BluePrintPopover,
  Mobx,
  MobxReact,
  GFormSwitch,
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
import fn_newDbConfig from "../fn/fn_newDbConfig.";
const GFormInput = GFormInput2;

let fn_SQLFromDefinition = (tmp_db_config) => {
  let fn_item_password = () => ({
    label: t(`Password`),
    helperText: t(`The password of this connection.`),
    tag: GFormInput,
    tagProps: {
      placeholder: t(
        `i.e. Redis password, you can ignore it if you didn't set it previously.`
      ),
      type: "password",
      small: true,
      onChange(x) {
        tmp_db_config.password = x;
      },
      value: tmp_db_config.password,
    },
  });
  let fn_item_password_with_optional = () =>
    _.merge({}, fn_item_password(), {
      label: t(`Password(Optional)`),
    });
  let fn_item_username = () => ({
    label: t(`Username`),
    helperText: t(`The username of connection.`),
    tag: GFormInput,
    tagProps: {
      placeholder: t(`i.e. database username`),
      small: true,
      onChange(x) {
        tmp_db_config.username = x;
      },
      value: tmp_db_config.username,
    },
  });
  let fn_item_host = () => ({
    label: t(`Host`),
    helperText: t(`The host of connection, it can be IP address or host name.`),
    tag: GFormInput,
    required: true,
    // handling it
    tagProps: {
      placeholder: `e.g. 192.168.2.10`,
      small: true,
      onChange(x) {
        tmp_db_config.host = x;
      },
      value: tmp_db_config.host,
    },
  });
  let fn_item_port = () => ({
    label: t(`Port`),
    required: true,
    helperText: t(
      `The port of connection, and its scope will be limited from 1 to 65535.`
    ),
    tag: GFormInput,
    tagProps: {
      type: "number",
      placeholder: `e.g. 3306`,
      small: true,
      onChange(x) {
        tmp_db_config.port = x;
      },
      value: tmp_db_config.port,
    },
  });
  let fn_item_database = () => ({
    label: t(`Database Order`),
    helperText: t(
      `By default, CodeGen will use {0} as its default database order.`,
      "0"
    ),
    tag: GFormInput,
    tagProps: {
      placeholder: `e.g. 0`,
      small: true,
      onChange(x) {
        tmp_db_config.database = x;
      },
      value: tmp_db_config.database,
    },
  });
  let fn_item_using_ssl = () => ({
    label: t(`Using SSL Mode?`),
    helperText: t(
      `By Default, CodeGen will use non-ssl mode to connect your Redis server.`
    ),
    tag: GFormSwitch,
    tagProps: {
      valtype: "tf",
      onChange(x) {
        tmp_db_config.useSSL = x;
      },
      value: tmp_db_config.useSSL,
    },
  });
  let conn_type_general = ({ endName }) => {
    return {
      label: t(`General Type`),
      id: "general",
      forms: () => [
        fn_item_host(),
        fn_item_port(),
        fn_item_password(),
        fn_item_using_ssl(),
      ],
    };
  };
  let return_obj = {
    ext: {
      redis: [conn_type_general({ endName: "redis" })],
    },
  };
  return return_obj;
};

const Sub_ModifyRedisView = observer((props) => {
  let { PUtils } = props;
  let { crtModel } = PUtils;
  let list_config_displayMode = [
    {
      label: t(`Visual Mode`),
      value: "visual",
      desc_label: t(`Configuring your config by visualized form controls`),
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

  let { tmp_dbconfig } = crtModel;
  let crt_tmp_dbconfig = tmp_dbconfig;
  let SQLFromDefinition = fn_SQLFromDefinition(crt_tmp_dbconfig);

  let crtDefinition = SQLFromDefinition.ext.redis[0];

  useEffect(() => {
    PUtils.gref.optAPI(`test_my_api`);
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
    return () => {
      a();
    };
  }, []);
  let fn_test_conn = async () => {
    gutils.alert(`CodeGen is testing the connection, moments please.`);
    try {
      await PUtils.gref.optAPI(`test_connection`, {
        dbconfig: {
          ...tmp_dbconfig,
        },
      });
      gutils.alertOk(`Connected to the Redis server successfully.`);
    } catch (e) {
      gutils.alert({
        intent: "danger",
        message: gutils.getErrMsg(e),
      });
      throw e;
    }
  };
  let fn_use_default_local_parameter = async () => {
    _.merge(tmp_dbconfig, {
      ...fn_newDbConfig(),
    });
    tmp_dbconfig.host = `127.0.0.1`;
    tmp_dbconfig.port = `6379`;
    tmp_dbconfig.displayMode = "visual";
    gutils.alertOk(`Using default local parameter as its configuration.`);
  };

  // render jsx elements
  let bodyCtn = PUtils.jsx.leftRightSpliter({
    n_style: {
      overflowX: "hidden",
    },
    resizekey: "redis_drafts__lr",
    left: PUtils.jsx.panelWithTitle({
      title:
        "Redis Config - " +
        _.chain(list_config_displayMode)
          .filter((x) => x.value == tmp_dbconfig.displayMode)
          .first()
          .get("label")
          .value(),
      n_style: {
        borderTop: "none",
        overflowX: "hidden",
      },
      jsx: React.createElement(
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
                              crtDefinition.forms() || []
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
                      label: t(`Connection Timeout`),
                      helperText: t(
                        `It's a timeout setting for connection, of which its unit is mileseconds. For instance, 5000 refers to 5 seconds`
                      ),
                      tag: GFormInput,
                      tagProps: {
                        type: "number",
                        small: true,
                        placeholder: t(`i.e. 5000`),
                        onChange(x) {
                          tmp_dbconfig.connectTimeout = x;
                        },
                        value: tmp_dbconfig.connectTimeout,
                      },
                    },
                    {
                      label: t(`Socket Timeout`),
                      helperText: t(
                        `It's a timeout setting when retrieving values from Redis, of which its unit is mileseconds. For instance, 5000 refers to 5 seconds`
                      ),
                      tag: GFormInput,
                      tagProps: {
                        type: "number",
                        small: true,
                        placeholder: t(`i.e. 5000`),
                        onChange(x) {
                          tmp_dbconfig.socketTimeout = x;
                        },
                        value: tmp_dbconfig.socketTimeout,
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
    right: PUtils.jsx.panelWithTitle({
      title: "FAQ for Redis Config",
      n_style: {
        borderTop: "none",
      },
      jsx: (
        <div style={{ padding: "12px" }}>
          {[
            {
              title: t(
                `How to connect to the Redis server by using this tool?`
              ),
              ctn: t(
                `Too often, according to the default server setting, you might use the host {0} and the port {1} to connect to the Redis server. If you encountered any error, please adjust the connection parameters by checking the error messages.`,
                "127.0.0.1",
                "6379"
              ),
            },
            {
              title: t(`How to create multiple connection configuration?`),
              ctn: t(
                `In CodeGen, you can create a new tab to configure your other Redis connection, it is as same as the SQL connection tools in our toolbox, which means that each tab will refer to a corresponding Redis configuration and instance.`
              ),
            },
            {
              title: t(`Can I use cluster mode to connect my Redis servers?`),
              ctn: t(
                `Presently, CodeGen ToolBox only supports connecting to the Redis server by directly specifying its host and port. If you think another connection mode is needed as well, please contact us at any time, looking forward to hearing your thoughts!`
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
            loading_id: "encode_redis_drafts__cancel",
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
        loading_id: "encode_redis_drafts__token_btn_save",
        onClick: async () => {
          await fn_test_conn();
          // await PUtils.gref.optAPI(
          //   !PUtils.crtModel.created ? `create_dbconfig` : `save_dbconfig`,
          //   {
          //     ...tmp_dbconfig,
          //   }
          // );
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
            text: t(`Use Default Local Parameter`),
            intent: "none",
            minimal: true,
            outlined: true,
            icon: "database",
            onClick: fn_use_default_local_parameter,
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
export default Sub_ModifyRedisView;
