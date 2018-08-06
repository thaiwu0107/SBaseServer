"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("koa-log4");
class BaseService {
    constructor() {
        this._log = log4js.getLogger(this.constructor.name);
    }
}
exports.default = BaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvQmFzZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBbUM7QUFFbkMsTUFBOEIsV0FBVztJQUF6QztRQUNjLFNBQUksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUFBO0FBRkQsOEJBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBsb2c0anMgZnJvbSAna29hLWxvZzQnO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlU2VydmljZSB7XG4gICAgcHJvdGVjdGVkIF9sb2cgPSBsb2c0anMuZ2V0TG9nZ2VyKHRoaXMuY29uc3RydWN0b3IubmFtZSk7XG59XG4iXX0=