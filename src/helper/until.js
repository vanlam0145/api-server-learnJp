const _ = require('lodash')
const { ErrorService } = require('./errorService')
const jwt = require('jsonwebtoken')
exports.authMiddleware = (roles) =>
    (req, res, next) => {
        try {
            let token = req.headers['x-access-token'] || (req.headers.authorization ? req.headers.authorization.split(' ')[1] : "")
            if (token) {
                let decode = jwt.verify(token, process.env.TOKEN_SECRET)
                req.user = decode;
                if (roles.indexOf(req.user.role) === -1)
                    return res.status(ErrorService.badToken.code).json(ErrorService.badToken)
                else next();
            } else {
                return res.status(ErrorService.unauthorized.code).json(ErrorService.unauthorized)
            }
        } catch (err) {
            if (err.name == 'TokenExpiredError')
                return res.status(ErrorService.tokenExpired.code).json(ErrorService.tokenExpired)
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
exports.serverWithPort=(port)=>{
    if(port==4000)
        return `http://localhost:4000`
    return `https://jp-server-kltn.herokuapp.com`
}