const TopicsService = require('../services/topics.services');
const { createSchema, creataAdminSchema } = require('./topics.schema');
const until = require('../services/untilServices');
const { resErrorModify, resDataModify } = require('../../helper/until');
const { ErrorService } = require('../../helper/errorService');
const { io } = require('../../../server');
const { typeNotify } = require('../model/notify.model');
exports.getList = async (req, res) => {
  const result = await TopicsService.getList();
  resDataModify(res, result);
};
exports.getById = async (req, res) => {
  const result = await TopicsService.getById(req.params.id);
  resDataModify(res, result);
};
exports.create = async (req, res) => {
  until.validateJson(createSchema, req.body);
  const result = await TopicsService.create(req.body);
  io.emit(typeNotify.createTopic, { ...result });
  resDataModify(res, result);
};
exports.update = async (req, res) => {
  const result = await TopicsService.update(req);
  io.emit(typeNotify.updateTopic, { ...result });
  resDataModify(res, result);
};
exports.delete = async (req, res) => {
  const result = await TopicsService.delete(req.params.id);
  io.emit(typeNotify.deleteTopic, { ...result });
  resDataModify(res, result);
};
exports.createAdmin = async (req, res) => {
  until.validateJson(creataAdminSchema, req.body);
  const result = await TopicsService.createAdmin(req.body.title, req.body.voca);
  resDataModify(res, result);
};
