const { socketConst } = require('./const')
const _ = require('lodash')
module.exports = function (io, clients) {
    io.sockets.emit(socketConst.emitFriendOnline, { userOnline: _.keys(clients) })
}