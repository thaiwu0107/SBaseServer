import * as _ from 'lodash';
import { BaseHttpStatusCode } from '..';
import RedisManger from '../microServices/RedisManager';
import { LibsExceptions } from './LibsExceptions';
export default abstract class BaseRedisHashZntity {

    private baseZntityId;
    public getBaseZntityId() {
        return this.baseZntityId;
    }
    public setBaseZntityId(id) {
        this.baseZntityId = id;
    }
    public abstract mainFields(): string[];
    public abstract mainRedisKey(): string;
    public abstract deepFeldsKeys(): any;
    public abstract mainRedisType(): string;
    public async execDeleteAll(id: number) {
        if (!_.isUndefined(id)) {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL, this.constructor.name + 'id is undefined');
        } else {
            const redisManger = new RedisManger();
            const felds = this.deepFeldsKeys();
            const mainKey = this.mainRedisKey() + id;
            let deepValuess: string[] = Object.values(felds);
            deepValuess = deepValuess.map((values) => {
                return values + id;
            });
            deepValuess.push(mainKey);
            await redisManger.del(...deepValuess);
        }
    }
    /**
     * 如果要更新的資料太多,可以使用這個
     * 用法就是塞數值之後,會再去判斷有沒有值在幫你塞數值
     * !!!注意第二層的資料是不會幫你處理的,會直接跳過
     * 要處理第二層資料就要自己對redis處理
     * @param {number} id
     * @memberof BaseRedisHashZntity
     */
    public async execUpdateRedis(id: number) {
        if (!_.isUndefined(id)) {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL, this.constructor.name + 'id is undefined');
        } else {
            const redisManger = new RedisManger();
            const felds = this.deepFeldsKeys();
            const mainKey = this.mainRedisKey() + id;
            const deepFelds: Array<[string, any]> = Object.entries(felds);
            const promiseList: Array<Promise<any>> = [];
            const deepValuess = deepFelds.map((data) => {
                return data[0] + id;
            });
            await redisManger.del(...deepValuess);
            let length = deepFelds.length;
            const changeDeepFelds: any[] = [];
            while (length--) {
                const feldskey = deepFelds[length][1] + id;
                const feldsName = deepFelds[length][0];
                if (this[feldsName]) {
                    changeDeepFelds.push(feldsName, this[feldsName]);
                    promiseList.push(redisManger.rpush(feldskey, this[feldsName]));
                }
            }
            if (_.size(changeDeepFelds) !== 0) {
                promiseList.push(redisManger.hmgetArray(mainKey, changeDeepFelds));
            }
            await Promise.all(promiseList);
        }
    }
    /**
     * 初始化專用,如果要把資料完整清除在初始化可以用這個
     * @param {number} id
     * @param {*} source
     * @memberof BaseRedisHashZntity
     */
    public async execReuseRedis(id: number, source: any) {
        if (!_.isUndefined(source)) {
            // 先刪除所有的Redis Keys
            const redisManger = new RedisManger();
            const felds = this.deepFeldsKeys();
            const deepFelds: Array<[string, any]> = Object.entries(felds);
            const mainKey = this.mainRedisKey() + id;
            const mainFields = this.mainFields();
            const deepValuess = deepFelds.map((data) => {
                return data[0] + id;
            });
            deepValuess.push(mainKey);
            await redisManger.del(...deepValuess);
            // 結束 刪除所有的Redis Keys
            // 開始替換主要OBJ的成員把deepFelds裡面的key替換成主要OBJ的成員的數值
            // 並且替換過程中儲存Promise每個deepFelds的成員要塞的數值
            const promiseList: Array<Promise<any>> = [];
            let length = deepFelds.length;
            const changeDeepFelds: any[] = [];
            while (length--) {
                const feldskey = deepFelds[length][1] + id;
                const feldsName = deepFelds[length][0];
                // 儲存Promise每個deepFelds的成員要塞的數值
                promiseList.push(redisManger.rpushArray(feldskey, source[feldsName]));
                changeDeepFelds.push(feldsName, feldskey);
                source[feldsName] = feldskey;
            }
            promiseList.push(redisManger.hmsetArray(mainKey, changeDeepFelds));
            await Promise.all(promiseList);
        } else {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL, this.constructor.name + 'source is undefined');
        }
    }
}
