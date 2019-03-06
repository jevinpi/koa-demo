const { query } = require('./../init/utils/db')

const user = {
  /**
   * 查找用户是否存在
   * @param {object} info 用户数据
   * @return {object}
   */
  async getExistOne(info) {
    let sql = `SELECT * from user where email='${info.email}' or name='${info.name}'`
    let res = await query(sql)
    console.log('查重：：', res)
    if ( res && res.length > 0 ) {
      res = res[0]
    } else {
      res = null
    }
    return res
  },
  /**
   * 创建用户
   * @param {object} info 用户数据信息
   * @return {object}
   */
  async createUser(info) {
    let sql = `INSERT INTO user values (null, '${info.name}', '${info.nick}', '${info.email}', '${info.password}', null)`
    let res = await query(sql)
    return res
  },
  /**
   * 登陆操作
   * @param {object} info 用户数据信息
   * @return {object}
   */
  async signin(info) {
    console.log(333, info)
    let sql = `SELECT * FROM user where name='${info.name}' and password='${info.password}'`
    let res = await query(sql)
    console.log(222, res)
    if (Array.isArray(res) && res.length > 0) {
      res = res[0]
    } else {
      res = null
    }
    return res
  }
}

module.exports = user