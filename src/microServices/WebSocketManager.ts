import * as log4js from 'koa-log4';
import 'reflect-metadata';
import * as WebSocket from 'ws';
import WebSocketContext from '../models/WebSocketContext';

const _log = log4js.getLogger('WebSocketManager');
export default class WebSocketManager {
    protected _context: WebSocket.Server;
    protected _ows: WebSocket.Server;
    constructor() {
        this._context = WebSocketContext.getInstance().getWebsocket();
        this._context.on('connection', (ws, req, head) => {
            this._ows = ws;
            console.log(req.connection.remoteAddress);
        });
        this._ows.on('open', function open() {
            console.log('connected');
        });
        this._ows.on('close', function close() {
            console.log('disconnected');
        });
        this._ows.on('message', function incoming(data) {
            console.log(`Roundtrip time: ${Date.now() - data} ms`);
        });
    }
}
