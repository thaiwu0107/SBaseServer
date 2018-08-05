// tslint:disable:ban-types
export default function Entity(option: any): Function {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            private baseEntityDbName = option.baseEntityDbName;
            private baseEntitytableName = option.baseEntitytableName;
        };
    };
}
