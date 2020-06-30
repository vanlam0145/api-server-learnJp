'use strict';
const route = require('express').Router();
const usersCRL = require(`../controller/users.controller.js`);
const imageGoogleDriveCRL = require('../controller/imageGoogleDrive.controller');
const { authMiddleware } = require('../../helper/until');
const { BaseRoute } = require('../../helper/baseRoute');
const { ROLE_X } = require('../../config/role');
const usersRouter = function () {
  route.get(
    '/',
    authMiddleware(['admin', 'user']),
    BaseRoute.routeModify(usersCRL.getList)
  );
  route.get(
    '/notFriend',
    authMiddleware(['admin', 'user']),
    BaseRoute.routeModify(usersCRL.notFriend)
  );
  route.get(
    '/senderAddFriend',
    authMiddleware(['admin', 'user']),
    BaseRoute.routeModify(usersCRL.senderAddFriend)
  );
  route.get(
    '/requestAddFriend',
    authMiddleware(['admin', 'user']),
    BaseRoute.routeModify(usersCRL.requestAddFriend)
  );

  route.post('/', BaseRoute.routeModify(usersCRL.create));
  route.post('/login', BaseRoute.routeModify(usersCRL.login));
  route.get(
    '/me',
    authMiddleware(['user', 'admin']),
    BaseRoute.routeModify(usersCRL.me)
  );
  route.get(
    '/get-courses-latest',
    authMiddleware(['user', 'admin']),
    BaseRoute.routeModify(usersCRL.getCourseLatest)
  );
  //avartar
  route.put(
    '/setAvartar/:idimage',
    authMiddleware(['user', 'admin']),
    BaseRoute.routeModify(usersCRL.setAvartar)
  );
  //image
  route.post(
    '/image',
    authMiddleware(['user', 'admin']),
    BaseRoute.routeModify(usersCRL.addImage)
  );
  route.get(
    '/image',
    authMiddleware(['user', 'admin']),
    BaseRoute.routeModify(imageGoogleDriveCRL.getImageOfUser)
  );
  route.post('/resetPassword', BaseRoute.routeModify(usersCRL.resetPassword));
  route.delete(
    '/image/:id',
    authMiddleware(['user', 'admin']),
    BaseRoute.routeModify(usersCRL.deleteImage)
  );
  route.delete(
    '/:id',
    authMiddleware(['admin']),
    BaseRoute.routeModify(usersCRL.delete)
  );
  //route.put('/:id',authMiddleware(['admin','user']),BaseRoute.routeModify())
  route.get('/:id', BaseRoute.routeModify(usersCRL.getById));
  route.put(
    '/:id/changePass',
    authMiddleware(['user', 'admin']),
    BaseRoute.routeModify(usersCRL.changePass)
  );
  route.put(
    '/:id/block',
    authMiddleware(['admin']),
    BaseRoute.routeModify(usersCRL.block)
  );

  return route;
};
module.exports = usersRouter;
