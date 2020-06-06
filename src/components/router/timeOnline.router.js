'use strict';
const route = require('express').Router();
const timeOnlineCRL = require(`../controller/timeOnline.controller.js`);
const { authMiddleware, queryMiddleware } = require('../../helper/until');
const { BaseRoute } = require('../../helper/baseRoute');
const { ROLE_X } = require('../../config/role');
const timeOnlineRouter = function () {
  route.get('/', [authMiddleware(ROLE_X.ADMIN_USER),queryMiddleware()], BaseRoute.routeModify(timeOnlineCRL.getList));
  route.get(
    '/:id',
    authMiddleware(ROLE_X.ADMIN_USER),
    BaseRoute.routeModify(timeOnlineCRL.getById)
  );
  route.post('/', authMiddleware(ROLE_X.ADMIN_USER), BaseRoute.routeModify(timeOnlineCRL.create));
  route.put('/:id', authMiddleware(ROLE_X.ADMIN_USER), BaseRoute.routeModify(timeOnlineCRL.update));
  route.delete(
    '/:id',
    authMiddleware(ROLE_X.ADMIN_USER),
    BaseRoute.routeModify(timeOnlineCRL.delete)
  );
  return route;
};
module.exports = timeOnlineRouter;
