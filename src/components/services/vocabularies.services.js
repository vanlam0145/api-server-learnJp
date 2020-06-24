const { VocabularieModel } = require('../model/vocabularies.model')
const { TopicModel } = require('../model/topics.model')
const { ErrorService } = require('../../helper/errorService')
const untilServices = require('./untilServices')
exports.VocabularieModel = VocabularieModel;
exports.getList = async () => await VocabularieModel.find({}).exec()
exports.getVocaOfTopic = async (id) => await VocabularieModel.find({ topicId: id }).exec()
exports.getById = async (id) => await VocabularieModel.findById(id).exec()
exports.create = async function (body) {
    const topic = await TopicModel.findById(body.topicId)
    if (!topic)
        throw ErrorService.somethingWentWrong("Không tìm thấy Topic!")
    return await untilServices.exec(VocabularieModel.create(body))
}
exports.update = async (req) => {
    delete req.body.topicId
    return await untilServices.exec(VocabularieModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }))
}
exports.delete = async (id) => {
    return await untilServices.exec(VocabularieModel.findOneAndDelete({ _id: id }))
}