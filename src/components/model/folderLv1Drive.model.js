const mongoose = require('mongoose')
const Schema = mongoose.Schema

const folderLv1DriveSchema = new Schema({
	name: { type: String },
	id: { type: String },
	parent: { type: String, default: '0AFiqKTBqK4BQUk9PVA' },
	type: { type: String, enum: ['image', 'video', 'mp3', 'pdf', 'excel', 'txt'], default: 'image' },
	ngTao: { type: String },
	ngCapNhat: { type: String },
	status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })
module.exports = mongoose.model('FolderLv1Drive', folderLv1DriveSchema)