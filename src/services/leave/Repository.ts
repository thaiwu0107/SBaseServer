import { provide, Transaction } from '@ggttoo44/base-server';
import * as _ from 'lodash';
import 'reflect-metadata';
import { GameRedis } from '../../config/GameRedis';
import { LobbyTexasRedis } from '../../config/LobbyTexasRedis';
import CABaseRepository from '../../models/CABaseRepository';
@provide('LeaveRepository')
export default class Repository extends CABaseRepository {
  constructor() {
    super();
  }

  public async cleanRedis(deskID): Promise<any> {
    this.redisManger.del(
      GameRedis.HASH_DESKINFO + deskID,
      GameRedis.LIST_USERS_SIT + deskID,
      GameRedis.LIST_USERS_SOCKET + deskID,
      GameRedis.LIST_LOOK_SOCKET + deskID,
      GameRedis.LIST_PLAY_USER + deskID,
      GameRedis.LIST_PUBLIC_POKER + deskID,
      GameRedis.LIST_WEIGHT + deskID,
      GameRedis.LIST_WIN + deskID,
      GameRedis.LIST_PEOPLE_COST + deskID,
      GameRedis.LIST_PEOPLE_ACTION + deskID,
      GameRedis.LIST_ROUND_WIN_PRICE + deskID,
      GameRedis.LIST_LIVE_PEOPLE + deskID,
      GameRedis.LIST_PEOPLE_FRONT + deskID,
      LobbyTexasRedis.HASH_STATUS + deskID,
      LobbyTexasRedis.HASH_RULE + deskID
    );
  }
  public async cleanDatabase(time, sessionId, trans: Transaction): Promise<any> {
    const del =
      'UPDATE porkerdb.table_status SET ts_status = 0 , ts_people = 0 , ts_end = ? where (ts_session = ?)';
    return this.sqlManager.query(del, [time, sessionId], trans);
  }
}
