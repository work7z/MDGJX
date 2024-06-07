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
// var { autorun, observable, observe, reaction } = require("mobx");
import {autorun, observable, observe, reaction} from "mobx";
import gstore from "../../store.jsx";
import "./index.less";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import SelfIconButton from "../SelfIconButton/index";
import GFormSelect from "../GFormSelect";
import GFormSwitch from "../GFormSwitch";
import { MultiSelect } from "@blueprintjs/select";
import LocalProject from "../LocalProject";
import LocalProjectSelect from "../LocalProjectSelect";
import LocalProjectBtnWithPanel from "../LocalProjectBtnWithPanel";
import { Resizable } from "re-resizable";
import Blink from "../Blink";
import HalfResizeForTwo from "../HalfResizeForTwo";
import DefinePanelWithBar from "../DefinePanelWithBar";
import VirtualBigDataLineContainer from "../VirtualBigDataLineContainer";
import GEditor from "../GEditor";
import _ from "lodash";

const SelfOwnEditor = observer((props) => {
  const [myuid] = useState(_.uniqueId("self"));
  const myref = {
    editorRef: null,
  };
  useEffect(() => {
    let autorunRef = reaction(
      () => {
        return [
          gstore.common_app.textSearch.drag.filesListInfo.viewResultId,
          gstore.common_app.textSearch.drag.latestID,
        ];
      },
      () => {
        gutils.defer(async () => {
          if (_.isNil(myref.editorRef)) {
            return;
          }
          let editorRef = myref.editorRef;
          const viewResultId =
            gstore.common_app.textSearch.drag.filesListInfo.viewResultId;
          if (_.isNil(viewResultId)) {
            if (editorRef && editorRef.setValue) {
              editorRef.setValue("");
            }
            return;
          }
          let res = await gutils.api.common_app.textSearch.getResByViewResultId(
            viewResultId
          );
          //           let jsCode = `<?xml version="1.0" encoding="UTF-8"?>
          // <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
          // <plist version="1.0">
          // <dict>
          // 	<key>GUID</key>
          // 	<string>FAA2B222-DCC2-B1E6-2E19-A4FB5720E7A1</string>
          // 	<key>Layout Version</key>
          // 	<integer>1</integer>
          // </dict>
          // </plist>`;
          if (editorRef && editorRef.setValue) {
            editorRef.setValue(res.value);
          }
          // editorRef.setValue(jsCode);
          gutils.setLangForEditor(editorRef, res.lang);
          gutils.defer(() => {
            // TODO: no use here
            if (true) {
              return;
            }
            const { monaco } = window.CodeGenPluginED();
            let val_startidx = res.META["START_IDX"];
            let val_endidx = res.META["END_IDX"];
            let startIdxPos = crt_editor.getModel().getPositionAt(val_startidx);
            let endIdxPos = crt_editor.getModel().getPositionAt(val_endidx);
            // let rangeValue = crt_editor
            //   .getModel()
            //   .getRangeAt(res.META["START_IDX"], res.META["END_IDX"]);
            let myarrconfig = [
              res.META["FIND_LINE_NUM"] + 1,
              res.META["LINE_START_IDX"] + 1,
              res.META["FIND_LINE_NUM"] + 1,
              res.META["LINE_END_IDX"] + 1,
            ];
            // range: new monaco.Range(1, 1, 10, 30),
            // startIdxPos.lineNumber,
            // startIdxPos.column,
            // endIdxPos.lineNumber,
            // endIdxPos.column
            // rangeValue.startLineNumber,
            // rangeValue.startColumn,
            // rangeValue.endLineNumber,
            // rangeValue.endColumn
            console.log("monaco editor", ...myarrconfig, res.META);
            // editorRef.deltaDecorations(
            //   [],
            //   [
            //     {
            //       range: new monaco.Range(...myarrconfig),
            //       options: {
            //         linesDecorationsClassName: "myInlineDecoration",
            //       },
            //     },
            //   ]
            // );
            editorRef.deltaDecorations(
              [],
              [
                {
                  range: new monaco.Range(...myarrconfig),
                  options: { inlineClassName: "myInlineDecoration" },
                },
              ]
            );
            crt_editor.revealLine(myarrconfig[0]);
          });
        });
      }
    );
    return () => {
      autorunRef();
    };
  }, [myuid]);
  return (
    <GEditor
      readOnly={true}
      style={{ width: "100%", height: "100%" }}
      id={"myrad"}
      wordWrap={"off"}
      key={"neverchg"}
      onRef={(editor) => {
        console.log("editor", editor);
        window.c_text = editor;
        if (editor) {
          myref.editorRef = editor;
        }
      }}
    />
  );
});

const MyBtmSearchJsx = observer(() => {
  const textSearchDrag = gstore.common_app.textSearch.drag;
  const crtViewSelectedItem = textSearchDrag.filesListInfo.viewResultObj;
  return (
    <HalfResizeForTwo
      heightValue={textSearchDrag["searchTopHeight"]}
      onHeightValue={(val) => {
        textSearchDrag["searchTopHeight"] = val;
      }}
      defaultPercent={0.5}
      containerClz={"box-btm-search"}
      topClz={"search-files-box"}
      topJsx={
        <VirtualBigDataLineContainer
          changeFactor={
            textSearchDrag.latestID +
            textSearchDrag.filesListInfo.viewResultId +
            _.size(textSearchDrag.filesListInfo.data)
          }
          rowHeight={24}
          viewListInfo={textSearchDrag.filesListInfo}
          noDataView={t("no matched records")}
          rowCount={textSearchDrag.loadObj.REALTIME_STATUS.matchNums}
          rowRenderer={({ key, index, isScrolling, isVisible, style }) => {
            let crtItem = _.get(textSearchDrag.filesListInfo.data, index, {});
            let part_left = "",
              part_center = "",
              part_right = "";
            if (!_.isEmpty(crtItem)) {
              part_left = crtItem.part_left;
              part_center = crtItem.part_center;
              part_right = crtItem.part_right;
            }
            return (
              <div
                className={
                  "scroll-visual-item" +
                  " " +
                  (!_.isEmpty(crtItem) &&
                  crtItem["ID"] == textSearchDrag.filesListInfo.viewResultId
                    ? "active"
                    : "")
                }
                onClick={() => {
                  if (!_.isEmpty(crtItem)) {
                    console.log("chging the result id", crtItem.ID);
                    textSearchDrag.filesListInfo.viewResultId = crtItem["ID"];
                    textSearchDrag.filesListInfo.viewResultObj = crtItem;
                    // let crtViewSelectedItem = _.find(
                    //   textSearchDrag.filesListInfo.data,
                    //   x=>x.ID == textSearchDrag.latestID,
                    // );
                  }
                }}
                key={crtItem["ID"] || index}
                style={style}
              >
                <div className={"scroll-left-div"}>
                  {_.isEmpty(crtItem) ? (
                    <span>
                      {textSearchDrag.loadObj.REALTIME_STATUS.done
                        ? ""
                        : t("loading...")}
                    </span>
                  ) : (
                    <span>
                      <span>{part_left}</span>
                      <span className="c-part-center">{part_center}</span>
                      <span>{part_right}</span>
                    </span>
                  )}
                </div>
                <div className="scroll-right-div">{crtItem["FILENAME"]}</div>
              </div>
            );
          }}
        />
      }
      btmClz={"search-file-detail-box"}
      btmJsx={
        <DefinePanelWithBar
          stMainJsx={<SelfOwnEditor />}
          stLeftJsx={
            <div>
              {textSearchDrag.replacingText ? (
                <span>
                  {textSearchDrag.replacingText}
                  {textSearchDrag.replacingLoading ? <Blink /> : ""}
                </span>
              ) : (
                <span>
                  {textSearchDrag.loadObj.REALTIME_STATUS.matchNums} matches in{" "}
                  {textSearchDrag.loadObj.REALTIME_STATUS.ackFiles} Files
                  {!textSearchDrag.loadObj.REALTIME_STATUS.done ? (
                    <Blink />
                  ) : (
                    ""
                  )}
                </span>
              )}
            </div>
          }
          stRightJsx={
            <div className="space-right-box">
              <Popover
                minimal={true}
                style={{ padding: "10px", height: "100%" }}
                popoverClassName={
                  Classes.POPOVER_CONTENT_SIZING + " short-pop "
                }
                portalClassName=" short-pop "
                enforceFocus={true}
              >
                <a>{t("Detail")}</a>
                <div>
                  <div>
                    <div style={{ marginBottom: "5px" }}>
                      {t("FilePath")}: {_.get(crtViewSelectedItem, "FILEPATH")}
                    </div>
                    <ButtonGroup>
                      <Button
                        href={"javascript:void(0);"}
                        onClick={() => {
                          if (!_.isEmpty(crtViewSelectedItem)) {
                            let thefilepath = crtViewSelectedItem["FILEPATH"];
                            window.ipc.openFile(thefilepath, thefilepath);
                          } else {
                            gutils.alert("no selected file");
                          }
                        }}
                        intent={"primary"}
                        outlined={true}
                      >
                        {t("Open")}
                      </Button>
                      <Button
                        href={"javascript:void(0);"}
                        onClick={() => {
                          if (!_.isEmpty(crtViewSelectedItem)) {
                            let thefilepath = crtViewSelectedItem["FILEPATH"];
                            window.ipc.openDir(thefilepath);
                          } else {
                            gutils.alert("no selected file");
                          }
                        }}
                        intent={"primary"}
                        outlined={true}
                      >
                        {t("Folder")}
                      </Button>
                      {/* <Button
                        href={"javascript:void(0);"}
                        onClick={() => {
                          if (!_.isEmpty(crtViewSelectedItem)) {
                            let thefilepath = crtViewSelectedItem["FILEPATH"];
                            window.ipc.rm(thefilepath);
                            gutils.alert("Deleted.");
                          } else {
                            gutils.alert("no selected file");
                          }
                        }}
                        intent={"danger"}
                        outlined={true}
                      >
                        Delete
                      </Button> */}
                    </ButtonGroup>
                  </div>
                </div>
              </Popover>
              <a
                onClick={() => {
                  window.ipc.openBackupsDir();
                }}
              >
                Backups
              </a>
            </div>
          }
        />
      }
    ></HalfResizeForTwo>
  );
});

const MyTopSearchCtlJsx = observer(() => {
  const textSearchConfig = gstore.common_app.textSearch.config;
  const textSearchDrag = gstore.common_app.textSearch.drag;

  return (
    <div className="search-ctl-box">
      <div className="ctl-left">
        <div className="ctl-left-btn-group">
          <span className="scope-text">{t("Scope")}:</span>
          <ButtonGroup>
            <LocalProjectBtnWithPanel config={textSearchConfig} />
          </ButtonGroup>
        </div>
      </div>
      <div className="ctl-right">
        <ButtonGroup>
          {!textSearchDrag.loadObj.REALTIME_STATUS.done ? (
            <Button
              outlined={true}
              small={true}
              intent="warning"
              onClick={() => {
                gutils.api.common_app.textSearch.cancel();
              }}
            >
              {t("Stop")}
            </Button>
          ) : (
            ""
          )}
          <Button
            outlined={true}
            small={true}
            intent="none"
            onClick={() => {
              gutils.api.common_app.textSearch.replace();
            }}
            loading={textSearchDrag.replacingLoading}
          >
            {t("Replace")}
          </Button>
          <Button
            outlined={true}
            small={true}
            intent="none"
            onClick={() => {
              gutils.api.common_app.textSearch.replaceAll();
            }}
            loading={textSearchDrag.replacingLoading}
          >
            {t("Replace All")}
          </Button>
          <Button
            outlined={true}
            small={true}
            intent="none"
            onClick={() => {
              textSearchConfig.show_more_option =
                !textSearchConfig.show_more_option;
            }}
          >
            {!textSearchConfig.show_more_option
              ? t("More Options")
              : t("Collapse Options")}
          </Button>
        </ButtonGroup>
        <div></div>
      </div>
    </div>
  );
});

export default observer(() => {
  const textSearchConfig = gstore.common_app.textSearch.config;
  let fn_getHist = () => {
    return "";
    return (
      <Button
        small={true}
        minimal={true}
        title="Show Previous Inputs"
        icon="history"
      ></Button>
    );
  };
  let myform = gutils.initWindowsForm("text_search_submit_forms", {
    findingText: "",
    replacingText: "",
    excludingText: "",
  });
  let fn_finalCallForSearching = () => {
    gutils.api.common_app.textSearch.search(myform);
  };
  let fn_getTextArea = (mode, mykey) => {
    // return "";
    return (
      <Popover
        minimal={true}
        style={{ minWidth: "500px", padding: "10px", height: "100%" }}
        popoverClassName={
          Classes.POPOVER_CONTENT_SIZING + " short-pop w500-pop"
        }
        portalClassName="textareawrap short-pop w500-pop"
        enforceFocus={true}
        placement="bottom-end"
      >
        <Button
          small={true}
          minimal={textSearchConfig[mode] ? false : true}
          title={t(
            "Update Single Line Container into Multiple Lines Container"
          )}
          icon="text-highlight"
        ></Button>
        <div>
          <TextArea
            defaultValue={myform[mykey] || ""}
            onChange={(e) => {
              // debugger;
              myform[mykey] = e.target.value;
              textSearchConfig.updateRef++;
              fn_finalCallForSearching();
            }}
            style={{ width: "100%", height: "249px" }}
          />
          <div class="m-fr mt-10">
            <ButtonGroup>
              {textSearchConfig[mode] ? (
                <Button
                  minimal={true}
                  small={true}
                  intent={textSearchConfig[mode] ? "warning" : "primary"}
                  onClick={() => {
                    textSearchConfig[mode] = !textSearchConfig[mode];
                    fn_finalCallForSearching();
                  }}
                >
                  {textSearchConfig[mode] ? t("Unset") : t("Set")}
                </Button>
              ) : (
                ""
              )}
              <Button
                minimal={true}
                small={true}
                intent={"primary"}
                onClick={() => {
                  textSearchConfig[mode] = !textSearchConfig[mode];
                  fn_finalCallForSearching();
                }}
              >
                {t("Set")}
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Popover>
    );
  };
  let fn_caseSensitive = (mode) => {
    return (
      <SelfIconButton
        small={true}
        minimal={textSearchConfig[mode] ? false : true}
        onClick={() => {
          textSearchConfig[mode] = !textSearchConfig[mode];
          fn_finalCallForSearching();
        }}
        title={t("Ignore the text case while finding the text")}
        iconText="case-sensitive"
      />
    );
  };
  let fn_Regex = (mode) => {
    return (
      <SelfIconButton
        small={true}
        minimal={textSearchConfig[mode] ? false : true}
        onClick={() => {
          textSearchConfig[mode] = !textSearchConfig[mode];
        }}
        myIconSize={"15px"}
        title={t("Regex Pattern Mode")}
        iconText="regex"
      />
    );
  };
  return (
    <div className="dblink-page sys-card-wrapper">
      <Card className="text-search-wrapper">
        <div class="box-top-search">
          <div className="search-ipt-box">
            <div className="find-text-ipt-box" labelFor="fi-file">
              <InputGroup
                rows={3}
                disabled={textSearchConfig.needFindingExpand}
                leftIcon="search"
                {...gutils.bindIpt(myform, "findingText", () => {
                  fn_finalCallForSearching();
                })}
                id="fi-file"
                small={true}
                rightElement={
                  <ButtonGroup>
                    {fn_caseSensitive("needFindingTextCase")}
                    {fn_Regex("needFindingRegex")}
                    {/* {fn_getTextArea("needFindingExpand", "findingText")} */}
                    {fn_getHist()}
                  </ButtonGroup>
                }
                placeholder={t("Finding text, accept plain text and regex")}
              />
            </div>
            <div
              label={t("Replace Text")}
              className="replace-text-ipt-box"
              labelFor="fi-file2"
            >
              <InputGroup
                leftIcon="inheritance"
                id="fi-file2"
                {...gutils.bindIpt(myform, "replacingText", () => {
                  // fn_finalCallForSearching();
                })}
                small={true}
                disabled={textSearchConfig.needReplacingExpand}
                rightElement={
                  <ButtonGroup>
                    {/* {fn_Regex("needReplacingRegex")} */}
                    {fn_getTextArea("needReplacingExpand", "replacingText")}
                    {fn_getHist()}
                  </ButtonGroup>
                }
                placeholder={t("Replacing text, accept plain text and regex")}
              />
            </div>
            <div className="replace-text-ipt-box">
              <InputGroup
                leftIcon="exclude-row"
                disabled={textSearchConfig.needExcludingExpand}
                id="fi-file2"
                {...gutils.bindIpt(myform, "excludingText", () => {
                  fn_finalCallForSearching();
                })}
                small={true}
                rightElement={
                  <ButtonGroup>
                    {fn_caseSensitive("needExcludingTextCase")}
                    {fn_getTextArea("needExcludingExpand", "excludingText")}
                    {fn_getHist()}
                  </ButtonGroup>
                }
                placeholder={t(
                  "Excluding files by matching its path, accept regex values only"
                )}
              />
            </div>
            {textSearchConfig.show_more_option ? (
              <div className="replace-text-ipt-box">
                <InputGroup
                  leftIcon="th-derived"
                  disabled={textSearchConfig.needIncludingExpand}
                  id="fi-file2"
                  {...gutils.bindIpt(myform, "includingText", () => {
                    fn_finalCallForSearching();
                  })}
                  small={true}
                  rightElement={
                    <ButtonGroup>
                      {fn_caseSensitive("needIncludingTextCase")}
                      {fn_getTextArea("needIncludingExpand", "includingText")}
                      {fn_getHist()}
                    </ButtonGroup>
                  }
                  placeholder={t(
                    "Including files by matching its path, accept regex values only"
                  )}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <MyTopSearchCtlJsx></MyTopSearchCtlJsx>
        </div>
        <MyBtmSearchJsx></MyBtmSearchJsx>
      </Card>
    </div>
  );
});

{
  /* <Button
                    small={true}
                    icon="add"
                    minimal={true}
                    title="add a new finding text input container below"
                  ></Button> */
}
