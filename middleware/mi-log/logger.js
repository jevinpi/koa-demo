const log4js = require('log4js')
const ip = require('ip')
const access = require('./access')
const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']
// 公共参数
const baseInfo = {
  appLogLevel: 'trace',
  dir: 'logs',
  env: 'dev',
  projectName: 'jevin-log',
  serverIp: ip.address()
}

// 解构获取常量
const { env, appLogLevel, dir, projectName, serverIp } = baseInfo
// 增加常量，用来存储公共信息
const commonInfo = {projectName, serverIp}

module.exports = (options) => {
  
  const contextLogger = {}
  const appenders = {}

  // 配置需要的appender
  appenders.jevin = {
    type: 'dateFile',
    filename: `${dir}/task`,
    pattern: '-yyyy-MM-dd.log',
    alwaysIncludePattern: true
  }

  // 环境变量为 dev local development认为是开发环境
  if (['dev', 'local', 'development'].includes(env)) {
    appenders.out = {
      type: 'console'
    }
  }

  // log4js配置项
  let config = {
    appenders,
    categories: {
      default: {
        appenders:Object.keys(appenders),
        level: appLogLevel
      }
    }
  }

  log4js.configure(config)
  
  const logger = log4js.getLogger('jevin');
  
  return async (ctx, next) => {
    const start = Date.now()
    // 遍历所有日志类型，赋值对象
    for (item of methods) {
      contextLogger[item] = (message) => {
        logger[item](message)
      }
    }
    // 将日志类型赋给上下文,携带各个级别的日志函数
    ctx.log = contextLogger
    
    await next()
    const end = Date.now()
    const responseTime = end - start
    
    logger.info(access(ctx, {
      responseTime: `响应时间为${responseTime}/ms`
    }, commonInfo))
  }
}