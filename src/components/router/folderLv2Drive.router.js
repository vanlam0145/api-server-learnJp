'use strict'
const route = require('express').Router()
const folderLv2DriveCRL = require(`../controller/folderLv2Drive.controller.js`)
const { authMiddleware } = require('../../helper/until')
const folderLv2DriveRouter = function () {
    route.get('/', authMiddleware(['admin']), folderLv2DriveCRL.getList)
    route.get('/:id', authMiddleware(['admin']), folderLv2DriveCRL.getById)
    route.post('/', authMiddleware(['admin']), folderLv2DriveCRL.create)
    return route
}
module.exports = folderLv2DriveRouter