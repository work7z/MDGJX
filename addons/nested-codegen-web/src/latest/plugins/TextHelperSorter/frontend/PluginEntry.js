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
  appName: "Text Sorter",
  viewName: "Text Sorter",
};
let appTitle = metaObj.viewName;

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState() {
      return {
        config_text_sort_order: "asc",
        ...fn_otherPages.form.textHelperState(),
        config_text_helper_filter: null,
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
                icon: "sort-alphabetical",
                pid: "TextHelperSorter",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.form.textHelperRender({
      apiName: "text_sorter",
      metaObj,
      gref,
      btn_type: "sorter",
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
      handleFurther: fn_otherPages.fn.handleFurtherForText,
      fn_getConfigList({ PUtils, model, crtStore, crtStoreName, commonSave }) {
        return [
          {
            label: t(`Scripts`),
            id: "scripts",
            hide: !(
              gstore.common_app[crtStoreName].model.config_text_sort_order ==
              "user_define"
            ),
            jsx: PUtils.jsx.createGEditor({
              fontSize: 11,
              key: "config_text_helper_filter",
              language: "javascript",
              initContent: fn_otherPages.form.textHelperInitContent,
            }),
          },
        ].filter((x) => !_.isNil(x));
      },
    }),
  };
};
