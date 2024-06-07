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
  Menu,
  MenuDivider,
  MenuItem,
  TextArea,
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
import GEditor from "../../components/GEditor";
import ControlTable from "../../components/control_table";
import { Resizable } from "re-resizable";
import GTabs from "../../components/GTabs/index";
import DbConnProject from "../dblink_conn_list";
import Dblink_tab_overview from "../dblink_tab_overview";
import _ from "lodash";
import Dblink_data_overview from "../dblink_data_overview";
import VisualControlDataTable from "../../components/VisualControlDataTable";
// import Dblink_tab_startpage from "../dblink_data_startpage";
import Dblink_data_startpage from "../dblink_data_startpage";
import GButton from "../../components/GButton";

export default observer(() => {
  const [ID_DB_VIEW] = useState(_.uniqueId("ID_DB_VIEW"));

  useEffect(() => {
    gutils.api.dblink.loadEditor();
    gutils.api.dblink.loadConnTree();
    let a = reaction(
      () => {
        return [gstore.localSettings.currentWorkspaceId];
      },
      () => {
        gutils.api.dblink.loadEditor();
        gutils.api.dblink.loadConnTree();
      }
    );
    return () => {
      a();
    };
  }, []);
  // gutils.once("one-run", () => {
  // });

  const [uniID, onUniID] = useState(_.uniqueId("myid"));
  console.log("renewing dblink logic", uniID);
  const editorTab = gstore.databaseAllData.data.editorTab;
  const dbViewTab = gstore.databaseAllData.data.dataViewTab;
  if (_.isEmpty(editorTab)) {
  }
  const [dbAllCtnId] = useState(_.uniqueId("mmid"));
  const bindkeyevent = "event_click" + dbAllCtnId;
  useEffect(() => {
    return () => {
      window.removeEventListener("click", window[bindkeyevent]);
    };
  }, [dbAllCtnId]);
  let crtpagefocusid = gutils.global_panel_db_page_focus;
  gutils.once("database-conn-keydown", () => {});
  const [editorStyle] = useState({
    width: "100%",
    height: "100%",
    border: "1px solid #ccc",
  });

  const refForRootEle = () => {
    gutils.defer(() => {
      // //debugger;
      let $ele = $("#" + uniID);
      if ($ele.length) {
        // //debugger;
        const myheight = $ele.find(".dbAllContent").height();
        gutils.once("runadjust" + uniID + "x" + myheight, () => {
          if (
            !_.isNil(myheight) &&
            gstore.localSettings.database_top_bottom_view_project_width.indexOf(
              "%"
            ) != -1
          ) {
            gstore.localSettings.database_top_bottom_view_project_width =
              myheight *
                (parseInt(
                  gstore.localSettings.database_top_bottom_view_project_width
                ) /
                  100) +
              "px";
          }
        });
      }
    });
  };
  const refForRootCard = (e) => {};
  const getCrtTabItem = () => {
    let myitem = _.find(
      gstore.databaseAllData.data.editorTab.list,
      (x) => x.id == gstore.databaseAllData.data.editorTab.value
    );
    return myitem;
  };
  const setUnsaveOrSave = (val) => {
    let myitem = getCrtTabItem();
    if (myitem) {
      myitem.unsave = val;
    }
  };
  let isShowDataSourceLeftPanel =
    gstore.localSettings.isShowDataSourceLeftPanel;

  const global_view_left_menu_jsx = <DbConnProject />;
  const global_view_right_tabs_jsx = (
    <div className="editor-right-content" style={{}}>
      <GTabs
        otherFuncJSX={[
          <MenuDivider title={t("View")} />,
          <MenuItem
            icon="remove-row-bottom"
            text={t("Show/Hide Left Panel")}
            onClick={() => {
              gstore.localSettings.isShowDataSourceLeftPanel =
                !gstore.localSettings.isShowDataSourceLeftPanel;
            }}
          />,
        ]}
        defaultViewTitle={t("Overview")}
        defaultViewJsx={<Dblink_tab_overview />}
        mapid="topright"
        onSave={() => {
          window.saveTopRightEditorTab();
        }}
        closeAll={async function (node) {
          await gutils.api.dblink.closeAllEditor();
        }}
        onRemove={async function (node) {
          // if (
          //   !await gutils.win_confirm(
          //     "Do you want to close the script and related connections?"
          //   )
          // ) {
          //   throw new Error("cannot operate it");
          // }
          await gutils.api.dblink.closeEditor(node);
        }}
        obj={editorTab}
        renderTabPane={(x, d, n) => {
          switch (x.type) {
            case "overview":
              return <Dblink_tab_overview />;
              break;
          }
          // // console.log("tab-id", x.id, x.meta);
          let crtTabId = x.id;
          const { TEMP_FILE_PATH, DATA_FILE_PATH, JSON_FILE_PATH } = x.meta;
          let crtConnStatus = _.get(x, "meta.CONN_STATUS");
          const mapStyles = {
            CONNECTED: {
              color: "var(--app-text-darkgreen)",
              intent: "success",
              textColor: "var(--app-text-darkgreen)",
            },
            DISCONNECTED: {
              color: "var(--app-text-darkred)",
              intent: "danger",
              textColor: "var(--app-text-darkred)",
            },
          };
          let displayObjForMsg = mapStyles[crtConnStatus];
          const errobjpre =
            gstore.databaseAllData.data.crtErrViewObj[x.meta.ID];
          if (!_.isNil(errobjpre)) {
            displayObjForMsg = errobjpre;
          }
          return (
            <div key={crtTabId} className="mycrt-tab-box">
              <div className="mycrt-tab-title">
                <div class="crt-tab-st-box-wrap doflex">
                  <Icon
                    size={12}
                    icon={displayObjForMsg.icon || "data-connection"}
                    title={crtConnStatus}
                    intent={displayObjForMsg.intent}
                  />
                  <div
                    className={
                      "conn-st-val  " +
                      +" " +
                      `bp3-intent-${displayObjForMsg.intent}`
                    }
                    style={{
                      color: displayObjForMsg.textColor,
                    }}
                  >
                    {displayObjForMsg.msg || crtConnStatus}
                  </div>
                </div>
                <div
                  class="crt-tab-st-box-wrap doflex right-query"
                  onClick={() => {
                    //
                    window.handleByAckType({
                      ackType: "query",
                    });
                  }}
                >
                  <Icon
                    size={12}
                    style={{ marginTop: "3px" }}
                    intent={"primary"}
                    icon={"search"}
                    title={t(`Query Selected SQL`)}
                  />
                  {/* <div
                    className={"conn-st-val  " + +" " + `bp3-intent-primary`}
                    style={{ color: `#106ba3` }}
                  >
                    {t(`Search`)}
                  </div> */}
                </div>
              </div>
              <div className="mycrt-tab-body">
                <GEditor
                  onChange={async (value, obj) => {
                    const delayCallFunc = async (
                      val,
                      unknown,
                      { TEMP_FILE_PATH }
                    ) => {
                      // // console.log("chaging value", val);
                      await window.ipc.writeStrToFile(TEMP_FILE_PATH, val);
                    };
                    console.log("chaging the value", value);
                    // console.log("on chaging g-editor");
                    await delayCallFunc(value, obj, { TEMP_FILE_PATH });
                    if (getCrtTabItem().unsave != true) {
                      let mydata = await window.ipc.readFileToStr(
                        DATA_FILE_PATH
                      );
                      if (mydata != value) {
                        // x.unsave = true;
                        setUnsaveOrSave(true);
                      }
                      mydata = null;
                    }
                  }}
                  onAnyMotionMove={_.throttle(async (value) => {
                    // console.log("will save logic", value, crtTabId);
                    await window.ipc.writeStrToFile(
                      JSON_FILE_PATH,
                      JSON.stringify(value)
                    );
                  }, 30)}
                  saveEditorId={x.crtTabId}
                  JSON_FILE_PATH={JSON_FILE_PATH}
                  onRef={async (editor) => {
                    window.dblink_global_act_editor = editor;
                    let fileStr = await window.ipc.readFileToStr(
                      TEMP_FILE_PATH
                    );
                    if (
                      editor.getModel &&
                      editor.getModel() &&
                      editor.getModel().setValue
                    ) {
                      console.log("updating the value", fileStr);
                      editor.getModel().setValue(fileStr);
                    }
                    fileStr = null;
                    window.saveTopRightEditorTab = async () => {
                      await window.ipc.copyFileContent(
                        TEMP_FILE_PATH,
                        DATA_FILE_PATH
                      );
                      // x.unsave = false;
                      setUnsaveOrSave(false);
                    };
                    window.getCrtDBLinkEditorSelectedText = () => {
                      const crt_editor = window.dblink_global_act_editor;
                      return crt_editor
                        .getModel()
                        .getValueInRange(crt_editor.getSelection());
                    };
                    function selectCurrentLineByEditor(crt_editor) {
                      let crtLineNumber = crt_editor.getPosition().lineNumber;
                      let mincol = crt_editor
                        .getModel()
                        .getLineMinColumn(crt_editor.getPosition().lineNumber);
                      let maxcol = crt_editor
                        .getModel()
                        .getLineMaxColumn(crt_editor.getPosition().lineNumber);
                      let crtLineSelectionObj = {
                        endColumn: maxcol,
                        endLineNumber: crtLineNumber,
                        positionColumn: maxcol,
                        positionLineNumber: crtLineNumber,
                        selectionStartColumn: mincol,
                        selectionStartLineNumber: crtLineNumber,
                        startColumn: mincol,
                        startLineNumber: crtLineNumber,
                      };
                      // crt_editor.setPosition({
                      //   lineNumber: crtLineSelectionObj.endLineNumber,
                      //   column: crtLineSelectionObj.endColumn,
                      // });
                      let prepos = crt_editor.getPosition();
                      crt_editor.setSelection(crtLineSelectionObj);
                      gutils.defer(() => {
                        crt_editor.setPosition(prepos);
                        crt_editor.setSelection(crtLineSelectionObj);
                      }, 50);
                      // if (true) {
                      //   throw new Error("got failure");
                      // }
                    }
                    let handleByAckType = async ({ ackType }) => {
                      const crt_editor = window.dblink_global_act_editor;
                      delete gstore.databaseAllData.data.crtErrViewObj[
                        x.meta.ID
                      ];
                      let crtSQL = window.getCrtDBLinkEditorSelectedText();
                      if (_.isEmpty(_.trim(crtSQL))) {
                        crtSQL = crt_editor
                          .getModel()
                          .getLineContent(crt_editor.getPosition().lineNumber);
                        selectCurrentLineByEditor(crt_editor);
                        if (_.isEmpty(_.trim(crtSQL))) {
                          gstore.databaseAllData.data.crtErrViewObj[x.meta.ID] =
                            gutils.getErrTooltipForEditor("Empty SQL String");

                          throw new Error(t("Empty SQL String"));
                        }
                      }
                      try {
                        await delayCallFunc(
                          editor.getModel().getValue(),
                          null,
                          { TEMP_FILE_PATH }
                        );
                      } catch (e) {
                        console.log(e);
                      }
                      gutils.defer(() => {
                        gutils.api.dblink.startWorkingForCurrentEditor({
                          ackType,
                          crtSQL,
                          EDITOR_ID: x.meta.ID,
                        });
                      }, 300);
                    };
                    window.handleByAckType = handleByAckType;
                    gutils.keyDownListenObj["ref" + crtTabId] = (e) => {
                      if (
                        window[crtpagefocusid] == "topright" &&
                        crtTabId == gstore.databaseAllData.data.editorTab.value
                      ) {
                        let ackType = null;
                        if (e.ctrlKey && e.shiftKey && e.key == "Enter") {
                          ackType = "exec";
                          // console.log("executing the SQL");
                        } else if (e.ctrlKey && e.key == "Enter") {
                          ackType = "query";
                          // console.log("querying the SQL");
                        }
                        if (!_.isNil(ackType)) {
                          gutils.stop_e(e);
                          gutils.stop_e(e);
                          handleByAckType({ ackType });
                        }
                      }
                    };
                    window[crtpagefocusid] = "topright";
                  }}
                  style={editorStyle}
                  id={crtTabId}
                  key={crtTabId}
                />
              </div>
            </div>
          );
        }}
      />
    </div>
  );
  const global_view_btm_data_jsx = (
    <div
      className="dbDataView"
      style={{
        height: `calc(100% - ${gstore.localSettings.database_top_bottom_view_project_width} - 0px)`,
        maxHeight: `calc(100% - ${gstore.localSettings.database_top_bottom_view_project_width} - 0px)`,
      }}
    >
      <GTabs
        defaultViewTitle={t("Start Page")}
        defaultViewJsx={<Dblink_data_startpage />}
        mapid="btm"
        closeAll={async function (node) {
          await gutils.api.dblink.closeAllDataTab();
        }}
        onRemove={async function (node) {
          await gutils.api.dblink.closeDataTab(node);
        }}
        obj={dbViewTab}
        renderTabPane={(x, d, n) => {
          // // console.log("render tab ", x);
          let crtScopeId = x.id;
          let crtScopeMeta = x.meta;
          switch (x.type) {
            case "overview":
              return (
                <Dblink_data_overview
                  overviewDefinition={
                    gstore.databaseAllData.data.overviewDefinition
                  }
                  key={gstore.databaseAllData.data.editorTab.value}
                />
              );
              break;
            case "dataview":
              return (
                <VisualControlDataTable
                  whenToBtm={() => {
                    let crtTabId = x.id;
                    console.log("need load more data by tab-id", crtTabId);
                    gutils.api.dblink.readMoreData({
                      saveRsId: crtTabId,
                    });
                  }}
                  obj={gstore.databaseAllData.data.resultSet[crtScopeId]}
                  key={crtScopeId}
                  meta={crtScopeMeta}
                  notActive={() => {
                    return (
                      gutils.getFocusPanelId() != "btm" ||
                      dbViewTab.value != x.id
                    );
                  }}
                />
              );
              break;
              return <div>unknown type</div>;
          }
        }}
      />
    </div>
  );
  let result = (
    <div
      className="dblink-page sys-card-wrapper"
      id={uniID}
      ref={refForRootEle}
    >
      <Card id={dbAllCtnId} className="dbAllContent" ref={refForRootCard}>
        {isShowDataSourceLeftPanel ? (
          <Resizable
            {...gutils.allResizeProps()}
            enable={_.merge(gutils.enableResize(), {
              right: true,
            })}
            style={{}}
            className="dbEditorView"
            {...gutils.resizeEvent({
              size: {},
              obj: gstore.localSettings,
              key: "database_topview_left_project_width",
            })}
          >
            {global_view_left_menu_jsx}
          </Resizable>
        ) : (
          ""
        )}
        <div
          className="editor-conbine-box h100p just-flex"
          style={{
            width: isShowDataSourceLeftPanel
              ? `calc(100% - ${gstore.localSettings.database_topview_left_project_width})`
              : "100%",
            height: "100%",
          }}
        >
          <Resizable
            {...gutils.allResizeProps()}
            enable={_.merge(gutils.enableResize(), {
              bottom: true,
            })}
            className="editor-left-project"
            size={{
              // width: gstore.localSettings.database_topview_left_project_width,
              width: "100%",
              height:
                gstore.localSettings.database_top_bottom_view_project_width,
            }}
            onResizeStop={(event, direct, refToEle, delta) => {
              // // console.log("on resize stop", refToEle.style.height);
              gstore.localSettings.database_top_bottom_view_project_width =
                refToEle.style.height;
              gutils.defer(() => {
                gutils.callWhenResize();
              });
            }}
          >
            {global_view_right_tabs_jsx}
          </Resizable>
          {global_view_btm_data_jsx}
        </div>
      </Card>
    </div>
  );
  try {
    return result;
  } catch (err) {
    console.log("i got err", err);
    return <div>error</div>;
  }
});

/**
    // // console.log("llcard", e);
    gutils.defer(() => {
      let $dbAllCtnId = $("#" + dbAllCtnId);
      if ($dbAllCtnId.length != 0 && false) {
        gutils.once("b-" + dbAllCtnId, () => {
          // // console.log("got render you");
          let $dbDataView = $(".dbDataView");
          let $topLeft = $(".editor-left-project");
          let $topRight = $(".editor-right-content");
          if (window[bindkeyevent]) {
            window.removeEventListener("click", window[bindkeyevent]);
          }
          let okfunc = (e) => {
            let getFuncNow = $(e.target)
              .parents()
              .filter((a, b) => b == $dbAllCtnId[0]);
            let allArr = [
              {
                key: "btm",
                value: $dbDataView,
              },
              {
                key: "topleft",
                value: $topLeft,
              },
              {
                key: "topright",
                value: $topRight,
              },
            ];
            _.forEach(allArr, (x, d, n) => {
              x.value.removeClass("manu-focus");
            });
            if (getFuncNow != null && getFuncNow.length != 0) {
              let focusOneNow = null;
              let theNeedFocusOne = $(e.target)
                .parents()
                .filter((a, b) =>
                  _.find(allArr, (x) => {
                    let isOK = x.value[0] == b;
                    if (isOK) {
                      focusOneNow = x.key;
                    }
                    return isOK;
                  })
                );
              // // console.log("theNeedFocusOne", theNeedFocusOne);
              if (theNeedFocusOne != null && theNeedFocusOne.length != 0) {
                theNeedFocusOne.addClass("manu-focus");
              }
              window[crtpagefocusid] = focusOneNow;
            } else {
              window[crtpagefocusid] = null;
            }
            // // console.log("click", e.target);
          };
          window[bindkeyevent] = okfunc;
          window.addEventListener("click", okfunc);
        });
      }
    });
 */
