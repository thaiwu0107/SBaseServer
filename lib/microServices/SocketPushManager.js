"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("koa-log4");
require("reflect-metadata");
const WebSocketContext_1 = require("../models/WebSocketContext");
const _log = log4js.getLogger('SocketPushManager');
class SocketPushManager {
    constructor() {
        this._context = WebSocketContext_1.default.getInstance().getWebsocket();
    }
    /**
     * 廣播給有訂閱頻道的前端
     * !!注意Server端無法訂閱頻道,無法使用這種方式在Server跟Server之間溝通
     * @param {string} channel 頻道名稱
     * @param {*} data 任何格式的資料
     * @returns {Promise<any>}
     * @memberof SocketPushManager
     */
    async publishChannel(channel, data) {
        return this._context.publish(channel, data);
    }
}
exports.default = SocketPushManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29ja2V0UHVzaE1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJtaWNyb1NlcnZpY2VzL1NvY2tldFB1c2hNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUNBQW1DO0FBQ25DLDRCQUEwQjtBQUMxQixpRUFBMEQ7QUFFMUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ25ELE1BQXFCLGlCQUFpQjtJQUF0QztRQUNjLGFBQVEsR0FBYSwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLEVBQVMsQ0FBQztJQVl4RixDQUFDO0lBWEc7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBZSxFQUFFLElBQVM7UUFDbEQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNKO0FBYkQsb0NBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXU1NlcnZlciB9IGZyb20gJ2NsdXN0ZXJ3cyc7XG5pbXBvcnQgKiBhcyBsb2c0anMgZnJvbSAna29hLWxvZzQnO1xuaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcbmltcG9ydCBXZWJTb2NrZXRDb250ZXh0IGZyb20gJy4uL21vZGVscy9XZWJTb2NrZXRDb250ZXh0JztcblxuY29uc3QgX2xvZyA9IGxvZzRqcy5nZXRMb2dnZXIoJ1NvY2tldFB1c2hNYW5hZ2VyJyk7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2NrZXRQdXNoTWFuYWdlciB7XG4gICAgcHJvdGVjdGVkIF9jb250ZXh0OiBXU1NlcnZlciA9IFdlYlNvY2tldENvbnRleHQuZ2V0SW5zdGFuY2UoKS5nZXRXZWJzb2NrZXQoKSBhcyBhbnk7XG4gICAgLyoqXG4gICAgICog5buj5pKt57Wm5pyJ6KiC6Zax6aC76YGT55qE5YmN56uvXG4gICAgICogISHms6jmhI9TZXJ2ZXLnq6/nhKHms5XoqILplrHpoLvpgZMs54Sh5rOV5L2/55So6YCZ56iu5pa55byP5ZyoU2VydmVy6LefU2VydmVy5LmL6ZaT5rqd6YCaXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwg6aC76YGT5ZCN56ixXG4gICAgICogQHBhcmFtIHsqfSBkYXRhIOS7u+S9leagvOW8j+eahOizh+aWmVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICogQG1lbWJlcm9mIFNvY2tldFB1c2hNYW5hZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHB1Ymxpc2hDaGFubmVsKGNoYW5uZWw6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LnB1Ymxpc2goY2hhbm5lbCwgZGF0YSk7XG4gICAgfVxufVxuIl19