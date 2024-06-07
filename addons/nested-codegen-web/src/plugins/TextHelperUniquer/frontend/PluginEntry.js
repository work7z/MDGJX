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

let appName = "Text Deduplicator";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appName,
  viewName: appName,
};
let appTitle = metaObj.viewName;

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState() {
      return {
        config_uniquer_output_type: "text_only",
        config_text_sort_order: "asc",
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
                icon: "bring-data",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.form.textHelperRender({
      apiName: "text_uniquer",
      metaObj,
      btn_type: "uniquer",
      gref,
      PreRequisiteJson,
      exampleStr: fn_otherPages.form.textHelperExampleStr,
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            onClick: fn_formatSelfTranslate("uniquer"),
            label: t(`Deduplicate`),
            intent: "primary",
          },
        ];
      },
      fn_configItem: ({ crtStoreName, PUtils }) => {
        return [
          {
            label: t("Output Type"),
            children: [
              {
                tag: Html_select,
                value:
                  gstore.common_app[crtStoreName].model
                    .config_uniquer_output_type,
                list: [
                  {
                    label: t(`Text Only`),
                    value: "text_only",
                  },
                  {
                    label: t(`Text With Count`),
                    value: "text_with_count",
                  },
                ],
                onChange: (x) => {
                  gstore.common_app[
                    crtStoreName
                  ].model.config_uniquer_output_type = x.target.value;
                },
              },
            ],
          },
        ];
      },
      default_select_tab: "scripts",
      fn_getConfigList({ PUtils, model, crtStore, crtStoreName, commonSave }) {
        return [].filter((x) => !_.isNil(x));
      },
    }),
  };
};
