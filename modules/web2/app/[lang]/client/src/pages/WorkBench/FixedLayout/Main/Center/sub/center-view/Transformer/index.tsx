
// Date: Sat, 9 Dec 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import { Alignment, Button, ButtonProps, Icon, Intent, Navbar, OL, PortalContext, Tab, Tabs, Tooltip } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../../components/GenCodeMirror";
import {
  VAL_CSS_TAB_TITLE_PANEL,
  VAL_CSS_CONTROL_PANEL,
  VAL_MENU_LEFT_PANEL_WIDTH,
  OnProcessFnType,
} from "../../../../../../../../types/workbench-types";
import { CommonTransformerPassProp } from "../../../../../../../../types/workbench-types";
import { Dot } from "../../../../../../../../utils/cTranslationUtils";
import { FN_GetDispatch } from "../../../../../../../../nocycle";
import BigTextSlice from "../../../../../../../../reducers/bigTextSlice";
import _, { defer } from "lodash";
import { FN_GetActualTextValueByBigTextId, FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../actions/bigtext_action";
import { findLastIndex } from "lodash";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import AjaxUtils from "../../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../../utils/AlertUtils";
import { SysTabPane } from "../../../../../../../../components/SysTabPane";
import { CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER } from "../../../../../../../../types/constants";
import exportUtils from "../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../reducers/runtimeStatusSlice";

import { ClientPortalContext, CommonTransformerProps } from "./types";
import { ExtensionAction, ToolDefaultOutputType as ToolCurrentRuntimeStatus, ToolDefaultOutputType } from "../../../../../../../../types/purejs-types-READ_ONLY";
import { TransformerWithRuntime, controlBarHeight, fn_coll_config, fn_coll_output, useCurrentActiveStyle, useRuntimeStatusAndToolConfig } from "./hooks";
import ControlBar, { useHideBottomAndSettingHook } from "./ControlBar/index.tsx";
import LoadingText from "../../../../../../../../components/LoadingText";
import { Allotment, AllotmentHandle } from "allotment";
import ProcessPanel from "./ProcessPanel/index.tsx";
import { ACTION_Transformer_Process_Text, ACTION_Transformer_Process_Text_Delay } from "../../../../../../../../actions/transformer_action";
import Operation, { OptDetail } from "../../../../../../../../impl/core/Operation.tsx";
import gutils, { getTextStrFromHTML } from "../../../../../../../../utils/GlobalUtils";
import appToolInfoObj, { AppInfoType, AppOpDetail, AppToolConversionIdCollectionSet, loadConversionTSXById } from "../../../../../../../../impl/tools/d_meta.tsx";
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
import { ToolTitlebar } from "./toolTitlebar.tsx";
import { useGetNotifyTextFunction } from "./hooks.tsx";
import MemoryStateSlice from "@/app/[lang]/client/src/reducers/state/memoryStateSlice.tsx";
import SubControlBar, { useHideRelatedToolsbarAndRelatedSubControllbar } from "./SubControlBar/index.tsx";
import { getAppOptFnMap } from "@/app/[lang]/client/src/impl/tools/g_optlist.tsx";
import { satisfies } from "semver";
import { GOLD_RATE } from "@/app/__CORE__/meta/constants.tsx";

COMMON_FN_REF.Dot = Dot
export let formattedOpId = (id?: string) => {
  return id || 'd3JaRZoky'
}
export type AppOptViewMode = "fixed" | "float"

export type TitleSubPair = {
  title: string
  subTitle: string
}

export let useShouldVerticalModeOrNot = () => {
  let v = exportUtils.useSelector((v) => {
    return {
      bottom_hide: v.layout.menuHide.bottom,
      ltr: v.paramState.ltr == 't',
    };
  });
  if (v.ltr) {
    return false;
  }
  return v.bottom_hide;
}

export type TransformerPassProps = CommonTransformerPassProp & {

}

export type OpButtonStyleProps = {
  type: 'origin' | 'related' | 'sidebar'
  opId: string,
  name: string,
  desc: string,
  isParentTrigger: boolean,
  // isCurrent: boolean,
  onClick?: () => void
}

export default (props: CommonTransformerProps) => {
  let sessionId = props.sessionId;

  let inputBigTextId = props.inputBigTextId;
  let outputBigTextId = props.outputBigTextId;

  let extId = props.extId
  let operaRef = useRef<ToolHandler | undefined>(undefined)
  let metaInfo = operaRef.current?.getMetaInfo()
  let operaList = operaRef.current?.getOperations()

  let opDetails = useMemo(() => {
    return getAllOperationDetails()
  }, [])
  let { crtToolCfg, crtRuntimeStatus } = useRuntimeStatusAndToolConfig({
    sessionId
  })
  let [extraOpList, onExtraOpList] = useState<Operation[]>([])
  let [loadingExtraOpList, onLoadingExtraOpList] = useState(false)
  let originalCrtDefaultOperaId = crtToolCfg && crtToolCfg.dftOpId || (operaList && operaList[0] && operaList[0].fileID)
  let crtSideMenuOperaId = crtToolCfg && crtToolCfg.sideOpId
  let crtSideMenuOpera = useMemo(() => {
    return _.find((extraOpList || []), (x: Operation) =>
      x.fileID == crtSideMenuOperaId + "")
  }, [crtSideMenuOperaId, extraOpList])

  let { crtDefaultOpera, originalCrtDefaultOpera, actualCrtDefaultOperaId } = useMemo(() => {
    let r = _.find((operaList || []), x => x.fileID === originalCrtDefaultOperaId) || (
      _.first(operaList)
    )
    let isSideMenuOperaMode = crtSideMenuOperaId && crtSideMenuOpera && !loadingExtraOpList
    return {
      crtDefaultOpera: isSideMenuOperaMode ? crtSideMenuOpera : r,
      actualCrtDefaultOperaId: isSideMenuOperaMode ? crtSideMenuOperaId : originalCrtDefaultOperaId,
      originalCrtDefaultOpera: r,
    }
  }, [originalCrtDefaultOperaId, operaList, crtSideMenuOperaId, crtSideMenuOpera, loadingExtraOpList])

  let { triggerProcessCtn } = exportUtils.useSelector(v => {
    return {
      triggerProcessCtn: v.memoryState.siteToolOptRenderMap[sessionId] || 0
    }
  })
  let setTriggerProcessCtn = (newValue: number) => {
    FN_GetDispatch()(
      MemoryStateSlice.actions.updateOneOfParamState({
        siteToolOptRenderMap: {
          [sessionId]: newValue
        }
      })
    )
  }
  let { hideRelatedToolsBar, subControlbarTools } = useHideRelatedToolsbarAndRelatedSubControllbar({
    originalCrtDefaultOpera: originalCrtDefaultOpera,
    crtSideMenuOpera: crtSideMenuOpera,
    crtSideMenuOperaId: crtSideMenuOperaId,
    operaList: operaList || [],
  })
  let bodyHeight = `calc(100% - ${controlBarHeight * (
    hideRelatedToolsBar == 't' ? 1 : 2
  )}px)`;

  let throlttedOnProcessCtn = (
    useCallback(_.throttle(setTriggerProcessCtn, 1000), [])
  )

  let onProcess: OnProcessFnType = (throttledType?: boolean): void => {
    if (throttledType) {
      throlttedOnProcessCtn(Date.now())
    } else {
      setTriggerProcessCtn(Date.now())
    }
  }

  let fn_updateToolConfig = (arg: Partial<ToolConfigMapVal>) => {
    FN_GetDispatch()(
      ParamStateSlice.actions.updateOneOfParamState({
        tlcfg: {
          [sessionId]: {
            ...(crtToolCfg || {}),
            ...arg
          }
        }
      })
    )
  }
  let fn_switchToSideMenuExtraOp = async function (id) {
    try {
      fn_updateToolConfig({
        sideOpId: id
      })
      onLoadingExtraOpList(true)
      let conver = await loadConversionTSXById(id)
      if (conver && conver.getOptDetail && conver.getOptDetail()) {
        onExtraOpList([conver])
        onLoadingExtraOpList(false)
      } else {
        AlertUtils.popMsg("warning", {
          message: Dot("Kw7oVB8kp", "Unable to load this operation")
        })
      }
    } catch (e: any) {
      AlertUtils.popMsg("danger", {
        message: Dot("gLs6rHJKT", "Failed to process due to an error: {0}", gutils.getErrMsg(e))
      })
    }
  }
  useEffect(() => {
    if (crtSideMenuOperaId) {
      defer(() => {
        fn_switchToSideMenuExtraOp(crtSideMenuOperaId)
      })
    }
  }, [crtSideMenuOperaId,])
  let extVM = props.extVM


  let fn_isSidebarMenuOpModeNow = (commonPassProp: CommonTransformerPassProp) => {
    return (
      commonPassProp && commonPassProp.crtSideMenuOperaId && commonPassProp.crtSideMenuOpera
    )
  }
  let fn_format_description = (desc: string | undefined): string => {
    let optDetail = commonPassProp.crtDefaultOpera?.getOptDetail()
    let affix = (
      ' - ' + commonPassProp.crtDefaultOpera?.getOptDetail()?.optName || 'N/A'
    )
    if (fn_isSidebarMenuOpModeNow(commonPassProp)) {
      affix = ` - ${commonPassProp.crtSideMenuOpera?.getOptDetail()?.optName}`
      desc = commonPassProp.crtSideMenuOpera?.getOptDetail().optDescription
    }

    let arr: TitleSubPair[] = [
      {
        title: Dot("wcl1K", "Usage") + affix,
        subTitle: Dot("rT34qnO", "Enter text for processing. The result will display in the output editor.")
      },
      {
        title: Dot("8eeL1Kk", "About", optDetail?.optName) + affix,
        subTitle: getTextStrFromHTML(desc?.replace(/\\n/g, '\n') + "")
      },
      {
        title: Dot("SYSq1", "Example"),
        subTitle: Dot("GR7jK", "Type") + ": " + optDetail?.optName + "\n" + Dot("vh9j4", "Input") + ": " + (optDetail?.exampleInput) + "\n" + Dot("dGKMx", "Output") + ": " + optDetail?.exampleOutput + ""
      }
    ]
    return arr.map(x => `[${x.title}]\n${x.subTitle}`).join("\n\n")
  }


  // START: get active operation and other alternative operations
  // get active operation and other alternative operations
  let {
    otherOpBtns,
    activeOpBtn
  } = useMemo(() => {
    let allOpBtns: OpButtonStyleProps[] = [];
    // operaList
    // originalCrtDefaultOpera?.getOptDetail().relatedID
    // op.crtSideMenuOpera && op.crtSideMenuOperaId
    let parentTriggered = crtRuntimeStatus && (crtRuntimeStatus.processOK || crtRuntimeStatus.processing);
    (operaList || [])?.forEach((x: Operation) => {
      let optDetail = x.getOptDetail()
      let crtId = x?.fileID;
      let crtDesc = optDetail?.optDescription
      let crtName = optDetail?.optName || x.name
      // let isHighlightOne = crtId == crtDefaultOperaId && !(
      //   props.crtSideMenuOpera && props.crtSideMenuOperaId
      // ) && !props.loadingExtraOpList;
      allOpBtns.push({
        type: 'origin',
        name: crtName,
        desc: crtDesc,
        opId: crtId,
        isParentTrigger: parentTriggered || false,
        // isCurrent: isHighlightOne,
        // onClick: () => {
        //   props.fn_updateToolConfig({
        //     sideOpId: '',
        //     dftOpId: crtId
        //   })
        //   setTimeout(() => {
        //     props.onProcess()
        //   }, 0)
        // }
      })
    })
    let fnmap = getAppOptFnMap()
    let relatedID = originalCrtDefaultOpera?.getOptDetail().relatedID
    if (relatedID) {
      let arr = AppToolConversionIdCollectionSet[relatedID]
      arr.map(x => {
        return {
          ...fnmap[x]({ Dot }),
          optOptionalId: x
        } satisfies AppOpDetail
      }).forEach((x: AppOpDetail) => {
        allOpBtns.push({
          opId: formattedOpId(x.optOptionalId),
          type: 'related',
          name: x.optName,
          desc: x.optDescription,
          isParentTrigger: parentTriggered || false,
        })
      });
    }
    let isCurrentMenuOperationMode = crtSideMenuOpera && crtSideMenuOperaId
    if (isCurrentMenuOperationMode) {
      let arr = [
        {
          ...fnmap[crtSideMenuOperaId + ""]({ Dot }),
          optOptionalId: crtSideMenuOperaId,
        },
      ] satisfies AppOpDetail[]
      arr.map(x => {
        return {
          ...fnmap[crtSideMenuOperaId + ""]({ Dot }),
          optOptionalId: crtSideMenuOperaId + ""
        } satisfies AppOpDetail
      }).forEach((x: AppOpDetail) => {
        allOpBtns.push({
          opId: formattedOpId(crtSideMenuOperaId),
          type: 'sidebar',
          name: x.optName,
          desc: x.optDescription,
          isParentTrigger: parentTriggered || false,
        })
      });
    }
    // filter it
    let duplicateObj = {}
    allOpBtns = allOpBtns.filter(x => {
      let crtOpId = formattedOpId(x.opId + "")
      if (duplicateObj[crtOpId]) {
        return false
      }
      duplicateObj[crtOpId + ""] = true
      return true
    })
    let activeOpBtn = _.find(allOpBtns, x => x.opId == actualCrtDefaultOperaId)
    let otherOpBtns = _.filter(allOpBtns, x => formattedOpId(x.opId) != formattedOpId(actualCrtDefaultOperaId))
    console.log('otherOpBtns', {
      actualCrtDefaultOperaId,
      otherOpBtns,
      activeOpBtn
    })
    return {
      otherOpBtns,
      activeOpBtn
    }
  }, [
    crtRuntimeStatus,
    crtDefaultOpera,
    crtSideMenuOpera,
    crtSideMenuOperaId,
    operaList,
    loadingExtraOpList,
    originalCrtDefaultOpera,
    originalCrtDefaultOperaId,
  ])
  // END: get active operation and other alternative operations

  let commonPassProp: CommonTransformerPassProp = {
    ...props,
    activeOpBtn,
    otherOpBtns,
    opDetails,
    hideRelatedToolsBar,
    toolHandler: operaRef.current,
    onProcess,
    operaList,
    metaInfo,
    subControlbarTools,
    crtToolCfg,
    fn_isSidebarMenuOpModeNow,
    originalCrtDefaultOpera,
    crtDefaultOperaId: originalCrtDefaultOperaId,
    crtDefaultOpera,
    loadingExtraOpList,
    crtSideMenuOperaId,
    crtSideMenuOpera,
    fn_updateToolConfig,
    fn_switchToSideMenuExtraOp
  }
  let fn_notifyTextChange = useGetNotifyTextFunction({
    ...commonPassProp,
    crtRuntimeStatus
  })
  let desc = fn_format_description(commonPassProp.toolHandler?.getMetaInfo().description)
  logutils.debug("commonPassProp", commonPassProp, extraOpList)
  useEffect(() => {
    if (triggerProcessCtn != 0) {
      fn_notifyTextChange(false)
    }
  }, [triggerProcessCtn])
  // TODO: keep last 5 operation for better usage
  let crtOptMode: AppOptViewMode = ((): AppOptViewMode => {
    return "float"
  })()
  let [loadingStatic, setLoadingStatic] = useState(true)
  let [loadError, onLoadError] = useState<string | null>(null)
  let [loadingProgressRate, setLoadingProgressRate] = useState(0)
  useEffect(() => {
    let tmp_loadingProgressRate = 0
    let loopFn = () => {
      let maxVal = 98.161709;
      if (tmp_loadingProgressRate >= maxVal) {
        clearInterval(timer)
        return
      }
      tmp_loadingProgressRate = Math.min(maxVal, tmp_loadingProgressRate + (Math.random() * 4))
      setLoadingProgressRate(tmp_loadingProgressRate)
    }
    let timer = setInterval(loopFn, 89);
    (async () => {
      try {
        // for CyberChef LEGACY CODE BEGIN
        window["_hash"] = null;
        // for CyberChef LEGACY CODE END
        onLoadError(null)
        setLoadingProgressRate(0)
        setLoadingStatic(true)
        let obj: AppInfoType = appToolInfoObj[props.extId as any]
        if (!obj.ImportImpl) {
          logutils.warn("no import impl")
          alert("ERROR:2X1QQz-7s")
          return;
        }
        let opera: any = await obj.ImportImpl()
        let newOpera: ToolHandler = new opera["default"]();
        let names = newOpera.getOperationsByName()
        let waitArr: Promise<void>[] = []
        for (let name of names) {
          waitArr.push((async () => {
            let nameFN = await loadConversionTSXById(name)
            if (nameFN) {
              newOpera.addOperation(name, nameFN)
            }
          })())
        }
        for (let waitItem of waitArr) {
          await waitItem;
        }
        operaRef.current = newOpera
        if (operaRef.current) {
          operaRef.current.id = props.extId + ""
        }
        window.clearInterval(timer)
        setLoadingStatic(false)
      } catch (e) {
        logutils.debug('loading-Transformer', e)
        let anyError = gutils.getErrMsg(e)
        onLoadError(anyError)
        window.clearInterval(timer)
      } finally {
        setLoadingStatic(false)
      }
    })()
    return () => {
      window.clearInterval(timer)
    }
  }, [sessionId])

  let shouldVerticalMode = useShouldVerticalModeOrNot()

  let { fullScreen, hideSideBar } = exportUtils.useSelector(v => {
    return {
      hideSideBar: v.paramState.hsr,
      fullScreen: false
    }
  })

  let dis = useDispatch()
  useEffect(() => {
    let b = RuntimeStatusSlice.actions.initAtOnceBySessionIdAndValue({
      sessionId,
      value: getInitValueForRuntimeStatus(),
    })
    dis(
      b
    )
  }, [sessionId])
  let { hideBottomPanel: hideBottomPanel, hideSettingPanel } = useHideBottomAndSettingHook()

  if (!crtRuntimeStatus) {
    return <div className="w-full h-full">
      <LoadingText></LoadingText>
    </div>
  }

  if (loadingStatic) {
    let pre = loadingProgressRate.toFixed(2)
    let b = pre.split('.')
    if (b.length == 1) {
      pre += '.00'
    }
    desc = Dot("OqqGx2qg", "Loading the static resources, please wait...") + "\n" + (
      Dot("AkXgF", "In Progress: {0}%", pre)
    ) + "\n"
  }
  if (loadError) {
    desc = `${Dot("RO4ZP", "An Error Occurred")}: \n${loadError}`
  }

  let jsx_process_settings_panel = hideBottomPanel ? '' :
    <ProcessPanel hideSettingPanel={hideSettingPanel} disableSeparateOutputMode={false} crtRuntimeStatus={crtRuntimeStatus} {...commonPassProp}></ProcessPanel>
  if (loadError) {
    return <ShowErrorPanel loadError={loadError}></ShowErrorPanel>
  }

  let currentOptDetail: OptDetail | null | undefined = commonPassProp && commonPassProp.crtDefaultOpera && commonPassProp.crtDefaultOpera.getOptDetail()

  let app_right_input_jsx = (
    <GenCodeMirror
      lineWrap={currentOptDetail && currentOptDetail?.inputNoWrap ? false : true}
      icon='generate'
      title={Dot("XdOYpbSeG", "Input")}
      placeholder={desc || Dot("xPHqP", "The description is not yet defined.")}
      language={commonPassProp.crtDefaultOpera?.getInputOutputEditorLang()?.inputLang}
      key={inputBigTextId}
      bigTextId={inputBigTextId}
      onTextChange={(val) => {
        fn_notifyTextChange(true)
      }}
    ></GenCodeMirror>
  )
  let app_right_output_jsx = (
    <div className="w-full h-full overflow-auto">
      <GenCodeMirror
        icon='export'
        readOnly
        title={Dot("XdOYpsdf", "Output")}
        lineWrap={currentOptDetail && currentOptDetail?.outputNoWrap ? false : true}
        language={commonPassProp.crtDefaultOpera?.getInputOutputEditorLang()?.outputLang}
        placeholder={Dot("y_9YM", "Output will be displayed here.")}
        bigTextId={props.outputBigTextId}
      ></GenCodeMirror>
    </div>
  )


  let app_right_b_jsx = jsx_process_settings_panel

  let controlBarProps = {
    loadingStatic,
    crtOptMode,
    crtRuntimeStatus,
    ...commonPassProp
  }
  let r_width_perc = !shouldVerticalMode ? 35 : 28
  let jsx_ipt_output_panel = <Allotment
    vertical={shouldVerticalMode}
    key={shouldVerticalMode + "xxxs" + hideBottomPanel}
  >
    <Allotment.Pane preferredSize={'50%'}>
      {app_right_input_jsx}
    </Allotment.Pane>
    <Allotment.Pane preferredSize={'50%'}>
      {app_right_output_jsx}
    </Allotment.Pane>
  </Allotment>
  console.log('hideBottomPanel', hideBottomPanel)
  let app_right_jsx = <>
    <ControlBar  {...controlBarProps}></ControlBar>
    {
      hideRelatedToolsBar == 't' ? '' : <SubControlBar {...controlBarProps}></SubControlBar>
    } <div
      style={{
        height: bodyHeight,
      }}
      className="w-full overflow-auto "
    >
      {
        props.needFullPageSupport ? (
          <div className="w-full">
            {app_right_input_jsx}
            {app_right_b_jsx}
          </div>
        ) :
          hideBottomPanel ? jsx_ipt_output_panel :
            (
              <Allotment
                key={shouldVerticalMode + 'x1' + hideBottomPanel} vertical={!shouldVerticalMode}>
                <Allotment.Pane
                  key={shouldVerticalMode + 'x5' + hideBottomPanel}
                  preferredSize={
                    (
                      100 - r_width_perc) + '%'}
                >
                  {jsx_ipt_output_panel}
                </Allotment.Pane>
                {
                  <Allotment.Pane
                    key={shouldVerticalMode + 'x3' + hideBottomPanel}
                    preferredSize={hideBottomPanel ? '0' : (
                      r_width_perc) + '%'}
                  >
                    {jsx_process_settings_panel}
                  </Allotment.Pane>
                }
              </Allotment>
            )
      }
    </div>
  </>
  let app_left_jsx = <Sidemenu
    crtRuntimeStatus={crtRuntimeStatus} {...commonPassProp}
  />
  let transformerFullScreenClzIfNeeded = " w-full h-full relative "
  if (fullScreen) {
    transformerFullScreenClzIfNeeded = " w-screen h-screen fixed left-0 top-0 z-[9999] " + CSS_BG_COLOR_WHITE
  }
  if (props.needFullPageSupport) {
    transformerFullScreenClzIfNeeded = 'w-full h-auto '
  }

  let defaultLeftWidth = VAL_MENU_LEFT_PANEL_WIDTH

  let infoObj: AppInfoType = appToolInfoObj[props.extId || '']
  let toolTitle = infoObj.LabelFn(Dot) || 'N/A';
  if (commonPassProp.loadingExtraOpList) {
    toolTitle = Dot("3XstvdK", "Loading the selected quick operation...")
  } else {
    // if (commonPassProp.crtSideMenuOpera && commonPassProp.crtSideMenuOperaId) {
    //   let optNameNow = commonPassProp.crtSideMenuOpera.getOptDetail()?.optName || 'N/A'
    //   if (optNameNow != 'N/A' && toolTitle != optNameNow) {
    //     toolTitle = `${toolTitle} - ${optNameNow}`
    //   }
    //   // toolTitle = Dot("rcVSYDdBN0", "Quick Operation: {0}", optNameNow)
    // }
  }

  let body = <div key={sessionId} className={
    " " + transformerFullScreenClzIfNeeded
  } style={{
  }}>
    {
      props.needFullPageSupport ? <div className='w-full flex flex-row'>
        <div className={border_clz_common + ' border-r-[1px] '} style={{
          width: defaultLeftWidth + 'px'
        }}>{app_left_jsx}</div>
        <div style={{
          width: `calc(100% - ${defaultLeftWidth}px)`
        }}>
          {app_right_jsx}
        </div>
      </div> :
        <Allotment vertical={false} style={{
        }}>

          {
            hideSideBar == 't' ? '' : <Allotment.Pane preferredSize={280} >
              {app_left_jsx}
            </Allotment.Pane>
          }
          <Allotment.Pane>
            <div className="w-full h-full flex flex-col">
              {/* <ToolTitlebar title={toolTitle} /> */}
              <div style={{
                flex: '1',
              }}>
                {app_right_jsx}
              </div>
            </div>
          </Allotment.Pane>
        </Allotment>
    }
  </div>
  let needFullPageSupport = props.needFullPageSupport
  let constructedKey = 'xmGBxtFdi'
  return (
    <div className="w-full h-full">
      <div
        style={{
          height: '100% '
          // height: needFullPageSupport ? 'auto' : clientPortalContext.portalMode ? '100%' : `calc(100% - ${VAL_CSS_MENU_TITLE_PANEL}px)`
        }
        }
        className={' w-full   rounded-sm shadow-sm' + light_border_clz_all + ' ' + CSS_BG_COLOR_WHITE}
        key={constructedKey}
      >
        {body}
      </div>
    </div>
  )
};
