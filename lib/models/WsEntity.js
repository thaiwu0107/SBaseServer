"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("koa-log4");
const _log = log4js.getLogger('WsEntity');
class WsEntity {
    constructor(ws) {
        this._ws = ws;
    }
    /**
     * 主動發送給單一前端
     * @param {string} eventName 事件名
     * @param {string} protocol 協議名
     * @param {*} data 資料
     * @memberof WsEntity
     */
    async send(eventName, protocol, data) {
        return this._ws.send(eventName, {
            protocol,
            data
        });
    }
    /**
     * server主動要求斷線
     * @param {number} [code] 識別碼自己定義實作
     * @param {string} [reason] 可以夾帶文字敘述
     * @memberof WsEntity
     */
    async disconnect(code, reason) {
        return this._ws.disconnect(code, reason);
    }
    async on(eventName, fun) {
        return this._ws.on(eventName, fun);
    }
}
exports.default = WsEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV3NFbnRpdHkuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvV3NFbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBbUM7QUFHbkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUUxQyxNQUFxQixRQUFRO0lBRXpCLFlBQVksRUFBTztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQWlCLEVBQUUsUUFBeUIsRUFBRSxJQUFpQjtRQUM3RSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM1QixRQUFRO1lBQ1IsSUFBSTtTQUNMLENBQUMsQ0FBQztJQUNULENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBYSxFQUFFLE1BQWU7UUFDbEQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUNNLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBaUIsRUFBRSxHQUF1QztRQUN0RSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN2QyxDQUFDO0NBQ0o7QUE5QkQsMkJBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbG9nNGpzIGZyb20gJ2tvYS1sb2c0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuY29uc3QgX2xvZyA9IGxvZzRqcy5nZXRMb2dnZXIoJ1dzRW50aXR5Jyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdzRW50aXR5IHtcbiAgICBwcml2YXRlIF93cztcbiAgICBjb25zdHJ1Y3Rvcih3czogYW55KSB7XG4gICAgICAgIHRoaXMuX3dzID0gd3M7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS4u+WLleeZvOmAgee1puWWruS4gOWJjeerr1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUg5LqL5Lu25ZCNXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3RvY29sIOWNlOitsOWQjVxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSDos4fmlplcbiAgICAgKiBAbWVtYmVyb2YgV3NFbnRpdHlcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2VuZChldmVudE5hbWU6IHN0cmluZywgcHJvdG9jb2w6IHN0cmluZyB8IG51bWJlciwgZGF0YTogYW55W10gfCBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dzLnNlbmQoZXZlbnROYW1lLCB7XG4gICAgICAgICAgICBwcm90b2NvbCxcbiAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogc2VydmVy5Li75YuV6KaB5rGC5pa357eaXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtjb2RlXSDorZjliKXnorzoh6rlt7Hlrprnvqnlr6bkvZxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3JlYXNvbl0g5Y+v5Lul5aS+5bi25paH5a2X5pWY6L+wXG4gICAgICogQG1lbWJlcm9mIFdzRW50aXR5XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGRpc2Nvbm5lY3QoY29kZT86IG51bWJlciwgcmVhc29uPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93cy5kaXNjb25uZWN0KGNvZGUsIHJlYXNvbik7XG4gICAgfVxuICAgIHB1YmxpYyBhc3luYyBvbihldmVudE5hbWU6IHN0cmluZywgZnVuOiAoZGF0YTogYW55LCBhbnlEYXRhPzogYW55KSA9PiB2b2lkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93cy5vbihldmVudE5hbWUsIGZ1bik7XG4gICAgfVxufVxuIl19