'use strict'
const route = require('express').Router()
const challengesCRL = require(`../controller/challenges.controller.js`)
const { authMiddleware } = require('../../helper/until')
const { BaseRoute } = require('../../helper/baseRoute')
const multer = require('multer')

const challengesRouter = function () {
    route.get('/', BaseRoute.routeModify(challengesCRL.getList))
    route.get('/:id', BaseRoute.routeModify(challengesCRL.getById))
    route.post('/', authMiddleware(['admin']), BaseRoute.routeModify(challengesCRL.create))
    route.put('/:id/file', authMiddleware(['admin']), multer().single('file'), BaseRoute.routeModify(challengesCRL.addFile))
    return route
}
module.exports = challengesRouter