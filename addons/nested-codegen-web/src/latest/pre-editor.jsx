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
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React from "react";
import ReactDOM from "react-dom";
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
import { autorun, reaction,observable  } from "mobx";

import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
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
import "./pre-initGroo.jsx";
import simpleExt from "./utils-simpleExt.jsx";
// const f=  (o)=>observable.box(o)
const f=  (o)=>o
// toolbar menus
class EditorStore {
   fn_menus_app = f((ctx) => {
    return [
      {
        label: t(`Current Version`),
        skip_msg: true,
        onClick: () => {
          gutils.win_alert(
            t(
              `You're using the powerful editor that's powered by CodeGen ToolBox official team! The current version is {0}, please kindly stay tuned for the following updates, its magic power is emerging stealthily.`,
              `v3.10.0-${Moment().format("YYYYMM")}`
            )
          );
        },
      },
      {
        label: t(`About Toolbar`),
        skip_msg: true,
        onClick: () => {
          gutils.win_alert(
            t(
              `By using this toolbar, you can convert and format the value of the editor into the target value that you prefer at any time, in addition, we will provide other useful features in the near future, for instance, a history timeline for every and each modification, auto collection for all text editors which can be maintained by you at the same time, etc... \n All in all, we will not make you disappointed, we do rely on your kind advice and encouragement, and thanks to your assistance, we are convinced firmly that CodeGen ToolBox is getting better and better.`
            )
          );
        },
      },
    ];
  });
   fn_menus_codec = f((ctx) => {
    let handleEncryptForMd5AndSha = async ({
      sha_type,
      md5_type,
      type,
      leftValue,
    }) => {
      let myformattingres = await gutils.opt("/common/digest_for_all", {
        TYPE: type,
        VALUE: leftValue,
        ACT: "escape",
        isFile: false,
        filePath: null,
        MODEL: {
          MD5TYPE: md5_type,
          SHATYPE: sha_type,
        },
      });
      ctx.validateCtn(myformattingres.content);
      return myformattingres.content.result;
    };
    return [
      {
        label: `MD5`,
        children: [
          {
            label: t(`Encrypt`),
            onClick: async () => {
              let leftValue = ctx.getValue();
              let rightValue = await handleEncryptForMd5AndSha({
                leftValue,
                type: "md5",
                md5_type: "md5",
              });
              ctx.setValue(rightValue);
            },
          },
        ],
      },
      {
        label: `MD2`,
        children: [
          {
            label: t(`Encrypt`),
            onClick: async () => {
              let leftValue = ctx.getValue();
              let rightValue = await handleEncryptForMd5AndSha({
                leftValue,
                type: "md5",
                md5_type: "md2",
              });
              ctx.setValue(rightValue);
            },
          },
        ],
      },
      {
        label: `SHA`,
        children: [
          {
            label: "SHA",
            preID: "sha",
          },
          {
            label: "SHA1",
            preID: "sha1",
          },
          {
            label: "SHA256",
            preID: "sha256",
          },
          {
            label: "SHA384",
            preID: "sha384",
          },
          {
            label: "SHA512",
            preID: "sha512",
          },
        ].map((x) => {
          return {
            label: x.label,
            onClick: async function () {
              let leftValue = ctx.getValue();
              let rightValue = await handleEncryptForMd5AndSha({
                leftValue,
                type: "sha",
                sha_type: x.preID,
              });
              ctx.setValue(rightValue);
            },
          };
        }),
      },
    ];
  });
   fn_menus_transform = f((ctx) => {
    return [
      {
        label: `Base64`,
        title: t(`Conversion Tools for {0} and {1}`, "Base64", "Base32"),
        children: [
          {
            label: t(`Encode`),
            onClick() {
              // simpleExt.getPUtils({});
              ctx.setValue(Base64.encode(ctx.getValue()));
            },
          },
          {
            label: t(`Decode`),
            onClick() {
              ctx.setValue(Base64.decode(ctx.getValue()));
            },
          },
          {
            label: `Base64 -> Hex`,
            onClick: async () => {
              let res = await simpleExt.monoApp.optAPI(`base64_to_hex`, {
                text: ctx.getValue(),
              });
              ctx.setValue(res.data.value);
            },
          },
          {
            label: `Base32`,
            children: [
              {
                label: t(`Encode`),
                onClick: async () => {
                  let res = await simpleExt.monoApp.optAPI(`base32_encode`, {
                    text: ctx.getValue(),
                  });
                  ctx.setValue(res.data.value);
                },
              },
              {
                label: t(`Decode`),
                onClick: async () => {
                  let res = await simpleExt.monoApp.optAPI(`base32_decode`, {
                    text: ctx.getValue(),
                  });
                  ctx.setValue(res.data.value);
                },
              },
            ],
          },
        ],
      },
      {
        label: `Hex`,
        title: t(`Conversion Tools for {0}`, `Hex`),
        children: [
          {
            label: t(`Encode`),
            onClick: async () => {
              let res = await simpleExt.monoApp.optAPI(`hex_encode`, {
                text: ctx.getValue(),
              });
              ctx.setValue(res.data.value);
            },
          },
          {
            label: t(`Decode`),
            onClick: async () => {
              let res = await simpleExt.monoApp.optAPI(`hex_decode`, {
                text: ctx.getValue(),
              });
              ctx.setValue(res.data.value);
            },
          },
          {
            label: `Hex -> Base64`,
            onClick: async () => {
              let res = await simpleExt.monoApp.optAPI(`hex_to_base64`, {
                text: ctx.getValue(),
              });
              ctx.setValue(res.data.value);
            },
          },
        ],
      },
      {
        label: `URL`,
        title: `${t(`Encode or Decode`)} HTTP URL`,
        children: [
          {
            label: t(`Encode URI`),
            onClick() {
              let leftValue = ctx.getValue();
              let rightValue = encodeURI(leftValue);
              ctx.setValue(rightValue);
            },
          },
          {
            label: t(`Decode URI`),
            onClick() {
              let leftValue = ctx.getValue();
              let rightValue = decodeURI(leftValue);
              ctx.setValue(rightValue);
            },
          },
          {
            label: t(`Encode URI Component`),
            onClick() {
              let leftValue = ctx.getValue();
              let rightValue = encodeURIComponent(leftValue);
              ctx.setValue(rightValue);
            },
          },
          {
            label: t(`Decode URI Component`),
            onClick() {
              let leftValue = ctx.getValue();
              let rightValue = decodeURIComponent(leftValue);
              ctx.setValue(rightValue);
            },
          },
        ],
      },
      {
        label: `HTML`,
        lang: "html",
        children: [
          {
            label: t(`Escape`),
            onClick: async () => {
              let leftValue = ctx.getValue();
              let res = await gutils.opt("/common/escape_or_unescape_value", {
                TYPE: `html`,
                VALUE: leftValue,
                ACT: "escape",
              });
              ctx.validateCtn(res);
              ctx.setValue(res.content.result);
            },
          },
          {
            label: t(`Unescape`),
            onClick: async () => {
              let leftValue = ctx.getValue();
              let res = await gutils.opt("/common/escape_or_unescape_value", {
                TYPE: `html`,
                VALUE: leftValue,
                ACT: "unescape",
              });
              ctx.validateCtn(res);
              ctx.setValue(res.content.result);
            },
          },
        ],
      },
      {
        label: `XML`,
        lang: "xml",
        children: [
          {
            label: t(`Escape`),
            onClick: async () => {
              let leftValue = ctx.getValue();
              let res = await gutils.opt("/common/escape_or_unescape_value", {
                TYPE: `xml`,
                VALUE: leftValue,
                ACT: "escape",
              });
              ctx.validateCtn(res);
              ctx.setValue(res.content.result);
            },
          },
          {
            label: t(`Unescape`),
            onClick: async () => {
              let leftValue = ctx.getValue();
              let res = await gutils.opt("/common/escape_or_unescape_value", {
                TYPE: `xml`,
                VALUE: leftValue,
                ACT: "unescape",
              });
              ctx.validateCtn(res);
              ctx.setValue(res.content.result);
            },
          },
        ],
      },
      {
        label: `Java/JS/JSON`,
        title: t(
          `It helps to escape multiple lines into one escaped line, or unescape from one escaped line to multiple lines. As for its purposes, you can use it when you need to convert these lines into one line that's embraced with two quote characters.`
        ),
        children: [
          {
            label: t(`Escape`),
            onClick: async () => {
              let leftValue = ctx.getValue();
              let res = await gutils.opt("/common/escape_or_unescape_value", {
                TYPE: `java2`,
                VALUE: leftValue,
                ACT: "escape",
              });
              ctx.validateCtn(res);
              ctx.setValue(res.content.result);
            },
          },
          {
            label: t(`Unescape`),
            onClick: async () => {
              let leftValue = ctx.getValue();
              let res = await gutils.opt("/common/escape_or_unescape_value", {
                TYPE: `java2`,
                VALUE: leftValue,
                ACT: "unescape",
              });
              ctx.validateCtn(res);
              ctx.setValue(res.content.result);
            },
          },
        ],
      },
    ];
  });
   fn_menus_formats = f((ctx) => {
    let ext_css_less_scss = (lang) => {
      return {
        parser: lang,
        plugins: [parserPostcss],
      };
    };
    return [
      {
        label: t(`Text`),
        crt_skip: true,
        children: [
          {
            label: t(`Trim it`),
            onClick() {
              ctx.setValue(_.trim(ctx.getValue() + ""));
            },
          },
          {
            label: t(`Uppercase all letters`),
            onClick() {
              ctx.setValue((ctx.getValue() + "").toUpperCase());
            },
          },
          {
            label: t(`Lowercase all letters`),
            onClick() {
              ctx.setValue((ctx.getValue() + "").toLowerCase());
            },
          },
          {
            label: t(`Take the first 16 letters`),
            onClick() {
              //
              ctx.setValue((ctx.getValue() + "").substring(0, 16));
            },
          },
        ],
      },
      {
        label: "SQL",
        lang: "sql",
        children: [
          {
            label: "MySQL",
            value: "mysql",
          },
          {
            label: "PostgreSQL",
            value: "postgresql",
          },
          {
            label: "Oracle",
            value: "oracle",
          },
          {
            label: "SQLServer",
            value: "sqlserver",
          },
          {
            label: "DB2",
            value: "db2",
          },
          {
            label: "H2",
            value: "h2",
          },
          {
            label: "Hive",
            value: "hive",
          },
        ].map((x) => {
          return {
            ...x,
          };
        }),
      },
      {
        label: "HTML",
        lang: "html",
      },
      {
        label: "XML",
        lang: "xml",
      },
      {
        label: "YAML",
        lang: "yaml",
        ext: {
          parser: "yaml",
          plugins: [parserYaml],
        },
      },
      {
        label: "CSS",
        lang: "css",
        ext: ext_css_less_scss("css"),
      },
      {
        label: "LESS",
        lang: "less",
        ext: ext_css_less_scss("less"),
      },
      {
        label: "SASS",
        lang: "scss",
        ext: ext_css_less_scss("scss"),
      },
      {
        label: "JSON",
        lang: "json",
      },
      {
        label: "MarkDown",
        lang: "markdown",
        ext: {
          parser: "markdown",
          plugins: [parserMarkdown],
        },
      },
      {
        label: "JavaScript",
        lang: "javascript",
        ext: {
          parser: "meriyah",
          plugins: [parserMeriyah],
        },
      },
      {
        label: "TypeScript",
        lang: "typescript",
        ext: {
          parser: "typescript",
          plugins: [parserTypescript],
        },
      },
      {
        label: "GraphQL",
        ext: {
          parser: "graphql",
          plugins: [parserGraphql],
        },
      },
    ].map((x, d, n) => {
      if (x.crt_skip) {
        return x;
      }
      if (x.lang == "sql") {
        return {
          label: x.label,
          children: _.map(x.children, (xx, dd, nn) => {
            let dbType = xx.value;
            return {
              label: xx.label,
              onClick: async () => {
                let leftValue = ctx.getValue();
                let myres = await gutils.opt("/common/format_for_sql", {
                  VALUE: leftValue,
                  DBTYPE: dbType,
                });
                ctx.validateCtn(myres.content);
                ctx.setValue(_.get(myres.content, "result"));
              },
            };
          }),
        };
      }
      return {
        label: x.label,
        onClick: async () => {
          let value = ctx.getValue();
          if (x.lang == "json") {
            let myres = await gutils.opt("/common/format_for_json", {
              VALUE: value,
            });
            ctx.validateCtn(myres.content);
            ctx.setValue(_.get(myres.content, "result"));
          } else if (x.lang == "xml") {
            let myres = await gutils.opt("/common/format_for_xml", {
              VALUE: value,
            });
            ctx.validateCtn(myres.content);
            ctx.setValue(_.get(myres.content, "result"));
          } else if (x.lang == "html") {
            let myres = await gutils.opt("/common/format_for_html", {
              VALUE: value,
            });
            ctx.validateCtn(myres.content);
            ctx.setValue(_.get(myres.content, "result"));
          } else {
            let mystr = prettier.format(value, x.ext);
            ctx.setValue(mystr);
          }
        },
      };
    });
  });
}
let ed_store = new EditorStore();
window.ed_store = ed_store;
