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
  GFormInput,
  Tag,
  Popover,
  GSyncSelectWithFilter,
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
import PreRequisiteJson from "../pre-requisite.json";
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import FormLabelTextInput from "../../TranslateForJSON/frontend/cpt/FormLabelTextInput";
import "./myfile.less";
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import mappingLogic from "./key";
import EmptyNoKey from "./kit/EmptyNoKey";
import PermanentTerminalView from "./kit/PermanentTerminalView";
import FormQueryList from "../../TranslateForJSON/frontend/cpt/FormQueryList";
import LoadingItem from "./kit/LoadingItem";

let appTitle = "ManPage for Linux";
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appTitle,
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    unlimited_view_mode: true,
    initialState: () => {
      return {
        config_page_combine_value: {
          config_page_manpage_id: "man1",
          config_page_mandetail_id: "find",
        },
        config_manpage_search_str: "",
        config_page_lang: getCrtLang(),
        config_page_mandetail_id: "find",
        config_page_manpage_id: "man1",
        config_page_manpage_select_id: "man1",
        decode_obj: {},
      };
    },
    menus: [
      {
        ...fn_otherPages.menu.getDocRootMenu(),
        children: [
          {
            ...fn_otherPages.menu.getGeneralDocsMenu(),
            children: [
              {
                label: metaObj.appName,
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
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;
          PUtils.makeLeftHide();
          let lc_store = useLocalStore(() => {
            return {
              loading_pageData: false,
              loading_menuData: false,
              pageData: ``,
              menuData: {},
            };
          });
          let list_for_manpage_arr = [
            {
              label: t(`All types`),
              value: "all",
              desc_label: t(`All Manpages`),
            },
            {
              label: `Man1`,
              value: "man1",
              desc_label: t(`General commands`),
            },
            {
              label: `Man2`,
              value: "man2",
              desc_label: t(`System calls`),
            },
            {
              label: `Man3`,
              value: "man3",
              desc_label: t(
                `	Library functions, covering in particular the C standard library`
              ),
            },
            {
              label: `Man4`,
              value: "man4",
              desc_label: t(
                `	Special files (usually devices, those found in /dev) and drivers`
              ),
            },
            {
              label: `Man5`,
              value: "man5",
              desc_label: t(`File formats and conventions`),
            },
            {
              label: `Man6`,
              value: "man6",
              desc_label: t(`Games and screensavers`),
            },
            {
              label: `Man7`,
              value: "man7",
              desc_label: t(`Miscellaneous`),
            },
            {
              label: `Man8`,
              value: "man8",
              desc_label: t(`System administration commands and daemons`),
            },
          ];
          let model = crtModel;
          useEffect(() => {
            let a = autorun(() => {
              PUtils.commonSave();
            });
            return () => {
              a();
            };
          }, []);
          let m_callPageDetail = async () => {
            try {
              if (_.isEmpty(model.config_page_combine_value)) {
                return;
              }
              let { config_page_combine_value } = model;
              let args = {
                config_page_mandetail_id:
                  config_page_combine_value.config_page_mandetail_id,
                config_page_manpage_id:
                  config_page_combine_value.config_page_manpage_id,
                config_page_lang: crtModel.config_page_lang,
              };
              lc_store.loading_pageData = true;
              let {
                data: { value },
              } = await gref.optAPI(`get_page_data`, args);

              console.log("now the value is ", value);
              lc_store.pageData = value;
              lc_store.loading_pageData = false;
            } catch (e) {
              console.log("e", e);
              lc_store.loading_pageData = false;
            }
          };
          useEffect(() => {
            let fn = autorun(() => {
              m_callPageDetail();
              return {
                ...args,
              };
            });
            return () => {
              fn();
            };
          }, []);
          useEffect(() => {
            let fn = autorun(() => {
              let args = {
                config_page_lang: crtModel.config_page_lang,
              };
              (async () => {
                lc_store.loading_menuData = true;
                try {
                  let {
                    data: { value },
                  } = await gref.optAPI(`get_app_lang`, args);
                  lc_store.menuData = value;
                  lc_store.loading_menuData = false;
                } catch (e) {
                  console.log(e);
                  lc_store.loading_menuData = false;
                }
              })();
              return {
                ...args,
              };
            });
            return () => {
              fn();
            };
          }, []);
          gutils.once("ask-for-chinese", () => {
            if (getCrtLang() == "zh_CN" || getCrtLang() == "zh_HK") {
              gutils.confirmIfNotClickOk(
                "ask-lang-forchinese",
                t(
                  `Hi, CodeGen collected and organized these Chinese docs as many as we can, yet there're still lots of manpages hasn't been translated so far. Based on that, if you saw any English version though you chosen Chinese language, that's normal and not a bug. Please be assured that we will provide related Chinese version of docs later.`
                ),
                () => {},
                {
                  fn_first: () => {},
                  needBothSet: true,
                  title: "Friendly Reminder",
                  cancelText: "OK, That's fine.",
                  cancelIntent: "primary",
                }
              );
            }
          });
          return PUtils.jsx.createPanelWithBtnControls({
            controls: [
              {
                label: t(`ManPage Type`),
                jsx: React.createElement(
                  observer((props) => {
                    return (
                      <GSyncSelectWithFilter
                        small={true}
                        obj={PUtils.crtModel}
                        list={list_for_manpage_arr}
                        index={"config_page_manpage_select_id"}
                        whenChg={(x) => {
                          model.config_page_manpage_select_id = x;
                        }}
                      />
                    );
                  })
                ),
              },
              {
                label: t(`ManPage Search`),
                jsx: React.createElement(
                  observer((props) => {
                    return (
                      <div style={{ display: "inline-block" }}>
                        <GFormInput
                          small={true}
                          placeholder={t(`Searching by name...`)}
                          onChange={(val) => {
                            model["config_manpage_search_str"] = val;
                          }}
                          value={model["config_manpage_search_str"]}
                        />
                      </div>
                    );
                  })
                ),
              },
            ],
            showAppLang: true,
            rightControls: [],
            body: React.createElement(
              observer((props) => {
                return (
                  <div className="w100 h100">
                    {PUtils.jsx.leftRightSpliter({
                      // border: true,
                      defaultLeftWidthValue: 250,
                      left: React.createElement(
                        observer((props) => {
                          return PUtils.jsx.tabWithDefinition({
                            default_select_tab: "str",
                            key: "manpage_list",
                            list: [
                              {
                                label: t(`ManPage List`),
                                jsx: observer((props) => {
                                  if (lc_store.loading_menuData) {
                                    return <LoadingItem />;
                                  }
                                  return (
                                    <div
                                      style={{
                                        padding: "10px 8px",
                                        paddingBottom: "10px",
                                      }}
                                    >
                                      {_.map(
                                        _.filter(list_for_manpage_arr, (x) => {
                                          if (x.value == "all") {
                                            return;
                                          }
                                          if (
                                            model.config_page_manpage_select_id !=
                                            "all"
                                          ) {
                                            if (
                                              x.value !=
                                              model.config_page_manpage_select_id
                                            ) {
                                              return false;
                                            } else {
                                              return true;
                                            }
                                          } else {
                                            return true;
                                          }
                                        }),
                                        (eachListItem) => {
                                          return (
                                            <div key={eachListItem.value}>
                                              <h4
                                                style={{
                                                  marginTop: "10px",
                                                  marginBottom: "10px",
                                                  textAlign: "center",
                                                }}
                                              >
                                                {eachListItem.desc_label}(
                                                {eachListItem.label})
                                              </h4>
                                              <ul
                                                style={{
                                                  marginTop: "5px",
                                                  paddingLeft: "32px",
                                                }}
                                              >
                                                {_.map(
                                                  _.sortBy(
                                                    _.filter(
                                                      _.keys(
                                                        lc_store.menuData[
                                                          eachListItem.value
                                                        ]
                                                      ),
                                                      (x, d, n) => {
                                                        if (
                                                          _.trim(
                                                            model.config_manpage_search_str
                                                          ) == ""
                                                        ) {
                                                          return true;
                                                        } else {
                                                          return (
                                                            _.toLower(
                                                              x
                                                            ).indexOf(
                                                              _.toLower(
                                                                model.config_manpage_search_str
                                                              )
                                                            ) != -1
                                                          );
                                                        }
                                                      }
                                                    ),
                                                    (x) => {
                                                      return (
                                                        [
                                                          `find`,
                                                          `pwd`,
                                                          `ls`,
                                                          `tee`,
                                                          `mkdir`,
                                                          `bind`,
                                                          `execve`,
                                                          `close`,
                                                          `stty`,
                                                          `exit`,
                                                          `query_mode`,
                                                        ].indexOf(x) * -1
                                                      );
                                                    }
                                                  ),
                                                  (x, d, n) => {
                                                    let crtObjVal =
                                                      lc_store.menuData[
                                                        eachListItem.value
                                                      ][x];
                                                    return (
                                                      <li key={x}>
                                                        <a
                                                          href="javascript:void(0);"
                                                          onClick={() => {
                                                            if (
                                                              eachListItem.value !=
                                                              model.config_page_manpage_id
                                                            ) {
                                                              gutils.defer(
                                                                () => {
                                                                  m_callPageDetail();
                                                                }
                                                              );
                                                            }
                                                            model.config_page_manpage_id =
                                                              eachListItem.value;
                                                            model.config_page_mandetail_id =
                                                              x;
                                                            model.config_page_combine_value =
                                                              {
                                                                config_page_manpage_id:
                                                                  model.config_page_manpage_id,
                                                                config_page_mandetail_id:
                                                                  model.config_page_mandetail_id,
                                                              };
                                                          }}
                                                          style={{
                                                            color:
                                                              model.config_page_mandetail_id ==
                                                              x
                                                                ? "var(--app-text-green)"
                                                                : null,
                                                          }}
                                                        >
                                                          {decodeURIComponent(
                                                            x
                                                          ) +
                                                            (model.config_page_mandetail_id ==
                                                            x
                                                              ? `*`
                                                              : "")}
                                                          (
                                                          {Math.ceil(
                                                            crtObjVal / 1000
                                                          ) + "KB"}
                                                          )
                                                        </a>
                                                      </li>
                                                    );
                                                  }
                                                )}
                                              </ul>
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  );
                                }),
                              },
                            ].map((x) => {
                              x.mode_jsx_func = true;
                              return x;
                            }),
                          });
                        })
                      ),
                      right: React.createElement(
                        observer((props) => {
                          return PUtils.jsx.tabWithDefinition({
                            default_select_tab: "str",
                            key: "enchode_logic",
                            list: [
                              {
                                //
                                label:
                                  t(`ManPage Detail`) +
                                  `-${
                                    crtModel.config_page_mandetail_id +
                                      `(${(
                                        crtModel.config_page_manpage_id || ""
                                      ).replace("man", "")})` || "N/A"
                                  }`,
                                jsx: observer((props) => {
                                  if (lc_store.loading_pageData) {
                                    return <LoadingItem />;
                                  }
                                  return (
                                    <div
                                      className="linux-man-page-wrapper w100 h100"
                                      style={{
                                        paddingBottom: "20px",
                                      }}
                                    >
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: lc_store.pageData,
                                        }}
                                      ></div>
                                    </div>
                                  );
                                  return <div>manpage detail</div>;
                                }),
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
                );
              })
            ),
          });
        }),
      })
    ),
  };
};
