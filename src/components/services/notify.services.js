const { NotifyModel } = require('../model/notify.model')
const { ErrorService } = require('../../helper/errorService')
const untilServices = require('./untilServices')
exports.NotifyModel = NotifyModel;
exports.getList = async (idUser) => {
    const [allNotify, notifySeen] = await Promise.all([
        NotifyModel.find({ idUser }).exec(),
        NotifyModel.find({ idUser, seen: true }).exec()])
    return { data: allNotify, countSeen: notifySeen.length }
}
exports.getById = async (id) => await NotifyModel.findById(id).exec()
exports.create = async function (body) {
    return await untilServices.exec(NotifyModel.create(body))
}
exports.update = async (req) => {
    return await untilServices.exec(NotifyModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }))
}
exports.delete = async (id) => {
    return await untilServices.exec(NotifyModel.findOneAndDelete({ _id: id }))
}