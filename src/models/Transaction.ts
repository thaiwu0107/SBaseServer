import * as log4js from 'koa-log4';
import * as _ from 'lodash';
import 'reflect-metadata';
import { ITransaction, ORMContext } from '.';
import MysqlContext from './MySqlContext';

const _log = log4js.getLogger('Transaction');

export default class Transaction implements ITransaction {
    [x: string]: any;
    private transPromise: Promise<any>;
    private trans: any;
    constructor(dbName?: string) {
        this.transPromise = MysqlContext.getInstance().getBean(_.isUndefined(dbName) ? 'main' : dbName);
    }
    public async begin(): Promise<any> {
        this.trans = await this.transPromise;
        return this.trans.beginTransaction();
    }
    public async commit(): Promise<any> {
        await this.trans.commit();
        return this.trans.release();
    }
    public async rollback(): Promise<any> {
        await this.trans.rollback();
        return this.trans.release();
    }
}
