const userModel = require('./../models/user')
const validator = require('validator')

const user = {
  /**
   * 创建用户
   * @param {object} info 
   */
  async create(info) {
    let result = await userModel.createUser(info)
    return result
  },
  async getExistOne(userInfo) {
    let result = await userModel.getExistOne({
      email: userInfo.email,
      name: userInfo.name
    })
    return result
  },
  /**
   * 验证注册信息是否符合规则
   * @param {*} userInfo 
   */
  validatorSignUp( userInfo ) {
    let result = {
      success: false,
      message: '',
    }
    if ( !userInfo.name || /[a-z0-9\_\-]{6,16}/.test(userInfo.name) === false ) {
      result.message = '用户名不符合'
      return result
    }
    if ( !validator.isEmail( userInfo.email ) ) {
      result.message = '邮箱不符合规则'
      return result
    }
    if ( !userInfo.email ) {
      result.message = '邮箱不能为空'
      return result
    }
    if (!userInfo.password || !/[\w+]{6,16}/.test( userInfo.password )  ) {
      result.message = '密码长度至少为6'
      return result
    }
    if ( userInfo.password !== userInfo.confirmPassword ) {
      result.message = '两次密码不一致'
      return result
    }

    result.success = true

    return result
  },
  /**
   * 登陆操作
   * @param {object} userInfo 
   */
  async signin(userInfo) {
    let result = await userModel.signin({
      name: userInfo.name,
      password: userInfo.password
    })
    return result
  }
}

module.exports = user