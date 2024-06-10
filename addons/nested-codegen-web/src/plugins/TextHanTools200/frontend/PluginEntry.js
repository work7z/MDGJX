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

let appTitle = "Chinese Han Tools";
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
        target_c_type: "camelCase",
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
                icon: "citation",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
      // {
      //   ...fn_otherPages.menu.obj_trans_playground,
      //   children: [
      //     {
      //       ...fn_otherPages.menu.obj_playground_exps,
      //       children: [
      //         {
      //           label: appTitle,
      //           icon: "application",
      //           pid: "ROOT_EXTENSION_ADDONS",
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
    render: fn_otherPages.simpleLeftRightConvertor({
      fn_configItem_NOUSE: ({ crtStoreName, PUtils }) => {
        let model = PUtils.crtModel;
        let crtStore = PUtils.crtStore;
        let crtModel = PUtils.crtModel;
        let commonSave = PUtils.commonSave;
        window.testing = 1;
        const m_list = [
          {
            label: t(`Underline`),
            value: "snakeCase",
          },
          {
            label: t(`Camel Case`),
            value: "camelCase",
          },
          {
            label: t("Capitalize Word"),
            value: "capitalize",
          },
          {
            label: t(`Strikethrough`),
            value: "kebabCase",
          },
          {
            label: t("Deburr"),
            value: "deburr",
          },
          {
            label: `Upper Case`,
            value: "upperCase",
          },
          {
            label: `Upper First`,
            value: "upperFirst",
          },
          {
            label: `Lower Case`,
            value: "lowerCase",
          },
          {
            label: `Lower First`,
            value: "lowerFirst",
          },
          {
            label: `Trim`,
            value: "trim",
          },
          {
            label: `Trim Start`,
            value: "trimStart",
          },
          {
            label: `Trim End`,
            value: "trim end",
          },
          {
            label: `Escape RegExp`,
            value: "escapeRegExp",
          },
          {
            label: `Escape HTML`,
            value: "escape",
          },
          {
            label: `Unescape HTML`,
            value: "unescape",
          },
        ];
        return [
          {
            label: t(`Target Formatting`),
            children: [
              {
                label: t(`Target Formatting`),
                helperText: t(
                  `Please specify the target formatting before starting the conversion.`
                ),
                tag: GFormSelect,
                list: m_list,
                onChange(x) {
                  PUtils.crtModel.target_c_type = x.target.value;
                },
                value: PUtils.crtModel.target_c_type,
              },
            ],
          },
        ];
      },
      fn_leftPanelProps_NOUSE: fn_otherPages.jsx.createProcedurePanel(
        ({ PUtils }) => {
          return {
            index: "regex_settings",
            arr: [
              {
                label: t(`Conversion`),
                id: "regex_settings",
                mode_jsx_func: true,
                jsx: observer((props) =>
                  React.createElement(
                    observer(
                      PUtils.fn.fn_form_jsx_by_config(() => {
                        return [];
                      })
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
      exampleArr: [
        {
          label: t(`Simplified Chinese`),
          str: `滕王高阁临江渚，佩玉鸣鸾罢歌舞。
画栋朝飞南浦云，珠帘暮卷西山雨。
闲云潭影日悠悠，物换星移几度秋。
阁中帝子今何在？槛外长江空自流。`,
        },
        {
          label: t(`Traditional Chinese`),
          str: `滕王高閣臨江渚，佩玉鳴鸞罷歌舞。
畫棟朝飛南浦雲，珠簾暮卷西山雨。
閒雲潭影日悠悠，物換星移幾度秋。
閣中帝子今何在？檻外長江空自流。`,
        },
      ],
      fn_beforeActionBtn: ({ fn_formatSelfTranslate, PUtils }) => {
        return [
          {
            cid: "match",
            onClick: fn_formatSelfTranslate("cn-hk"),
            label: t(`zh-CN to zh-HK`),
            intent: "primary",
          },
          {
            cid: "match",
            onClick: fn_formatSelfTranslate("hk-cn"),
            label: t(`zh-HK to zh-CN`),
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
        let { content } = await gutils.opt("/pub/get_chinese_converter", {
          DATA: leftValue,
          finalToType: type,
        });
        result = content.T_RESULT;
        // switch (type) {
        //   case "cn-hk":
        //     break;
        //   case "hk-cn":
        //     let { content } = await gutils.opt("/pub/get_chinese_converter", {
        //       DATA: leftValue,
        //     });
        //     result = content.T_RESULT;
        //     break;
        // }
        return {
          result: result,
        };
      },
    }),
  };
};
