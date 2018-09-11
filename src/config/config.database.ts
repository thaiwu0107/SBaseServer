
export const db = [{
    name: 'main',
    host: '192.168.10.81',
    user: 'porkerdb',
    password: 'porkerdb123',
    database: 'porkerdb',
    connectionLimit: 50
}];
export const redisCluster = [{
    port: 7000,
    host: '192.168.10.101'
}, {
    port: 7001,
    host: '192.168.10.101'
}, {
    port: 6379,
    host: '192.168.10.103'
}, {
    port: 7002,
    host: '192.168.10.104'
}, {
    port: 6379,
    host: '192.168.10.105'
}, {
    port: 6379,
    host: '192.168.10.106'
}];
export const redis = {
    port: 6379,
    host: '192.168.10.81'
};
