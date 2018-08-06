"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocChanged_1 = require("./DocChanged");
const IBaseResponse_1 = require("./IBaseResponse");
const NotImplemented_1 = require("./NotImplemented");
class BaseResponse extends IBaseResponse_1.default {
    constructor(response) {
        super();
        if (response instanceof NotImplemented_1.default || response instanceof DocChanged_1.default) {
            this.$status = response.status;
            this.$result = response.message;
        }
        else {
            this.$result = response;
        }
    }
    set $result(value) {
        this.result = value; // Utils.deeplyToCamelCase
    }
    get $result() {
        return this.result;
    }
}
exports.default = BaseResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsibW9kZWxzL0Jhc2VSZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUFzQztBQUN0QyxtREFBNEM7QUFDNUMscURBQThDO0FBRTlDLE1BQXFCLFlBQWEsU0FBUSx1QkFBYTtJQUduRCxZQUFZLFFBQWE7UUFDckIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLFFBQVEsWUFBWSx3QkFBYyxJQUFJLFFBQVEsWUFBWSxvQkFBVSxFQUFFO1lBQ3RFLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7U0FDbkM7YUFBTTtZQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVELElBQVcsT0FBTyxDQUFDLEtBQVU7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQywwQkFBMEI7SUFDbkQsQ0FBQztJQUNELElBQVcsT0FBTztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0NBQ0o7QUFuQkQsK0JBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERvY0NoYW5nZWQgZnJvbSAnLi9Eb2NDaGFuZ2VkJztcbmltcG9ydCBJR2FtYVJlc3BvbnNlIGZyb20gJy4vSUJhc2VSZXNwb25zZSc7XG5pbXBvcnQgTm90SW1wbGVtZW50ZWQgZnJvbSAnLi9Ob3RJbXBsZW1lbnRlZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VSZXNwb25zZSBleHRlbmRzIElHYW1hUmVzcG9uc2Uge1xuICAgIHByaXZhdGUgcmVzdWx0OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihyZXNwb25zZTogYW55KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIE5vdEltcGxlbWVudGVkIHx8IHJlc3BvbnNlIGluc3RhbmNlb2YgRG9jQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy4kc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICAgICAgdGhpcy4kcmVzdWx0ID0gcmVzcG9uc2UubWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHJlc3VsdCA9IHJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldCAkcmVzdWx0KHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQgPSB2YWx1ZTsgLy8gVXRpbHMuZGVlcGx5VG9DYW1lbENhc2VcbiAgICB9XG4gICAgcHVibGljIGdldCAkcmVzdWx0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gICAgfVxufVxuIl19