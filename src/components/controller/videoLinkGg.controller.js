const VideoLinkGgService = require('../services/videoLinkGg.services');
const { createSchema, updateSchema } = require('./videoLinkGg.schema');
const until = require('../services/untilServices');
const { resErrorModify, resDataModify } = require('../../helper/until');
const { ErrorService } = require('../../helper/errorService');
exports.getList = async (req, res) => {
  const result = await VideoLinkGgService.getList();
  resDataModify(res, result);
};
exports.getById = async (req, res) => {
  const result = await VideoLinkGgService.getById(req.params.id);
  resDataModify(res, result);
};
exports.create = async (req, res) => {
  until.validateJson(createSchema, req.body);
  const result = await VideoLinkGgService.create(req.body);
  resDataModify(res, result);
};
exports.update = async (req, res) => {
  until.validateJson(updateSchema, req.body);
  const { practice } = req.body;
  for (let prac of practice) {
    if (!Array.isArray(prac.answer))
      return resErrorModify(res, { message: 'answer phải là một mảng!' });
    if (prac.answer.length <= prac.answer_id || prac.answer_id < 0)
      return resErrorModify(res, { message: 'answer_id được đánh từ số 0!' });
  }
  const result = await VideoLinkGgService.update(req);
  resDataModify(res, result);
};
exports.delete = async (req, res) => {
  const result = await VideoLinkGgService.delete(req.params.id);
  resDataModify(res, result);
};
exports.refresh = async (req, res) => {
  const result = await VideoLinkGgService.refresh();
  resDataModify(res, result);
};
