import { provide } from '@ggttoo44/base-server';
import * as _ from 'lodash';
import 'reflect-metadata';
import { GameRedis } from '../../config/GameRedis';
import CABaseRepository from '../../models/CABaseRepository';

@provide('GameIntoRoomRepository')
export default class GameIntoRoomRepository extends CABaseRepository {
    constructor() { super(); }
    public async initDesk(
        playerID: string,
        playertable: string,
        playerNickeName: string,
        playerAmount: number,
        playChannelName: string,
        session: string
        ) {
            const lookPlayer = await
             this.redisManger.hmget(GameRedis.HASH_DESKINFO + playertable, 'refList_lookPlayer');
            await Promise.all([
                this.redisManger.hmsetObject(GameRedis.HASH_PLAYERINFO + playerID, {
                table: playertable,
                nickName: playerNickeName,
                amount: playerAmount,
                channelName: playChannelName,
                tableSession: session
            }),
            this.redisManger.rpush(lookPlayer + playertable, playerID)
        ]);
        }

}
