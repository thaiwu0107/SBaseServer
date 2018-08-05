import { BaseHttpStatusCode } from '../config/BaseHttpStatusCode';
import GamaExceptions from './BaseExceptions';

export class LibsExceptions extends GamaExceptions<BaseHttpStatusCode> {
    protected setType(): BaseHttpStatusCode {
        return BaseHttpStatusCode as any;
    }
}
