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
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import _ from "lodash";

export default observer(({ VERSION, obj, DESCRIPTION, BLOG_CODE }) => {
  let langMapping = {
    en_US: _.get(obj, "DESCRIPTION"),
    zh_CN: _.get(obj, "DESCRIPTION_ZH_CN"),
    zh_HK: _.get(obj, "DESCRIPTION_ZH_HK"),
  };
  try {
    DESCRIPTION = _.get(langMapping, [getCrtLang()], DESCRIPTION);
  } catch (e) {
    console.log(e);
  }
  return (
    <div>
      <Callout
        style={{ marginBottom: "7px" }}
        title={t("Release Notes ({0})", `${obj.VERSION}`)}
        intent="primary"
        icon="helper-management"
      >
        {_.map(
          `[Current Version: ${
            obj.VERSION || BLOG_CODE
          }]\n${DESCRIPTION}`.split("\n"),
          (x, d, n) => {
            x = _.trim(x);
            if ((x || "").startsWith(`#`)) {
              return (
                <h5 style={{ margin: "5px 0" }} key={d + ""}>
                  {x}
                </h5>
              );
            }
            if (
              (x || "").startsWith(`[Previous Updates`) ||
              (x || "").startsWith(`[Current Version`)
            ) {
              let is_crt = x.indexOf(`Current`) != -1;
              x = x.replace(`Previous Updates`, t(`Historical Version`));
              x = x.replace(`Current Version`, t(`Current Version`));
              return (
                <h4
                  style={{
                    margin: "5px 0",
                    color: is_crt
                      ? `var(--app-text-purple)`
                      : `var(--app-text-green)`,
                    fontWeight: "bold",
                  }}
                  key={d + ""}
                >
                  {x}
                </h4>
              );
            }
            // return (
            //   <div key={d + ""} dangerouslySetInnerHTML={{ __html: x }}></div>
            // );
            return (
              <div style={{ fontSize: "12px" }} className="" key={d}>
                {x}
              </div>
            );
          }
        )}
        <div>
          {t("Read More")}:{" "}
          <a
            target="_blank"
            href={"https://codegen.cc/blogs/view?CODE=" + BLOG_CODE}
          >
            {t("Release Notes")}
          </a>
        </div>
      </Callout>
      <Callout
        style={{ marginBottom: "8px" }}
        intent={"success"}
        icon="history"
        title={t("Upgrade operation will not affect your data.")}
      >
        {t(
          `Don't worry, your data will not be involved in the upgrade operation. We just simply place the latest package file into the target folder and let CodeGen boot from there. Meanwhile, you can roll back CodeGen to the previous version whenever you like.`
        )}
      </Callout>
    </div>
  );
});
