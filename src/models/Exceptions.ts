import { BaseExceptions } from '@ggttoo44/base-server';
import * as _ from 'lodash';
import { HttpStatusCode } from '../config/enum.http';

export default class Exceptions extends BaseExceptions<HttpStatusCode> {
    protected setType(): HttpStatusCode {
        return HttpStatusCode as any;
    }
}
