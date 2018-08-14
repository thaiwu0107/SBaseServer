import 'reflect-metadata';
import { ITransaction } from '.';
export default class Transaction implements ITransaction {
    [x: string]: any;
    private transPromise;
    private trans;
    constructor(dbName?: string);
    begin(): Promise<any>;
    commit(): Promise<any>;
    rollback(): Promise<any>;
}
