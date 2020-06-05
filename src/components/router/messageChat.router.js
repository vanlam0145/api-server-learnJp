'use strict';
const route = require('express').Router();
const messageChatCRL = require(`../controller/messageChat.controller.js`);
const { authMiddleware } = require('../../helper/until');
const { BaseRoute } = require('../../helper/baseRoute');
const messageChatRouter = function () {
  //route.get('/', BaseRoute.routeModify(messageChatCRL.getList));
  route.get(
    '/ofFriend',
    authMiddleware(['admin', 'user']),
    BaseRoute.routeModify(messageChatCRL.ofFriend)
  );
//   route.get('/:id', BaseRoute.routeModify(messageChatCRL.getById));
//   route.post('/', BaseRoute.routeModify(messageChatCRL.create));
//   route.put('/:id', BaseRoute.routeModify(messageChatCRL.update));
//   route.delete('/:id', BaseRoute.routeModify(messageChatCRL.delete));
  return route;
};
module.exports = messageChatRouter;
