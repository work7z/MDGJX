// LafTools
// 
// Date: Sat, 13 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { type ItemRenderer, Suggest } from "@blueprintjs/select";
import { Alignment, Button, ButtonProps, FormGroup, Icon, IconName, InputGroup, Intent, Menu, MenuItem, Navbar, Tab, Tabs, Tooltip } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../../../components/GenCodeMirror";
import FaqPanel from './FaqPanel'
import CodePanel from './CodePanel'
import {
    VAL_CSS_TAB_TITLE_PANEL,
    VAL_CSS_CONTROL_PANEL,
} from "../../../../../../../../../types/workbench-types";
import { CommonTransformerPassProp } from "../../../../../../../../../types/workbench-types";
import { Dot } from "../../../../../../../../../utils/cTranslationUtils";
import { Allotment, AllotmentHandle } from "allotment";
import { FN_GetDispatch } from "../../../../../../../../../nocycle";
import BigTextSlice from "../../../../../../../../../reducers/bigTextSlice";
import _, { set } from "lodash";
import { FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../../actions/bigtext_action";
import { findLastIndex } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import AjaxUtils from "../../../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../../../utils/AlertUtils";
import { SysTabPane } from "../../../../../../../../../components/SysTabPane";
import { CSS_NAV_BP_TAB_HEIGHT, CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER, LabelValuePair, tw } from "../../../../../../../../../types/constants";
import exportUtils from "../../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../../reducers/runtimeStatusSlice";

import { CommonTransformerProps } from "../types";
import { ExtensionAction, ToolDefaultOutputType, Val_ToolTabIndex } from "../../../../../../../../../types/purejs-types-READ_ONLY";
import { TextTransformerProps, TransformerWithRuntime, controlBarHeight, controlClz, fn_coll_output, fn_format_button, useCurrentActiveStyle } from "../hooks";
import FormGenPanel, { FormGenItem } from "../../../../../../../../../components/FormGenPanel";
import Operation from "../../../../../../../../../impl/core/Operation.tsx";
import { logutils } from "../../../../../../../../../utils/LogUtils";
import { useShouldVerticalModeOrNot } from "../index.tsx";
import EditableOptions from "@/app/[lang]/client/src/components/EditableOptions/index.tsx";
import { useGeneralListRead } from "./hooks.tsx";
import ParamStateSlice from "@/app/[lang]/client/src/reducers/state/paramStateSlice.tsx";
import { FAQItem } from "@/app/[lang]/client/src/impl/tools/faq/types.tsx";
import WrapperActionListView from "../SideMenu/WrapperActionListView.tsx";
export type ProcessPanelProps = { disableSeparateOutputMode: boolean, hideSettingPanel: boolean } & CommonTransformerPassProp & TransformerWithRuntime
export type FaqFnType = {
    fn: () => FAQItem[]
}
export default (props: ProcessPanelProps) => {
    let crtRuntimeStatus = props.crtRuntimeStatus
    let shouldVert = useShouldVerticalModeOrNot()

    let toolTabIndex = exportUtils.useSelector(v => {
        return v.paramState.tltb
    })
    // crtRuntimeStatus.toolTabIndex || 'tools'
    if (toolTabIndex == 'output') {
        toolTabIndex = 'tools'
    }
    let sessionId = props.sessionId;
    let extVM = props.extVM
    let actions = extVM?.Actions
    let toolHandler = props.toolHandler
    let [hideFAQ, onHideFAQ] = useState(false)
    logutils.debug("autorun-crtRuntimeStatus", crtRuntimeStatus)
    let generalList = useGeneralListRead(props)

    let finalShowContent_l = <div>{Dot("zkqUFa", "{0} is not yet configured", toolTabIndex)}</div>
    let pdValue = 'p-2'
    let loadingStatic = false
    let toolHanlder = props.toolHandler
    if (toolTabIndex == 'wiki') {
        pdValue = 'p-0'
        finalShowContent_l = <div className="w-full h-full overflow-auto">
            <iframe src={toolHanlder?.getOperations()[0].getOptDetail()?.infoURL} className="w-full h-full border-none outline-none"></iframe>
        </div>
    } else if (toolTabIndex == "tools") {
        pdValue = tw`  p-2 scrollbar-hide `

        finalShowContent_l = <FormGenPanel onReset={() => {
            FN_GetDispatch()(
                ParamStateSlice.actions.updateCrtToolCfg({
                    pipeMapKey: (props.fn_isSidebarMenuOpModeNow(props) ? props.crtSideMenuOperaId : props.crtDefaultOperaId + "") + "",
                    pipeMapValue: {
                        a: [],
                        e: {}
                    },
                    sessionId
                })
            )
            AlertUtils.popMsg('success', {
                message: Dot("6T3dmF", "Reset Successfully!")
            })
            props.onProcess(true)
        }} fixSingleColumn={shouldVert} list={generalList}></FormGenPanel >
    } else if (toolTabIndex == "faq") {
        finalShowContent_l = <FaqPanel
            hideFAQ={hideFAQ}
            onHideFAQ={onHideFAQ}
            key={sessionId} {...props}></FaqPanel>
    } else if (toolTabIndex == "moreopt") {
        finalShowContent_l = <WrapperActionListView {...props} />
    } else if (toolTabIndex == 'code') {
        finalShowContent_l = <CodePanel {...props}></CodePanel>
    }


    let jsx_left_setting_or_faq = (
        <div className='h-full p-[1px]'>
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Tabs
                        animate={true}
                        fill={true}
                        id="navbar"
                        large={false}
                        onChange={(v) => {
                            // FN_GetDispatch()(RuntimeStatusSlice.actions.setToolTabIndex({ sessionId, tabIndex: v as Val_ToolTabIndex }))
                            FN_GetDispatch()(
                                ParamStateSlice.actions.updateOneOfParamState({
                                    tltb: v as Val_ToolTabIndex
                                })
                            )
                        }}
                        selectedTabId={toolTabIndex}
                    >
                        <Tab id="tools" icon="cog" title={Dot("XeXF77", "Settings")}
                        />
                        {
                            !toolHandler || toolHanlder?.getMetaInfo()?.hideFAQPanel ? '' : <Tab id="faq" icon="manual" title={"FAQ"} />
                        }
                        {
                            !toolHandler || toolHanlder?.getMetaInfo()?.hideCodePanel ? '' : <Tab id="code" icon="code" title={Dot("JQEVK", "Code")} />
                        }
                        <Tab id="moreopt" icon="more" title={Dot("rlgb9OKEz", "More")} />

                    </Tabs>
                </Navbar.Group>
            </Navbar>
            <div style={{ height: `calc(100% - ${CSS_NAV_BP_TAB_HEIGHT}px)`, overflow: 'auto' }} className={pdValue + ' scrollbar-hide'}>
                {finalShowContent_l}
            </div>
        </div>
    )

    return <div key={props.sessionId} className="w-full h-full">
        <Allotment vertical={!shouldVert}>
            {
                props.hideSettingPanel ? '' : <Allotment.Pane>
                    {jsx_left_setting_or_faq}
                </Allotment.Pane>
            }
        </Allotment>
    </div>

}