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
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import myfileLess from "./myfile.less";
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
import mapi from "../../TranslateForJSON/frontend/kit/common_api";
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "Software Center";
let subMenu = [
  {
    label: `Resources Navigator`,
    icon: "home",
    id: "root",
    pathname: "/exts/ROOT_EXTENSION_ADDONS?type=all&id=root",
    pid: "ROOT_EXTENSION_ADDONS_index",
  },
  {
    label: `Install Maven`,
    icon: "application",
    id: "maven",
    appLabel: "Maven",
    pathname: "/exts/ROOT_EXTENSION_ADDONS?type=detail&id=maven",
    pid: "ROOT_EXTENSION_ADDONS_maven",
    extraTabs: ({ PUtils, lc_store }) => {
      return [
        {
          label: t(`Configure China Mirror`),
          jsx: <div>this is about maven</div>,
        },
      ];
    },
  },
  {
    label: `Install Tomcat`,
    icon: "application",
    id: "tomcat",
    appLabel: "Tomcat",
    pathname: "/exts/ROOT_EXTENSION_ADDONS?type=detail&id=tomcat",
    pid: "ROOT_EXTENSION_ADDONS_tomcat",
    extraTabs: ({ PUtils, lc_store }) => {
      return [
        {
          label: t(`Configure China Mirror`),
          jsx: <div>this is about maven</div>,
        },
      ];
    },
  },
  {
    label: `Install Flink`,
    icon: "application",
    id: "flink",
    appLabel: "Flink",
    pathname: "/exts/ROOT_EXTENSION_ADDONS?type=detail&id=flink",
    pid: "ROOT_EXTENSION_ADDONS_flink",
    extraTabs: ({ PUtils, lc_store }) => {
      return [
        {
          label: t(`Configure China Mirror`),
          jsx: <div>this is about maven</div>,
        },
      ];
    },
  },
  {
    label: `Install Spark`,
    icon: "application",
    id: "spark",
    appLabel: "Spark",
    pathname: "/exts/ROOT_EXTENSION_ADDONS?type=detail&id=spark",
    pid: "ROOT_EXTENSION_ADDONS_spark",
    extraTabs: ({ PUtils, lc_store }) => {
      return [
        {
          label: t(`Configure China Mirror`),
          jsx: <div>this is about maven</div>,
        },
      ];
    },
  },
  // {
  //   label: `Install CentOS`,
  //   id: "centos",
  //   appLabel: "CentOS",
  //   pathname: "/exts/ROOT_EXTENSION_ADDONS?type=detail&id=centos",
  //   icon: "application",
  //   pid: "ROOT_EXTENSION_ADDONS_centos",
  // },
];
let { Simple_table } = cutils;

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    unlimited_view_mode: true,
    // notReady: true,
    // willReadyVersion: `v1.7.4`,
    initialState: async () => {
      return {
        agreeMoment: null,
      };
    },
    menus: [
      {
        ...fn_otherPages.menu.getDocRootMenu(),
        children: [
          {
            ...fn_otherPages.menu.getSDKDownloadMenu(),
            children: subMenu.filter((x) => x.id == "root"),
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
        totalTitle: ({ PUtils }) => {
          let findItem =
            _.find(subMenu, (x) => x.id == PUtils.getURLParams().id) || {};
          return t(
            [
              findItem.label || PUtils.getURLParams().id,
              // appTitle,
            ].join(" - ")
          );
        },
        left_hist_use_all: true,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;
          PUtils.makeLeftHide();
          let hist = useHistory();
          let URLParams = PUtils.getURLParams();
          let crtServiceItem = _.find(subMenu, (x) => x.id == URLParams.id);
          let lc_store = useLocalStore(() => {
            return {
              // tabs
              CRT_WRAPPER_TAB: "version",
              updateRef: 1,
              CRT_VERSION: null,
              CRT_MIRROR_PROP: null,
              // detail
              artifactList: [],
              versionList: [],
              mirrorList: [],
              detailObj: {},
              allObj: {},
            };
          });
          // let refMute = React.useRef({
          // });
          let m_lc_store = lc_store; //refMute.current;
          if (gutils.dev()) {
            window.lc_store = lc_store;
            window.m_lc_store = m_lc_store;
          }
          let fn_reinit_detailList = () => {
            m_lc_store.artifactList = _.chain(lc_store.detailList)
              .filter((x, d, n) => {
                return (
                  x.VERSION == lc_store.CRT_VERSION &&
                  x.MIRROR_PROP == lc_store.CRT_MIRROR_PROP
                );
              })
              .value();
            lc_store.updateRef++;
          };
          let fn_reinit_version_list = () => {
            m_lc_store.versionList = _.chain(lc_store.detailList)
              .filter((x) => x.MIRROR_PROP == lc_store.CRT_MIRROR_PROP)
              .map((x) => x.VERSION)
              .uniq()
              .map((x) => ({ label: x, value: x }))
              .value();
            lc_store.CRT_VERSION = _.get(m_lc_store.versionList, "0.value");
            lc_store.updateRef++;
          };
          PUtils.initFn(
            [
              async () => {
                if (URLParams.type == "all") {
                  await mapi.opt(
                    `/software/artifacts`,
                    {},
                    ({ ftlMap, error }) => {
                      console.log("ftlmap", ftlMap);
                      m_lc_store.allObj = ftlMap.m;
                    }
                  );
                } else if (URLParams.type == "detail") {
                  await mapi.opt(
                    `/software/detail`,
                    {
                      ...URLParams,
                    },
                    ({ ftlMap, error }) => {
                      console.log("ftlmap", ftlMap);
                      m_lc_store.detailObj = {
                        ...ftlMap.m,
                        detailList: null,
                        mirrorList: null,
                      };
                      m_lc_store.mirrorList = ftlMap.m.mirrorList;
                      m_lc_store.detailList = ftlMap.m.detailList;
                      lc_store.CRT_MIRROR_PROP = _.get(
                        m_lc_store.mirrorList,
                        "0.MIRROR_PROP"
                      );
                      fn_reinit_version_list();
                      fn_reinit_detailList();
                      lc_store.updateRef++;
                    }
                  );
                }
              },
            ],
            []
          );
          if (_.isNil(PUtils.crtModel.agreeMoment)) {
            return (
              <div style={{ padding: "15px" }}>
                <Callout title={t(`Disclaimer`)}>
                  <p>
                    {t(
                      `These software resources we listed here are NOT provided by us, all copyrights should belong to the corresponding website owner, we sorted out these information in order to let our users can find related resources more quickly.these related further licenses, you should read these licenses carefully on their official website. `
                    )}
                    {t(
                      `This agreement may will be changed in the future, please kindly stay tuned about related agreement on our official website.`
                    )}
                  </p>
                  <p>
                    {t(
                      `Lastly, you shall understand and agree to the fact that these resources page does not constitute an offer of any business, commitment, guarantee or part of the contract, and does not have the legal effect as the contract or guarantee.`
                    )}
                  </p>
                  {cutils.license_btn()}
                  <p className="bp3-text-small bp3-text-muted">
                    {t(
                      `If you have read the Client Agreement carefully, and by signing, you agree to be bound by every term and condition, including the items listed above, please click the button below to continue.`
                    )}
                  </p>
                  <p className="sub-mr-5">
                    <Button
                      onClick={() => {
                        PUtils.crtModel.agreeMoment = Date.now() + "";
                      }}
                      intent={"primary"}
                      large={true}
                    >
                      {t(
                        `I have read and agree to the Terms and conditions of this Agreement.`
                      )}
                    </Button>
                  </p>
                </Callout>
              </div>
            );
          }

          if (URLParams.type == "all") {
            return (
              <div className={myfileLess["softwarecenter-wrapper"]}>
                <h2>{t(`All Resources Page`)}</h2>
                <p>
                  {t(
                    `We will keep updating the layout and data of this page gradually, please kindly stay tuned.`
                  )}
                </p>
                <Simple_table
                  data={lc_store.allObj}
                  column={[
                    {
                      label: t(`Category Name`),
                      value: (x) => <div>{x["CATEGORY_NAME"]}</div>,
                    },
                    {
                      label: t(`Resource Name`),
                      value: (x) => (
                        <div>
                          <Link
                            to={`/exts/SoftwareCenter?type=detail&id=${x["ARTIFACT_PROP"]}`}
                          >
                            {x["ARTIFACT_NAME"]}
                          </Link>
                        </div>
                      ),
                    },
                    {
                      label: t(`Home Page`),
                      value: (x) => (
                        <div>
                          <a href={x["ARTIFACT_HOME_LINK"]} target="_blank">
                            {x["ARTIFACT_HOME_LINK"]}
                          </a>
                        </div>
                      ),
                    },
                    {
                      label: t(`Last Updated Time`),
                      value: (x) => (
                        <div>{Moment(x["LAST_UPDATE_TIME"]).fromNow()}</div>
                      ),
                    },
                  ]}
                />
              </div>
            );
          } else if (URLParams.type == "detail") {
            return (
              <div style={{}} className={myfileLess["softwarecenter-wrapper"]}>
                <p style={{ marginBottom: "0px" }}>
                  <Callout title={lc_store.detailObj.ARTIFACT_NAME}>
                    <p>{t(lc_store.detailObj.DESCRIPTION + "")}</p>
                    <p className="sub-mr-5">
                      {/* <Tag intent={"primary"}>
                        {lc_store.detailObj.CATEGORY_PROP} -{" "}
                        {lc_store.detailObj.ARTIFACT_PROP}
                      </Tag> */}
                      <b>
                        {t(`Last Update Time:`)}{" "}
                        {Moment(lc_store.detailObj.LAST_UPDATE_TIME).fromNow()}
                      </b>
                      <Button
                        style={{ float: "right" }}
                        onClick={() => {
                          gutils.hist.push(
                            "/exts/SoftwareCenter?type=all&id=root"
                          );
                        }}
                        minimal={
                          gstore.localSettings.is_using_dark_mode ? true : false
                        }
                        small={true}
                        text={t(`Back to Home`)}
                      ></Button>
                    </p>
                  </Callout>
                </p>
                <Tabs
                  style={{ margin: 0, padding: 0 }}
                  selectedTabId={lc_store.CRT_WRAPPER_TAB}
                  onChange={(e) => {
                    lc_store.CRT_WRAPPER_TAB = e;
                  }}
                  large={true}
                >
                  <Tab
                    id="version"
                    title={t(`Resources Page`)}
                    panel={
                      <Tabs
                        style={{ margin: 0, padding: 0 }}
                        selectedTabId={lc_store.CRT_MIRROR_PROP}
                        onChange={(e) => {
                          lc_store.CRT_MIRROR_PROP = e;
                          fn_reinit_version_list();
                        }}
                        vertical={true}
                        large={true}
                      >
                        {_.map(
                          lc_store.mirrorList,
                          (eachMirror, eachMirrorIdx) => {
                            return (
                              <Tab
                                style={{ paddingTop: 0 }}
                                id={eachMirror.MIRROR_PROP}
                                key={eachMirror.MIRROR_PROP + eachMirrorIdx}
                                title={eachMirror.MIRROR_NAME}
                                panel={_.map(
                                  m_lc_store.versionList,
                                  (x, d, n) => {
                                    let crtVersion = x.value;
                                    let artifactList = _.chain(
                                      lc_store.detailList
                                    )
                                      .filter((x, d, n) => {
                                        return (
                                          x.VERSION == crtVersion &&
                                          x.MIRROR_PROP ==
                                            lc_store.CRT_MIRROR_PROP
                                        );
                                      })
                                      .value();
                                    let isOddVersion =
                                      parseInt(
                                        _.chain(x.value)
                                          .split(".")
                                          .last()
                                          .value()
                                      ) %
                                        2 !=
                                      0;
                                    let m_value = Moment(
                                      _.get(artifactList, "0.RELEASE_DATETIME")
                                    );
                                    return (
                                      <p key={x.value}>
                                        <h2
                                          style={{
                                            marginTop: 0,
                                            marginBottom: "8px",
                                          }}
                                        >
                                          {x.label
                                            ? x.label.startsWith("v")
                                              ? x.label
                                              : "v" + x.label
                                            : ""}
                                        </h2>
                                        <div
                                          style={{
                                            marginBottom: "8px",
                                          }}
                                          className="sub-mr-5"
                                        >
                                          <Tag intent={"none"}>
                                            {m_value.fromNow()}
                                          </Tag>
                                          <Tag intent={"success"}>
                                            {m_value.format(
                                              "YYYY-MM-DD HH:mm:ss"
                                            )}
                                          </Tag>
                                          <Tag
                                            intent={
                                              isOddVersion
                                                ? "warning"
                                                : "primary"
                                            }
                                          >
                                            {isOddVersion
                                              ? t("Odd-numbered Releases")
                                              : t(`Even-numbered Releases`)}
                                          </Tag>
                                        </div>
                                        <Simple_table
                                          data={artifactList}
                                          column={[
                                            {
                                              label: t(`Platform`),
                                              value: (x) => (
                                                <div>
                                                  {x["SUPPORTED_PLATFORM"]}
                                                </div>
                                              ),
                                              width: "140px",
                                            },
                                            {
                                              label: t(`Download Link`),
                                              value: (x) => (
                                                <div
                                                  style={{
                                                    overflow: "auto",
                                                    // maxWidth: "550px",
                                                    wordBreak: "break-all",
                                                  }}
                                                >
                                                  <a
                                                    href={x["LINK"]}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                  >
                                                    {_.chain(x["LINK"])
                                                      .split("/")
                                                      .last()
                                                      .value()}
                                                  </a>
                                                </div>
                                              ),
                                            },
                                            {
                                              label: t(`Size`),
                                              value: (x) => (
                                                <div
                                                  style={{
                                                    minWidth: "80px",
                                                  }}
                                                >
                                                  {(
                                                    x["ARTIFACT_SIZE_KB"] / 1024
                                                  ).toFixed(2) + "MB"}
                                                </div>
                                              ),
                                              width: "60px",
                                            },
                                            {
                                              label: t(`Operation`),
                                              value: (x) => (
                                                <div
                                                  className="sub-mr-5 b-center "
                                                  style={{
                                                    minWidth: "125px",
                                                  }}
                                                >
                                                  <a
                                                    href="javascript:void(0);"
                                                    onClick={() => {
                                                      gutils.copy(x["LINK"]);
                                                      gutils.alertOk("Copied");
                                                    }}
                                                  >
                                                    {t(`Copy`)}
                                                  </a>
                                                  <a
                                                    href={x["LINK"]}
                                                    target="_blank"
                                                  >
                                                    {t(`Download`)}
                                                  </a>
                                                  {[
                                                    "VERIFY_MD5",
                                                    "VERIFY_ASC",
                                                    `VERIFY_SHA1`,
                                                    `VERIFY_SHA512`,
                                                  ].map((eachLabel) => {
                                                    if (x[eachLabel]) {
                                                      return (
                                                        <a
                                                          href={
                                                            "javascript:void(0);"
                                                          }
                                                          target="_blank"
                                                          title={x[eachLabel]}
                                                          onClick={async (
                                                            e
                                                          ) => {
                                                            gutils.stop_e(e);
                                                            await gutils.win_alert_no_t(
                                                              x[eachLabel]
                                                            );
                                                          }}
                                                        >
                                                          {eachLabel
                                                            .replace(
                                                              "VERIFY_",
                                                              ""
                                                            )
                                                            .toUpperCase()}
                                                        </a>
                                                      );
                                                    } else {
                                                      return "";
                                                    }
                                                  })}
                                                </div>
                                              ),
                                              // width: "60px",
                                            },
                                          ]}
                                        ></Simple_table>
                                      </p>
                                    );
                                  }
                                )}
                              />
                            );
                          }
                        )}
                        {/* <Tab
                      style={{ paddingTop: 0 }}
                      title={t(`About {0}`, crtServiceItem.appLabel)}
                      panel={
                        <div>
                          <h1></h1>
                        </div>
                      }
                    ></Tab> */}
                      </Tabs>
                    }
                  ></Tab>
                </Tabs>
              </div>
            );
          } else {
            return (
              <div className={myfileLess["softwarecenter-wrapper"]}>
                unknown request, please click{" "}
                <Link to={"/exts/SoftwareCenter?type=all"}>here</Link> to return{" "}
              </div>
            );
          }
        }),
      })
    ),
  };
};
