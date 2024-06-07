const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  GFormInput,
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
  GSyncSelectWithFilter,
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
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import PreRequisiteJson from "../pre-requisite.json";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = `PlainText`;

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState() {
      return {
        config_line_output_sep_char: "\\n",
        config_r_gen_size: "100",
        config_r_max: "8",
        config_r_min: "1",
        config_r_gen_char_length: "10",
        config_gen_text_type: "string",
        config_r_gen_seeds: "ABCDE",
      };
    },
    menus: [
      {
        pid: "text",
        children: [
          {
            pid: "random",
            children: [
              {
                label: appTitle,
                icon: "social-media",
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
      fn_otherPages.simpleLeftRightConvertor({
        noTriggerWhenCall: true,
        // noSources: false,
        syncView: true,
        type: "plaintext",
        fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
          return [
            {
              onClick: fn_formatSelfTranslate("generate"),
              label: t(`Generate Text`),
              intent: "primary",
            },
          ];
        },
        totalTitle: `Random Plain Text`,
        language: "markdown",
        handle: async (
          { leftValue, type = "generate" },
          { crtStoreName, PUtils }
        ) => {
          console.log("rendering v1", type, leftValue);
          let str = leftValue;
          let { data } = await gref.optAPI("proxy_transform", {
            ...PUtils.crtModel,
            config_charset: "UTF-8",
            text: str,
            type: type,
          });
          return {
            result: data.value,
          };
        },
        fn_configItem: ({ crtStoreName, PUtils }) => {
          let model = gstore.common_app[crtStoreName].model;
          return [
            {
              label: t("Random Type"),
              children: [
                {
                  tag: GSyncSelectWithFilter,
                  index: "config_gen_text_type",
                  obj: model,
                  whenChg: (x) => {
                    model.config_gen_text_type = x;
                  },
                  list: [
                    {
                      label: "String",
                      value: "string",
                    },
                    {
                      label: "String from Seeds",
                      value: "string_from_seeds",
                    },
                    {
                      label: "String(UpperCase Only)",
                      value: "string_upper",
                    },
                    {
                      label: "String(LowerCase Only)",
                      value: "string_lower",
                    },
                    {
                      label: "UUID",
                      value: "uuid",
                    },
                    {
                      label: "Integer",
                      value: "integer",
                    },
                    {
                      label: "Decimal",
                      value: "decimal",
                    },
                  ].map((x) => {
                    return {
                      ...x,
                      label: t(x.label),
                    };
                  }),
                },
              ],
            },
          ];
        },
        fn_leftPanelProps: ({ PUtils }) => {
          let model = PUtils.crtModel;
          let crtStore = PUtils.crtStore;
          let crtStoreName = PUtils.crtStoreName;
          let commonSave = PUtils.commonSave;
          let default_select_tab = "config";
          return {
            percent: 0,
            jsx: PUtils.jsx.panelWithTitle({
              title: "Procedure",
              jsx: React.createElement(
                observer((props) => {
                  return PUtils.jsx.tabWithDefinition({
                    default_select_tab: default_select_tab,
                    list: [
                      {
                        label: t(`Config`),
                        id: "config",
                        mode_jsx_func: true,
                        jsx: PUtils.fn.fn_form_jsx(
                          (props) => {
                            let { config_gen_text_type } = PUtils.crtModel;
                            window.config_gen_text_type = config_gen_text_type;
                            return [
                              <FormGroup
                                helperText={t("The size for output results")}
                                label={t("Generate Size")}
                              >
                                <GFormInput
                                  type="number"
                                  onChange={(val) => {
                                    model["config_r_gen_size"] = val;
                                  }}
                                  value={model["config_r_gen_size"]}
                                />
                              </FormGroup>,
                              <FormGroup
                                helperText={t(
                                  "By default, CodeGen will use \\n as the line separator for joining these result sets, namely the new line character."
                                )}
                                label={t("Line Separator")}
                              >
                                <GFormInput
                                  valtype={"tf"}
                                  onChange={(val) => {
                                    model["config_line_output_sep_char"] = val;
                                  }}
                                  value={model["config_line_output_sep_char"]}
                                />
                              </FormGroup>,
                              [
                                "string",
                                "string_lower",
                                "string_upper",
                                "uuid",
                                "integer",
                                "string_from_seeds",
                              ].indexOf(config_gen_text_type) != -1 ? (
                                <FormGroup
                                  helperText={t(
                                    "The character length of each generated result"
                                  )}
                                  label={t("Length")}
                                >
                                  <GFormInput
                                    type="number"
                                    onChange={(val) => {
                                      model["config_r_gen_char_length"] = val;
                                    }}
                                    value={model["config_r_gen_char_length"]}
                                  />
                                </FormGroup>
                              ) : null,
                              ["string_from_seeds"].indexOf(
                                config_gen_text_type
                              ) != -1 ? (
                                <FormGroup
                                  helperText={t(
                                    "The random type you selected support inputting base string as seeds of generator."
                                  )}
                                  label={t("Seeds")}
                                >
                                  <GFormInput
                                    onChange={(val) => {
                                      model["config_r_gen_seeds"] = val;
                                    }}
                                    value={model["config_r_gen_seeds"]}
                                  />
                                </FormGroup>
                              ) : null,
                              ...(["decimal"].indexOf(config_gen_text_type) !=
                              -1
                                ? [
                                    <FormGroup
                                      helperText={t(
                                        "The minimum for each result"
                                      )}
                                      label={t("Min")}
                                    >
                                      <GFormInput
                                        type="number"
                                        onChange={(val) => {
                                          model["config_r_min"] = val;
                                        }}
                                        value={model["config_r_min"]}
                                      />
                                    </FormGroup>,
                                    <FormGroup
                                      helperText={t(
                                        "The maximum for each result"
                                      )}
                                      label={t("Max")}
                                    >
                                      <GFormInput
                                        type="number"
                                        onChange={(val) => {
                                          model["config_r_max"] = val;
                                        }}
                                        value={model["config_r_max"]}
                                      />
                                    </FormGroup>,
                                  ]
                                : []),
                            ].filter((x) => !_.isNil(x));
                          },
                          {
                            style: {
                              padding: "12px",
                            },
                          }
                        ),
                      },
                    ],
                    key: metaObj.appId + "config",
                  });
                })
              ),
            }),
          };
        },
      })
    ),
  };
};
