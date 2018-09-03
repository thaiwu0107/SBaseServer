"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("koa-log4");
const _ = require("lodash");
require("reflect-metadata");
const ioc_1 = require("../ioc/ioc");
const RedisContext_1 = require("../models/RedisContext");
const _log = log4js.getLogger('RedisManger');
let RedisManger = class RedisManger {
    constructor() {
        this.redis = RedisContext_1.default.getInstance().getRedis();
    }
    /**
     * 增加一個key跟對應的值, 沒有過期時間
     * @param {string} key
     * @param {(number | string)} value
     * @returns
     * @memberof RedisManger
     */
    async set(key, value) {
        return this.redis.set(key, value);
    }
    /**
     * 按造順序執行你串接的命令
     * 各別命令的文檔接口請參考
     * @class RedisManger 這個類別或是網路文件
     * @returns {IORedis.Pipeline}
     * @memberof RedisManger
     */
    pipeline() {
        return this.redis.pipeline();
    }
    /**
     * 讓一個key有過期時間 單位是秒
     * @param {string} key
     * @param {number} ex
     * @returns
     * @memberof RedisManger
     */
    async expire(key, ex) {
        return this.redis.expire(key, ex);
    }
    /**
     * 取得一個key裡面的資料
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async get(key) {
        return this.redis.get(key);
    }
    /**
     * 返回 key 所储存的值的类型。
     * none (key不存在)
     * string (字符串)
     * list (列表)
     * set (集合)
     * zset (有序集)
     * hash (哈希表)
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async type(key) {
        return this.redis.type(key);
    }
    /**
     * 将 key 中储存的数字值增一。
     * 如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行
     * 如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async incr(key) {
        return this.redis.incr(key);
    }
    /**
     * 刪除這個key包含裡面的數值
     * @param {...string[]} keys
     * @returns
     * @memberof RedisManger
     */
    async del(...keys) {
        return this.redis.del(...keys);
    }
    /**
     * 查詢這個key有沒有存在
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async exists(key) {
        return this.redis.exists(key);
    }
    /**
     * 讓這個key持久化,不讓它過期
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async persist(key) {
        return this.redis.persist(key);
    }
    /**
     * 以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)。
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async ttl(key) {
        return this.redis.ttl(key);
    }
    /**
     * 将给定 key 的值设为 value ，并返回 key 的旧值(old value)。
     * @param {string} key
     * @param {(string | number)} value
     * @returns
     * @memberof RedisManger
     */
    async getset(key, value) {
        return this.redis.getset(key, value);
    }
    /**
     * 只有在 key 不存在时设置 key 的值。
     *
     * 设置成功，返回 1 。
     * 设置失败，返回 0 。
     * @param {string} key
     * @param {(string | number)} value
     * @returns
     * @memberof RedisManger
     */
    async setnx(key, value) {
        return this.redis.setnx(key, value);
    }
    /**
     * 返回 key 所储存的字符串值的长度。
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async strlen(key) {
        return this.redis.strlen(key);
    }
    /**
     * 将 key 所储存的值加上给定的浮点增量值（increment)
     * 如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行
     * 如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误
     * @param {string} key
     * @param {number} increment
     * @returns
     * @memberof RedisManger
     */
    async incrbyfloat(key, increment) {
        return this.redis.incrbyfloat(key, increment);
    }
    /**
     * 将 key 中储存的数字值减一。
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async decr(key) {
        return this.redis.decr(key);
    }
    /**
     * key 所储存的值减去给定的减量值（decrement)
     * @param {string} key
     * @param {number} value
     * @returns
     * @memberof RedisManger
     */
    async decrby(key, value) {
        return this.redis.decrby(key, value);
    }
    /**
     * 如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾。
     * @param {string} key
     * @param {string} value
     * @returns
     * @memberof RedisManger
     */
    async append(key, value) {
        return this.redis.append(key, value);
    }
    /**
     * 删除這個key裡面一个或多个HashMap字段
     *
     * @param {string} key
     * @param {string[]} value
     * @returns
     * @memberof RedisManger
     */
    async hdelArray(key, value) {
        return this.redis.hdel(key, ...value);
    }
    /**
     * 删除這個key裡面一个或多个HashMap字段
     *
     * @param {string} key
     * @param {...string[]} value
     * @returns
     * @memberof RedisManger
     */
    async hdel(key, ...value) {
        return this.redis.hdel(key, ...value);
    }
    /**
     * 查看HashMap key 中，指定的字段是否存在。
     * @param {string} key
     * @param {string} value
     * @returns
     * @memberof RedisManger
     */
    async hexists(key, field) {
        return this.redis.hexists(key, field);
    }
    /**
     * 获取key中 存储在HashMap中指定字段的值
     * @param {string} key
     * @param {string} field
     * @returns
     * @memberof RedisManger
     */
    async hget(key, field) {
        return this.redis.hget(key, field);
    }
    /**
     * 获取在HashMap中指定 key 的所有字段和值
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async hgetall(key) {
        return this.redis.hgetall(key);
    }
    /**
     * 为HashMap key 中的指定field的整数值加上增量 value 整數
     * 如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行
     * 如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误
     * @param {string} key
     * @param {string} field
     * @param {number} value
     * @returns
     * @memberof RedisManger
     */
    async hincrby(key, field, value) {
        return this.redis.hincrby(key, field, value);
    }
    /**
     * 为HashMap key 中的指定field的整数值加上增量 value 浮點數
     * 如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行
     * 如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误
     * @param {string} key
     * @param {string} field
     * @param {number} value
     * @returns
     * @memberof RedisManger
     */
    async hincrbyfloat(key, field, value) {
        return this.redis.hincrbyfloat(key, field, value);
    }
    /**
     * 取得這個HashMap key中所有的fields
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async hkeys(key) {
        return this.redis.hkeys(key);
    }
    /**
     * 获取HashMap中fields的数量
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async hlen(key) {
        return this.redis.hlen(key);
    }
    /**
     * 获取所有指定Fields的值
     * @param {string} key
     * @param {...string[]} field
     * @returns
     * @memberof RedisManger
     */
    async hmget(key, ...field) {
        return this.redis.hmget(key, ...field);
    }
    /**
     * 获取所有指定Fields的值
     * @param {string} key
     * @param {...string[]} fields
     * @returns
     * @memberof RedisManger
     */
    async hmgetArray(key, fields) {
        return this.redis.hmget(key, ...fields);
    }
    /**
     * HMSET key field1 value1 [field2 value2 ]
     * 同时将多个 field-value (field1-value1)set到hashMap key 中
     * @param {string} key
     * @param {string} field
     * @param {*} value
     * @param {...string[]} args
     * @returns {(Promise<0 | 1>)}
     * @memberof RedisManger
     */
    async hmset(key, field, value, ...args) {
        return this.redis.hmset(key, field, value, ...args);
    }
    /**
     * HMSET key field1 value1 [field2 value2 ]
     * 同时将多个 field-value (field1-value1)set到hashMap key 中
     * @param {string} key
     * @param {any[]} fields
     * @returns {(Promise<0 | 1>)}
     * @memberof RedisManger
     */
    async hmsetArray(key, fields) {
        return this.redis.hmset(key, fields);
    }
    /**
     * HMSET key field1 value1 [field2 value2 ]
     * 同时将多个 field-value (field1-value1)set到hashMap key 中
     * @param {string} key
     * @param {any} obj
     * @returns {(Promise<0 | 1>)}
     * @memberof RedisManger
     */
    async hmsetObject(key, obj) {
        return this.redis.hmset(key, obj);
    }
    /**
     * HSET key field value
     * 将hashMap key 中的字段 field 的值设为 value 。
     * @param {string} key
     * @param {string} field
     * @param {*} value
     * @returns
     * @memberof RedisManger
     */
    async hset(key, field, value) {
        return this.redis.hset(key, field, value);
    }
    /**
     * HSETNX key field value
     * 只有在 field 不存在时，设置hashMap field 的 value。
     * @param {string} key
     * @param {string} field
     * @param {*} value
     * @returns
     * @memberof RedisManger
     */
    async hsetnx(key, field, value) {
        return this.redis.hsetnx(key, field, value);
    }
    /**
     * HVALS key
     * 获取hashMap中所有的值
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async hvals(key) {
        return this.redis.hvals(key);
    }
    /**
     * BLPOP key1 [key2 ]
     * 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
     * @param {...string[]} key
     * @returns
     * @memberof RedisManger
     */
    async blpop(...key) {
        return this.redis.blpop(...key);
    }
    /**
     * BLPOP key1 [key2 ]
     * 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
     * @param {string[]} key
     * @returns
     * @memberof RedisManger
     */
    async blpopArray(key) {
        return this.redis.blpop(...key);
    }
    /**
     * BRPOP key1 [key2 ]
     * 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     * @param {...string[]} key
     * @returns
     * @memberof RedisManger
     */
    async brpop(...key) {
        return this.redis.brpop(...key);
    }
    /**
     * RPOP key
     * 移出并获取列表的最后一个元素， 如果列表没有元素不會阻塞
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async rpop(key) {
        return this.redis.rpop(key);
    }
    /**
     * BRPOP key1 [key2 ]
     * 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     * @param {string[]} key
     * @returns
     * @memberof RedisManger
     */
    async brpopArray(key) {
        return this.redis.brpop(...key);
    }
    /**
     * BRPOPLPUSH source destination timeout
     * 从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     * @param {string} source
     * @param {string} destination
     * @param {number} timeout
     * @returns
     * @memberof RedisManger
     */
    async brpoplpush(source, destination, timeout) {
        return this.redis.brpoplpush(source, destination, timeout);
    }
    /**
     * LINDEX key index
     * 通过index获取list中的元素
     * @param {string} key
     * @param {number} index
     * @returns
     * @memberof RedisManger
     */
    async lindex(key, index) {
        return this.redis.lindex(key, index);
    }
    /**
     * LLEN key
     * 获取列表长度
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async llen(key) {
        return this.redis.llen(key);
    }
    /**
     * LPOP key
     * 移出并获取列表的第一个元素, 如果列表没有元素不會阻塞
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async lpop(key) {
        return this.redis.lpop(key);
    }
    /**
     * LPUSH key value1, value2, value3...
     * 将一个或多个值插入到列表頭部
     * @param {string} key
     * @param {...any[]} values
     * @returns
     * @memberof RedisManger
     */
    async lpush(key, ...values) {
        return this.redis.lpush(key, values);
    }
    /**
     * LPUSH key [value1, value2]
     * 将一个或多个值插入到列表頭部
     * @param {string} key
     * @param {any[]} values
     * @returns
     * @memberof RedisManger
     */
    async lpushArray(key, values) {
        return this.redis.lpush(key, ...values);
    }
    /**
     * RPUSH key value1, value2, value3...
     * 将一个或多个值插入到列表尾端
     * @param {string} key
     * @param {...any[]} values
     * @returns
     * @memberof RedisManger
     */
    async rpush(key, ...values) {
        return this.redis.rpush(key, values);
    }
    /**
     * RPUSH key [value1, value2]
     * 将一个或多个值插入到列表尾端
     * @param {string} key
     * @param {any[]} values
     * @returns
     * @memberof RedisManger
     */
    async rpushArray(key, values) {
        return this.redis.rpush(key, ...values);
    }
    /**
     * LRANGE key start stop
     * 获取列表start index 到stop index之間范围内的元素
     * @param {string} key
     * @param {number} start
     * @param {number} stop
     * @returns
     * @memberof RedisManger
     */
    async lrange(key, start, stop) {
        return this.redis.lrange(key, start, stop);
    }
    /**
     * LREM key count value
     * 移除列表元素
     * 根据参数 count 的值，移除列表中与参数 value 相等的元素。
     * count 的值可以是以下几种：
     * count > 0 : 从表头开始向表尾搜索，移除与 value 相等的元素，数量为 count 。
     * count < 0 : 从表尾开始向表头搜索，移除与 value 相等的元素，数量为 count 的绝对值。
     * count = 0 : 移除表中所有与 value 相等的值。
     *
     * 返回分成兩種
     * 1.被移除元素的数量。
     * 2.因为不存在的 key 被视作空表(empty list)，所以当 key 不存在时， LREM 命令总是返回 0 。
     * @param {string} key
     * @param {number} count
     * @param {*} value
     * @returns
     * @memberof RedisManger
     */
    async lrem(key, count, value) {
        return this.redis.lrem(key, count, value);
    }
    /**
     * 對一個list(純數字)做ASC排序
     * 不會對當前的key裡面的list做排序儲存
     * 就是說此操作只有給你的結果是sort,實際上key裡面並沒有真正被sort
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async listSortNumberASC(key) {
        return this.redis.sort(key);
    }
    /**
     * 對一個list(純數字)做DESC排序
     * 不會對當前的key裡面的list做排序儲存
     * 就是說此操作只有給你的結果是sort,實際上key裡面並沒有真正被sort
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async listSortNumberDESC(key) {
        return this.redis.sort(key, 'desc');
    }
    /**
     * 對一個list(純string)做ASC排序
     * 不會對當前的key裡面的list做排序儲存
     * 就是說此操作只有給你的結果是sort,實際上key裡面並沒有真正被sort
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async listSortStringASC(key) {
        return this.redis.sort(key, 'ALPHA');
    }
    /**
     * sort 可以做很複雜的操作 , 如果不夠瞭解盡量不要獨立使用
     * @param {string} key
     * @param {...string[]} args
     * @returns
     * @memberof RedisManger
     */
    async sort(key, ...args) {
        return this.redis.sort(key, ...args);
    }
    /**
     * LSET key index value
     * 通过index设置list[index]的value
     * @param {string} key
     * @param {number} index
     * @param {*} value
     * @returns
     * @memberof RedisManger
     */
    async lset(key, index, value) {
        return this.redis.lset(key, index, value);
    }
    /**
     * LTRIM key start stop
     * 对一个列表进行修剪(trim)，就是说，让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除。
     * 你也可以使用负数下标，以 -1 表示列表的最后一个元素， -2 表示列表的倒数第二个元素，以此类推。
     * @param {string} key
     * @param {number} start
     * @param {number} stop
     * @returns
     * @memberof RedisManger
     */
    async ltrim(key, start, stop) {
        return this.redis.ltrim(key, start, stop);
    }
    /**
     * RPOPLPUSH source destination
     * 移除列表的最后一个元素，并将该元素添加到另一个列表并返回
     * 将列表 source 中的最后一个元素(尾元素)弹出，并返回给客户端。
     * 将 source 弹出的元素插入到列表 destination ，作为 destination 列表的的头元素。
     * 如果 source 不存在，值 nil 被返回，并且不执行其他动作。
     * 如果 source === destination 相同，则列表中的表尾元素被移动到表头，并返回该元素，可以把这种特殊情况视作列表的旋转(rotation)操作。
     * @param {string} source
     * @param {string} destination
     * @returns
     * @memberof RedisManger
     */
    async rpoplpush(source, destination) {
        return this.redis.rpoplpush(source, destination);
    }
    /**
     * RPUSHX key value
     * 为已存在的列表 加到表尾
     * 当 key 不存在时，什么也不做
     * @param {string} key
     * @param {*} value
     * @returns
     * @memberof RedisManger
     */
    async rpushx(key, value) {
        return this.redis.rpushx(key, value);
    }
    /**
     * LPUSHX key value
     * 为已存在的列表 加到表頭
     * 当 key 不存在时，什么也不做
     * @param {string} key
     * @param {*} value
     * @returns
     * @memberof RedisManger
     */
    async lpushx(key, value) {
        return this.redis.lpushx(key, value);
    }
    /**
     * 将 key 所储存的值加上给定的增量值（increment)
     * 如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行
     * 如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误
     * @param {string} key
     * @param {number} increment
     * @returns
     * @memberof RedisManger
     */
    async incrby(key, increment) {
        return this.redis.incrby(key, increment);
    }
    /**
     * MSETNX key value [key value ...]
     * 同时设置一个或多个 key-value 对，並且只有當所有给定 key 都不存在才會執行。
     * 即使只有一个给定 key 已存在， MSETNX 也会拒绝执行所有给定 key 的设置操作。
     * MSETNX 是原子性的
     * 因此它可以用作设置多个不同 key 表示不同字段(field)的唯一性逻辑对象(unique logic object)
     * 所有字段要么全被设置，要么全不被设置。
     *
     * 当所有 key 都成功设置，返回 1 。
     * 如果所有给定 key 都设置失败(至少有一个 key 已经存在)，那么返回 0 。
     * @param {string} key
     * @param {*} value
     * @param {...string[]} args
     * @returns
     * @memberof RedisManger
     */
    async msetnx(key, value, ...args) {
        return this.redis.msetnx(key, value, ...args);
    }
    /**
     * SADD key member [member ...]
     * 将一个或多个 member 元素加入到集合 key 当中，已经存在于集合的 member 元素将被忽略
     * 假如 key 不存在，则创建一个只包含 member 元素作成员的集合
     * 当 key 不是集合类型时，返回一个错误
     *
     * 返回
     * 被添加到集合中的新元素的数量，不包括被忽略的元素
     * @param {string} key
     * @param {...any[]} members
     * @returns {(Promise<any>)}
     * @memberof RedisManger
     */
    async sadd(key, ...members) {
        return this.redis.sadd(key, ...members);
    }
    /**
     * SCARD key
     * 返回集合 key 的基数(集合中元素的数量)
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async scard(key) {
        return this.redis.scard(key);
    }
    /**
     * SDIFF key [key ...]
     * 比較兩個Set集合中的差異,返回差異
     * 返回一个集合的全部成员，该集合是所有给定集合之间的差集。
     * 不存在的 key 被视为空集。
     * @param {...string[]} keys
     * @returns
     * @memberof RedisManger
     */
    async sdiff(...keys) {
        return this.redis.sdiff(...keys);
    }
    /**
     * SDIFFSTORE destination key [key ...]
     * 这个命令的作用和 SDIFF 类似，但它将结果保存到 destination 集合，而不是简单地返回结果集
     * 如果 destination 集合已经存在，则将其覆盖
     * destination 可以是 自己覆蓋自己
     * @param {string} destination
     * @param {...string[]} keys
     * @returns 结果集中的元素数量
     * @memberof RedisManger
     */
    async sdiffstore(destination, ...keys) {
        return this.redis.sdiffstore(destination, ...keys);
    }
    /**
     * SINTER key [key ...]
     * 返回一个集合的全部成员，该集合是所有给定集合的交集
     * 不存在的 key 被视为空集
     * 当给定集合当中有一个空集时，结果也为空集(根据集合运算定律)
     * @param {...string[]} keys
     * @returns 交集成员的列表
     * @memberof RedisManger
     */
    async sinter(...keys) {
        return this.redis.sinter(...keys);
    }
    /**
     * SINTERSTORE destination key [key ...]
     * 这个命令类似于 SINTER 命令，但它将结果保存到 destination 集合，而不是简单地返回结果集
     * 如果 destination 集合已经存在，则将其覆盖
     * destination 可以是 自己覆蓋自己
     * @param {string} destination
     * @param {...string[]} keys
     * @returns { Promise<number>} 结果集中的成员数量
     * @memberof RedisManger
     */
    async sinterstore(destination, ...keys) {
        return this.redis.sinterstore(destination, ...keys);
    }
    /**
     * SISMEMBER key member
     * 判断 member 元素是否集合 key 的成员
     *
     * 如果 member 元素是集合的成员，返回 1
     * 如果 member 元素不是集合的成员，或 key 不存在，返回 0
     * @param {string} key
     * @param {string} member
     * @returns {Promise<0 | 1>}
     * @memberof RedisManger
     */
    async sismember(key, member) {
        return this.redis.sismember(key, member);
    }
    /**
     * SMEMBERS key
     * 返回集合 key 中的所有成员
     * 不存在的 key 被视为空集合
     * @param {string} key
     * @returns 集合中的所有成员
     * @memberof RedisManger
     */
    async smembers(key) {
        return this.redis.smembers(key);
    }
    /**
     * SMOVE source destination member
     * 将 member 元素从 source 集合移动到 destination 集合
     * SMOVE 是原子性操作
     * 如果 source 集合不存在或不包含指定的 member 元素，则 SMOVE 命令不执行任何操作，仅返回 0
     * 否则， member 元素从 source 集合中被移除，并添加到 destination 集合中去
     * 当 destination 集合已经包含 member 元素时， SMOVE 命令只是简单地将 source 集合中的 member 元素删除
     * 当 source 或 destination 不是集合类型(Set)时，返回一个错误
     * @param {string} source
     * @param {string} destination
     * @param {string} member
     * @returns 如果 member 元素被成功移除，返回
     *          如果 member 元素不是 source 集合的成员，并且没有任何操作对 destination 集合执行，那么返回 0
     * @memberof RedisManger
     */
    async smove(source, destination, member) {
        return this.redis.smove(source, destination, member);
    }
    /**
     * SPOP key count?
     * 移除并返回集合中的 count 个随机元素
     * 如果不輸入count就是隨機一個元素
     * @param {string} key
     * @param {number} [count]
     * @returns 被移除的随机元素
     *          当 key 不存在或 key 是空集时，返回 nil
     * @memberof RedisManger
     */
    async spop(key, count) {
        return this.redis.spop(key, count);
    }
    /**
     * SRANDMEMBER key count?
     * 如果命令执行时，只提供了 key 参数，那么返回集合中的一个随机元素
     * 从 Redis 2.6 版本开始， SRANDMEMBER 命令接受可选的 count 参数
     * 如果 count 为正数，且小于集合基数，那么命令返回一个包含 count 个元素的数组
     * 数组中的元素各不相同。如果 count 大于等于集合基数，那么返回整个集合
     *
     * 如果 count 为负数，那么命令返回一个数组，数组中的元素可能会重复出现多次
     * 而数组的长度为 count 的绝对值
     *
     * 该操作和 SPOP 相似，但 SPOP 将随机元素从集合中移除并返回
     * 而 SRANDMEMBER 则仅仅返回随机元素，而不对集合进行任何改动
     * @param {string} key
     * @param {number} [count?]
     * @returns 只提供 key 参数时，返回一个元素；如果集合为空，返回 nil
     * 如果提供了 count 参数，那么返回一个数组；如果集合为空，返回空数组
     * @memberof RedisManger
     */
    async srandmember(key, count) {
        return this.redis.srandmember(key, count);
    }
    /**
     * SREM key member [member ...]
     * 移除集合 key 中的一个或多个 member 元素，不存在的 member 元素会被忽略
     * 当 key 不是集合类型(Set)，返回一个错误
     * @param {string} key
     * @param {...any[]} members
     * @returns 被成功移除的元素的数量，不包括被忽略的元素
     * @memberof RedisManger
     */
    async srem(key, ...members) {
        return this.redis.srem(key, ...members);
    }
    /**
     * SUNION key [key ...]
     * 返回一个集合的全部成员，该集合是所有给定集合的并集
     * 不存在的 key 被视为空集
     * @param {...string[]} keys
     * @returns 并集成员的列表
     * @memberof RedisManger
     */
    async sunion(...keys) {
        return this.redis.sunion(...keys);
    }
    /**
     * SUNIONSTORE destination key [key ...]
     * 这个命令类似于 SUNION 命令，但它将结果保存到 destination 集合，而不是简单地返回结果集
     * 如果 destination 已经存在，则将其覆盖
     * destination 可以是 key 自己覆蓋本身
     * @param {string} destination
     * @param {...string[]} keys
     * @returns 结果集中的元素数量
     * @memberof RedisManger
     */
    async sunionstore(destination, ...keys) {
        return this.redis.sunionstore(destination, ...keys);
    }
    /**
     * PSUBSCRIBE pattern [pattern ...]
     * 订阅一个或多个符合给定模式的频道
     * 每个模式以 * 作为匹配符，比如 it* 匹配所有以 it 开头的频道( it.news 、 it.blog 、 it.tweets 等等)
     * news.* 匹配所有以 news. 开头的频道( news.it 、 news.global.today 等等)，诸如此类
     * @param {...string[]} patterns
     * @returns 接收到的信息
     * @memberof RedisManger
     */
    async psubscribe(...patterns) {
        return this.redis.psubscribe(...patterns);
    }
    /**
     * PUBLISH channel message
     * 将信息 message 发送到指定的频道 channel
     * @param {string} channel
     * @param {string} message
     * @returns 接收到信息 message 的订阅者数量
     * @memberof RedisManger
     */
    async publish(channel, message) {
        return this.redis.publish(channel, message);
    }
    /**
     * PUNSUBSCRIBE [pattern [pattern ...]]
     * 指示客户端退订所有给定模式
     * 如果没有模式被指定，也即是，一个无参数的 PUNSUBSCRIBE 调用被执行 那么客户端使用 PSUBSCRIBE 命令订阅的所有模式都会被退订。
     * 在这种情况下，命令会返回一个信息，告知客户端所有被退订的模式
     * @param {...string[]} patterns
     * @returns 这个命令在不同的客户端中有不同的表现
     * @memberof RedisManger
     */
    async punsubscribe(...patterns) {
        return this.redis.punsubscribe(...patterns);
    }
    /**
     * SUBSCRIBE channel [channel ...]
     * 订阅给定的一个或多个频道的信息
     * @param {...any[]} channels
     * @returns 接收到的信息 參考 http://redisdoc.com/pub_sub/subscribe.html
     * @memberof RedisManger
     */
    async subscribe(...channels) {
        return this.redis.subscribe(...channels);
    }
    /**
     * UNSUBSCRIBE [channel [channel ...]]
     * 指示客户端退订给定的频道
     * 如果没有频道被指定，也即是，一个无参数的 UNSUBSCRIBE 调用被执行，那么客户端使用 SUBSCRIBE 命令订阅的所有频道都会被退订。
     * 在这种情况下，命令会返回一个信息，告知客户端所有被退订的频道
     * @param {...any[]} channels
     * @returns 这个命令在不同的客户端中有不同的表现
     * @memberof RedisManger
     */
    async unsubscribe(...channels) {
        return this.redis.unsubscribe(...channels);
    }
    /**
     * WATCH key [key ...]
     * 监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断
     * @param {...string[]} keys
     * @returns 总是返回 OK
     * @memberof RedisManger
     */
    async watch(...keys) {
        return this.redis.watch(...keys);
    }
    /**
     * UNWATCH
     * 取消 WATCH 命令对所有 key 的监视
     * 如果在执行 WATCH 命令之后， EXEC 命令或 DISCARD 命令先被执行了的话，那么就不需要再执行 UNWATCH 了
     * 因为 EXEC 命令会执行事务，因此 WATCH 命令的效果已经产生了
     *
     * 而 DISCARD 命令在取消事务的同时也会取消所有对 key 的监视
     * 因此这两个命令执行之后，就没有必要执行 UNWATCH 了
     * @returns
     * @memberof RedisManger
     */
    async unwatch() {
        return this.redis.unwatch();
    }
    /**
     * EXEC
     * 执行所有事务块内的命令
     * 假如某个(或某些) key 正处于 WATCH 命令的监视之下，且事务块中有和这个(或这些) key 相关的命令
     * 那么 EXEC 命令只在这个(或这些) key 没有被其他命令所改动的情况下执行并生效，否则该事务被打断(abort)
     * @returns 事务块内所有命令的返回值，按命令执行的先后顺序排列
     * 当操作被打断时，返回空值 nil
     * @memberof RedisManger
     */
    async exec() {
        return this.redis.exec();
    }
    /**
     * EXEC
     * 执行所有事务块内的命令
     * 假如某个(或某些) key 正处于 WATCH 命令的监视之下，且事务块中有和这个(或这些) key 相关的命令
     * 那么 EXEC 命令只在这个(或这些) key 没有被其他命令所改动的情况下执行并生效，否则该事务被打断(abort)
     * @param {(err: Error, res: any) => void} callback
     * @returns
     * @memberof RedisManger
     */
    async execPipeline(callback) {
        return this.redis.exec(callback);
    }
    /**
     * DISCARD
     * 取消事务，放弃执行事务块内的所有命令
     * 如果正在使用 WATCH 命令监视某个(或某些) key，那么取消所有监视，等同于执行命令 UNWATCH
     * @returns
     * @memberof RedisManger
     */
    async discard() {
        return this.redis.discard();
    }
    /**
     * (cluster模式下無法使用這個))
     * MULTI
     * 标记一个事务块的开始
     * 事务块内的多条命令会按照先后顺序被放进一个队列当中，最后由 EXEC 命令原子性(atomic)地执行
     * @param {{ pipeline: false }} options
     * @returns
     * @memberof RedisManger
     */
    async multi(options) {
        return this.redis.multi(options);
    }
    /**
     * (cluster模式下只能使用這個))
     * (Pipeline)
     * MULTI
     * 标记一个事务块的开始
     * 事务块内的多条命令会按照先后顺序被放进一个队列当中，最后由 EXEC 命令原子性(atomic)地执行
     * @param {{ pipeline: false }} options
     * @returns
     * @memberof RedisManger
     */
    async multiPipeline(commands, options) {
        return this.redis.multi(commands, options);
    }
    /**
     * ZADD key score member [[score member] [score member] ...]
     * 将一个或多个 member 元素及其 score 值加入到有序集 key 当中
     * 如果某个 member 已经是有序集的成员，那么更新这个 member 的 score 值，并通过重新插入这个 member 元素，来保证该 member 在正确的位置上
     * score 值可以是整数值或双精度浮点数
     * 如果key不存在，則創建一個空的有序集並執行ZADD操作
     * 當key存在但不是有序集類型時，返回一個錯誤
     * @param {string} key
     * @param {...string[]} args
     * @returns 被成功添加的新成员的数量，不包括那些被更新的、已经存在的成员
     * @memberof RedisManger
     */
    async zadd(key, ...args) {
        return this.redis.zadd(key, ...args);
    }
    /**
     * ZCARD key
     * 返回有序集 key 的基数
     *
     * @param {string} key
     * @returns 当 key 存在且是有序集类型时，返回有序集的基数, 当 key 不存在时，返回 0
     * @memberof RedisManger
     */
    async zcard(key) {
        return this.redis.zcard(key);
    }
    /**
     * ZCOUNT key min max
     * 返回有序集 key 中， score 值在 min 和 max 之间(默认包括 score 值等于 min 或 max )的成员的数量
     * 关于参数 min 和 max 的详细使用方法，请参考 ZRANGEBYSCORE 命令
     * @param {string} key
     * @param {(number | string)} min
     * @param {(number | string)} max
     * @returns score 值在 min 和 max 之间的成员的数量
     * @memberof RedisManger
     */
    async zcount(key, min, max) {
        return this.redis.zcount(key, min, max);
    }
    /**
     * ZINCRBY key increment member
     * 為有序集key的成員member的score值加上增量increment
     * 可以通过传递一个负数值 increment ，让 score 减去相应的值，比如 ZINCRBY key -5 member ，就是让 member 的 score 值减去 5
     * 当 key 不存在，或 member 不是 key 的成员时， ZINCRBY key increment member 等同于 ZADD key increment member
     * 當key不是有序集類型時，返回一個錯誤
     * increment 值可以是整數值或雙精度浮點數
     * @param {string} key
     * @param {number} increment
     * @param {string} member
     * @returns member成員的新score值，以字符串形式表示
     * @memberof RedisManger
     */
    async zincrby(key, increment, member) {
        return this.redis.zincrby(key, increment, member);
    }
    /**
     * ZRANGE key start stop
     * 返回有序集 key 中，指定区间内的成员
     * 其中成员的位置按 score 值递增(从小到大)来排序
     * 具有相同 score 值的成员按字典序(lexicographical order )来排列 https://zh.wikipedia.org/wiki/%E5%AD%97%E5%85%B8%E5%BA%8F
     * 如果你需要成员按 score 值递减(从大到小)来排列，请使用 ZREVRANGE 命令
     * 下标参数 start 和 stop 都以 0 为底，也就是说，以 0 表示有序集第一个成员，以 1 表示有序集第二个成员，以此类推
     * 你也可以使用负数下标，以 -1 表示最后一个成员， -2 表示倒数第二个成员，以此类推
     * 超出范围的下标并不会引起错误
     *
     * 比如说，当 start 的值比有序集的最大下标还要大，或是 start > stop 时， ZRANGE 命令只是简单地返回一个空列表
     * 另一方面，假如 stop 参数的值比有序集的最大下标还要大，那么 Redis 将 stop 当作最大下标来处理
     * @param {string} key
     * @param {number} start
     * @param {number} stop
     * @returns 指定区间内，的有序集成员的列表
     * @memberof RedisManger
     */
    async zrange(key, start, stop) {
        return this.redis.zrange(key, start, stop);
    }
    /**
     * ZRANGE key start stop
     * 返回有序集 key 中，指定区间内的成员
     * 其中成员的位置按 score 值递增(从小到大)来排序
     * 具有相同 score 值的成员按字典序(lexicographical order )来排列 https://zh.wikipedia.org/wiki/%E5%AD%97%E5%85%B8%E5%BA%8F
     * 如果你需要成员按 score 值递减(从大到小)来排列，请使用 ZREVRANGE 命令
     * 下标参数 start 和 stop 都以 0 为底，也就是说，以 0 表示有序集第一个成员，以 1 表示有序集第二个成员，以此类推
     * 你也可以使用负数下标，以 -1 表示最后一个成员， -2 表示倒数第二个成员，以此类推
     * 超出范围的下标并不会引起错误
     *
     * 比如说，当 start 的值比有序集的最大下标还要大，或是 start > stop 时， ZRANGE 命令只是简单地返回一个空列表
     * 另一方面，假如 stop 参数的值比有序集的最大下标还要大，那么 Redis 将 stop 当作最大下标来处理
     *
     * 可以通过使用 WITHSCORES 选项，来让成员和它的 score 值一并返回，返回列表以 value1,score1, ..., valueN,scoreN 的格式表示
     * 客户端库可能会返回一些更复杂的数据类型，比如数组、元组等
     * @param {string} key
     * @param {number} start
     * @param {number} stop
     * @returns 指定区间内，带有 score 值(可选)的有序集成员的列表
     * @memberof RedisManger
     */
    async zrangeWithScores(key, start, stop) {
        return this.redis.zrange(key, start, stop, 'WITHSCORES');
    }
    /**
     * ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]
     * 返回有序集 key 中，所有 score 值介于 min 和 max 之间(包括等于 min 或 max )的成员。有序集成员按 score 值递增(从小到大)次序排列
     * 具有相同 score 值的成员按字典序(lexicographical order)来排列(该属性是有序集提供的，不需要额外的计算)
     * https://zh.wikipedia.org/wiki/%E5%AD%97%E5%85%B8%E5%BA%8F
     *
     * 可选的 LIMIT 参数指定返回结果的数量及区间(就像SQL中的 SELECT LIMIT offset, count )
     * 注意当 offset 很大时，定位 offset 的操作可能需要遍历整个有序集，此过程最坏复杂度为 O(N) 时间
     *
     * 可选的 WITHSCORES 参数决定结果集是单单返回有序集的成员，还是将有序集成员及其 score 值一起返回
     * min 和 max 可以是 -inf 和 +inf ，这样一来，你就可以在不知道有序集的最低和最高 score 值的情况下，使用 ZRANGEBYSCORE 这类命令
     * 默认情况下，区间的取值使用闭区间 (小于等于或大于等于)，你也可以通过给参数前增加 ( 符号来使用可选的开区间 (小于或大于)
     *
     * 举个例子:
     * 1.
     * ZRANGEBYSCORE key (1 5
     * 返回所有符合条件 1 < score <= 5 的成员
     *
     * 2.
     * ZRANGEBYSCORE key (5 (10
     * 则返回所有符合条件 5 < score < 10 的成员
     * @param {string} key
     * @param {(number | string)} min
     * @param {(number | string)} max
     * @param {...string[]} args
     * @returns 指定区间内，带有 score 值(可选)的有序集成员的列表
     * @memberof RedisManger
     */
    async zrangebyscore(key, min, max, ...args) {
        return this.redis.zrangebyscore(key, min, max, ...args);
    }
    /**
     * ZRANK key member
     * 返回有序集 key 中成员 member 的排名。其中有序集成员按 score 值递增(从小到大)顺序排列
     * 排名以 0 为底，也就是说， score 值最小的成员排名为 0
     * 使用 ZREVRANK 命令可以获得成员按 score 值递减(从大到小)排列的排名
     * @param {string} key
     * @param {string} member
     * @returns 如果 member 是有序集 key 的成员，返回 member 的排名, 如果 member 不是有序集 key 的成员，返回 nil
     * @memberof RedisManger
     */
    async zrank(key, member) {
        return this.redis.zrank(key, member);
    }
    /**
     * ZREM key member [member ...]
     * 移除有序集 key 中的一个或多个成员，不存在的成员将被忽略
     * 当 key 存在但不是有序集类型时，返回一个错误
     * @param {string} key
     * @param {...any[]} members
     * @returns
     * @memberof RedisManger
     */
    async zrem(key, ...members) {
        return this.redis.zrem(key, ...members);
    }
    /**
     * ZREMRANGEBYRANK key start stop
     * 移除有序集 key 中，指定排名(rank)区间内的所有成员
     * 区间分别以下标参数 start 和 stop 指出，包含 start 和 stop 在内
     * 下标参数 start 和 stop 都以 0 为底，也就是说，以 0 表示有序集第一个成员，以 1 表示有序集第二个成员，以此类推
     * 你也可以使用负数下标，以 -1 表示最后一个成员， -2 表示倒数第二个成员，以此类推
     * @param {string} key
     * @param {number} start
     * @param {number} stop
     * @returns 被移除成员的数量
     * @memberof RedisManger
     */
    async zremrangebyrank(key, start, stop) {
        return this.redis.zremrangebyrank(key, start, stop);
    }
    /**
     * ZREMRANGEBYSCORE key min max
     * 移除有序集 key 中，所有 score 值介于 min 和 max 之间(包括等于 min 或 max )的成员
     * score 值等于 min 或 max 的成员也可以不包括在内，详情请参见 ZRANGEBYSCORE 命令
     * http://redisdoc.com/sorted_set/zrangebyscore.html#zrangebyscore
     * @param {string} key
     * @param {(number | string)} min
     * @param {(number | string)} max
     * @returns {Promise<number>} 被移除成员的数量
     * @memberof RedisManger
     */
    async zremrangebyscore(key, min, max) {
        return this.redis.zremrangebyscore(key, min, max);
    }
    /**
     * ZREVRANGE key start stop
     * 返回有序集 key 中，指定区间内的成员
     * 其中成员的位置按 score 值递减(从大到小)来排列
     * 具有相同 score 值的成员按字典序的逆序(reverse lexicographical order)排列
     * https://zh.wikipedia.org/wiki/%E5%AD%97%E5%85%B8%E5%BA%8F
     *
     * 除了成员按 score 值递减的次序排列这一点外， ZREVRANGE 命令的其他方面和 ZRANGE 命令一样
     * @param {string} key
     * @param {number} start
     * @param {number} stop
     * @returns 指定区间内，带有 score 值(可选)的有序集成员的列表
     * @memberof RedisManger
     */
    async zrevrange(key, start, stop) {
        return this.redis.zrevrange(key, start, stop);
    }
    /**
     * ZREVRANGE key start stop [WITHSCORES]
     * 返回有序集 key 中，指定区间内的成员
     * 其中成员的位置按 score 值递减(从大到小)来排列
     * 具有相同 score 值的成员按字典序的逆序(reverse lexicographical order)排列
     * https://zh.wikipedia.org/wiki/%E5%AD%97%E5%85%B8%E5%BA%8F
     *
     * 除了成员按 score 值递减的次序排列这一点外， ZREVRANGE 命令的其他方面和 ZRANGE 命令一样
     * @param {string} key
     * @param {number} start
     * @param {number} stop
     * @returns 指定区间内，带有 score 值(可选)的有序集成员的列表
     * @memberof RedisManger
     */
    async zrevrangeWithScores(key, start, stop) {
        return this.redis.zrevrange(key, start, stop, 'WITHSCORES');
    }
    /**
     * ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]
     * 返回有序集 key 中， score 值介于 max 和 min 之间(默认包括等于 max 或 min )的所有的成员。
     * 有序集成员按 score 值递减(从大到小)的次序排列
     * 具有相同 score 值的成员按字典序的逆序(reverse lexicographical order )排列
     * https://zh.wikipedia.org/wiki/%E5%AD%97%E5%85%B8%E5%BA%8F
     *
     * 除了成员按 score 值递减的次序排列这一点外， ZREVRANGEBYSCORE 命令的其他方面和 ZRANGEBYSCORE 命令一样
     * @param {string} key
     * @param {(number | string)} max
     * @param {(number | string)} min
     * @param {...string[]} args
     * @returns 指定区间内，带有 score 值(可选)的有序集成员的列表
     * @memberof RedisManger
     */
    async zrevrangebyscore(key, max, min, ...args) {
        return this.redis.zrevrangebyscore(key, max, min, ...args);
    }
    /**
     * ZREVRANK key member
     * 返回有序集 key 中成员 member 的排名。其中有序集成员按 score 值递减(从大到小)排序
     * 排名以 0 为底，也就是说， score 值最大的成员排名为 0
     * 使用 ZRANK 命令可以获得成员按 score 值递增(从小到大)排列的排名
     * @param {string} key
     * @param {string} member
     * @returns 如果 member 是有序集 key 的成员，返回 member 的排名, 如果 member 不是有序集 key 的成员，返回 nil
     * @memberof RedisManger
     */
    async zrevrank(key, member) {
        return this.redis.zrevrank(key, member);
    }
    /**
     * ZSCORE key member
     * 返回有序集 key 中，成员 member 的 score 值
     * 如果 member 元素不是有序集 key 的成员，或 key 不存在，返回 nil
     * @param {string} key
     * @param {string} member
     * @returns member 成员的 score 值，以字符串形式表示
     * @memberof RedisManger
     */
    async zscore(key, member) {
        return this.redis.zscore(key, member);
    }
    /**
     * ZUNIONSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]
     * 计算给定的一个或多个有序集的并集，其中给定 key 的数量必须以 numkeys 参数指定，并将该并集(结果集)储存到 destination
     * 默认情况下，结果集中某个成员的 score 值是所有给定集下该成员 score 值之 和
     *
     * WEIGHTS
     * 使用 WEIGHTS 选项，你可以为 每个 给定有序集 分别 指定一个乘法因子(multiplication factor)，每个给定有序集的所有成员的 score 值
     * 在传递给聚合函数(aggregation function)之前都要先乘以该有序集的因子
     * 如果没有指定 WEIGHTS 选项，乘法因子默认设置为 1
     *
     * AGGREGATE
     * 使用 AGGREGATE 选项，你可以指定并集的结果集的聚合方式
     * 默认使用的参数 SUM ，可以将所有集合中某个成员的 score 值之 和 作为结果集中该成员的 score 值；使用参数 MIN ，可以将所有集合
     * 中某个成员的 最小 score 值作为结果集中该成员的 score 值
     * 而参数 MAX 则是将所有集合中某个成员的 最大 score 值作为结果集中该成员的 score 值
     * @param {string} destination
     * @param {number} numkeys
     * @param {string} key
     * @param {...string[]} args
     * @returns 保存到 destination 的结果集的基数
     * @memberof RedisManger
     */
    async zunionstore(destination, numkeys, key, ...args) {
        return this.redis.zunionstore(destination, numkeys, key, ...args);
    }
    /**
     * ZINTERSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]
     * 计算给定的一个或多个有序集的交集，其中给定 key 的数量必须以 numkeys 参数指定，并将该交集(结果集)储存到 destination
     * 默认情况下，结果集中某个成员的 score 值是所有给定集下该成员 score 值之和
     * 关于 WEIGHTS 和 AGGREGATE 选项的描述，参见 ZUNIONSTORE 命令
     * http://redisdoc.com/sorted_set/zunionstore.html#zunionstore
     * @param {string} destination
     * @param {number} numkeys
     * @param {string} key
     * @param {...string[]} args
     * @returns 保存到 destination 的结果集的基数
     * @memberof RedisManger
     */
    async zinterstore(destination, numkeys, key, ...args) {
        return this.redis.zinterstore(destination, numkeys, key, ...args);
    }
    /**
     * MSET key value [key value ...]
     * 同时设置一个或多个 key-value 对
     * 如果某个给定 key 已经存在，那么 MSET 会用新值覆盖原来的旧值，如果这不是你所希望的效果
     * 请考虑使用 MSETNX 命令：它只会在所有给定 key 都不存在的情况下进行设置操作。
     *
     * MSET 是一个原子性(atomic)操作，所有给定 key 都会在同一时间内被设置
     * 某些给定 key 被更新而另一些给定 key 没有改变的情况，不可能发生。
     * @param {string} key
     * @param {*} value
     * @param {...string[]} args
     * @returns 总是返回 OK (因为 MSET 不可能失败)
     * @memberof RedisManger
     */
    async mset(key, value, ...args) {
        return this.redis.mset(key, value, ...args);
    }
    /**
     * SETEX key seconds value
     * 将值 value 关联到 key ，并将 key 的生存时间设为 seconds (以秒为单位)
     * 如果 key 已经存在， SETEX 命令将覆写旧值
     * SETEX 是一个原子性(atomic)操作，关联值和设置生存时间两个动作会在同一时间内完成，该命令在 Redis 用作缓存时，非常实用
     * @param {string} key
     * @param {number} seconds
     * @param {*} value
     * @returns 设置成功时返回 OK, 当 seconds 参数不合法时，返回一个错误
     * @memberof RedisManger
     */
    async setex(key, seconds, value) {
        return this.redis.setex(key, seconds, value);
    }
    /**
     * MGET key [key ...]
     * 返回所有(一个或多个)给定 key 的值
     * 如果给定的 key 里面，有某个 key 不存在，那么这个 key 返回特殊值 nil 。因此，该命令永不失败
     * @param {...string[]} keys
     * @returns 一个包含所有给定 key 的值的列表
     * @memberof RedisManger
     */
    async mget(...keys) {
        return this.redis.mget(...keys);
    }
    /**
     * LINSERT key BEFORE|AFTER pivot value
     * 将值 value 插入到列表 key 当中，位于值 pivot 之前或之后
     * 当 pivot 不存在于列表 key 时，不执行任何操作
     * 当 key 不存在时， key 被视为空列表，不执行任何操作
     * 如果 key 不是列表类型，返回一个错误
     * @param {string} key
     * @param {('BEFORE' | 'AFTER')} direction
     * @param {string} pivot
     * @param {*} value
     * @returns 如果命令执行成功，返回插入操作完成之后，列表的长度, 如果没有找到 pivot ，返回 -1, 如果 key 不存在或为空列表，返回 0
     * @memberof RedisManger
     */
    async linsert(key, direction, pivot, value) {
        return this.redis.linsert(key, direction, pivot, value);
    }
    /**
     * GEOADD key longitude latitude member [longitude latitude member ...]
     * 将给定的空间元素（纬度、经度、名字）添加到指定的键里面
     * 这些数据会以有序集合的形式被储存在键里面
     * 从而使得像 GEORADIUS 和 GEORADIUSBYMEMBER 这样的命令可以在之后通过位置查询取得这些元素
     * GEOADD 命令以标准的 x,y 格式接受参数， 所以用户必须先输入经度， 然后再输入纬度
     * GEOADD 能够记录的坐标是有限的： 非常接近两极的区域是无法被索引的
     * 精确的坐标限制由 EPSG:900913 / EPSG:3785 / OSGEO:41001 等坐标系统定义
     * 具体如下：
     * 有效的经度介于 -180 度至 180 度之间
     * 有效的纬度介于 -85.05112878 度至 85.05112878 度之间
     * 当用户尝试输入一个超出范围的经度或者纬度时， GEOADD 命令将返回一个错误
     *
     * @param {string} key
     * @param {GEOEntity[]} geoEntity
     * @returns 新添加到键里面的空间元素数量， 不包括那些已经存在但是被更新的元素
     * @memberof RedisManger
     */
    async geoadd(key, geoEntity) {
        const redis = this.redis;
        const geoArray = _.map(geoEntity, (geo) => {
            return _.toArray(geo);
        });
        return redis.geoadd(key, ...geoArray);
    }
    /**
     * GEOPOS key member [member ...]
     * 从键里面返回所有给定位置元素的位置（经度和纬度）
     * 因为 GEOPOS 命令接受可变数量的位置元素作为输入， 所以即使用户只给定了一个位置元素， 命令也会返回数组回复
     * @param {string} key
     * @param {string} member
     * @param {...string[]} members
     * @returns GEOPOS 命令返回一个数组， 数组中的每个项都由两个元素组成： 第一个元素为给定位置元素的经度， 而第二个元素则为给定位置元素的纬度
     * , 当给定的位置元素不存在时， 对应的数组项为空值
     * @memberof RedisManger
     */
    async geopos(key, member, ...members) {
        const redis = this.redis;
        return redis.geopos(key, member, ...members);
    }
    /**
     * GEODIST key member1 member2 [unit]
     * 返回两个给定位置之间的距离
     * 如果两个位置之间的其中一个不存在， 那么命令返回空值
     * 指定单位的参数 unit 必须是以下单位的其中一个
     * m 表示单位为米
     * km 表示单位为千米
     * mi 表示单位为英里
     * ft 表示单位为英尺
     * 如果用户没有显式地指定单位参数， 那么 GEODIST 默认使用米作为单位
     * GEODIST 命令在计算距离时会假设地球为完美的球形， 在极限情况下， 这一假设最大会造成 0.5% 的误差
     * @param {string} key
     * @param {string} member1
     * @param {string} member2
     * @param {('m' | 'km' | 'mi' | 'ft')} [unit='m']
     * @returns 计算出的距离会以双精度浮点数的形式被返回。 如果给定的位置元素不存在， 那么命令返回空值
     * @memberof RedisManger
     */
    async geodist(key, member1, member2, unit = 'm') {
        const redis = this.redis;
        return redis.geodist(key, member1, member2);
    }
    /**
     * GEORADIUS key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [ASC|DESC] [COUNT count]
     * 以给定的经纬度为中心， 返回键包含的位置元素当中， 与中心的距离不超过给定最大距离的所有位置元素
     * 范围可以使用以下其中一个单位：
     * m 表示单位为米
     * km 表示单位为千米
     * mi 表示单位为英里
     * ft 表示单位为英尺
     *
     * 在给定以下可选项时， 命令会返回额外的信息
     * WITHDIST ： 在返回位置元素的同时， 将位置元素与中心之间的距离也一并返回。 距离的单位和用户给定的范围单位保持一致
     * WITHCOORD ： 将位置元素的经度和维度也一并返回
     * WITHHASH ： 以 52 位有符号整数的形式， 返回位置元素经过原始 geohash 编码的有序集合分值。 这个选项主要用于底层应用或者调试， 实际中的作用并不大
     *
     * 命令默认返回未排序的位置元素。 通过以下两个参数， 用户可以指定被返回位置元素的排序方式
     * ASC ： 根据中心的位置， 按照从近到远的方式返回位置元素
     * DESC ： 根据中心的位置， 按照从远到近的方式返回位置元素
     *
     * 在默认情况下， GEORADIUS 命令会返回所有匹配的位置元素。 虽然用户可以使用 COUNT <count> 选项去获取前 N 个匹配元素
     * 但是因为命令在内部可能会需要对所有被匹配的元素进行处理， 所以在对一个非常大的区域进行搜索时
     * 即使只使用 COUNT 选项去获取少量元素， 命令的执行速度也可能会非常慢
     * 但是从另一方面来说， 使用 COUNT 选项去减少需要返回的元素数量， 对于减少带宽来说仍然是非常有用的
     * @param {string} key
     * @param {number} longitude
     * @param {number} latitude
     * @param {number} radius 范围
     * @param {('m' | 'km' | 'mi' | 'ft')} [unit='m']
     * @param {...any[]} args
     * @returns GEORADIUS 命令返回一个数组， 具体来说, 在没有给定任何 WITH 选项的情况下， 命令只会返回一个像 ["New York","Milan","Paris"] 这样的线性（linear）列表。
     * 在指定了 WITHCOORD 、 WITHDIST 、 WITHHASH 等选项的情况下， 命令返回一个二层嵌套数组， 内层的每个子数组就表示一个元素。
     * 在返回嵌套数组时， 子数组的第一个元素总是位置元素的名字。 至于额外的信息， 则会作为子数组的后续元素， 按照以下顺序被返回：
     * 1.以浮点数格式返回的中心与位置元素之间的距离， 单位与用户指定范围时的单位一致。
     * 2.geohash 整数。
     * 3.由两个元素组成的坐标，分别为经度和纬度。
     *
     * 举个例子， GEORADIUS Sicily 15 37 200 km withcoord withdist 这样的命令返回的每个子数组都是类似以下格式的
     * ["Palermo","190.4424",["13.361389338970184","38.115556395496299"]]
     * @memberof RedisManger
     */
    async georadius(key, longitude, latitude, radius, unit = 'm', ...args) {
        const redis = this.redis;
        return redis.georadius(key, longitude, latitude, radius, unit, ...args);
    }
    /**
     * GEOHASH key member [member ...]
     * 返回一个或多个位置元素的 Geohash 表示。
     * @param {string} key
     * @param {string} member
     * @param {...string[]} members
     * @returns 一个数组， 数组的每个项都是一个 geohash 。 命令返回的 geohash 的位置与用户给定的位置元素的位置一一对应。
     * @memberof RedisManger
     */
    async geohash(key, member, ...members) {
        const redis = this.redis;
        return redis.geohash(key, member, ...members);
    }
};
RedisManger = __decorate([
    ioc_1.provide('RedisManger')
], RedisManger);
exports.default = RedisManger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkaXNNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsibWljcm9TZXJ2aWNlcy9SZWRpc01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSxtQ0FBbUM7QUFDbkMsNEJBQTRCO0FBQzVCLDRCQUEwQjtBQUMxQixvQ0FBcUM7QUFFckMseURBQWtEO0FBRWxELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7QUF3VTdDLElBQXFCLFdBQVcsR0FBaEMsTUFBcUIsV0FBVztJQUZoQztRQUdZLFVBQUssR0FBa0Isc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQVMsQ0FBQztJQXM4Q2hGLENBQUM7SUFwOENHOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBVyxFQUFFLEtBQXNCO1FBQ2hELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBUyxDQUFDO0lBQ3hDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVcsRUFBRSxFQUFVO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBVztRQUN4QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRDs7Ozs7Ozs7Ozs7T0FXRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBVztRQUN6QixPQUFPLElBQUksQ0FBQyxLQUFL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LENBQUMsTUFBTSxDQUFDLEdBQVcsRUFBRSxLQUFVLEVBQUUsR0FBRyxJQUFjO1FBQzFELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQVcsRUFBRSxHQUFHLE9BQWM7UUFDNUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFXO1FBQzFCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNEOzs7Ozs7OztPQVFHO0lBQ0ksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQWM7UUFDaEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRDs7Ozs7Ozs7O09BU0c7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQW1CLEVBQUUsR0FBRyxJQUFjO1FBQzFELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNEOzs7Ozs7OztPQVFHO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQWM7UUFDakMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRDs7Ozs7Ozs7O09BU0c7SUFDSSxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQW1CLEVBQUUsR0FBRyxJQUFjO1FBQzNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FB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QUFZLENBQUM7UUFDaEMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0osQ0FBQTtBQXY4Q29CLFdBQVc7SUFGL0IsYUFBTyxDQUFDLGFBQWEsQ0FBQztHQUVGLFdBQVcsQ0F1OEMvQjtrQkF2OENvQixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgSU9SZWRpcyBmcm9tICdpb3JlZGlzJztcbmltcG9ydCAqIGFzIGxvZzRqcyBmcm9tICdrb2EtbG9nNCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuaW1wb3J0IHsgcHJvdmlkZSB9IGZyb20gJy4uL2lvYy9pb2MnO1xuaW1wb3J0IEdFT0VudGl0eSBmcm9tICcuLi9tb2RlbHMvR0VPRW50aXR5JztcbmltcG9ydCBSZWRpc0NvbnRleHQgZnJvbSAnLi4vbW9kZWxzL1JlZGlzQ29udGV4dCc7XG5cbmNvbnN0IF9sb2cgPSBsb2c0anMuZ2V0TG9nZ2VyKCdSZWRpc01hbmdlcicpO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6aW50ZXJmYWNlLW5hbWVcbmludGVyZmFjZSBQaXBlbGluZSB7XG4gICAgcmVkaXM6IElPUmVkaXMuUmVkaXM7XG4gICAgaXNDbHVzdGVyOiBib29sZWFuO1xuICAgIG9wdGlvbnM6IElPUmVkaXMuUmVkaXNPcHRpb25zO1xuICAgIF9xdWV1ZTogSU9SZWRpcy5Db21tYW5kW107XG4gICAgX3Jlc3VsdDogYW55W107XG4gICAgX3RyYW5zYWN0aW9uczogbnVtYmVyO1xuICAgIF9zaGFUb1NjcmlwdDoge307XG4gICAgYml0Y291bnQoa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG4gICAgYml0Y291bnQoa2V5OiBzdHJpbmcsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgZ2V0KGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcbiAgICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIHNldE1vZGU6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBleHBpcnlNb2RlOiBzdHJpbmcsIHRpbWU6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBleHBpcnlNb2RlOiBzdHJpbmcsIHRpbWU6IG51bWJlciwgc2V0TW9kZTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgc2V0QnVmZmVyKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IEJ1ZmZlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuICAgIHNldEJ1ZmZlcihrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgc2V0TW9kZTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IEJ1ZmZlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICBzZXRCdWZmZXIoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGV4cGlyeU1vZGU6IHN0cmluZywgdGltZTogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IEJ1ZmZlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICBzZXRCdWZmZXIoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGV4cGlyeU1vZGU6IHN0cmluZywgdGltZTogbnVtYmVyLCBzZXRNb2RlOiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogQnVmZmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBzZXRueChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHNldGV4KGtleTogc3RyaW5nLCBzZWNvbmRzOiBudW1iZXIsIHZhbHVlOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogYW55KSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBwc2V0ZXgoa2V5OiBzdHJpbmcsIG1pbGxpc2Vjb25kczogbnVtYmVyLCB2YWx1ZTogYW55LCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgYXBwZW5kKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgc3RybGVuKGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgZGVsKC4uLmtleXM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICBleGlzdHMoLi4ua2V5czogc3RyaW5nW10pOiBQaXBlbGluZTtcblxuICAgIHNldGJpdChrZXk6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIsIHZhbHVlOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBnZXRiaXQoa2V5OiBzdHJpbmcsIG9mZnNldDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgc2V0cmFuZ2Uoa2V5OiBzdHJpbmcsIG9mZnNldDogbnVtYmVyLCB2YWx1ZTogYW55LCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgZ2V0cmFuZ2Uoa2V5OiBzdHJpbmcsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgc3Vic3RyKGtleTogc3RyaW5nLCBzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGluY3Ioa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBkZWNyKGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgbWdldCguLi5rZXlzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgcnB1c2goa2V5OiBzdHJpbmcsIC4uLnZhbHVlczogYW55W10pOiBQaXBlbGluZTtcblxuICAgIGxwdXNoKGtleTogc3RyaW5nLCAuLi52YWx1ZXM6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICBycHVzaHgoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBscHVzaHgoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgbGluc2VydChrZXk6IHN0cmluZywgZGlyZWN0aW9uOiAnQkVGT1JFJyB8ICdBRlRFUicsIHBpdm90OiBzdHJpbmcsIHZhbHVlOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBycG9wKGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgbHBvcChrZXk6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGJycG9wKC4uLmtleXM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICBibHBvcCguLi5rZXlzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIGJycG9wbHB1c2goc291cmNlOiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcsIHRpbWVvdXQ6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGxsZW4oa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBsaW5kZXgoa2V5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBsc2V0KGtleTogc3RyaW5nLCBpbmRleDogbnVtYmVyLCB2YWx1ZTogYW55LCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgbHJhbmdlKGtleTogc3RyaW5nLCBzdGFydDogbnVtYmVyLCBzdG9wOiBudW1iZXIsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogYW55KSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBsdHJpbShrZXk6IHN0cmluZywgc3RhcnQ6IG51bWJlciwgc3RvcDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgbHJlbShrZXk6IHN0cmluZywgY291bnQ6IG51bWJlciwgdmFsdWU6IGFueSwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBudW1iZXIpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHJwb3BscHVzaChzb3VyY2U6IHN0cmluZywgZGVzdGluYXRpb246IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHNhZGQoa2V5OiBzdHJpbmcsIC4uLm1lbWJlcnM6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICBzcmVtKGtleTogc3RyaW5nLCAuLi5tZW1iZXJzOiBhbnlbXSk6IFBpcGVsaW5lO1xuXG4gICAgc21vdmUoc291cmNlOiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcsIG1lbWJlcjogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgc2lzbWVtYmVyKGtleTogc3RyaW5nLCBtZW1iZXI6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiAxIHwgMCkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgc2NhcmQoa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBzcG9wKGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuICAgIHNwb3Aoa2V5OiBzdHJpbmcsIGNvdW50OiBudW1iZXIsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogYW55KSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBzcmFuZG1lbWJlcihrZXk6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcbiAgICBzcmFuZG1lbWJlcihrZXk6IHN0cmluZywgY291bnQ6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHNpbnRlciguLi5rZXlzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgc2ludGVyc3RvcmUoZGVzdGluYXRpb246IHN0cmluZywgLi4ua2V5czogc3RyaW5nW10pOiBQaXBlbGluZTtcblxuICAgIHN1bmlvbiguLi5rZXlzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgc3VuaW9uc3RvcmUoZGVzdGluYXRpb246IHN0cmluZywgLi4ua2V5czogc3RyaW5nW10pOiBQaXBlbGluZTtcblxuICAgIHNkaWZmKC4uLmtleXM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICBzZGlmZnN0b3JlKGRlc3RpbmF0aW9uOiBzdHJpbmcsIC4uLmtleXM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICBzbWVtYmVycyhrZXk6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHphZGQoa2V5OiBzdHJpbmcsIC4uLmFyZ3M6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICB6aW5jcmJ5KGtleTogc3RyaW5nLCBpbmNyZW1lbnQ6IG51bWJlciwgbWVtYmVyOiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogYW55KSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICB6cmVtKGtleTogc3RyaW5nLCAuLi5tZW1iZXJzOiBhbnlbXSk6IFBpcGVsaW5lO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIHpyZW1yYW5nZWJ5c2NvcmUoa2V5OiBzdHJpbmcsIG1pbjogbnVtYmVyIHwgc3RyaW5nLCBtYXg6IG51bWJlciB8IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHpyZW1yYW5nZWJ5cmFuayhrZXk6IHN0cmluZywgc3RhcnQ6IG51bWJlciwgc3RvcDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgenVuaW9uc3RvcmUoZGVzdGluYXRpb246IHN0cmluZywgbnVta2V5czogbnVtYmVyLCBrZXk6IHN0cmluZywgLi4uYXJnczogc3RyaW5nW10pOiBQaXBlbGluZTtcblxuICAgIHppbnRlcnN0b3JlKGRlc3RpbmF0aW9uOiBzdHJpbmcsIG51bWtleXM6IG51bWJlciwga2V5OiBzdHJpbmcsIC4uLmFyZ3M6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICB6cmFuZ2Uoa2V5OiBzdHJpbmcsIHN0YXJ0OiBudW1iZXIsIHN0b3A6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgenJhbmdlKGtleTogc3RyaW5nLCBzdGFydDogbnVtYmVyLCBzdG9wOiBudW1iZXIsIHdpdGhTY29yZXM6ICdXSVRIU0NPUkVTJywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHpyZXZyYW5nZShrZXk6IHN0cmluZywgc3RhcnQ6IG51bWJlciwgc3RvcDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICB6cmV2cmFuZ2Uoa2V5OiBzdHJpbmcsIHN0YXJ0OiBudW1iZXIsIHN0b3A6IG51bWJlciwgd2l0aFNjb3JlczogJ1dJVEhTQ09SRVMnLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgenJhbmdlYnlzY29yZShrZXk6IHN0cmluZywgbWluOiBudW1iZXIgfCBzdHJpbmcsIG1heDogbnVtYmVyIHwgc3RyaW5nLCAuLi5hcmdzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgenJldnJhbmdlYnlzY29yZShrZXk6IHN0cmluZywgbWF4OiBudW1iZXIgfCBzdHJpbmcsIG1pbjogbnVtYmVyIHwgc3RyaW5nLCAuLi5hcmdzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIHpjb3VudChrZXk6IHN0cmluZywgbWluOiBudW1iZXIgfCBzdHJpbmcsIG1heDogbnVtYmVyIHwgc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgemNhcmQoa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICB6c2NvcmUoa2V5OiBzdHJpbmcsIG1lbWJlcjogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgenJhbmsoa2V5OiBzdHJpbmcsIG1lbWJlcjogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgenJldnJhbmsoa2V5OiBzdHJpbmcsIG1lbWJlcjogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgaHNldChrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZywgdmFsdWU6IGFueSwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiAwIHwgMSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuICAgIGhzZXRCdWZmZXIoa2V5OiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogQnVmZmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBoc2V0bngoa2V5OiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogMCB8IDEpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGhnZXQoa2V5OiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG4gICAgaGdldEJ1ZmZlcihrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBCdWZmZXIpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGhtc2V0KGtleTogc3RyaW5nLCBmaWVsZDogc3RyaW5nLCB2YWx1ZTogYW55LCAuLi5hcmdzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuICAgIGhtc2V0KGtleTogc3RyaW5nLCBkYXRhOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogMCB8IDEpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGhtZ2V0KGtleTogc3RyaW5nLCAuLi5maWVsZHM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICBoaW5jcmJ5KGtleTogc3RyaW5nLCBmaWVsZDogc3RyaW5nLCBpbmNyZW1lbnQ6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBudW1iZXIpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICBoaW5jcmJ5ZmxvYXQoa2V5OiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcsIGluY3JlbWVudDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgaGRlbChrZXk6IHN0cmluZywgLi4uZmllbGRzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgaGxlbihrZXk6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBudW1iZXIpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGhrZXlzKGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgaHZhbHMoa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogYW55KSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBoZ2V0YWxsKGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgaGV4aXN0cyhrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiAwIHwgMSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgaW5jcmJ5KGtleTogc3RyaW5nLCBpbmNyZW1lbnQ6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBudW1iZXIpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGluY3JieWZsb2F0KGtleTogc3RyaW5nLCBpbmNyZW1lbnQ6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBudW1iZXIpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGRlY3JieShrZXk6IHN0cmluZywgZGVjcmVtZW50OiBudW1iZXIsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBnZXRzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBtc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCAuLi5hcmdzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgbXNldG54KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCAuLi5hcmdzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgcmFuZG9ta2V5KGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBzZWxlY3QoaW5kZXg6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIG1vdmUoa2V5OiBzdHJpbmcsIGRiOiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogMCB8IDEpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHJlbmFtZShrZXk6IHN0cmluZywgbmV3a2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICByZW5hbWVueChrZXk6IHN0cmluZywgbmV3a2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogMCB8IDEpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGV4cGlyZShrZXk6IHN0cmluZywgc2Vjb25kczogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IDAgfCAxKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBwZXhwaXJlKGtleTogc3RyaW5nLCBtaWxsaXNlY29uZHM6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiAwIHwgMSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgZXhwaXJlYXQoa2V5OiBzdHJpbmcsIHRpbWVzdGFtcDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IDAgfCAxKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBwZXhwaXJlYXQoa2V5OiBzdHJpbmcsIG1pbGxpc2Vjb25kc1RpbWVzdGFtcDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IDAgfCAxKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBrZXlzKHBhdHRlcm46IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmdbXSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgZGJzaXplKGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBhdXRoKHBhc3N3b3JkOiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBwaW5nKGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG4gICAgcGluZyhtZXNzYWdlOiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBlY2hvKG1lc3NhZ2U6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHNhdmUoY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGJnc2F2ZShjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgYmdyZXdyaXRlYW9mKGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBzaHV0ZG93bihzYXZlOiAnU0FWRScgfCAnTk9TQVZFJywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGxhc3RzYXZlKGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICB0eXBlKGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgbXVsdGkoY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGV4ZWMoY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQcm9taXNlPGFueT47XG5cbiAgICBkaXNjYXJkKGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogYW55KSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBzeW5jKGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogYW55KSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBmbHVzaGRiKGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBmbHVzaGFsbChjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgc29ydChrZXk6IHN0cmluZywgLi4uYXJnczogc3RyaW5nW10pOiBQaXBlbGluZTtcblxuICAgIGluZm8oY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcbiAgICBpbmZvKHNlY3Rpb246IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHRpbWUoY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIG1vbml0b3IoY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBOb2RlSlMuRXZlbnRFbWl0dGVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICB0dGwoa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBwZXJzaXN0KGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IDAgfCAxKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBzbGF2ZW9mKGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgZGVidWcoLi4uYXJnczogYW55W10pOiBQaXBlbGluZTtcblxuICAgIGNvbmZpZyguLi5hcmdzOiBhbnlbXSk6IFBpcGVsaW5lO1xuXG4gICAgc3Vic2NyaWJlKC4uLmNoYW5uZWxzOiBhbnlbXSk6IFBpcGVsaW5lO1xuXG4gICAgdW5zdWJzY3JpYmUoLi4uY2hhbm5lbHM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICBwc3Vic2NyaWJlKC4uLnBhdHRlcm5zOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgcHVuc3Vic2NyaWJlKC4uLnBhdHRlcm5zOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgcHVibGlzaChjaGFubmVsOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBudW1iZXIpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHdhdGNoKC4uLmtleXM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICB1bndhdGNoKGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBjbHVzdGVyKC4uLmFyZ3M6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICByZXN0b3JlKC4uLmFyZ3M6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICBtaWdyYXRlKC4uLmFyZ3M6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICBkdW1wKGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgb2JqZWN0KHN1YmNvbW1hbmQ6IHN0cmluZywgLi4uYXJnczogYW55W10pOiBQaXBlbGluZTtcblxuICAgIGNsaWVudCguLi5hcmdzOiBhbnlbXSk6IFBpcGVsaW5lO1xuXG4gICAgZXZhbCguLi5hcmdzOiBhbnlbXSk6IFBpcGVsaW5lO1xuXG4gICAgZXZhbHNoYSguLi5hcmdzOiBhbnlbXSk6IFBpcGVsaW5lO1xuXG4gICAgc2NyaXB0KC4uLmFyZ3M6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICBxdWl0KGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBzY2FuKGN1cnNvcjogbnVtYmVyLCAuLi5hcmdzOiBhbnlbXSk6IFBpcGVsaW5lO1xuXG4gICAgc3NjYW4oa2V5OiBzdHJpbmcsIGN1cnNvcjogbnVtYmVyLCAuLi5hcmdzOiBhbnlbXSk6IFBpcGVsaW5lO1xuXG4gICAgaHNjYW4oa2V5OiBzdHJpbmcsIGN1cnNvcjogbnVtYmVyLCAuLi5hcmdzOiBhbnlbXSk6IFBpcGVsaW5lO1xuXG4gICAgenNjYW4oa2V5OiBzdHJpbmcsIGN1cnNvcjogbnVtYmVyLCAuLi5hcmdzOiBhbnlbXSk6IFBpcGVsaW5lO1xuXG4gICAgcGZtZXJnZShkZXN0a2V5OiBzdHJpbmcsIC4uLnNvdXJjZWtleXM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICBwZmFkZChrZXk6IHN0cmluZywgLi4uZWxlbWVudHM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICBwZmNvdW50KC4uLmtleXM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG59XG5cbkBwcm92aWRlKCdSZWRpc01hbmdlcicpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZGlzTWFuZ2VyIHtcbiAgICBwcml2YXRlIHJlZGlzOiBJT1JlZGlzLlJlZGlzID0gUmVkaXNDb250ZXh0LmdldEluc3RhbmNlKCkuZ2V0UmVkaXMoKSBhcyBhbnk7XG5cbiAgICAvKipcbiAgICAgKiDlop7liqDkuIDlgItrZXnot5/lsI3mh4nnmoTlgLwsIOaykuaciemBjuacn+aZgumWk1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0geyhudW1iZXIgfCBzdHJpbmcpfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNldChrZXk6IHN0cmluZywgdmFsdWU6IG51bWJlciB8IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNldChrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5oyJ6YCg6aCG5bqP5Z+36KGM5L2g5Liy5o6l55qE5ZG95LukXG4gICAgICog5ZCE5Yil5ZG95Luk55qE5paH5qqU5o6l5Y+j6KuL5Y+D6ICDXG4gICAgICogQGNsYXNzIFJlZGlzTWFuZ2VyIOmAmeWAi+mhnuWIpeaIluaYr+e2sui3r+aWh+S7tlxuICAgICAqIEByZXR1cm5zIHtJT1JlZGlzLlBpcGVsaW5lfVxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBwaXBlbGluZSgpOiBQaXBlbGluZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnBpcGVsaW5lKCkgYXMgYW55O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorpPkuIDlgItrZXnmnInpgY7mnJ/mmYLplpMg5Zau5L2N5piv56eSXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBleFxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGV4cGlyZShrZXk6IHN0cmluZywgZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5leHBpcmUoa2V5LCBleCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWPluW+l+S4gOWAi2tleeijoemdoueahOizh+aWmVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXQoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuZ2V0KGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOi/lOWbniBrZXkg5omA5YKo5a2Y55qE5YC855qE57G75Z6L44CCXG4gICAgICogbm9uZSAoa2V55LiN5a2Y5ZyoKVxuICAgICAqIHN0cmluZyAo5a2X56ym5LiyKVxuICAgICAqIGxpc3QgKOWIl+ihqClcbiAgICAgKiBzZXQgKOmbhuWQiClcbiAgICAgKiB6c2V0ICjmnInluo/pm4YpXG4gICAgICogaGFzaCAo5ZOI5biM6KGoKVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB0eXBlKGtleTogc3RyaW5nKTogUHJvbWlzZTwnbm9uZScgfCAnc3RyaW5nJyB8ICdsaXN0JyB8ICdzZXQnIHwgJ3pzZXQnIHwgJ2hhc2gnPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnR5cGUoa2V5KSBhcyBhbnk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWwhiBrZXkg5Lit5YKo5a2Y55qE5pWw5a2X5YC85aKe5LiA44CCXG4gICAgICog5aaC5p6cIGtleSDkuI3lrZjlnKjvvIzpgqPkuYgga2V5IOeahOWAvOS8muWFiOiiq+WIneWni+WMluS4uiAwIO+8jOeEtuWQjuWGjeaJp+ihjFxuICAgICAqIOWmguaenOWAvOWMheWQq+mUmeivr+eahOexu+Wei++8jOaIluWtl+espuS4suexu+Wei+eahOWAvOS4jeiDveihqOekuuS4uuaVsOWtl++8jOmCo+S5iOi/lOWbnuS4gOS4qumUmeivr1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBpbmNyKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmluY3Ioa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Yiq6Zmk6YCZ5YCLa2V55YyF5ZCr6KOh6Z2i55qE5pW45YC8XG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0ga2V5c1xuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGRlbCguLi5rZXlzOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5kZWwoLi4ua2V5cyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOafpeipoumAmeWAi2tleeacieaykuacieWtmOWcqFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBleGlzdHMoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuZXhpc3RzKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuk+mAmeWAi2tleeaMgeS5heWMlizkuI3orpPlroPpgY7mnJ9cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcGVyc2lzdChrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5wZXJzaXN0KGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS7peenkuS4uuWNleS9je+8jOi/lOWbnue7meWumiBrZXkg55qE5Ymp5L2Z55Sf5a2Y5pe26Ze0KFRUTCwgdGltZSB0byBsaXZlKeOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB0dGwoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMudHRsKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWwhue7meWumiBrZXkg55qE5YC86K6+5Li6IHZhbHVlIO+8jOW5tui/lOWbniBrZXkg55qE5pen5YC8KG9sZCB2YWx1ZSnjgIJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsoc3RyaW5nIHwgbnVtYmVyKX0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXRzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuZ2V0c2V0KGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlj6rmnInlnKgga2V5IOS4jeWtmOWcqOaXtuiuvue9riBrZXkg55qE5YC844CCXG4gICAgICpcbiAgICAgKiDorr7nva7miJDlip/vvIzov5Tlm54gMSDjgIJcbiAgICAgKiDorr7nva7lpLHotKXvvIzov5Tlm54gMCDjgIJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsoc3RyaW5nIHwgbnVtYmVyKX0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzZXRueChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bWJlcik6IFByb21pc2U8MCB8IDE+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc2V0bngoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOi/lOWbniBrZXkg5omA5YKo5a2Y55qE5a2X56ym5Liy5YC855qE6ZW/5bqm44CCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHN0cmxlbihrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zdHJsZW4oa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCGIGtleSDmiYDlgqjlrZjnmoTlgLzliqDkuIrnu5nlrprnmoTmta7ngrnlop7ph4/lgLzvvIhpbmNyZW1lbnQpXG4gICAgICog5aaC5p6cIGtleSDkuI3lrZjlnKjvvIzpgqPkuYgga2V5IOeahOWAvOS8muWFiOiiq+WIneWni+WMluS4uiAwIO+8jOeEtuWQjuWGjeaJp+ihjFxuICAgICAqIOWmguaenOWAvOWMheWQq+mUmeivr+eahOexu+Wei++8jOaIluWtl+espuS4suexu+Wei+eahOWAvOS4jeiDveihqOekuuS4uuaVsOWtl++8jOmCo+S5iOi/lOWbnuS4gOS4qumUmeivr1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5jcmVtZW50XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaW5jcmJ5ZmxvYXQoa2V5OiBzdHJpbmcsIGluY3JlbWVudDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmluY3JieWZsb2F0KGtleSwgaW5jcmVtZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCGIGtleSDkuK3lgqjlrZjnmoTmlbDlrZflgLzlh4/kuIDjgIJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZGVjcihrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5kZWNyKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGtleSDmiYDlgqjlrZjnmoTlgLzlh4/ljrvnu5nlrprnmoTlh4/ph4/lgLzvvIhkZWNyZW1lbnQpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGRlY3JieShrZXk6IHN0cmluZywgdmFsdWU6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5kZWNyYnkoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWmguaenCBrZXkg5bey57uP5a2Y5Zyo5bm25LiU5piv5LiA5Liq5a2X56ym5Liy77yMIEFQUEVORCDlkb3ku6TlsIbmjIflrprnmoQgdmFsdWUg6L+95Yqg5Yiw6K+lIGtleSDljp/mnaXlgLzvvIh2YWx1Ze+8ieeahOacq+WwvuOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBhcHBlbmQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKDpmaTpgJnlgItrZXnoo6HpnaLkuIDkuKrmiJblpJrkuKpIYXNoTWFw5a2X5q61XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBoZGVsQXJyYXkoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5oZGVsKGtleSwgLi4udmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKDpmaTpgJnlgItrZXnoo6HpnaLkuIDkuKrmiJblpJrkuKpIYXNoTWFw5a2X5q61XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBoZGVsKGtleTogc3RyaW5nLCAuLi52YWx1ZTogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaGRlbChrZXksIC4uLnZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5p+l55yLSGFzaE1hcCBrZXkg5Lit77yM5oyH5a6a55qE5a2X5q615piv5ZCm5a2Y5Zyo44CCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGhleGlzdHMoa2V5OiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaGV4aXN0cyhrZXksIGZpZWxkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+Wa2V55LitIOWtmOWCqOWcqEhhc2hNYXDkuK3mjIflrprlrZfmrrXnmoTlgLxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaGdldChrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5oZ2V0KGtleSwgZmllbGQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5blnKhIYXNoTWFw5Lit5oyH5a6aIGtleSDnmoTmiYDmnInlrZfmrrXlkozlgLxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaGdldGFsbChrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5oZ2V0YWxsKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS4ukhhc2hNYXAga2V5IOS4reeahOaMh+WummZpZWxk55qE5pW05pWw5YC85Yqg5LiK5aKe6YePIHZhbHVlIOaVtOaVuFxuICAgICAqIOWmguaenCBrZXkg5LiN5a2Y5Zyo77yM6YKj5LmIIGtleSDnmoTlgLzkvJrlhYjooqvliJ3lp4vljJbkuLogMCDvvIznhLblkI7lho3miafooYxcbiAgICAgKiDlpoLmnpzlgLzljIXlkKvplJnor6/nmoTnsbvlnovvvIzmiJblrZfnrKbkuLLnsbvlnovnmoTlgLzkuI3og73ooajnpLrkuLrmlbDlrZfvvIzpgqPkuYjov5Tlm57kuIDkuKrplJnor69cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaGluY3JieShrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZywgdmFsdWU6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5oaW5jcmJ5KGtleSwgZmllbGQsIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Li6SGFzaE1hcCBrZXkg5Lit55qE5oyH5a6aZmllbGTnmoTmlbTmlbDlgLzliqDkuIrlop7ph48gdmFsdWUg5rWu6bue5pW4XG4gICAgICog5aaC5p6cIGtleSDkuI3lrZjlnKjvvIzpgqPkuYgga2V5IOeahOWAvOS8muWFiOiiq+WIneWni+WMluS4uiAwIO+8jOeEtuWQjuWGjeaJp+ihjFxuICAgICAqIOWmguaenOWAvOWMheWQq+mUmeivr+eahOexu+Wei++8jOaIluWtl+espuS4suexu+Wei+eahOWAvOS4jeiDveihqOekuuS4uuaVsOWtl++8jOmCo+S5iOi/lOWbnuS4gOS4qumUmeivr1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBoaW5jcmJ5ZmxvYXQoa2V5OiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaGluY3JieWZsb2F0KGtleSwgZmllbGQsIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Y+W5b6X6YCZ5YCLSGFzaE1hcCBrZXnkuK3miYDmnInnmoRmaWVsZHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaGtleXMoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaGtleXMoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+WSGFzaE1hcOS4rWZpZWxkc+eahOaVsOmHj1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBobGVuKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmhsZW4oa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+W5omA5pyJ5oyH5a6aRmllbGRz55qE5YC8XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGZpZWxkXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaG1nZXQoa2V5OiBzdHJpbmcsIC4uLmZpZWxkOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5obWdldChrZXksIC4uLmZpZWxkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+W5omA5pyJ5oyH5a6aRmllbGRz55qE5YC8XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGZpZWxkc1xuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGhtZ2V0QXJyYXkoa2V5OiBzdHJpbmcsIGZpZWxkczogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaG1nZXQoa2V5LCAuLi5maWVsZHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBITVNFVCBrZXkgZmllbGQxIHZhbHVlMSBbZmllbGQyIHZhbHVlMiBdXG4gICAgICog5ZCM5pe25bCG5aSa5LiqIGZpZWxkLXZhbHVlIChmaWVsZDEtdmFsdWUxKXNldOWIsGhhc2hNYXAga2V5IOS4rVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gYXJnc1xuICAgICAqIEByZXR1cm5zIHsoUHJvbWlzZTwwIHwgMT4pfVxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBobXNldChrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZywgdmFsdWU6IGFueSwgLi4uYXJnczogc3RyaW5nW10pOiBQcm9taXNlPDAgfCAxPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmhtc2V0KGtleSwgZmllbGQsIHZhbHVlLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSE1TRVQga2V5IGZpZWxkMSB2YWx1ZTEgW2ZpZWxkMiB2YWx1ZTIgXVxuICAgICAqIOWQjOaXtuWwhuWkmuS4qiBmaWVsZC12YWx1ZSAoZmllbGQxLXZhbHVlMSlzZXTliLBoYXNoTWFwIGtleSDkuK1cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHthbnlbXX0gZmllbGRzXG4gICAgICogQHJldHVybnMgeyhQcm9taXNlPDAgfCAxPil9XG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGhtc2V0QXJyYXkoa2V5OiBzdHJpbmcsIGZpZWxkczogYW55W10pOiBQcm9taXNlPDAgfCAxPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmhtc2V0KGtleSwgZmllbGRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSE1TRVQga2V5IGZpZWxkMSB2YWx1ZTEgW2ZpZWxkMiB2YWx1ZTIgXVxuICAgICAqIOWQjOaXtuWwhuWkmuS4qiBmaWVsZC12YWx1ZSAoZmllbGQxLXZhbHVlMSlzZXTliLBoYXNoTWFwIGtleSDkuK1cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHthbnl9IG9ialxuICAgICAqIEByZXR1cm5zIHsoUHJvbWlzZTwwIHwgMT4pfVxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBobXNldE9iamVjdChrZXk6IHN0cmluZywgb2JqOiBhbnkpOiBQcm9taXNlPDAgfCAxPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmhtc2V0KGtleSwgb2JqKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSFNFVCBrZXkgZmllbGQgdmFsdWVcbiAgICAgKiDlsIZoYXNoTWFwIGtleSDkuK3nmoTlrZfmrrUgZmllbGQg55qE5YC86K6+5Li6IHZhbHVlIOOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaHNldChrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5oc2V0KGtleSwgZmllbGQsIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSFNFVE5YIGtleSBmaWVsZCB2YWx1ZVxuICAgICAqIOWPquacieWcqCBmaWVsZCDkuI3lrZjlnKjml7bvvIzorr7nva5oYXNoTWFwIGZpZWxkIOeahCB2YWx1ZeOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaHNldG54KGtleTogc3RyaW5nLCBmaWVsZDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmhzZXRueChrZXksIGZpZWxkLCB2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhWQUxTIGtleVxuICAgICAqIOiOt+WPlmhhc2hNYXDkuK3miYDmnInnmoTlgLxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaHZhbHMoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaHZhbHMoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQkxQT1Aga2V5MSBba2V5MiBdXG4gICAgICog56e75Ye65bm26I635Y+W5YiX6KGo55qE56ys5LiA5Liq5YWD57Sg77yMIOWmguaenOWIl+ihqOayoeacieWFg+e0oOS8mumYu+WhnuWIl+ihqOebtOWIsOetieW+hei2heaXtuaIluWPkeeOsOWPr+W8ueWHuuWFg+e0oOS4uuatolxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGJscG9wKC4uLmtleTogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuYmxwb3AoLi4ua2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQkxQT1Aga2V5MSBba2V5MiBdXG4gICAgICog56e75Ye65bm26I635Y+W5YiX6KGo55qE56ys5LiA5Liq5YWD57Sg77yMIOWmguaenOWIl+ihqOayoeacieWFg+e0oOS8mumYu+WhnuWIl+ihqOebtOWIsOetieW+hei2heaXtuaIluWPkeeOsOWPr+W8ueWHuuWFg+e0oOS4uuatolxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGJscG9wQXJyYXkoa2V5OiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5ibHBvcCguLi5rZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCUlBPUCBrZXkxIFtrZXkyIF1cbiAgICAgKiDnp7vlh7rlubbojrflj5bliJfooajnmoTmnIDlkI7kuIDkuKrlhYPntKDvvIwg5aaC5p6c5YiX6KGo5rKh5pyJ5YWD57Sg5Lya6Zi75aGe5YiX6KGo55u05Yiw562J5b6F6LaF5pe25oiW5Y+R546w5Y+v5by55Ye65YWD57Sg5Li65q2i44CCXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgYnJwb3AoLi4ua2V5OiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5icnBvcCguLi5rZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSUE9QIGtleVxuICAgICAqIOenu+WHuuW5tuiOt+WPluWIl+ihqOeahOacgOWQjuS4gOS4quWFg+e0oO+8jCDlpoLmnpzliJfooajmsqHmnInlhYPntKDkuI3mnIPpmLvloZ5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcnBvcChrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5ycG9wKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJSUE9QIGtleTEgW2tleTIgXVxuICAgICAqIOenu+WHuuW5tuiOt+WPluWIl+ihqOeahOacgOWQjuS4gOS4quWFg+e0oO+8jCDlpoLmnpzliJfooajmsqHmnInlhYPntKDkvJrpmLvloZ7liJfooajnm7TliLDnrYnlvoXotoXml7bmiJblj5HnjrDlj6/lvLnlh7rlhYPntKDkuLrmraLjgIJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBicnBvcEFycmF5KGtleTogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuYnJwb3AoLi4ua2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQlJQT1BMUFVTSCBzb3VyY2UgZGVzdGluYXRpb24gdGltZW91dFxuICAgICAqIOS7juWIl+ihqOS4reW8ueWHuuS4gOS4quWAvO+8jOWwhuW8ueWHuueahOWFg+e0oOaPkuWFpeWIsOWPpuWkluS4gOS4quWIl+ihqOS4reW5tui/lOWbnuWug++8myDlpoLmnpzliJfooajmsqHmnInlhYPntKDkvJrpmLvloZ7liJfooajnm7TliLDnrYnlvoXotoXml7bmiJblj5HnjrDlj6/lvLnlh7rlhYPntKDkuLrmraLjgIJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc291cmNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVvdXRcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBicnBvcGxwdXNoKHNvdXJjZTogc3RyaW5nLCBkZXN0aW5hdGlvbjogc3RyaW5nLCB0aW1lb3V0OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuYnJwb3BscHVzaChzb3VyY2UsIGRlc3RpbmF0aW9uLCB0aW1lb3V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTElOREVYIGtleSBpbmRleFxuICAgICAqIOmAmui/h2luZGV46I635Y+WbGlzdOS4reeahOWFg+e0oFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBsaW5kZXgoa2V5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMubGluZGV4KGtleSwgaW5kZXgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMTEVOIGtleVxuICAgICAqIOiOt+WPluWIl+ihqOmVv+W6plxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBsbGVuKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmxsZW4oa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTFBPUCBrZXlcbiAgICAgKiDnp7vlh7rlubbojrflj5bliJfooajnmoTnrKzkuIDkuKrlhYPntKAsIOWmguaenOWIl+ihqOayoeacieWFg+e0oOS4jeacg+mYu+WhnlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBscG9wKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmxwb3Aoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTFBVU0gga2V5IHZhbHVlMSwgdmFsdWUyLCB2YWx1ZTMuLi5cbiAgICAgKiDlsIbkuIDkuKrmiJblpJrkuKrlgLzmj5LlhaXliLDliJfooajpoK3pg6hcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsuLi5hbnlbXX0gdmFsdWVzXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgbHB1c2goa2V5OiBzdHJpbmcsIC4uLnZhbHVlczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMubHB1c2goa2V5LCB2YWx1ZXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMUFVTSCBrZXkgW3ZhbHVlMSwgdmFsdWUyXVxuICAgICAqIOWwhuS4gOS4quaIluWkmuS4quWAvOaPkuWFpeWIsOWIl+ihqOmgremDqFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge2FueVtdfSB2YWx1ZXNcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBscHVzaEFycmF5KGtleTogc3RyaW5nLCB2YWx1ZXM6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmxwdXNoKGtleSwgLi4udmFsdWVzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUlBVU0gga2V5IHZhbHVlMSwgdmFsdWUyLCB2YWx1ZTMuLi5cbiAgICAgKiDlsIbkuIDkuKrmiJblpJrkuKrlgLzmj5LlhaXliLDliJfooajlsL7nq69cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsuLi5hbnlbXX0gdmFsdWVzXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcnB1c2goa2V5OiBzdHJpbmcsIC4uLnZhbHVlczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMucnB1c2goa2V5LCB2YWx1ZXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSUFVTSCBrZXkgW3ZhbHVlMSwgdmFsdWUyXVxuICAgICAqIOWwhuS4gOS4quaIluWkmuS4quWAvOaPkuWFpeWIsOWIl+ihqOWwvuerr1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge2FueVtdfSB2YWx1ZXNcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBycHVzaEFycmF5KGtleTogc3RyaW5nLCB2YWx1ZXM6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnJwdXNoKGtleSwgLi4udmFsdWVzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTFJBTkdFIGtleSBzdGFydCBzdG9wXG4gICAgICog6I635Y+W5YiX6KGoc3RhcnQgaW5kZXgg5Yiwc3RvcCBpbmRleOS5i+mWk+iMg+WbtOWGheeahOWFg+e0oFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RvcFxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGxyYW5nZShrZXk6IHN0cmluZywgc3RhcnQ6IG51bWJlciwgc3RvcDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmxyYW5nZShrZXksIHN0YXJ0LCBzdG9wKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTFJFTSBrZXkgY291bnQgdmFsdWVcbiAgICAgKiDnp7vpmaTliJfooajlhYPntKBcbiAgICAgKiDmoLnmja7lj4LmlbAgY291bnQg55qE5YC877yM56e76Zmk5YiX6KGo5Lit5LiO5Y+C5pWwIHZhbHVlIOebuOetieeahOWFg+e0oOOAglxuICAgICAqIGNvdW50IOeahOWAvOWPr+S7peaYr+S7peS4i+WHoOenje+8mlxuICAgICAqIGNvdW50ID4gMCA6IOS7juihqOWktOW8gOWni+WQkeihqOWwvuaQnOe0ou+8jOenu+mZpOS4jiB2YWx1ZSDnm7jnrYnnmoTlhYPntKDvvIzmlbDph4/kuLogY291bnQg44CCXG4gICAgICogY291bnQgPCAwIDog5LuO6KGo5bC+5byA5aeL5ZCR6KGo5aS05pCc57Si77yM56e76Zmk5LiOIHZhbHVlIOebuOetieeahOWFg+e0oO+8jOaVsOmHj+S4uiBjb3VudCDnmoTnu53lr7nlgLzjgIJcbiAgICAgKiBjb3VudCA9IDAgOiDnp7vpmaTooajkuK3miYDmnInkuI4gdmFsdWUg55u4562J55qE5YC844CCXG4gICAgICpcbiAgICAgKiDov5Tlm57liIbmiJDlhannqK5cbiAgICAgKiAxLuiiq+enu+mZpOWFg+e0oOeahOaVsOmHj+OAglxuICAgICAqIDIu5Zug5Li65LiN5a2Y5Zyo55qEIGtleSDooqvop4bkvZznqbrooagoZW1wdHkgbGlzdCnvvIzmiYDku6XlvZMga2V5IOS4jeWtmOWcqOaXtu+8jCBMUkVNIOWRveS7pOaAu+aYr+i/lOWbniAwIOOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY291bnRcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgbHJlbShrZXk6IHN0cmluZywgY291bnQ6IG51bWJlciwgdmFsdWU6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5scmVtKGtleSwgY291bnQsIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCN5LiA5YCLbGlzdCjntJTmlbjlrZcp5YGaQVND5o6S5bqPXG4gICAgICog5LiN5pyD5bCN55W25YmN55qEa2V56KOh6Z2i55qEbGlzdOWBmuaOkuW6j+WEsuWtmFxuICAgICAqIOWwseaYr+iqquatpOaTjeS9nOWPquaciee1puS9oOeahOe1kOaenOaYr3NvcnQs5a+m6Zqb5LiKa2V56KOh6Z2i5Lim5rKS5pyJ55yf5q2j6KKrc29ydFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBsaXN0U29ydE51bWJlckFTQyhrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zb3J0KGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWwjeS4gOWAi2xpc3Qo57SU5pW45a2XKeWBmkRFU0PmjpLluo9cbiAgICAgKiDkuI3mnIPlsI3nlbbliY3nmoRrZXnoo6HpnaLnmoRsaXN05YGa5o6S5bqP5YSy5a2YXG4gICAgICog5bCx5piv6Kqq5q2k5pON5L2c5Y+q5pyJ57Wm5L2g55qE57WQ5p6c5pivc29ydCzlr6bpmpvkuIprZXnoo6HpnaLkuKbmspLmnInnnJ/mraPooqtzb3J0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGxpc3RTb3J0TnVtYmVyREVTQyhrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zb3J0KGtleSwgJ2Rlc2MnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCN5LiA5YCLbGlzdCjntJRzdHJpbmcp5YGaQVND5o6S5bqPXG4gICAgICog5LiN5pyD5bCN55W25YmN55qEa2V56KOh6Z2i55qEbGlzdOWBmuaOkuW6j+WEsuWtmFxuICAgICAqIOWwseaYr+iqquatpOaTjeS9nOWPquaciee1puS9oOeahOe1kOaenOaYr3NvcnQs5a+m6Zqb5LiKa2V56KOh6Z2i5Lim5rKS5pyJ55yf5q2j6KKrc29ydFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBsaXN0U29ydFN0cmluZ0FTQyhrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zb3J0KGtleSwgJ0FMUEhBJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHNvcnQg5Y+v5Lul5YGa5b6I6KSH6Zuc55qE5pON5L2cICwg5aaC5p6c5LiN5aSg556t6Kej55uh6YeP5LiN6KaB542o56uL5L2/55SoXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGFyZ3NcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzb3J0KGtleTogc3RyaW5nLCAuLi5hcmdzOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zb3J0KGtleSwgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExTRVQga2V5IGluZGV4IHZhbHVlXG4gICAgICog6YCa6L+HaW5kZXjorr7nva5saXN0W2luZGV4XeeahHZhbHVlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBsc2V0KGtleTogc3RyaW5nLCBpbmRleDogbnVtYmVyLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmxzZXQoa2V5LCBpbmRleCwgdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMVFJJTSBrZXkgc3RhcnQgc3RvcFxuICAgICAqIOWvueS4gOS4quWIl+ihqOi/m+ihjOS/ruWJqih0cmltKe+8jOWwseaYr+ivtO+8jOiuqeWIl+ihqOWPquS/neeVmeaMh+WumuWMuumXtOWGheeahOWFg+e0oO+8jOS4jeWcqOaMh+WumuWMuumXtOS5i+WGheeahOWFg+e0oOmDveWwhuiiq+WIoOmZpOOAglxuICAgICAqIOS9oOS5n+WPr+S7peS9v+eUqOi0n+aVsOS4i+agh++8jOS7pSAtMSDooajnpLrliJfooajnmoTmnIDlkI7kuIDkuKrlhYPntKDvvIwgLTIg6KGo56S65YiX6KGo55qE5YCS5pWw56ys5LqM5Liq5YWD57Sg77yM5Lul5q2k57G75o6o44CCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdG9wXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgbHRyaW0oa2V5OiBzdHJpbmcsIHN0YXJ0OiBudW1iZXIsIHN0b3A6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5sdHJpbShrZXksIHN0YXJ0LCBzdG9wKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUlBPUExQVVNIIHNvdXJjZSBkZXN0aW5hdGlvblxuICAgICAqIOenu+mZpOWIl+ihqOeahOacgOWQjuS4gOS4quWFg+e0oO+8jOW5tuWwhuivpeWFg+e0oOa3u+WKoOWIsOWPpuS4gOS4quWIl+ihqOW5tui/lOWbnlxuICAgICAqIOWwhuWIl+ihqCBzb3VyY2Ug5Lit55qE5pyA5ZCO5LiA5Liq5YWD57SgKOWwvuWFg+e0oCnlvLnlh7rvvIzlubbov5Tlm57nu5nlrqLmiLfnq6/jgIJcbiAgICAgKiDlsIYgc291cmNlIOW8ueWHuueahOWFg+e0oOaPkuWFpeWIsOWIl+ihqCBkZXN0aW5hdGlvbiDvvIzkvZzkuLogZGVzdGluYXRpb24g5YiX6KGo55qE55qE5aS05YWD57Sg44CCXG4gICAgICog5aaC5p6cIHNvdXJjZSDkuI3lrZjlnKjvvIzlgLwgbmlsIOiiq+i/lOWbnu+8jOW5tuS4lOS4jeaJp+ihjOWFtuS7luWKqOS9nOOAglxuICAgICAqIOWmguaenCBzb3VyY2UgPT09IGRlc3RpbmF0aW9uIOebuOWQjO+8jOWImeWIl+ihqOS4reeahOihqOWwvuWFg+e0oOiiq+enu+WKqOWIsOihqOWktO+8jOW5tui/lOWbnuivpeWFg+e0oO+8jOWPr+S7peaKiui/meenjeeJueauiuaDheWGteinhuS9nOWIl+ihqOeahOaXi+i9rChyb3RhdGlvbinmk43kvZzjgIJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc291cmNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcnBvcGxwdXNoKHNvdXJjZTogc3RyaW5nLCBkZXN0aW5hdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnJwb3BscHVzaChzb3VyY2UsIGRlc3RpbmF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUlBVU0hYIGtleSB2YWx1ZVxuICAgICAqIOS4uuW3suWtmOWcqOeahOWIl+ihqCDliqDliLDooajlsL5cbiAgICAgKiDlvZMga2V5IOS4jeWtmOWcqOaXtu+8jOS7gOS5iOS5n+S4jeWBmlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcnB1c2h4KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnJwdXNoeChrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTFBVU0hYIGtleSB2YWx1ZVxuICAgICAqIOS4uuW3suWtmOWcqOeahOWIl+ihqCDliqDliLDooajpoK1cbiAgICAgKiDlvZMga2V5IOS4jeWtmOWcqOaXtu+8jOS7gOS5iOS5n+S4jeWBmlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgbHB1c2h4KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmxwdXNoeChrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCGIGtleSDmiYDlgqjlrZjnmoTlgLzliqDkuIrnu5nlrprnmoTlop7ph4/lgLzvvIhpbmNyZW1lbnQpXG4gICAgICog5aaC5p6cIGtleSDkuI3lrZjlnKjvvIzpgqPkuYgga2V5IOeahOWAvOS8muWFiOiiq+WIneWni+WMluS4uiAwIO+8jOeEtuWQjuWGjeaJp+ihjFxuICAgICAqIOWmguaenOWAvOWMheWQq+mUmeivr+eahOexu+Wei++8jOaIluWtl+espuS4suexu+Wei+eahOWAvOS4jeiDveihqOekuuS4uuaVsOWtl++8jOmCo+S5iOi/lOWbnuS4gOS4qumUmeivr1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5jcmVtZW50XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaW5jcmJ5KGtleTogc3RyaW5nLCBpbmNyZW1lbnQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5pbmNyYnkoa2V5LCBpbmNyZW1lbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNU0VUTlgga2V5IHZhbHVlIFtrZXkgdmFsdWUgLi4uXVxuICAgICAqIOWQjOaXtuiuvue9ruS4gOS4quaIluWkmuS4qiBrZXktdmFsdWUg5a+577yM5Lim5LiU5Y+q5pyJ55W25omA5pyJ57uZ5a6aIGtleSDpg73kuI3lrZjlnKjmiY3mnIPln7fooYzjgIJcbiAgICAgKiDljbPkvb/lj6rmnInkuIDkuKrnu5nlrpoga2V5IOW3suWtmOWcqO+8jCBNU0VUTlgg5Lmf5Lya5ouS57ud5omn6KGM5omA5pyJ57uZ5a6aIGtleSDnmoTorr7nva7mk43kvZzjgIJcbiAgICAgKiBNU0VUTlgg5piv5Y6f5a2Q5oCn55qEXG4gICAgICog5Zug5q2k5a6D5Y+v5Lul55So5L2c6K6+572u5aSa5Liq5LiN5ZCMIGtleSDooajnpLrkuI3lkIzlrZfmrrUoZmllbGQp55qE5ZSv5LiA5oCn6YC76L6R5a+56LGhKHVuaXF1ZSBsb2dpYyBvYmplY3QpXG4gICAgICog5omA5pyJ5a2X5q616KaB5LmI5YWo6KKr6K6+572u77yM6KaB5LmI5YWo5LiN6KKr6K6+572u44CCXG4gICAgICpcbiAgICAgKiDlvZPmiYDmnIkga2V5IOmDveaIkOWKn+iuvue9ru+8jOi/lOWbniAxIOOAglxuICAgICAqIOWmguaenOaJgOaciee7meWumiBrZXkg6YO96K6+572u5aSx6LSlKOiHs+WwkeacieS4gOS4qiBrZXkg5bey57uP5a2Y5ZyoKe+8jOmCo+S5iOi/lOWbniAwIOOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gYXJnc1xuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIG1zZXRueChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgLi4uYXJnczogc3RyaW5nW10pOiBQcm9taXNlPDAgfCAxPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLm1zZXRueChrZXksIHZhbHVlLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU0FERCBrZXkgbWVtYmVyIFttZW1iZXIgLi4uXVxuICAgICAqIOWwhuS4gOS4quaIluWkmuS4qiBtZW1iZXIg5YWD57Sg5Yqg5YWl5Yiw6ZuG5ZCIIGtleSDlvZPkuK3vvIzlt7Lnu4/lrZjlnKjkuo7pm4blkIjnmoQgbWVtYmVyIOWFg+e0oOWwhuiiq+W/veeVpVxuICAgICAqIOWBh+WmgiBrZXkg5LiN5a2Y5Zyo77yM5YiZ5Yib5bu65LiA5Liq5Y+q5YyF5ZCrIG1lbWJlciDlhYPntKDkvZzmiJDlkZjnmoTpm4blkIhcbiAgICAgKiDlvZMga2V5IOS4jeaYr+mbhuWQiOexu+Wei+aXtu+8jOi/lOWbnuS4gOS4qumUmeivr1xuICAgICAqXG4gICAgICog6L+U5ZueXG4gICAgICog6KKr5re75Yqg5Yiw6ZuG5ZCI5Lit55qE5paw5YWD57Sg55qE5pWw6YeP77yM5LiN5YyF5ous6KKr5b+955Wl55qE5YWD57SgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Li4uYW55W119IG1lbWJlcnNcbiAgICAgKiBAcmV0dXJucyB7KFByb21pc2U8YW55Pil9XG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNhZGQoa2V5OiBzdHJpbmcsIC4uLm1lbWJlcnM6IGFueVtdKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc2FkZChrZXksIC4uLm1lbWJlcnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTQ0FSRCBrZXlcbiAgICAgKiDov5Tlm57pm4blkIgga2V5IOeahOWfuuaVsCjpm4blkIjkuK3lhYPntKDnmoTmlbDph48pXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNjYXJkKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNjYXJkKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNESUZGIGtleSBba2V5IC4uLl1cbiAgICAgKiDmr5TovIPlhanlgItTZXTpm4blkIjkuK3nmoTlt67nlbAs6L+U5Zue5beu55WwXG4gICAgICog6L+U5Zue5LiA5Liq6ZuG5ZCI55qE5YWo6YOo5oiQ5ZGY77yM6K+l6ZuG5ZCI5piv5omA5pyJ57uZ5a6a6ZuG5ZCI5LmL6Ze055qE5beu6ZuG44CCXG4gICAgICog5LiN5a2Y5Zyo55qEIGtleSDooqvop4bkuLrnqbrpm4bjgIJcbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBrZXlzXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2RpZmYoLi4ua2V5czogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc2RpZmYoLi4ua2V5cyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNESUZGU1RPUkUgZGVzdGluYXRpb24ga2V5IFtrZXkgLi4uXVxuICAgICAqIOi/meS4quWRveS7pOeahOS9nOeUqOWSjCBTRElGRiDnsbvkvLzvvIzkvYblroPlsIbnu5Pmnpzkv53lrZjliLAgZGVzdGluYXRpb24g6ZuG5ZCI77yM6ICM5LiN5piv566A5Y2V5Zyw6L+U5Zue57uT5p6c6ZuGXG4gICAgICog5aaC5p6cIGRlc3RpbmF0aW9uIOmbhuWQiOW3sue7j+WtmOWcqO+8jOWImeWwhuWFtuimhuebllxuICAgICAqIGRlc3RpbmF0aW9uIOWPr+S7peaYryDoh6rlt7Hopobok4voh6rlt7FcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb25cbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBrZXlzXG4gICAgICogQHJldHVybnMg57uT5p6c6ZuG5Lit55qE5YWD57Sg5pWw6YePXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNkaWZmc3RvcmUoZGVzdGluYXRpb246IHN0cmluZywgLi4ua2V5czogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc2RpZmZzdG9yZShkZXN0aW5hdGlvbiwgLi4ua2V5cyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNJTlRFUiBrZXkgW2tleSAuLi5dXG4gICAgICog6L+U5Zue5LiA5Liq6ZuG5ZCI55qE5YWo6YOo5oiQ5ZGY77yM6K+l6ZuG5ZCI5piv5omA5pyJ57uZ5a6a6ZuG5ZCI55qE5Lqk6ZuGXG4gICAgICog5LiN5a2Y5Zyo55qEIGtleSDooqvop4bkuLrnqbrpm4ZcbiAgICAgKiDlvZPnu5nlrprpm4blkIjlvZPkuK3mnInkuIDkuKrnqbrpm4bml7bvvIznu5PmnpzkuZ/kuLrnqbrpm4Yo5qC55o2u6ZuG5ZCI6L+Q566X5a6a5b6LKVxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGtleXNcbiAgICAgKiBAcmV0dXJucyDkuqTpm4bmiJDlkZjnmoTliJfooahcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2ludGVyKC4uLmtleXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNpbnRlciguLi5rZXlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU0lOVEVSU1RPUkUgZGVzdGluYXRpb24ga2V5IFtrZXkgLi4uXVxuICAgICAqIOi/meS4quWRveS7pOexu+S8vOS6jiBTSU5URVIg5ZG95Luk77yM5L2G5a6D5bCG57uT5p6c5L+d5a2Y5YiwIGRlc3RpbmF0aW9uIOmbhuWQiO+8jOiAjOS4jeaYr+eugOWNleWcsOi/lOWbnue7k+aenOmbhlxuICAgICAqIOWmguaenCBkZXN0aW5hdGlvbiDpm4blkIjlt7Lnu4/lrZjlnKjvvIzliJnlsIblhbbopobnm5ZcbiAgICAgKiBkZXN0aW5hdGlvbiDlj6/ku6XmmK8g6Ieq5bex6KaG6JOL6Ieq5bexXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0ga2V5c1xuICAgICAqIEByZXR1cm5zIHsgUHJvbWlzZTxudW1iZXI+fSDnu5Pmnpzpm4bkuK3nmoTmiJDlkZjmlbDph49cbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2ludGVyc3RvcmUoZGVzdGluYXRpb246IHN0cmluZywgLi4ua2V5czogc3RyaW5nW10pOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zaW50ZXJzdG9yZShkZXN0aW5hdGlvbiwgLi4ua2V5cyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNJU01FTUJFUiBrZXkgbWVtYmVyXG4gICAgICog5Yik5patIG1lbWJlciDlhYPntKDmmK/lkKbpm4blkIgga2V5IOeahOaIkOWRmFxuICAgICAqXG4gICAgICog5aaC5p6cIG1lbWJlciDlhYPntKDmmK/pm4blkIjnmoTmiJDlkZjvvIzov5Tlm54gMVxuICAgICAqIOWmguaenCBtZW1iZXIg5YWD57Sg5LiN5piv6ZuG5ZCI55qE5oiQ5ZGY77yM5oiWIGtleSDkuI3lrZjlnKjvvIzov5Tlm54gMFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVtYmVyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8MCB8IDE+fVxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzaXNtZW1iZXIoa2V5OiBzdHJpbmcsIG1lbWJlcjogc3RyaW5nKTogUHJvbWlzZTwwIHwgMT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zaXNtZW1iZXIoa2V5LCBtZW1iZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTTUVNQkVSUyBrZXlcbiAgICAgKiDov5Tlm57pm4blkIgga2V5IOS4reeahOaJgOacieaIkOWRmFxuICAgICAqIOS4jeWtmOWcqOeahCBrZXkg6KKr6KeG5Li656m66ZuG5ZCIXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zIOmbhuWQiOS4reeahOaJgOacieaIkOWRmFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzbWVtYmVycyhrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zbWVtYmVycyhrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTTU9WRSBzb3VyY2UgZGVzdGluYXRpb24gbWVtYmVyXG4gICAgICog5bCGIG1lbWJlciDlhYPntKDku44gc291cmNlIOmbhuWQiOenu+WKqOWIsCBkZXN0aW5hdGlvbiDpm4blkIhcbiAgICAgKiBTTU9WRSDmmK/ljp/lrZDmgKfmk43kvZxcbiAgICAgKiDlpoLmnpwgc291cmNlIOmbhuWQiOS4jeWtmOWcqOaIluS4jeWMheWQq+aMh+WumueahCBtZW1iZXIg5YWD57Sg77yM5YiZIFNNT1ZFIOWRveS7pOS4jeaJp+ihjOS7u+S9leaTjeS9nO+8jOS7hei/lOWbniAwXG4gICAgICog5ZCm5YiZ77yMIG1lbWJlciDlhYPntKDku44gc291cmNlIOmbhuWQiOS4reiiq+enu+mZpO+8jOW5tua3u+WKoOWIsCBkZXN0aW5hdGlvbiDpm4blkIjkuK3ljrtcbiAgICAgKiDlvZMgZGVzdGluYXRpb24g6ZuG5ZCI5bey57uP5YyF5ZCrIG1lbWJlciDlhYPntKDml7bvvIwgU01PVkUg5ZG95Luk5Y+q5piv566A5Y2V5Zyw5bCGIHNvdXJjZSDpm4blkIjkuK3nmoQgbWVtYmVyIOWFg+e0oOWIoOmZpFxuICAgICAqIOW9kyBzb3VyY2Ug5oiWIGRlc3RpbmF0aW9uIOS4jeaYr+mbhuWQiOexu+WeiyhTZXQp5pe277yM6L+U5Zue5LiA5Liq6ZSZ6K+vXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZW1iZXJcbiAgICAgKiBAcmV0dXJucyDlpoLmnpwgbWVtYmVyIOWFg+e0oOiiq+aIkOWKn+enu+mZpO+8jOi/lOWbnlxuICAgICAqICAgICAgICAgIOWmguaenCBtZW1iZXIg5YWD57Sg5LiN5pivIHNvdXJjZSDpm4blkIjnmoTmiJDlkZjvvIzlubbkuJTmsqHmnInku7vkvZXmk43kvZzlr7kgZGVzdGluYXRpb24g6ZuG5ZCI5omn6KGM77yM6YKj5LmI6L+U5ZueIDBcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc21vdmUoc291cmNlOiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcsIG1lbWJlcjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNtb3ZlKHNvdXJjZSwgZGVzdGluYXRpb24sIG1lbWJlcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNQT1Aga2V5IGNvdW50P1xuICAgICAqIOenu+mZpOW5tui/lOWbnumbhuWQiOS4reeahCBjb3VudCDkuKrpmo/mnLrlhYPntKBcbiAgICAgKiDlpoLmnpzkuI3ovLjlhaVjb3VudOWwseaYr+maqOapn+S4gOWAi+WFg+e0oFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2NvdW50XVxuICAgICAqIEByZXR1cm5zIOiiq+enu+mZpOeahOmaj+acuuWFg+e0oFxuICAgICAqICAgICAgICAgIOW9kyBrZXkg5LiN5a2Y5Zyo5oiWIGtleSDmmK/nqbrpm4bml7bvvIzov5Tlm54gbmlsXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNwb3Aoa2V5OiBzdHJpbmcsIGNvdW50PzogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNwb3Aoa2V5LCBjb3VudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNSQU5ETUVNQkVSIGtleSBjb3VudD9cbiAgICAgKiDlpoLmnpzlkb3ku6TmiafooYzml7bvvIzlj6rmj5DkvpvkuoYga2V5IOWPguaVsO+8jOmCo+S5iOi/lOWbnumbhuWQiOS4reeahOS4gOS4qumaj+acuuWFg+e0oFxuICAgICAqIOS7jiBSZWRpcyAyLjYg54mI5pys5byA5aeL77yMIFNSQU5ETUVNQkVSIOWRveS7pOaOpeWPl+WPr+mAieeahCBjb3VudCDlj4LmlbBcbiAgICAgKiDlpoLmnpwgY291bnQg5Li65q2j5pWw77yM5LiU5bCP5LqO6ZuG5ZCI5Z+65pWw77yM6YKj5LmI5ZG95Luk6L+U5Zue5LiA5Liq5YyF5ZCrIGNvdW50IOS4quWFg+e0oOeahOaVsOe7hFxuICAgICAqIOaVsOe7hOS4reeahOWFg+e0oOWQhOS4jeebuOWQjOOAguWmguaenCBjb3VudCDlpKfkuo7nrYnkuo7pm4blkIjln7rmlbDvvIzpgqPkuYjov5Tlm57mlbTkuKrpm4blkIhcbiAgICAgKlxuICAgICAqIOWmguaenCBjb3VudCDkuLrotJ/mlbDvvIzpgqPkuYjlkb3ku6Tov5Tlm57kuIDkuKrmlbDnu4TvvIzmlbDnu4TkuK3nmoTlhYPntKDlj6/og73kvJrph43lpI3lh7rnjrDlpJrmrKFcbiAgICAgKiDogIzmlbDnu4TnmoTplb/luqbkuLogY291bnQg55qE57ud5a+55YC8XG4gICAgICpcbiAgICAgKiDor6Xmk43kvZzlkowgU1BPUCDnm7jkvLzvvIzkvYYgU1BPUCDlsIbpmo/mnLrlhYPntKDku47pm4blkIjkuK3np7vpmaTlubbov5Tlm55cbiAgICAgKiDogIwgU1JBTkRNRU1CRVIg5YiZ5LuF5LuF6L+U5Zue6ZqP5py65YWD57Sg77yM6ICM5LiN5a+56ZuG5ZCI6L+b6KGM5Lu75L2V5pS55YqoXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbY291bnQ/XVxuICAgICAqIEByZXR1cm5zIOWPquaPkOS+myBrZXkg5Y+C5pWw5pe277yM6L+U5Zue5LiA5Liq5YWD57Sg77yb5aaC5p6c6ZuG5ZCI5Li656m677yM6L+U5ZueIG5pbFxuICAgICAqIOWmguaenOaPkOS+m+S6hiBjb3VudCDlj4LmlbDvvIzpgqPkuYjov5Tlm57kuIDkuKrmlbDnu4TvvJvlpoLmnpzpm4blkIjkuLrnqbrvvIzov5Tlm57nqbrmlbDnu4RcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc3JhbmRtZW1iZXIoa2V5OiBzdHJpbmcsIGNvdW50PzogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNyYW5kbWVtYmVyKGtleSwgY291bnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTUkVNIGtleSBtZW1iZXIgW21lbWJlciAuLi5dXG4gICAgICog56e76Zmk6ZuG5ZCIIGtleSDkuK3nmoTkuIDkuKrmiJblpJrkuKogbWVtYmVyIOWFg+e0oO+8jOS4jeWtmOWcqOeahCBtZW1iZXIg5YWD57Sg5Lya6KKr5b+955WlXG4gICAgICog5b2TIGtleSDkuI3mmK/pm4blkIjnsbvlnosoU2V0Ke+8jOi/lOWbnuS4gOS4qumUmeivr1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0gey4uLmFueVtdfSBtZW1iZXJzXG4gICAgICogQHJldHVybnMg6KKr5oiQ5Yqf56e76Zmk55qE5YWD57Sg55qE5pWw6YeP77yM5LiN5YyF5ous6KKr5b+955Wl55qE5YWD57SgXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNyZW0oa2V5OiBzdHJpbmcsIC4uLm1lbWJlcnM6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNyZW0oa2V5LCAuLi5tZW1iZXJzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU1VOSU9OIGtleSBba2V5IC4uLl1cbiAgICAgKiDov5Tlm57kuIDkuKrpm4blkIjnmoTlhajpg6jmiJDlkZjvvIzor6Xpm4blkIjmmK/miYDmnInnu5nlrprpm4blkIjnmoTlubbpm4ZcbiAgICAgKiDkuI3lrZjlnKjnmoQga2V5IOiiq+inhuS4uuepuumbhlxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGtleXNcbiAgICAgKiBAcmV0dXJucyDlubbpm4bmiJDlkZjnmoTliJfooahcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc3VuaW9uKC4uLmtleXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnN1bmlvbiguLi5rZXlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU1VOSU9OU1RPUkUgZGVzdGluYXRpb24ga2V5IFtrZXkgLi4uXVxuICAgICAqIOi/meS4quWRveS7pOexu+S8vOS6jiBTVU5JT04g5ZG95Luk77yM5L2G5a6D5bCG57uT5p6c5L+d5a2Y5YiwIGRlc3RpbmF0aW9uIOmbhuWQiO+8jOiAjOS4jeaYr+eugOWNleWcsOi/lOWbnue7k+aenOmbhlxuICAgICAqIOWmguaenCBkZXN0aW5hdGlvbiDlt7Lnu4/lrZjlnKjvvIzliJnlsIblhbbopobnm5ZcbiAgICAgKiBkZXN0aW5hdGlvbiDlj6/ku6XmmK8ga2V5IOiHquW3seimhuiTi+acrOi6q1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvblxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGtleXNcbiAgICAgKiBAcmV0dXJucyDnu5Pmnpzpm4bkuK3nmoTlhYPntKDmlbDph49cbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc3VuaW9uc3RvcmUoZGVzdGluYXRpb246IHN0cmluZywgLi4ua2V5czogc3RyaW5nW10pOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zdW5pb25zdG9yZShkZXN0aW5hdGlvbiwgLi4ua2V5cyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBTVUJTQ1JJQkUgcGF0dGVybiBbcGF0dGVybiAuLi5dXG4gICAgICog6K6i6ZiF5LiA5Liq5oiW5aSa5Liq56ym5ZCI57uZ5a6a5qih5byP55qE6aKR6YGTXG4gICAgICog5q+P5Liq5qih5byP5LulICog5L2c5Li65Yy56YWN56ym77yM5q+U5aaCIGl0KiDljLnphY3miYDmnInku6UgaXQg5byA5aS055qE6aKR6YGTKCBpdC5uZXdzIOOAgSBpdC5ibG9nIOOAgSBpdC50d2VldHMg562J562JKVxuICAgICAqIG5ld3MuKiDljLnphY3miYDmnInku6UgbmV3cy4g5byA5aS055qE6aKR6YGTKCBuZXdzLml0IOOAgSBuZXdzLmdsb2JhbC50b2RheSDnrYnnrYkp77yM6K+45aaC5q2k57G7XG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gcGF0dGVybnNcbiAgICAgKiBAcmV0dXJucyDmjqXmlLbliLDnmoTkv6Hmga9cbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcHN1YnNjcmliZSguLi5wYXR0ZXJuczogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMucHN1YnNjcmliZSguLi5wYXR0ZXJucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBVQkxJU0ggY2hhbm5lbCBtZXNzYWdlXG4gICAgICog5bCG5L+h5oGvIG1lc3NhZ2Ug5Y+R6YCB5Yiw5oyH5a6a55qE6aKR6YGTIGNoYW5uZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHJldHVybnMg5o6l5pS25Yiw5L+h5oGvIG1lc3NhZ2Ug55qE6K6i6ZiF6ICF5pWw6YePXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHB1Ymxpc2goY2hhbm5lbDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMucHVibGlzaChjaGFubmVsLCBtZXNzYWdlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUFVOU1VCU0NSSUJFIFtwYXR0ZXJuIFtwYXR0ZXJuIC4uLl1dXG4gICAgICog5oyH56S65a6i5oi356uv6YCA6K6i5omA5pyJ57uZ5a6a5qih5byPXG4gICAgICog5aaC5p6c5rKh5pyJ5qih5byP6KKr5oyH5a6a77yM5Lmf5Y2z5piv77yM5LiA5Liq5peg5Y+C5pWw55qEIFBVTlNVQlNDUklCRSDosIPnlKjooqvmiafooYwg6YKj5LmI5a6i5oi356uv5L2/55SoIFBTVUJTQ1JJQkUg5ZG95Luk6K6i6ZiF55qE5omA5pyJ5qih5byP6YO95Lya6KKr6YCA6K6i44CCXG4gICAgICog5Zyo6L+Z56eN5oOF5Ya15LiL77yM5ZG95Luk5Lya6L+U5Zue5LiA5Liq5L+h5oGv77yM5ZGK55+l5a6i5oi356uv5omA5pyJ6KKr6YCA6K6i55qE5qih5byPXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gcGF0dGVybnNcbiAgICAgKiBAcmV0dXJucyDov5nkuKrlkb3ku6TlnKjkuI3lkIznmoTlrqLmiLfnq6/kuK3mnInkuI3lkIznmoTooajnjrBcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcHVuc3Vic2NyaWJlKC4uLnBhdHRlcm5zOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5wdW5zdWJzY3JpYmUoLi4ucGF0dGVybnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTVUJTQ1JJQkUgY2hhbm5lbCBbY2hhbm5lbCAuLi5dXG4gICAgICog6K6i6ZiF57uZ5a6a55qE5LiA5Liq5oiW5aSa5Liq6aKR6YGT55qE5L+h5oGvXG4gICAgICogQHBhcmFtIHsuLi5hbnlbXX0gY2hhbm5lbHNcbiAgICAgKiBAcmV0dXJucyDmjqXmlLbliLDnmoTkv6Hmga8g5Y+D6ICDIGh0dHA6Ly9yZWRpc2RvYy5jb20vcHViX3N1Yi9zdWJzY3JpYmUuaHRtbFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzdWJzY3JpYmUoLi4uY2hhbm5lbHM6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnN1YnNjcmliZSguLi5jaGFubmVscyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVOU1VCU0NSSUJFIFtjaGFubmVsIFtjaGFubmVsIC4uLl1dXG4gICAgICog5oyH56S65a6i5oi356uv6YCA6K6i57uZ5a6a55qE6aKR6YGTXG4gICAgICog5aaC5p6c5rKh5pyJ6aKR6YGT6KKr5oyH5a6a77yM5Lmf5Y2z5piv77yM5LiA5Liq5peg5Y+C5pWw55qEIFVOU1VCU0NSSUJFIOiwg+eUqOiiq+aJp+ihjO+8jOmCo+S5iOWuouaIt+err+S9v+eUqCBTVUJTQ1JJQkUg5ZG95Luk6K6i6ZiF55qE5omA5pyJ6aKR6YGT6YO95Lya6KKr6YCA6K6i44CCXG4gICAgICog5Zyo6L+Z56eN5oOF5Ya15LiL77yM5ZG95Luk5Lya6L+U5Zue5LiA5Liq5L+h5oGv77yM5ZGK55+l5a6i5oi356uv5omA5pyJ6KKr6YCA6K6i55qE6aKR6YGTXG4gICAgICogQHBhcmFtIHsuLi5hbnlbXX0gY2hhbm5lbHNcbiAgICAgKiBAcmV0dXJucyDov5nkuKrlkb3ku6TlnKjkuI3lkIznmoTlrqLmiLfnq6/kuK3mnInkuI3lkIznmoTooajnjrBcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgdW5zdWJzY3JpYmUoLi4uY2hhbm5lbHM6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnVuc3Vic2NyaWJlKC4uLmNoYW5uZWxzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV0FUQ0gga2V5IFtrZXkgLi4uXVxuICAgICAqIOebkeinhuS4gOS4qijmiJblpJrkuKopIGtleSDvvIzlpoLmnpzlnKjkuovliqHmiafooYzkuYvliY3ov5nkuKoo5oiW6L+Z5LqbKSBrZXkg6KKr5YW25LuW5ZG95Luk5omA5pS55Yqo77yM6YKj5LmI5LqL5Yqh5bCG6KKr5omT5patXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0ga2V5c1xuICAgICAqIEByZXR1cm5zIOaAu+aYr+i/lOWbniBPS1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB3YXRjaCguLi5rZXlzOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy53YXRjaCguLi5rZXlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVU5XQVRDSFxuICAgICAqIOWPlua2iCBXQVRDSCDlkb3ku6Tlr7nmiYDmnIkga2V5IOeahOebkeinhlxuICAgICAqIOWmguaenOWcqOaJp+ihjCBXQVRDSCDlkb3ku6TkuYvlkI7vvIwgRVhFQyDlkb3ku6TmiJYgRElTQ0FSRCDlkb3ku6TlhYjooqvmiafooYzkuobnmoTor53vvIzpgqPkuYjlsLHkuI3pnIDopoHlho3miafooYwgVU5XQVRDSCDkuoZcbiAgICAgKiDlm6DkuLogRVhFQyDlkb3ku6TkvJrmiafooYzkuovliqHvvIzlm6DmraQgV0FUQ0gg5ZG95Luk55qE5pWI5p6c5bey57uP5Lqn55Sf5LqGXG4gICAgICpcbiAgICAgKiDogIwgRElTQ0FSRCDlkb3ku6TlnKjlj5bmtojkuovliqHnmoTlkIzml7bkuZ/kvJrlj5bmtojmiYDmnInlr7kga2V5IOeahOebkeinhlxuICAgICAqIOWboOatpOi/meS4pOS4quWRveS7pOaJp+ihjOS5i+WQju+8jOWwseayoeacieW/heimgeaJp+ihjCBVTldBVENIIOS6hlxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHVud2F0Y2goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnVud2F0Y2goKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRVhFQ1xuICAgICAqIOaJp+ihjOaJgOacieS6i+WKoeWdl+WGheeahOWRveS7pFxuICAgICAqIOWBh+WmguafkOS4qijmiJbmn5DkupspIGtleSDmraPlpITkuo4gV0FUQ0gg5ZG95Luk55qE55uR6KeG5LmL5LiL77yM5LiU5LqL5Yqh5Z2X5Lit5pyJ5ZKM6L+Z5LiqKOaIlui/meS6mykga2V5IOebuOWFs+eahOWRveS7pFxuICAgICAqIOmCo+S5iCBFWEVDIOWRveS7pOWPquWcqOi/meS4qijmiJbov5nkupspIGtleSDmsqHmnInooqvlhbbku5blkb3ku6TmiYDmlLnliqjnmoTmg4XlhrXkuIvmiafooYzlubbnlJ/mlYjvvIzlkKbliJnor6XkuovliqHooqvmiZPmlq0oYWJvcnQpXG4gICAgICogQHJldHVybnMg5LqL5Yqh5Z2X5YaF5omA5pyJ5ZG95Luk55qE6L+U5Zue5YC877yM5oyJ5ZG95Luk5omn6KGM55qE5YWI5ZCO6aG65bqP5o6S5YiXXG4gICAgICog5b2T5pON5L2c6KKr5omT5pat5pe277yM6L+U5Zue56m65YC8IG5pbFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBleGVjKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5leGVjKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVYRUNcbiAgICAgKiDmiafooYzmiYDmnInkuovliqHlnZflhoXnmoTlkb3ku6RcbiAgICAgKiDlgYflpoLmn5DkuKoo5oiW5p+Q5LqbKSBrZXkg5q2j5aSE5LqOIFdBVENIIOWRveS7pOeahOebkeinhuS5i+S4i++8jOS4lOS6i+WKoeWdl+S4reacieWSjOi/meS4qijmiJbov5nkupspIGtleSDnm7jlhbPnmoTlkb3ku6RcbiAgICAgKiDpgqPkuYggRVhFQyDlkb3ku6Tlj6rlnKjov5nkuKoo5oiW6L+Z5LqbKSBrZXkg5rKh5pyJ6KKr5YW25LuW5ZG95Luk5omA5pS55Yqo55qE5oOF5Ya15LiL5omn6KGM5bm255Sf5pWI77yM5ZCm5YiZ6K+l5LqL5Yqh6KKr5omT5patKGFib3J0KVxuICAgICAqIEBwYXJhbSB7KGVycjogRXJyb3IsIHJlczogYW55KSA9PiB2b2lkfSBjYWxsYmFja1xuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGV4ZWNQaXBlbGluZShjYWxsYmFjazogKGVycjogRXJyb3IsIHJlczogYW55KSA9PiB2b2lkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmV4ZWMoY2FsbGJhY2spO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBESVNDQVJEXG4gICAgICog5Y+W5raI5LqL5Yqh77yM5pS+5byD5omn6KGM5LqL5Yqh5Z2X5YaF55qE5omA5pyJ5ZG95LukXG4gICAgICog5aaC5p6c5q2j5Zyo5L2/55SoIFdBVENIIOWRveS7pOebkeinhuafkOS4qijmiJbmn5DkupspIGtlee+8jOmCo+S5iOWPlua2iOaJgOacieebkeinhu+8jOetieWQjOS6juaJp+ihjOWRveS7pCBVTldBVENIXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZGlzY2FyZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuZGlzY2FyZCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAoY2x1c3RlcuaooeW8j+S4i+eEoeazleS9v+eUqOmAmeWAiykpXG4gICAgICogTVVMVElcbiAgICAgKiDmoIforrDkuIDkuKrkuovliqHlnZfnmoTlvIDlp4tcbiAgICAgKiDkuovliqHlnZflhoXnmoTlpJrmnaHlkb3ku6TkvJrmjInnhaflhYjlkI7pobrluo/ooqvmlL7ov5vkuIDkuKrpmJ/liJflvZPkuK3vvIzmnIDlkI7nlLEgRVhFQyDlkb3ku6Tljp/lrZDmgKcoYXRvbWljKeWcsOaJp+ihjFxuICAgICAqIEBwYXJhbSB7eyBwaXBlbGluZTogZmFsc2UgfX0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIG11bHRpKG9wdGlvbnM6IHsgcGlwZWxpbmU6IGZhbHNlIH0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMubXVsdGkob3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIChjbHVzdGVy5qih5byP5LiL5Y+q6IO95L2/55So6YCZ5YCLKSlcbiAgICAgKiAoUGlwZWxpbmUpXG4gICAgICogTVVMVElcbiAgICAgKiDmoIforrDkuIDkuKrkuovliqHlnZfnmoTlvIDlp4tcbiAgICAgKiDkuovliqHlnZflhoXnmoTlpJrmnaHlkb3ku6TkvJrmjInnhaflhYjlkI7pobrluo/ooqvmlL7ov5vkuIDkuKrpmJ/liJflvZPkuK3vvIzmnIDlkI7nlLEgRVhFQyDlkb3ku6Tljp/lrZDmgKcoYXRvbWljKeWcsOaJp+ihjFxuICAgICAqIEBwYXJhbSB7eyBwaXBlbGluZTogZmFsc2UgfX0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIG11bHRpUGlwZWxpbmUoY29tbWFuZHM/OiBzdHJpbmdbXVtdLCBvcHRpb25zPzogSU9SZWRpcy5NdWx0aU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMubXVsdGkoY29tbWFuZHMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBaQUREIGtleSBzY29yZSBtZW1iZXIgW1tzY29yZSBtZW1iZXJdIFtzY29yZSBtZW1iZXJdIC4uLl1cbiAgICAgKiDlsIbkuIDkuKrmiJblpJrkuKogbWVtYmVyIOWFg+e0oOWPiuWFtiBzY29yZSDlgLzliqDlhaXliLDmnInluo/pm4Yga2V5IOW9k+S4rVxuICAgICAqIOWmguaenOafkOS4qiBtZW1iZXIg5bey57uP5piv5pyJ5bqP6ZuG55qE5oiQ5ZGY77yM6YKj5LmI5pu05paw6L+Z5LiqIG1lbWJlciDnmoQgc2NvcmUg5YC877yM5bm26YCa6L+H6YeN5paw5o+S5YWl6L+Z5LiqIG1lbWJlciDlhYPntKDvvIzmnaXkv53or4Hor6UgbWVtYmVyIOWcqOato+ehrueahOS9jee9ruS4ilxuICAgICAqIHNjb3JlIOWAvOWPr+S7peaYr+aVtOaVsOWAvOaIluWPjOeyvuW6pua1rueCueaVsFxuICAgICAqIOWmguaenGtleeS4jeWtmOWcqO+8jOWJh+WJteW7uuS4gOWAi+epuueahOacieW6j+mbhuS4puWft+ihjFpBRETmk43kvZxcbiAgICAgKiDnlbZrZXnlrZjlnKjkvYbkuI3mmK/mnInluo/pm4bpoZ7lnovmmYLvvIzov5Tlm57kuIDlgIvpjK/oqqRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gYXJnc1xuICAgICAqIEByZXR1cm5zIOiiq+aIkOWKn+a3u+WKoOeahOaWsOaIkOWRmOeahOaVsOmHj++8jOS4jeWMheaLrOmCo+S6m+iiq+abtOaWsOeahOOAgeW3sue7j+WtmOWcqOeahOaIkOWRmFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB6YWRkKGtleTogc3RyaW5nLCAuLi5hcmdzOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy56YWRkKGtleSwgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFpDQVJEIGtleVxuICAgICAqIOi/lOWbnuacieW6j+mbhiBrZXkg55qE5Z+65pWwXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnMg5b2TIGtleSDlrZjlnKjkuJTmmK/mnInluo/pm4bnsbvlnovml7bvvIzov5Tlm57mnInluo/pm4bnmoTln7rmlbAsIOW9kyBrZXkg5LiN5a2Y5Zyo5pe277yM6L+U5ZueIDBcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgemNhcmQoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuemNhcmQoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogWkNPVU5UIGtleSBtaW4gbWF4XG4gICAgICog6L+U5Zue5pyJ5bqP6ZuGIGtleSDkuK3vvIwgc2NvcmUg5YC85ZyoIG1pbiDlkowgbWF4IOS5i+mXtCjpu5jorqTljIXmi6wgc2NvcmUg5YC8562J5LqOIG1pbiDmiJYgbWF4ICnnmoTmiJDlkZjnmoTmlbDph49cbiAgICAgKiDlhbPkuo7lj4LmlbAgbWluIOWSjCBtYXgg55qE6K+m57uG5L2/55So5pa55rOV77yM6K+35Y+C6ICDIFpSQU5HRUJZU0NPUkUg5ZG95LukXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7KG51bWJlciB8IHN0cmluZyl9IG1pblxuICAgICAqIEBwYXJhbSB7KG51bWJlciB8IHN0cmluZyl9IG1heFxuICAgICAqIEByZXR1cm5zIHNjb3JlIOWAvOWcqCBtaW4g5ZKMIG1heCDkuYvpl7TnmoTmiJDlkZjnmoTmlbDph49cbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgemNvdW50KGtleTogc3RyaW5nLCBtaW46IG51bWJlciB8IHN0cmluZywgbWF4OiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuemNvdW50KGtleSwgbWluLCBtYXgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBaSU5DUkJZIGtleSBpbmNyZW1lbnQgbWVtYmVyXG4gICAgICog54K65pyJ5bqP6ZuGa2V555qE5oiQ5ZOhbWVtYmVy55qEc2NvcmXlgLzliqDkuIrlop7ph49pbmNyZW1lbnRcbiAgICAgKiDlj6/ku6XpgJrov4fkvKDpgJLkuIDkuKrotJ/mlbDlgLwgaW5jcmVtZW50IO+8jOiuqSBzY29yZSDlh4/ljrvnm7jlupTnmoTlgLzvvIzmr5TlpoIgWklOQ1JCWSBrZXkgLTUgbWVtYmVyIO+8jOWwseaYr+iuqSBtZW1iZXIg55qEIHNjb3JlIOWAvOWHj+WOuyA1XG4gICAgICog5b2TIGtleSDkuI3lrZjlnKjvvIzmiJYgbWVtYmVyIOS4jeaYryBrZXkg55qE5oiQ5ZGY5pe277yMIFpJTkNSQlkga2V5IGluY3JlbWVudCBtZW1iZXIg562J5ZCM5LqOIFpBREQga2V5IGluY3JlbWVudCBtZW1iZXJcbiAgICAgKiDnlbZrZXnkuI3mmK/mnInluo/pm4bpoZ7lnovmmYLvvIzov5Tlm57kuIDlgIvpjK/oqqRcbiAgICAgKiBpbmNyZW1lbnQg5YC85Y+v5Lul5piv5pW05pW45YC85oiW6ZuZ57K+5bqm5rWu6bue5pW4XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmNyZW1lbnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVtYmVyXG4gICAgICogQHJldHVybnMgbWVtYmVy5oiQ5ZOh55qE5pawc2NvcmXlgLzvvIzku6XlrZfnrKbkuLLlvaLlvI/ooajnpLpcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgemluY3JieShrZXk6IHN0cmluZywgaW5jcmVtZW50OiBudW1iZXIsIG1lbWJlcjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnppbmNyYnkoa2V5LCBpbmNyZW1lbnQsIG1lbWJlcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFpSQU5HRSBrZXkgc3RhcnQgc3RvcFxuICAgICAqIOi/lOWbnuacieW6j+mbhiBrZXkg5Lit77yM5oyH5a6a5Yy66Ze05YaF55qE5oiQ5ZGYXG4gICAgICog5YW25Lit5oiQ5ZGY55qE5L2N572u5oyJIHNjb3JlIOWAvOmAkuWinijku47lsI/liLDlpKcp5p2l5o6S5bqPXG4gICAgICog5YW35pyJ55u45ZCMIHNjb3JlIOWAvOeahOaIkOWRmOaMieWtl+WFuOW6jyhsZXhpY29ncmFwaGljYWwgb3JkZXIgKeadpeaOkuWIlyBodHRwczovL3poLndpa2lwZWRpYS5vcmcvd2lraS8lRTUlQUQlOTclRTUlODUlQjglRTUlQkElOEZcbiAgICAgKiDlpoLmnpzkvaDpnIDopoHmiJDlkZjmjIkgc2NvcmUg5YC86YCS5YePKOS7juWkp+WIsOWwjynmnaXmjpLliJfvvIzor7fkvb/nlKggWlJFVlJBTkdFIOWRveS7pFxuICAgICAqIOS4i+agh+WPguaVsCBzdGFydCDlkowgc3RvcCDpg73ku6UgMCDkuLrlupXvvIzkuZ/lsLHmmK/or7TvvIzku6UgMCDooajnpLrmnInluo/pm4bnrKzkuIDkuKrmiJDlkZjvvIzku6UgMSDooajnpLrmnInluo/pm4bnrKzkuozkuKrmiJDlkZjvvIzku6XmraTnsbvmjqhcbiAgICAgKiDkvaDkuZ/lj6/ku6Xkvb/nlKjotJ/mlbDkuIvmoIfvvIzku6UgLTEg6KGo56S65pyA5ZCO5LiA5Liq5oiQ5ZGY77yMIC0yIOihqOekuuWAkuaVsOesrOS6jOS4quaIkOWRmO+8jOS7peatpOexu+aOqFxuICAgICAqIOi2heWHuuiMg+WbtOeahOS4i+agh+W5tuS4jeS8muW8lei1t+mUmeivr1xuICAgICAqXG4gICAgICog5q+U5aaC6K+077yM5b2TIHN0YXJ0IOeahOWAvOavlOacieW6j+mbhueahOacgOWkp+S4i+agh+i/mOimgeWkp++8jOaIluaYryBzdGFydCA+IHN0b3Ag5pe277yMIFpSQU5HRSDlkb3ku6Tlj6rmmK/nroDljZXlnLDov5Tlm57kuIDkuKrnqbrliJfooahcbiAgICAgKiDlj6bkuIDmlrnpnaLvvIzlgYflpoIgc3RvcCDlj4LmlbDnmoTlgLzmr5TmnInluo/pm4bnmoTmnIDlpKfkuIvmoIfov5jopoHlpKfvvIzpgqPkuYggUmVkaXMg5bCGIHN0b3Ag5b2T5L2c5pyA5aSn5LiL5qCH5p2l5aSE55CGXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdG9wXG4gICAgICogQHJldHVybnMg5oyH5a6a5Yy66Ze05YaF77yM55qE5pyJ5bqP6ZuG5oiQ5ZGY55qE5YiX6KGoXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHpyYW5nZShrZXk6IHN0cmluZywgc3RhcnQ6IG51bWJlciwgc3RvcDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnpyYW5nZShrZXksIHN0YXJ0LCBzdG9wKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogWlJBTkdFIGtleSBzdGFydCBzdG9wXG4gICAgICog6L+U5Zue5pyJ5bqP6ZuGIGtleSDkuK3vvIzmjIflrprljLrpl7TlhoXnmoTmiJDlkZhcbiAgICAgKiDlhbbkuK3miJDlkZjnmoTkvY3nva7mjIkgc2NvcmUg5YC86YCS5aKeKOS7juWwj+WIsOWkpynmnaXmjpLluo9cbiAgICAgKiDlhbfmnInnm7jlkIwgc2NvcmUg5YC855qE5oiQ5ZGY5oyJ5a2X5YW45bqPKGxleGljb2dyYXBoaWNhbCBvcmRlciAp5p2l5o6S5YiXIGh0dHBzOi8vemgud2lraXBlZGlhLm9yZy93aWtpLyVFNSVBRCU5NyVFNSU4NSVCOCVFNSVCQSU4RlxuICAgICAqIOWmguaenOS9oOmcgOimgeaIkOWRmOaMiSBzY29yZSDlgLzpgJLlh48o5LuO5aSn5Yiw5bCPKeadpeaOkuWIl++8jOivt+S9v+eUqCBaUkVWUkFOR0Ug5ZG95LukXG4gICAgICog5LiL5qCH5Y+C5pWwIHN0YXJ0IOWSjCBzdG9wIOmDveS7pSAwIOS4uuW6le+8jOS5n+WwseaYr+ivtO+8jOS7pSAwIOihqOekuuacieW6j+mbhuesrOS4gOS4quaIkOWRmO+8jOS7pSAxIOihqOekuuacieW6j+mbhuesrOS6jOS4quaIkOWRmO+8jOS7peatpOexu+aOqFxuICAgICAqIOS9oOS5n+WPr+S7peS9v+eUqOi0n+aVsOS4i+agh++8jOS7pSAtMSDooajnpLrmnIDlkI7kuIDkuKrmiJDlkZjvvIwgLTIg6KGo56S65YCS5pWw56ys5LqM5Liq5oiQ5ZGY77yM5Lul5q2k57G75o6oXG4gICAgICog6LaF5Ye66IyD5Zu055qE5LiL5qCH5bm25LiN5Lya5byV6LW36ZSZ6K+vXG4gICAgICpcbiAgICAgKiDmr5TlpoLor7TvvIzlvZMgc3RhcnQg55qE5YC85q+U5pyJ5bqP6ZuG55qE5pyA5aSn5LiL5qCH6L+Y6KaB5aSn77yM5oiW5pivIHN0YXJ0ID4gc3RvcCDml7bvvIwgWlJBTkdFIOWRveS7pOWPquaYr+eugOWNleWcsOi/lOWbnuS4gOS4quepuuWIl+ihqFxuICAgICAqIOWPpuS4gOaWuemdou+8jOWBh+WmgiBzdG9wIOWPguaVsOeahOWAvOavlOacieW6j+mbhueahOacgOWkp+S4i+agh+i/mOimgeWkp++8jOmCo+S5iCBSZWRpcyDlsIYgc3RvcCDlvZPkvZzmnIDlpKfkuIvmoIfmnaXlpITnkIZcbiAgICAgKlxuICAgICAqIOWPr+S7pemAmui/h+S9v+eUqCBXSVRIU0NPUkVTIOmAiemhue+8jOadpeiuqeaIkOWRmOWSjOWug+eahCBzY29yZSDlgLzkuIDlubbov5Tlm57vvIzov5Tlm57liJfooajku6UgdmFsdWUxLHNjb3JlMSwgLi4uLCB2YWx1ZU4sc2NvcmVOIOeahOagvOW8j+ihqOekulxuICAgICAqIOWuouaIt+err+W6k+WPr+iDveS8mui/lOWbnuS4gOS6m+abtOWkjeadgueahOaVsOaNruexu+Wei++8jOavlOWmguaVsOe7hOOAgeWFg+e7hOetiVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RvcFxuICAgICAqIEByZXR1cm5zIOaMh+WumuWMuumXtOWGhe+8jOW4puaciSBzY29yZSDlgLwo5Y+v6YCJKeeahOacieW6j+mbhuaIkOWRmOeahOWIl+ihqFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB6cmFuZ2VXaXRoU2NvcmVzKGtleTogc3RyaW5nLCBzdGFydDogbnVtYmVyLCBzdG9wOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuenJhbmdlKGtleSwgc3RhcnQsIHN0b3AsICdXSVRIU0NPUkVTJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFpSQU5HRUJZU0NPUkUga2V5IG1pbiBtYXggW1dJVEhTQ09SRVNdIFtMSU1JVCBvZmZzZXQgY291bnRdXG4gICAgICog6L+U5Zue5pyJ5bqP6ZuGIGtleSDkuK3vvIzmiYDmnIkgc2NvcmUg5YC85LuL5LqOIG1pbiDlkowgbWF4IOS5i+mXtCjljIXmi6znrYnkuo4gbWluIOaIliBtYXggKeeahOaIkOWRmOOAguacieW6j+mbhuaIkOWRmOaMiSBzY29yZSDlgLzpgJLlop4o5LuO5bCP5Yiw5aSnKeasoeW6j+aOkuWIl1xuICAgICAqIOWFt+acieebuOWQjCBzY29yZSDlgLznmoTmiJDlkZjmjInlrZflhbjluo8obGV4aWNvZ3JhcGhpY2FsIG9yZGVyKeadpeaOkuWIlyjor6XlsZ7mgKfmmK/mnInluo/pm4bmj5DkvpvnmoTvvIzkuI3pnIDopoHpop3lpJbnmoTorqHnrpcpXG4gICAgICogaHR0cHM6Ly96aC53aWtpcGVkaWEub3JnL3dpa2kvJUU1JUFEJTk3JUU1JTg1JUI4JUU1JUJBJThGXG4gICAgICpcbiAgICAgKiDlj6/pgInnmoQgTElNSVQg5Y+C5pWw5oyH5a6a6L+U5Zue57uT5p6c55qE5pWw6YeP5Y+K5Yy66Ze0KOWwseWDj1NRTOS4reeahCBTRUxFQ1QgTElNSVQgb2Zmc2V0LCBjb3VudCApXG4gICAgICog5rOo5oSP5b2TIG9mZnNldCDlvojlpKfml7bvvIzlrprkvY0gb2Zmc2V0IOeahOaTjeS9nOWPr+iDvemcgOimgemBjeWOhuaVtOS4quacieW6j+mbhu+8jOatpOi/h+eoi+acgOWdj+WkjeadguW6puS4uiBPKE4pIOaXtumXtFxuICAgICAqXG4gICAgICog5Y+v6YCJ55qEIFdJVEhTQ09SRVMg5Y+C5pWw5Yaz5a6a57uT5p6c6ZuG5piv5Y2V5Y2V6L+U5Zue5pyJ5bqP6ZuG55qE5oiQ5ZGY77yM6L+Y5piv5bCG5pyJ5bqP6ZuG5oiQ5ZGY5Y+K5YW2IHNjb3JlIOWAvOS4gOi1t+i/lOWbnlxuICAgICAqIG1pbiDlkowgbWF4IOWPr+S7peaYryAtaW5mIOWSjCAraW5mIO+8jOi/meagt+S4gOadpe+8jOS9oOWwseWPr+S7peWcqOS4jeefpemBk+acieW6j+mbhueahOacgOS9juWSjOacgOmrmCBzY29yZSDlgLznmoTmg4XlhrXkuIvvvIzkvb/nlKggWlJBTkdFQllTQ09SRSDov5nnsbvlkb3ku6RcbiAgICAgKiDpu5jorqTmg4XlhrXkuIvvvIzljLrpl7TnmoTlj5blgLzkvb/nlKjpl63ljLrpl7QgKOWwj+S6juetieS6juaIluWkp+S6juetieS6jinvvIzkvaDkuZ/lj6/ku6XpgJrov4fnu5nlj4LmlbDliY3lop7liqAgKCDnrKblj7fmnaXkvb/nlKjlj6/pgInnmoTlvIDljLrpl7QgKOWwj+S6juaIluWkp+S6jilcbiAgICAgKlxuICAgICAqIOS4vuS4quS+i+WtkDpcbiAgICAgKiAxLlxuICAgICAqIFpSQU5HRUJZU0NPUkUga2V5ICgxIDVcbiAgICAgKiDov5Tlm57miYDmnInnrKblkIjmnaHku7YgMSA8IHNjb3JlIDw9IDUg55qE5oiQ5ZGYXG4gICAgICpcbiAgICAgKiAyLlxuICAgICAqIFpSQU5HRUJZU0NPUkUga2V5ICg1ICgxMFxuICAgICAqIOWImei/lOWbnuaJgOacieespuWQiOadoeS7tiA1IDwgc2NvcmUgPCAxMCDnmoTmiJDlkZhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsobnVtYmVyIHwgc3RyaW5nKX0gbWluXG4gICAgICogQHBhcmFtIHsobnVtYmVyIHwgc3RyaW5nKX0gbWF4XG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gYXJnc1xuICAgICAqIEByZXR1cm5zIOaMh+WumuWMuumXtOWGhe+8jOW4puaciSBzY29yZSDlgLwo5Y+v6YCJKeeahOacieW6j+mbhuaIkOWRmOeahOWIl+ihqFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB6cmFuZ2VieXNjb3JlKGtleTogc3RyaW5nLCBtaW46IG51bWJlciB8IHN0cmluZywgbWF4OiBudW1iZXIgfCBzdHJpbmcsIC4uLmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnpyYW5nZWJ5c2NvcmUoa2V5LCBtaW4sIG1heCwgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFpSQU5LIGtleSBtZW1iZXJcbiAgICAgKiDov5Tlm57mnInluo/pm4Yga2V5IOS4reaIkOWRmCBtZW1iZXIg55qE5o6S5ZCN44CC5YW25Lit5pyJ5bqP6ZuG5oiQ5ZGY5oyJIHNjb3JlIOWAvOmAkuWinijku47lsI/liLDlpKcp6aG65bqP5o6S5YiXXG4gICAgICog5o6S5ZCN5LulIDAg5Li65bqV77yM5Lmf5bCx5piv6K+077yMIHNjb3JlIOWAvOacgOWwj+eahOaIkOWRmOaOkuWQjeS4uiAwXG4gICAgICog5L2/55SoIFpSRVZSQU5LIOWRveS7pOWPr+S7peiOt+W+l+aIkOWRmOaMiSBzY29yZSDlgLzpgJLlh48o5LuO5aSn5Yiw5bCPKeaOkuWIl+eahOaOkuWQjVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVtYmVyXG4gICAgICogQHJldHVybnMg5aaC5p6cIG1lbWJlciDmmK/mnInluo/pm4Yga2V5IOeahOaIkOWRmO+8jOi/lOWbniBtZW1iZXIg55qE5o6S5ZCNLCDlpoLmnpwgbWVtYmVyIOS4jeaYr+acieW6j+mbhiBrZXkg55qE5oiQ5ZGY77yM6L+U5ZueIG5pbFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB6cmFuayhrZXk6IHN0cmluZywgbWVtYmVyOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuenJhbmsoa2V5LCBtZW1iZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBaUkVNIGtleSBtZW1iZXIgW21lbWJlciAuLi5dXG4gICAgICog56e76Zmk5pyJ5bqP6ZuGIGtleSDkuK3nmoTkuIDkuKrmiJblpJrkuKrmiJDlkZjvvIzkuI3lrZjlnKjnmoTmiJDlkZjlsIbooqvlv73nlaVcbiAgICAgKiDlvZMga2V5IOWtmOWcqOS9huS4jeaYr+acieW6j+mbhuexu+Wei+aXtu+8jOi/lOWbnuS4gOS4qumUmeivr1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0gey4uLmFueVtdfSBtZW1iZXJzXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgenJlbShrZXk6IHN0cmluZywgLi4ubWVtYmVyczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuenJlbShrZXksIC4uLm1lbWJlcnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBaUkVNUkFOR0VCWVJBTksga2V5IHN0YXJ0IHN0b3BcbiAgICAgKiDnp7vpmaTmnInluo/pm4Yga2V5IOS4re+8jOaMh+WumuaOkuWQjShyYW5rKeWMuumXtOWGheeahOaJgOacieaIkOWRmFxuICAgICAqIOWMuumXtOWIhuWIq+S7peS4i+agh+WPguaVsCBzdGFydCDlkowgc3RvcCDmjIflh7rvvIzljIXlkKsgc3RhcnQg5ZKMIHN0b3Ag5Zyo5YaFXG4gICAgICog5LiL5qCH5Y+C5pWwIHN0YXJ0IOWSjCBzdG9wIOmDveS7pSAwIOS4uuW6le+8jOS5n+WwseaYr+ivtO+8jOS7pSAwIOihqOekuuacieW6j+mbhuesrOS4gOS4quaIkOWRmO+8jOS7pSAxIOihqOekuuacieW6j+mbhuesrOS6jOS4quaIkOWRmO+8jOS7peatpOexu+aOqFxuICAgICAqIOS9oOS5n+WPr+S7peS9v+eUqOi0n+aVsOS4i+agh++8jOS7pSAtMSDooajnpLrmnIDlkI7kuIDkuKrmiJDlkZjvvIwgLTIg6KGo56S65YCS5pWw56ys5LqM5Liq5oiQ5ZGY77yM5Lul5q2k57G75o6oXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdG9wXG4gICAgICogQHJldHVybnMg6KKr56e76Zmk5oiQ5ZGY55qE5pWw6YePXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHpyZW1yYW5nZWJ5cmFuayhrZXk6IHN0cmluZywgc3RhcnQ6IG51bWJlciwgc3RvcDogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuenJlbXJhbmdlYnlyYW5rKGtleSwgc3RhcnQsIHN0b3ApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBaUkVNUkFOR0VCWVNDT1JFIGtleSBtaW4gbWF4XG4gICAgICog56e76Zmk5pyJ5bqP6ZuGIGtleSDkuK3vvIzmiYDmnIkgc2NvcmUg5YC85LuL5LqOIG1pbiDlkowgbWF4IOS5i+mXtCjljIXmi6znrYnkuo4gbWluIOaIliBtYXggKeeahOaIkOWRmFxuICAgICAqIHNjb3JlIOWAvOetieS6jiBtaW4g5oiWIG1heCDnmoTmiJDlkZjkuZ/lj6/ku6XkuI3ljIXmi6zlnKjlhoXvvIzor6bmg4Xor7flj4Lop4EgWlJBTkdFQllTQ09SRSDlkb3ku6RcbiAgICAgKiBodHRwOi8vcmVkaXNkb2MuY29tL3NvcnRlZF9zZXQvenJhbmdlYnlzY29yZS5odG1sI3pyYW5nZWJ5c2NvcmVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsobnVtYmVyIHwgc3RyaW5nKX0gbWluXG4gICAgICogQHBhcmFtIHsobnVtYmVyIHwgc3RyaW5nKX0gbWF4XG4gICAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn0g6KKr56e76Zmk5oiQ5ZGY55qE5pWw6YePXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHpyZW1yYW5nZWJ5c2NvcmUoa2V5OiBzdHJpbmcsIG1pbjogbnVtYmVyIHwgc3RyaW5nLCBtYXg6IG51bWJlciB8IHN0cmluZyk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnpyZW1yYW5nZWJ5c2NvcmUoa2V5LCBtaW4sIG1heCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFpSRVZSQU5HRSBrZXkgc3RhcnQgc3RvcFxuICAgICAqIOi/lOWbnuacieW6j+mbhiBrZXkg5Lit77yM5oyH5a6a5Yy66Ze05YaF55qE5oiQ5ZGYXG4gICAgICog5YW25Lit5oiQ5ZGY55qE5L2N572u5oyJIHNjb3JlIOWAvOmAkuWHjyjku47lpKfliLDlsI8p5p2l5o6S5YiXXG4gICAgICog5YW35pyJ55u45ZCMIHNjb3JlIOWAvOeahOaIkOWRmOaMieWtl+WFuOW6j+eahOmAhuW6jyhyZXZlcnNlIGxleGljb2dyYXBoaWNhbCBvcmRlcinmjpLliJdcbiAgICAgKiBodHRwczovL3poLndpa2lwZWRpYS5vcmcvd2lraS8lRTUlQUQlOTclRTUlODUlQjglRTUlQkElOEZcbiAgICAgKlxuICAgICAqIOmZpOS6huaIkOWRmOaMiSBzY29yZSDlgLzpgJLlh4/nmoTmrKHluo/mjpLliJfov5nkuIDngrnlpJbvvIwgWlJFVlJBTkdFIOWRveS7pOeahOWFtuS7luaWuemdouWSjCBaUkFOR0Ug5ZG95Luk5LiA5qC3XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdG9wXG4gICAgICogQHJldHVybnMg5oyH5a6a5Yy66Ze05YaF77yM5bim5pyJIHNjb3JlIOWAvCjlj6/pgIkp55qE5pyJ5bqP6ZuG5oiQ5ZGY55qE5YiX6KGoXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHpyZXZyYW5nZShrZXk6IHN0cmluZywgc3RhcnQ6IG51bWJlciwgc3RvcDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnpyZXZyYW5nZShrZXksIHN0YXJ0LCBzdG9wKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogWlJFVlJBTkdFIGtleSBzdGFydCBzdG9wIFtXSVRIU0NPUkVTXVxuICAgICAqIOi/lOWbnuacieW6j+mbhiBrZXkg5Lit77yM5oyH5a6a5Yy66Ze05YaF55qE5oiQ5ZGYXG4gICAgICog5YW25Lit5oiQ5ZGY55qE5L2N572u5oyJIHNjb3JlIOWAvOmAkuWHjyjku47lpKfliLDlsI8p5p2l5o6S5YiXXG4gICAgICog5YW35pyJ55u45ZCMIHNjb3JlIOWAvOeahOaIkOWRmOaMieWtl+WFuOW6j+eahOmAhuW6jyhyZXZlcnNlIGxleGljb2dyYXBoaWNhbCBvcmRlcinmjpLliJdcbiAgICAgKiBodHRwczovL3poLndpa2lwZWRpYS5vcmcvd2lraS8lRTUlQUQlOTclRTUlODUlQjglRTUlQkElOEZcbiAgICAgKlxuICAgICAqIOmZpOS6huaIkOWRmOaMiSBzY29yZSDlgLzpgJLlh4/nmoTmrKHluo/mjpLliJfov5nkuIDngrnlpJbvvIwgWlJFVlJBTkdFIOWRveS7pOeahOWFtuS7luaWuemdouWSjCBaUkFOR0Ug5ZG95Luk5LiA5qC3XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdG9wXG4gICAgICogQHJldHVybnMg5oyH5a6a5Yy66Ze05YaF77yM5bim5pyJIHNjb3JlIOWAvCjlj6/pgIkp55qE5pyJ5bqP6ZuG5oiQ5ZGY55qE5YiX6KGoXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHpyZXZyYW5nZVdpdGhTY29yZXMoa2V5OiBzdHJpbmcsIHN0YXJ0OiBudW1iZXIsIHN0b3A6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy56cmV2cmFuZ2Uoa2V5LCBzdGFydCwgc3RvcCwgJ1dJVEhTQ09SRVMnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogWlJFVlJBTkdFQllTQ09SRSBrZXkgbWF4IG1pbiBbV0lUSFNDT1JFU10gW0xJTUlUIG9mZnNldCBjb3VudF1cbiAgICAgKiDov5Tlm57mnInluo/pm4Yga2V5IOS4re+8jCBzY29yZSDlgLzku4vkuo4gbWF4IOWSjCBtaW4g5LmL6Ze0KOm7mOiupOWMheaLrOetieS6jiBtYXgg5oiWIG1pbiAp55qE5omA5pyJ55qE5oiQ5ZGY44CCXG4gICAgICog5pyJ5bqP6ZuG5oiQ5ZGY5oyJIHNjb3JlIOWAvOmAkuWHjyjku47lpKfliLDlsI8p55qE5qyh5bqP5o6S5YiXXG4gICAgICog5YW35pyJ55u45ZCMIHNjb3JlIOWAvOeahOaIkOWRmOaMieWtl+WFuOW6j+eahOmAhuW6jyhyZXZlcnNlIGxleGljb2dyYXBoaWNhbCBvcmRlciAp5o6S5YiXXG4gICAgICogaHR0cHM6Ly96aC53aWtpcGVkaWEub3JnL3dpa2kvJUU1JUFEJTk3JUU1JTg1JUI4JUU1JUJBJThGXG4gICAgICpcbiAgICAgKiDpmaTkuobmiJDlkZjmjIkgc2NvcmUg5YC86YCS5YeP55qE5qyh5bqP5o6S5YiX6L+Z5LiA54K55aSW77yMIFpSRVZSQU5HRUJZU0NPUkUg5ZG95Luk55qE5YW25LuW5pa56Z2i5ZKMIFpSQU5HRUJZU0NPUkUg5ZG95Luk5LiA5qC3XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7KG51bWJlciB8IHN0cmluZyl9IG1heFxuICAgICAqIEBwYXJhbSB7KG51bWJlciB8IHN0cmluZyl9IG1pblxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGFyZ3NcbiAgICAgKiBAcmV0dXJucyDmjIflrprljLrpl7TlhoXvvIzluKbmnIkgc2NvcmUg5YC8KOWPr+mAiSnnmoTmnInluo/pm4bmiJDlkZjnmoTliJfooahcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgenJldnJhbmdlYnlzY29yZShrZXk6IHN0cmluZywgbWF4OiBudW1iZXIgfCBzdHJpbmcsIG1pbjogbnVtYmVyIHwgc3RyaW5nLCAuLi5hcmdzOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy56cmV2cmFuZ2VieXNjb3JlKGtleSwgbWF4LCBtaW4sIC4uLmFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBaUkVWUkFOSyBrZXkgbWVtYmVyXG4gICAgICog6L+U5Zue5pyJ5bqP6ZuGIGtleSDkuK3miJDlkZggbWVtYmVyIOeahOaOkuWQjeOAguWFtuS4reacieW6j+mbhuaIkOWRmOaMiSBzY29yZSDlgLzpgJLlh48o5LuO5aSn5Yiw5bCPKeaOkuW6j1xuICAgICAqIOaOkuWQjeS7pSAwIOS4uuW6le+8jOS5n+WwseaYr+ivtO+8jCBzY29yZSDlgLzmnIDlpKfnmoTmiJDlkZjmjpLlkI3kuLogMFxuICAgICAqIOS9v+eUqCBaUkFOSyDlkb3ku6Tlj6/ku6XojrflvpfmiJDlkZjmjIkgc2NvcmUg5YC86YCS5aKeKOS7juWwj+WIsOWkpynmjpLliJfnmoTmjpLlkI1cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lbWJlclxuICAgICAqIEByZXR1cm5zIOWmguaenCBtZW1iZXIg5piv5pyJ5bqP6ZuGIGtleSDnmoTmiJDlkZjvvIzov5Tlm54gbWVtYmVyIOeahOaOkuWQjSwg5aaC5p6cIG1lbWJlciDkuI3mmK/mnInluo/pm4Yga2V5IOeahOaIkOWRmO+8jOi/lOWbniBuaWxcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgenJldnJhbmsoa2V5OiBzdHJpbmcsIG1lbWJlcjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnpyZXZyYW5rKGtleSwgbWVtYmVyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogWlNDT1JFIGtleSBtZW1iZXJcbiAgICAgKiDov5Tlm57mnInluo/pm4Yga2V5IOS4re+8jOaIkOWRmCBtZW1iZXIg55qEIHNjb3JlIOWAvFxuICAgICAqIOWmguaenCBtZW1iZXIg5YWD57Sg5LiN5piv5pyJ5bqP6ZuGIGtleSDnmoTmiJDlkZjvvIzmiJYga2V5IOS4jeWtmOWcqO+8jOi/lOWbniBuaWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lbWJlclxuICAgICAqIEByZXR1cm5zIG1lbWJlciDmiJDlkZjnmoQgc2NvcmUg5YC877yM5Lul5a2X56ym5Liy5b2i5byP6KGo56S6XG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHpzY29yZShrZXk6IHN0cmluZywgbWVtYmVyOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuenNjb3JlKGtleSwgbWVtYmVyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogWlVOSU9OU1RPUkUgZGVzdGluYXRpb24gbnVta2V5cyBrZXkgW2tleSAuLi5dIFtXRUlHSFRTIHdlaWdodCBbd2VpZ2h0IC4uLl1dIFtBR0dSRUdBVEUgU1VNfE1JTnxNQVhdXG4gICAgICog6K6h566X57uZ5a6a55qE5LiA5Liq5oiW5aSa5Liq5pyJ5bqP6ZuG55qE5bm26ZuG77yM5YW25Lit57uZ5a6aIGtleSDnmoTmlbDph4/lv4Xpobvku6UgbnVta2V5cyDlj4LmlbDmjIflrprvvIzlubblsIbor6Xlubbpm4Yo57uT5p6c6ZuGKeWCqOWtmOWIsCBkZXN0aW5hdGlvblxuICAgICAqIOm7mOiupOaDheWGteS4i++8jOe7k+aenOmbhuS4reafkOS4quaIkOWRmOeahCBzY29yZSDlgLzmmK/miYDmnInnu5nlrprpm4bkuIvor6XmiJDlkZggc2NvcmUg5YC85LmLIOWSjFxuICAgICAqXG4gICAgICogV0VJR0hUU1xuICAgICAqIOS9v+eUqCBXRUlHSFRTIOmAiemhue+8jOS9oOWPr+S7peS4uiDmr4/kuKog57uZ5a6a5pyJ5bqP6ZuGIOWIhuWIqyDmjIflrprkuIDkuKrkuZjms5Xlm6DlrZAobXVsdGlwbGljYXRpb24gZmFjdG9yKe+8jOavj+S4que7meWumuacieW6j+mbhueahOaJgOacieaIkOWRmOeahCBzY29yZSDlgLxcbiAgICAgKiDlnKjkvKDpgJLnu5nogZrlkIjlh73mlbAoYWdncmVnYXRpb24gZnVuY3Rpb24p5LmL5YmN6YO96KaB5YWI5LmY5Lul6K+l5pyJ5bqP6ZuG55qE5Zug5a2QXG4gICAgICog5aaC5p6c5rKh5pyJ5oyH5a6aIFdFSUdIVFMg6YCJ6aG577yM5LmY5rOV5Zug5a2Q6buY6K6k6K6+572u5Li6IDFcbiAgICAgKlxuICAgICAqIEFHR1JFR0FURVxuICAgICAqIOS9v+eUqCBBR0dSRUdBVEUg6YCJ6aG577yM5L2g5Y+v5Lul5oyH5a6a5bm26ZuG55qE57uT5p6c6ZuG55qE6IGa5ZCI5pa55byPXG4gICAgICog6buY6K6k5L2/55So55qE5Y+C5pWwIFNVTSDvvIzlj6/ku6XlsIbmiYDmnInpm4blkIjkuK3mn5DkuKrmiJDlkZjnmoQgc2NvcmUg5YC85LmLIOWSjCDkvZzkuLrnu5Pmnpzpm4bkuK3or6XmiJDlkZjnmoQgc2NvcmUg5YC877yb5L2/55So5Y+C5pWwIE1JTiDvvIzlj6/ku6XlsIbmiYDmnInpm4blkIhcbiAgICAgKiDkuK3mn5DkuKrmiJDlkZjnmoQg5pyA5bCPIHNjb3JlIOWAvOS9nOS4uue7k+aenOmbhuS4reivpeaIkOWRmOeahCBzY29yZSDlgLxcbiAgICAgKiDogIzlj4LmlbAgTUFYIOWImeaYr+WwhuaJgOaciembhuWQiOS4reafkOS4quaIkOWRmOeahCDmnIDlpKcgc2NvcmUg5YC85L2c5Li657uT5p6c6ZuG5Lit6K+l5oiQ5ZGY55qEIHNjb3JlIOWAvFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1rZXlzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGFyZ3NcbiAgICAgKiBAcmV0dXJucyDkv53lrZjliLAgZGVzdGluYXRpb24g55qE57uT5p6c6ZuG55qE5Z+65pWwXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHp1bmlvbnN0b3JlKGRlc3RpbmF0aW9uOiBzdHJpbmcsIG51bWtleXM6IG51bWJlciwga2V5OiBzdHJpbmcsIC4uLmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnp1bmlvbnN0b3JlKGRlc3RpbmF0aW9uLCBudW1rZXlzLCBrZXksIC4uLmFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBaSU5URVJTVE9SRSBkZXN0aW5hdGlvbiBudW1rZXlzIGtleSBba2V5IC4uLl0gW1dFSUdIVFMgd2VpZ2h0IFt3ZWlnaHQgLi4uXV0gW0FHR1JFR0FURSBTVU18TUlOfE1BWF1cbiAgICAgKiDorqHnrpfnu5nlrprnmoTkuIDkuKrmiJblpJrkuKrmnInluo/pm4bnmoTkuqTpm4bvvIzlhbbkuK3nu5nlrpoga2V5IOeahOaVsOmHj+W/hemhu+S7pSBudW1rZXlzIOWPguaVsOaMh+Wumu+8jOW5tuWwhuivpeS6pOmbhijnu5Pmnpzpm4Yp5YKo5a2Y5YiwIGRlc3RpbmF0aW9uXG4gICAgICog6buY6K6k5oOF5Ya15LiL77yM57uT5p6c6ZuG5Lit5p+Q5Liq5oiQ5ZGY55qEIHNjb3JlIOWAvOaYr+aJgOaciee7meWumumbhuS4i+ivpeaIkOWRmCBzY29yZSDlgLzkuYvlkoxcbiAgICAgKiDlhbPkuo4gV0VJR0hUUyDlkowgQUdHUkVHQVRFIOmAiemhueeahOaPj+i/sO+8jOWPguingSBaVU5JT05TVE9SRSDlkb3ku6RcbiAgICAgKiBodHRwOi8vcmVkaXNkb2MuY29tL3NvcnRlZF9zZXQvenVuaW9uc3RvcmUuaHRtbCN6dW5pb25zdG9yZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1rZXlzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGFyZ3NcbiAgICAgKiBAcmV0dXJucyDkv53lrZjliLAgZGVzdGluYXRpb24g55qE57uT5p6c6ZuG55qE5Z+65pWwXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHppbnRlcnN0b3JlKGRlc3RpbmF0aW9uOiBzdHJpbmcsIG51bWtleXM6IG51bWJlciwga2V5OiBzdHJpbmcsIC4uLmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnppbnRlcnN0b3JlKGRlc3RpbmF0aW9uLCBudW1rZXlzLCBrZXksIC4uLmFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNU0VUIGtleSB2YWx1ZSBba2V5IHZhbHVlIC4uLl1cbiAgICAgKiDlkIzml7borr7nva7kuIDkuKrmiJblpJrkuKoga2V5LXZhbHVlIOWvuVxuICAgICAqIOWmguaenOafkOS4que7meWumiBrZXkg5bey57uP5a2Y5Zyo77yM6YKj5LmIIE1TRVQg5Lya55So5paw5YC86KaG55uW5Y6f5p2l55qE5pen5YC877yM5aaC5p6c6L+Z5LiN5piv5L2g5omA5biM5pyb55qE5pWI5p6cXG4gICAgICog6K+36ICD6JmR5L2/55SoIE1TRVROWCDlkb3ku6TvvJrlroPlj6rkvJrlnKjmiYDmnInnu5nlrpoga2V5IOmDveS4jeWtmOWcqOeahOaDheWGteS4i+i/m+ihjOiuvue9ruaTjeS9nOOAglxuICAgICAqXG4gICAgICogTVNFVCDmmK/kuIDkuKrljp/lrZDmgKcoYXRvbWljKeaTjeS9nO+8jOaJgOaciee7meWumiBrZXkg6YO95Lya5Zyo5ZCM5LiA5pe26Ze05YaF6KKr6K6+572uXG4gICAgICog5p+Q5Lqb57uZ5a6aIGtleSDooqvmm7TmlrDogIzlj6bkuIDkupvnu5nlrpoga2V5IOayoeacieaUueWPmOeahOaDheWGte+8jOS4jeWPr+iDveWPkeeUn+OAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gYXJnc1xuICAgICAqIEByZXR1cm5zIOaAu+aYr+i/lOWbniBPSyAo5Zug5Li6IE1TRVQg5LiN5Y+v6IO95aSx6LSlKVxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBtc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCAuLi5hcmdzOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5tc2V0KGtleSwgdmFsdWUsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTRVRFWCBrZXkgc2Vjb25kcyB2YWx1ZVxuICAgICAqIOWwhuWAvCB2YWx1ZSDlhbPogZTliLAga2V5IO+8jOW5tuWwhiBrZXkg55qE55Sf5a2Y5pe26Ze06K6+5Li6IHNlY29uZHMgKOS7peenkuS4uuWNleS9jSlcbiAgICAgKiDlpoLmnpwga2V5IOW3sue7j+WtmOWcqO+8jCBTRVRFWCDlkb3ku6TlsIbopoblhpnml6flgLxcbiAgICAgKiBTRVRFWCDmmK/kuIDkuKrljp/lrZDmgKcoYXRvbWljKeaTjeS9nO+8jOWFs+iBlOWAvOWSjOiuvue9rueUn+WtmOaXtumXtOS4pOS4quWKqOS9nOS8muWcqOWQjOS4gOaXtumXtOWGheWujOaIkO+8jOivpeWRveS7pOWcqCBSZWRpcyDnlKjkvZznvJPlrZjml7bvvIzpnZ7luLjlrp7nlKhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlY29uZHNcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHJldHVybnMg6K6+572u5oiQ5Yqf5pe26L+U5ZueIE9LLCDlvZMgc2Vjb25kcyDlj4LmlbDkuI3lkIjms5Xml7bvvIzov5Tlm57kuIDkuKrplJnor69cbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2V0ZXgoa2V5OiBzdHJpbmcsIHNlY29uZHM6IG51bWJlciwgdmFsdWU6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zZXRleChrZXksIHNlY29uZHMsIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTUdFVCBrZXkgW2tleSAuLi5dXG4gICAgICog6L+U5Zue5omA5pyJKOS4gOS4quaIluWkmuS4qinnu5nlrpoga2V5IOeahOWAvFxuICAgICAqIOWmguaenOe7meWumueahCBrZXkg6YeM6Z2i77yM5pyJ5p+Q5LiqIGtleSDkuI3lrZjlnKjvvIzpgqPkuYjov5nkuKoga2V5IOi/lOWbnueJueauiuWAvCBuaWwg44CC5Zug5q2k77yM6K+l5ZG95Luk5rC45LiN5aSx6LSlXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0ga2V5c1xuICAgICAqIEByZXR1cm5zIOS4gOS4quWMheWQq+aJgOaciee7meWumiBrZXkg55qE5YC855qE5YiX6KGoXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIG1nZXQoLi4ua2V5czogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMubWdldCguLi5rZXlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTElOU0VSVCBrZXkgQkVGT1JFfEFGVEVSIHBpdm90IHZhbHVlXG4gICAgICog5bCG5YC8IHZhbHVlIOaPkuWFpeWIsOWIl+ihqCBrZXkg5b2T5Lit77yM5L2N5LqO5YC8IHBpdm90IOS5i+WJjeaIluS5i+WQjlxuICAgICAqIOW9kyBwaXZvdCDkuI3lrZjlnKjkuo7liJfooagga2V5IOaXtu+8jOS4jeaJp+ihjOS7u+S9leaTjeS9nFxuICAgICAqIOW9kyBrZXkg5LiN5a2Y5Zyo5pe277yMIGtleSDooqvop4bkuLrnqbrliJfooajvvIzkuI3miafooYzku7vkvZXmk43kvZxcbiAgICAgKiDlpoLmnpwga2V5IOS4jeaYr+WIl+ihqOexu+Wei++8jOi/lOWbnuS4gOS4qumUmeivr1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0geygnQkVGT1JFJyB8ICdBRlRFUicpfSBkaXJlY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGl2b3RcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHJldHVybnMg5aaC5p6c5ZG95Luk5omn6KGM5oiQ5Yqf77yM6L+U5Zue5o+S5YWl5pON5L2c5a6M5oiQ5LmL5ZCO77yM5YiX6KGo55qE6ZW/5bqmLCDlpoLmnpzmsqHmnInmib7liLAgcGl2b3Qg77yM6L+U5ZueIC0xLCDlpoLmnpwga2V5IOS4jeWtmOWcqOaIluS4uuepuuWIl+ihqO+8jOi/lOWbniAwXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGxpbnNlcnQoa2V5OiBzdHJpbmcsIGRpcmVjdGlvbjogJ0JFRk9SRScgfCAnQUZURVInLCBwaXZvdDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmxpbnNlcnQoa2V5LCBkaXJlY3Rpb24sIHBpdm90LCB2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdFT0FERCBrZXkgbG9uZ2l0dWRlIGxhdGl0dWRlIG1lbWJlciBbbG9uZ2l0dWRlIGxhdGl0dWRlIG1lbWJlciAuLi5dXG4gICAgICog5bCG57uZ5a6a55qE56m66Ze05YWD57Sg77yI57qs5bqm44CB57uP5bqm44CB5ZCN5a2X77yJ5re75Yqg5Yiw5oyH5a6a55qE6ZSu6YeM6Z2iXG4gICAgICog6L+Z5Lqb5pWw5o2u5Lya5Lul5pyJ5bqP6ZuG5ZCI55qE5b2i5byP6KKr5YKo5a2Y5Zyo6ZSu6YeM6Z2iXG4gICAgICog5LuO6ICM5L2/5b6X5YOPIEdFT1JBRElVUyDlkowgR0VPUkFESVVTQllNRU1CRVIg6L+Z5qC355qE5ZG95Luk5Y+v5Lul5Zyo5LmL5ZCO6YCa6L+H5L2N572u5p+l6K+i5Y+W5b6X6L+Z5Lqb5YWD57SgXG4gICAgICogR0VPQUREIOWRveS7pOS7peagh+WHhueahCB4LHkg5qC85byP5o6l5Y+X5Y+C5pWw77yMIOaJgOS7peeUqOaIt+W/hemhu+WFiOi+k+WFpee7j+W6pu+8jCDnhLblkI7lho3ovpPlhaXnuqzluqZcbiAgICAgKiBHRU9BREQg6IO95aSf6K6w5b2V55qE5Z2Q5qCH5piv5pyJ6ZmQ55qE77yaIOmdnuW4uOaOpei/keS4pOaegeeahOWMuuWfn+aYr+aXoOazleiiq+e0ouW8leeahFxuICAgICAqIOeyvuehrueahOWdkOagh+mZkOWItueUsSBFUFNHOjkwMDkxMyAvIEVQU0c6Mzc4NSAvIE9TR0VPOjQxMDAxIOetieWdkOagh+ezu+e7n+WumuS5iVxuICAgICAqIOWFt+S9k+WmguS4i++8mlxuICAgICAqIOacieaViOeahOe7j+W6puS7i+S6jiAtMTgwIOW6puiHsyAxODAg5bqm5LmL6Ze0XG4gICAgICog5pyJ5pWI55qE57qs5bqm5LuL5LqOIC04NS4wNTExMjg3OCDluqboh7MgODUuMDUxMTI4Nzgg5bqm5LmL6Ze0XG4gICAgICog5b2T55So5oi35bCd6K+V6L6T5YWl5LiA5Liq6LaF5Ye66IyD5Zu055qE57uP5bqm5oiW6ICF57qs5bqm5pe277yMIEdFT0FERCDlkb3ku6TlsIbov5Tlm57kuIDkuKrplJnor69cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge0dFT0VudGl0eVtdfSBnZW9FbnRpdHlcbiAgICAgKiBAcmV0dXJucyDmlrDmt7vliqDliLDplK7ph4zpnaLnmoTnqbrpl7TlhYPntKDmlbDph4/vvIwg5LiN5YyF5ous6YKj5Lqb5bey57uP5a2Y5Zyo5L2G5piv6KKr5pu05paw55qE5YWD57SgXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdlb2FkZChrZXk6IHN0cmluZywgZ2VvRW50aXR5OiBHRU9FbnRpdHlbXSkge1xuICAgICAgICBjb25zdCByZWRpcyA9IHRoaXMucmVkaXMgYXMgYW55O1xuICAgICAgICBjb25zdCBnZW9BcnJheSA9IF8ubWFwKGdlb0VudGl0eSwgKGdlbykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIF8udG9BcnJheShnZW8pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlZGlzLmdlb2FkZChrZXksIC4uLmdlb0FycmF5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR0VPUE9TIGtleSBtZW1iZXIgW21lbWJlciAuLi5dXG4gICAgICog5LuO6ZSu6YeM6Z2i6L+U5Zue5omA5pyJ57uZ5a6a5L2N572u5YWD57Sg55qE5L2N572u77yI57uP5bqm5ZKM57qs5bqm77yJXG4gICAgICog5Zug5Li6IEdFT1BPUyDlkb3ku6TmjqXlj5flj6/lj5jmlbDph4/nmoTkvY3nva7lhYPntKDkvZzkuLrovpPlhaXvvIwg5omA5Lul5Y2z5L2/55So5oi35Y+q57uZ5a6a5LqG5LiA5Liq5L2N572u5YWD57Sg77yMIOWRveS7pOS5n+S8mui/lOWbnuaVsOe7hOWbnuWkjVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVtYmVyXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gbWVtYmVyc1xuICAgICAqIEByZXR1cm5zIEdFT1BPUyDlkb3ku6Tov5Tlm57kuIDkuKrmlbDnu4TvvIwg5pWw57uE5Lit55qE5q+P5Liq6aG56YO955Sx5Lik5Liq5YWD57Sg57uE5oiQ77yaIOesrOS4gOS4quWFg+e0oOS4uue7meWumuS9jee9ruWFg+e0oOeahOe7j+W6pu+8jCDogIznrKzkuozkuKrlhYPntKDliJnkuLrnu5nlrprkvY3nva7lhYPntKDnmoTnuqzluqZcbiAgICAgKiAsIOW9k+e7meWumueahOS9jee9ruWFg+e0oOS4jeWtmOWcqOaXtu+8jCDlr7nlupTnmoTmlbDnu4TpobnkuLrnqbrlgLxcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2VvcG9zKGtleTogc3RyaW5nLCBtZW1iZXI6IHN0cmluZywgLi4ubWVtYmVyczogc3RyaW5nW10pIHtcbiAgICAgICAgY29uc3QgcmVkaXMgPSB0aGlzLnJlZGlzIGFzIGFueTtcbiAgICAgICAgcmV0dXJuIHJlZGlzLmdlb3BvcyhrZXksIG1lbWJlciwgLi4ubWVtYmVycyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdFT0RJU1Qga2V5IG1lbWJlcjEgbWVtYmVyMiBbdW5pdF1cbiAgICAgKiDov5Tlm57kuKTkuKrnu5nlrprkvY3nva7kuYvpl7TnmoTot53nprtcbiAgICAgKiDlpoLmnpzkuKTkuKrkvY3nva7kuYvpl7TnmoTlhbbkuK3kuIDkuKrkuI3lrZjlnKjvvIwg6YKj5LmI5ZG95Luk6L+U5Zue56m65YC8XG4gICAgICog5oyH5a6a5Y2V5L2N55qE5Y+C5pWwIHVuaXQg5b+F6aG75piv5Lul5LiL5Y2V5L2N55qE5YW25Lit5LiA5LiqXG4gICAgICogbSDooajnpLrljZXkvY3kuLrnsbNcbiAgICAgKiBrbSDooajnpLrljZXkvY3kuLrljYPnsbNcbiAgICAgKiBtaSDooajnpLrljZXkvY3kuLroi7Hph4xcbiAgICAgKiBmdCDooajnpLrljZXkvY3kuLroi7HlsLpcbiAgICAgKiDlpoLmnpznlKjmiLfmsqHmnInmmL7lvI/lnLDmjIflrprljZXkvY3lj4LmlbDvvIwg6YKj5LmIIEdFT0RJU1Qg6buY6K6k5L2/55So57Gz5L2c5Li65Y2V5L2NXG4gICAgICogR0VPRElTVCDlkb3ku6TlnKjorqHnrpfot53nprvml7bkvJrlgYforr7lnLDnkIPkuLrlroznvo7nmoTnkIPlvaLvvIwg5Zyo5p6B6ZmQ5oOF5Ya15LiL77yMIOi/meS4gOWBh+iuvuacgOWkp+S8mumAoOaIkCAwLjUlIOeahOivr+W3rlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVtYmVyMVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZW1iZXIyXG4gICAgICogQHBhcmFtIHsoJ20nIHwgJ2ttJyB8ICdtaScgfCAnZnQnKX0gW3VuaXQ9J20nXVxuICAgICAqIEByZXR1cm5zIOiuoeeul+WHuueahOi3neemu+S8muS7peWPjOeyvuW6pua1rueCueaVsOeahOW9ouW8j+iiq+i/lOWbnuOAgiDlpoLmnpznu5nlrprnmoTkvY3nva7lhYPntKDkuI3lrZjlnKjvvIwg6YKj5LmI5ZG95Luk6L+U5Zue56m65YC8XG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdlb2Rpc3Qoa2V5OiBzdHJpbmcsIG1lbWJlcjE6IHN0cmluZywgbWVtYmVyMjogc3RyaW5nLCB1bml0OiAnbScgfCAna20nIHwgJ21pJyB8ICdmdCcgPSAnbScpIHtcbiAgICAgICAgY29uc3QgcmVkaXMgPSB0aGlzLnJlZGlzIGFzIGFueTtcbiAgICAgICAgcmV0dXJuIHJlZGlzLmdlb2Rpc3Qoa2V5LCBtZW1iZXIxLCBtZW1iZXIyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR0VPUkFESVVTIGtleSBsb25naXR1ZGUgbGF0aXR1ZGUgcmFkaXVzIG18a218ZnR8bWkgW1dJVEhDT09SRF0gW1dJVEhESVNUXSBbV0lUSEhBU0hdIFtBU0N8REVTQ10gW0NPVU5UIGNvdW50XVxuICAgICAqIOS7pee7meWumueahOe7j+e6rOW6puS4uuS4reW/g++8jCDov5Tlm57plK7ljIXlkKvnmoTkvY3nva7lhYPntKDlvZPkuK3vvIwg5LiO5Lit5b+D55qE6Led56a75LiN6LaF6L+H57uZ5a6a5pyA5aSn6Led56a755qE5omA5pyJ5L2N572u5YWD57SgXG4gICAgICog6IyD5Zu05Y+v5Lul5L2/55So5Lul5LiL5YW25Lit5LiA5Liq5Y2V5L2N77yaXG4gICAgICogbSDooajnpLrljZXkvY3kuLrnsbNcbiAgICAgKiBrbSDooajnpLrljZXkvY3kuLrljYPnsbNcbiAgICAgKiBtaSDooajnpLrljZXkvY3kuLroi7Hph4xcbiAgICAgKiBmdCDooajnpLrljZXkvY3kuLroi7HlsLpcbiAgICAgKlxuICAgICAqIOWcqOe7meWumuS7peS4i+WPr+mAiemhueaXtu+8jCDlkb3ku6TkvJrov5Tlm57pop3lpJbnmoTkv6Hmga9cbiAgICAgKiBXSVRIRElTVCDvvJog5Zyo6L+U5Zue5L2N572u5YWD57Sg55qE5ZCM5pe277yMIOWwhuS9jee9ruWFg+e0oOS4juS4reW/g+S5i+mXtOeahOi3neemu+S5n+S4gOW5tui/lOWbnuOAgiDot53nprvnmoTljZXkvY3lkoznlKjmiLfnu5nlrprnmoTojIPlm7TljZXkvY3kv53mjIHkuIDoh7RcbiAgICAgKiBXSVRIQ09PUkQg77yaIOWwhuS9jee9ruWFg+e0oOeahOe7j+W6puWSjOe7tOW6puS5n+S4gOW5tui/lOWbnlxuICAgICAqIFdJVEhIQVNIIO+8miDku6UgNTIg5L2N5pyJ56ym5Y+35pW05pWw55qE5b2i5byP77yMIOi/lOWbnuS9jee9ruWFg+e0oOe7j+i/h+WOn+WniyBnZW9oYXNoIOe8lueggeeahOacieW6j+mbhuWQiOWIhuWAvOOAgiDov5nkuKrpgInpobnkuLvopoHnlKjkuo7lupXlsYLlupTnlKjmiJbogIXosIPor5XvvIwg5a6e6ZmF5Lit55qE5L2c55So5bm25LiN5aSnXG4gICAgICpcbiAgICAgKiDlkb3ku6Tpu5jorqTov5Tlm57mnKrmjpLluo/nmoTkvY3nva7lhYPntKDjgIIg6YCa6L+H5Lul5LiL5Lik5Liq5Y+C5pWw77yMIOeUqOaIt+WPr+S7peaMh+Wumuiiq+i/lOWbnuS9jee9ruWFg+e0oOeahOaOkuW6j+aWueW8j1xuICAgICAqIEFTQyDvvJog5qC55o2u5Lit5b+D55qE5L2N572u77yMIOaMieeFp+S7jui/keWIsOi/nOeahOaWueW8j+i/lOWbnuS9jee9ruWFg+e0oFxuICAgICAqIERFU0Mg77yaIOagueaNruS4reW/g+eahOS9jee9ru+8jCDmjInnhafku47ov5zliLDov5HnmoTmlrnlvI/ov5Tlm57kvY3nva7lhYPntKBcbiAgICAgKlxuICAgICAqIOWcqOm7mOiupOaDheWGteS4i++8jCBHRU9SQURJVVMg5ZG95Luk5Lya6L+U5Zue5omA5pyJ5Yy56YWN55qE5L2N572u5YWD57Sg44CCIOiZveeEtueUqOaIt+WPr+S7peS9v+eUqCBDT1VOVCA8Y291bnQ+IOmAiemhueWOu+iOt+WPluWJjSBOIOS4quWMuemFjeWFg+e0oFxuICAgICAqIOS9huaYr+WboOS4uuWRveS7pOWcqOWGhemDqOWPr+iDveS8mumcgOimgeWvueaJgOacieiiq+WMuemFjeeahOWFg+e0oOi/m+ihjOWkhOeQhu+8jCDmiYDku6XlnKjlr7nkuIDkuKrpnZ7luLjlpKfnmoTljLrln5/ov5vooYzmkJzntKLml7ZcbiAgICAgKiDljbPkvb/lj6rkvb/nlKggQ09VTlQg6YCJ6aG55Y676I635Y+W5bCR6YeP5YWD57Sg77yMIOWRveS7pOeahOaJp+ihjOmAn+W6puS5n+WPr+iDveS8mumdnuW4uOaFolxuICAgICAqIOS9huaYr+S7juWPpuS4gOaWuemdouadpeivtO+8jCDkvb/nlKggQ09VTlQg6YCJ6aG55Y675YeP5bCR6ZyA6KaB6L+U5Zue55qE5YWD57Sg5pWw6YeP77yMIOWvueS6juWHj+WwkeW4puWuveadpeivtOS7jeeEtuaYr+mdnuW4uOacieeUqOeahFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbG9uZ2l0dWRlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxhdGl0dWRlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1cyDojIPlm7RcbiAgICAgKiBAcGFyYW0geygnbScgfCAna20nIHwgJ21pJyB8ICdmdCcpfSBbdW5pdD0nbSddXG4gICAgICogQHBhcmFtIHsuLi5hbnlbXX0gYXJnc1xuICAgICAqIEByZXR1cm5zIEdFT1JBRElVUyDlkb3ku6Tov5Tlm57kuIDkuKrmlbDnu4TvvIwg5YW35L2T5p2l6K+0LCDlnKjmsqHmnInnu5nlrprku7vkvZUgV0lUSCDpgInpobnnmoTmg4XlhrXkuIvvvIwg5ZG95Luk5Y+q5Lya6L+U5Zue5LiA5Liq5YOPIFtcIk5ldyBZb3JrXCIsXCJNaWxhblwiLFwiUGFyaXNcIl0g6L+Z5qC355qE57q/5oCn77yIbGluZWFy77yJ5YiX6KGo44CCXG4gICAgICog5Zyo5oyH5a6a5LqGIFdJVEhDT09SRCDjgIEgV0lUSERJU1Qg44CBIFdJVEhIQVNIIOetiemAiemhueeahOaDheWGteS4i++8jCDlkb3ku6Tov5Tlm57kuIDkuKrkuozlsYLltYzlpZfmlbDnu4TvvIwg5YaF5bGC55qE5q+P5Liq5a2Q5pWw57uE5bCx6KGo56S65LiA5Liq5YWD57Sg44CCXG4gICAgICog5Zyo6L+U5Zue5bWM5aWX5pWw57uE5pe277yMIOWtkOaVsOe7hOeahOesrOS4gOS4quWFg+e0oOaAu+aYr+S9jee9ruWFg+e0oOeahOWQjeWtl+OAgiDoh7Pkuo7pop3lpJbnmoTkv6Hmga/vvIwg5YiZ5Lya5L2c5Li65a2Q5pWw57uE55qE5ZCO57ut5YWD57Sg77yMIOaMieeFp+S7peS4i+mhuuW6j+iiq+i/lOWbnu+8mlxuICAgICAqIDEu5Lul5rWu54K55pWw5qC85byP6L+U5Zue55qE5Lit5b+D5LiO5L2N572u5YWD57Sg5LmL6Ze055qE6Led56a777yMIOWNleS9jeS4jueUqOaIt+aMh+WumuiMg+WbtOaXtueahOWNleS9jeS4gOiHtOOAglxuICAgICAqIDIuZ2VvaGFzaCDmlbTmlbDjgIJcbiAgICAgKiAzLueUseS4pOS4quWFg+e0oOe7hOaIkOeahOWdkOagh++8jOWIhuWIq+S4uue7j+W6puWSjOe6rOW6puOAglxuICAgICAqXG4gICAgICog5Li+5Liq5L6L5a2Q77yMIEdFT1JBRElVUyBTaWNpbHkgMTUgMzcgMjAwIGttIHdpdGhjb29yZCB3aXRoZGlzdCDov5nmoLfnmoTlkb3ku6Tov5Tlm57nmoTmr4/kuKrlrZDmlbDnu4Tpg73mmK/nsbvkvLzku6XkuIvmoLzlvI/nmoRcbiAgICAgKiBbXCJQYWxlcm1vXCIsXCIxOTAuNDQyNFwiLFtcIjEzLjM2MTM4OTMzODk3MDE4NFwiLFwiMzguMTE1NTU2Mzk1NDk2Mjk5XCJdXVxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZW9yYWRpdXMoXG4gICAgICAgIGtleTogc3RyaW5nLCBsb25naXR1ZGU6IG51bWJlciwgbGF0aXR1ZGU6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsXG4gICAgICAgIHVuaXQ6ICdtJyB8ICdrbScgfCAnbWknIHwgJ2Z0JyA9ICdtJywgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgY29uc3QgcmVkaXMgPSB0aGlzLnJlZGlzIGFzIGFueTtcbiAgICAgICAgcmV0dXJuIHJlZGlzLmdlb3JhZGl1cyhrZXksIGxvbmdpdHVkZSwgbGF0aXR1ZGUsIHJhZGl1cywgdW5pdCwgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdFT0hBU0gga2V5IG1lbWJlciBbbWVtYmVyIC4uLl1cbiAgICAgKiDov5Tlm57kuIDkuKrmiJblpJrkuKrkvY3nva7lhYPntKDnmoQgR2VvaGFzaCDooajnpLrjgIJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lbWJlclxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IG1lbWJlcnNcbiAgICAgKiBAcmV0dXJucyDkuIDkuKrmlbDnu4TvvIwg5pWw57uE55qE5q+P5Liq6aG56YO95piv5LiA5LiqIGdlb2hhc2gg44CCIOWRveS7pOi/lOWbnueahCBnZW9oYXNoIOeahOS9jee9ruS4jueUqOaIt+e7meWumueahOS9jee9ruWFg+e0oOeahOS9jee9ruS4gOS4gOWvueW6lOOAglxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZW9oYXNoKGtleTogc3RyaW5nLCBtZW1iZXI6IHN0cmluZywgLi4ubWVtYmVyczogc3RyaW5nW10pIHtcbiAgICAgICAgY29uc3QgcmVkaXMgPSB0aGlzLnJlZGlzIGFzIGFueTtcbiAgICAgICAgcmV0dXJuIHJlZGlzLmdlb2hhc2goa2V5LCBtZW1iZXIsIC4uLm1lbWJlcnMpO1xuICAgIH1cbn1cbiJdfQ==