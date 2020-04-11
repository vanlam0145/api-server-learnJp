'use strict'
const route = require('express').Router()
const usersCRL = require(`../controller/users.controller.js`)
const { authMiddleware } = require('../../helper/until')
const { BaseRoute } = require('../../helper/baseRoute')
const usersRouter = function () {
    route.get('/', authMiddleware(['admin', 'user']), BaseRoute.routeModify(usersCRL.getList))
    //route.get('/:id', usersCRL.getById)
    route.post('/', BaseRoute.routeModify(usersCRL.create))
    route.post('/login', BaseRoute.routeModify(usersCRL.login))
    route.get('/me', authMiddleware(['user', 'admin']), BaseRoute.routeModify(usersCRL.me))
    route.get('/get-courses-latest', authMiddleware(['user', 'admin']), BaseRoute.routeModify(usersCRL.getCourseLatest))
    //avartar
    route.put('/setAvartar/:idimage', authMiddleware(['user', 'admin']), BaseRoute.routeModify(usersCRL.setAvartar))
    //image
    route.post('/image', authMiddleware(['user', 'admin']), BaseRoute.routeModify(usersCRL.addImage))
    route.delete('/image/:id', authMiddleware(['user', 'admin']), BaseRoute.routeModify(usersCRL.deleteImage))

    return route
}
module.exports = usersRouter