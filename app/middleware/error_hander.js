'use strict';

module.exports = (options, app) => {
  return async function errorHander(ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.logger.error(err);
      ctx.body = {
        success: false,
        message: err.message || 'catch exception',
      };
    };
  };
};