const { TopicModel } = require('../model/topics.model');
const { VocabularieModel } = require('../model/vocabularies.model');
const { CountIndexModel, typeEnum } = require('../model/countIndex.model');
const { ErrorService } = require('../../helper/errorService');
const untilServices = require('./untilServices');
const vocabulariesModel = require('../model/vocabularies.model');
exports.TopicModel = TopicModel;
exports.getList = async () =>
  await TopicModel.find({}).sort({ number: 1 }).exec();
exports.getById = async (id) => await TopicModel.findById(id).exec();
exports.create = async function (body) {
  const num = await CountIndexModel.findOneAndUpdate(
    { type: typeEnum.topic },
    { $inc: { number: 1 } }
  );
  return await untilServices.exec(
    TopicModel.create({ ...body, number: num.number })
  );
};
exports.update = async (req) => {
  return await untilServices.exec(
    TopicModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
  );
};
exports.delete = async (id) => {
  return await untilServices.exec(TopicModel.findOneAndDelete({ _id: id }));
};
exports.createAdmin = async (title, vocal) => {
  const num = await CountIndexModel.findOneAndUpdate(
    { type: typeEnum.topic },
    { $inc: { number: 1 } }
  );
  const topic = await TopicModel.create({ title, number: num.number });
  let vocals = [];
  for (let vo of vocal) {
    vocals.push(new VocabularieModel({ ...vo, topicId: topic._id }));
  }
  let vocabularies = await VocabularieModel.insertMany(vocals);
  return { topic, vocabularies };
};
