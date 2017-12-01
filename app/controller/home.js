'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, gays~';
  }

  async isOK() {
    this.ctx.success('im fine')
  }

  // async wrong() {
  //   this.ctx.fail('test_fail')
  // }

  async right() {
    this.ctx.success('test_success')
  }

  async error() {
    throw new Error('test_error')
  }

}

module.exports = HomeController;