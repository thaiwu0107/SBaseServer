import * as log4js from 'koa-log4';
import * as _ from 'lodash';
// tslint:disable-next-line:no-submodule-imports
import * as mysql2 from 'mysql2/promise';
import { promisify } from 'util';
import { LibsExceptions } from './LibsExceptions';

const log = log4js.getLogger('SQLManager');
export default class MysqlContext {

    private static instance = new MysqlContext();
    private mysqlPoolList = {};

    public static async initialize(jsonConfig: any[]) {
        jsonConfig.map((dbconfig) => {
            const sql = mysql2.createPool({
                host: dbconfig.host,
                user: dbconfig.user,
                password: dbconfig.password,
                database: dbconfig.database,
                connectionLimit: dbconfig.connectionLimit
            });
            Promise.resolve(sql).then((res: any) => {
                log.info(`DB Name ${dbconfig.name} => ${dbconfig.host}: ${dbconfig.database} is ready.`);
                MysqlContext.instance.mysqlPoolList[dbconfig.name] = res;
            });
            return {};
        });
      }
    private constructor() {}

    public static getInstance(): MysqlContext {
      return MysqlContext.instance;
    }

    public async getBean(dbname: string) {
        const pool = MysqlContext.instance.mysqlPoolList[dbname];
        if (!_.isUndefined(pool)) {
            return pool.getConnection();
        } else {
            log.error(` MysqlContext.instance.mysqlPoolList[${dbname}] isUndefined`);
            throw new LibsExceptions(9001, ` MysqlContext.instance.mysqlPoolList[${dbname}] isUndefined`);
        }
    }
}
