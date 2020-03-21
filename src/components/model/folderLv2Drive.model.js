const mongoose = require('mongoose')
const Schema = mongoose.Schema

const folderLv2DriveSchema = new Schema({
	id: {type: String},
	name: {type: String},
	idUser: {type: String},
	parent: {type: String},
	ngTao: {type: String},
	ngCapNhat: {type: String},
	status: {type: String, enum: ["active", "deactive"], default: "active"}
}, {timestamps: true})
folderLv2DriveSchema.index({idUser: 1, unique: true})
folderLv2DriveSchema.index({id: 1, unique: true})
module.exports = mongoose.model('FolderLv2Drive', folderLv2DriveSchema)