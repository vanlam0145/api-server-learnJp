'use strict'
const route = require('express').Router()
const challengesCRL = require(`../controller/challenges.controller.js`)
const { authMiddleware } = require('../../helper/until')
const { BaseRoute } = require('../../helper/baseRoute')
const challengesRouter = function () {
    route.get('/', BaseRoute.routeModify(challengesCRL.getList))
    route.get('/:id', challengesCRL.getById)
    route.post('/', authMiddleware(['admin']), challengesCRL.create)
    return route
}
module.exports = challengesRouter