const DBConstants = {
  getResultSetDefinition() {
    const fn_initHighlightPoint = () => {
      return {
        startCol: -1,
        startRow: -1,
        endRow: -1,
        endCol: -1,
      };
    };
    function fn_extra() {
      return {
        // result-set logic
        viewMoreLoading: false,
        viewNoMore: false,
        loading: false,
        errmsgForQuery: null,
        errmsg: null,
        scrollLeftValue: 0,
        crtDragItemHeight: 0,
        calcTopValue: 0,
        userDragObj: {},
        updateCtn: 1,
        crtBoxSize: {},
        refLineHeightForAutorun: null,
        refForAutorun: null,
        lineHeight: 0,
        totalTableBodyHeight: 0,
        scrollOfTheTable: null,
        highlightPoints: fn_initHighlightPoint(),
        fn_initHighlightPoint,
        // calculate
        completeEachRowWidth: 0,
        extraLengthForBasicCell: 1 + 12,
        calcColumnIndexArr: [],
        preOrderColumnStr: "SYS_CG_PROVIDE_NOUSE_ORDER",
        mywidthvalue: "150px",
        // dynamic view
        crtDataIndex: 0,
      };
    }
    let fn_res = () => {
      return {
        spendMS: 0,
        columnIndexArr: [],
        dataList: [],
      };
    };
    let fn_req = () => {
      return {
        count: 0,
        order: [],
        pagination: {
          index: 1,
          size: 200,
        },
      };
    };
    return {
      fn_res,
      fn_req,
      extra: fn_extra(),
      res: fn_res(),
      req: fn_req(),
      fn_extra: fn_extra,
    };
  },
};
export default DBConstants;
