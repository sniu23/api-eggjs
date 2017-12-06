'use strict';

module.exports = app => {
  const { router, controller } = app
  router.get('/api/power', controller.power.list)
  router.get('/api/power/:id', controller.power.get)
  router.post('/api/power', controller.power.make)
  router.post('/api/power/:id', controller.power.edit)
  router.del('/api/power/:id', controller.power.drop)
};