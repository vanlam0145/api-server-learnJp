const socketIO = require('socket.io');

module.exports = function (server) {
    const io = socketIO(server);
    let clients = {}
    io.on('connection', (socket) => {
        console.log("hear!")
        require('./userCommant.socket')(socket, io)
        require('./userAddfiend')(socket, io, clients)
    })
    //
}