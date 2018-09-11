import { inject, provide, Transaction } from '@ggttoo44/base-server';
import BigNumber from 'bignumber.js';
import * as _ from 'lodash';
import 'reflect-metadata';
import { Constant } from '../../config/enum.constant';
import { GameRedis } from '../../config/GameRedis';
import BaseService from '../../models/BaseService';
import Exceptions from '../../models/Exceptions';
import Repository from './Repository';
@provide('LobbyTexasServer')
export default class LobbyTexasServer extends BaseService {
    constructor(@inject('LobbyTexasRepository') private repository: Repository) { super(); }

    // 取得牌桌列表
    public async getDeskList(tableType): Promise<any> {
        return this.repository.selectTableStatusList(Constant.STATUS_ACTIVE, tableType);
    }
    // 取得所有牌桌列表
    public async getAllDeskList() {
        return this.repository.getAllDeskList();
    }

    // 檢查賭桌開關
    public async checkDesk(data): Promise<any> {
        // 取資料庫時間
        const time = await this.repository.getDBCurrentTime();
        const UUID = '';
        const trans = new Transaction();
        await trans.begin();
        try {
            // 查詢會員
            const member = await this.repository.checkGamePoint(data.memberId, trans);
            if (member === undefined) {
                throw new Exceptions(9001, 'no this memberID');
            }
            const castGoldPoint = new BigNumber(_.toString(data.seat)).times(data.tableTime);
            if (_.toNumber(member.UM_goldpoint) <= castGoldPoint.toNumber()) {
                throw new Exceptions(9001, 'no enough GoldPoint');
            }
            const dbTempGoldPoint = new BigNumber(_.toString(member.UM_goldpoint)).minus(castGoldPoint);
            const [
                setGamePointZero,
                ruleId,
                tableType,
                tableList
            ] = await Promise.all([
                // 取出point
                this.repository.setGamePointZero(dbTempGoldPoint.toNumber(), data.memberId, trans),
                // 新增規則
                this.repository.insertNLHRule(UUID, data.smallBlind, data.bigBlind,
                    data.minBet, data.maxBet, data.sec, data.seat, data.multdeal,
                    data.insurance, data.rake, data.toprake, data.buyin, data.gps, data.ip, data.tableTime, trans),
                this.repository.selectTableType(data.type, trans),
                // 查詢 table_status [開關, 賭桌型態]
                this.repository.selectTableStatusList(Constant.STATUS_INACTIVE, data.type, trans)
            ]);
            const gameTypeName = tableType.tt_game + tableType.tt_type;
            const redisPlayKey = GameRedis.HASH_PLAYERINFO + data.memberId;
            let channelName: string;
            let tableNumber: number;
            let tableStatusId: number;
            if (tableList !== 0) {
                // reuse有用過的桌
                tableNumber = tableList.ts_table;
                tableStatusId = tableList.id;
                channelName = gameTypeName + tableNumber;
                // update
                await this.repository.updateTableStatus(data.tableName,
                    ruleId, Constant.STATUS_ACTIVE, 1, tableStatusId, time, tableNumber, trans);
            } else {
                // 開啟新桌
                // 新找最後一張桌是什麼桌號
                const table = await this.repository.selectTableStatusTableId(
                    Constant.STATUS_ACTIVE, data.type, trans);
                tableNumber = _.toNumber(table) + 1;
                tableStatusId = await this.repository.insertTableStatus(data.tableName, tableNumber, ruleId,
                    data.type, Constant.STATUS_ACTIVE, Constant.NEW_TABLEDESK_PLAYERS, time, trans);
                channelName = gameTypeName + tableNumber;
            }
            const recordID =
                await this.repository.insertSessionRecord(UUID, ruleId, tableStatusId, data.type, trans);
            await this.repository.updateTableStatusSessionId(recordID, Constant.STATUS_ACTIVE, data.type,
                tableStatusId, trans);
            // 以上交易結束commit
            await trans.commit();
            await Promise.all([
                this.repository.initDeskSeat(
                    tableNumber,
                    data.totalTime,
                    recordID,
                    data.seat,
                    channelName,
                    data.sec,
                    data.minBet,
                    data.maxBet,
                    data.smallBlind,
                    data.bigBlind,
                    redisPlayKey
                ),
                this.repository.initPlayer(
                    recordID,
                    channelName,
                    data.nickName,
                    tableNumber,
                    member.UM_Point,
                    data.memberId,
                    redisPlayKey
                )
            ]);
            return {
                recordID,
                channelName
            };
        } catch (error) {
            // 交易出錯回滾交易前的狀態
            await trans.rollback();
            throw error;
        }
    }
}
