"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
/* istanbul ignore next */
class ORMContext {
    constructor() {
        this.context = ORMContext.getContext();
    }
    getBean(name) {
        return this.context.getBean(name);
    }
    getConnectionNames() {
        return Object.keys(this.context._config.database);
    }
    static getConnectionNames() {
        return Object.keys(ORMContext.orm._config.database);
    }
    static async init(pathdb, pathBeansPath) {
        // tslint:disable-next-line:no-null-keyword
        this.orm = null;
        this.orm = await require('gama-orm')({
            beansPath: pathBeansPath,
            printSQL: true,
            database: pathdb
        });
        return this.orm;
    }
    static getBean(name) {
        return this.orm.getBean(name);
    }
    /**
     * 注意!!這是為了Mock注入的hook,單純為了注入依賴,非常規使用
     * 請不要隨意使用這個方法
     * @static
     * @param {*} mockOrm
     * @memberof Context
     */
    static setMockContext(mockOrm) {
        this.orm = mockOrm;
    }
    static getContext() {
        return ORMContext.orm;
    }
}
exports.ORMContext = ORMContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2dndHRvbzQ0L0Rlc2t0b3AvQmFzZVNvY2tldFNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBMEI7QUFFMUIsMEJBQTBCO0FBQzFCO0lBR0k7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBQ00sT0FBTyxDQUFDLElBQVk7UUFDdkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ00sa0JBQWtCO1FBQ3JCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQ00sTUFBTSxDQUFDLGtCQUFrQjtRQUM1QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhO1FBQzFDLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pDLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLE1BQU07U0FDbkIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFDTSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQVk7UUFDOUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFZO1FBQ3JDLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDO0lBQ3ZCLENBQUM7SUFDTSxNQUFNLENBQUMsVUFBVTtRQUNwQixPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUM7SUFDMUIsQ0FBQztDQUVKO0FBN0NELGdDQTZDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAncmVmbGVjdC1tZXRhZGF0YSc7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5leHBvcnQgY2xhc3MgT1JNQ29udGV4dCB7XG4gICAgcHVibGljIGNvbnRleHQ6IGFueTtcbiAgICBwdWJsaWMgc3RhdGljIG9ybTogYW55O1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBPUk1Db250ZXh0LmdldENvbnRleHQoKTtcbiAgICB9XG4gICAgcHVibGljIGdldEJlYW4obmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0QmVhbihuYW1lKTtcbiAgICB9XG4gICAgcHVibGljIGdldENvbm5lY3Rpb25OYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuY29udGV4dC5fY29uZmlnLmRhdGFiYXNlKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBnZXRDb25uZWN0aW9uTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhPUk1Db250ZXh0Lm9ybS5fY29uZmlnLmRhdGFiYXNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGluaXQocGF0aGRiLCBwYXRoQmVhbnNQYXRoKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1udWxsLWtleXdvcmRcbiAgICAgICAgdGhpcy5vcm0gPSBudWxsO1xuICAgICAgICB0aGlzLm9ybSA9IGF3YWl0IHJlcXVpcmUoJ2dhbWEtb3JtJykoe1xuICAgICAgICAgICAgYmVhbnNQYXRoOiBwYXRoQmVhbnNQYXRoLFxuICAgICAgICAgICAgcHJpbnRTUUw6IHRydWUsXG4gICAgICAgICAgICBkYXRhYmFzZTogcGF0aGRiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm9ybTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBnZXRCZWFuKG5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5vcm0uZ2V0QmVhbihuYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDms6jmhI8hIemAmeaYr+eCuuS6hk1vY2vms6jlhaXnmoRob29rLOWWrue0lOeCuuS6huazqOWFpeS+neiztCzpnZ7luLjopo/kvb/nlKhcbiAgICAgKiDoq4vkuI3opoHpmqjmhI/kvb/nlKjpgJnlgIvmlrnms5VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHsqfSBtb2NrT3JtXG4gICAgICogQG1lbWJlcm9mIENvbnRleHRcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNldE1vY2tDb250ZXh0KG1vY2tPcm06IGFueSkge1xuICAgICAgICB0aGlzLm9ybSA9IG1vY2tPcm07XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIE9STUNvbnRleHQub3JtO1xuICAgIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElUcmFuc2FjdGlvbiB7XG4gICAgYmVnaW4oKTogUHJvbWlzZTxhbnk+O1xuICAgIGNvbW1pdCgpOiBQcm9taXNlPGFueT47XG4gICAgcm9sbGJhY2soKTogUHJvbWlzZTxhbnk+O1xuICAgIGdldERhbyh0YWJsZU5hbWU6IHN0cmluZyk6IGFueTtcbn1cbiJdfQ==