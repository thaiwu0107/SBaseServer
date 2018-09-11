"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const __1 = require("..");
const RedisManager_1 = require("../microServices/RedisManager");
const LibsExceptions_1 = require("./LibsExceptions");
class BaseRedisHashZntity {
    getBaseZntityId() {
        return this.baseZntityId;
    }
    setBaseZntityId(id) {
        this.baseZntityId = id;
    }
    async execDeleteAll(id) {
        if (!_.isUndefined(id)) {
            throw new LibsExceptions_1.LibsExceptions(__1.BaseHttpStatusCode.STATUS_FAIL, this.constructor.name + 'id is undefined');
        }
        else {
            const redisManger = new RedisManager_1.default();
            const felds = this.deepFeldsKeys();
            const mainKey = this.mainRedisKey() + id;
            let deepValuess = Object.values(felds);
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
    async execUpdateRedis(id) {
        if (!_.isUndefined(id)) {
            throw new LibsExceptions_1.LibsExceptions(__1.BaseHttpStatusCode.STATUS_FAIL, this.constructor.name + 'id is undefined');
        }
        else {
            const redisManger = new RedisManager_1.default();
            const felds = this.deepFeldsKeys();
            const mainKey = this.mainRedisKey() + id;
            const deepFelds = Object.entries(felds);
            const promiseList = [];
            const deepValuess = deepFelds.map((data) => {
                return data[0] + id;
            });
            await redisManger.del(...deepValuess);
            let length = deepFelds.length;
            const self = this;
            while (length--) {
                const feldskey = deepFelds[length][1] + id;
                const feldsName = deepFelds[length][0];
                if (this[feldsName]) {
                    self[feldsName] = feldskey;
                    promiseList.push(redisManger.rpush(feldskey, this[feldsName]));
                }
            }
            promiseList.push(redisManger.hmgetArray(mainKey, self));
            await Promise.all(promiseList);
        }
    }
    /**
     * 初始化專用,如果要把資料完整清除在初始化可以用這個
     * @param {number} id
     * @param {*} source
     * @memberof BaseRedisHashZntity
     */
    async execReuseRedis(id, source) {
        if (!_.isUndefined(source)) {
            // 先刪除所有的Redis Keys
            const redisManger = new RedisManager_1.default();
            const felds = this.deepFeldsKeys();
            const deepFelds = Object.entries(felds);
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
            const promiseList = [];
            let length = deepFelds.length;
            while (length--) {
                const feldskey = deepFelds[length][1] + id;
                const feldsName = deepFelds[length][0];
                // 儲存Promise每個deepFelds的成員要塞的數值
                promiseList.push(redisManger.rpushArray(feldskey, source[feldsName]));
                source[feldsName] = feldskey;
            }
            promiseList.push(redisManger.hmsetArray(mainKey, source));
            await Promise.all(promiseList);
        }
        else {
            throw new LibsExceptions_1.LibsExceptions(__1.BaseHttpStatusCode.STATUS_FAIL, this.constructor.name + 'source is undefined');
        }
    }
}
exports.default = BaseRedisHashZntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVJlZGlzSGFzaFpudGl0eS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbIm1vZGVscy9CYXNlUmVkaXNIYXNoWm50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEJBQTRCO0FBQzVCLDBCQUF3QztBQUN4QyxnRUFBd0Q7QUFDeEQscURBQWtEO0FBQ2xELE1BQThCLG1CQUFtQjtJQUd0QyxlQUFlO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBQ00sZUFBZSxDQUFDLEVBQUU7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUtNLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBVTtRQUNqQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNwQixNQUFNLElBQUksK0JBQWMsQ0FBQyxzQkFBa0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsQ0FBQztTQUN2RzthQUFNO1lBQ0gsTUFBTSxXQUFXLEdBQUcsSUFBSSxzQkFBVyxFQUFFLENBQUM7WUFDdEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ25DLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDekMsSUFBSSxXQUFXLEdBQWEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqRCxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNyQyxPQUFPLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7WUFDSCxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLE1BQU0sV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdB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Q0FBNkM7WUFDN0Msc0NBQXNDO1lBQ3RDLE1BQU0sV0FBVyxHQUF3QixFQUFFLENBQUM7WUFDNUMsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUM5QixPQUFPLE1BQU0sRUFBRSxFQUFFO2dCQUNiLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQzNDLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsK0JBQStCO2dCQUMvQixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RFLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUM7YUFDaEM7WUFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDMUQsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2xDO2FBQU07WUFDSCxNQUFNLElBQUksK0JBQWMsQ0FBQyxzQkFBa0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcscUJBQXFCLENBQUMsQ0FBQztTQUMzRztJQUNMLENBQUM7Q0FDSjtBQXBHRCxzQ0FvR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBCYXNlSHR0cFN0YXR1c0NvZGUgfSBmcm9tICcuLic7XG5pbXBvcnQgUmVkaXNNYW5nZXIgZnJvbSAnLi4vbWljcm9TZXJ2aWNlcy9SZWRpc01hbmFnZXInO1xuaW1wb3J0IHsgTGlic0V4Y2VwdGlvbnMgfSBmcm9tICcuL0xpYnNFeGNlcHRpb25zJztcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VSZWRpc0hhc2habnRpdHkge1xuXG4gICAgcHJpdmF0ZSBiYXNlWm50aXR5SWQ7XG4gICAgcHVibGljIGdldEJhc2VabnRpdHlJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZVpudGl0eUlkO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0QmFzZVpudGl0eUlkKGlkKSB7XG4gICAgICAgIHRoaXMuYmFzZVpudGl0eUlkID0gaWQ7XG4gICAgfVxuICAgIHB1YmxpYyBhYnN0cmFjdCBtYWluRmllbGRzKCk6IHN0cmluZ1tdO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBtYWluUmVkaXNLZXkoKTogc3RyaW5nO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBkZWVwRmVsZHNLZXlzKCk6IGFueTtcbiAgICBwdWJsaWMgYWJzdHJhY3QgbWFpblJlZGlzVHlwZSgpOiBzdHJpbmc7XG4gICAgcHVibGljIGFzeW5jIGV4ZWNEZWxldGVBbGwoaWQ6IG51bWJlcikge1xuICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQoaWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoQmFzZUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLCB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnaWQgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCByZWRpc01hbmdlciA9IG5ldyBSZWRpc01hbmdlcigpO1xuICAgICAgICAgICAgY29uc3QgZmVsZHMgPSB0aGlzLmRlZXBGZWxkc0tleXMoKTtcbiAgICAgICAgICAgIGNvbnN0IG1haW5LZXkgPSB0aGlzLm1haW5SZWRpc0tleSgpICsgaWQ7XG4gICAgICAgICAgICBsZXQgZGVlcFZhbHVlc3M6IHN0cmluZ1tdID0gT2JqZWN0LnZhbHVlcyhmZWxkcyk7XG4gICAgICAgICAgICBkZWVwVmFsdWVzcyA9IGRlZXBWYWx1ZXNzLm1hcCgodmFsdWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlcyArIGlkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWVwVmFsdWVzcy5wdXNoKG1haW5LZXkpO1xuICAgICAgICAgICAgYXdhaXQgcmVkaXNNYW5nZXIuZGVsKC4uLmRlZXBWYWx1ZXNzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDlpoLmnpzopoHmm7TmlrDnmoTos4fmlpnlpKrlpJos5Y+v5Lul5L2/55So6YCZ5YCLXG4gICAgICog55So5rOV5bCx5piv5aGe5pW45YC85LmL5b6MLOacg+WGjeWOu+WIpOaWt+acieaykuacieWAvOWcqOW5q+S9oOWhnuaVuOWAvFxuICAgICAqICEhIeazqOaEj+esrOS6jOWxpOeahOizh+aWmeaYr+S4jeacg+W5q+S9oOiZleeQhueahCzmnIPnm7TmjqXot7PpgY5cbiAgICAgKiDopoHomZXnkIbnrKzkuozlsaTos4fmlpnlsLHopoHoh6rlt7HlsI1yZWRpc+iZleeQhlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZFxuICAgICAqIEBtZW1iZXJvZiBCYXNlUmVkaXNIYXNoWm50aXR5XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGV4ZWNVcGRhdGVSZWRpcyhpZDogbnVtYmVyKSB7XG4gICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChpZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsIHRoaXMuY29uc3RydWN0b3IubmFtZSArICdpZCBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHJlZGlzTWFuZ2VyID0gbmV3IFJlZGlzTWFuZ2VyKCk7XG4gICAgICAgICAgICBjb25zdCBmZWxkcyA9IHRoaXMuZGVlcEZlbGRzS2V5cygpO1xuICAgICAgICAgICAgY29uc3QgbWFpbktleSA9IHRoaXMubWFpblJlZGlzS2V5KCkgKyBpZDtcbiAgICAgICAgICAgIGNvbnN0IGRlZXBGZWxkczogQXJyYXk8W3N0cmluZywgYW55XT4gPSBPYmplY3QuZW50cmllcyhmZWxkcyk7XG4gICAgICAgICAgICBjb25zdCBwcm9taXNlTGlzdDogQXJyYXk8UHJvbWlzZTxhbnk+PiA9IFtdO1xuICAgICAgICAgICAgY29uc3QgZGVlcFZhbHVlc3MgPSBkZWVwRmVsZHMubWFwKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFbMF0gKyBpZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgcmVkaXNNYW5nZXIuZGVsKC4uLmRlZXBWYWx1ZXNzKTtcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSBkZWVwRmVsZHMubGVuZ3RoO1xuICAgICAgICAgICAgY29uc3Qgc2VsZjogYW55ID0gdGhpcztcbiAgICAgICAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZlbGRza2V5ID0gZGVlcEZlbGRzW2xlbmd0aF1bMV0gKyBpZDtcbiAgICAgICAgICAgICAgICBjb25zdCBmZWxkc05hbWUgPSBkZWVwRmVsZHNbbGVuZ3RoXVswXTtcbiAgICAgICAgICAgICAgICBpZiAodGhpc1tmZWxkc05hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGZbZmVsZHNOYW1lXSA9IGZlbGRza2V5O1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlTGlzdC5wdXNoKHJlZGlzTWFuZ2VyLnJwdXNoKGZlbGRza2V5LCB0aGlzW2ZlbGRzTmFtZV0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9taXNlTGlzdC5wdXNoKHJlZGlzTWFuZ2VyLmhtZ2V0QXJyYXkobWFpbktleSwgc2VsZikpO1xuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZUxpc3QpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWIneWni+WMluWwiOeUqCzlpoLmnpzopoHmioros4fmlpnlrozmlbTmuIXpmaTlnKjliJ3lp4vljJblj6/ku6XnlKjpgJnlgItcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaWRcbiAgICAgKiBAcGFyYW0geyp9IHNvdXJjZVxuICAgICAqIEBtZW1iZXJvZiBCYXNlUmVkaXNIYXNoWm50aXR5XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGV4ZWNSZXVzZVJlZGlzKGlkOiBudW1iZXIsIHNvdXJjZTogYW55KSB7XG4gICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChzb3VyY2UpKSB7XG4gICAgICAgICAgICAvLyDlhYjliKrpmaTmiYDmnInnmoRSZWRpcyBLZXlzXG4gICAgICAgICAgICBjb25zdCByZWRpc01hbmdlciA9IG5ldyBSZWRpc01hbmdlcigpO1xuICAgICAgICAgICAgY29uc3QgZmVsZHMgPSB0aGlzLmRlZXBGZWxkc0tleXMoKTtcbiAgICAgICAgICAgIGNvbnN0IGRlZXBGZWxkczogQXJyYXk8W3N0cmluZywgYW55XT4gPSBPYmplY3QuZW50cmllcyhmZWxkcyk7XG4gICAgICAgICAgICBjb25zdCBtYWluS2V5ID0gdGhpcy5tYWluUmVkaXNLZXkoKSArIGlkO1xuICAgICAgICAgICAgY29uc3QgbWFpbkZpZWxkcyA9IHRoaXMubWFpbkZpZWxkcygpO1xuICAgICAgICAgICAgY29uc3QgZGVlcFZhbHVlc3MgPSBkZWVwRmVsZHMubWFwKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFbMF0gKyBpZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVlcFZhbHVlc3MucHVzaChtYWluS2V5KTtcbiAgICAgICAgICAgIGF3YWl0IHJlZGlzTWFuZ2VyLmRlbCguLi5kZWVwVmFsdWVzcyk7XG4gICAgICAgICAgICAvLyDntZDmnZ8g5Yiq6Zmk5omA5pyJ55qEUmVkaXMgS2V5c1xuICAgICAgICAgICAgLy8g6ZaL5aeL5pu/5o+b5Li76KaBT0JK55qE5oiQ5ZOh5oqKZGVlcEZlbGRz6KOh6Z2i55qEa2V55pu/5o+b5oiQ5Li76KaBT0JK55qE5oiQ5ZOh55qE5pW45YC8XG4gICAgICAgICAgICAvLyDkuKbkuJTmm7/mj5vpgY7nqIvkuK3lhLLlrZhQcm9taXNl5q+P5YCLZGVlcEZlbGRz55qE5oiQ5ZOh6KaB5aGe55qE5pW45YC8XG4gICAgICAgICAgICBjb25zdCBwcm9taXNlTGlzdDogQXJyYXk8UHJvbWlzZTxhbnk+PiA9IFtdO1xuICAgICAgICAgICAgbGV0IGxlbmd0aCA9IGRlZXBGZWxkcy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmZWxkc2tleSA9IGRlZXBGZWxkc1tsZW5ndGhdWzFdICsgaWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgZmVsZHNOYW1lID0gZGVlcEZlbGRzW2xlbmd0aF1bMF07XG4gICAgICAgICAgICAgICAgLy8g5YSy5a2YUHJvbWlzZeavj+WAi2RlZXBGZWxkc+eahOaIkOWToeimgeWhnueahOaVuOWAvFxuICAgICAgICAgICAgICAgIHByb21pc2VMaXN0LnB1c2gocmVkaXNNYW5nZXIucnB1c2hBcnJheShmZWxkc2tleSwgc291cmNlW2ZlbGRzTmFtZV0pKTtcbiAgICAgICAgICAgICAgICBzb3VyY2VbZmVsZHNOYW1lXSA9IGZlbGRza2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvbWlzZUxpc3QucHVzaChyZWRpc01hbmdlci5obXNldEFycmF5KG1haW5LZXksIHNvdXJjZSkpO1xuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZUxpc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEJhc2VIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCwgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJ3NvdXJjZSBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==