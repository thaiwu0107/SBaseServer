import { provide } from '@ggttoo44/base-server';
import * as _ from 'lodash';
import 'reflect-metadata';
import CABaseRepository from '../../models/CABaseRepository';
@provide('LoginRepository')
export default class Repository extends CABaseRepository {
    constructor() { super(); }

    public async loginCheck(id, password): Promise<any> {
        const sql1 = 'SELECT * FROM user WHERE UM_Account = ? AND UM_Password = ? ' ;
        return this.sqlManager.query(sql1, [id, password]);
    }
    public async updateToken(token, id, password): Promise<any> {
        const sql = 'UPDATE user SET UM_Token = ? WHERE UM_Account = ? AND UM_Password = ? ';
        return this.sqlManager.query(sql, [token, id, password]);
    }
}
