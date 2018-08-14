import * as IORedis from 'ioredis';
import * as log4js from 'koa-log4';
import * as _ from 'lodash';

const log = log4js.getLogger('RedisContext');
export default class RedisContext {

    private static instance = new RedisContext();
    private redis: IORedis.Cluster;
    private allMasters: IORedis.Redis[];
    private allSlaves: IORedis.Redis[];
    private allAll: IORedis.Redis[];

    public static async initialize(jsonConfig: IORedis.ClusterNode[]) {
        RedisContext.instance.redis = new IORedis.Cluster(jsonConfig, {
            enableOfflineQueue: false,
            enableReadyCheck: true,
            clusterRetryStrategy: (times) => {
                return Math.min(100 + times * 2, 2000);
            },
            scaleReads: 'all',
            redisOptions: {
                enableOfflineQueue: false,
                dropBufferSupport: true,
                enableReadyCheck: true
            }
        }) as any;
        const changePromis: any = RedisContext.instance.redis;
        changePromis.Promise = global.Promise;
        RedisContext.instance.allAll = RedisContext.instance.redis.nodes('all');
        RedisContext.instance.allSlaves = RedisContext.instance.redis.nodes('slave');
        RedisContext.instance.allMasters = RedisContext.instance.redis.nodes('master');
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
