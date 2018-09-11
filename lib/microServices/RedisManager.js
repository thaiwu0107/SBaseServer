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
    multi(options = { pipeline: false }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkaXNNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsibWljcm9TZXJ2aWNlcy9SZWRpc01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSxtQ0FBbUM7QUFDbkMsNEJBQTRCO0FBQzVCLDRCQUEwQjtBQUMxQixvQ0FBcUM7QUFFckMseURBQWtEO0FBRWxELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7QUF3VTdDLElBQXFCLFdBQVcsR0FBaEMsTUFBcUIsV0FBVztJQUZoQztRQUdZLFVBQUssR0FBa0Isc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQVMsQ0FBQztJQXM4Q2hGLENBQUM7SUFwOENHOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBVyxFQUFFLEtBQXNCO1FBQ2hELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBUyxDQUFDO0lBQ3hDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVcsRUFBRSxFQUFVO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBVztRQUN4QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRDs7Ozs7Ozs7Ozs7T0FXRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBVztRQUN6QixPQUFPLElBQUksQ0FBQyxLQUFL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LENBQUMsTUFBTSxDQUFDLEdBQVcsRUFBRSxLQUFVLEVBQUUsR0FBRyxJQUFjO1FBQzFELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQVcsRUFBRSxHQUFHLE9BQWM7UUFDNUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFXO1FBQzFCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNEOzs7Ozs7OztPQVFHO0lBQ0ksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQWM7UUFDaEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRDs7Ozs7Ozs7O09BU0c7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQW1CLEVBQUUsR0FBRyxJQUFjO1FBQzFELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNEOzs7Ozs7OztPQVFHO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQWM7UUFDakMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRDs7Ozs7Ozs7O09BU0c7SUFDSSxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQW1CLEVBQUUsR0FBRyxJQUFjO1FBQzNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FB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QUFHLElBQUksQ0FBQyxLQUFZLENBQUM7UUFDaEMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0osQ0FBQTtBQXY4Q29CLFdBQVc7SUFGL0IsYUFBTyxDQUFDLGFBQWEsQ0FBQztHQUVGLFdBQVcsQ0F1OEMvQjtrQkF2OENvQixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgSU9SZWRpcyBmcm9tICdpb3JlZGlzJztcbmltcG9ydCAqIGFzIGxvZzRqcyBmcm9tICdrb2EtbG9nNCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuaW1wb3J0IHsgcHJvdmlkZSB9IGZyb20gJy4uL2lvYy9pb2MnO1xuaW1wb3J0IEdFT0VudGl0eSBmcm9tICcuLi9tb2RlbHMvR0VPRW50aXR5JztcbmltcG9ydCBSZWRpc0NvbnRleHQgZnJvbSAnLi4vbW9kZWxzL1JlZGlzQ29udGV4dCc7XG5cbmNvbnN0IF9sb2cgPSBsb2c0anMuZ2V0TG9nZ2VyKCdSZWRpc01hbmdlcicpO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6aW50ZXJmYWNlLW5hbWVcbmludGVyZmFjZSBQaXBlbGluZSB7XG4gICAgcmVkaXM6IElPUmVkaXMuUmVkaXM7XG4gICAgaXNDbHVzdGVyOiBib29sZWFuO1xuICAgIG9wdGlvbnM6IElPUmVkaXMuUmVkaXNPcHRpb25zO1xuICAgIF9xdWV1ZTogSU9SZWRpcy5Db21tYW5kW107XG4gICAgX3Jlc3VsdDogYW55W107XG4gICAgX3RyYW5zYWN0aW9uczogbnVtYmVyO1xuICAgIF9zaGFUb1NjcmlwdDoge307XG4gICAgYml0Y291bnQoa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG4gICAgYml0Y291bnQoa2V5OiBzdHJpbmcsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgZ2V0KGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcbiAgICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIHNldE1vZGU6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBleHBpcnlNb2RlOiBzdHJpbmcsIHRpbWU6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBleHBpcnlNb2RlOiBzdHJpbmcsIHRpbWU6IG51bWJlciwgc2V0TW9kZTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgc2V0QnVmZmVyKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IEJ1ZmZlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuICAgIHNldEJ1ZmZlcihrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgc2V0TW9kZTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IEJ1ZmZlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICBzZXRCdWZmZXIoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGV4cGlyeU1vZGU6IHN0cmluZywgdGltZTogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IEJ1ZmZlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICBzZXRCdWZmZXIoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGV4cGlyeU1vZGU6IHN0cmluZywgdGltZTogbnVtYmVyLCBzZXRNb2RlOiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogQnVmZmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBzZXRueChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHNldGV4KGtleTogc3RyaW5nLCBzZWNvbmRzOiBudW1iZXIsIHZhbHVlOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogYW55KSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBwc2V0ZXgoa2V5OiBzdHJpbmcsIG1pbGxpc2Vjb25kczogbnVtYmVyLCB2YWx1ZTogYW55LCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgYXBwZW5kKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgc3RybGVuKGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgZGVsKC4uLmtleXM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICBleGlzdHMoLi4ua2V5czogc3RyaW5nW10pOiBQaXBlbGluZTtcblxuICAgIHNldGJpdChrZXk6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIsIHZhbHVlOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBnZXRiaXQoa2V5OiBzdHJpbmcsIG9mZnNldDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgc2V0cmFuZ2Uoa2V5OiBzdHJpbmcsIG9mZnNldDogbnVtYmVyLCB2YWx1ZTogYW55LCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgZ2V0cmFuZ2Uoa2V5OiBzdHJpbmcsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgc3Vic3RyKGtleTogc3RyaW5nLCBzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGluY3Ioa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBkZWNyKGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgbWdldCguLi5rZXlzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgcnB1c2goa2V5OiBzdHJpbmcsIC4uLnZhbHVlczogYW55W10pOiBQaXBlbGluZTtcblxuICAgIGxwdXNoKGtleTogc3RyaW5nLCAuLi52YWx1ZXM6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICBycHVzaHgoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBscHVzaHgoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgbGluc2VydChrZXk6IHN0cmluZywgZGlyZWN0aW9uOiAnQkVGT1JFJyB8ICdBRlRFUicsIHBpdm90OiBzdHJpbmcsIHZhbHVlOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBycG9wKGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgbHBvcChrZXk6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGJycG9wKC4uLmtleXM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICBibHBvcCguLi5rZXlzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIGJycG9wbHB1c2goc291cmNlOiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcsIHRpbWVvdXQ6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGxsZW4oa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBsaW5kZXgoa2V5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBsc2V0KGtleTogc3RyaW5nLCBpbmRleDogbnVtYmVyLCB2YWx1ZTogYW55LCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgbHJhbmdlKGtleTogc3RyaW5nLCBzdGFydDogbnVtYmVyLCBzdG9wOiBudW1iZXIsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogYW55KSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBsdHJpbShrZXk6IHN0cmluZywgc3RhcnQ6IG51bWJlciwgc3RvcDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgbHJlbShrZXk6IHN0cmluZywgY291bnQ6IG51bWJlciwgdmFsdWU6IGFueSwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBudW1iZXIpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHJwb3BscHVzaChzb3VyY2U6IHN0cmluZywgZGVzdGluYXRpb246IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHNhZGQoa2V5OiBzdHJpbmcsIC4uLm1lbWJlcnM6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICBzcmVtKGtleTogc3RyaW5nLCAuLi5tZW1iZXJzOiBhbnlbXSk6IFBpcGVsaW5lO1xuXG4gICAgc21vdmUoc291cmNlOiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcsIG1lbWJlcjogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgc2lzbWVtYmVyKGtleTogc3RyaW5nLCBtZW1iZXI6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiAxIHwgMCkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgc2NhcmQoa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBzcG9wKGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuICAgIHNwb3Aoa2V5OiBzdHJpbmcsIGNvdW50OiBudW1iZXIsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogYW55KSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBzcmFuZG1lbWJlcihrZXk6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcbiAgICBzcmFuZG1lbWJlcihrZXk6IHN0cmluZywgY291bnQ6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHNpbnRlciguLi5rZXlzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgc2ludGVyc3RvcmUoZGVzdGluYXRpb246IHN0cmluZywgLi4ua2V5czogc3RyaW5nW10pOiBQaXBlbGluZTtcblxuICAgIHN1bmlvbiguLi5rZXlzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgc3VuaW9uc3RvcmUoZGVzdGluYXRpb246IHN0cmluZywgLi4ua2V5czogc3RyaW5nW10pOiBQaXBlbGluZTtcblxuICAgIHNkaWZmKC4uLmtleXM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICBzZGlmZnN0b3JlKGRlc3RpbmF0aW9uOiBzdHJpbmcsIC4uLmtleXM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICBzbWVtYmVycyhrZXk6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHphZGQoa2V5OiBzdHJpbmcsIC4uLmFyZ3M6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICB6aW5jcmJ5KGtleTogc3RyaW5nLCBpbmNyZW1lbnQ6IG51bWJlciwgbWVtYmVyOiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogYW55KSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICB6cmVtKGtleTogc3RyaW5nLCAuLi5tZW1iZXJzOiBhbnlbXSk6IFBpcGVsaW5lO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIHpyZW1yYW5nZWJ5c2NvcmUoa2V5OiBzdHJpbmcsIG1pbjogbnVtYmVyIHwgc3RyaW5nLCBtYXg6IG51bWJlciB8IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHpyZW1yYW5nZWJ5cmFuayhrZXk6IHN0cmluZywgc3RhcnQ6IG51bWJlciwgc3RvcDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgenVuaW9uc3RvcmUoZGVzdGluYXRpb246IHN0cmluZywgbnVta2V5czogbnVtYmVyLCBrZXk6IHN0cmluZywgLi4uYXJnczogc3RyaW5nW10pOiBQaXBlbGluZTtcblxuICAgIHppbnRlcnN0b3JlKGRlc3RpbmF0aW9uOiBzdHJpbmcsIG51bWtleXM6IG51bWJlciwga2V5OiBzdHJpbmcsIC4uLmFyZ3M6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICB6cmFuZ2Uoa2V5OiBzdHJpbmcsIHN0YXJ0OiBudW1iZXIsIHN0b3A6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgenJhbmdlKGtleTogc3RyaW5nLCBzdGFydDogbnVtYmVyLCBzdG9wOiBudW1iZXIsIHdpdGhTY29yZXM6ICdXSVRIU0NPUkVTJywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHpyZXZyYW5nZShrZXk6IHN0cmluZywgc3RhcnQ6IG51bWJlciwgc3RvcDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICB6cmV2cmFuZ2Uoa2V5OiBzdHJpbmcsIHN0YXJ0OiBudW1iZXIsIHN0b3A6IG51bWJlciwgd2l0aFNjb3JlczogJ1dJVEhTQ09SRVMnLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgenJhbmdlYnlzY29yZShrZXk6IHN0cmluZywgbWluOiBudW1iZXIgfCBzdHJpbmcsIG1heDogbnVtYmVyIHwgc3RyaW5nLCAuLi5hcmdzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgenJldnJhbmdlYnlzY29yZShrZXk6IHN0cmluZywgbWF4OiBudW1iZXIgfCBzdHJpbmcsIG1pbjogbnVtYmVyIHwgc3RyaW5nLCAuLi5hcmdzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIHpjb3VudChrZXk6IHN0cmluZywgbWluOiBudW1iZXIgfCBzdHJpbmcsIG1heDogbnVtYmVyIHwgc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgemNhcmQoa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICB6c2NvcmUoa2V5OiBzdHJpbmcsIG1lbWJlcjogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgenJhbmsoa2V5OiBzdHJpbmcsIG1lbWJlcjogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgenJldnJhbmsoa2V5OiBzdHJpbmcsIG1lbWJlcjogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgaHNldChrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZywgdmFsdWU6IGFueSwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiAwIHwgMSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuICAgIGhzZXRCdWZmZXIoa2V5OiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogQnVmZmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBoc2V0bngoa2V5OiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogMCB8IDEpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGhnZXQoa2V5OiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG4gICAgaGdldEJ1ZmZlcihrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBCdWZmZXIpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGhtc2V0KGtleTogc3RyaW5nLCBmaWVsZDogc3RyaW5nLCB2YWx1ZTogYW55LCAuLi5hcmdzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuICAgIGhtc2V0KGtleTogc3RyaW5nLCBkYXRhOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogMCB8IDEpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGhtZ2V0KGtleTogc3RyaW5nLCAuLi5maWVsZHM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICBoaW5jcmJ5KGtleTogc3RyaW5nLCBmaWVsZDogc3RyaW5nLCBpbmNyZW1lbnQ6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBudW1iZXIpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICBoaW5jcmJ5ZmxvYXQoa2V5OiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcsIGluY3JlbWVudDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgaGRlbChrZXk6IHN0cmluZywgLi4uZmllbGRzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgaGxlbihrZXk6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBudW1iZXIpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGhrZXlzKGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgaHZhbHMoa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogYW55KSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBoZ2V0YWxsKGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgaGV4aXN0cyhrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiAwIHwgMSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgaW5jcmJ5KGtleTogc3RyaW5nLCBpbmNyZW1lbnQ6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBudW1iZXIpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGluY3JieWZsb2F0KGtleTogc3RyaW5nLCBpbmNyZW1lbnQ6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBudW1iZXIpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGRlY3JieShrZXk6IHN0cmluZywgZGVjcmVtZW50OiBudW1iZXIsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBnZXRzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBtc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCAuLi5hcmdzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgbXNldG54KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCAuLi5hcmdzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgcmFuZG9ta2V5KGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBzZWxlY3QoaW5kZXg6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIG1vdmUoa2V5OiBzdHJpbmcsIGRiOiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogMCB8IDEpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHJlbmFtZShrZXk6IHN0cmluZywgbmV3a2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICByZW5hbWVueChrZXk6IHN0cmluZywgbmV3a2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogMCB8IDEpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGV4cGlyZShrZXk6IHN0cmluZywgc2Vjb25kczogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IDAgfCAxKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBwZXhwaXJlKGtleTogc3RyaW5nLCBtaWxsaXNlY29uZHM6IG51bWJlciwgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiAwIHwgMSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgZXhwaXJlYXQoa2V5OiBzdHJpbmcsIHRpbWVzdGFtcDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IDAgfCAxKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBwZXhwaXJlYXQoa2V5OiBzdHJpbmcsIG1pbGxpc2Vjb25kc1RpbWVzdGFtcDogbnVtYmVyLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IDAgfCAxKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBrZXlzKHBhdHRlcm46IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmdbXSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgZGJzaXplKGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBhdXRoKHBhc3N3b3JkOiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBwaW5nKGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG4gICAgcGluZyhtZXNzYWdlOiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBlY2hvKG1lc3NhZ2U6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHNhdmUoY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGJnc2F2ZShjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgYmdyZXdyaXRlYW9mKGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBzaHV0ZG93bihzYXZlOiAnU0FWRScgfCAnTk9TQVZFJywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGxhc3RzYXZlKGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogbnVtYmVyKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICB0eXBlKGtleTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IHN0cmluZykgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgbXVsdGkoY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGV4ZWMoY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQcm9taXNlPGFueVtdPjtcblxuICAgIGRpc2NhcmQoY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHN5bmMoY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGZsdXNoZGIoY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGZsdXNoYWxsKGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBzb3J0KGtleTogc3RyaW5nLCAuLi5hcmdzOiBzdHJpbmdbXSk6IFBpcGVsaW5lO1xuXG4gICAgaW5mbyhjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuICAgIGluZm8oc2VjdGlvbjogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgdGltZShjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IGFueSkgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgbW9uaXRvcihjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IE5vZGVKUy5FdmVudEVtaXR0ZXIpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHR0bChrZXk6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBudW1iZXIpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHBlcnNpc3Qoa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogMCB8IDEpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHNsYXZlb2YoaG9zdDogc3RyaW5nLCBwb3J0OiBudW1iZXIsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBkZWJ1ZyguLi5hcmdzOiBhbnlbXSk6IFBpcGVsaW5lO1xuXG4gICAgY29uZmlnKC4uLmFyZ3M6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICBzdWJzY3JpYmUoLi4uY2hhbm5lbHM6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICB1bnN1YnNjcmliZSguLi5jaGFubmVsczogc3RyaW5nW10pOiBQaXBlbGluZTtcblxuICAgIHBzdWJzY3JpYmUoLi4ucGF0dGVybnM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICBwdW5zdWJzY3JpYmUoLi4ucGF0dGVybnM6IHN0cmluZ1tdKTogUGlwZWxpbmU7XG5cbiAgICBwdWJsaXNoKGNoYW5uZWw6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjYWxsYmFjaz86IChlcnI6IEVycm9yLCByZXM6IG51bWJlcikgPT4gdm9pZCk6IFBpcGVsaW5lO1xuXG4gICAgd2F0Y2goLi4ua2V5czogc3RyaW5nW10pOiBQaXBlbGluZTtcblxuICAgIHVud2F0Y2goY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIGNsdXN0ZXIoLi4uYXJnczogYW55W10pOiBQaXBlbGluZTtcblxuICAgIHJlc3RvcmUoLi4uYXJnczogYW55W10pOiBQaXBlbGluZTtcblxuICAgIG1pZ3JhdGUoLi4uYXJnczogYW55W10pOiBQaXBlbGluZTtcblxuICAgIGR1bXAoa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogKGVycjogRXJyb3IsIHJlczogc3RyaW5nKSA9PiB2b2lkKTogUGlwZWxpbmU7XG5cbiAgICBvYmplY3Qoc3ViY29tbWFuZDogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IFBpcGVsaW5lO1xuXG4gICAgY2xpZW50KC4uLmFyZ3M6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICBldmFsKC4uLmFyZ3M6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICBldmFsc2hhKC4uLmFyZ3M6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICBzY3JpcHQoLi4uYXJnczogYW55W10pOiBQaXBlbGluZTtcblxuICAgIHF1aXQoY2FsbGJhY2s/OiAoZXJyOiBFcnJvciwgcmVzOiBzdHJpbmcpID0+IHZvaWQpOiBQaXBlbGluZTtcblxuICAgIHNjYW4oY3Vyc29yOiBudW1iZXIsIC4uLmFyZ3M6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICBzc2NhbihrZXk6IHN0cmluZywgY3Vyc29yOiBudW1iZXIsIC4uLmFyZ3M6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICBoc2NhbihrZXk6IHN0cmluZywgY3Vyc29yOiBudW1iZXIsIC4uLmFyZ3M6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICB6c2NhbihrZXk6IHN0cmluZywgY3Vyc29yOiBudW1iZXIsIC4uLmFyZ3M6IGFueVtdKTogUGlwZWxpbmU7XG5cbiAgICBwZm1lcmdlKGRlc3RrZXk6IHN0cmluZywgLi4uc291cmNla2V5czogc3RyaW5nW10pOiBQaXBlbGluZTtcblxuICAgIHBmYWRkKGtleTogc3RyaW5nLCAuLi5lbGVtZW50czogc3RyaW5nW10pOiBQaXBlbGluZTtcblxuICAgIHBmY291bnQoLi4ua2V5czogc3RyaW5nW10pOiBQaXBlbGluZTtcbn1cblxuQHByb3ZpZGUoJ1JlZGlzTWFuZ2VyJylcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVkaXNNYW5nZXIge1xuICAgIHByaXZhdGUgcmVkaXM6IElPUmVkaXMuUmVkaXMgPSBSZWRpc0NvbnRleHQuZ2V0SW5zdGFuY2UoKS5nZXRSZWRpcygpIGFzIGFueTtcblxuICAgIC8qKlxuICAgICAqIOWinuWKoOS4gOWAi2tleei3n+WwjeaHieeahOWAvCwg5rKS5pyJ6YGO5pyf5pmC6ZaTXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7KG51bWJlciB8IHN0cmluZyl9IHZhbHVlXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmjInpgKDpoIbluo/ln7fooYzkvaDkuLLmjqXnmoTlkb3ku6RcbiAgICAgKiDlkITliKXlkb3ku6TnmoTmlofmqpTmjqXlj6Poq4vlj4PogINcbiAgICAgKiBAY2xhc3MgUmVkaXNNYW5nZXIg6YCZ5YCL6aGe5Yil5oiW5piv57ay6Lev5paH5Lu2XG4gICAgICogQHJldHVybnMge0lPUmVkaXMuUGlwZWxpbmV9XG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIHBpcGVsaW5lKCk6IFBpcGVsaW5lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMucGlwZWxpbmUoKSBhcyBhbnk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuk+S4gOWAi2tleeaciemBjuacn+aZgumWkyDllq7kvY3mmK/np5JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGV4XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZXhwaXJlKGtleTogc3RyaW5nLCBleDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmV4cGlyZShrZXksIGV4KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Y+W5b6X5LiA5YCLa2V56KOh6Z2i55qE6LOH5paZXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldChrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5nZXQoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6L+U5ZueIGtleSDmiYDlgqjlrZjnmoTlgLznmoTnsbvlnovjgIJcbiAgICAgKiBub25lIChrZXnkuI3lrZjlnKgpXG4gICAgICogc3RyaW5nICjlrZfnrKbkuLIpXG4gICAgICogbGlzdCAo5YiX6KGoKVxuICAgICAqIHNldCAo6ZuG5ZCIKVxuICAgICAqIHpzZXQgKOacieW6j+mbhilcbiAgICAgKiBoYXNoICjlk4jluIzooagpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHR5cGUoa2V5OiBzdHJpbmcpOiBQcm9taXNlPCdub25lJyB8ICdzdHJpbmcnIHwgJ2xpc3QnIHwgJ3NldCcgfCAnenNldCcgfCAnaGFzaCc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMudHlwZShrZXkpIGFzIGFueTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCGIGtleSDkuK3lgqjlrZjnmoTmlbDlrZflgLzlop7kuIDjgIJcbiAgICAgKiDlpoLmnpwga2V5IOS4jeWtmOWcqO+8jOmCo+S5iCBrZXkg55qE5YC85Lya5YWI6KKr5Yid5aeL5YyW5Li6IDAg77yM54S25ZCO5YaN5omn6KGMXG4gICAgICog5aaC5p6c5YC85YyF5ZCr6ZSZ6K+v55qE57G75Z6L77yM5oiW5a2X56ym5Liy57G75Z6L55qE5YC85LiN6IO96KGo56S65Li65pWw5a2X77yM6YKj5LmI6L+U5Zue5LiA5Liq6ZSZ6K+vXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGluY3Ioa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaW5jcihrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKrpmaTpgJnlgItrZXnljIXlkKvoo6HpnaLnmoTmlbjlgLxcbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBrZXlzXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZGVsKC4uLmtleXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmRlbCguLi5rZXlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5p+l6Kmi6YCZ5YCLa2V55pyJ5rKS5pyJ5a2Y5ZyoXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGV4aXN0cyhrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5leGlzdHMoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6T6YCZ5YCLa2V55oyB5LmF5YyWLOS4jeiuk+Wug+mBjuacn1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBwZXJzaXN0KGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnBlcnNpc3Qoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Lul56eS5Li65Y2V5L2N77yM6L+U5Zue57uZ5a6aIGtleSDnmoTliankvZnnlJ/lrZjml7bpl7QoVFRMLCB0aW1lIHRvIGxpdmUp44CCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHR0bChrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy50dGwoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCG57uZ5a6aIGtleSDnmoTlgLzorr7kuLogdmFsdWUg77yM5bm26L+U5ZueIGtleSDnmoTml6flgLwob2xkIHZhbHVlKeOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0geyhzdHJpbmcgfCBudW1iZXIpfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5nZXRzZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWPquacieWcqCBrZXkg5LiN5a2Y5Zyo5pe26K6+572uIGtleSDnmoTlgLzjgIJcbiAgICAgKlxuICAgICAqIOiuvue9ruaIkOWKn++8jOi/lOWbniAxIOOAglxuICAgICAqIOiuvue9ruWksei0pe+8jOi/lOWbniAwIOOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0geyhzdHJpbmcgfCBudW1iZXIpfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNldG54KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogUHJvbWlzZTwwIHwgMT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zZXRueChrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6L+U5ZueIGtleSDmiYDlgqjlrZjnmoTlrZfnrKbkuLLlgLznmoTplb/luqbjgIJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc3RybGVuKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnN0cmxlbihrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlsIYga2V5IOaJgOWCqOWtmOeahOWAvOWKoOS4iue7meWumueahOa1rueCueWinumHj+WAvO+8iGluY3JlbWVudClcbiAgICAgKiDlpoLmnpwga2V5IOS4jeWtmOWcqO+8jOmCo+S5iCBrZXkg55qE5YC85Lya5YWI6KKr5Yid5aeL5YyW5Li6IDAg77yM54S25ZCO5YaN5omn6KGMXG4gICAgICog5aaC5p6c5YC85YyF5ZCr6ZSZ6K+v55qE57G75Z6L77yM5oiW5a2X56ym5Liy57G75Z6L55qE5YC85LiN6IO96KGo56S65Li65pWw5a2X77yM6YKj5LmI6L+U5Zue5LiA5Liq6ZSZ6K+vXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmNyZW1lbnRcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBpbmNyYnlmbG9hdChrZXk6IHN0cmluZywgaW5jcmVtZW50OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaW5jcmJ5ZmxvYXQoa2V5LCBpbmNyZW1lbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlsIYga2V5IOS4reWCqOWtmOeahOaVsOWtl+WAvOWHj+S4gOOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBkZWNyKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmRlY3Ioa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICoga2V5IOaJgOWCqOWtmOeahOWAvOWHj+WOu+e7meWumueahOWHj+mHj+WAvO+8iGRlY3JlbWVudClcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZGVjcmJ5KGtleTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmRlY3JieShrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5aaC5p6cIGtleSDlt7Lnu4/lrZjlnKjlubbkuJTmmK/kuIDkuKrlrZfnrKbkuLLvvIwgQVBQRU5EIOWRveS7pOWwhuaMh+WumueahCB2YWx1ZSDov73liqDliLDor6Uga2V5IOWOn+adpeWAvO+8iHZhbHVl77yJ55qE5pyr5bC+44CCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGFwcGVuZChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWIoOmZpOmAmeWAi2tleeijoemdouS4gOS4quaIluWkmuS4qkhhc2hNYXDlrZfmrrVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGhkZWxBcnJheShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmhkZWwoa2V5LCAuLi52YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWIoOmZpOmAmeWAi2tleeijoemdouS4gOS4quaIluWkmuS4qkhhc2hNYXDlrZfmrrVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGhkZWwoa2V5OiBzdHJpbmcsIC4uLnZhbHVlOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5oZGVsKGtleSwgLi4udmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmn6XnnItIYXNoTWFwIGtleSDkuK3vvIzmjIflrprnmoTlrZfmrrXmmK/lkKblrZjlnKjjgIJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaGV4aXN0cyhrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5oZXhpc3RzKGtleSwgZmllbGQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5ZrZXnkuK0g5a2Y5YKo5ZyoSGFzaE1hcOS4reaMh+WumuWtl+auteeahOWAvFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBoZ2V0KGtleTogc3RyaW5nLCBmaWVsZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmhnZXQoa2V5LCBmaWVsZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPluWcqEhhc2hNYXDkuK3mjIflrpoga2V5IOeahOaJgOacieWtl+auteWSjOWAvFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBoZ2V0YWxsKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmhnZXRhbGwoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Li6SGFzaE1hcCBrZXkg5Lit55qE5oyH5a6aZmllbGTnmoTmlbTmlbDlgLzliqDkuIrlop7ph48gdmFsdWUg5pW05pW4XG4gICAgICog5aaC5p6cIGtleSDkuI3lrZjlnKjvvIzpgqPkuYgga2V5IOeahOWAvOS8muWFiOiiq+WIneWni+WMluS4uiAwIO+8jOeEtuWQjuWGjeaJp+ihjFxuICAgICAqIOWmguaenOWAvOWMheWQq+mUmeivr+eahOexu+Wei++8jOaIluWtl+espuS4suexu+Wei+eahOWAvOS4jeiDveihqOekuuS4uuaVsOWtl++8jOmCo+S5iOi/lOWbnuS4gOS4qumUmeivr1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBoaW5jcmJ5KGtleTogc3RyaW5nLCBmaWVsZDogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmhpbmNyYnkoa2V5LCBmaWVsZCwgdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDkuLpIYXNoTWFwIGtleSDkuK3nmoTmjIflrppmaWVsZOeahOaVtOaVsOWAvOWKoOS4iuWinumHjyB2YWx1ZSDmta7pu57mlbhcbiAgICAgKiDlpoLmnpwga2V5IOS4jeWtmOWcqO+8jOmCo+S5iCBrZXkg55qE5YC85Lya5YWI6KKr5Yid5aeL5YyW5Li6IDAg77yM54S25ZCO5YaN5omn6KGMXG4gICAgICog5aaC5p6c5YC85YyF5ZCr6ZSZ6K+v55qE57G75Z6L77yM5oiW5a2X56ym5Liy57G75Z6L55qE5YC85LiN6IO96KGo56S65Li65pWw5a2X77yM6YKj5LmI6L+U5Zue5LiA5Liq6ZSZ6K+vXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGhpbmNyYnlmbG9hdChrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZywgdmFsdWU6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5oaW5jcmJ5ZmxvYXQoa2V5LCBmaWVsZCwgdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlj5blvpfpgJnlgItIYXNoTWFwIGtleeS4reaJgOacieeahGZpZWxkc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBoa2V5cyhrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5oa2V5cyhrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5ZIYXNoTWFw5LitZmllbGRz55qE5pWw6YePXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGhsZW4oa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaGxlbihrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5bmiYDmnInmjIflrppGaWVsZHPnmoTlgLxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gZmllbGRcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBobWdldChrZXk6IHN0cmluZywgLi4uZmllbGQ6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmhtZ2V0KGtleSwgLi4uZmllbGQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5bmiYDmnInmjIflrppGaWVsZHPnmoTlgLxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gZmllbGRzXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaG1nZXRBcnJheShrZXk6IHN0cmluZywgZmllbGRzOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5obWdldChrZXksIC4uLmZpZWxkcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhNU0VUIGtleSBmaWVsZDEgdmFsdWUxIFtmaWVsZDIgdmFsdWUyIF1cbiAgICAgKiDlkIzml7blsIblpJrkuKogZmllbGQtdmFsdWUgKGZpZWxkMS12YWx1ZTEpc2V05YiwaGFzaE1hcCBrZXkg5LitXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBhcmdzXG4gICAgICogQHJldHVybnMgeyhQcm9taXNlPDAgfCAxPil9XG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGhtc2V0KGtleTogc3RyaW5nLCBmaWVsZDogc3RyaW5nLCB2YWx1ZTogYW55LCAuLi5hcmdzOiBzdHJpbmdbXSk6IFByb21pc2U8MCB8IDE+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaG1zZXQoa2V5LCBmaWVsZCwgdmFsdWUsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBITVNFVCBrZXkgZmllbGQxIHZhbHVlMSBbZmllbGQyIHZhbHVlMiBdXG4gICAgICog5ZCM5pe25bCG5aSa5LiqIGZpZWxkLXZhbHVlIChmaWVsZDEtdmFsdWUxKXNldOWIsGhhc2hNYXAga2V5IOS4rVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBmaWVsZHNcbiAgICAgKiBAcmV0dXJucyB7KFByb21pc2U8MCB8IDE+KX1cbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaG1zZXRBcnJheShrZXk6IHN0cmluZywgZmllbGRzOiBhbnlbXSk6IFByb21pc2U8MCB8IDE+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaG1zZXQoa2V5LCBmaWVsZHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBITVNFVCBrZXkgZmllbGQxIHZhbHVlMSBbZmllbGQyIHZhbHVlMiBdXG4gICAgICog5ZCM5pe25bCG5aSa5LiqIGZpZWxkLXZhbHVlIChmaWVsZDEtdmFsdWUxKXNldOWIsGhhc2hNYXAga2V5IOS4rVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge2FueX0gb2JqXG4gICAgICogQHJldHVybnMgeyhQcm9taXNlPDAgfCAxPil9XG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGhtc2V0T2JqZWN0KGtleTogc3RyaW5nLCBvYmo6IGFueSk6IFByb21pc2U8MCB8IDE+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaG1zZXQoa2V5LCBvYmopO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIU0VUIGtleSBmaWVsZCB2YWx1ZVxuICAgICAqIOWwhmhhc2hNYXAga2V5IOS4reeahOWtl+autSBmaWVsZCDnmoTlgLzorr7kuLogdmFsdWUg44CCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBoc2V0KGtleTogc3RyaW5nLCBmaWVsZDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmhzZXQoa2V5LCBmaWVsZCwgdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIU0VUTlgga2V5IGZpZWxkIHZhbHVlXG4gICAgICog5Y+q5pyJ5ZyoIGZpZWxkIOS4jeWtmOWcqOaXtu+8jOiuvue9rmhhc2hNYXAgZmllbGQg55qEIHZhbHVl44CCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBoc2V0bngoa2V5OiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaHNldG54KGtleSwgZmllbGQsIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSFZBTFMga2V5XG4gICAgICog6I635Y+WaGFzaE1hcOS4reaJgOacieeahOWAvFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBodmFscyhrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5odmFscyhrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCTFBPUCBrZXkxIFtrZXkyIF1cbiAgICAgKiDnp7vlh7rlubbojrflj5bliJfooajnmoTnrKzkuIDkuKrlhYPntKDvvIwg5aaC5p6c5YiX6KGo5rKh5pyJ5YWD57Sg5Lya6Zi75aGe5YiX6KGo55u05Yiw562J5b6F6LaF5pe25oiW5Y+R546w5Y+v5by55Ye65YWD57Sg5Li65q2iXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgYmxwb3AoLi4ua2V5OiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5ibHBvcCguLi5rZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCTFBPUCBrZXkxIFtrZXkyIF1cbiAgICAgKiDnp7vlh7rlubbojrflj5bliJfooajnmoTnrKzkuIDkuKrlhYPntKDvvIwg5aaC5p6c5YiX6KGo5rKh5pyJ5YWD57Sg5Lya6Zi75aGe5YiX6KGo55u05Yiw562J5b6F6LaF5pe25oiW5Y+R546w5Y+v5by55Ye65YWD57Sg5Li65q2iXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgYmxwb3BBcnJheShrZXk6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmJscG9wKC4uLmtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJSUE9QIGtleTEgW2tleTIgXVxuICAgICAqIOenu+WHuuW5tuiOt+WPluWIl+ihqOeahOacgOWQjuS4gOS4quWFg+e0oO+8jCDlpoLmnpzliJfooajmsqHmnInlhYPntKDkvJrpmLvloZ7liJfooajnm7TliLDnrYnlvoXotoXml7bmiJblj5HnjrDlj6/lvLnlh7rlhYPntKDkuLrmraLjgIJcbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBicnBvcCguLi5rZXk6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmJycG9wKC4uLmtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJQT1Aga2V5XG4gICAgICog56e75Ye65bm26I635Y+W5YiX6KGo55qE5pyA5ZCO5LiA5Liq5YWD57Sg77yMIOWmguaenOWIl+ihqOayoeacieWFg+e0oOS4jeacg+mYu+WhnlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBycG9wKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnJwb3Aoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQlJQT1Aga2V5MSBba2V5MiBdXG4gICAgICog56e75Ye65bm26I635Y+W5YiX6KGo55qE5pyA5ZCO5LiA5Liq5YWD57Sg77yMIOWmguaenOWIl+ihqOayoeacieWFg+e0oOS8mumYu+WhnuWIl+ihqOebtOWIsOetieW+hei2heaXtuaIluWPkeeOsOWPr+W8ueWHuuWFg+e0oOS4uuatouOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGJycG9wQXJyYXkoa2V5OiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5icnBvcCguLi5rZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCUlBPUExQVVNIIHNvdXJjZSBkZXN0aW5hdGlvbiB0aW1lb3V0XG4gICAgICog5LuO5YiX6KGo5Lit5by55Ye65LiA5Liq5YC877yM5bCG5by55Ye655qE5YWD57Sg5o+S5YWl5Yiw5Y+m5aSW5LiA5Liq5YiX6KGo5Lit5bm26L+U5Zue5a6D77ybIOWmguaenOWIl+ihqOayoeacieWFg+e0oOS8mumYu+WhnuWIl+ihqOebtOWIsOetieW+hei2heaXtuaIluWPkeeOsOWPr+W8ueWHuuWFg+e0oOS4uuatouOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZW91dFxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGJycG9wbHB1c2goc291cmNlOiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcsIHRpbWVvdXQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5icnBvcGxwdXNoKHNvdXJjZSwgZGVzdGluYXRpb24sIHRpbWVvdXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMSU5ERVgga2V5IGluZGV4XG4gICAgICog6YCa6L+HaW5kZXjojrflj5ZsaXN05Lit55qE5YWD57SgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGxpbmRleChrZXk6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5saW5kZXgoa2V5LCBpbmRleCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExMRU4ga2V5XG4gICAgICog6I635Y+W5YiX6KGo6ZW/5bqmXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGxsZW4oa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMubGxlbihrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMUE9QIGtleVxuICAgICAqIOenu+WHuuW5tuiOt+WPluWIl+ihqOeahOesrOS4gOS4quWFg+e0oCwg5aaC5p6c5YiX6KGo5rKh5pyJ5YWD57Sg5LiN5pyD6Zi75aGeXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGxwb3Aoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMubHBvcChrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMUFVTSCBrZXkgdmFsdWUxLCB2YWx1ZTIsIHZhbHVlMy4uLlxuICAgICAqIOWwhuS4gOS4quaIluWkmuS4quWAvOaPkuWFpeWIsOWIl+ihqOmgremDqFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0gey4uLmFueVtdfSB2YWx1ZXNcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBscHVzaChrZXk6IHN0cmluZywgLi4udmFsdWVzOiBhbnlbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5scHVzaChrZXksIHZhbHVlcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExQVVNIIGtleSBbdmFsdWUxLCB2YWx1ZTJdXG4gICAgICog5bCG5LiA5Liq5oiW5aSa5Liq5YC85o+S5YWl5Yiw5YiX6KGo6aCt6YOoXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7YW55W119IHZhbHVlc1xuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGxwdXNoQXJyYXkoa2V5OiBzdHJpbmcsIHZhbHVlczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMubHB1c2goa2V5LCAuLi52YWx1ZXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSUFVTSCBrZXkgdmFsdWUxLCB2YWx1ZTIsIHZhbHVlMy4uLlxuICAgICAqIOWwhuS4gOS4quaIluWkmuS4quWAvOaPkuWFpeWIsOWIl+ihqOWwvuerr1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0gey4uLmFueVtdfSB2YWx1ZXNcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBycHVzaChrZXk6IHN0cmluZywgLi4udmFsdWVzOiBhbnlbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5ycHVzaChrZXksIHZhbHVlcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJQVVNIIGtleSBbdmFsdWUxLCB2YWx1ZTJdXG4gICAgICog5bCG5LiA5Liq5oiW5aSa5Liq5YC85o+S5YWl5Yiw5YiX6KGo5bC+56uvXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7YW55W119IHZhbHVlc1xuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHJwdXNoQXJyYXkoa2V5OiBzdHJpbmcsIHZhbHVlczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMucnB1c2goa2V5LCAuLi52YWx1ZXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMUkFOR0Uga2V5IHN0YXJ0IHN0b3BcbiAgICAgKiDojrflj5bliJfooahzdGFydCBpbmRleCDliLBzdG9wIGluZGV45LmL6ZaT6IyD5Zu05YaF55qE5YWD57SgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdG9wXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgbHJhbmdlKGtleTogc3RyaW5nLCBzdGFydDogbnVtYmVyLCBzdG9wOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMubHJhbmdlKGtleSwgc3RhcnQsIHN0b3ApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMUkVNIGtleSBjb3VudCB2YWx1ZVxuICAgICAqIOenu+mZpOWIl+ihqOWFg+e0oFxuICAgICAqIOagueaNruWPguaVsCBjb3VudCDnmoTlgLzvvIznp7vpmaTliJfooajkuK3kuI7lj4LmlbAgdmFsdWUg55u4562J55qE5YWD57Sg44CCXG4gICAgICogY291bnQg55qE5YC85Y+v5Lul5piv5Lul5LiL5Yeg56eN77yaXG4gICAgICogY291bnQgPiAwIDog5LuO6KGo5aS05byA5aeL5ZCR6KGo5bC+5pCc57Si77yM56e76Zmk5LiOIHZhbHVlIOebuOetieeahOWFg+e0oO+8jOaVsOmHj+S4uiBjb3VudCDjgIJcbiAgICAgKiBjb3VudCA8IDAgOiDku47ooajlsL7lvIDlp4vlkJHooajlpLTmkJzntKLvvIznp7vpmaTkuI4gdmFsdWUg55u4562J55qE5YWD57Sg77yM5pWw6YeP5Li6IGNvdW50IOeahOe7neWvueWAvOOAglxuICAgICAqIGNvdW50ID0gMCA6IOenu+mZpOihqOS4reaJgOacieS4jiB2YWx1ZSDnm7jnrYnnmoTlgLzjgIJcbiAgICAgKlxuICAgICAqIOi/lOWbnuWIhuaIkOWFqeeorlxuICAgICAqIDEu6KKr56e76Zmk5YWD57Sg55qE5pWw6YeP44CCXG4gICAgICogMi7lm6DkuLrkuI3lrZjlnKjnmoQga2V5IOiiq+inhuS9nOepuuihqChlbXB0eSBsaXN0Ke+8jOaJgOS7peW9kyBrZXkg5LiN5a2Y5Zyo5pe277yMIExSRU0g5ZG95Luk5oC75piv6L+U5ZueIDAg44CCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBscmVtKGtleTogc3RyaW5nLCBjb3VudDogbnVtYmVyLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmxyZW0oa2V5LCBjb3VudCwgdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlsI3kuIDlgItsaXN0KOe0lOaVuOWtlynlgZpBU0PmjpLluo9cbiAgICAgKiDkuI3mnIPlsI3nlbbliY3nmoRrZXnoo6HpnaLnmoRsaXN05YGa5o6S5bqP5YSy5a2YXG4gICAgICog5bCx5piv6Kqq5q2k5pON5L2c5Y+q5pyJ57Wm5L2g55qE57WQ5p6c5pivc29ydCzlr6bpmpvkuIprZXnoo6HpnaLkuKbmspLmnInnnJ/mraPooqtzb3J0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGxpc3RTb3J0TnVtYmVyQVNDKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNvcnQoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCN5LiA5YCLbGlzdCjntJTmlbjlrZcp5YGaREVTQ+aOkuW6j1xuICAgICAqIOS4jeacg+WwjeeVtuWJjeeahGtleeijoemdoueahGxpc3TlgZrmjpLluo/lhLLlrZhcbiAgICAgKiDlsLHmmK/oqqrmraTmk43kvZzlj6rmnInntabkvaDnmoTntZDmnpzmmK9zb3J0LOWvpumam+S4imtleeijoemdouS4puaykuacieecn+ato+iiq3NvcnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgbGlzdFNvcnROdW1iZXJERVNDKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNvcnQoa2V5LCAnZGVzYycpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlsI3kuIDlgItsaXN0KOe0lHN0cmluZynlgZpBU0PmjpLluo9cbiAgICAgKiDkuI3mnIPlsI3nlbbliY3nmoRrZXnoo6HpnaLnmoRsaXN05YGa5o6S5bqP5YSy5a2YXG4gICAgICog5bCx5piv6Kqq5q2k5pON5L2c5Y+q5pyJ57Wm5L2g55qE57WQ5p6c5pivc29ydCzlr6bpmpvkuIprZXnoo6HpnaLkuKbmspLmnInnnJ/mraPooqtzb3J0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGxpc3RTb3J0U3RyaW5nQVNDKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNvcnQoa2V5LCAnQUxQSEEnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogc29ydCDlj6/ku6XlgZrlvojopIfpm5znmoTmk43kvZwgLCDlpoLmnpzkuI3lpKDnnq3op6Pnm6Hph4/kuI3opoHnjajnq4vkvb/nlKhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gYXJnc1xuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNvcnQoa2V5OiBzdHJpbmcsIC4uLmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNvcnQoa2V5LCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTFNFVCBrZXkgaW5kZXggdmFsdWVcbiAgICAgKiDpgJrov4dpbmRleOiuvue9rmxpc3RbaW5kZXhd55qEdmFsdWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGxzZXQoa2V5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMubHNldChrZXksIGluZGV4LCB2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExUUklNIGtleSBzdGFydCBzdG9wXG4gICAgICog5a+55LiA5Liq5YiX6KGo6L+b6KGM5L+u5YmqKHRyaW0p77yM5bCx5piv6K+077yM6K6p5YiX6KGo5Y+q5L+d55WZ5oyH5a6a5Yy66Ze05YaF55qE5YWD57Sg77yM5LiN5Zyo5oyH5a6a5Yy66Ze05LmL5YaF55qE5YWD57Sg6YO95bCG6KKr5Yig6Zmk44CCXG4gICAgICog5L2g5Lmf5Y+v5Lul5L2/55So6LSf5pWw5LiL5qCH77yM5LulIC0xIOihqOekuuWIl+ihqOeahOacgOWQjuS4gOS4quWFg+e0oO+8jCAtMiDooajnpLrliJfooajnmoTlgJLmlbDnrKzkuozkuKrlhYPntKDvvIzku6XmraTnsbvmjqjjgIJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0b3BcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBsdHJpbShrZXk6IHN0cmluZywgc3RhcnQ6IG51bWJlciwgc3RvcDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmx0cmltKGtleSwgc3RhcnQsIHN0b3ApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSUE9QTFBVU0ggc291cmNlIGRlc3RpbmF0aW9uXG4gICAgICog56e76Zmk5YiX6KGo55qE5pyA5ZCO5LiA5Liq5YWD57Sg77yM5bm25bCG6K+l5YWD57Sg5re75Yqg5Yiw5Y+m5LiA5Liq5YiX6KGo5bm26L+U5ZueXG4gICAgICog5bCG5YiX6KGoIHNvdXJjZSDkuK3nmoTmnIDlkI7kuIDkuKrlhYPntKAo5bC+5YWD57SgKeW8ueWHuu+8jOW5tui/lOWbnue7meWuouaIt+err+OAglxuICAgICAqIOWwhiBzb3VyY2Ug5by55Ye655qE5YWD57Sg5o+S5YWl5Yiw5YiX6KGoIGRlc3RpbmF0aW9uIO+8jOS9nOS4uiBkZXN0aW5hdGlvbiDliJfooajnmoTnmoTlpLTlhYPntKDjgIJcbiAgICAgKiDlpoLmnpwgc291cmNlIOS4jeWtmOWcqO+8jOWAvCBuaWwg6KKr6L+U5Zue77yM5bm25LiU5LiN5omn6KGM5YW25LuW5Yqo5L2c44CCXG4gICAgICog5aaC5p6cIHNvdXJjZSA9PT0gZGVzdGluYXRpb24g55u45ZCM77yM5YiZ5YiX6KGo5Lit55qE6KGo5bC+5YWD57Sg6KKr56e75Yqo5Yiw6KGo5aS077yM5bm26L+U5Zue6K+l5YWD57Sg77yM5Y+v5Lul5oqK6L+Z56eN54m55q6K5oOF5Ya16KeG5L2c5YiX6KGo55qE5peL6L2sKHJvdGF0aW9uKeaTjeS9nOOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb25cbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBycG9wbHB1c2goc291cmNlOiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMucnBvcGxwdXNoKHNvdXJjZSwgZGVzdGluYXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSUFVTSFgga2V5IHZhbHVlXG4gICAgICog5Li65bey5a2Y5Zyo55qE5YiX6KGoIOWKoOWIsOihqOWwvlxuICAgICAqIOW9kyBrZXkg5LiN5a2Y5Zyo5pe277yM5LuA5LmI5Lmf5LiN5YGaXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBycHVzaHgoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMucnB1c2h4KGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMUFVTSFgga2V5IHZhbHVlXG4gICAgICog5Li65bey5a2Y5Zyo55qE5YiX6KGoIOWKoOWIsOihqOmgrVxuICAgICAqIOW9kyBrZXkg5LiN5a2Y5Zyo5pe277yM5LuA5LmI5Lmf5LiN5YGaXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBscHVzaHgoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMubHB1c2h4KGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlsIYga2V5IOaJgOWCqOWtmOeahOWAvOWKoOS4iue7meWumueahOWinumHj+WAvO+8iGluY3JlbWVudClcbiAgICAgKiDlpoLmnpwga2V5IOS4jeWtmOWcqO+8jOmCo+S5iCBrZXkg55qE5YC85Lya5YWI6KKr5Yid5aeL5YyW5Li6IDAg77yM54S25ZCO5YaN5omn6KGMXG4gICAgICog5aaC5p6c5YC85YyF5ZCr6ZSZ6K+v55qE57G75Z6L77yM5oiW5a2X56ym5Liy57G75Z6L55qE5YC85LiN6IO96KGo56S65Li65pWw5a2X77yM6YKj5LmI6L+U5Zue5LiA5Liq6ZSZ6K+vXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmNyZW1lbnRcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBpbmNyYnkoa2V5OiBzdHJpbmcsIGluY3JlbWVudDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmluY3JieShrZXksIGluY3JlbWVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1TRVROWCBrZXkgdmFsdWUgW2tleSB2YWx1ZSAuLi5dXG4gICAgICog5ZCM5pe26K6+572u5LiA5Liq5oiW5aSa5LiqIGtleS12YWx1ZSDlr7nvvIzkuKbkuJTlj6rmnInnlbbmiYDmnInnu5nlrpoga2V5IOmDveS4jeWtmOWcqOaJjeacg+Wft+ihjOOAglxuICAgICAqIOWNs+S9v+WPquacieS4gOS4que7meWumiBrZXkg5bey5a2Y5Zyo77yMIE1TRVROWCDkuZ/kvJrmi5Lnu53miafooYzmiYDmnInnu5nlrpoga2V5IOeahOiuvue9ruaTjeS9nOOAglxuICAgICAqIE1TRVROWCDmmK/ljp/lrZDmgKfnmoRcbiAgICAgKiDlm6DmraTlroPlj6/ku6XnlKjkvZzorr7nva7lpJrkuKrkuI3lkIwga2V5IOihqOekuuS4jeWQjOWtl+autShmaWVsZCnnmoTllK/kuIDmgKfpgLvovpHlr7nosaEodW5pcXVlIGxvZ2ljIG9iamVjdClcbiAgICAgKiDmiYDmnInlrZfmrrXopoHkuYjlhajooqvorr7nva7vvIzopoHkuYjlhajkuI3ooqvorr7nva7jgIJcbiAgICAgKlxuICAgICAqIOW9k+aJgOaciSBrZXkg6YO95oiQ5Yqf6K6+572u77yM6L+U5ZueIDEg44CCXG4gICAgICog5aaC5p6c5omA5pyJ57uZ5a6aIGtleSDpg73orr7nva7lpLHotKUo6Iez5bCR5pyJ5LiA5LiqIGtleSDlt7Lnu4/lrZjlnKgp77yM6YKj5LmI6L+U5ZueIDAg44CCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBhcmdzXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgbXNldG54KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCAuLi5hcmdzOiBzdHJpbmdbXSk6IFByb21pc2U8MCB8IDE+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMubXNldG54KGtleSwgdmFsdWUsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTQUREIGtleSBtZW1iZXIgW21lbWJlciAuLi5dXG4gICAgICog5bCG5LiA5Liq5oiW5aSa5LiqIG1lbWJlciDlhYPntKDliqDlhaXliLDpm4blkIgga2V5IOW9k+S4re+8jOW3sue7j+WtmOWcqOS6jumbhuWQiOeahCBtZW1iZXIg5YWD57Sg5bCG6KKr5b+955WlXG4gICAgICog5YGH5aaCIGtleSDkuI3lrZjlnKjvvIzliJnliJvlu7rkuIDkuKrlj6rljIXlkKsgbWVtYmVyIOWFg+e0oOS9nOaIkOWRmOeahOmbhuWQiFxuICAgICAqIOW9kyBrZXkg5LiN5piv6ZuG5ZCI57G75Z6L5pe277yM6L+U5Zue5LiA5Liq6ZSZ6K+vXG4gICAgICpcbiAgICAgKiDov5Tlm55cbiAgICAgKiDooqvmt7vliqDliLDpm4blkIjkuK3nmoTmlrDlhYPntKDnmoTmlbDph4/vvIzkuI3ljIXmi6zooqvlv73nlaXnmoTlhYPntKBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsuLi5hbnlbXX0gbWVtYmVyc1xuICAgICAqIEByZXR1cm5zIHsoUHJvbWlzZTxhbnk+KX1cbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2FkZChrZXk6IHN0cmluZywgLi4ubWVtYmVyczogYW55W10pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zYWRkKGtleSwgLi4ubWVtYmVycyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNDQVJEIGtleVxuICAgICAqIOi/lOWbnumbhuWQiCBrZXkg55qE5Z+65pWwKOmbhuWQiOS4reWFg+e0oOeahOaVsOmHjylcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2NhcmQoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc2NhcmQoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU0RJRkYga2V5IFtrZXkgLi4uXVxuICAgICAqIOavlOi8g+WFqeWAi1NldOmbhuWQiOS4reeahOW3rueVsCzov5Tlm57lt67nlbBcbiAgICAgKiDov5Tlm57kuIDkuKrpm4blkIjnmoTlhajpg6jmiJDlkZjvvIzor6Xpm4blkIjmmK/miYDmnInnu5nlrprpm4blkIjkuYvpl7TnmoTlt67pm4bjgIJcbiAgICAgKiDkuI3lrZjlnKjnmoQga2V5IOiiq+inhuS4uuepuumbhuOAglxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGtleXNcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzZGlmZiguLi5rZXlzOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zZGlmZiguLi5rZXlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU0RJRkZTVE9SRSBkZXN0aW5hdGlvbiBrZXkgW2tleSAuLi5dXG4gICAgICog6L+Z5Liq5ZG95Luk55qE5L2c55So5ZKMIFNESUZGIOexu+S8vO+8jOS9huWug+Wwhue7k+aenOS/neWtmOWIsCBkZXN0aW5hdGlvbiDpm4blkIjvvIzogIzkuI3mmK/nroDljZXlnLDov5Tlm57nu5Pmnpzpm4ZcbiAgICAgKiDlpoLmnpwgZGVzdGluYXRpb24g6ZuG5ZCI5bey57uP5a2Y5Zyo77yM5YiZ5bCG5YW26KaG55uWXG4gICAgICogZGVzdGluYXRpb24g5Y+v5Lul5pivIOiHquW3seimhuiTi+iHquW3sVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvblxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGtleXNcbiAgICAgKiBAcmV0dXJucyDnu5Pmnpzpm4bkuK3nmoTlhYPntKDmlbDph49cbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2RpZmZzdG9yZShkZXN0aW5hdGlvbjogc3RyaW5nLCAuLi5rZXlzOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zZGlmZnN0b3JlKGRlc3RpbmF0aW9uLCAuLi5rZXlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU0lOVEVSIGtleSBba2V5IC4uLl1cbiAgICAgKiDov5Tlm57kuIDkuKrpm4blkIjnmoTlhajpg6jmiJDlkZjvvIzor6Xpm4blkIjmmK/miYDmnInnu5nlrprpm4blkIjnmoTkuqTpm4ZcbiAgICAgKiDkuI3lrZjlnKjnmoQga2V5IOiiq+inhuS4uuepuumbhlxuICAgICAqIOW9k+e7meWumumbhuWQiOW9k+S4reacieS4gOS4quepuumbhuaXtu+8jOe7k+aenOS5n+S4uuepuumbhijmoLnmja7pm4blkIjov5DnrpflrprlvospXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0ga2V5c1xuICAgICAqIEByZXR1cm5zIOS6pOmbhuaIkOWRmOeahOWIl+ihqFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzaW50ZXIoLi4ua2V5czogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc2ludGVyKC4uLmtleXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTSU5URVJTVE9SRSBkZXN0aW5hdGlvbiBrZXkgW2tleSAuLi5dXG4gICAgICog6L+Z5Liq5ZG95Luk57G75Ly85LqOIFNJTlRFUiDlkb3ku6TvvIzkvYblroPlsIbnu5Pmnpzkv53lrZjliLAgZGVzdGluYXRpb24g6ZuG5ZCI77yM6ICM5LiN5piv566A5Y2V5Zyw6L+U5Zue57uT5p6c6ZuGXG4gICAgICog5aaC5p6cIGRlc3RpbmF0aW9uIOmbhuWQiOW3sue7j+WtmOWcqO+8jOWImeWwhuWFtuimhuebllxuICAgICAqIGRlc3RpbmF0aW9uIOWPr+S7peaYryDoh6rlt7Hopobok4voh6rlt7FcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb25cbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBrZXlzXG4gICAgICogQHJldHVybnMgeyBQcm9taXNlPG51bWJlcj59IOe7k+aenOmbhuS4reeahOaIkOWRmOaVsOmHj1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzaW50ZXJzdG9yZShkZXN0aW5hdGlvbjogc3RyaW5nLCAuLi5rZXlzOiBzdHJpbmdbXSk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNpbnRlcnN0b3JlKGRlc3RpbmF0aW9uLCAuLi5rZXlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU0lTTUVNQkVSIGtleSBtZW1iZXJcbiAgICAgKiDliKTmlq0gbWVtYmVyIOWFg+e0oOaYr+WQpumbhuWQiCBrZXkg55qE5oiQ5ZGYXG4gICAgICpcbiAgICAgKiDlpoLmnpwgbWVtYmVyIOWFg+e0oOaYr+mbhuWQiOeahOaIkOWRmO+8jOi/lOWbniAxXG4gICAgICog5aaC5p6cIG1lbWJlciDlhYPntKDkuI3mmK/pm4blkIjnmoTmiJDlkZjvvIzmiJYga2V5IOS4jeWtmOWcqO+8jOi/lOWbniAwXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZW1iZXJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTwwIHwgMT59XG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNpc21lbWJlcihrZXk6IHN0cmluZywgbWVtYmVyOiBzdHJpbmcpOiBQcm9taXNlPDAgfCAxPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNpc21lbWJlcihrZXksIG1lbWJlcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNNRU1CRVJTIGtleVxuICAgICAqIOi/lOWbnumbhuWQiCBrZXkg5Lit55qE5omA5pyJ5oiQ5ZGYXG4gICAgICog5LiN5a2Y5Zyo55qEIGtleSDooqvop4bkuLrnqbrpm4blkIhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnMg6ZuG5ZCI5Lit55qE5omA5pyJ5oiQ5ZGYXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNtZW1iZXJzKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNtZW1iZXJzKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNNT1ZFIHNvdXJjZSBkZXN0aW5hdGlvbiBtZW1iZXJcbiAgICAgKiDlsIYgbWVtYmVyIOWFg+e0oOS7jiBzb3VyY2Ug6ZuG5ZCI56e75Yqo5YiwIGRlc3RpbmF0aW9uIOmbhuWQiFxuICAgICAqIFNNT1ZFIOaYr+WOn+WtkOaAp+aTjeS9nFxuICAgICAqIOWmguaenCBzb3VyY2Ug6ZuG5ZCI5LiN5a2Y5Zyo5oiW5LiN5YyF5ZCr5oyH5a6a55qEIG1lbWJlciDlhYPntKDvvIzliJkgU01PVkUg5ZG95Luk5LiN5omn6KGM5Lu75L2V5pON5L2c77yM5LuF6L+U5ZueIDBcbiAgICAgKiDlkKbliJnvvIwgbWVtYmVyIOWFg+e0oOS7jiBzb3VyY2Ug6ZuG5ZCI5Lit6KKr56e76Zmk77yM5bm25re75Yqg5YiwIGRlc3RpbmF0aW9uIOmbhuWQiOS4reWOu1xuICAgICAqIOW9kyBkZXN0aW5hdGlvbiDpm4blkIjlt7Lnu4/ljIXlkKsgbWVtYmVyIOWFg+e0oOaXtu+8jCBTTU9WRSDlkb3ku6Tlj6rmmK/nroDljZXlnLDlsIYgc291cmNlIOmbhuWQiOS4reeahCBtZW1iZXIg5YWD57Sg5Yig6ZmkXG4gICAgICog5b2TIHNvdXJjZSDmiJYgZGVzdGluYXRpb24g5LiN5piv6ZuG5ZCI57G75Z6LKFNldCnml7bvvIzov5Tlm57kuIDkuKrplJnor69cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc291cmNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lbWJlclxuICAgICAqIEByZXR1cm5zIOWmguaenCBtZW1iZXIg5YWD57Sg6KKr5oiQ5Yqf56e76Zmk77yM6L+U5ZueXG4gICAgICogICAgICAgICAg5aaC5p6cIG1lbWJlciDlhYPntKDkuI3mmK8gc291cmNlIOmbhuWQiOeahOaIkOWRmO+8jOW5tuS4lOayoeacieS7u+S9leaTjeS9nOWvuSBkZXN0aW5hdGlvbiDpm4blkIjmiafooYzvvIzpgqPkuYjov5Tlm54gMFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzbW92ZShzb3VyY2U6IHN0cmluZywgZGVzdGluYXRpb246IHN0cmluZywgbWVtYmVyOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc21vdmUoc291cmNlLCBkZXN0aW5hdGlvbiwgbWVtYmVyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU1BPUCBrZXkgY291bnQ/XG4gICAgICog56e76Zmk5bm26L+U5Zue6ZuG5ZCI5Lit55qEIGNvdW50IOS4qumaj+acuuWFg+e0oFxuICAgICAqIOWmguaenOS4jei8uOWFpWNvdW505bCx5piv6Zqo5qmf5LiA5YCL5YWD57SgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbY291bnRdXG4gICAgICogQHJldHVybnMg6KKr56e76Zmk55qE6ZqP5py65YWD57SgXG4gICAgICogICAgICAgICAg5b2TIGtleSDkuI3lrZjlnKjmiJYga2V5IOaYr+epuumbhuaXtu+8jOi/lOWbniBuaWxcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc3BvcChrZXk6IHN0cmluZywgY291bnQ/OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc3BvcChrZXksIGNvdW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU1JBTkRNRU1CRVIga2V5IGNvdW50P1xuICAgICAqIOWmguaenOWRveS7pOaJp+ihjOaXtu+8jOWPquaPkOS+m+S6hiBrZXkg5Y+C5pWw77yM6YKj5LmI6L+U5Zue6ZuG5ZCI5Lit55qE5LiA5Liq6ZqP5py65YWD57SgXG4gICAgICog5LuOIFJlZGlzIDIuNiDniYjmnKzlvIDlp4vvvIwgU1JBTkRNRU1CRVIg5ZG95Luk5o6l5Y+X5Y+v6YCJ55qEIGNvdW50IOWPguaVsFxuICAgICAqIOWmguaenCBjb3VudCDkuLrmraPmlbDvvIzkuJTlsI/kuo7pm4blkIjln7rmlbDvvIzpgqPkuYjlkb3ku6Tov5Tlm57kuIDkuKrljIXlkKsgY291bnQg5Liq5YWD57Sg55qE5pWw57uEXG4gICAgICog5pWw57uE5Lit55qE5YWD57Sg5ZCE5LiN55u45ZCM44CC5aaC5p6cIGNvdW50IOWkp+S6juetieS6jumbhuWQiOWfuuaVsO+8jOmCo+S5iOi/lOWbnuaVtOS4qumbhuWQiFxuICAgICAqXG4gICAgICog5aaC5p6cIGNvdW50IOS4uui0n+aVsO+8jOmCo+S5iOWRveS7pOi/lOWbnuS4gOS4quaVsOe7hO+8jOaVsOe7hOS4reeahOWFg+e0oOWPr+iDveS8mumHjeWkjeWHuueOsOWkmuasoVxuICAgICAqIOiAjOaVsOe7hOeahOmVv+W6puS4uiBjb3VudCDnmoTnu53lr7nlgLxcbiAgICAgKlxuICAgICAqIOivpeaTjeS9nOWSjCBTUE9QIOebuOS8vO+8jOS9hiBTUE9QIOWwhumaj+acuuWFg+e0oOS7jumbhuWQiOS4reenu+mZpOW5tui/lOWbnlxuICAgICAqIOiAjCBTUkFORE1FTUJFUiDliJnku4Xku4Xov5Tlm57pmo/mnLrlhYPntKDvvIzogIzkuI3lr7npm4blkIjov5vooYzku7vkvZXmlLnliqhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtjb3VudD9dXG4gICAgICogQHJldHVybnMg5Y+q5o+Q5L6bIGtleSDlj4LmlbDml7bvvIzov5Tlm57kuIDkuKrlhYPntKDvvJvlpoLmnpzpm4blkIjkuLrnqbrvvIzov5Tlm54gbmlsXG4gICAgICog5aaC5p6c5o+Q5L6b5LqGIGNvdW50IOWPguaVsO+8jOmCo+S5iOi/lOWbnuS4gOS4quaVsOe7hO+8m+WmguaenOmbhuWQiOS4uuepuu+8jOi/lOWbnuepuuaVsOe7hFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzcmFuZG1lbWJlcihrZXk6IHN0cmluZywgY291bnQ/OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc3JhbmRtZW1iZXIoa2V5LCBjb3VudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNSRU0ga2V5IG1lbWJlciBbbWVtYmVyIC4uLl1cbiAgICAgKiDnp7vpmaTpm4blkIgga2V5IOS4reeahOS4gOS4quaIluWkmuS4qiBtZW1iZXIg5YWD57Sg77yM5LiN5a2Y5Zyo55qEIG1lbWJlciDlhYPntKDkvJrooqvlv73nlaVcbiAgICAgKiDlvZMga2V5IOS4jeaYr+mbhuWQiOexu+WeiyhTZXQp77yM6L+U5Zue5LiA5Liq6ZSZ6K+vXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Li4uYW55W119IG1lbWJlcnNcbiAgICAgKiBAcmV0dXJucyDooqvmiJDlip/np7vpmaTnmoTlhYPntKDnmoTmlbDph4/vvIzkuI3ljIXmi6zooqvlv73nlaXnmoTlhYPntKBcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc3JlbShrZXk6IHN0cmluZywgLi4ubWVtYmVyczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc3JlbShrZXksIC4uLm1lbWJlcnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTVU5JT04ga2V5IFtrZXkgLi4uXVxuICAgICAqIOi/lOWbnuS4gOS4qumbhuWQiOeahOWFqOmDqOaIkOWRmO+8jOivpembhuWQiOaYr+aJgOaciee7meWumumbhuWQiOeahOW5tumbhlxuICAgICAqIOS4jeWtmOWcqOeahCBrZXkg6KKr6KeG5Li656m66ZuGXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0ga2V5c1xuICAgICAqIEByZXR1cm5zIOW5tumbhuaIkOWRmOeahOWIl+ihqFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzdW5pb24oLi4ua2V5czogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc3VuaW9uKC4uLmtleXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTVU5JT05TVE9SRSBkZXN0aW5hdGlvbiBrZXkgW2tleSAuLi5dXG4gICAgICog6L+Z5Liq5ZG95Luk57G75Ly85LqOIFNVTklPTiDlkb3ku6TvvIzkvYblroPlsIbnu5Pmnpzkv53lrZjliLAgZGVzdGluYXRpb24g6ZuG5ZCI77yM6ICM5LiN5piv566A5Y2V5Zyw6L+U5Zue57uT5p6c6ZuGXG4gICAgICog5aaC5p6cIGRlc3RpbmF0aW9uIOW3sue7j+WtmOWcqO+8jOWImeWwhuWFtuimhuebllxuICAgICAqIGRlc3RpbmF0aW9uIOWPr+S7peaYryBrZXkg6Ieq5bex6KaG6JOL5pys6LqrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0ga2V5c1xuICAgICAqIEByZXR1cm5zIOe7k+aenOmbhuS4reeahOWFg+e0oOaVsOmHj1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzdW5pb25zdG9yZShkZXN0aW5hdGlvbjogc3RyaW5nLCAuLi5rZXlzOiBzdHJpbmdbXSk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnN1bmlvbnN0b3JlKGRlc3RpbmF0aW9uLCAuLi5rZXlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUFNVQlNDUklCRSBwYXR0ZXJuIFtwYXR0ZXJuIC4uLl1cbiAgICAgKiDorqLpmIXkuIDkuKrmiJblpJrkuKrnrKblkIjnu5nlrprmqKHlvI/nmoTpopHpgZNcbiAgICAgKiDmr4/kuKrmqKHlvI/ku6UgKiDkvZzkuLrljLnphY3nrKbvvIzmr5TlpoIgaXQqIOWMuemFjeaJgOacieS7pSBpdCDlvIDlpLTnmoTpopHpgZMoIGl0Lm5ld3Mg44CBIGl0LmJsb2cg44CBIGl0LnR3ZWV0cyDnrYnnrYkpXG4gICAgICogbmV3cy4qIOWMuemFjeaJgOacieS7pSBuZXdzLiDlvIDlpLTnmoTpopHpgZMoIG5ld3MuaXQg44CBIG5ld3MuZ2xvYmFsLnRvZGF5IOetieetiSnvvIzor7jlpoLmraTnsbtcbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBwYXR0ZXJuc1xuICAgICAqIEByZXR1cm5zIOaOpeaUtuWIsOeahOS/oeaBr1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBwc3Vic2NyaWJlKC4uLnBhdHRlcm5zOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5wc3Vic2NyaWJlKC4uLnBhdHRlcm5zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUFVCTElTSCBjaGFubmVsIG1lc3NhZ2VcbiAgICAgKiDlsIbkv6Hmga8gbWVzc2FnZSDlj5HpgIHliLDmjIflrprnmoTpopHpgZMgY2hhbm5lbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcmV0dXJucyDmjqXmlLbliLDkv6Hmga8gbWVzc2FnZSDnmoTorqLpmIXogIXmlbDph49cbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcHVibGlzaChjaGFubmVsOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5wdWJsaXNoKGNoYW5uZWwsIG1lc3NhZ2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQVU5TVUJTQ1JJQkUgW3BhdHRlcm4gW3BhdHRlcm4gLi4uXV1cbiAgICAgKiDmjIfnpLrlrqLmiLfnq6/pgIDorqLmiYDmnInnu5nlrprmqKHlvI9cbiAgICAgKiDlpoLmnpzmsqHmnInmqKHlvI/ooqvmjIflrprvvIzkuZ/ljbPmmK/vvIzkuIDkuKrml6Dlj4LmlbDnmoQgUFVOU1VCU0NSSUJFIOiwg+eUqOiiq+aJp+ihjCDpgqPkuYjlrqLmiLfnq6/kvb/nlKggUFNVQlNDUklCRSDlkb3ku6TorqLpmIXnmoTmiYDmnInmqKHlvI/pg73kvJrooqvpgIDorqLjgIJcbiAgICAgKiDlnKjov5nnp43mg4XlhrXkuIvvvIzlkb3ku6TkvJrov5Tlm57kuIDkuKrkv6Hmga/vvIzlkYrnn6XlrqLmiLfnq6/miYDmnInooqvpgIDorqLnmoTmqKHlvI9cbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBwYXR0ZXJuc1xuICAgICAqIEByZXR1cm5zIOi/meS4quWRveS7pOWcqOS4jeWQjOeahOWuouaIt+err+S4reacieS4jeWQjOeahOihqOeOsFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBwdW5zdWJzY3JpYmUoLi4ucGF0dGVybnM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnB1bnN1YnNjcmliZSguLi5wYXR0ZXJucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNVQlNDUklCRSBjaGFubmVsIFtjaGFubmVsIC4uLl1cbiAgICAgKiDorqLpmIXnu5nlrprnmoTkuIDkuKrmiJblpJrkuKrpopHpgZPnmoTkv6Hmga9cbiAgICAgKiBAcGFyYW0gey4uLmFueVtdfSBjaGFubmVsc1xuICAgICAqIEByZXR1cm5zIOaOpeaUtuWIsOeahOS/oeaBryDlj4PogIMgaHR0cDovL3JlZGlzZG9jLmNvbS9wdWJfc3ViL3N1YnNjcmliZS5odG1sXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHN1YnNjcmliZSguLi5jaGFubmVsczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc3Vic2NyaWJlKC4uLmNoYW5uZWxzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVU5TVUJTQ1JJQkUgW2NoYW5uZWwgW2NoYW5uZWwgLi4uXV1cbiAgICAgKiDmjIfnpLrlrqLmiLfnq6/pgIDorqLnu5nlrprnmoTpopHpgZNcbiAgICAgKiDlpoLmnpzmsqHmnInpopHpgZPooqvmjIflrprvvIzkuZ/ljbPmmK/vvIzkuIDkuKrml6Dlj4LmlbDnmoQgVU5TVUJTQ1JJQkUg6LCD55So6KKr5omn6KGM77yM6YKj5LmI5a6i5oi356uv5L2/55SoIFNVQlNDUklCRSDlkb3ku6TorqLpmIXnmoTmiYDmnInpopHpgZPpg73kvJrooqvpgIDorqLjgIJcbiAgICAgKiDlnKjov5nnp43mg4XlhrXkuIvvvIzlkb3ku6TkvJrov5Tlm57kuIDkuKrkv6Hmga/vvIzlkYrnn6XlrqLmiLfnq6/miYDmnInooqvpgIDorqLnmoTpopHpgZNcbiAgICAgKiBAcGFyYW0gey4uLmFueVtdfSBjaGFubmVsc1xuICAgICAqIEByZXR1cm5zIOi/meS4quWRveS7pOWcqOS4jeWQjOeahOWuouaIt+err+S4reacieS4jeWQjOeahOihqOeOsFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB1bnN1YnNjcmliZSguLi5jaGFubmVsczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMudW5zdWJzY3JpYmUoLi4uY2hhbm5lbHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXQVRDSCBrZXkgW2tleSAuLi5dXG4gICAgICog55uR6KeG5LiA5LiqKOaIluWkmuS4qikga2V5IO+8jOWmguaenOWcqOS6i+WKoeaJp+ihjOS5i+WJjei/meS4qijmiJbov5nkupspIGtleSDooqvlhbbku5blkb3ku6TmiYDmlLnliqjvvIzpgqPkuYjkuovliqHlsIbooqvmiZPmlq1cbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBrZXlzXG4gICAgICogQHJldHVybnMg5oC75piv6L+U5ZueIE9LXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHdhdGNoKC4uLmtleXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLndhdGNoKC4uLmtleXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVTldBVENIXG4gICAgICog5Y+W5raIIFdBVENIIOWRveS7pOWvueaJgOaciSBrZXkg55qE55uR6KeGXG4gICAgICog5aaC5p6c5Zyo5omn6KGMIFdBVENIIOWRveS7pOS5i+WQju+8jCBFWEVDIOWRveS7pOaIliBESVNDQVJEIOWRveS7pOWFiOiiq+aJp+ihjOS6hueahOivne+8jOmCo+S5iOWwseS4jemcgOimgeWGjeaJp+ihjCBVTldBVENIIOS6hlxuICAgICAqIOWboOS4uiBFWEVDIOWRveS7pOS8muaJp+ihjOS6i+WKoe+8jOWboOatpCBXQVRDSCDlkb3ku6TnmoTmlYjmnpzlt7Lnu4/kuqfnlJ/kuoZcbiAgICAgKlxuICAgICAqIOiAjCBESVNDQVJEIOWRveS7pOWcqOWPlua2iOS6i+WKoeeahOWQjOaXtuS5n+S8muWPlua2iOaJgOacieWvuSBrZXkg55qE55uR6KeGXG4gICAgICog5Zug5q2k6L+Z5Lik5Liq5ZG95Luk5omn6KGM5LmL5ZCO77yM5bCx5rKh5pyJ5b+F6KaB5omn6KGMIFVOV0FUQ0gg5LqGXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgdW53YXRjaCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMudW53YXRjaCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFWEVDXG4gICAgICog5omn6KGM5omA5pyJ5LqL5Yqh5Z2X5YaF55qE5ZG95LukXG4gICAgICog5YGH5aaC5p+Q5LiqKOaIluafkOS6mykga2V5IOato+WkhOS6jiBXQVRDSCDlkb3ku6TnmoTnm5Hop4bkuYvkuIvvvIzkuJTkuovliqHlnZfkuK3mnInlkozov5nkuKoo5oiW6L+Z5LqbKSBrZXkg55u45YWz55qE5ZG95LukXG4gICAgICog6YKj5LmIIEVYRUMg5ZG95Luk5Y+q5Zyo6L+Z5LiqKOaIlui/meS6mykga2V5IOayoeacieiiq+WFtuS7luWRveS7pOaJgOaUueWKqOeahOaDheWGteS4i+aJp+ihjOW5tueUn+aViO+8jOWQpuWImeivpeS6i+WKoeiiq+aJk+aWrShhYm9ydClcbiAgICAgKiBAcmV0dXJucyDkuovliqHlnZflhoXmiYDmnInlkb3ku6TnmoTov5Tlm57lgLzvvIzmjInlkb3ku6TmiafooYznmoTlhYjlkI7pobrluo/mjpLliJdcbiAgICAgKiDlvZPmk43kvZzooqvmiZPmlq3ml7bvvIzov5Tlm57nqbrlgLwgbmlsXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGV4ZWMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmV4ZWMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRVhFQ1xuICAgICAqIOaJp+ihjOaJgOacieS6i+WKoeWdl+WGheeahOWRveS7pFxuICAgICAqIOWBh+WmguafkOS4qijmiJbmn5DkupspIGtleSDmraPlpITkuo4gV0FUQ0gg5ZG95Luk55qE55uR6KeG5LmL5LiL77yM5LiU5LqL5Yqh5Z2X5Lit5pyJ5ZKM6L+Z5LiqKOaIlui/meS6mykga2V5IOebuOWFs+eahOWRveS7pFxuICAgICAqIOmCo+S5iCBFWEVDIOWRveS7pOWPquWcqOi/meS4qijmiJbov5nkupspIGtleSDmsqHmnInooqvlhbbku5blkb3ku6TmiYDmlLnliqjnmoTmg4XlhrXkuIvmiafooYzlubbnlJ/mlYjvvIzlkKbliJnor6XkuovliqHooqvmiZPmlq0oYWJvcnQpXG4gICAgICogQHBhcmFtIHsoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWR9IGNhbGxiYWNrXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZXhlY1BpcGVsaW5lKGNhbGxiYWNrOiAoZXJyOiBFcnJvciwgcmVzOiBhbnkpID0+IHZvaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuZXhlYyhjYWxsYmFjayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERJU0NBUkRcbiAgICAgKiDlj5bmtojkuovliqHvvIzmlL7lvIPmiafooYzkuovliqHlnZflhoXnmoTmiYDmnInlkb3ku6RcbiAgICAgKiDlpoLmnpzmraPlnKjkvb/nlKggV0FUQ0gg5ZG95Luk55uR6KeG5p+Q5LiqKOaIluafkOS6mykga2V577yM6YKj5LmI5Y+W5raI5omA5pyJ55uR6KeG77yM562J5ZCM5LqO5omn6KGM5ZG95LukIFVOV0FUQ0hcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBkaXNjYXJkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5kaXNjYXJkKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIChjbHVzdGVy5qih5byP5LiL54Sh5rOV5L2/55So6YCZ5YCLKSlcbiAgICAgKiBNVUxUSVxuICAgICAqIOagh+iusOS4gOS4quS6i+WKoeWdl+eahOW8gOWni1xuICAgICAqIOS6i+WKoeWdl+WGheeahOWkmuadoeWRveS7pOS8muaMieeFp+WFiOWQjumhuuW6j+iiq+aUvui/m+S4gOS4qumYn+WIl+W9k+S4re+8jOacgOWQjueUsSBFWEVDIOWRveS7pOWOn+WtkOaApyhhdG9taWMp5Zyw5omn6KGMXG4gICAgICogQHBhcmFtIHt7IHBpcGVsaW5lOiBmYWxzZSB9fSBvcHRpb25zXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgbXVsdGkob3B0aW9uczogeyBwaXBlbGluZTogZmFsc2UgfSA9IHsgcGlwZWxpbmU6IGZhbHNlIH0pOiBQaXBlbGluZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLm11bHRpKG9wdGlvbnMpIGFzIGFueTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogKGNsdXN0ZXLmqKHlvI/kuIvlj6rog73kvb/nlKjpgJnlgIspKVxuICAgICAqIChQaXBlbGluZSlcbiAgICAgKiBNVUxUSVxuICAgICAqIOagh+iusOS4gOS4quS6i+WKoeWdl+eahOW8gOWni1xuICAgICAqIOS6i+WKoeWdl+WGheeahOWkmuadoeWRveS7pOS8muaMieeFp+WFiOWQjumhuuW6j+iiq+aUvui/m+S4gOS4qumYn+WIl+W9k+S4re+8jOacgOWQjueUsSBFWEVDIOWRveS7pOWOn+WtkOaApyhhdG9taWMp5Zyw5omn6KGMXG4gICAgICogQHBhcmFtIHt7IHBpcGVsaW5lOiBmYWxzZSB9fSBvcHRpb25zXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgbXVsdGlQaXBlbGluZShjb21tYW5kcz86IHN0cmluZ1tdW10sIG9wdGlvbnM/OiBJT1JlZGlzLk11bHRpT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5tdWx0aShjb21tYW5kcywgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFpBREQga2V5IHNjb3JlIG1lbWJlciBbW3Njb3JlIG1lbWJlcl0gW3Njb3JlIG1lbWJlcl0gLi4uXVxuICAgICAqIOWwhuS4gOS4quaIluWkmuS4qiBtZW1iZXIg5YWD57Sg5Y+K5YW2IHNjb3JlIOWAvOWKoOWFpeWIsOacieW6j+mbhiBrZXkg5b2T5LitXG4gICAgICog5aaC5p6c5p+Q5LiqIG1lbWJlciDlt7Lnu4/mmK/mnInluo/pm4bnmoTmiJDlkZjvvIzpgqPkuYjmm7TmlrDov5nkuKogbWVtYmVyIOeahCBzY29yZSDlgLzvvIzlubbpgJrov4fph43mlrDmj5LlhaXov5nkuKogbWVtYmVyIOWFg+e0oO+8jOadpeS/neivgeivpSBtZW1iZXIg5Zyo5q2j56Gu55qE5L2N572u5LiKXG4gICAgICogc2NvcmUg5YC85Y+v5Lul5piv5pW05pWw5YC85oiW5Y+M57K+5bqm5rWu54K55pWwXG4gICAgICog5aaC5p6ca2V55LiN5a2Y5Zyo77yM5YmH5Ym15bu65LiA5YCL56m655qE5pyJ5bqP6ZuG5Lim5Z+36KGMWkFEROaTjeS9nFxuICAgICAqIOeVtmtleeWtmOWcqOS9huS4jeaYr+acieW6j+mbhumhnuWei+aZgu+8jOi/lOWbnuS4gOWAi+mMr+iqpFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBhcmdzXG4gICAgICogQHJldHVybnMg6KKr5oiQ5Yqf5re75Yqg55qE5paw5oiQ5ZGY55qE5pWw6YeP77yM5LiN5YyF5ous6YKj5Lqb6KKr5pu05paw55qE44CB5bey57uP5a2Y5Zyo55qE5oiQ5ZGYXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHphZGQoa2V5OiBzdHJpbmcsIC4uLmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnphZGQoa2V5LCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogWkNBUkQga2V5XG4gICAgICog6L+U5Zue5pyJ5bqP6ZuGIGtleSDnmoTln7rmlbBcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJucyDlvZMga2V5IOWtmOWcqOS4lOaYr+acieW6j+mbhuexu+Wei+aXtu+8jOi/lOWbnuacieW6j+mbhueahOWfuuaVsCwg5b2TIGtleSDkuI3lrZjlnKjml7bvvIzov5Tlm54gMFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB6Y2FyZChrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy56Y2FyZChrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBaQ09VTlQga2V5IG1pbiBtYXhcbiAgICAgKiDov5Tlm57mnInluo/pm4Yga2V5IOS4re+8jCBzY29yZSDlgLzlnKggbWluIOWSjCBtYXgg5LmL6Ze0KOm7mOiupOWMheaLrCBzY29yZSDlgLznrYnkuo4gbWluIOaIliBtYXggKeeahOaIkOWRmOeahOaVsOmHj1xuICAgICAqIOWFs+S6juWPguaVsCBtaW4g5ZKMIG1heCDnmoTor6bnu4bkvb/nlKjmlrnms5XvvIzor7flj4LogIMgWlJBTkdFQllTQ09SRSDlkb3ku6RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsobnVtYmVyIHwgc3RyaW5nKX0gbWluXG4gICAgICogQHBhcmFtIHsobnVtYmVyIHwgc3RyaW5nKX0gbWF4XG4gICAgICogQHJldHVybnMgc2NvcmUg5YC85ZyoIG1pbiDlkowgbWF4IOS5i+mXtOeahOaIkOWRmOeahOaVsOmHj1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB6Y291bnQoa2V5OiBzdHJpbmcsIG1pbjogbnVtYmVyIHwgc3RyaW5nLCBtYXg6IG51bWJlciB8IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy56Y291bnQoa2V5LCBtaW4sIG1heCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFpJTkNSQlkga2V5IGluY3JlbWVudCBtZW1iZXJcbiAgICAgKiDngrrmnInluo/pm4ZrZXnnmoTmiJDlk6FtZW1iZXLnmoRzY29yZeWAvOWKoOS4iuWinumHj2luY3JlbWVudFxuICAgICAqIOWPr+S7pemAmui/h+S8oOmAkuS4gOS4qui0n+aVsOWAvCBpbmNyZW1lbnQg77yM6K6pIHNjb3JlIOWHj+WOu+ebuOW6lOeahOWAvO+8jOavlOWmgiBaSU5DUkJZIGtleSAtNSBtZW1iZXIg77yM5bCx5piv6K6pIG1lbWJlciDnmoQgc2NvcmUg5YC85YeP5Y67IDVcbiAgICAgKiDlvZMga2V5IOS4jeWtmOWcqO+8jOaIliBtZW1iZXIg5LiN5pivIGtleSDnmoTmiJDlkZjml7bvvIwgWklOQ1JCWSBrZXkgaW5jcmVtZW50IG1lbWJlciDnrYnlkIzkuo4gWkFERCBrZXkgaW5jcmVtZW50IG1lbWJlclxuICAgICAqIOeVtmtleeS4jeaYr+acieW6j+mbhumhnuWei+aZgu+8jOi/lOWbnuS4gOWAi+mMr+iqpFxuICAgICAqIGluY3JlbWVudCDlgLzlj6/ku6XmmK/mlbTmlbjlgLzmiJbpm5nnsr7luqbmta7pu57mlbhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluY3JlbWVudFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZW1iZXJcbiAgICAgKiBAcmV0dXJucyBtZW1iZXLmiJDlk6HnmoTmlrBzY29yZeWAvO+8jOS7peWtl+espuS4suW9ouW8j+ihqOekulxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB6aW5jcmJ5KGtleTogc3RyaW5nLCBpbmNyZW1lbnQ6IG51bWJlciwgbWVtYmVyOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuemluY3JieShrZXksIGluY3JlbWVudCwgbWVtYmVyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogWlJBTkdFIGtleSBzdGFydCBzdG9wXG4gICAgICog6L+U5Zue5pyJ5bqP6ZuGIGtleSDkuK3vvIzmjIflrprljLrpl7TlhoXnmoTmiJDlkZhcbiAgICAgKiDlhbbkuK3miJDlkZjnmoTkvY3nva7mjIkgc2NvcmUg5YC86YCS5aKeKOS7juWwj+WIsOWkpynmnaXmjpLluo9cbiAgICAgKiDlhbfmnInnm7jlkIwgc2NvcmUg5YC855qE5oiQ5ZGY5oyJ5a2X5YW45bqPKGxleGljb2dyYXBoaWNhbCBvcmRlciAp5p2l5o6S5YiXIGh0dHBzOi8vemgud2lraXBlZGlhLm9yZy93aWtpLyVFNSVBRCU5NyVFNSU4NSVCOCVFNSVCQSU4RlxuICAgICAqIOWmguaenOS9oOmcgOimgeaIkOWRmOaMiSBzY29yZSDlgLzpgJLlh48o5LuO5aSn5Yiw5bCPKeadpeaOkuWIl++8jOivt+S9v+eUqCBaUkVWUkFOR0Ug5ZG95LukXG4gICAgICog5LiL5qCH5Y+C5pWwIHN0YXJ0IOWSjCBzdG9wIOmDveS7pSAwIOS4uuW6le+8jOS5n+WwseaYr+ivtO+8jOS7pSAwIOihqOekuuacieW6j+mbhuesrOS4gOS4quaIkOWRmO+8jOS7pSAxIOihqOekuuacieW6j+mbhuesrOS6jOS4quaIkOWRmO+8jOS7peatpOexu+aOqFxuICAgICAqIOS9oOS5n+WPr+S7peS9v+eUqOi0n+aVsOS4i+agh++8jOS7pSAtMSDooajnpLrmnIDlkI7kuIDkuKrmiJDlkZjvvIwgLTIg6KGo56S65YCS5pWw56ys5LqM5Liq5oiQ5ZGY77yM5Lul5q2k57G75o6oXG4gICAgICog6LaF5Ye66IyD5Zu055qE5LiL5qCH5bm25LiN5Lya5byV6LW36ZSZ6K+vXG4gICAgICpcbiAgICAgKiDmr5TlpoLor7TvvIzlvZMgc3RhcnQg55qE5YC85q+U5pyJ5bqP6ZuG55qE5pyA5aSn5LiL5qCH6L+Y6KaB5aSn77yM5oiW5pivIHN0YXJ0ID4gc3RvcCDml7bvvIwgWlJBTkdFIOWRveS7pOWPquaYr+eugOWNleWcsOi/lOWbnuS4gOS4quepuuWIl+ihqFxuICAgICAqIOWPpuS4gOaWuemdou+8jOWBh+WmgiBzdG9wIOWPguaVsOeahOWAvOavlOacieW6j+mbhueahOacgOWkp+S4i+agh+i/mOimgeWkp++8jOmCo+S5iCBSZWRpcyDlsIYgc3RvcCDlvZPkvZzmnIDlpKfkuIvmoIfmnaXlpITnkIZcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0b3BcbiAgICAgKiBAcmV0dXJucyDmjIflrprljLrpl7TlhoXvvIznmoTmnInluo/pm4bmiJDlkZjnmoTliJfooahcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgenJhbmdlKGtleTogc3RyaW5nLCBzdGFydDogbnVtYmVyLCBzdG9wOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuenJhbmdlKGtleSwgc3RhcnQsIHN0b3ApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBaUkFOR0Uga2V5IHN0YXJ0IHN0b3BcbiAgICAgKiDov5Tlm57mnInluo/pm4Yga2V5IOS4re+8jOaMh+WumuWMuumXtOWGheeahOaIkOWRmFxuICAgICAqIOWFtuS4reaIkOWRmOeahOS9jee9ruaMiSBzY29yZSDlgLzpgJLlop4o5LuO5bCP5Yiw5aSnKeadpeaOkuW6j1xuICAgICAqIOWFt+acieebuOWQjCBzY29yZSDlgLznmoTmiJDlkZjmjInlrZflhbjluo8obGV4aWNvZ3JhcGhpY2FsIG9yZGVyICnmnaXmjpLliJcgaHR0cHM6Ly96aC53aWtpcGVkaWEub3JnL3dpa2kvJUU1JUFEJTk3JUU1JTg1JUI4JUU1JUJBJThGXG4gICAgICog5aaC5p6c5L2g6ZyA6KaB5oiQ5ZGY5oyJIHNjb3JlIOWAvOmAkuWHjyjku47lpKfliLDlsI8p5p2l5o6S5YiX77yM6K+35L2/55SoIFpSRVZSQU5HRSDlkb3ku6RcbiAgICAgKiDkuIvmoIflj4LmlbAgc3RhcnQg5ZKMIHN0b3Ag6YO95LulIDAg5Li65bqV77yM5Lmf5bCx5piv6K+077yM5LulIDAg6KGo56S65pyJ5bqP6ZuG56ys5LiA5Liq5oiQ5ZGY77yM5LulIDEg6KGo56S65pyJ5bqP6ZuG56ys5LqM5Liq5oiQ5ZGY77yM5Lul5q2k57G75o6oXG4gICAgICog5L2g5Lmf5Y+v5Lul5L2/55So6LSf5pWw5LiL5qCH77yM5LulIC0xIOihqOekuuacgOWQjuS4gOS4quaIkOWRmO+8jCAtMiDooajnpLrlgJLmlbDnrKzkuozkuKrmiJDlkZjvvIzku6XmraTnsbvmjqhcbiAgICAgKiDotoXlh7rojIPlm7TnmoTkuIvmoIflubbkuI3kvJrlvJXotbfplJnor69cbiAgICAgKlxuICAgICAqIOavlOWmguivtO+8jOW9kyBzdGFydCDnmoTlgLzmr5TmnInluo/pm4bnmoTmnIDlpKfkuIvmoIfov5jopoHlpKfvvIzmiJbmmK8gc3RhcnQgPiBzdG9wIOaXtu+8jCBaUkFOR0Ug5ZG95Luk5Y+q5piv566A5Y2V5Zyw6L+U5Zue5LiA5Liq56m65YiX6KGoXG4gICAgICog5Y+m5LiA5pa56Z2i77yM5YGH5aaCIHN0b3Ag5Y+C5pWw55qE5YC85q+U5pyJ5bqP6ZuG55qE5pyA5aSn5LiL5qCH6L+Y6KaB5aSn77yM6YKj5LmIIFJlZGlzIOWwhiBzdG9wIOW9k+S9nOacgOWkp+S4i+agh+adpeWkhOeQhlxuICAgICAqXG4gICAgICog5Y+v5Lul6YCa6L+H5L2/55SoIFdJVEhTQ09SRVMg6YCJ6aG577yM5p2l6K6p5oiQ5ZGY5ZKM5a6D55qEIHNjb3JlIOWAvOS4gOW5tui/lOWbnu+8jOi/lOWbnuWIl+ihqOS7pSB2YWx1ZTEsc2NvcmUxLCAuLi4sIHZhbHVlTixzY29yZU4g55qE5qC85byP6KGo56S6XG4gICAgICog5a6i5oi356uv5bqT5Y+v6IO95Lya6L+U5Zue5LiA5Lqb5pu05aSN5p2C55qE5pWw5o2u57G75Z6L77yM5q+U5aaC5pWw57uE44CB5YWD57uE562JXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdG9wXG4gICAgICogQHJldHVybnMg5oyH5a6a5Yy66Ze05YaF77yM5bim5pyJIHNjb3JlIOWAvCjlj6/pgIkp55qE5pyJ5bqP6ZuG5oiQ5ZGY55qE5YiX6KGoXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHpyYW5nZVdpdGhTY29yZXMoa2V5OiBzdHJpbmcsIHN0YXJ0OiBudW1iZXIsIHN0b3A6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy56cmFuZ2Uoa2V5LCBzdGFydCwgc3RvcCwgJ1dJVEhTQ09SRVMnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogWlJBTkdFQllTQ09SRSBrZXkgbWluIG1heCBbV0lUSFNDT1JFU10gW0xJTUlUIG9mZnNldCBjb3VudF1cbiAgICAgKiDov5Tlm57mnInluo/pm4Yga2V5IOS4re+8jOaJgOaciSBzY29yZSDlgLzku4vkuo4gbWluIOWSjCBtYXgg5LmL6Ze0KOWMheaLrOetieS6jiBtaW4g5oiWIG1heCAp55qE5oiQ5ZGY44CC5pyJ5bqP6ZuG5oiQ5ZGY5oyJIHNjb3JlIOWAvOmAkuWinijku47lsI/liLDlpKcp5qyh5bqP5o6S5YiXXG4gICAgICog5YW35pyJ55u45ZCMIHNjb3JlIOWAvOeahOaIkOWRmOaMieWtl+WFuOW6jyhsZXhpY29ncmFwaGljYWwgb3JkZXIp5p2l5o6S5YiXKOivpeWxnuaAp+aYr+acieW6j+mbhuaPkOS+m+eahO+8jOS4jemcgOimgemineWklueahOiuoeeulylcbiAgICAgKiBodHRwczovL3poLndpa2lwZWRpYS5vcmcvd2lraS8lRTUlQUQlOTclRTUlODUlQjglRTUlQkElOEZcbiAgICAgKlxuICAgICAqIOWPr+mAieeahCBMSU1JVCDlj4LmlbDmjIflrprov5Tlm57nu5PmnpznmoTmlbDph4/lj4rljLrpl7Qo5bCx5YOPU1FM5Lit55qEIFNFTEVDVCBMSU1JVCBvZmZzZXQsIGNvdW50IClcbiAgICAgKiDms6jmhI/lvZMgb2Zmc2V0IOW+iOWkp+aXtu+8jOWumuS9jSBvZmZzZXQg55qE5pON5L2c5Y+v6IO96ZyA6KaB6YGN5Y6G5pW05Liq5pyJ5bqP6ZuG77yM5q2k6L+H56iL5pyA5Z2P5aSN5p2C5bqm5Li6IE8oTikg5pe26Ze0XG4gICAgICpcbiAgICAgKiDlj6/pgInnmoQgV0lUSFNDT1JFUyDlj4LmlbDlhrPlrprnu5Pmnpzpm4bmmK/ljZXljZXov5Tlm57mnInluo/pm4bnmoTmiJDlkZjvvIzov5jmmK/lsIbmnInluo/pm4bmiJDlkZjlj4rlhbYgc2NvcmUg5YC85LiA6LW36L+U5ZueXG4gICAgICogbWluIOWSjCBtYXgg5Y+v5Lul5pivIC1pbmYg5ZKMICtpbmYg77yM6L+Z5qC35LiA5p2l77yM5L2g5bCx5Y+v5Lul5Zyo5LiN55+l6YGT5pyJ5bqP6ZuG55qE5pyA5L2O5ZKM5pyA6auYIHNjb3JlIOWAvOeahOaDheWGteS4i++8jOS9v+eUqCBaUkFOR0VCWVNDT1JFIOi/meexu+WRveS7pFxuICAgICAqIOm7mOiupOaDheWGteS4i++8jOWMuumXtOeahOWPluWAvOS9v+eUqOmXreWMuumXtCAo5bCP5LqO562J5LqO5oiW5aSn5LqO562J5LqOKe+8jOS9oOS5n+WPr+S7pemAmui/h+e7meWPguaVsOWJjeWinuWKoCAoIOespuWPt+adpeS9v+eUqOWPr+mAieeahOW8gOWMuumXtCAo5bCP5LqO5oiW5aSn5LqOKVxuICAgICAqXG4gICAgICog5Li+5Liq5L6L5a2QOlxuICAgICAqIDEuXG4gICAgICogWlJBTkdFQllTQ09SRSBrZXkgKDEgNVxuICAgICAqIOi/lOWbnuaJgOacieespuWQiOadoeS7tiAxIDwgc2NvcmUgPD0gNSDnmoTmiJDlkZhcbiAgICAgKlxuICAgICAqIDIuXG4gICAgICogWlJBTkdFQllTQ09SRSBrZXkgKDUgKDEwXG4gICAgICog5YiZ6L+U5Zue5omA5pyJ56ym5ZCI5p2h5Lu2IDUgPCBzY29yZSA8IDEwIOeahOaIkOWRmFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0geyhudW1iZXIgfCBzdHJpbmcpfSBtaW5cbiAgICAgKiBAcGFyYW0geyhudW1iZXIgfCBzdHJpbmcpfSBtYXhcbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBhcmdzXG4gICAgICogQHJldHVybnMg5oyH5a6a5Yy66Ze05YaF77yM5bim5pyJIHNjb3JlIOWAvCjlj6/pgIkp55qE5pyJ5bqP6ZuG5oiQ5ZGY55qE5YiX6KGoXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHpyYW5nZWJ5c2NvcmUoa2V5OiBzdHJpbmcsIG1pbjogbnVtYmVyIHwgc3RyaW5nLCBtYXg6IG51bWJlciB8IHN0cmluZywgLi4uYXJnczogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuenJhbmdlYnlzY29yZShrZXksIG1pbiwgbWF4LCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogWlJBTksga2V5IG1lbWJlclxuICAgICAqIOi/lOWbnuacieW6j+mbhiBrZXkg5Lit5oiQ5ZGYIG1lbWJlciDnmoTmjpLlkI3jgILlhbbkuK3mnInluo/pm4bmiJDlkZjmjIkgc2NvcmUg5YC86YCS5aKeKOS7juWwj+WIsOWkpynpobrluo/mjpLliJdcbiAgICAgKiDmjpLlkI3ku6UgMCDkuLrlupXvvIzkuZ/lsLHmmK/or7TvvIwgc2NvcmUg5YC85pyA5bCP55qE5oiQ5ZGY5o6S5ZCN5Li6IDBcbiAgICAgKiDkvb/nlKggWlJFVlJBTksg5ZG95Luk5Y+v5Lul6I635b6X5oiQ5ZGY5oyJIHNjb3JlIOWAvOmAkuWHjyjku47lpKfliLDlsI8p5o6S5YiX55qE5o6S5ZCNXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZW1iZXJcbiAgICAgKiBAcmV0dXJucyDlpoLmnpwgbWVtYmVyIOaYr+acieW6j+mbhiBrZXkg55qE5oiQ5ZGY77yM6L+U5ZueIG1lbWJlciDnmoTmjpLlkI0sIOWmguaenCBtZW1iZXIg5LiN5piv5pyJ5bqP6ZuGIGtleSDnmoTmiJDlkZjvvIzov5Tlm54gbmlsXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHpyYW5rKGtleTogc3RyaW5nLCBtZW1iZXI6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy56cmFuayhrZXksIG1lbWJlcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFpSRU0ga2V5IG1lbWJlciBbbWVtYmVyIC4uLl1cbiAgICAgKiDnp7vpmaTmnInluo/pm4Yga2V5IOS4reeahOS4gOS4quaIluWkmuS4quaIkOWRmO+8jOS4jeWtmOWcqOeahOaIkOWRmOWwhuiiq+W/veeVpVxuICAgICAqIOW9kyBrZXkg5a2Y5Zyo5L2G5LiN5piv5pyJ5bqP6ZuG57G75Z6L5pe277yM6L+U5Zue5LiA5Liq6ZSZ6K+vXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Li4uYW55W119IG1lbWJlcnNcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB6cmVtKGtleTogc3RyaW5nLCAuLi5tZW1iZXJzOiBhbnlbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy56cmVtKGtleSwgLi4ubWVtYmVycyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFpSRU1SQU5HRUJZUkFOSyBrZXkgc3RhcnQgc3RvcFxuICAgICAqIOenu+mZpOacieW6j+mbhiBrZXkg5Lit77yM5oyH5a6a5o6S5ZCNKHJhbmsp5Yy66Ze05YaF55qE5omA5pyJ5oiQ5ZGYXG4gICAgICog5Yy66Ze05YiG5Yir5Lul5LiL5qCH5Y+C5pWwIHN0YXJ0IOWSjCBzdG9wIOaMh+WHuu+8jOWMheWQqyBzdGFydCDlkowgc3RvcCDlnKjlhoVcbiAgICAgKiDkuIvmoIflj4LmlbAgc3RhcnQg5ZKMIHN0b3Ag6YO95LulIDAg5Li65bqV77yM5Lmf5bCx5piv6K+077yM5LulIDAg6KGo56S65pyJ5bqP6ZuG56ys5LiA5Liq5oiQ5ZGY77yM5LulIDEg6KGo56S65pyJ5bqP6ZuG56ys5LqM5Liq5oiQ5ZGY77yM5Lul5q2k57G75o6oXG4gICAgICog5L2g5Lmf5Y+v5Lul5L2/55So6LSf5pWw5LiL5qCH77yM5LulIC0xIOihqOekuuacgOWQjuS4gOS4quaIkOWRmO+8jCAtMiDooajnpLrlgJLmlbDnrKzkuozkuKrmiJDlkZjvvIzku6XmraTnsbvmjqhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0b3BcbiAgICAgKiBAcmV0dXJucyDooqvnp7vpmaTmiJDlkZjnmoTmlbDph49cbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgenJlbXJhbmdlYnlyYW5rKGtleTogc3RyaW5nLCBzdGFydDogbnVtYmVyLCBzdG9wOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy56cmVtcmFuZ2VieXJhbmsoa2V5LCBzdGFydCwgc3RvcCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFpSRU1SQU5HRUJZU0NPUkUga2V5IG1pbiBtYXhcbiAgICAgKiDnp7vpmaTmnInluo/pm4Yga2V5IOS4re+8jOaJgOaciSBzY29yZSDlgLzku4vkuo4gbWluIOWSjCBtYXgg5LmL6Ze0KOWMheaLrOetieS6jiBtaW4g5oiWIG1heCAp55qE5oiQ5ZGYXG4gICAgICogc2NvcmUg5YC8562J5LqOIG1pbiDmiJYgbWF4IOeahOaIkOWRmOS5n+WPr+S7peS4jeWMheaLrOWcqOWGhe+8jOivpuaDheivt+WPguingSBaUkFOR0VCWVNDT1JFIOWRveS7pFxuICAgICAqIGh0dHA6Ly9yZWRpc2RvYy5jb20vc29ydGVkX3NldC96cmFuZ2VieXNjb3JlLmh0bWwjenJhbmdlYnlzY29yZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0geyhudW1iZXIgfCBzdHJpbmcpfSBtaW5cbiAgICAgKiBAcGFyYW0geyhudW1iZXIgfCBzdHJpbmcpfSBtYXhcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fSDooqvnp7vpmaTmiJDlkZjnmoTmlbDph49cbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgenJlbXJhbmdlYnlzY29yZShrZXk6IHN0cmluZywgbWluOiBudW1iZXIgfCBzdHJpbmcsIG1heDogbnVtYmVyIHwgc3RyaW5nKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuenJlbXJhbmdlYnlzY29yZShrZXksIG1pbiwgbWF4KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogWlJFVlJBTkdFIGtleSBzdGFydCBzdG9wXG4gICAgICog6L+U5Zue5pyJ5bqP6ZuGIGtleSDkuK3vvIzmjIflrprljLrpl7TlhoXnmoTmiJDlkZhcbiAgICAgKiDlhbbkuK3miJDlkZjnmoTkvY3nva7mjIkgc2NvcmUg5YC86YCS5YePKOS7juWkp+WIsOWwjynmnaXmjpLliJdcbiAgICAgKiDlhbfmnInnm7jlkIwgc2NvcmUg5YC855qE5oiQ5ZGY5oyJ5a2X5YW45bqP55qE6YCG5bqPKHJldmVyc2UgbGV4aWNvZ3JhcGhpY2FsIG9yZGVyKeaOkuWIl1xuICAgICAqIGh0dHBzOi8vemgud2lraXBlZGlhLm9yZy93aWtpLyVFNSVBRCU5NyVFNSU4NSVCOCVFNSVCQSU4RlxuICAgICAqXG4gICAgICog6Zmk5LqG5oiQ5ZGY5oyJIHNjb3JlIOWAvOmAkuWHj+eahOasoeW6j+aOkuWIl+i/meS4gOeCueWklu+8jCBaUkVWUkFOR0Ug5ZG95Luk55qE5YW25LuW5pa56Z2i5ZKMIFpSQU5HRSDlkb3ku6TkuIDmoLdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0b3BcbiAgICAgKiBAcmV0dXJucyDmjIflrprljLrpl7TlhoXvvIzluKbmnIkgc2NvcmUg5YC8KOWPr+mAiSnnmoTmnInluo/pm4bmiJDlkZjnmoTliJfooahcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgenJldnJhbmdlKGtleTogc3RyaW5nLCBzdGFydDogbnVtYmVyLCBzdG9wOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuenJldnJhbmdlKGtleSwgc3RhcnQsIHN0b3ApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBaUkVWUkFOR0Uga2V5IHN0YXJ0IHN0b3AgW1dJVEhTQ09SRVNdXG4gICAgICog6L+U5Zue5pyJ5bqP6ZuGIGtleSDkuK3vvIzmjIflrprljLrpl7TlhoXnmoTmiJDlkZhcbiAgICAgKiDlhbbkuK3miJDlkZjnmoTkvY3nva7mjIkgc2NvcmUg5YC86YCS5YePKOS7juWkp+WIsOWwjynmnaXmjpLliJdcbiAgICAgKiDlhbfmnInnm7jlkIwgc2NvcmUg5YC855qE5oiQ5ZGY5oyJ5a2X5YW45bqP55qE6YCG5bqPKHJldmVyc2UgbGV4aWNvZ3JhcGhpY2FsIG9yZGVyKeaOkuWIl1xuICAgICAqIGh0dHBzOi8vemgud2lraXBlZGlhLm9yZy93aWtpLyVFNSVBRCU5NyVFNSU4NSVCOCVFNSVCQSU4RlxuICAgICAqXG4gICAgICog6Zmk5LqG5oiQ5ZGY5oyJIHNjb3JlIOWAvOmAkuWHj+eahOasoeW6j+aOkuWIl+i/meS4gOeCueWklu+8jCBaUkVWUkFOR0Ug5ZG95Luk55qE5YW25LuW5pa56Z2i5ZKMIFpSQU5HRSDlkb3ku6TkuIDmoLdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0b3BcbiAgICAgKiBAcmV0dXJucyDmjIflrprljLrpl7TlhoXvvIzluKbmnIkgc2NvcmUg5YC8KOWPr+mAiSnnmoTmnInluo/pm4bmiJDlkZjnmoTliJfooahcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgenJldnJhbmdlV2l0aFNjb3JlcyhrZXk6IHN0cmluZywgc3RhcnQ6IG51bWJlciwgc3RvcDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnpyZXZyYW5nZShrZXksIHN0YXJ0LCBzdG9wLCAnV0lUSFNDT1JFUycpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBaUkVWUkFOR0VCWVNDT1JFIGtleSBtYXggbWluIFtXSVRIU0NPUkVTXSBbTElNSVQgb2Zmc2V0IGNvdW50XVxuICAgICAqIOi/lOWbnuacieW6j+mbhiBrZXkg5Lit77yMIHNjb3JlIOWAvOS7i+S6jiBtYXgg5ZKMIG1pbiDkuYvpl7Qo6buY6K6k5YyF5ous562J5LqOIG1heCDmiJYgbWluICnnmoTmiYDmnInnmoTmiJDlkZjjgIJcbiAgICAgKiDmnInluo/pm4bmiJDlkZjmjIkgc2NvcmUg5YC86YCS5YePKOS7juWkp+WIsOWwjynnmoTmrKHluo/mjpLliJdcbiAgICAgKiDlhbfmnInnm7jlkIwgc2NvcmUg5YC855qE5oiQ5ZGY5oyJ5a2X5YW45bqP55qE6YCG5bqPKHJldmVyc2UgbGV4aWNvZ3JhcGhpY2FsIG9yZGVyICnmjpLliJdcbiAgICAgKiBodHRwczovL3poLndpa2lwZWRpYS5vcmcvd2lraS8lRTUlQUQlOTclRTUlODUlQjglRTUlQkElOEZcbiAgICAgKlxuICAgICAqIOmZpOS6huaIkOWRmOaMiSBzY29yZSDlgLzpgJLlh4/nmoTmrKHluo/mjpLliJfov5nkuIDngrnlpJbvvIwgWlJFVlJBTkdFQllTQ09SRSDlkb3ku6TnmoTlhbbku5bmlrnpnaLlkowgWlJBTkdFQllTQ09SRSDlkb3ku6TkuIDmoLdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsobnVtYmVyIHwgc3RyaW5nKX0gbWF4XG4gICAgICogQHBhcmFtIHsobnVtYmVyIHwgc3RyaW5nKX0gbWluXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gYXJnc1xuICAgICAqIEByZXR1cm5zIOaMh+WumuWMuumXtOWGhe+8jOW4puaciSBzY29yZSDlgLwo5Y+v6YCJKeeahOacieW6j+mbhuaIkOWRmOeahOWIl+ihqFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB6cmV2cmFuZ2VieXNjb3JlKGtleTogc3RyaW5nLCBtYXg6IG51bWJlciB8IHN0cmluZywgbWluOiBudW1iZXIgfCBzdHJpbmcsIC4uLmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnpyZXZyYW5nZWJ5c2NvcmUoa2V5LCBtYXgsIG1pbiwgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFpSRVZSQU5LIGtleSBtZW1iZXJcbiAgICAgKiDov5Tlm57mnInluo/pm4Yga2V5IOS4reaIkOWRmCBtZW1iZXIg55qE5o6S5ZCN44CC5YW25Lit5pyJ5bqP6ZuG5oiQ5ZGY5oyJIHNjb3JlIOWAvOmAkuWHjyjku47lpKfliLDlsI8p5o6S5bqPXG4gICAgICog5o6S5ZCN5LulIDAg5Li65bqV77yM5Lmf5bCx5piv6K+077yMIHNjb3JlIOWAvOacgOWkp+eahOaIkOWRmOaOkuWQjeS4uiAwXG4gICAgICog5L2/55SoIFpSQU5LIOWRveS7pOWPr+S7peiOt+W+l+aIkOWRmOaMiSBzY29yZSDlgLzpgJLlop4o5LuO5bCP5Yiw5aSnKeaOkuWIl+eahOaOkuWQjVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVtYmVyXG4gICAgICogQHJldHVybnMg5aaC5p6cIG1lbWJlciDmmK/mnInluo/pm4Yga2V5IOeahOaIkOWRmO+8jOi/lOWbniBtZW1iZXIg55qE5o6S5ZCNLCDlpoLmnpwgbWVtYmVyIOS4jeaYr+acieW6j+mbhiBrZXkg55qE5oiQ5ZGY77yM6L+U5ZueIG5pbFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB6cmV2cmFuayhrZXk6IHN0cmluZywgbWVtYmVyOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuenJldnJhbmsoa2V5LCBtZW1iZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBaU0NPUkUga2V5IG1lbWJlclxuICAgICAqIOi/lOWbnuacieW6j+mbhiBrZXkg5Lit77yM5oiQ5ZGYIG1lbWJlciDnmoQgc2NvcmUg5YC8XG4gICAgICog5aaC5p6cIG1lbWJlciDlhYPntKDkuI3mmK/mnInluo/pm4Yga2V5IOeahOaIkOWRmO+8jOaIliBrZXkg5LiN5a2Y5Zyo77yM6L+U5ZueIG5pbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVtYmVyXG4gICAgICogQHJldHVybnMgbWVtYmVyIOaIkOWRmOeahCBzY29yZSDlgLzvvIzku6XlrZfnrKbkuLLlvaLlvI/ooajnpLpcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgenNjb3JlKGtleTogc3RyaW5nLCBtZW1iZXI6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy56c2NvcmUoa2V5LCBtZW1iZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBaVU5JT05TVE9SRSBkZXN0aW5hdGlvbiBudW1rZXlzIGtleSBba2V5IC4uLl0gW1dFSUdIVFMgd2VpZ2h0IFt3ZWlnaHQgLi4uXV0gW0FHR1JFR0FURSBTVU18TUlOfE1BWF1cbiAgICAgKiDorqHnrpfnu5nlrprnmoTkuIDkuKrmiJblpJrkuKrmnInluo/pm4bnmoTlubbpm4bvvIzlhbbkuK3nu5nlrpoga2V5IOeahOaVsOmHj+W/hemhu+S7pSBudW1rZXlzIOWPguaVsOaMh+Wumu+8jOW5tuWwhuivpeW5tumbhijnu5Pmnpzpm4Yp5YKo5a2Y5YiwIGRlc3RpbmF0aW9uXG4gICAgICog6buY6K6k5oOF5Ya15LiL77yM57uT5p6c6ZuG5Lit5p+Q5Liq5oiQ5ZGY55qEIHNjb3JlIOWAvOaYr+aJgOaciee7meWumumbhuS4i+ivpeaIkOWRmCBzY29yZSDlgLzkuYsg5ZKMXG4gICAgICpcbiAgICAgKiBXRUlHSFRTXG4gICAgICog5L2/55SoIFdFSUdIVFMg6YCJ6aG577yM5L2g5Y+v5Lul5Li6IOavj+S4qiDnu5nlrprmnInluo/pm4Yg5YiG5YirIOaMh+WumuS4gOS4quS5mOazleWboOWtkChtdWx0aXBsaWNhdGlvbiBmYWN0b3Ip77yM5q+P5Liq57uZ5a6a5pyJ5bqP6ZuG55qE5omA5pyJ5oiQ5ZGY55qEIHNjb3JlIOWAvFxuICAgICAqIOWcqOS8oOmAkue7meiBmuWQiOWHveaVsChhZ2dyZWdhdGlvbiBmdW5jdGlvbinkuYvliY3pg73opoHlhYjkuZjku6Xor6XmnInluo/pm4bnmoTlm6DlrZBcbiAgICAgKiDlpoLmnpzmsqHmnInmjIflrpogV0VJR0hUUyDpgInpobnvvIzkuZjms5Xlm6DlrZDpu5jorqTorr7nva7kuLogMVxuICAgICAqXG4gICAgICogQUdHUkVHQVRFXG4gICAgICog5L2/55SoIEFHR1JFR0FURSDpgInpobnvvIzkvaDlj6/ku6XmjIflrprlubbpm4bnmoTnu5Pmnpzpm4bnmoTogZrlkIjmlrnlvI9cbiAgICAgKiDpu5jorqTkvb/nlKjnmoTlj4LmlbAgU1VNIO+8jOWPr+S7peWwhuaJgOaciembhuWQiOS4reafkOS4quaIkOWRmOeahCBzY29yZSDlgLzkuYsg5ZKMIOS9nOS4uue7k+aenOmbhuS4reivpeaIkOWRmOeahCBzY29yZSDlgLzvvJvkvb/nlKjlj4LmlbAgTUlOIO+8jOWPr+S7peWwhuaJgOaciembhuWQiFxuICAgICAqIOS4reafkOS4quaIkOWRmOeahCDmnIDlsI8gc2NvcmUg5YC85L2c5Li657uT5p6c6ZuG5Lit6K+l5oiQ5ZGY55qEIHNjb3JlIOWAvFxuICAgICAqIOiAjOWPguaVsCBNQVgg5YiZ5piv5bCG5omA5pyJ6ZuG5ZCI5Lit5p+Q5Liq5oiQ5ZGY55qEIOacgOWkpyBzY29yZSDlgLzkvZzkuLrnu5Pmnpzpm4bkuK3or6XmiJDlkZjnmoQgc2NvcmUg5YC8XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWtleXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gYXJnc1xuICAgICAqIEByZXR1cm5zIOS/neWtmOWIsCBkZXN0aW5hdGlvbiDnmoTnu5Pmnpzpm4bnmoTln7rmlbBcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgenVuaW9uc3RvcmUoZGVzdGluYXRpb246IHN0cmluZywgbnVta2V5czogbnVtYmVyLCBrZXk6IHN0cmluZywgLi4uYXJnczogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuenVuaW9uc3RvcmUoZGVzdGluYXRpb24sIG51bWtleXMsIGtleSwgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFpJTlRFUlNUT1JFIGRlc3RpbmF0aW9uIG51bWtleXMga2V5IFtrZXkgLi4uXSBbV0VJR0hUUyB3ZWlnaHQgW3dlaWdodCAuLi5dXSBbQUdHUkVHQVRFIFNVTXxNSU58TUFYXVxuICAgICAqIOiuoeeul+e7meWumueahOS4gOS4quaIluWkmuS4quacieW6j+mbhueahOS6pOmbhu+8jOWFtuS4ree7meWumiBrZXkg55qE5pWw6YeP5b+F6aG75LulIG51bWtleXMg5Y+C5pWw5oyH5a6a77yM5bm25bCG6K+l5Lqk6ZuGKOe7k+aenOmbhinlgqjlrZjliLAgZGVzdGluYXRpb25cbiAgICAgKiDpu5jorqTmg4XlhrXkuIvvvIznu5Pmnpzpm4bkuK3mn5DkuKrmiJDlkZjnmoQgc2NvcmUg5YC85piv5omA5pyJ57uZ5a6a6ZuG5LiL6K+l5oiQ5ZGYIHNjb3JlIOWAvOS5i+WSjFxuICAgICAqIOWFs+S6jiBXRUlHSFRTIOWSjCBBR0dSRUdBVEUg6YCJ6aG555qE5o+P6L+w77yM5Y+C6KeBIFpVTklPTlNUT1JFIOWRveS7pFxuICAgICAqIGh0dHA6Ly9yZWRpc2RvYy5jb20vc29ydGVkX3NldC96dW5pb25zdG9yZS5odG1sI3p1bmlvbnN0b3JlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWtleXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gYXJnc1xuICAgICAqIEByZXR1cm5zIOS/neWtmOWIsCBkZXN0aW5hdGlvbiDnmoTnu5Pmnpzpm4bnmoTln7rmlbBcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgemludGVyc3RvcmUoZGVzdGluYXRpb246IHN0cmluZywgbnVta2V5czogbnVtYmVyLCBrZXk6IHN0cmluZywgLi4uYXJnczogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuemludGVyc3RvcmUoZGVzdGluYXRpb24sIG51bWtleXMsIGtleSwgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1TRVQga2V5IHZhbHVlIFtrZXkgdmFsdWUgLi4uXVxuICAgICAqIOWQjOaXtuiuvue9ruS4gOS4quaIluWkmuS4qiBrZXktdmFsdWUg5a+5XG4gICAgICog5aaC5p6c5p+Q5Liq57uZ5a6aIGtleSDlt7Lnu4/lrZjlnKjvvIzpgqPkuYggTVNFVCDkvJrnlKjmlrDlgLzopobnm5bljp/mnaXnmoTml6flgLzvvIzlpoLmnpzov5nkuI3mmK/kvaDmiYDluIzmnJvnmoTmlYjmnpxcbiAgICAgKiDor7fogIPomZHkvb/nlKggTVNFVE5YIOWRveS7pO+8muWug+WPquS8muWcqOaJgOaciee7meWumiBrZXkg6YO95LiN5a2Y5Zyo55qE5oOF5Ya15LiL6L+b6KGM6K6+572u5pON5L2c44CCXG4gICAgICpcbiAgICAgKiBNU0VUIOaYr+S4gOS4quWOn+WtkOaApyhhdG9taWMp5pON5L2c77yM5omA5pyJ57uZ5a6aIGtleSDpg73kvJrlnKjlkIzkuIDml7bpl7TlhoXooqvorr7nva5cbiAgICAgKiDmn5Dkupvnu5nlrpoga2V5IOiiq+abtOaWsOiAjOWPpuS4gOS6m+e7meWumiBrZXkg5rKh5pyJ5pS55Y+Y55qE5oOF5Ya177yM5LiN5Y+v6IO95Y+R55Sf44CCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBhcmdzXG4gICAgICogQHJldHVybnMg5oC75piv6L+U5ZueIE9LICjlm6DkuLogTVNFVCDkuI3lj6/og73lpLHotKUpXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIG1zZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIC4uLmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLm1zZXQoa2V5LCB2YWx1ZSwgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNFVEVYIGtleSBzZWNvbmRzIHZhbHVlXG4gICAgICog5bCG5YC8IHZhbHVlIOWFs+iBlOWIsCBrZXkg77yM5bm25bCGIGtleSDnmoTnlJ/lrZjml7bpl7Torr7kuLogc2Vjb25kcyAo5Lul56eS5Li65Y2V5L2NKVxuICAgICAqIOWmguaenCBrZXkg5bey57uP5a2Y5Zyo77yMIFNFVEVYIOWRveS7pOWwhuimhuWGmeaXp+WAvFxuICAgICAqIFNFVEVYIOaYr+S4gOS4quWOn+WtkOaApyhhdG9taWMp5pON5L2c77yM5YWz6IGU5YC85ZKM6K6+572u55Sf5a2Y5pe26Ze05Lik5Liq5Yqo5L2c5Lya5Zyo5ZCM5LiA5pe26Ze05YaF5a6M5oiQ77yM6K+l5ZG95Luk5ZyoIFJlZGlzIOeUqOS9nOe8k+WtmOaXtu+8jOmdnuW4uOWunueUqFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vjb25kc1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyDorr7nva7miJDlip/ml7bov5Tlm54gT0ssIOW9kyBzZWNvbmRzIOWPguaVsOS4jeWQiOazleaXtu+8jOi/lOWbnuS4gOS4qumUmeivr1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzZXRleChrZXk6IHN0cmluZywgc2Vjb25kczogbnVtYmVyLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNldGV4KGtleSwgc2Vjb25kcywgdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNR0VUIGtleSBba2V5IC4uLl1cbiAgICAgKiDov5Tlm57miYDmnIko5LiA5Liq5oiW5aSa5LiqKee7meWumiBrZXkg55qE5YC8XG4gICAgICog5aaC5p6c57uZ5a6a55qEIGtleSDph4zpnaLvvIzmnInmn5DkuKoga2V5IOS4jeWtmOWcqO+8jOmCo+S5iOi/meS4qiBrZXkg6L+U5Zue54m55q6K5YC8IG5pbCDjgILlm6DmraTvvIzor6Xlkb3ku6TmsLjkuI3lpLHotKVcbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBrZXlzXG4gICAgICogQHJldHVybnMg5LiA5Liq5YyF5ZCr5omA5pyJ57uZ5a6aIGtleSDnmoTlgLznmoTliJfooahcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgbWdldCguLi5rZXlzOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5tZ2V0KC4uLmtleXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMSU5TRVJUIGtleSBCRUZPUkV8QUZURVIgcGl2b3QgdmFsdWVcbiAgICAgKiDlsIblgLwgdmFsdWUg5o+S5YWl5Yiw5YiX6KGoIGtleSDlvZPkuK3vvIzkvY3kuo7lgLwgcGl2b3Qg5LmL5YmN5oiW5LmL5ZCOXG4gICAgICog5b2TIHBpdm90IOS4jeWtmOWcqOS6juWIl+ihqCBrZXkg5pe277yM5LiN5omn6KGM5Lu75L2V5pON5L2cXG4gICAgICog5b2TIGtleSDkuI3lrZjlnKjml7bvvIwga2V5IOiiq+inhuS4uuepuuWIl+ihqO+8jOS4jeaJp+ihjOS7u+S9leaTjeS9nFxuICAgICAqIOWmguaenCBrZXkg5LiN5piv5YiX6KGo57G75Z6L77yM6L+U5Zue5LiA5Liq6ZSZ6K+vXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7KCdCRUZPUkUnIHwgJ0FGVEVSJyl9IGRpcmVjdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwaXZvdFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyDlpoLmnpzlkb3ku6TmiafooYzmiJDlip/vvIzov5Tlm57mj5LlhaXmk43kvZzlrozmiJDkuYvlkI7vvIzliJfooajnmoTplb/luqYsIOWmguaenOayoeacieaJvuWIsCBwaXZvdCDvvIzov5Tlm54gLTEsIOWmguaenCBrZXkg5LiN5a2Y5Zyo5oiW5Li656m65YiX6KGo77yM6L+U5ZueIDBcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgbGluc2VydChrZXk6IHN0cmluZywgZGlyZWN0aW9uOiAnQkVGT1JFJyB8ICdBRlRFUicsIHBpdm90OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMubGluc2VydChrZXksIGRpcmVjdGlvbiwgcGl2b3QsIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR0VPQUREIGtleSBsb25naXR1ZGUgbGF0aXR1ZGUgbWVtYmVyIFtsb25naXR1ZGUgbGF0aXR1ZGUgbWVtYmVyIC4uLl1cbiAgICAgKiDlsIbnu5nlrprnmoTnqbrpl7TlhYPntKDvvIjnuqzluqbjgIHnu4/luqbjgIHlkI3lrZfvvInmt7vliqDliLDmjIflrprnmoTplK7ph4zpnaJcbiAgICAgKiDov5nkupvmlbDmja7kvJrku6XmnInluo/pm4blkIjnmoTlvaLlvI/ooqvlgqjlrZjlnKjplK7ph4zpnaJcbiAgICAgKiDku47ogIzkvb/lvpflg48gR0VPUkFESVVTIOWSjCBHRU9SQURJVVNCWU1FTUJFUiDov5nmoLfnmoTlkb3ku6Tlj6/ku6XlnKjkuYvlkI7pgJrov4fkvY3nva7mn6Xor6Llj5blvpfov5nkupvlhYPntKBcbiAgICAgKiBHRU9BREQg5ZG95Luk5Lul5qCH5YeG55qEIHgseSDmoLzlvI/mjqXlj5flj4LmlbDvvIwg5omA5Lul55So5oi35b+F6aG75YWI6L6T5YWl57uP5bqm77yMIOeEtuWQjuWGjei+k+WFpee6rOW6plxuICAgICAqIEdFT0FERCDog73lpJ/orrDlvZXnmoTlnZDmoIfmmK/mnInpmZDnmoTvvJog6Z2e5bi45o6l6L+R5Lik5p6B55qE5Yy65Z+f5piv5peg5rOV6KKr57Si5byV55qEXG4gICAgICog57K+56Gu55qE5Z2Q5qCH6ZmQ5Yi255SxIEVQU0c6OTAwOTEzIC8gRVBTRzozNzg1IC8gT1NHRU86NDEwMDEg562J5Z2Q5qCH57O757uf5a6a5LmJXG4gICAgICog5YW35L2T5aaC5LiL77yaXG4gICAgICog5pyJ5pWI55qE57uP5bqm5LuL5LqOIC0xODAg5bqm6IezIDE4MCDluqbkuYvpl7RcbiAgICAgKiDmnInmlYjnmoTnuqzluqbku4vkuo4gLTg1LjA1MTEyODc4IOW6puiHsyA4NS4wNTExMjg3OCDluqbkuYvpl7RcbiAgICAgKiDlvZPnlKjmiLflsJ3or5XovpPlhaXkuIDkuKrotoXlh7rojIPlm7TnmoTnu4/luqbmiJbogIXnuqzluqbml7bvvIwgR0VPQUREIOWRveS7pOWwhui/lOWbnuS4gOS4qumUmeivr1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7R0VPRW50aXR5W119IGdlb0VudGl0eVxuICAgICAqIEByZXR1cm5zIOaWsOa3u+WKoOWIsOmUrumHjOmdoueahOepuumXtOWFg+e0oOaVsOmHj++8jCDkuI3ljIXmi6zpgqPkupvlt7Lnu4/lrZjlnKjkvYbmmK/ooqvmm7TmlrDnmoTlhYPntKBcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2VvYWRkKGtleTogc3RyaW5nLCBnZW9FbnRpdHk6IEdFT0VudGl0eVtdKSB7XG4gICAgICAgIGNvbnN0IHJlZGlzID0gdGhpcy5yZWRpcyBhcyBhbnk7XG4gICAgICAgIGNvbnN0IGdlb0FycmF5ID0gXy5tYXAoZ2VvRW50aXR5LCAoZ2VvKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gXy50b0FycmF5KGdlbyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVkaXMuZ2VvYWRkKGtleSwgLi4uZ2VvQXJyYXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHRU9QT1Mga2V5IG1lbWJlciBbbWVtYmVyIC4uLl1cbiAgICAgKiDku47plK7ph4zpnaLov5Tlm57miYDmnInnu5nlrprkvY3nva7lhYPntKDnmoTkvY3nva7vvIjnu4/luqblkoznuqzluqbvvIlcbiAgICAgKiDlm6DkuLogR0VPUE9TIOWRveS7pOaOpeWPl+WPr+WPmOaVsOmHj+eahOS9jee9ruWFg+e0oOS9nOS4uui+k+WFpe+8jCDmiYDku6XljbPkvb/nlKjmiLflj6rnu5nlrprkuobkuIDkuKrkvY3nva7lhYPntKDvvIwg5ZG95Luk5Lmf5Lya6L+U5Zue5pWw57uE5Zue5aSNXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZW1iZXJcbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBtZW1iZXJzXG4gICAgICogQHJldHVybnMgR0VPUE9TIOWRveS7pOi/lOWbnuS4gOS4quaVsOe7hO+8jCDmlbDnu4TkuK3nmoTmr4/kuKrpobnpg73nlLHkuKTkuKrlhYPntKDnu4TmiJDvvJog56ys5LiA5Liq5YWD57Sg5Li657uZ5a6a5L2N572u5YWD57Sg55qE57uP5bqm77yMIOiAjOesrOS6jOS4quWFg+e0oOWImeS4uue7meWumuS9jee9ruWFg+e0oOeahOe6rOW6plxuICAgICAqICwg5b2T57uZ5a6a55qE5L2N572u5YWD57Sg5LiN5a2Y5Zyo5pe277yMIOWvueW6lOeahOaVsOe7hOmhueS4uuepuuWAvFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZW9wb3Moa2V5OiBzdHJpbmcsIG1lbWJlcjogc3RyaW5nLCAuLi5tZW1iZXJzOiBzdHJpbmdbXSkge1xuICAgICAgICBjb25zdCByZWRpcyA9IHRoaXMucmVkaXMgYXMgYW55O1xuICAgICAgICByZXR1cm4gcmVkaXMuZ2VvcG9zKGtleSwgbWVtYmVyLCAuLi5tZW1iZXJzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR0VPRElTVCBrZXkgbWVtYmVyMSBtZW1iZXIyIFt1bml0XVxuICAgICAqIOi/lOWbnuS4pOS4que7meWumuS9jee9ruS5i+mXtOeahOi3neemu1xuICAgICAqIOWmguaenOS4pOS4quS9jee9ruS5i+mXtOeahOWFtuS4reS4gOS4quS4jeWtmOWcqO+8jCDpgqPkuYjlkb3ku6Tov5Tlm57nqbrlgLxcbiAgICAgKiDmjIflrprljZXkvY3nmoTlj4LmlbAgdW5pdCDlv4XpobvmmK/ku6XkuIvljZXkvY3nmoTlhbbkuK3kuIDkuKpcbiAgICAgKiBtIOihqOekuuWNleS9jeS4uuexs1xuICAgICAqIGttIOihqOekuuWNleS9jeS4uuWNg+exs1xuICAgICAqIG1pIOihqOekuuWNleS9jeS4uuiLsemHjFxuICAgICAqIGZ0IOihqOekuuWNleS9jeS4uuiLseWwulxuICAgICAqIOWmguaenOeUqOaIt+ayoeacieaYvuW8j+WcsOaMh+WumuWNleS9jeWPguaVsO+8jCDpgqPkuYggR0VPRElTVCDpu5jorqTkvb/nlKjnsbPkvZzkuLrljZXkvY1cbiAgICAgKiBHRU9ESVNUIOWRveS7pOWcqOiuoeeul+i3neemu+aXtuS8muWBh+iuvuWcsOeQg+S4uuWujOe+jueahOeQg+W9ou+8jCDlnKjmnoHpmZDmg4XlhrXkuIvvvIwg6L+Z5LiA5YGH6K6+5pyA5aSn5Lya6YCg5oiQIDAuNSUg55qE6K+v5beuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZW1iZXIxXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lbWJlcjJcbiAgICAgKiBAcGFyYW0geygnbScgfCAna20nIHwgJ21pJyB8ICdmdCcpfSBbdW5pdD0nbSddXG4gICAgICogQHJldHVybnMg6K6h566X5Ye655qE6Led56a75Lya5Lul5Y+M57K+5bqm5rWu54K55pWw55qE5b2i5byP6KKr6L+U5Zue44CCIOWmguaenOe7meWumueahOS9jee9ruWFg+e0oOS4jeWtmOWcqO+8jCDpgqPkuYjlkb3ku6Tov5Tlm57nqbrlgLxcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2VvZGlzdChrZXk6IHN0cmluZywgbWVtYmVyMTogc3RyaW5nLCBtZW1iZXIyOiBzdHJpbmcsIHVuaXQ6ICdtJyB8ICdrbScgfCAnbWknIHwgJ2Z0JyA9ICdtJykge1xuICAgICAgICBjb25zdCByZWRpcyA9IHRoaXMucmVkaXMgYXMgYW55O1xuICAgICAgICByZXR1cm4gcmVkaXMuZ2VvZGlzdChrZXksIG1lbWJlcjEsIG1lbWJlcjIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHRU9SQURJVVMga2V5IGxvbmdpdHVkZSBsYXRpdHVkZSByYWRpdXMgbXxrbXxmdHxtaSBbV0lUSENPT1JEXSBbV0lUSERJU1RdIFtXSVRISEFTSF0gW0FTQ3xERVNDXSBbQ09VTlQgY291bnRdXG4gICAgICog5Lul57uZ5a6a55qE57uP57qs5bqm5Li65Lit5b+D77yMIOi/lOWbnumUruWMheWQq+eahOS9jee9ruWFg+e0oOW9k+S4re+8jCDkuI7kuK3lv4PnmoTot53nprvkuI3otoXov4fnu5nlrprmnIDlpKfot53nprvnmoTmiYDmnInkvY3nva7lhYPntKBcbiAgICAgKiDojIPlm7Tlj6/ku6Xkvb/nlKjku6XkuIvlhbbkuK3kuIDkuKrljZXkvY3vvJpcbiAgICAgKiBtIOihqOekuuWNleS9jeS4uuexs1xuICAgICAqIGttIOihqOekuuWNleS9jeS4uuWNg+exs1xuICAgICAqIG1pIOihqOekuuWNleS9jeS4uuiLsemHjFxuICAgICAqIGZ0IOihqOekuuWNleS9jeS4uuiLseWwulxuICAgICAqXG4gICAgICog5Zyo57uZ5a6a5Lul5LiL5Y+v6YCJ6aG55pe277yMIOWRveS7pOS8mui/lOWbnumineWklueahOS/oeaBr1xuICAgICAqIFdJVEhESVNUIO+8miDlnKjov5Tlm57kvY3nva7lhYPntKDnmoTlkIzml7bvvIwg5bCG5L2N572u5YWD57Sg5LiO5Lit5b+D5LmL6Ze055qE6Led56a75Lmf5LiA5bm26L+U5Zue44CCIOi3neemu+eahOWNleS9jeWSjOeUqOaIt+e7meWumueahOiMg+WbtOWNleS9jeS/neaMgeS4gOiHtFxuICAgICAqIFdJVEhDT09SRCDvvJog5bCG5L2N572u5YWD57Sg55qE57uP5bqm5ZKM57u05bqm5Lmf5LiA5bm26L+U5ZueXG4gICAgICogV0lUSEhBU0gg77yaIOS7pSA1MiDkvY3mnInnrKblj7fmlbTmlbDnmoTlvaLlvI/vvIwg6L+U5Zue5L2N572u5YWD57Sg57uP6L+H5Y6f5aeLIGdlb2hhc2gg57yW56CB55qE5pyJ5bqP6ZuG5ZCI5YiG5YC844CCIOi/meS4qumAiemhueS4u+imgeeUqOS6juW6leWxguW6lOeUqOaIluiAheiwg+ivle+8jCDlrp7pmYXkuK3nmoTkvZznlKjlubbkuI3lpKdcbiAgICAgKlxuICAgICAqIOWRveS7pOm7mOiupOi/lOWbnuacquaOkuW6j+eahOS9jee9ruWFg+e0oOOAgiDpgJrov4fku6XkuIvkuKTkuKrlj4LmlbDvvIwg55So5oi35Y+v5Lul5oyH5a6a6KKr6L+U5Zue5L2N572u5YWD57Sg55qE5o6S5bqP5pa55byPXG4gICAgICogQVNDIO+8miDmoLnmja7kuK3lv4PnmoTkvY3nva7vvIwg5oyJ54Wn5LuO6L+R5Yiw6L+c55qE5pa55byP6L+U5Zue5L2N572u5YWD57SgXG4gICAgICogREVTQyDvvJog5qC55o2u5Lit5b+D55qE5L2N572u77yMIOaMieeFp+S7jui/nOWIsOi/keeahOaWueW8j+i/lOWbnuS9jee9ruWFg+e0oFxuICAgICAqXG4gICAgICog5Zyo6buY6K6k5oOF5Ya15LiL77yMIEdFT1JBRElVUyDlkb3ku6TkvJrov5Tlm57miYDmnInljLnphY3nmoTkvY3nva7lhYPntKDjgIIg6Jm954S255So5oi35Y+v5Lul5L2/55SoIENPVU5UIDxjb3VudD4g6YCJ6aG55Y676I635Y+W5YmNIE4g5Liq5Yy56YWN5YWD57SgXG4gICAgICog5L2G5piv5Zug5Li65ZG95Luk5Zyo5YaF6YOo5Y+v6IO95Lya6ZyA6KaB5a+55omA5pyJ6KKr5Yy56YWN55qE5YWD57Sg6L+b6KGM5aSE55CG77yMIOaJgOS7peWcqOWvueS4gOS4qumdnuW4uOWkp+eahOWMuuWfn+i/m+ihjOaQnOe0ouaXtlxuICAgICAqIOWNs+S9v+WPquS9v+eUqCBDT1VOVCDpgInpobnljrvojrflj5blsJHph4/lhYPntKDvvIwg5ZG95Luk55qE5omn6KGM6YCf5bqm5Lmf5Y+v6IO95Lya6Z2e5bi45oWiXG4gICAgICog5L2G5piv5LuO5Y+m5LiA5pa56Z2i5p2l6K+077yMIOS9v+eUqCBDT1VOVCDpgInpobnljrvlh4/lsJHpnIDopoHov5Tlm57nmoTlhYPntKDmlbDph4/vvIwg5a+55LqO5YeP5bCR5bim5a695p2l6K+05LuN54S25piv6Z2e5bi45pyJ55So55qEXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsb25naXR1ZGVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGF0aXR1ZGVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzIOiMg+WbtFxuICAgICAqIEBwYXJhbSB7KCdtJyB8ICdrbScgfCAnbWknIHwgJ2Z0Jyl9IFt1bml0PSdtJ11cbiAgICAgKiBAcGFyYW0gey4uLmFueVtdfSBhcmdzXG4gICAgICogQHJldHVybnMgR0VPUkFESVVTIOWRveS7pOi/lOWbnuS4gOS4quaVsOe7hO+8jCDlhbfkvZPmnaXor7QsIOWcqOayoeaciee7meWumuS7u+S9lSBXSVRIIOmAiemhueeahOaDheWGteS4i++8jCDlkb3ku6Tlj6rkvJrov5Tlm57kuIDkuKrlg48gW1wiTmV3IFlvcmtcIixcIk1pbGFuXCIsXCJQYXJpc1wiXSDov5nmoLfnmoTnur/mgKfvvIhsaW5lYXLvvInliJfooajjgIJcbiAgICAgKiDlnKjmjIflrprkuoYgV0lUSENPT1JEIOOAgSBXSVRIRElTVCDjgIEgV0lUSEhBU0gg562J6YCJ6aG555qE5oOF5Ya15LiL77yMIOWRveS7pOi/lOWbnuS4gOS4quS6jOWxguW1jOWll+aVsOe7hO+8jCDlhoXlsYLnmoTmr4/kuKrlrZDmlbDnu4TlsLHooajnpLrkuIDkuKrlhYPntKDjgIJcbiAgICAgKiDlnKjov5Tlm57ltYzlpZfmlbDnu4Tml7bvvIwg5a2Q5pWw57uE55qE56ys5LiA5Liq5YWD57Sg5oC75piv5L2N572u5YWD57Sg55qE5ZCN5a2X44CCIOiHs+S6jumineWklueahOS/oeaBr++8jCDliJnkvJrkvZzkuLrlrZDmlbDnu4TnmoTlkI7nu63lhYPntKDvvIwg5oyJ54Wn5Lul5LiL6aG65bqP6KKr6L+U5Zue77yaXG4gICAgICogMS7ku6Xmta7ngrnmlbDmoLzlvI/ov5Tlm57nmoTkuK3lv4PkuI7kvY3nva7lhYPntKDkuYvpl7TnmoTot53nprvvvIwg5Y2V5L2N5LiO55So5oi35oyH5a6a6IyD5Zu05pe255qE5Y2V5L2N5LiA6Ie044CCXG4gICAgICogMi5nZW9oYXNoIOaVtOaVsOOAglxuICAgICAqIDMu55Sx5Lik5Liq5YWD57Sg57uE5oiQ55qE5Z2Q5qCH77yM5YiG5Yir5Li657uP5bqm5ZKM57qs5bqm44CCXG4gICAgICpcbiAgICAgKiDkuL7kuKrkvovlrZDvvIwgR0VPUkFESVVTIFNpY2lseSAxNSAzNyAyMDAga20gd2l0aGNvb3JkIHdpdGhkaXN0IOi/meagt+eahOWRveS7pOi/lOWbnueahOavj+S4quWtkOaVsOe7hOmDveaYr+exu+S8vOS7peS4i+agvOW8j+eahFxuICAgICAqIFtcIlBhbGVybW9cIixcIjE5MC40NDI0XCIsW1wiMTMuMzYxMzg5MzM4OTcwMTg0XCIsXCIzOC4xMTU1NTYzOTU0OTYyOTlcIl1dXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdlb3JhZGl1cyhcbiAgICAgICAga2V5OiBzdHJpbmcsIGxvbmdpdHVkZTogbnVtYmVyLCBsYXRpdHVkZTogbnVtYmVyLCByYWRpdXM6IG51bWJlcixcbiAgICAgICAgdW5pdDogJ20nIHwgJ2ttJyB8ICdtaScgfCAnZnQnID0gJ20nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zdCByZWRpcyA9IHRoaXMucmVkaXMgYXMgYW55O1xuICAgICAgICByZXR1cm4gcmVkaXMuZ2VvcmFkaXVzKGtleSwgbG9uZ2l0dWRlLCBsYXRpdHVkZSwgcmFkaXVzLCB1bml0LCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR0VPSEFTSCBrZXkgbWVtYmVyIFttZW1iZXIgLi4uXVxuICAgICAqIOi/lOWbnuS4gOS4quaIluWkmuS4quS9jee9ruWFg+e0oOeahCBHZW9oYXNoIOihqOekuuOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVtYmVyXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gbWVtYmVyc1xuICAgICAqIEByZXR1cm5zIOS4gOS4quaVsOe7hO+8jCDmlbDnu4TnmoTmr4/kuKrpobnpg73mmK/kuIDkuKogZ2VvaGFzaCDjgIIg5ZG95Luk6L+U5Zue55qEIGdlb2hhc2gg55qE5L2N572u5LiO55So5oi357uZ5a6a55qE5L2N572u5YWD57Sg55qE5L2N572u5LiA5LiA5a+55bqU44CCXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdlb2hhc2goa2V5OiBzdHJpbmcsIG1lbWJlcjogc3RyaW5nLCAuLi5tZW1iZXJzOiBzdHJpbmdbXSkge1xuICAgICAgICBjb25zdCByZWRpcyA9IHRoaXMucmVkaXMgYXMgYW55O1xuICAgICAgICByZXR1cm4gcmVkaXMuZ2VvaGFzaChrZXksIG1lbWJlciwgLi4ubWVtYmVycyk7XG4gICAgfVxufVxuIl19