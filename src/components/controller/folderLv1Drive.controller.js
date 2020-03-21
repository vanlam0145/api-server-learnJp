const FolderLv1DriveService = require('../services/folderLv1Drive.services')
const FolderLv2DriveService = require('../services/folderLv2Drive.services')
const folderLv1DriveSchema = require('./folderLv1Drive.schema')
const {google} = require('googleapis');
const until = require('../services/untilServices')
const driverGoogle = require('../../helper/googleDriverApi')
const fs = require('fs')
const errorService = require('../../helper/errorService')
exports.getList = (req, res) => {
    FolderLv1DriveService.getList()
        .then(result => {
            if (result) res.send(result)
            else res.send('kaka')
        })
        .catch(err => {if (err) throw err})
}
exports.getById = (req, res) => {
    FolderLv1DriveService.getById(req.params.id)
        .then(result => {
            if (result) res.send(result)
            else res.send('kaka')
        })
        .catch(err => {if (err) throw err})
}
exports.create = (req, res) => {
    const vali = until.validateJson((new folderLv1DriveSchema()).createSchema, req.body)
    if (!vali.isValid) res.status(500).json({mess: vali.message})
    else FolderLv1DriveService.create(req.body).then(result => {
        if (result.code) res.status(result.code).json(result)
        else res.status(201).json(result)
    })
}
exports.sync = (req, res) => {
    fs.readFile('credentials.json', (err, content) => {
        if (err) {
            const err = errorService.error.anyError(`Error loading client secret file:', ${err}`, 403)
            return res.status(err.code).json(err);
        }
        driverGoogle.authorize(JSON.parse(content), auth => {
            driverGoogle.syncFolderDefault(auth, '0AFiqKTBqK4BQUk9PVA', FolderLv1DriveService.FolderLv1DriveModel)
                .then(async (data) => {
                    if (data.length > 0) {
                        for (let i = 0; i < data.length; i++)
                            data[i].lv = await driverGoogle.syncFolderDefault(auth, data[i].id, FolderLv2DriveService.FolderLv2DriveModel);
                        res.status(200).json(data)
                    }
                    else res.status(200).json(data)
                }).catch(err => {res.status(err.code).json(err)})
        })
    });
}
exports.createFolderUserAvartar = (req, res) => {
    fs.readFile('credentials.json', (err, content) => {
        if (err) {
            const err = errorService.error.anyError(`Error loading client secret file:', ${err}`, 403)
            return res.status(err.code).json(err);
        }
        driverGoogle.authorize(JSON.parse(content), auth => {
            driverGoogle.syncFolderDefault(auth, '0AFiqKTBqK4BQUk9PVA', FolderLv1DriveService.FolderLv1DriveModel)
                .then(async (data) => {
                    if (data.length > 0) {
                        for (let i = 0; i < data.length; i++)
                            data[i].lv = await driverGoogle.syncFolderDefault(auth, data[i].id, FolderLv2DriveService.FolderLv2DriveModel);
                        res.status(200).json(data)
                    }
                    else res.status(200).json(data)
                }).catch(err => {res.status(err.code).json(err)})
        })
    });
}