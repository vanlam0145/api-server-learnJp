const FolderLv2DriveModel = require('../model/folderLv2Drive.model')
const errorService = require('../../helper/errorService')
const untilServices = require('./untilServices')
exports.FolderLv2DriveModel = FolderLv2DriveModel;
exports.getList = async () => await FolderLv2DriveModel.find({}).exec()
exports.getById = async (id) => await FolderLv2DriveModel.findById(id).exec()
exports.create = async function (body) {
    return await untilServices.exec(FolderLv2DriveModel.create(body))
}