const CommentsModel = require('../model/comments.model')
const errorService = require('../../helper/errorService')
const untilServices = require('./untilServices')
exports.getList = async () => await CommentsModel.find({}).exec()
exports.getListByChallange = async (id) => await CommentsModel.find({ idChallenge: id }).exec()
exports.getById = async (id) => await CommentsModel.findById(id).exec()
exports.create = async function (body) {
    return await untilServices.exec(CommentsModel.create(body))
}
exports.delete = async (id) => {
    return await CommentsModel.findByIdAndDelete(id).exec()
}