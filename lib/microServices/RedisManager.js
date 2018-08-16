"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("koa-log4");
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
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    async del(key) {
        return this.redis.del(key);
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
     * @param {...string[]} field
     * @returns
     * @memberof RedisManger
     */
    async hmgetArray(key, field) {
        return this.redis.hmget(key, ...field);
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
};
RedisManger = __decorate([
    ioc_1.provide('RedisManger')
], RedisManger);
exports.default = RedisManger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkaXNNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsibWljcm9TZXJ2aWNlcy9SZWRpc01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSxtQ0FBbUM7QUFFbkMsNEJBQTBCO0FBQzFCLG9DQUFxQztBQUNyQyx5REFBa0Q7QUFFbEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUU3QyxJQUFxQixXQUFXLEdBQWhDLE1BQXFCLFdBQVc7SUFEaEM7UUFFWSxVQUFLLEdBQWtCLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFTLENBQUM7SUF1N0JoRixDQUFDO0lBcjdCRzs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQVcsRUFBRSxLQUFzQjtRQUNoRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFXLEVBQUUsRUFBVTtRQUN2QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQVc7UUFDeEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0Q7Ozs7Ozs7Ozs7O09BV0c7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQVc7UUFDekIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVEsQ0FBQztJQUN2QyxDQUFDO0lBQ0Q7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBVztRQUN6QixP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SUFDRDs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUE0QjtRQUMzQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRDs7Ozs7Ozs7T0FRRztJQUNJLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBcUIsRUFBRSxPQUE4QjtRQUM1RSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBQ0osQ0FBQTtBQXg3Qm9CLFdBQVc7SUFEL0IsYUFBTyxDQUFDLGFBQWEsQ0FBQztHQUNGLFdBQVcsQ0F3N0IvQjtrQkF4N0JvQixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgSU9SZWRpcyBmcm9tICdpb3JlZGlzJztcbmltcG9ydCAqIGFzIGxvZzRqcyBmcm9tICdrb2EtbG9nNCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuaW1wb3J0IHsgcHJvdmlkZSB9IGZyb20gJy4uL2lvYy9pb2MnO1xuaW1wb3J0IFJlZGlzQ29udGV4dCBmcm9tICcuLi9tb2RlbHMvUmVkaXNDb250ZXh0JztcblxuY29uc3QgX2xvZyA9IGxvZzRqcy5nZXRMb2dnZXIoJ1JlZGlzTWFuZ2VyJyk7XG5AcHJvdmlkZSgnUmVkaXNNYW5nZXInKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVkaXNNYW5nZXIge1xuICAgIHByaXZhdGUgcmVkaXM6IElPUmVkaXMuUmVkaXMgPSBSZWRpc0NvbnRleHQuZ2V0SW5zdGFuY2UoKS5nZXRSZWRpcygpIGFzIGFueTtcblxuICAgIC8qKlxuICAgICAqIOWinuWKoOS4gOWAi2tleei3n+WwjeaHieeahOWAvCwg5rKS5pyJ6YGO5pyf5pmC6ZaTXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7KG51bWJlciB8IHN0cmluZyl9IHZhbHVlXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNldChrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6T5LiA5YCLa2V55pyJ6YGO5pyf5pmC6ZaTIOWWruS9jeaYr+enklxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZXhcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBleHBpcmUoa2V5OiBzdHJpbmcsIGV4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuZXhwaXJlKGtleSwgZXgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlj5blvpfkuIDlgItrZXnoo6HpnaLnmoTos4fmlplcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0KGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmdldChrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDov5Tlm54ga2V5IOaJgOWCqOWtmOeahOWAvOeahOexu+Wei+OAglxuICAgICAqIG5vbmUgKGtleeS4jeWtmOWcqClcbiAgICAgKiBzdHJpbmcgKOWtl+espuS4silcbiAgICAgKiBsaXN0ICjliJfooagpXG4gICAgICogc2V0ICjpm4blkIgpXG4gICAgICogenNldCAo5pyJ5bqP6ZuGKVxuICAgICAqIGhhc2ggKOWTiOW4jOihqClcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgdHlwZShrZXk6IHN0cmluZyk6IFByb21pc2U8J25vbmUnIHwgJ3N0cmluZycgfCAnbGlzdCcgfCAnc2V0JyB8ICd6c2V0JyB8ICdoYXNoJz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy50eXBlKGtleSkgYXMgYW55O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlsIYga2V5IOS4reWCqOWtmOeahOaVsOWtl+WAvOWinuS4gOOAglxuICAgICAqIOWmguaenCBrZXkg5LiN5a2Y5Zyo77yM6YKj5LmIIGtleSDnmoTlgLzkvJrlhYjooqvliJ3lp4vljJbkuLogMCDvvIznhLblkI7lho3miafooYxcbiAgICAgKiDlpoLmnpzlgLzljIXlkKvplJnor6/nmoTnsbvlnovvvIzmiJblrZfnrKbkuLLnsbvlnovnmoTlgLzkuI3og73ooajnpLrkuLrmlbDlrZfvvIzpgqPkuYjov5Tlm57kuIDkuKrplJnor69cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaW5jcihrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5pbmNyKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWIqumZpOmAmeWAi2tleeWMheWQq+ijoemdoueahOaVuOWAvFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBkZWwoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuZGVsKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOafpeipoumAmeWAi2tleeacieaykuacieWtmOWcqFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBleGlzdHMoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuZXhpc3RzKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuk+mAmeWAi2tleeaMgeS5heWMlizkuI3orpPlroPpgY7mnJ9cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcGVyc2lzdChrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5wZXJzaXN0KGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS7peenkuS4uuWNleS9je+8jOi/lOWbnue7meWumiBrZXkg55qE5Ymp5L2Z55Sf5a2Y5pe26Ze0KFRUTCwgdGltZSB0byBsaXZlKeOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB0dGwoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMudHRsKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWwhue7meWumiBrZXkg55qE5YC86K6+5Li6IHZhbHVlIO+8jOW5tui/lOWbniBrZXkg55qE5pen5YC8KG9sZCB2YWx1ZSnjgIJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsoc3RyaW5nIHwgbnVtYmVyKX0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXRzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuZ2V0c2V0KGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlj6rmnInlnKgga2V5IOS4jeWtmOWcqOaXtuiuvue9riBrZXkg55qE5YC844CCXG4gICAgICpcbiAgICAgKiDorr7nva7miJDlip/vvIzov5Tlm54gMSDjgIJcbiAgICAgKiDorr7nva7lpLHotKXvvIzov5Tlm54gMCDjgIJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsoc3RyaW5nIHwgbnVtYmVyKX0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzZXRueChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bWJlcik6IFByb21pc2U8MCB8IDE+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc2V0bngoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOi/lOWbniBrZXkg5omA5YKo5a2Y55qE5a2X56ym5Liy5YC855qE6ZW/5bqm44CCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHN0cmxlbihrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zdHJsZW4oa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCGIGtleSDmiYDlgqjlrZjnmoTlgLzliqDkuIrnu5nlrprnmoTmta7ngrnlop7ph4/lgLzvvIhpbmNyZW1lbnQpXG4gICAgICog5aaC5p6cIGtleSDkuI3lrZjlnKjvvIzpgqPkuYgga2V5IOeahOWAvOS8muWFiOiiq+WIneWni+WMluS4uiAwIO+8jOeEtuWQjuWGjeaJp+ihjFxuICAgICAqIOWmguaenOWAvOWMheWQq+mUmeivr+eahOexu+Wei++8jOaIluWtl+espuS4suexu+Wei+eahOWAvOS4jeiDveihqOekuuS4uuaVsOWtl++8jOmCo+S5iOi/lOWbnuS4gOS4qumUmeivr1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5jcmVtZW50XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaW5jcmJ5ZmxvYXQoa2V5OiBzdHJpbmcsIGluY3JlbWVudDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmluY3JieWZsb2F0KGtleSwgaW5jcmVtZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCGIGtleSDkuK3lgqjlrZjnmoTmlbDlrZflgLzlh4/kuIDjgIJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZGVjcihrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5kZWNyKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGtleSDmiYDlgqjlrZjnmoTlgLzlh4/ljrvnu5nlrprnmoTlh4/ph4/lgLzvvIhkZWNyZW1lbnQpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGRlY3JieShrZXk6IHN0cmluZywgdmFsdWU6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5kZWNyYnkoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWmguaenCBrZXkg5bey57uP5a2Y5Zyo5bm25LiU5piv5LiA5Liq5a2X56ym5Liy77yMIEFQUEVORCDlkb3ku6TlsIbmjIflrprnmoQgdmFsdWUg6L+95Yqg5Yiw6K+lIGtleSDljp/mnaXlgLzvvIh2YWx1Ze+8ieeahOacq+WwvuOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBhcHBlbmQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKDpmaTpgJnlgItrZXnoo6HpnaLkuIDkuKrmiJblpJrkuKpIYXNoTWFw5a2X5q61XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBoZGVsQXJyYXkoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5oZGVsKGtleSwgLi4udmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKDpmaTpgJnlgItrZXnoo6HpnaLkuIDkuKrmiJblpJrkuKpIYXNoTWFw5a2X5q61XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBoZGVsKGtleTogc3RyaW5nLCAuLi52YWx1ZTogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaGRlbChrZXksIC4uLnZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5p+l55yLSGFzaE1hcCBrZXkg5Lit77yM5oyH5a6a55qE5a2X5q615piv5ZCm5a2Y5Zyo44CCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGhleGlzdHMoa2V5OiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaGV4aXN0cyhrZXksIGZpZWxkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+Wa2V55LitIOWtmOWCqOWcqEhhc2hNYXDkuK3mjIflrprlrZfmrrXnmoTlgLxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaGdldChrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5oZ2V0KGtleSwgZmllbGQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5blnKhIYXNoTWFw5Lit5oyH5a6aIGtleSDnmoTmiYDmnInlrZfmrrXlkozlgLxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaGdldGFsbChrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5oZ2V0YWxsKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS4ukhhc2hNYXAga2V5IOS4reeahOaMh+WummZpZWxk55qE5pW05pWw5YC85Yqg5LiK5aKe6YePIHZhbHVlIOaVtOaVuFxuICAgICAqIOWmguaenCBrZXkg5LiN5a2Y5Zyo77yM6YKj5LmIIGtleSDnmoTlgLzkvJrlhYjooqvliJ3lp4vljJbkuLogMCDvvIznhLblkI7lho3miafooYxcbiAgICAgKiDlpoLmnpzlgLzljIXlkKvplJnor6/nmoTnsbvlnovvvIzmiJblrZfnrKbkuLLnsbvlnovnmoTlgLzkuI3og73ooajnpLrkuLrmlbDlrZfvvIzpgqPkuYjov5Tlm57kuIDkuKrplJnor69cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaGluY3JieShrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZywgdmFsdWU6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5oaW5jcmJ5KGtleSwgZmllbGQsIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Li6SGFzaE1hcCBrZXkg5Lit55qE5oyH5a6aZmllbGTnmoTmlbTmlbDlgLzliqDkuIrlop7ph48gdmFsdWUg5rWu6bue5pW4XG4gICAgICog5aaC5p6cIGtleSDkuI3lrZjlnKjvvIzpgqPkuYgga2V5IOeahOWAvOS8muWFiOiiq+WIneWni+WMluS4uiAwIO+8jOeEtuWQjuWGjeaJp+ihjFxuICAgICAqIOWmguaenOWAvOWMheWQq+mUmeivr+eahOexu+Wei++8jOaIluWtl+espuS4suexu+Wei+eahOWAvOS4jeiDveihqOekuuS4uuaVsOWtl++8jOmCo+S5iOi/lOWbnuS4gOS4qumUmeivr1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBoaW5jcmJ5ZmxvYXQoa2V5OiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaGluY3JieWZsb2F0KGtleSwgZmllbGQsIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Y+W5b6X6YCZ5YCLSGFzaE1hcCBrZXnkuK3miYDmnInnmoRmaWVsZHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaGtleXMoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaGtleXMoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+WSGFzaE1hcOS4rWZpZWxkc+eahOaVsOmHj1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBobGVuKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmhsZW4oa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+W5omA5pyJ5oyH5a6aRmllbGRz55qE5YC8XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGZpZWxkXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaG1nZXQoa2V5OiBzdHJpbmcsIC4uLmZpZWxkOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5obWdldChrZXksIC4uLmZpZWxkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+W5omA5pyJ5oyH5a6aRmllbGRz55qE5YC8XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGZpZWxkXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaG1nZXRBcnJheShrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmhtZ2V0KGtleSwgLi4uZmllbGQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBITVNFVCBrZXkgZmllbGQxIHZhbHVlMSBbZmllbGQyIHZhbHVlMiBdXG4gICAgICog5ZCM5pe25bCG5aSa5LiqIGZpZWxkLXZhbHVlIChmaWVsZDEtdmFsdWUxKXNldOWIsGhhc2hNYXAga2V5IOS4rVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gYXJnc1xuICAgICAqIEByZXR1cm5zIHsoUHJvbWlzZTwwIHwgMT4pfVxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBobXNldChrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZywgdmFsdWU6IGFueSwgLi4uYXJnczogc3RyaW5nW10pOiBQcm9taXNlPDAgfCAxPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmhtc2V0KGtleSwgZmllbGQsIHZhbHVlLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSFNFVCBrZXkgZmllbGQgdmFsdWVcbiAgICAgKiDlsIZoYXNoTWFwIGtleSDkuK3nmoTlrZfmrrUgZmllbGQg55qE5YC86K6+5Li6IHZhbHVlIOOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaHNldChrZXk6IHN0cmluZywgZmllbGQ6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5oc2V0KGtleSwgZmllbGQsIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSFNFVE5YIGtleSBmaWVsZCB2YWx1ZVxuICAgICAqIOWPquacieWcqCBmaWVsZCDkuI3lrZjlnKjml7bvvIzorr7nva5oYXNoTWFwIGZpZWxkIOeahCB2YWx1ZeOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaHNldG54KGtleTogc3RyaW5nLCBmaWVsZDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmhzZXRueChrZXksIGZpZWxkLCB2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhWQUxTIGtleVxuICAgICAqIOiOt+WPlmhhc2hNYXDkuK3miYDmnInnmoTlgLxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaHZhbHMoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaHZhbHMoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQkxQT1Aga2V5MSBba2V5MiBdXG4gICAgICog56e75Ye65bm26I635Y+W5YiX6KGo55qE56ys5LiA5Liq5YWD57Sg77yMIOWmguaenOWIl+ihqOayoeacieWFg+e0oOS8mumYu+WhnuWIl+ihqOebtOWIsOetieW+hei2heaXtuaIluWPkeeOsOWPr+W8ueWHuuWFg+e0oOS4uuatolxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGJscG9wKC4uLmtleTogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuYmxwb3AoLi4ua2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQkxQT1Aga2V5MSBba2V5MiBdXG4gICAgICog56e75Ye65bm26I635Y+W5YiX6KGo55qE56ys5LiA5Liq5YWD57Sg77yMIOWmguaenOWIl+ihqOayoeacieWFg+e0oOS8mumYu+WhnuWIl+ihqOebtOWIsOetieW+hei2heaXtuaIluWPkeeOsOWPr+W8ueWHuuWFg+e0oOS4uuatolxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGJscG9wQXJyYXkoa2V5OiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5ibHBvcCguLi5rZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCUlBPUCBrZXkxIFtrZXkyIF1cbiAgICAgKiDnp7vlh7rlubbojrflj5bliJfooajnmoTmnIDlkI7kuIDkuKrlhYPntKDvvIwg5aaC5p6c5YiX6KGo5rKh5pyJ5YWD57Sg5Lya6Zi75aGe5YiX6KGo55u05Yiw562J5b6F6LaF5pe25oiW5Y+R546w5Y+v5by55Ye65YWD57Sg5Li65q2i44CCXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgYnJwb3AoLi4ua2V5OiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5icnBvcCguLi5rZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSUE9QIGtleVxuICAgICAqIOenu+WHuuW5tuiOt+WPluWIl+ihqOeahOacgOWQjuS4gOS4quWFg+e0oO+8jCDlpoLmnpzliJfooajmsqHmnInlhYPntKDkuI3mnIPpmLvloZ5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcnBvcChrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5ycG9wKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJSUE9QIGtleTEgW2tleTIgXVxuICAgICAqIOenu+WHuuW5tuiOt+WPluWIl+ihqOeahOacgOWQjuS4gOS4quWFg+e0oO+8jCDlpoLmnpzliJfooajmsqHmnInlhYPntKDkvJrpmLvloZ7liJfooajnm7TliLDnrYnlvoXotoXml7bmiJblj5HnjrDlj6/lvLnlh7rlhYPntKDkuLrmraLjgIJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBicnBvcEFycmF5KGtleTogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuYnJwb3AoLi4ua2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQlJQT1BMUFVTSCBzb3VyY2UgZGVzdGluYXRpb24gdGltZW91dFxuICAgICAqIOS7juWIl+ihqOS4reW8ueWHuuS4gOS4quWAvO+8jOWwhuW8ueWHuueahOWFg+e0oOaPkuWFpeWIsOWPpuWkluS4gOS4quWIl+ihqOS4reW5tui/lOWbnuWug++8myDlpoLmnpzliJfooajmsqHmnInlhYPntKDkvJrpmLvloZ7liJfooajnm7TliLDnrYnlvoXotoXml7bmiJblj5HnjrDlj6/lvLnlh7rlhYPntKDkuLrmraLjgIJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc291cmNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVvdXRcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBicnBvcGxwdXNoKHNvdXJjZTogc3RyaW5nLCBkZXN0aW5hdGlvbjogc3RyaW5nLCB0aW1lb3V0OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuYnJwb3BscHVzaChzb3VyY2UsIGRlc3RpbmF0aW9uLCB0aW1lb3V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTElOREVYIGtleSBpbmRleFxuICAgICAqIOmAmui/h2luZGV46I635Y+WbGlzdOS4reeahOWFg+e0oFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBsaW5kZXgoa2V5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMubGluZGV4KGtleSwgaW5kZXgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMTEVOIGtleVxuICAgICAqIOiOt+WPluWIl+ihqOmVv+W6plxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBsbGVuKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmxsZW4oa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTFBPUCBrZXlcbiAgICAgKiDnp7vlh7rlubbojrflj5bliJfooajnmoTnrKzkuIDkuKrlhYPntKAsIOWmguaenOWIl+ihqOayoeacieWFg+e0oOS4jeacg+mYu+WhnlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBscG9wKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmxwb3Aoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTFBVU0gga2V5IHZhbHVlMSwgdmFsdWUyLCB2YWx1ZTMuLi5cbiAgICAgKiDlsIbkuIDkuKrmiJblpJrkuKrlgLzmj5LlhaXliLDliJfooajpoK3pg6hcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsuLi5hbnlbXX0gdmFsdWVzXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgbHB1c2goa2V5OiBzdHJpbmcsIC4uLnZhbHVlczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMubHB1c2goa2V5LCB2YWx1ZXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMUFVTSCBrZXkgW3ZhbHVlMSwgdmFsdWUyXVxuICAgICAqIOWwhuS4gOS4quaIluWkmuS4quWAvOaPkuWFpeWIsOWIl+ihqOmgremDqFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge2FueVtdfSB2YWx1ZXNcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBscHVzaEFycmF5KGtleTogc3RyaW5nLCB2YWx1ZXM6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmxwdXNoKGtleSwgLi4udmFsdWVzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUlBVU0gga2V5IHZhbHVlMSwgdmFsdWUyLCB2YWx1ZTMuLi5cbiAgICAgKiDlsIbkuIDkuKrmiJblpJrkuKrlgLzmj5LlhaXliLDliJfooajlsL7nq69cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsuLi5hbnlbXX0gdmFsdWVzXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcnB1c2goa2V5OiBzdHJpbmcsIC4uLnZhbHVlczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMucnB1c2goa2V5LCB2YWx1ZXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSUFVTSCBrZXkgW3ZhbHVlMSwgdmFsdWUyXVxuICAgICAqIOWwhuS4gOS4quaIluWkmuS4quWAvOaPkuWFpeWIsOWIl+ihqOWwvuerr1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge2FueVtdfSB2YWx1ZXNcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBycHVzaEFycmF5KGtleTogc3RyaW5nLCB2YWx1ZXM6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnJwdXNoKGtleSwgLi4udmFsdWVzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTFJBTkdFIGtleSBzdGFydCBzdG9wXG4gICAgICog6I635Y+W5YiX6KGoc3RhcnQgaW5kZXgg5Yiwc3RvcCBpbmRleOS5i+mWk+iMg+WbtOWGheeahOWFg+e0oFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RvcFxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGxyYW5nZShrZXk6IHN0cmluZywgc3RhcnQ6IG51bWJlciwgc3RvcDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmxyYW5nZShrZXksIHN0YXJ0LCBzdG9wKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTFJFTSBrZXkgY291bnQgdmFsdWVcbiAgICAgKiDnp7vpmaTliJfooajlhYPntKBcbiAgICAgKiDmoLnmja7lj4LmlbAgY291bnQg55qE5YC877yM56e76Zmk5YiX6KGo5Lit5LiO5Y+C5pWwIHZhbHVlIOebuOetieeahOWFg+e0oOOAglxuICAgICAqIGNvdW50IOeahOWAvOWPr+S7peaYr+S7peS4i+WHoOenje+8mlxuICAgICAqIGNvdW50ID4gMCA6IOS7juihqOWktOW8gOWni+WQkeihqOWwvuaQnOe0ou+8jOenu+mZpOS4jiB2YWx1ZSDnm7jnrYnnmoTlhYPntKDvvIzmlbDph4/kuLogY291bnQg44CCXG4gICAgICogY291bnQgPCAwIDog5LuO6KGo5bC+5byA5aeL5ZCR6KGo5aS05pCc57Si77yM56e76Zmk5LiOIHZhbHVlIOebuOetieeahOWFg+e0oO+8jOaVsOmHj+S4uiBjb3VudCDnmoTnu53lr7nlgLzjgIJcbiAgICAgKiBjb3VudCA9IDAgOiDnp7vpmaTooajkuK3miYDmnInkuI4gdmFsdWUg55u4562J55qE5YC844CCXG4gICAgICpcbiAgICAgKiDov5Tlm57liIbmiJDlhannqK5cbiAgICAgKiAxLuiiq+enu+mZpOWFg+e0oOeahOaVsOmHj+OAglxuICAgICAqIDIu5Zug5Li65LiN5a2Y5Zyo55qEIGtleSDooqvop4bkvZznqbrooagoZW1wdHkgbGlzdCnvvIzmiYDku6XlvZMga2V5IOS4jeWtmOWcqOaXtu+8jCBMUkVNIOWRveS7pOaAu+aYr+i/lOWbniAwIOOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY291bnRcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgbHJlbShrZXk6IHN0cmluZywgY291bnQ6IG51bWJlciwgdmFsdWU6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5scmVtKGtleSwgY291bnQsIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCN5LiA5YCLbGlzdCjntJTmlbjlrZcp5YGaQVND5o6S5bqPXG4gICAgICog5LiN5pyD5bCN55W25YmN55qEa2V56KOh6Z2i55qEbGlzdOWBmuaOkuW6j+WEsuWtmFxuICAgICAqIOWwseaYr+iqquatpOaTjeS9nOWPquaciee1puS9oOeahOe1kOaenOaYr3NvcnQs5a+m6Zqb5LiKa2V56KOh6Z2i5Lim5rKS5pyJ55yf5q2j6KKrc29ydFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBsaXN0U29ydE51bWJlckFTQyhrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zb3J0KGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWwjeS4gOWAi2xpc3Qo57SU5pW45a2XKeWBmkRFU0PmjpLluo9cbiAgICAgKiDkuI3mnIPlsI3nlbbliY3nmoRrZXnoo6HpnaLnmoRsaXN05YGa5o6S5bqP5YSy5a2YXG4gICAgICog5bCx5piv6Kqq5q2k5pON5L2c5Y+q5pyJ57Wm5L2g55qE57WQ5p6c5pivc29ydCzlr6bpmpvkuIprZXnoo6HpnaLkuKbmspLmnInnnJ/mraPooqtzb3J0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGxpc3RTb3J0TnVtYmVyREVTQyhrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zb3J0KGtleSwgJ2Rlc2MnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCN5LiA5YCLbGlzdCjntJRzdHJpbmcp5YGaQVND5o6S5bqPXG4gICAgICog5LiN5pyD5bCN55W25YmN55qEa2V56KOh6Z2i55qEbGlzdOWBmuaOkuW6j+WEsuWtmFxuICAgICAqIOWwseaYr+iqquatpOaTjeS9nOWPquaciee1puS9oOeahOe1kOaenOaYr3NvcnQs5a+m6Zqb5LiKa2V56KOh6Z2i5Lim5rKS5pyJ55yf5q2j6KKrc29ydFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBsaXN0U29ydFN0cmluZ0FTQyhrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zb3J0KGtleSwgJ0FMUEhBJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHNvcnQg5Y+v5Lul5YGa5b6I6KSH6Zuc55qE5pON5L2cICwg5aaC5p6c5LiN5aSg556t6Kej55uh6YeP5LiN6KaB542o56uL5L2/55SoXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGFyZ3NcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzb3J0KGtleTogc3RyaW5nLCAuLi5hcmdzOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zb3J0KGtleSwgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExTRVQga2V5IGluZGV4IHZhbHVlXG4gICAgICog6YCa6L+HaW5kZXjorr7nva5saXN0W2luZGV4XeeahHZhbHVlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBsc2V0KGtleTogc3RyaW5nLCBpbmRleDogbnVtYmVyLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmxzZXQoa2V5LCBpbmRleCwgdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMVFJJTSBrZXkgc3RhcnQgc3RvcFxuICAgICAqIOWvueS4gOS4quWIl+ihqOi/m+ihjOS/ruWJqih0cmltKe+8jOWwseaYr+ivtO+8jOiuqeWIl+ihqOWPquS/neeVmeaMh+WumuWMuumXtOWGheeahOWFg+e0oO+8jOS4jeWcqOaMh+WumuWMuumXtOS5i+WGheeahOWFg+e0oOmDveWwhuiiq+WIoOmZpOOAglxuICAgICAqIOS9oOS5n+WPr+S7peS9v+eUqOi0n+aVsOS4i+agh++8jOS7pSAtMSDooajnpLrliJfooajnmoTmnIDlkI7kuIDkuKrlhYPntKDvvIwgLTIg6KGo56S65YiX6KGo55qE5YCS5pWw56ys5LqM5Liq5YWD57Sg77yM5Lul5q2k57G75o6o44CCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdG9wXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgbHRyaW0oa2V5OiBzdHJpbmcsIHN0YXJ0OiBudW1iZXIsIHN0b3A6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5sdHJpbShrZXksIHN0YXJ0LCBzdG9wKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUlBPUExQVVNIIHNvdXJjZSBkZXN0aW5hdGlvblxuICAgICAqIOenu+mZpOWIl+ihqOeahOacgOWQjuS4gOS4quWFg+e0oO+8jOW5tuWwhuivpeWFg+e0oOa3u+WKoOWIsOWPpuS4gOS4quWIl+ihqOW5tui/lOWbnlxuICAgICAqIOWwhuWIl+ihqCBzb3VyY2Ug5Lit55qE5pyA5ZCO5LiA5Liq5YWD57SgKOWwvuWFg+e0oCnlvLnlh7rvvIzlubbov5Tlm57nu5nlrqLmiLfnq6/jgIJcbiAgICAgKiDlsIYgc291cmNlIOW8ueWHuueahOWFg+e0oOaPkuWFpeWIsOWIl+ihqCBkZXN0aW5hdGlvbiDvvIzkvZzkuLogZGVzdGluYXRpb24g5YiX6KGo55qE55qE5aS05YWD57Sg44CCXG4gICAgICog5aaC5p6cIHNvdXJjZSDkuI3lrZjlnKjvvIzlgLwgbmlsIOiiq+i/lOWbnu+8jOW5tuS4lOS4jeaJp+ihjOWFtuS7luWKqOS9nOOAglxuICAgICAqIOWmguaenCBzb3VyY2UgPT09IGRlc3RpbmF0aW9uIOebuOWQjO+8jOWImeWIl+ihqOS4reeahOihqOWwvuWFg+e0oOiiq+enu+WKqOWIsOihqOWktO+8jOW5tui/lOWbnuivpeWFg+e0oO+8jOWPr+S7peaKiui/meenjeeJueauiuaDheWGteinhuS9nOWIl+ihqOeahOaXi+i9rChyb3RhdGlvbinmk43kvZzjgIJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc291cmNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcnBvcGxwdXNoKHNvdXJjZTogc3RyaW5nLCBkZXN0aW5hdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnJwb3BscHVzaChzb3VyY2UsIGRlc3RpbmF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUlBVU0hYIGtleSB2YWx1ZVxuICAgICAqIOS4uuW3suWtmOWcqOeahOWIl+ihqCDliqDliLDooajlsL5cbiAgICAgKiDlvZMga2V5IOS4jeWtmOWcqOaXtu+8jOS7gOS5iOS5n+S4jeWBmlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcnB1c2h4KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnJwdXNoeChrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTFBVU0hYIGtleSB2YWx1ZVxuICAgICAqIOS4uuW3suWtmOWcqOeahOWIl+ihqCDliqDliLDooajpoK1cbiAgICAgKiDlvZMga2V5IOS4jeWtmOWcqOaXtu+8jOS7gOS5iOS5n+S4jeWBmlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgbHB1c2h4KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmxwdXNoeChrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCGIGtleSDmiYDlgqjlrZjnmoTlgLzliqDkuIrnu5nlrprnmoTlop7ph4/lgLzvvIhpbmNyZW1lbnQpXG4gICAgICog5aaC5p6cIGtleSDkuI3lrZjlnKjvvIzpgqPkuYgga2V5IOeahOWAvOS8muWFiOiiq+WIneWni+WMluS4uiAwIO+8jOeEtuWQjuWGjeaJp+ihjFxuICAgICAqIOWmguaenOWAvOWMheWQq+mUmeivr+eahOexu+Wei++8jOaIluWtl+espuS4suexu+Wei+eahOWAvOS4jeiDveihqOekuuS4uuaVsOWtl++8jOmCo+S5iOi/lOWbnuS4gOS4qumUmeivr1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5jcmVtZW50XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaW5jcmJ5KGtleTogc3RyaW5nLCBpbmNyZW1lbnQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5pbmNyYnkoa2V5LCBpbmNyZW1lbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNU0VUTlgga2V5IHZhbHVlIFtrZXkgdmFsdWUgLi4uXVxuICAgICAqIOWQjOaXtuiuvue9ruS4gOS4quaIluWkmuS4qiBrZXktdmFsdWUg5a+577yM5Lim5LiU5Y+q5pyJ55W25omA5pyJ57uZ5a6aIGtleSDpg73kuI3lrZjlnKjmiY3mnIPln7fooYzjgIJcbiAgICAgKiDljbPkvb/lj6rmnInkuIDkuKrnu5nlrpoga2V5IOW3suWtmOWcqO+8jCBNU0VUTlgg5Lmf5Lya5ouS57ud5omn6KGM5omA5pyJ57uZ5a6aIGtleSDnmoTorr7nva7mk43kvZzjgIJcbiAgICAgKiBNU0VUTlgg5piv5Y6f5a2Q5oCn55qEXG4gICAgICog5Zug5q2k5a6D5Y+v5Lul55So5L2c6K6+572u5aSa5Liq5LiN5ZCMIGtleSDooajnpLrkuI3lkIzlrZfmrrUoZmllbGQp55qE5ZSv5LiA5oCn6YC76L6R5a+56LGhKHVuaXF1ZSBsb2dpYyBvYmplY3QpXG4gICAgICog5omA5pyJ5a2X5q616KaB5LmI5YWo6KKr6K6+572u77yM6KaB5LmI5YWo5LiN6KKr6K6+572u44CCXG4gICAgICpcbiAgICAgKiDlvZPmiYDmnIkga2V5IOmDveaIkOWKn+iuvue9ru+8jOi/lOWbniAxIOOAglxuICAgICAqIOWmguaenOaJgOaciee7meWumiBrZXkg6YO96K6+572u5aSx6LSlKOiHs+WwkeacieS4gOS4qiBrZXkg5bey57uP5a2Y5ZyoKe+8jOmCo+S5iOi/lOWbniAwIOOAglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gYXJnc1xuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIG1zZXRueChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgLi4uYXJnczogc3RyaW5nW10pOiBQcm9taXNlPDAgfCAxPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLm1zZXRueChrZXksIHZhbHVlLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU0FERCBrZXkgbWVtYmVyIFttZW1iZXIgLi4uXVxuICAgICAqIOWwhuS4gOS4quaIluWkmuS4qiBtZW1iZXIg5YWD57Sg5Yqg5YWl5Yiw6ZuG5ZCIIGtleSDlvZPkuK3vvIzlt7Lnu4/lrZjlnKjkuo7pm4blkIjnmoQgbWVtYmVyIOWFg+e0oOWwhuiiq+W/veeVpVxuICAgICAqIOWBh+WmgiBrZXkg5LiN5a2Y5Zyo77yM5YiZ5Yib5bu65LiA5Liq5Y+q5YyF5ZCrIG1lbWJlciDlhYPntKDkvZzmiJDlkZjnmoTpm4blkIhcbiAgICAgKiDlvZMga2V5IOS4jeaYr+mbhuWQiOexu+Wei+aXtu+8jOi/lOWbnuS4gOS4qumUmeivr1xuICAgICAqXG4gICAgICog6L+U5ZueXG4gICAgICog6KKr5re75Yqg5Yiw6ZuG5ZCI5Lit55qE5paw5YWD57Sg55qE5pWw6YeP77yM5LiN5YyF5ous6KKr5b+955Wl55qE5YWD57SgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Li4uYW55W119IG1lbWJlcnNcbiAgICAgKiBAcmV0dXJucyB7KFByb21pc2U8YW55Pil9XG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNhZGQoa2V5OiBzdHJpbmcsIC4uLm1lbWJlcnM6IGFueVtdKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc2FkZChrZXksIC4uLm1lbWJlcnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTQ0FSRCBrZXlcbiAgICAgKiDov5Tlm57pm4blkIgga2V5IOeahOWfuuaVsCjpm4blkIjkuK3lhYPntKDnmoTmlbDph48pXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNjYXJkKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNjYXJkKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNESUZGIGtleSBba2V5IC4uLl1cbiAgICAgKiDmr5TovIPlhanlgItTZXTpm4blkIjkuK3nmoTlt67nlbAs6L+U5Zue5beu55WwXG4gICAgICog6L+U5Zue5LiA5Liq6ZuG5ZCI55qE5YWo6YOo5oiQ5ZGY77yM6K+l6ZuG5ZCI5piv5omA5pyJ57uZ5a6a6ZuG5ZCI5LmL6Ze055qE5beu6ZuG44CCXG4gICAgICog5LiN5a2Y5Zyo55qEIGtleSDooqvop4bkuLrnqbrpm4bjgIJcbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBrZXlzXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2RpZmYoLi4ua2V5czogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc2RpZmYoLi4ua2V5cyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNESUZGU1RPUkUgZGVzdGluYXRpb24ga2V5IFtrZXkgLi4uXVxuICAgICAqIOi/meS4quWRveS7pOeahOS9nOeUqOWSjCBTRElGRiDnsbvkvLzvvIzkvYblroPlsIbnu5Pmnpzkv53lrZjliLAgZGVzdGluYXRpb24g6ZuG5ZCI77yM6ICM5LiN5piv566A5Y2V5Zyw6L+U5Zue57uT5p6c6ZuGXG4gICAgICog5aaC5p6cIGRlc3RpbmF0aW9uIOmbhuWQiOW3sue7j+WtmOWcqO+8jOWImeWwhuWFtuimhuebllxuICAgICAqIGRlc3RpbmF0aW9uIOWPr+S7peaYryDoh6rlt7Hopobok4voh6rlt7FcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb25cbiAgICAgKiBAcGFyYW0gey4uLnN0cmluZ1tdfSBrZXlzXG4gICAgICogQHJldHVybnMg57uT5p6c6ZuG5Lit55qE5YWD57Sg5pWw6YePXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNkaWZmc3RvcmUoZGVzdGluYXRpb246IHN0cmluZywgLi4ua2V5czogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuc2RpZmZzdG9yZShkZXN0aW5hdGlvbiwgLi4ua2V5cyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNJTlRFUiBrZXkgW2tleSAuLi5dXG4gICAgICog6L+U5Zue5LiA5Liq6ZuG5ZCI55qE5YWo6YOo5oiQ5ZGY77yM6K+l6ZuG5ZCI5piv5omA5pyJ57uZ5a6a6ZuG5ZCI55qE5Lqk6ZuGXG4gICAgICog5LiN5a2Y5Zyo55qEIGtleSDooqvop4bkuLrnqbrpm4ZcbiAgICAgKiDlvZPnu5nlrprpm4blkIjlvZPkuK3mnInkuIDkuKrnqbrpm4bml7bvvIznu5PmnpzkuZ/kuLrnqbrpm4Yo5qC55o2u6ZuG5ZCI6L+Q566X5a6a5b6LKVxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGtleXNcbiAgICAgKiBAcmV0dXJucyDkuqTpm4bmiJDlkZjnmoTliJfooahcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2ludGVyKC4uLmtleXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNpbnRlciguLi5rZXlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU0lOVEVSU1RPUkUgZGVzdGluYXRpb24ga2V5IFtrZXkgLi4uXVxuICAgICAqIOi/meS4quWRveS7pOexu+S8vOS6jiBTSU5URVIg5ZG95Luk77yM5L2G5a6D5bCG57uT5p6c5L+d5a2Y5YiwIGRlc3RpbmF0aW9uIOmbhuWQiO+8jOiAjOS4jeaYr+eugOWNleWcsOi/lOWbnue7k+aenOmbhlxuICAgICAqIOWmguaenCBkZXN0aW5hdGlvbiDpm4blkIjlt7Lnu4/lrZjlnKjvvIzliJnlsIblhbbopobnm5ZcbiAgICAgKiBkZXN0aW5hdGlvbiDlj6/ku6XmmK8g6Ieq5bex6KaG6JOL6Ieq5bexXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0ga2V5c1xuICAgICAqIEByZXR1cm5zIHsgUHJvbWlzZTxudW1iZXI+fSDnu5Pmnpzpm4bkuK3nmoTmiJDlkZjmlbDph49cbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2ludGVyc3RvcmUoZGVzdGluYXRpb246IHN0cmluZywgLi4ua2V5czogc3RyaW5nW10pOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zaW50ZXJzdG9yZShkZXN0aW5hdGlvbiwgLi4ua2V5cyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNJU01FTUJFUiBrZXkgbWVtYmVyXG4gICAgICog5Yik5patIG1lbWJlciDlhYPntKDmmK/lkKbpm4blkIgga2V5IOeahOaIkOWRmFxuICAgICAqXG4gICAgICog5aaC5p6cIG1lbWJlciDlhYPntKDmmK/pm4blkIjnmoTmiJDlkZjvvIzov5Tlm54gMVxuICAgICAqIOWmguaenCBtZW1iZXIg5YWD57Sg5LiN5piv6ZuG5ZCI55qE5oiQ5ZGY77yM5oiWIGtleSDkuI3lrZjlnKjvvIzov5Tlm54gMFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVtYmVyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8MCB8IDE+fVxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzaXNtZW1iZXIoa2V5OiBzdHJpbmcsIG1lbWJlcjogc3RyaW5nKTogUHJvbWlzZTwwIHwgMT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zaXNtZW1iZXIoa2V5LCBtZW1iZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTTUVNQkVSUyBrZXlcbiAgICAgKiDov5Tlm57pm4blkIgga2V5IOS4reeahOaJgOacieaIkOWRmFxuICAgICAqIOS4jeWtmOWcqOeahCBrZXkg6KKr6KeG5Li656m66ZuG5ZCIXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zIOmbhuWQiOS4reeahOaJgOacieaIkOWRmFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzbWVtYmVycyhrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zbWVtYmVycyhrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTTU9WRSBzb3VyY2UgZGVzdGluYXRpb24gbWVtYmVyXG4gICAgICog5bCGIG1lbWJlciDlhYPntKDku44gc291cmNlIOmbhuWQiOenu+WKqOWIsCBkZXN0aW5hdGlvbiDpm4blkIhcbiAgICAgKiBTTU9WRSDmmK/ljp/lrZDmgKfmk43kvZxcbiAgICAgKiDlpoLmnpwgc291cmNlIOmbhuWQiOS4jeWtmOWcqOaIluS4jeWMheWQq+aMh+WumueahCBtZW1iZXIg5YWD57Sg77yM5YiZIFNNT1ZFIOWRveS7pOS4jeaJp+ihjOS7u+S9leaTjeS9nO+8jOS7hei/lOWbniAwXG4gICAgICog5ZCm5YiZ77yMIG1lbWJlciDlhYPntKDku44gc291cmNlIOmbhuWQiOS4reiiq+enu+mZpO+8jOW5tua3u+WKoOWIsCBkZXN0aW5hdGlvbiDpm4blkIjkuK3ljrtcbiAgICAgKiDlvZMgZGVzdGluYXRpb24g6ZuG5ZCI5bey57uP5YyF5ZCrIG1lbWJlciDlhYPntKDml7bvvIwgU01PVkUg5ZG95Luk5Y+q5piv566A5Y2V5Zyw5bCGIHNvdXJjZSDpm4blkIjkuK3nmoQgbWVtYmVyIOWFg+e0oOWIoOmZpFxuICAgICAqIOW9kyBzb3VyY2Ug5oiWIGRlc3RpbmF0aW9uIOS4jeaYr+mbhuWQiOexu+WeiyhTZXQp5pe277yM6L+U5Zue5LiA5Liq6ZSZ6K+vXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZW1iZXJcbiAgICAgKiBAcmV0dXJucyDlpoLmnpwgbWVtYmVyIOWFg+e0oOiiq+aIkOWKn+enu+mZpO+8jOi/lOWbnlxuICAgICAqICAgICAgICAgIOWmguaenCBtZW1iZXIg5YWD57Sg5LiN5pivIHNvdXJjZSDpm4blkIjnmoTmiJDlkZjvvIzlubbkuJTmsqHmnInku7vkvZXmk43kvZzlr7kgZGVzdGluYXRpb24g6ZuG5ZCI5omn6KGM77yM6YKj5LmI6L+U5ZueIDBcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc21vdmUoc291cmNlOiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcsIG1lbWJlcjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNtb3ZlKHNvdXJjZSwgZGVzdGluYXRpb24sIG1lbWJlcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNQT1Aga2V5IGNvdW50P1xuICAgICAqIOenu+mZpOW5tui/lOWbnumbhuWQiOS4reeahCBjb3VudCDkuKrpmo/mnLrlhYPntKBcbiAgICAgKiDlpoLmnpzkuI3ovLjlhaVjb3VudOWwseaYr+maqOapn+S4gOWAi+WFg+e0oFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2NvdW50XVxuICAgICAqIEByZXR1cm5zIOiiq+enu+mZpOeahOmaj+acuuWFg+e0oFxuICAgICAqICAgICAgICAgIOW9kyBrZXkg5LiN5a2Y5Zyo5oiWIGtleSDmmK/nqbrpm4bml7bvvIzov5Tlm54gbmlsXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNwb3Aoa2V5OiBzdHJpbmcsIGNvdW50PzogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNwb3Aoa2V5LCBjb3VudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNSQU5ETUVNQkVSIGtleSBjb3VudD9cbiAgICAgKiDlpoLmnpzlkb3ku6TmiafooYzml7bvvIzlj6rmj5DkvpvkuoYga2V5IOWPguaVsO+8jOmCo+S5iOi/lOWbnumbhuWQiOS4reeahOS4gOS4qumaj+acuuWFg+e0oFxuICAgICAqIOS7jiBSZWRpcyAyLjYg54mI5pys5byA5aeL77yMIFNSQU5ETUVNQkVSIOWRveS7pOaOpeWPl+WPr+mAieeahCBjb3VudCDlj4LmlbBcbiAgICAgKiDlpoLmnpwgY291bnQg5Li65q2j5pWw77yM5LiU5bCP5LqO6ZuG5ZCI5Z+65pWw77yM6YKj5LmI5ZG95Luk6L+U5Zue5LiA5Liq5YyF5ZCrIGNvdW50IOS4quWFg+e0oOeahOaVsOe7hFxuICAgICAqIOaVsOe7hOS4reeahOWFg+e0oOWQhOS4jeebuOWQjOOAguWmguaenCBjb3VudCDlpKfkuo7nrYnkuo7pm4blkIjln7rmlbDvvIzpgqPkuYjov5Tlm57mlbTkuKrpm4blkIhcbiAgICAgKlxuICAgICAqIOWmguaenCBjb3VudCDkuLrotJ/mlbDvvIzpgqPkuYjlkb3ku6Tov5Tlm57kuIDkuKrmlbDnu4TvvIzmlbDnu4TkuK3nmoTlhYPntKDlj6/og73kvJrph43lpI3lh7rnjrDlpJrmrKFcbiAgICAgKiDogIzmlbDnu4TnmoTplb/luqbkuLogY291bnQg55qE57ud5a+55YC8XG4gICAgICpcbiAgICAgKiDor6Xmk43kvZzlkowgU1BPUCDnm7jkvLzvvIzkvYYgU1BPUCDlsIbpmo/mnLrlhYPntKDku47pm4blkIjkuK3np7vpmaTlubbov5Tlm55cbiAgICAgKiDogIwgU1JBTkRNRU1CRVIg5YiZ5LuF5LuF6L+U5Zue6ZqP5py65YWD57Sg77yM6ICM5LiN5a+56ZuG5ZCI6L+b6KGM5Lu75L2V5pS55YqoXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbY291bnQ/XVxuICAgICAqIEByZXR1cm5zIOWPquaPkOS+myBrZXkg5Y+C5pWw5pe277yM6L+U5Zue5LiA5Liq5YWD57Sg77yb5aaC5p6c6ZuG5ZCI5Li656m677yM6L+U5ZueIG5pbFxuICAgICAqIOWmguaenOaPkOS+m+S6hiBjb3VudCDlj4LmlbDvvIzpgqPkuYjov5Tlm57kuIDkuKrmlbDnu4TvvJvlpoLmnpzpm4blkIjkuLrnqbrvvIzov5Tlm57nqbrmlbDnu4RcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc3JhbmRtZW1iZXIoa2V5OiBzdHJpbmcsIGNvdW50PzogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNyYW5kbWVtYmVyKGtleSwgY291bnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTUkVNIGtleSBtZW1iZXIgW21lbWJlciAuLi5dXG4gICAgICog56e76Zmk6ZuG5ZCIIGtleSDkuK3nmoTkuIDkuKrmiJblpJrkuKogbWVtYmVyIOWFg+e0oO+8jOS4jeWtmOWcqOeahCBtZW1iZXIg5YWD57Sg5Lya6KKr5b+955WlXG4gICAgICog5b2TIGtleSDkuI3mmK/pm4blkIjnsbvlnosoU2V0Ke+8jOi/lOWbnuS4gOS4qumUmeivr1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0gey4uLmFueVtdfSBtZW1iZXJzXG4gICAgICogQHJldHVybnMg6KKr5oiQ5Yqf56e76Zmk55qE5YWD57Sg55qE5pWw6YeP77yM5LiN5YyF5ous6KKr5b+955Wl55qE5YWD57SgXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNyZW0oa2V5OiBzdHJpbmcsIC4uLm1lbWJlcnM6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNyZW0oa2V5LCAuLi5tZW1iZXJzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU1VOSU9OIGtleSBba2V5IC4uLl1cbiAgICAgKiDov5Tlm57kuIDkuKrpm4blkIjnmoTlhajpg6jmiJDlkZjvvIzor6Xpm4blkIjmmK/miYDmnInnu5nlrprpm4blkIjnmoTlubbpm4ZcbiAgICAgKiDkuI3lrZjlnKjnmoQga2V5IOiiq+inhuS4uuepuumbhlxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGtleXNcbiAgICAgKiBAcmV0dXJucyDlubbpm4bmiJDlkZjnmoTliJfooahcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc3VuaW9uKC4uLmtleXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnN1bmlvbiguLi5rZXlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU1VOSU9OU1RPUkUgZGVzdGluYXRpb24ga2V5IFtrZXkgLi4uXVxuICAgICAqIOi/meS4quWRveS7pOexu+S8vOS6jiBTVU5JT04g5ZG95Luk77yM5L2G5a6D5bCG57uT5p6c5L+d5a2Y5YiwIGRlc3RpbmF0aW9uIOmbhuWQiO+8jOiAjOS4jeaYr+eugOWNleWcsOi/lOWbnue7k+aenOmbhlxuICAgICAqIOWmguaenCBkZXN0aW5hdGlvbiDlt7Lnu4/lrZjlnKjvvIzliJnlsIblhbbopobnm5ZcbiAgICAgKiBkZXN0aW5hdGlvbiDlj6/ku6XmmK8ga2V5IOiHquW3seimhuiTi+acrOi6q1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvblxuICAgICAqIEBwYXJhbSB7Li4uc3RyaW5nW119IGtleXNcbiAgICAgKiBAcmV0dXJucyDnu5Pmnpzpm4bkuK3nmoTlhYPntKDmlbDph49cbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc3VuaW9uc3RvcmUoZGVzdGluYXRpb246IHN0cmluZywgLi4ua2V5czogc3RyaW5nW10pOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zdW5pb25zdG9yZShkZXN0aW5hdGlvbiwgLi4ua2V5cyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBTVUJTQ1JJQkUgcGF0dGVybiBbcGF0dGVybiAuLi5dXG4gICAgICog6K6i6ZiF5LiA5Liq5oiW5aSa5Liq56ym5ZCI57uZ5a6a5qih5byP55qE6aKR6YGTXG4gICAgICog5q+P5Liq5qih5byP5LulICog5L2c5Li65Yy56YWN56ym77yM5q+U5aaCIGl0KiDljLnphY3miYDmnInku6UgaXQg5byA5aS055qE6aKR6YGTKCBpdC5uZXdzIOOAgSBpdC5ibG9nIOOAgSBpdC50d2VldHMg562J562JKVxuICAgICAqIG5ld3MuKiDljLnphY3miYDmnInku6UgbmV3cy4g5byA5aS055qE6aKR6YGTKCBuZXdzLml0IOOAgSBuZXdzLmdsb2JhbC50b2RheSDnrYnnrYkp77yM6K+45aaC5q2k57G7XG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gcGF0dGVybnNcbiAgICAgKiBAcmV0dXJucyDmjqXmlLbliLDnmoTkv6Hmga9cbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcHN1YnNjcmliZSguLi5wYXR0ZXJuczogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMucHN1YnNjcmliZSguLi5wYXR0ZXJucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBVQkxJU0ggY2hhbm5lbCBtZXNzYWdlXG4gICAgICog5bCG5L+h5oGvIG1lc3NhZ2Ug5Y+R6YCB5Yiw5oyH5a6a55qE6aKR6YGTIGNoYW5uZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHJldHVybnMg5o6l5pS25Yiw5L+h5oGvIG1lc3NhZ2Ug55qE6K6i6ZiF6ICF5pWw6YePXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHB1Ymxpc2goY2hhbm5lbDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMucHVibGlzaChjaGFubmVsLCBtZXNzYWdlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUFVOU1VCU0NSSUJFIFtwYXR0ZXJuIFtwYXR0ZXJuIC4uLl1dXG4gICAgICog5oyH56S65a6i5oi356uv6YCA6K6i5omA5pyJ57uZ5a6a5qih5byPXG4gICAgICog5aaC5p6c5rKh5pyJ5qih5byP6KKr5oyH5a6a77yM5Lmf5Y2z5piv77yM5LiA5Liq5peg5Y+C5pWw55qEIFBVTlNVQlNDUklCRSDosIPnlKjooqvmiafooYwg6YKj5LmI5a6i5oi356uv5L2/55SoIFBTVUJTQ1JJQkUg5ZG95Luk6K6i6ZiF55qE5omA5pyJ5qih5byP6YO95Lya6KKr6YCA6K6i44CCXG4gICAgICog5Zyo6L+Z56eN5oOF5Ya15LiL77yM5ZG95Luk5Lya6L+U5Zue5LiA5Liq5L+h5oGv77yM5ZGK55+l5a6i5oi356uv5omA5pyJ6KKr6YCA6K6i55qE5qih5byPXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0gcGF0dGVybnNcbiAgICAgKiBAcmV0dXJucyDov5nkuKrlkb3ku6TlnKjkuI3lkIznmoTlrqLmiLfnq6/kuK3mnInkuI3lkIznmoTooajnjrBcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcHVuc3Vic2NyaWJlKC4uLnBhdHRlcm5zOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5wdW5zdWJzY3JpYmUoLi4ucGF0dGVybnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTVUJTQ1JJQkUgY2hhbm5lbCBbY2hhbm5lbCAuLi5dXG4gICAgICog6K6i6ZiF57uZ5a6a55qE5LiA5Liq5oiW5aSa5Liq6aKR6YGT55qE5L+h5oGvXG4gICAgICogQHBhcmFtIHsuLi5hbnlbXX0gY2hhbm5lbHNcbiAgICAgKiBAcmV0dXJucyDmjqXmlLbliLDnmoTkv6Hmga8g5Y+D6ICDIGh0dHA6Ly9yZWRpc2RvYy5jb20vcHViX3N1Yi9zdWJzY3JpYmUuaHRtbFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzdWJzY3JpYmUoLi4uY2hhbm5lbHM6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnN1YnNjcmliZSguLi5jaGFubmVscyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVOU1VCU0NSSUJFIFtjaGFubmVsIFtjaGFubmVsIC4uLl1dXG4gICAgICog5oyH56S65a6i5oi356uv6YCA6K6i57uZ5a6a55qE6aKR6YGTXG4gICAgICog5aaC5p6c5rKh5pyJ6aKR6YGT6KKr5oyH5a6a77yM5Lmf5Y2z5piv77yM5LiA5Liq5peg5Y+C5pWw55qEIFVOU1VCU0NSSUJFIOiwg+eUqOiiq+aJp+ihjO+8jOmCo+S5iOWuouaIt+err+S9v+eUqCBTVUJTQ1JJQkUg5ZG95Luk6K6i6ZiF55qE5omA5pyJ6aKR6YGT6YO95Lya6KKr6YCA6K6i44CCXG4gICAgICog5Zyo6L+Z56eN5oOF5Ya15LiL77yM5ZG95Luk5Lya6L+U5Zue5LiA5Liq5L+h5oGv77yM5ZGK55+l5a6i5oi356uv5omA5pyJ6KKr6YCA6K6i55qE6aKR6YGTXG4gICAgICogQHBhcmFtIHsuLi5hbnlbXX0gY2hhbm5lbHNcbiAgICAgKiBAcmV0dXJucyDov5nkuKrlkb3ku6TlnKjkuI3lkIznmoTlrqLmiLfnq6/kuK3mnInkuI3lkIznmoTooajnjrBcbiAgICAgKiBAbWVtYmVyb2YgUmVkaXNNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgdW5zdWJzY3JpYmUoLi4uY2hhbm5lbHM6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnVuc3Vic2NyaWJlKC4uLmNoYW5uZWxzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV0FUQ0gga2V5IFtrZXkgLi4uXVxuICAgICAqIOebkeinhuS4gOS4qijmiJblpJrkuKopIGtleSDvvIzlpoLmnpzlnKjkuovliqHmiafooYzkuYvliY3ov5nkuKoo5oiW6L+Z5LqbKSBrZXkg6KKr5YW25LuW5ZG95Luk5omA5pS55Yqo77yM6YKj5LmI5LqL5Yqh5bCG6KKr5omT5patXG4gICAgICogQHBhcmFtIHsuLi5zdHJpbmdbXX0ga2V5c1xuICAgICAqIEByZXR1cm5zIOaAu+aYr+i/lOWbniBPS1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB3YXRjaCguLi5rZXlzOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy53YXRjaCguLi5rZXlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVU5XQVRDSFxuICAgICAqIOWPlua2iCBXQVRDSCDlkb3ku6Tlr7nmiYDmnIkga2V5IOeahOebkeinhlxuICAgICAqIOWmguaenOWcqOaJp+ihjCBXQVRDSCDlkb3ku6TkuYvlkI7vvIwgRVhFQyDlkb3ku6TmiJYgRElTQ0FSRCDlkb3ku6TlhYjooqvmiafooYzkuobnmoTor53vvIzpgqPkuYjlsLHkuI3pnIDopoHlho3miafooYwgVU5XQVRDSCDkuoZcbiAgICAgKiDlm6DkuLogRVhFQyDlkb3ku6TkvJrmiafooYzkuovliqHvvIzlm6DmraQgV0FUQ0gg5ZG95Luk55qE5pWI5p6c5bey57uP5Lqn55Sf5LqGXG4gICAgICpcbiAgICAgKiDogIwgRElTQ0FSRCDlkb3ku6TlnKjlj5bmtojkuovliqHnmoTlkIzml7bkuZ/kvJrlj5bmtojmiYDmnInlr7kga2V5IOeahOebkeinhlxuICAgICAqIOWboOatpOi/meS4pOS4quWRveS7pOaJp+ihjOS5i+WQju+8jOWwseayoeacieW/heimgeaJp+ihjCBVTldBVENIIOS6hlxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHVud2F0Y2goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnVud2F0Y2goKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRVhFQ1xuICAgICAqIOaJp+ihjOaJgOacieS6i+WKoeWdl+WGheeahOWRveS7pFxuICAgICAqIOWBh+WmguafkOS4qijmiJbmn5DkupspIGtleSDmraPlpITkuo4gV0FUQ0gg5ZG95Luk55qE55uR6KeG5LmL5LiL77yM5LiU5LqL5Yqh5Z2X5Lit5pyJ5ZKM6L+Z5LiqKOaIlui/meS6mykga2V5IOebuOWFs+eahOWRveS7pFxuICAgICAqIOmCo+S5iCBFWEVDIOWRveS7pOWPquWcqOi/meS4qijmiJbov5nkupspIGtleSDmsqHmnInooqvlhbbku5blkb3ku6TmiYDmlLnliqjnmoTmg4XlhrXkuIvmiafooYzlubbnlJ/mlYjvvIzlkKbliJnor6XkuovliqHooqvmiZPmlq0oYWJvcnQpXG4gICAgICogQHJldHVybnMg5LqL5Yqh5Z2X5YaF5omA5pyJ5ZG95Luk55qE6L+U5Zue5YC877yM5oyJ5ZG95Luk5omn6KGM55qE5YWI5ZCO6aG65bqP5o6S5YiXXG4gICAgICog5b2T5pON5L2c6KKr5omT5pat5pe277yM6L+U5Zue56m65YC8IG5pbFxuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBleGVjKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5leGVjKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERJU0NBUkRcbiAgICAgKiDlj5bmtojkuovliqHvvIzmlL7lvIPmiafooYzkuovliqHlnZflhoXnmoTmiYDmnInlkb3ku6RcbiAgICAgKiDlpoLmnpzmraPlnKjkvb/nlKggV0FUQ0gg5ZG95Luk55uR6KeG5p+Q5LiqKOaIluafkOS6mykga2V577yM6YKj5LmI5Y+W5raI5omA5pyJ55uR6KeG77yM562J5ZCM5LqO5omn6KGM5ZG95LukIFVOV0FUQ0hcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBkaXNjYXJkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5kaXNjYXJkKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1VTFRJXG4gICAgICog5qCH6K6w5LiA5Liq5LqL5Yqh5Z2X55qE5byA5aeLXG4gICAgICog5LqL5Yqh5Z2X5YaF55qE5aSa5p2h5ZG95Luk5Lya5oyJ54Wn5YWI5ZCO6aG65bqP6KKr5pS+6L+b5LiA5Liq6Zif5YiX5b2T5Lit77yM5pyA5ZCO55SxIEVYRUMg5ZG95Luk5Y6f5a2Q5oCnKGF0b21pYynlnLDmiafooYxcbiAgICAgKiBAcGFyYW0ge3sgcGlwZWxpbmU6IGZhbHNlIH19IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJvZiBSZWRpc01hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBtdWx0aShvcHRpb25zOiB7IHBpcGVsaW5lOiBmYWxzZSB9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZGlzLm11bHRpKG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAoUGlwZWxpbmUpXG4gICAgICogTVVMVElcbiAgICAgKiDmoIforrDkuIDkuKrkuovliqHlnZfnmoTlvIDlp4tcbiAgICAgKiDkuovliqHlnZflhoXnmoTlpJrmnaHlkb3ku6TkvJrmjInnhaflhYjlkI7pobrluo/ooqvmlL7ov5vkuIDkuKrpmJ/liJflvZPkuK3vvIzmnIDlkI7nlLEgRVhFQyDlkb3ku6Tljp/lrZDmgKcoYXRvbWljKeWcsOaJp+ihjFxuICAgICAqIEBwYXJhbSB7eyBwaXBlbGluZTogZmFsc2UgfX0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIFJlZGlzTWFuZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIG11bHRpUGlwZWxpbmUoY29tbWFuZHM/OiBzdHJpbmdbXVtdLCBvcHRpb25zPzogSU9SZWRpcy5NdWx0aU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMubXVsdGkoY29tbWFuZHMsIG9wdGlvbnMpO1xuICAgIH1cbn1cbiJdfQ==