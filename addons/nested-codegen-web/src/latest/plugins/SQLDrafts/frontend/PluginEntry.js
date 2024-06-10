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
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import mappingLogic from "./key";
import Common_MainSQLView from "./Common_MainSQLView";
import fn_initialState from "./Common_initialState";
import WrapRootEntryView from "./Common_WrapRootEntryView";
let dbLabelPropMapping = {
  sqlite: "SQLite",
  oracle: "Oracle",
  postgresql: "PostgreSQL",
  mysql: "MySQL",
  maraidb: "Maraidb",
  h2: "H2",
  mssql: "SQL Server",
};
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "SQL Drafts";

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: fn_initialState,
    menus: [
      {
        pid: "database",
        children: [
          {
            ...fn_otherPages.menu.getRDBMSMenu(),
            children: [
              {
                label: "SQL Drafts",
                icon: "application",
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
      // ok
      fn_otherPages.rightMainPageJsx({
        noTranslateForTitle: true,
        totalTitle: ({ PUtils }) => {
          if (!_.isEmpty(PUtils.crtModel.titleMsg)) {
            return PUtils.crtModel.titleMsg;
          }
          let viewLabel = {
            main: "Console",
            add: "Add New Config",
            modify: "Modify Present Config",
            history: "SQL Execution History",
          };
          let dbtype_str = _.get(PUtils.crtModel, "dbconfig.dbType");
          return (
            `${t(appTitle)}` +
            ` - ` +
            t(viewLabel[PUtils.crtModel.view_type]) +
            `[${dbLabelPropMapping[dbtype_str] || dbtype_str}]`
          );
        },
        left_hist_use_all: true,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          PUtils.commonSaveWithDelay();
          PUtils.gref = gref;
          return <WrapRootEntryView PUtils={PUtils} />;
        }),
      })
    ),
  };
};
