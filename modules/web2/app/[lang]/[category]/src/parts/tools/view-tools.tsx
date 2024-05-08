'use client'

// LafTools
// 
// Date: Fri, 8 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


import Link from 'next/link'
import React, { useContext } from 'react'
import { pushClient } from '@/app/__CORE__/utils/clientUtils'
import { useRouter } from 'next/navigation'
import ToolSingleView from '@/app/[lang]/client/src/pages/WorkBench/FixedLayout/Main/Center/sub/center-view/tools/ToolSingleView'
import { Provider, useDispatch } from "react-redux";
import { store } from '@/app/[lang]/client/src/store'
import '@/app/[lang]/client/src/initapp'
import { useConstructedKeyAndInit } from '@/app/[lang]/client/src/initapp'
import { CSS_BG_COLOR_WHITE, CSS_BG_DARK_2ND, VAL_CSS_MENU_TITLE_PANEL, VAL_MENU_LEFT_PANEL_WIDTH, border_clz, light_border_clz_all, tw } from '@/app/__CORE__/meta/styles'
import { loadDOT } from '@/app/__CORE__/utils/i18n-for-load'
import { Dot } from '@/app/__CORE__/utils/cTranslationUtils'
import SmallScreenDetecter from '@/app/[lang]/client/src/SmallScreenDetecter'
import { hocClientWrapper } from '../../common/hocClientWrapper'
import { ClientPortalContext } from '@/app/[lang]/client/src/pages/WorkBench/FixedLayout/Main/Center/sub/center-view/Transformer/types'
import { CardBody } from '@nextui-org/react'
import { CategorySearchProps, CategoryTypeSearchDetail } from '@/app/[lang]/page'
import NotYetOkie from '@/app/[lang]/client/src/components/NotYetOkie'
import exportUtils from '@/app/[lang]/client/src/utils/ExportUtils'

export type ExtensionViewProps = CategoryTypeSearchDetail & CategorySearchProps


let d = loadDOT("1RH8bum7S")


let ToolInnerView = hocClientWrapper((props: ExtensionViewProps) => {
    d()
    let constructedKey = useConstructedKeyAndInit()
    let clientContext = useContext(ClientPortalContext)
    let toolId = props.searchToolItem.toolId
    let body: JSX.Element = <div>not implemented yet</div>
    let needFullPage = clientContext.portalMode && false; // TODO: for now, we just only use fixed height to support drafting border
    if (!toolId) {
        body = <div className='w-full min-h-[500px]'>
            <div>{Dot("QJUcHZ3bD", "Sorry, it is still in progress, please kindly stay tuned by staring our Github repo.")}</div>
        </div>
    } else {
        body = <ToolSingleView needFullPageSupport={needFullPage} extId={toolId} />
    }
    return <div className='w-full h-full' style={{
        // height: `${clientContext.appToolHeight}px`

    }} key={constructedKey}>
        {body}
    </div>
})

export default hocClientWrapper((props: ExtensionViewProps) => {
    return <CardBody className='p-0 w-full h-full'>
        <div className={'w-full h-full p-[5px] relative bg-slate-50  ' + CSS_BG_DARK_2ND}>
            <ToolInnerView {...props} />
        </div>
    </CardBody>
})