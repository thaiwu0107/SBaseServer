import { inject, provide } from '@ggttoo44/base-server';
import * as _ from 'lodash';
import 'reflect-metadata';
import BaseService from '../../models/BaseService';
import Repository from './Repository';
@provide('GameSelectSeatServer')
export default class GameSelectSeatServer extends BaseService {
    constructor(@inject('GameSelectSeatRepository') private repository: Repository) { super(); }
    // tslint:disable-next-line:no-empty
    public async SelectSeat(message): Promise<any> {
        const deskID = message.deskID;
        const playerID = message.playerID;
        this.repository.playSeat(deskID, playerID);
    }
}
