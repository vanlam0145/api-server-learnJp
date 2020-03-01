const CourseService = require('../services/course.services')
const courseSchema = require('./course.schema')
const until = require('../services/untilServices')
const errorService = require('../../helper/errorService')
exports.getList = (req, res) => {
    CourseService.getList()
        .then(result => {
            if (result) res.send(result)
            else res.send('kaka')
        })
        .catch(err => {if (err) throw err})
}
exports.getById = (req, res) => {
    CourseService.getById(req.params.id)
        .then(result => {
            if (result) res.send(result)
            else res.send('kaka')
        })
        .catch(err => {if (err) throw err})
}
exports.create = (req, res) => {
    const {_id} = req.user;
    const vali = until.validateJson((new courseSchema()).createSchema, req.body)
    if (!vali.isValid) res.status(500).json({mess: vali.message})
    else CourseService.create({...req.body, _id}).then(result => {
        if (result.code) res.status(result.code).json(result)
        else res.status(201).json(result)
    })
}
exports.learn = (req, res) => {
    CourseService.makeQuestion(req.params.id).then(response => {
        if (response.code)
            res.status(response.code).json(response)
        else res.json(response)
    })
}
exports.delete = (req, res) => {
    CourseService.delete(req.params.id).then(result => {
        res.status(result.code ? result.code : 200).json(result)
    })
}
exports.updateContentOnCourse = (req, res) => {
    let vali
    if (!req.body.isAdd) vali = until.validateJson((new courseSchema()).updateContentOnCourse, req.body)
    else vali = until.validateJson((new courseSchema()).updateContentOnCourseisAdd, req.body)
    if (!vali.isValid) res.status(500).json({mess: vali.message})
    else
        CourseService.updateContentOnCourse(req.body).then(result => {
            res.status(result.code ? result.code : 200).json(result)
        })
}
exports.deleteContentCourse = (req, res) => {
    console.log(req.query.id)
    if (!req.query.id) return errorService.error.anyError("You need 'id' in params query", 403)
    else CourseService.deleteContentCourse(req.query.id).then(result => {
        res.status(result.code ? result.code : 200).json(result)
    })
}