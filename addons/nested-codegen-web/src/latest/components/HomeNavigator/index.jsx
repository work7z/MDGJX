import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  Radio,
  ButtonGroup,
  TextArea,
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
import { useState, useEffect } from "react";

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
import { autorun, observable }  from 'mobx';
import gstore from "../../store.jsx";
import "./index.less";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";

export default observer((props) => {
  let roadmap = _.sortBy(
    gstore.roadmap_plain.get(),
    (x) => _.size(x.children) * -1
  );
  let fn_key_str = props.fn_key_str || "crt_functions_filter_str";
  let str = gstore.localSettings[fn_key_str];
  let trim_str = _.toLower(_.trim(str));
  let fn_for_ipt = (e) => {
    gstore.localSettings[fn_key_str] = e.target.value;
  };
  if (!_.isEmpty(trim_str)) {
    roadmap = _.map(roadmap, (x, d, n) => {
      if (trim_str != "") {
        return {
          ...x,
          children: _.filter(x.children, (x) => {
            return _.toLower("" + x.pystr || "").indexOf(trim_str) != -1;
          }),
        };
      }
      return x;
    });
    roadmap = _.filter(roadmap, (x) => !_.isEmpty(x.children));
  }
  let m_style = props.m_style || {};
  return (
    <div className="">
      <Card
        className="myhomewrapper-global"
        style={{ margin: "0", padding: "0px", overflow: "auto" }}
      >
        <div className="myroadmap-controller-wrapper">
          <InputGroup
            asyncControl={true}
            value={str}
            onChange={fn_for_ipt}
            autoFocus={props.autoFocus}
            leftIcon={"search"}
            placeholder={t(`Searching the function that you're interested in`)}
          />
        </div>
        <div>
          {_.map(roadmap, (eachRoad, eachRoadIdx) => {
            return (
              <div className="each-navi-wrapper" key={eachRoadIdx}>
                <h3 className="each-navi-header sub-mr-5">
                  <Icon icon={eachRoad.icon} />{" "}
                  <span>
                    {eachRoad.label}
                    {`(${_.size(eachRoad.children)})`}
                  </span>
                </h3>
                <div className="each-navi-children">
                  {_.map(eachRoad.children, (eachChildItem) => {
                    console.log("eachChildItem", eachChildItem);
                    return (
                      <Link
                        // target={p_mode() ? "_blank" : ""}
                        target={p_mode() ? "" : ""}
                        className="navi-anchor  c-touch-anchor-panel c-border-gray "
                        to={eachChildItem.pathname}
                        onClick={() => {
                          if (props.a) {
                            $("html,body").animate({ scrollTop: 0 }, 500);
                          }
                        }}
                      >
                        <span>{eachChildItem.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
});
