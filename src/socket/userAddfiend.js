const { authMiddlewareSocket } = require('../helper/until')
const { validateJsonSocket } = require('../components/services/untilServices')
const UserModel = require('../components/model/users.model')
const { socketConst } = require('./const')
const _ = require('lodash')
module.exports = function (socket, io, clients) {
    authMiddlewareSocket(['admin', 'user'], socket, io)
    if (socket.auth) {
        if (clients[socket.user._id]) clients[socket.user._id].push(socket.id)
        else clients[socket.user._id] = [socket.id]
        socket.on(socketConst.onAddFriend, async (createAddFriend, callback) => {
            console.log(createAddFriend)
            authMiddlewareSocket(['admin', 'user'], socket, io)
            if (socket.auth) {
                const ivalid = validateJsonSocket({
                    type: 'object',
                    properties: {
                        receiverId: { type: 'string' },
                        receiverName: { type: 'string' },
                    },
                    required: ['receiverId', 'receiverName']
                }, createAddFriend, io)
                if (ivalid == true) {
                    let [friendsExist, userReciver, userSender] = await Promise.all([
                        UserModel.findOne({
                            _id: createAddFriend.receiverId,
                            'friends.userId': { $eq: socket.user._id }
                        }),
                        UserModel.findOneAndUpdate({
                            _id: createAddFriend.receiverId,
                            'request.userId': { $ne: socket.user._id },
                            'friends.userId': { $ne: socket.user._id },
                        }, {
                            $push: {
                                request: {
                                    userId: socket.user._id,
                                    username: socket.user.username ? socket.user.username : socket.user.email
                                }
                            },
                            $inc: {
                                totalRequest: 1
                            }
                        }, { new: true }).lean(),
                        UserModel.findOneAndUpdate({
                            _id: socket.user._id,
                            'sentRequest.userId': { $ne: createAddFriend.receiverId },
                            'friends.userId': { $ne: createAddFriend.receiverId }
                        }, {
                            $push: {
                                sentRequest: {
                                    userId: createAddFriend.receiverId,
                                    username: createAddFriend.receiverName
                                }
                            },
                            $inc: { totalSenderRequest: 1 }
                        }, { new: true }).lean()
                    ])
                    if (!friendsExist) {
                        if (clients[createAddFriend.receiverId]) {
                            clients[createAddFriend.receiverId].forEach(socketId => {
                                io.sockets.connected[socketId].emit(socketConst.emitAddFriend,
                                    {
                                        userSender: socket.user._id,
                                        userSenderName: socket.user.username
                                    })
                            });
                        }
                        if (clients[socket.user._id]) {
                            clients[socket.user._id].forEach(socketId => {
                                io.sockets.connected[socketId].emit(socketConst.emitAddFriend,
                                    {
                                        userSender: socket.user._id,
                                        userSenderName: socket.user.username
                                    })
                            });
                        }
                    } else {
                        if (clients[socket.user._id]) {
                            clients[socket.user._id].forEach(socketId => {
                                io.sockets.connected[socketId].emit(socketConst.emitAnyError,
                                    {
                                        code: 600,
                                        message: "Lỗi!, người nhận yêu cầu đã nằm trong danh sách bạn bè!"
                                    })
                            });
                        }
                    }
                }
            }
            callback()
        })
        socket.on(socketConst.onRejectAddFriend, async (userRejected, callback) => {
            authMiddlewareSocket(['admin', 'user'], socket, io)
            if (socket.auth) {
                const ivalid = validateJsonSocket({
                    type: 'object',
                    properties: {
                        receiverId: { type: 'string' },
                    },
                    required: ['receiverId']
                }, userRejected, io)
                if (ivalid == true) {
                    let [userReciver, userSender] = await Promise.all([
                        UserModel.findByIdAndUpdate(userRejected.receiverId, {
                            $pull: {
                                request: { userId: socket.user._id, }
                            },
                            $inc: { totalRequest: -1 }
                        }, { new: true }).lean(),
                        UserModel.findByIdAndUpdate(socket.user._id, {
                            $pull: {
                                sentRequest: { userId: userRejected.receiverId }
                            },
                            $inc: { totalSenderRequest: -1 }
                        }, { new: true }).lean()
                    ])
                    if (clients[userRejected.receiverId]) {
                        clients[userRejected.receiverId].forEach(socketId => {
                            io.sockets.connected[socketId].emit(socketConst.emitRejectAddFriend,
                                {
                                    userSender: socket.user._id,
                                    userSenderName: socket.user.username
                                })
                        });
                    }
                    if (clients[socket.user._id]) {
                        clients[socket.user._id].forEach(socketId => {
                            io.sockets.connected[socketId].emit(socketConst.emitRejectAddFriend,
                                {
                                    userSender: socket.user._id,
                                    userSenderName: socket.user.username
                                })
                        });
                    }
                }
            }
            callback()
        })
        socket.on(socketConst.onAcceptAddFriend, async (accecpt, callback) => {
            authMiddlewareSocket(['admin', 'user'], socket, io)
            if (socket.auth) {
                const ivalid = validateJsonSocket({
                    type: 'object',
                    properties: {
                        senderId: { type: 'string' },
                        senderName: { type: 'string' }
                    },
                    required: ['senderId', 'senderName']
                }, accecpt, io)
                if (ivalid == true) {
                    let [friendsExist, userReciver, userSender] = await Promise.all([
                        UserModel.findOne({
                            _id: socket.user._id,
                            'friends.userId': { $eq: accecpt.senderId }
                        }),
                        UserModel.findOneAndUpdate({
                            _id: socket.user._id,
                            'request.userId': { $eq: accecpt.senderId },
                            'friends.userId': { $ne: accecpt.senderId }
                        }, {
                            $pull: { request: { userId: accecpt.senderId } },
                            $inc: { totalRequest: -1 },
                            $push: { friends: { userId: accecpt.senderId, username: accecpt.senderName } }
                        }, { new: true }).lean(),
                        UserModel.findOneAndUpdate({
                            _id: accecpt.senderId,
                            'sentRequest.userId': { $eq: socket.user._id },
                            'friends.userId': { $ne: socket.user._id }
                        }, {
                            $pull: { sentRequest: { userId: socket.user._id } },
                            $inc: { totalSenderRequest: -1 },
                            $push: { friends: { userId: socket.user._id, username: socket.user.username } }
                        }, { new: true }).lean()
                    ])
                    if (!friendsExist) {
                        if (clients[createAddFriend.receiverId]) {
                            clients[createAddFriend.receiverId].forEach(socketId => {
                                io.sockets.connected[socketId].emit(socketConst.emitAcceptAddFriend,
                                    {
                                        userSender: socket.user._id,
                                        userSenderName: socket.user.username
                                    })
                            });
                        }
                        if (clients[socket.user._id]) {
                            clients[socket.user._id].forEach(socketId => {
                                io.sockets.connected[socketId].emit(socketConst.emitAcceptAddFriend,
                                    {
                                        userSender: socket.user._id,
                                        userSenderName: socket.user.username
                                    })
                            });
                        }
                    } else {
                        if (clients[socket.user._id]) {
                            clients[socket.user._id].forEach(socketId => {
                                io.sockets.connected[socketId].emit(socketConst.emitAnyError,
                                    {
                                        code: 601,
                                        message: "Lỗi!, người bạn muốn xác nhận đã nằm trong danh sách bạn bè!"
                                    })
                            });
                        }
                    }
                }
            }
            callback()
        })
        socket.on(socketConst.onReciverReject, async (reciverReject, callback) => {
            authMiddlewareSocket(['admin', 'user'], socket, io)
            if (socket.auth) {
                const ivalid = validateJsonSocket({
                    type: 'object',
                    properties: { senderId: { type: 'string' } },
                    required: ['senderId']
                }, reciverReject, io)
                if (ivalid == true) {
                    let [userReciver, userSender] = await Promise.all([
                        UserModel.findByIdAndUpdate(socket.user._id, {
                            $pull: {
                                request: { userId: reciverReject.senderId, }
                            },
                            $inc: { totalRequest: -1 }
                        }, { new: true }).lean(),
                        UserModel.findByIdAndUpdate(reciverReject.senderId, {
                            $pull: {
                                sentRequest: { userId: socket.user._id }
                            },
                            $inc: { totalSenderRequest: -1 }
                        }, { new: true }).lean()
                    ])
                    if (clients[userRejected.receiverId]) {
                        clients[userRejected.receiverId].forEach(socketId => {
                            io.sockets.connected[socketId].emit(socketConst.emitReciverReject,
                                {
                                    userSender: socket.user._id,
                                    userSenderName: socket.user.username
                                })
                        });
                    }
                    if (clients[socket.user._id]) {
                        clients[socket.user._id].forEach(socketId => {
                            io.sockets.connected[socketId].emit(socketConst.emitReciverReject,
                                {
                                    userSender: socket.user._id,
                                    userSenderName: socket.user.username
                                })
                        });
                    }
                }
            }
            callback()
        })
        socket.on('disconnect', () => {
            console.log("disconnetDone!")
            clients[socket.user._id] = clients[socket.user._id].filter(socketId => !_.isEqual(socketId, socket.id))
            if (!clients[socket.user._id].length) delete clients[socket.user._id].length
        })
    }
}