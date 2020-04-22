const { authMiddlewareSocket } = require('../helper/until')
const { validateJsonSocket } = require('../components/services/untilServices')
const CommentModel = require('../components/model/comments.model')

module.exports = function (server,io) {
    io.on('connection', (socket) => {
        //authMiddlewareSocket(['admin', 'user'], socket, io)
        socket.on('join', (params, callback) => {
            authMiddlewareSocket(['admin', 'user'], socket, io, params.room)
            console.log(params, "join")
            socket.join(params.room);
            callback();
        })
        socket.on('createComment', async (newComment, callback) => {
            authMiddlewareSocket(['admin', 'user'], socket, io, newComment.room)
            if (socket.auth) {
                const ivalid = validateJsonSocket({
                    type: 'object',
                    properties: {
                        room: { type: 'string' },
                        content: { type: 'string' }
                    },
                    required: ['room', 'comment']
                }, newComment, io, newComment.room)
                if (ivalid == true) {
                    console.log(newComment, "createComment")
                    const commentSave = (await CommentModel.create({
                        idChallenge: newComment.room,
                        content: newComment.comment,
                        idUser: socket.user._id
                    })).toJSON()
                    io.to(newComment.room).emit('newComment', {
                        ...newComment,
                        userName: socket.user.username ? socket.user.username : socket.user.email,
                        ...commentSave
                    })
                }
            }
            callback(newComment.room)
        })
        socket.on('updateComment', async (updateComment, callback) => {
            authMiddlewareSocket(['admin', 'user'], socket, io, updateComment.room)
            console.log(updateComment, "updateComment")
            if (socket.auth) {
                const ivalid = validateJsonSocket({
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        room: { type: 'string' },
                        commentUp: { type: 'string' }
                    },
                    required: ['_id', 'room', 'commentUp']
                }, updateComment, io, updateComment.room)
                if (ivalid == true) {
                    const newCom = await CommentModel.findByIdAndUpdate(updateComment._id, {
                        content: updateComment.commentUp,
                    }, { new: true }).lean()
                    io.to(updateComment.room).emit('newComment', {
                        room: updateComment.room,
                        userName: socket.user.username ? socket.user.username : socket.user.email,
                        ...newCom
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