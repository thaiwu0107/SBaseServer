"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("koa-log4");
const _ = require("lodash");
const moment = require("moment");
require("reflect-metadata");
const BaseConstant_1 = require("../config/BaseConstant");
const BaseHttpStatusCode_1 = require("../config/BaseHttpStatusCode");
const enum_SQLServerType_1 = require("../config/enum.SQLServerType");
const models_1 = require("../models");
const BaseEntity_1 = require("../models/BaseEntity");
const LibsExceptions_1 = require("../models/LibsExceptions");
const BaseUtils_1 = require("../utils/BaseUtils");
const _log = log4js.getLogger('SQLManager');
class SQLManager {
    constructor() {
        this._context = models_1.ORMContext.getContext();
    }
    set sqlType(sqlType) {
        this._SQLType = sqlType;
    }
    set rootPath(rootPath) {
        this._rootPath = rootPath;
    }
    /**
     * 取得目前DB的時間
     * @returns {Promise<any>} 就是目前DB的時間
     * @memberof SQLManager
     */
    async getDBCurrentTime() {
        if (this._SQLType === enum_SQLServerType_1.SQLServerType.MY_SQL) {
            return moment(new Date()).toDate();
        }
        else {
            const daoName = models_1.ORMContext.getConnectionNames()[0];
            const dbtime = await this.sysExecTemplate(daoName + '.sqlexec', 'QueryDBCurrentTime.sql', {});
            return moment(dbtime[0].TS).toDate();
        }
    }
    /**
     * 執行sql query文件
     * @param daoName
     * @param templatePath
     * @param data
     * @param trans
     */
    async execTemplate(daoName, templatePath, data, trans) {
        const path = await BaseUtils_1.default.getPath(templatePath, undefined, this._rootPath);
        return this.getDao(daoName, trans).execTemplate(undefined, data, undefined, false, path);
    }
    /**
     * 執行sysSql query文件
     * @param daoName
     * @param templatePath
     * @param data
     * @param trans
     */
    async sysExecTemplate(daoName, templatePath, data, trans) {
        return this.getDao(daoName, trans).execTemplate(templatePath, data, undefined, false);
    }
    /**
     * 執行sql batch文件, 參數皆為nvarchar(MAXX)
     * @param daoName
     * @param templatePath
     * @param data
     * @param trans
     */
    async execBatch(daoName, templatePath, data, trans) {
        const path = await BaseUtils_1.default.getPath(templatePath, undefined, this._rootPath);
        return this.getDao(daoName, trans).execTemplate(undefined, data, undefined, true, path);
    }
    /**
     * 取得Dao物件
     * @param daoName
     * @param trans
     */
    getDao(daoName, trans) {
        if (_.isUndefined(trans)) {
            return models_1.ORMContext.getBean(daoName);
        }
        else {
            return trans.getDao(daoName);
        }
    }
    /**
     * 尋找指定DB的Table造你要的條件
     * 要先自己組合想要搜尋的條件
     * 如果要JOIN的動作,可以參考SQLHelper,資料出來之後再做
     * @param {T} daoName 指定DB的TableName
     * @param {(IO | IAnd | IOr)} condition 搜尋的條件
     * @param {IQueryOptions} [fields] 如果你知道你想要的欄位可以,直接指定,如果只有一個請放入陣列['xxx']
     * @param {ITransaction} [trans] 事務交易
     * @returns {Promise<any[]>} Promise的資料
     * @memberof SQL
     */
    async query(daoName, condition, options, ...iAJoins) {
        const o = options;
        let execOption = {};
        if (!_.isUndefined(o)) {
            execOption = _.omitBy(o, _.isUndefined);
        }
        if (!_.isUndefined(iAJoins)) {
            _.forEach(iAJoins, (data) => {
                execOption = _.assign({}, execOption, data);
            });
        }
        const result = await this.getDao(daoName).query(condition, execOption);
        return result;
    }
    /**
     * 尋找指定DB的Table全部資料
     * 還可以指定需要的欄位,
     * @param {T} daoName 指定DB的TableName
     * @param {IQueryOptions} options? 指定DB的要秀出來的欄位
     * @returns {Promise<any[]>} Promise的資料
     * @memberof SQL
     */
    async queryAll(daoName, options, iAJoins) {
        return this.query(daoName, {}, options, iAJoins);
    }
    /**
     * 注意!!!如果資料存在變成Update會把changObj裡面有值的欄位都一起被Update
     * @param {T} daoName 指定DB的TableName
     * @param {(IO | IAnd | IOr)} condition 指定的條件
     * @param {BaseEntity} changObj 你想要變更的物件條件
     * @param {ITransaction} [trans] 事務交易
     * @returns {Promise<any[]>} Promise的資料
     * @memberof SQL
     */
    async insertOrUpdate(daoName, condition, changObj, trans) {
        const exist = await this.count(daoName, condition);
        return _.toNumber(exist) === 0 ?
            this.insert(daoName, changObj, trans) :
            this.update(daoName, condition, changObj, trans);
    }
    /**
     * 如果要JOIN的動作,可以參考SQLHelper,資料出來之後再做
     * @param {T} daoName 指定DB的TableName
     * @param {(IO | IAnd | IOr)} condition 指定的條件
     * @param {BaseEntity} changObj 你想要變更的物件條件
     * @param {ITransaction} [trans] 事務交易
     * @returns {Promise<any[]>} Promise的資料
     * @memberof SQL
     */
    async update(daoName, condition, changObj, trans) {
        return this.getDao(daoName, trans).update(changObj.toJSON(), condition);
    }
    /**
     * 如果要JOIN的動作,可以參考SQLHelper,資料出來之後再做
     * @param {T} daoName 指定DB的TableName
     * @param {any} obj 你想要新增的物件
     * @param {ITransaction} [trans] 事務交易
     * @returns {Promise<any[]>} Promise的資料
     * @memberof SQL
     */
    async insert(daoName, obj, trans) {
        if (!Array.isArray(obj)) {
            const addData = (obj instanceof BaseEntity_1.default) ? obj.toJSON() : obj;
            return this.getDao(daoName, trans).insert(addData);
        }
        else {
            const dataObj = [];
            if (this._SQLType === enum_SQLServerType_1.SQLServerType.MY_SQL) {
                _.each(obj, (elm, index) => {
                    dataObj.push((elm instanceof BaseEntity_1.default) ? elm.toJSON() : elm);
                });
                const sPromises = [];
                for (let index = 0; index < _.size(dataObj); index++) {
                    sPromises.push(await this.getDao(daoName, trans).insert(dataObj[index]));
                }
                const objarray = [];
                _.forEach(sPromises, (data) => {
                    objarray.push(data[0]);
                });
                return objarray;
            }
            else {
                _.each(obj, (elm, index) => {
                    dataObj.push((elm instanceof BaseEntity_1.default) ? elm.toJSON() : elm);
                });
                return this.getDao(daoName, trans).insert(dataObj);
            }
        }
    }
    /**
     * 刪除DB依造你輸入的條件
     * @param {T} daoName DB跟Table名字
     * @param {(IO | IAnd | IOr)} condition 條件
     * @param {ITransaction} [trans] 交易事務
     * @returns {Promise<any[]>} 你刪除的資料
     * @memberof SqlManager
     */
    async remove(daoName, condition, trans) {
        return this.getDao(daoName, trans).remove(condition);
    }
    /**
     * 幫你計算這個DB的這個Table有多少資料用的
     * @param {T} daoName 指定DBTable
     * @returns {Promise<any[]>} 回傳數字
     * @memberof SqlManager
     */
    async count(daoName, condition) {
        return this.getDao(daoName).count(condition);
    }
    /**
     * 幫你Sum這個DB的這個Table資料用的
     * @param {T} daoName 指定DBTable
     * @param {(IO | IAnd | IOr)} condition 搜尋的條件
     * @param {IQueryOptions} [fields]
     * @returns {Promise<any[]>} 回傳數字
     * @memberof SqlManager
     */
    async sum(daoName, condition, uniquefield) {
        return this.getDao(daoName).sum(condition, uniquefield);
    }
    /**
     * 幫你Max這個DB的這個Table資料用的
     * @param {T} daoName 指定DBTable
     * @param {(IO | IAnd | IOr)} condition 搜尋的條件
     * @param {IQueryOptions} [fields]
     * @returns {Promise<any[]>} 回傳數字
     * @memberof SqlManager
     */
    async max(daoName, condition, uniquefield) {
        return this.getDao(daoName).max(condition, uniquefield);
    }
    /**
     * 幫你Min這個DB的這個Table資料用的
     * @param {T} daoName 指定DBTable
     * @param {(IO | IAnd | IOr)} condition 搜尋的條件
     * @param {IQueryOptions} [fields]
     * @returns {Promise<any[]>} 回傳數字
     * @memberof SqlManager
     */
    async min(daoName, condition, uniquefield) {
        return this.getDao(daoName).min(condition, uniquefield);
    }
    /**
     * 執行procedure
     * @param daoProdName
     * @param args 多參數
     * @returns {Promise<{recordset, returnValue, parameters}>}
     * @memberof SqlManager
     */
    async runProcedure(daoProdName, ...args) {
        try {
            const rep = await this.getDao(daoProdName).run(...args, {});
            return rep;
        }
        catch (error) {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.PROCEDURE_WARN, error.message);
        }
    }
    /**
     * 此方法在gama-orm V3版之後不支援Transaction
     * 執行procedure with Transaction
     * @param daoProdName
     * @param {ITransaction} [trans] 交易事務
     * @param args 多參數
     * @returns {Promise<{recordset, returnValue, parameters}>}
     * @memberof SqlManager
     */
    async runProcedureTrans(daoProdName, trans, ...args) {
        try {
            const rep = await this.getDao(daoProdName, trans).run(...args, {});
            return rep;
        }
        catch (error) {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.PROCEDURE_WARN, error.message);
        }
    }
    /**
     * 取得SQL加密
     * @param password 多參數
     * @param {string} sqlKey 密碼可選參數
     * @returns {Promise<{password}>}
     * @memberof SqlManager
     */
    async deCode(password, sqlKey = BaseConstant_1.BaseConstant.DB_PASSWORD_KEY) {
        const daoName = models_1.ORMContext.getConnectionNames()[0];
        const rep = await this.sysExecTemplate(daoName + '.sqlexec', 'DecryptbypassphrasePassword.sql', {
            SQLKey: sqlKey,
            passwords: password
        });
        console.log('thho', rep);
        return rep[0].password;
    }
    /**
     * 取得SQL解密
     * @param {string} password 多參數
     * @param {string} sqlKey 密碼可選參數
     * @returns {Promise<{password}>}
     * @memberof SqlManager
     */
    async enCode(password, sqlKey = BaseConstant_1.BaseConstant.DB_PASSWORD_KEY) {
        const daoName = models_1.ORMContext.getConnectionNames()[0];
        const rep = await this.sysExecTemplate(daoName + '.sqlexec', 'EncryptbypassphrasePassword.sql', {
            SQLKey: sqlKey,
            passwords: password
        });
        return rep[0].password;
    }
}
exports.default = SQLManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1FMTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbIm1pY3JvU2VydmljZXMvU1FMTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQyw0QkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDLDRCQUEwQjtBQUMxQix5REFBc0Q7QUFDdEQscUVBQWtFO0FBQ2xFLHFFQUE2RDtBQUM3RCxzQ0FBcUQ7QUFDckQscURBQThDO0FBQzlDLDZEQUEwRDtBQUMxRCxrREFBMkM7QUFHM0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUM1QyxNQUFxQixVQUFVO0lBSzNCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxtQkFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFDRCxJQUFXLE9BQU8sQ0FBQyxPQUFPO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFDRCxJQUFXLFFBQVEsQ0FBQyxRQUFRO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzlCLENBQUM7SUFDRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLGdCQUFnQjtRQUN6QixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssa0NBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDeEMsT0FBTyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3RDO2FBQU07WUFDSCxNQUFNLE9BQU8sR0FBRyxtQkFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxVQUFpQixFQUFFLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JHLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxD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QixpQ0FBaUMsRUFBRTtZQUMvQixNQUFNLEVBQUUsTUFBTTtZQUNkLFNBQVMsRUFBRSxRQUFRO1NBQ3RCLENBQ0osQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFnQixFQUFFLE1BQU0sR0FBRywyQkFBWSxDQUFDLGVBQWU7UUFDdkUsTUFBTSxPQUFPLEdBQUcsbUJBQVUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FDbEMsT0FBTyxHQUFHLFVBQWlCLEVBQzNCLGlDQUFpQyxFQUFFO1lBQy9CLE1BQU0sRUFBRSxNQUFNO1lBQ2QsU0FBUyxFQUFFLFFBQVE7U0FDdEIsQ0FDSixDQUFDO1FBQ0YsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQzNCLENBQUM7Q0FDSjtBQXZWRCw2QkF1VkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBsb2c0anMgZnJvbSAna29hLWxvZzQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuaW1wb3J0IHsgQmFzZUNvbnN0YW50IH0gZnJvbSAnLi4vY29uZmlnL0Jhc2VDb25zdGFudCc7XG5pbXBvcnQgeyBCYXNlSHR0cFN0YXR1c0NvZGUgfSBmcm9tICcuLi9jb25maWcvQmFzZUh0dHBTdGF0dXNDb2RlJztcbmltcG9ydCB7IFNRTFNlcnZlclR5cGUgfSBmcm9tICcuLi9jb25maWcvZW51bS5TUUxTZXJ2ZXJUeXBlJztcbmltcG9ydCB7IElUcmFuc2FjdGlvbiwgT1JNQ29udGV4dCB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgR2FtYUVudGl0eSBmcm9tICcuLi9tb2RlbHMvQmFzZUVudGl0eSc7XG5pbXBvcnQgeyBMaWJzRXhjZXB0aW9ucyB9IGZyb20gJy4uL21vZGVscy9MaWJzRXhjZXB0aW9ucyc7XG5pbXBvcnQgQmFzZVV0aWxzIGZyb20gJy4uL3V0aWxzL0Jhc2VVdGlscyc7XG5pbXBvcnQgeyBJQUpvaW5zLCBJQW5kLCBJQ29uZGl0aW9uLCBJT3IsIElRdWVyeU9wdGlvbnMsIElVbmlxdWVGaWVsZCwgU1FMSm9pbnMgfSBmcm9tICcuLi91dGlscy9EYW9PcGVyYXRvcic7XG5cbmNvbnN0IF9sb2cgPSBsb2c0anMuZ2V0TG9nZ2VyKCdTUUxNYW5hZ2VyJyk7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTUUxNYW5hZ2VyPFQ+IHtcbiAgICBwcml2YXRlIF9yb290UGF0aDogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBfY29udGV4dDogT1JNQ29udGV4dDtcbiAgICBwcml2YXRlIF9TUUxUeXBlOiBTUUxTZXJ2ZXJUeXBlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBPUk1Db250ZXh0LmdldENvbnRleHQoKTtcbiAgICB9XG4gICAgcHVibGljIHNldCBzcWxUeXBlKHNxbFR5cGUpIHtcbiAgICAgICAgdGhpcy5fU1FMVHlwZSA9IHNxbFR5cGU7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgcm9vdFBhdGgocm9vdFBhdGgpIHtcbiAgICAgICAgdGhpcy5fcm9vdFBhdGggPSByb290UGF0aDtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Y+W5b6X55uu5YmNRELnmoTmmYLplpNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSDlsLHmmK/nm67liY1EQueahOaZgumWk1xuICAgICAqIEBtZW1iZXJvZiBTUUxNYW5hZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldERCQ3VycmVudFRpbWUoKTogUHJvbWlzZTxEYXRlPiB7XG4gICAgICAgIGlmICh0aGlzLl9TUUxUeXBlID09PSBTUUxTZXJ2ZXJUeXBlLk1ZX1NRTCkge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChuZXcgRGF0ZSgpKS50b0RhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRhb05hbWUgPSBPUk1Db250ZXh0LmdldENvbm5lY3Rpb25OYW1lcygpWzBdO1xuICAgICAgICAgICAgY29uc3QgZGJ0aW1lID0gYXdhaXQgdGhpcy5zeXNFeGVjVGVtcGxhdGUoZGFvTmFtZSArICcuc3FsZXhlYycgYXMgYW55LCAnUXVlcnlEQkN1cnJlbnRUaW1lLnNxbCcsIHt9KTtcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQoZGJ0aW1lWzBdLlRTKS50b0RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWft+ihjHNxbCBxdWVyeeaWh+S7tlxuICAgICAqIEBwYXJhbSBkYW9OYW1lXG4gICAgICogQHBhcmFtIHRlbXBsYXRlUGF0aFxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHBhcmFtIHRyYW5zXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGV4ZWNUZW1wbGF0ZShkYW9OYW1lOiBULCB0ZW1wbGF0ZVBhdGg6IHN0cmluZywgZGF0YTogYW55LCB0cmFucz8pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCBwYXRoID0gYXdhaXQgQmFzZVV0aWxzLmdldFBhdGgodGVtcGxhdGVQYXRoLCB1bmRlZmluZWQsIHRoaXMuX3Jvb3RQYXRoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGFvKGRhb05hbWUsIHRyYW5zKS5leGVjVGVtcGxhdGUodW5kZWZpbmVkLCBkYXRhLCB1bmRlZmluZWQsIGZhbHNlLCBwYXRoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDln7fooYxzeXNTcWwgcXVlcnnmlofku7ZcbiAgICAgKiBAcGFyYW0gZGFvTmFtZVxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZVBhdGhcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEBwYXJhbSB0cmFuc1xuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzeXNFeGVjVGVtcGxhdGUoZGFvTmFtZTogVCwgdGVtcGxhdGVQYXRoOiBzdHJpbmcsIGRhdGE6IGFueSwgdHJhbnM/KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGFvKGRhb05hbWUsIHRyYW5zKS5leGVjVGVtcGxhdGUodGVtcGxhdGVQYXRoLCBkYXRhLCB1bmRlZmluZWQsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDln7fooYxzcWwgYmF0Y2jmlofku7YsIOWPg+aVuOeahueCum52YXJjaGFyKE1BWFgpXG4gICAgICogQHBhcmFtIGRhb05hbWVcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGVQYXRoXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcGFyYW0gdHJhbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZXhlY0JhdGNoKGRhb05hbWU6IFQsIHRlbXBsYXRlUGF0aDogc3RyaW5nLCBkYXRhOiBhbnksIHRyYW5zPyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSBhd2FpdCBCYXNlVXRpbHMuZ2V0UGF0aCh0ZW1wbGF0ZVBhdGgsIHVuZGVmaW5lZCwgdGhpcy5fcm9vdFBhdGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYW8oZGFvTmFtZSwgdHJhbnMpLmV4ZWNUZW1wbGF0ZSh1bmRlZmluZWQsIGRhdGEsIHVuZGVmaW5lZCwgdHJ1ZSwgcGF0aCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y+W5b6XRGFv54mp5Lu2XG4gICAgICogQHBhcmFtIGRhb05hbWVcbiAgICAgKiBAcGFyYW0gdHJhbnNcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldERhbyhkYW9OYW1lOiBULCB0cmFucz8pIHtcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQodHJhbnMpKSB7XG4gICAgICAgICAgICByZXR1cm4gT1JNQ29udGV4dC5nZXRCZWFuKGRhb05hbWUgYXMgYW55KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cmFucyEuZ2V0RGFvKGRhb05hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5bCL5om+5oyH5a6aRELnmoRUYWJsZemAoOS9oOimgeeahOaineS7tlxuICAgICAqIOimgeWFiOiHquW3see1hOWQiOaDs+imgeaQnOWwi+eahOaineS7tlxuICAgICAqIOWmguaenOimgUpPSU7nmoTli5XkvZws5Y+v5Lul5Y+D6ICDU1FMSGVscGVyLOizh+aWmeWHuuS+huS5i+W+jOWGjeWBmlxuICAgICAqIEBwYXJhbSB7VH0gZGFvTmFtZSDmjIflrppEQueahFRhYmxlTmFtZVxuICAgICAqIEBwYXJhbSB7KElPIHwgSUFuZCB8IElPcil9IGNvbmRpdGlvbiDmkJzlsIvnmoTmop3ku7ZcbiAgICAgKiBAcGFyYW0ge0lRdWVyeU9wdGlvbnN9IFtmaWVsZHNdIOWmguaenOS9oOefpemBk+S9oOaDs+imgeeahOashOS9jeWPr+S7pSznm7TmjqXmjIflrpos5aaC5p6c5Y+q5pyJ5LiA5YCL6KuL5pS+5YWl6Zmj5YiXWyd4eHgnXVxuICAgICAqIEBwYXJhbSB7SVRyYW5zYWN0aW9ufSBbdHJhbnNdIOS6i+WLmeS6pOaYk1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdPn0gUHJvbWlzZeeahOizh+aWmVxuICAgICAqIEBtZW1iZXJvZiBTUUxcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcXVlcnkoXG4gICAgICAgIGRhb05hbWU6IFQsXG4gICAgICAgIGNvbmRpdGlvbjogSUNvbmRpdGlvbiB8IElBbmQgfCBJT3IsXG4gICAgICAgIG9wdGlvbnM/OiBJUXVlcnlPcHRpb25zIHwgdW5kZWZpbmVkLFxuICAgICAgICAuLi5pQUpvaW5zOiBTUUxKb2luc1tdKTogUHJvbWlzZTxhbnlbXT4ge1xuXG4gICAgICAgIGNvbnN0IG8gPSBvcHRpb25zIGFzIElRdWVyeU9wdGlvbnM7XG4gICAgICAgIGxldCBleGVjT3B0aW9uID0ge30gYXMgSVF1ZXJ5T3B0aW9ucztcbiAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKG8pKSB7XG4gICAgICAgICAgICBleGVjT3B0aW9uID0gXy5vbWl0QnkobywgXy5pc1VuZGVmaW5lZCkgYXMgSVF1ZXJ5T3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQoaUFKb2lucykpIHtcbiAgICAgICAgICAgIF8uZm9yRWFjaChpQUpvaW5zLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGV4ZWNPcHRpb24gPSBfLmFzc2lnbih7fSwgZXhlY09wdGlvbiwgZGF0YSkgYXMgSVF1ZXJ5T3B0aW9ucztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuZ2V0RGFvKGRhb05hbWUpLnF1ZXJ5KFxuICAgICAgICAgICAgY29uZGl0aW9uLCBleGVjT3B0aW9uXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5bCL5om+5oyH5a6aRELnmoRUYWJsZeWFqOmDqOizh+aWmVxuICAgICAqIOmChOWPr+S7peaMh+WumumcgOimgeeahOashOS9jSxcbiAgICAgKiBAcGFyYW0ge1R9IGRhb05hbWUg5oyH5a6aRELnmoRUYWJsZU5hbWVcbiAgICAgKiBAcGFyYW0ge0lRdWVyeU9wdGlvbnN9IG9wdGlvbnM/IOaMh+WumkRC55qE6KaB56eA5Ye65L6G55qE5qyE5L2NXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W10+fSBQcm9taXNl55qE6LOH5paZXG4gICAgICogQG1lbWJlcm9mIFNRTFxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBxdWVyeUFsbChcbiAgICAgICAgZGFvTmFtZTogVCxcbiAgICAgICAgb3B0aW9ucz86IElRdWVyeU9wdGlvbnMgfCB1bmRlZmluZWQsXG4gICAgICAgIGlBSm9pbnM/OiBJQUpvaW5zIHwgdW5kZWZpbmVkKTogUHJvbWlzZTxhbnlbXT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5KGRhb05hbWUsIHt9IGFzIElDb25kaXRpb24sIG9wdGlvbnMsIGlBSm9pbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDms6jmhI8hISHlpoLmnpzos4fmlpnlrZjlnKjorormiJBVcGRhdGXmnIPmiopjaGFuZ09iauijoemdouacieWAvOeahOashOS9jemDveS4gOi1t+iiq1VwZGF0ZVxuICAgICAqIEBwYXJhbSB7VH0gZGFvTmFtZSDmjIflrppEQueahFRhYmxlTmFtZVxuICAgICAqIEBwYXJhbSB7KElPIHwgSUFuZCB8IElPcil9IGNvbmRpdGlvbiDmjIflrprnmoTmop3ku7ZcbiAgICAgKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGNoYW5nT2JqIOS9oOaDs+imgeiuiuabtOeahOeJqeS7tuaineS7tlxuICAgICAqIEBwYXJhbSB7SVRyYW5zYWN0aW9ufSBbdHJhbnNdIOS6i+WLmeS6pOaYk1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdPn0gUHJvbWlzZeeahOizh+aWmVxuICAgICAqIEBtZW1iZXJvZiBTUUxcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaW5zZXJ0T3JVcGRhdGUoXG4gICAgICAgIGRhb05hbWU6IFQsXG4gICAgICAgIGNvbmRpdGlvbjogSUNvbmRpdGlvbiB8IElBbmQgfCBJT3IsXG4gICAgICAgIGNoYW5nT2JqOiBHYW1hRW50aXR5LFxuICAgICAgICB0cmFucz86IElUcmFuc2FjdGlvbik6IFByb21pc2U8YW55W10+IHtcbiAgICAgICAgY29uc3QgZXhpc3QgPSBhd2FpdCB0aGlzLmNvdW50KGRhb05hbWUsIGNvbmRpdGlvbik7XG4gICAgICAgIHJldHVybiBfLnRvTnVtYmVyKGV4aXN0KSA9PT0gMCA/XG4gICAgICAgICAgICB0aGlzLmluc2VydChkYW9OYW1lLCBjaGFuZ09iaiwgdHJhbnMpIDpcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKGRhb05hbWUsIGNvbmRpdGlvbiwgY2hhbmdPYmosIHRyYW5zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5aaC5p6c6KaBSk9JTueahOWLleS9nCzlj6/ku6Xlj4PogINTUUxIZWxwZXIs6LOH5paZ5Ye65L6G5LmL5b6M5YaN5YGaXG4gICAgICogQHBhcmFtIHtUfSBkYW9OYW1lIOaMh+WumkRC55qEVGFibGVOYW1lXG4gICAgICogQHBhcmFtIHsoSU8gfCBJQW5kIHwgSU9yKX0gY29uZGl0aW9uIOaMh+WumueahOaineS7tlxuICAgICAqIEBwYXJhbSB7QmFzZUVudGl0eX0gY2hhbmdPYmog5L2g5oOz6KaB6K6K5pu055qE54mp5Lu25qKd5Lu2XG4gICAgICogQHBhcmFtIHtJVHJhbnNhY3Rpb259IFt0cmFuc10g5LqL5YuZ5Lqk5piTXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W10+fSBQcm9taXNl55qE6LOH5paZXG4gICAgICogQG1lbWJlcm9mIFNRTFxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB1cGRhdGUoXG4gICAgICAgIGRhb05hbWU6IFQsXG4gICAgICAgIGNvbmRpdGlvbjogSUNvbmRpdGlvbiB8IElBbmQgfCBJT3IsXG4gICAgICAgIGNoYW5nT2JqOiBHYW1hRW50aXR5LFxuICAgICAgICB0cmFucz86IElUcmFuc2FjdGlvbik6IFByb21pc2U8YW55W10+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXREYW8oZGFvTmFtZSwgdHJhbnMpLnVwZGF0ZShjaGFuZ09iai50b0pTT04oKSwgY29uZGl0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5aaC5p6c6KaBSk9JTueahOWLleS9nCzlj6/ku6Xlj4PogINTUUxIZWxwZXIs6LOH5paZ5Ye65L6G5LmL5b6M5YaN5YGaXG4gICAgICogQHBhcmFtIHtUfSBkYW9OYW1lIOaMh+WumkRC55qEVGFibGVOYW1lXG4gICAgICogQHBhcmFtIHthbnl9IG9iaiDkvaDmg7PopoHmlrDlop7nmoTnianku7ZcbiAgICAgKiBAcGFyYW0ge0lUcmFuc2FjdGlvbn0gW3RyYW5zXSDkuovli5nkuqTmmJNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnlbXT59IFByb21pc2XnmoTos4fmlplcbiAgICAgKiBAbWVtYmVyb2YgU1FMXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGluc2VydChkYW9OYW1lOiBULCBvYmo6IGFueVtdIHwgYW55LCB0cmFucz86IElUcmFuc2FjdGlvbik6IFByb21pc2U8YW55W10+IHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIGNvbnN0IGFkZERhdGEgPSAob2JqIGluc3RhbmNlb2YgR2FtYUVudGl0eSkgPyBvYmoudG9KU09OKCkgOiBvYmo7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREYW8oZGFvTmFtZSwgdHJhbnMpLmluc2VydChhZGREYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFPYmo6IGFueVtdID0gW107XG4gICAgICAgICAgICBpZiAodGhpcy5fU1FMVHlwZSA9PT0gU1FMU2VydmVyVHlwZS5NWV9TUUwpIHtcbiAgICAgICAgICAgICAgICBfLmVhY2gob2JqLCAoZWxtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhT2JqLnB1c2goKGVsbSBpbnN0YW5jZW9mIEdhbWFFbnRpdHkpID8gZWxtLnRvSlNPTigpIDogZWxtKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBzUHJvbWlzZXM6IGFueVtdID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF8uc2l6ZShkYXRhT2JqKTsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICBzUHJvbWlzZXMucHVzaChhd2FpdCB0aGlzLmdldERhbyhkYW9OYW1lLCB0cmFucykuaW5zZXJ0KGRhdGFPYmpbaW5kZXhdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG9iamFycmF5OiBhbnlbXSA9IFtdO1xuICAgICAgICAgICAgICAgIF8uZm9yRWFjaChzUHJvbWlzZXMsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9iamFycmF5LnB1c2goZGF0YVswXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamFycmF5O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfLmVhY2gob2JqLCAoZWxtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhT2JqLnB1c2goKGVsbSBpbnN0YW5jZW9mIEdhbWFFbnRpdHkpID8gZWxtLnRvSlNPTigpIDogZWxtKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREYW8oZGFvTmFtZSwgdHJhbnMpLmluc2VydChkYXRhT2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIqumZpERC5L6d6YCg5L2g6Ly45YWl55qE5qKd5Lu2XG4gICAgICogQHBhcmFtIHtUfSBkYW9OYW1lIERC6LefVGFibGXlkI3lrZdcbiAgICAgKiBAcGFyYW0geyhJTyB8IElBbmQgfCBJT3IpfSBjb25kaXRpb24g5qKd5Lu2XG4gICAgICogQHBhcmFtIHtJVHJhbnNhY3Rpb259IFt0cmFuc10g5Lqk5piT5LqL5YuZXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W10+fSDkvaDliKrpmaTnmoTos4fmlplcbiAgICAgKiBAbWVtYmVyb2YgU3FsTWFuYWdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyByZW1vdmUoXG4gICAgICAgIGRhb05hbWU6IFQsXG4gICAgICAgIGNvbmRpdGlvbjogSUNvbmRpdGlvbiB8IElBbmQgfCBJT3IsXG4gICAgICAgIHRyYW5zPzogSVRyYW5zYWN0aW9uKTogUHJvbWlzZTxhbnlbXT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldERhbyhkYW9OYW1lLCB0cmFucykucmVtb3ZlKGNvbmRpdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5bmr5L2g6KiI566X6YCZ5YCLRELnmoTpgJnlgItUYWJsZeacieWkmuWwkeizh+aWmeeUqOeahFxuICAgICAqIEBwYXJhbSB7VH0gZGFvTmFtZSDmjIflrppEQlRhYmxlXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W10+fSDlm57lgrPmlbjlrZdcbiAgICAgKiBAbWVtYmVyb2YgU3FsTWFuYWdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBjb3VudChcbiAgICAgICAgZGFvTmFtZTogVCxcbiAgICAgICAgY29uZGl0aW9uOiBJQ29uZGl0aW9uIHwgSUFuZCB8IElPcik6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERhbyhkYW9OYW1lKS5jb3VudChjb25kaXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW5q+S9oFN1bemAmeWAi0RC55qE6YCZ5YCLVGFibGXos4fmlpnnlKjnmoRcbiAgICAgKiBAcGFyYW0ge1R9IGRhb05hbWUg5oyH5a6aREJUYWJsZVxuICAgICAqIEBwYXJhbSB7KElPIHwgSUFuZCB8IElPcil9IGNvbmRpdGlvbiDmkJzlsIvnmoTmop3ku7ZcbiAgICAgKiBAcGFyYW0ge0lRdWVyeU9wdGlvbnN9IFtmaWVsZHNdXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W10+fSDlm57lgrPmlbjlrZdcbiAgICAgKiBAbWVtYmVyb2YgU3FsTWFuYWdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzdW0oXG4gICAgICAgIGRhb05hbWU6IFQsXG4gICAgICAgIGNvbmRpdGlvbjogSUNvbmRpdGlvbiB8IElBbmQgfCBJT3IsXG4gICAgICAgIHVuaXF1ZWZpZWxkOiBJVW5pcXVlRmllbGQpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYW8oZGFvTmFtZSkuc3VtKGNvbmRpdGlvbiwgdW5pcXVlZmllbGQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW5q+S9oE1heOmAmeWAi0RC55qE6YCZ5YCLVGFibGXos4fmlpnnlKjnmoRcbiAgICAgKiBAcGFyYW0ge1R9IGRhb05hbWUg5oyH5a6aREJUYWJsZVxuICAgICAqIEBwYXJhbSB7KElPIHwgSUFuZCB8IElPcil9IGNvbmRpdGlvbiDmkJzlsIvnmoTmop3ku7ZcbiAgICAgKiBAcGFyYW0ge0lRdWVyeU9wdGlvbnN9IFtmaWVsZHNdXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W10+fSDlm57lgrPmlbjlrZdcbiAgICAgKiBAbWVtYmVyb2YgU3FsTWFuYWdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBtYXgoXG4gICAgICAgIGRhb05hbWU6IFQsXG4gICAgICAgIGNvbmRpdGlvbjogSUNvbmRpdGlvbiB8IElBbmQgfCBJT3IsXG4gICAgICAgIHVuaXF1ZWZpZWxkOiBJVW5pcXVlRmllbGQpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYW8oZGFvTmFtZSkubWF4KGNvbmRpdGlvbiwgdW5pcXVlZmllbGQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW5q+S9oE1pbumAmeWAi0RC55qE6YCZ5YCLVGFibGXos4fmlpnnlKjnmoRcbiAgICAgKiBAcGFyYW0ge1R9IGRhb05hbWUg5oyH5a6aREJUYWJsZVxuICAgICAqIEBwYXJhbSB7KElPIHwgSUFuZCB8IElPcil9IGNvbmRpdGlvbiDmkJzlsIvnmoTmop3ku7ZcbiAgICAgKiBAcGFyYW0ge0lRdWVyeU9wdGlvbnN9IFtmaWVsZHNdXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W10+fSDlm57lgrPmlbjlrZdcbiAgICAgKiBAbWVtYmVyb2YgU3FsTWFuYWdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBtaW4oXG4gICAgICAgIGRhb05hbWU6IFQsXG4gICAgICAgIGNvbmRpdGlvbjogSUNvbmRpdGlvbiB8IElBbmQgfCBJT3IsXG4gICAgICAgIHVuaXF1ZWZpZWxkOiBJVW5pcXVlRmllbGQpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYW8oZGFvTmFtZSkubWluKGNvbmRpdGlvbiwgdW5pcXVlZmllbGQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWft+ihjHByb2NlZHVyZVxuICAgICAqIEBwYXJhbSBkYW9Qcm9kTmFtZVxuICAgICAqIEBwYXJhbSBhcmdzIOWkmuWPg+aVuFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHtyZWNvcmRzZXQsIHJldHVyblZhbHVlLCBwYXJhbWV0ZXJzfT59XG4gICAgICogQG1lbWJlcm9mIFNxbE1hbmFnZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcnVuUHJvY2VkdXJlKFxuICAgICAgICBkYW9Qcm9kTmFtZTogVCwgLi4uYXJncyk6IFByb21pc2U8YW55W10+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcCA9IGF3YWl0IHRoaXMuZ2V0RGFvKGRhb1Byb2ROYW1lKS5ydW4oLi4uYXJncywge30pO1xuICAgICAgICAgICAgcmV0dXJuIHJlcDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuUFJPQ0VEVVJFX1dBUk4sIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5q2k5pa55rOV5ZyoZ2FtYS1vcm0gVjPniYjkuYvlvozkuI3mlK/mj7RUcmFuc2FjdGlvblxuICAgICAqIOWft+ihjHByb2NlZHVyZSB3aXRoIFRyYW5zYWN0aW9uXG4gICAgICogQHBhcmFtIGRhb1Byb2ROYW1lXG4gICAgICogQHBhcmFtIHtJVHJhbnNhY3Rpb259IFt0cmFuc10g5Lqk5piT5LqL5YuZXG4gICAgICogQHBhcmFtIGFyZ3Mg5aSa5Y+D5pW4XG4gICAgICogQHJldHVybnMge1Byb21pc2U8e3JlY29yZHNldCwgcmV0dXJuVmFsdWUsIHBhcmFtZXRlcnN9Pn1cbiAgICAgKiBAbWVtYmVyb2YgU3FsTWFuYWdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBydW5Qcm9jZWR1cmVUcmFucyhcbiAgICAgICAgZGFvUHJvZE5hbWU6IFQsIHRyYW5zLCAuLi5hcmdzKTogUHJvbWlzZTxhbnlbXT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVwID0gYXdhaXQgdGhpcy5nZXREYW8oZGFvUHJvZE5hbWUsIHRyYW5zKS5ydW4oLi4uYXJncywge30pO1xuICAgICAgICAgICAgcmV0dXJuIHJlcDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuUFJPQ0VEVVJFX1dBUk4sIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y+W5b6XU1FM5Yqg5a+GXG4gICAgICogQHBhcmFtIHBhc3N3b3JkIOWkmuWPg+aVuFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzcWxLZXkg5a+G56K85Y+v6YG45Y+D5pW4XG4gICAgICogQHJldHVybnMge1Byb21pc2U8e3Bhc3N3b3JkfT59XG4gICAgICogQG1lbWJlcm9mIFNxbE1hbmFnZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZGVDb2RlKHBhc3N3b3JkOiBCdWZmZXIsIHNxbEtleSA9IEJhc2VDb25zdGFudC5EQl9QQVNTV09SRF9LRVkpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCBkYW9OYW1lID0gT1JNQ29udGV4dC5nZXRDb25uZWN0aW9uTmFtZXMoKVswXTtcbiAgICAgICAgY29uc3QgcmVwID0gYXdhaXQgdGhpcy5zeXNFeGVjVGVtcGxhdGUoXG4gICAgICAgICAgICBkYW9OYW1lICsgJy5zcWxleGVjJyBhcyBhbnksXG4gICAgICAgICAgICAnRGVjcnlwdGJ5cGFzc3BocmFzZVBhc3N3b3JkLnNxbCcsIHtcbiAgICAgICAgICAgICAgICBTUUxLZXk6IHNxbEtleSxcbiAgICAgICAgICAgICAgICBwYXNzd29yZHM6IHBhc3N3b3JkXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGhvJywgcmVwKTtcbiAgICAgICAgcmV0dXJuIHJlcFswXS5wYXNzd29yZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Y+W5b6XU1FM6Kej5a+GXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIOWkmuWPg+aVuFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzcWxLZXkg5a+G56K85Y+v6YG45Y+D5pW4XG4gICAgICogQHJldHVybnMge1Byb21pc2U8e3Bhc3N3b3JkfT59XG4gICAgICogQG1lbWJlcm9mIFNxbE1hbmFnZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZW5Db2RlKHBhc3N3b3JkOiBzdHJpbmcsIHNxbEtleSA9IEJhc2VDb25zdGFudC5EQl9QQVNTV09SRF9LRVkpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCBkYW9OYW1lID0gT1JNQ29udGV4dC5nZXRDb25uZWN0aW9uTmFtZXMoKVswXTtcbiAgICAgICAgY29uc3QgcmVwID0gYXdhaXQgdGhpcy5zeXNFeGVjVGVtcGxhdGUoXG4gICAgICAgICAgICBkYW9OYW1lICsgJy5zcWxleGVjJyBhcyBhbnksXG4gICAgICAgICAgICAnRW5jcnlwdGJ5cGFzc3BocmFzZVBhc3N3b3JkLnNxbCcsIHtcbiAgICAgICAgICAgICAgICBTUUxLZXk6IHNxbEtleSxcbiAgICAgICAgICAgICAgICBwYXNzd29yZHM6IHBhc3N3b3JkXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiByZXBbMF0ucGFzc3dvcmQ7XG4gICAgfVxufVxuIl19