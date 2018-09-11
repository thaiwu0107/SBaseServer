import {
    BaseResponse, bodyParser,
    buildProviderModule, CAHttpsContext, container,
    cors, GHeartbeats, InversifyKoaServer,
    IocTracer, MysqlContext, RedisContext, Router, WebSocketContext, WSServer
} from '@ggttoo44/base-server';
import * as helmet from 'koa-helmet';
import * as jwt from 'koa-jwt';
import * as log4js from 'koa-log4';
import * as _ from 'lodash';
import config from './config/config.app';
import { db, redis } from './config/config.database';
import './container/ioc-loader';
import koaLog4js from './middlewares/logger/log4js';

const log = log4js.getLogger('APP');
const clusterws = new WSServer({
    worker: Worker,
    port: config.httpPort,
    workers: 8,
    restartWorkerOnFail: true
}) as any;

function Worker() {
    const wss = this.wss;
    const server = this.server;
    Promise.resolve().then(() => {
        GHeartbeats.initialize();
        WebSocketContext.init(wss);
        CAHttpsContext.getInstance().initCA(config.ca);
        return MysqlContext.initialize(db)
            .then(() => {
                return RedisContext.initialize(redis);
            })
            .then(() => {
                log.info('WebSocket started listening on ws://localhost:%s ...\n' +
                    'Http started listening on http://localhost:%s ...', config.httpPort, config.httpPort);
            });
    })
        .then(() => {
            const rootRouter = new Router({
                prefix: _.isUndefined(config.domainName) ? '' : config.domainName
            });
            const inversifyKoaServer = new InversifyKoaServer(container, rootRouter);
            inversifyKoaServer.setConfig((application) => {
                application.use(async (ctx, next) => {
                    try {
                        await next();
                    } catch (err) {
                        const response = new BaseResponse(err.message);
                        const statusArray = _.map(_.toString(err.status));
                        if (_.size(statusArray) === 4 &&
                            statusArray[0] in ['8', '9', '7', '6', '5', '4', '3', '2', '1', '0']) {
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
                    .use(helmet())
                    .use(cors({
                        origin: (ctx) => {
                            if (_.isUndefined(config.corsWhitelist) ||
                                _.size(config.corsWhitelist) === 0) {
                                return '*';
                            } else if (_.includes(config.corsWhitelist, ctx.header.origin)) {
                                return '*';
                            } else {
                                ctx.status = 404;
                                ctx.throw(422, new Error('Not Allow Cors'));
                                return false;
                            }
                        }
                    }))
                    .use(koaLog4js())
                    .use(bodyParser({
                        strict: false,
                        onerror: (err, ctx) => {
                            log.error(err);
                            ctx.throw(422, new Error('body parse error'));
                        }
                    }))
                    .use(jwt({ secret: config.jwt.privateKey, passthrough: !config.jwt.active })
                        .unless({
                            path: config.unlessPath
                        }
                        ));
            })
                .setErrorConfig((application) => {
                    application.use((ctx, next) => {
                        log.error(ctx.status, ctx.message, JSON.stringify(ctx.state.user) || '');
                        next();
                    });
                });
            container.load(buildProviderModule());
            if (config.Tracerconfig.open) {
                const iocTracer = new IocTracer(config.Tracerconfig.filters);
                iocTracer.apply(container);
            }
            return inversifyKoaServer.build();
        })
        .then(async (app) => {
            server.on('request', app.callback());
        });
}
