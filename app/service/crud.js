'use strict';

const Service = require('egg').Service
class RoleService extends Service {
/*
*query(sql, values)
*queryOne(sql, values)
*select(table, options)
*get(table, where, options)
*insert(table, row[s], options)
*update(table, row, options)
*delete(table, where)
*count(table, where)
*/
  async select(database, table, where, columns, orders, limit=20, offset=0) {
    const db = this.app.mysql.get(database)
    const rows = await db.select(table, {
      where: where, columns: columns, orders: orders, limit: limit, offset: offset,      
    })
    const count = await db.count(table, where)
    return { rows, count }
  }

  async get(database, table, where, columns, orders) {
    const db = this.app.mysql.get(database)
    const row = await db.get(table, where, {
      columns: columns, orders: orders,
    })
    const total = await db.count(table, where)
    return row
  }

  async insert(database, table, row, columns) {
    const db = this.app.mysql.get(database)
    if (Array.isArray(row)) {
      row = row.map(function(item) {
        return item = Object.assign(item, { createdAt: db.literals.now, updatedAt: db.literals.now })
      })
    } else {
      Object.assign(row, { createdAt: db.literals.now, updatedAt: db.literals.now })
    }
    row.createdAt = db.literals.now
    row.updatedAt = db.literals.now
    const result = await db.insert(table, row, { columns: columns })
    return result
  }

  async update(database, table, row, where, columns) {
    const db = this.app.mysql.get(database)
    Object.assign(row, { updatedAt: db.literals.now })
    const result = await db.update(table, row, { where: where, columns: columns })
    return result
  }

  async delete(database, table, where) {
    const db = this.app.mysql.get(database)
    const result = await db.delete(table, where)
    return result
  }


}
module.exports = RoleService