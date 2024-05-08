// LafTools
// 
// Date: Thu, 11 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
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
import { Allotment, AllotmentHandle } from "allotment";
import exportUtils from "../../../../../../../../utils/ExportUtils";
import forgeSlice, {
    ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../../../../../../../../reducers/forgeSlice";
import { ACTION_callRefreshAll } from "../../../../../../../../reducers/systemSlice";
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
import WorkspaceSlice, { WorkspaceStateKey } from "../../../../../../../../reducers/workspaceSlice";
import { ClosableText } from "../../../../../../../../components/ClosableText";
import TextTransformer from "../Transformer";
import { CommonTransformerPassProp } from "../../../../../../../../types/workbench-types";
import {
    useMergeParamWithWorkSpace,
    useMergeParameter,
} from "../../../../../../../../types/workbench-hook";
import EmptyToolMarks, { NavSubItem } from "./EmptyPlaceHolderView";


export default (props: {
    emptyTitle: string;
    workspaceKey: WorkspaceStateKey,
    workspaceImplView: (props: any) => JSX.Element,
    extraHelpers: NavSubItem[]
}) => {
    let { workspaceKey, workspaceImplView } = props;
    let s = exportUtils.useSelector((v) => {
        return {
            tabs: v.workspace[workspaceKey].tabs,
            tabId: v.workspace[workspaceKey].tabId,
        };
    });
    let dis = exportUtils.dispatch();
    let mp = useMergeParameter();
    let activeTab = _.find(s.tabs, (x) => x.id === s.tabId);
    PageUtils.useUpdateTitle(activeTab?.pageTitle || "", [
        activeTab?.pageTitle + "",
        s.tabId + "",
    ]);
    let hist = useHistory();
    let InnerImplView = workspaceImplView;
    if (s.tabs && s.tabs.length === 0) {
        return <EmptyToolMarks emptyTitle={props.emptyTitle} extraHelpers={props.extraHelpers}></EmptyToolMarks>;
    }
    return (
        <div className="icv w-full h-full">
            <GenHorizontalTab
                activeTab={activeTab?.id + ""}
                setNewTabs={(newtabs: EachTab[]) => {
                    dis(
                        WorkspaceSlice.actions.refreshTabList({
                            keyName: workspaceKey,
                            newTabs: newtabs,
                        })
                    );
                }}
                setActiveTab={(newVal) => {
                    dis(
                        WorkspaceSlice.actions.mergeTabPart({
                            name: workspaceKey,
                            value: {
                                tabId: newVal,
                            }
                        })
                    );
                }}
                tabs={s.tabs}
            ></GenHorizontalTab>
            <InnerImplView></InnerImplView>
        </div>
    );

}