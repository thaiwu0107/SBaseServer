// tslint:disable:ban-types
export default function DSocket(socketName: string): Function {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            private _socketName = socketName;
        };
    };
}
