'use strict';

const Controller = require('egg').Controller

class UserController extends Controller {

  async list() {
    await this.ctx.iGet(`http://127.0.0.1:7001/crud/system/user/`, this.ctx.query)
  }

  async get() {
    await this.ctx.iGet(`http://127.0.0.1:7001/crud/system/user/${this.ctx.params.id}`)
  }

  async make() {
    const ctx = this.ctx
    await this.ctx.iPost(`http://127.0.0.1:7001/crud/system/user/`, this.ctx.request.body)
  }

  async edit() {
    const ctx = this.ctx
    await this.ctx.iPost(`http://127.0.0.1:7001/crud/system/user/${ctx.params.id}`, this.ctx.request.body)
  }

  async drop() {
    const ctx = this.ctx
    await this.ctx.iDel(`http://127.0.0.1:7001/crud/system/user/${ctx.params.id}`)
  }

  async login() {
    const ctx = this.ctx
    const { no, password } = ctx.request.body
    const user = await ctx.service.user.login(no, password)
    ctx.session.user = user
    ctx.success(user)
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
    ctx.success(no, '修改密码成功！')
  }

  async register() {
    const ctx = this.ctx
    const { no, name, password, mail, mobile } = ctx.request.body
    const user = await ctx.service.user.register(no, name, password, mail, mobile)
    ctx.success(no, '注册成功！')
  }

  async navigation() {
    const ctx = this.ctx
    const roleCode = 'guest'
    const list = await ctx.service.power.listRolePage(roleCode)
    ctx.success(list)
  }

}

module.exports = UserController