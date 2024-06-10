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
// import parserJsx from "prettier/esm/parser-jsx.mjs";

// prettier.format("const     a = \n\n{}; \nclass N {}", {
//   parser: "meriyah",
//   plugins: [parserMeriyah],
// });

if (true) {
  window.prettier = prettier;
  window.parserGraphql = parserGraphql;
  window.parserAngular = parserAngular;
  window.parserFlow = parserFlow;
  window.parserEspree = parserEspree;
  window.parserGraphql = parserGraphql;
  window.parserGraphql = parserGraphql;
  window.parserMeriyah = parserMeriyah;
}

export default observer((props) => {
  const { myconfig } = props;
  let exampleStr = "";
  let myprettierConfig = null;
  let crtStoreName = myconfig.storeName;
  return (
    <BeautifyCodeCommon
      noTriggerWhenCall={true}
      needBase64Btn={true}
      needUrlBtn={true}
      beforeActionBtn={[
        {
          onClick: async () => {
            gstore.common_app[crtStoreName].loading_beautify = true;
            try {
              // await gutils.sleep(1000);
              const leftValue = gstore.common_app[crtStoreName].model.leftValue;
              if (gutils.empty(leftValue)) {
              } else {
                let myres = await gutils.opt("/common/format_for_json", {
                  VALUE: leftValue,
                });
                let myresctn = myres.content;
                if (!myresctn.isOk) {
                  throw new Error(myresctn.result);
                }
                let jsonobj = xmlutils.json2xml.getStructXmlFromRawJson(
                  JSON.parse(myresctn.result)
                );
                let ok = await gutils.opt("/common/format_for_xml", {
                  VALUE: jsonobj,
                });
                gstore.common_app[crtStoreName].setRightValue(
                  ok.content.result
                );
              }
              gstore.common_app[crtStoreName].loading_beautify = false;
            } catch (error) {
              gstore.common_app[crtStoreName].loading_beautify = false;
              gutils.alert(gutils.getErrMsg(error));
            }
          },
          loading: gstore.common_app[crtStoreName].loading_beautify,
          label: t("Convert to XML"),
          intent: "primary",
        },
        {
          loading: gstore.common_app[crtStoreName].loading_beautify,
          label: t(`JSON Compress`),
          intent: "primary",
          onClick: async function () {
            gstore.common_app[crtStoreName].loading_beautify = true;
            try {
              // await gutils.sleep(1000);
              const leftValue = gstore.common_app[crtStoreName].model.leftValue;
              if (gutils.empty(leftValue)) {
              } else {
                let ok = await gutils.opt("/common/json_compress", {
                  VALUE: leftValue,
                });
                gstore.common_app[crtStoreName].setRightValue(
                  ok.content.result
                );
              }
              gstore.common_app[crtStoreName].loading_beautify = false;
            } catch (error) {
              gstore.common_app[crtStoreName].loading_beautify = false;
              gutils.alert(gutils.getErrMsg(error));
            }
          },
        },
      ]}
      exampleStr={`
   {
     "test": 12345,
     a: {
       b: 123,
       c: [100,200,300]
     }
   }
      `}
      fn_format_func={async (obj) => {
        let myformattingres = await gutils.opt("/common/format_for_json", {
          VALUE: obj.leftValue,
        });
        return myformattingres.content;
      }}
      crtStoreName={myconfig.storeName}
      language={"json"}
      rightLang={"xml"}
      mytotalTitle={t("Transformation Tools for {0}", "JSON")}
    />
  );
});
