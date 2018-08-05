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
exports.default = Entity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ2d0dG9vNDQvRGVza3RvcC9CYXNlU29ja2V0U2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZGVscy9EZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQTJCO0FBQzNCLGdCQUErQixNQUFXO0lBQ3RDLE9BQU8sQ0FBd0MsV0FBYyxFQUFFLEVBQUU7UUFDN0QsT0FBTyxLQUFNLFNBQVEsV0FBVztZQUF6Qjs7Z0JBQ0sscUJBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO2dCQUMzQyx3QkFBbUIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUM7WUFDN0QsQ0FBQztTQUFBLENBQUM7SUFDTixDQUFDLENBQUM7QUFDTixDQUFDO0FBUEQseUJBT0MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpiYW4tdHlwZXNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEVudGl0eShvcHRpb246IGFueSk6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gPFQgZXh0ZW5kcyB7IG5ldyguLi5hcmdzOiBhbnlbXSk6IHt9IH0+KGNvbnN0cnVjdG9yOiBUKSA9PiB7XG4gICAgICAgIHJldHVybiBjbGFzcyBleHRlbmRzIGNvbnN0cnVjdG9yIHtcbiAgICAgICAgICAgIHByaXZhdGUgYmFzZUVudGl0eURiTmFtZSA9IG9wdGlvbi5iYXNlRW50aXR5RGJOYW1lO1xuICAgICAgICAgICAgcHJpdmF0ZSBiYXNlRW50aXR5dGFibGVOYW1lID0gb3B0aW9uLmJhc2VFbnRpdHl0YWJsZU5hbWU7XG4gICAgICAgIH07XG4gICAgfTtcbn1cbiJdfQ==