'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_{{keys}}';

  // add your config here
  config.middleware = ['errorHander'];

  config.static = {
    prefix: '/',
  };

  config.session = {
    key: 'MY_SESS',
  };

  config.security = {
    domainWhiteList: ['http://127.0.0.1:7001'],
    csrf: false,
  };

  config.mysql = {
    clients: {
      // clientId, access the client instance by app.mysql.get('clientId')
      system: {
        host: '127.0.0.1',
        port: '3306',
        user: 'user',
        password: 'password',
        database: 'database',
      },
      // ...
    },
    // default configuration for all databases
    default: {
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  return config;
};