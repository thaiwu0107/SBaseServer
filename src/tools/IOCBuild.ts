import * as fs from 'fs';
import * as path from 'path';
/**
 * 自動處理ioc-lodder註冊
 */
const contextDir = path.resolve(__dirname, '../../src/container');
if (!fs.existsSync(contextDir)) {
    fs.mkdirSync(contextDir);
}
const iocpath = path.resolve(__dirname, '../../src/container/ioc-loader.ts');
console.log('Auto Gen Ioc-loader');
const allDir = fs.readdirSync(path.resolve(__dirname, '../../src/services'), 'utf8');
fs.writeFileSync(iocpath, [], 'utf8');
allDir.forEach((adata) => {
    if (adata !== '.DS_Store') {
        fs.appendFileSync(iocpath, `export * from '../services/${adata}/Controller';\n`);
    }
});
