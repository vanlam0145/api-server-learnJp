'use strict';
const route = require('express').Router();
const contentCRL = require(`../controller/content.controller.js`);
const { authMiddleware, queryMiddleware } = require('../../helper/until');
const { BaseRoute } = require('../../helper/baseRoute');
const { ROLE_X } = require('../../config/role');
const contentRouter = function () {
  //   route.get(
  //     '/',
  //     [authMiddleware(ROLE_X.ADMIN_USER), queryMiddleware()],
  //     BaseRoute.routeModify(contentCRL.getList)
  //   );
  route.put(
    '/:id/triggerAnswer',
    authMiddleware(ROLE_X.ADMIN_USER),
    BaseRoute.routeModify(contentCRL.triggerAnswer)
  );
  route.get('/:id', authMiddleware(ROLE_X.ADMIN_USER), BaseRoute.routeModify(contentCRL.getById));
  //route.post('/', authMiddleware(ROLE_X.ADMIN_USER), BaseRoute.routeModify(contentCRL.create));
  route.put('/:id', authMiddleware(ROLE_X.ADMIN_USER), BaseRoute.routeModify(contentCRL.update));
  route.delete('/:id', authMiddleware(ROLE_X.ADMIN_USER), BaseRoute.routeModify(contentCRL.delete));
  return route;
};
module.exports = contentRouter;
