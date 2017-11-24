'use strict';

const Service = require('egg').Service

class PowerService extends Service {
  async findAllRolePage(roleCode) {
    const db = this.app.mysql.get('system')
    const list = await db.query(`
  SELECT page.path AS path, page.name AS name, page.path AS path, page.father AS father, page.isLeaf AS isLeaf
  FROM power, page
  WHERE power.roleCode = '${roleCode}'
  AND power.valid = true
  AND power.pagePath = page.path
  AND page.valid = true
    `)
    return list
  }

}

module.exports = PowerService