const ContentService = require('../services/content.services');
const {
  createSchema,
  triggerAnswerSchema,
  deleteContent,
} = require('./content.schema');
const until = require('../services/untilServices');
const errorService = require('../../helper/errorService');
const { resErrorModify, resDataModify } = require('../../helper/until');
exports.getList = async (req, res) => {
  const result = await ContentService.getList();
  resDataModify(res, result);
};
exports.getById = async (req, res) => {
  const result = await ContentService.getById(req.params.id);
  resDataModify(res, result);
};
exports.create = async (req, res) => {
  until.validateJson(createSchema, req.body);
  const result = await ContentService.create(req.body);
  resDataModify(res, result);
};
exports.update = async (req, res) => {
  const result = await ContentService.update(req);
  resDataModify(res, result);
};
exports.delete = async (req, res) => {
  until.validateJson(deleteContent, req.body);
  const result = await ContentService.delete(req.params.id, req.body.courserId);
  resDataModify(res, result);
};
exports.triggerAnswer = async (req, res) => {
  until.validateJson(triggerAnswerSchema, req.body);
  const result = await ContentService.triggerAnswer(req.params.id, req.body);
  resDataModify(res, result);
};
