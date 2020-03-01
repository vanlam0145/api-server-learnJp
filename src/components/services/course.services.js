const CourseModel = require('../model/course.model');
const ContentModel = require('../model/content.model');
const UserModel = require('../model/users.model');
const errorService = require('../../helper/errorService')
const untilServices = require('./untilServices')
const question = require('../../helper/question')
const Types = require('mongoose').Types
exports.CourseModel = CourseModel;
exports.getList = async () => await CourseModel.find({}).exec()
exports.getById = async (id) => await CourseModel.findById(id).populate('contents').lean()
exports.create = async function (body) {
    const {title, content, _id} = body
    const contents = await untilServices.exec(ContentModel.create(content))
    if (contents.code)
        return contents
    const course = await untilServices.exec(CourseModel.create({title, contents}))
    if (course.code)
        return course
    await UserModel.updateOne({_id}, {$push: {courses: course}})
    return course
}
exports.makeQuestion = async id => {
    const courses = await CourseModel.findById(id).populate('contents').lean()
    if (!courses)
        return errorService.error.anyError("You don't have any couser", 403)
    return question._makeQuestion({}, courses.contents)
}
exports.learn = id => {
    this.makeQuestion(id)
}
exports.delete = async function (id) {
    const courses = await untilServices.exec(CourseModel.findByIdAndDelete({_id: id}))
    for (let content of courses.contents) {
        await untilServices.exec(ContentModel.deleteOne({_id: content}))
    }
    return await ContentModel.deleteOne({_id: id})
}