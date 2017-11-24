'use strict';

const Service = require('egg').Service

// findAll findAndCount findOne findById count max min sum
// findOrBuild findOrCreate
// build create bulkCreate update upsert destroy describe

class RoleService extends Service {
  async findAllCount(columns, where, order, limit=20, offset=0) {
    const db = this.app.mysql.get('system')
    const roles = await db.select('role', {
      columns,
      where,
      limit,
      offset,
    })
    const total = await db.count('role', where)
    return { roles, total}
  }

  async findOne(no) {
    const db = this.app.mysql.get('system')
    const user = await db.get('user', {no})
    if (!user) throw new Error(`无此用户名！（${no}）`)
    return user
  }

  async changePwd(no, oldPwd, newPwd) {
    const db = this.app.mysql.get('system')
    const result = await db.update('user', {
      no: no,
      password: newPwd,
      updatedAt: db.literals.now,
    }, {
      where: {
        no: no,
        password: oldPwd,
      },
      columns: ['password', 'updatedAt']
    })
    return result
  }

}

module.exports = RoleService