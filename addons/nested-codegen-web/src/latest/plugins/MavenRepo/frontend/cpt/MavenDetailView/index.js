const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GSyncSelectWithFilter,
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
import FormCrudTable from "../../../../TranslateForJSON/frontend/cpt/FormCrudTable";
import FormEasyTable from "../../../../TranslateForJSON/frontend/cpt/FormEasyTable";
import SpinLoading from "../../../../TranslateForJSON/frontend/cpt/SpinLoading";
import SpinLoading2 from "../../../../TranslateForJSON/frontend/cpt/SpinLoading2";
import cutils from "../../../../TranslateForJSON/frontend/kit/common_utils";
import MavenDepsCopier from "../MavenDepsCopier";
import myfileLess from "./index.less";

const MavenDetailView = observer((props) => {
  let { gref, groupId, PUtils, artifactId, version } = props;
  let hasVersion = !(_.isNil(version) || version == "");
  let lc_store = useLocalStore(() => {
    return {
      version_filter_str: "",
      loadingDetail: null,
      metadata: {},
      meta: {
        exist: true,
      },
      crt_version_id: null,
      metaViewTableData: [],

      verDetailObj: {
        description: null,
      },
    };
  });
  let { verDetailObj } = lc_store;
  let packaging = _.trim(verDetailObj.packaging);
  if (_.trim(packaging) == "") {
    packaging = "jar";
  }
  let fn_init_crt_version = async () => {
    let version_id = lc_store.crt_version_id;
    if (!_.isNil(version_id)) {
      lc_store.verDetailObj.description = t(
        `Loading the description from the selected version...`
      );
      let { data } = await gref.optAPI(`mvn_ver_detail`, {
        crt_mirror_id: PUtils.crtModel.crt_mirror_id,
        groupId,
        artifactId,
        version: hasVersion ? version : version_id,
      });
      let { ver } = data;
      if (ver.exist) {
        let obj = ver.obj;
        lc_store.verDetailObj = obj;
      } else {
        cutils.alertErr_noT(t(`Resource Not Exist`));
        lc_store.verDetailObj.description = t(`Resource Not Exist`);
      }
    }
  };
  window.tmp_data_lc_store = lc_store;
  let fn_get_Maven_URL = () => {
    // return "https://mirrors.cloud.tencent.com/nexus/repository/maven-public/";
    return _.get(lc_store, "meta.fullURL");
  };
  let fn_get_res_with_version_and_ext = ({ version, artifactId, ext }) => {
    return (
      fn_get_Maven_URL() +
      "/" +
      version +
      "/" +
      (artifactId + "-" + version + ext)
    );
  };
  let fn_init_fn = async () => {
    try {
      lc_store.loadingDetail = t(`Loading the meta data...`);
      let { data } = await gref.optAPI("mvn_metadata", {
        crt_mirror_id: PUtils.crtModel.crt_mirror_id,
        groupId,
        artifactId,
      });
      let { meta } = data;
      if (meta.exist) {
        meta.obj.versions = _.map(meta.obj.versions, (x, d, n) => {
          return {
            label: x,
            value: x,
            version: x,
          };
        });
      }
      lc_store.meta = meta;
      lc_store.mirrors_mappings = _.map(meta.mirrors_mappings, (x, d, n) => {
        return {
          ...x,
          label: t(...x.label),
          value: x.id,
        };
      });
      lc_store.loadingDetail = null;
      lc_store.metaViewTableData = _.get(meta, "obj.versions");
      lc_store.crt_version_id = _.get(meta, "obj.versions[0].value");
      fn_init_crt_version();
    } catch (e) {
      cutils.alertErr_noT(
        t(`An Error Occurred, the msg is {0}`, gutils.getErrMsg(e))
      );
    }
  };
  useEffect(() => {
    gutils.defer(fn_init_fn);
  }, []);

  useEffect(() => {
    return PUtils.bindTitle(
      t(`{0} - Maven Detail`, `${groupId}/${artifactId}`)
    );
  }, [groupId, artifactId]);
  let fn_get_href_link = (x) => {
    return (
      "/exts/ROOT_EXTENSION_ADDONS?" +
      Qs.stringify({
        type: "detail",
        version: x["version"],
        groupId: x.groupId || groupId,
        artifactId: x.artifactId || artifactId,
      })
    );
  };
  let fn_get_href_link_2 = (x) => {
    return (
      "/exts/ROOT_EXTENSION_ADDONS?" +
      Qs.stringify({
        type: "detail",
        version: x["version"],
        groupId: x.groupId,
        artifactId: x.artifactId,
      })
    );
  };
  let val_latestVer = _.get(lc_store, "meta.obj.latestVersion", "N/A");
  let val_lastUpdated = _.get(lc_store, "meta.obj.lastUpdated", null);
  let val_releaseVer = _.get(lc_store, "meta.obj.releaseVersion", "N/A");
  let val_iptYear = _.get(lc_store, "verDetailObj.inceptionYear");
  let label_jar_war_nothing =
    packaging == "jar"
      ? {
          label: "Jar",
          ext: ".jar",
        }
      : packaging == "war"
      ? {
          label: "War",
          ext: ".war",
        }
      : null;
  let meta_simpleTableColumn = [
    {
      label: t(`Version`),
      // center: true,
      value: (x) => {
        return (
          <Link
            className="bp3-minimal bp3-round bp3-tag "
            to={fn_get_href_link(x)}
          >
            {x["version"]}
          </Link>
        );
      },
    },
    {
      label: t(`Drill Down`),
      // center: true,
      value: (x, d) => <Link to={fn_get_href_link(x)}>{x["version"]}</Link>,
    },
    {
      label: t(`Resources`),
      center: true,
      value: (x) => {
        return (
          <div className="sub-mr-5">
            {[
              {
                label: t(`Drill`),
                type: "internal",
                url: fn_get_href_link(x),
              },
              label_jar_war_nothing
                ? {
                    label: label_jar_war_nothing.label,
                    url: fn_get_res_with_version_and_ext({
                      version: x.version,
                      artifactId: artifactId,
                      ext: label_jar_war_nothing.ext,
                    }),
                  }
                : null,
              {
                label: `POM`,
                url: fn_get_res_with_version_and_ext({
                  version: x.version,
                  artifactId: artifactId,
                  ext: ".pom",
                }),
              },
              {
                label: t(`Docs`),
                url: fn_get_res_with_version_and_ext({
                  version: x.version,
                  artifactId: artifactId,
                  ext: "-javadoc.jar",
                }),
              },
              {
                label: t(`JavaSrc`),
                url: fn_get_res_with_version_and_ext({
                  version: x.version,
                  artifactId: artifactId,
                  ext: "-sources.jar",
                }),
              },
            ]
              .filter((x) => !_.isNil(x))
              .map((x, d, n) => {
                if (x.url && x.type != "internal") {
                  return (
                    <a
                      target={x.url ? "target" : null}
                      href={
                        x.url ? x.url : `/exts/MavenRepo?` + Qs.stringify(x.qs)
                      }
                    >
                      {x.label}
                    </a>
                  );
                }
                return (
                  <Link
                    target={x.url ? "target" : null}
                    to={x.url ? x.url : `/exts/MavenRepo?` + Qs.stringify(x.qs)}
                  >
                    {x.label}
                  </Link>
                );
              })}
          </div>
        );
      },
    },
    {
      label: t(`Operation`),
      center: true,
      value: (x) => {
        return (
          <div className="sub-mr-5">
            <a
              target="_blank"
              className="bp3-button   bp3-small"
              href={
                `https://repo1.maven.org/maven2/` +
                [
                  ...(groupId + "").replaceAll(/\./g, "/").split("/"),
                  ...(artifactId + "").replaceAll(/\./g, "/").split("/"),
                  x.version,
                ]
                  .filter((x) => !_.isNil(x))
                  .join("/")
              }
            >
              {t(`Asserts`)}
            </a>
            <a
              className="bp3-button    bp3-small"
              href={fn_get_res_with_version_and_ext({
                version: x.version,
                artifactId: artifactId,
                ext: ".pom",
              })}
              target="_blank"
            >
              {t(`View POM`)}
            </a>
            <Link
              className="bp3-button  bp3-intent-primary bp3-small"
              to={fn_get_href_link(x)}
            >
              {t(`More Info`)}
            </Link>
          </div>
        );
      },
    },
  ];
  let tmpURL = _.get(lc_store, "verDetailObj.url");
  return (
    <div
      className={
        myfileLess["g-mvndetail-wrapper"] + " " + myfileLess["g-search-wrapper"]
      }
    >
      <div className={myfileLess["banner-wrapper"]} style={{}}>
        <h2 className={myfileLess["main-title"]}>
          {groupId} / {artifactId} {hasVersion ? ` / ${version}` : ""}
        </h2>
        <h3 className={myfileLess["main-sub-title"]}>
          {lc_store.loadingDetail ? (
            <div>
              {lc_store.loadingDetail}
              <Blink />
            </div>
          ) : (
            [
              <div>
                {lc_store.verDetailObj.description ||
                  t(`No Available Description.`)}
              </div>,
            ]
          )}
        </h3>
        <div className={myfileLess["float-wrapper-lr"]}>
          <Button
            onClick={() => {
              gutils.hist.push("/exts/MavenRepo");
            }}
            minimal={gstore.localSettings.is_using_dark_mode ? true : false}
            text={t(`Back to Home`)}
          ></Button>
        </div>
      </div>
      <div
        className={
          myfileLess["sub-desc-wrapper"] + " " + "sub-mr-5 c-normal-anchor "
        }
      >
        {[
          tmpURL ? [t(`Home Page`, tmpURL), tmpURL, "bp3-intent-none"] : null,
          [
            "Release " + val_releaseVer,
            fn_get_href_link({ version: val_releaseVer }),
            "bp3-intent-primary",
          ],
          [
            "Latest " + val_latestVer,
            fn_get_href_link({ version: val_latestVer }),
            "bp3-intent-success",
          ],
          val_iptYear
            ? [
                t(`Since {0}`, val_iptYear),
                "javascript:void(0);",
                "bp3-intent-none",
              ]
            : null,
          !_.isEmpty(_.get(lc_store, "verDetailObj.licenseList"))
            ? [
                _.get(lc_store, "verDetailObj.licenseList[0].name"),
                _.get(lc_store, "verDetailObj.licenseList[0].url"),
                "bp3-intent-none",
              ]
            : null,
          val_lastUpdated
            ? [
                t(
                  `Last Released: {0}`,
                  Moment(val_lastUpdated, "YYYYMMDDHHmmss").fromNow()
                ),
                "javascript:void(0)",
                "bp3-intent-none",
              ]
            : null,
        ]
          .filter((x) => !_.isNil(x) && !_.isNil(x[1]))
          .map((x, d, n) => {
            let a_props = {
              key: x[0],
              className:
                "bp3-tag bp3-round bp3-large bp3-interactive" + " " + x[2],
              href:
                x[1] == "javascript:void(0);" || x[1] == "javascript:void(0)"
                  ? undefined
                  : x[1],
              target:
                x[1] != "javascript:void(0);" && x[1] != "javascript:void(0)"
                  ? "_blank"
                  : undefined,
            };
            if (x[1] == "javascript:void(0);") {
              return <span {...a_props}>{x[0]}</span>;
            }
            if (x[1].startsWith("/exts")) {
              return (
                <Link {...a_props} to={a_props.href} target={null}>
                  {x[0]}
                </Link>
              );
            } else {
              return (
                <a {...a_props} to={a_props.href}>
                  {x[0]}
                </a>
              );
            }
          })}
      </div>
      <div style={{ position: "relative", minHeight: "400px" }}>
        <SpinLoading2 loading={lc_store.loadingDetail}>
          <div className={myfileLess["cdn-body-wrapper"]}>
            <div
              className={myfileLess["cdn-lists"]}
              style={{ paddingTop: "15px" }}
            >
              {!_.isNil(packaging) && packaging != "jar" ? (
                <p>
                  <Callout title={t(`About this Artifact`)}>
                    {t(
                      `Since the packaging type of this artifact is {0}, you can only download {2} file on this artifact page, not a {1} file.`,
                      packaging,
                      "Jar",
                      packaging
                    )}
                  </Callout>
                </p>
              ) : (
                ""
              )}
              <p>
                <MavenDepsCopier
                  versionList={lc_store["metaViewTableData"]}
                  artifactId={artifactId}
                  version={version}
                  groupId={groupId}
                  PUtils={PUtils}
                />
              </p>
              <p>
                {hasVersion ? (
                  <p>
                    <cutils.Simple_table
                      filterOptions={{
                        checkIndex: ["artifactId", "groupId", "version"],
                        placeholder: t(`Filter data by keywords`),
                      }}
                      title={t(`Internal Dependencies for this Artifact`)}
                      eachPageSize={10}
                      style={{ width: "100%" }}
                      data={_.get(lc_store, "verDetailObj.dependList")}
                      column={[
                        {
                          label: `Group ID`,
                          value: (x) => x.groupId,
                        },
                        {
                          label: `Artifact ID`,
                          value: (x) => {
                            if ((x.version || "").indexOf("${") != -1) {
                              return x.artifactId || "Unknown";
                            }
                            return (
                              <Link
                                // target="_blank"
                                to={fn_get_href_link_2({
                                  ...x,
                                })}
                              >
                                {x.artifactId || "Unknown"}
                              </Link>
                            );
                          },
                        },
                        {
                          label: t(`Version`),
                          value: (x) => x.version || t(`Latest Version`),
                        },
                        {
                          label: t(`Scope`),
                          value: (x) => x.scope || "compile",
                        },
                        {
                          label: t(`Operation`),
                          value: (x) => {
                            return (
                              <div className="sub-mr-5">
                                <Link
                                  // target="_blank"
                                  to={fn_get_href_link_2({
                                    ...x,
                                  })}
                                >
                                  {t(`Drill Down`)}
                                </Link>
                              </div>
                            );
                          },
                        },
                      ]}
                    ></cutils.Simple_table>
                  </p>
                ) : (
                  ""
                )}
                <p>
                  <cutils.Simple_table
                    filterOptions={{
                      checkIndex: ["version"],
                      placeholder: t(`Filter version by keywords`),
                    }}
                    title={t(`Artifact Version List`)}
                    eachPageSize={10}
                    style={{ width: "100%" }}
                    data={lc_store["metaViewTableData"]}
                    column={meta_simpleTableColumn}
                  ></cutils.Simple_table>
                </p>
                {true ? (
                  <p>
                    <cutils.Simple_table
                      filterOptions={{
                        checkIndex: ["email", "devID", "name"],
                        placeholder: t(`Filter data by keywords`),
                      }}
                      title={t(`Developers`)}
                      eachPageSize={10}
                      style={{ width: "100%" }}
                      data={_.get(lc_store, "verDetailObj.developerList")}
                      column={[
                        {
                          label: t(`Name`),
                          value: (x) => <div title={x.groupId}>{x.name}</div>,
                        },
                        {
                          label: t(`Role`),
                          value: (x) =>
                            _.chain(x)
                              .get("roleList")
                              .map((x) => x.name)
                              .join(", ")
                              .value(),
                        },
                        {
                          label: t(`E-Mail`),
                          value: (x) => {
                            if (x.email) {
                              return (
                                <a target="_blank" href={"mailto:" + x.email}>
                                  {x.email}
                                </a>
                              );
                            } else {
                              return "";
                            }
                          },
                        },
                        {
                          label: t(`orgName`),
                          value: (x) => {
                            if (x.orgName) {
                              return (
                                <a href={x.orgURL} target="_blank">
                                  {x.orgName}
                                </a>
                              );
                            } else {
                              return "";
                            }
                          },
                        },
                      ]}
                    ></cutils.Simple_table>
                  </p>
                ) : (
                  ""
                )}
                <p>
                  <cutils.Simple_table
                    filterOptions={{
                      checkIndex: ["url", "name"],
                      placeholder: t(`Filter data by keywords`),
                    }}
                    title={t(`Licenses`)}
                    eachPageSize={10}
                    style={{ width: "100%" }}
                    data={_.get(lc_store, "verDetailObj.licenseList")}
                    column={[
                      {
                        label: t(`Name`),
                        value: (x) => <div>{x.name}</div>,
                      },
                      {
                        label: t(`URL`),
                        value: (x) => (
                          <a href={x.url} target="_blank">
                            {x.url}
                          </a>
                        ),
                      },
                    ]}
                  ></cutils.Simple_table>
                </p>
                <p>
                  <cutils.Simple_table
                    filterOptions={{
                      checkIndex: ["url", "name"],
                      placeholder: t(`Filter data by keywords`),
                    }}
                    title={t(`Organizations`)}
                    eachPageSize={10}
                    style={{ width: "100%" }}
                    data={_.get(lc_store, "verDetailObj.orgList")}
                    column={[
                      {
                        label: t(`Name`),
                        value: (x) => <div>{x.name}</div>,
                      },
                      {
                        label: t(`URL`),
                        value: (x) => (
                          <a href={x.url} target="_blank">
                            {x.url}
                          </a>
                        ),
                      },
                    ]}
                  ></cutils.Simple_table>
                </p>
                <p>
                  <cutils.Simple_table
                    filterOptions={{
                      checkIndex: ["url", "name"],
                      placeholder: t(`Filter data by keywords`),
                    }}
                    title={t(`Further Information`)}
                    eachPageSize={10}
                    style={{ width: "100%" }}
                    data={[
                      {
                        name: "Name",
                        value: verDetailObj.name,
                      },
                      {
                        name: "Packaging",
                        value: verDetailObj.packaging,
                      },
                      {
                        name: t("Parent {0}", "Artifact"),
                        value: verDetailObj.parentGroupIDStr ? (
                          "N/A"
                        ) : (
                          <Link
                            to={{
                              ...fn_get_href_link_2({
                                artifactId: verDetailObj.parentArtifactIDStr,
                                groupId: verDetailObj.parentGroupIDStr,
                                version: verDetailObj.parentVersionStr,
                              }),
                            }}
                          >
                            {verDetailObj.parentGroupIDStr} /
                            {verDetailObj.parentArtifactIDStr} /
                            {verDetailObj.parentVersionStr}
                          </Link>
                        ),
                      },
                      verDetailObj.scmConnection
                        ? {
                            name: "SCM Connection",
                            url: verDetailObj.scmConnection,
                          }
                        : null,
                      verDetailObj.scmURL
                        ? {
                            name: "SCM URL",
                            url: verDetailObj.scmURL,
                          }
                        : null,
                    ].filter((x) => !_.isNil(x))}
                    column={[
                      {
                        label: t(`Name`),
                        value: (x) => <div>{x.name}</div>,
                      },
                      {
                        label: t(`Value`),
                        value: (x) => {
                          if (x.url) {
                            return (
                              <a href={x.url} target="_blank">
                                {x.url}
                              </a>
                            );
                          } else {
                            return x.value;
                          }
                        },
                      },
                    ]}
                  ></cutils.Simple_table>
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormGroup
                    label={t(`Mirror Settings`)}
                    style={{ width: "100%" }}
                  >
                    <GSyncSelectWithFilter
                      small={true}
                      obj={PUtils.crtModel}
                      index={"crt_mirror_id"}
                      list={lc_store.mirrors_mappings}
                      whenChg={(x) => {
                        PUtils.crtModel["crt_mirror_id"] = x;
                        fn_init_crt_version();
                        fn_init_fn();
                      }}
                    />
                  </FormGroup>
                </div>
              </p>
            </div>
          </div>
        </SpinLoading2>
      </div>
    </div>
  );
});

export default MavenDetailView;
