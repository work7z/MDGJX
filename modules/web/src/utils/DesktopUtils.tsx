import { APP_GET_BRIDGE } from "@/lib2/bridge"

const bridgeRef = APP_GET_BRIDGE(window)
export const isDesktopMode = ()=>{
    return bridgeRef != null
}
export const getBridgeRef = ()=>{
    return bridgeRef
}