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
  Tabs,
  Tab,
  Position,
  Toaster,
  Checkbox,
  NumericInput,
  FormGroup,
  HTMLSelect,
  Menu,
  MenuItem,
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
import { Select } from "@blueprintjs/select";
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
import { autorun, observable }  from 'mobx';
import gstore from "../../store.jsx";
import "./index.less";
import classNames from "classNames";
import {
  INTENT_PRIMARY,
  INTENT_SUCCESS,
} from "@blueprintjs/core/lib/esm/common/classes";
import DialogCommon from "../dialog_common";
import GTabCentreView from "../../components/GTabCentreView/index";
import GFormBoundView from "../../components/GFormBoundView/index";
import GSyncSelectWithFilter from "../../components/GSyncSelectWithFilter";
import DownloadStatus from "../../components/DownloadStatus";
import GFormInput from "../../components/GFormInput";
import GFormCheckbox from "../../components/GFormCheckbox";

export default observer(() => {
  // const [disableRight, onDisableRight] = useState(true);
  useEffect(() => {
    const stopRef = autorun(() => {
      const onDisableRight = (val) => {
        // gstore.databaseAllData.overlay_addNewFolder.confirmDisable = val;
        gstore.databaseAllData.addNewConnPageData.isAddModelPass = !val;
      };

      const addModelForFolder =
        gstore.databaseAllData.addNewConnPageData.addModelForFolder;
      const confirmDisable =
        gutils.anyEmpty([addModelForFolder.FOLDER_NAME]) ||
        gutils.anyMax([
          {
            value: addModelForFolder.FOLDER_NAME,
            max: 100,
          },
          {
            value: addModelForFolder.FOLDER_BRIEF,
            max: 480,
          },
        ]);
      // password is not mandatory
      // // console.log("checking disable", { confirmDisable, disableRight });
      // gutils.whenBlurFunc.push(() => {
      onDisableRight(confirmDisable);
      // });
    });
    return () => {
      stopRef();
    };
  }, []);
  // // console.log("rendering confirm disabled", disableRight);
  return (
    <div>
      <DialogCommon
        loading={gstore.databaseAllData.overlay_addNewFolder.loading}
        clzname="tiny-view addfolder-box"
        // confirmDisable={disableRight}
        confirm={() => {
          gutils.api.dblink.confirm_create_folder();
        }}
        style={{}}
        resize={true}
        noBackdrop={true}
        obj={gstore.databaseAllData.overlay_addNewFolder}
        pageData={gstore.databaseAllData.addNewConnPageData}
        jsx={(props) => (
          <div className="gform-addconn tiny-form-box">
            <GTabCentreView
              nobanner={true}
              viewObj={gstore.databaseAllData.addNewConnPageData}
              viewKey={"viewkey"}
              tab={[
                {
                  label: "Main",
                  id: "main",
                  jsx: () => {
                    return (
                      <div>
                        <GFormBoundView
                          label={t("The Folder Information")}
                          jsx={() => {
                            return (
                              <div>
                                <div className="full-one-box full-one-box-textarea">
                                  <FormGroup label={t("Name:")} inline={true}>
                                    <GFormInput
                                      small={true}
                                      placeholder={t("e.g. test folder")}
                                      value={
                                        gstore.databaseAllData
                                          .addNewConnPageData.addModelForFolder
                                          .FOLDER_NAME
                                      }
                                      onChangeDelay={(val) => {
                                        gstore.databaseAllData.addNewConnPageData.addModelForFolder.FOLDER_NAME =
                                          val;
                                      }}
                                    />
                                  </FormGroup>
                                </div>
                                <div className="full-one-box full-one-box-textarea">
                                  <FormGroup
                                    label={t("Remarks:")}
                                    inline={true}
                                  >
                                    <GFormInput
                                      type="textarea"
                                      small={true}
                                      placeholder={t(
                                        "e.g. the folder is used as a test folder"
                                      )}
                                      value={
                                        gstore.databaseAllData
                                          .addNewConnPageData.addModelForFolder
                                          .FOLDER_BRIEF
                                      }
                                      onChangeDelay={(val) => {
                                        gstore.databaseAllData.addNewConnPageData.addModelForFolder.FOLDER_BRIEF =
                                          val;
                                      }}
                                    />
                                  </FormGroup>
                                </div>
                              </div>
                            );
                          }}
                        />
                      </div>
                    );
                  },
                },
              ]}
            />
          </div>
        )}
      />
    </div>
  );
});
