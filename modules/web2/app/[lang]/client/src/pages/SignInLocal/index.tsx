// LafTools
// 
// Date: Sun, 7 Jan 2024
// Author: Ryan Laf <work7z@outlook.com>
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


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
import gutils from "../../utils/GlobalUtils";
import "./index.scss";
import { Dot } from "../../utils/cTranslationUtils";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { URL_WORKBENCH } from "../../types/constants";
import { WB_MenuBar } from "../WorkBench/FixedLayout/Main/Menu";
import SignInLocalContent from './SignInLocalContent.tsx'

export default () => {
  return (
    <div
      className="fixed-wb-p  3 "
      style={{
        overflow: "hidden",
      }}
    >
      <WB_MenuBar
        leftPart={
          <div
            className="inline-flex h-full absolute left-[50%]"
            style={{
              transform: "translateX(-50%)",
            }}
          >
            {Dot("WYCVL", "Quick Setup")}
          </div>
        }
      />
      <SignInLocalContent></SignInLocalContent>
    </div>
  );
};
