
// Date: Fri, 17 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import localforage from "localforage";
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
  MenuItem,
  Radio,
  ButtonGroup,
  TextArea,
  HotkeysProvider,
  Intent,
  Position,
  Toaster,
  Checkbox,
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
  Icon,
  Card,
  Elevation,
  Button,
  Popover,
  Menu,
  MenuDivider,
} from "@blueprintjs/core";
import { Link } from "react-router-dom";

import $ from "jquery";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";

import _ from "lodash";
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  useMemo,
} from "react";
import "allotment/dist/style.css";
import { VAL_CSS_TAB_TITLE_PANEL } from "../types/workbench-types";
import { Dot } from "../utils/cTranslationUtils";
import exportUtils from "../utils/ExportUtils";
import { CSS_TEXT_ANCHOR_CSS } from "../types/constants";

export type EachTab = {
  id: string;
  label: string;
  pageTitle?: string;
  icon: string;
};

type PassProp = {
  tabs?: EachTab[];
  activeTab?: string | null;
  formatAsAnchor?: (tab: EachTab) => string;
  setActiveTab?: (newIdx: string) => any;
  setNewTabs?: (newArr: EachTab[]) => any;
};

export default (props: PassProp) => {
  let { activeTab, setActiveTab } = props;
  const tabs: EachTab[] = props.tabs || [];

  // mock data for tabs
  let [moveLeftDistance, onMoveLeftDistance] = useState(0);

  let commonBG = " using-edge-ui-bg ";
  let fn_handleClickEachTab = (tab: EachTab, tabIdx: number) => () => {
    setActiveTab && setActiveTab(tab.id);
  };
  let [eleId_tab] = useState(_.uniqueId(""));
  let [eleId_subTab] = useState(_.uniqueId(""));
  let [eleId_controlBar] = useState(_.uniqueId(""));
  let fn_format_each_tab = (verticalMode = false) => {
    return (tab: EachTab, tabIdx, tabList) => {
      let isCurrent = activeTab === tab.id;
      let output = (
        <div
          key={tab.id}
          onClick={fn_handleClickEachTab(tab, tabIdx)}
          style={{}}
          data-active={isCurrent ? "t" : "f"}
          data-tabid={tab.id}
          {...(!verticalMode && tabIdx == _.size(tabList) - 1
            ? {
              id: eleId_subTab + "-last",
            }
            : {})}
          className={` transition-all duration-75 ${verticalMode ? "" : " h-each-tab "
            } each-tab  hover:bg-gray-200   whitespace-nowrap  flex h-full hover:cursor-default text-xs select-none items-center ml-0 py-1  last:border-r-[1px] dark:border-r-gray-600 last:border-r-gray-300 px-1  ${isCurrent
              ? "border-b-sky-600  text-sky-700 border-b-[3px]  bg-white hover:bg-white   dark:!text-sky-400 dark:bg-sky-950   dark:hover:bg-sky-950  "
              : " dark:hover:bg-gray-900   "
            } ${verticalMode && isCurrent
              ? ` border-t-sky-600 border-t-[3px] `
              : ""
            } dark:text-slate-400`}
        >
          <Icon
            icon={tab.icon as any}
            className={`h-5 w-5  !inline-flex items-center justify-center ${isCurrent ? "blue-svg" : "gray-svg"
              }  `}
            style={{
              marginRight: "5px",
            }}
          ></Icon>
          <span>{tab.label}</span>
          <Icon
            icon="cross"
            className={
              "small-close-btn ml-1  " + ` ${isCurrent ? "gen-active" : ""} `
            }
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              let newTabs = _.filter(tabs, (x, idx) => {
                return idx != tabIdx;
              });
              props.setNewTabs && props.setNewTabs(newTabs);
            }}
          ></Icon>
          {/* <XIcon className="h-5 w-5 text-gray-500" /> */}
        </div>
      );
      if (!props.formatAsAnchor) {
        return output;
      }
      return (
        <Link
          className={CSS_TEXT_ANCHOR_CSS + " hover:text-current"}
          to={props.formatAsAnchor(tab)}
        >
          {output}
        </Link>
      );
    };
  };
  let resizeFactors = exportUtils.resize_factors();
  let PanelThatNotShown = useMemo(() => {
    return ({ fn_format_each_tab }) => {
      let allHiddenTabs = useMemo(() => {
        let parentELE = $("#" + eleId_tab);
        let parentRect = parentELE[0].getBoundingClientRect();
        let allSubTabs = parentELE.find(".each-tab");
        // check all tabs that are not shown (meaning that it not visible in the width and height of parent element eleId_tab)
        let allHiddenTabs = allSubTabs.filter((i, each) => {
          let childRect = each.getBoundingClientRect();
          let isCrt = $(each).data("active") == "t";
          // check if childRect.x + childRect.width, and childRect.y + childRect.height inside parentRect
          let isInsideX =
            childRect.x + childRect.width > parentRect.x &&
            childRect.x < parentRect.x + parentRect.width;
          return !isInsideX && !isCrt;
        });
        return allHiddenTabs;
      }, []);
      // record current scroll position
      let [scrollPosition, setScrollPosition] = useState(0);
      // TODO: add search bar here
      return (
        <div
          className={`${commonBG} scroll overflow-y-auto overflow-x-hidden `}
          style={{
            maxHeight: "300px",
            // minWidth: "300px",
          }}
          ref={(e) => { }}
          onScroll={(x) => { }}
        >
          {/*
          <InputGroup
            placeholder={Dot("hhOT3", "Search by Name")}
            small
            autoFocus
          ></InputGroup> */}
          {allHiddenTabs.map((idx, x) => {
            // get current tab by $(x).data("tabid")
            let tabId = $(x).data("tabid");
            let currentTab = tabs.find((x) => x.id == tabId);
            return (
              <div key={idx}>{fn_format_each_tab(true, idx)(currentTab)}</div>
            );
          })}
        </div>
      );
    };
  }, []);
  let [crtTranslateX, onCrtTranslateX] = useState<number>(0);
  useEffect(() => {
    onCrtTranslateX(0);
  }, [exportUtils.resize_factors()]);
  let [p_width, onPWidth] = useState(0);
  let [subP_width, onSubPWidth] = useState(0);
  let moveStep = 120;
  let allSubChildrenWidth = useMemo(() => {
    var totalWidth = 0;
    $("#" + eleId_subTab)
      .children()
      .each(function (idx, ele) {
        if (ele) {
          totalWidth += ele.getBoundingClientRect().width;
        }
      });
    return totalWidth;
  }, [
    p_width,
    subP_width,
    eleId_subTab,
    eleId_tab,
    _.size(tabs),
    activeTab,
    ...resizeFactors,
  ]);
  let shouldShowLeftRight = p_width > 0 && p_width < allSubChildrenWidth;

  let isItReachedToRightLimit = useMemo(() => {
    let $controlBar = $("#" + eleId_controlBar);
    if ($controlBar.length != 0) {
      // let ctlX = $controlBar[0].getBoundingClientRect().x;
      let isItGreaterThanLimits =
        Math.abs(crtTranslateX) + subP_width - moveStep >
        allSubChildrenWidth + moveStep / 2;
      return isItGreaterThanLimits;
      // let $subLastTab = $("#" + eleId_subTab + "-last");
      // if ($subLastTab.length != 0) {
      // let rect2 = $subLastTab[0].getBoundingClientRect();
      // let lastTabX = rect2.x + rect2.width;
      // return lastTabX > ctlX;
      // }
    } else {
      return false;
    }
  }, [
    allSubChildrenWidth,
    _.size(tabs),
    activeTab,
    shouldShowLeftRight,
    crtTranslateX,
    ...resizeFactors,
  ]);
  let closeCurTab = () => {
    let newTabs = _.filter(tabs, (x, idx) => {
      return x.id != activeTab;
    });
    props.setNewTabs && props.setNewTabs(newTabs);
  };

  return (
    <div
      style={{
        height: VAL_CSS_TAB_TITLE_PANEL,
      }}
      id={eleId_tab}
      ref={(e) => {
        let rect = e?.getBoundingClientRect();
        rect && onPWidth(rect?.width);
      }}
      className={`w-full h-full relative     border-b-gray-300 dark:border-b-gray-600  ${commonBG} `}
    >
      <div
        className={` flex space-x-0 h-full   w-full  `}
        style={{
          // overflowX: "visible",
          overflow: "visible",
          // overflowY: "hidden",
          // transform: "translateX(" + crtTranslateX + "px)",
          position: "absolute",
          left: crtTranslateX + "px",
        }}
        id={eleId_subTab}
        ref={(e) => {
          let rect = e?.getBoundingClientRect();
          rect && onSubPWidth(rect?.width);
        }}
        // on mouse scroll
        onWheel={(e) => {
          // e.preventDefault();
          // let newMoveLeftDistance = moveLeftDistance + e.deltaY;
          // if (newMoveLeftDistance < 0) {
          //   newMoveLeftDistance = 0;
          // }
          // onMoveLeftDistance(newMoveLeftDistance);
        }}
      >
        {tabs.map(fn_format_each_tab(false))}
      </div>
      <div
        id={eleId_controlBar}
        className={` absolute  right-0 top-0 h-full ${shouldShowLeftRight ? "px-2 pr-1" : "px-0"
          } common-border-left  ${commonBG}`}
        style={
          {
            // paddingLeft: '0'
          }
        }
      >
        <ButtonGroup>
          {[
            ...(shouldShowLeftRight
              ? [
                {
                  small: true,
                  icon: "chevron-left",
                  tooltip: Dot("sdfk1", "Scroll tabs to left"),
                  disabled: crtTranslateX == 0,
                  onClick: () => {
                    onCrtTranslateX(crtTranslateX + moveStep);
                  },
                },
                {
                  small: true,
                  icon: "chevron-right",
                  disabled: isItReachedToRightLimit,
                  tooltip: Dot("sdfk13", "Scroll tabs to right"),
                  onClick: () => {
                    onCrtTranslateX(crtTranslateX - moveStep);
                  },
                },
                {
                  small: true,
                  icon: "chevron-down",
                  tooltip: Dot("R12bq", "List tabs that are not shown"),
                  panel: (
                    <PanelThatNotShown
                      fn_format_each_tab={fn_format_each_tab}
                    />
                  ),
                },
              ]
              : []),

            {
              small: true,
              icon: "more",
              tooltip: Dot("G9QVo", "Manage Tabs"),
              panel: (
                <div>
                  <Menu small>
                    {/* <MenuItem icon="add" text="Add Tab" /> */}
                    {/* <MenuItem icon="edit" text="Edit Tab" /> */}
                    {/* <MenuItem icon="trash" text="Delete Tab" /> */}
                    <MenuItem
                      // icon="menu-closed"
                      text={Dot("ZrbuC", "Close Tab")}
                      onClick={closeCurTab}
                    />
                    <MenuItem
                      // icon="collapse-all"
                      text={Dot("ZrbduC", "Close All Tabs")}
                      onClick={() => {
                        props.setNewTabs && props.setNewTabs([]);
                      }}
                    />
                    {/* <MenuDivider /> */}
                    {/* <MenuItem icon="import" text="Import" /> */}
                    {/* <MenuItem icon="export" text="Export" /> */}
                    {/* <MenuDivider /> */}
                    {/* <MenuItem
                      // icon="cog"
                      text={Dot("lpKAz", "Settings")}
                      disabled
                    /> */}
                  </Menu>
                </div>
              ),
            },
          ].map((x) => {
            return (
              <Popover
                key={x.icon}
                placement="bottom-end"
                minimal
                content={x.panel}
              >
                <Tooltip content={x.tooltip} placement="bottom">
                  <Button
                    {...(x as any)}
                    disabled={x.disabled}
                    minimal
                    className=" h-[28px] w-[28px] "
                    key={x.icon}
                  ></Button>
                </Tooltip>
              </Popover>
            );
          })}
        </ButtonGroup>
      </div>
    </div>
  );
};

// border-b-gray-300 border-b-[1px]
