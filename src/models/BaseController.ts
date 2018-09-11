import { provide } from '@ggttoo44/base-server';
import * as log4js from 'koa-log4';

@provide('BaseController')
export default abstract class BaseController {
    protected _log = log4js.getLogger(this.constructor.name);
}
