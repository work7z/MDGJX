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
import { useState, useEffect, useRef } from "react";

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
import {autorun, observable, reaction}  from 'mobx'
import gstore from "../../store.jsx";
import "./index.less";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
// import { Terminal } from "xterm";
// import "xterm/css/xterm.css";
import GSyncSelectWithFilter from "../GSyncSelectWithFilter";
import HalfResizeForTwoHorizontal from "../HalfResizeForTwoHorizontal";
import GTree from "../GTree";
import GEditor from "../GEditor";
import ViewListWrapper from "../ViewListWrapper";

export default observer((props) => {
  let lang = props.lang;
  let myref = useRef({ editor: null });
  let resizekey = props.resizekey || "outputfileexplorer";
  let crtStoreName = "stn" + resizekey;
  let loadingDatabase = false;
  let fileSaveIndex = props.index + "_files";
  let myfileList = props.obj[fileSaveIndex];
  let onMyFileListUpdates = (val) => {
    props.obj[fileSaveIndex] = val;
  };
  if (_.isNil(myfileList)) {
    myfileList = [];
    gutils.defer(() => {
      onMyFileListUpdates([]);
    });
  }
  let msg_nodata = t("No available content can be displayed");
  let fileSelectedSaveIndex = props.index + "_files_selected";
  // let crtSelectedFile = props.obj[fileSelectedSaveIndex];
  let [crtSelectedFile, onNewSelected] = useState(null);
  let fn_updateFileContent = async (val) => {
    if (_.isNil(val)) {
      val = crtSelectedFile;
    }
    if (_.isNil(val)) {
      // debugger;
      myref.current.editor.getModel().setValue(msg_nodata);
      return;
    }
    myref.current.editor.getModel().setValue(t(`Loading...`));
    let myctnRes = await gutils.opt("/dg/readfile", {
      PATH: val,
    });
    myref.current.editor
      .getModel()
      .setValue(
        _.isEmpty(myctnRes.content)
          ? t(`[THE FILE SELECTED IS EMPTY]`)
          : myctnRes.content
      );
  };
  let onCrtSelectedPath = (val) => {
    onNewSelected(val);
    // props.obj[fileSelectedSaveIndex] = val;
    gutils.defer(() => {
      fn_updateFileContent(val);
    });
  };

  useEffect(() => {
    if (_.isNil(props.obj[props.index]) || _.isEmpty(props.list)) {
      gutils.defer(() => {
        // onMyFileListUpdates([]);
        // onCrtSelectedPath(null);
        // myref.current.editor.getModel().setValue(msg_nodata);
      });
    }
  }, [props.index, props.list]);

  let update_fn = async () => {
    // debugger;
    let crtvalue = props.obj[props.index];
    // onCrtDb()
    let myitem = {
      value: crtvalue,
    };
    if (_.isEmpty(myitem.value)) {
      onMyFileListUpdates([]);
      onCrtSelectedPath(null);
      myref.current.editor.getModel().setValue(msg_nodata);
      return;
    } else {
      let myfilesRes = await gutils.opt("/dg/listfiles", {
        PATH: myitem.value,
      });
      let c1 = _.chain(myfilesRes.content)
        .map((x) => {
          return {
            label: x.name,
            value: x.path,
          };
        })
        .value();
      onMyFileListUpdates(c1);
      if (_.findIndex(myfileList, (x) => x.value == crtSelectedFile) == -1) {
        onCrtSelectedPath(_.get(c1, "0.value"));
      }
      fn_updateFileContent();
    }
  };
  useEffect(() => {
    let fn = reaction(() => {
      return [props.obj[props.index]];
    }, update_fn);
    gutils.defer(() => {
      update_fn();
    });
    return () => {
      fn();
    };
  }, []);
  useEffect(() => {
    let fn = reaction(() => {
      return [crtSelectedFile];
    }, fn_updateFileContent);
    return () => {
      fn();
    };
  }, []);
  let n1 = {
    es5: "javascript",
    java: "java",
    groovy: "java",
    csharp: "csharp",
  };
  class Schemata {
    catalogName;
    schemaName;
    schemaOwner;
    /**
     * this is for ksdkf
     */
    defaultCharacterSetCatalog;
    defaultCharacterSetSchema;
    defaultCharacterSetName;
    sqlPath;
    defaultCollationName;
    remarks;
  }
  let mylangfinal = n1[lang] || lang;
  return (
    <div className="outputfolder">
      <div className="output-btmpanel">
        <HalfResizeForTwoHorizontal
          defaultLeftWidthValue={160}
          value={gstore.localSettings[resizekey]}
          onChg={(val) => {
            gstore.localSettings[resizekey] = val;
          }}
          rightClz="needleftborder"
          leftJsx={
            <ViewListWrapper
              icon={`document`}
              notext={`0 file(s)`}
              loading={loadingDatabase}
              list={myfileList}
              crt={crtSelectedFile}
              onChange={onCrtSelectedPath}
            />
          }
          rightJsx={
            <GEditor
              readOnly={true}
              noLoading={true}
              noAutoFocus={true}
              otherConfig={{
                callFuncName: "create",
                enableSplitViewResizing: true,
                originalEditable: true,
                readOnly: true,
                wordWrap: "off",
                followsCaret: true,
                ignoreCharChanges: true,
              }}
              id={crtStoreName + "id"}
              language={mylangfinal}
              key={crtStoreName + "id"}
              onRef={(editor) => {
                myref.current.editor = editor;
                myref.current.editor.getModel().setValue(msg_nodata);
                // initEditorByLeftOrRight({
                //   editor,
                //   direct: "left",
                // });
              }}
              style={{ width: "100%", height: "100%" }}
            ></GEditor>
          }
        ></HalfResizeForTwoHorizontal>
      </div>
      <div className="output-controlrow">
        <ButtonGroup>
          <GSyncSelectWithFilter
            obj={props.obj}
            list={props.list}
            index={props.index}
            whenChg={(x) => {
              props.obj[index] = x;
            }}
          ></GSyncSelectWithFilter>
          <Button
            small={true}
            onClick={async () => {
              let myval = props.obj[props.index];
              if (_.isNil(myval)) {
                await gutils.win_alert(`No selected folder to be opened`);
                return;
              }
              gutils.openFile(myval);
            }}
          >
            {t("Open Folder")}
          </Button>
          <Button
            small={true}
            onClick={() => {
              update_fn();
            }}
          >
            {t("Refresh")}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
});
