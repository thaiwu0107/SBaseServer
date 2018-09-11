import { provide } from '@ggttoo44/base-server';
import * as _ from 'lodash';
import 'reflect-metadata';
import BaseService from '../../models/BaseService';
import Exceptions from '../../models/Exceptions';
import Repository from './Repository';
@provide('LoginServer')
export default class Service extends BaseService {
    private repository = new Repository();
    constructor() { super(); }

    public async loginCheck(id, password): Promise<any> {
        const rt = await this.repository.loginCheck(id, password);
        if (_.size(rt[0]) === 1) {
            const token = id + password ;
            await this.repository.updateToken(token, id, password);
            return {
                token: rt[0][0].UM_Token,
                id
             };
        } else {
            throw new Exceptions(8001, 'login fail');
        }
    }
}
