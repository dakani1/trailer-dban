const fs = require('fs')
const Path = require('path')
module.exports = function (options) {
  return async (ctx, next) => {
    let {app, rules} = options
    // 如果参数缺少实例 app，则抛出错误
    if (!app) {
      throw new Error("the app params is necessary!")
    }
    var appKeys = Object.keys(app)
    rules.forEach((item, key) => {
      let { name, path } = item
      if (appKeys.includes(name)) {
        throw new Error(`the name of ${name} already exists!`)
      }
      const fileArr = fs.readdirSync(path)

      if (fileArr && Array.isArray(fileArr) && fileArr.length > 0) {
        let context = {}
        fileArr.forEach((file, key) => {
          let extName = Path.extname(file)
          if (extName === '.js') {
            let baseName = Path.basename(file, extName)
            context[baseName] = require(Path.resolve(path, file))
          }
        })
        app[name] = context;
      }
    })
    await next()
  }
  
}
// [
//     {
//         path: path.join(__dirname, '../controller'),
//         name: 'controller'
//     },
//     {
//         path: path.join(__dirname, '../service'),
//         name: 'service'
//     }
// ]