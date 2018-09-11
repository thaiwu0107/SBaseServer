import { inject, provide } from '@ggttoo44/base-server';
import * as _ from 'lodash';
import 'reflect-metadata';
import BaseService from '../../models/BaseService';
import Repository from './Repository';
@provide('GameIntoRoomServer')
export default class GameIntoRoomServer extends BaseService {
    constructor(@inject('GameIntoRoomRepository') private repository: Repository) { super(); }
    public async intoRoom(message: {
        playerID: string,
        playertable: string,
        playerNickeName: string,
        playerAmount: number
        playChannelName: string
        session: string
    }): Promise<any> {
        this.repository.initDesk(
            message.playerID,
            message.playertable,
            message.playerNickeName,
            message.playerAmount,
            message.playChannelName,
            message.session
        );
    }
}
