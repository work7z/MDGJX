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
  PopoverInteractionKind,
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
import HighlightText from "../../../../TranslateForJSON/frontend/cpt/HighlightText";
import MarkDownViewerTool from "../../../../TranslateForJSON/frontend/cpt/MarkDownViewerTool";
import SpinLoading from "../../../../TranslateForJSON/frontend/cpt/SpinLoading";
import SpinLoading2 from "../../../../TranslateForJSON/frontend/cpt/SpinLoading2";
import cutils from "../../../../TranslateForJSON/frontend/kit/common_utils";
import myfileLess from "../CanIUseDetailView/index.less";

let CanIUseSinglePage = observer((props) => {
  let {
    allAgents,
    crtMetaObj: crtMetaSimpleNoBigObj,
    crtDetailObj,
    eachIdx,
  } = props;
  let { id, color } = crtMetaSimpleNoBigObj;
  let crt_detail_verList = crtDetailObj.stats[id];
  let crt_meta_agents = _.get(allAgents, id);
  let all_version_list = _.get(crt_meta_agents, "version_list", []);
  let crt_browser_ver_list_may_part = useMemo(() => {
    let newArr = [];
    let pre_m_r_arr = _.map(crt_detail_verList, (x, d, n) => {
      let fv = _.findIndex(all_version_list, (rawVer) => {
        return rawVer.version == x.version;
      });
      if (fv == -1) {
        fv = -1;
      }
      return {
        fv,
        ...x,
      };
    });
    let chk_arr = [];
    pre_m_r_arr = _.map(pre_m_r_arr, (x, d, n) => {
      let { value, version } = x;
      if (version.indexOf("-") !== -1) {
        let arr = _.map(_.split(version, "-"), _.trim);
        chk_arr.push({
          ...x,
          value: value,
          version: arr[0],
        });
        chk_arr.push({
          ...x,
          value: value,
          version: arr[1],
        });
        return null;
      } else {
        return x;
      }
    });
    pre_m_r_arr = [...pre_m_r_arr, ...chk_arr];
    pre_m_r_arr = _.filter(pre_m_r_arr, (x) => !_.isNil(x));
    let m_r_arr = _.sortBy(pre_m_r_arr, (eachVerObj) => {
      return eachVerObj.fv;
    });
    _.forEach(m_r_arr, (x, d, n) => {
      let { value, version } = x;
      let lastingObj = _.last(newArr);
      if (
        _.isNil(lastingObj) ||
        lastingObj.value != value ||
        lastingObj.skipThis === true
      ) {
        lastingObj = {
          ...x,
          from: version,
          value: value,
          verDetail: all_version_list[x.fv],
        };
        newArr.push(lastingObj);
        return;
      }
      lastingObj.to = version;
    });
    _.forEach(newArr, (x, d, n) => {
      let { from, to, version } = x;
      let tmpArr = _.map(_.split(x.value, /\s+/), _.trim);
      x.splitedValueArr = tmpArr;
      let remainValues = _.filter(tmpArr, (x) => (x + "").startsWith("#"));
      if (!cutils.cond_emptyObj(remainValues)) {
        x.crt_issues = remainValues.map((x) => x.replace("#", ""));
      }
      x.webkit_prefix = tmpArr[1] == "x";
      if (x.version != "all" && crt_meta_agents) {
        let version_list = crt_meta_agents.version_list;
        _.forEach(version_list, (xx, dd, nn) => {
          if (xx.version == from) {
            x.from_release_date = xx.release_date;
            x.from_global_usage = xx.global_usage;
            x.from_date = Moment(xx.release_date * 1000);
            x.from_date_str = x.from_date.format("YYYY-MM");
          }
          if (xx.version == to) {
            x.to_release_date = xx.release_date;
            x.to_global_usage = xx.global_usage;
            x.to_date = Moment(xx.release_date * 1000);
            x.to_date_str = x.to_date.format("YYYY-MM");
          }
        });
        if (x.from_release_date && x.to_release_date) {
          try {
            x.range_date_str = x.to_date.from(x.from_date, true);
          } catch (e) {
            console.log(e);
          }
        }
        let usage_global = crt_meta_agents.usage_global;
      } else {
        x.from_date_str = "N/A";
        x.to_date_str = "N/A";
        x.range_date_str = "All";
      }
    });
    return newArr;
  }, [crt_detail_verList, all_version_list, crt_meta_agents]);
  window["crt_browser_ver_list_may_part_" + id] = crt_browser_ver_list_may_part;
  if (cutils.cond_emptyObj(crt_detail_verList)) {
    return <div>{t(`Invalid browser: {0}`, id)}</div>;
  }
  let { crt_active_id, on_chg_crt_active_id } = props;
  let style_browser_not_active = myfileLess["browser-not-active"];
  let now_lc_store = useLocalStore(() => {
    return {};
  });
  let browserName = _.get(crt_meta_agents, "browser");
  return (
    <div
      key={id + " " + eachIdx}
      className={myfileLess["browser-support-each-cell"] + ` markAsBar `}
    >
      <div
        title={_.get(crt_meta_agents, "long_name")}
        className={myfileLess["browser-support-each-c-title"]}
        style={{
          borderBottom: "5px solid " + color,
        }}
      >
        {browserName}
      </div>
      <div className={myfileLess["browser-support-each-c-list"]} style={{}}>
        {_.map(
          crt_browser_ver_list_may_part,
          (eachSupportStatObj = {}, idx) => {
            let { from, to, value } = eachSupportStatObj;
            let crtMatchID = id + from + to;
            let preBG =
              myfileLess[
                "browser-support-rect-" + eachSupportStatObj.splitedValueArr[0]
              ];
            let bgStyleClz =
              myfileLess["browser-support-rect-base"] + " " + preBG;
            return (
              <Popover
                key={idx + crtMatchID}
                className={
                  `force-popover-block-wrapper ` +
                  " " +
                  bgStyleClz +
                  " " +
                  (cutils.cond_emptyObj(crt_active_id)
                    ? ""
                    : crt_active_id == crtMatchID
                    ? myfileLess["broser-active"]
                    : style_browser_not_active)
                }
                // onMouseEnter={() => {
                //   on_chg_crt_active_id(crtMatchID);
                // }}
                isOpen={now_lc_store[crtMatchID] == true}
                onInteraction={(state) => {
                  if (state === true) {
                    on_chg_crt_active_id(crtMatchID);
                  }
                  now_lc_store[crtMatchID] = state;
                }}
                transitionDuration={10}
                wrapperTagName="div"
                hoverCloseDelay={30}
                hoverOpenDelay={30}
                interactionKind={PopoverInteractionKind.HOVER}
                // interactionKind={PopoverInteractionKind.CLICK}
                usePortal={true}
                // minimal={true}
                placement={"right-top"}
              >
                <div className={myfileLess["browser-support-rect-ctn"]}>
                  <div>{to ? `${from} - ${to}` : from}</div>
                  <div
                    className={myfileLess["top-floated"]}
                    style={
                      {
                        //   marginTop: "-3px",
                      }
                    }
                  >
                    <div>
                      {_.map(eachSupportStatObj.crt_issues, (x) => {
                        return (
                          <div className={myfileLess["num-size"]}>{x}</div>
                        );
                      })}
                    </div>
                    <div>
                      {(eachSupportStatObj.webkit_prefix ? ["P"] : []).map(
                        (x) => {
                          return (
                            <div className={myfileLess["prefix-size"]}>{x}</div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h2
                    style={{
                      margin: 0,
                      color: "white",
                      textAlign: "center",
                      padding: "3px 8px",
                    }}
                    className={preBG}
                  >
                    {_.get(crt_meta_agents, "long_name")}
                  </h2>
                  <div>
                    <FormEasyTable
                      column={[
                        {
                          label: t(`Name`),
                          value: (x) => x.name,
                        },
                        {
                          label: t(`Value`),
                          value: (x) => x.value,
                        },
                      ]}
                      data={[
                        // {
                        //   name: t(`Begin Version`),
                        //   value: from,
                        // },
                        // {
                        //   name: t(`End Version`),
                        //   value: to,
                        // },
                        {
                          name: eachSupportStatObj.to_date_str
                            ? t(`Support Period`)
                            : t(`Release Date`),
                          value: eachSupportStatObj.to_date_str
                            ? t(
                                `{2}, it ranges from {0} to {1}`,
                                eachSupportStatObj.from_date_str,
                                eachSupportStatObj.to_date_str || "N/A",
                                eachSupportStatObj.range_date_str
                              )
                            : eachSupportStatObj.from_date_str,
                        },
                        {
                          name: t(`Need Browser Prefix?`, t(`Browser`)),
                          value: eachSupportStatObj.webkit_prefix ? (
                            <b style={{ background: "yellow", color: "black" }}>
                              {t(`Yes`, "-webkit-", "-ms-")}
                            </b>
                          ) : (
                            t(`No`)
                          ),
                        },
                        ...(eachSupportStatObj.crt_issues
                          ? _.map(
                              eachSupportStatObj.crt_issues,
                              (eachIssueName) => {
                                return {
                                  name: t(`Issue {0}`, "#" + eachIssueName),
                                  value: (
                                    <div
                                      style={{
                                        width: "310px",
                                      }}
                                    >
                                      <MarkDownViewerTool
                                        text={_.get(crtDetailObj, [
                                          "notes_by_num",
                                          eachIssueName,
                                        ])}
                                      />
                                    </div>
                                  ),
                                };
                              }
                            )
                          : []),
                        // {
                        //   name: t(`Issue {0}`, "Webkit"),
                        //   value: eachSupportStatObj.webkit_prefix ? (
                        //     <b style={{ background: "yellow", color: "white" }}>
                        //       {t(`Yes`)}
                        //     </b>
                        //   ) : (
                        //     t(`No`)
                        //   ),
                        // },
                      ]}
                    ></FormEasyTable>
                  </div>
                </div>
                {/* <div
                  className={
                    bgStyleClz +
                    " " +
                    myfileLess["ext-logic-wrapper-for-caniuse"]
                  }
                >
                  <h2>{_.get(crt_meta_agents, "long_name")}</h2>
                  <h2>{_.get(crt_meta_agents, "long_name")}</h2>
                  <h2>{_.get(crt_meta_agents, "long_name")}</h2>
                  <h2>{_.get(crt_meta_agents, "long_name")}</h2>
                </div> */}
              </Popover>
            );
          }
        )}
      </div>
    </div>
  );
});
export default CanIUseSinglePage;
