const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  GFormSwitch,
  OperationPanel,
  BluePrintPopover,
  Mobx,
  MobxReact,
  HalfResizeForTwo,
  MobxReactLite,
  ProgressBar,
  Dialog,
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
  GFormInput,
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
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import PreRequisiteJson from "../pre-requisite.json";

let appTitle = "DML to JSON";
let appName = appTitle;
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appName,
  viewName: appName,
};
let idColumn = ` id int primary key auto_increment not null `;
let createTimeColumn = ` create_time timestamp `;

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState() {
      return {
        config_json_flatten_type: "flatten_deeply",
        config_text_sort_order: "asc",
        myvalue: 12345,
      };
    },
    menus: [
      {
        pid: "text",
        children: [
          {
            ...fn_otherPages.menu.getSQLMenu(),
            children: [
              {
                label: appTitle,
                icon: "flow-review",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.simpleLeftRightConvertor({
      noTriggerWhenCall: true,
      // syncView: true,
      type: "mysql",
      fontSize: 12,
      totalTitle: appName,
      noSources: false,
      exampleArr: [
        {
          label: t(`DML Example(DML to JSON)`),
          str: `
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
`,
        },
      ].filter((x) => !_.isNil(x)),
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            cid: "sql_to_json",
            onClick: fn_formatSelfTranslate("sql_to_json"),
            label: t(`DML to JSON`),
            intent: "primary",
          },
          // {
          //   cid: "json_to_sql",
          //   onClick: fn_formatSelfTranslate("json_to_sql"),
          //   label: t(`JSON to SQL`),
          //   intent: "primary",
          // },
        ];
      },
      language: "mysql",
      handle: async (
        { leftValue, type = "sql_to_json" },
        { crtStoreName, PUtils }
      ) => {
        let str = leftValue;
        let { data } = await gref.optAPI("transform", {
          ...PUtils.crtModel,
          text: str,
          type: type,
        });
        return {
          result: data.value,
        };
      },
      fn_configItem: ({ crtStoreName, PUtils }) => [
        {
          label: t("SQL Type"),
          children: [cutils.jsx_sqlType({ PUtils, crtStoreName })],
        },
      ],
    }),
  };
};
