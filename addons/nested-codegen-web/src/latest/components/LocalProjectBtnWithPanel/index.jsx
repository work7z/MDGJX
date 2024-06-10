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
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import gutils from "../../utils";
import { useState } from "react";

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
import _ from "lodash";

export default observer((props) => {
  const textSearchConfig = props.config;
  let mysize = _.size(textSearchConfig.scope_SpecifiedProjects);
  const MyTmpStore = useLocalStore(() => {
    return {
      //
      actualFolders: [],
    };
  });
  async function tmp_run_func() {
    let scope_SpecifiedProjects = textSearchConfig.scope_SpecifiedProjects;
    let relatedProjectsRes = await gutils.opt("/dg/getRelatedProjectByConfig", {
      config: textSearchConfig,
    });
    console.log("relatedProjectsRes", relatedProjectsRes);
    textSearchConfig.scope_factualFolderList = relatedProjectsRes.content;
  }
  useEffect(() => {
    let mf = reaction(
      () => {
        return {
          a: textSearchConfig.scope_SpecifiedProjects,
        };
      },
      () => {
        tmp_run_func();
      }
    );
    setTimeout(() => {
      tmp_run_func();
    });
    return () => {
      mf();
    };
  }, []);
  const [isOpenThat, onisOpenThat] = useState(false);
  return (
    <Popover
      ref={() => {
        gutils.once("ok", () => {
          tmp_run_func();
        });
      }}
      isOpen={isOpenThat}
      minimal={true}
      style={{ minWidth: "800px", height: "100%" }}
      popoverClassName={Classes.POPOVER_CONTENT_SIZING}
      portalClassName="myownclz"
      enforceFocus={true}
      onClose={() => {
        onisOpenThat(false);
      }}
      placement="center"
    >
      <Button
        outlined={true}
        small={true}
        onClick={() => {
          onisOpenThat(true);
        }}
      >
        {textSearchConfig.scope_UsingEntireProjects
          ? t("All Folders")
          : `${mysize} ${t(`Folder${mysize > 1 ? "s" : ""}`)}`}
      </Button>
      <div className="myentireprojects-box">
        <div>
          <FormGroup label={t("All Folders(Global)?")}>
            <GFormSwitch
              valtype="tf"
              value={textSearchConfig.scope_UsingEntireProjects + ""}
              onChange={(val) => {
                textSearchConfig.scope_UsingEntireProjects =
                  val == "true" ? true : false;
                if (textSearchConfig.scope_UsingEntireProjects) {
                  textSearchConfig.scope_SpecifiedProjects = {};
                }
                if (props.whenChg) {
                  props.whenChg();
                }
                tmp_run_func();
              }}
            ></GFormSwitch>
          </FormGroup>
        </div>
        {textSearchConfig.scope_UsingEntireProjects ? (
          ""
        ) : (
          <div>
            <FormGroup
              label={t("Select Folders")}
              helperText={t(
                `Selecting the folders that you will use, and please be noted one record can be able to represent multiple folders at the same time, CodeGen will calculate these actual folders and list them in the listing below.`
              )}
            >
              <div>
                <LocalProjectSelect
                  onClickOpenFolder={() => {
                    onisOpenThat(false);
                  }}
                  value={textSearchConfig.scope_SpecifiedProjects}
                  onChange={(val) => {
                    textSearchConfig.scope_SpecifiedProjects = val;
                    tmp_run_func();
                  }}
                  onSelect={() => {
                    if (props.whenChg) {
                      props.whenChg();
                    }
                    tmp_run_func();
                  }}
                />
              </div>
            </FormGroup>
          </div>
        )}
        <FormGroup
          label={t("Selected Results")}
          helperText={t(
            `The listings above will demonstrate the actual folders which is calculated from your options above.`
          )}
          style={{ marginBottom: "20px" }}
        >
          <ul>
            {_.map(textSearchConfig.scope_factualFolderList, (x, d, n) => {
              return <li key={d}>{x}</li>;
            })}
          </ul>
        </FormGroup>
      </div>
    </Popover>
  );
});
