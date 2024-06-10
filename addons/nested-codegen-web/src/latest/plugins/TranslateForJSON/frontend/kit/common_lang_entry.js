const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  GFormSwitch,
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
  GSyncSelectWithFilter,
  Provider,
  Router,
  GFormInput,
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
import FormNoData from "../cpt/FormNoData";
import PlainTextLoggins from "../cpt/FormPlainTextLoggins/index";
import fn_otherPages from "../pages/otherPages";
import beanutils from "./beanutils";
import init_model from "./common_lang_status";
import all_lang_tempaltes from "./common_lang_template";
import cutils from "./common_utils";
import common_lang_function from "./common_lang_function";

const monacoLangMappings = {
  PHP: "php",
  cpp: "cpp",
  go: "go",
  python: "python",
  csharp: "csharp",
  java: "java",
  scala: "scala",
  kotlin: "kotlin",
  groovy: "groovy",
  javascript: "javascript",
  typescript: "typescript",
  coffeescript: "coffeescript",
  ecmahelper: "javascript",
  other: "java",
};
const common_lang_entry = {
  cpt: {
    LangTypeSelect: observer((props) => {
      let { model, PUtils } = props;
      const allLangs = common_lang_entry.allLangs;
      return (
        <div style={{ display: "inline-block" }}>
          <GSyncSelectWithFilter
            small={true}
            obj={model}
            list={allLangs}
            index={"language_type"}
            whenChg={(x) => {
              model.language_type = x;
              let dft_language_type = x;
              let x1 = _.find(
                common_lang_entry.allLangs,
                (x) => x.value == dft_language_type
              );
              let language_template = _.get(x1, "language_template");
              let language_script = _.get(x1, "language_script");
              setTimeout(() => {
                PUtils.editor.setValue({
                  id: "language_script",
                  value: !_.isEmpty(language_script)
                    ? language_script
                    : "// " + t(`Definition Not Found`),
                });
              }, 10);
              setTimeout(() => {
                PUtils.editor.setValue({
                  id: "language_template",
                  value: !_.isEmpty(language_template)
                    ? language_template
                    : t(`Template Not Found`),
                });
              }, 10);
            }}
          />
        </div>
      );
    }),
  },
  beanutils,
  fn: common_lang_function({}),
  fn_randomTitleArr: () => [
    t(`Pure FrontEnd Implementation, No Sensitive Data Concerns.`),
    t(
      `If you want to show results separately, you can disable All In One Mode.`
    ),
    t(
      `{0} is a Pure FrontEnd Template Engine, if you need another template engine please tell us.`,
      `Handlebars.js`
    ),
    t(`This extension supports multiple language templates.`),
    t(
      `If there's no template you wanted, you can define a new language template by yourself.`
    ),
    t(`Much appreciate if you share us another language template you defined`),
    t(`Our extension supports generating default value as well!`),
    t(`More options can be used for more intelligent results.`),
    t(
      `Except for this functionality, appreciate if you send feedback to us for any conversion tool you need.`
    ),
    t(
      `Except for modifying the template, you can append the model value as well.`
    ),
  ],
  jsx_btm_result_panel({ PUtils }) {
    return React.createElement(
      observer((props) => {
        return PUtils.jsx.tabWithDefinition({
          default_select_tab: "str",
          key: "model_result_or_loggings",
          list: [
            ...(true || PUtils.crtModel.language_all_in_one == "true"
              ? [
                  {
                    label: t(`Result`),
                    id: "result-0",
                    mode_jsx_func: true,
                    jsx: observer((props) => {
                      let bodySwitch = PUtils.jsx.createGEditor({
                        use_target_text: true,
                        fontSize: 11,
                        wordWrap: "off",
                        key: "model_gen_result",
                        language:
                          monacoLangMappings[PUtils.crtModel.language_type],
                        initContent: ``,
                      });
                      if (PUtils.crtModel.language_all_in_one == "true") {
                        return bodySwitch;
                      } else {
                        return PUtils.jsx.createPanelWithBtnControls({
                          controls: [
                            {
                              label: t(`Generated Classes`),
                              jsx: React.createElement(
                                observer((props) => {
                                  return (
                                    <GSyncSelectWithFilter
                                      small={true}
                                      obj={PUtils.crtModel}
                                      list={_.map(
                                        PUtils.crtModel
                                          .language_clazz_result_list,
                                        (x) => ({
                                          label: x.className,
                                          value: x.className,
                                          desc_label: x.fieldsNum,
                                        })
                                      )}
                                      index={"option_showing_model_result"}
                                      whenChg={(x) => {
                                        model.option_showing_model_result = x;
                                      }}
                                    />
                                  );
                                })
                              ),
                            },
                          ],
                          body: _.isNil(
                            PUtils.crtModel.option_showing_model_result
                          ) ? (
                            <FormNoData />
                          ) : (
                            PUtils.jsx.createGEditor({
                              title:
                                t(`Result Viewer`) +
                                ` - ${PUtils.crtModel.option_showing_model_result}`,
                              fontSize: 11,
                              wordWrap: "off",
                              key:
                                "model_result_" +
                                PUtils.crtModel.option_showing_model_result,
                              language:
                                monacoLangMappings[
                                  PUtils.crtModel.language_type
                                ],
                            })
                          ),
                        });
                      }
                    }),
                  },
                ]
              : _.map(PUtils.crtModel.language_clazz_result_list, (x, d, n) => {
                  return {
                    label: x.className,
                    id: x.className,
                    jsx: observer((props) =>
                      PUtils.jsx.createGEditor({
                        title: t(`Result Viewer`),
                        fontSize: 11,
                        wordWrap: "on",
                        key: "model_result_" + x.className,
                        language: PUtils.crtModel.language_type,
                      })
                    ),
                  };
                })),
            {
              label: t(`Loggings`),
              id: "loggings",
              jsx: observer((props) => (
                <PlainTextLoggins
                  // m_id={m_id}
                  logs={(PUtils.crtModel.loggings_array || []).join("\n")}
                ></PlainTextLoggins>
              )),
            },
          ].map((x) => {
            x.mode_jsx_func = true;
            return x;
          }),
        });
      })
    );
  },
  allLangs: all_lang_tempaltes,
  jsx_langConfig({ PUtils }) {
    return PUtils.jsx.tabWithDefinition({
      default_select_tab: "str",
      key: "top_model_config",
      list: [
        {
          label: t(`Config`),
          mode_jsx_func: true,
          jsx: observer((props) => {
            return React.createElement(
              observer(
                PUtils.fn.fn_form_jsx_by_config(() => [
                  {
                    label: t(`All In One?`),
                    tag: GFormSwitch,
                    helperText: t(
                      `By Default, CodeGen will output all results into the same tab. If you need to output these results separately, please turn it off.`
                    ),
                    tagProps: {
                      valtype: "tf",
                      onChange(x) {
                        PUtils.crtModel.language_all_in_one = x;
                      },
                      value: PUtils.crtModel.language_all_in_one,
                    },
                  },
                  {
                    label: t(`Formatting the Source`),
                    tag: GFormSwitch,
                    helperText: t(
                      `By Default, CodeGen needs to purify the value via server API in fear of any compatiblity issue while running the task. If you don't need this option, please turn it off.`
                    ),
                    tagProps: {
                      valtype: "tf",
                      onChange(x) {
                        console.log("using the formatting", x);
                        PUtils.crtModel.language_format_source = x;
                      },
                      value: PUtils.crtModel.language_format_source,
                    },
                  },
                  {
                    label: t(`Enable Default Value`),
                    tag: GFormSwitch,
                    helperText: t(
                      `Since each field has its value in the source value, if you need to set the source field value as its default value, please turn it on.`
                    ),
                    tagProps: {
                      valtype: "tf",
                      onChange(x) {
                        PUtils.crtModel.language_show_dft_value = x;
                      },
                      value: PUtils.crtModel.language_show_dft_value,
                    },
                  },
                  {
                    label: t(`Show Debug Loggings`),
                    tag: GFormSwitch,
                    helperText: t(
                      `By Default, CodeGen will disable this option to save page memory, but you can turn it on if you need to investigate on the model value while modifying the template.`
                    ),
                    tagProps: {
                      valtype: "tf",
                      onChange(x) {
                        PUtils.crtModel.language_debug_model = x;
                      },
                      value: PUtils.crtModel.language_debug_model,
                    },
                  },
                ])
              )
            );
          }),
        },
        {
          label: t(`Template`),
          mode_jsx_func: true,
          jsx: observer((props) =>
            PUtils.jsx.createGEditor({
              title: t(`Using {0} Template as its renderer`, `Handlebars.js`),
              fontSize: 11,
              wordWrap: "off",
              key: "language_template",
              language: "handlebars",
              initContent: ``,
            })
          ),
        },
        {
          label: t(`Model`),
          mode_jsx_func: true,
          jsx: observer((props) =>
            PUtils.jsx.tabWithDefinition({
              default_select_tab: "str",
              key: "top_model_config_select",
              list: [
                {
                  label: t(`System Definition`),
                  jsx: PUtils.jsx.createGEditor({
                    title: t(`System Script`),
                    fontSize: 11,
                    wordWrap: "off",
                    key: "language_script",
                    language: "javascript",
                    initContent: ``,
                  }),
                },
                {
                  label: t(`User Definition`),
                  jsx: PUtils.jsx.createGEditor({
                    title: t(`User Script`),
                    fontSize: 11,
                    wordWrap: "off",
                    key: "language_user_script",
                    language: "javascript",
                    initContent: ``,
                  }),
                },
              ],
            })
          ),
        },
      ].map((x) => {
        x.mode_jsx_func = true;
        return x;
      }),
    });
  },
  init_model: init_model,
};

export default common_lang_entry;
