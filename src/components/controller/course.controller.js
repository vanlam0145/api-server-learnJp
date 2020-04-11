const CourseService = require('../services/course.services')
const courseSchema = require('./course.schema')
const until = require('../services/untilServices')
const { ErrorService } = require('../../helper/errorService')
const { resDataModify } = require('../../helper/until')
exports.getList = async (req, res) => {
    const result = await CourseService.getList()
    resDataModify(res, result)
}
exports.getById = async (req, res) => {
    const result = await CourseService.getById(req.params.id)
    resDataModify(res, result)
}
exports.create = async (req, res) => {
    until.validateJson(courseSchema.createSchema, req.body)
    const result = await CourseService.create({ ...req.body, _id })
    resDataModify(res, result)
}
exports.learn = async (req, res) => {
    const result = await CourseService.makeQuestion(req.params.id)
    resDataModify(res, result)
}
exports.delete = async (req, res) => {
    const result = await CourseService.delete(req.params.id)
    resDataModify(res, result)
}
exports.updateContentOnCourse = async (req, res) => {
    if (!req.body.isAdd) until.validateJson(courseSchema.updateContentOnCourse, req.body)
    else until.validateJson(new courseSchema.updateContentOnCourseisAdd, req.body)
    const result = await CourseService.updateContentOnCourse(req.body)
    resDataModify(res, result)
}
exports.deleteContentCourse = async (req, res) => {
    if (!req.query.id) throw ErrorService.somethingWentWrong("You need 'id' in params query")
    const result = await CourseService.deleteContentCourse(req.query.id)
    resDataModify(res, result)
}