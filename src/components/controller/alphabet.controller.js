const AlphabetService = require('../services/alphabet.services')
const { createSchema, updateSchema } = require('./alphabet.schema')
const until = require('../services/untilServices')
const { resErrorModify, resDataModify } = require('../../helper/until')
const { ErrorService } = require('../../helper/errorService')
exports.getList = async (req, res) => {
    const result = await AlphabetService.getList()
    resDataModify(res, result)
}
exports.getById = async (req, res) => {
    const result = await AlphabetService.getById(req.params.id)
    resDataModify(res, result)
}
exports.create = async (req, res) => {
    until.validateJson(createSchema, req.body)
    const result = await AlphabetService.create(req.body)
    resDataModify(res, result)
}
exports.update = async (req, res) => {
    until.validateJson(updateSchema, req.body)
    const result = await AlphabetService.update(req)
    resDataModify(res, result)
}
exports.delete = async (req, res) => {
    const result = await AlphabetService.delete(req.params.id)
    resDataModify(res, result)
}