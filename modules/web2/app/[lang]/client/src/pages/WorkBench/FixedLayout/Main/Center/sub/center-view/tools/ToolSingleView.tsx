// LafTools
// 
// Date: Sat, 9 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

'use client'

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
import {
    ColumnHeaderCell,
    Cell,
    Column,
    Table,
    Regions,
} from "@blueprintjs/table";
import {
    APPINFOJSON,
    FN_GetDispatch,
    delayFN,
    getAjaxResPayloadValue,
} from "../../../../../../../../nocycle";
import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../../../../../utils/GlobalUtils";
import { logutils } from "../../../../../../../../utils/LogUtils";
import _ from "lodash";
import RouteMem from "../../../../../../../../types/router-mem";
import statusSlice from "../../../../../../../../reducers/statusSlice";
import { useState, useContext, useCallback, useRef } from "react";
import {
    withRouter,
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect,
} from "react-router-dom";
import PageUtils from "../../../../../../../../utils/PageUtils";
import TranslationUtils, {
    Dot,
} from "../../../../../../../../utils/cTranslationUtils";
import "allotment/dist/style.css";
import exportUtils from "../../../../../../../../utils/ExportUtils";
import forgeSlice, {
    ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../../../../../../../../reducers/forgeSlice";
import {
    ID_FILES,
    ID_HISTORY as ID_MANUAL,
    ID_NOTES,
    ID_TOOLS,
    URL_WORKBENCH_WORKSPACE,
} from "../../../../../../../../types/constants";
import { type } from "jquery";
import apiSlice from "../../../../../../../../reducers/apiSlice";
import { VAL_CSS_TAB_TITLE_PANEL } from "../../../../../../../../types/workbench-types";
import { FunctionalMenu } from "../../../nav/functional";
import { SidebarMenu } from "../../../nav/sidebar/Biz_SidebarMenu";
import Biz_DrawerMenu from "../../../nav/control";
import layoutSlice from "../../../../../../../../reducers/layoutSlice";
import {
    FN_CLOSE_LTR_MENU,
    FN_SHOW_LTR_MENU,
} from "../../../nav/functional/panel-group/controls/FunctionalControls";
import GenCodeMirror from "../../../../../../../../components/GenCodeMirror";
import GenHorizontalTab, {
    EachTab,
} from "../../../../../../../../components/GenHorizontalTab";
import WorkspaceSlice from "../../../../../../../../reducers/workspaceSlice";
import { ClosableText } from "../../../../../../../../components/ClosableText";
import TextTransformer from "../Transformer";
import { CommonTransformerPassProp } from "../../../../../../../../types/workbench-types";
import {
    useMergeParamWithWorkSpace,
    useMergeParameter,
} from "../../../../../../../../types/workbench-hook";
import QueryUtils from "../../../../../../../../utils/QueryUtils";
// import { ExtensionVM } from "../../../../../../../types/purejs-types-READ_ONLY";
import UnknownPart from "../../../../../../../../containers/UnknownPart";
import { ExtensionVM } from "../../../../../../../../types/purejs-types-READ_ONLY";
import LoadingText from "../../../../../../../../components/LoadingText";
import { getSessionId } from "./ToolInnerImplView";


export type ToolSingleViewProps = {
    extId: string,
    needFullPageSupport?: boolean
}
export default (props: ToolSingleViewProps) => {
    let { needFullPageSupport = false } = props;
    let calcH = props.needFullPageSupport ? '100%' : `100%`// `calc(100% - ${VAL_CSS_TAB_TITLE_PANEL}px - 2px)`;
    let { extId } = props;
    let sessionId = getSessionId(extId);
    let val_ExtensionVM: ExtensionVM = {
        Layout: 'form'
    };

    let layoutMappings = {
        form: TextTransformer
    }
    let UnknownPartWrap = (p: CommonTransformerPassProp) => {
        return <UnknownPart {...p} reason={Dot("d-qPr", "Unknown layout: {0}", val_ExtensionVM.Layout)} />
    }
    let PickupPanel = layoutMappings[val_ExtensionVM.Layout || 'form'] || UnknownPartWrap
    let commonPassProp: Partial<CommonTransformerPassProp> = {
        extId: extId,
        extVM: val_ExtensionVM,
        sessionId: props.extId,
        inputBigTextId: extId + "-i",
        outputBigTextId: extId + "-o",
        needFullPageSupport
    };

    let finalPanel = <PickupPanel {...commonPassProp}></PickupPanel>;

    return (
        <div
            className="full-editor-p relative"
            style={{
                height: calcH,
                minHeight: '300px'
            }}
        >
            {finalPanel}
        </div>
    );
}