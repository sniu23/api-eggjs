'use strict';

const USER = Symbol('Context#user');

module.exports = {
  // get user() {
  //   if (!this[USER]) {
  //     this[USER] = this.session.user;
  //   }
  //   return this[USER];
  // },

  success(data, message) {
    // get 返回data, post 返回 message
    this.body = {
      success: true,
      data,
      message,
    }
  },

  // fail(message, data) {
  //   this.body = {
  //     success: false,
  //     message: message || 'fail',
  //     data,
  //   }
  // }

  async iGet(uri, data) {
    const result = await this.curl(uri, {
      contentType: 'json',
      data: data,
      dataAsQueryString: true,
      dataType: 'json',
    })
    this.status = result.status
    this.set(result.headers)
    this.body = result.data
  },

  async iPost(uri, data) {
    const result = await this.curl(uri, {
      method: 'POST',
      contentType: 'json',
      data: data,
      dataType: 'json',
    })
    // this.status = result.status
    this.set(result.headers)
    this.body = result.data
  },

  async iDel(uri, data) {
    const result = await this.curl(uri, {
      method: 'DELETE',
      contentType: 'json',
      data: data,
      dataType: 'json',
    })
    // this.status = result.status
    this.set(result.headers)
    this.body = result.data
  },


};