"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const log4js = require("koa-log4");
const _ = require("lodash");
const BaseHttpStatusCode_1 = require("../config/BaseHttpStatusCode");
const APIManager_1 = require("../microServices/APIManager");
const SQLManager_1 = require("../microServices/SQLManager");
const BaseUtils_1 = require("../utils/BaseUtils");
const LibsExceptions_1 = require("./LibsExceptions");
let GamaRepository = class GamaRepository {
    constructor(sqlType) {
        this._log = log4js.getLogger(this.constructor.name);
        this.apiManager = new APIManager_1.default();
        this.sqlManager = new SQLManager_1.default();
        this.sqlManager.rootPath = this.setPath();
        this.sqlManager.sqlType = sqlType;
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
    async deCode(password) {
        if (_.isBuffer(password)) {
            return this.sqlManager.deCode(password);
        }
        else if (_.isObject(password)) {
            const toBeBuffer = new Buffer(password, 'binary');
            return this.sqlManager.deCode(toBeBuffer);
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
    async enCode(password) {
        return this.sqlManager.enCode(password);
    }
    /**
     * 目前暫不使用
     * @param {BaseEntity} entity
     * @returns {Promise<any>}
     * @author Mikeli
     * @memberOf BaseRepository
     */
    async insert(entity) {
        const daoName = entity.getGamaEntityDbName() + '.dao:' + entity.getGamaEntitytableName();
        return this.sqlManager.insert(daoName, // 從entity 拿到 daoEnum , tableName
        entity);
    }
};
GamaRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.unmanaged()),
    __metadata("design:paramtypes", [Object])
], GamaRepository);
exports.default = GamaRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvQmFzZVJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBMEI7QUFFMUIseUNBQWtEO0FBQ2xELG1DQUFtQztBQUNuQyw0QkFBNEI7QUFFNUIscUVBQWtFO0FBQ2xFLDREQUFxRDtBQUNyRCw0REFBcUQ7QUFDckQsa0RBQTJDO0FBRTNDLHFEQUFrRDtBQUdsRCxJQUE4QixjQUFjLEdBQTVDLE1BQThCLGNBQWM7SUFLeEMsWUFBeUIsT0FBTztRQUp0QixTQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9DLGVBQVUsR0FBZSxJQUFJLG9CQUFVLEVBQUUsQ0FBQztRQUMxQyxlQUFVLEdBQWtCLElBQUksb0JBQVUsRUFBSyxDQUFDO1FBRXRELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDdEMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxnQkFBZ0I7UUFDekIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxzQkFBc0I7UUFDL0IsT0FBTyxtQkFBUyxDQUFDLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUF5QjtRQUN6QyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFrQixDQUFDLENBQUM7U0FDckQ7YUFBTSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDN0M7YUFBTTtZQUNILE1BQU0sSUFBSSwrQkFBYyxDQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO1NBQzdGO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQWdCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBa0I7UUFDbEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsRUFBUyxDQUFDO1FBQ2hHLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQ3pCLE9BQU8sRUFBRSxpQ0FBaUM7UUFDMUMsTUFBTSxDQUNULENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQTtBQTVFNkIsY0FBYztJQUQzQyxzQkFBVSxFQUFFO0lBTUksV0FBQSxxQkFBUyxFQUFFLENBQUE7O0dBTEUsY0FBYyxDQTRFM0M7a0JBNUU2QixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcblxuaW1wb3J0IHsgaW5qZWN0YWJsZSwgdW5tYW5hZ2VkIH0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCAqIGFzIGxvZzRqcyBmcm9tICdrb2EtbG9nNCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEJhc2VIdHRwU3RhdHVzQ29kZSB9IGZyb20gJy4uL2NvbmZpZy9CYXNlSHR0cFN0YXR1c0NvZGUnO1xuaW1wb3J0IEFQSU1hbmFnZXIgZnJvbSAnLi4vbWljcm9TZXJ2aWNlcy9BUElNYW5hZ2VyJztcbmltcG9ydCBTUUxNYW5hZ2VyIGZyb20gJy4uL21pY3JvU2VydmljZXMvU1FMTWFuYWdlcic7XG5pbXBvcnQgR2FtYVV0aWxzIGZyb20gJy4uL3V0aWxzL0Jhc2VVdGlscyc7XG5pbXBvcnQgR2FtYUVudGl0eSBmcm9tICcuL0Jhc2VFbnRpdHknO1xuaW1wb3J0IHsgTGlic0V4Y2VwdGlvbnMgfSBmcm9tICcuL0xpYnNFeGNlcHRpb25zJztcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgR2FtYVJlcG9zaXRvcnk8VD4ge1xuICAgIHByb3RlY3RlZCBfbG9nID0gbG9nNGpzLmdldExvZ2dlcih0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBzZXRQYXRoKCk6IGFueTtcbiAgICBwcm90ZWN0ZWQgYXBpTWFuYWdlcjogQVBJTWFuYWdlciA9IG5ldyBBUElNYW5hZ2VyKCk7XG4gICAgcHJvdGVjdGVkIHNxbE1hbmFnZXI6IFNRTE1hbmFnZXI8VD4gPSBuZXcgU1FMTWFuYWdlcjxUPigpO1xuICAgIGNvbnN0cnVjdG9yKEB1bm1hbmFnZWQoKSBzcWxUeXBlKSB7XG4gICAgICAgIHRoaXMuc3FsTWFuYWdlci5yb290UGF0aCA9IHRoaXMuc2V0UGF0aCgpO1xuICAgICAgICB0aGlzLnNxbE1hbmFnZXIuc3FsVHlwZSA9IHNxbFR5cGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWPluW+l+ezu+e1seaZgumWkyhmcm9tIERCKVxuICAgICAqXG4gICAgICogQHJldHVybnMge1Byb21pc2U8RGF0ZT59XG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgQmFzZVJlcG9zaXRvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0REJDdXJyZW50VGltZSgpOiBQcm9taXNlPERhdGU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3FsTWFuYWdlci5nZXREQkN1cnJlbnRUaW1lKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y+W5b6X57O757Wx5pmC6ZaTKGZyb20gREIpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIEJhc2VSZXBvc2l0b3J5XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldERCQ3VycmVudFRpbWVTdHJpbmcoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIEdhbWFVdGlscy5EQlRpbWVGb3JtYXQoYXdhaXQgdGhpcy5zcWxNYW5hZ2VyLmdldERCQ3VycmVudFRpbWUoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGFzc3dvcmTop6Plr4YgKHVzZSBEQilcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7KEJ1ZmZlciB8IG9iamVjdCl9IHBhc3N3b3JkXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBCYXNlUmVwb3NpdG9yeVxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBkZUNvZGUocGFzc3dvcmQ6IEJ1ZmZlciB8IG9iamVjdCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGlmIChfLmlzQnVmZmVyKHBhc3N3b3JkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3FsTWFuYWdlci5kZUNvZGUocGFzc3dvcmQgYXMgQnVmZmVyKTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzT2JqZWN0KHBhc3N3b3JkKSkge1xuICAgICAgICAgICAgY29uc3QgdG9CZUJ1ZmZlciA9IG5ldyBCdWZmZXIocGFzc3dvcmQgYXMgYW55LCAnYmluYXJ5Jyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zcWxNYW5hZ2VyLmRlQ29kZSh0b0JlQnVmZmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsICdERUNPREVfUEFTU1dPUkRfVU5ERUZJTkRfVFlQRScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGFzc3dvcmTliqDlr4YgKHVzZSBEQilcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgQmFzZVJlcG9zaXRvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZW5Db2RlKHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zcWxNYW5hZ2VyLmVuQ29kZShwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55uu5YmN5pqr5LiN5L2/55SoXG4gICAgICogQHBhcmFtIHtCYXNlRW50aXR5fSBlbnRpdHlcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqIEBhdXRob3IgTWlrZWxpXG4gICAgICogQG1lbWJlck9mIEJhc2VSZXBvc2l0b3J5XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGluc2VydChlbnRpdHk6IEdhbWFFbnRpdHkpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCBkYW9OYW1lID0gZW50aXR5LmdldEdhbWFFbnRpdHlEYk5hbWUoKSArICcuZGFvOicgKyBlbnRpdHkuZ2V0R2FtYUVudGl0eXRhYmxlTmFtZSgpIGFzIGFueTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3FsTWFuYWdlci5pbnNlcnQoXG4gICAgICAgICAgICBkYW9OYW1lLCAvLyDlvp5lbnRpdHkg5ou/5YiwIGRhb0VudW0gLCB0YWJsZU5hbWVcbiAgICAgICAgICAgIGVudGl0eVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==