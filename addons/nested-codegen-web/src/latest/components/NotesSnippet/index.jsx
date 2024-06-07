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
import {autorun, reaction, observable, observe } from 'mobx'
import gstore from "../../store.jsx";
import "./index.less";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import OperationPanel from "../OperationPanel";
import GEditor from "../GEditor";
import HalfResizeForTwoHorizontal from "../HalfResizeForTwoHorizontal";
import HalfResizeForTwo from "../HalfResizeForTwo";
import Blink from "../Blink/index";
import BeautifyCodeCommon from "../BeautifyCodeCommon";
import prettier from "prettier/esm/standalone.mjs";
import parserGraphql from "prettier/esm/parser-graphql.mjs";
import GFileSettingViewer from "../GFileSettingViewer/index";
import _ from "lodash";
import InternalLeftEditor from "../InternalLeftEditor";
import RightMainInternalPage from "../RightMainInternalPage";

window.prettier = prettier;
window.parserGraphql = parserGraphql;

export default observer((props) => {
  let crtStoreName = props.myconfig.storeName;
  // debugger;
  let language = "markdown";
  let folderkey = "CODE_SNIPPET_SAVE_FILEPATH";
  let mytotalTitle = `MarkDown`;
  let viewmode = "general";
  switch (crtStoreName) {
    case "notesVim":
      language = "text";
      mytotalTitle = `VIM`;
      folderkey = "CODE_SNIPPET_SAVE_FILEPATH_VIM";
      viewmode = "vim";
      break;
    case "notesEmacs":
      language = "text";
      mytotalTitle = `Emacs`;
      folderkey = "CODE_SNIPPET_SAVE_FILEPATH_EMACS";
      viewmode = "emacs";
      break;
  }
  let crtStore = gstore.common_app[crtStoreName];
  let model = crtStore.model;
  let attachments_files = model.attachments_files;
  let mypath = gutils
    .ipc()
    .joinPath(
      gutils.getSetting(folderkey),
      "tab-" + crtStore.hist.crtHistId + ""
    );
  console.log("mypath", mypath);
  async function multiFn(allfiles) {
    console.log(allfiles);
    if (_.size(allfiles) == 0) {
      return;
    }
    gutils.alert(t("Handling your actions for {0} files", _.size(allfiles)));
    if (allfiles != null) {
      for (let item of allfiles) {
        model.attachments_files.push({
          PATH: item,
        });
        await gutils.opt(`/dg/copyFileToDir`, {
          DEST_DIR: mypath,
          FILE: item,
        });
      }
    }
    gutils.alertOk("Added");
    saveModel();
  }
  let onDropFn = (ev) => {
    console.log("File(s) dropped");

    let allfiles = [];

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === "file") {
          var file = ev.dataTransfer.files[i].path;
          console.log("... file[" + i + "].name = " + file);
          allfiles.push(file);
        }
      }
    }
    multiFn(allfiles);
  };

  function saveModel() {
    gutils.api.common_app.common.saveModelById(crtStoreName);
  }

  return (
    <BeautifyCodeCommon
      viewmode={viewmode}
      noActions={true}
      noSources={true}
      noOptions={true}
      leftTopBtmPercent={0.4}
      rightMainGlobalJsx={observer((props) => {
        return (
          <RightMainInternalPage
            containerClz={"snippetcontainer"}
            btmTitle={"Attachments"}
            onDropFnForBtmJsx={onDropFn}
            rightTopBtmPercent={0.6}
            topJsxCtn={
              <InternalLeftEditor
                language={language}
                viewmode={viewmode}
                initEditorByLeftOrRight={props.initEditorByLeftOrRight}
                crtStoreName={crtStoreName}
              />
            }
            btmJsxCtn={
              <div style={{ padding: "3px" }} className="subitem-all-3px">
                {_.chain(attachments_files)
                  .map((x) => {
                    return <div key={x.PATH}>{x.PATH}</div>;
                  })
                  .value()}
                {_.isEmpty(attachments_files) ? (
                  <div>
                    {t(
                      `Attachment files is empty at present, support dragging files into this area to add files`
                    )}
                  </div>
                ) : (
                  ""
                )}
                <div style={{ textAlign: "right" }}>
                  <ButtonGroup>
                    <Button
                      outlined={true}
                      small={true}
                      onClick={() => {
                        gutils.selectFileForMulti(multiFn);
                      }}
                      intent={"primary"}
                    >
                      {t(`Add Files`)}
                    </Button>
                    <Button
                      outlined={true}
                      onClick={() => {
                        gutils.ipc().mkdirDir(mypath);
                        gutils.openDir(mypath);
                      }}
                      small={true}
                      intent={"success"}
                    >
                      {t(`Show Folder`)}
                    </Button>
                    <Button
                      outlined={true}
                      small={true}
                      intent={"danger"}
                      onClick={async () => {
                        let b = await gutils.win_confirm(
                          t(
                            "Do you want to empty this folder? The path is {0}",
                            mypath
                          )
                        );
                        if (!b) {
                          return;
                        }
                        await gutils.opt("/dg/cleanfile", {
                          DIR: mypath,
                        });
                        model.attachments_files = [];
                        saveModel();
                      }}
                    >
                      {t(`Clean All`)}
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            }
          />
        );
      })}
      crtStoreName={crtStoreName}
      mytotalTitle={t(mytotalTitle)}
      leadingActionJsx={[<GFileSettingViewer folderkey={folderkey} />]}
    />
  );
});
