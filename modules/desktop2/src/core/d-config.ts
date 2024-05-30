import { isDevEnv } from "./web2share-copy/env"

export const cfg_getAppMainHost = ()=>{
    return isDevEnv() ? 'http://localhost:5173' : 'http://localhost:5173'
}

export const cfg_getAppClientEntryPage = ()=>{
    return cfg_getAppMainHost()+'/setup'
}

