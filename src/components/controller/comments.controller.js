const CommentsService = require('../services/comments.services')
const { createSchema } = require('./comments.schema')
const until = require('../services/untilServices')
const { resDataModify } = require('../../helper/until')
exports.getList = async (req, res) => {
    const result = await CommentsService.getList()
    resDataModify(res, result)
}
exports.getByChallenge = async (req, res) => {
    console.log(req.params.id)
    const result = await CommentsService.getListByChallange(req.params.id)
    resDataModify(res, result)
}
exports.getById = async (req, res) => {
    const result = await CommentsService.getById(req.params.id)
    resDataModify(res, result)
}
exports.create = async (req, res) => {
    until.validateJson(createSchema, req.body)
    const result = await CommentsService.create(req.body)
    resDataModify(res, result)
}
exports.delete = async (req, res) => {
    const result = await CommentsService.delete(req.params.id)
    resDataModify(res, result)
}