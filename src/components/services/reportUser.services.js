const ReportUserModel = require('../model/reportUser.model');
const { UserModel } = require('../model/users.model');
const CommentModel = require('../model/comments.model');
const { ErrorService } = require('../../helper/errorService');
const untilServices = require('./untilServices');
exports.ReportUserModel = ReportUserModel;
exports.getList = async () => await ReportUserModel.find({}).exec();
exports.getById = async (id) => {
  await ReportUserModel.updateOne({ _id: id }, { $set: { confirm: 'seen' } }, { new: true });
  return await ReportUserModel.findById(id).exec();
};
exports.create = async function (body) {
  const comment = await CommentModel.findById(body.commentId);
  if (!comment) throw ErrorService.somethingWentWrong('Không tìm thấy comment bị report');
  return await untilServices.exec(ReportUserModel.create({ ...body, accusedId: comment.idUser }));
};
exports.update = async (req) => {
  if (req.user.role == 'user') {
    const reportData = await ReportUserModel.findOne({
      _id: req.params.id,
      accusersId: req.user._id,
    });
    if (!reportData)
      throw ErrorService.somethingWentWrong('Report này không thuộc sở hữu của bạn!');
  }
  delete req.body.accusersId;
  delete req.body.accusedId;
  delete req.body.commentId;
  delete req.body.status;
  if (['helpful', 'harmful'].indexOf(req.body.confirm) != -1) req.body.status = 'processed';
  else {
    delete req.body.confirm;
    req.body.status = 'process';
  }
  return await untilServices.exec(
    ReportUserModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
  );
};
exports.deleteOne = async (req) => {
  if (req.user.role == 'user') {
    const reportData = await ReportUserModel.findOne({
      _id: req.params.id,
      accusersId: req.user._id,
    });
    if (!reportData)
      throw ErrorService.somethingWentWrong('Report này không thuộc sở hữu của bạn!');
  }
  return await untilServices.exec(ReportUserModel.findOneAndDelete({ _id: req.params.id }));
};
