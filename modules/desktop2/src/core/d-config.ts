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
    return path.join(cfg_getRootFolder(), "minimal-dist",  "MDGJX","");
}

// CLIENT
export const cfg_getAppMainHost = ()=>{
    return isDevEnv() ? 'http://localhost:5173' : 'http://localhost:5173'
}
export const cfg_getAppClientEntryPage = ()=>{
    return cfg_getAppMainHost()+'/setup'
}

// LOCAL
export const cfg_getAppLocalHost = ()=>{
    return isDevEnv() ? 'http://localhost:20167' : path.join(cfg_getRootFolder(),'pages-dist','local','index.html')
}
export const cfg_getAppLocalLoadingPage = ()=>{
    return cfg_getAppLocalHost() 
    // +'/#/loading'
}
