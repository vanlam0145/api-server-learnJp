'use strict'
const route = require('express').Router()
const courseCRL = require(`../controller/course.controller.js`)
const { authMiddleware } = require('../../helper/until')
const courseRouter = function () {
    route.get('/', courseCRL.getList)
    route.get('/:id', authMiddleware(['admin', 'user']), courseCRL.getById)
    route.get('/:id/learn', authMiddleware(['admin', 'user']), courseCRL.learn)
    route.post('/', authMiddleware(['admin', 'user']), courseCRL.create)
    route.delete('/:id', authMiddleware(['admin', 'user']), courseCRL.delete)
    route.put('/set-contents', authMiddleware(['admin', 'user']), courseCRL.updateContentOnCourse)
    // route.delete('/content', usersCRL.au(), courseCRL.deleteContentCourse)
    return route
}
module.exports = courseRouter