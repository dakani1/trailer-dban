const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static= require('koa-static')
const render = require('koa-art-template')
const router = require('./router/index.js')

const app = new Koa()
app.use(static(__dirname + '/public'))
app.use(bodyParser())

render(app, {
  root: path.join(__dirname, 'view'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
})


app.use(router.routes()).use(router.allowedMethods())
const port = process.env.port || 3200
app.listen(port, () => {
  console.log(`Listenting at ${port}`)
})