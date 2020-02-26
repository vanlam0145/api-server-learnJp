const CommentsService = require('../services/comments.services')
const commantSchema = require('./comments.schema')
const until = require('../services/untilServices')
exports.getList = (req, res) => {
    CommentsService.getList()
        .then(result => {
            if (result) res.send(result)
            else res.send('kaka')
        })
        .catch(err => {if (err) throw err})
}
exports.getById = (req, res) => {
    CommentsService.getById(req.params.id)
        .then(result => {
            if (result) res.send(result)
            else res.send('kaka')
        })
        .catch(err => {if (err) throw err})
}
exports.create = (req, res) => {
    const vali = until.validateJson((new commantSchema()).createSchema, req.body)
    if (!vali.isValid) res.status(500).json({mess: vali.message})
    else CommentsService.create(req.body).then(result => {
        if (result.code) res.status(result.code).json(result)
        else res.status(201).json(result)
    })
}