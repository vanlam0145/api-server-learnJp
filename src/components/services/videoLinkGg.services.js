const VideoLinkGgModel = require('../model/videoLinkGg.model')
const { ErrorService } = require('../../helper/errorService')
const untilServices=require('./untilServices')
exports.VideoLinkGgModel=VideoLinkGgModel;
exports.getList = async () => await VideoLinkGgModel.find({}).sort({name:1}).exec()
exports.getById = async (id) => await VideoLinkGgModel.findById(id).exec()
exports.create = async function (body) {
    return await untilServices.exec(VideoLinkGgModel.create(body))
}
exports.update=async(req)=>{
    return await untilServices.exec(VideoLinkGgModel.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true}))
}
exports.delete=async(id)=>{
    return await untilServices.exec(VideoLinkGgModel.findOneAndDelete({_id:id}))
}