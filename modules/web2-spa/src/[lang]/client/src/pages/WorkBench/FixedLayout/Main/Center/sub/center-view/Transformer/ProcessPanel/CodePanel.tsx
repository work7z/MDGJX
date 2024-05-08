// LafTools
// 
// Date: Sun, 21 Jan 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


import React, { useEffect, useState } from 'react'
import { CommonTransformerProps } from '../types'
import { CSS_TW_LAYOUT_BORDER_LIGHTER, CommonTransformerPassProp, LabelValuePair } from '../../../../../../../../../types/workbench-types'
import { TransformerWithRuntime as TransformerWithRuntimeProp } from '../hooks'
import gutils from '../../../../../../../../../utils/GlobalUtils'
import { Dot } from '../../../../../../../../../utils/cTranslationUtils'
import { usePromiseWait } from '../hooks'
import _ from 'lodash'
import { AnchorButton, Button, Callout, Tabs } from '@blueprintjs/core'
import { CodeImplDetail, CodeImplMap, program_languages } from '@/[lang]/client/src/impl/tools/code/types'
import GenCodeMirror from '../../../../../../../../../components/GenCodeMirror'
import exportUtils from '../../../../../../../../../utils/ExportUtils'

export default (props: CommonTransformerPassProp & TransformerWithRuntimeProp) => {
    exportUtils.useLoadDotCountCpt()
    let [fncode, onCode] = useState<{
        fn: () => (CodeImplMap | null)
    }>({
        fn: () => null
    })
    let { loading, progressText } = usePromiseWait({
        text: Dot("KcrRr", "Retrieving Code Implementation Data"),
        whenToStart: !_.isNil(props.toolHandler),
        promise: async () => {
            onCode({
                fn: () => (null)
            })
            if (!props.toolHandler) {
                return;
            }
            let crt_obj = await props.toolHandler.getCode()
            onCode({
                fn: crt_obj
            })
        }
    }, [props.toolHandler])
    let [tabId, onTabId] = useState("java")
    let code = fncode.fn()
    if (loading) {
        return <div className="p-2">{progressText}</div>
    }
    if (!code || _.isEmpty(code)) {
        return <div className="p-2">{Dot("iOEjZ", "No Available Code")}</div>
    }

    return <div className='p-2'>
        <div className=''>
            <Tabs id="CodeImplTabs" vertical
                className='flex-tab'
                onChange={(newTabId) => {
                    onTabId(newTabId.toString())
                }
                } selectedTabId={tabId}>
                {
                    _.map((_.filter(program_languages, x => code && code[x.value]) as LabelValuePair[]), x => {
                        let o: CodeImplDetail | null = code && code[x.value]
                        if (!o) { return '' }
                        return <Tabs.Tab key={x.value} id={x.value} title={x.label} panel={<div className='min-w-full w-full h-auto whitespace-nowrap'>
                            <div className='whitespace-normal min-w-full w-[80%] mb-2'>
                                <Callout intent='none' icon="info-sign"  >
                                    {o.howToRunItTips}
                                    {
                                        o.links && <div className='mt-2'>
                                            <b>{Dot("KcqrRr", "Reference")}</b>
                                            <ul className='list-disc list-inside'>
                                                {
                                                    _.map(o.links, x => {
                                                        return <li key={x.link}>
                                                            <a href={x.link} target='_blank'>{x.name}</a>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    }
                                </Callout>
                            </div>
                            <div className={CSS_TW_LAYOUT_BORDER_LIGHTER + " min-w-full"}>
                                {
                                    tabId == x.value && <GenCodeMirror
                                        language={'javascript'}
                                        placeholder={''}
                                        directValue={_.trim(o.template)}
                                        lineWrap={true}
                                        bigTextId={''}
                                        key={""}
                                    ></GenCodeMirror>
                                }

                            </div>
                        </div>}>
                        </Tabs.Tab>
                    })
                }
            </Tabs>
        </div>
        <div className="text-center mb-2 mt-4">
            <AnchorButton target='_blank' minimal outlined href={`https://github.com/work7z/LafTools/blob/dev/modules/web2/app/[lang]/client/src/impl/tools/impl/${props.extId}.tsx`} intent="none" text={Dot("Ylq2X", "Error Correction")}></AnchorButton>
        </div>

    </div>
}