// 中间件引入方式一
// const miSend = require('./mi-send/index.js')
// const miHttpError = require('./mi-http-error/index.js')

// module.exports = function (app) {
//     app.use(miSend())
//     app.use(miHttpError())
// }

// 中间件引入方式二
const reqList = [
  {
    name: 'miSend',
    path: './mi-send/index.js'
  },
  {
    name: 'miHttpError',
    path: './mi-http-error/index.js'
  }
]

let execJson = {}

for (let item of reqList) {
  execJson[item.name] = require(item.path)
}

module.exports = function (app) {
  for (let item in execJson) {
    app.use(execJson[item]())
  }
}