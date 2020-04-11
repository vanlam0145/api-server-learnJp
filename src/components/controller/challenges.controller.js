const ChallengesService = require('../services/challenges.services')
const { createSchema } = require('./challenges.schema')
const until = require('../services/untilServices')
const { resDataModify } = require('../../helper/until')
exports.getList = async (req, res) => {
    const result = await ChallengesService.getList()
    resDataModify(res, result)
}
exports.getById = async (req, res) => {
    const result = await ChallengesService.getById(req.params.id)
    resDataModify(res, {
        ...result, image: getImgUrl(result.image),
        choice_1_voice: getAudioUrl(result.choice_1_voice),
        choice_2_voice: getAudioUrl(result.choice_2_voice)
    })
}
exports.create = async (req, res) => {
    until.validateJson(createSchema, req.body)
    const result = await ChallengesService.create(req.body)
    resDataModify(res, result)
}
const getImgUrl = image => {
    return image
        ? `${process.env.SERVER_URL}:${process.env.PORT}/api/assets/challenge/photo/${image.toString()}`
        : 'no'
}
const getAudioUrl = audio => {
    return audio
        ? `${process.env.SERVER_URL}:${process.env.PORT}/api/assets/challenge/audio/${audio.toString()}`
        : 'no'
}