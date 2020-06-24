const {CountIndexModel} = require('../model/countIndex.model')
const { ErrorService } = require('../../helper/errorService')
const untilServices=require('./untilServices')
exports.CountIndexModel=CountIndexModel;
exports.getList = async () => await CountIndexModel.find({}).exec()
exports.getById = async (id) => await CountIndexModel.findById(id).exec()
exports.create = async function (body) {
    return await untilServices.exec(CountIndexModel.create(body))
}
exports.update=async(req)=>{
    return await untilServices.exec(CountIndexModel.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true}))
}
exports.delete=async(id)=>{
    return await untilServices.exec(CountIndexModel.findOneAndDelete({_id:id}))
}