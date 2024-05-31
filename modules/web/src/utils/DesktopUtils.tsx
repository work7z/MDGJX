import { APP_GET_BRIDGE } from "@/lib2-copy/bridge"

const bridgeRef = APP_GET_BRIDGE(window)
export const isDesktopMode = ()=>{
    return bridgeRef != null
}
export const getBridgeRef = ()=>{
    return bridgeRef
}

window['bridgeRef'] = bridgeRef