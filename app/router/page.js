'use strict';

module.exports = app => {
  const { router, controller } = app
  router.get('/api/page', controller.page.list)
  router.get('/api/page/:id', controller.page.get)
  router.post('/api/page', controller.page.make)
  router.post('/api/page/:id', controller.page.edit)
  router.del('/api/page/:id', controller.page.drop)
};