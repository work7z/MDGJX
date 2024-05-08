// LafTools
// 
// Date: Sat, 2 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import _ from "lodash";
import { Val_ToolTabIndex } from "../../impl/purejs-types";


// The slice state is initialized from the URL parameters if it's possible. 
// Meanwhile, the URL parameters can be updated by the app state once it's changed, vice versa.
// e.g. http://127.0.0.1:8080/cn/client?a=3&b=4 refers to a = 3 and b = 4


export type TabLeftType = "tools" | "notes" | "history" | "resources"
export type TabBottomType = "terminal" | "dictionary" | "compute" | "help" | "overview" | "translation"
export type TabRightType = "ai" | "todo" | "stopwatch"
export type TrueFalseType = "t" | "f"
export type ToolConfigMapVal = {
    alias: string, // tool name, can be empty if not defined
    pipemap: {
        [key: string]: ToolPipeline
    }, // recipe string, can follow CyberChef's recipe format
    dftOpId?: string, // default opt id
    sideOpId?: string, // sidemenu opt id
    // FIXME: for new fields added, please assume they're possibly undefined or null for the consideration of backward compatibility
}
export type ToolConfigMap = {
    [sessionId: string]: ToolConfigMapVal
}
export type ToolPipeline = {
    a: any[], // args value
    d?: TrueFalseType, // disabled or not
    e: any // map for extra value
}
export type ToolSideMenuTabIdType = "pipeline" | "favourites" | "allops"
export type ParamStateState = {
    tltb: Val_ToolTabIndex,
    fapsz: TrueFalseType, // full window app size or not
    nqop: TrueFalseType, // no quick operation. will process and flag it as false if it's true
    tlcfg: ToolConfigMap, // tool config, recipes...
    tsdrsipt: string, // side menu search input 
    tsdmid: ToolSideMenuTabIdType, // side menu
    hdstpt: TrueFalseType; // hide setting panel part or not
    hdbtpl: TrueFalseType; // hide bottom process panel or not 
    ltr: TrueFalseType; // left 2 right for editor
    hsr: TrueFalseType;// show sidebar or not
    hrts: TrueFalseType // hide related tools or not 
    fs: TrueFalseType; // full screen or not, true or false
    // left
    l: TabLeftType, // tab left
    ls?: string; // left sub
    // bottom
    b: TabBottomType, // bottom 
    // right
    r: TabRightType, // right
    tid?: string; // tool tab id
    shsmu: TrueFalseType; // show side menu or not
};
let fn_getInitialState = (): ParamStateState => {
    return {
        shsmu: 't',
        tltb: 'tools',
        fapsz: 'f',
        hrts: 't',
        nqop: 'f',
        tsdmid: 'pipeline',
        tsdrsipt: '',
        tlcfg: {},
        hdstpt: 'f',
        hdbtpl: 'f',
        ltr: 'f',
        hsr: 't',
        fs: 'f',
        l: "tools",
        b: "terminal",
        r: "ai"
    }
}
const initialState: ParamStateState = fn_getInitialState()
const initialState_forCheck: ParamStateState = fn_getInitialState()

let localParamSaveKey = "wrixNBr"
export type ParamStateStateKeyType = keyof ParamStateState;

let deepFields: {
    [key in keyof Partial<ParamStateState>]: boolean
} = {
    "tlcfg": true
}

export function mergeTwoParamState(initialState: ParamStateState, objState2: any): ParamStateState {
    _.forEach(deepFields, (x, fieldName) => {
        let str = objState2[fieldName]
        if (typeof str == 'string') {
            objState2[fieldName] = JSON.parse(str)
        }
    });
    // NOTE: the quick operation should be cleaned in every merge
    let r: ParamStateState = _.merge(initialState, objState2)
    _.forEach(r.tlcfg, x => {
        x.sideOpId = ''
    })
    return r;
}

// firstly, merge the local storage
if (typeof localStorage != 'undefined') {
    try {
        let localParamSaveValue = localStorage.getItem(localParamSaveKey)
        if (localParamSaveValue) {
            let objState2 = JSON.parse(localParamSaveValue)
            mergeTwoParamState(initialState, objState2)
        }
    } catch (e) {
        console.error('error', e)
    }

    // secondly, merge the query
    try {
        let paramQ = queryString.parseUrl(location.href).query;
        if (!paramQ) {
            paramQ = {}
        }
        console.log('process', location.href)
        mergeTwoParamState(initialState, paramQ)
    } catch (e) {
        // TODO: report this error if it's possible
        console.error('error', e)
    }
}
let formatState = (state: ParamStateState) => {
    let queryObj = {
        ...state,
    }
    _.forEach(deepFields, (x, fieldName) => {
        let v = queryObj[fieldName]
        if (!_.isString(v)) {
            queryObj[fieldName] = JSON.stringify(v)
        }
    })
    // TODO: check if we need to remove unnecessary fields
    // _.forEach(queryObj, (x, d, n) => {
    //     let fieldName = d;
    //     let v = x;
    //     if (v == initialState_forCheck[fieldName]) {
    //         delete queryObj[fieldName]
    //         return;
    //     }
    // })
    return queryObj
}
export let DELAY_TIME = 190;
export let syncStateToUrl = _.debounce((formatted: ParamStateState) => {
    let newUrl = queryString.stringifyUrl({
        url: location.href, query: formatted as any
    });
    window.history.pushState({}, '', newUrl);
}, DELAY_TIME)
export let syncStateToLocal = _.debounce((formatted: ParamStateState) => {
    localStorage.setItem(localParamSaveKey, JSON.stringify(formatted))
}, DELAY_TIME)

let handleStateSync = (state) => {
    let formatted = formatState(state)
    syncStateToUrl(formatted)
    syncStateToLocal(formatted)
}
const ParamStateSlice = createSlice({
    name: "paramState",
    initialState,
    reducers: {
        updateOneOfParamState: (state, action: PayloadAction<Partial<ParamStateState>>) => {
            _.merge(state, action.payload)
            handleStateSync(state)
        },
        updateCrtToolCfg: (state, action: PayloadAction<{
            pipeMapKey: string,
            pipeMapValue: ToolPipeline,
            sessionId: string
        }>) => {
            if (!state.tlcfg[action.payload.sessionId]) {
                state.tlcfg[action.payload.sessionId] = {
                    alias: '',
                    pipemap: {}
                }
            }
            let sessionCfg = (
                state.tlcfg[action.payload.sessionId]
            )
            if (!sessionCfg.pipemap) {
                sessionCfg.pipemap = {}
            }
            state.tlcfg[action.payload.sessionId].pipemap[action.payload.pipeMapKey] = action.payload.pipeMapValue
            handleStateSync(state)
        },
    },
});

export default ParamStateSlice;
