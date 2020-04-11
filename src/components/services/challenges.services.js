const ChallengesModel = require('../model/challenges.model')
const errorService = require('../../helper/errorService')
const untilServices = require('./untilServices')
exports.getList = async () => await ChallengesModel.find({}).exec()
exports.getById = async (id) => await ChallengesModel.findById(id).lean()
exports.create = async function (body) {
    return await untilServices.exec(ChallengesModel.create(body))
}