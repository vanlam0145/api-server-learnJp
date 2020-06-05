const { authMiddlewareSocket } = require('../helper/until');
const { validateJsonSocket } = require('../components/services/untilServices');
const { MessageChatModel, reactionMessageEnum } = require('../components/model/messageChat.model');
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
            message: newMessage.message,
            sender: socket.user._id,
            receiver: newMessage.receiver,
          });
          const userNotSeen = await MessageChatModel.aggregate([
            { $match: { seen: false, receiver: Types.ObjectId(newMessage.receiver) } },
            { $group: { _id: '$sender' } },
          ]);
          if (clients[newMessage.userReveiver]) {
            clients[newMessage.userReveiver].forEach((socketId) => {
              io.sockets.connected[socketId].emit(socketConst.emitRejectAddFriend, {
                ...message,
                count: userNotSeen.length,
              });
            });
          }
        } catch (error) {
          console.log('socketConst.emitAnyError', error);
          io.to(socket.id).emit(socketConst.emitAnyError, {
            code: 601,
            message: error,
          });
        }
      }
      callback();
    });
    //addReaction
    socket.on(socketConst.onAddRectionMess, async (message, callback) => {
      const ivalid = validateJsonSocket(
        {
          type: 'object',
          properties: {
            messageId: { type: 'string' },
            typeReact: { type: 'string', enum: Object.keys(reactionMessageEnum) },
          },
          required: ['messageId', 'typeReact'],
        },
        message,
        io
      );
      if (ivalid == true) {
        try {
          const findMessage = await MessageChatModel.findById(message.messageId);
          if (!findMessage) throw Error('Khong tim thay tin nhan!');
          let doc = {};
          if (findMessage.seen == false) {
            doc['seen'] = true;
            doc['seenAt'] = new Date();
          }
          doc['reaction'] = message.typeReact;

          let emitTo = '';
          if (socket.user._id == findMessage.sender) {
            emitTo = findMessage.receiver;
          } else {
            emitTo = findMessage.sender;
          }
          await findMessage.update({ doc });

          if (clients[emitTo]) {
            clients[emitTo].forEach((socketId) => {
              io.sockets.connected[socketId].emit(socketConst.emitRejectAddFriend, {
                ...findMessage,
                reaction: message.typeReact,
              });
            });
          }
        } catch (error) {
          console.log('socketConst.emitRejectAddFriend', error);
          io.to(socket.id).emit(socketConst.emitAnyError, {
            code: 601,
            message: error,
          });
        }
      }
    });
  }
};
