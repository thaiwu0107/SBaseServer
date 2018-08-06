"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("koa-log4");
require("reflect-metadata");
const WebSocketContext_1 = require("../models/WebSocketContext");
const _log = log4js.getLogger('WebSocketManager');
class WebSocketManager {
    constructor() {
        this._context = WebSocketContext_1.default.getWebsocket();
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
exports.default = WebSocketManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViU29ja2V0TWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbIm1pY3JvU2VydmljZXMvV2ViU29ja2V0TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQyw0QkFBMEI7QUFFMUIsaUVBQTBEO0FBRTFELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNsRCxNQUFxQixnQkFBZ0I7SUFFakM7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLDBCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsSUFBSTtZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsS0FBSztZQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsUUFBUSxDQUFDLElBQUk7WUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFqQkQsbUNBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbG9nNGpzIGZyb20gJ2tvYS1sb2c0JztcbmltcG9ydCAncmVmbGVjdC1tZXRhZGF0YSc7XG5pbXBvcnQgKiBhcyBXZWJTb2NrZXQgZnJvbSAnd3MnO1xuaW1wb3J0IFdlYlNvY2tldENvbnRleHQgZnJvbSAnLi4vbW9kZWxzL1dlYlNvY2tldENvbnRleHQnO1xuXG5jb25zdCBfbG9nID0gbG9nNGpzLmdldExvZ2dlcignV2ViU29ja2V0TWFuYWdlcicpO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViU29ja2V0TWFuYWdlciB7XG4gICAgcHJvdGVjdGVkIF9jb250ZXh0OiBXZWJTb2NrZXQuU2VydmVyO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gV2ViU29ja2V0Q29udGV4dC5nZXRXZWJzb2NrZXQoKTtcbiAgICAgICAgdGhpcy5fY29udGV4dC5vbignY29ubmVjdGlvbicsICh3cywgcmVxLCBoZWFkKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXEuY29ubmVjdGlvbi5yZW1vdGVBZGRyZXNzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQub24oJ29wZW4nLCBmdW5jdGlvbiBvcGVuKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nvbm5lY3RlZCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fY29udGV4dC5vbignY2xvc2UnLCBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkaXNjb25uZWN0ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQub24oJ21lc3NhZ2UnLCBmdW5jdGlvbiBpbmNvbWluZyhkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUm91bmR0cmlwIHRpbWU6ICR7RGF0ZS5ub3coKSAtIGRhdGF9IG1zYCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==