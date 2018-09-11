"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:ban-types
function Entity(option) {
    return (constructor) => {
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.baseEntityDbName = option.baseEntityDbName;
                this.baseEntitytableName = option.baseEntitytableName;
            }
        };
    };
}
exports.Entity = Entity;
// export function socketEvent(event: string) { // logText就是傳進來的參數'write log'
//     return (target: Function, key: string, descriptor: any) => {
//         return {
//             value(...args: any[]) {  // args 是指 doubleNumber 的參數，也就是 input
//                 const fooParameter = args.map((a) => JSON.stringify(a)).join();
//                 const result = descriptor.value.apply(this, args);  // 就是執行 doubleNumber 這個 method 後，會得到的值
//                 console.log(`Call: ${key}(${fooParameter}) => ${result}`); // Call: doubleNumber(5) => 10
//                 return result;
//             }
//         };
//     };
// }
// export function log(target: Function, key: string, descriptor: any) {
//     return {
//         value(...args: any[]) {  // args 是指 doubleNumber 的參數，也就是 input
//             const fooParameter = args.map((a) => JSON.stringify(a)).join();
//             const result = descriptor.value.apply(this, args);  // 就是執行 doubleNumber 這個 method 後，會得到的值
//             console.log(`Call: ${key}(${fooParameter}) => ${result}`); // Call: doubleNumber(5) => 10
//             return result;
//         }
//     };
// }
function EventController(name) {
    return (constructor) => {
        // tslint:disable-next-line:max-classes-per-file
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.name = name;
            }
        };
    };
}
exports.EventController = EventController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbIm1vZGVscy9EZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQTJCO0FBQzNCLFNBQWdCLE1BQU0sQ0FBQyxNQUFXO0lBQzlCLE9BQU8sQ0FBd0MsV0FBYyxFQUFFLEVBQUU7UUFDN0QsT0FBTyxLQUFNLFNBQVEsV0FBVztZQUF6Qjs7Z0JBQ0sscUJBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO2dCQUMzQyx3QkFBbUIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUM7WUFDN0QsQ0FBQztTQUFBLENBQUM7SUFDTixDQUFDLENBQUM7QUFDTixDQUFDO0FBUEQsd0JBT0M7QUFFRCw2RUFBNkU7QUFDN0UsbUVBQW1FO0FBQ25FLG1CQUFtQjtBQUNuQiw2RUFBNkU7QUFDN0Usa0ZBQWtGO0FBQ2xGLDZHQUE2RztBQUM3Ryw0R0FBNEc7QUFDNUcsaUNBQWlDO0FBQ2pDLGdCQUFnQjtBQUNoQixhQUFhO0FBQ2IsU0FBUztBQUNULElBQUk7QUFDSix3RUFBd0U7QUFDeEUsZUFBZTtBQUNmLHlFQUF5RTtBQUN6RSw4RUFBOEU7QUFDOUUseUdBQXlHO0FBQ3pHLHdHQUF3RztBQUN4Ryw2QkFBNkI7QUFDN0IsWUFBWTtBQUNaLFNBQVM7QUFDVCxJQUFJO0FBRUosU0FBZ0IsZUFBZSxDQUFDLElBQVM7SUFDckMsT0FBTyxDQUF3QyxXQUFjLEVBQUUsRUFBRTtRQUM3RCxnREFBZ0Q7UUFDaEQsT0FBTyxLQUFNLFNBQVEsV0FBVztZQUF6Qjs7Z0JBQ0ssU0FBSSxHQUFHLElBQUksQ0FBQztZQUN4QixDQUFDO1NBQUEsQ0FBQztJQUNOLENBQUMsQ0FBQztBQUNOLENBQUM7QUFQRCwwQ0FPQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOmJhbi10eXBlc1xuZXhwb3J0IGZ1bmN0aW9uIEVudGl0eShvcHRpb246IGFueSk6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gPFQgZXh0ZW5kcyB7IG5ldyguLi5hcmdzOiBhbnlbXSk6IHt9IH0+KGNvbnN0cnVjdG9yOiBUKSA9PiB7XG4gICAgICAgIHJldHVybiBjbGFzcyBleHRlbmRzIGNvbnN0cnVjdG9yIHtcbiAgICAgICAgICAgIHByaXZhdGUgYmFzZUVudGl0eURiTmFtZSA9IG9wdGlvbi5iYXNlRW50aXR5RGJOYW1lO1xuICAgICAgICAgICAgcHJpdmF0ZSBiYXNlRW50aXR5dGFibGVOYW1lID0gb3B0aW9uLmJhc2VFbnRpdHl0YWJsZU5hbWU7XG4gICAgICAgIH07XG4gICAgfTtcbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHNvY2tldEV2ZW50KGV2ZW50OiBzdHJpbmcpIHsgLy8gbG9nVGV4dOWwseaYr+WCs+mAsuS+hueahOWPg+aVuCd3cml0ZSBsb2cnXG4vLyAgICAgcmV0dXJuICh0YXJnZXQ6IEZ1bmN0aW9uLCBrZXk6IHN0cmluZywgZGVzY3JpcHRvcjogYW55KSA9PiB7XG4vLyAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICB2YWx1ZSguLi5hcmdzOiBhbnlbXSkgeyAgLy8gYXJncyDmmK/mjIcgZG91YmxlTnVtYmVyIOeahOWPg+aVuO+8jOS5n+WwseaYryBpbnB1dFxuLy8gICAgICAgICAgICAgICAgIGNvbnN0IGZvb1BhcmFtZXRlciA9IGFyZ3MubWFwKChhKSA9PiBKU09OLnN0cmluZ2lmeShhKSkuam9pbigpO1xuLy8gICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGRlc2NyaXB0b3IudmFsdWUuYXBwbHkodGhpcywgYXJncyk7ICAvLyDlsLHmmK/ln7fooYwgZG91YmxlTnVtYmVyIOmAmeWAiyBtZXRob2Qg5b6M77yM5pyD5b6X5Yiw55qE5YC8XG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYENhbGw6ICR7a2V5fSgke2Zvb1BhcmFtZXRlcn0pID0+ICR7cmVzdWx0fWApOyAvLyBDYWxsOiBkb3VibGVOdW1iZXIoNSkgPT4gMTBcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH07XG4vLyB9XG4vLyBleHBvcnQgZnVuY3Rpb24gbG9nKHRhcmdldDogRnVuY3Rpb24sIGtleTogc3RyaW5nLCBkZXNjcmlwdG9yOiBhbnkpIHtcbi8vICAgICByZXR1cm4ge1xuLy8gICAgICAgICB2YWx1ZSguLi5hcmdzOiBhbnlbXSkgeyAgLy8gYXJncyDmmK/mjIcgZG91YmxlTnVtYmVyIOeahOWPg+aVuO+8jOS5n+WwseaYryBpbnB1dFxuLy8gICAgICAgICAgICAgY29uc3QgZm9vUGFyYW1ldGVyID0gYXJncy5tYXAoKGEpID0+IEpTT04uc3RyaW5naWZ5KGEpKS5qb2luKCk7XG4vLyAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBkZXNjcmlwdG9yLnZhbHVlLmFwcGx5KHRoaXMsIGFyZ3MpOyAgLy8g5bCx5piv5Z+36KGMIGRvdWJsZU51bWJlciDpgJnlgIsgbWV0aG9kIOW+jO+8jOacg+W+l+WIsOeahOWAvFxuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coYENhbGw6ICR7a2V5fSgke2Zvb1BhcmFtZXRlcn0pID0+ICR7cmVzdWx0fWApOyAvLyBDYWxsOiBkb3VibGVOdW1iZXIoNSkgPT4gMTBcbi8vICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4vLyAgICAgICAgIH1cbi8vICAgICB9O1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gRXZlbnRDb250cm9sbGVyKG5hbWU6IGFueSk6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gPFQgZXh0ZW5kcyB7IG5ldyguLi5hcmdzOiBhbnlbXSk6IHt9IH0+KGNvbnN0cnVjdG9yOiBUKSA9PiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxuICAgICAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBjb25zdHJ1Y3RvciB7XG4gICAgICAgICAgICBwcml2YXRlIG5hbWUgPSBuYW1lO1xuICAgICAgICB9O1xuICAgIH07XG59XG4iXX0=