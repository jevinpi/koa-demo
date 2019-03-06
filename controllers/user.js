const userService = require('./../services/user')

module.exports = {
  async signUp(ctx) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null
    }
    // 验证注册信息是否符合规则
    let validateResult = userService.validatorSignUp(formData)
    if ( !validateResult.success ) {
      result = validateResult
      ctx.body = result
      return
    }
    // 验证注册用户名或者邮箱是否存在
    let getExistResult = await userService.getExistOne(formData)
    if (getExistResult) {
      if (getExistResult.email === formData.email) {
        result.message = '邮箱已被注册'
      } else {
        result.message = '用户名已被注册'
      }
      ctx.body = result
      return
    }

    // 创建用户
    let createResult = await userService.create({
      email: formData.email,
      name: formData.name,
      nick: formData.nick || '',
      password: formData.password,
      create_time: new Date().getTime()
    })

    if ( createResult && createResult.insertId > 0 ) {
      result.code = 200
      result.message = '注册成功'
    } else {
      result.code = 300
      result.message = '系统错误'
    }
    ctx.body = result
  },
  /**
   * 登陆
   * @param {object} ctx  上下文描述 
   */
  async signin(ctx) {
    let formData = ctx.request.body
    let result = {
      code: 200,
      message: ''
    }

    let res = await userService.signin(formData)
    if (res) {
      result.message = '登陆成功'
      ctx.session = {
        isLogin: true,
        name: res.name
      }
    } else {
      result.code = 401
      result.message = '用户名和密码不符'
    }
    ctx.body = result
  },
  /**
   * 检查登陆状态
   * @param {object} ctx 上下文描述
   */
  async checkLogin(ctx) {
    ctx.log.info('check login status')
    console.log('************', ctx.response)
    ctx.body = Object.assign({code: 200, message: '在线'}, ctx.session)
  }
}