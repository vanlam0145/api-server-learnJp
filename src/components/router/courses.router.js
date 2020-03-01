'use strict'
const route = require('express').Router()
const usersCRL = require(`../controller/users.controller.js`)
const courseCRL = require(`../controller/course.controller.js`)
const courseRouter = function () {
    route.get('/', courseCRL.getList)
    route.get('/:id', usersCRL.au(), courseCRL.getById)
    route.get('/:id/learn', usersCRL.au(), courseCRL.learn)
    route.post('/', usersCRL.au(), courseCRL.create)
    route.delete('/:id', usersCRL.au(), courseCRL.delete)
    return route
}
module.exports = courseRouter