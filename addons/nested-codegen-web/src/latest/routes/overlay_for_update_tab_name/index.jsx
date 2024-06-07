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
  let key_for_overylay = "overlay_updateTabInfo";
  // const [disableRight, onDisableRight] = useState(true);
  useEffect(() => {
    const stopRef = autorun(() => {
      const onDisableRight = (val) => {
        gstore.databaseAllData.tabInfoPageData.isAddModelPass = !val;
      };

      const addModelForFolder = gstore.databaseAllData.tabInfoPageData.addModel;
      const confirmDisable =
        gutils.anyEmpty([addModelForFolder.TAB_NAME]) ||
        gutils.anyMax([
          {
            value: addModelForFolder.TAB_NAME,
            max: 60,
          },
        ]);
      onDisableRight(confirmDisable);
    });
    return () => {
      stopRef();
    };
  }, []);
  return (
    <div>
      <DialogCommon
        loading={gstore.databaseAllData[key_for_overylay].loading}
        clzname="tiny-view addfolder-box"
        confirm={() => {
          window.update_for_tab_item();
        }}
        style={{}}
        resize={true}
        noBackdrop={true}
        obj={gstore.databaseAllData.overlay_updateTabInfo}
        pageData={gstore.databaseAllData.tabInfoPageData}
        jsx={(props) => (
          <div className="gform-addconn tiny-form-box">
            <div>
              <GFormBoundView
                label={t("Current Tab Detail")}
                jsx={() => {
                  return (
                    <div>
                      <div className="full-one-box full-one-box-textarea">
                        <FormGroup label={t("Name:")} inline={true}>
                          <GFormInput
                            small={true}
                            placeholder={t("e.g. tab-10")}
                            value={
                              gstore.databaseAllData.tabInfoPageData.addModel
                                .TAB_NAME
                            }
                            onChangeDelay={(val) => {
                              gstore.databaseAllData.tabInfoPageData.addModel.TAB_NAME =
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
          </div>
        )}
      />
    </div>
  );
});
