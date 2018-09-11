import { provide, Transaction } from '@ggttoo44/base-server';
import * as _ from 'lodash';
import 'reflect-metadata';
import { Constant } from '../../config/Constant';
import { GameRedis } from '../../config/GameRedis';
import CABaseRepository from '../../models/CABaseRepository';

@provide('LobbyTexasRepository')
export default class LobbyTexasRepository extends CABaseRepository {
    constructor() {
        super();
    }
    public async initDeskSeat(
        tableNumber: number,
        totalTime: number,
        sessionID: number,
        plays: number,
        desksChannel: string,
        deskSec: number,
        deskMinbet: number,
        deskMaxbet: number,
        desksb: number,
        deskbb: number,
        memberId): Promise<any> {
        const initZeroPlays: number[] = _.fill(Array(plays), 0);
        const init100Plays: number[] = _.fill(Array(plays), 100);
        const pipeline = this.redisManger.pipeline();
        return pipeline
            // 清除
            .del(GameRedis.HASH_DESKINFO + desksChannel,
                GameRedis.LIST_USERS_SIT + desksChannel,
                GameRedis.LIST_USERS_SOCKET + desksChannel,
                GameRedis.LIST_LOOK_SOCKET + desksChannel,
                GameRedis.LIST_PLAY_USER + desksChannel,
                GameRedis.LIST_PUBLIC_POKER + desksChannel,
                GameRedis.LIST_WEIGHT + desksChannel,
                GameRedis.LIST_WIN + desksChannel,
                GameRedis.LIST_PEOPLE_COST + desksChannel,
                GameRedis.LIST_PEOPLE_ACTION + desksChannel,
                GameRedis.LIST_ROUND_WIN_PRICE + desksChannel,
                GameRedis.LIST_LIVE_PEOPLE + desksChannel,
                GameRedis.LIST_PEOPLE_FRONT + desksChannel)
            // 開始重置
            .hmset(GameRedis.HASH_DESKINFO + desksChannel, {
                sessionID,
                tableNumber,
                deskStatus: 0, // 牌桌是否已開始
                desksChannel, // 頻道名稱
                refList_user: GameRedis.LIST_USERS_SIT, // game:list:usersit:2, // 玩家資訊	0 1 2 3 4 5 6 7 8 9 按照座位放入資訊
                refList_playingPlayer: GameRedis.LIST_USERS_SOCKET,
                refList_lookPlayer: GameRedis.LIST_LOOK_SOCKET, // 在這房間的人
                deskPeople: 0, // 目前玩家數量
                seatSpace: plays,  // 位置空間
                refList_playUser: GameRedis.LIST_PLAY_USER,  // 玩家輪流順續
                nowPlayer: -1, // 目前要決定動作的玩家
                deskMin: deskMinbet,
                deskMax: deskMaxbet,
                dHost: -1, // 莊家
                dSmall: -1, // 小忙
                dBig: -1, // 大忙
                dSmallCost: desksb, // 小忙
                dBigCost: deskbb, // 大忙注金額
                refList_publicPoker: GameRedis.LIST_PUBLIC_POKER, // 公牌
                refList_weight: GameRedis.LIST_WEIGHT, // 看誰分數高低決定輸贏
                refList_win: GameRedis.LIST_WIN, // 誰贏的勝利
                deskMoney: 0, // 目前押注金額
                refList_peopleCost: GameRedis.LIST_PEOPLE_COST, // 誰總共押了多少
                refList_peopleAction: GameRedis.LIST_PEOPLE_ACTION, // 每個人的狀態
                refList_roundWinPrice: GameRedis.LIST_ROUND_WIN_PRICE, // 這輪分PA 在座各位拿多少
                refList_livePeople: GameRedis.LIST_LIVE_PEOPLE, // 剩下誰 livePeople=[2,4,6]
                frontMoney: 100,
                refList_peopleFront: GameRedis.LIST_PEOPLE_FRONT, // 每個人這輪壓多少
                round: 0,	// 目前倫數
                timeUp: deskSec,  // 計算時間
                castTime: 0, // 本局耗時
                totalTime // 本桌總可用時間
            })
            .rpush(GameRedis.LIST_USERS_SIT + desksChannel, ...initZeroPlays)
            .rpush(GameRedis.LIST_USERS_SOCKET + desksChannel, ...initZeroPlays)
            .rpush(GameRedis.LIST_LOOK_SOCKET + desksChannel, memberId)
            .rpush(GameRedis.LIST_PLAY_USER + desksChannel, 0)
            .rpush(GameRedis.LIST_PUBLIC_POKER + desksChannel, 0, 0, 0, 0, 0)
            .rpush(GameRedis.LIST_WEIGHT + desksChannel, ...initZeroPlays)
            .rpush(GameRedis.LIST_WIN + desksChannel, 0)
            .rpush(GameRedis.LIST_PEOPLE_COST + desksChannel, ...initZeroPlays)
            .rpush(GameRedis.LIST_PEOPLE_ACTION + desksChannel, ...init100Plays)
            .rpush(GameRedis.LIST_ROUND_WIN_PRICE + desksChannel, ...initZeroPlays)
            .rpush(GameRedis.LIST_LIVE_PEOPLE + desksChannel, 0)
            .rpush(GameRedis.LIST_PEOPLE_FRONT + desksChannel, ...initZeroPlays)
            .rpush(GameRedis.DESK_PLAYING, desksChannel)
            .exec();
    }

    // 新增 session_record
    public async insertSessionRecord(
        UUID: string,
        rule: number,
        id: number,
        type: number,
        trans: Transaction
    ): Promise<any> {
        const insert =
            'INSERT INTO porkerdb.session_record (sr_uuid, tc_id, ts_id, tt_id) VALUES (?, ?, ?, ?)';
        return this.sqlManager.insert(insert, [UUID, rule, id, type], trans);
    }

    // 查詢 table_status 第一筆
    public async selectTableStatusList(
        status: Constant,
        type: number,
        trans?: Transaction
    ): Promise<{
        id: number, ts_session, ts_table, ts_ruleid, ts_type, ts_status, ts_people, ts_start, ts_end
    } | 0> {
        const select =
            'select id, ts_session, ts_table, ts_ruleid, ts_type, ts_status, ts_people, ts_start, ts_end \
        from table_status where (ts_status = ? && ts_type = ? ) order by ts_table LIMIT 1';
        const res = await this.sqlManager.query(select, [status, type], trans);
        return res[0] || 0;
    }

    // 查詢 table_status
    public async selectTableStatus(
        status: Constant,
        type: number,
        tableId: number,
        trans: Transaction
    ): Promise<{ id, ts_session, ts_table, ts_ruleid, ts_type, ts_status, ts_people, ts_start, ts_end }> {
        const select =
            'select id, ts_session, ts_table, ts_ruleid, ts_type, ts_status, ts_people, ts_start, ts_end \
            from table_status where (ts_status = ? && ts_type = ? && ts_table = ?) ';
        const res = await this.sqlManager.query(
            select,
            [status, type, tableId],
            trans
        );
        if (_.size(res) === 1) {
            return res[0];
        } else {
            return {} as any;
        }
    }

    // 查詢 table_status.ts_table
    public async selectTableStatusTableId(
        status: number,
        type: number,
        trans: Transaction
    ): Promise<{ ts_table }> {
        const select =
            'select ts_table from table_status where (ts_status = ? && ts_type = ?) order by ts_table DESC LIMIT 1';
        const res = await this.sqlManager.query(select, [status, type], trans);
        return _.size(res) === 0 ? 0 : res[0].ts_table;
    }

    // 新增 table_status
    public async insertTableStatus(
        tableName: string,
        tableNumber: number,
        rule: number,
        type: number,
        status: number,
        people: number,
        startTime: Date,
        trans: Transaction
    ): Promise<any> {
        const insert =
            'INSERT INTO porkerdb.table_status (ts_name, ts_table, ts_ruleid, ts_type, ts_status, ts_people, ts_start) \
       VALUES (?, ?, ?, ?, ?, ? , ?)';
        return this.sqlManager.insert(insert,
            [tableName, tableNumber, rule, type, status, people, startTime], trans);
    }

    // 修改 table_status
    public async updateTableStatus(
        tableName: string,
        rule: number,
        status: number,
        people: number,
        tableID: number,
        startTime: Date,
        tableDeskNumber,
        trans: Transaction
    ): Promise<any> {
        const update =
            'UPDATE porkerdb.table_status set ts_ruleid = ?, \
            ts_status = ?, ts_people = ?, ts_start = ? ts_name = ? where (id = ? && ts_table = ?)';
        const res = await this.sqlManager.query(
            update, [rule, status, people, startTime, tableName, tableID, tableDeskNumber], trans);
        return res[0] || -1;
    }

    // 修改 table_status.ts_session
    public async updateTableStatusSessionId(
        sessionId: number,
        status: number,
        type: number,
        tableId: number,
        trans: Transaction
    ): Promise<any> {
        const update =
            'UPDATE porkerdb.table_status set ts_session = ? where (ts_status = ? and ts_type = ? and id = ?) ';
        const res = await this.sqlManager.query(update, [sessionId, status, type, tableId], trans);
        return res[0] || -1;
    }

    // 查詢 nlh_rule.id
    public async selectNLHRuleId(
        UUID: string,
        trans: Transaction
    ): Promise<{ id }> {
        const select = 'select id from nlh_rule where (tc_uuid = ?) oreder by id desc limit 1';
        const res = await this.sqlManager.query(select, [UUID], trans);
        return res[0] || -1;
    }
    /**
     * 虛構的等真正的MEMBER db才是真正去勞資料
     *
     * @param {number} memberId
     * @param {Transaction} trans
     * @returns {(Promise<{ money } | -1>)}
     * @memberof LobbyTexasRepository
     */
    public async checkGamePoint(
        memberId: number,
        trans: Transaction
    ): Promise<{ UM_Point, UM_goldpoint } | undefined> {
        const select = 'select UM_Point, UM_goldpoint from porkerdb.ts_usermember where (UM_No = ?) limit 1';
        const res = await this.sqlManager.query(select, [memberId], trans);
        return res[0] || undefined;
    }

    public async setGamePointZero(
        goldpoint: number,
        memberId: number,
        trans: Transaction
    ): Promise<any> {
        const select = 'UPDATE porkerdb.ts_usermember set UM_Point = 0 ,UM_goldpoint = ? where (UM_No = ? )';
        return this.sqlManager.query(select, [goldpoint, memberId], trans);
    }

    // 新增 nlh_rule
    public async insertNLHRule(
        UUID: string,
        sb: number,
        bb: number,
        minbet: number,
        maxbet: number,
        sec: number,
        seat: number,
        multdeal: number,
        insurance: number,
        rake: number,
        toprake: Float32Array,
        buyin: number,
        gps: number,
        ip: number,
        tableTime: Float32Array,
        trans: Transaction
    ): Promise<any> {
        const insert =
            'INSERT INTO porkerdb.nlh_rule \
        (tc_uuid, tc_sb, tc_bb, tc_minbet, tc_maxbet, tc_sec, tc_seat, tc_multdeal, tc_insurance, tc_rake, tc_toprake,\
             tc_buyin, tc_gps, tc_ip, tc_table_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        return this.sqlManager.insert(insert, [UUID, sb, bb, minbet, maxbet, sec, seat, multdeal,
            insurance, rake, toprake, buyin, gps, ip, tableTime], trans);
    }

    // 查詢 table_type
    public async selectTableType(
        type: number,
        trans: Transaction
    ): Promise<{ id, tt_game, tt_type }> {
        const select = 'select id, tt_game, tt_type from table_type where (id = ?)';
        const res = await this.sqlManager.query(select, [type], trans);
        return res[0] || -1;
    }

    /**
     * 初始化PLAYER
     *
     */
    public async initPlayer(recordID: string , channelName: string, nickName: string, tableNumber: number,
        gamePoint: string, memberId: number, redisPlayerKey): Promise<any> {
        const pipeline = this.redisManger.pipeline();
        return pipeline
            .del(redisPlayerKey)
            .hmset(redisPlayerKey, {
                id: memberId,
                table: tableNumber,
                tableSession: recordID,
                channelName,
                seat: -1,
                nickName,
                amount: gamePoint,
                betMoney: -1,
                roundBet: -1,
                playerStatus: Constant.STATUS_LOOK,
                countDown: -1,
                roundMoney: -1,
                poker: GameRedis.LIST_POKER + memberId // {game:player}:list:poker:2
            })
            .rpush(GameRedis.LIST_POKER + memberId, 0, 0)
            .exec();
    }
    public async getAllDeskList(): Promise<object> {
        // 從Redis撈取所有桌子與桌子資訊
        // 撈取所有桌子名稱之Key: this.redisManger.hmget(GameRedis.LIST_ALLDESKNAME);
        const allDeskName =  await this.redisManger.lrange(GameRedis.DESK_PLAYING, 0, -1); // 取得目前全部的桌子
        const deskList = [] as any;
        // tslint:disable-next-line:prefer-for-of
        for (const i of allDeskName) {
            const [
                dSmallCost,
                dBigCost,
                deskMin,
                deskMax,
                timeUp,
                deskStatus,
                seatSpace
            ] = await Promise.all([
                this.redisManger.hmget(GameRedis.HASH_DESKINFO + i, 'dSmallCost'),  // 小盲注
                this.redisManger.hmget(GameRedis.HASH_DESKINFO + i, 'dBigCost'),    // 大盲注
                this.redisManger.hmget(GameRedis.HASH_DESKINFO + i, 'deskMin'), // 最低下注
                this.redisManger.hmget(GameRedis.HASH_DESKINFO + i, 'deskMax'), // 最高下注
                this.redisManger.hmget(GameRedis.HASH_DESKINFO + i, 'timeUp'), // 下注秒數
                this.redisManger.hmget(GameRedis.HASH_DESKINFO + i, 'deskStatus'), // 牌桌狀態
                this.redisManger.hmget(GameRedis.HASH_DESKINFO + i, 'seatSpace') // 剩餘座位
            ]);
            deskList.push({
                deskID : i, dSmallCost, dBigCost, deskMin, deskMax, timeUp, deskStatus, seatSpace
            });
        }
        return deskList;
    }
}
