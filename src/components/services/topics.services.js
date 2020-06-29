const { TopicModel } = require('../model/topics.model');
const { VocabularieModel } = require('../model/vocabularies.model');
const { CountIndexModel, typeEnum } = require('../model/countIndex.model');
const { ErrorService } = require('../../helper/errorService');
const untilServices = require('./untilServices');
const vocabulariesModel = require('../model/vocabularies.model');
const _ = require('lodash');
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
exports.learn = async (id) => {
  let topic = await TopicModel.findById(id);
  if (!topic) throw ErrorService.dataEmpty('Không tìm thấy topic!');
  let vocabularies = await VocabularieModel.find({ topicId: id });
  if (!vocabularies) throw ErrorService.dataEmpty('Topic không có từ vựng!');
  let result = [];
  vocabularies.forEach((voca, index) => {
    var answer = [];
    var randomAr = [index];
    let fl = 0;
    while (randomAr.length < 4) {
      let random = _.random(0, vocabularies.length - 1);
      if (!_.includes(randomAr, random)) {
        randomAr.push(random);
      }
      fl += 1;
      if (fl == vocabularies.length * 5) {
        break;
      }
    }
    var randomArShuffle = _.shuffle(randomAr);
    for (let i = 0; i < randomArShuffle.length; i++) {
      answer.push(vocabularies[randomArShuffle[i]].vocabulary_meaning);
    }
    result.push({
      question: voca.text || voca.kanji_text,
      answer,
      _id: voca._id,
      answer_id: _.findIndex(randomArShuffle, (key) => key == index),
      kanji_text: voca.kanji_text,
      kanji_meaning: voca.kanji_meaning,
    });
  });
  return result;
};
