import ClusterWS from 'clusterws';
import * as Koa from 'koa';
import * as jwt from 'koa-jwt';
import * as log4js from 'koa-log4';
import * as defConfig from './config/defconfig';
import WebSocketContext from './models/WebSocketContext';

const log = log4js.getLogger('WSServer');
// tslint:disable-next-line:variable-name
export const WSServer = new ClusterWS({
    worker: Worker,
    port: defConfig.wsPort
} as any);

function Worker() {
    const wss = this.wss;
    const server = this.server;
    const app = new Koa();
    app.use(jwt({ secret: defConfig.jwt.privateKey, passthrough: !defConfig.jwt.active }));
    WebSocketContext.init(wss);
    server.on('request', app.callback());
    wss.on('connection', (socket) => {
        console.log('New socket is connected');
    });
    log.info('WebSocket started listening on ws://localhost:%s ...', defConfig.wsPort);
}
