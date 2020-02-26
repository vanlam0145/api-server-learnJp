const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
	title: {type: String, required: true},
	// avatar: {
	// 	type: mongoose.Schema.ObjectId,
	// 	ref: 'Avatar'
	// },
	contents: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'Content'
		}
	],

	ngTao: {type: String},
	ngCapNhat: {type: String},
	status: {type: String, enum: ["active", "deactive"], default: "active"}
}, {timestamps: true})
module.exports = mongoose.model('Course', courseSchema)