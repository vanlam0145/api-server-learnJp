const CommentsModel = require('../model/comments.model');
const Types = require('mongoose').Types;
const errorService = require('../../helper/errorService');
const untilServices = require('./untilServices');
exports.getList = async () => await CommentsModel.find({}).exec();
exports.getListByChallange = async (id) =>
  await CommentsModel.aggregate([
    { $match: { idChallenge: Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'users',
        localField: 'idUser',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    { $addFields: { userName: '$user.username', avatar: '$user.avatar' } },
  ]);
exports.getById = async (id) => await CommentsModel.findById(id).exec();
exports.create = async function (body) {
  return await untilServices.exec(CommentsModel.create(body));
};
exports.delete = async (id) => {
  return await CommentsModel.findByIdAndDelete(id).exec();
};
