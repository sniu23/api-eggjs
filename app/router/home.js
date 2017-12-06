'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/right', controller.home.right);
  router.get('/wrong', controller.home.wrong);
  router.get('/api/ok', controller.home.isOK);
};