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
  GFormSwitch,
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
import LangTypeSelect from "../../TranslateForJSON/frontend/cpt/LangTypeSelect";
import common_lang_entry from "../../TranslateForJSON/frontend/kit/common_lang_entry";
import PlainTextLoggins from "../../TranslateForJSON/frontend/cpt/FormPlainTextLoggins/index";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "JSON to Model";

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: async () => {
      await fn_otherPages.fn.loadStatic({
        PreRequisiteJson,
        gref,
      });
      return {
        ...common_lang_entry.init_model(),
      };
    },
    menus: [
      {
        ...fn_otherPages.menu.getCreateMenu(),
        children: [
          {
            ...fn_otherPages.menu.getDTOLayerMenu(),
            children: [
              {
                label: `JSON to Model`,
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render:
      false && !gutils.dev()
        ? fn_otherPages.pleaseStayTuned({
            msg: (
              <div>
                <h3>{t(`This extension is still evolving...`)}</h3>
                <p>
                  {t(
                    "Sorry, this function still hasn't been finished yet, we will release it ASAP, please kindly stay tuned. Meanwhile, you might have known there's a DTO Helper function in the previous version, but we had to hide it due to the adjustment of architecture, you will be able to use the DTO Helper of new layout and abilities in the following versions."
                  )}
                </p>
                <p>
                  {t(
                    `It's almost done, and we're firmly convinced that the function will be released in the next version.`
                  )}
                </p>
                <p>
                  {t(
                    `If you need to use DTO Helper, please roll back to the previous version to use it. Sorry for the inconvenience brought to you.`
                  )}
                </p>
              </div>
            ),
          })
        : fn_otherPages.withPluginPage(
            PreRequisiteJson,
            {
              appId: metaObj.appName,
              fn_appName: () => {
                return metaObj.appId;
              },
            },
            fn_otherPages.rightMainPageJsx({
              fn_randomTitleArr: common_lang_entry.fn_randomTitleArr,
              totalTitle: appTitle,
              left_hist_use_all: true,
              noOptions: true,
              fn_afterConfigItem({ PUtils }) {
                return [];
              },
              jsx: observer((props) => {
                let { PUtils } = props;
                let { crtModel } = PUtils;

                return PUtils.jsx.createPanelWithBtnControls({
                  fn_show_example: () => {
                    PUtils.editor.setValue({
                      id: "json_source",
                      value: gutils.example_json,
                    });
                  },
                  fn_get_copy_result: common_lang_entry.fn.get_copy_result,
                  helpBtnProps: {
                    minimal: true,
                    outlined: true,
                  },
                  controls: [
                    {
                      intent: "primary",
                      text: t(`Generate Result`),
                      loading_id: "json_create_fn",
                      onClick: async () => {
                        await common_lang_entry.fn.generateResultByJSONMode({
                          PUtils,
                        });
                      },
                    },
                  ],
                  rightControls: [
                    {
                      label: t(`Programming Language`),
                      jsx: (
                        <LangTypeSelect
                          PUtils={PUtils}
                          model={PUtils.crtModel}
                        />
                      ),
                    },
                  ],
                  body: (
                    <div className="w100 h100">
                      {PUtils.jsx.topBtmSpliter({
                        border: true,
                        percent: 0.5,
                        top: React.createElement(
                          observer((props) => {
                            return PUtils.jsx.leftRightSpliter({
                              resizekey: "top_json_left",
                              noLeftScroll: true,
                              left: PUtils.jsx.tabWithDefinition({
                                default_select_tab: "str",
                                key: "top_json_console",
                                list: [
                                  {
                                    label: t(`JSON Source`),
                                    jsx: observer((props) =>
                                      PUtils.jsx.createGEditor({
                                        fontSize: 11,
                                        use_original_text: true,
                                        wordWrap: "off",
                                        key: "json_source",
                                        language: "json",
                                        initContent: ``,
                                      })
                                    ),
                                  },
                                ].map((x) => {
                                  x.mode_jsx_func = true;
                                  return x;
                                }),
                              }),
                              right: common_lang_entry.jsx_langConfig({
                                PUtils,
                              }),
                              percent: 0.6,
                            });
                          })
                        ),
                        btm: common_lang_entry.jsx_btm_result_panel({
                          PUtils,
                        }),
                      })}
                    </div>
                  ),
                });
              }),
            })
          ),
  };
};
