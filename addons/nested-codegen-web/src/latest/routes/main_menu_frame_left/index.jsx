import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  ResizeSensor,
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
import { useState, useContext } from "react";
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
import GTree from "../../components/tree/index.jsx";
import _ from "lodash";
import { Resizable } from "re-resizable";
// import { Scrollbars } from "react-custom-scrollbars";
const style = {
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "center",
  // border: "solid 1px #ddd",
  // background: "#f0f0f0",
};

export default observer((props) => {
  const [defaultW, onDefaultWChg] = useState(
    gstore.localSettings.leftMenuWidth
  );
  // // // console.log(
  //   "rendering default w",
  //   defaultW,
  //   gstore.localSettings.leftMenuWidth
  // );
  let fin_roadmap = gstore.roadmap.get();
  let isCrtOnlyShowMode = props.treemap;
  if (isCrtOnlyShowMode) {
    fin_roadmap = props.treemap;
  }
  let filter_for_left_menu_search_bar = _.toLower(
    gstore.settings.filter_for_left_menu_search_bar
  );

  let ThatTag = _.get(props, "mtag", Resizable);
  let btmjsx = (
    <div className="system-btm-nav">
      <InputGroup
        icon="search"
        leftIcon="search"
        rightElement={
          <Button
            minimal={true}
            onClick={() => {
              let willWorkPath = "/";
              gutils.showPageByModal(willWorkPath, {
                title: `Navigator`,
                icon: "map",
              });
            }}
            outline={true}
            icon="map"
          />
        }
        small={true}
        asyncControl={true}
        autoFocus={false}
        value={gstore.settings.filter_for_left_menu_search_bar}
        onChange={(e) => {
          gstore.settings.filter_for_left_menu_search_bar =
            gutils.getValueFromE(e);
        }}
      ></InputGroup>
    </div>
  );
  let size_r = {
    width: defaultW,
    height: "calc(100vh - 46px)",
  };
  // let val_height_tree = `calc(${
  //   gstore.localSettings.app_multiple_tab_mode ? "100vh - 46px" : "100%"
  // } - 46px - 35px - 2px)`;
  return (
    <ThatTag
      mid={`main_left_frame`}
      {...gutils.allResizeProps()}
      enable={_.merge(gutils.enableResize(), {
        right: true,
      })}
      style={style}
      defaultSize={size_r}
      minWidth={gutils.frame_defaultWidth}
      onResizeStop={(event, direct, refToEle, delta) => {
        gutils.defer(() => {
          gstore.localSettings.leftMenuWidth = refToEle.style.width;
        });
        gutils.defer(() => {
          gutils.callWhenResize();
        });
      }}
      className="main-frame-left-box"
    >
      {isCrtOnlyShowMode ? btmjsx : null}
      <div
        className="system-navigator"
        style={{
          borderTop: gstore.localSettings.app_multiple_tab_mode
            ? "1px solid var(--app-border-gray-e1e8ed)"
            : null,
          display: isCrtOnlyShowMode ? "none" : null,
        }}
      >
        <span class="appname">
          {gutils.app_name} {gutils.app_version}
        </span>
        <div></div>
        <Button
          icon="chevron-left"
          onClick={() => {
            gstore.localSettings.isLeftMenuOpen = false;
            gstore.show_left_menu_obj.isOpen = false;
          }}
          outlined={true}
        ></Button>
      </div>
      <div
        hideTracksWhenNotNeeded={true}
        thumbSize={10}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        className="system-navtree"
        // style={{
        //   width: "100%",
        //   height: val_height_tree,
        //   maxHeight: val_height_tree,
        //   overflow: "auto",
        // }}
      >
        <GTree
          nodes={fin_roadmap}
          need_filter={_.trim(filter_for_left_menu_search_bar) != ""}
          fn_finalFilter={(treeRoot) => {
            let fin = gutils.iterateTree(
              treeRoot,
              (firstLayer) => {
                if (firstLayer.hasCaret) {
                  firstLayer.childNodes = _.filter(
                    firstLayer.childNodes,
                    (secondLayer, ddd, nnn) => {
                      // if (secondLayer.hasCaret) {
                      //   return true;
                      // }
                      let x = secondLayer.rawobj;
                      let pystr = x.pystr;
                      if (_.isNil(pystr) || pystr == "") {
                        try {
                          if (window.formatForPyStr) {
                            window.formatForPyStr(x);
                          }
                          pystr = x.pystr;
                          if (_.isNil(pystr)) {
                            pystr = _.toLower(x.label);
                          }
                        } catch (e) {
                          console.log("e", e);
                        }
                      }
                      let isNeedPass =
                        _.toLower(pystr).indexOf(
                          filter_for_left_menu_search_bar
                        ) != -1;
                      let anyAck = false;
                      if (!_.isEmpty(secondLayer.childNodes)) {
                        console.log(
                          `second layer childrens`,
                          secondLayer.childNodes
                        );
                        secondLayer.childNodes = _.filter(
                          secondLayer.childNodes,
                          (thirdLayer, dd, nn) => {
                            console.log(
                              `second layer childrens -> thidLayer`,
                              thirdLayer
                            );
                            // if (secondLayer.hasCaret) {
                            //   return true;
                            // }
                            let x2 = thirdLayer.rawobj;
                            let pystr2 = x2.pystr;
                            if (_.isNil(pystr2) || pystr2 == "") {
                              try {
                                if (window.formatForPyStr) {
                                  window.formatForPyStr(x2);
                                }
                                pystr2 = x2.pystr;
                                if (_.isNil(pystr2)) {
                                  pystr2 = _.toLower(x2.label);
                                }
                              } catch (e) {
                                console.log("e", e);
                              }
                            }
                            let isNeedPass2 =
                              _.toLower(pystr2).indexOf(
                                filter_for_left_menu_search_bar
                              ) != -1;
                            if (isNeedPass2) {
                              anyAck = true;
                            }
                            return isNeedPass2;
                          }
                        );
                      }

                      return isNeedPass || anyAck;
                    }
                  );
                }
                return firstLayer;
              },
              "childNodes"
            );
            let t_2 = () => {
              if (fin && fin[0] && fin[0].childNodes) {
                fin[0].childNodes = _.filter(fin[0].childNodes, (x, d, n) => {
                  if (!x.hasCaret) {
                    return true;
                  }
                  let isNextPass = !_.isEmpty(x.childNodes);
                  if (isNextPass) {
                    x.childNodes = _.filter(x.childNodes, (xx, dd, nn) => {
                      if (!xx.hasCaret) {
                        return true;
                      } else {
                        let two_pass = !_.isEmpty(xx.childNodes);
                        if (two_pass) {
                          xx.childNodes = _.filter(
                            xx.childNodes,
                            (xxx, ddd, nnn) => {
                              if (!xxx.hasCaret) {
                                return true;
                              } else {
                                return !_.isEmpty(xxx.childNodes);
                              }
                            }
                          );
                        }
                        return two_pass;
                      }
                    });
                  }
                  return isNextPass;
                });
              }
            };
            t_2();
            t_2();
            t_2();
            return fin;
          }}
        />
      </div>
      {isCrtOnlyShowMode ? null : btmjsx}
    </ThatTag>
  );
});
