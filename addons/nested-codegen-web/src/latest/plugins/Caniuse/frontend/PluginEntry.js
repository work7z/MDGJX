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
const { Tabs, Tab } = CodeGenDefinition.BluePrintCpt;
import PreRequisiteJson from "../pre-requisite.json";
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import FormLabelTextInput from "../../TranslateForJSON/frontend/cpt/FormLabelTextInput";
import myfileLess from "./myfile.less";
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
import HighlightText from "../../TranslateForJSON/frontend/cpt/HighlightText";
import CanIUseDetailView from "./cpt/CanIUseDetailView";
import FormCollapse from "../../TranslateForJSON/frontend/cpt/FormCollapse";
window.test001002003004 = myfileLess;

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let rawT = `Front-End Compatibility Checker`;
let appTitle = t(rawT);

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    unlimited_view_mode: true,
    initialState: async () => {
      // await fn_otherPages.fn.loadStatic({
      //   PreRequisiteJson,
      //   gref,
      // });
      return {
        // myvalue: 12345,
        // decode_obj: {},
        sys: {
          search_str: "",
        },
      };
    },
    menus: [
      {
        ...fn_otherPages.menu.getDocRootMenu(),
        children: [
          {
            ...fn_otherPages.menu.getFrontEndSDKMenu(),
            children: [
              {
                label: rawT,
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
        noTranslateForTitle: true,
        totalTitle: ({ PUtils }) => {
          return appTitle;
        },
        left_hist_use_all: true,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;
          let URLParams = PUtils.getURLParams();
          PUtils.makeLeftHide();
          PUtils.enableAutoSaveMode();
          PUtils.makeOnlyOneOptions();
          if (URLParams.type == "detail") {
            return (
              <CanIUseDetailView
                gref={gref}
                PUtils={PUtils}
                id={URLParams.id}
              />
            );
            // return (
            //   <MavenDetailView
            //     gref={gref}
            //     PUtils={PUtils}
            //     version={URLParams.version}
            //     artifactId={URLParams.artifactId}
            //     groupId={URLParams.groupId}
            //   />
            // );
          }
          // PUtils.crtModel.sys;
          let lc_store = useLocalStore(() => {
            return {
              remainValues: {},
              col_0: true,
              col_1: true,
              col_2: true,
              flatKeys: [],
              searchDone: true,
              loading: false,
              totalMvnArtifactSize: 0,
              libDetailVer: [],
              flag: 0,
              loadingMVNList: false,
              loadingCDNDetailFromOnline: false,
              lib: [],
              loadingText: "",
              todaySuggestion: [],
              detailObj: {},
              loadingDetail: false,
              hasDetailValue: true,
              updatingDetailValue: false,
              versionObj: {},
            };
          });
          let fn_init = () => {
            gutils.defer(async () => {
              try {
                if (!p_mode()) {
                  // if (PUtils.crtModel.ask_mem_before !== true) {
                  //   PUtils.crtModel.is_mem_loading = await gutils.confirm(
                  //     `Would you like to turn the memory acceleration on? It will highly speed up the response time of searching maven dependencies but will spend more memory to some extent. We think it’s worthwhile if you have enough memory, and it's recommended to be adopted for better user experiences. Of course, it depended heavily on you, if your answer is yes, please click confirm button to continue. (This option can be adjusted at any time as well.)`
                  //   );
                  //   PUtils.crtModel.ask_mem_before = true;
                  // }
                }
                lc_store.loadingText = t(`Initializing the local file...`);
                let res_mvn_init = await gref.optAPI(`caniuse_init`);
                let keys = _.get(res_mvn_init, "data.keys");
                lc_store.flatKeys = keys;
                let remainValues = {
                  ..._.get(res_mvn_init, "data"),
                  keys: [],
                };
                lc_store.remainValues = remainValues;
                // lc_store.updatedDesc= Moment(_.get(remainValues,'updated')*1000).fromNow()
                lc_store.loadingText = t(`Configuring the memory settings...`);
                PUtils.crtModel.totalMvnArtifactSize = [];
                lc_store.loadingText = null;
              } catch (e) {
                lc_store.loadingText = gutils.getErrMsg(e);
              }
            });
          };
          let fn_searchFn = useCallback(
            _.debounce(() => {
              gutils.defer(async () => {
                lc_store.searchDone = false;
                lc_store.loadingText = t(
                  `Searching dependencies for {0}...`,
                  PUtils.crtModel.sys.search_str
                );
                lc_store.loading = true;
                let crt_req_id = gutils.uuid();
                lc_store.req_id = crt_req_id;
                PUtils.crtModel.searchResultArr = [
                  t(
                    `Searching dependencies for {0}...`,
                    PUtils.crtModel.sys.search_str
                  ),
                  {
                    t: t(`Loading`),
                  },
                ];
                let flatKeys = lc_store.flatKeys;
                let mvalue = _.toLower(_.trim(PUtils.crtModel.sys.search_str));
                let allGroups = _.filter(
                  _.map(_.split(mvalue, /\s+/g), (x, d, n) => {
                    return _.trim(x);
                  }),
                  (x) => !cutils.cond_emptyStr(x)
                );
                let arr2 = [];
                let nonOnlyOneMode = _.size(allGroups) != -1;
                if (!_.isEmpty(allGroups)) {
                  arr2 = _.filter(flatKeys, (x, d, n) => {
                    if (nonOnlyOneMode) {
                      // return
                      for (let eachTxt of allGroups) {
                        if (
                          _.toLower(x[0] + "").indexOf(eachTxt) === -1 &&
                          _.toLower(x[1].t + "").indexOf(eachTxt) === -1 &&
                          (_.isNil(x[1].k)
                            ? true
                            : (x[1].k + "").indexOf(eachTxt) === -1)
                        ) {
                          return false;
                        }
                      }
                      return true;
                    }
                    return (
                      _.toLower(x[0] + "").indexOf(mvalue) !== -1 ||
                      _.toLower(x[1].t + "").indexOf(mvalue) !== -1 ||
                      (_.isNil(x[1].k)
                        ? false
                        : (x[1].k + "").indexOf(mvalue) !== -1)
                    );
                  });
                }
                arr2 = _.sortBy(
                  arr2,
                  (x, d) =>
                    -1 *
                    (x[0] == mvalue && x[1].t == mvalue
                      ? 5000
                      : x[0] == mvalue
                      ? 3000
                      : d)
                );
                arr2 = _.map(arr2, (x) => {
                  return [
                    x[1].t,
                    null,
                    {
                      id: x[0],
                    },
                  ];
                });
                arr2 = _.slice(arr2, 0, 50);
                PUtils.crtModel.searchResultArr = arr2;
                lc_store.loadingText = null;
                lc_store.loading = false;
                lc_store.searchDone = true;
              });
            }, 300),
            []
          );
          useEffect(() => {
            gutils.defer(async () => {
              await fn_init();
              if (
                !_.isNil(PUtils.crtModel.sys.search_str) &&
                PUtils.crtModel.sys.search_str != ""
              ) {
                lc_store.loading = true;
                gutils.defer(() => {
                  fn_searchFn();
                });
              }
            });
            return () => {};
          }, []);
          let isSearchEmpty =
            _.isNil(PUtils.crtModel.sys.search_str) ||
            PUtils.crtModel.sys.search_str == "";
          return (
            <div className={myfileLess["maven-repo-container"]}>
              <div className={myfileLess["banner-wrapper"]} style={{}}>
                <h2 className={myfileLess["main-title"]}>
                  {t(`Front-End Features Compatibility Checker`)}
                </h2>
                <h3 className={myfileLess["main-sub-title"]}>
                  {t(
                    `Did you ever hear of the website {0}? For front-end developers, more often that not, it's a well-known and useful website for searching if current browser support status of specified feature.`,
                    "caniuse.com"
                  )}
                  {/* <br /> */}{" "}
                  {t(
                    `However, it's an online website, which means you will not be able to access any feature without the Internet.`
                  )}{" "}
                  {/* <br /> */}
                  {/* {t(`We understand that CodeGen should develop such an `)} */}
                  <b
                    style={
                      {
                        // background: "yellow",
                        // color: "black",
                      }
                    }
                  >
                    {t(
                      `Now, CodeGen ToolBox has supported its main functionalities in this extension, besides, its core data will be updated daily from authoritative sources. Come on, let's have a try!`
                    )}
                  </b>
                </h3>
                <p>
                  {lc_store.searchDone &&
                  !cutils.cond_emptyStr(PUtils.crtModel.sys.search_str)
                    ? t(
                        `Found {0} results`,
                        _.size(PUtils.crtModel.searchResultArr)
                      )
                    : t(
                        `Including {0} Web features from official websites`,
                        _.size(lc_store.flatKeys)
                      )}
                </p>
                <p
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    margin: "30px 0",
                    marginBottom: "10px",
                  }}
                >
                  <InputGroup
                    // onEnter={() => {
                    //   //
                    // }}
                    style={{ width: "600px", margin: "0 auto" }}
                    large={true}
                    placeholder={t(`Search Web Feature Name, like {0}`, "flex")}
                    value={PUtils.crtModel.sys.search_str}
                    asyncControl={true}
                    onChange={(e) => {
                      lc_store.loading = true;
                      try {
                        PUtils.crtModel.sys.search_str =
                          gutils.getValueFromE(e);
                        fn_searchFn();
                      } catch (e) {
                        console.log("err", e);
                      } finally {
                      }
                    }}
                    rightElement={
                      lc_store.loading ? (
                        <Button large={true} loading={true} text="" />
                      ) : null
                    }
                    // rightElement_2={
                    //   <Button
                    //     large={true}
                    //     intent="primary"
                    //     onClick={() => {
                    //       //
                    //     }}
                    //     text={t(`Search Now`)}
                    //   ></Button>
                    // }
                  ></InputGroup>
                </p>
              </div>

              <div
                className={
                  (!cutils.cond_emptyStr(PUtils.crtModel.sys.search_str)
                    ? myfileLess["has-body-wrapper"]
                    : "") +
                  ` ` +
                  myfileLess["cdn-body-wrapper"]
                }
              >
                {lc_store.loadingText ? (
                  <Callout
                    title={
                      <span>
                        {t(`App is loading`)}
                        <Blink max={10} />
                      </span>
                    }
                  >
                    {lc_store.loadingText}
                  </Callout>
                ) : (
                  ""
                )}
                <div className={myfileLess["cdn-lists"]}>
                  {lc_store.loading ? (
                    ""
                  ) : isSearchEmpty || !_.isEmpty(lc_store.loadingText) ? (
                    ""
                  ) : (
                    <h3 style={{}}>
                      {_.isEmpty(PUtils.crtModel.searchResultArr)
                        ? t(`Result is Empty`)
                        : t(`Search Result`)}
                    </h3>
                  )}
                  <div
                    style={{
                      borderBottom: "1px solid var(--app-border-gray-e1e8ed)",
                    }}
                  >
                    {_.map(
                      lc_store.loading
                        ? []
                        : isSearchEmpty
                        ? []
                        : !_.isEmpty(lc_store.loadingText)
                        ? []
                        : lc_store.searchDone &&
                          _.isEmpty(PUtils.crtModel.searchResultArr)
                        ? [
                            [
                              t(`Resources Not Found`),
                              t(
                                `System cannot find related records, please try to adjust your keyword.`
                              ),
                            ],
                          ]
                        : PUtils.crtModel.searchResultArr,
                      (x, d, n) => {
                        let openState = lc_store["col_" + d] == true;
                        let result_arr = [
                          <h4 className="p-crt-panel-first">{x[0]}</h4>,
                          <div className="p-crt-panel-second bp3-text-muted">
                            {x[1]}
                          </div>,
                        ];
                        if (x[0]) {
                          result_arr = [
                            <div
                              className={myfileLess["p-crt-panel-full"] + "   "}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: "80%",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Icon
                                  icon={
                                    openState ? "caret-down" : "caret-right"
                                  }
                                  style={{
                                    display: "inline-block",
                                    margin: "0px",
                                    marginRight: "10px",
                                    // paddingTop: "5px",
                                  }}
                                />
                                <span>
                                  <h2 style={{ margin: "0" }}>
                                    <HighlightText
                                      text={x[0]}
                                      highlight={PUtils.crtModel.sys.search_str}
                                    />
                                  </h2>
                                </span>{" "}
                                {/* -&gt;{" "} */}
                                {x[1] ? (
                                  <span>
                                    (
                                    <HighlightText
                                      text={x[1]}
                                      highlight={PUtils.crtModel.sys.search_str}
                                    />
                                    )
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div
                                style={{ width: "20%", textAlign: "right" }}
                                className="bp3-text-muted"
                              >
                                {/* {t(`Click to Toggle Panel`)} */}
                                {openState
                                  ? t(`Click to Collapse Panel`)
                                  : t(`Click to Expand Panel`)}
                              </div>
                            </div>,
                          ];
                        }
                        let crtID = _.get(x, [2, "id"]);
                        return (
                          <FormCollapse
                            defaultOpenState={openState}
                            fn_noumenon={({ onClick }) => (
                              <div
                                onClick={() => {
                                  onClick();
                                  lc_store["col_" + d] =
                                    (lc_store["col_" + d] || false) == true
                                      ? false
                                      : true;
                                }}
                                className={
                                  "  c-border-gray  c-touch-anchor-panel " +
                                  myfileLess["p-crt-panel-body"]
                                }
                                style={{
                                  cursor: "pointer",
                                  transition: "none",
                                }}
                              >
                                {result_arr}
                              </div>
                            )}
                            fn_outdo={() => {
                              let finCtn = null;
                              if (_.isNil(crtID)) {
                                finCtn = (
                                  <p
                                    style={{
                                      padding: "30px",
                                    }}
                                  >
                                    {t(`No available content.`)}
                                    <br />
                                    {t(
                                      `Please adjust your keyword or refresh this page.`
                                    )}
                                  </p>
                                );
                              } else {
                                finCtn = (
                                  <CanIUseDetailView
                                    remainValues={lc_store.remainValues}
                                    PUtils={PUtils}
                                    gref={gref}
                                    id={crtID}
                                  />
                                );
                              }
                              return (
                                <div
                                  className={
                                    " c-border-gray " +
                                    myfileLess["caniuse-detail-wrapper"]
                                  }
                                >
                                  {finCtn}
                                </div>
                              );
                            }}
                          />
                        );

                        //   return (
                        //   <Link
                        //     // target="_blank"
                        //     to={
                        //       "/exts/ROOT_EXTENSION_ADDONS?" +
                        //       Qs.stringify({
                        //         type: "detail",
                        //         id: _.get(x, [2, "id"]),
                        //       })
                        //     }
                        //     className={
                        //       " c-touch-anchor-panel c-border-gray " +
                        //       myfileLess["p-crt-panel-body"]
                        //     }
                        //   >
                        //     {result_arr}
                        //   </Link>
                        // );
                      }
                    )}
                  </div>
                </div>
                <div className={myfileLess["cdn-helpers"]}>
                  {/* <h3>{t(`Maven Related Tools`)}</h3> */}
                  <p className="sub-mr-5" style={{ marginTop: "8px" }}>
                    <Callout title={t(`About this Extension`)}>
                      <p>
                        {t(
                          `Welcome to use this service! To begin with this extension, you may need to input your keyword into the search field above and wait a few seconds for the search results. Within the process, please be noted that all resources will be retrieved from official source. Apart from this point, we’d like to introduce some features for you as below. `
                        )}
                      </p>
                      <ul>
                        <li>
                          {t(
                            `To search any item, you can provide mere one letter, for instance, {0}. But If you think the search result wasn't satisfying, please follow point 2.`,
                            "flex"
                          )}
                        </li>
                        <li>
                          {t(
                            `In order to diminish the range of searching, you can input multiple words which joined by a whitespace character. For instance, if you input "{0}" as its keyword, then the search results must contains "{1}" and "{2}" at the same time.`,
                            `flex box`,
                            `flex`,
                            "box"
                          )}
                        </li>
                        <li>
                          {t(
                            `If you have any suggestion regarding the tool, please feel free to contact us. Looking forward to your feedback!`
                          )}
                          {t(
                            `Besides, with respect to the data source, we owe a debt of gratitude to the website {0} who offer the data generously on the Github repository.`,
                            "caniuse.com"
                          )}
                        </li>
                        <li>
                          {t(
                            `If you are seeking for further search tools, please follow the buttons below.`
                          )}
                        </li>
                      </ul>
                    </Callout>
                  </p>
                  <h3 style={{ marginBottom: "8px" }}>
                    {t(`Additional Tools`)}
                  </h3>
                  <p className="sub-mr-5">
                    {/* <Button
                      disabled={p_mode()}
                      intent={
                        PUtils.crtModel.is_mem_loading ? "warning" : "none"
                      }
                      text={
                        PUtils.crtModel.is_mem_loading
                          ? t("Disable Memory Acceleration")
                          : t("Enable Memory Acceleration")
                      }
                      onClick={async () => {
                        if (PUtils.crtModel.is_mem_loading) {
                          if (
                            !(await gutils.confirm(
                              `Would you like to disable the memory acceleration? This operation can help to reduce your memory usage, but the response time of searching maven dependencies will be slower than before.`
                            ))
                          ) {
                            return;
                          }
                        } else {
                          if (
                            !(await gutils.confirm(
                              `Would you like to enable memory acceleration? This operation can help to speed up searching maven dependencies, but to some extent, your memory usage will be higher than before.`
                            ))
                          ) {
                            return;
                          }
                        }
                        PUtils.crtModel.is_mem_loading =
                          !PUtils.crtModel.is_mem_loading;
                        fn_init();
                      }}
                    ></Button> */}
                    <Button
                      text={t(`Refresh this Page`)}
                      onClick={async () => {
                        fn_init();
                      }}
                    ></Button>
                    {/* <Link
                      className={`bp3-button`}
                      to={"/exts/MavenRepo?type=tools&id=analyze_my_pom"}
                      onClick={async () => {
                        //
                      }}
                    >
                      {t(`Analyze My {0}`, "POM.xml")}
                    </Link> */}
                  </p>
                </div>
              </div>
            </div>
          );
        }),
      })
    ),
  };
};
