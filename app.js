const Koa = require('koa')
const app = new Koa()

// 中间件
const middleware = require('./middleware/')
middleware(app)

// 异常监听
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
