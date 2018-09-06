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
        await sql.release();
        return moment(dbTime[0][0].time).toDate();
    }

    public async getDBCurrentTimeString(): Promise<string> {
        const sql = await this._context.getBean('main');
        const dbTime = await sql.query('select now() as time limit 1');
        await sql.release();
        return dbTime[0][0].time;
    }
    /**
     * 非insert專屬主要目的是為了取得查詢的資料
     * @param {string} sqlScript
     * @param {any[]} [parameters]
     * @param {Transaction} [trans]
     * @returns {Promise<any[]>}
     * @memberof MySqlManger
     */
    public async query(sqlScript: string, parameters?: any[], trans?: Transaction): Promise<any[]> {
        if (_.isUndefined(trans)) {
            const sql = await this._context.getBean('main');
            const res = await sql.query(sqlScript, parameters);
            await sql.release();
            return res[0] || undefined;
        } else {
            const res = await (trans as any).conn.query(sqlScript, parameters);
            return res[0] || undefined;
        }
    }
    /**
     * insert專屬可以直接取得insertId的資料
     * @param {string} sqlScript
     * @param {any[]} [parameters]
     * @param {Transaction} [trans]
     * @returns {(Promise<{
     *         insertId: number | string
     *     } | undefined>)}
     * @memberof MySqlManger
     */
    public async insert(sqlScript: string, parameters?: any[], trans?: Transaction): Promise<{
        insertId: number | string
    } | undefined> {
        let res: any;
        if (_.isUndefined(trans)) {
            const sql = await this._context.getBean('main');
            res = await sql.query(sqlScript, parameters);
            await sql.release();
        } else {
            res = await (trans as any).conn.query(sqlScript, parameters);
        }
        return res[0].insertId || undefined;
    }
    /**
     * 一次性多重Insert
     * @param {string} sqlScript
     * @param {Transaction} [trans]
     * @param {...any[][]} parameters 要Insert的資料每次一個陣列塞進來
     * @returns {Promise<any>}
     * @memberof MySqlManger
     */
    public async bulkInsert(sqlScript: string, trans?: Transaction, ...parameters: any[][]): Promise<any> {
        let res: any;
        if (_.isUndefined(trans)) {
            const sql = await this._context.getBean('main');
            res = await sql.query(sqlScript, parameters);
            await sql.release();
        } else {
            res = await (trans as any).conn.query(sqlScript, parameters);
        }
        return res || undefined;
    }
    /**
     * 一次性多重Insert
     *
     * @param {string} sqlScript
     * @param {any[][]} [parameters] 要Insert的資料只能使用二維陣列
     * @param {Transaction} [trans]
     * @returns {Promise<any>}
     * @memberof MySqlManger
     */
    public async bulkInsertArray(sqlScript: string, parameters?: any[][], trans?: Transaction): Promise<any> {
        let res: any;
        if (_.isUndefined(trans)) {
            const sql = await this._context.getBean('main');
            res = await sql.query(sqlScript, parameters);
            await sql.release();
        } else {
            res = await (trans as any).conn.query(sqlScript, parameters);
        }
        return res || undefined;
    }

    public async enCode(password: string, key?: string): Promise<Buffer> {
        const passwordKey = _.isUndefined(key) ? BaseConstant.DB_PASSWORD_KEY : key;
        const sql = await this._context.getBean('main');
        const res = await sql.query('SELECT AES_ENCRYPT(? , ?) as password' , [password, passwordKey]);
        await sql.release();
        return res[0][0].password;
    }

    public async deCode(password: string, key?: string): Promise<string> {
        const passwordKey = _.isUndefined(key) ? BaseConstant.DB_PASSWORD_KEY : key;
        const sql = await this._context.getBean('main');
        // tslint:disable-next-line:max-line-length
        const res = await sql.query('SELECT CAST(AES_DECRYPT(? , ?) AS CHAR(200) as password' , [password, passwordKey]);
        await sql.release();
        return res[0][0].password;
    }
}
