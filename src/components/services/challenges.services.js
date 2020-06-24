const { ChallengeModel } = require('../model/challenges.model');
const errorService = require('../../helper/errorService');
const untilServices = require('./untilServices');
const { result } = require('lodash');
const challengesModel = require('../model/challenges.model');
exports.getList = async () =>
  await ChallengeModel.find({}).sort({ index: 1 }).exec();
exports.getById = async (id) => await ChallengeModel.findById(id).lean();
exports.create = async function (body) {
  delete body.choice_1_voice;
  delete body.choice_2_voice;
  delete body.image;
  return await untilServices.exec(ChallengeModel.create(body));
};
exports.update = async (id, body) => {
  return await ChallengeModel.findByIdAndUpdate(id, body, { new: true });
};
exports.delete = async (id) => {
  return await ChallengeModel.findByIdAndDelete(id);
};
exports.addFile = async (id, type, name) => {
  return await ChallengeModel.findByIdAndUpdate(
    id,
    {
      $set: {
        [type]: name,
      },
    },
    { new: true }
  );
};
