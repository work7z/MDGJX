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
import PreRequisiteJson from "../pre-requisite.json";
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import FormLabelTextInput from "../../TranslateForJSON/frontend/cpt/FormLabelTextInput";
import "./myfile.less";
import common_lang_entry from "../../TranslateForJSON/frontend/kit/common_lang_entry";
import LangTypeSelect from "../../TranslateForJSON/frontend/cpt/LangTypeSelect";
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
let idColumn = ` id int primary key auto_increment not null `;
let createTimeColumn = ` create_time timestamp `;

let example = `
create table if not exists g_proxy_config_rule(
   id int primary key auto_increment not null,
   config_id int not null,
   rule_name varchar(100),
   rule_brief varchar(250),
   dest_host varchar(100) not null,
   read_timeout int default -1,
   connect_timeout int default -1,
   max_connection int default -1,
   handle_compress int default 1,
   handle_redirect int default 1,
   keep_cookies int default 0,
   is_change_origin int default 0 comment 'keep_host',
   send_url_fragment int default 1,
   forward_ip int default 1,
   use_system_properties int default 1, 
   disable int default 0,
   create_time timestamp
);        


create table if not exists g_message_channel(
    ${idColumn},
    intent_type varchar(20),
    opt_type varchar(100),
    title varchar(100),
    text_content varchar(500),
    json_content json,
    has_read int default 0,
    error_info varchar(100),
    invoke_method varchar(100),
    ${createTimeColumn}
 )
`;
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "SQL to Model";

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: async () => {
      await fn_otherPages.fn.loadStatic({
        PreRequisiteJson,
        gref,
      });
      return {
        page_type: "mysql",
        ...common_lang_entry.init_model(),
      };
    },
    menus: [
      {
        ...fn_otherPages.menu.getCreateMenu(),
        children: [
          {
            ...fn_otherPages.menu.getDTOLayerMenu(),
            children: [
              {
                label: appTitle,
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
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
        fn_randomTitleArr: () => [
          t(`Now, CodeGen supports parsing DML SQL into model formatting.`),
          t(
            `SQL is a structured Query Language, an international standard for database manipulation.`
          ),
          ...common_lang_entry.fn_randomTitleArr(),
        ],
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
            fn_show_example: () => {
              PUtils.editor.setValue({
                id: "json_source",
                value: example,
              });
            },
            fn_get_copy_result: common_lang_entry.fn.get_copy_result,
            helpBtnProps: {
              minimal: true,
              outlined: true,
            },
            controls: [
              {
                intent: "primary",
                text: t(`Generate Result`),
                loading_id: "json_create_fn",
                onClick: async () => {
                  await common_lang_entry.fn.generateResultByJSONMode({
                    PUtils,
                    fn_convert_to_json: async function ({ json_source }) {
                      let { data } = await gref.optAPI("transform", {
                        ...PUtils.crtModel,
                        text: json_source,
                        type: "transform",
                      });
                      window.d000_data = data;
                      let obj_1 = {};
                      _.forEach(data.value, (eachVal) => {
                        obj_1[eachVal.tableName] = {};
                        _.forEach(eachVal.columns, (x, d, n) => {
                          let numObj = {
                            short: 0,
                            bigint: 0,
                            int: 0,
                            decimal: 0,
                          };
                          let matchValueObj = {
                            ...numObj,
                            timestamp: 0,
                            json: {},
                          };
                          x.defaultExpression =
                            x.defaultExpression == "null"
                              ? {}
                              : x.defaultExpression;
                          let dataMappingForSQL = {
                            "CHARACTER VARYING": "String",
                            CHARACTER: "String",
                            "CHARACTER LARGE OBJECT": "String",
                            VARCHAR_IGNORECASE: "String",
                            CHAR: "String",
                            VARCHAR: "String",
                            TINYBLOB: "String",
                            TINYTEXT: "String",
                            BLOB: "String",
                            TEXT: "String",
                            MEDIUMBLOB: "String",
                            MEDIUMTEXT: "String",
                            LONGBLOB: "String",
                            LONGTEXT: "String",
                            VHARCHAR2: "String",
                            NVARCHAR: "String",
                            NVARCHAR2: "String",
                            LOB: "String",
                            BINARY: "Byte[]",
                            "BINARY VARYING": "Byte[]",
                            "BINARY LARGE OBJECT": "Byte[]",
                            BOOLEAN: "Boolean",
                            TINYINT: "Integer",
                            SMALLINT: "Integer",
                            INTEGER: "Integer",
                            BIGINT: "Long",
                            LONG: "String",
                            real: "java.math.BigDecimal",
                            "double precision": "java.math.BigDecimal",
                            smallserial: "java.math.BigDecimal",
                            serial: "java.math.BigDecimal",
                            bigserial: "java.math.BigDecimal",
                            money: "java.math.BigDecimal",
                            NUMBER: "java.math.BigDecimal",
                            NUMERIC: "java.math.BigDecimal",
                            BINARY_FLOAT: "java.math.BigDecimal",
                            BINARY_DOUBLE: "java.math.BigDecimal",
                            REAL: "java.math.BigDecimal",
                            "DOUBLE PRECISION": "java.math.BigDecimal",
                            DECFLOAT: "java.math.BigDecimal",
                            DATE: "java.util.Date",
                            YEAR: "java.util.Date",
                            DATETIME: "java.util.Date",
                            TIME: "java.sql.Timestamp",
                            "TIMESTAMP WITH LOCAL TIME ZONE":
                              "java.sql.Timestamp",
                            "INTERVAL YEAR TO MONTH": "Long",
                            CLOB: "Object",
                            NCLOB: "Object",
                            "java.util.ArrayList": "java.util.ArrayList",
                            BFILE: "Object",

                            MEDIUMINT: "Integer",
                            INT: "Integer",
                            FLOAT: "java.math.BigDecimal",
                            DOUBLE: "java.math.BigDecimal",
                            DECIMAL: "java.math.BigDecimal",

                            "INTERVAL DAY TO SECOND": "Long",
                            "TIME WITH TIME ZONE": "java.sql.Timestamp",
                            TIMESTAMP: "java.sql.Timestamp",
                            "TIMESTAMP WITH TIME ZONE": "java.sql.Timestamp",
                            "@@OTHER": "Object",
                          };
                          let numericValue = {
                            "java.math.BigDecimal": "1",
                            "Byte[]": "1",
                            Integer: "",
                            Long: "",
                            Double: "",
                          };
                          let finalTypeNow = "plainobject";
                          let bbb222 =
                            dataMappingForSQL[
                              _.toUpper(
                                (_.toUpper(x.dataType) + "").replace(
                                  /\(\s*\d+\s*\)/g,
                                  ""
                                )
                              )
                            ];
                          if (bbb222) {
                            finalTypeNow = bbb222;
                          }

                          let valuenow = null;
                          if (
                            !_.isNil(x.defaultExpression) &&
                            x.defaultExpression != "null"
                          ) {
                            if (numericValue[finalTypeNow]) {
                              valuenow = parseFloat(x.defaultExpression);
                            } else {
                              valuenow = x.defaultExpression;
                            }
                          }
                          if (_.isObject(valuenow) && _.size(valuenow) == 0) {
                            valuenow = null;
                          }
                          if (_.isString(valuenow)) {
                            valuenow = valuenow
                              .replace(/^'/g, '"')
                              .replace(/'$/g, '"');
                          }

                          obj_1[eachVal.tableName][x.columnName] =
                            "CG_TYPE_VALUE_OCT98_" +
                            JSON.stringify({
                              value: valuenow,
                              dataType: x.dataType,
                              type: finalTypeNow,
                              // defaultExpression:
                              //   !_.isNil(matchValueObj[x.dataType]) &&
                              //   !_.isNil(matchValueObj[x.dataType]) &&
                              //   !_.isNil(x.defaultExpression) &&
                              //   "" != x.defaultExpression
                              //     ? parseFloat(x.defaultExpression)
                              //     : null,
                            });
                          // !_.isNil(matchValueObj[x.dataType]) &&
                          // !_.isNil(matchValueObj[x.dataType]) &&
                          // !_.isNil(x.defaultExpression) &&
                          // "" != x.defaultExpression
                          //   ? parseFloat(x.defaultExpression)
                          //   : cutils.ifnull(
                          //       matchValueObj[x.dataType],
                          //       (x.dataType + "").indexOf("char") != -1
                          //         ? x.defaultExpression
                          //         : x.defaultExpression
                          //     );
                        });
                      });
                      return JSON.stringify(obj_1, 0, 4);
                    },
                  });
                },
              },
            ],
            rightControls: [
              {
                label: t(`SQL Type`),
                jsx: cutils.direct_jsx_SQL_TYPE({
                  PUtils,
                  crtStoreName: PUtils.crtStoreName,
                }),
              },
              {
                label: t(`Programming Language`),
                jsx: <LangTypeSelect PUtils={PUtils} model={PUtils.crtModel} />,
              },
            ],
            body: (
              <div className="w100 h100">
                {PUtils.jsx.topBtmSpliter({
                  border: true,
                  percent: 0.5,
                  top: React.createElement(
                    observer((props) => {
                      return PUtils.jsx.leftRightSpliter({
                        resizekey: "top_json_left",
                        left: PUtils.jsx.tabWithDefinition({
                          default_select_tab: "str",
                          key: "top_json_console",
                          list: [
                            {
                              label: t(`SQL Source`),
                              jsx: observer((props) =>
                                PUtils.jsx.createGEditor({
                                  fontSize: 11,
                                  use_original_text: true,
                                  wordWrap: "off",
                                  key: "json_source",
                                  language: "mysql",
                                  initContent: ``,
                                })
                              ),
                            },
                          ].map((x) => {
                            x.mode_jsx_func = true;
                            return x;
                          }),
                        }),
                        right: common_lang_entry.jsx_langConfig({
                          PUtils,
                        }),
                        percent: 0.6,
                      });
                    })
                  ),
                  btm: common_lang_entry.jsx_btm_result_panel({
                    PUtils,
                  }),
                })}
              </div>
            ),
          });
        }),
      })
    ),
  };
};
