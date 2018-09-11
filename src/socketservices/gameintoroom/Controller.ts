import { inject, provide, WsEntity } from '@ggttoo44/base-server';
import 'reflect-metadata';
import { GameListen } from '../../config/GameListen';
import Service from './Service';

@provide('GameIntoRoomController')
export default class GameIntoRoomController {
    constructor(@inject('GameIntoRoomServer') private service: Service) { }
    public async on(
        ws: WsEntity,
        data: {
        message: {
            playerID: string,
            playertable: string,
            playerNickeName: string,
            playerAmount: number
            playChannelName: string
            session: string
        },
        protocol: number
    }): Promise<any> {
        switch (data.protocol) {
            case GameListen.PROTOCOL_CHOOSE_TABLE:
                await this.service.intoRoom(data.message);
                break;
        }
    }
}
