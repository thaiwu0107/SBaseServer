import { inject, provide, WsEntity } from '@ggttoo44/base-server';
import 'reflect-metadata';
import { GameListen } from '../../config/GameListen';
import Service from './Service';

@provide('GameSelectSeatController')
export default class GameSelectSeatController {
    constructor(@inject('GameSelectSeatServer')private service: Service) {  }
    public async on(ws: WsEntity, data: any): Promise<any> {
        //
        console.log(data);
        switch (data.protocol) {
            case GameListen.PROTOCOL_SELECT_SEAT:
                await this.service.SelectSeat(data.message);
                break;
        }
    }
}
