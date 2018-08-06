import * as WebSocket from 'ws';
export default class WebSocketContext {
    private static _websocket;
    private constructor();
    static getWebsocket(): WebSocket.Server;
    static init(websocket: any): void;
}
