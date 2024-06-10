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
import GFormSelect from "../GFormSelect";
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
  console.log(crtStoreName);
  switch (crtStoreName) {
    case "encodeBase64":
    case "encodeUrl":
      return (
        <BeautifyCodeCommon
          noTriggerWhenCall={true}
          needBase64Btn={crtStoreName == "encodeBase64"}
          needUrlBtn={crtStoreName == "encodeUrl"}
          noBeautifyBtn={true}
          beforeActionBtn={[]}
          exampleStr={`this is test string`}
          fn_format_func={async (obj) => {
            let myformattingres = await gutils.opt("/common/format_for_json", {
              VALUE: obj.leftValue,
            });
            return myformattingres.content;
          }}
          crtStoreName={myconfig.storeName}
          language={"plain"}
          rightLang={"plain"}
          mytotalTitle={t(
            `Codec Tools for {0}`,
            crtStoreName == "encodeBase64" ? "Base64" : "URL"
          )}
        />
      );
      break;
    case "encryptRsa":
    case "encryptDes":
    case "encryptAes":
      break;
    case "encryptMd5":
    case "encryptSha":
      let isMd5StoreType = crtStoreName == "encryptMd5";
      let crtOptLogicType = _.toUpper(crtStoreName.replace("encrypt", ""));
      let calcFromValue = async (isFile = false, filePath = null) => {
        gstore.common_app[crtStoreName].loading_beautify = true;
        try {
          const leftValue = gstore.common_app[crtStoreName].model.leftValue;
          // debugger;
          let myformattingres = await gutils.opt("/common/digest_for_all", {
            TYPE: _.toLower(crtStoreName.replace("encrypt", "")),
            VALUE: leftValue,
            ACT: "escape",
            isFile: isFile,
            filePath: filePath,
            MODEL: {
              MD5TYPE: gstore.common_app[crtStoreName].model.MD5TYPE,
              SHATYPE: gstore.common_app[crtStoreName].model.SHATYPE,
            },
          });
          let rightvalue = myformattingres.content.result;
          gstore.common_app[crtStoreName].setRightValue(rightvalue);
          gstore.common_app[crtStoreName].loading_beautify = false;
        } catch (error) {
          gstore.common_app[crtStoreName].loading_beautify = false;
          gutils.alert(gutils.getErrMsg(error));
        }
      };
      return (
        <BeautifyCodeCommon
          noTriggerWhenCall={true}
          needBase64Btn={false}
          needUrlBtn={false}
          noBeautifyBtn={true}
          beforeActionBtn={[
            {
              label: t(crtOptLogicType + " from Value"),
              onClick: () => {
                calcFromValue();
              },
              loadable: true,
              intent: "primary",
            },
            {
              label: t(crtOptLogicType + " from File"),
              intent: "primary",
              onClick: () => {
                gutils.selectFile(async (val) => {
                  console.log("got file ", val);
                  if (!_.isNil(val)) {
                    console.log("got file ", val);
                    calcFromValue(true, val);
                  }
                });
              },
              loadable: true,
            },
          ]}
          userPanelJsx={
            isMd5StoreType
              ? [
                  {
                    label: t("Algorithm Type"),
                    children: [
                      {
                        tag: GFormSelect,
                        value: gstore.common_app[crtStoreName].model.MD5TYPE,
                        onChange: (e) => {
                          gstore.common_app[crtStoreName].model.MD5TYPE =
                            e.target.value;
                          gutils.defer(() => {
                            if (fn_beautifyActionCode) {
                              fn_beautifyActionCode();
                            }
                          });
                          // fn_beautifyActionCode();
                        },
                        list: [
                          {
                            label: "MD5",
                            value: "md5",
                          },
                          {
                            label: "MD2",
                            value: "md2",
                          },
                        ],
                      },
                    ],
                  },
                ]
              : [
                  {
                    label: t("Algorithm Type"),
                    children: [
                      {
                        tag: GFormSelect,
                        value: gstore.common_app[crtStoreName].model.SHATYPE,
                        onChange: (e) => {
                          gstore.common_app[crtStoreName].model.SHATYPE =
                            e.target.value;
                          gutils.defer(() => {
                            if (fn_beautifyActionCode) {
                              fn_beautifyActionCode();
                            }
                          });
                          // fn_beautifyActionCode();
                        },
                        list: [
                          {
                            label: "Sha",
                            value: "sha",
                          },
                          {
                            label: "Sha1",
                            value: "sha1",
                          },
                          {
                            label: "Sha256",
                            value: "sha256",
                          },
                          {
                            label: "Sha384",
                            value: "sha384",
                          },
                          {
                            label: "Sha512",
                            value: "sha512",
                          },
                        ],
                      },
                    ],
                  },
                ]
          }
          exampleStr={`this is test string`}
          fn_format_func={async (obj) => {
            await calcFromValue();
          }}
          stillUpdateWhenIpt={true}
          crtStoreName={myconfig.storeName}
          language={"plain"}
          rightLang={"plain"}
          mytotalTitle={t("Encrypt Tools for {0}", crtOptLogicType)}
        />
      );
      break;
    case "escapeXml":
    case "escapeHtml":
    case "escapeCsv":
    case "escapeJson":
    case "escapeJava":
    case "escapeJavascript":
      let multipleLine = `
      this is 
      line wrap content, and will wrap it as 
          one line
      `;
      let exampleObjMapping = {
        escapeXml: `<xml><test>this is test text</test></xml>`,
        escapeHtml: `<html>
          <head></head>
          <body>
            <h1>
              this is testing logic
            </h1>
          </body>
        </html>`,
        escapeJson: multipleLine,
        escapeJava: multipleLine,
        escapeJavascript: multipleLine,
        escapeCsv: `"dsdsdsd sdsd\t sds
        sdfs'sddfqw”dsd
        d`,
      };
      let exampleObjLangMapping = {
        escapeXml: ["xml", "xml", "XML"],
        escapeHtml: ["html", "html", "HTML"],
        escapeJson: ["plaintext", "plaintext", "JSON"],
        escapeJava: ["text", "java", "Java"],
        escapeJavascript: ["text", "javascript", "JavaScript"],
        escapeCsv: ["csv", "csv", "CSV"],
      };
      let mylang = exampleObjLangMapping[crtStoreName];
      return (
        <BeautifyCodeCommon
          noTriggerWhenCall={true}
          needBase64Btn={false}
          needUrlBtn={false}
          noBeautifyBtn={true}
          beforeActionBtn={[
            {
              intent: "primary",
              text: t("Escape"),
              onClick: async () => {
                gstore.common_app[crtStoreName].loading_beautify = true;
                try {
                  const leftValue =
                    gstore.common_app[crtStoreName].model.leftValue;
                  let myformattingres = await gutils.opt(
                    "/common/escape_or_unescape_value",
                    {
                      TYPE: _.toLower(crtStoreName.replace("escape", "")),
                      VALUE: leftValue,
                      ACT: "escape",
                    }
                  );
                  let rightvalue = myformattingres.content.result;
                  gstore.common_app[crtStoreName].loading_beautify = false;
                  gstore.common_app[crtStoreName].setRightValue(rightvalue);
                } catch (error) {
                  gstore.common_app[crtStoreName].loading_beautify = false;
                  gutils.alert(gutils.getErrMsg(error));
                }
                gstore.common_app[crtStoreName].loading_beautify = false;
              },
            },
            {
              loading: gstore.common_app[crtStoreName].loading_beautify,
              onClick: async () => {
                gstore.common_app[crtStoreName].loading_beautify = true;
                try {
                  const leftValue =
                    gstore.common_app[crtStoreName].model.leftValue;
                  let myformattingres = await gutils.opt(
                    "/common/escape_or_unescape_value",
                    {
                      TYPE: _.toLower(crtStoreName.replace("escape", "")),
                      VALUE: leftValue,
                      ACT: "unescape",
                    }
                  );
                  let rightvalue = myformattingres.content.result;
                  gstore.common_app[crtStoreName].loading_beautify = false;
                  gstore.common_app[crtStoreName].setRightValue(rightvalue);
                } catch (error) {
                  gstore.common_app[crtStoreName].loading_beautify = false;
                  gutils.alert(gutils.getErrMsg(error));
                }
              },
              text: t("UnEscape"),
              intent: "primary",
            },
          ]}
          exampleStr={exampleObjMapping[crtStoreName]}
          fn_format_func={async (obj) => {}}
          crtStoreName={myconfig.storeName}
          language={mylang[0]}
          rightLang={mylang[1]}
          mytotalTitle={t("Escape Tools for {0}", mylang[2])}
        />
      );
      break;
    default:
      return <div>not defined</div>;
  }
});
