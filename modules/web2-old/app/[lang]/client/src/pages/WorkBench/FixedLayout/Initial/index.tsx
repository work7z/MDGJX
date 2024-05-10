
// Date: Sat, 25 Nov 2023
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
  Popover,
  Menu,
  MenuDivider,
} from "@blueprintjs/core";
import { WB_MenuBar } from "../Main/Menu";
import { Dot } from "../../../../utils/cTranslationUtils";
import MainPreSetup from "./Setup";

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
            {/* - Empowering Your Creativity */}
            {/* {Dotxx("nJAX6", "Welcome to {0}", Dot("CVUl0", "LafTools"))} */}
            {Dot("XQxJB", "My Workspaces")}
          </div>
        }
      />
      <MainPreSetup></MainPreSetup>
    </div>
  );
};
