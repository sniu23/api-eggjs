'use strict';

module.exports = app => {
  const { router, controller } = app
  router.get('/api/user', controller.user.list)
  router.get('/api/user/:id', controller.user.get)
  router.post('/api/user', controller.user.make)
  router.post('/api/user/:id', controller.user.edit)
  router.del('/api/user/:id', controller.user.drop)

  router.post('/api/login', controller.user.login)
  router.post('/api/logout', controller.user.logout)
  router.post('/api/password', controller.user.changePwd)
  router.post('/api/register', controller.user.register)
  router.get('/api/navigation', controller.user.navigation)
};