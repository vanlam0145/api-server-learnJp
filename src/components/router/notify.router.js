'use strict'
const route = require('express').Router()
const notifyCRL = require(`../controller/notify.controller.js`)
const { authMiddleware } = require('../../helper/until')
const { BaseRoute } = require('../../helper/baseRoute')
const { ROLE_X } = require('../../config/role')
const notifyRouter = function () {
    route.get('/', authMiddleware(ROLE_X.ADMIN_USER), BaseRoute.routeModify(notifyCRL.getList))
    route.get('/:id', authMiddleware(ROLE_X.ADMIN_USER), BaseRoute.routeModify(notifyCRL.getById))
    route.post('/', authMiddleware(ROLE_X.ADMIN_USER), BaseRoute.routeModify(notifyCRL.create))
    route.put('/:id', authMiddleware(ROLE_X.ADMIN_USER), BaseRoute.routeModify(notifyCRL.update))
    route.delete('/:id', authMiddleware(ROLE_X.ADMIN_USER), BaseRoute.routeModify(notifyCRL.delete))
    return route
}
module.exports = notifyRouter