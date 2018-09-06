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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV3NFbnRpdHkuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvV3NFbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBbUM7QUFHbkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUUxQyxNQUFxQixRQUFRO0lBRXpCLFlBQVksRUFBTztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQWlCLEVBQUUsUUFBZ0IsRUFBRSxJQUFTO1FBQzVELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzVCLFFBQVE7WUFDUixJQUFJO1NBQ0wsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFhLEVBQUUsTUFBZTtRQUNsRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ00sS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFpQixFQUFFLEdBQXVDO1FBQ3RFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Q0FDSjtBQTlCRCwyQkE4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBsb2c0anMgZnJvbSAna29hLWxvZzQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCBfbG9nID0gbG9nNGpzLmdldExvZ2dlcignV3NFbnRpdHknKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3NFbnRpdHkge1xuICAgIHByaXZhdGUgX3dzO1xuICAgIGNvbnN0cnVjdG9yKHdzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fd3MgPSB3cztcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Li75YuV55m86YCB57Wm5Zau5LiA5YmN56uvXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSDkuovku7blkI1cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvdG9jb2wg5Y2U6K2w5ZCNXG4gICAgICogQHBhcmFtIHsqfSBkYXRhIOizh+aWmVxuICAgICAqIEBtZW1iZXJvZiBXc0VudGl0eVxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzZW5kKGV2ZW50TmFtZTogc3RyaW5nLCBwcm90b2NvbDogc3RyaW5nLCBkYXRhOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dzLnNlbmQoZXZlbnROYW1lLCB7XG4gICAgICAgICAgICBwcm90b2NvbCxcbiAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogc2VydmVy5Li75YuV6KaB5rGC5pa357eaXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtjb2RlXSDorZjliKXnorzoh6rlt7Hlrprnvqnlr6bkvZxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3JlYXNvbl0g5Y+v5Lul5aS+5bi25paH5a2X5pWY6L+wXG4gICAgICogQG1lbWJlcm9mIFdzRW50aXR5XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGRpc2Nvbm5lY3QoY29kZT86IG51bWJlciwgcmVhc29uPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93cy5kaXNjb25uZWN0KGNvZGUsIHJlYXNvbik7XG4gICAgfVxuICAgIHB1YmxpYyBhc3luYyBvbihldmVudE5hbWU6IHN0cmluZywgZnVuOiAoZGF0YTogYW55LCBhbnlEYXRhPzogYW55KSA9PiB2b2lkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93cy5vbihldmVudE5hbWUsIGZ1bik7XG4gICAgfVxufVxuIl19