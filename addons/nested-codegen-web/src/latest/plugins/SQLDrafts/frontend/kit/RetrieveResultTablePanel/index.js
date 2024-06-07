const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
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
import OneTimeOptTable from "../../../../TranslateForJSON/frontend/cpt/OneTimeOptTable";
import "./index.less";

let mycalcstrconfig = "normal 400 14px sans-serif";
let mycalcstrconfig_2 = "normal 400 12px sans-serif";

const RetrieveResultTablePanel = observer((props) => {
  const { obj, PUtils } = props;
  let isQuery = obj.sqlRequestType == "ASYNC_POST_QUERY_BY_CONN_ID";
  let isExecution = !isQuery;
  let lc_store = useLocalStore(() => {
    return {
      needDataLoadObj: {
        // 1: true
      },
      finalRetrieveEnd: 0,
      eol: false,
      cacheDataList: [],
      bucketDataFIFO: [],
      columns: [],
      queryErrMsg: [],
      execErrMsg: [],
      columnWidths: [],
      retrieveReachBegin: 0,
      retrieveReachEnd: 0,
      init_data_width_before: false,
      infoOKMsg: [],
    };
  }, []);
  let fn_get_retrieve_begin_and_end = async () => {
    let crtTriggerArgs = {
      retrieveId: obj.retrieveId,
      connId: obj.connId,
      sqlRequestType: obj.sqlRequestType,
    };
    let res_1 = await PUtils.gref.optAPI(
      `retrieve_column_result`,
      crtTriggerArgs
    );
    window.t1_res = res_1;
    lc_store.columns = res_1.data.columns;
    // lc_store.columnWidths = _.map(res_1.data.columns, (x, d, n) => {
    //   let mygoodwidth = calculateTextWidth(x.columnPropName, mycalcstrconfig);
    //   return mygoodwidth;
    // });
    if (res_1.data.queriedTimes != 0) {
      return false;
    }
  };
  useEffect(() => {
    let a = PUtils.loop(fn_get_retrieve_begin_and_end, 500);
    return () => {
      a();
    };
  }, []);
  useEffect(() => {
    let updateAllDataForNeedDataLoadObj = () => {
      let newCacheDataList = [];
      let readBatchSize = obj.readBatchSize;
      _.forEach(lc_store.bucketDataFIFO, (eachKeyValue) => {
        let eachBucketNum = eachKeyValue.bucketNum;
        let dataList = eachKeyValue.dataList;
        console.log(`EachBucketNum`, eachBucketNum);
        let btmLine = eachBucketNum * readBatchSize;
        _.forEach(dataList, (eachDataRow, eachDataIdx) => {
          let fullDataIdx = btmLine + eachDataIdx;
          newCacheDataList[fullDataIdx] = eachDataRow;
        });
      });
      lc_store.cacheDataList = newCacheDataList;
    };
    let b = reaction(() => {
      return {
        b: lc_store.bucketDataFIFO,
      };
    }, updateAllDataForNeedDataLoadObj);
    let a = PUtils.loop(async () => {
      let maxReadBucketNum = _.chain(lc_store.needDataLoadObj)
        .keys()
        .max()
        .value();
      if (_.isNil(maxReadBucketNum)) {
        maxReadBucketNum = 0;
      }
      let crtTriggerArgs = {
        retrieveId: obj.retrieveId,
        connId: obj.connId,
        sqlRequestType: obj.sqlRequestType,
        maxReadBucketNum: maxReadBucketNum + 1,
      };
      let res_1 = await PUtils.gref.optAPI(
        `update_max_bucket_num`,
        crtTriggerArgs
      );
      let vm_data = res_1.data;
      lc_store.eol = vm_data.eol;
      lc_store.retrieveReachBegin = vm_data.retrieveReachBegin;
      lc_store.retrieveReachEnd = vm_data.retrieveReachEnd;
      lc_store.finalRetrieveEnd = vm_data.finalRetrieveEnd;
      lc_store.execErrMsg = vm_data.execErrMsg;
      lc_store.queryErrMsg = vm_data.queryErrMsg;
      lc_store.errMsg = vm_data.errMsg;
      lc_store.infoOKMsg = vm_data.infoOKMsg;
    }, 500);
    let c = PUtils.loop(async () => {
      try {
        let allKeysArr = _.keys(lc_store.needDataLoadObj);
        for (let eachKey of allKeysArr) {
          let eachKeyValue = lc_store.needDataLoadObj[eachKey];
          let { eachBucketNum } = eachKeyValue;
          if (eachKeyValue.needLoad === true) {
            let findIdxFIFOItemItem = _.find(
              lc_store.bucketDataFIFO,
              (x) => x.bucketNum == eachBucketNum
            );
            if (_.isNil(findIdxFIFOItemItem)) {
              let res_1 = await PUtils.gref.optAPI(`get_part_bucket_data`, {
                retrieveId: obj.retrieveId,
                connId: obj.connId,
                sqlRequestType: obj.sqlRequestType,
                bucketNum: eachBucketNum,
              });
              console.log("res_1", res_1);
              window.t1_res = res_1;
              let dataList = res_1.data.dataList;
              if (res_1.data.preparedData == true) {
                console.log(`dataList`, dataList);
                if (eachBucketNum == 0) {
                  //   let finalColWidth = lc_store.columnWidths;
                  //   _.forEach(dataList, (eachDataItem) => {
                  //     finalColWidth = _.map(lc_store.columns, (eachCol, d, n) => {
                  //       let tVal = _.get(
                  //         eachDataItem,
                  //         [eachCol.columnPropName, "value"],
                  //         "[NULL]"
                  //       );
                  //       let mygoodwidth = calculateTextWidth(
                  //         tVal,
                  //         mycalcstrconfig_2
                  //       );
                  //       return Math.max(mygoodwidth, finalColWidth[d]);
                  //     });
                  //   });
                  //   lc_store.columnWidths = finalColWidth;
                }
                lc_store.bucketDataFIFO.push({
                  bucketNum: eachBucketNum,
                  dataList: dataList,
                });
                updateAllDataForNeedDataLoadObj();
                eachKeyValue.needLoad = false;
                if (_.size(lc_store.bucketDataFIFO) > 5) {
                  lc_store.bucketDataFIFO.shift();
                }
              }
            } else {
              eachKeyValue.needLoad = false;
            }
          }
        }
      } catch (e) {
        console.log("find_bucket_err", e);
        await gutils.sleep(1000);
      }
    }, 500);
    return () => {
      a();
      b();
      c();
    };
  }, []);
  window.t123123 = lc_store;
  let { execErrMsg, queryErrMsg, errMsg } = lc_store;
  let fullMsg = _.flattenDeep(_.concat(execErrMsg, queryErrMsg, errMsg));
  fullMsg = _.filter(fullMsg, (x) => !_.isNil(x));
  window.fullMsg = fullMsg;
  let fn_callFullMsg = (
    text,
    fullMsg,
    errorStyle = `var(--app-text-darkred)`
  ) => {
    return (
      <div className="w100 h100 pd-10">
        <h3 class="bp3-heading">{text}</h3>
        {_.map(fullMsg, (x, d, n) => {
          return (
            <div
              className="bp3-text-small bp3-text-muted"
              style={{
                color: errorStyle,
              }}
              dangerouslySetInnerHTML={{
                __html: _.chain((x + "").toString())
                  .split("\n")
                  .join("<br/>")
                  .value(),
              }}
            ></div>
          );
        })}
      </div>
    );
  };
  if (!_.isEmpty(fullMsg)) {
    return fn_callFullMsg(t(`Unable to process due to an Error.`), fullMsg);
  }
  let { infoOKMsg } = lc_store;
  if (!_.isEmpty(infoOKMsg)) {
    return fn_callFullMsg(t(`Execute Result:`), infoOKMsg, ``);
  }
  return (
    <div className="w100 h100">
      <OneTimeOptTable
        // columnWidths={_.map(lc_store.columns, (x, d, n) => {
        //   return lc_store.columnWidths[d];
        // })}
        // onColumnWidthChanged={(index, number) => {
        //   lc_store.columnWidths[index] = number;
        // }}
        forceThoughNought={true}
        rowSize={
          lc_store.eol
            ? lc_store.finalRetrieveEnd + 1
            : lc_store.retrieveReachEnd + 1
        } // the addtive 1 is for further loading
        columns={[
          ..._.map(lc_store.columns, (x, d, n) => {
            return {
              label: x.columnPropName,
              render: (idx) => {
                let dataList = lc_store.cacheDataList;
                let dataItem = dataList[idx];
                if (_.isNil(dataItem)) {
                  let crtBucketNum = Math.floor(idx / obj.readBatchSize);
                  if (_.isNil(lc_store.needDataLoadObj[crtBucketNum])) {
                    lc_store.needDataLoadObj[crtBucketNum] = {
                      needLoad: true,
                      eachBucketNum: crtBucketNum,
                    };
                  } else {
                    if (
                      lc_store.needDataLoadObj[crtBucketNum].needLoad !== true
                    ) {
                      lc_store.needDataLoadObj[crtBucketNum].needLoad = true;
                    }
                  }
                  return {
                    jsx: <Cell loading={true}>Loading</Cell>,
                  };
                }
                let tVal = _.get(dataItem, [x.columnPropName, "value"]);
                if (_.isNil(tVal)) {
                  return `[NULL]`;
                }
                return {
                  jsx: <Cell>{tVal}</Cell>,
                };
              },
            };
          }),
        ]}
      />
    </div>
  );
});

export default RetrieveResultTablePanel;
