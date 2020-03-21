const FolderLv1DriveModel = require('../model/folderLv1Drive.model')
const errorService = require('../../helper/errorService')
const untilServices=require('./untilServices')
exports.FolderLv1DriveModel=FolderLv1DriveModel;
exports.getList = async () => await FolderLv1DriveModel.find({}).exec()
exports.getById = async (id) => await FolderLv1DriveModel.findById(id).exec()
exports.create = async function (body) {
    return await untilServices.exec(FolderLv1DriveModel.create(body))
}