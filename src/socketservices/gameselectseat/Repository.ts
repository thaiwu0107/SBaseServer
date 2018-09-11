import { provide } from '@ggttoo44/base-server';
import * as _ from 'lodash';
import 'reflect-metadata';
import { GameRedis } from '../../config/GameRedis';
import CABaseRepository from '../../models/CABaseRepository';

@provide('GameSelectSeatRepository')
export default class GameSelectSeatRepository extends CABaseRepository {
    constructor() { super(); }

    public async playSeat(deskID: any, playID: any): Promise<any> {
        console.log('[play::]', playID);
        const people = await this.redisManger.hmget(GameRedis.HASH_DESKINFO + deskID, 'deskPeople');  // 撈取目前牌桌玩家人數
        let play = _.toInteger(people);
        play ++;    // 增加此牌桌玩家人數
        await this.redisManger.hmset(GameRedis.HASH_DESKINFO + deskID, 'deskPeople', play);   // 設定牌桌玩家人數
        await this.redisManger.hmset(GameRedis.HASH_PLAYERINFO + playID, 'room', deskID);     // 設定玩家桌子ID
        // const redisPlayKey = GameRedis.HASH_PLAYERINFO + playID;
        // // const aa = new game_hash_desksinfo();
        // // await aa.execReuseRedis(2, {
        // //     room: -1,
        // //     seat: -1
        // // });
        // // // execReuseRedis(桌號,{物件});
        // await Promise.all([ // 這包做完 在執行下面程式
        //     this.redisManger.hmsetArray(redisPlayKey, [
        //         'id',  playID,
        //         'room' , -1,
        //         'seat', -1,
        //         'nickName', -1,
        //         'amount', -1,
        //         'betMoney', -1,
        //         'roundBet', -1,
        //         'playerStatus', -1,
        //         'countDown', -1,
        //         'roundMoney', -1,
        //         'poker', GameRedis.LIST_POKER + playID
        //     ]),
        //     this.redisManger.lset(GameRedis.LIST_POKER + playID, 0, [0, 0])
        // ]);
        // const deskRedisKey = GameRedis.HASH_DESKINFO + deskID;
        // const deskPeople = await this.redisManger.hget(deskRedisKey, 'seatSpace');
        // if (Number(deskPeople) === 0) {
        //     await Promise.all([
        //         this.redisManger.hmsetArray(deskRedisKey, [

        //         ])
        //     ]);
        // }

        return {};
    }
}
