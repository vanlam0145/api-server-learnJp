const mongoose = require('mongoose')
const Schema = mongoose.Schema

const challengesSchema = new Schema({
	level: {type: Number},
	choice_1: {type: String},
	choice_1_voice: {type: String},
	choice_2: {type: String},
	choice_2_voice: {type: String},
	answer: {type: Number},
	question:
		{type: String},
	explanation:
		{type: String},
	image: {type: String},
	index: {type: Number},
	ngTao: {type: String},
	ngCapNhat: {type: String},
	status: {type: String, enum: ["active", "deactive"], default: "active"}
}, {timestamps: true})
module.exports = mongoose.model('Challenges', challengesSchema)