const { TopicModel } = require('../model/topics.model')
const { VocabularieModel } = require('../model/vocabularies.model')
const { ErrorService } = require('../../helper/errorService')
const untilServices = require('./untilServices')
exports.TopicModel = TopicModel;
exports.getList = async () => await TopicModel.find({}).sort({ number: 1 }).exec()
exports.getById = async (id) => await TopicModel.findById(id).exec()
exports.create = async function (body) {
    const num = await TopicModel.count({})
    return await untilServices.exec(TopicModel.create({ ...body, number: num + 1 }))
}
exports.update = async (req) => {
    return await untilServices.exec(TopicModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }))
}
exports.delete = async (id) => {
    return await untilServices.exec(TopicModel.findOneAndDelete({ _id: id }))
}
exports.createAdmin = async (title, vocal) => {
    const topic = await TopicModel.create({ title })
    let vocals = []
    for (let vo of vocal) {
        vocals.push(new VocabularieModel({ ...vo, topicId: topic._id }))
    }
    console.log(vocals)
}