import { Alignment, Button, ButtonProps, Navbar, OL, PortalContext, Tab, Tabs, Tooltip } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../../components/GenCodeMirror/index.tsx";
import {
    VAL_CSS_TAB_TITLE_PANEL,
    VAL_CSS_CONTROL_PANEL,
    VAL_MENU_LEFT_PANEL_WIDTH,
} from "../../../../../../../../types/workbench-types.tsx";
import { CommonTransformerPassProp } from "../../../../../../../../types/workbench-types.tsx";
import { Dot } from "../../../../../../../../utils/cTranslationUtils.tsx";
import { FN_GetDispatch } from "../../../../../../../../nocycle.tsx";
import BigTextSlice from "../../../../../../../../reducers/bigTextSlice.tsx";
import _, { defer } from "lodash";
import { FN_GetActualTextValueByBigTextId, FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../actions/bigtext_action.tsx";
import { findLastIndex } from "lodash";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import AjaxUtils from "../../../../../../../../utils/AjaxUtils.tsx";
import AlertUtils from "../../../../../../../../utils/AlertUtils.tsx";
import { SysTabPane } from "../../../../../../../../components/SysTabPane.tsx";
import { CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER } from "../../../../../../../../types/constants.tsx";
import exportUtils from "../../../../../../../../utils/ExportUtils.tsx";
import RuntimeStatusSlice from "../../../../../../../../reducers/runtimeStatusSlice.tsx";

import { ClientPortalContext, CommonTransformerProps } from "./types.tsx";
import { ExtensionAction, ToolDefaultOutputType as ToolCurrentRuntimeStatus, ToolDefaultOutputType } from "../../../../../../../../types/purejs-types-READ_ONLY.ts";
import { TransformerWithRuntime, controlBarHeight, fn_coll_config, fn_coll_output, useCurrentActiveStyle } from "./hooks.tsx";
import ControlBar, { useHideBottomAndSettingHook } from "./ControlBar/index.tsx";
import LoadingText from "../../../../../../../../components/LoadingText/index.tsx";
import { Allotment, AllotmentHandle } from "allotment";
import ProcessPanel from "./ProcessPanel/index.tsx";
import { ACTION_Transformer_Process_Text, ACTION_Transformer_Process_Text_Delay } from "../../../../../../../../actions/transformer_action.tsx";
import Operation from "../../../../../../../../impl/core/Operation.tsx";
import gutils from "../../../../../../../../utils/GlobalUtils.tsx";
import appToolInfoObj, { AppInfoType, loadConversionTSXById } from "../../../../../../../../impl/tools/d_meta.tsx";
import { getInitValueForRuntimeStatus } from './init.tsx'
import { ToolHandler as ToolHandler, ToolHandlerClass } from "../../../../../../../../impl/tools/r_handler.tsx";
import { logutils } from "../../../../../../../../utils/LogUtils.tsx";
import ShowErrorPanel from "../../../../../../../../containers/ShowErrorPanel/index.tsx";
import { useDispatch } from "react-redux";
import Sidemenu from "./SideMenu/sidemenu.tsx";
import { CSS_BG_COLOR_WHITE, VAL_CSS_MENU_TITLE_PANEL, border_clz, border_clz_common, light_border_clz_all } from "@/app/__CORE__/meta/styles.tsx";
import COMMON_FN_REF from "@/app/[lang]/client/src/impl/tools/common_ref.tsx";
import { OpDetail, getAllOperationDetails } from "@/app/[lang]/client/src/impl/tools/s_tools.tsx";
import ParamStateSlice, { ToolConfigMap, ToolConfigMapVal } from "@/app/[lang]/client/src/reducers/state/paramStateSlice.tsx";
import { sleep } from "@/app/[lang]/client/src/utils/SyncUtils.tsx";

export let ToolTitlebar = (props: { title: string }) => {
    let { fullScreen, hideSideBar } = exportUtils.useSelector(v => {
        return {
            // fullScreen: v.paramState.fs
            hideSideBar: v.paramState.hsr,
            fullScreen: false // v.paramState.fs 
            // not yet implemented fullScreen 
        }
    })
    let mainTitle = <div className={CSS_BG_COLOR_WHITE + ' relative w-full flex flex-row justify-between px-[2px] items-center text-sm ' + light_border_clz_all + " "} style={{
        borderTop: 'none',
        borderRight: 'none',
        height: VAL_CSS_MENU_TITLE_PANEL
    }}>
        <div>
            <a href="#">
                {/* {Dot("crZZ_WXlw", "View Relevant")} */}
            </a>
        </div>
        <div id="tool-current-title" className={`font-semibold top-[50%] translate-y-[-50%] absolute left-[50%] translate-x-[-50%]`}>
            {props.title}
        </div>
        <div>
            <a href="#">
                {/* {Dot("438yFc2HZ", "Float this Tool")} */}
            </a>
        </div>
    </div>
    return <div className={' w-full flex flex-row'} style={{
        borderBottom: 'none',
        height: VAL_CSS_MENU_TITLE_PANEL
    }}>
        {mainTitle}

    </div>
}