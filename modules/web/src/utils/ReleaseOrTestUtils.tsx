import { isDevEnv } from "@/env"
import { isOnlineTestMode } from "./PortalUtils"

export let getReleaseOrTestBaseOnCurrentURL = ()=>{
    return isDevEnv() || isOnlineTestMode ? 'test':'release'
}