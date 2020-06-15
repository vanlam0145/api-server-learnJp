const NotifyService = require('../services/notify.services')
const { createSchema } = require('./notify.schema')
const until = require('../services/untilServices')
const { resErrorModify, resDataModify } = require('../../helper/until')
const { ErrorService } = require('../../helper/errorService')
exports.getList = async (req, res) => {
    const result = await NotifyService.getList(req.user._id)
    resDataModify(res, result)
}
exports.getById = async (req, res) => {
    const result = await NotifyService.getById(req.params.id)
    resDataModify(res, result)
}
exports.create = async (req, res) => {
    until.validateJson(createSchema, req.body)
    req.body.idUser = req.user._id
    const result = await NotifyService.create(req.body)
    resDataModify(res, result)
}
exports.update = async (req, res) => {
    const result = await NotifyService.update(req)
    resDataModify(res, result)
}
exports.delete = async (req, res) => {
    const result = await NotifyService.delete(req.params.id)
    resDataModify(res, result)
}