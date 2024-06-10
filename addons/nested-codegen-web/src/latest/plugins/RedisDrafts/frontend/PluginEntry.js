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
const { Tabs, Tab } = CodeGenDefinition.BluePrintCpt;
import PreRequisiteJson from "../pre-requisite.json";
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import FormLabelTextInput from "../../TranslateForJSON/frontend/cpt/FormLabelTextInput";
import "./myfile.less";
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import Sub_MainRedisView from "./sub/Sub_MainRedisView";
import Sub_ModifyRedisView from "./sub/Sub_ModifyRedisView";
import fn_newDbConfig from "./fn/fn_newDbConfig.";
import fn_crtPageState from "./fn/fn_crtPageState";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "Redis Data Tools";

const WrapRootEntryView = observer((props) => {
  let { PUtils } = props;
  let { crtModel } = PUtils;
  const viewObj = {
    main: <Sub_MainRedisView PUtils={props.PUtils} />,
    add: <Sub_ModifyRedisView PUtils={props.PUtils} />,
    modify: <Sub_ModifyRedisView PUtils={props.PUtils} />,
    create: <Sub_ModifyRedisView PUtils={props.PUtils} />,
  };
  let cpt = viewObj[crtModel.view_type];
  if (_.isNil(cpt)) {
    cpt = <div>Loading...</div>;
  }
  return cpt;
});

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: async () => {
      return {
        ...fn_crtPageState(),
      };
    },
    menus: [
      {
        pid: "database",
        children: [
          {
            ...fn_otherPages.menu.getExtendedServiceMenu(),
            children: [
              {
                label: appTitle,
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
          // let dbtype_str = _.get(PUtils.crtModel, "dbconfig.dbType");
          return (
            `${t(appTitle)}` + ` - ` + t(viewLabel[PUtils.crtModel.view_type])
            // +`[${dbLabelPropMapping[dbtype_str] || dbtype_str}]`
          );
          // return appTitle;
        },
        left_hist_use_all: true,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;
          PUtils.commonSaveWithDelay();
          PUtils.gref = gref;
          return <WrapRootEntryView PUtils={PUtils} />;
        }),
      })
    ),
  };
};
