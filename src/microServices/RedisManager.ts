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
    public async set(k: string, v: any, ex?: number) {
        if (_.isUndefined(ex)) {
            return this.redis.set(k, v);
        } else {
            await this.redis.set(k, v);
            return this.redis.expire(k, ex);
        }
    }
    public async get(k: string) {
        return this.redis.get(k);
    }
    public async incr(k: string) {
        return this.redis.incr(k);
    }
    public async getMatchKeys(match?: string, perElements = 300): Promise<string[]> {
        let keys = [];
        const matchObj = {
            // only returns keys following the pattern of `user:*`
            match: match + '*',
            // returns approximately 100 elements per call
            count: perElements
        };
        return new Promise((resolve, reject) => {
            RedisContext.getInstance().getallMasters().forEach((node: any) => {
                const stream = node.scanStream(matchObj);
                stream.on('data', (resultKeys) => {
                    keys = _.concat(keys, resultKeys);
                });
                stream.on('end', () => {
                    resolve(keys);
                });
            });
        }) as Promise<string[]>;
    }
}
