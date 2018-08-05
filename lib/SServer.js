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
const models_1 = require("./models");
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
        this.main = models_1.ORMContext.init(initSetting.pathdb, initSetting.pathBeansPath);
        this.main.then(() => {
            const app = http.createServer();
            const io = SocketIO(app);
            const server = new inversify_socket_utils_1.InversifySocketServer(ioc_1.container, io);
            this.socketServer = server.build().listen(httpPort);
            log.info('Http started listening on http://localhost:%s ...', httpPort);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ2d0dG9vNDQvRGVza3RvcC9CYXNlU29ja2V0U2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIlNTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxnREFBZ0Q7QUFDaEQsNkJBQTZCO0FBQzdCLCtFQUFtRTtBQUNuRSxtRUFBK0Q7QUFFL0QsbUNBQW1DO0FBQ25DLDRCQUE0QjtBQUM1QixzQ0FBc0M7QUFDdEMsZ0RBQWdEO0FBQ2hELG1DQUFzQztBQUN0QywrQ0FBd0M7QUFDeEMsd0RBQW9EO0FBQ3BELHFDQUFzQztBQUl0QyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3hDO0lBSUksWUFBWSxXQUE4QjtRQUN0QyxJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUksSUFBc0IsQ0FBQztRQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztZQUNqRyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7WUFDakcsSUFBSSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSyxDQUFDO1lBQ3RFLGVBQVMsQ0FBQyxJQUFJLENBQUMsa0RBQW1CLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLElBQUksV0FBVyxDQUFDLFdBQVcsRUFBRTtnQkFDekIsTUFBTSxTQUFTLEdBQUcsSUFBSSxtQkFBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDckQsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFTLENBQUMsQ0FBQzthQUM5QjtTQUNKO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxtQkFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDaEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ2hDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixNQUFNLE1BQU0sR0FBRyxJQUFJLDhDQUFxQixDQUFDLGVBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEQsR0FBRyxDQUFDLElBQUksQ0FBQyxtREFBbUQsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUM7YUFDRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQ00sS0FBSztRQUNSLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDakMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3RGLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQzdDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDakIsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQzthQUNOO1lBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBeENELDBCQXdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcnZlciB9IGZyb20gJ2h0dHAnO1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWR1cGxpY2F0ZS1pbXBvcnRzXG5pbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IHsgYnVpbGRQcm92aWRlck1vZHVsZSB9IGZyb20gJ2ludmVyc2lmeS1iaW5kaW5nLWRlY29yYXRvcnMnO1xuaW1wb3J0IHsgSW52ZXJzaWZ5U29ja2V0U2VydmVyIH0gZnJvbSAnaW52ZXJzaWZ5LXNvY2tldC11dGlscyc7XG5pbXBvcnQgeyBNaWRkbGV3YXJlIH0gZnJvbSAna29hJztcbmltcG9ydCAqIGFzIGxvZzRqcyBmcm9tICdrb2EtbG9nNCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBTb2NrZXRJTyBmcm9tICdzb2NrZXQuaW8nO1xuaW1wb3J0ICogYXMgZGVmQ29uZmlnIGZyb20gJy4vY29uZmlnL2RlZmNvbmZpZyc7XG5pbXBvcnQgeyBjb250YWluZXIgfSBmcm9tICcuL2lvYy9pb2MnO1xuaW1wb3J0IElvY1RyYWNlciBmcm9tICcuL2lvYy9pb2NUcmFjZXInO1xuaW1wb3J0IGtvYUxvZzRqcyBmcm9tICcuL21pZGRsZXdhcmVzL2xvZ2dlci9sb2c0anMnO1xuaW1wb3J0IHsgT1JNQ29udGV4dCB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCBTb2NrZXRJbml0U2V0dGluZyBmcm9tICcuL21vZGVscy9Tb2NrZXRJbml0U2V0dGluZyc7XG5pbXBvcnQgSVNlcnZlckluaXRPbmNlRXZlbnQgZnJvbSAnLi9TZXJ2ZXJFdmVudC9TZXJ2ZXJJbml0T25jZUV2ZW50JztcblxuY29uc3QgbG9nID0gbG9nNGpzLmdldExvZ2dlcignU1NlcnZlcicpO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU1NlcnZlciB7XG4gICAgcHJpdmF0ZSBtYWluOiBQcm9taXNlPGFueT47XG4gICAgcHJpdmF0ZSBzZXJ2ZXJJbml0T25jZUV2ZW50czogSVNlcnZlckluaXRPbmNlRXZlbnRbXSB8IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIHNvY2tldFNlcnZlcjogU2VydmVyO1xuICAgIGNvbnN0cnVjdG9yKGluaXRTZXR0aW5nOiBTb2NrZXRJbml0U2V0dGluZykge1xuICAgICAgICBsZXQgaHR0cFBvcnQ7XG4gICAgICAgIGxldCBsb2c0OiAoKSA9PiBNaWRkbGV3YXJlO1xuICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQoaW5pdFNldHRpbmcpKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZlckluaXRPbmNlRXZlbnRzID0gXy5pc1VuZGVmaW5lZChpbml0U2V0dGluZy5pbmlEYXRhKSA/IHVuZGVmaW5lZCA6IGluaXRTZXR0aW5nLmluaURhdGE7XG4gICAgICAgICAgICBodHRwUG9ydCA9IF8uaXNVbmRlZmluZWQoaW5pdFNldHRpbmcuc29ja2V0UG9ydCkgPyBkZWZDb25maWcuc29ja2V0UG9ydCA6IGluaXRTZXR0aW5nLnNvY2tldFBvcnQ7XG4gICAgICAgICAgICBsb2c0ID0gXy5pc0Z1bmN0aW9uKGluaXRTZXR0aW5nLmxvZzQpID8ga29hTG9nNGpzIDogaW5pdFNldHRpbmcubG9nNCE7XG4gICAgICAgICAgICBjb250YWluZXIubG9hZChidWlsZFByb3ZpZGVyTW9kdWxlKCkpO1xuICAgICAgICAgICAgaWYgKGluaXRTZXR0aW5nLmZpbHRlcnNPcGVuKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW9jVHJhY2VyID0gbmV3IElvY1RyYWNlcihpbml0U2V0dGluZy5maWx0ZXJzKTtcbiAgICAgICAgICAgICAgICBpb2NUcmFjZXIuYXBwbHkoY29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1haW4gPSBPUk1Db250ZXh0LmluaXQoaW5pdFNldHRpbmcucGF0aGRiLCBpbml0U2V0dGluZy5wYXRoQmVhbnNQYXRoKTtcbiAgICAgICAgdGhpcy5tYWluLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXBwID0gaHR0cC5jcmVhdGVTZXJ2ZXIoKTtcbiAgICAgICAgICAgIGNvbnN0IGlvID0gU29ja2V0SU8oYXBwKTtcbiAgICAgICAgICAgIGNvbnN0IHNlcnZlciA9IG5ldyBJbnZlcnNpZnlTb2NrZXRTZXJ2ZXIoY29udGFpbmVyLCBpbyk7XG4gICAgICAgICAgICB0aGlzLnNvY2tldFNlcnZlciA9IHNlcnZlci5idWlsZCgpLmxpc3RlbihodHRwUG9ydCk7XG4gICAgICAgICAgICBsb2cuaW5mbygnSHR0cCBzdGFydGVkIGxpc3RlbmluZyBvbiBodHRwOi8vbG9jYWxob3N0OiVzIC4uLicsIGh0dHBQb3J0KTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxvZy5lcnJvcihlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhcnQoKSB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSh0aGlzLm1haW4pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKHRoaXMuc2VydmVySW5pdE9uY2VFdmVudHMpICYmIF8uc2l6ZSh0aGlzLnNlcnZlckluaXRPbmNlRXZlbnRzKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIF8uZm9yRWFjaCh0aGlzLnNlcnZlckluaXRPbmNlRXZlbnRzLCAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRvT25jZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmVuZCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0U2VydmVyO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=