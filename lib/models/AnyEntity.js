"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const BaseHttpStatusCode_1 = require("../config/BaseHttpStatusCode");
const LibsExceptions_1 = require("./LibsExceptions");
class AnyEntity {
    toObj(keys, values) {
        if (Array.isArray(keys)) {
            if (keys.length !== values.length) {
                throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, 'keys 跟 values 長度不一致');
            }
            keys.forEach((key, i, arr) => {
                this[key] = values[i];
            });
        }
        else {
            this[keys] = values;
        }
        return _.omit(_.omitBy(this, _.isUndefined), 'toObj');
    }
}
exports.default = AnyEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW55RW50aXR5LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsibW9kZWxzL0FueUVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRCQUE0QjtBQUM1QixxRUFBa0U7QUFDbEUscURBQWtEO0FBQ2xELE1BQXFCLFNBQVM7SUFDbkIsS0FBSyxDQUFDLElBQXVCLEVBQUUsTUFBbUI7UUFDckQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUMvQixNQUFNLElBQUksK0JBQWMsQ0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUscUJBQXFCLENBQUMsQ0FBQzthQUNuRjtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7U0FDdkI7UUFDRCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLE9BQU8sQ0FBUSxDQUFDO0lBQ2pFLENBQUM7Q0FDSjtBQWRELDRCQWNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgQmFzZUh0dHBTdGF0dXNDb2RlIH0gZnJvbSAnLi4vY29uZmlnL0Jhc2VIdHRwU3RhdHVzQ29kZSc7XG5pbXBvcnQgeyBMaWJzRXhjZXB0aW9ucyB9IGZyb20gJy4vTGlic0V4Y2VwdGlvbnMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW55RW50aXR5IHtcbiAgICBwdWJsaWMgdG9PYmooa2V5czogc3RyaW5nIHwgc3RyaW5nW10sIHZhbHVlczogYW55IHwgYW55W10pIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5cykpIHtcbiAgICAgICAgICAgIGlmIChrZXlzLmxlbmd0aCAhPT0gdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsICdrZXlzIOi3nyB2YWx1ZXMg6ZW35bqm5LiN5LiA6Ie0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXlzLmZvckVhY2goKGtleSwgaSwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gdmFsdWVzW2ldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzW2tleXNdID0gdmFsdWVzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfLm9taXQoXy5vbWl0QnkodGhpcywgXy5pc1VuZGVmaW5lZCksICd0b09iaicpIGFzIGFueTtcbiAgICB9XG59XG4iXX0=