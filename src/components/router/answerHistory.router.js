'use strict';
const route = require('express').Router();
const answerHistoryCRL = require(`../controller/answerHistory.controller.js`);
const { authMiddleware } = require('../../helper/until');
const { BaseRoute } = require('../../helper/baseRoute');

const { ROLE_X } = require('../../config/role');
const answerHistoryRouter = function () {
  route.get(
    '/',
    authMiddleware(ROLE_X.ADMIN_USER),
    BaseRoute.routeModify(answerHistoryCRL.getList)
  );
  route.get(
    '/:id',
    authMiddleware(ROLE_X.ADMIN_USER),
    BaseRoute.routeModify(answerHistoryCRL.getById)
  );
  route.post(
    '/',
    authMiddleware(ROLE_X.ADMIN_USER),
    BaseRoute.routeModify(answerHistoryCRL.create)
  );
  route.put(
    '/:id',
    authMiddleware(ROLE_X.ADMIN_USER),
    BaseRoute.routeModify(answerHistoryCRL.update)
  );
  route.delete(
    '/:id',
    authMiddleware(ROLE_X.ADMIN_USER),
    BaseRoute.routeModify(answerHistoryCRL.delete)
  );
  return route;
};
module.exports = answerHistoryRouter;
