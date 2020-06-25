const { AlphabetModel } = require('../model/alphabet.model');
const { ErrorService } = require('../../helper/errorService');
const { CountIndexModel, typeEnum } = require('../model/countIndex.model');
const untilServices = require('./untilServices');
exports.AlphabetModel = AlphabetModel;
exports.getList = async () => await AlphabetModel.find({}).exec();
exports.getById = async (id) => await AlphabetModel.findById(id).exec();
exports.create = async function (body) {
  let count = await CountIndexModel.findOneAndUpdate(
    { type: typeEnum.alphabet },
    { $inc: { number: 1 } }
  );
  if (!body.number) body.number = count.number;
  return await untilServices.exec(AlphabetModel.create(body));
};
exports.update = async (req) => {
  delete req.body.singleVowel;
  delete req.body.doubleVowel;
  delete req.body.name;
  return await untilServices.exec(
    AlphabetModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
  );
};
exports.delete = async (id) => {
  return await untilServices.exec(AlphabetModel.findOneAndDelete({ _id: id }));
};
