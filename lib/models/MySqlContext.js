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
        return Promise.all(jsonConfig.map((dbconfig) => {
            const sql = mysql2.createPool({
                host: dbconfig.host,
                user: dbconfig.user,
                password: dbconfig.password,
                database: dbconfig.database,
                connectionLimit: dbconfig.connectionLimit,
                waitForConnections: true
            });
            return Promise.resolve(sql).then((res) => {
                log.info(`DB Name ${dbconfig.name} => ${dbconfig.host}: ${dbconfig.database} is ready.`);
                MysqlContext.instance.mysqlPoolList[dbconfig.name] = res;
            });
        }));
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
            log.error(`MysqlContext.instance.mysqlPoolList[${dbname}] isUndefined`);
            throw new LibsExceptions_1.LibsExceptions(9001, `MysqlContext.instance.mysqlPoolList[${dbname}] isUndefined`);
        }
    }
}
MysqlContext.instance = new MysqlContext();
exports.default = MysqlContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlTcWxDb250ZXh0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsibW9kZWxzL015U3FsQ29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQyw0QkFBNEI7QUFDNUIsZ0RBQWdEO0FBQ2hELHlDQUF5QztBQUV6QyxxREFBa0Q7QUFFbEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMzQyxNQUFxQixZQUFZO0lBcUI3QjtRQWxCUSxrQkFBYSxHQUFHLEVBQUUsQ0FBQztJQWtCSixDQUFDO0lBaEJqQixNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFpQjtRQUM1QyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzNDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7Z0JBQzFCLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtnQkFDbkIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2dCQUNuQixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7Z0JBQzNCLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtnQkFDM0IsZUFBZSxFQUFFLFFBQVEsQ0FBQyxlQUFlO2dCQUN6QyxrQkFBa0IsRUFBRSxJQUFJO2FBQzNCLENBQUMsQ0FBQztZQUNILE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDMUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLFFBQVEsQ0FBQyxJQUFJLE9BQU8sUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsUUFBUSxZQUFZLENBQUMsQ0FBQztnQkFDekYsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUM3RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBR0ksTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxZQUFZLENBQUMsUUFBUSxDQUFDO0lBQy9CLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQWM7UUFDL0IsTUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDL0I7YUFBTTtZQUNILEdBQUcsQ0FBQyxLQUFLLENBQUMsdUNBQXVDLE1BQU0sZUFBZSxDQUFDLENBQUM7WUFDeEUsTUFBTSxJQUFJLCtCQUFjLENBQUMsSUFBSSxFQUFFLHVDQUF1QyxNQUFNLGVBQWUsQ0FBQyxDQUFDO1NBQ2hHO0lBQ0wsQ0FBQzs7QUFqQ2MscUJBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0FBRmpELCtCQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGxvZzRqcyBmcm9tICdrb2EtbG9nNCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3VibW9kdWxlLWltcG9ydHNcbmltcG9ydCAqIGFzIG15c3FsMiBmcm9tICdteXNxbDIvcHJvbWlzZSc7XG5pbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IExpYnNFeGNlcHRpb25zIH0gZnJvbSAnLi9MaWJzRXhjZXB0aW9ucyc7XG5cbmNvbnN0IGxvZyA9IGxvZzRqcy5nZXRMb2dnZXIoJ1NRTE1hbmFnZXInKTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15c3FsQ29udGV4dCB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBNeXNxbENvbnRleHQoKTtcbiAgICBwcml2YXRlIG15c3FsUG9vbExpc3QgPSB7fTtcblxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgaW5pdGlhbGl6ZShqc29uQ29uZmlnOiBhbnlbXSkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoanNvbkNvbmZpZy5tYXAoKGRiY29uZmlnKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzcWwgPSBteXNxbDIuY3JlYXRlUG9vbCh7XG4gICAgICAgICAgICAgICAgaG9zdDogZGJjb25maWcuaG9zdCxcbiAgICAgICAgICAgICAgICB1c2VyOiBkYmNvbmZpZy51c2VyLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBkYmNvbmZpZy5wYXNzd29yZCxcbiAgICAgICAgICAgICAgICBkYXRhYmFzZTogZGJjb25maWcuZGF0YWJhc2UsXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbkxpbWl0OiBkYmNvbmZpZy5jb25uZWN0aW9uTGltaXQsXG4gICAgICAgICAgICAgICAgd2FpdEZvckNvbm5lY3Rpb25zOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc3FsKS50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGxvZy5pbmZvKGBEQiBOYW1lICR7ZGJjb25maWcubmFtZX0gPT4gJHtkYmNvbmZpZy5ob3N0fTogJHtkYmNvbmZpZy5kYXRhYmFzZX0gaXMgcmVhZHkuYCk7XG4gICAgICAgICAgICAgICAgTXlzcWxDb250ZXh0Lmluc3RhbmNlLm15c3FsUG9vbExpc3RbZGJjb25maWcubmFtZV0gPSByZXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBNeXNxbENvbnRleHQge1xuICAgICAgcmV0dXJuIE15c3FsQ29udGV4dC5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZ2V0QmVhbihkYm5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwb29sID0gTXlzcWxDb250ZXh0Lmluc3RhbmNlLm15c3FsUG9vbExpc3RbZGJuYW1lXTtcbiAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKHBvb2wpKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9vbC5nZXRDb25uZWN0aW9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoYE15c3FsQ29udGV4dC5pbnN0YW5jZS5teXNxbFBvb2xMaXN0WyR7ZGJuYW1lfV0gaXNVbmRlZmluZWRgKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyg5MDAxLCBgTXlzcWxDb250ZXh0Lmluc3RhbmNlLm15c3FsUG9vbExpc3RbJHtkYm5hbWV9XSBpc1VuZGVmaW5lZGApO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19