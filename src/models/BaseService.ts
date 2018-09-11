import { provide } from '@ggttoo44/base-server';
import * as log4js from 'koa-log4';

@provide('BaseService')
export default class BaseService {
    protected _log = log4js.getLogger(this.constructor.name);
}
