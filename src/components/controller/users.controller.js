const UsersService = require('../services/users.services')
const { createSchema } = require('./users.schema')
const Types = require('mongoose').Types
const multer = require('multer')
const folderLv2Drive = require('../model/folderLv2Drive.model')
const driverGoogle = require('../../helper/googleDriverApi')
const imageModel = require('../model/imageGoogleDrive.model')
const driverGoogleHelper = require('../../helper/googleDriverHelper')
const fs = require('fs')
const path = require('path')
const { ErrorService } = require('../../helper/errorService')
const until = require('../services/untilServices')
const typeToken = {
    accessToken: 'access',
    refreshToken: 'refresh'
}
const jwt = require('jsonwebtoken')
const { resDataModify } = require('../../helper/until')
exports.getList = async (req, res) => {
    const result = await UsersService.getList()
    resDataModify(res, result)
}
exports.notFriend = async (req, res) => {
    const result = await UsersService.notFriend(req.user._id)
    resDataModify(res, result)
}
exports.senderAddFriend = async (req, res) => {
    const result = await UsersService.senderAddFriend(req.user._id)
    resDataModify(res, result)
}
exports.requestAddFriend = async (req, res) => {
    const result = await UsersService.requestAddFriend(req.user._id)
    resDataModify(res, result)
}
exports.getById = async (req, res) => {
    const result = await UsersService.getById(req.params.id)
    resDataModify(res, result)
}
exports.create = async (req, res) => {
    until.validateJson(createSchema, req.body)
    const result = await UsersService.create(req.body)
    resDataModify(res, result)
}
exports.update = async (req, res) => {
    const result = await UsersService.update(req.user._id, req.body)
    resDataModify(result)
}
exports.delete = async (req, res) => {
    const result = await UsersService.delete(req.params.id)
    resDataModify(res, result)
}
exports.login = async (req, res) => {
    const result = await UsersService.login(req.body)
    resDataModify(res, {
        ...result,
        isGuest: false,
        ...(!'' && { token: _createToken(result).token })
    })
}
exports.me = async (req, res) => {
    const result = await UsersService.getMe(req.user._id)
    resDataModify(res, result)
}
exports.getCourseLatest = async (req, res) => {
    const result = await UsersService.getCourseLatest(req.user._id)
    resDataModify(res, result)
}
exports.deleteImage = async (req, res) => {
    try {
        const content = fs.readFileSync('credentials.json')
        const auth = await driverGoogle.authorize(JSON.parse(content))
        const deleteFile = await driverGoogle.deleteFile(auth, req.params.id)
        let image = ''
        if (deleteFile.success && deleteFile.data == "") {
            image = await imageModel.findOneAndDelete({ id: req.params.id })
        }
        resDataModify(res, image)
    } catch (error) {
        console.log(error)
        throw ErrorService.somethingWentWrong(`Error loading client secret file:', ${error}`)
    }
}
exports.addImage = async (req, res) => {
    try {
        if (!fs.existsSync(path.join(__dirname, '../../../uploads'))) {
            fs.mkdir('./uploads', { recursive: true }, (err) => { if (err) throw err })
        }
        //const data = await driverGoogleHelper.syncFolder(req, res)
        //if (data.length == 0) throw ErrorService.somethingWentWrong("Drive not have Folder Avatar")
        const file = await uploadFile(req, res)
        const content = fs.readFileSync('credentials.json')

        const auth = await driverGoogle.authorize(JSON.parse(content))
        if (!file) throw ErrorService.somethingWentWrong(`Gui len khong dung format "multipart/form-data"?`)
        let userFolder = await folderLv2Drive.findOne({ idUser: req.user._id })
        if (!userFolder) {
            let userFolderID = await driverGoogle.createFolder(auth, req.user._id, "1YNBneKgkmHORdncYiCIZeeqpwiJ3DHdr")
            userFolder = await folderLv2Drive.create({ idUser: req.user._id, id: userFolderID, name: req.user.username, parent: "1YNBneKgkmHORdncYiCIZeeqpwiJ3DHdr" })
        }
        let countImage = await imageModel.count({ parent: userFolder.id })
        if (countImage > 10)
            throw ErrorService.somethingWentWrong("You can only own 10 at most image")
        let imageId = await driverGoogle.uploadFile(auth, req.file, userFolder.id)
        resDataModify(res, await imageModel.create({
            name: req.file.originalname,
            id: imageId.id,
            parent: userFolder.id,
            idUser: req.user._id,
            webViewLink: imageId.webViewLink
        }))
    } catch (error) {
        console.log(error)
        throw ErrorService.somethingWentWrong(error)
    }
}
exports.setAvartar = async (req, res) => {
    const result = await UsersService.setAvartar(req.params.idimage, req.user._id)
    resDataModify(res, result)
}
const _createToken = (user) => {
    const payload = {
        email: user.email,
        username: user.username,
        _id: user._id.toString(),
        type: typeToken.accessToken,
        role: user.role
    }
    return {
        token: jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRED
            //expiresIn: 30
            //Giay
        })
    }
}
let diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads");
    },
    filename: (req, file, callback) => {
        let math = ["image/jpeg"];
        if (math.indexOf(file.mimetype) === -1) {
            let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg.`;
            return callback(errorMess, null);
        }
        let filename = `avartar-${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
});
let uploadFileConfig = multer({ storage: diskStorage }).single("file");
const uploadFile = (req, res) => {
    return new Promise((resolve, reject) => {
        uploadFileConfig(req, res, error => {
            if (error) reject(error)
            resolve(req.file)
        })
    })
}
