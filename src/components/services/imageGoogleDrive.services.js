const ImageGoogleDriveModel = require('../model/imageGoogleDrive.model')
const errorService = require('../../helper/errorService')
const untilServices = require('./untilServices')
exports.ImageGoogleDriveModel = ImageGoogleDriveModel;
exports.getList = async () => await ImageGoogleDriveModel.find({}).exec()
exports.getImageOfUser = async (id) => await ImageGoogleDriveModel.find({ idUser: id }).exec()
exports.getById = async (id) => await ImageGoogleDriveModel.findById(id).exec()
exports.create = async function (body) {
    return await untilServices.exec(ImageGoogleDriveModel.create(body))
}