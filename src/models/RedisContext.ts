import * as IORedis from 'ioredis';
import * as log4js from 'koa-log4';
import * as _ from 'lodash';
import BaseUtils from '../utils/BaseUtils';

const log = log4js.getLogger('RedisContext');
export default class RedisContext {

    private static instance = new RedisContext();
    private redis: any;
    private allMasters: IORedis.Redis[];
    private allSlaves: IORedis.Redis[];
    private allAll: IORedis.Redis[];

    public static async initialize(jsonConfig: { port: number, host: string }) {
        RedisContext.instance.redis = new IORedis(
            jsonConfig.port,
            jsonConfig.host, {
                dropBufferSupport: true,
                enableReadyCheck: true,
                stringNumbers: true
            } as any);
        const changePromis: any = RedisContext.instance.redis;
        changePromis.Promise = global.Promise;
        IORedis.Command.setArgumentTransformer('hmset', (args) => {
            if (args.length === 2) {
                if (typeof Map !== 'undefined' && args[1] instanceof Map) {
                    // utils is a internal module of ioredis
                    return [args[0]].concat(BaseUtils.convertMapToArray(args[1]));
                }
                if (typeof args[1] === 'object' && args[1] !== null) {
                    return [args[0]].concat(BaseUtils.convertObjectToArray(args[1]));
                }
            }
            return args;
        });
        IORedis.Command.setReplyTransformer('hgetall', (result) => {
            if (Array.isArray(result)) {
                const obj = {};
                for (let i = 0; i < result.length; i += 2) {
                    obj[result[i]] = result[i + 1];
                }
                return obj;
            }
            return result;
        });
        IORedis.Command.setReplyTransformer('exec', (result) => {
            if (Array.isArray(result)) {
                let length = result.length;
                const finalData: any[] = [];
                while (length--) {
                    const error = result[length][0];
                    if (error) {
                        log.error('redis.exec() error: ' + error);
                        throw error;
                    }
                    finalData.push(result[length][1]);
                }
                return finalData;
            }
            return result;
        });
        log.info(`RedisContext is ready.`);
    }
    public static async initializeCluster(jsonConfig: IORedis.ClusterNode[]) {
        RedisContext.instance.redis = new IORedis.Cluster(jsonConfig, {
            enableReadyCheck: true,
            clusterRetryStrategy: (times) => {
                return Math.min(100 + times * 2, 2000);
            },
            scaleReads: 'all',
            redisOptions: {
                dropBufferSupport: true,
                enableReadyCheck: true,
                stringNumbers: true
            } as any
        }) as any;
        const changePromis: any = RedisContext.instance.redis;
        changePromis.Promise = global.Promise;
        RedisContext.instance.allAll = RedisContext.instance.redis.nodes('all');
        RedisContext.instance.allSlaves = RedisContext.instance.redis.nodes('slave');
        RedisContext.instance.allMasters = RedisContext.instance.redis.nodes('master');
        IORedis.Command.setArgumentTransformer('hmset', (args) => {
            if (args.length === 2) {
                if (typeof Map !== 'undefined' && args[1] instanceof Map) {
                    // utils is a internal module of ioredis
                    return [args[0]].concat(BaseUtils.convertMapToArray(args[1]));
                }
                if (typeof args[1] === 'object' && args[1] !== null) {
                    return [args[0]].concat(BaseUtils.convertObjectToArray(args[1]));
                }
            }
            return args;
        });
        IORedis.Command.setReplyTransformer('hgetall', (result) => {
            if (Array.isArray(result)) {
                const obj = {};
                for (let i = 0; i < result.length; i += 2) {
                    obj[result[i]] = result[i + 1];
                }
                return obj;
            }
            return result;
        });
        log.info(`RedisContext is ready.`);
    }
    private constructor() { }

    public static getInstance(): RedisContext {
        return RedisContext.instance;
    }

    public getRedis(): IORedis.Cluster {
        return RedisContext.instance.redis;
    }

    public getAllNode(): IORedis.Redis[] {
        return RedisContext.instance.allAll;
    }

    public getallMasters(): IORedis.Redis[] {
        return RedisContext.instance.allMasters;
    }

    public getallSlaves(): IORedis.Redis[] {
        return RedisContext.instance.allSlaves;
    }
}
