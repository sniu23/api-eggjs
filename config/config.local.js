'use strict';

module.exports = {
  onerror: {
    html(err, ctx) {
      // html hander
      this.body = '<h2>500</h2><span>unexcept_server_error</span>';
      this.status = 500;
    },
    json(err, ctx) {
      // json hander
      this.body = {
        success: false,
        message: 'unexcept_server_error',
        data: '',
      };
      this.status = 500;
    },
  },
};