import 'reflect-metadata';

import { injectable } from 'inversify';
import * as log4js from 'koa-log4';
import * as _ from 'lodash';
import { BaseHttpStatusCode } from '../config/BaseHttpStatusCode';
import APIManager from '../microServices/APIManager';
import GRPCManger from '../microServices/GRPCManager';
import MySqlManger from '../microServices/MySqlManager';
import RedisManger from '../microServices/RedisManager';
import SocketPushManager from '../microServices/SocketPushManager';
import BaseUtils from '../utils/BaseUtils';
import { LibsExceptions } from './LibsExceptions';

@injectable()
export default abstract class BaseRepository {
    protected _log = log4js.getLogger(this.constructor.name);
    protected apiManager: APIManager = new APIManager();
    protected sqlManager: MySqlManger = new MySqlManger();
    protected grpcManager: GRPCManger = new GRPCManger();
    protected redisManger: RedisManger = new RedisManger();
    protected socketPushManager: SocketPushManager = new SocketPushManager();
    /**
     * 取得系統時間(from DB)
     *
     * @returns {Promise<Date>}
     *
     * @memberOf BaseRepository
     */
    public async getDBCurrentTime(): Promise<Date> {
        return this.sqlManager.getDBCurrentTime();
    }

    /**
     * 取得系統時間(from DB)
     *
     * @returns {Promise<string>}
     *
     * @memberOf BaseRepository
     */
    public async getDBCurrentTimeString(): Promise<string> {
        return BaseUtils.DBTimeFormat(await this.sqlManager.getDBCurrentTime());
    }

    /**
     * password解密 (use DB)
     *
     * @param {(Buffer | object)} password
     * @returns {Promise<any>}
     *
     * @memberOf BaseRepository
     */
    public async deCode(password: Buffer | object, key?: string): Promise<string> {
        if (_.isBuffer(password)) {
            return this.sqlManager.deCode(password as any, key);
        } else if (_.isObject(password)) {
            const toBeBuffer = new Buffer(password as any, 'binary');
            return this.sqlManager.deCode(toBeBuffer as any, key);
        } else {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL, 'DECODE_PASSWORD_UNDEFIND_TYPE');
        }
    }

    /**
     * password加密 (use DB)
     *
     * @param {string} password
     * @returns {Promise<string>}
     *
     * @memberOf BaseRepository
     */
    public async enCode(password: string, key?: string): Promise<Buffer> {
        return this.sqlManager.enCode(password, key);
    }
}
