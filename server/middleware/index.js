// 中间件引入方式一
const path = require('path')
const miSend = require('./mi-send/index.js')
const miHttpError = require('./mi-http-error/index.js')
const miRules = require('./miRules/index.js')
module.exports = function (app) {
  app.use(miRules({
    app,
    rules: [
      {
        name: 'service',
        path: path.resolve(__dirname, '../service/')
      },
      {
        name: 'controller',
        path: path.resolve(__dirname, '../controller/')
      }
    ]
  }))
  app.use(miHttpError())
  app.use(miSend())
}

// 中间件引入方式二
// 路由配置
// const reqList = [
//   {
//     name: 'miSend',
//     path: './mi-send/index.js'
//   },
//   {
//     name: 'miHttpError',
//     path: './mi-http-error/index.js'
//   },
//   {
//     name: 'miRules',
//     path: './miRules/index.js'
//   }
// ]

// let execJson = {}

// for (let item of reqList) {
//   execJson[item.name] = require(item.path)
// }

// module.exports = function (app) {
//   for (let item in execJson) {
//     app.use(execJson[item]())
//   }
// }

// controller和service服务添加

