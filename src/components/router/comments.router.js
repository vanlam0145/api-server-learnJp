'use strict'
const route = require('express').Router()
const commentsCRL = require(`../controller/comments.controller.js`)
const { authMiddleware } = require('../../helper/until')
const { BaseRoute } = require('../../helper/baseRoute')
const commentsRouter = function () {
    route.get('/', authMiddleware(['admin', 'user']), BaseRoute.routeModify(commentsCRL.getList))
    route.get('/challenge/:id', authMiddleware(['admin', 'user']), BaseRoute.routeModify(commentsCRL.getByChallenge))
    route.get('/:id', authMiddleware(['admin', 'user']), BaseRoute.routeModify(commentsCRL.getById))
    //route.post('/', authMiddleware(['admin', 'user']), BaseRoute.routeModify(commentsCRL.create))
    route.delete('/:id', authMiddleware(['admin']), BaseRoute.routeModify(commentsCRL.delete))
    return route
}
module.exports = commentsRouter