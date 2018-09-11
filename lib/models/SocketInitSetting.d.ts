import { Middleware } from 'koa';
import { EnumTracerconfigSetting } from '../config/EnumTracerconfig';
import IServerInitOnceEvent from '../ServerEvent/ServerInitOnceEvent';
export default class SocketInitSetting {
    socketPort: any;
    pathdb: any;
    pathBeansPath: any;
    log4?: () => Middleware;
    filters: EnumTracerconfigSetting;
    filtersOpen: boolean;
    iniData: IServerInitOnceEvent[];
    constructor(_pathdb: any, _pathBeansPath: string, _socketPort: number, _jwtPrivateKey: string, _jwtActive?: boolean, _log4?: () => Middleware, filters?: EnumTracerconfigSetting, filtersOpen?: boolean);
}
