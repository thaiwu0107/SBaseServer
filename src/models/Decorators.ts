// tslint:disable:ban-types
export function Entity(option: any): Function {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            private baseEntityDbName = option.baseEntityDbName;
            private baseEntitytableName = option.baseEntitytableName;
        };
    };
}

export function WorkController(name: any): Function {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        // tslint:disable-next-line:max-classes-per-file
        return class extends constructor {
            private name = name;
        };
    };
}

export function EventController(name: any): Function {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        // tslint:disable-next-line:max-classes-per-file
        return class extends constructor {
            private name = name;
        };
    };
}
