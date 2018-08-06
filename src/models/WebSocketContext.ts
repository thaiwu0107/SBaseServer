import * as WebSocket from 'ws';
export default class WebSocketContext {
    // private static _instance = new WebSocketContext();
    // private static getInstance(): WebSocketContext {
    //   return WebSocketContext._instance;
    // }
    private static _websocket;
    private constructor() {}
    public static getWebsocket(): WebSocket.Server {
      return WebSocketContext._websocket;
    }
    public static init(websocket) {
      WebSocketContext._websocket = websocket;
    }
}
