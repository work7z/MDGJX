

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CommonTransformerProps } from '../types'
import { CSS_BG_COLOR_WHITE, CSS_TW_LAYOUT_BORDER_LIGHTER, CommonTransformerPassProp, LabelValuePair, VAL_CSS_TAB_TITLE_PANEL, light_border_clz_all, tw } from '../../../../../../../../../types/workbench-types'
import { TransformerWithRuntime as TransformerWithRuntimeProp } from '../hooks'
import gutils from '../../../../../../../../../utils/GlobalUtils'
import { Dot } from '../../../../../../../../../utils/cTranslationUtils'
import { usePromiseWait } from '../hooks'
import _ from 'lodash'
import { AnchorButton, Button, Callout, InputGroup, Intent, Placement, SegmentedControl, Tabs, Tooltip } from '@blueprintjs/core'
import { CodeImplDetail, CodeImplMap, program_languages } from '@/[lang]/client/src/impl/tools/code/types'
import GenCodeMirror from '../../../../../../../../../components/GenCodeMirror'
import exportUtils from '../../../../../../../../../utils/ExportUtils'
import { SysTabPane } from '@/[lang]/client/src/components/SysTabPane'
import { FN_GetDispatch } from '@/[lang]/client/src/nocycle'
import { OpDetail, getAllOperationDetails } from '@/[lang]/client/src/impl/tools/s_tools'
import { useInitFunctionOnceOnly } from '@/__CORE__/hooks/cache'
import ParamStateSlice, { ToolSideMenuTabIdType } from '@/[lang]/client/src/reducers/state/paramStateSlice'
import { ICON_BTN_TRIGGER_FN, TOOLTIP_OPEN_DELAY_BTN } from '@/__CORE__/meta/constants'
import AlertUtils from '@/[lang]/client/src/utils/AlertUtils'
import { MAIN_SYSTEM_ACTION_BTN_ID } from '../ControlBar'

export default (props: CommonTransformerPassProp & TransformerWithRuntimeProp & {
    opDetails: OpDetail[]
}) => {
    let filteredOpDetails = props.opDetails
    let { searchText } = exportUtils.useSelector(v => {
        return {
            searchText: v.paramState.tsdrsipt
        }
    })
    let eleRef = useRef({
        eleIpt: null as any,
    })
    let setSearchText = useCallback(_.debounce((v: string) => {
        FN_GetDispatch()(ParamStateSlice.actions.updateOneOfParamState({
            tsdrsipt: v
        }))
    }, 200), [])
    return (
        <div>
            <div className='p-1 space-y-1 space-x-1'>
                <div className='w-full my-1'>
                    <InputGroup autoFocus={false} ref={e => {
                        // eleRef.current.eleIpt = e
                    }} defaultValue={searchText} onChange={e => {
                        setSearchText(e.target.value)
                    }} leftIcon='search' round fill small placeholder={Dot("uCTxxZbSG", "Search Operations by Name")} />
                </div>
                {
                    filteredOpDetails && _.isEmpty(filteredOpDetails) && <div className='p-2'>
                        <Callout intent='warning' title={Dot('ShgVLLtWo', "No Operations Found")}></Callout></div>
                }
                {
                    _.map(filteredOpDetails, (x, d) => {
                        return <ActionListViewButton animiateMode noHighlightMode {...props} x={x} />
                    })
                }
            </div>
        </div>
    )
}

export const ActionListViewButton = (props: CommonTransformerPassProp & TransformerWithRuntimeProp & {
    bindid?: string,
    animiateMode?: boolean,
    x: OpDetail,
    activeParentTrigger?: boolean,
    noHighlightMode?: boolean,
    placement?: Placement
}) => {
    let { x } = props;
    let isCurrent = x.id == props.crtSideMenuOperaId
    let { twBgClz, twClz, intent } = x
    let whatIntent = intent;
    let isCurrentAndLoaded = isCurrent && !props.loadingExtraOpList
    if (isCurrentAndLoaded && !props.noHighlightMode) {
        twClz = twBgClz
        if (twBgClz != '') {
            whatIntent = 'primary'
        }
        if (whatIntent == 'none') {
            whatIntent = 'primary'
        }
    }

    let [showJump, onShowJump] = useState(false)
    let currentRef = useRef({
        e: null,
    })

    let btn = <Button title={x.description} ref={ee => {
        if (ee) {
            currentRef.current.e = ee as any
        }
    }} id={props.bindid} icon={
        props.activeParentTrigger && isCurrent ? 'tick' :
            x.icon} small loading={isCurrent && props.loadingExtraOpList} minimal={props.noHighlightMode} className={twClz} style={{
            }} outlined={props.noHighlightMode}
        //  || !isCurrentAndLoaded
        intent={whatIntent} key={x.id} onClick={async () => {
            await props.fn_switchToSideMenuExtraOp(x.id)
            await props.onProcess()
            onShowJump(true)
            if (!props.animiateMode) return;


            let ball = document.createElement("div");
            ball.className = tw`  shadow-lg `;
            ball.style.backgroundColor = 'green'
            ball.style.opacity = '0.9'
            ball.style.width = "8px";
            ball.style.height = "8px";
            ball.style.borderRadius = "4px";
            ball.style.position = "fixed";
            if (!currentRef.current.e) return;
            let thisEle = currentRef.current.e as HTMLElement
            let productRect = thisEle.getBoundingClientRect();
            let ballStartLeft = productRect.x;
            let ballStartTop = productRect.y;

            let d = document.getElementById(MAIN_SYSTEM_ACTION_BTN_ID)
            if (!d) {
                return;
            }
            let cartRect = d.getBoundingClientRect();
            let ballEndLeft = cartRect.x;
            let ballEndTop = cartRect.y;

            document.body.appendChild(ball);
            ball.style.left = ballStartLeft + (productRect.width / 2) + "px";
            ball.style.top = ballStartTop + (productRect.height / 2) + "px";
            ball.style.transition = "all 1s ease-in-out";

            setTimeout(() => {
                ball.style.left = ballEndLeft + (cartRect.width / 2) + "px";
                ball.style.top = ballEndTop + (cartRect.height / 2) + "px";
                setTimeout(() => {
                    document.body.removeChild(ball)
                }, 1000)
            }, 300)
        }}>{x.label}</Button>
    if (!props.noHighlightMode) {
        return btn;
    }
    return <span className='inline-block'>
        <Tooltip isOpen={false} placement={props.placement} content={
            <div style={{
                maxWidth: '400px'
            }} dangerouslySetInnerHTML={{ __html: x.description }}></div>
        } hoverOpenDelay={TOOLTIP_OPEN_DELAY_BTN} >
            {btn}
        </Tooltip>

    </span >
}