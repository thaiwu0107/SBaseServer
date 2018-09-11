import { provide } from '@ggttoo44/base-server';
import * as _ from 'lodash';
import 'reflect-metadata';
import CABaseRepository from '../../models/CABaseRepository';
@provide('LobbyRepository')
export default class LobbyRepository extends CABaseRepository {
    constructor() { super(); }
    public async createSession(): Promise<any> {
        //
    }
}
