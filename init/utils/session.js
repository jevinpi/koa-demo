
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

let store = new MysqlSession({
  user: 'root',
  password: 'admin',
  database: 'test',
  host: '127.0.0.1'
})

let cookie = {
  maxAge: '',
  expires: '',
  path: '',
  domain: '',
  httpOnly: '',
  overwrite: '',
  secure: '',
  sameSite: '',
  signed: ''
}

module.exports = (app) => {
  app.use(session({
    key: 'JEVIN',
    store,
    cookie
  }))
}