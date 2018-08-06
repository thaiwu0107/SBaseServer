import * as WebSocket from 'ws';
export default class OneSocketContext {
    private _ows: WebSocket.Server;
    private _req: any;
    private _head: any;
    private isAlive: any;
    private constructor() {}
    private heartbeat() {
      this.isAlive = true;
    }
}
