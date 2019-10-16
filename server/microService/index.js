const seneca = require('seneca')()
seneca.use('entity')

seneca.add({role:'math',cmd:'sum'}, (msg, reply) => {
  reply(null, {answer: (msg.left + msg.right)})
})

seneca.add({role:'math',cmd:'sum'}, (msg, reply) => {
  reply(null, {answer: (msg.left * msg.right)})
})

seneca.act({role: 'math', cmd: 'sum', left: 1, right: 2}, function (err, result) {
  if (err) return console.error(err)
  console.log(`result:${JSON.stringify(result)}`)
})

seneca.add({role: 'math', cmd: 'sum', integer: true}, function (msg, respond) {
  var sum = Math.floor(msg.left) + Math.floor(msg.right)
  respond(null, {answer: sum})
})

seneca.act({role: 'math', cmd: 'sum', integer: true, left: 4.5, right: 6.5}, function (err, result) {
  if (err) return console.error(err)
  console.log(`result:${JSON.stringify(result)}`)
})

seneca.act({role: 'math', cmd: 'sum', left: 4.5, right: 6.5}, function (err, result) {
  if (err) return console.error(err)
  console.log(`result:${JSON.stringify(result)}`)
})

var product = seneca.make('product1')
product.name = 'Apple'
product.price = 1.99


product.save$( console.log )