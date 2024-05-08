
import { Alignment, Button, ButtonProps, Intent, Navbar, Popover, Tab, Tabs, Tooltip } from "@blueprintjs/core";
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
import { CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER } from "../../../../../../../../../types/constants";
import exportUtils from "../../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../../reducers/runtimeStatusSlice";

import { ClientPortalContext, CommonTransformerProps } from "../types";
import { ExtensionAction, ToolDefaultOutputType } from "../../../../../../../../../types/purejs-types-READ_ONLY";
import { TextTransformerProps, TransformerWithRuntime, controlBarHeight, controlClz, fn_coll_output, fn_format_button } from "../hooks";
import gutils from "../../../../../../../../../utils/GlobalUtils";
import CopyButton from "../../../../../../../../../components/CopyButton";
import { ActionButtonProps } from "../../../../../../../../../components/ActionButton";
import ParamStateSlice, { TrueFalseType } from "@/[lang]/client/src/reducers/state/paramStateSlice";
import { OpButtonStyleProps, useShouldVerticalModeOrNot } from "..";
import { js_export_trigger } from "@/[lang]/client/src/utils/FileExportUtils";
import { ICON_BTN_TRIGGER_FN } from "@/__CORE__/meta/constants";
import { InnerToolPanel } from "../../../../nav/functional/panel-group/panels/ToolPanel";
import { appTool2PageMap } from "@/[lang]/client/src/impl/tools/g_optlist";
import { fmtURL_ToolSubPageClient } from "@/__CORE__/meta/client";
import { URL_SUBCATEGORY_GO_PATH } from "@/__CORE__/meta/url";
import { ActionListViewButton } from "../SideMenu/ActionListView";
import UserFSUtils from "@/[lang]/client/src/utils/UserFSUtils";
export let useHideBottomAndSettingHook = () => {
    return exportUtils.useSelector((x) => {
        let hideSetting = x.paramState.hdstpt == 't'
        return {
            hideBottomPanel: hideSetting,
            hideSettingPanel: hideSetting,
        };
    })

}

export const CommonButtonForOriginRelatedAndOthers = (props: TransformerWithRuntime & CommonTransformerPassProp & {
    noIcon?: boolean,
    popoverItem?: any,
    opBtns: OpButtonStyleProps[],
    mainControlBarMode: boolean
}) => {
    return <>
        {
            _.map(props.opBtns, x => {
                let { mainControlBarMode } = props;
                let whatIntent: Intent = !mainControlBarMode ? 'none' : x.type == 'origin' || x.type == 'related' ? 'primary' : 'success'
                let crtIdObj = props.mainControlBarMode ? {
                    id: MAIN_SYSTEM_ACTION_BTN_ID
                } : {}
                if (!x) {
                    return ''
                }
                let returnObj: JSX.Element | string = `${x.name}`
                if (x.type == 'origin') {
                    let crtId = x.opId
                    let crtDesc = x.desc
                    let crtName = x.name
                    let isHighlightOne = props.mainControlBarMode;
                    let buttonObject = {
                        id: crtIdObj.id,
                        text: crtName,
                        // id: isHighlightOne ?  : undefined,
                        icon: props.noIcon ? undefined : ICON_BTN_TRIGGER_FN,
                        intent: whatIntent,
                        // title: '', // crtDesc,
                        // afterTitle: crtDesc,
                        enableActionMode: true,
                        afterText: crtName,
                        lastingTime: 800,
                        doNotBeMinimalWhenTrigger: true,
                        parentTriggered: x.isParentTrigger,
                        highlightOne: isHighlightOne,
                        outlined: false,//!isHighlightOne,
                        minimal: false,
                        onClick: () => {
                            props.fn_updateToolConfig({
                                sideOpId: '',
                                dftOpId: crtId
                            })
                            setTimeout(() => {
                                props.onProcess()
                            }, 0)
                        },
                    } satisfies ActionButtonProps
                    returnObj = fn_format_button("bottom-start")({
                        key: x.opId,
                        ...buttonObject
                    })
                } else if (x.type == 'related' || x.type == 'sidebar') {
                    returnObj = <ActionListViewButton
                        {...props}
                        key={x.opId}
                        bindid={crtIdObj.id}
                        noHighlightMode={false}
                        placement="bottom-start"
                        activeParentTrigger={x.isParentTrigger}
                        x={
                            {
                                sortType: 0,
                                description: x.desc,
                                id: x.opId || 'XfXWUnI2v',
                                intent: whatIntent,
                                icon: props.noIcon ? undefined : ICON_BTN_TRIGGER_FN,
                                label: x.name,
                                twBgClz: '',
                                twClz: '',
                            }
                        }
                    />
                }
                if (mainControlBarMode) {
                    return <Popover placement="bottom-start" minimal interactionKind="hover" content={
                        <div>
                            <div className='p-2 space-x-1 item-all-sub-full max-w-[300px] justify-center items-end flex flex-col space-y-1'>{props.popoverItem}</div>
                        </div>
                    }>{returnObj}</Popover>
                }
                return returnObj
            })
        }
    </>
}

export const MAIN_SYSTEM_ACTION_BTN_ID = 'msabid'

let TextTransformerControl = (props: CommonTransformerPassProp & { loadingStatic: boolean } & TextTransformerProps & TransformerWithRuntime & {
    onProcess: () => any;
}) => {
    let { inputBigTextId } = props;
    let { fullScreen, hideSideBar, } = exportUtils.useSelector(v => {
        return {
            fullScreen: v.paramState.fs,
            hideSideBar: v.paramState.hsr,
        }
    })
    let hideRelatedToolsBar = props.hideRelatedToolsBar
    let shouldVerticalMode = useShouldVerticalModeOrNot()
    let [loadExample, onLoadExample] = useState(false);
    let toolHandler = props.toolHandler
    let crtRuntimeStatus = props.crtRuntimeStatus
    let parentTriggered = crtRuntimeStatus.processOK || crtRuntimeStatus.processing;
    let operaList = toolHandler?.getOperations() || []
    let crtDefaultOperaId = props.crtDefaultOperaId
    let leftActions: ActionButtonProps[] = [
        // {
        //     icon: hideSideBar == 'f' ? 'menu-closed' : 'menu-open',
        //     className: '',
        //     intent: "none",
        //     minimal: true,
        //     title: hideSideBar == 'f' ?
        //         Dot("5_EPRncIx", "Hide Left Navigator") : Dot("qm6Fy9AB2", "Show Left Navigator"),
        //     onClick: () => {
        //         let newVal: TrueFalseType = hideSideBar == "t" ? "f" : "t";
        //         FN_GetDispatch()(
        //             ParamStateSlice.actions.updateOneOfParamState({
        //                 hsr: newVal
        //             })
        //         );
        //     }
        // },
    ];
    let leftActions_2: ActionButtonProps[] = [
        {
            icon: shouldVerticalMode ? 'swap-vertical' : 'swap-horizontal',
            text: Dot("PkIRx3hFD", "Swap"),
            intent: 'none',
            enableActionMode: true,
            afterText: Dot("eg18QOMrM", "Swapped"),
            afterIntent: 'success',
            // outlined: true,
            title: Dot("4M4U_9uBm", "Swap Input and Output"),
            afterTitle: Dot("XuAHhgkpA", "Okay, the input and output are swapped."),
            onClick: async () => {
                let inputValue = FN_GetActualTextValueByBigTextId(inputBigTextId);
                let outputValue = FN_GetActualTextValueByBigTextId(props.outputBigTextId);
                FN_GetDispatch()(
                    FN_SetTextValueFromOutSideByBigTextId(inputBigTextId, outputValue),
                );
                FN_GetDispatch()(
                    FN_SetTextValueFromOutSideByBigTextId(props.outputBigTextId, inputValue),
                )
            }
        },
        {
            icon: 'document-open',
            // outlined: true,
            text: Dot("2bdqHk", "File"),
            intent: "none",
            title: Dot("NNfdo", "Load Data from File as input"),
            onClick: () => {
                // get file from user input
                UserFSUtils.selectFile("*", false, (files) => {
                    let file = files[0]
                    let reader = new FileReader()
                    reader.onload = function (e) {
                        let content = e.target?.result as string
                        FN_GetDispatch()(
                            FN_SetTextValueFromOutSideByBigTextId(inputBigTextId, content),
                        );
                    }
                    reader.readAsText(file)
                });
            }
        },
        {
            icon: 'color-fill',
            text: Dot("IdfUH5", "Example"),
            intent: "none",
            className: "",
            enableActionMode: true,
            afterText: Dot("OO0qPN", "Example Loaded"),
            afterIntent: "none",
            title: Dot("5lW8qp", "Show an example for this tool"),
            // outlined: true,
            afterTitle: Dot("OeO0PeN", "Okay, the example is displayed in the input editor."),
            loading: loadExample,
            onClick: async () => {
                try {
                    onLoadExample(true);
                    let val: string = props.crtDefaultOpera?.getOptDetail()?.exampleInput || ''
                    if (_.isEmpty(val)) {
                        let r = await AjaxUtils.DoStaticRequest({
                            url: "/example/" + toolHandler?.getMetaInfo()?.exampleType + ".txt",
                        });
                        if (r.status != 200) {
                            throw new Error(Dot("vU17B", "Unable to send the request"));
                        }
                        val = r.data;
                    }
                    FN_GetDispatch()(
                        FN_SetTextValueFromOutSideByBigTextId(inputBigTextId, val),
                    );
                } catch (e) {
                    console.log(e);
                    AlertUtils.popError(e as any);
                } finally {
                    onLoadExample(false);
                }
            },
        },
        ...([
            {
                icon: hideRelatedToolsBar == 't' ? 'folder-close' : 'folder-open',
                intent: "none",
                minimal: true,
                title: hideRelatedToolsBar != 't' ? Dot("XRU5eWbkd", "Hide Other Operations") : Dot("onjVw7xsj", "Show Other Operations"),
                onClick: () => {
                    let newVal: TrueFalseType = hideRelatedToolsBar == "t" ? "f" : "t";
                    FN_GetDispatch()(
                        ParamStateSlice.actions.updateOneOfParamState({
                            hrts: newVal
                        })
                    );
                }
            }
        ]) satisfies ActionButtonProps[]
    ]
    if (props.loadingStatic) {
        // leftActions.forEach(x => {
        //     x.loading = true;
        // })
        // leftActions_2.forEach(x => {
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
        {
            // icon: "export",
            icon: "download",
            intent: "success" as any,
            className: "btn-purple",
            text: Dot("o52xW", "Export"),
            title: Dot("i88tb", "Export Result to File"),
            onClick: () => {
                let outputValue = FN_GetActualTextValueByBigTextId(props.outputBigTextId)
                if (outputValue == '') {
                    AlertUtils.popMsg('warning', {
                        message: Dot("1h6jH", "Warning, the output is an empty value whose length is zero!")
                    })
                }
                js_export_trigger({
                    saveValue: outputValue,
                    filename: `result-${Date.now()}.txt`
                })
            }
        },

        {
            icon: "series-configuration",
            intent: hideSettingPanel ? "none" : "success",
            className: hideSettingPanel ? "" : "btn-lime",
            title: hideSettingPanel ? Dot("CEB76UtFY", "Hide Settings") : Dot("vYU1HVe-C", "Show Settings"),
            onClick() {
                triggerSettingPanel(!hideSettingPanel);
            }
        },
        // {
        //     icon: "console",
        //     intent: hideBottomPanel ? "none" : "success",
        //     className: hideBottomPanel ? "" : "btn-lime",
        //     title: hideBottomPanel ? Dot("1IrWC1qw", "Hide Bottom Panel") : Dot("pENGfAKuz", "Show Bottom Panel"),
        //     onClick() {
        //         triggerBottomPanel(!hideBottomPanel);
        //     }
        // },

        {
            icon: "rect-width",
            intent: shouldVerticalMode ? "none" : "success",
            className: shouldVerticalMode ? "" : "btn-lime",
            title: shouldVerticalMode ? Dot("y7LSbS5l4", "Switch to Vertical Mode") : Dot("7zlGdIUGvj", "Switch to Horizontal Mode"),
            onClick() {
                FN_GetDispatch()(
                    ParamStateSlice.actions.updateOneOfParamState({
                        ltr: shouldVerticalMode ? 't' : 'f',
                    })
                );
            }
        },
        // {
        //     icon: 'eraser',
        //     intent: 'none',
        //     title: Dot("IJjSINgO0", "Reset the tool to default state"),
        //     onClick: () => {
        //         if (!confirm(Dot("OjdV1-pMy", "Are you sure to reset the tool to default state?"))) {
        //             return;
        //         }
        //     },
        // },
        {
            icon: 'search',
            intent: 'none',
            title: Dot("6SypzjeRz", "Quickly search tools that you need"),
            popoverItem: (props) => {
                return (
                    <div style={{ width: '300px', height: '580px', overflow: 'auto' }}>
                        <InnerToolPanel onPopClose={props.onPopClose} onPopRedirectPage={(x, newTab) => {
                            if (true) {
                                let toolId = x.id
                                let possibleRouteArr = appTool2PageMap[toolId]
                                if (!possibleRouteArr) {
                                    AlertUtils.popMsg('warning', {
                                        message: Dot("srynotavai", "Sorry, the tool is not available now.")
                                    })
                                    return
                                } else {
                                    let pagePathArr = possibleRouteArr[0].pagePath
                                    // TODO: we've reset sidebar op id curerntly, but wonder whether we should keep it and reset it by url parameter or not
                                    // pagePathArr[pagePathArr.length - 1] = pagePathArr[pagePathArr.length - 1] + "?nqop=true"
                                    let goLink = fmtURL_ToolSubPageClient([
                                        URL_SUBCATEGORY_GO_PATH,
                                        ...pagePathArr,
                                    ])
                                    if (newTab) {
                                        window.open(
                                            goLink
                                        )

                                    } else {
                                        location.href = goLink
                                    }
                                }
                            }
                        }} />
                    </div>
                )
            },
        }
    ];
    return (
        <div
            className={
                " w-full using-edge-ui-bg flex border-b-[1px] dark:border-gray-600 px-1  flex-column items-center justify-between "
                +
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
                    props.activeOpBtn ?
                        <CommonButtonForOriginRelatedAndOthers popoverItem={
                            <CommonButtonForOriginRelatedAndOthers noIcon mainControlBarMode={false} {...props} opBtns={props.otherOpBtns || []} />
                        } mainControlBarMode {...props} opBtns={[props.activeOpBtn]} />
                        : ''
                }
                {leftActions_2.map(fn_format_button("bottom-start"))}
            </div>
            <div className={controlClz}>
                <CopyButton
                    placement="bottom-end"
                    extraButtonProps={{
                        small: true,
                    }}
                    enableTextMode
                    onCopy={() => {
                        let outputValue = FN_GetActualTextValueByBigTextId(props.outputBigTextId)
                        if (outputValue == '') {
                            AlertUtils.popMsg('warning', {
                                message: Dot("1h6jH", "Warning, the output is an empty value whose length is zero!")
                            })
                        }
                        gutils.copy(outputValue)
                    }}></CopyButton>
                {rightActions.map(fn_format_button("bottom-end"))}
            </div>
        </div>
    );
};

export default TextTransformerControl