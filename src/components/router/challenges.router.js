'use strict'
const route = require('express').Router()
const challengesCRL = require(`../controller/challenges.controller.js`)
const challengesRouter = function () {
    route.get('/', challengesCRL.getList)
    route.get('/:id', challengesCRL.getById)
    route.post('/', challengesCRL.create)
    return route
}
module.exports = challengesRouter