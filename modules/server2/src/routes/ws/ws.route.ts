import ws from 'express-ws';

export const initWS = (anyApp: any) => {
  anyApp.ws('/ws/test123', function (ws, req) {
    ws.on('message', function (msg) {
      ws.send(msg);
    });
  });
};
