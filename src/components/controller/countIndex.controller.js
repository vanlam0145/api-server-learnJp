const CountIndexService = require('../services/countIndex.services')
const {createSchema} = require('./countIndex.schema')
const until = require('../services/untilServices')
const { resErrorModify,resDataModify } = require('../../helper/until')
const {ErrorService} = require('../../helper/errorService')
exports.getList =async (req, res) => {
    const result=await CountIndexService.getList()
    resDataModify(res,result)
}
exports.getById =async (req, res) => {
    const result=await CountIndexService.getById(req.params.id)
    resDataModify(res,result)
}
exports.create =async (req, res) => {
    until.validateJson(createSchema, req.body)
    const result=await CountIndexService.create(req.body)
    resDataModify(res,result)
}
exports.update=async(req,res)=>{
    const result=await CountIndexService.update(req)
    resDataModify(res,result)
}
exports.delete=async(req,res)=>{
    const result=await CountIndexService.delete(req.params.id)
    resDataModify(res,result)
}