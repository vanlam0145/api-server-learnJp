'use strict'
const route = require('express').Router()
const folderLv2DriveCRL = require(`../controller/folderLv2Drive.controller.js`)
const folderLv2DriveRouter = function () {
    route.get('/', folderLv2DriveCRL.getList)
    route.get('/:id', folderLv2DriveCRL.getById)
    route.post('/', folderLv2DriveCRL.create)
    return route
}
module.exports = folderLv2DriveRouter