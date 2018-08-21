"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("koa-log4");
const _ = require("lodash");
// tslint:disable-next-line:no-submodule-imports
const mysql2 = require("mysql2/promise");
const LibsExceptions_1 = require("./LibsExceptions");
const log = log4js.getLogger('SQLManager');
class MysqlContext {
    constructor() {
        this.mysqlPoolList = {};
    }
    static async initialize(jsonConfig) {
        jsonConfig.map((dbconfig) => {
            const sql = mysql2.createPool({
                host: dbconfig.host,
                user: dbconfig.user,
                password: dbconfig.password,
                database: dbconfig.database,
                connectionLimit: dbconfig.connectionLimit
            });
            Promise.resolve(sql).then((res) => {
                log.info(`DB Name ${dbconfig.name} => ${dbconfig.host}: ${dbconfig.database} is ready.`);
                MysqlContext.instance.mysqlPoolList[dbconfig.name] = res;
            });
            return {};
        });
    }
    static getInstance() {
        return MysqlContext.instance;
    }
    async getBean(dbname) {
        const pool = MysqlContext.instance.mysqlPoolList[dbname];
        if (!_.isUndefined(pool)) {
            return pool.getConnection();
        }
        else {
            log.error(` MysqlContext.instance.mysqlPoolList[${dbname}] isUndefined`);
            throw new LibsExceptions_1.LibsExceptions(9001, ` MysqlContext.instance.mysqlPoolList[${dbname}] isUndefined`);
        }
    }
}
MysqlContext.instance = new MysqlContext();
exports.default = MysqlContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlTcWxDb250ZXh0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsibW9kZWxzL015U3FsQ29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQyw0QkFBNEI7QUFDNUIsZ0RBQWdEO0FBQ2hELHlDQUF5QztBQUV6QyxxREFBa0Q7QUFFbEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMzQyxNQUFxQixZQUFZO0lBcUI3QjtRQWxCUSxrQkFBYSxHQUFHLEVBQUUsQ0FBQztJQWtCSixDQUFDO0lBaEJqQixNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFpQjtRQUM1QyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDeEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztnQkFDMUIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2dCQUNuQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7Z0JBQ25CLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtnQkFDM0IsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO2dCQUMzQixlQUFlLEVBQUUsUUFBUSxDQUFDLGVBQWU7YUFDNUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDbkMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLFFBQVEsQ0FBQyxJQUFJLE9BQU8sUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsUUFBUSxZQUFZLENBQUMsQ0FBQztnQkFDekYsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUM3RCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBR0ksTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxZQUFZLENBQUMsUUFBUSxDQUFDO0lBQy9CLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQWM7UUFDL0IsTUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDL0I7YUFBTTtZQUNILEdBQUcsQ0FBQyxLQUFLLENBQUMsd0NBQXdDLE1BQU0sZUFBZSxDQUFDLENBQUM7WUFDekUsTUFBTSxJQUFJLCtCQUFjLENBQUMsSUFBSSxFQUFFLHdDQUF3QyxNQUFNLGVBQWUsQ0FBQyxDQUFDO1NBQ2pHO0lBQ0wsQ0FBQzs7QUFqQ2MscUJBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0FBRmpELCtCQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGxvZzRqcyBmcm9tICdrb2EtbG9nNCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3VibW9kdWxlLWltcG9ydHNcbmltcG9ydCAqIGFzIG15c3FsMiBmcm9tICdteXNxbDIvcHJvbWlzZSc7XG5pbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IExpYnNFeGNlcHRpb25zIH0gZnJvbSAnLi9MaWJzRXhjZXB0aW9ucyc7XG5cbmNvbnN0IGxvZyA9IGxvZzRqcy5nZXRMb2dnZXIoJ1NRTE1hbmFnZXInKTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15c3FsQ29udGV4dCB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBNeXNxbENvbnRleHQoKTtcbiAgICBwcml2YXRlIG15c3FsUG9vbExpc3QgPSB7fTtcblxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgaW5pdGlhbGl6ZShqc29uQ29uZmlnOiBhbnlbXSkge1xuICAgICAgICBqc29uQ29uZmlnLm1hcCgoZGJjb25maWcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNxbCA9IG15c3FsMi5jcmVhdGVQb29sKHtcbiAgICAgICAgICAgICAgICBob3N0OiBkYmNvbmZpZy5ob3N0LFxuICAgICAgICAgICAgICAgIHVzZXI6IGRiY29uZmlnLnVzZXIsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGRiY29uZmlnLnBhc3N3b3JkLFxuICAgICAgICAgICAgICAgIGRhdGFiYXNlOiBkYmNvbmZpZy5kYXRhYmFzZSxcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uTGltaXQ6IGRiY29uZmlnLmNvbm5lY3Rpb25MaW1pdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoc3FsKS50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGxvZy5pbmZvKGBEQiBOYW1lICR7ZGJjb25maWcubmFtZX0gPT4gJHtkYmNvbmZpZy5ob3N0fTogJHtkYmNvbmZpZy5kYXRhYmFzZX0gaXMgcmVhZHkuYCk7XG4gICAgICAgICAgICAgICAgTXlzcWxDb250ZXh0Lmluc3RhbmNlLm15c3FsUG9vbExpc3RbZGJjb25maWcubmFtZV0gPSByZXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IE15c3FsQ29udGV4dCB7XG4gICAgICByZXR1cm4gTXlzcWxDb250ZXh0Lmluc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBnZXRCZWFuKGRibmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBvb2wgPSBNeXNxbENvbnRleHQuaW5zdGFuY2UubXlzcWxQb29sTGlzdFtkYm5hbWVdO1xuICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQocG9vbCkpIHtcbiAgICAgICAgICAgIHJldHVybiBwb29sLmdldENvbm5lY3Rpb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvZy5lcnJvcihgIE15c3FsQ29udGV4dC5pbnN0YW5jZS5teXNxbFBvb2xMaXN0WyR7ZGJuYW1lfV0gaXNVbmRlZmluZWRgKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyg5MDAxLCBgIE15c3FsQ29udGV4dC5pbnN0YW5jZS5teXNxbFBvb2xMaXN0WyR7ZGJuYW1lfV0gaXNVbmRlZmluZWRgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==