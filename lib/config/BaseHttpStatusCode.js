"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseHttpStatusCode;
(function (BaseHttpStatusCode) {
    /**
     * 成功
     * @constant
     */
    BaseHttpStatusCode[BaseHttpStatusCode["STATUS_OK"] = 1] = "STATUS_OK";
    // 9xxx 錯誤資訊 ==========================
    /**
     * Mock還未實作的資料
     * @constant
     */
    BaseHttpStatusCode[BaseHttpStatusCode["Mock_Data"] = 9999] = "Mock_Data";
    /**
     * Server失敗沒有明確定義
     * @constant
     */
    BaseHttpStatusCode[BaseHttpStatusCode["STATUS_FAIL"] = 9001] = "STATUS_FAIL";
    // 8xxx 警告資訊 ==========================
    /**
     * 沒有找到任何資料
     * @constant
     */
    BaseHttpStatusCode[BaseHttpStatusCode["STATUS_NO_MATCH_DATA"] = 8001] = "STATUS_NO_MATCH_DATA";
    /**
     * PROCEDURE報錯警告
     * @constant
     */
    BaseHttpStatusCode[BaseHttpStatusCode["PROCEDURE_WARN"] = 8039] = "PROCEDURE_WARN";
})(BaseHttpStatusCode = exports.BaseHttpStatusCode || (exports.BaseHttpStatusCode = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUh0dHBTdGF0dXNDb2RlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY29uZmlnL0Jhc2VIdHRwU3RhdHVzQ29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQVksa0JBaUNYO0FBakNELFdBQVksa0JBQWtCO0lBRTFCOzs7T0FHRztJQUNILHFFQUFhLENBQUE7SUFFYix1Q0FBdUM7SUFFdkM7OztPQUdHO0lBQ0gsd0VBQWdCLENBQUE7SUFDaEI7OztPQUdHO0lBQ0gsNEVBQWtCLENBQUE7SUFFbEIsdUNBQXVDO0lBRXZDOzs7T0FHRztJQUNILDhGQUEyQixDQUFBO0lBQzNCOzs7T0FHRztJQUNILGtGQUFxQixDQUFBO0FBQ3pCLENBQUMsRUFqQ1csa0JBQWtCLEdBQWxCLDBCQUFrQixLQUFsQiwwQkFBa0IsUUFpQzdCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gQmFzZUh0dHBTdGF0dXNDb2RlIHtcblxuICAgIC8qKlxuICAgICAqIOaIkOWKn1xuICAgICAqIEBjb25zdGFudFxuICAgICAqL1xuICAgIFNUQVRVU19PSyA9IDEsXG5cbiAgICAvLyA5eHh4IOmMr+iqpOizh+ioiiA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogTW9ja+mChOacquWvpuS9nOeahOizh+aWmVxuICAgICAqIEBjb25zdGFudFxuICAgICAqL1xuICAgIE1vY2tfRGF0YSA9IDk5OTksXG4gICAgLyoqXG4gICAgICogU2VydmVy5aSx5pWX5rKS5pyJ5piO56K65a6a576pXG4gICAgICogQGNvbnN0YW50XG4gICAgICovXG4gICAgU1RBVFVTX0ZBSUwgPSA5MDAxLFxuXG4gICAgLy8gOHh4eCDorablkYros4foqIogPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8qKlxuICAgICAqIOaykuacieaJvuWIsOS7u+S9leizh+aWmVxuICAgICAqIEBjb25zdGFudFxuICAgICAqL1xuICAgIFNUQVRVU19OT19NQVRDSF9EQVRBID0gODAwMSxcbiAgICAvKipcbiAgICAgKiBQUk9DRURVUkXloLHpjK/orablkYpcbiAgICAgKiBAY29uc3RhbnRcbiAgICAgKi9cbiAgICBQUk9DRURVUkVfV0FSTiA9IDgwMzlcbn1cbiJdfQ==