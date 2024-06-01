export const OBJ_MSG_TYPE = {
    'updateTitle': 1,
    'openLogDir':1,
    'reportLogToServer':1,
    // minimal server
    startRunMDGJXMinimal: 1,
    getRunMDGJXMinimalStatus: 1
}
// get key as type
export type MsgType = keyof typeof OBJ_MSG_TYPE;
export type IpcMainOnTypeFn = (key:MsgType, ...value:any)=>Promise<any>
export type IpcRenderTypeFn = (key:MsgType,...value:any)=>Promise<any>
export type MsgRefType = {
    ipcMain_on: IpcMainOnTypeFn,
    ipcRender_send: IpcRenderTypeFn
    ipcRender_on: IpcMainOnTypeFn,
    ipcMain_send: IpcRenderTypeFn
}

export const MSG_REF:MsgRefType = {
    ipcMain_on: function(key:MsgType, value: any){
        throw new Error('ipcMain_on not implemented')
    },
    ipcRender_send: async function(key:MsgType,value:any):Promise<any>{
        throw new Error('ipcRender_send not implemented')
    },
    ipcRender_on: function(key:MsgType, value: any){
        throw new Error('ipcRender_on not implemented')
    },
    ipcMain_send: async function(key:MsgType,value:any):Promise<any>{
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