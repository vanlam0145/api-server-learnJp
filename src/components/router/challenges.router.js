'use strict'
const route = require('express').Router()
const challengesCRL = require(`../controller/challenges.controller.js`)
const { authMiddleware } = require('../../helper/authMiddleware')
const challengesRouter = function () {
    route.get('/', challengesCRL.getList)
    route.get('/:id', challengesCRL.getById)
    route.post('/', authMiddleware(['admin']), challengesCRL.create)
    return route
}
module.exports = challengesRouter