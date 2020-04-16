const { authMiddlewareSocket } = require('../helper/until')
const { validateJsonSocket } = require('../components/services/untilServices')
const socketIO = require('socket.io');

module.exports = function (server) {
    const io = socketIO(server);
    io.on('connection', (socket) => {
        authMiddlewareSocket(['admin', 'user'], socket, io)
        socket.on('join', (params, callback) => {
            authMiddlewareSocket(['admin', 'user'], socket, io)
            console.log(socket.user, 'connect', params.room)
            socket.join(params.room);
            callback();
        })
        socket.on('createComment', (comment, callback) => {
            authMiddlewareSocket(['admin', 'user'], socket, io)
            if (socket.auth) {
                const ivalid = validateJsonSocket({
                    type: 'object',
                    properties: {
                        name: { type: 'string' }
                    },
                    required: []
                }, comment, io)
                if (ivalid == true) {
                    console.log(comment, socket.user);
                    io.to(comment.room).emit('newComment', { ...comment })
                }
            }
            callback()
        })
        socket.on('disconnect', () => {
            console.log("dis")
        })
    })
}