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
    const database = ctx.params.database
    const table = ctx.params.table
    const where = JSON.parse(ctx.query.where || null) //
    const columns = JSON.parse(ctx.query.columns || null)  //
    const orders = JSON.parse(ctx.query.orders || null)  //
    const limit = JSON.parse(ctx.query.limit || null)  //
    const offset = JSON.parse(ctx.query.offset || null)  //
    const data = await ctx.service.crud.select(database, table, where, columns, orders, limit, offset)
    ctx.success(data)
  }

  async get() {
    const ctx = this.ctx
    const database = ctx.params.database
    const table = ctx.params.table
    const id = ctx.params.id
    const columns = JSON.parse(ctx.query.columns || null)  //
    const orders = JSON.parse(ctx.query.orders || null)  //
    const data = await ctx.service.crud.get(database, table, { id }, columns, orders)
    ctx.success(data)
  }

  async make() {
    const ctx = this.ctx
    const database = ctx.params.database
    const table = ctx.params.table
    const row = ctx.request.body
    const columns = JSON.parse(ctx.query.columns || null)  //
    const result = await ctx.service.crud.insert(database, table, row, columns)
    if (result.affectedRows === 0) {
      ctx.throw(200, '新增失败！', { message: `${table}_insert_fail` })
    }
    ctx.success(null, `新增成功！`)
  }

  async edit() {
    const ctx = this.ctx
    const database = ctx.params.database
    const table = ctx.params.table
    const row = ctx.request.body
    const id = ctx.params.id
    const columns = JSON.parse(ctx.query.columns || null)  //
    const result = await ctx.service.crud.update(database, table, row, { id }, columns)
    if (result.affectedRows === 0) {
      ctx.throw(200, '编辑失败！', { message: `${table}_update_${ id || 'null' }_fail` })
    }
    ctx.success(null, `编辑成功！`)
  }

  async drop() {
    const ctx = this.ctx
    const database = ctx.params.database
    const table = ctx.params.table
    const id = ctx.params.id
    const result = await ctx.service.crud.delete('system', table, { id })
    if (result.affectedRows === 0) {
      ctx.throw(200, '删除失败！', { message: `${table}_delete_${ id || 'null' }_fail` })
    }
    ctx.success(null, `删除成功！`)
  }

}
module.exports = RoleController