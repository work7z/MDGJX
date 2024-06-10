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
  GFormSwitch,
  Dialog,
  Popover,
  GFormInput,
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
import cutils from "../../kit/common_utils";
import FormEasyTable from "../FormEasyTable";
import MLess from "./index.less";

let FormCrudTable = observer((props) => {
  let showFormDescAsBelow = _.get(props, "showFormDescAsBelow", false);
  let alertFormType = _.get(props, "alertFormType", false);
  console.log("init_FormCrudTable", props);
  let crt_arr_value = props.obj[props.index];
  crt_arr_value = _.filter(crt_arr_value, (x) => {
    return !_.isNil(x.record_type);
  });
  let fn_type_obj = {
    dir: (row) => {
      gutils.alert({
        intent: "none",
        message: t(`Trying to open the directory.`),
      });
      gutils.openDir(row.filepath);
      gutils.alertOk(
        t(
          `Triggered. If it didn't open a directory, please check the validity of the directory.`
        )
      );
    },
  };
  if (_.isNil(crt_arr_value)) {
    crt_arr_value = [];
    gutils.defer(() => {
      props.obj[props.index] = [];
    });
    if (props.onChg) {
      props.onChg();
    }
  }
  let saveFn = (arr) => {
    if (_.isNil(arr)) {
      arr = crt_arr_value;
    }
    props.obj[props.index] = [...arr];
    if (props.onChg) {
      props.onChg();
    }
  };
  let m_local_store = useLocalStore(() => {
    return {
      open: false,
      furtherObj: {},
    };
  });
  window.m_local_store___0 = m_local_store;
  let furtherSearch = props.furtherSearch;
  useEffect(() => {
    let a = furtherSearch
      ? props.PUtils.loop(async () => {
          let idArr = _.chain(crt_arr_value)
            .map((x) => "table_" + x.id)
            .value();
          let allValuesObj = await cutils.m_cache.batchGetValue({
            idArr: idArr,
          });
          if (!_.isEqual(allValuesObj, m_local_store.furtherObj)) {
            m_local_store.furtherObj = allValuesObj;
          }
        }, 1000)
      : () => {};
    return () => {
      a();
    };
  }, [crt_arr_value]);
  let calc_data = [...crt_arr_value];
  // _.map(, (x, d, n) => {
  //   if (furtherSearch) {
  //     return _.merge(
  //       {
  //         ...x,
  //       },
  //     );
  //   } else {
  //     return x;
  //   }
  // });
  window.calc_data_001 = calc_data;
  let g_finalFormArr = _.filter(props.column, (x) => {
    return x.f_skip !== true;
  });
  let fn_finalFormArr = ({ model }) => {
    let finalFormArr = _.filter(props.column, (x) => {
      if (x.fn_show_when) {
        let res = x.fn_show_when(model);
        if (res !== true) {
          return false;
        } else {
          return true;
        }
      }
      return x.f_skip !== true;
    });

    return finalFormArr;
  };
  return (
    <div
      className="form_crud_table_wrapper"
      style={{ width: "100%", maxWidth: "100%" }}
    >
      {alertFormType ? <div></div> : ""}
      <FormEasyTable
        key={_.size(crt_arr_value)}
        column={[
          ..._.map(
            _.filter(props.column, (x) => !_.isNil(x) && x.c_skip !== true),
            (eachColumn, d, n) => {
              let fn_getFinalIpt = ({ eachRow }) => {
                return observer((props) => {
                  return (
                    <div>
                      <Popover
                        minimal={true}
                        isOpen={m_local_store.open}
                        defaultIsOpen={false}
                        style={{
                          minWidth: "500px",
                          padding: "10px",
                          height: "100%",
                        }}
                        popoverClassName={
                          Classes.POPOVER_CONTENT_SIZING + " short-pop w500-pop"
                        }
                        placement="center"
                        portalClassName="textareawrap short-pop w500-pop"
                        onClosing={() => {
                          // m_local_store.open = true;
                        }}
                      >
                        <a
                          href="javascript:void(0);"
                          onClick={() => {
                            m_local_store.open = true;
                          }}
                        >
                          {t(`{0} Records`, _.size(eachRow[eachColumn.prop]))}
                        </a>
                        <div
                          onClick={(e) => {
                            gutils.stop_e(e);
                            return false;
                          }}
                          style={{}}
                        >
                          <FormCrudTable
                            minWidth={"65px"}
                            obj={eachRow}
                            index={eachColumn.prop}
                            {
                              ...(eachColumn.render_args || {})
                              // _.get(eachColumn, "tagProps") ||
                            }
                          />
                          <p
                            style={{
                              textAlign: "right",
                              marginTop: "10px",
                            }}
                          >
                            <Button
                              onClick={() => {
                                m_local_store.open = false;
                              }}
                            >
                              {t(`Close Panel`)}
                            </Button>
                          </p>
                        </div>
                      </Popover>
                    </div>
                  );
                });
              };
              return {
                ...eachColumn,
                value: (eachRow = {}, eachRowIdx) => {
                  if (_.isNil(eachRow)) {
                    eachRow = {};
                  }
                  if (eachRow.record_type == "add") {
                    let FinalIpt = InputGroup;
                    if (eachColumn.jsx) {
                      FinalIpt = eachColumn.jsx;
                    }
                    // let m_local_store = eachRow;
                    if (eachColumn.render_type == "inner_curd_table") {
                      FinalIpt = fn_getFinalIpt({ eachRow });
                    }
                    return (
                      <div>
                        <FinalIpt
                          // disabled={eachRow.record_type != "add"}
                          {...(eachColumn.jsxProps || {})}
                          list={eachColumn.list}
                          small={true}
                          placeholder={eachColumn.placeholder}
                          value={eachRow[eachColumn.prop]}
                          onChange={(e) => {
                            eachRow[eachColumn.prop] = gutils.getValueFromE(e);
                          }}
                        ></FinalIpt>
                      </div>
                    );
                  }
                  console.log("render_now", eachRow[eachColumn.prop]);
                  return (
                    <div
                      style={{
                        maxWidth: eachColumn.maxWidth,
                        wordWrap: "break-word",
                        whiteSpace: "normal",
                        minWidth: eachColumn.minWidth
                          ? eachColumn.minWidth
                          : props.fixedWidth
                          ? "auto"
                          : props.minWidth || "180px",
                      }}
                    >
                      {eachColumn.render_type == "inner_curd_table" ? (
                        React.createElement(fn_getFinalIpt({ eachRow }), {})
                      ) : eachColumn.show_preview_list_field_name ? (
                        (() => {
                          let m_tmp = _.chain(eachRow[eachColumn.prop]).map(
                            (x) => x[eachColumn.show_preview_list_field_name]
                          );
                          return (
                            <a
                              onClick={() => {
                                _.chain(eachRow[eachColumn.prop])
                                  .map(
                                    (x) =>
                                      x[eachColumn.show_preview_list_field_name]
                                  )
                                  .map((x, d, n) => {
                                    gutils.openDir(x);
                                  })
                                  .value();
                                gutils.alertOk(
                                  t(
                                    `Triggered. If it didn't open a directory, please check the validity of the directory.`
                                  )
                                );
                              }}
                              href="javascript:void(0);"
                            >
                              {m_tmp
                                .thru((x) => JSON.stringify(x, 0, 4))
                                .value()}
                            </a>
                          );
                        })()
                      ) : (
                        <span>
                          {eachColumn.propFn ? (
                            eachColumn.propFn(
                              eachRow,
                              eachRowIdx,
                              m_local_store.furtherObj
                            )
                          ) : _.get(eachColumn, "tagProps.list") ? (
                            _.chain(_.get(eachColumn, "tagProps.list"))
                              .filter((xx, dd) => {
                                return xx.value == eachRow[eachColumn.prop];
                              })
                              .first()
                              .get("label")
                              .value()
                          ) : eachColumn.fn_type ? (
                            <a
                              href="javascript:void(0);"
                              onClick={() => {
                                fn_type_obj[eachColumn.fn_type](eachRow);
                              }}
                            >
                              {eachRow[eachColumn.prop]}
                            </a>
                          ) : _.isNil(eachRow[eachColumn.prop]) ? (
                            ""
                          ) : (
                            eachRow[eachColumn.prop] + ""
                          )}
                        </span>
                      )}
                    </div>
                  );
                },
              };
            }
          ),
          {
            label: t(`Operation`),
            value: (eachRow = {}, _eachRowIdx) => {
              let eachRowIdx = _eachRowIdx;
              if (_.isNil(eachRow)) {
                eachRow = {};
              }
              let fn_111 = async () => {
                if (props.previewRecord) {
                  let resultFn = await props.previewRecord(eachRow);
                  if (resultFn) {
                    gutils.alert({
                      intent: "danger",
                      message: resultFn,
                    });
                    throw new Error("no work");
                    return;
                  }
                }
              };
              return (
                <div
                  className="sub-mr-5 b-center "
                  style={{ minWidth: "115px" }}
                >
                  {props.fn_eachRowExtraActions
                    ? _.map(
                        props.fn_eachRowExtraActions(eachRow),
                        (eachAction) => {
                          return (
                            <a
                              onClick={async () => {
                                await eachAction.onClick();
                              }}
                              href="javascript:void(0);"
                            >
                              {eachAction.label}
                            </a>
                          );
                        }
                      )
                    : ""}
                  {props.provideEnableDisable ? (
                    <a
                      onClick={async () => {
                        await fn_111();
                        eachRow.record_type =
                          eachRow.record_type == "stored"
                            ? "disabled"
                            : "stored";
                        saveFn();
                      }}
                      href="javascript:void(0);"
                    >
                      {t(
                        eachRow.record_type == "stored" ? "Disable" : `Enable`
                      )}
                    </a>
                  ) : (
                    ""
                  )}
                  {eachRow.record_type == "add" ? (
                    <a
                      onClick={async () => {
                        await fn_111();
                        eachRow.record_type = "stored";
                        saveFn();
                      }}
                      href="javascript:void(0);"
                    >
                      {t("Save")}
                    </a>
                  ) : (
                    ""
                  )}
                  {eachRow.record_type == "stored" ? (
                    <a
                      onClick={async () => {
                        if (alertFormType) {
                          let { PUtils } = props;

                          let title = `Edit the Record`;
                          cutils.alertFormPanel({
                            confirmText: t("Save"),
                            presetFormModel: _.cloneDeep(eachRow),
                            title: title,
                            fn_finalFormArr: fn_finalFormArr,
                            finalFormArr: g_finalFormArr,
                            PUtils,
                            onSave: async (obj) => {
                              if (props.previewRecord) {
                                let resultFn = await props.previewRecord(obj);
                                if (resultFn) {
                                  gutils.alert({
                                    intent: "danger",
                                    message: resultFn,
                                  });
                                  return "KEEP_REMAIN";
                                  // throw new Error("no work");
                                }
                              }
                              _.forEach(obj, (x, d, n) => {
                                eachRow[d] = x;
                              });
                              await fn_111();
                              saveFn();
                              gutils.alertOk(
                                `Saved the configuration! Some services may need to be restarted for effectiveness.`
                              );
                            },
                          });
                        } else {
                          await fn_111();
                          eachRow.record_type = "add";
                          saveFn();
                        }
                      }}
                      href="javascript:void(0);"
                    >
                      {t("Edit")}
                    </a>
                  ) : (
                    ""
                  )}
                  {eachRow.record_type == "stored" ||
                  eachRow.record_type == "add" ? (
                    <a
                      key={eachRowIdx + "stored"}
                      onClick={async () => {
                        if (props.askBeforeRemove) {
                          if (
                            !(await gutils.win_confirm(
                              t(`Would you like to remove this record? `)
                            ))
                          ) {
                            return;
                          }
                        }
                        let now_idx = _.findIndex(
                          crt_arr_value,
                          (i) => i.id == eachRow.id
                        );
                        console.log("next idx", now_idx, crt_arr_value);
                        crt_arr_value = gutils.pickArr(crt_arr_value, now_idx);
                        saveFn(crt_arr_value);
                      }}
                      href="javascript:void(0);"
                    >
                      {t("Remove")}
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              );
            },
          },
        ]}
        data={calc_data}
        extraObj={m_local_store.furtherObj}
        // _.get(m_local_store, ["furtherObj", "table_" + x.id], {})
      />
      <div style={{ margin: "5px 0" }} className="beflex">
        <div></div>
        <div className="sub-mr-5">
          <Button
            text={t(`Add New Record`)}
            onClick={() => {
              // alert form model
              // let newInsertObj = {
              //   tmp_id: gutils.uuid(),
              // };
              if (alertFormType) {
                let { PUtils } = props;
                let title = `Add New Record`;
                cutils.alertFormPanel({
                  title: title,
                  finalFormArr: g_finalFormArr,
                  fn_finalFormArr: fn_finalFormArr,
                  PUtils,
                  onSave: async (obj) => {
                    if (props.previewRecord) {
                      let resultFn = await props.previewRecord(obj);
                      if (resultFn) {
                        gutils.alert({
                          intent: "danger",
                          message: resultFn,
                        });
                        // throw new Error("no work");
                        return "KEEP_REMAIN";
                      }
                    }
                    crt_arr_value.push({
                      ...obj,
                      id: gutils.uuid(),
                      record_type: "stored",
                    });
                    saveFn();
                    gutils.alertOk(
                      `Saved the configuration! Some services may need to be restarted for effectiveness.`
                    );
                  },
                });
              } else {
                crt_arr_value.push({
                  id: gutils.uuid(),
                  record_type: "add",
                });
                saveFn();
              }
            }}
          ></Button>
          {!_.isEmpty(crt_arr_value)
            ? [
                alertFormType ? null : (
                  <Button
                    text={t(`Edit All`)}
                    onClick={() => {
                      _.map(crt_arr_value, (x, d, n) => {
                        x.record_type = "add";
                      });
                      saveFn();
                    }}
                  ></Button>
                ),
                <Button
                  text={t(`Remove All`)}
                  onClick={async () => {
                    let b = await gutils.win_confirm(
                      t(`Would you like to remove all records?`)
                    );
                    if (!b) {
                      return;
                    }
                    crt_arr_value = [];
                    saveFn();
                  }}
                ></Button>,
              ].filter((x) => !_.isNil(x))
            : []}
        </div>
      </div>
      {showFormDescAsBelow ? (
        <div style={{ margin: "8px" }}>
          <Callout title={t(`About this Extension`)}>
            {props.descConclusion ? <p>{props.descConclusion}</p> : ""}
            <ul>
              {_.map(
                _.filter(props.column, (x) => x.f_skip !== true),
                (x, d) => {
                  return (
                    <li key={d}>
                      <b>{x.label}</b>: {x.f_desc}
                    </li>
                  );
                }
              )}
            </ul>
          </Callout>
        </div>
      ) : (
        ""
      )}
    </div>
  );
});

export default FormCrudTable;
