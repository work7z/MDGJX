// LafTools
// 
// Date: Sat, 18 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import localforage from "localforage";
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
} from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./index.scss";
import { Dot } from "../../utils/cTranslationUtils";
import AlertUtils from "../../utils/AlertUtils";

interface PassProp {
  onNewNameProvided: (str: string) => any
}
export default (props: PassProp): any => {
  let { onNewNameProvided } = props;
  // state, isNewMode 
  let [newMode, onNewMode] = useState<boolean>(false)
  let [tagName, onTagName] = useState<string>(Dot("7x3f6", "Tab - 1"))
  let edgeClz = " mt-2 "
  if (newMode) {
    let fn_confirm = () => {
      if (tagName.length == 0) {
        AlertUtils.popError(new Error(Dot("Vaf2y", "Tab name could not be blank.")))
        return
      }
      onNewMode(false)
      onNewNameProvided(tagName)
    }
    let fn_cancel = () => {
      onNewMode(false)
    }
    return <div>
      <InputGroup
        value={tagName}
        onChange={(e) => {
          onTagName(e.target.value)
        }}
        small
        onKeyDown={e => {
          // when e == enter
          if (e.keyCode == 13) {
            fn_confirm()
          }
          // when e == ese
          if (e.keyCode == 27) {
            fn_cancel()
          }
        }}
        className={edgeClz + " "}
        rightElement={<ButtonGroup className="flex absolute right-0 top-0">
          <Button small icon="small-tick"
            onClick={fn_confirm}
          ></Button>
          <Button small icon="small-cross" onClick={fn_cancel}></Button>
        </ButtonGroup>}
        // fill 
        placeholder={Dot("FDlRI", "Name this new tab and click to confirm it.")}></InputGroup>
    </div>
  }
  return <Button fill text={Dot("bT4R6", "New Tab")} onClick={() => {
    onNewMode(true)
  }} intent="none" icon="add" small minimal className={edgeClz + " laft-secondary-btn"}>
  </Button>
};
