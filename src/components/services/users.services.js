const UsersModel = require('../model/users.model')
const errorService = require('../../helper/errorService')
const untilServices=require('./untilServices')
exports.getList = async () => await UsersModel.find({}).exec()
exports.getById = async (id) => await UsersModel.findById(id).exec()
exports.create = async function (body) {
    return await untilServices.exec(UsersModel.create(body))
}
exports.getMe = async (id) => {
    return await this.findById(id).select('-hash')
}
