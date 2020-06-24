'use strict'
const route = require('express').Router()
const countIndexCRL = require(`../controller/countIndex.controller.js`)
const { authMiddleware } = require('../../helper/until')
const { BaseRoute } = require('../../helper/baseRoute')
const countIndexRouter = function () {
    route.get('/', BaseRoute.routeModify(countIndexCRL.getList))
    route.get('/:id', BaseRoute.routeModify(countIndexCRL.getById))
    route.post('/', BaseRoute.routeModify(countIndexCRL.create))
    route.put('/:id',BaseRoute.routeModify(countIndexCRL.update))
    route.delete('/:id',BaseRoute.routeModify(countIndexCRL.delete))
    return route
}
module.exports = countIndexRouter