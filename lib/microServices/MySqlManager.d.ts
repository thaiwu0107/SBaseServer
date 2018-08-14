/// <reference types="node" />
import 'reflect-metadata';
import MysqlContext from '../models/MySqlContext';
import Transaction from '../models/Transaction';
export default class MySqlManger {
    protected _context: MysqlContext;
    getDBCurrentTime(): Promise<Date>;
    getDBCurrentTimeString(): Promise<string>;
    query(sqlScript: string, parameters?: any[], trans?: Transaction): Promise<string>;
    enCode(password: string, key?: string): Promise<Buffer>;
    deCode(password: string, key?: string): Promise<string>;
}
