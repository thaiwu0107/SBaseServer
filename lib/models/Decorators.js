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
function WorkController(name) {
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
exports.WorkController = WorkController;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbIm1vZGVscy9EZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQTJCO0FBQzNCLFNBQWdCLE1BQU0sQ0FBQyxNQUFXO0lBQzlCLE9BQU8sQ0FBd0MsV0FBYyxFQUFFLEVBQUU7UUFDN0QsT0FBTyxLQUFNLFNBQVEsV0FBVztZQUF6Qjs7Z0JBQ0sscUJBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO2dCQUMzQyx3QkFBbUIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUM7WUFDN0QsQ0FBQztTQUFBLENBQUM7SUFDTixDQUFDLENBQUM7QUFDTixDQUFDO0FBUEQsd0JBT0M7QUFFRCxTQUFnQixjQUFjLENBQUMsSUFBUztJQUNwQyxPQUFPLENBQXdDLFdBQWMsRUFBRSxFQUFFO1FBQzdELGdEQUFnRDtRQUNoRCxPQUFPLEtBQU0sU0FBUSxXQUFXO1lBQXpCOztnQkFDSyxTQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLENBQUM7U0FBQSxDQUFDO0lBQ04sQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQVBELHdDQU9DO0FBRUQsU0FBZ0IsZUFBZSxDQUFDLElBQVM7SUFDckMsT0FBTyxDQUF3QyxXQUFjLEVBQUUsRUFBRTtRQUM3RCxnREFBZ0Q7UUFDaEQsT0FBTyxLQUFNLFNBQVEsV0FBVztZQUF6Qjs7Z0JBQ0ssU0FBSSxHQUFHLElBQUksQ0FBQztZQUN4QixDQUFDO1NBQUEsQ0FBQztJQUNOLENBQUMsQ0FBQztBQUNOLENBQUM7QUFQRCwwQ0FPQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOmJhbi10eXBlc1xuZXhwb3J0IGZ1bmN0aW9uIEVudGl0eShvcHRpb246IGFueSk6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gPFQgZXh0ZW5kcyB7IG5ldyguLi5hcmdzOiBhbnlbXSk6IHt9IH0+KGNvbnN0cnVjdG9yOiBUKSA9PiB7XG4gICAgICAgIHJldHVybiBjbGFzcyBleHRlbmRzIGNvbnN0cnVjdG9yIHtcbiAgICAgICAgICAgIHByaXZhdGUgYmFzZUVudGl0eURiTmFtZSA9IG9wdGlvbi5iYXNlRW50aXR5RGJOYW1lO1xuICAgICAgICAgICAgcHJpdmF0ZSBiYXNlRW50aXR5dGFibGVOYW1lID0gb3B0aW9uLmJhc2VFbnRpdHl0YWJsZU5hbWU7XG4gICAgICAgIH07XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFdvcmtDb250cm9sbGVyKG5hbWU6IGFueSk6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gPFQgZXh0ZW5kcyB7IG5ldyguLi5hcmdzOiBhbnlbXSk6IHt9IH0+KGNvbnN0cnVjdG9yOiBUKSA9PiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxuICAgICAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBjb25zdHJ1Y3RvciB7XG4gICAgICAgICAgICBwcml2YXRlIG5hbWUgPSBuYW1lO1xuICAgICAgICB9O1xuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFdmVudENvbnRyb2xsZXIobmFtZTogYW55KTogRnVuY3Rpb24ge1xuICAgIHJldHVybiA8VCBleHRlbmRzIHsgbmV3KC4uLmFyZ3M6IGFueVtdKToge30gfT4oY29uc3RydWN0b3I6IFQpID0+IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1jbGFzc2VzLXBlci1maWxlXG4gICAgICAgIHJldHVybiBjbGFzcyBleHRlbmRzIGNvbnN0cnVjdG9yIHtcbiAgICAgICAgICAgIHByaXZhdGUgbmFtZSA9IG5hbWU7XG4gICAgICAgIH07XG4gICAgfTtcbn1cbiJdfQ==