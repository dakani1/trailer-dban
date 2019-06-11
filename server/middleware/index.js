const miSend = require('./mi-send/index.js')

module.exports = function (app) {
    app.use(miSend())
}