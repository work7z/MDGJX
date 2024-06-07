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
  Tag,
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
  GSyncSelectWithFilter,
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
import mapi from "../../TranslateForJSON/frontend/kit/common_api";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import PreRequisiteJson from "../pre-requisite.json";
import myfileLess from "./myfile.less";

let appTitle = "CDN Static Resource";
let appName = appTitle;
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appName,
  viewName: appName,
};
let fn_debounceCall = _.debounce((obj) => {
  obj.fn();
}, 50);
let Simple_table = cutils.Simple_table;

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    unlimited_view_mode: true,
    initialState() {
      return {
        todayStr: null,
        disable_translation: true,
        using_what_cdn_service: null,
        view_obj: {},
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
        left_hist_use_all: true,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let [flag, onFlag] = useState(0);
          let hist = useHistory();
          let lc_store = useLocalStore(() => {
            return {
              libDetailVer: [],
              flag: 0,
              search_str: "",
              loadingCDNDetailFromOnline: false,
              lib: [],
              loadingText: "",
              todaySuggestion: [],
              searchResultArr: [],
              detailObj: {},
              loadingDetail: false,
              hasDetailValue: true,
              updatingDetailValue: false,
              versionObj: {},
            };
          });
          if (gutils.dev()) {
            window.test001 = lc_store;
          }
          let fn_initByLogic = async () => {
            //
          };
          let fn_checkUpdateSuggestion = async () => {
            if (_.size(lc_store.libraries) == 0) {
              return;
            }
            let randomSize = 15;
            let item = _.random(
              0,
              _.size(lc_store.libraries, false) - randomSize + 2
            );
            let resultArr = lc_store.libraries.slice(item, item + randomSize);
            lc_store.todaySuggestion = resultArr;
            fn_initByLogic({
              prop: "todaySuggestion",
            });
          };
          let fn_loadCDNLibraries = async () => {
            try {
              lc_store.loadingText = t(`Loading CDN Libraries Data`);
              await mapi.opt("/cdn/get_cdn_lib", {}, ({ ftlMap }) => {
                console.log("get_cdn_lib", get_cdn_lib);
                let get_cdn_lib = ftlMap;
                console.log(get_cdn_lib);
                lc_store.libraries = get_cdn_lib.libMap;
                lc_store.loadingText = null;
                fn_checkUpdateSuggestion();
              });
              // let get_cdn_lib = await gref.optAPI(`get_cdn_lib`);
            } catch (e) {
              lc_store.loadingText = gutils.getErrMsg(e);
            }
          };
          let fn_updateCdnLib = async () => {
            // lc_store.loadingText = t(`Retrieving CDN Most Recent Data...`);
            // await gref.optAPI(`update_cdn_lib_from_online`, {
            //   alert_muted: true,
            // });
            // // lc_store.loadingText = t(`Retrieved`);
            // fn_loadCDNLibraries();
          };
          useEffect(() => {
            let a = PUtils.loop(fn_loadCDNLibraries, -1);
            let b = PUtils.loop(async () => {
              await fn_updateCdnLib();
              // fn_checkUpdateSuggestion();
              // if (PUtils.crtModel.todayStr != Moment().format("YYYY-MM-DD")) {
              //   PUtils.crtModel.todayStr = Moment().format("YYYY-MM-DD");
              // }
            }, -1);
            return () => {
              a();
              b();
            };
          }, []);
          PUtils.makeLeftHide();
          let isSearchEmpty =
            _.isNil(lc_store.search_str) || lc_store.search_str == "";
          let URLParams = PUtils.getURLParams();
          if (URLParams.type == "search") {
            useEffect(() => {
              let fn_inner_cdn_detail = async () => {
                lc_store.loadingDetail = true;
                try {
                  await mapi.opt(
                    "/cdn/get_cdn_detail",
                    {
                      id: URLParams.id,
                    },
                    ({ ftlMap }) => {
                      let cdnDetail = ftlMap.cdnDetail;
                      lc_store.detailObj = cdnDetail || {};
                      if (_.isEmpty(lc_store.detailObj)) {
                        gutils.alert(
                          t(
                            `Found an Empty Library, it seems the CDN Service Providers are not yet synchronized this one.`
                          )
                        );
                        throw new Error("Data is Empty");
                      }
                      lc_store.hasDetailValue = !_.isEmpty(lc_store.detailObj);
                      let firstValue = _.chain(lc_store.detailObj)
                        .get("assets")
                        .map((x) => ({ label: x.version, value: x.version }))
                        .first()
                        .get("value")
                        .value();
                      PUtils.crtModel.view_obj[URLParams.id] = firstValue;
                      fn_updateByVersion(firstValue);
                      // lc_store.flag++;
                      // onFlag(flag + 1);
                    }
                  );
                  // let cdnDetail = await gref.optAPI(`get_cdn_detail`, {
                  //   id: URLParams.id,
                  // });
                } catch (e) {
                  lc_store.detailObj = {
                    description: gutils.getErrMsg(e),
                  };
                }
                lc_store.loadingDetail = false;
              };
              let a = PUtils.loop(fn_inner_cdn_detail, -1);
              let b = PUtils.loop(async () => {
                //
                // lc_store.loadingCDNDetailFromOnline = t(
                //   `Loading CDN Detail from the Online API...`
                // );
                // try {
                //   lc_store.loadingCDNDetailFromOnline = null;
                //   await gref.optAPI(`update_cdn_detail`, {
                //     id: URLParams.id,
                //     alert_muted: true,
                //   });
                //   await fn_inner_cdn_detail();
                // } catch (e) {
                //   lc_store.loadingCDNDetailFromOnline = t(
                //     `Exception: ${gutils.getErrMsg(e)}`
                //   );
                //   console.log("err", e);
                // }
              }, -1);
              return () => {
                a();
                b();
              };
            }, []);
            useEffect(() => {
              return PUtils.bindTitle(`${URLParams.id} - CDN Detail`);
            }, [lc_store.detailObj, PUtils.crtModel.view_obj[URLParams.id]]);
            let cdn_arr = [
              {
                id: "baomitu",
                host: t("BaoMiTu"),
                fn_href: (x) =>
                  `https://lib.baomitu.com/${URLParams.id}/${x.version}/${x.rsc_name}`,
                url: "https://cdn.baomitu.com/" + URLParams.id,
              },
              {
                id: "cdnjs",
                host: `CDNJS.com`,
                fn_href: (x) =>
                  `https://cdnjs.cloudflare.com/ajax/libs/${URLParams.id}/${x.version}/${x.rsc_name}`,
                url: `https://www.cdnjs.com/libraries/${URLParams.id}/`,
              },

              {
                id: "bytedance",
                fn_href: (x) =>
                  `https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/${URLParams.id}/${x.version}/${x.rsc_name}`,
                host: t("ByteDance"),
                url: `https://cdn.bytedance.com/?query=${URLParams.id}`,
              },

              {
                id: "bootcdn",
                host: `BootCDN`,
                fn_href: (x) =>
                  `https://cdn.bootcdn.net/ajax/libs/${URLParams.id}/${x.version}/${x.rsc_name}`,
                url: `https://www.bootcdn.cn/${URLParams.id}/`,
              },

              // {
              //   id: "jsdeliver",
              //   host: "JSdelivr",
              //   fn_href: (x) =>
              //     `https://cdn.jsdelivr.net/npm/${URLParams.id}@${x.version}/dist/${x.rsc_name}`,
              //   url: `https://www.jsdelivr.com/package/npm/${URLParams.id}`,
              // },
            ];
            let fn_updateByVersion = async (nextVersionValue) => {
              await mapi.opt(
                "/cdn/get_cdn_ver_detail",
                {
                  id: URLParams.id,
                  version: nextVersionValue + "",
                },
                ({ ftlMap }) => {
                  let libDetailVer = ftlMap.libDetailVer;
                  if (_.isEmpty(libDetailVer)) {
                    gutils.alert(
                      t(
                        `Found an Empty Version File, it seems the CDN Service Providers are not yet synchronized this one.`
                      )
                    );
                  } else {
                    lc_store.libDetailVer = libDetailVer;
                  }
                }
              );
            };
            let versionArr = _.chain(lc_store.detailObj)
              .get("assets")
              .map((x) => ({ label: x.version, value: x.version }))
              .value();
            if (
              _.isNil(PUtils.crtModel.view_obj[URLParams.id]) &&
              !_.isEmpty(versionArr)
            ) {
              gutils.defer(() => {});
            }
            if (_.isNil(PUtils.crtModel.using_what_cdn_service)) {
              PUtils.crtModel.using_what_cdn_service = _.get(cdn_arr, "0.id");
            }
            return (
              <div
                key11={flag}
                className={
                  myfileLess["g-cdn-wrapper"] +
                  " " +
                  myfileLess["g-search-wrapper"]
                }
              >
                <div className={myfileLess["banner-wrapper"]} style={{}}>
                  <h2 className={myfileLess["main-title"]}>{URLParams.id}</h2>
                  <h3 className={myfileLess["main-sub-title"]}>
                    {lc_store.loadingDetail ? (
                      <div>
                        Loading
                        <Blink />
                      </div>
                    ) : (
                      ""
                    )}
                    <div>{lc_store.detailObj.description}</div>
                  </h3>
                  {/* {"name":"3Dmol","version":"1.3.4","description":"Object oriented Javascript molecular visualization library","repository":{"type":"git","url":"https://github.com/3dmol/3Dmol.js.git"},"keywords":["3Dmol.js","webGL"],"homepage":"http://3dmol.csb.pitt.edu","license":"BSD-3-Clause","assets":[{"version":"1.3.4","files":["3Dmol-min.js","3Dmol-nojquery-min.js","3Dmol-nojquery.js","3Dmol.js"]},{"version":"1.3.3","files":["3Dmol-min.js","3Dmol-nojquery-min.js","3Dmol-nojquery.js","3Dmol.js"]},{"version":"1.3.0","files":["3Dmol-min.js","3Dmol-nojquery-min.js","3Dmol-nojquery.js","3Dmol.js"]},{"version":"1.2.0","files":["3Dmol-min.js","3Dmol-nojquery-min.js","3Dmol-nojquery.js","3Dmol.js"]},{"version":"1.1.1","files":["3Dmol-min.js","3Dmol-nojquery-min.js","3Dmol-nojquery.js","3Dmol.js"]},{"version":"1.1.0","files":["3Dmol-min.js","3Dmol-nojquery-min.js","3Dmol-nojquery.js","3Dmol.js"]},{"version":"1.01","files":["3Dmol-min.js","3Dmol-nojquery-min.js","3Dmol-nojquery.js","3Dmol.js"]},{"version":"1.0.6","files":["3Dmol-min.js","3Dmol-nojquery-min.js","3Dmol-nojquery.js","3Dmol.js"]},{"version":"1.0.5","files":["3Dmol-min.js","3Dmol-nojquery-min.js","3Dmol-nojquery.js","3Dmol.js"]},{"version":"1.0.4","files":["3Dmol-min.js","3Dmol-nojquery-min.js","3Dmol-nojquery.js","3Dmol.js"]},{"version":"1.0.3","files":["3Dmol-min.js","3Dmol-nojquery-min.js","3Dmol-nojquery.js","3Dmol.js"]},{"version":"1.0.2","files":["3Dmol-min.js","3Dmol-nojquery-min.js","3Dmol-nojquery.js","3Dmol.js"]},{"version":"1.0","files":["3Dmol-min.js","3Dmol-nojquery-min.js","3Dmol-nojquery.js","3Dmol.js"]}],"stars":286} */}
                  <div className={myfileLess["float-wrapper-lr"]}>
                    <Button
                      onClick={() => {
                        gutils.hist.push("/exts/CDNTool100");
                      }}
                      minimal={
                        gstore.localSettings.is_using_dark_mode ? true : false
                      }
                      text={t(`Back to Home`)}
                    ></Button>
                  </div>
                </div>
                <div
                  className={
                    myfileLess["sub-desc-wrapper"] +
                    " " +
                    "sub-mr-5 c-normal-anchor "
                  }
                >
                  {[
                    _.get(lc_store.detailObj, "stars")
                      ? [
                          "" +
                            (_.get(lc_store.detailObj, "stars") > 1000
                              ? (
                                  _.get(lc_store.detailObj, "stars") / 1000
                                ).toFixed(0) + "k"
                              : _.get(lc_store.detailObj, "stars")) +
                            " Stars",
                          "javascript:void(0);",
                          "bp3-intent-primary",
                        ]
                      : null,
                    _.get(lc_store.detailObj, "version")
                      ? [
                          "Latest v" + _.get(lc_store.detailObj, "version"),
                          "javascript:void(0);",
                          "bp3-intent-primary",
                        ]
                      : null,
                    _.get(lc_store.detailObj, "license")
                      ? [
                          "" +
                            _.get(lc_store.detailObj, "license") +
                            " License",
                          "javascript:void(0);",
                        ]
                      : null,
                    [t("Home Page"), lc_store.detailObj.homepage],
                    ["Github", _.get(lc_store.detailObj, "repository.url")],
                  ]
                    .filter((x) => !_.isNil(x) && !_.isNil(x[1]))
                    .map((x, d, n) => {
                      let a_props = {
                        key: x[0],
                        className:
                          "bp3-tag bp3-round bp3-large bp3-interactive" +
                          " " +
                          x[2],
                        href: x[1] == "javascript:void(0);" ? undefined : x[1],
                        target:
                          x[1] != "javascript:void(0);" ? "_blank" : undefined,
                      };
                      if (x[1] == "javascript:void(0);") {
                        return <span {...a_props}>{x[0]}</span>;
                      }
                      return <a {...a_props}>{x[0]}</a>;
                    })}
                </div>
                <div
                  style={{
                    display: lc_store.loadingDetail ? "none" : null,
                  }}
                  className={myfileLess["cdn-body-wrapper"]}
                >
                  <div className={myfileLess["cdn-lists"]}>
                    <h3>
                      1. {t(`CDN Resources List`)}
                      {lc_store.loadingCDNDetailFromOnline ? (
                        <span
                          style={{ color: "red" }}
                        >{`(${lc_store.loadingCDNDetailFromOnline})`}</span>
                      ) : (
                        ""
                      )}
                    </h3>
                    <div>
                      <p
                        className="sub-mr-5  sub-all-light beflex"
                        style={{
                          // justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <FormGroup label={t(`View Version`)} inline={true}>
                          <GSyncSelectWithFilter
                            small={true}
                            obj={PUtils.crtModel.view_obj}
                            list={versionArr}
                            index={URLParams.id}
                            whenChg={(x) => {
                              PUtils.crtModel.view_obj[URLParams.id] = x;
                              fn_updateByVersion(x);
                            }}
                          />
                        </FormGroup>
                        <FormGroup
                          label={t(`CDN Service Provider`)}
                          inline={true}
                        >
                          <GSyncSelectWithFilter
                            small={true}
                            obj={PUtils.crtModel}
                            list={_.map(cdn_arr, (x, d, n) => {
                              return {
                                label: x.host,
                                value: x.id,
                              };
                            })}
                            index={"using_what_cdn_service"}
                            whenChg={(x) => {
                              PUtils.crtModel.using_what_cdn_service = x;
                            }}
                          />
                        </FormGroup>
                      </p>
                      <Simple_table
                        column={[
                          {
                            label: t(`Version`),
                            value: (x) => (
                              <div style={{ maxWidth: "80px" }}>
                                {x.version}
                              </div>
                            ),
                          },
                          {
                            label: t(`Resource Name`),
                            value: (x) => (
                              <a target="_blank" href={x.href}>
                                {x.rsc_name}
                              </a>
                            ),
                          },
                          {
                            label: t(`Operation`),
                            width: 400,
                            center: true,
                            value: (x) => (
                              <div
                                style={{
                                  textAlign: "center",
                                }}
                                className="sub-mr-5"
                              >
                                <Button
                                  small={true}
                                  intent={"primary"}
                                  text={t(`Copy Tag`, "<script>")}
                                  onClick={() => {
                                    let copyVal = `<script src="${x.href}"></script>`;
                                    if (x.href.endsWith("css")) {
                                      copyVal = `<link href="${x.href}" rel="stylesheet" />`;
                                    } else if (x.href.endsWith("svg")) {
                                      copyVal = `<embed src="${x.href}" type="image/svg+xml" />`;
                                    }
                                    gutils.copy(copyVal);
                                    gutils.alertOk("Copied the Tag!");
                                  }}
                                ></Button>
                                <Button
                                  small={true}
                                  intent={"success"}
                                  text={t(`Copy Link`)}
                                  onClick={() => {
                                    let copyVal = x.href;
                                    gutils.copy(copyVal);
                                    gutils.alertOk("Copied the Link!");
                                  }}
                                ></Button>
                                <Button
                                  small={true}
                                  // intent={"warning"}
                                  text={t(`View Source`)}
                                  onClick={async () => {
                                    let url = x.href;
                                    try {
                                      gutils.alert(
                                        `Reading the content from the CDN provider the page selected`
                                      );
                                      let { data } = await axios(url);
                                      gutils.alertOk(
                                        "Read the content successfully!"
                                      );
                                      console.log(data);
                                      gutils.w_alertMsgGlobal(
                                        _.merge({
                                          noBackdrop: false,
                                          icon: "signal-search",
                                          style: {
                                            position: "absolute",
                                            left: "50%",
                                            top: "50%",
                                            transform: "translate(-50%, -50%)",
                                            width: "61.8vw",
                                            height: "85vh",
                                            paddingBottom: "0px",
                                          },
                                          otherJSX: {
                                            noBackdrop: false,
                                          },
                                          no_padding: true,
                                          s_clzname: "white-app-view-no-pad",
                                          title:
                                            t(
                                              `Source Viewer: {0}`,
                                              x.rsc_f_name
                                            ) + ``,
                                          jsx: () => {
                                            return (
                                              <div
                                                style={{
                                                  width: "100%",
                                                  // height: "calc(100% - 30px)",
                                                  height: "100%",
                                                  overflow: "hidden",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    width: "100%",
                                                    height: "100%",
                                                  }}
                                                >
                                                  {PUtils.jsx.createGEditorWithNoStorageAndSimple(
                                                    {
                                                      readOnly: true,
                                                      fontSize: 11,
                                                      title: url,
                                                      wordWrap: "on",
                                                      loading: false,
                                                      key: "unknown",
                                                      language:
                                                        x.rsc_f_name.endsWith(
                                                          "js"
                                                        )
                                                          ? "javascript"
                                                          : x.rsc_f_name.endsWith(
                                                              "css"
                                                            )
                                                          ? "css"
                                                          : "",
                                                      directValue: data,
                                                      onRef(ref) {
                                                        console.log("ref", ref);
                                                      },
                                                    }
                                                  )}
                                                </div>
                                              </div>
                                            );
                                          },
                                          noFoot: true,
                                          resize: false,
                                        })
                                      );
                                    } catch (e) {
                                      gutils.alert(gutils.getErrMsg(e));
                                    }
                                  }}
                                ></Button>
                              </div>
                            ),
                          },
                        ]}
                        data={_.chain([lc_store.libDetailVer])
                          .map((x, d, n) => {
                            return _.map(x.files, (xx, dd, nn) => {
                              let fin = null; // `https://cdn.bootcdn.net/ajax/libs/${URLParams.id}/${x.version}/${xx}`
                              let item = _.find(
                                cdn_arr,
                                (x) =>
                                  x.id == PUtils.crtModel.using_what_cdn_service
                              );
                              let b = {
                                rsc_name: xx,
                                rsc_f_name: "/" + x.version + "/" + xx,
                                ...x,
                                files: undefined,
                              };
                              if (!_.isNil(item)) {
                                fin = item.fn_href(b);
                              }
                              b.href = fin;
                              return b;
                            });
                          })
                          .flatten()
                          // .filter((x) => {
                          //   return (
                          //     x.version ==
                          //     PUtils.crtModel.view_obj[URLParams.id]
                          //   );
                          // })
                          .value()}
                      ></Simple_table>
                    </div>
                  </div>
                  <div className={myfileLess["cdn-lists"]}>
                    <h3>2. {t(`About this Project`)}</h3>
                    <div>
                      <Simple_table
                        column={[
                          {
                            label: t(`Label`),
                            value: (x) => x.label,
                          },
                          {
                            label: t(`Value`),
                            value: (x) => x.value,
                          },
                        ]}
                        data={[
                          {
                            label: t(`License`),
                            value: lc_store.detailObj.license,
                          },
                          _.isNil(lc_store.detailObj.npmName)
                            ? null
                            : {
                                label: t(`NPM Page`),
                                value: (
                                  <a
                                    target="_blank"
                                    href={
                                      "https://www.npmjs.com/package/" +
                                      lc_store.detailObj.npmName
                                    }
                                  >
                                    {lc_store.detailObj.npmName}
                                  </a>
                                ),
                              },
                          {
                            label: t(`KeyWord List`),
                            value: _.join(lc_store.detailObj.keywords, ","),
                          },
                        ].filter((x) => !_.isNil(x))}
                      ></Simple_table>
                    </div>
                  </div>
                  <div className={myfileLess["cdn-lists"]}>
                    <h3>3. {t(`Online CDN Pages`)}</h3>
                    <div>
                      <Simple_table
                        column={[
                          {
                            label: t(`CDN Service Provider`),
                            value: (x) => x.host,
                          },
                          {
                            label: t(`Quick Access URL`),
                            value: (x) => (
                              <a href={x.url} target="_blank">
                                {x.url}
                              </a>
                            ),
                          },
                        ]}
                        data={cdn_arr}
                      />
                    </div>
                    <p style={{ margin: "10px 0" }}>
                      <Callout title={t(`Friendly Reminder`)}>
                        {t(
                          `To use these online CDN services above properly, you should read their related terms and conditions. Most of all, CodeGen has no relationship of interest with these service providers.`
                        )}
                        {t(
                          `Lastly, if you want CodeGen to add new CDN service provider, please feel free to contact us via E-Mail at any time.`
                        )}
                      </Callout>
                    </p>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div className={myfileLess["g-cdn-wrapper"]}>
              <div className={myfileLess["banner-wrapper"]} style={{}}>
                <h2 className={myfileLess["main-title"]}>
                  {t(`CDN Static Resources Search Service`)}
                </h2>
                <h3 className={myfileLess["main-sub-title"]}>
                  {t(
                    `The tool can help you search the latest Front-End Library swiftly, CodeGen will update its data daily.`
                  )}{" "}
                  {t(
                    `Not merely does copy the CDN link, but you can also read its code and switch among multiple mirrors smartly.`
                  )}{" "}
                  {t(
                    `Now you can input any keyword to search the library you want, let's go!`
                  )}
                </h3>
                <p>
                  {t(
                    `Including {0} front-end open source projects`,
                    _.size(lc_store.libraries)
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
                    style={{ width: "600px", margin: "0 auto" }}
                    large={true}
                    placeholder={t(`Search Open Source Projects, like React`)}
                    value={lc_store.search_str}
                    asyncControl={true}
                    onChange={(e) => {
                      lc_store.search_str = gutils.getValueFromE(e);
                      fn_debounceCall({
                        fn: async () => {
                          debugger;
                          let lib = lc_store.libraries;
                          let formatX = (val) => {
                            return _.toLower(val).replace(/\s/g, "");
                          };
                          let smallSearchStr = formatX(lc_store.search_str);
                          let enoughArr = [];
                          _.forEach(lib, (x, d, n) => {
                            console.log(
                              `enoughArr -> search`,
                              formatX(x[0]),
                              smallSearchStr
                            );
                            if (formatX(x[0]).indexOf(smallSearchStr) != -1) {
                              enoughArr.push(x);
                            }
                          });
                          console.log("enoughArr", enoughArr);

                          enoughArr = _.take(
                            _.sortBy(enoughArr, (x) => {
                              return x[0] == smallSearchStr
                                ? -10000000000
                                : x[2] * -1;
                            }),
                            100
                          );
                          lc_store.searchResultArr = [...enoughArr];
                        },
                      });
                    }}
                  ></InputGroup>
                </p>
              </div>
              <div className={myfileLess["cdn-body-wrapper"]}>
                <div className={myfileLess["cdn-lists"]}>
                  <h3>
                    {isSearchEmpty
                      ? t(`Today Suggestions`)
                      : _.isEmpty(lc_store.searchResultArr)
                      ? t(`Result is Empty`)
                      : t(`Search Result`)}
                  </h3>
                  {lc_store.loadingText && lc_store.loadingText != "" ? (
                    <Card>
                      <Callout intent="none" title={t(`Updating CDN Data`)}>
                        {lc_store.loadingText}
                        <Blink />
                      </Callout>
                    </Card>
                  ) : (
                    ""
                  )}
                  <div>
                    {_.map(
                      isSearchEmpty
                        ? lc_store.todaySuggestion
                        : _.isEmpty(lc_store.searchResultArr)
                        ? [
                            [
                              t(`Resources Not Found`),
                              t(
                                `System cannot find related records, please try to adjust your keyword.`
                              ),
                            ],
                          ]
                        : lc_store.searchResultArr,
                      (x, d, n) => {
                        return (
                          <Link
                            // target="_blank"
                            to={"/exts/CDNTool100?type=search&id=" + x[0]}
                            className="p-crt-panel-body c-touch-anchor-panel c-border-gray"
                          >
                            <h4 className="p-crt-panel-first">{x[0]}</h4>
                            <div className="p-crt-panel-second bp3-text-muted">
                              {x[1]}
                            </div>
                          </Link>
                        );
                      }
                    )}
                  </div>
                  {/* <Card>this is card</Card>
                  <Card>this is card</Card> */}
                </div>
                <div className={myfileLess["cdn-helpers"]}>
                  <h3>{t(`CDN Data Tools`)}</h3>
                  <p className="sub-mr-5">
                    <Button
                      text={t(`Refresh Libraries List`)}
                      onClick={async () => {
                        await fn_loadCDNLibraries();
                        await fn_updateCdnLib();
                      }}
                    ></Button>
                    <Button
                      text={t(`Update Suggestions`)}
                      onClick={() => {
                        fn_checkUpdateSuggestion();
                      }}
                    ></Button>
                    {/* <Button
                      text={
                        PUtils.crtModel.disable_translation
                          ? t(`Enable Translation`)
                          : t(`Disable Translation`)
                      }
                      onClick={() => {
                        PUtils.crtModel.disable_translation =
                          !PUtils.crtModel.disable_translation;
                      }}
                    ></Button> */}
                  </p>
                </div>
              </div>
              {/* <div>Footer</div> */}
            </div>
          );
        }),
      })
    ),
  };
};
