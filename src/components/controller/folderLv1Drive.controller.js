const FolderLv1DriveService = require('../services/folderLv1Drive.services')
const FolderLv2DriveService = require('../services/folderLv2Drive.services')
const { createSchema } = require('./folderLv1Drive.schema')
const { google } = require('googleapis');
const until = require('../services/untilServices')
const driverGoogle = require('../../helper/googleDriverApi')
const fs = require('fs')
const errorService = require('../../helper/errorService')
const { resDataModify } = require('../../helper/until')
exports.getList = async (req, res) => {
    const result = await FolderLv1DriveService.getList()
    resDataModify(res, result)
}
exports.getById = async (req, res) => {
    const result = await FolderLv1DriveService.getById(req.params.id)
    resDataModify(res, result)
}
exports.create = async (req, res) => {
    until.validateJson(createSchema, req.body)
    const result = await FolderLv1DriveService.create(req.body)
    resDataModify(res, result)
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
                }).catch(err => { res.status(err.code).json(err) })
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
                }).catch(err => { res.status(err.code).json(err) })
        })
    });
}