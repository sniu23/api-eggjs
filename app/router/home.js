'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.get('/wrong', controller.home.wrong);
  router.get('/right', controller.home.right);
  router.get('/error', controller.home.error);
  router.get('/api/ok', controller.home.isOK);
};