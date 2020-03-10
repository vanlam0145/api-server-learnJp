const UsersService = require('../services/users.services')
const usersSchema = require('./users.schema')
const Types = require('mongoose').Types
const multer = require('multer')
const folderLv1DriveController = require('../controller/folderLv1Drive.controller')
const folderLv2Drive = require('../model/folderLv2Drive.model')
const driverGoogle = require('../../helper/googleDriverApi')
const imageModel = require('../model/imageGoogleDrive.model')
const driverGoogleHelper = require('../../helper/googleDriverHelper')
const fs = require('fs')
const UsersModel = require('../model/users.model')
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
            else res.status(403).json(errorService.error.dataEmpty())
        })
        .catch(err => {if (err) throw err})
}
exports.getById = (req, res) => {
    UsersService.getById(req.params.id)
        .then(result => {
            if (result) res.send(result)
            else res.status(403).json(errorService.error.dataEmpty())
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
exports.deleteImage = async (req, res) => {
    fs.readFile('credentials.json', (err, content) => {
        if (err) {
            const err = errorService.error.anyError(`Error loading client secret file:', err`, 403)
            return res.status(err.code).json(err);
        }
        driverGoogle.authorize(JSON.parse(content), async auth => {
            //checkExists
            try {
                const deleteFile = await driverGoogle.deleteFile(auth, req.params.id)
                if (deleteFile.success && deleteFile.data == "") {
                    return res.send(await imageModel.deleteOne({id: req.params.id}))
                }
            } catch (error) {
                return res.send(error + "aa")
            }
        });
    });
}
exports.addImage = async (req, res) => {

    const data = await driverGoogleHelper.syncFolder(req, res)
    if (data.length == 0) return res.status(400).send("Drive not have Folder Avatar")

    uploadFile(req, res, (error) => {
        if (error instanceof multer.MulterError) {
            console.log("hear is err")
            const err = errorService.error.anyError(`Error when trying to upload: ${error}`, 403)
            return res.status(err.code).json(err);
        }
        else {
            if (error) {
                const err = errorService.error.anyError(`Error when trying to upload: ${error}`, 403)
                return res.status(err.code).json(err);
            }
            fs.readFile('credentials.json', (err, content) => {

                if (err) {
                    const err = errorService.error.anyError(`Error loading client secret file:', err`, 403)
                    return res.status(err.code).json(err);
                }
                driverGoogle.authorize(JSON.parse(content), async auth => {
                    //checkExists
                    try {
                        if (!req.file) return res.status(500).send("image?")
                        let userFolder = await folderLv2Drive.findOne({idUser: req.user._id})
                        if (!userFolder) {
                            let userFolderID = await driverGoogle.createFolder(auth, req.user._id, "1YNBneKgkmHORdncYiCIZeeqpwiJ3DHdr")
                            userFolder = await folderLv2Drive.create({idUser: req.user._id, id: userFolderID, name: req.user.username, parent: "1YNBneKgkmHORdncYiCIZeeqpwiJ3DHdr"})
                        }
                        let countImage = await imageModel.count({parent: userFolder.id})
                        if (countImage > 10) {
                            const err = errorService.error.anyError("You can only own 10 at most image", 501)
                            return res.status(err.code).json(err)
                        }
                        let imageId = await driverGoogle.uploadFile(auth, req.file, userFolder.id)
                        return res.send(await imageModel.create({
                            name: req.file.originalname,
                            id: imageId.id,
                            parent: userFolder.id,
                            idUser: req.user._id,
                            webViewLink: imageId.webViewLink
                        }))
                    } catch (error) {
                        return res.send(error + "aa")
                    }
                });
            });
        }
    });
}
exports.setAvartar = async (req, res) => {
    UsersService.setAvartar(req.params.idimage, req.user._id).then(result => {
        res.status(result.code ? result.code : 200).json(result)
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
let uploadFile = multer({storage: diskStorage}).single("file");

