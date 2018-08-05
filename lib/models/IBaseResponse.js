"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseHttpStatusCode_1 = require("../config/BaseHttpStatusCode");
class IBaseResponse {
    constructor() {
        this.status = BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_OK;
    }
    set $status(value) {
        this.status = value;
    }
    get $status() {
        return this.status;
    }
}
exports.default = IBaseResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSUJhc2VSZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ2d0dG9vNDQvRGVza3RvcC9CYXNlU29ja2V0U2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZGVscy9JQmFzZVJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUVBQWtFO0FBRWxFO0lBQUE7UUFDYyxXQUFNLEdBQXVCLHVDQUFrQixDQUFDLFNBQVMsQ0FBQztJQVF4RSxDQUFDO0lBTkcsSUFBVyxPQUFPLENBQUMsS0FBeUI7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQVcsT0FBTztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0NBQ0o7QUFURCxnQ0FTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VIdHRwU3RhdHVzQ29kZSB9IGZyb20gJy4uL2NvbmZpZy9CYXNlSHR0cFN0YXR1c0NvZGUnO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBJQmFzZVJlc3BvbnNlIHtcbiAgICBwcm90ZWN0ZWQgc3RhdHVzOiBCYXNlSHR0cFN0YXR1c0NvZGUgPSBCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX09LO1xuXG4gICAgcHVibGljIHNldCAkc3RhdHVzKHZhbHVlOiBCYXNlSHR0cFN0YXR1c0NvZGUpIHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSB2YWx1ZTtcbiAgICB9XG4gICAgcHVibGljIGdldCAkc3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0dXM7XG4gICAgfVxufVxuIl19