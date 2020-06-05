const { AnswerHistoryModel } = require('../model/answerHistory.model');
const { ErrorService } = require('../../helper/errorService');
const untilServices = require('./untilServices');
exports.AnswerHistoryModel = AnswerHistoryModel;
exports.getList = async (filter) => await AnswerHistoryModel.find({ ...filter }).exec();
exports.getById = async (id) => await AnswerHistoryModel.findById(id).exec();
exports.create = async function (body) {
  
  return await untilServices.exec(AnswerHistoryModel.create(body));
};
exports.update = async (req) => {
  return await untilServices.exec(
    AnswerHistoryModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
  );
};
exports.delete = async (id) => {
  return await untilServices.exec(AnswerHistoryModel.findOneAndDelete({ _id: id }));
};
