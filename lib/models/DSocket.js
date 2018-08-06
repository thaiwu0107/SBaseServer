"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:ban-types
function DSocket(socketName) {
    return (constructor) => {
        return class extends constructor {
            constructor() {
                super(...arguments);
                this._socketName = socketName;
            }
        };
    };
}
exports.default = DSocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRFNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbIm1vZGVscy9EU29ja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQTJCO0FBQzNCLFNBQXdCLE9BQU8sQ0FBQyxVQUFrQjtJQUM5QyxPQUFPLENBQXdDLFdBQWMsRUFBRSxFQUFFO1FBQzdELE9BQU8sS0FBTSxTQUFRLFdBQVc7WUFBekI7O2dCQUNLLGdCQUFXLEdBQUcsVUFBVSxDQUFDO1lBQ3JDLENBQUM7U0FBQSxDQUFDO0lBQ04sQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQU5ELDBCQU1DIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6YmFuLXR5cGVzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEU29ja2V0KHNvY2tldE5hbWU6IHN0cmluZyk6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gPFQgZXh0ZW5kcyB7IG5ldyguLi5hcmdzOiBhbnlbXSk6IHt9IH0+KGNvbnN0cnVjdG9yOiBUKSA9PiB7XG4gICAgICAgIHJldHVybiBjbGFzcyBleHRlbmRzIGNvbnN0cnVjdG9yIHtcbiAgICAgICAgICAgIHByaXZhdGUgX3NvY2tldE5hbWUgPSBzb2NrZXROYW1lO1xuICAgICAgICB9O1xuICAgIH07XG59XG4iXX0=