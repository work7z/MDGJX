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
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import PreRequisiteJson from "../pre-requisite.json";

let appTitle = "Multi-Line <-> One-Line";
let appName = appTitle;
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appName,
  viewName: appName,
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    // notReady: !gutils.dev(),
    // willReadyVersion: `v1.6.6`,
    initialState() {
      return {
        ipt_jointer: "",
        ipt_spliter: "",
        config_json_flatten_type: "flatten_deeply",
        config_text_sort_order: "asc",
        myvalue: 12345,
        ipt_text: "",
        rpl_text: "",
        ipt_mode_arr: ["g"],
      };
    },
    menus: [
      {
        pid: "text",
        children: [
          {
            pid: "textcase",
            children: [
              {
                label: appTitle,
                icon: "new-link",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render: fn_otherPages.simpleLeftRightConvertor({
      fn_leftPanelProps: fn_otherPages.jsx.createProcedurePanel(
        ({ PUtils }) => {
          return {
            index: "regex_settings",
            arr: [
              {
                label: t(`Settings`),
                id: "regex_settings",
                mode_jsx_func: true,
                jsx: observer((props) =>
                  React.createElement(
                    observer(
                      PUtils.fn.fn_form_jsx_by_config(() => [
                        {
                          label: t(`One Line Jointer`) + t(`(Optional)`),
                          helperText: t(
                            `This option is used for joining multiple lines into one line, you can specify the join character here.`
                          ),
                          tag: GFormInput,
                          tagProps: {
                            small: true,
                            noTranslate: true,
                            placeholder: t(
                              `For instance, you can use {0} to join them up.`,
                              "\\n"
                            ),
                            onChange(x) {
                              PUtils.crtModel.ipt_jointer = x;
                            },
                            value: PUtils.crtModel.ipt_jointer || "",
                          },
                        },
                        {
                          label: t(`Multiple Line Spliter`) + t(`(Optional)`),
                          helperText: t(
                            `This option is used for splitting one line into multiple lines, you can specify the spliter character here.`
                          ),
                          tag: GFormInput,
                          tagProps: {
                            small: true,
                            noTranslate: true,
                            placeholder: t(
                              `For instance, you can use {0} to split the line into multiple lines.`,
                              ";"
                            ),
                            onChange(x) {
                              PUtils.crtModel.ipt_spliter = x;
                            },
                            value: PUtils.crtModel.ipt_spliter || "",
                          },
                        },
                      ])
                    )
                  )
                ),
              },
            ],
          };
        }
      ),
      noTriggerWhenCall: true,
      type: "plaintext",
      fontSize: 12,
      totalTitle: appName,
      noSources: false,
      exampleStr: gutils.example_json,
      fn_beforeActionBtn: ({ fn_formatSelfTranslate, PUtils }) => {
        return [
          {
            cid: "replace",
            onClick: fn_formatSelfTranslate("multi_to_one"),
            label: t(`Multiple Lines to One Line`),
            intent: "primary",
          },
          {
            cid: "match",
            onClick: fn_formatSelfTranslate("one_to_multi"),
            label: t(`One Line to Multiple Lines`),
            intent: "primary",
          },
        ];
      },
      mainBtnText: "HTML to React",
      language: "markdown",
      handle: async (
        { leftValue, type = "match" },
        { crtStoreName, PUtils }
      ) => {
        let result = "";
        switch (type) {
          case "multi_to_one":
            result = _.join(
              _.split(leftValue.replaceAll(/\r\n/g, "\n"), "\n"),
              PUtils.crtModel.ipt_jointer
            );
            break;
          case "one_to_multi":
            // gutils.alert({
            //   intent: "success",
            //   message: t(
            //     "Tips: this button can be used when your text contains \\n characters, then we will convert it as multiple lines for you."
            //   ),
            // });
            result = _.join(
              _.split(leftValue, PUtils.crtModel.ipt_spliter),
              "\n"
            );
            break;
        }
        return {
          result: result,
        };
      },
      fn_configItem: ({ crtStoreName, PUtils }) => [],
    }),
  };
};
