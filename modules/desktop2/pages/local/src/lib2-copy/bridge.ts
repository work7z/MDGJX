export const GLOBAL_REF_KEY='MD_APP_BRIDGE'
export type AppConfig = {
    platform: "windows"|"mac"|"linux"
    arch: "x64" | "arm64"
    version: string
    buildInfo: string
}
export interface AppBridge {
  getConfig: () => AppConfig;
  updateTitle: (newTitle: string) => void;
}
export const APP_SET_BRIDGE=(window:any, value:AppBridge):AppBridge=>{
    window[GLOBAL_REF_KEY]= value    
    return value;
}
export const APP_GET_BRIDGE = (window:any):AppBridge|null=>{
    return window[GLOBAL_REF_KEY] || null
}