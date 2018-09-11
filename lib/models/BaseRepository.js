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
        this.socketPushManager = new SocketPushManager_1.default();
        this.apiManager = new APIManager_1.default();
        this.sqlManager = new MySqlManager_1.default();
        this.grpcManager = new GRPCManager_1.default();
        this.redisManger = new RedisManager_1.default();
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
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], BaseRepository);
exports.default = BaseRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvQmFzZVJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw0QkFBMEI7QUFFMUIseUNBQXVDO0FBQ3ZDLG1DQUFtQztBQUNuQyw0QkFBNEI7QUFDNUIscUVBQWtFO0FBQ2xFLDREQUFtRTtBQUNuRSw4REFBc0Q7QUFDdEQsZ0VBQXdEO0FBQ3hELGdFQUF3RDtBQUN4RCwwRUFBbUU7QUFDbkUsa0RBQTJDO0FBQzNDLHFEQUFrRDtBQUdsRCxJQUE4QixjQUFjLEdBQTVDLE1BQThCLGNBQWM7SUFPeEM7UUFOVSxTQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBSy9DLHNCQUFpQixHQUFzQixJQUFJLDJCQUFpQixFQUFFLENBQUM7UUFFckUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLG9CQUFVLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksc0JBQVcsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxxQkFBVSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHNCQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLGdCQUFnQjtRQUN6QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLHNCQUFzQjtRQUMvQixPQUFPLG1CQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQXlCLEVBQUUsR0FBWTtRQUN2RCxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDdkQ7YUFBTSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN6RDthQUFNO1lBQ0gsTUFBTSxJQUFJLCtCQUFjLENBQUMsdUNBQWtCLENBQUMsV0FBVyxFQUFFLCtCQUErQixDQUFDLENBQUM7U0FDN0Y7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBZ0IsRUFBRSxHQUFZO1FBQzlDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDSixDQUFBO0FBakU2QixjQUFjO0lBRDNDLHNCQUFVLEVBQUU7O0dBQ2lCLGNBQWMsQ0FpRTNDO2tCQWpFNkIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAncmVmbGVjdC1tZXRhZGF0YSc7XG5cbmltcG9ydCB7IGluamVjdGFibGUgfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0ICogYXMgbG9nNGpzIGZyb20gJ2tvYS1sb2c0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEJhc2VIdHRwU3RhdHVzQ29kZSB9IGZyb20gJy4uL2NvbmZpZy9CYXNlSHR0cFN0YXR1c0NvZGUnO1xuaW1wb3J0IEFQSU1hbmFnZXIsIHsgSUhUVFBTQ0EgfSBmcm9tICcuLi9taWNyb1NlcnZpY2VzL0FQSU1hbmFnZXInO1xuaW1wb3J0IEdSUENNYW5nZXIgZnJvbSAnLi4vbWljcm9TZXJ2aWNlcy9HUlBDTWFuYWdlcic7XG5pbXBvcnQgTXlTcWxNYW5nZXIgZnJvbSAnLi4vbWljcm9TZXJ2aWNlcy9NeVNxbE1hbmFnZXInO1xuaW1wb3J0IFJlZGlzTWFuZ2VyIGZyb20gJy4uL21pY3JvU2VydmljZXMvUmVkaXNNYW5hZ2VyJztcbmltcG9ydCBTb2NrZXRQdXNoTWFuYWdlciBmcm9tICcuLi9taWNyb1NlcnZpY2VzL1NvY2tldFB1c2hNYW5hZ2VyJztcbmltcG9ydCBCYXNlVXRpbHMgZnJvbSAnLi4vdXRpbHMvQmFzZVV0aWxzJztcbmltcG9ydCB7IExpYnNFeGNlcHRpb25zIH0gZnJvbSAnLi9MaWJzRXhjZXB0aW9ucyc7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VSZXBvc2l0b3J5IHtcbiAgICBwcm90ZWN0ZWQgX2xvZyA9IGxvZzRqcy5nZXRMb2dnZXIodGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICBwcm90ZWN0ZWQgYXBpTWFuYWdlcjogQVBJTWFuYWdlcjtcbiAgICBwcm90ZWN0ZWQgc3FsTWFuYWdlcjogTXlTcWxNYW5nZXI7XG4gICAgcHJvdGVjdGVkIGdycGNNYW5hZ2VyOiBHUlBDTWFuZ2VyO1xuICAgIHByb3RlY3RlZCByZWRpc01hbmdlcjogUmVkaXNNYW5nZXI7XG4gICAgcHJvdGVjdGVkIHNvY2tldFB1c2hNYW5hZ2VyOiBTb2NrZXRQdXNoTWFuYWdlciA9IG5ldyBTb2NrZXRQdXNoTWFuYWdlcigpO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmFwaU1hbmFnZXIgPSBuZXcgQVBJTWFuYWdlcigpO1xuICAgICAgICB0aGlzLnNxbE1hbmFnZXIgPSBuZXcgTXlTcWxNYW5nZXIoKTtcbiAgICAgICAgdGhpcy5ncnBjTWFuYWdlciA9IG5ldyBHUlBDTWFuZ2VyKCk7XG4gICAgICAgIHRoaXMucmVkaXNNYW5nZXIgPSBuZXcgUmVkaXNNYW5nZXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Y+W5b6X57O757Wx5pmC6ZaTKGZyb20gREIpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxEYXRlPn1cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBCYXNlUmVwb3NpdG9yeVxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXREQkN1cnJlbnRUaW1lKCk6IFByb21pc2U8RGF0ZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zcWxNYW5hZ2VyLmdldERCQ3VycmVudFRpbWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlj5blvpfns7vntbHmmYLplpMoZnJvbSBEQilcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgQmFzZVJlcG9zaXRvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0REJDdXJyZW50VGltZVN0cmluZygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gQmFzZVV0aWxzLkRCVGltZUZvcm1hdChhd2FpdCB0aGlzLnNxbE1hbmFnZXIuZ2V0REJDdXJyZW50VGltZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwYXNzd29yZOino+WvhiAodXNlIERCKVxuICAgICAqXG4gICAgICogQHBhcmFtIHsoQnVmZmVyIHwgb2JqZWN0KX0gcGFzc3dvcmRcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIEJhc2VSZXBvc2l0b3J5XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGRlQ29kZShwYXNzd29yZDogQnVmZmVyIHwgb2JqZWN0LCBrZXk/OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBpZiAoXy5pc0J1ZmZlcihwYXNzd29yZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNxbE1hbmFnZXIuZGVDb2RlKHBhc3N3b3JkIGFzIGFueSwga2V5KTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzT2JqZWN0KHBhc3N3b3JkKSkge1xuICAgICAgICAgICAgY29uc3QgdG9CZUJ1ZmZlciA9IG5ldyBCdWZmZXIocGFzc3dvcmQgYXMgYW55LCAnYmluYXJ5Jyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zcWxNYW5hZ2VyLmRlQ29kZSh0b0JlQnVmZmVyIGFzIGFueSwga2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsICdERUNPREVfUEFTU1dPUkRfVU5ERUZJTkRfVFlQRScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGFzc3dvcmTliqDlr4YgKHVzZSBEQilcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgQmFzZVJlcG9zaXRvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZW5Db2RlKHBhc3N3b3JkOiBzdHJpbmcsIGtleT86IHN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNxbE1hbmFnZXIuZW5Db2RlKHBhc3N3b3JkLCBrZXkpO1xuICAgIH1cbn1cbiJdfQ==