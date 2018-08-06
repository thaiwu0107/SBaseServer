import ClusterWS from 'clusterws';
import { Server } from 'http';
import { buildProviderModule } from 'inversify-binding-decorators';
import { InversifyKoaServer } from 'inversify-koa-utils';
import { Middleware } from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as jwt from 'koa-jwt';
import * as log4js from 'koa-log4';
import * as Router from 'koa-router';
import * as cors from 'koa2-cors';
import * as _ from 'lodash';
import * as defConfig from './config/defconfig';
import { container } from './ioc/ioc';
import IocTracer from './ioc/iocTracer';
import koaLog4js from './middlewares/logger/log4js';
import GamaResponse from './models/BaseResponse';
import HttpInitSetting from './models/HttpInitSetting';
import WebSocketContext from './models/WebSocketContext';
import IServerInitOnceEvent from './ServerEvent/ServerInitOnceEvent';

const log = log4js.getLogger('GServer');
export default class WSServer {
    private main: Promise<any>;
    private serverInitOnceEvents: IServerInitOnceEvent[] | undefined;
    private koaServer: Server;
    private wssServer: ClusterWS;
    constructor(initSetting: HttpInitSetting) {
        let middlewares;
        let domainName;
        // let mqSetting;
        let jwtPrivateKey;
        let jwtActive;
        let httpPort;
        let corsWhitelist;
        let log4: () => Middleware;
        if (!_.isUndefined(initSetting)) {
            middlewares = _.isUndefined(initSetting.middlewares) ? undefined : initSetting.middlewares;
            if (_.size(middlewares) === 0) {
                middlewares = undefined;
            }
            this.serverInitOnceEvents = _.isUndefined(initSetting.iniData) ? undefined : initSetting.iniData;
            corsWhitelist = _.isUndefined(initSetting.corsWhitelist) ? undefined : initSetting.corsWhitelist;
            domainName = _.isUndefined(initSetting.domainName) ? undefined : initSetting.domainName;
            // mqSetting = _.isUndefined(initSetting.mqSetting) ? undefined : initSetting.mqSetting;
            jwtPrivateKey = _.isUndefined(initSetting.jwtPrivateKey) ?
                defConfig.jwt.privateKey : initSetting.jwtPrivateKey;
            jwtActive = _.isUndefined(initSetting.jwtActive) ? defConfig.jwt.active : initSetting.jwtActive;
            httpPort = _.isUndefined(initSetting.httpPort) ? defConfig.httpPort : initSetting.httpPort;
            log4 = _.isFunction(initSetting.log4) ? koaLog4js : initSetting.log4!;
            container.load(buildProviderModule());
            if (initSetting.filtersOpen) {
                const iocTracer = new IocTracer(initSetting.filters);
                iocTracer.apply(container);
            }
        }
        // this.main = ORMContext.init(initSetting.pathdb, initSetting.pathBeansPath);
        this.main = Promise.resolve(1);
        this.main.then(() => {
            const rootRouter = new Router({
                prefix: _.isUndefined(domainName) ? '' : domainName
            });
            // create server
            const server = new InversifyKoaServer(container, rootRouter);
            server
                .setConfig((app) => {
                    app.use(async (ctx, next) => {
                        // TODO check user auth to operate function
                        try {
                            await next();
                        } catch (err) {
                            const response = new GamaResponse(err.message);
                            const statusArray = _.map(_.toString(err.status));
                            if (_.size(statusArray) === 4 &&
                                statusArray[0] in ['8', '9', '7', '6', '5', '4', '3', '2', '1', '0']) {
                                // 這邊map是因為要抓取第一個數字開頭等於9就會跑error
                                if (statusArray[0] === '9') {
                                    log.error(err.status, err.message, JSON.stringify(ctx.state.user) || '');
                                } else {
                                    log.warn(err.status, err.message, JSON.stringify(ctx.state.user) || '');
                                }
                                response.$status = err.status;
                            } else {
                                ctx.status = err.status || 500;
                                log.error(err.stack, JSON.stringify(ctx.state.user) || '');
                                response.$status = ctx.status;
                                ctx.app.emit('error', err, ctx);
                            }

                            ctx.body = response;
                        }
                    })
                        .use(cors({
                            origin: (ctx) => {
                                if (_.isUndefined(corsWhitelist) ||
                                    _.size(corsWhitelist) === 0) {
                                    return '*';
                                } else if (_.includes(corsWhitelist, ctx.header.origin)) {
                                    return '*';
                                } else {
                                    ctx.status = 404;
                                    ctx.throw(422, new Error('Not Allow Cors'));
                                    return false;
                                }
                            }
                        }))
                        .use(log4())
                        // .use(multer({
                        //     storage: multer.memoryStorage()
                        // }).any())
                        .use(bodyParser({
                            strict: false,
                            onerror: (err, ctx) => {
                                log.error(err);
                                ctx.throw(422, new Error('body parse error'));
                            }
                        }));
                    if (!_.isUndefined(middlewares) && _.size(middlewares) !== 0) {
                        _.forEach(middlewares, (middleware) => {
                            app.use(middleware);
                        });
                    }
                    app.use(jwt({ secret: jwtPrivateKey, passthrough: !jwtActive })
                        .unless({
                            path: _.isUndefined(initSetting.unlessPath) ? [] : initSetting.unlessPath
                        }));
                    this.wssServer = new ClusterWS({
                        worker: Worker(app, httpPort),
                        port: 3000
                    } as any);
                })
                .setErrorConfig((app) => {
                    app.use((ctx, next) => {
                        log.error(ctx.status, ctx.message, JSON.stringify(ctx.state.user) || '');
                        next();
                    });
                });
            // this.koaServer = server.build().listen(httpPort);
            // server.on('request', app.callback());
            // this.koaServer.on('upgrade', (request, socket, head) => {
            //     this.wssServer.handleUpgrade(request, socket, head, (ws) => {
            //         this.wssServer.emit('connection', ws, request);
            //     });
            // });
            // log.info('WebSocket started listening on ws://localhost:%s ...', httpPort);
        })
            .catch((e) => {
                log.error(e);
            });
    }
    public start() {
        return Promise.resolve(this.main.then()).then(() => {
            if (!_.isUndefined(this.serverInitOnceEvents) && _.size(this.serverInitOnceEvents) !== 0) {
                _.forEach(this.serverInitOnceEvents, (element) => {
                    element.doOnce();
                    element.end();
                });
            }
        });
    }
}
// const clusterws = new ClusterWS({
//     worker: Worker,
//     port: 3000
// });

function Worker(app, httpPort) {
    const wss = this.wss;
    const server = this.server;
    WebSocketContext.init(wss);
    server.on('request', app.callback());

    wss.on('connection', (socket) => {
        console.log('New socket is connected');
        log.info('WebSocket started listening on ws://localhost:%s ...', httpPort);
    });
}
