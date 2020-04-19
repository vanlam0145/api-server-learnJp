const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoLinkGgSchema = new Schema({
	name: { type: String, required: true, unique: true },
	id: { type: String, required: true, unique: true },
	webViewLink: { type: String },
	thumbnailLink: { type: String },
	parent: { type: String, required: true },
	embeb: { type: String, required: true },
	ngTao: { type: String },
	ngCapNhat: { type: String },
	status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })
videoLinkGgSchema.index({ name: 'text' })
module.exports = mongoose.model('VideoLinkGg', videoLinkGgSchema)