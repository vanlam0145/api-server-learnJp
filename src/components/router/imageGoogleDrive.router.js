'use strict'
const route = require('express').Router()
const usersCRL = require(`../controller/users.controller.js`)
const imageGoogleDriveCRL = require(`../controller/imageGoogleDrive.controller.js`)
const imageGoogleDriveRouter = function () {
    route.get('/', usersCRL.au(), imageGoogleDriveCRL.getList)//getlist for user
    //route.get('/:id', imageGoogleDriveCRL.getById)
    //route.post('/', imageGoogleDriveCRL.create)
    return route
}
module.exports = imageGoogleDriveRouter