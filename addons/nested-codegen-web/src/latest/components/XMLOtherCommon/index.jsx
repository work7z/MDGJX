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
import xmlutils from "./xml.jsx";
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
      needBase64Btn={true}
      needUrlBtn={true}
      noTriggerWhenCall={true}
      beforeActionBtn={[
        {
          label: t("Convert to JSON"),
          onClick: async () => {
            gstore.common_app[crtStoreName].loading_beautify = true;
            try {
              // await gutils.sleep(1000);
              const leftValue = gstore.common_app[crtStoreName].model.leftValue;
              if (gutils.empty(leftValue)) {
              } else {
                let jsonobj =
                  xmlutils.xml2json.getStructJsonFromRawXml(leftValue);
                jsonobj =
                  CodeGenDefinition.xmlutils.flatternStructJsonToKV(jsonobj);
                let jsonstr = JSON.stringify(jsonobj, null, 2);
                gstore.common_app[crtStoreName].setRightValue(jsonstr);
              }
              gstore.common_app[crtStoreName].loading_beautify = false;
            } catch (error) {
              gstore.common_app[crtStoreName].loading_beautify = false;
            }
          },
          intent: "primary",
        },
        {
          label: t("Convert to JSON Structure"),
          onClick: async () => {
            gstore.common_app[crtStoreName].loading_beautify = true;
            try {
              // await gutils.sleep(1000);
              const leftValue = gstore.common_app[crtStoreName].model.leftValue;
              if (gutils.empty(leftValue)) {
              } else {
                let jsonobj =
                  xmlutils.xml2json.getStructJsonFromRawXml(leftValue);
                let jsonstr = JSON.stringify(jsonobj, null, 2);
                gstore.common_app[crtStoreName].setRightValue(jsonstr);
              }
              gstore.common_app[crtStoreName].loading_beautify = false;
            } catch (error) {
              gstore.common_app[crtStoreName].loading_beautify = false;
            }
          },
          intent: "primary",
        },
      ]}
      exampleStr={`
      <?xml version="1.0" encoding="UTF-8"?>
<!-- example xml string -->
<jaspic-providers 

  xmlns="http://tomcat.apache.org/xml"
                  
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xsi:schemaLocation="http://tomcat.apache.org/xml jaspic-providers.xsd"
                  version="1.0">


  <!-- No JASPIC providers configured by default -->
      </jaspic-providers>
      `}
      fn_format_func={async (obj) => {
        let myformattingres = await gutils.opt("/common/format_for_xml", {
          VALUE: obj.leftValue,
        });
        return myformattingres.content;
      }}
      crtStoreName={myconfig.storeName}
      language={"xml"}
      mytotalTitle={t("Transformation Tools for {0}", "XML")}
    />
  );
});
