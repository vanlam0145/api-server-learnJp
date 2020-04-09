'use strict'
const route = require('express').Router()
const folderLv1DriveCRL = require(`../controller/folderLv1Drive.controller.js`)
const { authMiddleware } = require('../../helper/authMiddleware')
const folderLv1DriveRouter = function () {
    route.get('/', authMiddleware(['admin']), folderLv1DriveCRL.getList)
    route.get('/syncFolder', authMiddleware(['admin']), folderLv1DriveCRL.sync)


    route.post('/', authMiddleware(['admin']), folderLv1DriveCRL.create)
    route.get('/:id', authMiddleware(['admin']), folderLv1DriveCRL.getById)
    return route
}
module.exports = folderLv1DriveRouter