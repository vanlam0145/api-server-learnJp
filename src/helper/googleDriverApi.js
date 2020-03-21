const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline')
const path = require('path')
//const folderLv1Drive = require('../components/model/folderLv1Drive.model')
const SCOPES = ['https://www.googleapis.com/auth/drive']
const TOKEN_PATH = 'token.json';
const errorService = require('./errorService')
exports.authorize = function (credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}
exports.listFiles = function (auth) {
    const drive = google.drive({ version: 'v3', auth });
    drive.files.list({
        q: "trashed = false" && "mimeType='application/vnd.google-apps.folder'",
        fields: 'nextPageToken, files(*)',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
            console.log('Files:');
            files.map((file) => {
                console.log(file)
                console.log(`${file.name} (${file.id})${file.mimeType}`);
            });
        } else {
            console.log('No files found.');
        }
    });
}
exports.uploadFile = function (auth, fileimage, parents) {
    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth })
        var fileMetadata = {
            'name': `${fileimage.originalname}.jpg`,
            parents: [parents]
        };
        var media = {
            mimeType: 'image/jpeg',
            body: fs.createReadStream(path.join(__dirname, `../../uploads/${fileimage.filename}`))
        };
        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, webViewLink'
        }, async function (err, file) {
            if (err) {
                fs.unlinkSync(path.join(__dirname, `../../uploads/${fileimage.filename}`))
                reject(err);
            } else {
                fs.unlinkSync(path.join(__dirname, `../../uploads/${fileimage.filename}`))
                await permissionsFile(auth, file.data.id)
                resolve(file.data)
            }
        });
    })
}
const permissionsFile = (auth, idFile) => {
    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth });
        drive.permissions.create({ fileId: idFile, requestBody: { role: 'reader',type:'anyone' } }, (err, permissionFile) => {
            if (err) reject(err)
            else resolve(permissionFile)
        })
    })
}
exports.deleteFile = function (auth, id) {
    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth });
        drive.files.delete({ fileId: id }, (err, file) => {
            if (err) reject(err)
            else resolve({ data: file.data, success: true })
        })
    })
}
exports.retrieveAllFilesInFolder = function (auth, callback) {
    const drive = google.drive({ version: 'v3', auth });
    drive.files.list({
        q: "trashed = false and mimeType='application/vnd.google-apps.folder' and '0AFiqKTBqK4BQUk9PVA' in parents",
        fields: 'nextPageToken, files(*)',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
            console.log('Files:');
            files.map((file) => {
                //console.log(file)
                console.log(`${file.name} (${file.id}) ${file.parents} `);
            });
        } else {
            console.log('No files found.');
        }
    });
}
exports.syncFolderDefault = function (auth, idDriver, modal) {
    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth })
        drive.files.list({
            q: `trashed = false and mimeType = 'application/vnd.google-apps.folder' and '${idDriver}' in parents`,
            fields: 'nextPageToken, files(*)'
        }, async (err, res) => {
            if (err) {
                reject(errorService.error.anyError('The API returned an error: ' + err, 405), null)
                console.log('The API returned an error: ' + err);
            }
            const files = res.data.files;
            if (files.length) {
                await modal.deleteMany({ id: { $not: { $in: files.map(file => file.id) } } })
                resolve({ mess: 'delete Files if true' });
            }
            else {
                await modal.deleteMany({})
                resolve({ mess: 'delete' })
            }
        })
    })
}
exports.createFolder = function (auth, idUser, result = '0AFiqKTBqK4BQUk9PVA') {
    return new Promise((resolve, reject) => {
        const folderId = result;
        const drive = google.drive({ version: 'v3', auth })
        var fileMetadata = {
            'name': idUser,
            'mimeType': 'application/vnd.google-apps.folder',
            parents: [folderId]
        };
        drive.files.create({
            resource: fileMetadata,
            fields: 'id'
        }, function (err, file) {
            if (err) reject(err)
            else {

                resolve(file.data.id)
            }
        });
    })
}