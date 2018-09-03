import * as log4js from 'koa-log4';
import * as _ from 'lodash';
import 'reflect-metadata';

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
}
