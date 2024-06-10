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
import example_xml from "../../TranslateForJSON/frontend/kit/example_xml";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "XML to Model";

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: async () => {
      await fn_otherPages.fn.loadStatic({
        PreRequisiteJson,
        gref,
      });
      return {
        page_type: "xml",
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
                label: `XML to Model`,
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
        fn_randomTitleArr: () => [
          t(`Now, CodeGen supports parsing XML content into model formatting.`),
          t(
            `XML is a simple text-based format for representing structured information.`
          ),
          ...common_lang_entry.fn_randomTitleArr(),
        ],
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
                value: example_xml,
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
                    fn_convert_to_json: async function ({ json_source }) {
                      let jsonStructs =
                        xmlutils.xml2json.getStructJsonFromRawXml(json_source);
                      // function fn_to_json_value(refVal) {
                      //   let crtObj = {
                      //     ..._.get(refVal, "attr", {}),
                      //     content: _.get(refVal, "content"),
                      //   };
                      //   if (refVal.children) {
                      //     _.forEach(refVal.children, (x, d, n) => {
                      //       if (_.isNil(x.tagName)) {
                      //         crtObj[d] = x;
                      //       } else {
                      //         crtObj[x.tagName] = fn_to_json_value(x);
                      //       }
                      //     });
                      //   }
                      //   return crtObj;
                      // }
                      // fn_to_json_value(jsonStructs);
                      jsonStructs =
                        CodeGenDefinition.xmlutils.flatternStructJsonToKV(
                          jsonStructs
                        );
                      return JSON.stringify(jsonStructs, 0, 4);
                    },
                  });
                },
              },
            ],
            rightControls: [
              {
                label: t(`Programming Language`),
                jsx: <LangTypeSelect PUtils={PUtils} model={PUtils.crtModel} />,
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
                        left: PUtils.jsx.tabWithDefinition({
                          default_select_tab: "str",
                          key: "top_json_console",
                          list: [
                            {
                              label: t(`XML Source`),
                              jsx: observer((props) =>
                                PUtils.jsx.createGEditor({
                                  fontSize: 11,
                                  use_original_text: true,
                                  wordWrap: "off",
                                  key: "json_source",
                                  language: "html",
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
