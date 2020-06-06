const { TimeOnlineModel } = require('../model/timeOnline.model');
const { ErrorService } = require('../../helper/errorService');
const untilServices = require('./untilServices');
exports.TimeOnlineModel = TimeOnlineModel;
exports.getList = async (filter) => await TimeOnlineModel.find({ ...filter }).exec();
exports.getById = async (id) => await TimeOnlineModel.findById(id).exec();
exports.create = async function (body) {
  for (let date of body.dateAr) {
    let result = await TimeOnlineModel.findOneAndUpdate(
      { userId: body.userId, date: date.date },
      {
        $inc: { minute: date.minute },
      },
      { new: true }
    );
    if (!result) await TimeOnlineModel.create({ userId: body.userId, ...date });
    else if (result.minute > 1440) await result.update({ minute: 1440 });
  }

  return await TimeOnlineModel.find({
    date: { $in: body.dateAr.map((value) => value.date) },
    userId: body.userId,
  });
};
exports.update = async (req) => {
  return await untilServices.exec(
    TimeOnlineModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
  );
};
exports.delete = async (id) => {
  return await untilServices.exec(TimeOnlineModel.findOneAndDelete({ _id: id }));
};
