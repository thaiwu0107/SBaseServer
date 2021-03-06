"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const _ = require("lodash");
const BaseHttpStatusCode_1 = require("../config/BaseHttpStatusCode");
const LibsExceptions_1 = require("./LibsExceptions");
class BaseEntity {
    getGamaEntityDbName() {
        return this.baseEntityDbName;
    }
    setGamaEntityDbName(name) {
        this.baseEntityDbName = name;
    }
    getGamaEntitytableName() {
        return this.baseEntitytableName;
    }
    setGamaEntitytableName(name) {
        this.baseEntitytableName = name;
    }
    /**
     * Creates an instance of GamaEntity.
     * @param {*} [source] 自動對應k-v,
     * @param {boolean} [isVaild] 盡量不要在這裡同步驗證,使用非同步vaild驗證比較好(才不會阻塞event loop線程)
     * @memberof GamaEntity
     */
    constructor(source, isVaild) {
        if (source) {
            const properties = this.getList();
            properties.forEach((property) => {
                if (!_.isUndefined(source[property])) {
                    this[property] = source[property];
                }
            });
            if (isVaild) {
                this.validateSync();
            }
        }
    }
    listAllProperties() {
        return this.getList();
    }
    toJSON() {
        const properties = this.listAllProperties();
        const dataObject = {};
        properties.forEach((property) => {
            if ((this)[property] !== undefined) {
                dataObject[property] = (this)[property];
            }
        });
        return dataObject;
    }
    fields() {
        return this.listAllProperties();
    }
    async vaild() {
        const errorsP = class_validator_1.validate(this, { skipMissingProperties: true });
        const errors = await errorsP;
        if (errors.length > 0) {
            const messages = [];
            errors.forEach((err) => {
                messages.push(_.trimStart(err.property, '_'));
            });
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, this.constructor.name + ' : data format error, field: ' + _.toString(messages));
        }
    }
    validateSync() {
        const errors = class_validator_1.validateSync(this, { skipMissingProperties: true });
        if (errors.length > 0) {
            const messages = [];
            errors.forEach((err) => {
                messages.push(_.trimStart(err.property, '_'));
            });
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, this.constructor.name + ' : data format error, field: ' + _.toString(messages));
        }
    }
}
exports.default = BaseEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUVudGl0eS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbIm1vZGVscy9CYXNlRW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQXlEO0FBQ3pELDRCQUE0QjtBQUU1QixxRUFBa0U7QUFDbEUscURBQWtEO0FBRWxELE1BQThCLFVBQVU7SUFNN0IsbUJBQW1CO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQ2pDLENBQUM7SUFFUyxtQkFBbUIsQ0FBQyxJQUFZO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7SUFDakMsQ0FBQztJQUVNLHNCQUFzQjtRQUN6QixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNwQyxDQUFDO0lBRVMsc0JBQXNCLENBQUMsSUFBWTtRQUN6QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFlBQVksTUFBWSxFQUFFLE9BQWlCO1FBQ3ZDLElBQUksTUFBTSxFQUFFO1lBQ1IsTUFBTSxVQUFVLEdBQWEsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzVDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3JDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLE9BQU8sRUFBRTtnQkFDVCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDdkI7U0FDSjtJQUNMLENBQUM7SUFFTyxpQkFBaUI7UUFDckIsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVNLE1BQU07UUFDVCxNQUFNLFVBQVUsR0FBYSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN0RCxNQUFNLFVBQVUsR0FBUSxFQUFFLENBQUM7UUFDM0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQ2hDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzNDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRU0sTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVNLEtBQUssQ0FBQyxLQUFLO1FBQ2QsTUFBTSxPQUFPLEdBQUcsMEJBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxxQkFBcUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDO1FBQzdCLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkIsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDbkIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sSUFBSSwrQkFBYyxDQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsK0JBQStCLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQ3ZGO0lBQ0wsQ0FBQztJQUVPLFlBQVk7UUFDaEIsTUFBTSxNQUFNLEdBQUcsOEJBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxxQkFBcUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkIsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDbkIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sSUFBSSwrQkFBYyxDQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsK0JBQStCLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQ3ZGO0lBQ0wsQ0FBQztDQUNKO0FBckZELDZCQXFGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHZhbGlkYXRlLCB2YWxpZGF0ZVN5bmMgfSBmcm9tICdjbGFzcy12YWxpZGF0b3InO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBCYXNlSHR0cFN0YXR1c0NvZGUgfSBmcm9tICcuLi9jb25maWcvQmFzZUh0dHBTdGF0dXNDb2RlJztcbmltcG9ydCB7IExpYnNFeGNlcHRpb25zIH0gZnJvbSAnLi9MaWJzRXhjZXB0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VFbnRpdHkge1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldExpc3QoKTogc3RyaW5nW107XG4gICAgcHJpdmF0ZSBiYXNlRW50aXR5RGJOYW1lOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBiYXNlRW50aXR5dGFibGVOYW1lOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgZ2V0R2FtYUVudGl0eURiTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZUVudGl0eURiTmFtZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0R2FtYUVudGl0eURiTmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5iYXNlRW50aXR5RGJOYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0R2FtYUVudGl0eXRhYmxlTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZUVudGl0eXRhYmxlTmFtZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0R2FtYUVudGl0eXRhYmxlTmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5iYXNlRW50aXR5dGFibGVOYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdhbWFFbnRpdHkuXG4gICAgICogQHBhcmFtIHsqfSBbc291cmNlXSDoh6rli5XlsI3mh4lrLXYsXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbaXNWYWlsZF0g55uh6YeP5LiN6KaB5Zyo6YCZ6KOh5ZCM5q2l6amX6K2JLOS9v+eUqOmdnuWQjOatpXZhaWxk6amX6K2J5q+U6LyD5aW9KOaJjeS4jeacg+mYu+WhnmV2ZW50IGxvb3Dnt5rnqIspXG4gICAgICogQG1lbWJlcm9mIEdhbWFFbnRpdHlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2U/OiBhbnksIGlzVmFpbGQ/OiBib29sZWFuKSB7XG4gICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXM6IHN0cmluZ1tdID0gdGhpcy5nZXRMaXN0KCk7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKHNvdXJjZVtwcm9wZXJ0eV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcGVydHldID0gc291cmNlW3Byb3BlcnR5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChpc1ZhaWxkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVN5bmMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbGlzdEFsbFByb3BlcnRpZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRMaXN0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvSlNPTigpOiBhbnkge1xuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSA9IHRoaXMubGlzdEFsbFByb3BlcnRpZXMoKTtcbiAgICAgICAgY29uc3QgZGF0YU9iamVjdDogYW55ID0ge307XG4gICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHkpID0+IHtcbiAgICAgICAgICAgIGlmICgodGhpcylbcHJvcGVydHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBkYXRhT2JqZWN0W3Byb3BlcnR5XSA9ICh0aGlzKVtwcm9wZXJ0eV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGF0YU9iamVjdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZmllbGRzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdEFsbFByb3BlcnRpZXMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgdmFpbGQoKSB7XG4gICAgICAgIGNvbnN0IGVycm9yc1AgPSB2YWxpZGF0ZSh0aGlzLCB7IHNraXBNaXNzaW5nUHJvcGVydGllczogdHJ1ZSB9KTtcbiAgICAgICAgY29uc3QgZXJyb3JzID0gYXdhaXQgZXJyb3JzUDtcbiAgICAgICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIGVycm9ycy5mb3JFYWNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKF8udHJpbVN0YXJ0KGVyci5wcm9wZXJ0eSwgJ18nKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsXG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJyA6IGRhdGEgZm9ybWF0IGVycm9yLCBmaWVsZDogJyArIF8udG9TdHJpbmcobWVzc2FnZXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdmFsaWRhdGVTeW5jKCkge1xuICAgICAgICBjb25zdCBlcnJvcnMgPSB2YWxpZGF0ZVN5bmModGhpcywgeyBza2lwTWlzc2luZ1Byb3BlcnRpZXM6IHRydWUgfSk7XG4gICAgICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZXM6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBlcnJvcnMuZm9yRWFjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChfLnRyaW1TdGFydChlcnIucHJvcGVydHksICdfJykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoQmFzZUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLFxuICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IubmFtZSArICcgOiBkYXRhIGZvcm1hdCBlcnJvciwgZmllbGQ6ICcgKyBfLnRvU3RyaW5nKG1lc3NhZ2VzKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=