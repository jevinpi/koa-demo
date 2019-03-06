const router = require('koa-router')()

const home = require('./index2')
const users = require('./users')

// 嵌套路由
router.use('', home.routes(), home.allowedMethods())
router.use('/users', users.routes(), users.allowedMethods())

module.exports = (app) => {
  app.use(router.routes(), router.allowedMethods())
}