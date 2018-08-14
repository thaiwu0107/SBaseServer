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
const BaseUtils_1 = require("../utils/BaseUtils");
const LibsExceptions_1 = require("./LibsExceptions");
let BaseRepository = class BaseRepository {
    constructor() {
        this._log = log4js.getLogger(this.constructor.name);
        this.apiManager = new APIManager_1.default();
        this.sqlManager = new MySqlManager_1.default();
        this.grpcManager = new GRPCManager_1.default();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvQmFzZVJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSw0QkFBMEI7QUFFMUIseUNBQXVDO0FBQ3ZDLG1DQUFtQztBQUNuQyw0QkFBNEI7QUFDNUIscUVBQWtFO0FBQ2xFLDREQUFxRDtBQUNyRCw4REFBc0Q7QUFDdEQsZ0VBQXdEO0FBQ3hELGtEQUEyQztBQUMzQyxxREFBa0Q7QUFHbEQsSUFBOEIsY0FBYyxHQUE1QyxNQUE4QixjQUFjO0lBRDVDO1FBRWMsU0FBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQyxlQUFVLEdBQWUsSUFBSSxvQkFBVSxFQUFFLENBQUM7UUFDMUMsZUFBVSxHQUFnQixJQUFJLHNCQUFXLEVBQUUsQ0FBQztRQUM1QyxnQkFBVyxHQUFlLElBQUkscUJBQVUsRUFBRSxDQUFDO0lBcUR6RCxDQUFDO0lBcERHOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxnQkFBZ0I7UUFDekIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxzQkFBc0I7UUFDL0IsT0FBTyxtQkFBUyxDQUFDLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUF5QixFQUFFLEdBQVk7UUFDdkQsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZEO2FBQU0sSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdCLE1BQU0sVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN6RCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDekQ7YUFBTTtZQUNILE1BQU0sSUFBSSwrQkFBYyxDQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO1NBQzdGO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQWdCLEVBQUUsR0FBWTtRQUM5QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0osQ0FBQTtBQTFENkIsY0FBYztJQUQzQyxzQkFBVSxFQUFFO0dBQ2lCLGNBQWMsQ0EwRDNDO2tCQTFENkIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAncmVmbGVjdC1tZXRhZGF0YSc7XG5cbmltcG9ydCB7IGluamVjdGFibGUgfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0ICogYXMgbG9nNGpzIGZyb20gJ2tvYS1sb2c0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEJhc2VIdHRwU3RhdHVzQ29kZSB9IGZyb20gJy4uL2NvbmZpZy9CYXNlSHR0cFN0YXR1c0NvZGUnO1xuaW1wb3J0IEFQSU1hbmFnZXIgZnJvbSAnLi4vbWljcm9TZXJ2aWNlcy9BUElNYW5hZ2VyJztcbmltcG9ydCBHUlBDTWFuZ2VyIGZyb20gJy4uL21pY3JvU2VydmljZXMvR1JQQ01hbmFnZXInO1xuaW1wb3J0IE15U3FsTWFuZ2VyIGZyb20gJy4uL21pY3JvU2VydmljZXMvTXlTcWxNYW5hZ2VyJztcbmltcG9ydCBCYXNlVXRpbHMgZnJvbSAnLi4vdXRpbHMvQmFzZVV0aWxzJztcbmltcG9ydCB7IExpYnNFeGNlcHRpb25zIH0gZnJvbSAnLi9MaWJzRXhjZXB0aW9ucyc7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VSZXBvc2l0b3J5IHtcbiAgICBwcm90ZWN0ZWQgX2xvZyA9IGxvZzRqcy5nZXRMb2dnZXIodGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgc2V0UGF0aCgpOiBhbnk7XG4gICAgcHJvdGVjdGVkIGFwaU1hbmFnZXI6IEFQSU1hbmFnZXIgPSBuZXcgQVBJTWFuYWdlcigpO1xuICAgIHByb3RlY3RlZCBzcWxNYW5hZ2VyOiBNeVNxbE1hbmdlciA9IG5ldyBNeVNxbE1hbmdlcigpO1xuICAgIHByb3RlY3RlZCBncnBjTWFuYWdlcjogR1JQQ01hbmdlciA9IG5ldyBHUlBDTWFuZ2VyKCk7XG4gICAgLyoqXG4gICAgICog5Y+W5b6X57O757Wx5pmC6ZaTKGZyb20gREIpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxEYXRlPn1cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBCYXNlUmVwb3NpdG9yeVxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXREQkN1cnJlbnRUaW1lKCk6IFByb21pc2U8RGF0ZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zcWxNYW5hZ2VyLmdldERCQ3VycmVudFRpbWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlj5blvpfns7vntbHmmYLplpMoZnJvbSBEQilcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgQmFzZVJlcG9zaXRvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0REJDdXJyZW50VGltZVN0cmluZygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gQmFzZVV0aWxzLkRCVGltZUZvcm1hdChhd2FpdCB0aGlzLnNxbE1hbmFnZXIuZ2V0REJDdXJyZW50VGltZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwYXNzd29yZOino+WvhiAodXNlIERCKVxuICAgICAqXG4gICAgICogQHBhcmFtIHsoQnVmZmVyIHwgb2JqZWN0KX0gcGFzc3dvcmRcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIEJhc2VSZXBvc2l0b3J5XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGRlQ29kZShwYXNzd29yZDogQnVmZmVyIHwgb2JqZWN0LCBrZXk/OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBpZiAoXy5pc0J1ZmZlcihwYXNzd29yZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNxbE1hbmFnZXIuZGVDb2RlKHBhc3N3b3JkIGFzIGFueSwga2V5KTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzT2JqZWN0KHBhc3N3b3JkKSkge1xuICAgICAgICAgICAgY29uc3QgdG9CZUJ1ZmZlciA9IG5ldyBCdWZmZXIocGFzc3dvcmQgYXMgYW55LCAnYmluYXJ5Jyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zcWxNYW5hZ2VyLmRlQ29kZSh0b0JlQnVmZmVyIGFzIGFueSwga2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsICdERUNPREVfUEFTU1dPUkRfVU5ERUZJTkRfVFlQRScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGFzc3dvcmTliqDlr4YgKHVzZSBEQilcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgQmFzZVJlcG9zaXRvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZW5Db2RlKHBhc3N3b3JkOiBzdHJpbmcsIGtleT86IHN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNxbE1hbmFnZXIuZW5Db2RlKHBhc3N3b3JkLCBrZXkpO1xuICAgIH1cbn1cbiJdfQ==