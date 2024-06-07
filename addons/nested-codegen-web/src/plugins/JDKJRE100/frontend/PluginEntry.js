const { Tabs, Tab } = CodeGenDefinition.BluePrintCpt;
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
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import PreRequisiteJson from "../pre-requisite.json";
import MetaJ from "./meta.js";
let appTitle = "Install JDK/JRE";
let appName = appTitle;
import myfileLess from "./myfile.less";
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appName,
  viewName: appName,
};
let c = cutils.cc(MetaJ.a);
let other = c["Other"];
let { Simple_table } = cutils;
// delete c["Other"];
const titleMap = {
  Other: {
    replace_title: t("Other"),
  },
  Adoptium_JDK: {
    replace_title: "Adoptium JDK",
  },
  Adoptium_JRE: {
    replace_title: "Adoptium JRE",
  },
  OpenJDK: {
    replace_title: "Open JDK",
  },
  OracleJDK: {
    replace_title: "Oracle JDK",
  },
  Graal: {
    replace_title: "Graal",
  },
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    unlimited_view_mode: true,
    initialState() {
      return {
        user_agree_disclaimer: false,
        tabId: null,
        myvalue: 12345,
        hide_disclaimer: false,
      };
    },
    menus: [
      {
        ...fn_otherPages.menu.getDocRootMenu(),
        children: [
          {
            ...fn_otherPages.menu.getSDKDownloadMenu(),
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
        left_hist_use_all: true,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          PUtils.makeLeftHide();
          if (_.isNil(PUtils.crtModel.tabId)) {
            PUtils.crtModel.tabId = _.get(_.keys(c), "0");
          }
          return (
            <div className={myfileLess["meta-wrapper"]}>
              <Tabs
                id="TabsExample"
                selectedTabId={PUtils.crtModel.tabId}
                onChange={(e) => {
                  PUtils.crtModel.tabId = e;
                }}
                vertical={true}
                large={true}
              >
                {_.map(
                  [..._.filter(_.keys(c), (x) => x != "Other"), "Other"],
                  (jdkProp) => {
                    let jdkContent = c[jdkProp];
                    let isOther = jdkProp == "Other";
                    let callOutLogic = (
                      <Callout title={t(`Disclaimer`)}>
                        <p>
                          {t(
                            `CodeGen needs to mention it to you that the mirror is NOT provided by CodeGen Team, what we listed here is a mere bookmark for the users which can help them find the SDK more quickly. As to the further license, you should read these licenses carefully on their official website. We also list their related website, to properly download and use these SDK, you should comply with their terms and condition.  The SDK listings does not constitute an offer of any business, commitment, guarantee or part of the contract, and does not have the legal effect as the contract or guarantee.`
                          )}
                        </p>
                        <p>
                          <h3>{t(`Download Service and SDK Provider`)}</h3>
                          <ul>
                            <li>
                              Adoptium-JDK:{" "}
                              <a
                                href={`https://mirrors.tuna.tsinghua.edu.cn`}
                                target="_blank"
                              >
                                Tuna Mirror
                              </a>
                            </li>
                            <li>
                              Adoptium-JRE:{" "}
                              <a
                                href={`https://mirrors.tuna.tsinghua.edu.cn`}
                                target="_blank"
                              >
                                Tuna Mirror
                              </a>
                            </li>
                            <li>
                              OpenJDK(WebHost): https://download.java.net/java/
                            </li>
                            <li>OpenJDK(Website): https://openjdk.org/</li>
                            <li>
                              Oracle JDK(Free Java License):
                              https://www.oracle.com/java/technologies/downloads/
                            </li>
                            <li>
                              Oracle JDK(Download Source): {t(`Huawei Cloud`)},
                              https://repo.huaweicloud.com/java/jdk/
                            </li>
                            <li>
                              Graal VM:
                              https://github.com/graalvm/graalvm-ce-builds
                            </li>
                            <li>
                              {t(
                                `Other VM Service, you can find its service provider via reading the base host.`
                              )}
                            </li>
                          </ul>
                        </p>
                        {!PUtils.crtModel.user_agree_disclaimer ? (
                          <p>
                            <Button
                              onClick={() => {
                                PUtils.crtModel.user_agree_disclaimer = true;
                              }}
                              intent={"primary"}
                              large={true}
                            >
                              {t(
                                `I have read related licenses and agree with what CodeGen said.`
                              )}
                            </Button>
                          </p>
                        ) : (
                          ""
                        )}
                      </Callout>
                    );
                    return (
                      <Tab
                        id={jdkProp}
                        title={_.get(
                          titleMap,
                          [jdkProp, "replace_title"],
                          jdkProp
                        )}
                        panel={
                          <div>
                            {!PUtils.crtModel.user_agree_disclaimer
                              ? callOutLogic
                              : ""}
                            <div
                              style={{
                                display: !PUtils.crtModel.user_agree_disclaimer
                                  ? "none"
                                  : null,
                              }}
                            >
                              {" "}
                              {_.map(
                                _.sortBy(_.keys(jdkContent), (x) => {
                                  let arr = x.split(/[\D+]/g);
                                  return _.first(arr) * -1;
                                }),
                                (eachVersionKey, idx) => {
                                  let eachVersionObj =
                                    jdkContent[eachVersionKey];
                                  return (
                                    <p>
                                      <h2>
                                        {(isOther
                                          ? idx + 1 + ", " + eachVersionKey
                                          : "Version " +
                                            eachVersionKey.replace(
                                              /\/$/g,
                                              ""
                                            )) + ""}
                                      </h2>
                                      <p>
                                        {isOther ? (
                                          <div>
                                            {t(`Reference`)}:{" "}
                                            <a
                                              href={eachVersionObj.url}
                                              target="_blank"
                                            >
                                              {eachVersionObj.url}
                                            </a>
                                          </div>
                                        ) : (
                                          <Simple_table
                                            data={_.map(
                                              eachVersionObj,
                                              (
                                                eachPlatformObj,
                                                eachPlatformKeys
                                              ) => {
                                                return {
                                                  eachPlatformKeys,
                                                  ...eachPlatformObj,
                                                };
                                              }
                                            )}
                                            column={[
                                              {
                                                label: t(`Platform`),
                                                value: (x) => (
                                                  <div
                                                    style={{
                                                      minWidth: "155px",
                                                    }}
                                                  >
                                                    {x["eachPlatformKeys"]}
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
                                                      maxWidth: "550px",
                                                      wordBreak: "break-all",
                                                    }}
                                                  >
                                                    <a
                                                      href={x["url"]}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                    >
                                                      {x["url"]}
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
                                                    {x["size"]
                                                      ? x["size"]
                                                          .replace("MiB", "MB")
                                                          .replace("MB", "M")
                                                          .replace(/\s/g, "")
                                                          .replace("M", " M")
                                                      : "N/A"}
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
                                                        gutils.copy(x["url"]);
                                                        gutils.alertOk(
                                                          "Copied"
                                                        );
                                                      }}
                                                    >
                                                      {t(`Copy`)}
                                                    </a>
                                                    <a
                                                      href={x["url"]}
                                                      target="_blank"
                                                    >
                                                      {t(`Download`)}
                                                    </a>
                                                    {["sha", "md5"].map(
                                                      (eachLabel) => {
                                                        if (x[eachLabel]) {
                                                          return (
                                                            <a
                                                              href={
                                                                "javascript:void(0);"
                                                              }
                                                              target="_blank"
                                                              title={
                                                                x[eachLabel]
                                                              }
                                                              onClick={async (
                                                                e
                                                              ) => {
                                                                gutils.stop_e(
                                                                  e
                                                                );
                                                                await gutils.win_alert(
                                                                  x[eachLabel]
                                                                );
                                                              }}
                                                            >
                                                              {eachLabel.toUpperCase()}
                                                            </a>
                                                          );
                                                        } else {
                                                          return "";
                                                        }
                                                      }
                                                    )}
                                                  </div>
                                                ),
                                                width: "60px",
                                              },
                                            ]}
                                          ></Simple_table>
                                        )}
                                      </p>
                                    </p>
                                  );
                                }
                              )}
                            </div>
                            {PUtils.crtModel.user_agree_disclaimer
                              ? callOutLogic
                              : ""}
                          </div>
                        }
                      ></Tab>
                    );
                  }
                )}
              </Tabs>
            </div>
          );
        }),
      })
    ),
  };
};
