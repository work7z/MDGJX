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
  MobxReactLite,
  ProgressBar,
  Dialog,
  GSyncSelectWithFilter,
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

let fn_SQLFromDefinition = (tmp_db_config) => {
  let fn_item_password = () => ({
    label: t(`Password`),
    helperText: t(`The password of this connection.`),
    tag: GFormInput,
    tagProps: {
      placeholder: t(`i.e. database password`),
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
  let fn_item_url_params = (endName) => ({
    label: t(`JDBC URL Parameters`),
    helperText: t(
      `If you cannot connect to the database, presumably there's some encoding or timezone issue of the config. Therefore, you can provide related params here according to your database factual settings. On the other hand, if everything goes well, you can ignore this form field.`
    ),
    tag: GFormInput,
    tagProps: {
      type: "text",
      placeholder: `e.g. ?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=false&serverTimezone=GMT%2B8`,
      noTranslate: true,
      small: true,
      onChange(x) {
        tmp_db_config["url_params_" + endName] = x;
      },
      value: tmp_db_config["url_params_" + endName],
    },
  });
  let fn_item_database = () => ({
    label: t(`Database`),
    helperText: t(`The database name of connection.`),
    tag: GFormInput,
    tagProps: {
      placeholder: `e.g. testdb`,
      small: true,
      onChange(x) {
        tmp_db_config.database = x;
      },
      value: tmp_db_config.database,
    },
  });
  // let fn_item_oracle_role = () => ({
  //   label: t(`Role`),
  //   helperText: `The role of connection for Oracle.`,
  //   tag: GSyncSelectWithFilter,
  //   tagProps: {
  //     list: [
  //       {
  //         label: "Normal",
  //         value: "normal",
  //       },
  //       {
  //         label: "SYSDBA",
  //         value: "SYSDBA",
  //       },
  //       {
  //         label: "SYSOPER",
  //         value: "SYSOPER",
  //       },
  //     ],
  //     obj: tmp_db_config,
  //     index: `oracle_role`,
  //   },
  // });
  // conn
  let conn_type_general = ({ endName }) => {
    return {
      label: t(`General Type`),
      id: "general",
      forms: () => [
        fn_item_host(),
        fn_item_port(),
        fn_item_username(),
        fn_item_password(),
        fn_item_database(),
        fn_item_url_params(endName),
      ],
    };
  };
  // return
  let return_obj = {
    common: [
      {
        label: t(`Customization`),
        id: "custom",
        forms: () => [
          {
            label: t(`JDBC URL`),
            helperText: t(
              `You can specify its complete JDBC Link with customed parameters.`
            ),
            tag: GFormInput,
            tagProps: {
              placeholder: t(`i.e. JDBC Link`),
              onChange(x) {
                tmp_db_config.customJDBCUrl = x;
              },
              value: tmp_db_config.customJDBCUrl,
            },
          },
          fn_item_username(),
          fn_item_password_with_optional(),
        ],
      },
    ],
    ext: {
      mysql: [conn_type_general({ endName: "mysql" })],
      mariadb: [conn_type_general({ endName: "mariadb" })],
      sqlite: [
        {
          label: t(`SQLite Local DataFile`),
          id: "sqlite_local_datafile",
          forms: () => [
            fn_item_username(),
            fn_item_password_with_optional(),
            {
              label: t(`Database Storage FilePath`),
              helperText: t(
                `SQLite will save data into this filepath, meanwhile, please specify an absolute path as its file path value.`
              ),
              tag: GFormInput,
              tagProps: {
                placeholder: t(`i.e. the absolute path of datafile`),
                onChange(x) {
                  tmp_db_config.filepath = x;
                },
                value: tmp_db_config.filepath,
              },
            },
            fn_item_url_params("sqlite"),
          ],
        },
      ],
      h2: [
        {
          label: t(`H2 Local DataFile`),
          id: "h2_local_datafile",
          forms: () => [
            fn_item_username(),
            fn_item_password_with_optional(),
            {
              label: t(`Database Storage FilePath`),
              helperText: t(
                `H2 will save data into this filepath, meanwhile, please specify an absolute path as its file path value.`
              ),
              tag: GFormInput,
              tagProps: {
                placeholder: t(`i.e. the absolute path of datafile (*.mv.db)`),
                onChange(x) {
                  tmp_db_config.filepath = x;
                },
                value: tmp_db_config.filepath,
              },
            },
            fn_item_url_params("h2"),
          ],
        },
      ],
      postgresql: [
        {
          label: t(`Database Native`),
          id: "database_native",
          forms: () => [
            fn_item_host(),
            fn_item_port(),
            fn_item_username(),
            fn_item_password_with_optional(),
            fn_item_database(),
            fn_item_url_params("postgresql"),
          ],
        },
      ],
      mssql: [
        {
          label: t(`General Type`),
          id: "mssql_connection_type",
          forms: () => [
            fn_item_host(),
            fn_item_port(),
            fn_item_username(),
            fn_item_password_with_optional(),
            fn_item_url_params("mssql"),
          ],
        },
      ],
      oracle: [
        {
          label: t(`Service Name`),
          id: "service_name",
          forms: () => [
            fn_item_host(),
            fn_item_port(),
            fn_item_username(),
            fn_item_password(),
            fn_item_database(),
            fn_item_url_params("oracle"),
            // fn_item_oracle_role(),
          ],
        },
        {
          label: `SID`,
          id: "sid",
          forms: () => [
            fn_item_host(),
            fn_item_port(),
            fn_item_username(),
            fn_item_password(),
            fn_item_database(),
            fn_item_url_params("oracle"),
            // fn_item_oracle_role(),
          ],
        },
      ],
    },
  };
  // return_obj = _.mapValues(return_obj, (x, d, n) => {
  //   let new_arr = [];
  //   _.forEach(x, (xx, dd, nn) => {
  //     new_arr.push(() => {
  //       return xx;
  //     });
  //   });
  //   return new_arr;
  // });
  return return_obj;
};

export default fn_SQLFromDefinition;
