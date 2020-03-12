const fs = require('fs')
const FolderLv1DriveService = require('../components/services/folderLv1Drive.services')
const FolderLv2DriveService = require('../components/services/folderLv2Drive.services')
const driverGoogle = require('./googleDriverApi')
exports.syncFolder = async (req, res) => {
    return new Promise((resolve, reject) => {
        fs.readFile('credentials.json', (err, content) => {
            if (err) {
                const err = errorService.error.anyError(`Error loading client secret file:', ${err}`, 403)
                reject(err)
            }
            driverGoogle.authorize(JSON.parse(content), auth => {
                driverGoogle.syncFolderDefault(auth, '0AFiqKTBqK4BQUk9PVA', FolderLv1DriveService.FolderLv1DriveModel)
                    .then(async (data) => {
                        if (data.length > 0) {
                            for (let i = 0; i < data.length; i++)
                                data[i].lv = await driverGoogle.syncFolderDefault(auth, data[i].id, FolderLv2DriveService.FolderLv2DriveModel);
                            resolve(data)
                        }
                        else resolve(data)
                    }).catch(err => reject(err))
            })
        });
    })
}