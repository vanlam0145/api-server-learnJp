'use strict'
const route = require('express').Router()
const reportUserCRL = require(`../controller/reportUser.controller.js`)
const { authMiddleware } = require('../../helper/until')
const { BaseRoute } = require('../../helper/baseRoute')
const reportUserRouter = function () {
    route.get('/', authMiddleware(['admin']), BaseRoute.routeModify(reportUserCRL.getList))
    route.get('/:id', reportUserCRL.getById)
    route.post('/', authMiddleware(['admin', 'user']), BaseRoute.routeModify(reportUserCRL.create))
    route.put('/:id', authMiddleware(['admin', 'user']), BaseRoute.routeModify(reportUserCRL.update))
    route.delete('/:id', authMiddleware(['admin', 'user']), BaseRoute.routeModify(reportUserCRL.deleteOne))
    return route
}
module.exports = reportUserRouter