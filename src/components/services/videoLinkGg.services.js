const VideoLinkGgModel = require('../model/videoLinkGg.model');
const { ErrorService } = require('../../helper/errorService');
const untilServices = require('./untilServices');
const driverGoogle = require('../../helper/googleDriverApi');
const fs = require('fs');
const _ = require('lodash');
const videoLinkGgModel = require('../model/videoLinkGg.model');
exports.VideoLinkGgModel = VideoLinkGgModel;
exports.getList = async () =>
  await VideoLinkGgModel.find({}).sort({ name: 1 }).exec();
exports.getById = async (id) => await VideoLinkGgModel.findById(id).exec();
exports.create = async function (body) {
  return await untilServices.exec(VideoLinkGgModel.create(body));
};
exports.update = async (req) => {
  return await untilServices.exec(
    VideoLinkGgModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
  );
};
exports.delete = async (id) => {
  return await untilServices.exec(
    VideoLinkGgModel.findOneAndDelete({ _id: id })
  );
};
exports.refresh = async () => {
  const content = fs.readFileSync('credentials.json');
  const auth = await driverGoogle.authorize(JSON.parse(content));
  const files = await driverGoogle.listFiles(
    auth,
    '1shN0LwAfmPeq9FSUBDK-7S47Bltarbml',
    'video/mp4'
  );
  let bulk = videoLinkGgModel.collection.initializeUnorderedBulkOp();
  files.forEach((file) => {
    bulk
      .find({ id: file.id })
      .update({ $set: { thumbnailLink: file.thumbnailLink } });
  });
  try {
    await bulk.execute();
    return { message: 'Hãy tải lại trang!' };
  } catch (error) {
    throw ErrorService.somethingWentWrong(error);
  }
};
