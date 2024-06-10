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
  Divider,
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
import { autorun, reaction,observable } from "mobx";
import gstore from "../../store.jsx";
import "./index.less";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import ControlTable from "../control_table";
import GVisualTable from "../NoUseCrtTable";
import _ from "lodash";
import Draggable, { DraggableCore } from "react-draggable";
import Blink from "../Blink";

const headerValue = 23;
const rowHeightValue = 23;

const List = observer((props) => {
  const completeSubChildren = [];
  const {
    rowHeight,
    rowCount_fact,
    width,
    height,
    pageViewNum,
    rowCount,
    crtDataIndex,
  } = props;
  let startViewIndex = crtDataIndex;
  let endViewIndex = startViewIndex + pageViewNum;
  // // // console.log("whee list idx before", startViewIndex, endViewIndex);
  if (startViewIndex < 0) {
    startViewIndex = 0;
    endViewIndex = 0;
    // endViewIndex = pageViewNum;
  }
  if (endViewIndex >= rowCount && crtDataIndex != 0) {
    startViewIndex = rowCount - 1 - pageViewNum;
    endViewIndex = rowCount;
  }
  if (startViewIndex < 0 || endViewIndex < 0) {
    return "";
  }
  for (let i = startViewIndex; i <= endViewIndex; i++) {
    const crtLoopIdx = i;
    if (crtLoopIdx > 1000) {
      // //debugger;
    }
    completeSubChildren.push(
      props.rowRenderer({
        index: crtLoopIdx,
        isExcess: crtLoopIdx < 0 || crtLoopIdx >= rowCount,
        style: {
          width: props.width + "px",
          height: props.rowHeight + "px",
          lineHeight: props.rowHeight + "px",
        },
      })
    );
  }
  return (
    <div
      onScroll={(e) => {
        // // console.log("scrolling", e);
      }}
      onWheel={(e) => {
        // // console.log("whelling", e.deltaX, e.deltaY);
        // if (e.deltaY > 2) {
        if (props.onWheel) {
          if (
            // !(
            //   startViewIndex + e.deltaY < 0 ||
            //   startViewIndex + e.deltaY >= rowCount
            // )
            true
            // e.deltaX <= 2
            // Math.abs(e.deltaY) >= 3
          ) {
            props.onWheel({
              rowCount: rowCount,
              pageViewNum: pageViewNum,
              // deltaY: 1 * (e.deltaY < 0 ? -1 : 1),
              // deltaY:
              // Math.abs(e.deltaY) > 2 ? parseInt(e.deltaY * 0.6) : e.deltaY,
              deltaY: e.deltaY,
            });
          }
        }
        // }
      }}
      onWheelCapture={(e) => {}}
      className="virtual-list-box"
    >
      {completeSubChildren}
    </div>
  );
});

const MyScrollBar = observer((props) => {
  const { calcTopValue } = props;
  const [randBoxValId] = useState(_.uniqueId("myrandboxval"));
  return (
    <div
      id={"p" + randBoxValId}
      className="g-scrollbar-box"
      style={{
        display: "inline-block",
        width: props.width,
        position: "relative",
      }}
      onClick={(e) => {
        gutils.stop_e(e);
      }}
    >
      <Draggable
        axis="y"
        allowAnyClick={false}
        bounds={{
          top: 0,
          bottom:
            props.commonListProps.totalTableBodyHeight -
            props.commonListProps.crtDragItemHeight,
        }}
        onDrag={(e) => {
          let pobj = $("#p" + randBoxValId);
          let obj = $("#" + randBoxValId);
          let orect = obj[0].getBoundingClientRect();
          let porect = pobj[0].getBoundingClientRect();
          let crtTopShift = orect.top - porect.top;
          if (crtTopShift < 0) {
            crtTopShift = 0;
          }
          const rateval = (crtTopShift + orect.height) / porect.height;
          console.log("rateval", rateval);
          if (crtTopShift + orect.height >= porect.height) {
            crtTopShift = porect.height - orect.height;
          }
          props.onUptScrollTop(crtTopShift);
          const { commonListProps } = props;
          let {
            totalTableBodyHeight,
            totalOffsetNumber,
            remainTotalBarHeight,
            crtDragItemHeight,
            rowCount,
          } = commonListProps;
          // const crtUptIdxValue = Math.ceil(
          //   (((crtTopShift / totalTableBodyHeight) *
          //     (100 - crtDragItemHeight)) /
          //     (100 - crtDragItemHeight)) *
          //     rowCount
          // );
          const crtUptIdxValue = Math.floor(
            parseInt((crtTopShift / remainTotalBarHeight) * totalOffsetNumber)
          );
          // console.log("dragging", crtTopShift, crtUptIdxValue);
          props.onUpdateIndex(crtUptIdxValue);
          // if (false) {
          //   const mytopvalue = calcTopValue + e.movementY;
          //   //  parseFloat(
          //   //   obj[0].style.transform.split(",")[1].replaceAll(")", "")
          //   // );
          //   const nextIndexValue = Math.floor(
          //     (mytopvalue / (height * (100 - crtDragItemHeight))) *
          //       rowCount
          //   );
          //   // // console.log("next value index", nextIndexValue);
          // }
        }}
        position={{ x: 0, y: props.calcTopValue }}
      >
        <div
          id={randBoxValId}
          className="g-scrollbar-dragitem"
          style={{
            // transform:
            // "translate(0px, " + height * (crtDragItemTopOffset / 100) + "px)",
            // top: crtDragItemTopOffset + "%",
            height: props.crtDragItemHeight + "px",
          }}
        ></div>
      </Draggable>
    </div>
  );
});

const TableControlBar = observer((props) => {
  let { obj, extra, commonListProps } = props;
  let divider_bar = (
    <ButtonGroup className="common-control-bar-btmgroup" vertical={true}>
      <Divider />
    </ButtonGroup>
  );
  return (
    <div className="myleftview-box">
      <span>
        {t(
          `{0} record(s) fecthed - {1}ms`,
          // commonListProps.crtDataIndex,
          // commonListProps.crtDataIndex + commonListProps.pageViewNum_floor,
          commonListProps.rowCount_fact,
          commonListProps.spendMS
        )}
      </span>
      <span> - </span>
      {/* {divider_bar} */}
      <span>
        {extra.viewNoMore
          ? t(`Loaded All`)
          : extra.viewMoreLoading
          ? [t("Loading"), <Blink />]
          : t(`Loaded`)}
      </span>
    </div>
  );
});

const LoadingPageForTable = observer((props) => {
  return (
    <div className="myloading-page">
      <Example>
        <ProgressBar intent={"none"} size={50} value={null} />
      </Example>
    </div>
  );
});
const EmptyPageForTable = observer((props) => {
  return (
    <div className="fullview-page myempty-page">
      <div>
        {t(
          props.defaultTooltip ||
            `no related data, please check if app was reloaded or the SQL condition wasn't satisfied.`
        )}
      </div>
    </div>
  );
});
let mycalcstrconfig = "normal 500 10px sans-serif";

const ErrorPageForTable = observer((props) => {
  return (
    <div className="fullview-page myerror-page">
      <div>
        {_.chain(props.error)
          .split("\n")
          .map((x, d, n) => {
            return <div key={d}>{x}</div>;
          })
          .value()}
      </div>
    </div>
  );
});

let origin_fixwidth_for_order = 25;

class VisualControlDataTable extends React.Component {
  state = {
    fixWidthForOrder: origin_fixwidth_for_order,
  };

  getExtra = () => {
    return this.getObj().extra || {};
  };

  getObj = () => {
    return this.props.obj || {};
  };

  getRes = () => {
    return this.getObj().res || {};
  };

  updateAllCalculateComputedValue = async () => {
    console.log("trigger-1 updateAllCalculateComputedValue");
    let { columnIndexArr, dataList } = this.getRes();
    let preOrderColumnStr = this.getExtra().preOrderColumnStr;
    const mywidthvalue = this.getExtra().mywidthvalue;
    const { lineHeight, extraLengthForBasicCell } = this.getExtra();
    let firstRow = _.first(dataList);
    let userDragObj = this.getExtra().userDragObj;

    let columnWidthWIthIncludingTHeExtra =
      parseInt(mywidthvalue) + extraLengthForBasicCell;
    let calcColumnIndexArr = [...columnIndexArr].map((x, d, n) => {
      let isPre = x == preOrderColumnStr;
      let crtLabelWidth = columnWidthWIthIncludingTHeExtra;
      let mygoodwidth = calculateTextWidth(x, mycalcstrconfig);
      crtLabelWidth = mygoodwidth;
      if (firstRow) {
        let mygotvalue = _.get(firstRow, [x, "value"]);
        if (!_.isNil(mygotvalue)) {
          let mm_2_width = calculateTextWidth(mygotvalue, mycalcstrconfig);
          if (mm_2_width > crtLabelWidth) {
            crtLabelWidth = mm_2_width;
          }
        }
      }
      crtLabelWidth += 20;
      let isUserDragHas = false;
      if (userDragObj) {
        let userdragwidth = userDragObj[x];
        if (!_.isNil(userdragwidth)) {
          crtLabelWidth = userdragwidth - extraLengthForBasicCell;
          isUserDragHas = true;
        }
      }

      return {
        isUserDragHas,
        pre: isPre,
        label: x,
        width: isPre ? fixWidthForOrder : crtLabelWidth,
      };
    });
    let completeEachRowWidth = _.chain(calcColumnIndexArr)
      .map(
        (x) =>
          x.width +
          (x.pre ? 1 : x.isUserDragHas && false ? 1 : extraLengthForBasicCell)
      )
      .sum()
      .value();

    this.setExtra({
      completeEachRowWidth,
      calcColumnIndexArr,
    });
  };

  onLineHeight = (val) => {
    this.setExtra({
      lineHeight: val,
    });
  };
  onCrtBoxSize = (val) => {
    this.setExtra({
      crtBoxSize: val,
    });
  };
  updateLineHeight = () => {
    console.log("trigger-1 updateLineHeight");
    const { crtBoxSize } = this.getExtra();
    let $ele = $("#" + this.boxId);
    if ($ele.length != 0) {
      let $tableele = $ele.find(".gvisual-table-box");
      $tableele.addClass("hidden");
      const nextSize = {
        width: $ele.width(),
        height: $ele.height(),
      };
      $tableele.removeClass("hidden");
      if (!_.isEqual(crtBoxSize, nextSize)) {
        let mval1 = parseInt(
          $ele.find(".control-tb-bar-view").outerHeight(true) || 0
        );
        let mval2 = parseInt(
          $ele
            .find(".gvisual-table-box-right-side .vc-table-headers-box")
            .outerHeight(true) || 0
        );
        const nextLineHeight = Math.max(
          parseInt(nextSize.height) - mval1 - mval2,
          0
        );
        const totalTableBodyHeight = Math.max(
          parseInt(nextSize.height) - mval1,
          0
        );
        if (nextLineHeight > 1000) {
          // //debugger;
        }
        // only set state when height is changed
        this.setExtra(
          {
            totalTableBodyHeight: totalTableBodyHeight,
            lineHeight: nextLineHeight,
            crtBoxSize: _.cloneDeep(nextSize),
          },
          () => {
            // this.updateAllCalculateComputedValue();
            // // this.updateLineHeight();
            // this.recalcScrollInfo();
            this.basic_refreshCalculateValueAndLineHeightAndScrollInfo();
          }
        );
      }
    }
  };

  getCrtStartIndex = () => {
    return this.getExtra().crtStartIndex;
  };
  getCalcColumnIndexArr = () => {
    return this.getExtra().calcColumnIndexArr;
  };

  basic_refreshCalculateValueAndLineHeightAndScrollInfo = async () => {
    console.log(
      "trigger-1 basic_refreshCalculateValueAndLineHeightAndScrollInfo"
    );
    await this.updateAllCalculateComputedValue();
    this.updateLineHeight();
    this.recalcScrollInfo();
  };

  boxId = _.uniqueId("randomId");
  vcMainBoxId = _.uniqueId("vcb");

  $vcMainBox = null;

  componentDidMount = () => {
    console.log("cpt-lc did mount", this.boxId, this.getCommonListProps());
    gutils.anyResizeTriggerArr[this.boxId] = () => {
      this.basic_refreshCalculateValueAndLineHeightAndScrollInfo();
    };
    let commonDataMatching = () => {
      return [
        this.getExtra().userDragObj,
        this.getRes().columnIndexArr,
        this.getRes().dataList,
      ];
    };
    let myrefForAutorun = reaction(
      () => {
        return commonDataMatching();
      },
      () => {
        console.log("working reaction", this.boxId);
        this.basic_refreshCalculateValueAndLineHeightAndScrollInfo();
      }
    );
    let n1 = reaction(
      () => {
        console.log("working reaction n1", this.boxId);
        return {
          highlightPoints: this.getExtra().highlightPoints,
          endRow: this.getExtra().highlightPoints.endRow,
          endRow: this.getExtra().highlightPoints.endRow,
        };
      },
      ({ highlightPoints }) => {
        let rowObject = {
          rowIndex: highlightPoints.endRow,
          colIndex: highlightPoints.endCol,
        };
        let commonListProps = this.getCommonListProps();
        if (rowObject.rowIndex >= commonListProps.rowCount) {
          return;
        }
        let l_pageViewNum = commonListProps.pageViewNum_floor;
        let l_crtDataIndex = commonListProps.crtDataIndex;
        let l_mylimitlastviewnum = l_crtDataIndex + l_pageViewNum - 1;
        if (rowObject.rowIndex == -1) {
          return;
        }
        if (commonListProps.pageViewNum >= commonListProps.rowCount_fact) {
          return;
        }
        console.log("ack that end cell", rowObject, l_mylimitlastviewnum);
        if (rowObject.rowIndex >= l_mylimitlastviewnum) {
          console.log(
            "updating the data index",
            rowObject.rowIndex,
            l_mylimitlastviewnum
          );
          this.onUpdateIndex(rowObject.rowIndex - l_pageViewNum + 1);
        } else if (rowObject.rowIndex < l_crtDataIndex) {
          this.onUpdateIndex(rowObject.rowIndex);
        }
        this.recalcScrollInfo();
      }
    );
    // init the scroll left
    let $vcMainBox = $("#" + this.vcMainBoxId);
    this.$vcMainBox = $vcMainBox;
    let n2 = reaction(
      () => {
        return {
          highlightPoints: this.getExtra().highlightPoints,
          endRow: this.getExtra().highlightPoints.endRow,
          endCol: this.getExtra().highlightPoints.endCol,
        };
      },
      ({ highlightPoints }) => {
        console.log("working reaction n2", this.boxId);
        gutils.defer(() => {
          let lcp = this.getCommonListProps();
          if (
            highlightPoints.endRow >= lcp.rowCount ||
            highlightPoints.startRow >= lcp.rowCount
          ) {
            return;
          }
          let currentViewStart = $vcMainBox.scrollLeft();
          let currentViewWidth = $vcMainBox.outerWidth(true);
          let currentViewEnd = currentViewStart + currentViewWidth;
          let $endCell = $vcMainBox.find(".crt-end-cell");
          if ($endCell.length == 0) {
            return;
          }
          let crtOffsetForStart = $endCell[0].offsetLeft;
          let crtOffsetForEnd = crtOffsetForStart + $endCell.outerWidth(true);
          gutils.log_1(
            "checking the horizontal orientation",
            {
              currentViewStart,
              currentViewEnd,
              crtOffsetForStart,
              crtOffsetForEnd,
            },
            $endCell
          );
          if (currentViewEnd < crtOffsetForEnd) {
            $vcMainBox.scrollLeft(crtOffsetForEnd - currentViewWidth);
          }
          if (currentViewStart > crtOffsetForStart) {
            console.log(
              "will move to left by the start value",
              crtOffsetForStart,
              $endCell
            );
            // number 28 is padding value
            $vcMainBox.scrollLeft(crtOffsetForStart - 28 * 2);
          }
        }, 10);
      }
    );
    if (this.refForAutorun) {
      _.forEach(this.refForAutorun, (x) => {
        if (x) {
          x();
        }
      });
    }
    this.refForAutorun = [myrefForAutorun, n1, n2];
    gutils.removeOnce("init_that_" + this.boxId);
    gutils.keyDownListenObj["kd" + this.boxId] = (e) => {
      if (_.isNil(this.props.notActive) || this.props.notActive()) {
        // debugger;
        return;
      }
      gutils.log_1("got your keys ipt now", e);
      let mappingKeysForMoveEndStartIndex = {
        ArrowUp: {
          move: (obj) => {
            obj.endRow = Math.max(0, obj.endRow - 1);
          },
        },
        ArrowDown: {
          move: (obj) => {
            obj.endRow = Math.min(
              obj.endRow + 1,
              this.getCommonListProps().rowCount - 1
            );
          },
        },
        ArrowLeft: {
          move: (obj) => {
            obj.endCol = Math.max(0, obj.endCol - 1);
          },
        },
        ArrowRight: {
          move: (obj) => {
            obj.endCol = Math.min(
              obj.endCol + 1,
              _.size(this.getExtra().calcColumnIndexArr) - 1
            );
          },
        },
      };
      if (e.metaKey && e.key == "c") {
        const highlightPoints = this.getExtra().highlightPoints || {};
        if (highlightPoints.startRow == -1 && highlightPoints.endRow == -1) {
          return;
        }
        function runCopy(myfullstr) {
          gutils.copy(myfullstr);
          gutils.alertOk("Copied");
        }
        let { dataList, columnIndexArr } = this.getRes();
        // debugger;
        if (highlightPoints.startRow != -1 && highlightPoints.endRow == -1) {
          runCopy(
            _.get(dataList, [
              highlightPoints.startRow,
              _.get(columnIndexArr, highlightPoints.startCol),
              "value",
            ])
          );
          return;
        }
        if (highlightPoints.endRow != -1 && highlightPoints.startRow == -1) {
          runCopy(
            _.get(dataList, [
              highlightPoints.endRow,
              _.get(columnIndexArr, highlightPoints.endCol),
              "value",
            ])
          );
          return;
        }
        let leftTopRow = Math.min(
          highlightPoints.startRow,
          highlightPoints.endRow
        );
        let leftTopCol = Math.min(
          highlightPoints.startCol,
          highlightPoints.endCol
        );
        let rightBtmRow = Math.max(
          highlightPoints.startRow,
          highlightPoints.endRow
        );
        let rightBtmCol = Math.max(
          highlightPoints.startCol,
          highlightPoints.endCol
        );
        let myarr = [];
        for (let rowidx = leftTopRow; rowidx <= rightBtmRow; rowidx++) {
          let mysubarr = [];
          for (let colidx = leftTopCol; colidx <= rightBtmCol; colidx++) {
            let thatval = _.get(dataList, [
              rowidx,
              _.get(columnIndexArr, colidx),
              "value",
            ]);
            mysubarr.push(thatval);
          }
          myarr.push(mysubarr.join("\t"));
        }
        let myfullstr = myarr.join("\n");
        runCopy(myfullstr);
        return;
      }

      let crtKey = e.key;
      let mappingOrietationItem = mappingKeysForMoveEndStartIndex[crtKey];
      if (!_.isNil(mappingOrietationItem)) {
        const extraObj = this.getExtra();
        const highlightPoints = extraObj.highlightPoints || {};
        if (
          _.isNil(highlightPoints) ||
          (highlightPoints.startRow == -1 &&
            highlightPoints.startCol == -1 &&
            highlightPoints.endRow == -1 &&
            highlightPoints.endCol == -1)
        ) {
          gutils.log_1("will not particiating in the no selection situation");
          return;
        }
        if (gutils.dev()) {
          console.log("pre action", _.cloneDeep(highlightPoints));
        }
        if (e.shiftKey) {
          // need selection all
          // if (highlightPoints.startRow != -1) {
          //   highlightPoints.endRow = highlightPoints.startRow;
          //   highlightPoints.endCol = highlightPoints.startCol;
          //   highlightPoints.startRow = -1;
          //   highlightPoints.startCol = -1;
          // }
          if (highlightPoints.startRow == -1) {
            highlightPoints.startRow = highlightPoints.endRow;
            highlightPoints.startCol = highlightPoints.endCol;
          }
          if (highlightPoints.endRow == -1) {
            highlightPoints.endRow = highlightPoints.startRow;
            highlightPoints.endCol = highlightPoints.startCol;
          }
          mappingOrietationItem.move(highlightPoints);
        } else {
          if (highlightPoints.startRow != -1) {
            highlightPoints.endRow = highlightPoints.startRow;
            highlightPoints.endCol = highlightPoints.startCol;
            highlightPoints.startRow = -1;
            highlightPoints.startCol = -1;
          }
          mappingOrietationItem.move(highlightPoints);
        }
        if (gutils.dev()) {
          console.log("aft action", _.cloneDeep(highlightPoints));
        }
      }
    };
  };

  refForAutorun = [];

  componentWillUnmount = () => {
    console.log("cpt-lc will unmount", this.boxId, this.getCommonListProps());
    gutils.removeOnce("init_that_" + this.boxId);
    // console.log("cpt unmount", this);
    delete gutils.anyResizeTriggerArr[this.boxId];
    delete gutils.keyDownListenObj["kd" + this.boxId];
    if (this.refForAutorun) {
      _.forEach(this.refForAutorun, (x) => {
        if (x) {
          x();
        }
      });
    }
  };

  filterOnWheel = (e) => {
    const { deltaY, rowCount, pageViewNum } = e;
    let finalValue = this.getExtra().crtDataIndex + Math.floor(deltaY);
    if (finalValue < 0) {
      finalValue = 0;
    }
    if (finalValue + pageViewNum >= rowCount) {
      finalValue = rowCount - pageViewNum - 1;
    }
    // if (finalValue + pageViewNum + 2 >= rowCount) {
    //   finalValue = rowCount - pageViewNum - 2;
    // }
    if (finalValue < 0) {
      finalValue = 0;
    }
    finalValue = finalValue;
    this.setExtra(
      {
        crtDataIndex: finalValue,
      },
      () => {
        this.recalcScrollInfo();
      }
    );
  };

  callDelayReachBtm = () => {
    const { whenToBtm } = this.props;
    if (whenToBtm) {
      whenToBtm();
    }
  };

  recalcScrollInfo = () => {
    console.log("trigger-1 recalcScrollInfo");
    const commonListProps = this.getCommonListProps();
    let {
      crtDataIndex,
      totalOffsetNumber,
      remainTotalBarHeight,
      pageViewNum,
      rowCount,
      crtDragItemHeight,
    } = commonListProps;
    let calcTopValue = Math.max(
      0,
      remainTotalBarHeight * (crtDataIndex / totalOffsetNumber)
    );
    if (crtDataIndex + pageViewNum + 1 >= rowCount && rowCount != 0) {
      // calcTopValue =
      //   commonListProps.totalTableBodyHeight -
      //   commonListProps.crtDragItemHeight;
      let scrollbarBox = $(this.$rootEle).find(".g-scrollbar-box");
      let scrollbarDragItem = $(scrollbarBox).find(".g-scrollbar-dragitem");
      calcTopValue =
        scrollbarBox.outerHeight(true) - scrollbarDragItem.outerHeight(true);
      console.log("rate ack calcTopValue", calcTopValue);
      this.callDelayReachBtm();
    }
    let btmRateVal = calcTopValue / remainTotalBarHeight;
    console.log("btm rateval", btmRateVal, {
      calcTopValue,
      crtDragItemHeight,
      remainTotalBarHeight,
      pageViewNum,
      rowCount,
      crtDataIndex,
    });
    this.setExtra({
      calcTopValue: calcTopValue,
      crtDragItemHeight: crtDragItemHeight,
    });
    let crtMaximumViewNum =
      commonListProps.crtDataIndex + commonListProps.pageViewNum;
    let mygoodwidth_for_leftfix_order = calculateTextWidth(
      "" + crtMaximumViewNum,
      mycalcstrconfig
    );
    this.setState({
      fixWidthForOrder: Math.max(
        // origin_fixwidth_for_order,
        0,
        mygoodwidth_for_leftfix_order + 18
      ),
    });
  };

  getCommonListProps = () => {
    let { dataList, spendMS } = this.getRes();
    const { completeEachRowWidth, calcColumnIndexArr } = this.getExtra();
    const { lineHeight } = this.getExtra();
    let mmobj = {
      pageViewNum: 0,
      rowHeight: rowHeightValue,
      totalTableBodyHeight: this.getExtra().totalTableBodyHeight,
      overscanRowCount: 100,
      width: completeEachRowWidth,
      spendMS,
      height: lineHeight || 0,
      rowCount: _.size(dataList),
      crtDataIndex: this.getExtra().crtDataIndex,
    };
    let pageViewNum = Math.ceil(mmobj.height / mmobj.rowHeight);
    let pageViewNum_floor = Math.floor(mmobj.height / mmobj.rowHeight);
    if (isNaN(pageViewNum)) {
      mmobj.pageViewNum = 0;
    } else {
      mmobj.pageViewNum = pageViewNum;
    }
    if (pageViewNum > 100) {
      // //debugger;
    }
    if (isNaN(pageViewNum_floor)) {
      mmobj.pageViewNum_floor = 0;
    } else {
      mmobj.pageViewNum_floor = pageViewNum_floor;
    }
    mmobj.totalOffsetNumber = mmobj.rowCount - mmobj.pageViewNum;
    mmobj.crtDragItemHeight = Math.min(
      Math.max(
        mmobj.totalTableBodyHeight * (mmobj.pageViewNum / mmobj.rowCount),
        20
      ),
      mmobj.totalTableBodyHeight
    );
    // mmobj.totalTableBodyHeight * (mmobj.pageViewNum / mmobj.rowCount);
    let { totalTableBodyHeight } = this.getExtra();

    mmobj.remainTotalBarHeight = totalTableBodyHeight - mmobj.crtDragItemHeight;

    mmobj.rowCount_fact = mmobj.rowCount;
    mmobj.rowCount = mmobj.rowCount + 2;

    return mmobj;
  };

  setExtra = (newState, fn) => {
    let myextraobj = this.getExtra();
    _.forEach(newState, (x, d, n) => {
      myextraobj[d] = x;
      console.log("updating extra", d, x, myextraobj);
    });
    if (fn) {
      fn();
    }
  };

  $rootEle = null;

  render() {
    let { dataList } = this.getRes();
    let fixWidthForOrder = this.state.fixWidthForOrder;
    const { completeEachRowWidth, calcColumnIndexArr } = this.getExtra();
    gutils.log_1("updating extra rendering ", this.boxId);
    window.tmpref = this;
    const { lineHeight } = this.getExtra();
    const commonListProps = this.getCommonListProps();
    const scrollTop = 0;
    const vcbox_h = lineHeight + headerValue;
    let fixScrollBarWidth =
      commonListProps.rowCount <= commonListProps.pageViewNum ? 0 : 14;
    const commonVcTablBox = {
      style: {
        height: vcbox_h,
        maxHeight: vcbox_h,
        overflowY: "hidden",
      },
    };
    const extraObj = this.getExtra();
    const highlightPoints = extraObj.highlightPoints || {};
    gutils.log_1("start rendering");

    let isThatUnuseIndex = (index) => {
      return index >= commonListProps.rowCount_fact;
    };

    console.log("latest commonListProps", commonListProps);
    if (commonListProps.totalOffsetNumber < 0) {
      gutils.defer(() => {
        // Math.max(0, mmobj.rowCount_fact - 1)
        // this.onUpdateIndex(0);
        // this.setExtra({ crtDataIndex: 0 });
        // gutils.defer(() => {
        //   this.recalcScrollInfo();
        // });
      });
    }

    return (
      <div
        className="control-tb-view"
        id={this.boxId}
        ref={(e) => (this.$rootEle = $(e))}
      >
        {extraObj.loading || extraObj.viewMoreLoading ? (
          <LoadingPageForTable obj={this.getObj()} />
        ) : !_.isEmpty(extraObj.errmsgForQuery) ? (
          <ErrorPageForTable error={extraObj.errmsgForQuery} />
        ) : _.isEmpty(calcColumnIndexArr) ? (
          <EmptyPageForTable
            defaultTooltip={this.props.defaultTooltip}
            obj={this.getObj()}
          />
        ) : (
          ""
        )}
        <div className="tb-consist-part">
          <div
            className="gvisual-table-box-left-side gvisual-table-box"
            style={{
              width: fixWidthForOrder + "px",
            }}
          >
            <div
              className="vc-table-box"
              {..._.merge({}, commonVcTablBox, {
                style: { overflow: "hidden" },
              })}
            >
              {/* header fixon */}
              <div
                className="vc-table-headers-box"
                style={{ width: fixWidthForOrder, boxShadow: "none" }}
              >
                <div className="vc-data-row">
                  <div
                    style={{
                      width: fixWidthForOrder,
                      paddingLeft: 0,
                      paddingRight: 0,
                      boxShadow: "none",
                    }}
                    className="vc-table-header vc-table-headers-box vc-data-cell"
                  ></div>
                </div>
              </div>
              {/* body fixon */}
              <div className="vc-table-body-box">
                <List
                  {...commonListProps}
                  width={fixWidthForOrder}
                  ref={(e) => {
                    // // console.log("got left e", e);
                    window.tmplefte = e;
                  }}
                  rowRenderer={({
                    key,
                    index,
                    isScrolling,
                    isVisible,
                    style,
                  }) => {
                    const eachData = _.get(dataList, index);
                    const eachDataIndex = index;
                    return (
                      <div
                        key={index}
                        className="vc-data-row"
                        style={Object.assign({}, style, {})}
                      >
                        {React.createElement(
                          "div",
                          {
                            className:
                              "vc-data-cell " + "vc-first-cell-for-order",
                            style: {
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              display: "inline-block",
                              minWidth: fixWidthForOrder,
                              width: fixWidthForOrder,
                              maxWidth: fixWidthForOrder,
                            },
                          },
                          isThatUnuseIndex(index) ? "" : index + 1
                        )}
                      </div>
                    );
                  }}
                ></List>
              </div>
            </div>
          </div>
          <div
            className="gvisual-table-box gvisual-table-box-right-side"
            style={{
              width:
                "calc(100% - " +
                fixWidthForOrder +
                "px - " +
                fixScrollBarWidth +
                "px)",
            }}
          >
            <div
              id={this.vcMainBoxId}
              className="vc-table-box"
              {...commonVcTablBox}
            >
              <div
                className="vc-table-headers-box"
                style={{
                  width: completeEachRowWidth,
                  ...(scrollTop == 0 ? { boxShadow: "none" } : {}),
                }}
              >
                <div className="vc-data-row">
                  {_.map(calcColumnIndexArr, (x, d, n) => {
                    let isCrtOrderColumn = false; //x.label == preOrderColumnStr;
                    let crtColumnWidth = x.width;
                    return React.createElement(
                      Resizable,
                      {
                        onResizeStop: (event, direct, refToEle, delta) => {
                          console.log("on resize stop", refToEle.style.width);
                          this.getExtra().userDragObj[x.label] = parseInt(
                            refToEle.style.width
                          );
                          gutils.callWhenResize();
                        },
                        enable: _.merge(gutils.enableResize(), {
                          right: d != _.size(n) - 1 && !isCrtOrderColumn,
                        }),
                        className:
                          "vc-table-header vc-data-cell " +
                          (isCrtOrderColumn ? "vc-first-cell-for-order" : ""),
                        key: d,
                        size: {
                          width:
                            crtColumnWidth +
                            this.getExtra().extraLengthForBasicCell,
                          height: "100%",
                        },
                        style: {
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          minWidth: crtColumnWidth,
                          maxWidth: crtColumnWidth,
                          display: "inline-block",
                        },
                      },
                      x.label
                    );
                  })}
                </div>
              </div>
              <div className="vc-table-body-box">
                <List
                  {...commonListProps}
                  onWheel={this.filterOnWheel}
                  rowRenderer={({
                    key,
                    index,
                    isExcess,
                    isScrolling,
                    isVisible,
                    style,
                  }) => {
                    const eachData = _.get(dataList, index);
                    const eachDataIndex = index;
                    return (
                      <div
                        className="vc-data-row"
                        style={Object.assign({}, style, {
                          background:
                            isThatUnuseIndex(index) ||
                            eachDataIndex % 2 == 0 ||
                            isExcess
                              ? "var(--app-bg-white)"
                              : "var(--app-bg-245)",
                          // "rgb(238 242 249)",
                        })}
                      >
                        {_.map(calcColumnIndexArr, (eachCol, eachColIndex) => {
                          let crtValObj = _.get(eachData, [eachCol.label]);
                          let crtColWidth = eachCol.width;
                          let rowObject = {
                            rowIndex: index,
                            colIndex: eachColIndex,
                          };
                          let isCrtStartCell =
                            highlightPoints.startRow == rowObject.rowIndex &&
                            highlightPoints.startCol == rowObject.colIndex;
                          let isCrtEndCell =
                            highlightPoints.endRow == rowObject.rowIndex &&
                            highlightPoints.endCol == rowObject.colIndex;
                          let isCrtFocused = isCrtStartCell || isCrtEndCell;
                          if (isCrtEndCell) {
                          }
                          // tmpref.$vcMainBox.scrollLeft(3000)
                          if (
                            !isCrtFocused &&
                            highlightPoints.endRow != -1 &&
                            highlightPoints.startRow != -1
                          ) {
                            let leftTopRow = Math.min(
                              highlightPoints.startRow,
                              highlightPoints.endRow
                            );
                            let leftTopCol = Math.min(
                              highlightPoints.startCol,
                              highlightPoints.endCol
                            );
                            let rightBtmRow = Math.max(
                              highlightPoints.startRow,
                              highlightPoints.endRow
                            );
                            let rightBtmCol = Math.max(
                              highlightPoints.startCol,
                              highlightPoints.endCol
                            );
                            if (
                              rowObject.rowIndex >= leftTopRow &&
                              rowObject.rowIndex <= rightBtmRow &&
                              rowObject.colIndex >= leftTopCol &&
                              rowObject.colIndex <= rightBtmCol
                            ) {
                              isCrtFocused = true;
                            }
                          }
                          let clickThisFunc = (e) => {
                            console.log("click the cell", e, rowObject);
                            extraObj.highlightPoints.startRow =
                              rowObject.rowIndex;
                            extraObj.highlightPoints.startCol =
                              rowObject.colIndex;
                            extraObj.highlightPoints.endRow = -1;
                            extraObj.highlightPoints.endCol = -1;
                          };
                          let crtvaluexx = _.get(crtValObj, "value");
                          let isvalnil =
                            _.isNil(crtvaluexx) && !_.isEmpty(crtValObj);
                          return React.createElement(
                            "div",
                            {
                              onClick: clickThisFunc,
                              onKeyDown: (e) => {
                                // let isDown = e.metaKey && e.key == "c";
                                // console.log("keydown ", e);
                                // gutils.copy('sdfs')
                              },
                              onMouseDown: (e) => {
                                if (
                                  rowObject.rowIndex >= commonListProps.rowCount
                                ) {
                                  return;
                                }
                                gutils.is_crt_dragging_sth_select_row_cols = true;
                                console.log("mouse down");
                                clickThisFunc(e);
                              },
                              onMouseMove: () => {
                                if (
                                  rowObject.rowIndex >= commonListProps.rowCount
                                ) {
                                  return;
                                }
                                let noAllowMoveIndex = false;
                                if (
                                  commonListProps.pageViewNum >=
                                  commonListProps.rowCount_fact
                                ) {
                                  noAllowMoveIndex = true;
                                }

                                if (
                                  gutils.is_crt_dragging_sth_select_row_cols
                                ) {
                                  console.log("mouse is moving");
                                  extraObj.highlightPoints.endRow =
                                    rowObject.rowIndex;
                                  extraObj.highlightPoints.endCol =
                                    rowObject.colIndex;
                                  if (
                                    rowObject.rowIndex >=
                                    commonListProps.rowCount
                                  ) {
                                    return;
                                  }

                                  if (
                                    rowObject.rowIndex ==
                                    commonListProps.crtDataIndex
                                  ) {
                                    if (
                                      !gutils.is_crt_dragging_sth_select_row_cols
                                    ) {
                                      window.clearInterval(
                                        window.ref_keep_always_top
                                      );
                                      return;
                                    }
                                    if (!noAllowMoveIndex) {
                                      this.onUpdateIndex(
                                        this.getCommonListProps().crtDataIndex -
                                          1
                                      );
                                      this.recalcScrollInfo();
                                    }
                                    // window.clearInterval(
                                    //   window.ref_keep_always_top
                                    // );
                                    // let mytmpref = window.setInterval(() => {
                                    // }, 300);
                                    // window.ref_keep_always_top = mytmpref;
                                  } else {
                                    // window.clearInterval(
                                    //   window.ref_keep_always_top
                                    // );
                                  }
                                }
                              },
                              onMouseUp: () => {
                                if (
                                  rowObject.rowIndex >= commonListProps.rowCount
                                ) {
                                  return;
                                }

                                console.log("mouse up");
                                window.clearInterval(
                                  window.ref_keep_always_top
                                );
                                gutils.is_crt_dragging_sth_select_row_cols = false;
                              },
                              className:
                                "vc-data-cell " +
                                (isCrtFocused ? "select-focus-cell" : "") +
                                (isCrtEndCell ? " crt-end-cell " : "") +
                                (isCrtEndCell || isCrtStartCell
                                  ? " focus-start-or-end   "
                                  : "") +
                                (isvalnil ? " crt-null-cell " : " "),
                              style: {
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                display: "inline-block",
                                minWidth: crtColWidth,
                                width: crtColWidth,
                                maxWidth: crtColWidth,
                                ...(eachColIndex == 0
                                  ? {
                                      // position: "sticky",
                                      // left: 0,
                                    }
                                  : {}),
                                // ...(isCrtEndCell
                                //   ? {
                                //       ref(e) {
                                //         gutils.log_1("got end cell");
                                //         if (e != null) {
                                //         }
                                //       },
                                //     }
                                //   : {}),
                              },
                              "data-clz": _.get(crtValObj, "clz"),
                            },
                            isvalnil ? "[NULL]" : crtvaluexx
                          );
                        })}
                      </div>
                    );
                  }}
                ></List>
              </div>
            </div>
          </div>
          <MyScrollBar
            calcTopValue={this.getExtra().calcTopValue}
            crtDragItemHeight={this.getExtra().crtDragItemHeight}
            commonListProps={commonListProps}
            width={fixScrollBarWidth}
            onWheel={this.filterOnWheel}
            onUptScrollTop={(value) => {
              console.log("on upt scroll top value", value);
              this.setExtra({
                calcTopValue: value,
              });
            }}
            onUpdateIndex={this.onUpdateIndex}
          />
        </div>
        <div className="control-tb-bar-view">
          <TableControlBar
            obj={this.getObj()}
            commonListProps={commonListProps}
            extra={this.getExtra()}
          />
        </div>
      </div>
    );
  }
  onUpdateIndex = (value) => {
    value = Math.floor(value);
    const commonListProps = this.getCommonListProps();
    let finalValue = value;
    if (finalValue < 0) {
      finalValue = 0;
    }
    if (finalValue + commonListProps.pageViewNum >= commonListProps.rowCount) {
      finalValue = commonListProps.rowCount - commonListProps.pageViewNum - 1;
    }
    finalValue = Math.floor(finalValue);
    this.setExtra({
      crtDataIndex: finalValue,
    });
  };
}

export default observer(VisualControlDataTable);
