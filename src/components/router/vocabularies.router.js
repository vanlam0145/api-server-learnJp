'use strict'
const route = require('express').Router()
const vocabulariesCRL = require(`../controller/vocabularies.controller.js`)
const { authMiddleware } = require('../../helper/until')
const { BaseRoute } = require('../../helper/baseRoute')
const vocabulariesRouter = function () {
    route.get('/', BaseRoute.routeModify(vocabulariesCRL.getList))
    route.get('/topic/:id', BaseRoute.routeModify(vocabulariesCRL.getVocaOfTopic))
    route.get('/:id', BaseRoute.routeModify(vocabulariesCRL.getById))
    route.post('/', authMiddleware(['admin']), BaseRoute.routeModify(vocabulariesCRL.create))
    route.put('/:id', authMiddleware(['admin']), BaseRoute.routeModify(vocabulariesCRL.update))
    route.delete('/:id', authMiddleware(['admin']), BaseRoute.routeModify(vocabulariesCRL.delete))
    return route
}
module.exports = vocabulariesRouter