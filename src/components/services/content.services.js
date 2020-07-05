const { ContentModel } = require('../model/content.model');
const { ErrorService } = require('../../helper/errorService');
const untilServices = require('./untilServices');
const _ = require('lodash');
const { CourseModel } = require('./course.services');
exports.ContentModel = ContentModel;
exports.getList = async () => await ContentModel.find({}).exec();
exports.getById = async (id) => await ContentModel.findById(id).exec();
exports.create = async function (body) {
  return await untilServices.exec(ContentModel.create(body));
};
exports.update = async (req) => {
  return await untilServices.exec(
    ContentModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: _.pick(req.body, ['text', 'mean']) },
      { new: true }
    )
  );
};
exports.delete = async (id, idCourser) => {
  try {
    const content = await ContentModel.findOneAndDelete({ _id: id });

    await CourseModel.findByIdAndUpdate(
      idCourser,
      {
        $pull: { contents: id },
      },
      { new: true }
    );
    return content;
  } catch (error) {
    throw ErrorService.somethingWentWrong(error);
  }
};
exports.triggerAnswer = async (id, body) => {
  const content = await ContentModel.findById(id);
  let totalClickLearn = 0,
    totalTrueLearn = 0,
    totalClickListen = 0,
    totalTrueListen = 0,
    totalClickWrite = 0,
    totalTrueWrite = 0;

  switch (body.type) {
    case 'learn':
      totalClickLearn = 1;
      if (body.answer == true) totalTrueLearn = 1;
      break;
    case 'listen':
      totalClickListen = 1;
      if (body.answer == true) totalTrueListen = 1;
      break;
    case 'write':
      totalClickWrite = 1;
      if (body.answer == true) totalTrueWrite = 1;
      break;
    default:
      break;
  }

  //tinh nam vung
  let totalCLick =
    content.totalClickLearn +
    totalClickLearn +
    content.totalClickListen +
    totalClickListen +
    content.totalClickWrite +
    totalClickWrite;
  let totalTrue =
    content.totalTrueLearn +
    totalTrueLearn +
    content.totalTrueListen +
    totalTrueListen +
    content.totalTrueWrite +
    totalTrueWrite;
  let masterContent = false;
  if (totalTrue / totalCLick >= 0.8) {
    masterContent = true;
  }
  return await untilServices.exec(
    ContentModel.findOneAndUpdate(
      { _id: id },
      {
        $inc: {
          totalClickLearn: totalClickLearn,
          totalTrueLearn: totalTrueLearn,
          totalClickListen: totalClickListen,
          totalTrueListen: totalTrueListen,
          totalClickWrite: totalClickWrite,
          totalTrueWrite: totalTrueWrite,
        },
        masterContent,
      },
      { new: true }
    )
  );
};
