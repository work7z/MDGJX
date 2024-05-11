
// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// LafTools Team - Ubuntu <work7z@outlook.com>
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
    ButtonProps,
    Divider,
    Tree,
    TreeNodeInfo,
} from "@blueprintjs/core";
import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useParams } from "react-router";
import gutils from "../../utils/GlobalUtils";
import { ToolParamType } from "../../types/constants";
import TranslationUtils, { Dot } from "../../utils/cTranslationUtils";
import NewTabButton from "../../components/NewTabButton";

import AjaxUtils from "../../utils/AjaxUtils";
// import { ACTION_sendToolRequest } from "../../slice/toolSlice";
import exportUtils from "../../utils/ExportUtils";
import apiSlice from "../../reducers/apiSlice";
import { ExtensionVM } from '../../types/purejs-types-READ_ONLY'

import { Allotment, AllotmentHandle } from "allotment";
import SessionSlice, { SessionListItem, SessionMapAttr } from "../../reducers/container/sessionSlice";
import { FN_GetDispatch } from "../../nocycle";


export type SessionViewProp = {
    sessionId: string; // if null, then no session is selected
    sessionType: string
};



type PassProps = {
    defaultSessionId: string;
    defaultSessionList: SessionListItem[];
    defaultSessionMap: SessionMapAttr;
    sessionType: string;
    body: React.FunctionComponent<SessionViewProp>;
};


export default (props: PassProps) => {
    // exact
    let sessionType = props.sessionType
    let sessionMap = exportUtils.useSelector((state) => state.session.sessionTypeKVMap[sessionType]?.sessionMap)
    let activeSessionId = exportUtils.useSelector((state) => state.session.sessionTypeKVMap[sessionType]?.activeId)
    let sessionList = exportUtils.useSelector((state) => state.session.sessionTypeKVMap[sessionType]?.sessionList)
    let crtSessionList = sessionList
    let isCrtSessionEmpty = _.isEmpty(crtSessionList)
    if (sessionList == null || _.isEmpty(sessionList)) {
        sessionList = props.defaultSessionList;
    }
    if (activeSessionId == null) {
        activeSessionId = props.defaultSessionId;
    }
    let isOriginalSessionMapNil = sessionMap == null
    if (isOriginalSessionMapNil) {
        sessionMap = props.defaultSessionMap;
    }
    useEffect(() => {
        FN_GetDispatch()(
            SessionSlice.actions.updateDefaultSessionMap({
                sessionType: sessionType,
                item: {
                    sessionMap: props.defaultSessionMap,
                    activeId: props.defaultSessionId,
                }
            })
        )
    }, [isCrtSessionEmpty, _.size(sessionList), activeSessionId])
    // render
    let Body = props.body;
    let [hoverId, onHoverId] = useState<string | null>(null)
    let nodes: TreeNodeInfo[] = _.map(sessionList, x => {
        return {
            ...x,
            label: x.label + (x.id == activeSessionId ? "*" : "")
        }
    });
    // format
    let formattedNodes = useMemo(() => {
        return nodes.map(x => {
            x.isSelected = x.id == activeSessionId;
            x.secondaryLabel = x.id == hoverId ? <div className="whitespace-nowrap flex flex-row">
                {/* <Tooltip placement="bottom" content={Dot("4K_vhq", "Duplicate this tab")}> */}
                <Button
                    onClick={() => {
                        let newId = gutils.uuid()
                        let thisItem = _.find(sessionList, xx => xx.id == x.id)
                        if (thisItem && thisItem.id && newId) {
                            FN_GetDispatch()(
                                SessionSlice.actions.duplicateItem({
                                    currentList: sessionList || [],
                                    sessionType: sessionType,
                                    currId: x.id + "",
                                    newID: newId,
                                    newLabel: thisItem.label + " " + "(2" + ")"
                                })
                            )
                        }
                        // duplicate this tab and trigger dispatch
                        // FN_GetDispatch()(
                        //     SessionSlice.actions.updateSessionList({
                        //         sessionType: sessionType,
                        //         list: [
                        //             ...(sessionList || []),
                        //             {
                        //                 id: newId,
                        //                 label: x.label + " " + "(2)"
                        //             }
                        //         ]
                        //     })
                        // )
                    }} title={Dot("4K_vhq", "Duplicate this tab")} minimal small icon={"duplicate"}></Button>
                {/* </Tooltip> */}
                {/* <Tooltip placement="bottom" content={}> */}
                <Button
                    onClick={() => {
                        // remove this tab and trigger dispatch
                        FN_GetDispatch()(
                            SessionSlice.actions.updateSessionList({
                                sessionType: sessionType,
                                list: _.filter(sessionList || [], y => y.id != x.id)
                            })
                        )
                        FN_GetDispatch()(
                            SessionSlice.actions.updateActiveId({
                                sessionType: sessionType,
                                activeId: _.first(sessionList)?.id + ""
                            })
                        )
                    }}
                    minimal small icon={"trash"} title={Dot("U4qqq9", "Remove this tab from list")}></Button>
                {/* </Tooltip> */}
            </div> : null
            return x;
        })
    }, [nodes, hoverId])
    return (
        <Allotment className="flex flex-row">
            <Allotment.Pane preferredSize={180}>
                <Tree
                    className="laft-small-tree"
                    contents={formattedNodes}
                    onNodeMouseEnter={(x) => {
                        onHoverId(x.id + "")
                    }}
                    onNodeMouseLeave={(x) => {
                        onHoverId(null)
                    }}
                    onNodeClick={(x) => {
                        FN_GetDispatch()(
                            SessionSlice.actions.updateActiveId({ sessionType: sessionType, activeId: x.id + "" })
                        )
                    }}
                ></Tree>
                <NewTabButton onNewNameProvided={val => {
                    let newId = gutils.uuid()
                    FN_GetDispatch()(
                        SessionSlice.actions.updateSessionList({
                            sessionType: sessionType,
                            list: [
                                ...(sessionList || []),
                                {
                                    id: newId,
                                    label: val
                                }
                            ]
                        })
                    )
                    FN_GetDispatch()(
                        SessionSlice.actions.updateActiveId({
                            sessionType: sessionType,
                            activeId: newId
                        })
                    )
                }}></NewTabButton>
            </Allotment.Pane>
            <Allotment.Pane>
                <Body key={activeSessionId} sessionType={sessionType} sessionId={activeSessionId} />
            </Allotment.Pane>
        </Allotment>
    );
};
