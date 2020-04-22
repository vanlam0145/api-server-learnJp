'use strict'
const route = require('express').Router()
const alphabetCRL = require(`../controller/alphabet.controller.js`)
const { authMiddleware } = require('../../helper/until')
const { BaseRoute } = require('../../helper/baseRoute')
const alphabetRouter = function () {
    route.get('/', BaseRoute.routeModify(alphabetCRL.getList))
    route.get('/:id', BaseRoute.routeModify(alphabetCRL.getById))
    //route.post('/', BaseRoute.routeModify(alphabetCRL.create))
    route.put('/:id', authMiddleware(['admin']), BaseRoute.routeModify(alphabetCRL.update))
    //route.delete('/:id',BaseRoute.routeModify(alphabetCRL.delete))
    return route
}
module.exports = alphabetRouter