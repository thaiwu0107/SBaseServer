"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("koa-log4");
const _ = require("lodash");
const mysql2 = require("mysql2");
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
        if (!_.isUndefined(MysqlContext.instance.mysqlPoolList[dbname])) {
            return MysqlContext.instance.mysqlPoolList[dbname].getConnection();
        }
        else {
            log.error(` MysqlContext.instance.mysqlPoolList[${dbname}] isUndefined`);
            throw new LibsExceptions_1.LibsExceptions(9001, ` MysqlContext.instance.mysqlPoolList[${dbname}] isUndefined`);
        }
    }
}
MysqlContext.instance = new MysqlContext();
exports.default = MysqlContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlTcWxDb250ZXh0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsibW9kZWxzL015U3FsQ29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQyw0QkFBNEI7QUFDNUIsaUNBQWlDO0FBRWpDLHFEQUFrRDtBQUVsRCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzNDLE1BQXFCLFlBQVk7SUFxQjdCO1FBbEJRLGtCQUFhLEdBQUcsRUFBRSxDQUFDO0lBa0JKLENBQUM7SUFoQmpCLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQWlCO1FBQzVDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN4QixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUMxQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7Z0JBQ25CLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtnQkFDbkIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO2dCQUMzQixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7Z0JBQzNCLGVBQWUsRUFBRSxRQUFRLENBQUMsZUFBZTthQUM1QyxDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUNuQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsUUFBUSxDQUFDLElBQUksT0FBTyxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxRQUFRLFlBQVksQ0FBQyxDQUFDO2dCQUN6RixZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzdELENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFHSSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUM7SUFDL0IsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBYztRQUMvQixJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFO1lBQzdELE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdEU7YUFBTTtZQUNILEdBQUcsQ0FBQyxLQUFLLENBQUMsd0NBQXdDLE1BQU0sZUFBZSxDQUFDLENBQUM7WUFDekUsTUFBTSxJQUFJLCtCQUFjLENBQUMsSUFBSSxFQUFFLHdDQUF3QyxNQUFNLGVBQWUsQ0FBQyxDQUFDO1NBQ2pHO0lBQ0wsQ0FBQzs7QUFoQ2MscUJBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0FBRmpELCtCQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGxvZzRqcyBmcm9tICdrb2EtbG9nNCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBteXNxbDIgZnJvbSAnbXlzcWwyJztcbmltcG9ydCB7IHByb21pc2lmeSB9IGZyb20gJ3V0aWwnO1xuaW1wb3J0IHsgTGlic0V4Y2VwdGlvbnMgfSBmcm9tICcuL0xpYnNFeGNlcHRpb25zJztcblxuY29uc3QgbG9nID0gbG9nNGpzLmdldExvZ2dlcignU1FMTWFuYWdlcicpO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlzcWxDb250ZXh0IHtcblxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlID0gbmV3IE15c3FsQ29udGV4dCgpO1xuICAgIHByaXZhdGUgbXlzcWxQb29sTGlzdCA9IHt9O1xuXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBpbml0aWFsaXplKGpzb25Db25maWc6IGFueVtdKSB7XG4gICAgICAgIGpzb25Db25maWcubWFwKChkYmNvbmZpZykgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3FsID0gbXlzcWwyLmNyZWF0ZVBvb2woe1xuICAgICAgICAgICAgICAgIGhvc3Q6IGRiY29uZmlnLmhvc3QsXG4gICAgICAgICAgICAgICAgdXNlcjogZGJjb25maWcudXNlcixcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogZGJjb25maWcucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgZGF0YWJhc2U6IGRiY29uZmlnLmRhdGFiYXNlLFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25MaW1pdDogZGJjb25maWcuY29ubmVjdGlvbkxpbWl0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZShzcWwpLnRoZW4oKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgbG9nLmluZm8oYERCIE5hbWUgJHtkYmNvbmZpZy5uYW1lfSA9PiAke2RiY29uZmlnLmhvc3R9OiAke2RiY29uZmlnLmRhdGFiYXNlfSBpcyByZWFkeS5gKTtcbiAgICAgICAgICAgICAgICBNeXNxbENvbnRleHQuaW5zdGFuY2UubXlzcWxQb29sTGlzdFtkYmNvbmZpZy5uYW1lXSA9IHJlcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTXlzcWxDb250ZXh0IHtcbiAgICAgIHJldHVybiBNeXNxbENvbnRleHQuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGdldEJlYW4oZGJuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKE15c3FsQ29udGV4dC5pbnN0YW5jZS5teXNxbFBvb2xMaXN0W2RibmFtZV0pKSB7XG4gICAgICAgICAgICByZXR1cm4gTXlzcWxDb250ZXh0Lmluc3RhbmNlLm15c3FsUG9vbExpc3RbZGJuYW1lXS5nZXRDb25uZWN0aW9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoYCBNeXNxbENvbnRleHQuaW5zdGFuY2UubXlzcWxQb29sTGlzdFske2RibmFtZX1dIGlzVW5kZWZpbmVkYCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoOTAwMSwgYCBNeXNxbENvbnRleHQuaW5zdGFuY2UubXlzcWxQb29sTGlzdFske2RibmFtZX1dIGlzVW5kZWZpbmVkYCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=