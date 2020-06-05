const AnswerHistoryService = require('../services/answerHistory.services');
const { createSchema } = require('./answerHistory.schema');
const until = require('../services/untilServices');
const { resErrorModify, resDataModify } = require('../../helper/until');
const { ErrorService } = require('../../helper/errorService');
const { ROLE } = require('../../config/role');

const { CourseModel } = require('../model/course.model');
exports.getList = async (req, res) => {
  let filter = {};
  if (req.user.role == ROLE.USER) {
    filter = { userId: req.user._id };
  }
  const result = await AnswerHistoryService.getList(filter);
  resDataModify(res, result);
};
exports.getById = async (req, res) => {
  const result = await AnswerHistoryService.getById(req.params.id);
  if (req.user.role == ROLE.USER && result.user != req.user._id) {
    throw ErrorService.permissionDeny();
  }
  resDataModify(res, result);
};
exports.create = async (req, res) => {
  until.validateJson(createSchema, req.body);
  req.body.userId = req.user._id;
  let total = 0;
  if (type == 'courser') {
    let course = await CourseModel.findById(req.body.courserId);
    total = course.contents.length;
  }
  req.body.total = total;
  const result = await AnswerHistoryService.create(req.body);
  resDataModify(res, result);
};
exports.update = async (req, res) => {
  const result = await AnswerHistoryService.update(req);
  resDataModify(res, result);
};
exports.delete = async (req, res) => {
  const result = await AnswerHistoryService.delete(req.params.id);
  resDataModify(res, result);
};
