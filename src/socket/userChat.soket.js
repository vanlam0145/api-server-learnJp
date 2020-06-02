const { authMiddlewareSocket } = require('../helper/until');
const { validateJsonSocket } = require('../components/services/untilServices');
const { MessageChatModel } = require('../components/model/messageChat.model');
const { socketConst } = require('./const');
const { UserModel } = require('../components/model/users.model');
const Types = require('mongoose').Types;

module.exports = function (socket, io, clients) {
  if (socket.auth) {
    socket.on(socketConst.onCreateMessage, async (newMessage, callback) => {
      const ivalid = validateJsonSocket(
        {
          type: 'object',
          properties: {
            message: { type: 'string' },
            receiver: { type: 'string' },
          },
          required: ['message', 'receiver'],
        },
        newMessage,
        io
      );
      if (ivalid == true) {
        try {
          if (!Types.ObjectId.isValid(newMessage.receiver)) throw Error('Khong dung dinh dang!');
          const userReveiver = await UserModel.findById(newMessage.receiver);
          if (!userReveiver) throw Error('Khong tim thay nguoi nhan');
          const message = await MessageChatModel.create({
            message,
            sender: socket.user._id,
            receiver: newMessage.userReveiver,
          });
          const userNotSeen = await MessageChatModel.aggregate([
            { $match: { seen: false, receiver: newMessage.userReveiver } },
            { $group: { _id: '$sender' } },
          ]);
          io.to(newMessage.userReveiver).emit(socketConst.emitCreateMessage, {
            ...message,
            count: userNotSeen.length,
          });
        } catch (error) {
          io.to(socket.id).emit(socketConst.emitAnyError, {
            code: 601,
            message: JSON.stringify(error),
          });
        }
      }
      callback();
    });
  }
};
