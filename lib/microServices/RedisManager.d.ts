/// <reference types="node" />
/// <reference types="mocha" />
import * as IORedis from 'ioredis';
import 'reflect-metadata';
import GEOEntity from '../models/GEOEntity';
interface Pipeline {
    redis: IORedis.Redis;
    isCluster: boolean;
    options: IORedis.RedisOptions;
    _queue: IORedis.Command[];
    _result: any[];
    _transactions: number;
    _shaToScript: {};
    bitcount(key: string, callback?: (err: Error, res: number) => void): Pipeline;
    bitcount(key: string, start: number, end: number, callback?: (err: Error, res: number) => void): Pipeline;
    get(key: string, callback?: (err: Error, res: string) => void): Pipeline;
    set(key: string, value: any, callback?: (err: Error, res: string) => void): Pipeline;
    set(key: string, value: any, setMode: string, callback?: (err: Error, res: string) => void): Pipeline;
    set(key: string, value: any, expiryMode: string, time: number, callback?: (err: Error, res: string) => void): Pipeline;
    set(key: string, value: any, expiryMode: string, time: number, setMode: string, callback?: (err: Error, res: string) => void): Pipeline;
    setBuffer(key: string, value: any, callback?: (err: Error, res: Buffer) => void): Pipeline;
    setBuffer(key: string, value: any, setMode: string, callback?: (err: Error, res: Buffer) => void): Pipeline;
    setBuffer(key: string, value: any, expiryMode: string, time: number, callback?: (err: Error, res: Buffer) => void): Pipeline;
    setBuffer(key: string, value: any, expiryMode: string, time: number, setMode: string, callback?: (err: Error, res: Buffer) => void): Pipeline;
    setnx(key: string, value: any, callback?: (err: Error, res: any) => void): Pipeline;
    setex(key: string, seconds: number, value: any, callback?: (err: Error, res: any) => void): Pipeline;
    psetex(key: string, milliseconds: number, value: any, callback?: (err: Error, res: any) => void): Pipeline;
    append(key: string, value: any, callback?: (err: Error, res: number) => void): Pipeline;
    strlen(key: string, callback?: (err: Error, res: number) => void): Pipeline;
    del(...keys: string[]): Pipeline;
    exists(...keys: string[]): Pipeline;
    setbit(key: string, offset: number, value: any, callback?: (err: Error, res: number) => void): Pipeline;
    getbit(key: string, offset: number, callback?: (err: Error, res: number) => void): Pipeline;
    setrange(key: string, offset: number, value: any, callback?: (err: Error, res: number) => void): Pipeline;
    getrange(key: string, start: number, end: number, callback?: (err: Error, res: string) => void): Pipeline;
    substr(key: string, start: number, end: number, callback?: (err: Error, res: string) => void): Pipeline;
    incr(key: string, callback?: (err: Error, res: number) => void): Pipeline;
    decr(key: string, callback?: (err: Error, res: number) => void): Pipeline;
    mget(...keys: string[]): Pipeline;
    rpush(key: string, ...values: any[]): Pipeline;
    lpush(key: string, ...values: any[]): Pipeline;
    rpushx(key: string, value: any, callback?: (err: Error, res: number) => void): Pipeline;
    lpushx(key: string, value: any, callback?: (err: Error, res: number) => void): Pipeline;
    linsert(key: string, direction: 'BEFORE' | 'AFTER', pivot: string, value: any, callback?: (err: Error, res: number) => void): Pipeline;
    rpop(key: string, callback?: (err: Error, res: string) => void): Pipeline;
    lpop(key: string, callback?: (err: Error, res: string) => void): Pipeline;
    brpop(...keys: string[]): Pipeline;
    blpop(...keys: string[]): Pipeline;
    brpoplpush(source: string, destination: string, timeout: number, callback?: (err: Error, res: any) => void): Pipeline;
    llen(key: string, callback?: (err: Error, res: number) => void): Pipeline;
    lindex(key: string, index: number, callback?: (err: Error, res: string) => void): Pipeline;
    lset(key: string, index: number, value: any, callback?: (err: Error, res: any) => void): Pipeline;
    lrange(key: string, start: number, stop: number, callback?: (err: Error, res: any) => void): Pipeline;
    ltrim(key: string, start: number, stop: number, callback?: (err: Error, res: any) => void): Pipeline;
    lrem(key: string, count: number, value: any, callback?: (err: Error, res: number) => void): Pipeline;
    rpoplpush(source: string, destination: string, callback?: (err: Error, res: string) => void): Pipeline;
    sadd(key: string, ...members: any[]): Pipeline;
    srem(key: string, ...members: any[]): Pipeline;
    smove(source: string, destination: string, member: string, callback?: (err: Error, res: string) => void): Pipeline;
    sismember(key: string, member: string, callback?: (err: Error, res: 1 | 0) => void): Pipeline;
    scard(key: string, callback?: (err: Error, res: number) => void): Pipeline;
    spop(key: string, callback?: (err: Error, res: any) => void): Pipeline;
    spop(key: string, count: number, callback?: (err: Error, res: any) => void): Pipeline;
    srandmember(key: string, callback?: (err: Error, res: any) => void): Pipeline;
    srandmember(key: string, count: number, callback?: (err: Error, res: any) => void): Pipeline;
    sinter(...keys: string[]): Pipeline;
    sinterstore(destination: string, ...keys: string[]): Pipeline;
    sunion(...keys: string[]): Pipeline;
    sunionstore(destination: string, ...keys: string[]): Pipeline;
    sdiff(...keys: string[]): Pipeline;
    sdiffstore(destination: string, ...keys: string[]): Pipeline;
    smembers(key: string, callback?: (err: Error, res: any) => void): Pipeline;
    zadd(key: string, ...args: string[]): Pipeline;
    zincrby(key: string, increment: number, member: string, callback?: (err: Error, res: any) => void): Pipeline;
    zrem(key: string, ...members: any[]): Pipeline;
    zremrangebyscore(key: string, min: number | string, max: number | string, callback?: (err: Error, res: any) => void): Pipeline;
    zremrangebyrank(key: string, start: number, stop: number, callback?: (err: Error, res: any) => void): Pipeline;
    zunionstore(destination: string, numkeys: number, key: string, ...args: string[]): Pipeline;
    zinterstore(destination: string, numkeys: number, key: string, ...args: string[]): Pipeline;
    zrange(key: string, start: number, stop: number, callback?: (err: Error, res: any) => void): Pipeline;
    zrange(key: string, start: number, stop: number, withScores: 'WITHSCORES', callback?: (err: Error, res: any) => void): Pipeline;
    zrevrange(key: string, start: number, stop: number, callback?: (err: Error, res: any) => void): Pipeline;
    zrevrange(key: string, start: number, stop: number, withScores: 'WITHSCORES', callback?: (err: Error, res: any) => void): Pipeline;
    zrangebyscore(key: string, min: number | string, max: number | string, ...args: string[]): Pipeline;
    zrevrangebyscore(key: string, max: number | string, min: number | string, ...args: string[]): Pipeline;
    zcount(key: string, min: number | string, max: number | string, callback?: (err: Error, res: number) => void): Pipeline;
    zcard(key: string, callback?: (err: Error, res: number) => void): Pipeline;
    zscore(key: string, member: string, callback?: (err: Error, res: number) => void): Pipeline;
    zrank(key: string, member: string, callback?: (err: Error, res: number) => void): Pipeline;
    zrevrank(key: string, member: string, callback?: (err: Error, res: number) => void): Pipeline;
    hset(key: string, field: string, value: any, callback?: (err: Error, res: 0 | 1) => void): Pipeline;
    hsetBuffer(key: string, field: string, value: any, callback?: (err: Error, res: Buffer) => void): Pipeline;
    hsetnx(key: string, field: string, value: any, callback?: (err: Error, res: 0 | 1) => void): Pipeline;
    hget(key: string, field: string, callback?: (err: Error, res: string) => void): Pipeline;
    hgetBuffer(key: string, field: string, callback?: (err: Error, res: Buffer) => void): Pipeline;
    hmset(key: string, field: string, value: any, ...args: string[]): Pipeline;
    hmset(key: string, data: any, callback?: (err: Error, res: 0 | 1) => void): Pipeline;
    hmget(key: string, ...fields: string[]): Pipeline;
    hincrby(key: string, field: string, increment: number, callback?: (err: Error, res: number) => void): Pipeline;
    hincrbyfloat(key: string, field: string, increment: number, callback?: (err: Error, res: number) => void): Pipeline;
    hdel(key: string, ...fields: string[]): Pipeline;
    hlen(key: string, callback?: (err: Error, res: number) => void): Pipeline;
    hkeys(key: string, callback?: (err: Error, res: any) => void): Pipeline;
    hvals(key: string, callback?: (err: Error, res: any) => void): Pipeline;
    hgetall(key: string, callback?: (err: Error, res: any) => void): Pipeline;
    hexists(key: string, field: string, callback?: (err: Error, res: 0 | 1) => void): Pipeline;
    incrby(key: string, increment: number, callback?: (err: Error, res: number) => void): Pipeline;
    incrbyfloat(key: string, increment: number, callback?: (err: Error, res: number) => void): Pipeline;
    decrby(key: string, decrement: number, callback?: (err: Error, res: number) => void): Pipeline;
    getset(key: string, value: any, callback?: (err: Error, res: string) => void): Pipeline;
    mset(key: string, value: any, ...args: string[]): Pipeline;
    msetnx(key: string, value: any, ...args: string[]): Pipeline;
    randomkey(callback?: (err: Error, res: string) => void): Pipeline;
    select(index: number, callback?: (err: Error, res: string) => void): Pipeline;
    move(key: string, db: string, callback?: (err: Error, res: 0 | 1) => void): Pipeline;
    rename(key: string, newkey: string, callback?: (err: Error, res: string) => void): Pipeline;
    renamenx(key: string, newkey: string, callback?: (err: Error, res: 0 | 1) => void): Pipeline;
    expire(key: string, seconds: number, callback?: (err: Error, res: 0 | 1) => void): Pipeline;
    pexpire(key: string, milliseconds: number, callback?: (err: Error, res: 0 | 1) => void): Pipeline;
    expireat(key: string, timestamp: number, callback?: (err: Error, res: 0 | 1) => void): Pipeline;
    pexpireat(key: string, millisecondsTimestamp: number, callback?: (err: Error, res: 0 | 1) => void): Pipeline;
    keys(pattern: string, callback?: (err: Error, res: string[]) => void): Pipeline;
    dbsize(callback?: (err: Error, res: number) => void): Pipeline;
    auth(password: string, callback?: (err: Error, res: string) => void): Pipeline;
    ping(callback?: (err: Error, res: string) => void): Pipeline;
    ping(message: string, callback?: (err: Error, res: string) => void): Pipeline;
    echo(message: string, callback?: (err: Error, res: string) => void): Pipeline;
    save(callback?: (err: Error, res: string) => void): Pipeline;
    bgsave(callback?: (err: Error, res: string) => void): Pipeline;
    bgrewriteaof(callback?: (err: Error, res: string) => void): Pipeline;
    shutdown(save: 'SAVE' | 'NOSAVE', callback?: (err: Error, res: any) => void): Pipeline;
    lastsave(callback?: (err: Error, res: number) => void): Pipeline;
    type(key: string, callback?: (err: Error, res: string) => void): Pipeline;
    multi(callback?: (err: Error, res: string) => void): Pipeline;
    exec(callback?: (err: Error, res: any) => void): Promise<any[]>;
    discard(callback?: (err: Error, res: any) => void): Pipeline;
    sync(callback?: (err: Error, res: any) => void): Pipeline;
    flushdb(callback?: (err: Error, res: string) => void): Pipeline;
    flushall(callback?: (err: Error, res: string) => void): Pipeline;
    sort(key: string, ...args: string[]): Pipeline;
    info(callback?: (err: Error, res: any) => void): Pipeline;
    info(section: string, callback?: (err: Error, res: any) => void): Pipeline;
    time(callback?: (err: Error, res: any) => void): Pipeline;
    monitor(callback?: (err: Error, res: NodeJS.EventEmitter) => void): Pipeline;
    ttl(key: string, callback?: (err: Error, res: number) => void): Pipeline;
    persist(key: string, callback?: (err: Error, res: 0 | 1) => void): Pipeline;
    slaveof(host: string, port: number, callback?: (err: Error, res: string) => void): Pipeline;
    debug(...args: any[]): Pipeline;
    config(...args: any[]): Pipeline;
    subscribe(...channels: any[]): Pipeline;
    unsubscribe(...channels: string[]): Pipeline;
    psubscribe(...patterns: string[]): Pipeline;
    punsubscribe(...patterns: string[]): Pipeline;
    publish(channel: string, message: string, callback?: (err: Error, res: number) => void): Pipeline;
    watch(...keys: string[]): Pipeline;
    unwatch(callback?: (err: Error, res: string) => void): Pipeline;
    cluster(...args: any[]): Pipeline;
    restore(...args: any[]): Pipeline;
    migrate(...args: any[]): Pipeline;
    dump(key: string, callback?: (err: Error, res: string) => void): Pipeline;
    object(subcommand: string, ...args: any[]): Pipeline;
    client(...args: any[]): Pipeline;
    eval(...args: any[]): Pipeline;
    evalsha(...args: any[]): Pipeline;
    script(...args: any[]): Pipeline;
    quit(callback?: (err: Error, res: string) => void): Pipeline;
    scan(cursor: number, ...args: any[]): Pipeline;
    sscan(key: string, cursor: number, ...args: any[]): Pipeline;
    hscan(key: string, cursor: number, ...args: any[]): Pipeline;
    zscan(key: string, cursor: number, ...args: any[]): Pipeline;
    pfmerge(destkey: string, ...sourcekeys: string[]): Pipeline;
    pfadd(key: string, ...elements: string[]): Pipeline;
    pfcount(...keys: string[]): Pipeline;
}
export default class RedisManger {
    private redis;
    /**
     * 增加一個key跟對應的值, 沒有過期時間
     * @param {string} key
     * @param {(number | string)} value
     * @returns
     * @memberof RedisManger
     */
    set(key: string, value: number | string): Promise<string>;
    /**
     * 按造順序執行你串接的命令
     * 各別命令的文檔接口請參考
     * @class RedisManger 這個類別或是網路文件
     * @returns {IORedis.Pipeline}
     * @memberof RedisManger
     */
    pipeline(): Pipeline;
    /**
     * 讓一個key有過期時間 單位是秒
     * @param {string} key
     * @param {number} ex
     * @returns
     * @memberof RedisManger
     */
    expire(key: string, ex: number): Promise<import("v8").DoesZapCodeSpaceFlag>;
    /**
     * 取得一個key裡面的資料
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    get(key: string): Promise<string>;
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
    type(key: string): Promise<'none' | 'string' | 'list' | 'set' | 'zset' | 'hash'>;
    /**
     * 将 key 中储存的数字值增一。
     * 如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行
     * 如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    incr(key: string): Promise<number>;
    /**
     * 刪除這個key包含裡面的數值
     * @param {...string[]} keys
     * @returns
     * @memberof RedisManger
     */
    del(...keys: string[]): Promise<any>;
    /**
     * 查詢這個key有沒有存在
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    exists(key: string): Promise<any>;
    /**
     * 讓這個key持久化,不讓它過期
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    persist(key: string): Promise<import("v8").DoesZapCodeSpaceFlag>;
    /**
     * 以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)。
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    ttl(key: string): Promise<number>;
    /**
     * 将给定 key 的值设为 value ，并返回 key 的旧值(old value)。
     * @param {string} key
     * @param {(string | number)} value
     * @returns
     * @memberof RedisManger
     */
    getset(key: string, value: string | number): Promise<string>;
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
    setnx(key: string, value: string | number): Promise<0 | 1>;
    /**
     * 返回 key 所储存的字符串值的长度。
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    strlen(key: string): Promise<number>;
    /**
     * 将 key 所储存的值加上给定的浮点增量值（increment)
     * 如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行
     * 如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误
     * @param {string} key
     * @param {number} increment
     * @returns
     * @memberof RedisManger
     */
    incrbyfloat(key: string, increment: number): Promise<number>;
    /**
     * 将 key 中储存的数字值减一。
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    decr(key: string): Promise<number>;
    /**
     * key 所储存的值减去给定的减量值（decrement)
     * @param {string} key
     * @param {number} value
     * @returns
     * @memberof RedisManger
     */
    decrby(key: string, value: number): Promise<number>;
    /**
     * 如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾。
     * @param {string} key
     * @param {string} value
     * @returns
     * @memberof RedisManger
     */
    append(key: string, value: string): Promise<number>;
    /**
     * 删除這個key裡面一个或多个HashMap字段
     *
     * @param {string} key
     * @param {string[]} value
     * @returns
     * @memberof RedisManger
     */
    hdelArray(key: string, value: string[]): Promise<any>;
    /**
     * 删除這個key裡面一个或多个HashMap字段
     *
     * @param {string} key
     * @param {...string[]} value
     * @returns
     * @memberof RedisManger
     */
    hdel(key: string, ...value: string[]): Promise<any>;
    /**
     * 查看HashMap key 中，指定的字段是否存在。
     * @param {string} key
     * @param {string} value
     * @returns
     * @memberof RedisManger
     */
    hexists(key: string, field: string): Promise<import("v8").DoesZapCodeSpaceFlag>;
    /**
     * 获取key中 存储在HashMap中指定字段的值
     * @param {string} key
     * @param {string} field
     * @returns
     * @memberof RedisManger
     */
    hget(key: string, field: string): Promise<string>;
    /**
     * 获取在HashMap中指定 key 的所有字段和值
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    hgetall(key: string): Promise<any>;
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
    hincrby(key: string, field: string, value: number): Promise<number>;
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
    hincrbyfloat(key: string, field: string, value: number): Promise<number>;
    /**
     * 取得這個HashMap key中所有的fields
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    hkeys(key: string): Promise<any>;
    /**
     * 获取HashMap中fields的数量
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    hlen(key: string): Promise<number>;
    /**
     * 获取所有指定Fields的值
     * @param {string} key
     * @param {...string[]} field
     * @returns
     * @memberof RedisManger
     */
    hmget(key: string, ...field: string[]): Promise<any>;
    /**
     * 获取所有指定Fields的值
     * @param {string} key
     * @param {...string[]} fields
     * @returns
     * @memberof RedisManger
     */
    hmgetArray(key: string, fields: string[]): Promise<any>;
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
    hmset(key: string, field: string, value: any, ...args: string[]): Promise<0 | 1>;
    /**
     * HMSET key field1 value1 [field2 value2 ]
     * 同时将多个 field-value (field1-value1)set到hashMap key 中
     * @param {string} key
     * @param {any[]} fields
     * @returns {(Promise<0 | 1>)}
     * @memberof RedisManger
     */
    hmsetArray(key: string, fields: any[]): Promise<0 | 1>;
    /**
     * HMSET key field1 value1 [field2 value2 ]
     * 同时将多个 field-value (field1-value1)set到hashMap key 中
     * @param {string} key
     * @param {any} obj
     * @returns {(Promise<0 | 1>)}
     * @memberof RedisManger
     */
    hmsetObject(key: string, obj: any): Promise<0 | 1>;
    /**
     * HSET key field value
     * 将hashMap key 中的字段 field 的值设为 value 。
     * @param {string} key
     * @param {string} field
     * @param {*} value
     * @returns
     * @memberof RedisManger
     */
    hset(key: string, field: string, value: any): Promise<import("v8").DoesZapCodeSpaceFlag>;
    /**
     * HSETNX key field value
     * 只有在 field 不存在时，设置hashMap field 的 value。
     * @param {string} key
     * @param {string} field
     * @param {*} value
     * @returns
     * @memberof RedisManger
     */
    hsetnx(key: string, field: string, value: any): Promise<import("v8").DoesZapCodeSpaceFlag>;
    /**
     * HVALS key
     * 获取hashMap中所有的值
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    hvals(key: string): Promise<any>;
    /**
     * BLPOP key1 [key2 ]
     * 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
     * @param {...string[]} key
     * @returns
     * @memberof RedisManger
     */
    blpop(...key: string[]): Promise<any>;
    /**
     * BLPOP key1 [key2 ]
     * 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
     * @param {string[]} key
     * @returns
     * @memberof RedisManger
     */
    blpopArray(key: string[]): Promise<any>;
    /**
     * BRPOP key1 [key2 ]
     * 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     * @param {...string[]} key
     * @returns
     * @memberof RedisManger
     */
    brpop(...key: string[]): Promise<any>;
    /**
     * RPOP key
     * 移出并获取列表的最后一个元素， 如果列表没有元素不會阻塞
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    rpop(key: string): Promise<string>;
    /**
     * BRPOP key1 [key2 ]
     * 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     * @param {string[]} key
     * @returns
     * @memberof RedisManger
     */
    brpopArray(key: string[]): Promise<any>;
    /**
     * BRPOPLPUSH source destination timeout
     * 从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     * @param {string} source
     * @param {string} destination
     * @param {number} timeout
     * @returns
     * @memberof RedisManger
     */
    brpoplpush(source: string, destination: string, timeout: number): Promise<any>;
    /**
     * LINDEX key index
     * 通过index获取list中的元素
     * @param {string} key
     * @param {number} index
     * @returns
     * @memberof RedisManger
     */
    lindex(key: string, index: number): Promise<string>;
    /**
     * LLEN key
     * 获取列表长度
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    llen(key: string): Promise<number>;
    /**
     * LPOP key
     * 移出并获取列表的第一个元素, 如果列表没有元素不會阻塞
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    lpop(key: string): Promise<string>;
    /**
     * LPUSH key value1, value2, value3...
     * 将一个或多个值插入到列表頭部
     * @param {string} key
     * @param {...any[]} values
     * @returns
     * @memberof RedisManger
     */
    lpush(key: string, ...values: any[]): Promise<any>;
    /**
     * LPUSH key [value1, value2]
     * 将一个或多个值插入到列表頭部
     * @param {string} key
     * @param {any[]} values
     * @returns
     * @memberof RedisManger
     */
    lpushArray(key: string, values: any[]): Promise<any>;
    /**
     * RPUSH key value1, value2, value3...
     * 将一个或多个值插入到列表尾端
     * @param {string} key
     * @param {...any[]} values
     * @returns
     * @memberof RedisManger
     */
    rpush(key: string, ...values: any[]): Promise<any>;
    /**
     * RPUSH key [value1, value2]
     * 将一个或多个值插入到列表尾端
     * @param {string} key
     * @param {any[]} values
     * @returns
     * @memberof RedisManger
     */
    rpushArray(key: string, values: any[]): Promise<any>;
    /**
     * LRANGE key start stop
     * 获取列表start index 到stop index之間范围内的元素
     * @param {string} key
     * @param {number} start
     * @param {number} stop
     * @returns
     * @memberof RedisManger
     */
    lrange(key: string, start: number, stop: number): Promise<any>;
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
    lrem(key: string, count: number, value: any): Promise<number>;
    /**
     * 對一個list(純數字)做ASC排序
     * 不會對當前的key裡面的list做排序儲存
     * 就是說此操作只有給你的結果是sort,實際上key裡面並沒有真正被sort
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    listSortNumberASC(key: string): Promise<any>;
    /**
     * 對一個list(純數字)做DESC排序
     * 不會對當前的key裡面的list做排序儲存
     * 就是說此操作只有給你的結果是sort,實際上key裡面並沒有真正被sort
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    listSortNumberDESC(key: string): Promise<any>;
    /**
     * 對一個list(純string)做ASC排序
     * 不會對當前的key裡面的list做排序儲存
     * 就是說此操作只有給你的結果是sort,實際上key裡面並沒有真正被sort
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    listSortStringASC(key: string): Promise<any>;
    /**
     * sort 可以做很複雜的操作 , 如果不夠瞭解盡量不要獨立使用
     * @param {string} key
     * @param {...string[]} args
     * @returns
     * @memberof RedisManger
     */
    sort(key: string, ...args: string[]): Promise<any>;
    /**
     * LSET key index value
     * 通过index设置list[index]的value
     * @param {string} key
     * @param {number} index
     * @param {*} value
     * @returns
     * @memberof RedisManger
     */
    lset(key: string, index: number, value: any): Promise<any>;
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
    ltrim(key: string, start: number, stop: number): Promise<any>;
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
    rpoplpush(source: string, destination: string): Promise<string>;
    /**
     * RPUSHX key value
     * 为已存在的列表 加到表尾
     * 当 key 不存在时，什么也不做
     * @param {string} key
     * @param {*} value
     * @returns
     * @memberof RedisManger
     */
    rpushx(key: string, value: any): Promise<number>;
    /**
     * LPUSHX key value
     * 为已存在的列表 加到表頭
     * 当 key 不存在时，什么也不做
     * @param {string} key
     * @param {*} value
     * @returns
     * @memberof RedisManger
     */
    lpushx(key: string, value: any): Promise<number>;
    /**
     * 将 key 所储存的值加上给定的增量值（increment)
     * 如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行
     * 如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误
     * @param {string} key
     * @param {number} increment
     * @returns
     * @memberof RedisManger
     */
    incrby(key: string, increment: number): Promise<number>;
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
    msetnx(key: string, value: any, ...args: string[]): Promise<0 | 1>;
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
    sadd(key: string, ...members: any[]): Promise<any>;
    /**
     * SCARD key
     * 返回集合 key 的基数(集合中元素的数量)
     * @param {string} key
     * @returns
     * @memberof RedisManger
     */
    scard(key: string): Promise<number>;
    /**
     * SDIFF key [key ...]
     * 比較兩個Set集合中的差異,返回差異
     * 返回一个集合的全部成员，该集合是所有给定集合之间的差集。
     * 不存在的 key 被视为空集。
     * @param {...string[]} keys
     * @returns
     * @memberof RedisManger
     */
    sdiff(...keys: string[]): Promise<any>;
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
    sdiffstore(destination: string, ...keys: string[]): Promise<any>;
    /**
     * SINTER key [key ...]
     * 返回一个集合的全部成员，该集合是所有给定集合的交集
     * 不存在的 key 被视为空集
     * 当给定集合当中有一个空集时，结果也为空集(根据集合运算定律)
     * @param {...string[]} keys
     * @returns 交集成员的列表
     * @memberof RedisManger
     */
    sinter(...keys: string[]): Promise<any>;
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
    sinterstore(destination: string, ...keys: string[]): Promise<number>;
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
    sismember(key: string, member: string): Promise<0 | 1>;
    /**
     * SMEMBERS key
     * 返回集合 key 中的所有成员
     * 不存在的 key 被视为空集合
     * @param {string} key
     * @returns 集合中的所有成员
     * @memberof RedisManger
     */
    smembers(key: string): Promise<any>;
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
    smove(source: string, destination: string, member: string): Promise<string>;
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
    spop(key: string, count?: number): Promise<any>;
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
    srandmember(key: string, count?: number): Promise<any>;
    /**
     * SREM key member [member ...]
     * 移除集合 key 中的一个或多个 member 元素，不存在的 member 元素会被忽略
     * 当 key 不是集合类型(Set)，返回一个错误
     * @param {string} key
     * @param {...any[]} members
     * @returns 被成功移除的元素的数量，不包括被忽略的元素
     * @memberof RedisManger
     */
    srem(key: string, ...members: any[]): Promise<any>;
    /**
     * SUNION key [key ...]
     * 返回一个集合的全部成员，该集合是所有给定集合的并集
     * 不存在的 key 被视为空集
     * @param {...string[]} keys
     * @returns 并集成员的列表
     * @memberof RedisManger
     */
    sunion(...keys: string[]): Promise<any>;
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
    sunionstore(destination: string, ...keys: string[]): Promise<number>;
    /**
     * PSUBSCRIBE pattern [pattern ...]
     * 订阅一个或多个符合给定模式的频道
     * 每个模式以 * 作为匹配符，比如 it* 匹配所有以 it 开头的频道( it.news 、 it.blog 、 it.tweets 等等)
     * news.* 匹配所有以 news. 开头的频道( news.it 、 news.global.today 等等)，诸如此类
     * @param {...string[]} patterns
     * @returns 接收到的信息
     * @memberof RedisManger
     */
    psubscribe(...patterns: string[]): Promise<any>;
    /**
     * PUBLISH channel message
     * 将信息 message 发送到指定的频道 channel
     * @param {string} channel
     * @param {string} message
     * @returns 接收到信息 message 的订阅者数量
     * @memberof RedisManger
     */
    publish(channel: string, message: string): Promise<number>;
    /**
     * PUNSUBSCRIBE [pattern [pattern ...]]
     * 指示客户端退订所有给定模式
     * 如果没有模式被指定，也即是，一个无参数的 PUNSUBSCRIBE 调用被执行 那么客户端使用 PSUBSCRIBE 命令订阅的所有模式都会被退订。
     * 在这种情况下，命令会返回一个信息，告知客户端所有被退订的模式
     * @param {...string[]} patterns
     * @returns 这个命令在不同的客户端中有不同的表现
     * @memberof RedisManger
     */
    punsubscribe(...patterns: string[]): Promise<any>;
    /**
     * SUBSCRIBE channel [channel ...]
     * 订阅给定的一个或多个频道的信息
     * @param {...any[]} channels
     * @returns 接收到的信息 參考 http://redisdoc.com/pub_sub/subscribe.html
     * @memberof RedisManger
     */
    subscribe(...channels: any[]): Promise<any>;
    /**
     * UNSUBSCRIBE [channel [channel ...]]
     * 指示客户端退订给定的频道
     * 如果没有频道被指定，也即是，一个无参数的 UNSUBSCRIBE 调用被执行，那么客户端使用 SUBSCRIBE 命令订阅的所有频道都会被退订。
     * 在这种情况下，命令会返回一个信息，告知客户端所有被退订的频道
     * @param {...any[]} channels
     * @returns 这个命令在不同的客户端中有不同的表现
     * @memberof RedisManger
     */
    unsubscribe(...channels: any[]): Promise<any>;
    /**
     * WATCH key [key ...]
     * 监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断
     * @param {...string[]} keys
     * @returns 总是返回 OK
     * @memberof RedisManger
     */
    watch(...keys: string[]): Promise<any>;
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
    unwatch(): Promise<string>;
    /**
     * EXEC
     * 执行所有事务块内的命令
     * 假如某个(或某些) key 正处于 WATCH 命令的监视之下，且事务块中有和这个(或这些) key 相关的命令
     * 那么 EXEC 命令只在这个(或这些) key 没有被其他命令所改动的情况下执行并生效，否则该事务被打断(abort)
     * @returns 事务块内所有命令的返回值，按命令执行的先后顺序排列
     * 当操作被打断时，返回空值 nil
     * @memberof RedisManger
     */
    exec(): Promise<any>;
    /**
     * EXEC
     * 执行所有事务块内的命令
     * 假如某个(或某些) key 正处于 WATCH 命令的监视之下，且事务块中有和这个(或这些) key 相关的命令
     * 那么 EXEC 命令只在这个(或这些) key 没有被其他命令所改动的情况下执行并生效，否则该事务被打断(abort)
     * @param {(err: Error, res: any) => void} callback
     * @returns
     * @memberof RedisManger
     */
    execPipeline(callback: (err: Error, res: any) => void): Promise<void>;
    /**
     * DISCARD
     * 取消事务，放弃执行事务块内的所有命令
     * 如果正在使用 WATCH 命令监视某个(或某些) key，那么取消所有监视，等同于执行命令 UNWATCH
     * @returns
     * @memberof RedisManger
     */
    discard(): Promise<any>;
    /**
     * (cluster模式下無法使用這個))
     * MULTI
     * 标记一个事务块的开始
     * 事务块内的多条命令会按照先后顺序被放进一个队列当中，最后由 EXEC 命令原子性(atomic)地执行
     * @param {{ pipeline: false }} options
     * @returns
     * @memberof RedisManger
     */
    multi(options: {
        pipeline: false;
    }): Promise<string>;
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
    multiPipeline(commands?: string[][], options?: IORedis.MultiOptions): Promise<IORedis.Pipeline>;
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
    zadd(key: string, ...args: string[]): Promise<any>;
    /**
     * ZCARD key
     * 返回有序集 key 的基数
     *
     * @param {string} key
     * @returns 当 key 存在且是有序集类型时，返回有序集的基数, 当 key 不存在时，返回 0
     * @memberof RedisManger
     */
    zcard(key: string): Promise<number>;
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
    zcount(key: string, min: number | string, max: number | string): Promise<number>;
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
    zincrby(key: string, increment: number, member: string): Promise<any>;
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
    zrange(key: string, start: number, stop: number): Promise<any>;
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
    zrangeWithScores(key: string, start: number, stop: number): Promise<any>;
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
    zrangebyscore(key: string, min: number | string, max: number | string, ...args: string[]): Promise<any>;
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
    zrank(key: string, member: string): Promise<number>;
    /**
     * ZREM key member [member ...]
     * 移除有序集 key 中的一个或多个成员，不存在的成员将被忽略
     * 当 key 存在但不是有序集类型时，返回一个错误
     * @param {string} key
     * @param {...any[]} members
     * @returns
     * @memberof RedisManger
     */
    zrem(key: string, ...members: any[]): Promise<any>;
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
    zremrangebyrank(key: string, start: number, stop: number): Promise<number>;
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
    zremrangebyscore(key: string, min: number | string, max: number | string): Promise<number>;
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
    zrevrange(key: string, start: number, stop: number): Promise<any>;
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
    zrevrangeWithScores(key: string, start: number, stop: number): Promise<any>;
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
    zrevrangebyscore(key: string, max: number | string, min: number | string, ...args: string[]): Promise<any>;
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
    zrevrank(key: string, member: string): Promise<number>;
    /**
     * ZSCORE key member
     * 返回有序集 key 中，成员 member 的 score 值
     * 如果 member 元素不是有序集 key 的成员，或 key 不存在，返回 nil
     * @param {string} key
     * @param {string} member
     * @returns member 成员的 score 值，以字符串形式表示
     * @memberof RedisManger
     */
    zscore(key: string, member: string): Promise<string>;
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
    zunionstore(destination: string, numkeys: number, key: string, ...args: string[]): Promise<any>;
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
    zinterstore(destination: string, numkeys: number, key: string, ...args: string[]): Promise<any>;
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
    mset(key: string, value: any, ...args: string[]): Promise<any>;
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
    setex(key: string, seconds: number, value: any): Promise<any>;
    /**
     * MGET key [key ...]
     * 返回所有(一个或多个)给定 key 的值
     * 如果给定的 key 里面，有某个 key 不存在，那么这个 key 返回特殊值 nil 。因此，该命令永不失败
     * @param {...string[]} keys
     * @returns 一个包含所有给定 key 的值的列表
     * @memberof RedisManger
     */
    mget(...keys: string[]): Promise<any>;
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
    linsert(key: string, direction: 'BEFORE' | 'AFTER', pivot: string, value: any): Promise<number>;
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
    geoadd(key: string, geoEntity: GEOEntity[]): Promise<any>;
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
    geopos(key: string, member: string, ...members: string[]): Promise<any>;
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
    geodist(key: string, member1: string, member2: string, unit?: 'm' | 'km' | 'mi' | 'ft'): Promise<any>;
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
    georadius(key: string, longitude: number, latitude: number, radius: number, unit?: 'm' | 'km' | 'mi' | 'ft', ...args: any[]): Promise<any>;
    /**
     * GEOHASH key member [member ...]
     * 返回一个或多个位置元素的 Geohash 表示。
     * @param {string} key
     * @param {string} member
     * @param {...string[]} members
     * @returns 一个数组， 数组的每个项都是一个 geohash 。 命令返回的 geohash 的位置与用户给定的位置元素的位置一一对应。
     * @memberof RedisManger
     */
    geohash(key: string, member: string, ...members: string[]): Promise<any>;
}
export {};
