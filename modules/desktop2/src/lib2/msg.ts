export const OBJ_MSG_TYPE_IPC_MAIN = {
    'updateTitle': 1,
    'openLogDir':1,
    'reportLogToServer':1,
    // minimal server
    startRunMDGJXMinimal: 1,
    getRunMDGJXMinimalStatus: 1
}
export const OBJ_MSG_TYPE_IPC_RENDER = {
    pushInitStatusToRender:1
}
// get key as type
export type MsgTypeIpcMain = keyof typeof OBJ_MSG_TYPE_IPC_MAIN;
export type MsgTypeIpcRender = keyof typeof OBJ_MSG_TYPE_IPC_RENDER;
export type IpcMainOnTypeFn_on = (key:MsgTypeIpcMain, ...value:any)=>Promise<any>
export type IpcRenderOnTypeFn_on = (key:MsgTypeIpcRender, ...value:any)=>Promise<any>
export type IpcRenderTypeFn_send = (key:MsgTypeIpcMain,...value:any)=>Promise<any>
export type IpcMainTypeFn_send = (key:MsgTypeIpcRender,...value:any)=>Promise<any>
export type MsgRefType = {
    ipcMain_on: IpcMainOnTypeFn_on,
    ipcRender_send: IpcRenderTypeFn_send
    ipcRender_on: IpcRenderOnTypeFn_on,
    ipcMain_send: IpcMainTypeFn_send
}

export const MSG_REF:MsgRefType = {
    ipcMain_on: function(key:MsgTypeIpcMain, value: any){
        throw new Error('ipcMain_on not implemented')
    },
    ipcRender_send: async function(key:MsgTypeIpcMain,value:any):Promise<any>{
        throw new Error('ipcRender_send not implemented')
    },
    ipcRender_on: function(key, value: any){
        throw new Error('ipcRender_on not implemented')
    },
    ipcMain_send: async function(key,value:any):Promise<any>{
        throw new Error('ipcMain_send not implemented')
    },

}
// you should implement above functions in your main process and renderer process
const GLOBAL_MSG_KEY = 'GLOBAL_MSG_KEY'

export const APP_GET_MSG = (window:any):MsgRefType|null=>{
    return window[GLOBAL_MSG_KEY] || null
}
export const APP_SET_MSG = (window:any, value:any)=>{
     window[GLOBAL_MSG_KEY]=value
}