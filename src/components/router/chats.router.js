'use strict'
const route = require('express').Router()
const chatsCRL = require(`../controller/chats.controller.js`)
const { authMiddleware } = require('../../helper/until')
const { BaseRoute } = require('../../helper/baseRoute')
const chatsRouter = function () {
    route.get('/', BaseRoute.routeModify(chatsCRL.getList))
    route.get('/:id', BaseRoute.routeModify(chatsCRL.getById))
    route.post('/', BaseRoute.routeModify(chatsCRL.create))
    route.put('/:id',BaseRoute.routeModify(chatsCRL.update))
    route.delete('/:id',BaseRoute.routeModify(chatsCRL.delete))
    return route
}
module.exports = chatsRouter