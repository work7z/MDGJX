
// Date: Sat, 21 Oct 2023
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
} from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import gutils from "../../utils/GlobalUtils";

interface PassProp {
  className: string;
  children: any;
}
export default (props: PassProp): any => {
  const [draging, onDrag] = useState(false);
  return (
    <div
      className={[
        props.className,
        draging && false ? " g-drag-wrap " : "",
      ].join(" ")}
      draggable
      onDragEnter={(e) => {
        onDrag(true);
      }}
      onDrop={(e) => {
        onDrag(true);
        e.preventDefault();
        // get files and alert first file name
        gutils.ExposureIt("ondrag_e", e, true);
        console.log(e.dataTransfer.files[0].name);
        alert(e.dataTransfer.files[0].name);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onMouseEnter={(e) => { }}
      onMouseLeave={(e) => {
        if (draging) {
          onDrag(false);
        }
      }}
      style={{
        position: "relative",
      }}
    >
      {draging ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#00a496",
            position: "absolute",
            opacity: 0.1,
          }}
        ></div>
      ) : (
        ""
      )}

      {props.children}
    </div>
  );
};
