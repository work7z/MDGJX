import { isDevEnv } from "./web2share-copy/env"
import path from 'path'

// CONFIG
export const cfg_getRootFolder = ()=>{
    return isDevEnv()? path.join(__dirname, "..", ".."):path.join(__dirname, "..", "..")
}
export const cfg_getIconImg=()=>{
    return path.join(cfg_getRootFolder(), "build",  "icon.png");
}


export const cfg_getMinimalMDGJXRootDir=()=>{
    // set HOSTNAME=127.0.0.1
    // set PORT=39899
    // set NODE_ENV=production
    // .\boot\pre-entrypoint.js --type=web2
    return path.join(cfg_getRootFolder(), "minimal-dist",  "MDGJX");
}


export const CONFIG_OBJ = {
    APP_MAIN_HOST_PORT: -1
}
// CLIENT
export const cfg_getAppMainHost = ()=>{
    return isDevEnv() ? 'http://127.0.0.1:5173' : 'http://127.0.0.1:'+CONFIG_OBJ.APP_MAIN_HOST_PORT
}
export const cfg_getAppClientEntryPage = ()=>{
    return cfg_getAppMainHost()+''
}

// LOCAL
export const cfg_getAppLocalHost = ()=>{
    return isDevEnv() ? 'http://127.0.0.1:20167' :'file://'+ path.join(cfg_getRootFolder(),'pages-dist','local','index.html')
}
export const cfg_getAppLocalLoadingPage = ()=>{
    return cfg_getAppLocalHost() 
}

export const cfg_getServerPort = ()=>{
    return isDevEnv()?5173: 42016 // this is a fixed port value for now
}