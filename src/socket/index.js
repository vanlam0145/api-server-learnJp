const socketIO = require('socket.io');
const _ = require('lodash');
const { authMiddlewareSocket } = require('../helper/until');
module.exports = function (server) {
  const io = socketIO(server);
  let clients = {};
  io.on('connection', (socket) => {
    authMiddlewareSocket(['admin', 'user'], socket, io);
    if (socket.auth) {
      console.log('hear!');
      if (clients[socket.user._id]) clients[socket.user._id].push(socket.id);
      else clients[socket.user._id] = [socket.id];

      require('./userFriendOnline.socket')(io, clients)
      require('./userCommant.socket')(socket, io);
      require('./userAddfiend')(socket, io, clients);
      require('./userChat.soket')(socket, io, clients);

      socket.on('disconnect', () => {
        console.log('disconnetDone!');
        clients[socket.user._id] = clients[socket.user._id].filter(
          (socketId) => !_.isEqual(socketId, socket.id)
        );
        if (!clients[socket.user._id].length) delete clients[socket.user._id].length;
      });
    }
  });
  //
};
