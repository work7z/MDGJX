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
import HalfResizeForTwoHorizontal from "../HalfResizeForTwoHorizontal";
import Blink from "../Blink/index";
import BeautifyCodeCommon from "../BeautifyCodeCommon";
import prettier from "prettier/esm/standalone.mjs";
import parserGraphql from "prettier/esm/parser-graphql.mjs";
import parserAngular from "prettier/esm/parser-angular.mjs";
import parserFlow from "prettier/esm/parser-flow.mjs";
import parserEspree from "prettier/esm/parser-espree.mjs";
import parserGlimmer from "prettier/esm/parser-glimmer.mjs";
import parserMarkdown from "prettier/esm/parser-markdown.mjs";
import parserPostcss from "prettier/esm/parser-postcss.mjs";
import parserTypescript from "prettier/esm/parser-typescript.mjs";
import parserYaml from "prettier/esm/parser-yaml.mjs";
import parserMeriyah from "prettier/esm/parser-meriyah.mjs";
import parserHtml from "prettier/esm/parser-html.mjs";
import xmlutils from "../XMLOtherCommon/xml.jsx";
import GSyncSelectWithFilter from "../GSyncSelectWithFilter";
import Html_select from "../html_select";

export default observer((props) => {
  const { myconfig } = props;
  let exampleStr = "";
  let myprettierConfig = null;
  let crtStoreName = myconfig.storeName;
  let all_other_lang = gutils.getAllLangList();
  return (
    <BeautifyCodeCommon
      noTriggerWhenCall={true}
      mainText={"Translate Text"}
      needUrlBtn={false}
      noSources={true}
      noOptions={false}
      noBeautifyBtn={true}
      needBase64Btn={false}
      beforeActionBtn={[
        {
          onClick: async () => {
            const isLogin = is_sign_in(); // !_.isNil(localStorage.getItem("USER_TOKEN"));

            if (!isLogin) {
              gstore.user.overlayForLogin.open = true;
              return;
            }

            gstore.common_app[crtStoreName].loading_beautify = true;
            try {
              let leftValue = gstore.common_app[crtStoreName].model.leftValue;
              if (gutils.empty(leftValue)) {
              } else {
                if (leftValue.length > 1900) {
                  leftValue = leftValue.substring(0, 1900);
                }
                let myres = await gutils.optCentreWithDeviceInfo(
                  "/trans/text-translate",
                  {
                    token: window.user_token(), // localStorage.getItem("USER_TOKEN"),
                    sourceLang:
                      gstore.common_app[crtStoreName].model["sourceLang"],
                    targetLang:
                      gstore.common_app[crtStoreName].model["targetLang"],
                    sourceText: leftValue,
                  }
                );
                gstore.common_app[crtStoreName].setRightValue(
                  myres.content.value
                );
              }
              gstore.common_app[crtStoreName].loading_beautify = false;
            } catch (error) {
              gstore.common_app[crtStoreName].loading_beautify = false;
              gutils.alert(gutils.getErrMsg(error));
            }
          },

          label: t("Translate Text"),
          intent: "primary",
        },
      ]}
      afterConfigItem={[
        {
          label: t("Source Language"),
          children: [
            {
              tag: Html_select,
              value: gstore.common_app[crtStoreName].model["sourceLang"],
              list: [
                {
                  label: t(`Auto`),
                  value: "auto",
                },
                ...all_other_lang,
              ],
              onChange: (x) => {
                gstore.common_app[crtStoreName].model.sourceLang =
                  x.target.value;
              },
            },
          ],
        },
        {
          label: t("Target Language"),
          children: [
            {
              tag: Html_select,
              value: gstore.common_app[crtStoreName].model["targetLang"],
              list: [...all_other_lang],
              onChange: (x) => {
                gstore.common_app[crtStoreName].model.targetLang =
                  x.target.value;
              },
            },
          ],
        },
      ]}
      exampleStr={`In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.`}
      fn_format_func={async (obj) => {
        let myformattingres = await gutils.opt("/common/format_for_json", {
          VALUE: obj.leftValue,
        });
        return myformattingres.content;
      }}
      crtStoreName={myconfig.storeName}
      language={"markdown"}
      needNetwork={true}
      rightLang={"markdown"}
      mytotalTitle={t("Text Translate")}
    />
  );
});
