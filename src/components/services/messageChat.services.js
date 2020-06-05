const { MessageChatModel } = require('../model/messageChat.model');
const { ErrorService } = require('../../helper/errorService');
const untilServices = require('./untilServices');
exports.MessageChatModel = MessageChatModel;
exports.getList = async () => await MessageChatModel.find({}).exec();
exports.getById = async (id) => await MessageChatModel.findById(id).exec();
exports.create = async function (body) {
  return await untilServices.exec(MessageChatModel.create(body));
};
exports.update = async (req) => {
  return await untilServices.exec(
    MessageChatModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
  );
};
exports.delete = async (id) => {
  return await untilServices.exec(MessageChatModel.findOneAndDelete({ _id: id }));
};
exports.ofFriend = async (req) => {
  return await untilServices.exec(
    MessageChatModel.find({
      $or: [
        { sender: req.user._id, receiver: req.body.friend },
        { sender: req.body.friend, receiver: req.user._id },
      ],
    })
  );
};
