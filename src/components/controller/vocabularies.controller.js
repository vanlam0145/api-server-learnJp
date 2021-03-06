const VocabulariesService = require('../services/vocabularies.services')
const { createSchema } = require('./vocabularies.schema')
const until = require('../services/untilServices')
const { resErrorModify, resDataModify } = require('../../helper/until')
const { ErrorService } = require('../../helper/errorService')
exports.getList = async (req, res) => {
    const result = await VocabulariesService.getList()
    resDataModify(res, result)
}
exports.getVocaOfTopic = async (req, res) => {
    const result = await VocabulariesService.getVocaOfTopic(req.params.id)
    resDataModify(res, result)
}
exports.getById = async (req, res) => {
    const result = await VocabulariesService.getById(req.params.id)
    resDataModify(res, result)
}
exports.create = async (req, res) => {
    until.validateJson(createSchema, req.body)
    const result = await VocabulariesService.create(req.body)
    resDataModify(res, result)
}
exports.update = async (req, res) => {
    const result = await VocabulariesService.update(req)
    resDataModify(res, result)
}
exports.delete = async (req, res) => {
    const result = await VocabulariesService.delete(req.params.id)
    resDataModify(res, result)
}