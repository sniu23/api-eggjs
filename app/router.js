'use strict';

module.exports = app => {
  require('./router/home')(app);
  require('./router/user')(app);
  require('./router/crud')(app);
  require('./router/role')(app);
  require('./router/page')(app);
  require('./router/power')(app);
};