const UsersModel = require('../model/users.model')
const errorService = require('../../helper/errorService')
const untilServices = require('./untilServices')
const imageGoogleDrive = require('../model/imageGoogleDrive.model')

const bcrypt = require('bcryptjs')
exports.UsersModel = UsersModel;
exports.getList = async () => await UsersModel.find({}).exec()
exports.getById = async (id) => await UsersModel.findById(id).exec()
exports.create = async function (body) {
    return await untilServices.exec(UsersModel.create({ ...body, hash: bcrypt.hashSync(body.password, 10) }))
}
exports.login = async ({ username, password, email }) => {
    const user = await UsersModel.findOne({ ...(email ? { email } : { username }) })
    if (user && bcrypt.compareSync(password, user.hash)) {
        const u_user = await UsersModel.findByIdAndUpdate({ _id: user._id, isGuest: false, ...(email ? { typeLogin: UsersModel.type_login.EM } : { typeLogin: UsersModel.type_login.UN }) })
        const { hash, ...userWithoutHash } = u_user.toJSON()
        return userWithoutHash
    } else return errorService.error.loginFaild()
}
exports.getMe = async (id) => {
    return await UsersModel.findById(id).select('-hash').lean()
}
exports.getCourseLatest = async (id) => {
    const user = await UsersModel.findById(id)
        .populate({ path: 'courses', populate: { path: 'contents' }, options: { sort: '-create_at' } })
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
        return errorService.error.anyError("You don't have image!", 403)
    return await UsersModel.updateOne({ _id: userID }, { $set: { avatar: image.webViewLink } }).lean().exec()
}