import { isDevEnv } from "@/env";
import { useLayoutEffect, useRef, useState } from "react";
import AuthUtils, { useHasUserSignIn } from "./AuthUtils";
import { PAGE_SESSION_ID } from "./PageUtils";
import _ from "lodash";
import queryString from "query-string";
export type WsMsgBody = {
    id:string,
    whoami: 'client' | 'server';
    // pageSessionId:string,
    // headers?: any;
    status: number;
    value: any;
};
export const havingMsgBody = (id: string,status: number, value?: any): string => {
    return JSON.stringify({
        id,
        whoami: 'client',
        // pageSessionId: PAGE_SESSION_ID,
        status: status,
        value: value || {},
    } satisfies WsMsgBody);
};
export type WsStatus = "connecting"  | "connected" | "authorized" | "closed" | "error" | "initial";
export type WsOnMessage = (msg: WsMsgBody) => void
export type WsEvent = {
    onMessage: WsOnMessage
}

const WS_EVENT_MANAGER: {
    [key:string]: {
        [wsEventId:string]: WsEvent
    }
} = {}
const WS_INIT_MANAGER : {
    [key:string]: {
        status: WsStatus,
        inst: WebSocket
    }
} = {}
const WS_REFRESH_INTERVAL:  {
    [key:string]:any
}={}
export type URLWebsocket = "userchannel" | "adminchannel" | "publicchannel"

export const initWSConn = (url:URLWebsocket)=>{
    if (!AuthUtils.token) {
        return
    }
    if (WS_INIT_MANAGER[url]) {
        if(WS_INIT_MANAGER[url].inst.readyState === WebSocket.OPEN){
            WS_INIT_MANAGER[url].inst.close()
        }
    }
    const i_ws = new WebSocket((
        !isDevEnv() ? 'wss' : 'ws'
    ) + `://${location.host}/ws/` + url + "?" + queryString.stringify({
        token: AuthUtils.token,
        pageSessionId: PAGE_SESSION_ID
    }))
    WS_INIT_MANAGER[url] = {
        status: "initial",
        inst: i_ws
    }
    let setStatus = (status:WsStatus)=>{
        WS_INIT_MANAGER[url].status = status
    }
    setStatus("connecting")
    i_ws.onmessage = (e) => {
        const msg = e.data;
        const reqMsg = JSON.parse(msg) as WsMsgBody;
        switch (reqMsg.id) {
            case 'user-auth-ok':
                setStatus("authorized")
                break;
            default:
                _.forEach(WS_EVENT_MANAGER[url],(v,k)=>{
                    v.onMessage(reqMsg)
                })
                break;
        }
    }
    i_ws.onopen = () => {
        setStatus("connected")
    }
    i_ws.onclose = () => {
        setTimeout(()=>{
            initWSConn(url)
        },2000)
        setStatus("closed")
    }
}

export const useWebsocket = (url: URLWebsocket, wsEventId:string, wsEvents:WsEvent): [WebSocket | null, WsStatus] => {
    if (!WS_EVENT_MANAGER[url]) {
        WS_EVENT_MANAGER[url] = {}
    }
    WS_EVENT_MANAGER[url][wsEventId] = wsEvents

    return [
        WS_INIT_MANAGER[url]?.inst || null,
        WS_INIT_MANAGER[url]?.status || "initial"
    ]
}