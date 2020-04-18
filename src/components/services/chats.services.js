const ChatsModel = require('../model/chats.model')
const { ErrorService } = require('../../helper/errorService')
const untilServices=require('./untilServices')
exports.ChatsModel=ChatsModel;
exports.getList = async () => await ChatsModel.find({}).exec()
exports.getById = async (id) => await ChatsModel.findById(id).exec()
exports.create = async function (body) {
    return await untilServices.exec(ChatsModel.create(body))
}
exports.update=async(req)=>{
    return await untilServices.exec(ChatsModel.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true}))
}
exports.delete=async(id)=>{
    return await untilServices.exec(ChatsModel.findOneAndDelete({_id:id}))
}