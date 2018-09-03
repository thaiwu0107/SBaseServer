import * as log4js from 'koa-log4';
import * as _ from 'lodash';
import * as moment from 'moment';
import 'reflect-metadata';
import { BaseConstant } from '../config/BaseConstant';
import MysqlContext from '../models/MySqlContext';
import Transaction from '../models/Transaction';

const _log = log4js.getLogger('MySqlManger');
export default class MySqlManger {
    protected _context = MysqlContext.getInstance();

    public async getDBCurrentTime(): Promise<Date> {
        const sql = await this._context.getBean('main');
        const dbTime = await sql.query('select now() as time limit 1');
        sql.release();
        return moment(dbTime[0][0].time).toDate();
    }

    public async getDBCurrentTimeString(): Promise<string> {
        const sql = await this._context.getBean('main');
        const dbTime = await sql.query('select now() as time limit 1');
        sql.release();
        return dbTime[0][0].time;
    }

    public async query(sqlScript: string, parameters?: any[], trans?: Transaction): Promise<any[]> {
        if (_.isUndefined(trans)) {
            const sql = await this._context.getBean('main');
            const res = await sql.query(sqlScript, parameters);
            sql.release();
            return res[0];
        } else {
            const res = await (trans as any).conn.query(sqlScript, parameters);
            return res[0];
        }
    }

    public async enCode(password: string, key?: string): Promise<Buffer> {
        const passwordKey = _.isUndefined(key) ? BaseConstant.DB_PASSWORD_KEY : key;
        const sql = await this._context.getBean('main');
        const res = await sql.query('SELECT AES_ENCRYPT(? , ?) as password' , [password, passwordKey]);
        sql.release();
        return res[0][0].password;
    }

    public async deCode(password: string, key?: string): Promise<string> {
        const passwordKey = _.isUndefined(key) ? BaseConstant.DB_PASSWORD_KEY : key;
        const sql = await this._context.getBean('main');
        const res = await sql.query('SELECT CAST(AES_DECRYPT(? , ?) AS CHAR(50) as password' , [password, passwordKey]);
        sql.release();
        return res[0][0].password;
    }
}
