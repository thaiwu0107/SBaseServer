import { provide } from '@ggttoo44/base-server';
import * as _ from 'lodash';
import 'reflect-metadata';
import { GameRedis } from '../../config/GameRedis';
import CABaseRepository from '../../models/CABaseRepository';

@provide('TestRepository')
export default class TestRepository extends CABaseRepository {
    constructor() { super(); }

    public async test(deskID: any, playID: any): Promise<any> {
        const redisPlayKey = GameRedis.HASH_PLAYERINFO + playID;
        // const aa = new game_hash_desksinfo();
        // await aa.execReuseRedis(2, {
        //     room: -1,
        //     seat: -1
        // });
        // // execReuseRedis(桌號,{物件});
        /*
            {game:player}:hash:playerinfo:2:{
                id: playID,
                room: -1,
                seat: -1,
                nickName: -1,
                amount: -1,
                betMoney: -1,
                roundBet: -1,
                playerStatus: -1,
                countDown: -1,
                roundMoney: -1,
            }

        */
        await Promise.all([ // 這包做完 在執行下面程式
            this.redisManger.hmsetObject(redisPlayKey, {
                id: playID,
                room: -1,
                seat: -1,
                nickName: -1,
                amount: -1,
                betMoney: -1,
                roundBet: -1,
                playerStatus: -1,
                countDown: -1,
                roundMoney: -1,
                poker: GameRedis.LIST_POKER + playID // {game:player}:list:poker:2
            }),
            this.redisManger.lpush(GameRedis.LIST_POKER + playID, 0, 0) // {game:player}:list:poker:2
        ]);
        // console.log(await this.redisManger.lrange(GameRedis.LIST__POKER + playID, 0, 0));
        // const deskRedisKey = GameRedis.HASH_DESKINFO + deskID;
        // const deskPeople = await this.redisManger.hget(deskRedisKey, 'seatSpace');
        // if (_.toInteger('nil') === 0) {
        //     await Promise.all([
        //         this.redisManger.hmsetArray(deskRedisKey, [

        //         ])
        //     ]);
        // }

        return {};
    }

    // public async players(): Promise<any> {
    //     await this.redisManger.set('game:players:room:gggg: -1);
    //     await this.redisManger.set('game:players:seat:gggg: -1);
    //     await this.redisManger.set('game:players:nickname:gggg: -1);
    //     await this.redisManger.set('game:players:amount:gggg: -1);
    //     await this.redisManger.set('game:players:betmoney:gggg: -1);
    //     await this.redisManger.set('game:players:roundbet:gggg: -1);
    //     await this.redisManger.set('game:players:poker:gggg: -1);
    //     await this.redisManger.set('game:players:playerstatus:gggg: -1);
    //     await this.redisManger.set('game:players:countdown:gggg: -1);
    //     await this.redisManger.set('game:players:roundMoney:gggg: -1);
    //     await this.redisManger.set('game:players:socketaddress:gggg: -1);
    // }
}
