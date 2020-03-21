'use strict'
const route = require('express').Router()
const folderLv1DriveCRL = require(`../controller/folderLv1Drive.controller.js`)
const folderLv1DriveRouter = function () {
    route.get('/', folderLv1DriveCRL.getList)
    route.get('/syncFolder', folderLv1DriveCRL.sync)


    route.post('/', folderLv1DriveCRL.create)
    route.get('/:id', folderLv1DriveCRL.getById)
    return route
}
module.exports = folderLv1DriveRouter