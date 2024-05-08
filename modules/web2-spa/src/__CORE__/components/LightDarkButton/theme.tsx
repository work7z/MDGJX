import { FN_GetDispatch } from "@/[lang]/client/src/nocycle";
import LocalStateSlice from "@/[lang]/client/src/reducers/state/localStateSlice";
import exportUtils from "@/[lang]/client/src/utils/ExportUtils";
import { useEffect, useState } from "react";
import $ from 'jquery'
import { KEY_LAFTOOLS_THEME } from "../../meta/constants";

export type ThemeType = "light" | "dark";
const key = KEY_LAFTOOLS_THEME

export let useTheme = (): {
    theme: ThemeType,
    setTheme: (theme: ThemeType) => any
} => {
    let handleTheme = (theme: ThemeType) => {
        if (theme == 'dark') {
            $('html').addClass('bp5-dark').addClass('dark')
        } else {
            $('html').removeClass('dark').removeClass('bp5-dark')
        }
    }
    let theme = exportUtils.useSelector(v => v.localState.theme)
    let _setTheme = (theme: ThemeType) => {
        FN_GetDispatch()(
            LocalStateSlice.actions.updateOneOfLocalState({
                theme
            })
        )
    }
    // let [theme, _setTheme] = useState<ThemeType>(
    //     (localStorage.getItem(key) || "light") as ThemeType
    // )
    let setTheme = (theme: ThemeType) => {
        localStorage.setItem(key, theme)
        handleTheme(theme)
        _setTheme(theme)
    }
    useEffect(() => {
        handleTheme(theme)
    }, [])

    return {
        theme,
        setTheme
    }
}