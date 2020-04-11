'use strict'
const route = require('express').Router()
const courseCRL = require(`../controller/course.controller.js`)
const { authMiddleware } = require('../../helper/until')
const { BaseRoute } = require('../../helper/baseRoute')
const courseRouter = function () {
    route.get('/', BaseRoute.routeModify(courseCRL.getList))
    route.get('/:id', authMiddleware(['admin', 'user']), BaseRoute.routeModify(courseCRL.getById))
    route.get('/:id/learn', authMiddleware(['admin', 'user']), BaseRoute.routeModify(courseCRL.learn))
    route.post('/', authMiddleware(['admin', 'user']), BaseRoute.routeModify(courseCRL.create))
    route.delete('/:id', authMiddleware(['admin', 'user']), BaseRoute.routeModify(courseCRL.delete))
    route.put('/set-contents', authMiddleware(['admin', 'user']), BaseRoute.routeModify(courseCRL.updateContentOnCourse))
    // route.delete('/content', usersCRL.au(), courseCRL.deleteContentCourse)
    return route
}
module.exports = courseRouter