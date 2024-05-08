
// Date: Tue, 17 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
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
  TreeNode,
} from "@blueprintjs/core";
import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { Dot } from "../../utils/cTranslationUtils";
import moment from "moment";
import DateUtils from "../../utils/DateUtils";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import {
  MutationState,
  MutationSubState,
  QuerySubState,
} from "@reduxjs/toolkit/dist/query/core/apiState";
import gutils from "../../utils/GlobalUtils";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ContextMenu, Tree, TreeNodeInfo } from "@blueprintjs/core";
import { Example, ExampleProps } from "@blueprintjs/docs-theme";
import { TreeWrapInfo } from "../../types/constants";
import "./index.scss";
import DragElement from "../DragElement";

type EditorValueProp = {
  placeholder?: string;
  value: string;
  onChange: (newValue: string) => any;
  height: number;
};
type GenEditorProp = {
  placeholder?: string;
  title?: string | JSX.Element;
  editorVal: EditorValueProp;
};

let SimpleTextArea = (props: EditorValueProp) => {
  let thatHeight = props.height + "px";
  return (
    <TextArea
      spellCheck={false}
      className="gen-editor-textarea-simple"
      fill={true}
      intent={Intent.NONE}
      large={true}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(v) => {
        props.onChange && props.onChange(v.target.value);
      }}
      style={{
        fontSize: "13px",
        height: thatHeight,
        maxHeight: thatHeight,
        overflow: "auto",
      }}
    />
  );
};

export default (props: GenEditorProp) => {
  // state for isDragging
  let contentTextArea = (
    <SimpleTextArea
      height={props.editorVal.height}
      placeholder={props.placeholder}
      value={props.editorVal.value}
      onChange={props.editorVal.onChange}
    />
  );
  return (
    <div className="gen-editor">
      <div className="gen-editor-title">
        <div className="gen-editor-title-text">{props.title}</div>
        <div>
          <Tooltip
            content={Dot(
              "5Perd",
              "Sorry, the 'Use Smart Editor' function is not yet available. We are still working on implementing it. Thank you for your patience."
            )}
          >
            <ButtonGroup>
              <Button
                small
                disabled
                minimal
                text={Dot("coM2I", "Use Smart Editor")}
              />
            </ButtonGroup>
          </Tooltip>
        </div>
      </div>
      <DragElement className="gen-editor-textarea">
        {contentTextArea}
      </DragElement>
    </div>
  );
};
