import * as Koa from 'koa';
import * as jwt from 'koa-jwt';
import * as log4js from 'koa-log4';
import WebSocketContext from './models/WebSocketContext';

const log = log4js.getLogger('WSServer');
let privateKey;
let active;
let port;
export function Init(_privateKey, _active, _port) {
    privateKey = _privateKey;
    active = _active;
    port = _port;
}
export function Worker() {
    const wss = this.wss;
    const server = this.server;
    const app = new Koa();
    app.use(jwt({ secret: privateKey, passthrough: !active }));
    server.on('request', app.callback());
    WebSocketContext.init(wss);
    log.info('WebSocket started listening on ws://localhost:%s ...', port);
}
