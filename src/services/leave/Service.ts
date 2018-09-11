import { provide, Transaction } from '@ggttoo44/base-server';
import * as _ from 'lodash';
import 'reflect-metadata';
import BaseService from '../../models/BaseService';
import Repository from './Repository';
@provide('LeaveServer')
export default class Service extends BaseService {
  private repository = new Repository();
  constructor() {
    super();
  }

  public async leave(deskId, sessionId): Promise<any> {
    const time = await this.repository.getDBCurrentTime();
    const trans = new Transaction();
    await trans.begin();
    try {
      await this.repository.cleanDatabase(time, sessionId, trans);
      await trans.commit();
      await this.repository.cleanRedis(deskId);
    } catch (error) {
      await trans.rollback();
      throw error;
    }
  }
}
