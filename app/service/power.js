'use strict';

const Service = require('egg').Service

class PowerService extends Service {
  async listRolePage(roleCode) {
    const db = this.app.mysql.get('system')
    const rows = await db.query(`
SELECT page.path AS path, page.name AS name, page.icon AS icon, page.father AS father
FROM power, page
WHERE power.roleCode = '${roleCode}'
AND power.valid = true
AND power.pagePath = page.path
AND page.valid = true
`)
    return rows
  }

}

module.exports = PowerService