'use strict';

module.exports = app => {
  require('./router/home')(app);
  require('./router/user')(app);
};