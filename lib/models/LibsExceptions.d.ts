import { BaseHttpStatusCode } from '../config/BaseHttpStatusCode';
import GamaExceptions from './BaseExceptions';
export declare class LibsExceptions extends GamaExceptions<BaseHttpStatusCode> {
    protected setType(): BaseHttpStatusCode;
}
