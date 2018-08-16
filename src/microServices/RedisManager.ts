import * as IORedis from 'ioredis';
import * as log4js from 'koa-log4';
import * as _ from 'lodash';
import 'reflect-metadata';
import { provide } from '../ioc/ioc';
import RedisContext from '../models/RedisContext';

const _log = log4js.getLogger('RedisManger');
@provide('RedisManger')
export default class RedisManger {
    private redis: IORedis.Redis = RedisContext.getInstance().getRedis() as any;

    /**
     * 增加一個key跟對應的值, 沒有過期時間
     * @param {string} key
     * @param {(number | string)} value
     * @returns
     * @memberof RedisManger
     */
    public async set(key: string, value: number | string) {
        return this.redis.set(key, value);
    }
    /**
     * 讓一個key有過期時間 單位是秒
     * @param {string} key
     * @param {number} ex
     * @returns
     * @memberof RedisManger
     */
    public async expire(key: string, ex: number) {
        return this.redis.expire(key, ex);
    }
    /**
     * 取得一個key裡面的資料
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    public async get(key: string) {
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
    public async type(key: string): Promise<'none' | 'string' | 'list' | 'set' | 'zset' | 'hash'> {
        return this.redis.type(key) as any;
    }
    /**
     * 将 key 中储存的数字值增一。
     * 如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行
     * 如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    public async incr(key: string) {
        return this.redis.incr(key);
    }
    /**
     * 刪除這個key包含裡面的數值
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    public async del(key: string) {
        return this.redis.del(key);
    }
    /**
     * 查詢這個key有沒有存在
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    public async exists(key: string) {
        return this.redis.exists(key);
    }
    /**
     * 讓這個key持久化,不讓它過期
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    public async persist(key: string) {
        return this.redis.persist(key);
    }
    /**
     * 以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)。
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    public async ttl(key: string) {
        return this.redis.ttl(key);
    }
    /**
     * 将给定 key 的值设为 value ，并返回 key 的旧值(old value)。
     * @param {string} key
     * @param {(string | number)} value
     * @returns
     * @memberof RedisManger
     */
    public async getset(key: string, value: string | number) {
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
    public async setnx(key: string, value: string | number): Promise<0 | 1> {
        return this.redis.setnx(key, value);
    }
    /**
     * 返回 key 所储存的字符串值的长度。
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    public async strlen(key: string) {
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
    public async incrbyfloat(key: string, increment: number) {
        return this.redis.incrbyfloat(key, increment);
    }
    /**
     * 将 key 中储存的数字值减一。
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    public async decr(key: string) {
        return this.redis.decr(key);
    }
    /**
     * key 所储存的值减去给定的减量值（decrement)
     * @param {string} key
     * @param {number} value
     * @returns
     * @memberof RedisManger
     */
    public async decrby(key: string, value: number) {
        return this.redis.decrby(key, value);
    }
    /**
     * 如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾。
     * @param {string} key
     * @param {string} value
     * @returns
     * @memberof RedisManger
     */
    public async append(key: string, value: string) {
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
    public async hdelArray(key: string, value: string[]) {
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
    public async hdel(key: string, ...value: string[]) {
        return this.redis.hdel(key, ...value);
    }
    /**
     * 查看HashMap key 中，指定的字段是否存在。
     * @param {string} key
     * @param {string} value
     * @returns
     * @memberof RedisManger
     */
    public async hexists(key: string, field: string) {
        return this.redis.hexists(key, field);
    }
    /**
     * 获取key中 存储在HashMap中指定字段的值
     * @param {string} key
     * @param {string} field
     * @returns
     * @memberof RedisManger
     */
    public async hget(key: string, field: string) {
        return this.redis.hget(key, field);
    }
    /**
     * 获取在HashMap中指定 key 的所有字段和值
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    public async hgetall(key: string) {
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
    public async hincrby(key: string, field: string, value: number) {
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
    public async hincrbyfloat(key: string, field: string, value: number) {
        return this.redis.hincrbyfloat(key, field, value);
    }
    /**
     * 取得這個HashMap key中所有的fields
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    public async hkeys(key: string) {
        return this.redis.hkeys(key);
    }
    /**
     * 获取HashMap中fields的数量
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    public async hlen(key: string) {
        return this.redis.hlen(key);
    }
    /**
     * 获取所有指定Fields的值
     * @param {string} key
     * @param {...string[]} field
     * @returns
     * @memberof RedisManger
     */
    public async hmget(key: string, ...field: string[]) {
        return this.redis.hmget(key, ...field);
    }
    /**
     * 获取所有指定Fields的值
     * @param {string} key
     * @param {...string[]} field
     * @returns
     * @memberof RedisManger
     */
    public async hmgetArray(key: string, field: string[]) {
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
    public async hmset(key: string, field: string, value: any, ...args: string[]): Promise<0 | 1> {
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
    public async hset(key: string, field: string, value: any) {
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
    public async hsetnx(key: string, field: string, value: any) {
        return this.redis.hsetnx(key, field, value);
    }
    /**
     * HVALS key
     * 获取hashMap中所有的值
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    public async hvals(key: string) {
        return this.redis.hvals(key);
    }
    /**
     * BLPOP key1 [key2 ]
     * 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
     * @param {...string[]} key
     * @returns
     * @memberof RedisManger
     */
    public async blpop(...key: string[]) {
        return this.redis.blpop(...key);
    }
    /**
     * BLPOP key1 [key2 ]
     * 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
     * @param {string[]} key
     * @returns
     * @memberof RedisManger
     */
    public async blpopArray(key: string[]) {
        return this.redis.blpop(...key);
    }
    /**
     * BRPOP key1 [key2 ]
     * 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     * @param {...string[]} key
     * @returns
     * @memberof RedisManger
     */
    public async brpop(...key: string[]) {
        return this.redis.brpop(...key);
    }
    /**
     * RPOP key
     * 移出并获取列表的最后一个元素， 如果列表没有元素不會阻塞
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    public async rpop(key: string) {
        return this.redis.rpop(key);
    }
    /**
     * BRPOP key1 [key2 ]
     * 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     * @param {string[]} key
     * @returns
     * @memberof RedisManger
     */
    public async brpopArray(key: string[]) {
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
    public async brpoplpush(source: string, destination: string, timeout: number) {
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
    public async lindex(key: string, index: number) {
        return this.redis.lindex(key, index);
    }
    /**
     * LLEN key
     * 获取列表长度
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    public async llen(key: string) {
        return this.redis.llen(key);
    }
    /**
     * LPOP key
     * 移出并获取列表的第一个元素, 如果列表没有元素不會阻塞
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    public async lpop(key: string) {
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
    public async lpush(key: string, ...values: any[]) {
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
    public async lpushArray(key: string, values: any[]) {
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
    public async rpush(key: string, ...values: any[]) {
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
    public async rpushArray(key: string, values: any[]) {
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
    public async lrange(key: string, start: number, stop: number) {
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
    public async lrem(key: string, count: number, value: any) {
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
    public async listSortNumberASC(key: string) {
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
    public async listSortNumberDESC(key: string) {
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
    public async listSortStringASC(key: string) {
        return this.redis.sort(key, 'ALPHA');
    }
    /**
     * sort 可以做很複雜的操作 , 如果不夠瞭解盡量不要獨立使用
     * @param {string} key
     * @param {...string[]} args
     * @returns
     * @memberof RedisManger
     */
    public async sort(key: string, ...args: string[]) {
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
    public async lset(key: string, index: number, value: any) {
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
    public async ltrim(key: string, start: number, stop: number) {
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
    public async rpoplpush(source: string, destination: string) {
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
    public async rpushx(key: string, value: any) {
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
    public async lpushx(key: string, value: any) {
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
    public async incrby(key: string, increment: number) {
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
    public async msetnx(key: string, value: any, ...args: string[]): Promise<0 | 1> {
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
    public async sadd(key: string, ...members: any[]): Promise<any> {
        return this.redis.sadd(key, ...members);
    }
    /**
     * SCARD key
     * 返回集合 key 的基数(集合中元素的数量)
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    public async scard(key: string) {
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
    public async sdiff(...keys: string[]) {
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
    public async sdiffstore(destination: string, ...keys: string[]) {
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
    public async sinter(...keys: string[]) {
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
    public async sinterstore(destination: string, ...keys: string[]): Promise<number> {
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
    public async sismember(key: string, member: string): Promise<0 | 1> {
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
    public async smembers(key: string) {
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
    public async smove(source: string, destination: string, member: string) {
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
    public async spop(key: string, count?: number) {
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
    public async srandmember(key: string, count?: number) {
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
    public async srem(key: string, ...members: any[]) {
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
    public async sunion(...keys: string[]) {
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
    public async sunionstore(destination: string, ...keys: string[]): Promise<number> {
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
    public async psubscribe(...patterns: string[]) {
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
    public async publish(channel: string, message: string) {
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
    public async punsubscribe(...patterns: string[]) {
        return this.redis.punsubscribe(...patterns);
    }
    /**
     * SUBSCRIBE channel [channel ...]
     * 订阅给定的一个或多个频道的信息
     * @param {...any[]} channels
     * @returns 接收到的信息 參考 http://redisdoc.com/pub_sub/subscribe.html
     * @memberof RedisManger
     */
    public async subscribe(...channels: any[]) {
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
    public async unsubscribe(...channels: any[]) {
        return this.redis.unsubscribe(...channels);
    }
    /**
     * WATCH key [key ...]
     * 监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断
     * @param {...string[]} keys
     * @returns 总是返回 OK
     * @memberof RedisManger
     */
    public async watch(...keys: string[]) {
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
    public async unwatch() {
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
    public async exec() {
        return this.redis.exec();
    }
    /**
     * DISCARD
     * 取消事务，放弃执行事务块内的所有命令
     * 如果正在使用 WATCH 命令监视某个(或某些) key，那么取消所有监视，等同于执行命令 UNWATCH
     * @returns
     * @memberof RedisManger
     */
    public async discard() {
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
    public async multi(options: { pipeline: false }) {
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
    public async multiPipeline(commands?: string[][], options?: IORedis.MultiOptions) {
        return this.redis.multi(commands, options);
    }
}
