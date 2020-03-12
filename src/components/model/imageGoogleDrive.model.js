const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageGoogleDriveSchema = new Schema({
	name: {type: String},
	id: {type: String},
	idUser: {type: String},
	webViewLink: {type: String},
	avartar: {type: Boolean, default: false},
	parent: {type: String},
	ngTao: {type: String},
	ngCapNhat: {type: String},
	status: {type: String, enum: ["active", "deactive"], default: "active"}
}, {timestamps: true})
imageGoogleDriveSchema.index({id: 1, unique: true})
module.exports = mongoose.model('ImageGoogleDrive', imageGoogleDriveSchema)