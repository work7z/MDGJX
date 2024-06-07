const {
  GSyncSelectWithFilter,
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

let appTitle = "SQL Drafts";
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appTitle,
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: async () => {
      // await fn_otherPages.fn.loadStatic({
      //   PreRequisiteJson,
      //   gref,
      // });
      return {
        // myvalue: 12345,
        // decode_obj: {},
      };
    },
    menus: [
      {
        pid: "database",
        children: [
          {
            ...fn_otherPages.menu.getRDBMSMenu(),
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
        // totalTitle: ({PUtils})=>{
        //   //
        // },
        noTranslateForTitle: true,
        totalTitle: ({ PUtils }) => {
          return appTitle;
        },
        left_hist_use_all: true,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;

          return PUtils.jsx.createPanelWithBtnControls({
            // fn_get_copy_result: async () => {
            //   return PUtils.editor.getValue({
            //     id: "ROOT_EXTENSION_ADDONS_encode_text_result",
            //   });
            // },
            helpBtnProps: {
              minimal: true,
              outlined: true,
            },
            controls: [
              {
                text: t(`Test`),
                intent: "none",
                minimal: true,
                outlined: true,
                icon: "build",
                loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
                onClick: async () => {
                  await fn_updateCalc_real();
                  gutils.alertOk(`Created a JWT Token.`);
                },
              },
              {
                text: t(`Refresh Data`),
                minimal: true,
                outlined: true,
                icon: "refresh",
                intent: "none",
                loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
                onClick: async () => {
                  await gutils.sleep(3000);
                  gutils.alertOk(`Refreshed.`);
                },
              },
            ],
            rightControls: [
              {
                text: t(`Test-2`),
                intent: "none",
                minimal: true,
                outlined: true,
                icon: "data-connection",
                //
                onClick: () => {
                  // identify
                },
              },
            ],
            body: (
              <div className="w100 h100">
                {PUtils.jsx.topBtmSpliter({
                  border: true,
                  percent: 0.4,
                  top: React.createElement(
                    observer((props) => {
                      return PUtils.jsx.tabWithDefinition({
                        default_select_tab: "str",
                        key: "ROOT_EXTENSION_ADDONS_console",
                        list: [
                          {
                            label: t(`Tab-1`),
                            jsx: observer((props) => {
                              return PUtils.jsx.leftRightSpliter({
                                resizekey: "ROOT_EXTENSION_ADDONS_console",
                                left: <div>left</div>,
                                right: <div>right</div>,
                                percent: 1,
                              });
                            }),
                          },
                        ].map((x) => {
                          x.mode_jsx_func = true;
                          return x;
                        }),
                      });
                    })
                  ),
                  btm: React.createElement(
                    observer((props) => {
                      return PUtils.jsx.tabWithDefinition({
                        default_select_tab: "str",
                        key: "ROOT_EXTENSION_ADDONS_decode_str_tab",
                        list: [
                          {
                            label: t(`Result`),
                            jsx: observer((props) =>
                              PUtils.jsx.createGEditor({
                                use_target_text: true,
                                fontSize: 11,
                                wordWrap: "on",
                                key: "ROOT_EXTENSION_ADDONS_encode_str",
                                language: "plaintext",
                                initContent: ``,
                              })
                            ),
                          },
                        ].map((x) => {
                          x.mode_jsx_func = true;
                          return x;
                        }),
                      });
                    })
                  ),
                })}
              </div>
            ),
          });
        }),
      })
    ),
  };
};
