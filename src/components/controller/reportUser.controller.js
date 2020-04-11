const ReportUserService = require('../services/reportUser.services')
const { createSchema } = require('./reportUser.schema')
const until = require('../services/untilServices')
const { resDataModify } = require('../../helper/until')
const UserModel = require('../model/users.model')
const { ErrorService } = require('../../helper/errorService')
exports.getList = async (req, res) => {
    const result = await ReportUserService.getList()
    resDataModify(res, result)
}
exports.getById = async (req, res) => {
    const result = await ReportUserService.getById(req.params.id)
    resDataModify(res, result)
}
exports.create = async (req, res) => {
    until.validateJson(createSchema, req.body)
    req.body.accusersId = req.user._id
    const result = await ReportUserService.create(req.body)
    resDataModify(res, result)
}
exports.update = async (req, res) => {
    const result = await ReportUserService.update(req)
    resDataModify(res, result)
}
exports.deleteOne = async (req, res) => {
    const result = await ReportUserService.deleteOne(req)
    resDataModify(res, result)
}