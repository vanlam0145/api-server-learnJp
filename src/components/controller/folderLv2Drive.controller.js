const FolderLv2DriveService = require('../services/folderLv2Drive.services')
const folderLv2DriveSchema = require('./folderLv2Drive.schema')
const until = require('../services/untilServices')
const errorService = require('../../helper/errorService')
exports.getList = (req, res) => {
    FolderLv2DriveService.getList()
        .then(result => {
            if (result) res.send(result)
            else res.send('kaka')
        })
        .catch(err => {if (err) throw err})
}
exports.getById = (req, res) => {
    FolderLv2DriveService.getById(req.params.id)
        .then(result => {
            if (result) res.send(result)
            else res.send('kaka')
        })
        .catch(err => {if (err) throw err})
}
exports.create = (req, res) => {
    const vali = until.validateJson((new folderLv2DriveSchema()).createSchema, req.body)
    if (!vali.isValid) res.status(500).json({mess: vali.message})
    else FolderLv2DriveService.create(req.body).then(result => {
        if (result.code) res.status(result.code).json(result)
        else res.status(201).json(result)
    })
}