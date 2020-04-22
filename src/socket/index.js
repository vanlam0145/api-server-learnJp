const socketIO = require('socket.io');

module.exports = function (server) {
    const io = socketIO(server);
    require('./userCommant.socket')(server, io)
    require('./userAddfiend')(server, io)
}