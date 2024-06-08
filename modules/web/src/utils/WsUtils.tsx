import { isDevEnv } from "@/env";
import { useLayoutEffect, useRef, useState } from "react";
import AuthUtils, { useHasUserSignIn } from "./AuthUtils";
export type WsMsgBody = {
    id:string,
    whoami: 'client' | 'server';
    headers?: any;
    status: number;
    value: any;
};
export const havingMsgBody = (id: string,status: number, value?: any): string => {
    return JSON.stringify({
        id,
        whoami: 'client',
        status: status,
        value: value || {},
    } satisfies WsMsgBody);
};
export type WsStatus = "connecting"  | "connected" | "authorized" | "closed" | "error" | "initial";
export type WsEvent = {
    onMessage: (msg: WsMsgBody) => void
}
let ws: { current: WebSocket | null } = {
    current: null
};

export const useWebsocket = (url: string, wsEvents:WsEvent): [WebSocket | null, WsStatus] => {
    // websocket
    const [status, setStatus] = useState<WsStatus>("initial");
    const isSignIn = useHasUserSignIn()
    //启动
    useLayoutEffect(() => {
        if (!AuthUtils.token){
            return
        }
        if (!isSignIn){
            return;
        }
        if(ws.current){
            return
        }
        setStatus("connecting")
        const i_ws = new WebSocket((
            !isDevEnv() ? 'wss' : 'ws'
        ) + `://${location.host}` + url)
        ws.current = i_ws;
        ws.current.onmessage = (e) => {
            const msg = e.data;
            debugger;
            const reqMsg = JSON.parse(msg) as WsMsgBody;
            switch(reqMsg.id){
                case 'user-auth-ok':
                    setStatus("authorized")
                    break;
                default:
                    wsEvents.onMessage(reqMsg)
                    break;
            }
        }
        ws.current.onopen = () => {
            setStatus("connected")
            setTimeout(() => {
                ws.current?.send(havingMsgBody('add-auth', 200, AuthUtils.token || ''))
            }, 100)
        }
        ws.current.onclose = () => {
            setStatus("closed")
        }
        return () => {
            ws.current?.close();
        };
    }, [ws, AuthUtils.token, isSignIn]);

    return [ws.current, status]
}