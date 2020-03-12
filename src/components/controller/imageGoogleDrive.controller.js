const ImageGoogleDriveService = require('../services/imageGoogleDrive.services')
const imageGoogleDriveSchema = require('./imageGoogleDrive.schema')
const until = require('../services/untilServices')
const errorService = require('../../helper/errorService')
exports.getList = (req, res) => {
    ImageGoogleDriveService.getList(req.user._id)
        .then(result => {
            if (result) res.send(result)
            else res.send('kaka')
        })
        .catch(err => {if (err) throw err})
}
exports.getById = (req, res) => {
    ImageGoogleDriveService.getById(req.params.id)
        .then(result => {
            if (result) res.send(result)
            else res.send('kaka')
        })
        .catch(err => {if (err) throw err})
}
exports.create = (req, res) => {
    const vali = until.validateJson((new imageGoogleDriveSchema()).createSchema, req.body)
    if (!vali.isValid) res.status(500).json({mess: vali.message})
    else ImageGoogleDriveService.create(req.body).then(result => {
        if (result.code) res.status(result.code).json(result)
        else res.status(201).json(result)
    })
}