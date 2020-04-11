'use strict'
const route = require('express').Router()
const { authMiddleware } = require('../../helper/until')
const imageGoogleDriveCRL = require(`../controller/imageGoogleDrive.controller.js`)
const { BaseRoute } = require('../../helper/baseRoute')
const imageGoogleDriveRouter = function () {
    route.get('/', authMiddleware(['admin']), BaseRoute.routeModify(imageGoogleDriveCRL.getList))//getlist for user
    route.get('/:id', authMiddleware(['admin', 'user']), imageGoogleDriveCRL.getById)
    //route.post('/', imageGoogleDriveCRL.create)
    return route
}
module.exports = imageGoogleDriveRouter