import * as log4js from 'koa-log4';
import 'reflect-metadata';
import * as WebSocket from 'ws';
import WebSocketContext from '../models/WebSocketContext';

const _log = log4js.getLogger('WebSocketManager');
export default class WebSocketManager {
    protected _context: WebSocket.Server;
    protected _ows: WebSocket.Server;
    protected _req: any;
    protected _head: any;
    constructor() {
        this._context = WebSocketContext.getInstance().getWebsocket();
    }
}
