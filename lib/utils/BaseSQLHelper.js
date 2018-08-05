"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const BaseHttpStatusCode_1 = require("../config/BaseHttpStatusCode");
const AnyEntity_1 = require("../models/AnyEntity");
const LibsExceptions_1 = require("../models/LibsExceptions");
/**
 * 這個class就是幫你製作出SQL需要的物件
 * @export
 * @class SQLHelper
 */
class BaseSQLHelper {
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $in: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any[]} values 你要塞的數值陣列
     * @returns ICondition
     * @memberof SQLHelper
     */
    static In(key, values) {
        return new AnyEntity_1.default().toObj(key, { $in: values });
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $ne: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    static NotEq(key, values) {
        return new AnyEntity_1.default().toObj(key, { $ne: values });
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $between: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    static Between(key, values) {
        return new AnyEntity_1.default().toObj(key, { $between: values });
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $lt: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    static LessThan(key, values) {
        return new AnyEntity_1.default().toObj(key, { $lt: values });
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $lte: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    static LessThanEq(key, values) {
        return new AnyEntity_1.default().toObj(key, { $lte: values });
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $gt: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    static MoreThan(key, values) {
        return new AnyEntity_1.default().toObj(key, { $gt: values });
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $gte: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    static MoreThanEq(key, values) {
        return new AnyEntity_1.default().toObj(key, { $gte: values });
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $like: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    static Like(key, values) {
        return new AnyEntity_1.default().toObj(key, { $like: values });
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $eq: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    static Eq(key, values) {
        return new AnyEntity_1.default().toObj(key, { $eq: values });
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $null: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values true 就是 null , false 就是 not null
     * @returns ICondition
     * @memberof SQLHelper
     */
    static IsNull(key, values) {
        return new AnyEntity_1.default().toObj(key, { $null: values });
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $nin: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    static NotIn(key, values) {
        return new AnyEntity_1.default().toObj(key, { $nin: values });
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {}
     * @returns ICondition
     * @memberof SQLHelper
     */
    static NoCondition() {
        return {};
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     * {
     *  $and: [
     *          {
     *          key1: { '$gte': values }
     *          },
     *          {
     *          key2: { '$lte': values }
     *          }
     *        ]
     * @param {...ICondition} 你想組合的IConditions
     * @returns ICondition
     * @memberof SQLHelper
     */
    static And(...conds) {
        return BaseSQLHelper.AndArray(conds);
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     * {
     *  $and: [
     *          {
     *          key1: { '$gte': values }
     *          },
     *          {
     *          key2: { '$lte': values }
     *          },
     *          {
     *          key2: { '$lte': values }
     *          }
     *        ]
     * @param {ICondition[]} 你想組合的IConditions
     * @returns ICondition
     * @memberof SQLHelper
     */
    static AndArray(conds) {
        return {
            $and: conds
        };
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     * {
     *  $or: [
     *          {
     *          key1: { '$gte': values }
     *          },
     *          {
     *          key2: { '$lte': values }
     *          }
     *        ]
     * @param {ICondition[]} 你想組合的IConditions
     * @returns ICondition
     * @memberof SQLHelper
     */
    static Or(...conds) {
        return BaseSQLHelper.OrArray(conds);
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     * {
     *  $or: [
     *          {
     *          key1: { '$gte': values }
     *          },
     *          {
     *          key2: { '$lte': values }
     *          }
     *        ]
     * @param {ICondition[]} 你想組合的IConditions
     * @returns ICondition
     * @memberof SQLHelper
     */
    static OrArray(conds) {
        return {
            $or: conds
        };
    }
    /**
     * 幫你製作Fields跟要不要NoLock,預設是true
     * @param {string[] | undefined} fields
     * 就算只有一個也要用陣列包起來丟進來,不需要就輸入undefined
     * @param {boolean | undefined} [noLock=true]
     * 預設是true,不需要就輸入undefined或是false
     * @param {IOrderBy[] | undefined} orderby
     * 可以自己做或是由 @method OrderByEntity() 來幫忙製作,不需要就輸入undefined
     * @param {number | undefined} limitCount
     * TOP 限制輸出最多幾筆,不需要就輸入undefined
     * @param {string[] | undefined} group
     * 就是輸入需要Groupby的field名稱,不需要就輸入undefined
     * @param {boolean | undefined} disTinct
     * 這個也是輸入需要的field名稱,注意這個會自動順便Groupby你輸入的field,不需要就輸入undefined
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    static Fields(fields, noLock = true, orderby, limitCount, group, disTinct) {
        return _.omitBy({
            field: fields,
            nolock: noLock,
            sort: orderby,
            limit: limitCount,
            groupby: group,
            distinct: disTinct
        }, _.isUndefined);
    }
    /**
     * 幫你製作LeftJoins
     * { leftjoin: [ { daoName2: idx } ] }
     * @param {IJoins[]} joins 就算只有一個也要用陣列包起來丟進來
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    static LeftJoins(joins) {
        return {
            leftjoin: joins
        };
    }
    /**
     * 幫你製作Innerjoin
     * { innerjoin: [ { daoName2: idx } ] }
     * @param {IJoins[]} joins 就算只有一個也要用陣列包起來丟進來
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    static Innerjoin(joins) {
        return {
            innerjoin: joins
        };
    }
    /**
     * 幫你製作Rightjoin
     * { rightjoin: [ { daoName2: idx } ] }
     * @param {IJoins[]} joins 就算只有一個也要用陣列包起來丟進來
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    static Rightjoin(joins) {
        return {
            rightjoin: joins
        };
    }
    /**
     * 幫你製作outerjoin
     * { outerjoin: [ { daoName2: idx } ] }
     * @param {IJoins[]} joins 就算只有一個也要用陣列包起來丟進來
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    static Outerjoin(joins) {
        return {
            outerjoin: joins
        };
    }
    /**
     * 幫你製作MergeJoins
     * @param {IJoins[]} joins 就算只有一個也要用陣列包起來丟進來
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    static Mergejoins(joins) {
        let finalJoins = {};
        _.forEach(joins, (data) => {
            finalJoins = _.assign({}, finalJoins, data);
        });
        return finalJoins;
    }
    /**
     * 幫你製作Joins,其實這個也可以外面自己物件來製作,只要符合格式
     * { daoName2: idx }
     * @param {DaoEnum} tablesName tableName
     * @param {string} field 欄位
     * @returns {IJoins} 要對應的IJoins
     * @memberof SQLHelper
     */
    static JoinEntity(tablesName, ...field) {
        if (_.isUndefined(field) || _.size(field) > 2 || _.size(field) < 1) {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, 'join-field must one or two params');
        }
        else {
            return new AnyEntity_1.default().toObj(tablesName, field);
        }
    }
    /**
     * 幫你製作OrderBy,其實這個也可以外面自己物件來製作,只要符合格式
     * { daoName2: boolean }
     * @param {string} field field欄位名稱
     * @param {boolean}  sort true是正序,fals是反序
     * @returns {IJoins} 要對應的IJoins
     * @memberof SQLHelper
     */
    static OrderByEntity(field, sort) {
        return new AnyEntity_1.default().toObj(field, sort);
    }
    /**
     * 幫你製作全部field都要查詢跟要不要NoLock,預設是true
     * @param {boolean | undefined} [noLock=true] 預設是true,不需要就輸入undefined
     * @param {IOrderBy[] | undefined} orderby 你要的欄位,不需要就輸入undefined
     * @param {number | undefined} limitCount Top 你最多要的筆數,不需要就輸入undefined
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    static ALLFields(noLock = true, orderby, limitCount) {
        return _.omitBy({
            field: undefined,
            nolock: noLock,
            sort: orderby,
            limit: limitCount
        }, _.isUndefined);
    }
    /**
     * 只有Max跟Min會用到的特殊Field
     * @param {string} afield 必填你要的欄位
     * @param {boolean | undefined} [noLock=true] 預設是true,不需要就輸入undefined
     * @param {IOrderBy[] | undefined} orderby 你要的欄位,不需要就輸入undefined
     * @param {number | undefined} limitCount Top 你最多要的筆數,不需要就輸入undefined
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    static UniqueField(afield, noLock = true, orderby, limitCount) {
        return _.omitBy({
            field: afield,
            nolock: noLock,
            sort: orderby,
            limit: limitCount
        }, _.isUndefined);
    }
    /**
     * 幫你製作全部field除了你不要的field,NoLock預設是true
     * @param {BaseEntity} entity 你要輸出的Entity
     * @param {string[]} fieldsWithout 你要不需要的欄位名稱陣列
     * @param {boolean | undefined} [noLock=true] 預設是true,不需要就輸入undefined
     * @param {IOrderBy[] | undefined} orderby 你要的欄位,不需要就輸入undefined
     * @param {number | undefined} limitCount Top 你最多要的筆數,不需要就輸入undefined
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    static FieldsWithout(entity, fieldsWithout, noLock = true, orderby, limitCount) {
        const fields = entity.fields();
        _.pullAll(fields, fieldsWithout);
        return _.omitBy({
            field: fields,
            nolock: noLock,
            sort: orderby,
            limit: limitCount
        }, _.isUndefined);
    }
    /**
     * 這只是暫時的
     * 目前底層ORM遇到的BUG處理方法
     * @memberof SQLHelper
     */
    /* istanbul ignore next */
    static BugFixUpdateSqlRepeatValue(obj) {
        return _.map(obj, (data) => {
            /* istanbul ignore next */
            return _.mapValues(data, (v) => {
                return _.isArrayLikeObject(v) ? _.head(v) : v;
            });
        });
    }
}
exports.default = BaseSQLHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVNRTEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ2d0dG9vNDQvRGVza3RvcC9CYXNlU29ja2V0U2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbInV0aWxzL0Jhc2VTUUxIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBNEI7QUFDNUIscUVBQWtFO0FBQ2xFLG1EQUE0QztBQUU1Qyw2REFBMEQ7QUFHMUQ7Ozs7R0FJRztBQUNIO0lBQ0k7Ozs7Ozs7Ozs7T0FVRztJQUVJLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBVyxFQUFFLE1BQWE7UUFDdkMsT0FBTyxJQUFJLG1CQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFlLENBQUM7SUFDckUsQ0FBQztJQUNEOzs7Ozs7Ozs7O09BVUc7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQVcsRUFBRSxNQUFXO1FBQ3hDLE9BQU8sSUFBSSxtQkFBUyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBZSxDQUFDO0lBQ3JFLENBQUM7SUFDRDs7Ozs7Ozs7OztPQVVHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFXLEVBQUUsTUFBeUI7UUFDeEQsT0FBTyxJQUFJLG1CQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFlLENBQUM7SUFDMUUsQ0FBQztJQUNEOzs7Ozs7Ozs7O09BVUc7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQVcsRUFBRSxNQUFXO1FBQzNDLE9BQU8sSUFBSSxtQkFBUyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBZSxDQUFDO0lBQ3JFLENBQUM7SUFDRDs7Ozs7Ozs7OztPQVVHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFXLEVBQUUsTUFBVztRQUM3QyxPQUFPLElBQUksbUJBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQWUsQ0FBQztJQUN0RSxDQUFDO0lBQ0Q7Ozs7Ozs7Ozs7T0FVRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBVyxFQUFFLE1BQVc7UUFDM0MsT0FBTyxJQUFJLG1CQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFlLENBQUM7SUFDckUsQ0FBQztJQUNEOzs7Ozs7Ozs7O09BVUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQVcsRUFBRSxNQUFXO1FBQzdDLE9BQU8sSUFBSSxtQkFBUyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBZSxDQUFDO0lBQ3RFLENBQUM7SUFDRDs7Ozs7Ozs7OztPQVVHO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFXLEVBQUUsTUFBVztRQUN2QyxPQUFPLElBQUksbUJBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQWUsQ0FBQztJQUN2RSxDQUFDO0lBQ0Q7Ozs7Ozs7Ozs7T0FVRztJQUNJLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBVyxFQUFFLE1BQVc7UUFDckMsT0FBTyxJQUFJLG1CQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFlLENBQUM7SUFDckUsQ0FBQztJQUNEOzs7Ozs7Ozs7O09BVUc7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQVcsRUFBRSxNQUFlO1FBQzdDLE9BQU8sSUFBSSxtQkFBUyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBZSxDQUFDO0lBQ3ZFLENB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QUksRUFDbEMsT0FBZ0MsRUFDaEMsVUFBK0I7UUFFL0IsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNaLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSxVQUFVO1NBQ3BCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBeUIsQ0FBQztJQUM5QyxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNILDBCQUEwQjtJQUNuQixNQUFNLENBQUMsMEJBQTBCLENBQUMsR0FBUTtRQUM3QyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdkIsMEJBQTBCO1lBQzFCLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBbGNELGdDQWtjQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEJhc2VIdHRwU3RhdHVzQ29kZSB9IGZyb20gJy4uL2NvbmZpZy9CYXNlSHR0cFN0YXR1c0NvZGUnO1xuaW1wb3J0IEFueUVudGl0eSBmcm9tICcuLi9tb2RlbHMvQW55RW50aXR5JztcbmltcG9ydCBHYW1hRW50aXR5IGZyb20gJy4uL21vZGVscy9CYXNlRW50aXR5JztcbmltcG9ydCB7IExpYnNFeGNlcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL0xpYnNFeGNlcHRpb25zJztcbmltcG9ydCB7IElBSm9pbnMsIElDb25kaXRpb24sIElKb2lucywgSU9yZGVyQnksIElRdWVyeU9wdGlvbnMsIElVbmlxdWVGaWVsZCB9IGZyb20gJy4vRGFvT3BlcmF0b3InO1xuXG4vKipcbiAqIOmAmeWAi2NsYXNz5bCx5piv5bmr5L2g6KO95L2c5Ye6U1FM6ZyA6KaB55qE54mp5Lu2XG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgU1FMSGVscGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VTUUxIZWxwZXIge1xuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nFNRTCBzZWxlY3TnmoRDb25kaXRpb25cbiAgICAgKiDnnJ/lr6bmqKHmqKPvvJpcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgICBrZXk6IHsgJGluOiB2YWx1ZXMgfVxuICAgICAqICAgfTtcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IOS9oOimgeeahEtleSBOYW1lXG4gICAgICogQHBhcmFtIHthbnlbXX0gdmFsdWVzIOS9oOimgeWhnueahOaVuOWAvOmZo+WIl1xuICAgICAqIEByZXR1cm5zIElDb25kaXRpb25cbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG5cbiAgICBwdWJsaWMgc3RhdGljIEluKGtleTogc3RyaW5nLCB2YWx1ZXM6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiBuZXcgQW55RW50aXR5KCkudG9PYmooa2V5LCB7ICRpbjogdmFsdWVzIH0pIGFzIElDb25kaXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nFNRTCBzZWxlY3TnmoRDb25kaXRpb25cbiAgICAgKiDnnJ/lr6bmqKHmqKPvvJpcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgICBrZXk6IHsgJG5lOiB2YWx1ZXMgfVxuICAgICAqICAgfTtcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IOS9oOimgeeahEtleSBOYW1lXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlcyDkvaDopoHloZ7nmoTmlbjlgLxcbiAgICAgKiBAcmV0dXJucyBJQ29uZGl0aW9uXG4gICAgICogQG1lbWJlcm9mIFNRTEhlbHBlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgTm90RXEoa2V5OiBzdHJpbmcsIHZhbHVlczogYW55KSB7XG4gICAgICAgIHJldHVybiBuZXcgQW55RW50aXR5KCkudG9PYmooa2V5LCB7ICRuZTogdmFsdWVzIH0pIGFzIElDb25kaXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nFNRTCBzZWxlY3TnmoRDb25kaXRpb25cbiAgICAgKiDnnJ/lr6bmqKHmqKPvvJpcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgICBrZXk6IHsgJGJldHdlZW46IHZhbHVlcyB9XG4gICAgICogICB9O1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkg5L2g6KaB55qES2V5IE5hbWVcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsdWVzIOS9oOimgeWhnueahOaVuOWAvFxuICAgICAqIEByZXR1cm5zIElDb25kaXRpb25cbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBCZXR3ZWVuKGtleTogc3RyaW5nLCB2YWx1ZXM6IG51bWJlcltdIHwgRGF0ZVtdKSB7XG4gICAgICAgIHJldHVybiBuZXcgQW55RW50aXR5KCkudG9PYmooa2V5LCB7ICRiZXR3ZWVuOiB2YWx1ZXMgfSkgYXMgSUNvbmRpdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cU1FMIHNlbGVjdOeahENvbmRpdGlvblxuICAgICAqIOecn+Wvpuaooeaoo++8mlxuICAgICAqICAge1xuICAgICAqICAgICAgIGtleTogeyAkbHQ6IHZhbHVlcyB9XG4gICAgICogICB9O1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkg5L2g6KaB55qES2V5IE5hbWVcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsdWVzIOS9oOimgeWhnueahOaVuOWAvFxuICAgICAqIEByZXR1cm5zIElDb25kaXRpb25cbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhbihrZXk6IHN0cmluZywgdmFsdWVzOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbnlFbnRpdHkoKS50b09iaihrZXksIHsgJGx0OiB2YWx1ZXMgfSkgYXMgSUNvbmRpdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cU1FMIHNlbGVjdOeahENvbmRpdGlvblxuICAgICAqIOecn+Wvpuaooeaoo++8mlxuICAgICAqICAge1xuICAgICAqICAgICAgIGtleTogeyAkbHRlOiB2YWx1ZXMgfVxuICAgICAqICAgfTtcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IOS9oOimgeeahEtleSBOYW1lXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlcyDkvaDopoHloZ7nmoTmlbjlgLxcbiAgICAgKiBAcmV0dXJucyBJQ29uZGl0aW9uXG4gICAgICogQG1lbWJlcm9mIFNRTEhlbHBlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgTGVzc1RoYW5FcShrZXk6IHN0cmluZywgdmFsdWVzOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbnlFbnRpdHkoKS50b09iaihrZXksIHsgJGx0ZTogdmFsdWVzIH0pIGFzIElDb25kaXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nFNRTCBzZWxlY3TnmoRDb25kaXRpb25cbiAgICAgKiDnnJ/lr6bmqKHmqKPvvJpcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgICBrZXk6IHsgJGd0OiB2YWx1ZXMgfVxuICAgICAqICAgfTtcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IOS9oOimgeeahEtleSBOYW1lXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlcyDkvaDopoHloZ7nmoTmlbjlgLxcbiAgICAgKiBAcmV0dXJucyBJQ29uZGl0aW9uXG4gICAgICogQG1lbWJlcm9mIFNRTEhlbHBlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgTW9yZVRoYW4oa2V5OiBzdHJpbmcsIHZhbHVlczogYW55KSB7XG4gICAgICAgIHJldHVybiBuZXcgQW55RW50aXR5KCkudG9PYmooa2V5LCB7ICRndDogdmFsdWVzIH0pIGFzIElDb25kaXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nFNRTCBzZWxlY3TnmoRDb25kaXRpb25cbiAgICAgKiDnnJ/lr6bmqKHmqKPvvJpcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgICBrZXk6IHsgJGd0ZTogdmFsdWVzIH1cbiAgICAgKiAgIH07XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSDkvaDopoHnmoRLZXkgTmFtZVxuICAgICAqIEBwYXJhbSB7YW55fSB2YWx1ZXMg5L2g6KaB5aGe55qE5pW45YC8XG4gICAgICogQHJldHVybnMgSUNvbmRpdGlvblxuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIE1vcmVUaGFuRXEoa2V5OiBzdHJpbmcsIHZhbHVlczogYW55KSB7XG4gICAgICAgIHJldHVybiBuZXcgQW55RW50aXR5KCkudG9PYmooa2V5LCB7ICRndGU6IHZhbHVlcyB9KSBhcyBJQ29uZGl0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDluavkvaDoo73kvZxTUUwgc2VsZWN055qEQ29uZGl0aW9uXG4gICAgICog55yf5a+m5qih5qij77yaXG4gICAgICogICB7XG4gICAgICogICAgICAga2V5OiB7ICRsaWtlOiB2YWx1ZXMgfVxuICAgICAqICAgfTtcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IOS9oOimgeeahEtleSBOYW1lXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlcyDkvaDopoHloZ7nmoTmlbjlgLxcbiAgICAgKiBAcmV0dXJucyBJQ29uZGl0aW9uXG4gICAgICogQG1lbWJlcm9mIFNRTEhlbHBlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgTGlrZShrZXk6IHN0cmluZywgdmFsdWVzOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbnlFbnRpdHkoKS50b09iaihrZXksIHsgJGxpa2U6IHZhbHVlcyB9KSBhcyBJQ29uZGl0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDluavkvaDoo73kvZxTUUwgc2VsZWN055qEQ29uZGl0aW9uXG4gICAgICog55yf5a+m5qih5qij77yaXG4gICAgICogICB7XG4gICAgICogICAgICAga2V5OiB7ICRlcTogdmFsdWVzIH1cbiAgICAgKiAgIH07XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSDkvaDopoHnmoRLZXkgTmFtZVxuICAgICAqIEBwYXJhbSB7YW55fSB2YWx1ZXMg5L2g6KaB5aGe55qE5pW45YC8XG4gICAgICogQHJldHVybnMgSUNvbmRpdGlvblxuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIEVxKGtleTogc3RyaW5nLCB2YWx1ZXM6IGFueSkge1xuICAgICAgICByZXR1cm4gbmV3IEFueUVudGl0eSgpLnRvT2JqKGtleSwgeyAkZXE6IHZhbHVlcyB9KSBhcyBJQ29uZGl0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDluavkvaDoo73kvZxTUUwgc2VsZWN055qEQ29uZGl0aW9uXG4gICAgICog55yf5a+m5qih5qij77yaXG4gICAgICogICB7XG4gICAgICogICAgICAga2V5OiB7ICRudWxsOiB2YWx1ZXMgfVxuICAgICAqICAgfTtcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IOS9oOimgeeahEtleSBOYW1lXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlcyB0cnVlIOWwseaYryBudWxsICwgZmFsc2Ug5bCx5pivIG5vdCBudWxsXG4gICAgICogQHJldHVybnMgSUNvbmRpdGlvblxuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIElzTnVsbChrZXk6IHN0cmluZywgdmFsdWVzOiBib29sZWFuKSB7XG4gICAgICAgIHJldHVybiBuZXcgQW55RW50aXR5KCkudG9PYmooa2V5LCB7ICRudWxsOiB2YWx1ZXMgfSkgYXMgSUNvbmRpdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cU1FMIHNlbGVjdOeahENvbmRpdGlvblxuICAgICAqIOecn+Wvpuaooeaoo++8mlxuICAgICAqICAge1xuICAgICAqICAgICAgIGtleTogeyAkbmluOiB2YWx1ZXMgfVxuICAgICAqICAgfTtcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IOS9oOimgeeahEtleSBOYW1lXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlcyDkvaDopoHloZ7nmoTmlbjlgLxcbiAgICAgKiBAcmV0dXJucyBJQ29uZGl0aW9uXG4gICAgICogQG1lbWJlcm9mIFNRTEhlbHBlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgTm90SW4oa2V5OiBzdHJpbmcsIHZhbHVlczogYW55KSB7XG4gICAgICAgIHJldHVybiBuZXcgQW55RW50aXR5KCkudG9PYmooa2V5LCB7ICRuaW46IHZhbHVlcyB9KSBhcyBJQ29uZGl0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDluavkvaDoo73kvZxTUUwgc2VsZWN055qEQ29uZGl0aW9uXG4gICAgICog55yf5a+m5qih5qij77yaXG4gICAgICogICB7fVxuICAgICAqIEByZXR1cm5zIElDb25kaXRpb25cbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBOb0NvbmRpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHt9IGFzIElDb25kaXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nFNRTCBzZWxlY3TnmoRDb25kaXRpb25cbiAgICAgKiDnnJ/lr6bmqKHmqKPvvJpcbiAgICAgKiB7XG4gICAgICogICRhbmQ6IFtcbiAgICAgKiAgICAgICAgICB7XG4gICAgICogICAgICAgICAga2V5MTogeyAnJGd0ZSc6IHZhbHVlcyB9XG4gICAgICogICAgICAgICAgfSxcbiAgICAgKiAgICAgICAgICB7XG4gICAgICogICAgICAgICAga2V5MjogeyAnJGx0ZSc6IHZhbHVlcyB9XG4gICAgICogICAgICAgICAgfVxuICAgICAqICAgICAgICBdXG4gICAgICogQHBhcmFtIHsuLi5JQ29uZGl0aW9ufSDkvaDmg7PntYTlkIjnmoRJQ29uZGl0aW9uc1xuICAgICAqIEByZXR1cm5zIElDb25kaXRpb25cbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBBbmQoLi4uY29uZHM6IElDb25kaXRpb25bXSkge1xuICAgICAgICByZXR1cm4gQmFzZVNRTEhlbHBlci5BbmRBcnJheShjb25kcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nFNRTCBzZWxlY3TnmoRDb25kaXRpb25cbiAgICAgKiDnnJ/lr6bmqKHmqKPvvJpcbiAgICAgKiB7XG4gICAgICogICRhbmQ6IFtcbiAgICAgKiAgICAgICAgICB7XG4gICAgICogICAgICAgICAga2V5MTogeyAnJGd0ZSc6IHZhbHVlcyB9XG4gICAgICogICAgICAgICAgfSxcbiAgICAgKiAgICAgICAgICB7XG4gICAgICogICAgICAgICAga2V5MjogeyAnJGx0ZSc6IHZhbHVlcyB9XG4gICAgICogICAgICAgICAgfSxcbiAgICAgKiAgICAgICAgICB7XG4gICAgICogICAgICAgICAga2V5MjogeyAnJGx0ZSc6IHZhbHVlcyB9XG4gICAgICogICAgICAgICAgfVxuICAgICAqICAgICAgICBdXG4gICAgICogQHBhcmFtIHtJQ29uZGl0aW9uW119IOS9oOaDs+e1hOWQiOeahElDb25kaXRpb25zXG4gICAgICogQHJldHVybnMgSUNvbmRpdGlvblxuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIEFuZEFycmF5KGNvbmRzOiBJQ29uZGl0aW9uW10pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICRhbmQ6IGNvbmRzXG4gICAgICAgIH0gYXMgSUNvbmRpdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cU1FMIHNlbGVjdOeahENvbmRpdGlvblxuICAgICAqIOecn+Wvpuaooeaoo++8mlxuICAgICAqIHtcbiAgICAgKiAgJG9yOiBbXG4gICAgICogICAgICAgICAge1xuICAgICAqICAgICAgICAgIGtleTE6IHsgJyRndGUnOiB2YWx1ZXMgfVxuICAgICAqICAgICAgICAgIH0sXG4gICAgICogICAgICAgICAge1xuICAgICAqICAgICAgICAgIGtleTI6IHsgJyRsdGUnOiB2YWx1ZXMgfVxuICAgICAqICAgICAgICAgIH1cbiAgICAgKiAgICAgICAgXVxuICAgICAqIEBwYXJhbSB7SUNvbmRpdGlvbltdfSDkvaDmg7PntYTlkIjnmoRJQ29uZGl0aW9uc1xuICAgICAqIEByZXR1cm5zIElDb25kaXRpb25cbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBPciguLi5jb25kczogSUNvbmRpdGlvbltdKSB7XG4gICAgICAgIHJldHVybiBCYXNlU1FMSGVscGVyLk9yQXJyYXkoY29uZHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDluavkvaDoo73kvZxTUUwgc2VsZWN055qEQ29uZGl0aW9uXG4gICAgICog55yf5a+m5qih5qij77yaXG4gICAgICoge1xuICAgICAqICAkb3I6IFtcbiAgICAgKiAgICAgICAgICB7XG4gICAgICogICAgICAgICAga2V5MTogeyAnJGd0ZSc6IHZhbHVlcyB9XG4gICAgICogICAgICAgICAgfSxcbiAgICAgKiAgICAgICAgICB7XG4gICAgICogICAgICAgICAga2V5MjogeyAnJGx0ZSc6IHZhbHVlcyB9XG4gICAgICogICAgICAgICAgfVxuICAgICAqICAgICAgICBdXG4gICAgICogQHBhcmFtIHtJQ29uZGl0aW9uW119IOS9oOaDs+e1hOWQiOeahElDb25kaXRpb25zXG4gICAgICogQHJldHVybnMgSUNvbmRpdGlvblxuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIE9yQXJyYXkoY29uZHM6IElDb25kaXRpb25bXSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJG9yOiBjb25kc1xuICAgICAgICB9IGFzIElDb25kaXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nEZpZWxkc+i3n+imgeS4jeimgU5vTG9jayzpoJDoqK3mmK90cnVlXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXSB8IHVuZGVmaW5lZH0gZmllbGRzXG4gICAgICog5bCx566X5Y+q5pyJ5LiA5YCL5Lmf6KaB55So6Zmj5YiX5YyF6LW35L6G5Lif6YCy5L6GLOS4jemcgOimgeWwsei8uOWFpXVuZGVmaW5lZFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbiB8IHVuZGVmaW5lZH0gW25vTG9jaz10cnVlXVxuICAgICAqIOmgkOioreaYr3RydWUs5LiN6ZyA6KaB5bCx6Ly45YWldW5kZWZpbmVk5oiW5pivZmFsc2VcbiAgICAgKiBAcGFyYW0ge0lPcmRlckJ5W10gfCB1bmRlZmluZWR9IG9yZGVyYnlcbiAgICAgKiDlj6/ku6Xoh6rlt7HlgZrmiJbmmK/nlLEgQG1ldGhvZCBPcmRlckJ5RW50aXR5KCkg5L6G5bmr5b+Z6KO95L2cLOS4jemcgOimgeWwsei8uOWFpXVuZGVmaW5lZFxuICAgICAqIEBwYXJhbSB7bnVtYmVyIHwgdW5kZWZpbmVkfSBsaW1pdENvdW50XG4gICAgICogVE9QIOmZkOWItui8uOWHuuacgOWkmuW5vuethizkuI3pnIDopoHlsLHovLjlhaV1bmRlZmluZWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdIHwgdW5kZWZpbmVkfSBncm91cFxuICAgICAqIOWwseaYr+i8uOWFpemcgOimgUdyb3VwYnnnmoRmaWVsZOWQjeeosSzkuI3pnIDopoHlsLHovLjlhaV1bmRlZmluZWRcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW4gfCB1bmRlZmluZWR9IGRpc1RpbmN0XG4gICAgICog6YCZ5YCL5Lmf5piv6Ly45YWl6ZyA6KaB55qEZmllbGTlkI3nqLEs5rOo5oSP6YCZ5YCL5pyD6Ieq5YuV6aCG5L6/R3JvdXBieeS9oOi8uOWFpeeahGZpZWxkLOS4jemcgOimgeWwsei8uOWFpXVuZGVmaW5lZFxuICAgICAqIEByZXR1cm5zIHtJRmllbGRzfSDlm57lgrPluavkvaDoo73kvZzlpb3nmoRGaWVsZHNcbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBGaWVsZHMoXG4gICAgICAgIGZpZWxkczogc3RyaW5nW10gfCB1bmRlZmluZWQsXG4gICAgICAgIG5vTG9jazogYm9vbGVhbiA9IHRydWUsXG4gICAgICAgIG9yZGVyYnk/OiBJT3JkZXJCeVtdIHwgdW5kZWZpbmVkLFxuICAgICAgICBsaW1pdENvdW50PzogbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgICAgICBncm91cD86IHN0cmluZ1tdIHwgdW5kZWZpbmVkLFxuICAgICAgICBkaXNUaW5jdD86IGJvb2xlYW4gfCB1bmRlZmluZWRcbiAgICApOiBJUXVlcnlPcHRpb25zIHtcbiAgICAgICAgcmV0dXJuIF8ub21pdEJ5KHtcbiAgICAgICAgICAgIGZpZWxkOiBmaWVsZHMsXG4gICAgICAgICAgICBub2xvY2s6IG5vTG9jayxcbiAgICAgICAgICAgIHNvcnQ6IG9yZGVyYnksXG4gICAgICAgICAgICBsaW1pdDogbGltaXRDb3VudCxcbiAgICAgICAgICAgIGdyb3VwYnk6IGdyb3VwLFxuICAgICAgICAgICAgZGlzdGluY3Q6IGRpc1RpbmN0XG4gICAgICAgIH0sIF8uaXNVbmRlZmluZWQpIGFzIGFueSBhcyBJUXVlcnlPcHRpb25zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDluavkvaDoo73kvZxMZWZ0Sm9pbnNcbiAgICAgKiB7IGxlZnRqb2luOiBbIHsgZGFvTmFtZTI6IGlkeCB9IF0gfVxuICAgICAqIEBwYXJhbSB7SUpvaW5zW119IGpvaW5zIOWwseeul+WPquacieS4gOWAi+S5n+imgeeUqOmZo+WIl+WMhei1t+S+huS4n+mAsuS+hlxuICAgICAqIEByZXR1cm5zIHtJRmllbGRzfSDlm57lgrPluavkvaDoo73kvZzlpb3nmoRGaWVsZHNcbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBMZWZ0Sm9pbnMoam9pbnM6IElKb2luc1tdKTogSUFKb2lucyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0am9pbjogam9pbnNcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cSW5uZXJqb2luXG4gICAgICogeyBpbm5lcmpvaW46IFsgeyBkYW9OYW1lMjogaWR4IH0gXSB9XG4gICAgICogQHBhcmFtIHtJSm9pbnNbXX0gam9pbnMg5bCx566X5Y+q5pyJ5LiA5YCL5Lmf6KaB55So6Zmj5YiX5YyF6LW35L6G5Lif6YCy5L6GXG4gICAgICogQHJldHVybnMge0lGaWVsZHN9IOWbnuWCs+W5q+S9oOijveS9nOWlveeahEZpZWxkc1xuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIElubmVyam9pbihqb2luczogSUpvaW5zW10pOiBJQUpvaW5zIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlubmVyam9pbjogam9pbnNcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cUmlnaHRqb2luXG4gICAgICogeyByaWdodGpvaW46IFsgeyBkYW9OYW1lMjogaWR4IH0gXSB9XG4gICAgICogQHBhcmFtIHtJSm9pbnNbXX0gam9pbnMg5bCx566X5Y+q5pyJ5LiA5YCL5Lmf6KaB55So6Zmj5YiX5YyF6LW35L6G5Lif6YCy5L6GXG4gICAgICogQHJldHVybnMge0lGaWVsZHN9IOWbnuWCs+W5q+S9oOijveS9nOWlveeahEZpZWxkc1xuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFJpZ2h0am9pbihqb2luczogSUpvaW5zW10pOiBJQUpvaW5zIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJpZ2h0am9pbjogam9pbnNcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cb3V0ZXJqb2luXG4gICAgICogeyBvdXRlcmpvaW46IFsgeyBkYW9OYW1lMjogaWR4IH0gXSB9XG4gICAgICogQHBhcmFtIHtJSm9pbnNbXX0gam9pbnMg5bCx566X5Y+q5pyJ5LiA5YCL5Lmf6KaB55So6Zmj5YiX5YyF6LW35L6G5Lif6YCy5L6GXG4gICAgICogQHJldHVybnMge0lGaWVsZHN9IOWbnuWCs+W5q+S9oOijveS9nOWlveeahEZpZWxkc1xuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIE91dGVyam9pbihqb2luczogSUpvaW5zW10pOiBJQUpvaW5zIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG91dGVyam9pbjogam9pbnNcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cTWVyZ2VKb2luc1xuICAgICAqIEBwYXJhbSB7SUpvaW5zW119IGpvaW5zIOWwseeul+WPquacieS4gOWAi+S5n+imgeeUqOmZo+WIl+WMhei1t+S+huS4n+mAsuS+hlxuICAgICAqIEByZXR1cm5zIHtJRmllbGRzfSDlm57lgrPluavkvaDoo73kvZzlpb3nmoRGaWVsZHNcbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBNZXJnZWpvaW5zKGpvaW5zOiBJQUpvaW5zW10pOiBJQUpvaW5zIHtcbiAgICAgICAgbGV0IGZpbmFsSm9pbnMgPSB7fSBhcyBJQUpvaW5zO1xuICAgICAgICBfLmZvckVhY2goam9pbnMsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBmaW5hbEpvaW5zID0gXy5hc3NpZ24oe30sIGZpbmFsSm9pbnMsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZpbmFsSm9pbnMgYXMgSUFKb2lucztcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cSm9pbnMs5YW25a+m6YCZ5YCL5Lmf5Y+v5Lul5aSW6Z2i6Ieq5bex54mp5Lu25L6G6KO95L2cLOWPquimgeespuWQiOagvOW8j1xuICAgICAqIHsgZGFvTmFtZTI6IGlkeCB9XG4gICAgICogQHBhcmFtIHtEYW9FbnVtfSB0YWJsZXNOYW1lIHRhYmxlTmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZCDmrITkvY1cbiAgICAgKiBAcmV0dXJucyB7SUpvaW5zfSDopoHlsI3mh4nnmoRJSm9pbnNcbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBKb2luRW50aXR5PFQ+KHRhYmxlc05hbWU6IFQsIC4uLmZpZWxkOiBzdHJpbmdbXSk6IElKb2lucyB7XG4gICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKGZpZWxkKSB8fCBfLnNpemUoZmllbGQpID4gMiB8fCBfLnNpemUoZmllbGQpIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEJhc2VIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCwgJ2pvaW4tZmllbGQgbXVzdCBvbmUgb3IgdHdvIHBhcmFtcycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBbnlFbnRpdHkoKS50b09iaih0YWJsZXNOYW1lIGFzIGFueSwgZmllbGQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nE9yZGVyQnks5YW25a+m6YCZ5YCL5Lmf5Y+v5Lul5aSW6Z2i6Ieq5bex54mp5Lu25L6G6KO95L2cLOWPquimgeespuWQiOagvOW8j1xuICAgICAqIHsgZGFvTmFtZTI6IGJvb2xlYW4gfVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZCBmaWVsZOashOS9jeWQjeeosVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gIHNvcnQgdHJ1ZeaYr+ato+W6jyxmYWxz5piv5Y+N5bqPXG4gICAgICogQHJldHVybnMge0lKb2luc30g6KaB5bCN5oeJ55qESUpvaW5zXG4gICAgICogQG1lbWJlcm9mIFNRTEhlbHBlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgT3JkZXJCeUVudGl0eShmaWVsZDogc3RyaW5nLCBzb3J0OiBib29sZWFuKTogSU9yZGVyQnkge1xuICAgICAgICByZXR1cm4gbmV3IEFueUVudGl0eSgpLnRvT2JqKGZpZWxkLCBzb3J0KSBhcyBJT3JkZXJCeTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2c5YWo6YOoZmllbGTpg73opoHmn6XoqaLot5/opoHkuI3opoFOb0xvY2ss6aCQ6Kit5pivdHJ1ZVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbiB8IHVuZGVmaW5lZH0gW25vTG9jaz10cnVlXSDpoJDoqK3mmK90cnVlLOS4jemcgOimgeWwsei8uOWFpXVuZGVmaW5lZFxuICAgICAqIEBwYXJhbSB7SU9yZGVyQnlbXSB8IHVuZGVmaW5lZH0gb3JkZXJieSDkvaDopoHnmoTmrITkvY0s5LiN6ZyA6KaB5bCx6Ly45YWldW5kZWZpbmVkXG4gICAgICogQHBhcmFtIHtudW1iZXIgfCB1bmRlZmluZWR9IGxpbWl0Q291bnQgVG9wIOS9oOacgOWkmuimgeeahOethuaVuCzkuI3pnIDopoHlsLHovLjlhaV1bmRlZmluZWRcbiAgICAgKiBAcmV0dXJucyB7SUZpZWxkc30g5Zue5YKz5bmr5L2g6KO95L2c5aW955qERmllbGRzXG4gICAgICogQG1lbWJlcm9mIFNRTEhlbHBlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgQUxMRmllbGRzKFxuICAgICAgICBub0xvY2s6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSB0cnVlLFxuICAgICAgICBvcmRlcmJ5PzogSU9yZGVyQnlbXSxcbiAgICAgICAgbGltaXRDb3VudD86IG51bWJlcik6IElRdWVyeU9wdGlvbnMge1xuICAgICAgICByZXR1cm4gXy5vbWl0Qnkoe1xuICAgICAgICAgICAgZmllbGQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIG5vbG9jazogbm9Mb2NrLFxuICAgICAgICAgICAgc29ydDogb3JkZXJieSxcbiAgICAgICAgICAgIGxpbWl0OiBsaW1pdENvdW50XG4gICAgICAgIH0sIF8uaXNVbmRlZmluZWQpIGFzIGFueSBhcyBJUXVlcnlPcHRpb25zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlj6rmnIlNYXjot59NaW7mnIPnlKjliLDnmoTnibnmropGaWVsZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhZmllbGQg5b+F5aGr5L2g6KaB55qE5qyE5L2NXG4gICAgICogQHBhcmFtIHtib29sZWFuIHwgdW5kZWZpbmVkfSBbbm9Mb2NrPXRydWVdIOmgkOioreaYr3RydWUs5LiN6ZyA6KaB5bCx6Ly45YWldW5kZWZpbmVkXG4gICAgICogQHBhcmFtIHtJT3JkZXJCeVtdIHwgdW5kZWZpbmVkfSBvcmRlcmJ5IOS9oOimgeeahOashOS9jSzkuI3pnIDopoHlsLHovLjlhaV1bmRlZmluZWRcbiAgICAgKiBAcGFyYW0ge251bWJlciB8IHVuZGVmaW5lZH0gbGltaXRDb3VudCBUb3Ag5L2g5pyA5aSa6KaB55qE562G5pW4LOS4jemcgOimgeWwsei8uOWFpXVuZGVmaW5lZFxuICAgICAqIEByZXR1cm5zIHtJRmllbGRzfSDlm57lgrPluavkvaDoo73kvZzlpb3nmoRGaWVsZHNcbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBVbmlxdWVGaWVsZChcbiAgICAgICAgYWZpZWxkOiBzdHJpbmdbXSxcbiAgICAgICAgbm9Mb2NrOiBib29sZWFuIHwgdW5kZWZpbmVkID0gdHJ1ZSxcbiAgICAgICAgb3JkZXJieT86IElPcmRlckJ5W10gfCB1bmRlZmluZWQsXG4gICAgICAgIGxpbWl0Q291bnQ/OiBudW1iZXIgfCB1bmRlZmluZWQpOiBJVW5pcXVlRmllbGQge1xuICAgICAgICByZXR1cm4gXy5vbWl0Qnkoe1xuICAgICAgICAgICAgZmllbGQ6IGFmaWVsZCxcbiAgICAgICAgICAgIG5vbG9jazogbm9Mb2NrLFxuICAgICAgICAgICAgc29ydDogb3JkZXJieSxcbiAgICAgICAgICAgIGxpbWl0OiBsaW1pdENvdW50XG4gICAgICAgIH0sIF8uaXNVbmRlZmluZWQpIGFzIGFueSBhcyBJVW5pcXVlRmllbGQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nOWFqOmDqGZpZWxk6Zmk5LqG5L2g5LiN6KaB55qEZmllbGQsTm9Mb2Nr6aCQ6Kit5pivdHJ1ZVxuICAgICAqIEBwYXJhbSB7QmFzZUVudGl0eX0gZW50aXR5IOS9oOimgei8uOWHuueahEVudGl0eVxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IGZpZWxkc1dpdGhvdXQg5L2g6KaB5LiN6ZyA6KaB55qE5qyE5L2N5ZCN56ix6Zmj5YiXXG4gICAgICogQHBhcmFtIHtib29sZWFuIHwgdW5kZWZpbmVkfSBbbm9Mb2NrPXRydWVdIOmgkOioreaYr3RydWUs5LiN6ZyA6KaB5bCx6Ly45YWldW5kZWZpbmVkXG4gICAgICogQHBhcmFtIHtJT3JkZXJCeVtdIHwgdW5kZWZpbmVkfSBvcmRlcmJ5IOS9oOimgeeahOashOS9jSzkuI3pnIDopoHlsLHovLjlhaV1bmRlZmluZWRcbiAgICAgKiBAcGFyYW0ge251bWJlciB8IHVuZGVmaW5lZH0gbGltaXRDb3VudCBUb3Ag5L2g5pyA5aSa6KaB55qE562G5pW4LOS4jemcgOimgeWwsei8uOWFpXVuZGVmaW5lZFxuICAgICAqIEByZXR1cm5zIHtJRmllbGRzfSDlm57lgrPluavkvaDoo73kvZzlpb3nmoRGaWVsZHNcbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBGaWVsZHNXaXRob3V0KFxuICAgICAgICBlbnRpdHk6IEdhbWFFbnRpdHksXG4gICAgICAgIGZpZWxkc1dpdGhvdXQ6IHN0cmluZ1tdLFxuICAgICAgICBub0xvY2s6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSB0cnVlLFxuICAgICAgICBvcmRlcmJ5PzogSU9yZGVyQnlbXSB8IHVuZGVmaW5lZCxcbiAgICAgICAgbGltaXRDb3VudD86IG51bWJlciB8IHVuZGVmaW5lZFxuICAgICk6IElRdWVyeU9wdGlvbnMge1xuICAgICAgICBjb25zdCBmaWVsZHMgPSBlbnRpdHkuZmllbGRzKCk7XG4gICAgICAgIF8ucHVsbEFsbChmaWVsZHMsIGZpZWxkc1dpdGhvdXQpO1xuICAgICAgICByZXR1cm4gXy5vbWl0Qnkoe1xuICAgICAgICAgICAgZmllbGQ6IGZpZWxkcyxcbiAgICAgICAgICAgIG5vbG9jazogbm9Mb2NrLFxuICAgICAgICAgICAgc29ydDogb3JkZXJieSxcbiAgICAgICAgICAgIGxpbWl0OiBsaW1pdENvdW50XG4gICAgICAgIH0sIF8uaXNVbmRlZmluZWQpIGFzIGFueSBhcyBJUXVlcnlPcHRpb25zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpgJnlj6rmmK/mmqvmmYLnmoRcbiAgICAgKiDnm67liY3lupXlsaRPUk3pgYfliLDnmoRCVUfomZXnkIbmlrnms5VcbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBwdWJsaWMgc3RhdGljIEJ1Z0ZpeFVwZGF0ZVNxbFJlcGVhdFZhbHVlKG9iajogYW55KSB7XG4gICAgICAgIHJldHVybiBfLm1hcChvYmosIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgcmV0dXJuIF8ubWFwVmFsdWVzKGRhdGEsICh2KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNBcnJheUxpa2VPYmplY3QodikgPyBfLmhlYWQodikgOiB2O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==