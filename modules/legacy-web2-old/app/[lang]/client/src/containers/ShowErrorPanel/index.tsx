// LafTools
// 
// Date: Sat, 27 Jan 2024
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
    TreeNodeInfo,
} from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Dot } from "../../utils/cTranslationUtils";
import { loadDOT } from "../../reducers/systemSlice";
import exportUtils from "../../utils/ExportUtils";


export default (props: {
    loadError: string
}) => {

    useEffect(() => {
        loadDOT("showERROR")
    }, [])

    exportUtils.useLoadDotCountCpt()
    let { loadError } = props;
    return <div className=" w-full h-full native-style">
        <div className="w-full h-full  bg-blue-900 p-2">
            <div className="bg-blue-800 w-full h-full overflow-auto  rounded-lg p-8 shadow-lg space-y-4 text-white">
                {/* <FaBug className="text-red-500 w-16 h-16 mb-4" /> */}
                <h2 className="text-lg font-bold">{Dot("yt7kX2fPQ", "Caught an Unexpected Exception")}</h2>
                <p className="text-md">{loadError}</p>
                <hr className="border-t-2 border-gray-400 my-8" />
                <div className="text-sm">{Dot("NvOqE3B9Vxd", "Apologize for this runtime exception, below are the possible underlying causes")}:</div>
                <pre className="text-xs whitespace-pre-wrap break-all">
                    <ul className="list-item ">
                        <li>{Dot("hAH_IjzGN", "This is an insider version, this part is still under development.")}
                            <b>({'90%'})</b>
                        </li>
                        <li>{Dot("hGA96yTG4", "Some features are not supported in this platform. ")}</li>
                        <li>{Dot("BCySSDEKL", "There might be a compatibility issue with your current software version.")}</li>
                        <li>{Dot("LNvUuKmHR", "The application is missing essential dependencies or libraries.")}</li>
                        <li>{Dot("_-JigU2Fg", "An unexpected input or data format has caused the exception.")}</li>
                    </ul>
                </pre>
                <div className="text-sm">{Dot("NvOqE3B9Vxd", "And below are the possible solutions you could refer to")}:</div>
                <pre className="text-xs whitespace-pre-wrap break-all">
                    <ul className="list-item">
                        <li>{Dot("SETxuObyB", "Raise an Issue on GitHub for this error to let LafTools team investigate it further.")}</li>
                        <li>
                            {Dot("U5Eiy7ZRZ", "Send an email to LafTools team({0}) to report this error if it's related to sensitive information.", 'work7z@outlook.com')}
                        </li>
                    </ul>
                </pre>

            </div>
        </div>
    </div>
}