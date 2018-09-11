export default class MysqlContext {
    private static instance;
    private mysqlPoolList;
    static initialize(jsonConfig: any[]): Promise<void[]>;
    private constructor();
    static getInstance(): MysqlContext;
    getBean(dbname: string): Promise<any>;
}
