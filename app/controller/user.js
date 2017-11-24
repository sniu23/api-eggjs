'use strict';

const Controller = require('egg').Controller

class UserController extends Controller {

  // params request.body query session

  async login() {
    const ctx = this.ctx
    const { no, password } = ctx.request.body
    const user = await ctx.service.user.findOne(no)
    if (user.password !== password) {
      ctx.fail('密码错误！')
    }
    ctx.session.user = user
    ctx.success({
      no: user.no,
      name: user.name,
      roleCode: user.roleCode,
      valid: user.valid,
    })
  }

  async logout() {
    const ctx = this.ctx
    ctx.session.user = null
    ctx.success()
  }

  async changePwd() {
    const ctx = this.ctx
    const { no, oldPwd, newPwd } = ctx.request.body    
    const result = await ctx.service.user.changePwd(no, oldPwd, newPwd)
    if (result.affectedRows !== 1) {
      ctx.fail('修改密码失败！',result.message)
    }
    ctx.success(no, '修改密码成功！')
  }

  async navigation() {
    const ctx = this.ctx
    const roleCode = 'guest' 
    const list = await ctx.service.power.findAllRolePage(roleCode)
    ctx.success(list)
  }

}

module.exports = UserController