const ImageGoogleDriveService = require('../services/imageGoogleDrive.services')
const { createSchema } = require('./imageGoogleDrive.schema')
const until = require('../services/untilServices')
const errorService = require('../../helper/errorService')
const { resDataModify } = require('../../helper/until')
exports.getList = async (req, res) => {
    const result = await ImageGoogleDriveService.getList()
    resDataModify(res, result)
}
exports.getImageOfUser = async (req, res) => {
    const result = await ImageGoogleDriveService.getImageOfUser(req.user._id)
    resDataModify(res, result)
}
exports.getById = async (req, res) => {
    const result = await ImageGoogleDriveService.getById(req.params.id)
    resDataModify(res, result)
}
exports.create = async (req, res) => {
    until.validateJson(createSchema, req.body)
    const result = await ImageGoogleDriveService.create(req.body)
    resDataModify(res, result)
}