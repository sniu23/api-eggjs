'use strict';

const Controller = require('egg').Controller
class RoleController extends Controller {
/* 
many：ctx.query -> where, columns, orders, limit, offset
    select(where, columns, orders, limit=20, offset=0)
    get(where, columns, orders)
one ：ctx.request.body -> row, ctx.params -> where (keys), ctx.query -> columns, orders
    insert(row, columns)
    update(row, where, columns)
    delete(where)
*/
  async list() {
    const ctx = this.ctx
    const where = JSON.parse(ctx.query.where || null) //
    const columns = JSON.parse(ctx.query.columns || null)  //
    const orders = JSON.parse(ctx.query.orders || null)  //
    const limit = JSON.parse(ctx.query.limit || null)  //
    const offset = JSON.parse(ctx.query.offset || null)  //
    const data = await ctx.service.role.select(where, columns, orders, limit, offset)
    ctx.success(data)
  }

  async get() {
    const ctx = this.ctx
    const where = JSON.parse(ctx.query.where || null) //
    const columns = JSON.parse(ctx.query.columns || null)  //
    const orders = JSON.parse(ctx.query.orders || null)  //
    const data = await ctx.service.role.get(where, columns, orders)
    ctx.success(data)
  }

  async make() {
    const ctx = this.ctx
    const row = ctx.request.body
    const columns = JSON.parse(ctx.query.columns || null)  //
    const result = await ctx.service.role.insert(row, columns)
    if (result.affectedRows === 0) {
      console.log(result)
      throw new Error(`新增权限失败！${result.message}`)
    }
    ctx.success(null, `新增权限成功！`)
  }

  async edit() {
    const ctx = this.ctx
    const row = ctx.request.body
    const where = ctx.params
    const columns = JSON.parse(ctx.query.columns || null)  //
    const result = await ctx.service.role.update(row, where, columns)
    if (result.affectedRows === 0) {
      throw new Error(`编辑权限失败！${result.message}`)
    }
    ctx.success(null, `编辑权限成功！`)
  }

  async drop() {
    const ctx = this.ctx
    const where = ctx.params
    console.log(where)
    const result = await ctx.service.role.delete(where)
    if (result.affectedRows === 0) {
      throw new Error(`删除权限失败！${result.message}`)
    }
    ctx.success(null, `删除权限成功！`)
  }

}
module.exports = RoleController