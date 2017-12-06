'use strict';

module.exports = app => {
  const { router, controller } = app
  router.get('/crud/:database/:table', controller.crud.list)
  router.get('/crud/:database/:table/:id', controller.crud.get)
  router.post('/crud/:database/:table', controller.crud.make)
  router.post('/crud/:database/:table/:id', controller.crud.edit)
  router.del('/crud/:database/:table/:id', controller.crud.drop)
};