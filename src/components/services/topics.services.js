const TopicsModel = require('../model/topics.model')
const { ErrorService } = require('../../helper/errorService')
const untilServices = require('./untilServices')
exports.TopicsModel = TopicsModel;
exports.getList = async () => await TopicsModel.find({}).sort({ number: 1 }).exec()
exports.getById = async (id) => await TopicsModel.findById(id).exec()
exports.create = async function (body) {
    const num = await TopicsModel.count({})
    return await untilServices.exec(TopicsModel.create({ ...body, number: num + 1 }))
}
exports.update = async (req) => {
    return await untilServices.exec(TopicsModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }))
}
exports.delete = async (id) => {
    return await untilServices.exec(TopicsModel.findOneAndDelete({ _id: id }))
}