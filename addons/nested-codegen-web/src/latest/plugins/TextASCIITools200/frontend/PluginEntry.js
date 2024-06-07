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

let appTitle = "ASCII <-> Text";
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
        wordWrap: "on",
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
                icon: "font",
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
      wordWrap: "on",
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
          label: t(`PlainText`),
          str: `
 create table if not exists g_proxy_config_rule(
    id int primary key auto_increment not null,
    config_id int not null,
    rule_name varchar(100),
    rule_brief varchar(250),
    dest_host varchar(100) not null,
    read_timeout int default -1,
    connect_timeout int default -1,
    max_connection int default -1,
    handle_compress int default 1,
    handle_redirect int default 1,
    keep_cookies int default 0,
    is_change_origin int default 0 comment 'keep_host',
    send_url_fragment int default 1,
    forward_ip int default 1,
    use_system_properties int default 1, 
    disable int default 0,
    create_time timestamp
 );        
 
`,
        },
        {
          label: t(`ASCII`),
          str: `10 32 99 114 101 97 116 101 32 116 97 98 108 101 32 105 102 32 110 111 116 32 101 120 105 115 116 115 32 103 95 112 114 111 120 121 95 99 111 110 102 105 103 95 114 117 108 101 40 10 32 32 32 32 105 100 32 105 110 116 32 112 114 105 109 97 114 121 32 107 101 121 32 97 117 116 111 95 105 110 99 114 101 109 101 110 116 32 110 111 116 32 110 117 108 108 44 10 32 32 32 32 99 111 110 102 105 103 95 105 100 32 105 110 116 32 110 111 116 32 110 117 108 108 44 10 32 32 32 32 114 117 108 101 95 110 97 109 101 32 118 97 114 99 104 97 114 40 49 48 48 41 44 10 32 32 32 32 114 117 108 101 95 98 114 105 101 102 32 118 97 114 99 104 97 114 40 50 53 48 41 44 10 32 32 32 32 100 101 115 116 95 104 111 115 116 32 118 97 114 99 104 97 114 40 49 48 48 41 32 110 111 116 32 110 117 108 108 44 10 32 32 32 32 114 101 97 100 95 116 105 109 101 111 117 116 32 105 110 116 32 100 101 102 97 117 108 116 32 45 49 44 10 32 32 32 32 99 111 110 110 101 99 116 95 116 105 109 101 111 117 116 32 105 110 116 32 100 101 102 97 117 108 116 32 45 49 44 10 32 32 32 32 109 97 120 95 99 111 110 110 101 99 116 105 111 110 32 105 110 116 32 100 101 102 97 117 108 116 32 45 49 44 10 32 32 32 32 104 97 110 100 108 101 95 99 111 109 112 114 101 115 115 32 105 110 116 32 100 101 102 97 117 108 116 32 49 44 10 32 32 32 32 104 97 110 100 108 101 95 114 101 100 105 114 101 99 116 32 105 110 116 32 100 101 102 97 117 108 116 32 49 44 10 32 32 32 32 107 101 101 112 95 99 111 111 107 105 101 115 32 105 110 116 32 100 101 102 97 117 108 116 32 48 44 10 32 32 32 32 105 115 95 99 104 97 110 103 101 95 111 114 105 103 105 110 32 105 110 116 32 100 101 102 97 117 108 116 32 48 32 99 111 109 109 101 110 116 32 39 107 101 101 112 95 104 111 115 116 39 44 10 32 32 32 32 115 101 110 100 95 117 114 108 95 102 114 97 103 109 101 110 116 32 105 110 116 32 100 101 102 97 117 108 116 32 49 44 10 32 32 32 32 102 111 114 119 97 114 100 95 105 112 32 105 110 116 32 100 101 102 97 117 108 116 32 49 44 10 32 32 32 32 117 115 101 95 115 121 115 116 101 109 95 112 114 111 112 101 114 116 105 101 115 32 105 110 116 32 100 101 102 97 117 108 116 32 49 44 32 10 32 32 32 32 100 105 115 97 98 108 101 32 105 110 116 32 100 101 102 97 117 108 116 32 48 44 10 32 32 32 32 99 114 101 97 116 101 95 116 105 109 101 32 116 105 109 101 115 116 97 109 112 10 32 41 59 32 32 32 32 32 32 32 32 10 32 10`,
        },
      ].filter((x) => !_.isNil(x)),
      fn_beforeActionBtn: ({ fn_formatSelfTranslate, PUtils }) => {
        return [
          {
            cid: "match",
            onClick: fn_formatSelfTranslate("convert"),
            label: t(`Text to ASCII`),
            intent: "primary",
          },
          {
            cid: "match2",
            intent: "primary",
            onClick: fn_formatSelfTranslate("re-convert"),
            label: t(`ASCII to Text`),
          },
        ];
      },

      mainBtnText: "HTML to React",
      language: "plaintext",
      handle: async (
        { leftValue, type = "match" },
        { crtStoreName, PUtils }
      ) => {
        let result = "";
        switch (type) {
          case "convert":
            result = leftValue;
            result = _.chain(leftValue)
              .split("")
              .map((x) => x.charCodeAt())
              .join(" ")
              .value();
            break;
          case "re-convert":
            result = leftValue;
            result = _.chain(leftValue)
              .trim()
              .split(" ")
              .map((x) => String.fromCharCode(parseInt(x)))
              .join("")
              .value();
            break;
        }
        return {
          result: result,
        };
      },
    }),
  };
};
