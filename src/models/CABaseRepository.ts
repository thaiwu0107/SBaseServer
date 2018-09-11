import { BaseRepository } from '@ggttoo44/base-server';
import config from '../config/config.app';

export default class CABaseRepository extends BaseRepository {
    constructor() {
        super(config.ca);
    }
}
