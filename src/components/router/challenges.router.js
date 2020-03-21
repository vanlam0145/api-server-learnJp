'use strict'
const route = require('express').Router()
const challengesCRL = require(`../controller/challenges.controller.js`)
const userCRL = require('../controller/users.controller')
const challengesRouter = function () {
    route.get('/', challengesCRL.getList)
    route.get('/:id', userCRL.au(), challengesCRL.getById)
    route.post('/', challengesCRL.create)
    return route
}
module.exports = challengesRouter