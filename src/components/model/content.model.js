const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contentSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	avatar: {
		type: mongoose.Schema.ObjectId,
		ref: 'Avatar'
	},
	mean: {
		type: String,
		required: true
	},
	pronounce: {
		type: String
	},
	language: {
		type: String
	},

	ngTao: {type: String},
	ngCapNhat: {type: String},
	status: {type: String, enum: ["active", "deactive"], default: "active"}
}, {timestamps: true})
module.exports = mongoose.model('Content', contentSchema)