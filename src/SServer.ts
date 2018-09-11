import { Server } from 'http';
// tslint:disable-next-line:no-duplicate-imports
import * as http from 'http';
import { buildProviderModule } from 'inversify-binding-decorators';
import { InversifySocketServer } from 'inversify-socket-utils';
import { Middleware } from 'koa';
import * as log4js from 'koa-log4';
import * as _ from 'lodash';
import * as SocketIO from 'socket.io';
import * as defConfig from './config/defconfig';
import { container } from './ioc/ioc';
import IocTracer from './ioc/iocTracer';
import koaLog4js from './middlewares/logger/log4js';
import SocketInitSetting from './models/SocketInitSetting';
import IServerInitOnceEvent from './ServerEvent/ServerInitOnceEvent';

const log = log4js.getLogger('SServer');
export default class SServer {
    private main: Promise<any>;
    private serverInitOnceEvents: IServerInitOnceEvent[] | undefined;
    private socketServer: Server;
    constructor(initSetting: SocketInitSetting) {
        let httpPort;
        let log4: () => Middleware;
        if (!_.isUndefined(initSetting)) {
            this.serverInitOnceEvents = _.isUndefined(initSetting.iniData) ? undefined : initSetting.iniData;
            httpPort = _.isUndefined(initSetting.socketPort) ? defConfig.socketPort : initSetting.socketPort;
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
            const app = http.createServer();
            const io = SocketIO(app);
            const server = new InversifySocketServer(container, io);
            this.socketServer = server.build().listen(httpPort);
            log.info('Socket.io started listening on http://localhost:%s ...', httpPort);
        })
            .catch((e) => {
                log.error(e);
            });
    }
    public start() {
        Promise.resolve(this.main).then(() => {
            if (!_.isUndefined(this.serverInitOnceEvents) && _.size(this.serverInitOnceEvents) !== 0) {
                _.forEach(this.serverInitOnceEvents, (element) => {
                    element.doOnce();
                    element.end();
                });
            }
            return this.socketServer;
        });
    }
}
