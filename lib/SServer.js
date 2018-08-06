"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-duplicate-imports
const http = require("http");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const inversify_socket_utils_1 = require("inversify-socket-utils");
const log4js = require("koa-log4");
const _ = require("lodash");
const SocketIO = require("socket.io");
const defConfig = require("./config/defconfig");
const ioc_1 = require("./ioc/ioc");
const iocTracer_1 = require("./ioc/iocTracer");
const log4js_1 = require("./middlewares/logger/log4js");
const log = log4js.getLogger('SServer');
class SServer {
    constructor(initSetting) {
        let httpPort;
        let log4;
        if (!_.isUndefined(initSetting)) {
            this.serverInitOnceEvents = _.isUndefined(initSetting.iniData) ? undefined : initSetting.iniData;
            httpPort = _.isUndefined(initSetting.socketPort) ? defConfig.socketPort : initSetting.socketPort;
            log4 = _.isFunction(initSetting.log4) ? log4js_1.default : initSetting.log4;
            ioc_1.container.load(inversify_binding_decorators_1.buildProviderModule());
            if (initSetting.filtersOpen) {
                const iocTracer = new iocTracer_1.default(initSetting.filters);
                iocTracer.apply(ioc_1.container);
            }
        }
        // this.main = ORMContext.init(initSetting.pathdb, initSetting.pathBeansPath);
        this.main = Promise.resolve(1);
        this.main.then(() => {
            const app = http.createServer();
            const io = SocketIO(app);
            const server = new inversify_socket_utils_1.InversifySocketServer(ioc_1.container, io);
            this.socketServer = server.build().listen(httpPort);
            log.info('Socket.io started listening on http://localhost:%s ...', httpPort);
        })
            .catch((e) => {
            log.error(e);
        });
    }
    start() {
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
exports.default = SServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbIlNTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxnREFBZ0Q7QUFDaEQsNkJBQTZCO0FBQzdCLCtFQUFtRTtBQUNuRSxtRUFBK0Q7QUFFL0QsbUNBQW1DO0FBQ25DLDRCQUE0QjtBQUM1QixzQ0FBc0M7QUFDdEMsZ0RBQWdEO0FBQ2hELG1DQUFzQztBQUN0QywrQ0FBd0M7QUFDeEMsd0RBQW9EO0FBSXBELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDeEMsTUFBcUIsT0FBTztJQUl4QixZQUFZLFdBQThCO1FBQ3RDLElBQUksUUFBUSxDQUFDO1FBQ2IsSUFBSSxJQUFzQixDQUFDO1FBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1lBQ2pHLFFBQVEsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztZQUNqRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFLLENBQUM7WUFDdEUsZUFBUyxDQUFDLElBQUksQ0FBQyxrREFBbUIsRUFBRSxDQUFDLENBQUM7WUFDdEMsSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFO2dCQUN6QixNQUFNLFNBQVMsR0FBRyxJQUFJLG1CQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNyRCxTQUFTLENBQUMsS0FBSyxDQUFDLGVBQVMsQ0FBQyxDQUFDO2FBQzlCO1NBQ0o7UUFDRCw4RUFBOEU7UUFDOUUsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNoQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDaEMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sTUFBTSxHQUFHLElBQUksOENBQXFCLENBQUMsZUFBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxHQUFHLENBQUMsSUFBSSxDQUFDLHdEQUF3RCxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pGLENBQUMsQ0FBQzthQUNHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1QsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDTSxLQUFLO1FBQ1IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNqQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDdEYsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDN0MsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNqQixPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUF6Q0QsMEJBeUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VydmVyIH0gZnJvbSAnaHR0cCc7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZHVwbGljYXRlLWltcG9ydHNcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSAnaHR0cCc7XG5pbXBvcnQgeyBidWlsZFByb3ZpZGVyTW9kdWxlIH0gZnJvbSAnaW52ZXJzaWZ5LWJpbmRpbmctZGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBJbnZlcnNpZnlTb2NrZXRTZXJ2ZXIgfSBmcm9tICdpbnZlcnNpZnktc29ja2V0LXV0aWxzJztcbmltcG9ydCB7IE1pZGRsZXdhcmUgfSBmcm9tICdrb2EnO1xuaW1wb3J0ICogYXMgbG9nNGpzIGZyb20gJ2tvYS1sb2c0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIFNvY2tldElPIGZyb20gJ3NvY2tldC5pbyc7XG5pbXBvcnQgKiBhcyBkZWZDb25maWcgZnJvbSAnLi9jb25maWcvZGVmY29uZmlnJztcbmltcG9ydCB7IGNvbnRhaW5lciB9IGZyb20gJy4vaW9jL2lvYyc7XG5pbXBvcnQgSW9jVHJhY2VyIGZyb20gJy4vaW9jL2lvY1RyYWNlcic7XG5pbXBvcnQga29hTG9nNGpzIGZyb20gJy4vbWlkZGxld2FyZXMvbG9nZ2VyL2xvZzRqcyc7XG5pbXBvcnQgU29ja2V0SW5pdFNldHRpbmcgZnJvbSAnLi9tb2RlbHMvU29ja2V0SW5pdFNldHRpbmcnO1xuaW1wb3J0IElTZXJ2ZXJJbml0T25jZUV2ZW50IGZyb20gJy4vU2VydmVyRXZlbnQvU2VydmVySW5pdE9uY2VFdmVudCc7XG5cbmNvbnN0IGxvZyA9IGxvZzRqcy5nZXRMb2dnZXIoJ1NTZXJ2ZXInKTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNTZXJ2ZXIge1xuICAgIHByaXZhdGUgbWFpbjogUHJvbWlzZTxhbnk+O1xuICAgIHByaXZhdGUgc2VydmVySW5pdE9uY2VFdmVudHM6IElTZXJ2ZXJJbml0T25jZUV2ZW50W10gfCB1bmRlZmluZWQ7XG4gICAgcHJpdmF0ZSBzb2NrZXRTZXJ2ZXI6IFNlcnZlcjtcbiAgICBjb25zdHJ1Y3Rvcihpbml0U2V0dGluZzogU29ja2V0SW5pdFNldHRpbmcpIHtcbiAgICAgICAgbGV0IGh0dHBQb3J0O1xuICAgICAgICBsZXQgbG9nNDogKCkgPT4gTWlkZGxld2FyZTtcbiAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKGluaXRTZXR0aW5nKSkge1xuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJJbml0T25jZUV2ZW50cyA9IF8uaXNVbmRlZmluZWQoaW5pdFNldHRpbmcuaW5pRGF0YSkgPyB1bmRlZmluZWQgOiBpbml0U2V0dGluZy5pbmlEYXRhO1xuICAgICAgICAgICAgaHR0cFBvcnQgPSBfLmlzVW5kZWZpbmVkKGluaXRTZXR0aW5nLnNvY2tldFBvcnQpID8gZGVmQ29uZmlnLnNvY2tldFBvcnQgOiBpbml0U2V0dGluZy5zb2NrZXRQb3J0O1xuICAgICAgICAgICAgbG9nNCA9IF8uaXNGdW5jdGlvbihpbml0U2V0dGluZy5sb2c0KSA/IGtvYUxvZzRqcyA6IGluaXRTZXR0aW5nLmxvZzQhO1xuICAgICAgICAgICAgY29udGFpbmVyLmxvYWQoYnVpbGRQcm92aWRlck1vZHVsZSgpKTtcbiAgICAgICAgICAgIGlmIChpbml0U2V0dGluZy5maWx0ZXJzT3Blbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlvY1RyYWNlciA9IG5ldyBJb2NUcmFjZXIoaW5pdFNldHRpbmcuZmlsdGVycyk7XG4gICAgICAgICAgICAgICAgaW9jVHJhY2VyLmFwcGx5KGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5tYWluID0gT1JNQ29udGV4dC5pbml0KGluaXRTZXR0aW5nLnBhdGhkYiwgaW5pdFNldHRpbmcucGF0aEJlYW5zUGF0aCk7XG4gICAgICAgIHRoaXMubWFpbiA9IFByb21pc2UucmVzb2x2ZSgxKTtcbiAgICAgICAgdGhpcy5tYWluLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXBwID0gaHR0cC5jcmVhdGVTZXJ2ZXIoKTtcbiAgICAgICAgICAgIGNvbnN0IGlvID0gU29ja2V0SU8oYXBwKTtcbiAgICAgICAgICAgIGNvbnN0IHNlcnZlciA9IG5ldyBJbnZlcnNpZnlTb2NrZXRTZXJ2ZXIoY29udGFpbmVyLCBpbyk7XG4gICAgICAgICAgICB0aGlzLnNvY2tldFNlcnZlciA9IHNlcnZlci5idWlsZCgpLmxpc3RlbihodHRwUG9ydCk7XG4gICAgICAgICAgICBsb2cuaW5mbygnU29ja2V0LmlvIHN0YXJ0ZWQgbGlzdGVuaW5nIG9uIGh0dHA6Ly9sb2NhbGhvc3Q6JXMgLi4uJywgaHR0cFBvcnQpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9nLmVycm9yKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGFydCgpIHtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMubWFpbikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQodGhpcy5zZXJ2ZXJJbml0T25jZUV2ZW50cykgJiYgXy5zaXplKHRoaXMuc2VydmVySW5pdE9uY2VFdmVudHMpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgXy5mb3JFYWNoKHRoaXMuc2VydmVySW5pdE9uY2VFdmVudHMsIChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZG9PbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZW5kKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXRTZXJ2ZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==