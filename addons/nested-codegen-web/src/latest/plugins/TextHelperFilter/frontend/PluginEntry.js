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
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import PreRequisiteJson from "../pre-requisite.json";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "Text Filter",
  viewName: "Text Filter",
};
let appTitle = metaObj.viewName;

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState() {
      return {
        ...fn_otherPages.form.textHelperState(),
        myvalue: 12345,
      };
    },
    menus: [
      {
        pid: "text",
        children: [
          {
            ...fn_otherPages.get_texthelper_list(),
            children: [
              {
                label: metaObj.viewName,
                icon: "filter-list",
                pid: "TextHelperFilter",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.form.textHelperRender({
      apiName: "text_filter",
      metaObj,
      gref,
      PreRequisiteJson,
      btn_type: "filter",
      exampleStr: fn_otherPages.form.textHelperExampleStr,
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            onClick: fn_formatSelfTranslate("filter"),
            label: t(`Apply Filter`),
            intent: "primary",
          },
        ];
      },
      handleFurther: fn_otherPages.fn.handleFurtherForText,
      default_select_tab: "scripts",
      fn_getConfigList({ PUtils, model, crtStore, crtStoreName, commonSave }) {
        return [
          {
            label: t(`Scripts`),
            id: "scripts",
            jsx: PUtils.jsx.createGEditor({
              fontSize: 11,
              key: "config_text_helper_filter",
              language: "javascript",
              initContent: fn_otherPages.form.textHelperInitContent,
            }),
          },
        ];
      },
    }),
  };
};
