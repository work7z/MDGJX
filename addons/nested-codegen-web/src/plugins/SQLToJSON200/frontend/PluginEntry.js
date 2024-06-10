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

let appTitle = "SQL to JSON";
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
                icon: "flow-end",
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
          label: t(`DDL Example(SQL to JSON)`),
          str: `
  select 
  a.*,c.database_name,c.database_icon,c.database_prop
  from g_dblink_connections a 
  left join  g_dblink_driver b on a.driver_id = b.driver_prop
  left join g_dblink_dbtype c on a.dbtype_id = c.database_prop;

  select * from g_dblink_connections_editor_result_set where id=100;

  select s.name as schema_name, 
    s.schema_id,
    u.name as schema_owner
from sys.schemas s
    inner join sys.sysusers u
        on u.uid = s.principal_id
order by s.name;
`,
        },
      ].filter((x) => !_.isNil(x)),
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            cid: "sql_to_json",
            onClick: fn_formatSelfTranslate("sql_to_json"),
            label: t(`SQL to JSON`),
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
