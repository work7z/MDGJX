// LafTools
// 
// Date: Sat, 13 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { Button, ButtonProps, Intent, Placement, Popover, Tooltip, TreeNodeInfo } from "@blueprintjs/core"
import { useRef, useState } from "react"
import { Dot } from "../../utils/cTranslationUtils"
import { TOOLTIP_OPEN_DELAY_BTN } from "@/app/__CORE__/meta/constants";
import _ from "lodash";
export type PopoverItemProps = {
    onPopClose: () => void
    onPopRedirectPage: (x: TreeNodeInfo, newTab: boolean) => any
}
export type ActionButtonProps = ButtonProps & {
    doNotBeMinimalWhenTrigger?: boolean;
    highlightOne?: boolean;
    extraButtonProps?: ButtonProps,
    popoverItem?: (props: PopoverItemProps) => JSX.Element,
    parentTriggered?: boolean;
    placement?: Placement,
    enableActionMode?: boolean,
    // text format
    afterTitle?: string;
    afterText?: string;
    afterIntent?: Intent,
    lastingTime?: number; // by defaults, it's 3000ms
}

export default (props: ActionButtonProps) => {
    let enableTextMode = true;
    // let [parentTriggered, setParentTriggered] = useState(false)
    let { parentTriggered } = props;
    let [triggered, setTrigger] = useState(false)
    let operaRef = useRef({
        copyTimestamp: 0,
        releaseCopyEventFn: () => { },
    })
    let title = triggered ? props.afterTitle : props.title
    let [isOpen, setIsOpen] = useState(false)
    let isMinimal = props.extraButtonProps?.minimal || props.doNotBeMinimalWhenTrigger ? false : enableTextMode ? (
        triggered ? true : false
    ) : true
    let [openPopover, setOpenPopover] = useState(false)
    let hasNoTooltip = _.isEmpty(props.title)
    let btn = <Button
        {...props}
        title={hasNoTooltip ? props.title : ''}
        className={" transition-colors " + " " + props.className}
        onMouseEnter={() => {
            setIsOpen(true)
        }}
        onMouseLeave={() => {
            setIsOpen(false)
            operaRef.current.releaseCopyEventFn()
        }}
        onClick={async (e) => {
            if (props.popoverItem) {
                setOpenPopover(!openPopover)
                return;
            }
            if (
                props.onClick
            ) {
                await props.onClick(e)
            }
            if (!props.enableActionMode) {
                return;
            }
            let v = (new Date().getTime())
            operaRef.current.copyTimestamp = v
            operaRef.current.releaseCopyEventFn = () => { }
            setTrigger(true)
            setTimeout(() => {
                if (operaRef.current.copyTimestamp != v) return;
                let fn = () => {
                    setTrigger(false)
                }
                fn()
            }, props.lastingTime || 1200)
        }} icon={triggered || (props.intent == 'primary' && props.highlightOne && parentTriggered) ? "tick" : props.icon} text={enableTextMode ? (
            triggered ? props.afterText : props.text
        ) : ''} intent={triggered && props.afterIntent ? props.afterIntent : props.intent || "success"} minimal={isMinimal} {...(props.extraButtonProps || {})} ></Button>
    let tooltipCtn = hasNoTooltip ? btn : <Tooltip
        // isOpen={isOpen}
        hoverOpenDelay={500}
        content={title} placement={props.placement || "bottom"} >
        {btn}
    </Tooltip>
    if (props.popoverItem) {
        return <Popover
            isOpen={openPopover}
            content={props.popoverItem({
                onPopClose: () => {
                    setOpenPopover(false)
                },
                onPopRedirectPage: () => {
                    alert('handleSwitchToolReq not implemented')
                }
            })} placement={props.placement || "bottom"} >
            {tooltipCtn}
        </Popover>
    }
    return tooltipCtn
}