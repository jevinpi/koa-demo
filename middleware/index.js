/**
 * 中间件的调用
 */
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')

const session = require('./../init/utils/session')
const router = require('./../routes/index')
const useLogger = require('./mi-log')
// 运行目录
const basePath = path.join(__dirname, './../')

module.exports = (app) => {
  // 错误监听
  onerror(app)
  // 格式化post请求
  app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
  }))
  app.use(useLogger())
  app.use(async (ctx, next) => {
    try {
      await next()
        if (ctx.response.status == 404) {
        ctx.throw(404)
      }
    } catch (error) {
      ctx.log.error(error)
    }
  })
  app.use(json())
  app.use(logger())
  app.use(require('koa-static')(basePath + '/public'))
  
  app.use(views(basePath + '/views', {
    map: {
      html: 'pug'
    }
  }))
  
  // 日志
  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })

  // session
  session(app)

  // 路由
  router(app)
}
