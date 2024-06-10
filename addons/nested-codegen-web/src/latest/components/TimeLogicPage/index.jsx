import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Popover,
  Overlay,
  Alert,
  RadioGroup,
  Radio,
  ButtonGroup,
  TextArea,
  Menu,
  MenuItem,
  Intent,
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
} from "@blueprintjs/core";
import { Example,  } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React from "react";
import ReactDOM from "react-dom";
import gutils from "../../utils";
import { useState, useEffect, useRef } from "react";

import { Provider, observer, inject ,useLocalStore} from "mobx-react";
// var createHistory = require("history").createBrowserHistory;
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import {autorun, reaction, observable, observe } from 'mobx'
import gstore from "../../store.jsx";
import "./index.less";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import OperationPanel from "../OperationPanel";
import GEditor from "../GEditor";
import HalfResizeForTwoHorizontal from "../HalfResizeForTwoHorizontal";
import HalfResizeForTwo from "../HalfResizeForTwo";
import Blink from "../Blink/index";
import BeautifyCodeCommon from "../BeautifyCodeCommon";
import prettier from "prettier/esm/standalone.mjs";
import parserGraphql from "prettier/esm/parser-graphql.mjs";
import GFileSettingViewer from "../GFileSettingViewer/index";
import _ from "lodash";
import InternalLeftEditor from "../InternalLeftEditor";
import RightMainInternalPage from "../RightMainInternalPage";
import GSyncSelectWithFilter from "../GSyncSelectWithFilter";
import moment from "moment";
import constants from "../../constants";

window.prettier = prettier;
window.parserGraphql = parserGraphql;

let mytimezonesize = constants.timezone_list;

let timeFormattingsArr = [
  {
    label: "Timestamp(13)",
    value: "timestamp",
    desc_label: "1648786406463",
    format_skip: true,
  },
  {
    label: "yyyy-MM",
    value: "yyyy-MM",
    desc_label: "2016-07",
  },
  {
    label: "yyyy/MM",
    value: "yyyy/MM",
    desc_label: "2016/07",
  },
  {
    label: "yyyy-MM-dd",
    value: "yyyy-MM-dd",
    desc_label: "2016-07-01",
  },
  {
    label: "yyyy-MM-dd",
    value: "yyyy-MM-dd",
    desc_label: "2016-07-01",
  },
  {
    label: "yyyy/MM/dd",
    value: "yyyy/MM/dd",
    desc_label: "2016/07/01",
  },
  {
    label: "MM-dd-yyyy",
    value: "MM-dd-yyyy",
    desc_label: "07-01-2016",
  },
  {
    label: "MM/dd/yyyy",
    value: "MM/dd/yyyy",
    desc_label: "07/01/2016",
  },
  {
    label: "dd-MM-yyyy",
    value: "dd-MM-yyyy",
    desc_label: "01-07-2016",
  },
  {
    label: "dd/MM/yyyy",
    value: "dd/MM/yyyy",
    desc_label: "01/07/2016",
  },
  {
    label: "yyyy-MM-dd hh:mm:ss",
    value: "yyyy-MM-dd hh:mm:ss",
    desc_label: "2016-07-01 09:30:23",
  },
  {
    label: "yyyy/MM/dd hh:mm:ss",
    value: "yyyy/MM/dd hh:mm:ss",
    desc_label: "2016/07/01 09:30:23",
  },
  {
    label: "dd-MM-yyyy hh:mm:ss",
    value: "dd-MM-yyyy hh:mm:ss",
    desc_label: "01-07-2016 09:30:23",
  },
  {
    label: "hh:mm:ss",
    value: "hh:mm:ss",
    desc_label: "09:30:23",
  },
  {
    label: "HH:mm:ss.SSSZ",
    value: "HH:mm:ss.SSSZ",
    desc_label: "09:30:23.454+0530",
  },
  {
    label: "dd MMMM yyyy",
    value: "dd MMMM yyyy",
    desc_label: "02 January 2018",
  },
  {
    label: "E, dd MMM yyyy HH:mm:ss z",
    value: "E, dd MMM yyyy HH:mm:ss z",
    desc_label: "Fri, 01 Jun 2016 09:30:23 IST",
  },
  {
    label: "yyyyMMddhhmmss",
    value: "yyyyMMddhhmmss",
    desc_label: "20160701093023",
  },
  {
    label: "yyyyMMdd",
    value: "yyyyMMdd",
    desc_label: "20160701",
  },
];
let timezone_list = constants.timezone_list;
let preobj = {};
_.forEach(timezone_list, (x, d, n) => {
  preobj["timestamp_datetime_utc_" + x.utc] = "";
  preobj["timestamp_offset_utc_" + x.utc] = "";
});

let TimezoneWrap = observer((props) => {
  let { myref, crtStoreName, noMakeRushNow } = props;
  let { is_allow_show_area_mode_in_time } = gstore.localSettings;

  let crtStore = gstore.common_app[crtStoreName];
  // gutils.once(`init_model_value` + crtStoreName, () => {
  // _.defaultsDeep(crtStore.model, {});
  // });
  let model = crtStore.model;
  let tobj = crtStore.extra_for_time.tobj;

  return (
    <FormGroup label={t(`UTC/GMT TimeZone`)}>
      <div className="value-panel-zone m3-7-part-wrapper report-item-wrapper nopad-wrapper myutcgmt-wrapper">
        <table class="bp3-html-table bp3-html-table-striped bp3-html-table-condensed bp3-html-table-bordered">
          <thead>
            <tr>
              <th>UTC/GMT</th>
              <th>{t(`Datetime`)}</th>
              <th>{t(`Time Offset`)}</th>
              {is_allow_show_area_mode_in_time ? (
                <th
                  style={{
                    width: "350px",
                  }}
                >
                  {t(`Areas`)}
                </th>
              ) : (
                ""
              )}
            </tr>
          </thead>
          <tbody>
            {mytimezonesize.map((x) => {
              let isSameNow = "GMT" + x.utc == model.timestamp_ipt_locale;
              return (
                <tr
                  key={x.utc}
                  style={{
                    background: isSameNow ? "var(--app-bg-yellow-hl)" : "",
                  }}
                  onClick={() => {
                    noMakeRushNow();
                    model.timestamp_ipt_locale = "GMT" + x.utc;
                    // updateResultReport();
                  }}
                >
                  <td>
                    {t(`GMT${x.utc}`)} / UTC{x.utc}
                  </td>
                  <td>{tobj["timestamp_datetime_utc_" + x.utc]}</td>
                  <td>
                    {isSameNow
                      ? t("Now")
                      : tobj["timestamp_offset_utc_" + x.utc]}
                  </td>
                  {is_allow_show_area_mode_in_time ? <td>{t(x.area)}</td> : ""}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">{t(`Total`)}</td>
              <td>{_.size(mytimezonesize)}</td>
              {is_allow_show_area_mode_in_time ? <td></td> : ""}
            </tr>
          </tfoot>
        </table>
      </div>
    </FormGroup>
  );
});

export default observer((props) => {
  const [all100, onAll100] = useState(0);
  const myref = useRef({
    saveNow: true,
    noLeftValue: false,
    topScrollTop: 0,
    onTObj: null,
  });
  let crtStoreName = props.crtStoreName;
  let mytotaltitle = "none";
  switch (crtStoreName) {
    case "timeTimestamp":
      mytotaltitle = "Timestamp Tools";
      break;
    case "timeTimezone":
      mytotaltitle = "TimeZone Tools";
      break;
    case "timeDifference":
      mytotaltitle = "Calculate Time Tools";
      break;
    case "timeTimeunit_convert":
      mytotaltitle = "TimeUnit Convert Tools";
      break;
  }
  let language = "markdown";
  let crtStore = gstore.common_app[crtStoreName];
  let model = crtStore.model;
  window.t100model = model;
  let onDropFn = (ev) => {};
  let saveModel = _.debounce(() => {
    if (!myref.current.saveNow) {
      myref.current.saveNow = true;
      return;
    }
    gutils.api.common_app.common.saveModelById(crtStoreName);
  }, 3000);

  let weekdayAndWeekendsArr = Moment.weekdays();
  let monthesArr = Moment.months();
  try {
    if (
      _.isNil(model.timestamp_ipt_locale) ||
      model.timestamp_ipt_locale == ""
    ) {
      model.timestamp_ipt_locale = gutils.getZone();
    }
  } catch (e) {
    console.log("e", e);
  }

  let updateResultReport = async () => {
    onAll100(all100 + 1);
    if (_.isNil(model.timestamp_ipt_locale)) {
      model.timestamp_ipt_locale = gutils.getZone();
      return;
    }
    model.timestamp_format_has_error = null;
    let timestampstr = null;
    console.log("handling as timestamp_ipt_locale", model.timestamp_ipt_locale);

    function wrapMoment(a, tmpvalue) {
      // if (_.isNil(a)) {
      //   // return moment();
      // }
      let thatval =
        parseInt((tmpvalue || model.timestamp_ipt_locale).replace("GMT", "")) *
        60;
      console.log("thatval", thatval, model.timestamp_ipt_locale);
      // debugger;
      return a.utcOffset(thatval);
    }
    // handling logic for parse timestamp
    try {
      let res = await gutils.optWithNoWin("/common/parseDateWithFormatting", {
        timestamp_ipt_source_formattings:
          model.timestamp_ipt_source_formattings,
        timestamp_ipt_source: model.timestamp_ipt_source,
        locale: model.timestamp_ipt_locale,
        timeFormattingsArr: timeFormattingsArr,
      });
      _.merge(model, res.content);
      timestampstr = parseInt(res.content.timestamp_val_timestamp_str);
      let crtstr = wrapMoment(Moment(timestampstr)).fromNow();
      model.timestamp_val_calendar_str = wrapMoment(
        moment(timestampstr)
      ).calendar();
      model.timestamp_val_compare_with_today = crtstr;
      model.timestamp_val_day_of_week =
        weekdayAndWeekendsArr[
          parseInt(res.content.timestamp_val_day_of_week) - 1
        ];
      model.timestamp_val_month =
        monthesArr[parseInt(res.content.timestamp_val_month)];
      // common
      let ok_moment = wrapMoment(
        moment(parseInt(model.timestamp_val_timestamp_str))
      );
      let new_tobj = {};
      _.forEach(mytimezonesize, (x, d, n) => {
        let { utc, area } = x;
        let crtLoopMoment = wrapMoment(
          moment(parseInt(model.timestamp_val_timestamp_str)),
          "GMT" + utc
        );
        let fullcomparestr = "YYYY-MM-DD HH:mm:ss";
        new_tobj["timestamp_datetime_utc_" + x.utc] =
          crtLoopMoment.format(fullcomparestr);

        let diffval = moment(
          ok_moment.format(fullcomparestr),
          fullcomparestr
        ).to(moment(crtLoopMoment.format(fullcomparestr), fullcomparestr));
        console.log("compare");
        // debugger;
        new_tobj["timestamp_offset_utc_" + x.utc] = diffval;
      });
      crtStore.extra_for_time.tobj = new_tobj;
      let markdownReport = [
        `# ${t(`Analysis Report`)}`,
        `+ ${t(`Time Value`)}: ${model.timestamp_ipt_source}  `,
        `+ ${t(`Time Format`)}: ${model.timestamp_ipt_source_formattings}  `,
        `+ ${t(`Generated From`)}: CodeGen-${gutils.app_version}`,
        ``,
        `## ${t(`Basic Information`)}  `,
        `+ ${t(`DateTime`)}: ${model.timestamp_val_datetime_str}  `,
        `+ ${t(`TimeStamp`)}: ${model.timestamp_val_timestamp_str}  `,
        `+ ${t(`The Month of the Year`)}: ${model.timestamp_val_month}  `,
        `+ ${t(`The Day of the Week`)}: ${model.timestamp_val_day_of_week}  `,
        `+ ${t(`Calendar`)}: ${model.timestamp_val_calendar_str}  `,
        `+ ${t(`Compare with Present`)}: ${
          model.timestamp_val_compare_with_today
        }  `,
        `+ ${t(`The Day of the Year`)}: ${model.timestamp_val_day_of_year}  `,
        `+ ${t(`The Week of the Year`)}: ${model.timestamp_val_week_of_year}  `,
        `+ ${t(`AM/PM`)}: ${model.timestamp_AM_PM == "1" ? "PM" : "AM"}  `,
        `+ ${t(`TimeZone`)}: ${model.timestamp_ipt_locale}  `,

        ``,

        `## ${t(`Other Format`)}`,
        `+ ${t(`JSON`)}: ${JSON.stringify(ok_moment.toObject())}`,
        `+ ${t(`Array`)}: ${JSON.stringify(ok_moment.toArray())}`,
        `+ ${t(`ISO8601`)}: ${JSON.stringify(ok_moment.toISOString())}`,
        `+ ${t(`Diff From Now`)}: ${JSON.stringify(
          ok_moment.diff(wrapMoment(moment()))
        )}`,
        `+ ${t(`Month`)}: ${ok_moment.year()}`,
        `+ ${t(`Month`)}: ${ok_moment.month()}`,
        `+ ${t(`DaysInMonth`)}: ${ok_moment.daysInMonth()}`,
        `+ ${t(`Hours`)}: ${ok_moment.hours()}`,
        `+ ${t(`Minutes`)}: ${ok_moment.minutes()}`,
        `+ ${t(`Seconds`)}: ${ok_moment.seconds()}`,

        ..._.map(res.content.result_timeFormattingsArr, (eachFormat) => {
          return `+ ${eachFormat.label}: ${eachFormat.formatValue}`;
        }),

        ``,
        `## ${t(`GMT/UTC Offsets`)}`,
        ..._.flatten(
          _.map(mytimezonesize, (x) => {
            let isSameNow = "GMT" + x.utc == model.timestamp_ipt_locale;
            return [
              `### ${t("GMT" + x.utc)} `,
              `++ ${t("Areas")}: ${t(x.area)
                .replaceAll(/[、，,，]/g, ",")
                .replaceAll(`：`, ":")}`,
              `++ ${`Datetime`}: ${
                new_tobj["timestamp_datetime_utc_" + x.utc]
              }`,
              `++ ${`Time Offset`}: ${
                isSameNow ? t("Now") : new_tobj["timestamp_offset_utc_" + x.utc]
              }`,
              ``,
            ];
          })
        ),
        ``,
      ].join(`  \n`);
      // debugger;
      if (false && myref.current.noLeftValue) {
        myref.current.noLeftValue = false;
      } else {
        if (gstore.common_app[crtStoreName].setLeftValue) {
          // debugger;
          gstore.common_app[crtStoreName].setLeftValue(markdownReport);
        }
      }
    } catch (e) {
      console.log("goterr", e);
      model.timestamp_format_has_error = gutils.getErrMsg(e);
    }

    saveModel();
    onAll100(all100 + 1);
  };

  useEffect(() => {
    let arfn = reaction(() => {
      return [
        model.timestamp_ipt_source_formattings,
        model.timestamp_ipt_source,
        model.timestamp_ipt_locale,
      ];
    }, _.debounce(updateResultReport, 500));
    gutils.defer(() => {
      updateResultReport();
      onAll100(all100 + 1);
    }, 300);
    return () => {
      arfn();
    };
  }, [gstore.common_app[crtStoreName].hist.crtHistId]);
  useEffect(() => {
    let realtimekey = crtStoreName + "realtime";
    let fn = reaction(
      () => {
        return [model.timestamp_realtime_view_action];
      },
      () => {
        if (!model.timestamp_realtime_view_action) {
          window.clearInterval(window[realtimekey]);
        } else {
          window[realtimekey] = window.setInterval(() => {
            model.timestamp_ipt_source_formattings = "timestamp";
            model.timestamp_ipt_source = "" + new Date().getTime();
          }, 1000);
        }
        onAll100(all100 + 1);
      }
    );
    return () => {
      fn();
      window.clearInterval(window[realtimekey]);
    };
  }, []);
  let noMakeRushNow = () => {
    myref.current.saveNow = false;
    myref.current.noLeftValue = true;
  };

  let { is_allow_show_area_mode_in_time } = gstore.localSettings;
  return (
    <BeautifyCodeCommon
      key={all100 + "work"}
      noActions={true}
      noSources={true}
      noOptions={true}
      leftTopBtmPercent={0.3}
      rightMainGlobalJsx={observer((props) => {
        let topJsxCtnNow = (
          <div
            onScroll={(e) => {
              let scrollTop = e.target.scrollTop;
              console.log("scrollTop", scrollTop);
              myref.current.topScrollTop = scrollTop;
            }}
            ref={(e) => {
              if (e) {
                $(e).scrollTop(myref.current.topScrollTop);
              }
            }}
            key={"fixedlogic" + crtStoreName}
            style={{ padding: "3px" }}
            className="subitem-all-3px"
          >
            <div className="control-panel-zone">
              <FormGroup label={t("Time Value")}>
                <InputGroup
                  large={false}
                  asyncControl={true}
                  key={crtStoreName + "top"}
                  disabled={model.timestamp_realtime_view_action}
                  {...gutils.bindSimpleIpt({
                    model: model,
                    key: "timestamp_ipt_source",
                    prefn() {
                      noMakeRushNow();
                    },
                  })}
                  rightElement={
                    <ButtonGroup>
                      <Button
                        intent={"primary"}
                        text={t(`Calculate`)}
                        disabled={model.timestamp_realtime_view_action}
                        onClick={() => {
                          updateResultReport();
                        }}
                      ></Button>
                      <Button
                        text={t(`Now`)}
                        disabled={model.timestamp_realtime_view_action}
                        onClick={() => {
                          model.timestamp_ipt_source =
                            "" + new Date().getTime();
                          model.timestamp_ipt_source_formattings = "timestamp";
                          updateResultReport();
                        }}
                      ></Button>
                      {/* <Button
                        text={t(
                          model.timestamp_realtime_view_action
                            ? "Stop"
                            : `RealTime`
                        )}
                        intent={
                          model.timestamp_realtime_view_action
                            ? "warning"
                            : null
                        }
                        onClick={() => {
                          model.timestamp_realtime_view_action =
                            !model.timestamp_realtime_view_action;
                          updateResultReport();
                        }}
                      ></Button> */}
                    </ButtonGroup>
                  }
                />
              </FormGroup>
              <FormGroup label={t(`Time Format`)}>
                <InputGroup
                  large={false}
                  {...gutils.bindSimpleIpt({
                    model: model,
                    key: "timestamp_ipt_source_formattings",
                    prefn() {
                      noMakeRushNow();
                    },
                  })}
                  disabled={model.timestamp_realtime_view_action}
                  rightElement={[
                    <GSyncSelectWithFilter
                      obj={model}
                      list={_.map(mytimezonesize, (x, d, n) => {
                        let myval = "GMT" + x.utc;
                        return {
                          label: t(myval),
                          value: myval,
                          desc_label: myval,
                        };
                      })}
                      disabled={model.timestamp_realtime_view_action}
                      index={"timestamp_ipt_locale"}
                      view_label={t(model.timestamp_ipt_locale)}
                      whenChg={(x) => {
                        console.log(`whenchg`, x);
                        model.timestamp_ipt_locale = x;
                      }}
                    />,
                    <GSyncSelectWithFilter
                      obj={model}
                      list={_.map(timeFormattingsArr, (x, d, n) => {
                        return {
                          ...x,
                          label: x.label,
                        };
                      })}
                      disabled={model.timestamp_realtime_view_action}
                      index={"timestamp_source_formattings"}
                      view_label={t(`Pre Definitions`)}
                      whenChg={(x) => {
                        console.log(`whenchg`, x);
                        model.timestamp_source_formattings = x;
                        model.timestamp_ipt_source_formattings = x;
                      }}
                    />,
                  ]}
                />
              </FormGroup>
            </div>

            <div
              style={{
                display:
                  crtStoreName == "timeTimezone" &&
                  _.isNil(model.timestamp_format_has_error)
                    ? undefined
                    : "none",
              }}
            >
              <TimezoneWrap
                noMakeRushNow={noMakeRushNow}
                myref={myref}
                crtStoreName={crtStoreName}
              />
            </div>

            <FormGroup label={t(`Basic Result`)}>
              {model.timestamp_format_has_error ? (
                <div className="value-panel-zone report-item-wrapper">
                  <div className="report-item">
                    <span className="report-item-title">{t(`Exception`)}:</span>
                    <span className="report-item-value o-red">
                      {model.timestamp_format_has_error}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="value-panel-zone report-item-wrapper">
                  <div className="report-item">
                    <span className="report-item-title">{t(`DateTime`)}:</span>
                    <span className="report-item-value o-green">
                      {model.timestamp_val_datetime_str}
                    </span>
                  </div>
                  <div className="report-item">
                    <span className="report-item-title">{t(`TimeStamp`)}:</span>
                    <span className="report-item-value o-green">
                      {model.timestamp_val_timestamp_str}
                    </span>
                  </div>
                  <div className="report-item">
                    <span className="report-item-title">
                      {t("The Month of the Year")}:
                    </span>
                    <span className="report-item-value">
                      {model.timestamp_val_month}
                    </span>
                  </div>
                  <div className="report-item">
                    <span className="report-item-title">
                      {t("The Day of the Week")}:
                    </span>
                    <span className="report-item-value">
                      {model.timestamp_val_day_of_week}
                    </span>
                  </div>
                  <div className="report-item">
                    <span className="report-item-title">{t("Calendar")}:</span>
                    <span className="report-item-value">
                      {model.timestamp_val_calendar_str}
                    </span>
                  </div>
                  <div className="report-item">
                    <span className="report-item-title">
                      {t("Compare with Present")}:
                    </span>
                    <span className="report-item-value">
                      {model.timestamp_val_compare_with_today}
                    </span>
                  </div>
                  <div className="report-item">
                    <span className="report-item-title">
                      {t("The Day of the Year")}:
                    </span>
                    <span className="report-item-value">
                      {model.timestamp_val_day_of_year}
                    </span>
                  </div>
                  <div className="report-item">
                    <span className="report-item-title">
                      {t("The Week of the Year")}:
                    </span>
                    <span className="report-item-value">
                      {model.timestamp_val_week_of_year}
                    </span>
                  </div>
                  <div className="report-item">
                    <span className="report-item-title">{t("AM/PM")}:</span>
                    <span className="report-item-value">
                      {t(model.timestamp_AM_PM == "1" ? "PM" : "AM")}
                    </span>
                  </div>
                  <div className="report-item">
                    <span className="report-item-title">{t("TimeZone")}:</span>
                    <span className="report-item-value">
                      {model.timestamp_ipt_locale}
                    </span>
                  </div>
                </div>
              )}
            </FormGroup>
          </div>
        );
        return (
          <RightMainInternalPage
            containerClz={"snippetcontainer"}
            btmTitle={"Analysis Result"}
            onDropFnForBtmJsx={onDropFn}
            rightTopBtmPercent={0.55}
            btmJsxCtn={
              <InternalLeftEditor
                language={language}
                initEditorByLeftOrRight={props.initEditorByLeftOrRight}
                crtStoreName={crtStoreName}
              />
            }
            topJsxCtn={topJsxCtnNow}
          />
        );
      })}
      crtStoreName={crtStoreName}
      mytotalTitle={t(mytotaltitle)}
      leadingActionJsx={gutils.filternil([
        crtStoreName == "timeTimezone"
          ? {
              label: t(`Display Settings`),
              children: [
                {
                  small: true,
                  intent: "primary",
                  text: t(
                    (is_allow_show_area_mode_in_time ? "Hide" : "Show") +
                      " Area Column"
                  ),
                  onClick: () => {
                    gstore.localSettings.is_allow_show_area_mode_in_time =
                      !gstore.localSettings.is_allow_show_area_mode_in_time;
                  },
                },
              ],
            }
          : null,
      ])}
    />
  );
});
