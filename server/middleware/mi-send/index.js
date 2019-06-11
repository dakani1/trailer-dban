module.exports = function () {
  function render (data, options) {
    let Opt = {
      'Content-Type': 'application/json'
    }
    Object.assign(Opt, options)
    for (let item in Opt) {
      this.set(item, Opt[item])
    }
    this.body = ''
    this.body = {
      resCode: this.status,
      data: data
    }
  }
  return async (ctx, next) => {
    ctx.send = render.bind(ctx)
    await next()
  }
}