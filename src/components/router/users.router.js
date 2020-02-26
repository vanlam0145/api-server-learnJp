'use strict'
const route = require('express').Router()
const usersCRL = require(`../controller/users.controller.js`)
const usersRouter = function () {
    route.get('/', usersCRL.getList)
    //route.get('/:id', usersCRL.getById)
    route.post('/', usersCRL.create)
    route.post('/login', usersCRL.login)
    route.get('/me', usersCRL.au(), usersCRL.me)
    route.get('/get-courses-latest', usersCRL.au(), usersCRL.getCourseLatest)
    return route
}
module.exports = usersRouter