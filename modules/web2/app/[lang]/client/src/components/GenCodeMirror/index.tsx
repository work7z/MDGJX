
// Date: Thu, 16 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import localforage from "localforage";
import _ from 'lodash'
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
  MenuItem,
  Radio,
  ButtonGroup,
  TextArea,
  HotkeysProvider,
  Intent,
  Position,
  Toaster,
  Checkbox,
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
  Icon,
  Card,
  Elevation,
  Button,
  TreeNode,
} from "@blueprintjs/core";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./index.scss";
import CodeMirror from "@uiw/react-codemirror";
import exportUtils from "../../utils/ExportUtils";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { javascript, jsxLanguage } from "@codemirror/lang-javascript";
import { FN_GetDispatch } from "../../nocycle";
import { FN_GetActualTextValueByBigTextId, FN_SetTextValueFromInsideByBigTextId___DONOTUSEIT__EXTERNALLY } from "../../actions/bigtext_action";
import { go } from '@codemirror/legacy-modes/mode/go';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { json, jsonld } from '@codemirror/legacy-modes/mode/javascript';
import { css, sCSS, less } from '@codemirror/legacy-modes/mode/css';
import { html } from '@codemirror/legacy-modes/mode/xml';
import { python } from '@codemirror/legacy-modes/mode/python';
import { ruby } from '@codemirror/legacy-modes/mode/ruby';
// import { sql } from '@codemirror/legacy-modes/mode/sql';
import { xml } from '@codemirror/legacy-modes/mode/xml';
import { yaml } from '@codemirror/legacy-modes/mode/yaml';
import { c, cpp, csharp } from '@codemirror/legacy-modes/mode/clike';

import { StreamLanguage } from '@codemirror/language';


import { EditorView } from "codemirror"
import { IconName } from "@blueprintjs/icons";
import { CSS_NAV_BP_TAB_HEIGHT, VAL_CSS_TAB_TITLE_PANEL, border_clz_common } from "../../types/styles";
import { useTheme } from "@/app/__CORE__/components/LightDarkButton/theme";
// import { langs, langNames, loadLanguage } from '@uiw/codemirror-extensions-langs';
// console.log('langNames', langs.mysql())

type GenCodeMirrorProp = {
  title?: string;
  icon?: IconName;
  readOnly?: boolean;
  bigTextId: string;
  lineWrap?: boolean;
  language?: string;
  directValue?: string;
  placeholder?: string;
  onTextChange?: (newText: string) => any
};
const langMap = {
  javascript: () => javascript({ jsx: true }),
  typescript: () => javascript({ jsx: true }),
  shell: () => StreamLanguage.define(shell),
  css: () => StreamLanguage.define(css),
  html: () => StreamLanguage.define(html),
  json: () => StreamLanguage.define(json),
  jsonld: () => StreamLanguage.define(jsonld),
  python: () => StreamLanguage.define(python),
  ruby: () => StreamLanguage.define(ruby),
  xml: () => StreamLanguage.define(xml),
  yaml: () => StreamLanguage.define(yaml),
  c: () => StreamLanguage.define(c),
  cpp: () => StreamLanguage.define(cpp),
  csharp: () => StreamLanguage.define(csharp),
  go: () => StreamLanguage.define(go),
}
export let useForgeObj = () => {
  let { theme } = useTheme()
  let forgeObj = {
    dark: theme == "dark"
  }
  return forgeObj
}
export default (props: GenCodeMirrorProp) => {
  let hasTitle = props.title;
  let forgeObj = useForgeObj()
  // exportUtils.useSelector((val) => ({
  //   dark: val.forge.DarkThemeMode,
  // }));
  let bigTextId = props.bigTextId;
  let mRef = useRef({
    renderCtn: 0,
    lastSelectResult: null,
  });
  mRef.current.renderCtn++;
  let verObj = exportUtils.useSelector((val) => {
    let valueVer = val.bigtext.textKVStatusMap[bigTextId]?.outsideUpdateVer;
    if (_.isNil(valueVer)) {
      valueVer = 1;
    }
    return {
      ver: valueVer,
    };
  });
  let bt_raw = exportUtils.useSelector((val) => {
    let crt = mRef.current;
    let m = val.bigtext.textKVStatusMap[bigTextId];
    let finalText = m?.value || "";
    if (!_.isNil(m?.internalValue)) {
      finalText = m?.internalValue || '';
    }
    return {
      bigText: finalText,
    };
  });


  let bt = useMemo(() => {
    return bt_raw;
  }, [verObj.ver]);
  let propRef = React.useRef<{
    fn_onTextChange?: (newText: string) => any
  }>({
    fn_onTextChange: props.onTextChange
  })
  useEffect(() => {
    propRef.current.fn_onTextChange = props.onTextChange
  }, [props.onTextChange])
  useEffect(() => {
    if (verObj.ver != 1) {
      let actualText = FN_GetActualTextValueByBigTextId(bigTextId)
      console.log("onTextChange :", bt.bigText, bt_raw)
      propRef.current.fn_onTextChange && propRef.current.fn_onTextChange(actualText)
    }
  }, [verObj.ver])
  let value: string = props.directValue || bt.bigText;
  let isEmpty = !(value && value != '')
  let setValue = (val: string) => {

    FN_GetDispatch()(FN_SetTextValueFromInsideByBigTextId___DONOTUSEIT__EXTERNALLY(bigTextId, val));
  };
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setValue(val);
    propRef.current.fn_onTextChange && propRef.current.fn_onTextChange(val)
  }, []);
  let [clicked, setClicked] = useState(false)
  let targetLanguage = props.language
  if (!targetLanguage || (
    targetLanguage != 'text' && !langMap[targetLanguage]
  )) {
    targetLanguage = 'javascript'
  }
  let langPack = targetLanguage && langMap[targetLanguage] ? (langMap[targetLanguage])() : null
  console.log('codemirror:' + forgeObj.dark)
  return <div onBlur={() => {
    setClicked(false)
  }} onFocus={() => {
    setClicked(true)
  }} className="w-full h-full flex flex-col " key={forgeObj.dark ? '5t-F8No32' : 'JB-RC462J  '} style={{

  }}>
    <div className={border_clz_common + " border-b-[1px] using-edge-ui-bg flex justify-center items-center text-xs "} style={{
      height: VAL_CSS_TAB_TITLE_PANEL,
    }}>
      <span className="space-x-2">
        {props.icon ? <Icon size={12} icon={props.icon} /> : ''}
        <span>
          {props.title}
        </span>
      </span>
    </div>
    <div className={
      'flex-1  scrollbar-hide  ' + (
        !clicked ? ' editor-noscroll ' : '  overflow-auto '
      )
    } style={{
      height: `calc(100% - ${VAL_CSS_TAB_TITLE_PANEL}px)`,
    }}>
      <CodeMirror

        key={verObj.ver + ' ' + forgeObj.dark}
        onChange={(val) => {
          onChange(val, true);
        }}
        placeholder={props.placeholder}
        minHeight="100%"
        style={{
          height: "100%",
        }}
        readOnly={props.readOnly}
        height="100%"
        value={value}
        basicSetup={{
          foldGutter: true,
          highlightActiveLineGutter: true
        }}
        extensions={[
          langPack,
          props.lineWrap ? EditorView.lineWrapping : null
        ].filter(x => x != null) as any}
        theme={forgeObj.dark ? githubDark : githubLight}
      />
    </div>
  </div>;
};
