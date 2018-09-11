# Readme

![](./diagram.png)

## 第一次完整安裝執行加上啟動 && 如果架構變更或是改動太大建議完整乾淨啟動一次,才能早期發現早期治療,建議一段時間就跑一次
注意!這是用ts編譯成js的啟動方式,屬於真正伺服器要跑的形式,不會動態更新你最新的code

Run `npm run server:rebuild`

## 第一次完整安裝執行加上啟動 && 如果架構變更或是改動太大建議完整乾淨啟動一次,才能早期發現早期治療,建議一段時間就跑一次
注意!這是用ts-node啟動,屬於開發時期的動態編譯,儲存時可以馬上動態幫你更新最新的code

Run `npm run start:rebuild`

## 快速啟動,如果你已經完整安裝過了,開發時期不建議長期使用,避免錯誤被隱藏太久
建議一段時間就完整重新安裝一次

Run `npm start`

## 快速啟動動態更新code模式,如果你已經完整安裝過了,開發時期不建議長期使用,避免錯誤被隱藏太久
建議一段時間就完整重新安裝一次

Run `npm run start:live`

## API Mockserver && Swagger文件Server
Swagger 的簡單 Mock Server啟動 預設Port是 4100
如果要看文件也是直接啟動這個Server,它會告訴你怎麼使用Mock跟文件的URL路徑

Run `npm run mockserver`

## 看單元測試的測試報告文件
當然是要先跑一次測試才會有最新的報告文件可以看啊

Run `npm run test:reporter`

## 看Swagger測試的測試報告文件
當然是要先跑一次測試才會有最新的報告文件可以看啊

Run `npm run doc:reporter`

## 清除context裡面的SQL自動Gen出來的依賴文件

Run `npm run rebuild:context`

## 乾淨清除所有Gen出來的依賴
完整清除加上完整重建

Run `npm run clear`

## Unit Test 跟覆蓋率報告

Run `npm test`

## Unit Test Watch 每次存檔都會跑測試

Run `npm run watch:test`

## Build Watch 每次存檔都會跑建置

Run `npm run watch`

## Swagger文件與Server對測
真實Server必須要開啟且是3000Port Mock跟文件Server不必開啟就可以自動對測

Run `npm run doc:test`

## 執行

Run `npm start`

## API文件

Run `npm run doc`

open browser `http://localhost:9000/`

## Run in Docker

build project

`npm build`

build docker image

`docker build -t apiserver .`

run docker

`docker run -p 3100:3100 -v `pwd`/dist:/var/app -v /var/app/node_modules apiserver`

## 相關套件

### InversifyJS
IoC是Inversion Of Control（控制翻轉)

A powerful and lightweight inversion of control container for JavaScript & Node.js apps powered by TypeScript.

InversifyJS is a lightweight (4KB) inversion of control (IoC) container for TypeScript and JavaScript apps. A IoC container uses a class constructor to identify and inject its dependencies. InversifyJS has a friendly API and encourage the usage of the best OOP and IoC practices.
`http://inversify.io/`