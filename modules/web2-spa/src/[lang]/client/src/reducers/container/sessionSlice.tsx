// LafTools
// 
// Date: Fri, 22 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import SyncStateUtils from "../../utils/SyncStateUtils";
import { TreeNodeInfo } from "@blueprintjs/core";
import _ from "lodash";

export type TranslationSessionMapAttr = {
    T_SourceLang: string
    T_TargetLang: string
}

export type TerminalSessionMapAttr = {
    TM_FontSize: number;
}
// attrName to attrValue, here we can save their settings, session val, etc...    
export type SessionAttr = Partial<
    TranslationSessionMapAttr
    &
    TerminalSessionMapAttr
>
export type SessionMapAttr = {
    [key: string]: SessionAttr
}


export type SessionListItem = TreeNodeInfo
type SessionEntireMapItem = Partial<{ // like text translator, md5, md2, etc...
    activeId: string;
    sessionList: SessionListItem[], // session-1, session-2
    sessionMap: SessionMapAttr
}>
type SessionEntireMap = {
    [sessionType: string]: SessionEntireMapItem;
}
type SessionState = {
    sessionTypeKVMap: SessionEntireMap
};

const initialState: SessionState = {
    sessionTypeKVMap: {
        translation: {

        }
    }
};


const SessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        ...SyncStateUtils.getSyncStateReducers("session", {
            RunOnInit: true,
            RequireUserId: true,
            RequireWorkspaceId: true,
            SyncLocationOnParameter: "session"
        }),
        // update list by sessionType and SessionListItem[]
        updateSessionList: (state, action: PayloadAction<{ sessionType: string, list: SessionListItem[] }>) => {
            const { sessionType, list } = action.payload;
            if (!state.sessionTypeKVMap[sessionType]) {
                state.sessionTypeKVMap[sessionType] = {}
            }
            state.sessionTypeKVMap[sessionType].sessionList = list;
        },
        // update activeId by sessionType
        updateActiveId: (state, action: PayloadAction<{ sessionType: string, activeId: string }>) => {
            const { sessionType, activeId } = action.payload;
            if (!state.sessionTypeKVMap[sessionType]) {
                state.sessionTypeKVMap[sessionType] = {}
            }
            state.sessionTypeKVMap[sessionType].activeId = activeId;
        },
        // update sessionMap by sessionType
        updateSessionMapByAttrKey: (state, action: PayloadAction<{
            sessionType: string, sessionMapKey: string, sessionMapValue: SessionAttr
        }>) => {
            const { sessionType, sessionMapKey, sessionMapValue } = action.payload;
            if (state.sessionTypeKVMap[sessionType]
                && state.sessionTypeKVMap[sessionType].sessionMap
            ) {
                let sessionMap = state.sessionTypeKVMap[sessionType].sessionMap
                if (!sessionMap) {
                    sessionMap = {}
                }
                sessionMap[sessionMapKey] = sessionMapValue
                state.sessionTypeKVMap[sessionType].sessionMap = sessionMap;
            }
        },
        // make default value for sessionMap
        updateDefaultSessionMap: (state,
            action: PayloadAction<{ sessionType: string, item: SessionEntireMapItem }>) => {
            const { sessionType, item } = action.payload;
            if (!state.sessionTypeKVMap[sessionType]) {
                state.sessionTypeKVMap[sessionType] = {}
            }
            let crtObj = state.sessionTypeKVMap[sessionType]
            if (!crtObj.activeId) {
                crtObj.activeId = item.activeId;
            }
            if (!crtObj.sessionList) {
                crtObj.sessionList = item.sessionList
            }
            let activeIdIdx = _.findIndex(crtObj.sessionList, x => x.id == crtObj.activeId)
            if (activeIdIdx == -1) {
                let b = _.first(crtObj.sessionList)?.id
                if (b) {
                    crtObj.activeId = b + ""
                }
            }
            if (!crtObj.sessionMap) {
                crtObj.sessionMap = {}
            }
            _.forEach(item.sessionMap, (v, k) => {
                if (crtObj.sessionMap && !crtObj.sessionMap[k]) {
                    crtObj.sessionMap[k] = v
                }
            })
        },
        // update all fields by sessionType
        updateSession: (state, action: PayloadAction<{ sessionType: string, item: SessionEntireMapItem }>) => {
            const { sessionType, item } = action.payload;
            if (!state.sessionTypeKVMap[sessionType]) {
                state.sessionTypeKVMap[sessionType] = {}
            }
            state.sessionTypeKVMap[sessionType] = item;
        },
        // duplicateItem
        duplicateItem: (state, action: PayloadAction<{ currentList: SessionListItem[], sessionType: string, newID: string, currId: string; newLabel: string }>) => {
            const { sessionType, newID, currId, newLabel } = action.payload;
            if (!state.sessionTypeKVMap[sessionType]) {
                state.sessionTypeKVMap[sessionType] = {}
            }
            let kvmap = state.sessionTypeKVMap[sessionType]
            kvmap.activeId = newID
            kvmap.sessionList = [
                ...(action.payload.currentList || []),
                {
                    id: newID,
                    label: newLabel
                }
            ]
            if (!kvmap.sessionMap) {
                kvmap.sessionMap = {}
            }
            kvmap.sessionMap[newID] = _.cloneDeep(kvmap.sessionMap[currId])
        },
    },
});

export default SessionSlice;
