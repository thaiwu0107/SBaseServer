import { Server } from 'http';
import { buildProviderModule } from 'inversify-binding-decorators';
import { InversifyKoaServer } from 'inversify-koa-utils';
import { Middleware } from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as jwt from 'koa-jwt';
import * as log4js from 'koa-log4';
// import * as multer from 'koa-multer';
import * as Router from 'koa-router';
import * as cors from 'koa2-cors';
import * as _ from 'lodash';
import * as defConfig from './config/defconfig';
import { container } from './ioc/ioc';
import IocTracer from './ioc/iocTracer';
import koaLog4js from './middlewares/logger/log4js';
import { ORMContext } from './models';
import GamaResponse from './models/BaseResponse';
import HttpInitSetting from './models/HttpInitSetting';
import IServerInitOnceEvent from './ServerEvent/ServerInitOnceEvent';

const log = log4js.getLogger('GServer');
export default class GServer {
    private main: Promise<any>;
    private serverInitOnceEvents: IServerInitOnceEvent[] | undefined;
    private koaServer: Server;
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
        this.main = ORMContext.init(initSetting.pathdb, initSetting.pathBeansPath);
        // caeate DB connection
        // 還不會用到mq應該還不需要去讓他一直嘗試連線
        // if (!_.isUndefined(mqSetting)) {
        // this.main.then((result) => {
        // tslint:disable-next-line:no-null-keyword
        // return mq(null, mqSetting); // connect MQ Server
        // });
        // }
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
                })
                .setErrorConfig((app) => {
                    app.use((ctx, next) => {
                        log.error(ctx.status, ctx.message, JSON.stringify(ctx.state.user) || '');
                        next();
                    });
                });
            this.koaServer = server.build().listen(httpPort);
            log.info('Http started listening on http://localhost:%s ...', httpPort);
        })
            .catch((e) => {
                log.error(e);
            });
    }
    public async start() {
        await Promise.all([this.main]);
        if (!_.isUndefined(this.serverInitOnceEvents) && _.size(this.serverInitOnceEvents) !== 0) {
            _.forEach(this.serverInitOnceEvents, (element) => {
                element.doOnce();
                element.end();
            });
        }
        return this.koaServer;
    }
}
