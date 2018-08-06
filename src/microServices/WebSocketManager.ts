import * as log4js from 'koa-log4';
import 'reflect-metadata';
import * as WebSocket from 'ws';
import WebSocketContext from '../models/WebSocketContext';

const _log = log4js.getLogger('WebSocketManager');
export default class WebSocketManager {
    protected _context: WebSocket.Server;
    constructor() {
        this._context = WebSocketContext.getWebsocket();
        this._context.on('connection', (ws, req, head) => {
            console.log(req.connection.remoteAddress);
        });
        this._context.on('open', function open() {
            console.log('connected');
        });
        this._context.on('close', function close() {
            console.log('disconnected');
        });
        this._context.on('message', function incoming(data) {
            console.log(`Roundtrip time: ${Date.now() - data} ms`);
        });
    }
}
