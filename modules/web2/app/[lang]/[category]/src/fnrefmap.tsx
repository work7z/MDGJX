'use client'

import { useEffect } from "react";
import AlertUtils from "../../client/src/utils/AlertUtils";
import { FN_REF_ID_FULL_SCREEN_MODE_TOGGLE, FN_REF_ID_SHARE_THIS_PAGE } from "./fnref";
import _ from 'lodash'
import $ from 'jquery'
import { Dot } from "../../client/src/utils/cTranslationUtils";
import { FN_GetDispatch, FN_GetState } from "../../client/src/nocycle";
import ParamStateSlice from "../../client/src/reducers/state/paramStateSlice";
import { hocClientWrapper } from "./common/hocClientWrapper";
export const fnrefmap = {
    [FN_REF_ID_SHARE_THIS_PAGE]: () => {
        AlertUtils.copyWithAlertCopied(location.href, Dot("TmvHUnZzQ", "Copied the page URL to clipboard"))
    },
    [FN_REF_ID_FULL_SCREEN_MODE_TOGGLE]: () => {
        FN_GetDispatch()(
            ParamStateSlice.actions.updateOneOfParamState({
                fapsz: FN_GetState().paramState.fapsz === 't' ? 'f' : 't'
            })
        )
    }
}
let initJustOnce = _.once(() => {
    console.log('fnrefmap', fnrefmap)
    window.addEventListener('load', () => {
        _.forEach(fnrefmap, (fn, fn_name) => {
            let keyval = `[data-refid='${fn_name}']`
            console.log('keyval', keyval)
            $(keyval).click(e => {
                e.preventDefault()
                fn()
            })
        })
    })
})
export let RegisterSlot = hocClientWrapper(() => {
    useEffect(initJustOnce, [])
    return ""
})