import * as WebSocket from 'ws';
export default class WebSocketContext {
    private static _websocket;
    private constructor() {}
    public static getWebsocket(): WebSocket.Server {
      return this._websocket;
    }
    public static init(websocket) {
      this._websocket = websocket;
    }
}
