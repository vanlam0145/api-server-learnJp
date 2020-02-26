const _ = require('lodash')
const errorService = require('./errorService')
exports.authMiddleware = (role) => (req, res, next) => {
    if (_.indexOf(_.isArray(role) ? role : [role], req.headers['x-token']) != -1) {
        next()
    } else {
        res.status(errorService.error.badToken().code).send(errorService.error.badToken())
    }
}