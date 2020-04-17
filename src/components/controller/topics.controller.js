const TopicsService = require('../services/topics.services')
const { createSchema } = require('./topics.schema')
const until = require('../services/untilServices')
const { resErrorModify, resDataModify } = require('../../helper/until')
const { ErrorService } = require('../../helper/errorService')
exports.getList = async (req, res) => {
    const result = await TopicsService.getList()
    resDataModify(res, result)
}
exports.getById = async (req, res) => {
    const result = await TopicsService.getById(req.params.id)
    resDataModify(res, result)
}
exports.create = async (req, res) => {
    until.validateJson(createSchema, req.body)
    const result = await TopicsService.create(req.body)
    resDataModify(res, result)
}
exports.update = async (req, res) => {
    const result = await TopicsService.update(req)
    resDataModify(res, result)
}
exports.delete = async (req, res) => {
    const result = await TopicsService.delete(req.params.id)
    resDataModify(res, result)
}