'use client'

import { FN_GetDispatch } from "@/app/[lang]/client/src/nocycle"
import ParamStateSlice from "@/app/[lang]/client/src/reducers/state/paramStateSlice"
import exportUtils from "@/app/[lang]/client/src/utils/ExportUtils"
import { Button } from "@blueprintjs/core"
import { useEffect } from "react"
import $ from 'jquery';
import { hocClientWrapper } from "../../common/hocClientWrapper"


export default hocClientWrapper(() => {
    let showLeftBar = exportUtils.useSelector(v => v.paramState.shsmu == 't')

    useEffect(() => {
        let $partswrapper = $("#partswrapper")
        let clz = 'no-leftbar'
        if (showLeftBar) {
            $partswrapper.removeClass(clz)
        } else {
            $partswrapper.addClass(clz)
        }
    }, [showLeftBar])
    return <Button fill className="h-full" small minimal icon='menu' onClick={() => {
        FN_GetDispatch()(
            ParamStateSlice.actions.updateOneOfParamState({
                shsmu: showLeftBar ? 'f' : 't'
            })
        )
    }}></Button>
})