/// <reference types="node" />
import 'reflect-metadata';
import APIManager from '../microServices/APIManager';
import GRPCManger from '../microServices/GRPCManager';
import MySqlManger from '../microServices/MySqlManager';
import RedisManger from '../microServices/RedisManager';
import SocketPushManager from '../microServices/SocketPushManager';
export default abstract class BaseRepository {
    protected _log: any;
    protected apiManager: APIManager;
    protected sqlManager: MySqlManger;
    protected grpcManager: GRPCManger;
    protected redisManger: RedisManger;
    protected socketPushManager: SocketPushManager;
    constructor();
    /**
     * 取得系統時間(from DB)
     *
     * @returns {Promise<Date>}
     *
     * @memberOf BaseRepository
     */
    getDBCurrentTime(): Promise<Date>;
    /**
     * 取得系統時間(from DB)
     *
     * @returns {Promise<string>}
     *
     * @memberOf BaseRepository
     */
    getDBCurrentTimeString(): Promise<string>;
    /**
     * password解密 (use DB)
     *
     * @param {(Buffer | object)} password
     * @returns {Promise<any>}
     *
     * @memberOf BaseRepository
     */
    deCode(password: Buffer | object, key?: string): Promise<string>;
    /**
     * password加密 (use DB)
     *
     * @param {string} password
     * @returns {Promise<string>}
     *
     * @memberOf BaseRepository
     */
    enCode(password: string, key?: string): Promise<Buffer>;
}
