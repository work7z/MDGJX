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
import { CSS_NAV_BP_TAB_HEIGHT, CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER, LabelValuePair } from "../../../../../../../../../types/constants";
import exportUtils from "../../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../../reducers/runtimeStatusSlice";

import { CommonTransformerProps } from "../types";
import { ExtensionAction, ToolDefaultOutputType, Val_ToolTabIndex } from "../../../../../../../../../types/purejs-types-READ_ONLY";
import { TextTransformerProps, TransformerWithRuntime, controlBarHeight, controlClz, fn_coll_output, fn_format_button, useCurrentActiveStyle, useGetNotifyTextFunction as createGetNotifyTextFunction } from "../hooks";
import FormGenPanel, { FormGenItem } from "../../../../../../../../../components/FormGenPanel";
import Operation from "../../../../../../../../../impl/core/Operation.tsx";
import { logutils } from "../../../../../../../../../utils/LogUtils";
import { useShouldVerticalModeOrNot } from "../index.tsx";
import EditableOptions from "@/[lang]/client/src/components/EditableOptions/index.tsx";
import { ProcessPanelProps } from "./index.tsx";
import ParamStateSlice, { ToolPipeline } from "@/[lang]/client/src/reducers/state/paramStateSlice.tsx";
import { useFormattedArgsCheckLabelDotMappings } from "@/[lang]/client/src/impl/tools/r_process_dot.tsx";
import TranslationUtils from "@/__CORE__/utils/cTranslationUtils.tsx";
export let ifnil = (v1: any, v2: any) => {
    return v1 === undefined || v1 === null ? v2 : v1
}

// note that you should use config from Operation not from user input
export let fn_defaultArgValues_fromConfig = (args) => {
    return args.map(x => {
        let xValue = x.value
        if (x.type == 'argSelector') {
            return x.value[0].name
        }
        if (_.isObject(xValue)) {
            if (xValue['value'] !== undefined) {
                return xValue['value']
            }
        }
        if (_.isArray(xValue)) {
            let firstObject = xValue[0];
            if (firstObject && firstObject['value'] !== undefined) {
                return firstObject['value']
            }
            return firstObject
        }
        return xValue
    })
}
export let useGeneralListRead = (props: ProcessPanelProps) => {
    let sessionId = props.sessionId;
    let extVM = props.extVM
    let actions = extVM?.Actions
    let crtRuntimeStatus = props.crtRuntimeStatus
    let toolHandler = props.toolHandler
    let operList = toolHandler?.getOperations() || []
    let { crtDefaultOpera } = props;
    let crtToolCfg = props.crtToolCfg
    // let notifyTextChgFn = createGetNotifyTextFunction(props)
    let formattedArgObj = useFormattedArgsCheckLabelDotMappings()
    let generalList: FormGenItem[] = useMemo(() => {
        let generalList: FormGenItem[] = []
        if (crtDefaultOpera) {
            let config = crtDefaultOpera.getOptDetail().config
            let state_pipeobj = crtToolCfg?.pipemap;
            if (!state_pipeobj) {
                state_pipeobj = {}
            }
            let crtOpId = (props.fn_isSidebarMenuOpModeNow(props) ? props.crtSideMenuOperaId : props.crtDefaultOperaId) + "";
            let state_crtPipeline = state_pipeobj[crtOpId + ""] || {}
            let configArgs = config.args
            let configChecks = config.checks

            if (!state_crtPipeline) {
                state_crtPipeline = {
                    a: fn_defaultArgValues_fromConfig(configArgs),
                    d: 'f',
                    e: {}
                }
            }

            if (!state_crtPipeline.a && _.size(state_crtPipeline.a) != _.size(configArgs)) {
                state_crtPipeline.a = fn_defaultArgValues_fromConfig(configArgs)
            }
            let onArr: number[] = []
            let offArr: number[] = []

            let _eachArgIdx: number = -1
            let formatForName = (name) => {
                if (formattedArgObj[name]) {
                    console.log('formattedArgObj', formattedArgObj)
                    name = formattedArgObj[name] + (
                        !TranslationUtils.IsChinese() ? '' : `(${name})`
                    )
                }
                return name;
            }
            _.forEach(configArgs, (eachArg) => {
                _eachArgIdx++
                let eachArgIdx = _eachArgIdx
                let { type, name, value: _defaultValue } = eachArg;
                eachArg.name = formatForName(name)
                let state_currentValue = state_crtPipeline.a[eachArgIdx]
                let updateValueToState = (newVal) => {
                    let newA = [...state_crtPipeline.a]
                    newA[eachArgIdx] = newVal
                    FN_GetDispatch()(
                        ParamStateSlice.actions.updateCrtToolCfg({
                            sessionId: props.sessionId,
                            pipeMapKey: crtOpId,
                            pipeMapValue: {
                                a: newA,
                                d: state_crtPipeline.d,
                                e: state_crtPipeline.e
                            }
                        })
                    )
                    props.onProcess(true)
                }

                // check if current item is hidden
                if (offArr.indexOf(eachArgIdx) > -1) {
                    return
                }

                // TODO: add check
                // let currentCheck = checks[eachArgIdx]
                switch (type) {
                    case 'boolean':
                        {
                            let value = ifnil(state_currentValue, _defaultValue)
                            generalList.push({
                                label: name,
                                genEleConfig: {
                                    type: "switch",
                                    value: value ? 'true' : 'false',
                                    onChange(newVal) {
                                        updateValueToState(newVal == 'true')
                                    },
                                }
                            })
                        }
                        break;
                    case 'argSelector':
                        let value = ifnil(state_currentValue, _defaultValue[0].name)
                        let currentItem = _defaultValue.find(x => x.name == value)
                        if (!currentItem) {
                            currentItem = _defaultValue[0]
                        }
                        if (currentItem) {
                            onArr.push(...currentItem.on)
                            offArr.push(...currentItem.off)
                        }
                        generalList.push({
                            label: name,
                            genEleConfig: {
                                type: "select",
                                value: value,
                                selectList: _.map(_defaultValue, (eachValue) => {
                                    return {
                                        label: formatForName(eachValue.name),
                                        value: eachValue.name
                                    }
                                }),
                                onChange(newVal) {
                                    updateValueToState(newVal)
                                },
                            }
                        })
                        break;
                    case 'option':
                        {
                            let value = state_currentValue || _defaultValue[0]
                            generalList.push({
                                label: name,
                                genEleConfig: {
                                    type: "select",
                                    value: value,
                                    selectList: _.map(_defaultValue, (eachValue) => {
                                        return {
                                            label: formatForName(eachValue),
                                            value: eachValue
                                        }
                                    }),
                                    onChange(newVal) {
                                        updateValueToState(newVal)
                                    },
                                }
                            })
                        }
                        break;
                    case "string":
                    case "binaryString":
                    case "byteArray":
                    case "shortString":
                    case 'binaryShortString':
                    case "number":
                        {
                            let isNumber = type == "number"
                            let hasShort = type.indexOf("short") > -1 || type.indexOf("Short") > -1
                            let value = ifnil(state_currentValue, _defaultValue)
                            let onChange = (e) => {
                                updateValueToState(e.target.value)
                            }
                            generalList.push({
                                label: name,
                                genEleConfig: {
                                    type: "input",
                                    inputProps: {
                                        type: isNumber ? "number" : "text",
                                        value: value,
                                        onChange: onChange,
                                        fill: !hasShort
                                    },
                                    value: value,
                                    onChange: onChange
                                },
                            })
                        }
                        break;
                    case 'editableOption':
                    case "editableOptionShort":
                        {
                            let value = ifnil(state_currentValue, _defaultValue[0]['value'])
                            let onchg = (val: string) => {
                                updateValueToState(val)
                            }
                            generalList.push({
                                label: name,
                                genEleConfig: {
                                    type: "jsx",
                                    jsxEle: <EditableOptions list={_defaultValue} value={value} onChange={onchg} />
                                },
                            })
                        }
                        break;
                    default:
                        {
                            generalList.push({
                                label: name,
                                genEleConfig: {
                                    type: "jsx",
                                    jsxEle: <div>Not yet supported, {name} missed {type}</div>
                                },
                            })
                        }
                }
            });

        }
        generalList = generalList.sort(x => x.genEleConfig.type == 'switch' ? -1 : 1)
        generalList = [
            {
                aid: 'autorun',
                label: Dot("wRuF9WpU6", "Auto Run"),
                helperText: Dot("Ye3TXses", "To configure whether the transformation will be executed automatically when the input text is changed."),
                genEleConfig: {
                    type: "switch",
                    value: crtRuntimeStatus.autoRun,
                    onChange(newVal) {
                        FN_GetDispatch()(
                            RuntimeStatusSlice.actions.updateValueInStatusMap({
                                sessionId,
                                obj: {
                                    autoRun: newVal == 'true' ? 'true' : 'false'
                                }
                            })
                        )
                    },
                }
            },
            ...generalList
        ]
        return generalList
    }, [crtDefaultOpera, TranslationUtils.CurrentLanguage, formattedArgObj, crtDefaultOpera, crtToolCfg, props.crtSideMenuOperaId, crtRuntimeStatus.autoRun, TranslationUtils.getCurrentLang()])
    return generalList;
}