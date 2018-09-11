import { provide } from '@ggttoo44/base-server';
import 'reflect-metadata';
import { Constant } from '../../config/Constant';

@provide('PublishController')
export default class PublishController {
    public async on(channel: string, data: any): Promise<any> {
        //
    }
    public async join(data: any): Promise<any> {
        //
    }
    public async leave(data: any): Promise<any> {
        //
    }
}
