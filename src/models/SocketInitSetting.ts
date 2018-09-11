import { Middleware } from 'koa';
import { EnumTracerconfigSetting } from '../config/EnumTracerconfig';
import IServerInitOnceEvent from '../ServerEvent/ServerInitOnceEvent';

export default class SocketInitSetting {

    public socketPort;
    public pathdb: any;
    public pathBeansPath: any;
    public log4?: () => Middleware;
    public filters: EnumTracerconfigSetting;
    public filtersOpen: boolean;
    public iniData: IServerInitOnceEvent[];

    constructor(
        _pathdb: any, _pathBeansPath: string,
        _socketPort: number, _jwtPrivateKey: string, _jwtActive: boolean = false,
        _log4?: () => Middleware, filters: EnumTracerconfigSetting = EnumTracerconfigSetting.NoFilter,
        filtersOpen: boolean = true
    ) {
        this.pathdb = _pathdb;
        this.log4 = _log4;
        this.pathBeansPath = _pathBeansPath;
        this.socketPort = _socketPort;
        this.filters = filters;
        this.filtersOpen = filtersOpen;
    }
}
