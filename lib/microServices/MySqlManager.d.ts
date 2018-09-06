/// <reference types="node" />
import 'reflect-metadata';
import MysqlContext from '../models/MySqlContext';
import Transaction from '../models/Transaction';
export default class MySqlManger {
    protected _context: MysqlContext;
    getDBCurrentTime(): Promise<Date>;
    getDBCurrentTimeString(): Promise<string>;
    /**
     * 非insert專屬主要目的是為了取得查詢的資料
     * @param {string} sqlScript
     * @param {any[]} [parameters]
     * @param {Transaction} [trans]
     * @returns {Promise<any[]>}
     * @memberof MySqlManger
     */
    query(sqlScript: string, parameters?: any[], trans?: Transaction): Promise<any[]>;
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
    insert(sqlScript: string, parameters?: any[], trans?: Transaction): Promise<{
        insertId: number | string;
    } | undefined>;
    /**
     * 一次性多重Insert
     * @param {string} sqlScript
     * @param {Transaction} [trans]
     * @param {...any[][]} parameters 要Insert的資料每次一個陣列塞進來
     * @returns {Promise<any>}
     * @memberof MySqlManger
     */
    bulkInsert(sqlScript: string, trans?: Transaction, ...parameters: any[][]): Promise<any>;
    /**
     * 一次性多重Insert
     *
     * @param {string} sqlScript
     * @param {any[][]} [parameters] 要Insert的資料只能使用二維陣列
     * @param {Transaction} [trans]
     * @returns {Promise<any>}
     * @memberof MySqlManger
     */
    bulkInsertArray(sqlScript: string, parameters?: any[][], trans?: Transaction): Promise<any>;
    enCode(password: string, key?: string): Promise<Buffer>;
    deCode(password: string, key?: string): Promise<string>;
}
