
// Date: Sat, 7 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import localforage from "localforage";
import {
  Callout,
  PanelStack,
  ProgressBar,
  InputGroupProps,
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
import React, { useEffect, useState, useMemo } from "react";
import _ from "lodash";
import { Dot } from "../../utils/cTranslationUtils";

interface PasswordInputProps {
  strong?: boolean;
}
export default (props: PasswordInputProps & InputGroupProps & { value?: string }): any => {
  const [showPassword, onShowPassword] = useState(false);
  let [tmpValue, onTmpValue] = useState(props.value + '');
  const warnMsg = useMemo(() => {
    let password = tmpValue;
    if (_.isNil(password)) {
      return "";
    }
    if (password == "" || password.length < 6) {
      return Dot("MN2lT", "The length of Password cannot less than 6");
    }
    // if (!password.match(/[\d\W]/g) || !password.match(/[a-z]/g)) {
    //   return Dot(
    //     "RObhX",
    //     `Password cannot be simple, please include number, alphbet or symbol`
    //   );
    // }
    return "";
  }, [tmpValue]);

  const lockButton = (
    <Button
      small={props.small}
      icon={(showPassword ? "unlock" : "lock") as any}
      intent={
        props.strong && !_.isEmpty(warnMsg) ? Intent.WARNING : Intent.SUCCESS
      }
      minimal={true}
      onClick={() => {
        onShowPassword(showPassword ? false : true);
      }}
    />
  );
  return (
    <div>
      <InputGroup
        {...props}
        type={
          (props.type == "password"
            ? showPassword
              ? "text"
              : "password"
            : props.type) || "text"
        }
        rightElement={
          props.type == "password" ? lockButton : props.rightElement
        }
        onChange={(e) => {
          if (!_.isNil(e)) {
            onTmpValue(e.target.value);
          }
          if (props.onChange) {
            props.onChange(e);
          }
        }}
      />
      {props.strong && !_.isEmpty(warnMsg) ? <p>{warnMsg}</p> : ""}
    </div>
  );
};
