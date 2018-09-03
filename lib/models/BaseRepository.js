"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const log4js = require("koa-log4");
const _ = require("lodash");
const BaseHttpStatusCode_1 = require("../config/BaseHttpStatusCode");
const APIManager_1 = require("../microServices/APIManager");
const GRPCManager_1 = require("../microServices/GRPCManager");
const MySqlManager_1 = require("../microServices/MySqlManager");
const RedisManager_1 = require("../microServices/RedisManager");
const SocketPushManager_1 = require("../microServices/SocketPushManager");
const BaseUtils_1 = require("../utils/BaseUtils");
const LibsExceptions_1 = require("./LibsExceptions");
let BaseRepository = class BaseRepository {
    constructor() {
        this._log = log4js.getLogger(this.constructor.name);
        this.apiManager = new APIManager_1.default();
        this.sqlManager = new MySqlManager_1.default();
        this.grpcManager = new GRPCManager_1.default();
        this.redisManger = new RedisManager_1.default();
        this.socketPushManager = new SocketPushManager_1.default();
    }
    /**
     * 取得系統時間(from DB)
     *
     * @returns {Promise<Date>}
     *
     * @memberOf BaseRepository
     */
    async getDBCurrentTime() {
        return this.sqlManager.getDBCurrentTime();
    }
    /**
     * 取得系統時間(from DB)
     *
     * @returns {Promise<string>}
     *
     * @memberOf BaseRepository
     */
    async getDBCurrentTimeString() {
        return BaseUtils_1.default.DBTimeFormat(await this.sqlManager.getDBCurrentTime());
    }
    /**
     * password解密 (use DB)
     *
     * @param {(Buffer | object)} password
     * @returns {Promise<any>}
     *
     * @memberOf BaseRepository
     */
    async deCode(password, key) {
        if (_.isBuffer(password)) {
            return this.sqlManager.deCode(password, key);
        }
        else if (_.isObject(password)) {
            const toBeBuffer = new Buffer(password, 'binary');
            return this.sqlManager.deCode(toBeBuffer, key);
        }
        else {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, 'DECODE_PASSWORD_UNDEFIND_TYPE');
        }
    }
    /**
     * password加密 (use DB)
     *
     * @param {string} password
     * @returns {Promise<string>}
     *
     * @memberOf BaseRepository
     */
    async enCode(password, key) {
        return this.sqlManager.enCode(password, key);
    }
};
BaseRepository = __decorate([
    inversify_1.injectable()
], BaseRepository);
exports.default = BaseRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvQmFzZVJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSw0QkFBMEI7QUFFMUIseUNBQXVDO0FBQ3ZDLG1DQUFtQztBQUNuQyw0QkFBNEI7QUFDNUIscUVBQWtFO0FBQ2xFLDREQUFxRDtBQUNyRCw4REFBc0Q7QUFDdEQsZ0VBQXdEO0FBQ3hELGdFQUF3RDtBQUN4RCwwRUFBbUU7QUFDbkUsa0RBQTJDO0FBQzNDLHFEQUFrRDtBQUdsRCxJQUE4QixjQUFjLEdBQTVDLE1BQThCLGNBQWM7SUFENUM7UUFFYyxTQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLGVBQVUsR0FBZSxJQUFJLG9CQUFVLEVBQUUsQ0FBQztRQUMxQyxlQUFVLEdBQWdCLElBQUksc0JBQVcsRUFBRSxDQUFDO1FBQzVDLGdCQUFXLEdBQWUsSUFBSSxxQkFBVSxFQUFFLENBQUM7UUFDM0MsZ0JBQVcsR0FBZ0IsSUFBSSxzQkFBVyxFQUFFLENBQUM7UUFDN0Msc0JBQWlCLEdBQXNCLElBQUksMkJBQWlCLEVBQUUsQ0FBQztJQXFEN0UsQ0FBQztJQXBERzs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsZ0JBQWdCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsc0JBQXNCO1FBQy9CLE9BQU8sbUJBQVMsQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBeUIsRUFBRSxHQUFZO1FBQ3ZELElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN2RDthQUFNLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM3QixNQUFNLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDekQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3pEO2FBQU07WUFDSCxNQUFNLElBQUksK0JBQWMsQ0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsK0JBQStCLENBQUMsQ0FBQztTQUM3RjtJQUNMLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFnQixFQUFFLEdBQVk7UUFDOUMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNKLENBQUE7QUEzRDZCLGNBQWM7SUFEM0Msc0JBQVUsRUFBRTtHQUNpQixjQUFjLENBMkQzQztrQkEzRDZCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuXG5pbXBvcnQgeyBpbmplY3RhYmxlIH0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCAqIGFzIGxvZzRqcyBmcm9tICdrb2EtbG9nNCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBCYXNlSHR0cFN0YXR1c0NvZGUgfSBmcm9tICcuLi9jb25maWcvQmFzZUh0dHBTdGF0dXNDb2RlJztcbmltcG9ydCBBUElNYW5hZ2VyIGZyb20gJy4uL21pY3JvU2VydmljZXMvQVBJTWFuYWdlcic7XG5pbXBvcnQgR1JQQ01hbmdlciBmcm9tICcuLi9taWNyb1NlcnZpY2VzL0dSUENNYW5hZ2VyJztcbmltcG9ydCBNeVNxbE1hbmdlciBmcm9tICcuLi9taWNyb1NlcnZpY2VzL015U3FsTWFuYWdlcic7XG5pbXBvcnQgUmVkaXNNYW5nZXIgZnJvbSAnLi4vbWljcm9TZXJ2aWNlcy9SZWRpc01hbmFnZXInO1xuaW1wb3J0IFNvY2tldFB1c2hNYW5hZ2VyIGZyb20gJy4uL21pY3JvU2VydmljZXMvU29ja2V0UHVzaE1hbmFnZXInO1xuaW1wb3J0IEJhc2VVdGlscyBmcm9tICcuLi91dGlscy9CYXNlVXRpbHMnO1xuaW1wb3J0IHsgTGlic0V4Y2VwdGlvbnMgfSBmcm9tICcuL0xpYnNFeGNlcHRpb25zJztcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZVJlcG9zaXRvcnkge1xuICAgIHByb3RlY3RlZCBfbG9nID0gbG9nNGpzLmdldExvZ2dlcih0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgIHByb3RlY3RlZCBhcGlNYW5hZ2VyOiBBUElNYW5hZ2VyID0gbmV3IEFQSU1hbmFnZXIoKTtcbiAgICBwcm90ZWN0ZWQgc3FsTWFuYWdlcjogTXlTcWxNYW5nZXIgPSBuZXcgTXlTcWxNYW5nZXIoKTtcbiAgICBwcm90ZWN0ZWQgZ3JwY01hbmFnZXI6IEdSUENNYW5nZXIgPSBuZXcgR1JQQ01hbmdlcigpO1xuICAgIHByb3RlY3RlZCByZWRpc01hbmdlcjogUmVkaXNNYW5nZXIgPSBuZXcgUmVkaXNNYW5nZXIoKTtcbiAgICBwcm90ZWN0ZWQgc29ja2V0UHVzaE1hbmFnZXI6IFNvY2tldFB1c2hNYW5hZ2VyID0gbmV3IFNvY2tldFB1c2hNYW5hZ2VyKCk7XG4gICAgLyoqXG4gICAgICog5Y+W5b6X57O757Wx5pmC6ZaTKGZyb20gREIpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxEYXRlPn1cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBCYXNlUmVwb3NpdG9yeVxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXREQkN1cnJlbnRUaW1lKCk6IFByb21pc2U8RGF0ZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zcWxNYW5hZ2VyLmdldERCQ3VycmVudFRpbWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlj5blvpfns7vntbHmmYLplpMoZnJvbSBEQilcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgQmFzZVJlcG9zaXRvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0REJDdXJyZW50VGltZVN0cmluZygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gQmFzZVV0aWxzLkRCVGltZUZvcm1hdChhd2FpdCB0aGlzLnNxbE1hbmFnZXIuZ2V0REJDdXJyZW50VGltZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwYXNzd29yZOino+WvhiAodXNlIERCKVxuICAgICAqXG4gICAgICogQHBhcmFtIHsoQnVmZmVyIHwgb2JqZWN0KX0gcGFzc3dvcmRcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIEJhc2VSZXBvc2l0b3J5XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGRlQ29kZShwYXNzd29yZDogQnVmZmVyIHwgb2JqZWN0LCBrZXk/OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBpZiAoXy5pc0J1ZmZlcihwYXNzd29yZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNxbE1hbmFnZXIuZGVDb2RlKHBhc3N3b3JkIGFzIGFueSwga2V5KTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzT2JqZWN0KHBhc3N3b3JkKSkge1xuICAgICAgICAgICAgY29uc3QgdG9CZUJ1ZmZlciA9IG5ldyBCdWZmZXIocGFzc3dvcmQgYXMgYW55LCAnYmluYXJ5Jyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zcWxNYW5hZ2VyLmRlQ29kZSh0b0JlQnVmZmVyIGFzIGFueSwga2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsICdERUNPREVfUEFTU1dPUkRfVU5ERUZJTkRfVFlQRScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGFzc3dvcmTliqDlr4YgKHVzZSBEQilcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgQmFzZVJlcG9zaXRvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZW5Db2RlKHBhc3N3b3JkOiBzdHJpbmcsIGtleT86IHN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNxbE1hbmFnZXIuZW5Db2RlKHBhc3N3b3JkLCBrZXkpO1xuICAgIH1cbn1cbiJdfQ==