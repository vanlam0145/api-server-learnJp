'use strict'
const ChallengesService = require('../services/challenges.services')
const { createSchema, updateFile } = require('./challenges.schema')
const until = require('../services/untilServices')
const { resDataModify, serverWithPort, resErrorModify } = require('../../helper/until')
const fs = require('fs')
const path = require('path')

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
exports.addFile = async (req, res) => {
    until.validateJson(updateFile, req.body)

    if (req.body.type == 'image') {
        const allImage = fs.readdirSync(path.join(__dirname, "../../../assets/challenge/photo"))
        if (allImage.indexOf(req.file.originalname) == -1)
            fs.writeFileSync(path.join(__dirname, `../../../assets/challenge/photo/${req.file.originalname}`), req.file.buffer)

    }
    if (req.body.type == 'choice_1_voice' || req.body.type == "choice_2_voice") {
        const allImage = fs.readdirSync(path.join(__dirname, "../../../assets/challenge/audio"))
        if (allImage.indexOf(req.file.originalname) == -1)
            fs.writeFileSync(path.join(__dirname, `../../../assets/challenge/audio/${req.file.originalname}`), req.file.buffer)
    }
    let result = await ChallengesService.addFile(req.params.id, req.body.type, req.file.originalname)
    resDataModify(res, result)
}
const getImgUrl = image => {
    return image
        ? `${serverWithPort(process.env.PORT)}/api/assets/challenge/photo/${image.toString()}`
        : 'no'
}
const getAudioUrl = audio => {
    return audio
        ? `${serverWithPort(process.env.PORT)}/api/assets/challenge/audio/${audio.toString()}`
        : 'no'
}