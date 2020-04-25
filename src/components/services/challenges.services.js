const ChallengesModel = require('../model/challenges.model')
const errorService = require('../../helper/errorService')
const untilServices = require('./untilServices')
exports.getList = async () => await ChallengesModel.find({}).exec()
exports.getById = async (id) => await ChallengesModel.findById(id).lean()
exports.create = async function (body) {
    const index = await ChallengesModel.count({})
    delete body.choice_1_voice
    delete body.choice_2_voice
    delete body.image
    body.index = index
    return await untilServices.exec(ChallengesModel.create(body))
}
exports.addFile = async (id, type, name) => {
    return await ChallengesModel.findByIdAndUpdate(id, {
        $set: {
            [type]: name
        }
    })
}
