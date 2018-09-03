"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("koa-log4");
const _ = require("lodash");
require("reflect-metadata");
const MySqlContext_1 = require("./MySqlContext");
const _log = log4js.getLogger('Transaction');
class Transaction {
    constructor(dbName) {
        this.trans = {
            conn: undefined,
            begin: async () => { await this.begin(); },
            commit: async () => { await this.commit(); },
            rollback: async () => { await this.rollback(); }
        };
        this.transPromise = MySqlContext_1.default.getInstance().getBean(_.isUndefined(dbName) ? 'main' : dbName);
        return this.trans;
    }
    async begin() {
        this.trans.conn = await this.transPromise;
        await this.trans.conn.query('SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');
        await this.trans.conn.beginTransaction();
    }
    async commit() {
        await this.trans.conn.commit();
        await this.trans.conn.release();
        // tslint:disable-next-line:no-null-keyword
        this.trans.begin = null;
        // tslint:disable-next-line:no-null-keyword
        this.trans.commit = null;
        // tslint:disable-next-line:no-null-keyword
        this.trans.rollback = null;
        // tslint:disable-next-line:no-null-keyword
        this.trans.conn = null;
    }
    async rollback() {
        await this.trans.conn.rollback();
        await this.trans.conn.release();
        // tslint:disable-next-line:no-null-keyword
        this.trans.begin = null;
        // tslint:disable-next-line:no-null-keyword
        this.trans.commit = null;
        // tslint:disable-next-line:no-null-keyword
        this.trans.rollback = null;
        // tslint:disable-next-line:no-null-keyword
        this.trans.conn = null;
    }
}
exports.default = Transaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvVHJhbnNhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBbUM7QUFDbkMsNEJBQTRCO0FBQzVCLDRCQUEwQjtBQUUxQixpREFBMEM7QUFFMUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUU3QyxNQUFxQixXQUFXO0lBYTVCLFlBQVksTUFBZTtRQVhuQixVQUFLLEdBS1Q7WUFDQSxJQUFJLEVBQUUsU0FBUztZQUNmLEtBQUssRUFBRSxLQUFLLElBQUksRUFBRSxHQUFFLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLEVBQUUsS0FBSyxJQUFJLEVBQUUsR0FBRSxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0MsUUFBUSxFQUFFLEtBQUssSUFBSSxFQUFFLEdBQUUsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2xELENBQUM7UUFFRSxJQUFJLENBQUMsWUFBWSxHQUFHLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTyxDQUFDLENBQUM7UUFDakcsT0FBTyxJQUFJLENBQUMsS0FBWSxDQUFDO0lBQzdCLENBQUM7SUFDTSxLQUFLLENBQUMsS0FBSztRQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMxQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1FBQ2hGLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBQ00sS0FBSyxDQUFDLE1BQU07UUFDZixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9CLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEMsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQVcsQ0FBQztRQUMvQiwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBVyxDQUFDO1FBQ2hDLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFXLENBQUM7UUFDbEMsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQVcsQ0FBQztJQUNsQyxDQUFDO0lBQ00sS0FBSyxDQUFDLFFBQVE7UUFDakIsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFXLENBQUM7UUFDL0IsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQVcsQ0FBQztRQUNoQywyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBVyxDQUFDO1FBQ2xDLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFXLENBQUM7SUFDbEMsQ0FBQztDQUNKO0FBOUNELDhCQThDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGxvZzRqcyBmcm9tICdrb2EtbG9nNCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuaW1wb3J0IHsgSVRyYW5zYWN0aW9uLCBPUk1Db250ZXh0IH0gZnJvbSAnLic7XG5pbXBvcnQgTXlzcWxDb250ZXh0IGZyb20gJy4vTXlTcWxDb250ZXh0JztcblxuY29uc3QgX2xvZyA9IGxvZzRqcy5nZXRMb2dnZXIoJ1RyYW5zYWN0aW9uJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYW5zYWN0aW9uIGltcGxlbWVudHMgSVRyYW5zYWN0aW9uIHtcbiAgICBwcml2YXRlIHRyYW5zUHJvbWlzZTogUHJvbWlzZTxhbnk+O1xuICAgIHByaXZhdGUgdHJhbnM6IHtcbiAgICAgICAgY29ubjogYW55XG4gICAgICAgIGJlZ2luOiAoKSA9PiB7fSxcbiAgICAgICAgY29tbWl0OiAoKSA9PiB7fSxcbiAgICAgICAgcm9sbGJhY2s6ICgpID0+IHt9XG4gICAgfSA9IHtcbiAgICAgICAgY29ubjogdW5kZWZpbmVkLFxuICAgICAgICBiZWdpbjogYXN5bmMgKCkgPT4ge2F3YWl0IHRoaXMuYmVnaW4oKTsgfSxcbiAgICAgICAgY29tbWl0OiBhc3luYyAoKSA9PiB7YXdhaXQgdGhpcy5jb21taXQoKTsgfSxcbiAgICAgICAgcm9sbGJhY2s6IGFzeW5jICgpID0+IHthd2FpdCB0aGlzLnJvbGxiYWNrKCk7IH1cbiAgICB9O1xuICAgIGNvbnN0cnVjdG9yKGRiTmFtZT86IHN0cmluZykge1xuICAgICAgICB0aGlzLnRyYW5zUHJvbWlzZSA9IE15c3FsQ29udGV4dC5nZXRJbnN0YW5jZSgpLmdldEJlYW4oXy5pc1VuZGVmaW5lZChkYk5hbWUpID8gJ21haW4nIDogZGJOYW1lISk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zIGFzIGFueTtcbiAgICB9XG4gICAgcHVibGljIGFzeW5jIGJlZ2luKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHRoaXMudHJhbnMuY29ubiA9IGF3YWl0IHRoaXMudHJhbnNQcm9taXNlO1xuICAgICAgICBhd2FpdCB0aGlzLnRyYW5zLmNvbm4ucXVlcnkoJ1NFVCBUUkFOU0FDVElPTiBJU09MQVRJT04gTEVWRUwgUkVBRCBVTkNPTU1JVFRFRCcpO1xuICAgICAgICBhd2FpdCB0aGlzLnRyYW5zLmNvbm4uYmVnaW5UcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICBwdWJsaWMgYXN5bmMgY29tbWl0KCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGF3YWl0IHRoaXMudHJhbnMuY29ubi5jb21taXQoKTtcbiAgICAgICAgYXdhaXQgdGhpcy50cmFucy5jb25uLnJlbGVhc2UoKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW51bGwta2V5d29yZFxuICAgICAgICB0aGlzLnRyYW5zLmJlZ2luID0gbnVsbCBhcyBhbnk7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1udWxsLWtleXdvcmRcbiAgICAgICAgdGhpcy50cmFucy5jb21taXQgPSBudWxsIGFzIGFueTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW51bGwta2V5d29yZFxuICAgICAgICB0aGlzLnRyYW5zLnJvbGxiYWNrID0gbnVsbCBhcyBhbnk7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1udWxsLWtleXdvcmRcbiAgICAgICAgdGhpcy50cmFucy5jb25uID0gbnVsbCBhcyBhbnk7XG4gICAgfVxuICAgIHB1YmxpYyBhc3luYyByb2xsYmFjaygpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBhd2FpdCB0aGlzLnRyYW5zLmNvbm4ucm9sbGJhY2soKTtcbiAgICAgICAgYXdhaXQgdGhpcy50cmFucy5jb25uLnJlbGVhc2UoKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW51bGwta2V5d29yZFxuICAgICAgICB0aGlzLnRyYW5zLmJlZ2luID0gbnVsbCBhcyBhbnk7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1udWxsLWtleXdvcmRcbiAgICAgICAgdGhpcy50cmFucy5jb21taXQgPSBudWxsIGFzIGFueTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW51bGwta2V5d29yZFxuICAgICAgICB0aGlzLnRyYW5zLnJvbGxiYWNrID0gbnVsbCBhcyBhbnk7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1udWxsLWtleXdvcmRcbiAgICAgICAgdGhpcy50cmFucy5jb25uID0gbnVsbCBhcyBhbnk7XG4gICAgfVxufVxuIl19