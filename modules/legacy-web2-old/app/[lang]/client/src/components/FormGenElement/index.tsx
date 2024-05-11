// LafTools
// 
// Date: Thu, 28 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
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
    FormGroupProps,
    InputGroupProps,
    Switch,
} from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { LabelValuePair } from "../../types/constants";
import { Dot } from "../../utils/cTranslationUtils";
import FormSwitch from "../FormSwitch";

export type FormGenType = {
    type: "select" | "input" | "radio" | "switch" | "jsx";
    jsxEle?: JSX.Element;
    inputProps?: InputGroupProps;
    selectList?: LabelValuePair[]
    value?: string;
    onChange?: (str: string) => any
}
export default (props: { label?: string, config: FormGenType }) => {
    let { config } = props;
    if (config.type == "input") {
        return <InputGroup {...config.inputProps}></InputGroup>
    }
    if (config.type == "select") {
        return <HTMLSelect value={config.value} onChange={x => {
            config.onChange && config.onChange(x.target.value)
        }} options={config.selectList}></HTMLSelect>
    }
    if (config.type == "jsx") {
        return config.jsxEle || <div>not yet defined</div>
    }
    if (config.type == "switch") {
        let chk = (config.value || 'false') == 'true'
        return (
            <Checkbox checked={chk} onChange={x => {
                // config.onChange
                config.onChange && config.onChange(!chk ? 'true' : 'false')
            }}>
                {props.label || 'N/A'}
            </Checkbox>
        )
    }
    return <div>not yet defined</div>
}