'use strict';

module.exports = app => {
  const { router, controller } = app
  router.post('/api/user/login', controller.user.login)
  router.post('/api/user/logout', controller.user.logout)
  router.post('/api/user/password', controller.user.changePwd)
  router.get('/api/user/navigation', controller.user.navigation)
  router.post('/api/user/register', controller.user.register)
};