const fs = require('fs')
const path = require('path')
const { query } = require('./utils/db')

// 执行初始化sql脚本
const sqlPath = path.join(__dirname, '/sql')
let files = fs.readdirSync(sqlPath)

for (let item of files) {
  try {
    const sql = fs.readFileSync(path.join(sqlPath, item), 'utf8')
    query(sql)
  } catch (e) {
    console.log(e)
  } finally {
    console.log('初始化脚本成功，请按Ctrl+C退出')
  }
}