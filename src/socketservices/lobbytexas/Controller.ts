import { inject, provide, WsEntity } from '@ggttoo44/base-server';
import 'reflect-metadata';
import { LobbyTexasListen } from '../../config/LobbyTexasListen';
import { LobbyTexasSend } from '../../config/LobbyTexasSend';
import Service from './Service';

@provide('LobbyTexasController')
export default class LobbyTexasController {
  constructor(@inject('LobbyTexasServer') private service: Service) {  }
  public async on(ws: WsEntity, data: any, ip: any): Promise<any> {
    switch (data.protocol) {
      case LobbyTexasListen.PROTOCOL_GET_DESKLIST:
        const deskList = await this.service.getDeskList(data.data.type);
        ws.send(LobbyTexasSend.EVENT_LOBBY_TEXAS, LobbyTexasSend.PROTOCOL_GET_DESKLIST, deskList);
        break;
      case LobbyTexasListen.PROTOCOL_OPEN_DESK:
        const res = await this.service.checkDesk(data.data);
        if (res !== undefined) {
          ws.send(LobbyTexasSend.EVENT_LOBBY_TEXAS, LobbyTexasSend.PROTOCOL_OPEN_DESK, {
            sessionId: res
          });
        } else {
          ws.send(LobbyTexasSend.EVENT_LOBBY_TEXAS, LobbyTexasSend.PROTOCOL_OPEN_DESK, {
            sessionId: undefined
          });
        }
        break;
      case LobbyTexasListen.PROTOCOL_GET_ALLDESKLIST:
        const allDeskList = await this.service.getAllDeskList();
        ws.send(LobbyTexasSend.EVENT_LOBBY_TEXAS, LobbyTexasSend.PROTOCOL_GET_ALLDESKLIST, allDeskList);
        break;
    }
  }
}
