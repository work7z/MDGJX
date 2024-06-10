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
import BackApostrophe from "../../../../TranslateForJSON/frontend/cpt/BackApostrophe";
import FormCrudTable from "../../../../TranslateForJSON/frontend/cpt/FormCrudTable";
import FormEasyTable from "../../../../TranslateForJSON/frontend/cpt/FormEasyTable";
const { Tabs, Tab } = CodeGenDefinition.BluePrintCpt;
import HighlightText from "../../../../TranslateForJSON/frontend/cpt/HighlightText";
import MarkDownViewerTool from "../../../../TranslateForJSON/frontend/cpt/MarkDownViewerTool";
import SpinLoading from "../../../../TranslateForJSON/frontend/cpt/SpinLoading";
import SpinLoading2 from "../../../../TranslateForJSON/frontend/cpt/SpinLoading2";
import cutils from "../../../../TranslateForJSON/frontend/kit/common_utils";
import CanIUseSinglePage from "../CanIUseSinglePage";
import myfileLess from "./index.less";

const CanIUseDetailView = observer((props) => {
  let { remainValues, PUtils, gref, id } = props;
  let lc_store = useLocalStore(() => {
    return {
      crt_active_id: null,
      loading: false,
      detail: {},
    };
  });
  useEffect(() => {
    gutils.defer(async () => {
      lc_store.loading = true;
      try {
        let mref = await gref.optAPI(`get_caniuse_detail`, {
          id: id,
        });
        lc_store.detail = _.get(mref, "data.detailObj");
      } catch (e) {
        console.log("err", e);
      } finally {
        lc_store.loading = false;
      }
    });
  }, []);
  let crtDetail = lc_store.detail;
  let statuses = _.get(remainValues, "statuses");
  if (lc_store.loading) {
    return (
      <div
        style={{
          padding: "10px",
        }}
      >
        Loading...
      </div>
    );
  }
  let allAgents = _.get(remainValues, "agents");
  let val_keywords = _.get(crtDetail, "keywords");
  let val_notes = _.get(crtDetail, "notes");
  let val_bugs = _.get(crtDetail, "bugs");
  let val_links = _.get(crtDetail, "links");
  let stats = _.get(crtDetail, "stats");
  let val_notes_by_num = _.get(crtDetail, "notes_by_num");
  let browserViewArrForPC = [
    {
      id: "chrome",
      color: "rgb(63, 119, 187)",
    },
    {
      id: "edge",
      color: "rgb(56, 88, 132)",
    },
    {
      id: "safari",
      color: "rgb(102, 102, 102)",
    },
    {
      id: "firefox",
      color: "rgb(163, 98, 35)",
    },
    {
      id: "opera",
      color: "rgb(129, 35, 35)",
    },
    {
      id: "ie",
      color: "rgb(56, 88, 132)",
    },
  ];
  let c_black = `var(--app-text-viewblack-pure)`;
  let browserViewArrForMoble = [
    {
      id: "android",
      color: "rgb(123, 161, 59)",
    },
    {
      id: "and_chr",
      color: "rgb(63, 119, 187)",
    },
    {
      id: "ios_saf",
      color: "rgb(102, 102, 102)",
    },
    {
      id: "and_ff",
      color: "rgb(163, 98, 35)",
    },
    {
      id: "samsung",
      color: "rgb(143 71 255)",
    },
    {
      id: "op_mob",
      color: "rgb(153, 38, 38)",
    },
    {
      id: "op_mini",
      color: "rgb(153, 38, 38)",
    },
    {
      id: "kaios",
      color: "rgb(111, 2, 181)",
    },
    {
      id: "and_uc",
      color: c_black,
    },
    {
      id: "and_qq",
      color: c_black,
    },
    {
      id: "baidu",
      color: c_black,
    },
  ];
  _.forEach(stats, (x, d, n) => {
    let m_arr = _.find(
      [...browserViewArrForPC, ...browserViewArrForMoble],
      (xx) => xx.id == d
    );
    if (_.isNil(m_arr)) {
      browserViewArrForMoble.push({
        id: d,
        color: c_black,
      });
    }
  });
  let on_chg_crt_active_id = (val) => {
    lc_store.crt_active_id = val;
  };
  let fn_render_browser_column = (crtMetaObj) => {
    return (
      <CanIUseSinglePage
        crt_active_id={lc_store.crt_active_id}
        on_chg_crt_active_id={on_chg_crt_active_id}
        key={crtMetaObj.id}
        crtMetaObj={crtMetaObj}
        allAgents={allAgents}
        crtDetailObj={crtDetail}
      />
    );
  };
  if (cutils.cond_emptyObj(crtDetail)) {
    return (
      <div className="pt-10">
        Loading
        <Blink />
      </div>
    );
  }
  let fin_tabs_list = [
    _.size(val_notes_by_num) == 0 || cutils.cond_emptyStr(val_notes)
      ? null
      : {
          label: t(`Memorandum`),
          id: "memorandum",
          jsx: (
            <div className="pt-5 sub-mb-5-but-not-last">
              {val_notes ? (
                <h3
                  style={{
                    margin: "0px",
                  }}
                >
                  <MarkDownViewerTool text={`Note: ` + val_notes} />
                </h3>
              ) : (
                ""
              )}
              {_.map(val_notes_by_num, (x, d, n) => {
                return (
                  <h3
                    key={d}
                    style={{
                      margin: "0px",
                      fontWeight: "normal",
                    }}
                  >
                    <MarkDownViewerTool text={`#${d}: ` + x} />
                  </h3>
                );
              })}
            </div>
          ),
        },
    _.size(val_bugs) == 0
      ? null
      : {
          label: t(`Known Issues`) + `(${_.size(val_bugs)})`,
          id: "known_issues",
          jsx: (
            <div
              style={
                {
                  // padding: "10px",
                }
              }
              className="pt-5 sub-mb-5-but-not-last"
            >
              {_.map(val_bugs, (x) => {
                return (
                  <h3
                    key={x.description}
                    style={{
                      margin: "0px",
                    }}
                  >
                    <MarkDownViewerTool text={x.description} />
                  </h3>
                );
              })}
            </div>
          ),
        },
    _.size(val_links) == 0
      ? null
      : {
          label: t(`Resources`) + `(${_.size(val_links)})`,
          id: "resources",
          jsx: (
            <div
              style={
                {
                  // padding: "10px",
                }
              }
              className="pt-5 sub-mb-5-but-not-last"
            >
              {_.map(val_links, (x, d) => {
                return (
                  <h3
                    key={x.url}
                    style={{
                      margin: "0px",
                      // marginBottom: "5px",
                    }}
                  >
                    <a target="_blank" title={x.title} href={x.url}>
                      ({d + 1}) {x.title}
                    </a>
                  </h3>
                );
              })}
            </div>
          ),
        },
  ].filter((x) => !_.isNil(x));
  return (
    <div className={myfileLess["caniuse-root-detail-view"]}>
      <div
        className="beflex"
        style={{
          marginBottom: "5px",
        }}
      >
        <div className="sub-mr-5">
          <span className="bp3-text-muted ">{t(`Tags`)}:</span>
          {_.map(_.get(crtDetail, "categories"), (x, d, n) => {
            return (
              <Tag
                emmm_minimal={true}
                emmm_intent={"primary"}
                key={x}
                small={true}
              >
                {x}
              </Tag>
            );
          })}
          <a
            className="bp3-tag bp3-tag-small bp3-intent-success"
            emmm_minimal={true}
            intent={"primary"}
            small={true}
            href={_.get(crtDetail, "spec")}
            target="_blank"
          >
            {_.get(statuses, _.get(crtDetail, "status"))}
          </a>
        </div>
        <div>
          <a
            href={`https://caniuse.com/?search=${id}`}
            target="_blank"
            nofollow
          >
            {t(`View it on {0}`, "CanIUse")}
          </a>
        </div>
      </div>
      <div
        style={{
          width: "60%",
          fontSize: "17px",
          wordWrap: "break-word",
          verticalAlign: "middle",
        }}
      >
        <BackApostrophe text={_.get(crtDetail, "description")} />
      </div>
      <div
        style={{
          marginTop: "18px",
        }}
        className={myfileLess["browser-support-table-wrapper"]}
      >
        <h4 className={myfileLess["browser-support-title"]}>
          {t(`Browser Supports Report`)}
        </h4>
        <div className={myfileLess["browser-support-hyper-table-wrapper"]}>
          <div
            className={myfileLess["browser-support-main-table"]}
            onMouseLeave={() => {
              //
              on_chg_crt_active_id(null);
            }}
          >
            {_.map(browserViewArrForPC, fn_render_browser_column)}
          </div>
          <div
            className={myfileLess["browser-support-main-table"]}
            onMouseLeave={() => {
              //
              on_chg_crt_active_id(null);
            }}
          >
            {_.map(browserViewArrForMoble, fn_render_browser_column)}
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "8px",
          // minHeight: "100px",
          // backgroundColor: "var(--app-bg-white)",
        }}
      >
        {React.createElement(
          observer((props) => {
            return (
              <Tabs
                style={{ margin: 0, padding: 0 }}
                animate={true}
                key={"vertical"}
                renderActiveTabPanelOnly={true}
                vertical={true}
                className="make-no-mt-bp3"
                // onChange={(val) => {
                //   PUtils.crtModel.view_key = val;
                // }}
                // large={false}
                // selectedTabId={PUtils.crtModel.view_key}
              >
                {_.map(fin_tabs_list, (x, d, n) => {
                  return <Tab id={x.id} title={x.label} panel={x.jsx}></Tab>;
                })}
              </Tabs>
            );
            // return PUtils.jsx.tabWithDefinition({
            //   default_select_tab: "str",
            //   key: "my_caniuse_tab" + id,
            //   using_model_type: true,
            //   list: fin_tabs_list,
            // });
          })
        )}
      </div>
      {val_keywords ? (
        <div
          className="bp3-text-muted bp3-text-small"
          style={{ marginTop: "8px" }}
        >
          <b>{t(`Keywords`)}: </b>
          <HighlightText
            text={val_keywords}
            highlight={PUtils.crtModel.sys.search_str}
          />
        </div>
      ) : (
        ""
      )}
      {val_notes ? (
        <div
          className="bp3-text-muted bp3-text-small"
          style={{ marginTop: "8px" }}
        >
          <b>{t(`More Details`)}: </b>
          <MarkDownViewerTool text={val_notes} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
});

export default CanIUseDetailView;
