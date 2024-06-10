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
import xml_content from "../../XMLXPath/frontend/xml_content";
import PreRequisiteJson from "../pre-requisite.json";

let appName = "XML Query(JSoup)";

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
        config_result_type: "string",
        value_arr: [],
        config_json_flatten_type: "flatten_deeply",
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
            ...fn_otherPages.menu.getXmlHelper(),
            children: [
              {
                // https://developer.mozilla.org/en-US/docs/Web/XPath/Introduction_to_using_XPath_in_JavaScript
                label: metaObj.viewName,
                icon: "geosearch",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.form.xmlHelperRender({
      noTriggerWhenCall: false,
      trigger_when_any_editor_is_changed: true,
      right_lang: "xml",
      left_lang: "xml",
      // no_left_panel_btm: true,
      apiName: "xml_filter",
      metaObj,
      gref,
      btn_type: "xml_filter",
      default_handle_type: "xml_filter",
      PreRequisiteJson,
      exampleStr: xml_content.xml_str,
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            onClick: fn_formatSelfTranslate("xml_filter"),
            label: t(`Apply Selector`),
            intent: "primary",
          },
        ];
      },
      fn_configItem: ({ crtStoreName, PUtils }) => {
        return [
          {
            label: t("Result Type"),
            children: [
              {
                tag: Html_select,
                value: gstore.common_app[crtStoreName].model.config_result_type,
                list: [
                  {
                    label: t(`XML Type`),
                    value: "xml",
                  },
                  {
                    label: t(`String Type`),
                    value: "string",
                  },
                ],
                onChange: (x) => {
                  gstore.common_app[crtStoreName].model.config_result_type =
                    x.target.value;
                },
              },
            ],
          },
        ];
      },
      // handle: async ({ leftValue, type }, { crtStoreName, PUtils }) => {
      //   try {
      //     console.log("rendering v1", type, leftValue);
      //     let m = await gutils.opt("/common/format_for_xml", {
      //       VALUE: leftValue,
      //     });
      //     let str = m.content.result;
      //     return {
      //       result: str,
      //     };
      //   } catch (e) {
      //     return {
      //       result: `Error: ` + gutils.getErrMsg(e),
      //     };
      //   }
      // },
      default_select_tab: "scripts",
      fn_getConfigList({ PUtils, model, crtStore, crtStoreName, commonSave }) {
        return [
          {
            label: t(`XML Path`),
            id: "xml_path_selector",
            jsx: PUtils.jsx.createGEditor({
              fontSize: 11,
              title: t(`XML Path Selector`),
              key: "config_xml_path",
              onChange: (val) => {
                console.log("now the value is changed", val);
                PUtils.fn_trigger_it();
              },
              language: "markdown",
              initContent: [
                `# ${t(`Example as below`) + t(`(from w3c online sites)`)}`,
                `# ${t(`Select all the titles`)}`,
                `book > title`,
                `# ${t(`Select the title of the first book`)}`,
                `book:eq(0) > title`,
                `# ${t(`Select all the prices`)}`,
                `price`,
                `# ${t(
                  `Select all elements whose attribute name equals to category`
                )}`,
                `[category]`,
                `# ${t(
                  `Select all elements whose attribute equals to {0}, and it's placed under book.`,
                  `lang=en`
                )}`,
                `book [lang=en]`,
                "# " +
                  t(
                    `For more syntax rules, please refer to {0}`,
                    `https://jsoup.org/apidocs/org/jsoup/select/Selector.html`
                  ),
              ].join("\n"),
            }),
          },
        ].filter((x) => !_.isNil(x));
      },
      fn_rightPanelProps: ({ PUtils }) => {
        let model = PUtils.crtModel;
        let crtStore = PUtils.crtStore;
        let crtStoreName = PUtils.crtStoreName;
        let commonSave = PUtils.commonSave;
        return {
          percent: 0.5,
          jsx: PUtils.jsx.panelWithTitle({
            title: t("Output for Each Expression"),
            jsx: React.createElement(
              observer((props) =>
                PUtils.jsx.tabWithDefinition({
                  list: _.map(PUtils.crtModel.value_arr, (x, d, n) => {
                    return {
                      label: t(`Result-{0}`, "" + (d + 1)),
                      id: `xml-result-${d}`,
                      mode_jsx_func: true,
                      jsx: observer((props) =>
                        PUtils.jsx.createGEditor({
                          title: x.id,
                          fontSize: 11,
                          wordWrap: "on",
                          key: "xml-result-" + d,
                          language: "html",
                        })
                      ),
                    };
                  }),
                  key: "xml_html_codeconfig_r",
                })
              )
            ),
          }),
        };
      },
    }),
  };
};
