import * as fs from 'fs';
import * as path from 'path';
import * as dbConfig from '../config/config.database';
/**
 * 就是為了要能自動Gen出DB的資料,才有的一個小程式
 * npm 指令會自動生產.json出來,最後會在刪除那個.json的檔案
 * 因為gama-orm那個自動gen的程式目前只能吃.json
 */
const contextDir = path.resolve(__dirname, '../../src/context');
if (!fs.existsSync(contextDir)) {
    fs.mkdirSync(contextDir);
}

const p = path.resolve(__dirname, '../../src/config/genDatabaseConfig.json');
const obj = JSON.stringify(dbConfig.db);

fs.writeFileSync(p, obj, 'utf8');
