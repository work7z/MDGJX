// LafTools
// 
// Date: Sun, 10 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import ALL_NOCYCLE, { FN_GetDispatch } from "./nocycle.tsx";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { store, RootState } from "./store/index";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./system.scss";

import exportUtils from "./utils/ExportUtils.tsx";
import forgeSlice from "./reducers/forgeSlice.tsx";

import { ACTION_callInitAllDataAtOnceFromInitSystemEnv } from "./reducers/systemSlice.tsx";
import _ from "lodash";

ALL_NOCYCLE.store = store;

let callInitOnce = _.once(() => {
    FN_GetDispatch()(ACTION_callInitAllDataAtOnceFromInitSystemEnv());
})

export let useConstructedKeyAndInit = () => {
    let dis = useDispatch();

    let m1 = exportUtils.useSelector((val) => {
        return {
            LangIncrement: val.system.LangIncrement,
        };
    });

    // listen system light/dark mode changes
    let constructedKey = `${m1.LangIncrement}`;

    useEffect(() => {
        let matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

        function handleColorScheme(e) {
            let isDarkMode = e.matches;
            dis(
                forgeSlice.actions.updateDarkMode({
                    isDark: isDarkMode ? true : false,
                })
            );

        }

        // Listen for changes
        matchMedia.addListener(handleColorScheme);
    }, []);

    useEffect(() => {
        callInitOnce()
    }, [1]);


    return constructedKey
}