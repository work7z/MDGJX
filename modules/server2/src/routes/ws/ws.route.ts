import ws from 'express-ws';

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
    whoami: 'server',
    body: {
      status: status,
      msg: msg,
      value: value,
    },
  } satisfies WsMsgBody);
};

export const initWS = (anyApp: any) => {
  anyApp.ws('/ws/testwsnow', function (ws, req) {
    ws.send(havingMsgBody(200, 'Connected', 'first msg from server side'));
    ws.on('message', function (msg) {
      ws.send(havingMsgBody(200, 'Received well! ' + msg, 'date time is ' + Date.now()));
    });
  });
};
