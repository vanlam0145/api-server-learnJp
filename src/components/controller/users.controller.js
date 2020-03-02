const UsersService = require('../services/users.services')
const usersSchema = require('./users.schema')
const Types = require('mongoose').Types
const errorService = require('../../helper/errorService')
const until = require('../services/untilServices')
const typeToken = {
    accessToken: 'access',
    refreshToken: 'refresh'
}
const jwt = require('jsonwebtoken')

exports.getList = (req, res) => {
    UsersService.getList()
        .then(result => {
            if (result) res.send(result)
            else res.send('kaka')
        })
        .catch(err => {if (err) throw err})
}
exports.getById = (req, res) => {
    UsersService.getById(req.params.id)
        .then(result => {
            if (result) res.send(result)
            else res.send('kaka')
        })
        .catch(err => {if (err) throw err})
}
exports.create = (req, res) => {
    const vali = until.validateJson((new usersSchema()).createSchema, req.body)
    if (!vali.isValid) res.status(500).json({mess: vali.message})
    else UsersService.create(req.body).then(result => {
        if (result.code) res.status(result.code).json(result)
        else res.status(201).json(result)
    })
}
exports.login = (req, res) => {
    UsersService.login(req.body).then(result => {
        if (result.code) res.status(result.code).json(result)
        else {
            res.status(200).json({
                ...result,
                //avatar: avatarCtr.getImgUrl(response.avatar),
                isGuest: false,
                ...(!'' && {token: _createToken(result, '').token})
            });
        }
    })
}
exports.au = (role = '') => async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]
        if (token)
            jwt.verify(token, !role ? process.env.TOKEN_SECRET : process.env.TOKEN_ADMIN_SECRET, async (err, decoded) => {
                if (err)
                    res.status(errorService.error.anyError(err.message, 401).code).json(errorService.error.anyError(err.message, 401))
                else {
                    const user = await UsersService.UsersModel.findById(decoded._id).select('-hash').lean()
                    if (!user) res.status(errorService.error.badToken().code).json(errorService.error.badToken())
                    else {
                        req.user = user
                        next()
                    }
                }
            })
        else res.status(errorService.error.badToken().code).json(errorService.error.badToken())
    }
    else res.status(errorService.error.anyError("Token is required", 500).code).json(errorService.error.anyError("Token is required", 500))
}
exports.me = (req, res, next) => {
    const {_id} = req.user
    if (!Types.ObjectId.isValid(_id))
        console.log("1")
    else UsersService
        .getMe(_id)
        .then(response =>
            res.json({
                ...response,
                //avatar: avatarCtr.getImgUrl(response.avatar)

            })
        )
        .catch(err => next(err))
}
exports.getCourseLatest = (req, res) => {
    UsersService.getCourseLatest(req.user._id)
        .then(response => {
            if (response.code) res.status(response.code).json({response})
            else
                res.status(200).json({
                    ...response,
                    //avatar: avatarCtr.getImgUrl(response.avatar)
                })
        })
}
const _createToken = (user, role = '') => {
    const payload = {
        email: user.email,
        _id: user._id.toString(),
        type: typeToken.accessToken,
        role
    }
    return {
        token: jwt.sign(payload, !role ? process.env.TOKEN_SECRET : process.env.TOKEN_ADMIN_SECRET, {
            expiresIn: !role ? process.env.TOKEN_EXPIRED : process.env.TOKEN_ADMIN_EXPIRED
        })
    }
}
exports.addImage = (req, res) => {

}
