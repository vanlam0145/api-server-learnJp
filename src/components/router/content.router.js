'use strict'
const route = require('express').Router()
const contentCRL = require(`../controller/content.controller.js`)
const contentRouter = function () {
    route.get('/', contentCRL.getList)
    route.get('/:id', contentCRL.getById)
    route.post('/', contentCRL.create)
    return route
}
module.exports = contentRouter