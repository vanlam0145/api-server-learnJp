const { authMiddlewareSocket } = require('../helper/until')
const { validateJsonSocket } = require('../components/services/untilServices')
const CommentModel = require('../components/model/comments.model')
const socketIO = require('socket.io');

module.exports = function (server) {
    const io = socketIO(server);
    io.on('connection', (socket) => {
        authMiddlewareSocket(['admin', 'user'], socket, io)
        socket.on('join', (params, callback) => {
            authMiddlewareSocket(['admin', 'user'], socket, io)
            socket.join(params.room);
            callback();
        })
        socket.on('createComment', async (newComment, callback) => {
            authMiddlewareSocket(['admin', 'user'], socket, io)
            if (socket.auth) {
                const ivalid = validateJsonSocket({
                    type: 'object',
                    properties: {
                        room: { type: 'string' },
                        comment: { type: 'string' }
                    },
                    required: ['room', 'comment']
                }, newComment, io)
                if (ivalid == true) {
                    const commentSave = await CommentModel.create({
                        idChallenge: newComment.room,
                        content: newComment.comment,
                        idUser: socket.user._id
                    })
                    io.to(comment.room).emit('newComment', {
                        ...comment,
                        userName: socket.user.username ? socket.user.username : socket.user.email,
                        ...commentSave
                    })
                }
            }
            callback()
        })
        socket.on('updateComment', async (updateComment, callback) => {
            authMiddlewareSocket(['admin', 'user'], socket, io)
            if (socket.auth) {
                const ivalid = validateJsonSocket({
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        room: { type: 'string' },
                        commentUp: { type: 'string' }
                    },
                    required: ['_id', 'room', 'commentUp']
                }, updateComment, io)
                if (ivalid == true) {
                    const updateComment = await CommentModel.findByIdAndUpdate(updateComment._id, {
                        content: updateComment.commentUp,
                    }).lean()
                    io.to(comment.room).emit('newComment', {
                        ...comment,
                        userName: socket.user.username ? socket.user.username : socket.user.email,
                        ...updateComment
                    })
                }
            }
            callback()
        })
        socket.on('disconnect', () => {
            console.log("disconnetDone!s")
        })
    })
}