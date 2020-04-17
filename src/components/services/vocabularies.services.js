const VocabulariesModel = require('../model/vocabularies.model')
const TopicModel = require('../model/topics.model')
const { ErrorService } = require('../../helper/errorService')
const untilServices = require('./untilServices')
exports.VocabulariesModel = VocabulariesModel;
exports.getList = async () => await VocabulariesModel.find({}).exec()
exports.getVocaOfTopic = async (id) => await VocabulariesModel.find({ topicId: id }).exec()
exports.getById = async (id) => await VocabulariesModel.findById(id).exec()
exports.create = async function (body) {
    const topic = await TopicModel.findById(body.topicId)
    if (!topic)
        throw ErrorService.somethingWentWrong("Không tìm thấy Topic!")
    return await untilServices.exec(VocabulariesModel.create(body))
}
exports.update = async (req) => {
    delete req.body.topicId
    return await untilServices.exec(VocabulariesModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }))
}
exports.delete = async (id) => {
    return await untilServices.exec(VocabulariesModel.findOneAndDelete({ _id: id }))
}