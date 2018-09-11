import { inject, provide, provideNamed, TYPE, WsEntity } from '@ggttoo44/base-server';
import 'reflect-metadata';
import Service from './Service';

@provide('LobbyController')
export default class LobbyController {
  constructor(@inject('LobbyServer') private service: Service) {  }
  public async on(ws: WsEntity, data: any, ip: any): Promise<any> {
    // console.log('data', data);
  }
}
