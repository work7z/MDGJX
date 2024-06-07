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

let appName = "JSON Converter";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appName,
  viewName: appName,
};
let appTitle = metaObj.viewName;

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    hide: true,
    hideThisPage: true,
    initialState() {
      return {
        config_text_sort_order: "asc",
        ...fn_otherPages.form.textHelperState(),
        myvalue: 12345,
      };
    },
    menus: [],
    menus_2: [
      {
        pid: "text",
        children: [
          {
            pid: "jsonhelper",
            children: [
              {
                label: metaObj.viewName,
                icon: "sort-alphabetical",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.form.jsonHelperRender({
      apiName: "json_converter",
      metaObj,
      gref,
      PreRequisiteJson,
      exampleStr: fn_otherPages.form.textHelperExampleStr,
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            onClick: fn_formatSelfTranslate("sorter"),
            label: t(`Apply Sorter`),
            intent: "primary",
          },
        ];
      },
      fn_configItem: ({ crtStoreName, PUtils }) => {
        return [
          {
            label: t("Sorting Rule"),
            children: [
              {
                tag: Html_select,
                value:
                  gstore.common_app[crtStoreName].model.config_text_sort_order,
                list: [
                  {
                    label: t(`Ascending Order`),
                    value: "asc",
                  },
                  {
                    label: t(`Descending Order`),
                    value: "desc",
                  },
                  {
                    label: t(`Reverse Order`),
                    value: "reverse",
                  },
                  {
                    label: t(`User-Defined Rules`),
                    value: "user_define",
                  },
                ],
                onChange: (x) => {
                  gstore.common_app[crtStoreName].model.config_text_sort_order =
                    x.target.value;
                  if (true) {
                    gutils.defer(() => {
                      window.update_tab_index(
                        metaObj.appId + "config",
                        gstore.common_app[crtStoreName].model
                          .config_text_sort_order == "user_define"
                          ? "scripts"
                          : "config"
                      );
                    }, 0);
                  }
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
