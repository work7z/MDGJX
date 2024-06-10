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
// import parserJsx from "prettier/esm/parser-jsx.mjs";

// prettier.format("const     a = \n\n{}; \nclass N {}", {
//   parser: "meriyah",
//   plugins: [parserMeriyah],
// });

if (true) {
  window.parserMarkdown = parserMarkdown;
  window.prettier = prettier;
  window.parserGraphql = parserGraphql;
  window.parserAngular = parserAngular;
  window.parserFlow = parserFlow;
  window.parserEspree = parserEspree;
  window.parserGraphql = parserGraphql;
  window.parserGraphql = parserGraphql;
  window.parserMeriyah = parserMeriyah;
  window.parserYaml = parserYaml;
}

export default observer((props) => {
  console.log("other common", props);
  const { myconfig } = props;
  let exampleStr = "";
  let myprettierConfig = null;
  let crtStoreName = myconfig.storeName;
  switch (myconfig.lang) {
    case "sql":
      exampleStr = `
      select 1;

          select * from information_schemas.tables;
      `;
      break;
    case "yaml":
      myprettierConfig = {
        parser: "yaml",
        plugins: [parserYaml],
      };
      exampleStr = `---         # Favorite movies
        - Casablanca
        - North by Northwest   
        - The Man Who Wasn't There`;
      break;
    case "markdown":
      myprettierConfig = {
        parser: "markdown",
        plugins: [parserMarkdown],
      };
      exampleStr = `# title
      ## second title     
          `;
      break;
    case "json":
      // myprettierConfig = {
      //   parser: "jsx",
      //   plugins: [parserJsx],
      // };
      exampleStr = `{

"test-value": 1234,
a: 12344,
b: {
  c: [1,2,3,4,5]
}

        }`;

      break;
    case "typescript":
      myprettierConfig = {
        parser: "typescript",
        plugins: [parserTypescript],
      };
      exampleStr = `
         type MappedTypeWithNewKeys<T> = {
     [K in keyof T as NewKeyType]: T[K]
   };
          `;

      break;
    case "javascript":
      myprettierConfig = {
        parser: "meriyah",
        plugins: [parserMeriyah],
      };
      exampleStr = `
  
      let a = {};
      class TestClz{

            trigger(){
return 'test content';
       
                }
      }
      

      let mystr = \`
      <html>
      
        <div   class='abcd'
        
        ></div>
      </html>
      \`
        `;
      // prettier.format("const     a = \n\n{}; \nclass N {}", {
      //   parser: "meriyah",
      //   plugins: [parserMeriyah],
      // });

      break;
    case "css":
    case "scss":
    case "less":
      myprettierConfig = {
        parser: myconfig.lang,
        plugins: [parserPostcss],
      };
      exampleStr = `
      /** width 100 percent definition */
          .w100{
                width: 100%;
          }
          /** height 100 percent  definition  */
              .h100{
            height: 100%;
          }
          `;
      break;
  }
  return (
    <BeautifyCodeCommon
      exampleStr={exampleStr}
      fn_format_func={async (obj) => {
        try {
          // if (obj.leftValue == "") {
          //   return;
          // }
          let mystr = "";
          if (myconfig.lang == "json") {
            // mystr = JSON.stringify(JSON.parse(obj.leftValue), null, 2);
            let myres = await gutils.opt("/common/format_for_json", {
              VALUE: obj.leftValue,
            });
            return myres.content;
          } else if (myconfig.lang == "sql") {
            // mystr = JSON.stringify(JSON.parse(obj.leftValue), null, 2);
            let myres = await gutils.opt("/common/format_for_sql", {
              VALUE: obj.leftValue,
              DBTYPE: gstore.common_app[crtStoreName].model.DBTYPE,
            });
            return myres.content;
          } else {
            mystr = prettier.format(obj.leftValue, myprettierConfig);
          }
          return {
            isOk: true,
            result: mystr,
          };
        } catch (err) {
          return {
            isOk: false,
            result: err.message || err,
          };
        }
      }}
      crtStoreName={myconfig.storeName}
      language={myconfig.lang == "typescript" ? "text" : myconfig.lang}
      mypagetitle={myconfig.lang == "sql" ? "SQL" : _.upperFirst(myconfig.lang)}
    />
  );
});
