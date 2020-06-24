'use strict';
const route = require('express').Router();
const challengesCRL = require(`../controller/challenges.controller.js`);
const { authMiddleware } = require('../../helper/until');
const { BaseRoute } = require('../../helper/baseRoute');
const multer = require('multer');
const { ROLE } = require('../../config/role');
const challengesRouter = function () {
  route.get('/', BaseRoute.routeModify(challengesCRL.getList));
  route.get('/:id', BaseRoute.routeModify(challengesCRL.getById));
  route.post(
    '/',
    authMiddleware([ROLE.ADMIN]),
    BaseRoute.routeModify(challengesCRL.create)
  );
  route.put(
    '/:id/file',
    authMiddleware([ROLE.ADMIN]),
    multer().single('file'),
    BaseRoute.routeModify(challengesCRL.addFile)
  );
  route.put(
    '/:id',
    authMiddleware([ROLE.ADMIN]),
    BaseRoute.routeModify(challengesCRL.update)
  );
  route.delete(
    '/:id',
    authMiddleware([ROLE.ADMIN]),
    BaseRoute.routeModify(challengesCRL.delete)
  );
  return route;
};
module.exports = challengesRouter;
