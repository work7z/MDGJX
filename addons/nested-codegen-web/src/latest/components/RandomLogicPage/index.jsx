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
import GFormCheckbox from "../GFormCheckbox";

window.prettier = prettier;
window.parserGraphql = parserGraphql;

let mytimezonesize = constants.timezone_list;

let timeFormattingsArr = [
  {
    label: "Timestamp(13)",
    value: "timestamp",
    desc_label: "1648786406463",
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
                    background: isSameNow ? "#D1F26D" : "",
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
  const myref = useRef({
    saveNow: true,
    noLeftValue: false,
    topScrollTop: 0,
    onTObj: null,
  });
  let crtStoreName = props.crtStoreName;
  console.log("got crtStoreName", crtStoreName);
  let mytotaltitle = "none";
  switch (crtStoreName) {
    case "randomUuid":
      mytotaltitle = "Random UUID Generator";
      break;
  }
  let language = "text";
  let crtStore = gstore.common_app[crtStoreName];
  let model = crtStore.model;
  let onDropFn = (ev) => {};
  let saveModel = _.debounce(() => {
    if (!myref.current.saveNow) {
      myref.current.saveNow = true;
      return;
    }
    gutils.api.common_app.common.saveModelById(crtStoreName);
  }, 300);

  let updateResultReport = async () => {
    // saveModel();
  };

  let noMakeRushNow = () => {
    myref.current.saveNow = false;
    myref.current.noLeftValue = true;
  };

  let actionNow = async function () {
    try {
      console.log("run action", crtStoreName);
      let myalllist = [];
      for (let i = 0; i < parseInt("" + model.random_ipt_size); i++) {
        let a = "";
        for (let i = 0; i < parseInt("" + model.random_ipt_length); i++) {
          a += gutils.uuid("x");
        }
        myalllist.push(a);
      }
      if (_.isEmpty(myalllist)) {
        myalllist = ["EMPTY RESULT"];
      }
      gstore.common_app[crtStoreName].setLeftValue(myalllist.join("\n"));
    } catch (e) {
      console.log("e", e);
      gstore.common_app[crtStoreName].setLeftValue("" + e);
    }
    // let myres = await gutils.opt("/common/gen-uuid-size", {
    //   random_ipt_length: model.random_ipt_length,
    //   random_ipt_seeds: model.random_ipt_seeds,
    //   random_ipt_size: model.random_ipt_size,
    // });
    // let myalllist = myres.content;
  };

  let { is_allow_show_area_mode_in_time } = gstore.localSettings;
  return (
    <BeautifyCodeCommon
      noSources={true}
      noOptions={true}
      leftTopBtmPercent={0.3}
      rightMainGlobalJsx={observer((props) => {
        return (
          <RightMainInternalPage
            containerClz={"snippetcontainer"}
            btmTitle={"Generated Result"}
            onDropFnForBtmJsx={onDropFn}
            rightTopBtmPercent={0.3}
            btmJsxCtn={
              <InternalLeftEditor
                // direct={"right"}
                language={language}
                initEditorByLeftOrRight={props.initEditorByLeftOrRight}
                crtStoreName={crtStoreName}
              />
            }
            topJsxCtn={
              <div
                onScroll={(e) => {
                  let scrollTop = e.target.scrollTop;
                  console.log("scrollTop", scrollTop);
                  myref.current.topScrollTop = scrollTop;
                }}
                ref={(e) => {
                  // if (e) {
                  //   $(e).scrollTop(myref.current.topScrollTop);
                  // }
                }}
                key={"fixedlogic" + crtStoreName}
                style={{ padding: "3px" }}
                className="subitem-all-3px"
              >
                <div className="control-panel-zone my50box">
                  {crtStoreName == "randomUuid"
                    ? [
                        <FormGroup label={t("Random Size")}>
                          <InputGroup
                            large={false}
                            asyncControl={true}
                            key={crtStoreName + "top"}
                            type="number"
                            {...gutils.bindSimpleIpt({
                              model: model,
                              key: "random_ipt_size",
                              prefn() {},
                            })}
                            defaultValue={100}
                            onBlur={() => {
                              if (_.isEmpty(model.random_ipt_size)) {
                                model.random_ipt_size = 10;
                              }
                            }}
                          />
                        </FormGroup>,
                        <FormGroup label={t("Random Seeds(Optional)")}>
                          <InputGroup
                            large={false}
                            asyncControl={true}
                            key={crtStoreName + "top"}
                            {...gutils.bindSimpleIpt({
                              model: model,
                              key: "random_ipt_seeds",
                              prefn() {},
                            })}
                          />
                        </FormGroup>,
                        <FormGroup label={t("Random Length")}>
                          <GSyncSelectWithFilter
                            obj={model}
                            list={[
                              {
                                label: "16",
                                value: "16",
                              },
                              {
                                label: "32",
                                value: "32",
                              },
                              {
                                label: "48",
                                value: "48",
                              },
                              {
                                label: "64",
                                value: "64",
                              },
                            ]}
                            defaultValue={"32"}
                            index={"random_ipt_length"}
                            view_label={model.random_ipt_length}
                            whenChg={(x) => {
                              console.log(`whenchg`, x);
                              model.random_ipt_length = x;
                            }}
                          />
                        </FormGroup>,
                      ]
                    : []}
                </div>
              </div>
            }
          />
        );
      })}
      crtStoreName={crtStoreName}
      noBeautifyBtn={true}
      mytotalTitle={t(mytotaltitle)}
      beforeActionBtn={[
        {
          label: t("Generate Result"),
          intent: "primary",
          onClick: () => {
            actionNow();
          },
          intent: "primary",
        },
      ]}
    />
  );
});
