'use strict';
const route = require('express').Router();
const videoLinkGgCRL = require(`../controller/videoLinkGg.controller.js`);
const { authMiddleware } = require('../../helper/until');
const { BaseRoute } = require('../../helper/baseRoute');
const { ROLE } = require('../../config/role');
const videoLinkGgRouter = function () {
  route.get('/', BaseRoute.routeModify(videoLinkGgCRL.getList));
  route.get('/refresh', BaseRoute.routeModify(videoLinkGgCRL.refresh));
  route.get('/:id', BaseRoute.routeModify(videoLinkGgCRL.getById));
  // route.post('/', BaseRoute.routeModify(videoLinkGgCRL.create))
  route.put(
    '/:id',
    authMiddleware([ROLE.ADMIN]),
    BaseRoute.routeModify(videoLinkGgCRL.update)
  );
  // route.delete('/:id',BaseRoute.routeModify(videoLinkGgCRL.delete))
  return route;
};
module.exports = videoLinkGgRouter;
