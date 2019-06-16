const Router = require('koa-router')
const router = new Router()
const path = require('path')

const mysql = require('mysql')
var pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'mysql'
});

router.get('/', async (ctx, next) => {
  console.log(ctx.query.name)
  const limitNum = 5
  const result = await getDb(`SELECT * from help_topic where name like '${ctx.query.name}%' limit ${limitNum}`)
  console.log(result)
  if (result) {
    ctx.send(result, {
      'Content-Type': 'text/plain'
    })
  } else {
    ctx.body = 'error'
  }
})

function getDb(sql) {
  return new Promise((resolve, reject) => {
    pool.query(sql, function (err, results, fields) {
      if (err) {
        console.log(3333)
        resolve(err)
      }
      resolve(results)
    })
  })
}

router.get('/about', async (ctx, next) => {
  console.log()
  ctx.render('about', {
    ip: ctx.ip,
    name: 12
  })
})

router.get('*', async (ctx, next) => {
  ctx.redirect('/')
})

module.exports = router