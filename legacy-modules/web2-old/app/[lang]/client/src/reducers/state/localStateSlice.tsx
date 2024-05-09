// LafTools
// 
// Date: Sat, 2 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { ThemeType } from "@/app/__CORE__/components/LightDarkButton/theme";

type LocalStateState = {
    theme: ThemeType,
    ackedOutdatedVersion: string,
    setup_confirm_lang: string,
    setup_user_lang: string,
    tools_favourites: string,
    lastUpdatedAt: string, // if this value is updated, then the local state should be updated by other tab already
};
const initialState: LocalStateState = {
    theme: 'light',
    ackedOutdatedVersion: '',
    setup_confirm_lang: '',
    setup_user_lang: '',
    lastUpdatedAt: '',
    tools_favourites: '' // joined by comma
};


// The slice state is initialized from the localStorage(online) or sqlite(desktop) if it's possible.
// Meanwhile, the data source will be updated once this slice state has any changes, vice versa.

export function mergeTwoLocalState(initialState: LocalStateState, objState2: any): LocalStateState {
    // NOTE: the quick operation should be cleaned in every merge
    let r: LocalStateState = _.merge(initialState, objState2)
    return r;
}
let localParamSaveKey = "MqVNpvkRh"
let loadFromLocalState = (initialState: LocalStateState) => {
    // firstly, merge the local storage
    try {
        let localParamSaveValue = localStorage.getItem(localParamSaveKey)
        if (localParamSaveValue) {
            let objState2 = JSON.parse(localParamSaveValue)
            mergeTwoLocalState(initialState, objState2)
        }
    } catch (e) {
        console.error('error', e)
    }
}
loadFromLocalState(initialState)
export const DELAY_TIME = 200;
export let syncStateToLocal = _.debounce((formatted: string) => {
    localStorage.setItem(localParamSaveKey, (formatted))
}, DELAY_TIME)

let crtLastUpdatedAt = initialState.lastUpdatedAt



const LocalStateSlice = createSlice({
    name: "localState",
    initialState,
    reducers: {
        updateOneOfLocalState: (state, action: PayloadAction<Partial<LocalStateState>>) => {
            // if (state.lastUpdatedAt !== crtLastUpdatedAt) {
            //     loadFromLocalState(state)
            // } else {
            //     state.lastUpdatedAt = new Date().toISOString()
            // }
            // crtLastUpdatedAt = state.lastUpdatedAt
            _.merge(state, action.payload)
            syncStateToLocal(JSON.stringify(state))
        }
    },
});


export default LocalStateSlice;
