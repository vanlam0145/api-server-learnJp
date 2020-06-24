const mongoose = require('mongoose')
const Schema = mongoose.Schema

const topicsSchema = new Schema({
	title: { type: String, required: true },
	number: { type: Number, required: true },
	read: { type: String },
	mean: { type: String },
	avatar: { type: String },
	ngTao: { type: String },
	ngCapNhat: { type: String },
	status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })
module.exports = { TopicModel: mongoose.model('Topics', topicsSchema) }