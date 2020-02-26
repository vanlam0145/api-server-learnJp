'use strict'
const route = require('express').Router()
const commentsCRL = require(`../controller/comments.controller.js`)
const commentsRouter = function () {
    route.get('/', commentsCRL.getList)
    route.get('/:id', commentsCRL.getById)
    route.post('/', commentsCRL.create)
    return route
}
module.exports = commentsRouter