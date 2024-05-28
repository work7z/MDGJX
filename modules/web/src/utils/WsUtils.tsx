import { useLayoutEffect, useRef, useState } from "react";
export type WsMsgBody = {
    whoami: 'client' | 'server';
    headers?: any;
    body: {
        status: number;
        msg: string;
        value: any;
    };
};
export const havingMsgBody = (status: number, msg: string, value: any): string => {
    return JSON.stringify({
        whoami: 'client',
        body: {
            status: status,
            msg: msg,
            value: value,
        },
    } satisfies WsMsgBody);
};
export type WsStatus = "connecting" | "connected" | "closed" | "error" | "initial";
export const useWebsocket = (url: string): [WebSocket | null, WsStatus] => {
    return [null, 'initial']
    // websocket
    const ws = useRef<WebSocket | null>(null);
    const [status, setStatus] = useState<WsStatus>("initial");
    //启动
    useLayoutEffect(() => {
        // '/ws/testwsnow'
        ws.current = new WebSocket(url);
        ws.current.onopen = () => {
            setTimeout(() => {
                ws.current?.send(havingMsgBody(200, 'Open Connection', 'hey there'))
            }, 100)
        }
        return () => {
            ws.current?.close();
        };
    }, [ws]);

    return [ws.current, status]
}