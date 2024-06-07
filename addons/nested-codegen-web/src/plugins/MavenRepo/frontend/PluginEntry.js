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
import PreRequisiteJson from "../pre-requisite.json";
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import FormLabelTextInput from "../../TranslateForJSON/frontend/cpt/FormLabelTextInput";
import myfileLess from "./myfile.less";
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import HighlightText from "../../TranslateForJSON/frontend/cpt/HighlightText";
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
import MavenDetailView from "./cpt/MavenDetailView";
import MavenAnayzeMyPOM from "./cpt/MavenAnayzeMyPOM";

let appTitle = "Maven Repository";
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appTitle,
};
let fn_debounceCall_300 = _.debounce((obj) => {
  obj.fn();
}, 300);

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    unlimited_view_mode: true,
    initialState: async () => {
      return {
        init_maven_analyze_content: `<!-- https://cloud.codegen.cc/MavenRepo?groupId=htmlunit&artifactId=htmlunit -->
<dependency>
  <groupId>htmlunit</groupId>
  <artifactId>htmlunit</artifactId>
  <version>1.14</version>
</dependency>

<!-- ${t(
          `Whatever the structure or level of your input is, CodeGen can identify these value by the tag {0}`,
          "dependency"
        )} -->
<dependencies>
  <!-- https://cloud.codegen.cc/MavenRepo?groupId=org.jsoup&artifactId=jsoup -->
  <dependency>
    <groupId>org.jsoup</groupId>
    <artifactId>jsoup</artifactId>
    <version>1.15.3</version>
  </dependency>
</dependencies>
`,
        dep_definition_type: "with_reference",
        crt_mirror_id: p_mode() ? "tencent" : "huawei",
        searchResultArr: [],
        totalMvnArtifactSize: 0,
        search_id: gutils.uuid(),
        req_id: gutils.uuid(),
        search_str: "",
        is_mem_loading: p_mode(),
        ask_mem_before: false,
      };
    },
    menus: [
      {
        ...fn_otherPages.menu.getDocRootMenu(),
        children: [
          {
            ...fn_otherPages.menu.getJavaDocsMenu(),
            children: [
              {
                label: metaObj.appName,
                id: "ROOT_EXTENSION_ADDONS_main",
                icon: "application",
                pid: "ROOT_EXTENSION_ADDONS_main",
                pathname: "/exts/MavenRepo",
              },
              {
                label: `Analyze My POM.xml`,
                icon: "application",
                id: "ROOT_EXTENSION_ADDONS_analyze_my_pom",
                pid: "ROOT_EXTENSION_ADDONS_analyze_my_pom",
                pathname: "/exts/MavenRepo?type=tools&id=analyze_my_pom",
              },
              // {
              //   label: `Maven Search History`,
              //   icon: "application",
              //   id: "ROOT_EXTENSION_ADDONS_maven_search_history",
              //   pid: "ROOT_EXTENSION_ADDONS_maven_search_history",
              //   pathname: "/exts/MavenRepo?type=detail&id=analyze_my_pom",
              // },
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
          let URLParams = PUtils.getURLParams();
          PUtils.makeLeftHide();
          PUtils.makeOnlyOneOptions();
          if (URLParams.type == "tools") {
            let mappings = {
              analyze_my_pom: MavenAnayzeMyPOM,
            };
            let Fk = mappings[URLParams.id];
            if (_.isNil(Fk)) {
              return <div>tool not found</div>;
            } else {
              return <Fk gref={gref} PUtils={PUtils} {...URLParams} />;
            }
          }
          if (URLParams.type == "detail") {
            return (
              <MavenDetailView
                gref={gref}
                PUtils={PUtils}
                version={URLParams.version}
                artifactId={URLParams.artifactId}
                groupId={URLParams.groupId}
              />
            );
          }
          let lc_store = useLocalStore(() => {
            return {
              loading: false,
              search_str: "",
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
                  if (PUtils.crtModel.ask_mem_before !== true) {
                    PUtils.crtModel.is_mem_loading = await gutils.confirm(
                      `Would you like to turn the memory acceleration on? It will highly speed up the response time of searching maven dependencies but will spend more memory to some extent. We think it’s worthwhile if you have enough memory, and it's recommended to be adopted for better user experiences. Of course, it depended heavily on you, if your answer is yes, please click confirm button to continue. (This option can be adjusted at any time as well.)`
                    );
                    PUtils.crtModel.ask_mem_before = true;
                  }
                }
                lc_store.loadingText = t(`Initializing the local file...`);
                await gref.optAPI(`mvn_init`);
                lc_store.loadingText = t(`Configuring the memory settings...`);
                await gref.optAPI(`mvn_loadmem`, {
                  is_mem_loading: PUtils.crtModel.is_mem_loading,
                });
                // mvn meta
                let { data } = await gref.optAPI("mvn_meta");
                lc_store.loadingText = t(`Initializing the maven meta file...`);
                PUtils.crtModel.totalMvnArtifactSize =
                  data.totalMvnArtifactSize;
                lc_store.loadingText = null;
              } catch (e) {
                lc_store.loadingText = gutils.getErrMsg(e);
              }
            });
          };

          let fn_searchFn = useCallback(
            _.debounce(() => {
              gutils.defer(async () => {
                lc_store.loadingText = t(
                  `Searching dependencies for {0}...`,
                  lc_store.search_str
                );
                lc_store.loading = true;
                let crt_req_id = gutils.uuid();
                lc_store.req_id = crt_req_id;
                PUtils.crtModel.searchResultArr = [];
                let { data } = await gref.optAPI(`mvn_search`, {
                  search_str: lc_store.search_str,
                  search_id: PUtils.crtModel.search_id,
                });
                if (lc_store.req_id != crt_req_id) {
                  return;
                }
                let ok2 = _.map(data.results, (x, d, n) => {
                  return x;
                });
                let mvalue = _.trim(lc_store.search_str);
                ok2 = _.sortBy(
                  ok2,
                  (x, d) =>
                    -1 *
                    (x.groupId == mvalue && x.artifactId == mvalue
                      ? 5000
                      : x.groupId == mvalue || x.artifactId == mvalue
                      ? 3000
                      : d)
                );
                PUtils.crtModel.searchResultArr = ok2;
                lc_store.loadingText = null;
                lc_store.loading = false;
              });
            }, 300),
            []
          );
          useEffect(() => {
            fn_init();
            if (!_.isNil(lc_store.search_str) && lc_store.search_str != "") {
              lc_store.loading = true;
              gutils.defer(() => {
                fn_searchFn();
              });
            }
            return () => {};
          }, []);
          let isSearchEmpty =
            _.isNil(lc_store.search_str) || lc_store.search_str == "";
          return (
            <div className={myfileLess["maven-repo-container"]}>
              <div className={myfileLess["banner-wrapper"]} style={{}}>
                <h2 className={myfileLess["main-title"]}>
                  {t(`Maven Centre Repository Search Service`)}
                </h2>
                <h3 className={myfileLess["main-sub-title"]}>
                  {t(
                    `How to search my maven dependencies simply without frequently verifying whether I'm a robot or not, along with no ADs and swift response if it possible?`
                  )}
                  {/* <br /> */}{" "}
                  {t(
                    `Now spring has come, you can use this tool to search any dependency quickly by your keyword, and please rest assured that these results will be retrieved from the latest center repositories.`
                  )}{" "}
                  {/* <br /> */}
                  {t(
                    `We're convinced that it would be a swift and simple tool in your Java career life, now without further ado, let's go ahead nicely!`
                  )}
                </h3>
                <p>
                  {t(
                    `Including {0} Maven open source artifacts`,
                    PUtils.crtModel.totalMvnArtifactSize
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
                    placeholder={t(
                      `Search Open Source Artifacts, like {0}`,
                      "log4j"
                    )}
                    value={lc_store.search_str}
                    asyncControl={true}
                    onChange={(e) => {
                      lc_store.search_str = gutils.getValueFromE(e);
                      fn_searchFn();
                    }}
                    rightElement={
                      lc_store.loadingText ? (
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

              <div className={myfileLess["cdn-body-wrapper"]}>
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
                  {isSearchEmpty || !_.isEmpty(lc_store.loadingText) ? (
                    ""
                  ) : (
                    <h3 style={{}}>
                      {_.isEmpty(PUtils.crtModel.searchResultArr)
                        ? t(`Result is Empty`)
                        : t(`Search Result`)}
                    </h3>
                  )}
                  <div>
                    {_.map(
                      lc_store.loading
                        ? []
                        : isSearchEmpty
                        ? []
                        : !_.isEmpty(lc_store.loadingText)
                        ? []
                        : _.isEmpty(PUtils.crtModel.searchResultArr)
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
                        let result_arr = [
                          <h4 className="p-crt-panel-first">{x[0]}</h4>,
                          <div className="p-crt-panel-second bp3-text-muted">
                            {x[1]}
                          </div>,
                        ];
                        if (x.groupId) {
                          result_arr = [
                            <div
                              className={myfileLess["p-crt-panel-full"] + "   "}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                              }}
                            >
                              <div style={{ width: "80%" }}>
                                <span>
                                  <HighlightText
                                    text={x.groupId}
                                    highlight={lc_store.search_str}
                                  />
                                </span>{" "}
                                -&gt;{" "}
                                <span>
                                  <HighlightText
                                    text={x.artifactId}
                                    highlight={lc_store.search_str}
                                  />
                                </span>
                              </div>
                              <div
                                style={{ width: "20%", textAlign: "right" }}
                                className="bp3-text-muted"
                              >
                                {t(`View Detail`)}
                              </div>
                            </div>,
                          ];
                        }
                        return (
                          <Link
                            // target="_blank"
                            to={
                              "/exts/ROOT_EXTENSION_ADDONS?" +
                              Qs.stringify({
                                type: "detail",
                                groupId: x.groupId,
                                artifactId: x.artifactId,
                              })
                            }
                            className={
                              " c-touch-anchor-panel c-border-gray " +
                              myfileLess["p-crt-panel-body"]
                            }
                          >
                            {result_arr}
                          </Link>
                        );
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
                          `Welcome to use maven repository service! To begin with this extension, you may need to input your keyword into the search field above and wait a few seconds for the search results. Within the process, please be noted that all resources will be retrieved from Maven’s official online repository, which means it's not offline-able. Apart from this point, we’d like to introduce some features for you as below. `
                        )}
                      </p>
                      <ul>
                        <li>
                          {t(
                            `To search maven dependencies, you can just provide one word, for instance, {0}. But If you think the search result wasn't satisfying, please follow point 2.`,
                            "log4j"
                          )}
                        </li>
                        <li>
                          {t(
                            `In order to diminish the range of searching, you can input multiple words which joined by a whitespace character. For instance, if you input "{0}" as its keyword, then the search results must contains "{1}" and "{2}" at the same time.`,
                            `alibaba fastjson`,
                            `alibaba`,
                            `fastjson`
                          )}
                        </li>
                        <li>
                          {t(
                            `To view its detail and have further operations, please click the item to drill down. Of course, you can also right-click it to open the page in a new tab.`
                          )}
                        </li>
                        <li>
                          {t(
                            `Regarding memory acceleration, before using this extension, we will confirm this option with you. We strongly suggest that you can turn it on, which can accelerate your search operation to some extent. Without a doubt, it will occupy your memory if you don’t mind.`
                          )}
                        </li>
                        <li>
                          {t(
                            `If you want to have further search tools, please follow the buttons below.`
                          )}
                        </li>
                      </ul>
                    </Callout>
                  </p>
                  <h3>{t(`Optimization for Maven Tools`)}</h3>
                  <p className="sub-mr-5">
                    <Button
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
                    ></Button>
                    <Button
                      text={t(`Refresh this Page`)}
                      onClick={async () => {
                        fn_init();
                      }}
                    ></Button>
                    <Link
                      className={`bp3-button`}
                      to={"/exts/MavenRepo?type=tools&id=analyze_my_pom"}
                      onClick={async () => {
                        //
                      }}
                    >
                      {t(`Analyze My {0}`, "POM.xml")}
                    </Link>
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
