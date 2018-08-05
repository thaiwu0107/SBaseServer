# Readme

## Install && Start(MAC)
確定你的網域跟DB連線IP都正常設定

    npm run start:rebuild

## Install && Start(Windows)
確定你的網域跟DB連線IP都正常設定

    npm install --global --production windows-build-tools typescript ts-node
    npm i
    npm run rebuild:context:win
    ts-node app.ts
    
## Tests
### 單元測試
    npm test
### 文件測試(Dredd嚴格測試Response)
    npm run doctest:dredd
### 文件測試(Newman測試是否有實作)
    npm run doctest:newman

## 相關套件
### InversifyJS
IoC是Inversion Of Control（控制翻轉)

A powerful and lightweight inversion of control container for JavaScript & Node.js apps powered by TypeScript.

InversifyJS is a lightweight (4KB) inversion of control (IoC) container for TypeScript and JavaScript apps. A IoC container uses a class constructor to identify and inject its dependencies. InversifyJS has a friendly API and encourage the usage of the best OOP and IoC practices.
`http://inversify.io/`