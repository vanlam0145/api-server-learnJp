'use strict'
const route = require('express').Router()
const topicsCRL = require(`../controller/topics.controller.js`)
const { authMiddleware } = require('../../helper/until')
const { BaseRoute } = require('../../helper/baseRoute')
const topicsRouter = function () {
    route.get('/', BaseRoute.routeModify(topicsCRL.getList))
    route.get('/:id', BaseRoute.routeModify(topicsCRL.getById))
    route.post('/', authMiddleware(['admin']), BaseRoute.routeModify(topicsCRL.create))
    route.put('/:id', authMiddleware(['admin']), BaseRoute.routeModify(topicsCRL.update))
    route.delete('/:id', authMiddleware(['admin']), BaseRoute.routeModify(topicsCRL.delete))
    return route
}
module.exports = topicsRouter