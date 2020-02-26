module.exports = function (io, User) {
    const users = new User();
    io.on('connection', (socket) => {
        console.log('user connected');
        socket.on('join', (params, callback) => {
            socket.join(params.room);
            users.AddUserData(socket.id, params.name, params.room);
            //console.log(users);
            // secureIO.to(params.room).emit('usersList', users.GetUsersList(params.room));
            callback();
        })
        socket.on('createComment', (comment, callback) => {
            console.log(comment);
            io.to(comment.room).emit('newComment', {...comment})
            callback()
        })
        socket.on('disconnect', () => {
            console.log("dis")
            var user = users.RemoveUser(socket.id);
            // if (user) {
            //     io.to(user.room).emit('usersList', users.GetUsersList(user.room));
            // }
        })
    })
}