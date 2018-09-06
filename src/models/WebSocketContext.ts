import * as log4js from 'koa-log4';
import * as _ from 'lodash';
import 'reflect-metadata';
import WsEntity from './WsEntity';

const _log = log4js.getLogger('WebSocketContext');
export default class WebSocketContext {
    private static _instance = new WebSocketContext();
    public static getInstance(): WebSocketContext {
        return WebSocketContext._instance;
    }
    private _websocket;
    private constructor() { }
    public getWebsocket(): any {
        return WebSocketContext._instance._websocket;
    }
    public static init(websocket) {
        WebSocketContext._instance._websocket = websocket;
    }
    public onConnection(fun: (ws, req, head) => void): any {
        return WebSocketContext._instance._websocket.on('connection', (ws, req, head) => {
            fun(new WsEntity(ws), req, head);
        });
    }
}
