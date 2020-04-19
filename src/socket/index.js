
module.exports = function (server) {
    require('./userCommant.socket')(server)
    require('./userAddfiend')(server)
}