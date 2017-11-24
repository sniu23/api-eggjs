'use strict';

const USER = Symbol('Context#user');

module.exports = {
  get user() {
    if (!this[USER]) {
      this[USER] = this.session.user;
    }
    return this[USER];
  },

  success(data, message) {
    // get 返回data, post 返回 message
    this.body = {
      success: true,
      data,
      message,
    };
  },

  fail(message, data) {
    this.body = {
      success: false,
      message: message || 'fail',
      data,
    }
  }

};