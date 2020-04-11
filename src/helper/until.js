const _ = require('lodash')
const { error } = require('./errorService')
const jwt = require('jsonwebtoken')
exports.authMiddleware = (roles) =>
    (req, res, next) => {
        try {
            let token = req.headers['x-access-token'] || req.headers.authorization.split(' ')[1]
            if (token) {
                let decode = jwt.verify(token, process.env.TOKEN_SECRET)
                req.user = decode;
                console.log("user Login", req.user)
                if (roles.indexOf(req.user.role) === -1)
                    return res.status(error.badToken.code).json(error.badToken)
                else next();
            } else {
                return res.status(error.unauthorized.code).json(error.unauthorized)
            }
        } catch (err) {
            if (err.name == 'TokenExpiredError')
                return res.status(error.tokenExpired.code).json(error.tokenExpired)
            return res.status(500).json({ message: 'JsonWebTokenError' })
        }
    }
exports.resErrorModify = (res, error) => {
    console.log(error)
    return res.status(error.code).json(error)
}
exports.resDataModify = (res, data, code = 200) => {
    return res.status(code).json({ code, result: data })
}