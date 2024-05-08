
import { Alignment, Button, ButtonProps, Navbar, Popover, Tab, Tabs, Tooltip } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../../../components/GenCodeMirror";
import {
    VAL_CSS_TAB_TITLE_PANEL,
    VAL_CSS_CONTROL_PANEL,
} from "../../../../../../../../../types/workbench-types";
import { CommonTransformerPassProp } from "../../../../../../../../../types/workbench-types";
import { Dot } from "../../../../../../../../../utils/cTranslationUtils";
import { FN_GetDispatch } from "../../../../../../../../../nocycle";
import BigTextSlice from "../../../../../../../../../reducers/bigTextSlice";
import _ from "lodash";
import { FN_GetActualTextValueByBigTextId, FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../../actions/bigtext_action";
import { findLastIndex } from "lodash";
import { useContext, useEffect, useRef, useState } from "react";
import AjaxUtils from "../../../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../../../utils/AlertUtils";
import { SysTabPane } from "../../../../../../../../../components/SysTabPane";
import { CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER, border_clz_common } from "../../../../../../../../../types/constants";
import exportUtils from "../../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../../reducers/runtimeStatusSlice";

import { ClientPortalContext, CommonTransformerProps } from "../types";
import { ExtensionAction, ToolDefaultOutputType } from "../../../../../../../../../types/purejs-types-READ_ONLY";
import { TextTransformerProps, TransformerWithRuntime, controlBarHeight, controlClz, fn_coll_output, fn_format_button } from "../hooks";
import gutils from "../../../../../../../../../utils/GlobalUtils";
import CopyButton from "../../../../../../../../../components/CopyButton";
import { ActionButtonProps } from "../../../../../../../../../components/ActionButton";
import ParamStateSlice, { TrueFalseType } from "@/[lang]/client/src/reducers/state/paramStateSlice";
import { useShouldVerticalModeOrNot } from "..";
import { js_export_trigger } from "@/[lang]/client/src/utils/FileExportUtils";
import { ICON_BTN_TRIGGER_FN } from "@/__CORE__/meta/constants";
import { InnerToolPanel } from "../../../../nav/functional/panel-group/panels/ToolPanel";
import { AppOptFnMap, appTool2PageMap, getAppOptFnMap } from "@/[lang]/client/src/impl/tools/g_optlist";
import { fmtURL_ToolSubPageClient } from "@/__CORE__/meta/client";
import { URL_SUBCATEGORY_GO_PATH } from "@/__CORE__/meta/url";
import Operation from "@/[lang]/client/src/impl/core/Operation";
import { AppOpDetail, AppOpFnMapType, AppToolConversionIdCollectionSet } from "@/[lang]/client/src/impl/tools/d_meta";
import { ActionListViewButton } from "../SideMenu/ActionListView";
import { CommonButtonForOriginRelatedAndOthers } from "../ControlBar";
export let useHideBottomAndSettingHook = () => {
    return exportUtils.useSelector((x) => {
        return {
            hideBottomPanel: x.paramState.hdbtpl == 't',
            hideSettingPanel: x.paramState.hdstpt == 't',
        };
    })
}

export let useHideRelatedToolsbarAndRelatedSubControllbar = (op: {
    originalCrtDefaultOpera?: Operation
    crtSideMenuOpera?: Operation
    crtSideMenuOperaId?: string,
    operaList: Operation[]
}): {
    hideRelatedToolsBar: TrueFalseType;
    subControlbarTools: AppOpDetail[];
} => {
    let { hideRelatedToolsBar: hideRelatedToolsBar } = exportUtils.useSelector(v => {
        return {
            hideRelatedToolsBar: v.paramState.hrts,
        }
    })
    let fnmap = getAppOptFnMap()
    let subControlbarTools = getSubControlBar({
        originalCrtDefaultOpera: op.originalCrtDefaultOpera,
        crtSideMenuOpera: op.crtSideMenuOpera,
        crtSideMenuOperaId: op.crtSideMenuOperaId,
        fnmap
    })
    if (_.isEmpty(subControlbarTools)) {
        hideRelatedToolsBar = 't'
    }

    let isCurrentMenuOperationMode = op.crtSideMenuOpera && op.crtSideMenuOperaId
    if (isCurrentMenuOperationMode) {
        subControlbarTools = [
            {
                ...fnmap[op.crtSideMenuOperaId + ""]({ Dot }),
                optOptionalId: op.crtSideMenuOperaId,
            },
            ...subControlbarTools
        ]
    }
    let duplicateId = {}
    subControlbarTools = subControlbarTools.filter(x => {
        if (duplicateId[x.optOptionalId + ""]) {
            return false
        }
        duplicateId[x.optOptionalId + ""] = true
        let f = op.operaList.find(xx => {
            let optd = xx.fileID;
            return optd == x.optOptionalId || (
                optd == x.optOptionalId + ""
            )
        })
        if (f) {
            return false;
        }
        return true
    })
    return {
        hideRelatedToolsBar,
        subControlbarTools
    };
}

export let getSubControlBar = (props: {
    crtSideMenuOpera?: Operation
    crtSideMenuOperaId?: string
    fnmap: AppOpFnMapType,
    originalCrtDefaultOpera?: Operation
}): AppOpDetail[] => {
    let { fnmap } = props;
    let op = props;

    let originalCrtDefaultOpera = props.originalCrtDefaultOpera
    if (!originalCrtDefaultOpera) {
        return []
    }
    let relatedID = originalCrtDefaultOpera?.getOptDetail().relatedID
    if (!relatedID) {
        return []
    }
    let arr = AppToolConversionIdCollectionSet[relatedID]
    return arr.map(x => {
        return {
            ...fnmap[x]({ Dot }),
            optOptionalId: x
        } satisfies AppOpDetail
    })
}

let TextTransformerControl = (props: CommonTransformerPassProp & { loadingStatic: boolean } & TextTransformerProps & TransformerWithRuntime & {
    onProcess: () => any;
}) => {
    let hideRelatedToolsBar = props.hideRelatedToolsBar
    let { inputBigTextId } = props;
    let shouldVerticalMode = useShouldVerticalModeOrNot()
    let [loadExample, onLoadExample] = useState(false);
    let toolHandler = props.toolHandler
    let crtRuntimeStatus = props.crtRuntimeStatus
    let parentTriggered = crtRuntimeStatus.processOK || crtRuntimeStatus.processing;
    let operaList = toolHandler?.getOperations() || []
    let crtDefaultOperaId = props.crtDefaultOperaId
    let leftActions: ActionButtonProps[] = [
        // {
        //     icon: hideRelatedToolsBar == 't' ? 'folder-close' : 'folder-open',
        //     className: '',
        //     intent: "none",
        //     minimal: true,
        //     title: hideRelatedToolsBar == 'f' ?
        //         Dot("l_mqgrQPlq", "Hide Other Operations") : Dot("hZo9cdqwX", "Show Other Operations"),
        //     onClick: () => {
        //         let newVal: TrueFalseType = hideRelatedToolsBar == "t" ? "f" : "t";
        //         FN_GetDispatch()(
        //             ParamStateSlice.actions.updateOneOfParamState({
        //                 hrts: newVal
        //             })
        //         );
        //     }
        // },

    ];
    if (props.loadingStatic) {
        // leftActions.forEach(x => {
        //     x.loading = true;
        // })
    }
    let sessionId = props.sessionId;
    let [openSearchPanel, setOpenSearchPanel] = useState(false);
    let { hideBottomPanel: hideBottomPanel, hideSettingPanel } = useHideBottomAndSettingHook()
    let triggerBottomPanel = (v: boolean) => {
        FN_GetDispatch()(
            ParamStateSlice.actions.updateOneOfParamState({
                hdbtpl: v ? "t" : "f",
            })
        );
    };
    let triggerSettingPanel = (v: boolean) => {
        FN_GetDispatch()(
            ParamStateSlice.actions.updateOneOfParamState({
                hdstpt: v ? "t" : "f",
            })
        );
    }
    let clientPortalContext = useContext(ClientPortalContext)
    let rightActions: ActionButtonProps[] = [


    ];
    return (
        <div
            className={
                " w-full using-edge-ui-bg  flex border-b-[1px] dark:border-gray-600 px-1  flex-column items-center justify-between "
                +
                // border_clz_common + ' border-t-[1px]' +
                '' +
                (
                    ''
                )
            }
            style={{
                height: controlBarHeight,
            }}
        >
            <div className={controlClz}>
                {leftActions.map(fn_format_button("bottom-start"))}
                {
                    <CommonButtonForOriginRelatedAndOthers noIcon mainControlBarMode={false} {...props} opBtns={props.otherOpBtns || []} />
                }
                {/* {
                    props.subControlbarTools.map(x => {
                        return <ActionListViewButton
                            {...props}
                            noHighlightMode={false}
                            placement="bottom-start"
                            activeParentTrigger={parentTriggered}
                            x={
                                {
                                    sortType: 0,
                                    description: x.optDescription,
                                    id: x.optOptionalId || 'XfXWUnI2v',
                                    intent: 'success',
                                    icon: ICON_BTN_TRIGGER_FN,
                                    label: x.optName,
                                    twBgClz: '',
                                    twClz: '',
                                }
                            }
                        />
                    })
                } */}
            </div>
            <div className={controlClz}>
                {rightActions.map(fn_format_button("bottom-end"))}
            </div>
        </div>
    );
};

export default TextTransformerControl