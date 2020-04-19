'use strict'
const route = require('express').Router()
const folderLv1DriveCRL = require(`../controller/folderLv1Drive.controller.js`)
const { authMiddleware } = require('../../helper/until')
const { BaseRoute } = require('../../helper/baseRoute')
const folderLv1DriveRouter = function () {
    route.get('/', authMiddleware(['admin']), BaseRoute.routeModify(folderLv1DriveCRL.getList))
    route.get('/syncFolder', authMiddleware(['admin']), BaseRoute.routeModify(folderLv1DriveCRL.sync))

    route.post('/', authMiddleware(['admin']), BaseRoute.routeModify(folderLv1DriveCRL.create))
    route.get('/:id', authMiddleware(['admin']), BaseRoute.routeModify(folderLv1DriveCRL.getById))
    return route
}
module.exports = folderLv1DriveRouter