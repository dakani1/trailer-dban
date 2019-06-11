module.exports = function () {
  return async (ctx, next) => {
    ctx.type = 'text/plain'
    ctx.send = function (data) {
      ctx.body = ''
      ctx.body = {
        resCode: ctx.status,
        data: data
      }
    }
    await next()
  }
}