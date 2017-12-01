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
  async select(where, columns, orders, limit=20, offset=0) {
    const db = this.app.mysql.get('system')
    const rows = await db.select('role', {
      where: where, columns: columns, orders: orders, limit: limit, offset: offset,      
    })
    const count = await db.count('role', where)
    return { rows, count }
  }

  async get(where, columns, orders) {
    const db = this.app.mysql.get('system')
    const row = await db.get('role', where, {
      columns: columns, orders: orders,
    })
    const total = await db.count('role', where)
    return row
  }

  async insert(row, columns) {
    const db = this.app.mysql.get('system')
    if (Array.isArray(row)) {
      row = row.map(function(item) {
        return item = Object.assign(item, { createdAt: db.literals.now, updatedAt: db.literals.now })
      })
    } else {
      Object.assign(row, { createdAt: db.literals.now, updatedAt: db.literals.now })
    }
    row.createdAt = db.literals.now
    row.updatedAt = db.literals.now
    const result = await db.insert('role', row, { columns: columns })
    return result
  }

  async update(row, where, columns) {
    const db = this.app.mysql.get('system')
    Object.assign(row, { updatedAt: db.literals.now })
    const result = await db.update('role', row, { where: where, columns: columns })
    return result
  }

  async delete(where) {
    const db = this.app.mysql.get('system')
    const result = await db.delete('role', where)
    return result
  }


}
module.exports = RoleService