const ContentModel = require('../model/content.model')
const errorService = require('../../helper/errorService')
const untilServices=require('./untilServices')
exports.ContentModel=ContentModel;
exports.getList = async () => await ContentModel.find({}).exec()
exports.getById = async (id) => await ContentModel.findById(id).exec()
exports.create = async function (body) {
    return await untilServices.exec(ContentModel.create(body))
}