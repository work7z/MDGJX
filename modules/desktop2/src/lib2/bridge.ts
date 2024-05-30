export const GLOBAL_REF_KEY='APP_BRIDGE'
export type AppConfig = {
    platform: "windows"|"mac"|"linux"
    arch: "x64" | "arm64"
    updateTitle: (newTitle:string)=>void
}
export abstract class AppBridge {
  abstract getConfig: () => AppConfig;
}
export const APP_SET_BRIDGE=(window:any, value:AppBridge)=>{
    window[GLOBAL_REF_KEY]= value    
}
export const APP_GET_BRIDGE = (window:any):AppBridge|null=>{
    return window[GLOBAL_REF_KEY] || null
}