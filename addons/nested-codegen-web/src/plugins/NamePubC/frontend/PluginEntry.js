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
  GSyncSelectWithFilter,
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
const rtext = {};
let appTitle = "Sundry Text";
let appName = appTitle;
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appName,
  viewName: appName,
};
const allLangs = [
  {
    label: `String`,
    value: "@string()",
  },
  {
    label: `Date`,
    value: "@date",
  },
  {
    label: `Date Time`,
    value: "@datetime",
  },
  // {
  //   label: `Color`,
  //   value: "@color",
  // },
  {
    label: `Color(hex)`,
    value: "@hex()",
  },
  {
    label: `Color(rgb)`,
    value: "@rgb()",
  },
  {
    label: `Color(rgba)`,
    value: "@rgba()",
  },
  {
    label: `Word`,
    value: "@word",
  },
  {
    label: `Title`,
    value: "@title",
  },
  {
    label: t(`Chinese Title`),
    value: "@ctitle",
  },
  {
    label: t(`First Name`),
    value: "@first()",
  },
  {
    label: t(`Last Name`),
    value: "@last()",
  },
  {
    label: t(`Person Name`),
    value: "@name",
  },
  {
    label: t(`Person Name`) + `(Three Words)`,
    value: "@name(true)",
  },
  {
    label: t(`First Name(Chinese)`),
    value: "@cfirst()",
  },
  {
    label: t(`Last Name(Chinese)`),
    value: "@clast()",
  },
  {
    label: t(`Person Name(Chinese)`),
    value: "@cname()",
  },
  {
    label: t(`URL`),
    value: "@url()",
  },
  {
    label: `GUID`,
    value: "@guid()",
  },
  {
    label: `Domain`,
    value: "@domain()",
  },
  {
    label: `Protocol`,
    value: "@protocol()",
  },
  {
    label: `E-Mail`,
    value: "@email()",
  },
  {
    label: `IPv4`,
    value: "@ip()",
  },
  {
    label: `tld`,
    value: "@tld()",
  },
  {
    label: t(`China Region`),
    value: "@region()",
  },
  {
    label: t(`China Province`),
    value: "@province()",
  },
  {
    label: t(`China Cities`),
    value: "@city()",
  },
  {
    label: t(`China Cities with Prefix`),
    value: "@city(true)",
  },
  {
    label: t(`China Village`),
    value: "@county",
  },
  {
    label: t(`China Village with Prefix`),
    value: "@county(true)",
  },
  {
    label: t(`China Zip Code`),
    value: "@zip",
  },
  {
    label: t(`China Resident ID`),
    value: "@id",
  },
  {
    label: t(`Increment Numeric Value`),
    value: "@increment",
  },
  {
    label: `A HH:mm:ss`,
    value: `@time("A HH:mm:ss")`,
  },
  {
    label: `a HH:mm:ss`,
    value: `@time("a HH:mm:ss")`,
  },
  {
    label: `Integer`,
    value: "@integer()",
  },
  {
    label: `Float`,
    value: "@float()",
  },
  {
    label: `Natural`,
    value: "@natural",
  },
  {
    label: "Character(aeiou)",
    value: '@character("aeiou")',
  },
];
window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState: async () => {
      await fn_otherPages.fn.loadStatic({
        PreRequisiteJson,
        gref,
      });
      return {
        generateType: "@string()",
        num_p: 100,
        textArr: [],
      };
    },
    menus: [
      {
        ...fn_otherPages.getForPlayGroundFirstLayerMenu(),
        children: [
          {
            ...fn_otherPages.getMockGeneratorMenu(),
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
        totalTitle: appTitle,
        left_hist_use_all: true,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;
          let lc_store = PUtils.crtStore;
          // useLocalStore(() => {
          //   return {
          //     textArr: [],
          //   };
          // });

          return PUtils.jsx.createPanelWithBtnControls({
            // helpBtnProps: {
            //   minimal: true,
            //   outlined: true,
            // },
            noShowHelpBtn: false,
            // helpBtnId: "ROOT_EXTENSION_ADDONS",
            fn_get_copy_result: () => {
              return PUtils.editor.getValue({
                id: "lc_text_content",
              });
            },
            controls: [
              {
                text: t(`Start Generating`),
                intent: "primary",
                loading_id: "encode_ROOT_EXTENSION_ADDONS_token_btn",
                onClick: async () => {
                  let finalVal = [];
                  for (let i = 0; i < PUtils.crtModel.num_p; i++) {
                    finalVal.push(Mock.mock(PUtils.crtModel.generateType));
                  }
                  PUtils.crtModel.textArr = finalVal;
                  PUtils.editor.setValue({
                    id: "lc_text_content",
                    value: _.join(finalVal, "\n"),
                  });
                },
              },
            ],
            rightControls: [
              {
                label: t(`Generate Type`),
                jsx: React.createElement(
                  observer((props) => {
                    let model = PUtils.crtModel;

                    return (
                      <div style={{ display: "inline-block" }}>
                        <GSyncSelectWithFilter
                          small={true}
                          obj={model}
                          list={allLangs}
                          index={"generateType"}
                          whenChg={(x) => {
                            model.generateType = x;
                          }}
                        />
                      </div>
                    );
                  })
                ),
              },
            ],
            body: (
              <div className="w100 h100">
                {React.createElement(
                  observer((props) => {
                    return PUtils.jsx.tabWithDefinition({
                      default_select_tab: "str",
                      key: "ROOT_EXTENSION_ADDONS_console",
                      list: [
                        {
                          label: t(`Text`),
                          id: "visual_text",
                          jsx: observer((props) => {
                            return (
                              <div style={{ padding: "10px" }}>
                                {_.isEmpty(PUtils.crtStore.model.textArr)
                                  ? t("The content is empty at present.")
                                  : ""}
                                {/* <div
                                  dangerouslySetInnerHTML={{
                                    __html: PUtils.crtStore.model.textArr + "",
                                  }}
                                ></div> */}
                                {_.map(
                                  PUtils.crtStore.model.textArr,
                                  (x, d, n) => {
                                    return <p key={d}>{x}</p>;
                                  }
                                )}
                              </div>
                            );
                          }),
                        },
                        {
                          label: t(`HTML`),
                          id: "html",
                          jsx: observer((props) => {
                            return PUtils.jsx.createGEditor({
                              fontSize: 11,
                              title: t(`Result Viewer`),
                              key: "lc_text_content",
                              language: "html",
                              wordWrap: "on",
                              initContent: ``,
                            });
                          }),
                        },
                        {
                          label: t(`Options`),
                          id: "option",
                          jsx: observer((props) => {
                            return React.createElement(
                              PUtils.fn.fn_form_jsx_by_config(() => [
                                {
                                  label: t(`Generate Size`),
                                  helperText: t(
                                    `This field can be used for specifying the size of generated result.`
                                  ),
                                  tag: GFormInput,
                                  tagProps: {
                                    type: "number",
                                    small: true,
                                    placeholder: `e.g. 100`,
                                    onChange(x) {
                                      PUtils.crtModel.num_p = x;
                                    },
                                    value: PUtils.crtModel.num_p,
                                  },
                                },
                              ])
                            );
                          }),
                        },
                      ].map((x) => {
                        x.mode_jsx_func = true;
                        return x;
                      }),
                    });
                  })
                )}
                {/* {PUtils.jsx.topBtmSpliter({
                  border: true,
                  percent: 0.4,
                  top: PUtils.jsx.panelWithTitle({
                    title: "Generate Options",
                    jsx: React.createElement(
                      observer((props) => {
                        return <div>options</div>;
                      })
                    ),
                  }),
                  btm:,
                })} */}
              </div>
            ),
          });
        }),
      })
    ),
  };
};
