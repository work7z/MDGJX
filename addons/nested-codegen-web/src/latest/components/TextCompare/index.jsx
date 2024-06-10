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
import { autorun, reaction,observable } from "mobx";
import gstore from "../../store.jsx";
import "./index.less";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import OperationPanel from "../OperationPanel";
import GEditor from "../GEditor";
import LoadingShortPanel from "../LoadingShortPanel";
const WrapperLoading = observer((props) => {
  let {
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
    GFormSwitch,
    ProgressBar,
    Dialog,
    Popover,
    Radio,
    ButtonGroup,
    TextArea,
    Intent,

    GFormInput,
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
    ReactDOM,
    gutils,
    useStores,
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
  return (
    <div className="w100 h100 mywrapreal">
      {props.loading ? (
        <div style={{ padding: "5px" }} className="mycentrereal">
          <Spinner intent="none" />
        </div>
      ) : (
        props.children
      )}
    </div>
  );
});
const TextCompareEditor = observer(() => {
  let [mycrtEditor, onCrtEditor] = useState(null);
  let model = gstore.common_app.textCompare.model;

  return (
    <GEditor
      otherConfig={{
        callFuncName: "createDiffEditor",
        enableSplitViewResizing: true,
        originalEditable: true,
        readOnly: false,
        followsCaret: true, // resets the navigator state when the user selects something in the editor
        ignoreCharChanges: true, // jump from line to line
      }}
      id="mytextcompare"
      key="mytextcompare"
      onRef={(editor, monaco) => {
        model = gstore.common_app.textCompare.model;
        editor.updateOptions({
          renderSideBySide: !gstore.common_app.textCompare.model.inlineView,
          wordWrap: gstore.common_app.textCompare.model.wordWrap,
        });
        // const { monaco } = window.CodeGenPluginED();
        var originalModel = monaco.editor.createModel(
          model.leftValue,
          "text/plain"
        );
        var modifiedModel = monaco.editor.createModel(
          model.rightValue,
          "text/plain"
        );
        let commonSave = _.throttle(() => {
          // debugger;
          gutils.api.common_app.common.saveModelById("textCompare", false);
        }, 800);
        originalModel.onDidChangeContent((event) => {
          model = gstore.common_app.textCompare.model;
          if (window.ackForUpdate) {
            window.ackForUpdate = false;
            return;
          }
          console.log("loading left value", originalModel.getValue());
          model.leftValue = originalModel.getValue();
          console.log(model.leftValue, model);
          // gstore.common_app.textCompare.setLeftValue(originalModel.getValue());
          window.ackForUser = true;
          commonSave();
        });
        modifiedModel.onDidChangeContent((event) => {
          model = gstore.common_app.textCompare.model;
          if (window.ackForUpdate) {
            window.ackForUpdate = false;
            return;
          }
          console.log("loading right value", modifiedModel.getValue());
          model.rightValue = modifiedModel.getValue();
          // gstore.common_app.textCompare.setRightValue(modifiedModel.getValue());
          window.ackForUser = true;
          // gstore.common_app.textCompare.editor
          commonSave();
        });
        editor.setModel({
          original: originalModel,
          modified: modifiedModel,
        });
        gstore.common_app.textCompare.setLeftValue = (val) => {
          if (originalModel.setValue) {
            originalModel.setValue(val);
          }
        };
        gstore.common_app.textCompare.setRightValue = (val) => {
          if (modifiedModel.setValue) {
            modifiedModel.setValue(val);
          }
        };
        gstore.common_app.textCompare.editor = editor;
        onCrtEditor(editor);
      }}
      style={{ width: "100%", height: "100%" }}
    ></GEditor>
  );
});

export default observer(() => {
  let crtStoreName = "textCompare";
  const textCompare = gstore.common_app.textCompare;
  let fn_user_opt_arr = () => {
    return [
      {
        label: t("Compare Sources"),
        children: [
          {
            label: t("Choose a File as Source"),
            nextType: "pop",
            nextBtns: [
              {
                label: t("Choose a File for Left Panel"),
                onClick: () => {
                  gutils.api.common_app.common.openFileAndFill(
                    "setLeftValue",
                    "textCompare"
                  );
                },
              },
              {
                label: t("Choose a File for Right Panel"),
                onClick: () => {
                  gutils.api.common_app.common.openFileAndFill(
                    "setRightValue",
                    "textCompare"
                  );
                },
              },
            ],
          },
          {
            label: t("Clear Source Value"),
            nextType: "pop",
            nextBtns: [
              {
                label: t("Clean Left Panel Value"),
                onClick: () => {
                  // debugger;
                  // gstore.common_app[crtStoreName].model.leftValue = "";
                  gstore.common_app[crtStoreName].setLeftValue("");
                },
              },
              {
                label: t("Clean Right Panel Value"),
                onClick: () => {
                  // debugger;
                  // gstore.common_app[crtStoreName].model.rightValue = "";
                  gstore.common_app[crtStoreName].setRightValue("");
                },
              },
            ],
          },
          {
            label: t("Swap Sources"),
            onClick: () => {
              let tmp_leftValue = textCompare.model.leftValue;
              let tmp_rightValue = textCompare.model.rightValue;
              // textCompare.model.leftValue = tmp_rightValue;
              // textCompare.model.rightValue = tmp_leftValue;
              gstore.common_app.textCompare.setLeftValue(tmp_rightValue);
              gstore.common_app.textCompare.setRightValue(tmp_leftValue);
            },
          },
        ],
      },
      // here
      {
        label: t("Options"),
        children: [
          {
            label: t(
              (gstore.common_app.textCompare.model.inlineView
                ? "Vertical"
                : "Inline") + " Differ"
            ),
            onClick: () => {
              let crt_editor = gstore.common_app.textCompare.editor;
              let nextVal = !gstore.common_app.textCompare.model.inlineView;
              gstore.common_app.textCompare.model.inlineView = nextVal;
              crt_editor.updateOptions({
                renderSideBySide: !nextVal,
              });
            },
          },
          {
            label: t(
              gstore.common_app.textCompare.model.wordWrap == "on"
                ? "Toggle Line Wrap"
                : "Toggle Line Wrap"
            ),
            n_type: "line_wrap",
            onClick: () => {
              let crt_editor = gstore.common_app.textCompare.editor;
              let nextval =
                gstore.common_app.textCompare.model.wordWrap == "on"
                  ? "off"
                  : "on";
              gstore.common_app.textCompare.model.wordWrap = nextval;
              crt_editor.updateOptions({ wordWrap: nextval });
            },
          },
        ],
      },
    ];
  };
  let isLoading = _.get(textCompare, "hist.isLoadingWhenChangeId");
  // if (isLoading) {
  //   return <WrapperLoading loading={isLoading}></WrapperLoading>;
  // }
  return (
    <div className="sys-card-wrapper">
      <Card>
        <OperationPanel
          crtStoreName={crtStoreName}
          updateEditorValueSync={_.throttle(() => {
            // debugger;
            if (gstore.common_app.textCompare.setLeftValue) {
              console.log(
                "updating edito value sync",
                gstore.common_app.textCompare.model.leftValue
              );
              gstore.common_app.textCompare.setLeftValue(
                gstore.common_app.textCompare.model.leftValue
              );
            }
            if (gstore.common_app.textCompare.setRightValue) {
              console.log(
                "updating edito value sync",
                gstore.common_app.textCompare.model.rightValue
              );
              gstore.common_app.textCompare.setRightValue(
                gstore.common_app.textCompare.model.rightValue
              );
            }
          }, 500)}
          saveCurrentTab={() => {
            return gutils.api.common_app.common.saveModelById("textCompare");
          }}
          // defaultPercent={0.618}
          defaultResizeVal={"250px"}
          logicRoot={gstore.common_app.textCompare}
          rightTitle={t("Text Compare")}
          user_opt_arr={fn_user_opt_arr()}
          configJsx={(props) => (
            <div className="tc-config-box">
              {props.renderFn(fn_user_opt_arr(props), {
                crtStoreName: "textCompare",
              })}
            </div>
          )}
          resizeKey={"textCompareLeftMenuWidth"}
          rightJsx={
            <div className="w100 h100">
              <WrapperLoading loading={isLoading}>
                <TextCompareEditor />
              </WrapperLoading>
            </div>
          }
        ></OperationPanel>
      </Card>
    </div>
  );
});
