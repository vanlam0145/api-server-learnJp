const UsersModel = require('../model/users.model')
const { ErrorService } = require('../../helper/errorService')
const untilServices = require('./untilServices')
const { getDataDefault } = require('../../helper/until')
const imageGoogleDrive = require('../model/imageGoogleDrive.model')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
exports.UsersModel = UsersModel;
exports.getList = async () => await UsersModel.find({}).exec()
exports.notFriend = async (id) => {
    const user = getDataDefault(await UsersModel.findById(id).lean(), [])
    let send = getDataDefault(user.sentRequest, []).map(va => va.userId)
    let friend = getDataDefault(user.friends, []).map(va => va.userId)
    return await UsersModel.find({ _id: { $nin: _.union(_.concat(send, friend, [id])) } }).lean()
}
exports.senderAddFriend = async (id) => {
    const user = getDataDefault(await UsersModel.findById(id).lean(), [])
    let send = getDataDefault(user.sentRequest, []).map(va => va.userId)
    return await UsersModel.find({ _id: { $in: send } }).lean()
}
exports.requestAddFriend = async (id) => {
    const user = getDataDefault(await UsersModel.findById(id).lean(), [])
    let re = getDataDefault(user.request, []).map(va => va.userId)
    return await UsersModel.find({ _id: { $in: re } }).lean()
}
exports.getById = async (id) => await UsersModel.findById(id).exec()
exports.create = async function (body) {
    let role = 'user'
    if (process.env.CREATE_ADMIN_ACCOUNT) {
        if (body.token == process.env.CREATE_ADMIN_ACCOUNT)
            role = 'admin'
    }
    return await untilServices.exec(UsersModel.create({
        username: body.username,
        email: body.email,
        hash: bcrypt.hashSync(body.password, 10),
        role,
        phoneNumber: body.phoneNumber
    }))
}
exports.update = async (id, body) => {
    return await untilServices.exec(UsersModel.findByIdAndUpdate(id, { $set: body }, { new: true }))
}
exports.delete = async (id) => {
    return await UsersModel.findByIdAndDelete(id)
}
exports.login = async ({ username, password, email }) => {
    const user = await UsersModel.findOne({ ...(email ? { email } : { username }) })
    if (user && bcrypt.compareSync(password, user.hash)) {
        const u_user = await UsersModel.findByIdAndUpdate(user._id, {
            _id: user._id,
            isGuest: false,
            $inc: { countOnline: 1 },
            ...(email ? { typeLogin: UsersModel.type_login.EM } : { typeLogin: UsersModel.type_login.UN })
        }, { new: true })
        const { hash, ...userWithoutHash } = u_user.toJSON()
        return userWithoutHash
    } else throw ErrorService.loginFaild()
}
exports.getMe = async (id) => {
    return await UsersModel.findById(id).select('-hash').lean()
}
exports.getCourseLatest = async (id) => {
    const user = await UsersModel.findById(id)
        .populate({
            path: 'courses',
            populate: { path: 'contents' },
            options: { sort: '-create_at' }
        })
        .select('-hash')
    const { avatar, username, _id, courses, create_at, ...userExceptField } = user.toJSON()
    return {
        avatar,
        username,
        _id,
        courses,
        create_at
    }
}
exports.setAvartar = async (idimage, userID) => {
    const image = await imageGoogleDrive.findOne({ id: idimage, idUser: userID }).exec()
    if (!image || !image.webViewLink)
        throw ErrorService.somethingWentWrong("You don't have image!")
    return await UsersModel.findOneAndUpdate({ _id: userID }, { $set: { avatar: image.webViewLink } }, { new: true }).lean().exec()
}