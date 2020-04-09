'use strict'
const route = require('express').Router()
const usersCRL = require(`../controller/users.controller.js`)
const { authMiddleware } = require('../../helper/authMiddleware')
const usersRouter = function () {
    route.get('/', usersCRL.getList)
    //route.get('/:id', usersCRL.getById)
    route.post('/', usersCRL.create)
    route.post('/login', usersCRL.login)
    route.get('/me', authMiddleware(['user', 'admin']), usersCRL.me)
    route.get('/get-courses-latest', usersCRL.au(), usersCRL.getCourseLatest)
    //avartar
    route.put('/setAvartar/:idimage', usersCRL.au(), usersCRL.setAvartar)
    //image
    route.post('/image', usersCRL.au(), usersCRL.addImage)
    route.delete('/image/:id', usersCRL.au(), usersCRL.deleteImage)

    return route
}
module.exports = usersRouter