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
import numberToWords from "number-to-words";
var converter = require("../../kits/src/index");
var converter_2 = converter;
let ok_label = () => {
  return {};
};

export default observer((props) => {
  const { myconfig } = props;
  let crtStoreName = myconfig.storeName;
  let mytotalTitle = "none";
  let exampleStrValue = ``;
  switch (crtStoreName) {
    case "caseAscii":
      mytotalTitle = "ASCII Text";
      exampleStrValue = `first content\nnum12345 - 12345\n\n[]<>*<div/>`;
      break;
    case "caseNumber":
      mytotalTitle = "Numeric Text";
      exampleStrValue = `100\n\n125801200\n\n101.13`;
      break;
    case "caseChinese":
      mytotalTitle = "Chinese Text";
      exampleStrValue = `这是简体字, 可以输出对应的繁体和拼音PINYIN等信息\n\n這是繁體字, 可以輸出對應的簡體和拼音PINYIN等信息`;
      break;
  }
  let callforFormatting = async () => {
    gstore.common_app[crtStoreName].loading_beautify = true;
    try {
      // await gutils.sleep(1000);
      // debugger;
      const leftValue = gstore.common_app[crtStoreName].model.leftValue;
      if (gutils.empty(leftValue)) {
        // debugger;
        // gstore.common_app[crtStoreName].setRightValue("");
      } else {
        let allArr = [`# ${t(`Convert Result`)}`, ``];
        let preSplitArr = _.chain(leftValue)
          .split("\n")
          .filter((x) => !_.isNil(x) && _.trim(x).length != 0)
          .value();
        if (crtStoreName == "caseChinese") {
          let waitHandleArr = _.chain(preSplitArr)
            .map((x) => {
              let crtLines = _.trim(x);
              return crtLines;
            })
            .value();
          for (let eachItem of waitHandleArr) {
            let { content } = await gutils.opt("/pub/get_chinese_converter", {
              DATA: eachItem,
            });
            allArr.push(`## ${_.truncate(eachItem, 30)}`);
            allArr.push(`+ ${`拼音首字母缩写`}:  ${content.PY_SX}`);
            allArr.push(`+ ${`带声调的拼音值`}:  ${content.PY}`);
            allArr.push(`+ ${`不带声调的拼音值`}:  ${content.PY_P}`);
            allArr.push(
              `+ ${`是否繁体字?`}:  ${content.IS_FT ? "繁体字" : "简体字"}`
            );
            allArr.push(`+ ${`转换对应简繁格式`}:  ${content.T_RESULT}`);
            allArr.push(``);
          }
        }
        if (crtStoreName == "caseAscii") {
          _.chain(preSplitArr)
            .map((x) => {
              let crtLines = x;
              allArr.push(`## ${_.truncate(crtLines, 30)}`);
              allArr.push(`+ ${`Length`}:  ${_.size(crtLines)}`);
              allArr.push(`+ ${`Upper All`}:  ${_.toUpper(crtLines)}`);
              allArr.push(
                `+ ${`Upper First`}:  ${_.chain(crtLines)
                  .split(/\s+/)
                  .map((x) => _.upperFirst(x))
                  .join(" ")
                  .value()}`
              );
              allArr.push(
                `+ ${`ASCII Code List`}:  ${_.chain(crtLines)
                  .split("")
                  .map((x) => x.charCodeAt())
                  .join(", ")
                  .thru((x) => `[${x}]`)
                  .value()}`
              );
              allArr.push(``);
            })
            .value();
        }
        if (crtStoreName == "caseNumber") {
          _.chain(preSplitArr)
            .map((x) => {
              let crtLines = _.trim(x);
              let type = null;
              let result = "";
              let is_parseable = true;
              // if(/[1-9]/g.test(crtLines)){
              //   type = 'From number to word'
              // }else{
              //   type = `From word to number`
              // }
              let en_ver = "";
              let zh_ver = "";
              let zh_t_ver = "";
              let zh_t_ver_BIG = "";
              try {
                let tval = numberToWords.toWords(crtLines);
                let idxquote = crtLines.indexOf(".");
                if (idxquote != -1) {
                  let matchSingle = [
                    "zero",
                    "one",
                    "two",
                    "three",
                    "four",
                    "five",
                    "six",
                    "seven",
                    "eight",
                    "nine",
                  ];
                  tval += " point ";
                  _.forEach(
                    _.split(_.trim(crtLines.substring(idxquote + 1)), ""),
                    (x, d, n) => {
                      tval += matchSingle[x] + " ";
                    }
                  );
                }
                en_ver = "\n\t" + tval + "\n\t" + _.toUpper(tval);
              } catch (e) {
                en_ver = `\n\tError: ${gutils.getErrMsg(e)}`;
              }
              window.m_converter = converter;
              try {
                let v1 = converter.toWords(crtLines, "s");
                zh_ver =
                  "\n\t" + v1 + "\n\t" + converter_2.toWords(crtLines, "t");
              } catch (e) {
                zh_ver = `\n\tError: ${gutils.getErrMsg(e)}`;
              }
              allArr.push(`## ${_.truncate(crtLines, 30)}`);
              allArr.push(`+ ${`English Words`}:  ${en_ver}`);
              allArr.push(`+ ${`Chinese Words`}:  ${zh_ver}`);
              allArr.push(``);
            })
            .value();
        }
        let jsonstr = allArr.join(`  \n`);
        gstore.common_app[crtStoreName].setRightValue(jsonstr);
      }
      gstore.common_app[crtStoreName].loading_beautify = false;
    } catch (error) {
      console.log("err", error);
      gstore.common_app[crtStoreName].loading_beautify = false;
      throw error;
    }
  };
  return (
    <BeautifyCodeCommon
      noBeautifyBtn={true}
      needBase64Btn={false}
      needUrlBtn={false}
      noTriggerWhenCall={false}
      fn_format_func={callforFormatting}
      lineWrapDft={false}
      beforeActionBtn={[
        {
          onClick: callforFormatting,
          text: t("Convert Case"),
          loadable: true,
          intent: "primary",
        },
      ]}
      exampleStr={exampleStrValue}
      crtStoreName={myconfig.storeName}
      language={"text"}
      rightLang={"markdown"}
      mytotalTitle={t(mytotalTitle)}
    />
  );
});
