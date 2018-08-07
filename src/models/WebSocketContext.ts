import * as log4js from 'koa-log4';
import * as WebSocket from 'ws';

const _log = log4js.getLogger('WebSocketContext');
export default class WebSocketContext {
    private static _instance = new WebSocketContext();
    public static getInstance(): WebSocketContext {
      return WebSocketContext._instance;
    }
    private static _websocket;
    private constructor() {}
    public getWebsocket(): WebSocket.Server {
      return WebSocketContext._websocket;
    }
    public static init(websocket) {
      WebSocketContext._websocket = websocket;
      websocket.on('connection', (ws, req, head) => {
        _log.info('connection', req.connection.remoteAddress);
        ws.on('disconnect', (code: number, reason: string): void => {
            _log.info('disconnect');
        });
        ws.on('error', (err: Error) => {
            _log.error('error', err);
        });
      });
      websocket.setMiddleware('onPublish', (channel: string, data: any): void => {
        _log.info('onPublish', data);
      });
    }
}
