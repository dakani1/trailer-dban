module.exports = function () {
  let fileName = 'about'
  return async (ctx, next) => {
    try {
      await next()
      console.log(`ctx.status:${ctx.status}`)
      if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404);
    } catch (e) {
      let status = parseInt(e.status)
      // 默认错误信息为 error 对象上携带的 message
      const message = e.message || 'error'
      if (status > 400) {
        switch (status) {
          case 400:
          case 404:
          case 500:
            // fileName = status;
            // 定义页面名称
            fileName = 'error';
            break;
          // 其它错误 指定渲染 other 文件
          default:
            fileName = 'about'
        }
        // 渲染错误页面
        ctx.render(fileName, {
          status,
          message
        })
      }
    }
  }
}