import * as IORedis from 'ioredis';
import * as log4js from 'koa-log4';
import * as _ from 'lodash';

const log = log4js.getLogger('RedisContext');
export default class RedisContext {

    private static instance = new RedisContext();
    private redis: IORedis.Redis;

    public static async initialize(jsonConfig: any) {
        RedisContext.instance.redis = new IORedis(jsonConfig);
        const changePromis: any = RedisContext.instance.redis;
        changePromis.Promise = global.Promise;
      }
    private constructor() {}

    public static getInstance(): RedisContext {
      return RedisContext.instance;
    }

    public getRedis(): IORedis.Redis {
        return RedisContext.instance.redis;
      }
}
