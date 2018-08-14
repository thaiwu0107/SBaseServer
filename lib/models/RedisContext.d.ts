import * as IORedis from 'ioredis';
export default class RedisContext {
    private static instance;
    private redis;
    private allMasters;
    private allSlaves;
    private allAll;
    static initialize(jsonConfig: IORedis.ClusterNode[]): Promise<void>;
    private constructor();
    static getInstance(): RedisContext;
    getRedis(): IORedis.Cluster;
    getAllNode(): IORedis.Redis[];
    getallMasters(): IORedis.Redis[];
    getallSlaves(): IORedis.Redis[];
}
