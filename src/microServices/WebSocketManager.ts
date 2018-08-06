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
        this._context.on('connection', (ws, req, head) => {
            this._ows = ws;
            this._req = req;
            this._head = head;
            console.log(req.connection.remoteAddress);
            ws.on('open', () => {
                console.log('connected');
            });
            ws.on('close', () => {
                console.log('disconnected');
            });
            ws.on('message', (data) => {
                console.log('message', data);
            });
        });
    }
}
