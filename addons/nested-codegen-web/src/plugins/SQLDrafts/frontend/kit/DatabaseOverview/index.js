import DBConstants from "../DBConstants";

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
import TestJson from "./test.json";
import SpinLoading from "../../../../TranslateForJSON/frontend/cpt/SpinLoading";
import FullOptTable from "../../../../TranslateForJSON/frontend/cpt/FullOptTable";
import OneTimeOptTable from "../../../../TranslateForJSON/frontend/cpt/OneTimeOptTable";

const DatabaseOverview = observer((props) => {
  let { PUtils } = props;
  const overviewDefinition = useLocalStore(() => {
    return {
      columnTableData: DBConstants.getResultSetDefinition(),
      reaction_ref: [],
      crtDb: null,
      crtTb: null,
      dbarr: [],
      tbarr: [],
      colarr: [],
      loadingTable: false,
      loadingDatabase: false,
      loadingColumn: false,
    };
  });
  window.tmp_overviewDefinition = overviewDefinition;
  let {
    crtDb,
    crtTb,
    dbarr,
    tbarr,
    colarr,
    loadingTable,
    loadingDatabase,
    loadingColumn,
  } = overviewDefinition;
  let onCrtDb = (val) => {
    overviewDefinition.crtDb = val;
  };
  let onCrtTb = (val) => {
    overviewDefinition.crtTb = val;
  };
  let fn_getConnId = () => {
    return PUtils.crtModel.activeSQLConnId;
  };
  let fn_refresh_database_overview = async () => {
    overviewDefinition.loadingDatabase = true;
    let { data } = await PUtils.gref.optAPI(`get_database_list_by_conn_id`, {
      connId: fn_getConnId(),
      queryConfig: {},
    });
    let databaseRecordList = _.get(data, "result.databaseRecordList", []);
    overviewDefinition.dbarr = _.map(databaseRecordList, (x, d, n) => {
      return {
        ...x,
      };
    });
    onCrtDb(_.get(overviewDefinition, "dbarr[0]"));
    onCrtTb(null);
    overviewDefinition.colarr = [];
    console.log(`m_data`, data);
    overviewDefinition.loadingDatabase = false;
  };
  let fn_refresh_tables_overview = async () => {
    if (_.isNil(overviewDefinition.crtDb)) {
      return;
    }
    overviewDefinition.loadingTable = true;
    let { data } = await PUtils.gref.optAPI(`get_tables_by_conn_id`, {
      connId: fn_getConnId(),
      queryConfig: {
        catalog: overviewDefinition.crtDb.TABLE_CATALOG,
        schemaName: overviewDefinition.crtDb.TABLE_SCHEM,
      },
    });
    let recordList = _.get(data, "result.tableRecordList", []);
    overviewDefinition.tbarr = recordList;
    onCrtTb(_.get(overviewDefinition, "tbarr[0]"));
    overviewDefinition.colarr = [];
    console.log(`m_data`, data);
    overviewDefinition.loadingTable = false;
  };
  let fn_refresh_columns_overview = async () => {
    if (
      _.isNil(overviewDefinition.crtDb) ||
      _.isNil(overviewDefinition.crtTb)
    ) {
      return;
    }
    overviewDefinition.loadingColumn = true;
    let { data } = await PUtils.gref.optAPI(`get_columns_by_conn_id`, {
      connId: fn_getConnId(),
      queryConfig: {
        catalog: overviewDefinition.crtTb.TABLE_CAT,
        schemaName: overviewDefinition.crtTb.TABLE_SCHEM,
        tableName: overviewDefinition.crtTb.TABLE_NAME,
      },
    });
    let recordList = _.get(data, "result.columnRecordList", []);
    overviewDefinition.colarr = recordList;
    // let { columnTableData } = overviewDefinition;
    // columnTableData.extra = columnTableData.fn_extra();
    // let thatctn = _.cloneDeep(TestJson.content);
    // columnTableData.res.dataList = thatctn.dataList;
    // columnTableData.res.columnIndexArr = thatctn.columnIndexArr;
    // columnTableData.res.spendMS = thatctn.optTimeMiles;
    console.log(`m_data`, data);
    overviewDefinition.loadingColumn = false;
  };
  useEffect(() => {
    let a = PUtils.loop(async () => {
      await fn_refresh_database_overview();
    }, -1);
    return () => {
      a();
    };
  }, []);
  useEffect(() => {
    let a = PUtils.loop(async () => {
      await fn_refresh_database_overview();
    }, -1);
    let b = reaction(
      () => {
        return {
          a: overviewDefinition.crtDb,
        };
      },
      async () => {
        if (_.isNil(overviewDefinition.crtDb)) {
          return;
        }
        fn_refresh_tables_overview();
      }
    );
    let c = reaction(
      () => {
        return {
          t2: overviewDefinition.crtDb,
          t1: overviewDefinition.crtTb,
        };
      },
      _.debounce(async () => {
        if (
          _.isNil(overviewDefinition.crtDb) &&
          _.isNil(overviewDefinition.crtDb)
        ) {
          return;
        }
        fn_refresh_columns_overview();
      }, 50)
    );
    return () => {
      c();
      b();
      a();
    };
  }, []);
  let m_leftJsx = (
    <SpinLoading loading={loadingDatabase}>
      <div className="db-list-view">
        {_.isEmpty(dbarr) && !loadingDatabase ? (
          <div className="empty-view-item">{t("0 database(s)")}</div>
        ) : (
          ""
        )}
        {loadingDatabase ? (
          <div className="empty-view-item">
            {t("Loading")}
            <Blink />
          </div>
        ) : (
          ""
        )}
        {_.map(dbarr, (x, d, n) => {
          return (
            <div
              key={x.value}
              className={
                "db-list-item" +
                " " +
                (_.get(crtDb, "TABLE_SCHEM") == x.TABLE_SCHEM
                  ? "active-item"
                  : "")
              }
              onClick={() => {
                onCrtDb(x);
              }}
            >
              <Icon size={12} icon="database" />
              <span>{x.TABLE_SCHEM}</span>
            </div>
          );
        })}
      </div>
    </SpinLoading>
  );
  let m_midJsx = (
    <SpinLoading loading={loadingTable}>
      <div className="tb-list-view">
        {_.isEmpty(tbarr) && !loadingTable ? (
          <div className="empty-view-item">{t("0 table(s)")}</div>
        ) : (
          ""
        )}
        {loadingTable ? (
          <div className="empty-view-item">
            {t("Loading")}
            <Blink />
          </div>
        ) : (
          ""
        )}
        {_.map(tbarr, (x, d, n) => {
          return (
            <div
              key={x.TABLE_NAME}
              className={
                "tb-list-item" +
                " " +
                (_.get(crtTb, "TABLE_NAME") == x.TABLE_NAME
                  ? "active-item"
                  : "")
              }
              onClick={() => {
                onCrtTb(x);
              }}
            >
              <Icon size={12} icon="th" />
              <span>{x.TABLE_NAME}</span>
            </div>
          );
        })}
      </div>
    </SpinLoading>
  );
  let m_rightJsx = React.createElement(
    observer((props) => {
      return (
        <SpinLoading loading={loadingColumn}>
          <OneTimeOptTable
            rowSize={_.size(overviewDefinition.colarr)}
            columns={[
              {
                label: t(`Column Name`),
                render: (idx) =>
                  _.get(overviewDefinition.colarr, [idx, "COLUMN_NAME"]),
              },
              {
                label: t(`Column Size`),
                render: (idx) =>
                  _.get(overviewDefinition.colarr, [idx, "COLUMN_SIZE"]),
              },
              {
                label: t(`IS NULLABLE?`),
                render: (idx) =>
                  _.get(overviewDefinition.colarr, [idx, "IS_NULLABLE"]),
              },
              {
                label: t(`IS AUTOINCREMENT?`),
                render: (idx) =>
                  _.get(overviewDefinition.colarr, [idx, "IS_AUTOINCREMENT"]),
              },
              {
                label: t(`IS GENERATEDCOLUMN?`),
                render: (idx) =>
                  _.get(overviewDefinition.colarr, [idx, "IS_GENERATEDCOLUMN"]),
              },
              {
                label: t(`Remarks`),
                render: (idx) =>
                  _.get(overviewDefinition.colarr, [idx, "REMARKS"]),
              },
            ]}
          />
        </SpinLoading>
      );
    })
  );
  let resizekey = "databaseoverview_left";

  return (
    <div className="dblink-overview-root-wrapper">
      <div className="dblink-top-box">
        <HalfResizeForTwoHorizontal
          defaultLeftWidthValue={180}
          value={PUtils.crtModel[resizekey]}
          onChg={(val) => {
            PUtils.crtModel[resizekey] = val;
          }}
          //   rightClz="needleftborder"
          leftJsx={m_leftJsx}
          rightJsx={
            <HalfResizeForTwoHorizontal
              defaultLeftWidthValue={180}
              value={PUtils.crtModel[resizekey + "mid"]}
              onChg={(val) => {
                PUtils.crtModel[resizekey + "mid"] = val;
              }}
              //   rightClz="needleftborder"
              leftJsx={m_midJsx}
              rightJsx={m_rightJsx}
            />
          }
        />
        <SpinLoading />
      </div>
      <div className="dblink-st-btm-box">
        <div className="dblink-st-left">
          {t(
            `Selected: {0} - {1}`,
            crtDb == null ? "[N/A]" : _.get(crtDb, "TABLE_SCHEM"),
            crtTb == null ? "[N/A]" : _.get(crtTb, "TABLE_NAME")
          )}
          {/* <span style={{ marginLeft: "5px" }}>
            <a
              href={"javascript:void(0);"}
              onClick={() => {
                gutils.api.dblink.fn_refreshDatabaseList();
              }}
            >
              {t("Refresh")}
            </a>
          </span> */}
        </div>
        <div className="dblink-st-right">
          <span>
            {t(`{0} database(s) - {1} table(s)`, _.size(dbarr), _.size(tbarr))}
          </span>
        </div>
      </div>
    </div>
  );
});

export default DatabaseOverview;
