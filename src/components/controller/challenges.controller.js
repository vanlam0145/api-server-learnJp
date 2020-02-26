const ChallengesService = require('../services/challenges.services')
const challengesSchema = require('./challenges.schema')
const until = require('../services/untilServices')
exports.getList = (req, res) => {
    ChallengesService.getList()
        .then(result => {
            if (result) res.send(result)
            else res.send('kaka')
        })
        .catch(err => {if (err) throw err})
}
exports.getById = (req, res) => {
    ChallengesService.getById(req.params.id)
        .then(result => {
            if (result) res.send({
                ...result,
                image: getImgUrl(result.image),
                choice_1_voice: getAudioUrl(result.choice_1_voice),
                choice_2_voice: getAudioUrl(result.choice_2_voice)
            })
            else res.send('kaka')
        })
        .catch(err => {if (err) throw err})
}
exports.create = (req, res) => {
    const vali = until.validateJson((new challengesSchema()).createSchema, req.body)
    if (!vali.isValid) res.status(500).json({mess: vali.message})
    else ChallengesService.create(req.body).then(result => {
        if (result.code) res.status(result.code).json(result)
        else res.status(201).json(result)
    })
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