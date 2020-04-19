const ChatsService = require('../services/chats.services')
const {createSchema} = require('./chats.schema')
const until = require('../services/untilServices')
const { resErrorModify,resDataModify } = require('../../helper/until')
const {ErrorService} = require('../../helper/errorService')
exports.getList =async (req, res) => {
    const result=await ChatsService.getList()
    resDataModify(res,result)
}
exports.getById =async (req, res) => {
    const result=await ChatsService.getById(req.params.id)
    resDataModify(res,result)
}
exports.create =async (req, res) => {
    until.validateJson(createSchema, req.body)
    const result= ChatsService.create(req.body)
    resDataModify(res,result)
}
exports.update=async(req,res)=>{
    const result= ChatsService.update(req)
    resDataModify(res,result)
}
exports.delete=async(req,res)=>{
    const result= ChatsService.delete(req.params.id)
    resDataModify(res,result)
}