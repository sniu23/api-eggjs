'use strict';

module.exports = app => {
  const { router, controller } = app
  router.get('/api/role', controller.role.list)
  router.get('/api/role/:id', controller.role.get)
  router.post('/api/role', controller.role.make)
  router.post('/api/role/:id', controller.role.edit)
  router.del('/api/role/:id', controller.role.drop)
};