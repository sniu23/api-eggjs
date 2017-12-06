'use strict';

const Service = require('egg').Service
class UserService extends Service {
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
  async login(no, password) {
    const db = this.app.mysql.get('system')
    const row = await db.get('user', { no: no })
    if (!row) {
      this.ctx.throw(200, '无此用户！', { no: no })
    }
    if (row.password !== password) {
      this.ctx.throw(200, '密码错误！', { no: no })
    }
    return {
      no: row.no,
      name: row.name,
      mail: row.mail,
      mobile: row.mobile,
      roleCode: row.roleCode,
      valid: row.valid,
    }
  }

  async changePwd(no, oldPwd, newPwd) {
    const db = this.app.mysql.get('system')    
    const row = await db.get('user', { no: no, password: oldPwd })
    if (!row) {
      this.ctx.throw(200, '原密码错误！', { no: no })
    }
    const result = await db.update('user', { id: row.id, password: newPwd })
    return result.affectedRows
  }

  async register(no, name, password, mail, mobile) {
    const db = this.app.mysql.get('system')    
    const row = await db.get('user', { no: no })
    if (!!row) {
      this.ctx.throw(200, '用户帐号已存在！', { no: no })
    }
    const result = await db.insert('user', { no: no, name: name, password: password, mail: mail, mobile: mobile, roleCode: 'guest', valid: true })
    return result.affectedRows
  }

}

module.exports = UserService