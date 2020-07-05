'use strict';
const route = require('express').Router();
const courseCRL = require(`../controller/course.controller.js`);
const { authMiddleware } = require('../../helper/until');
const { BaseRoute } = require('../../helper/baseRoute');
const { ROLE_X } = require('../../config/role');
const courseRouter = function () {
  route.get('/', BaseRoute.routeModify(courseCRL.getList));
  route.get(
    '/:id',
    authMiddleware(ROLE_X.ADMIN_USER),
    BaseRoute.routeModify(courseCRL.getById)
  );
  route.get(
    '/:id/learn',
    authMiddleware(ROLE_X.ADMIN_USER),
    BaseRoute.routeModify(courseCRL.learn)
  );
  route.post(
    '/',
    authMiddleware(ROLE_X.ADMIN_USER),
    BaseRoute.routeModify(courseCRL.create)
  );
  route.delete(
    '/:id',
    authMiddleware(ROLE_X.ADMIN_USER),
    BaseRoute.routeModify(courseCRL.delete)
  );
  route.put(
    '/set-contents',
    authMiddleware(ROLE_X.ADMIN_USER),
    BaseRoute.routeModify(courseCRL.updateContentOnCourse)
  );
  route.put(
    '/:id/addContent',
    authMiddleware(ROLE_X.ADMIN_USER),
    BaseRoute.routeModify(courseCRL.addContent)
  );
  // route.delete('/content', usersCRL.au(), courseCRL.deleteContentCourse)
  return route;
};
module.exports = courseRouter;
