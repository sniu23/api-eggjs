'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, gays~';
  }

  async isOK() {
    this.ctx.success('im fine')
  }

  async right() {
    this.ctx.success('test_success')
  }

  async wrong() {
    // throw new Error('test_error')
    this.ctx.throw(400, 'test_wrong', { data: 'info' })
  }

}

module.exports = HomeController;